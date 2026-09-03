import type { Atividade } from '../modelos/atividade';
import type { ItemAtividade } from '../modelos/item-atividade';
import type { Movimentacao } from '../modelos/movimentacao';
import { atualizarAtividade, listarItensDaAtividade, salvarItensDaAtividade } from '../repositorios/repositorio-atividades';
import { adicionarMovimentacao } from '../repositorios/repositorio-movimentacoes';
import { buscarMaterialPorId } from '../repositorios/repositorio-materiais';
import { gerarIdentificador } from '../utilitarios/gerador-identificador';
import { calcularQuantidadeDisponivel } from './servico-disponibilidade';

export interface FaltaMaterial {
  nome: string;
  solicitada: number;
  disponivel: number;
  faltante: number;
}

function expandirItem(item: ItemAtividade, usarQuantidadeRetirada = false): Array<{ materialId: string; quantidade: number }> {
  const quantidadeBase = usarQuantidadeRetirada ? item.quantidadeRetirada : item.quantidadeSolicitada;
  return [{ materialId: item.materialId, quantidade: quantidadeBase }];
}

export function calcularPercentualPreparacao(atividade: Atividade): number {
  const itens = listarItensDaAtividade(atividade.id);
  if (itens.length === 0) return 0;
  const preparados = itens.filter((item) => ['reservado', 'retirado', 'devolvido'].includes(item.situacao)).length;
  return Math.round((preparados / itens.length) * 100);
}

export function verificarFaltas(atividadeId: string): FaltaMaterial[] {
  const necessidades = new Map<string, number>();
  listarItensDaAtividade(atividadeId).forEach((item) => {
    expandirItem(item).forEach(({ materialId, quantidade }) => {
      necessidades.set(materialId, (necessidades.get(materialId) ?? 0) + quantidade);
    });
  });
  const faltas: FaltaMaterial[] = [];
  necessidades.forEach((solicitada, materialId) => {
    const disponivel = calcularQuantidadeDisponivel(materialId);
    if (disponivel < solicitada) {
      faltas.push({ nome: buscarMaterialPorId(materialId)?.nome ?? 'Material não encontrado', solicitada, disponivel, faltante: solicitada - disponivel });
    }
  });
  return faltas;
}

function criarMovimentacoes(atividade: Atividade, itens: ItemAtividade[], tipo: 'reserva' | 'retirada'): void {
  itens.forEach((item) => {
    expandirItem(item, tipo === 'retirada').forEach(({ materialId, quantidade }) => {
      const movimentacao: Movimentacao = {
        id: gerarIdentificador('movimentacao'), materialId, atividadeId: atividade.id, tipo, quantidade,
        responsavelId: atividade.responsavelId, data: new Date().toISOString(),
        estadoRegistrado: buscarMaterialPorId(materialId)?.estado ?? '', observacoes: `${tipo === 'reserva' ? 'Reserva' : 'Retirada'} para ${atividade.nome}.`
      };
      adicionarMovimentacao(movimentacao);
    });
  });
}

export function reservarAtividade(atividade: Atividade): FaltaMaterial[] {
  const faltas = verificarFaltas(atividade.id);
  if (faltas.length > 0) return faltas;
  const itens = listarItensDaAtividade(atividade.id).map((item) => ({ ...item, situacao: 'reservado' as const }));
  salvarItensDaAtividade(atividade.id, itens);
  atualizarAtividade({ ...atividade, situacao: 'reservada' });
  criarMovimentacoes(atividade, itens, 'reserva');
  return [];
}

export function registrarRetirada(atividade: Atividade, quantidadesPorItem: Record<string, number>): boolean {
  if (atividade.situacao !== 'reservada') return false;
  const itensAtuais = listarItensDaAtividade(atividade.id);
  const quantidadesValidas = itensAtuais.every((item) => {
    const quantidade = quantidadesPorItem[item.id];
    return quantidade !== undefined && Number.isFinite(quantidade) && quantidade >= 0 && quantidade <= item.quantidadeSolicitada;
  });
  if (!quantidadesValidas) return false;
  const itens = itensAtuais.map((item) => ({ ...item, quantidadeRetirada: quantidadesPorItem[item.id] ?? 0, situacao: 'retirado' as const }));
  salvarItensDaAtividade(atividade.id, itens);
  atualizarAtividade({ ...atividade, situacao: 'aguardando_devolucao' });
  criarMovimentacoes(atividade, itens, 'retirada');
  return true;
}
