import type { Atividade } from '../modelos/atividade';
import type { ItemAtividade } from '../modelos/item-atividade';
import { escreverArmazenamento, lerArmazenamento } from '../utilitarios/manipulador-armazenamento';

export const CHAVE_ATIVIDADES = 'guia_escoteiro_atividades';
export const CHAVE_ITENS_ATIVIDADES = 'guia_escoteiro_itens_atividades';

export function listarAtividades(): Atividade[] {
  return lerArmazenamento<Atividade[]>(CHAVE_ATIVIDADES, []);
}

export function buscarAtividadePorId(id: string): Atividade | null {
  return listarAtividades().find((atividade) => atividade.id === id) ?? null;
}

export function adicionarAtividade(atividade: Atividade): void {
  escreverArmazenamento(CHAVE_ATIVIDADES, [...listarAtividades(), atividade]);
}

export function atualizarAtividade(atividadeAtualizada: Atividade): boolean {
  const atividades = listarAtividades();
  const indice = atividades.findIndex((atividade) => atividade.id === atividadeAtualizada.id);
  if (indice < 0) return false;
  atividades[indice] = atividadeAtualizada;
  escreverArmazenamento(CHAVE_ATIVIDADES, atividades);
  return true;
}

export function listarItensAtividades(): ItemAtividade[] {
  return lerArmazenamento<ItemAtividade[]>(CHAVE_ITENS_ATIVIDADES, [])
    .filter((item) => typeof item.materialId === 'string' && item.materialId.length > 0);
}

export function listarItensDaAtividade(atividadeId: string): ItemAtividade[] {
  return listarItensAtividades().filter((item) => item.atividadeId === atividadeId);
}

export function salvarItensDaAtividade(atividadeId: string, itens: ItemAtividade[]): void {
  const outrosItens = listarItensAtividades().filter((item) => item.atividadeId !== atividadeId);
  escreverArmazenamento(CHAVE_ITENS_ATIVIDADES, [...outrosItens, ...itens]);
}

export function excluirAtividade(id: string): void {
  escreverArmazenamento(CHAVE_ATIVIDADES, listarAtividades().filter((atividade) => atividade.id !== id));
  escreverArmazenamento(CHAVE_ITENS_ATIVIDADES, listarItensAtividades().filter((item) => item.atividadeId !== id));
}

export function excluirItensDoMaterial(materialId: string): void {
  escreverArmazenamento(CHAVE_ITENS_ATIVIDADES, listarItensAtividades().filter((item) => item.materialId !== materialId));
}
