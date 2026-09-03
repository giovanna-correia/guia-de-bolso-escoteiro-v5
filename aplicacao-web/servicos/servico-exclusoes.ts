import { excluirAtividade, excluirItensDoMaterial } from '../repositorios/repositorio-atividades';
import { salvarComponentesDoMaterial } from '../repositorios/repositorio-componentes';
import { desvincularManutencoesDaAtividade, excluirManutencao, excluirManutencoesDoMaterial, listarManutencoes } from '../repositorios/repositorio-manutencoes';
import { atualizarMaterial, buscarMaterialPorId, excluirMaterial } from '../repositorios/repositorio-materiais';
import { excluirMovimentacoesDaAtividade, excluirMovimentacoesDoMaterial } from '../repositorios/repositorio-movimentacoes';
import { desvincularNecessidadesDoMaterial, excluirNecessidade } from '../repositorios/repositorio-necessidades';

export function excluirAtividadeComRelacionamentos(id: string): void {
  excluirAtividade(id);
  excluirMovimentacoesDaAtividade(id);
  desvincularManutencoesDaAtividade(id);
}

export function excluirMaterialComRelacionamentos(id: string): void {
  excluirItensDoMaterial(id);
  salvarComponentesDoMaterial(id, []);
  excluirManutencoesDoMaterial(id);
  excluirMovimentacoesDoMaterial(id);
  desvincularNecessidadesDoMaterial(id);
  excluirMaterial(id);
}

export function excluirManutencaoComLiberacao(id: string): void {
  const manutencao = listarManutencoes().find((registro) => registro.id === id);
  if (!manutencao) return;
  excluirManutencao(id);
  const existeOutraAberta = listarManutencoes().some((registro) => registro.materialId === manutencao.materialId && ['pendente', 'em_andamento'].includes(registro.situacao));
  const material = buscarMaterialPorId(manutencao.materialId);
  if (!existeOutraAberta && material && ['em_manutencao', 'aguardando_limpeza', 'aguardando_secagem', 'danificado'].includes(material.estado)) atualizarMaterial({ ...material, estado: 'bom' });
}

export function excluirNecessidadeDefinitivamente(id: string): void {
  excluirNecessidade(id);
}
