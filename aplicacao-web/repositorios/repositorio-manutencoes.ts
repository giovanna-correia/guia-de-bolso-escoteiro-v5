import type { Manutencao } from '../modelos/manutencao';
import { escreverArmazenamento, lerArmazenamento } from '../utilitarios/manipulador-armazenamento';

export const CHAVE_MANUTENCOES = 'guia_escoteiro_manutencoes';

export function listarManutencoes(): Manutencao[] {
  return lerArmazenamento<Manutencao[]>(CHAVE_MANUTENCOES, []);
}

export function buscarManutencaoPorId(id: string): Manutencao | null {
  return listarManutencoes().find((manutencao) => manutencao.id === id) ?? null;
}

export function adicionarManutencao(manutencao: Manutencao): void {
  escreverArmazenamento(CHAVE_MANUTENCOES, [...listarManutencoes(), manutencao]);
}

export function atualizarManutencao(manutencaoAtualizada: Manutencao): boolean {
  const manutencoes = listarManutencoes();
  const indice = manutencoes.findIndex((manutencao) => manutencao.id === manutencaoAtualizada.id);
  if (indice < 0) return false;
  manutencoes[indice] = manutencaoAtualizada;
  escreverArmazenamento(CHAVE_MANUTENCOES, manutencoes);
  return true;
}

export function excluirManutencao(id: string): void {
  escreverArmazenamento(CHAVE_MANUTENCOES, listarManutencoes().filter((manutencao) => manutencao.id !== id));
}

export function excluirManutencoesDoMaterial(materialId: string): void {
  escreverArmazenamento(CHAVE_MANUTENCOES, listarManutencoes().filter((manutencao) => manutencao.materialId !== materialId));
}

export function desvincularManutencoesDaAtividade(atividadeId: string): void {
  escreverArmazenamento(CHAVE_MANUTENCOES, listarManutencoes().map((manutencao) => manutencao.atividadeId === atividadeId ? { ...manutencao, atividadeId: null } : manutencao));
}
