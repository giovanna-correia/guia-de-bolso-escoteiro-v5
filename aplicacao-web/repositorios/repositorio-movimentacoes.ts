import type { Movimentacao } from '../modelos/movimentacao';
import { escreverArmazenamento, lerArmazenamento } from '../utilitarios/manipulador-armazenamento';

export const CHAVE_MOVIMENTACOES = 'guia_escoteiro_movimentacoes';

export function listarMovimentacoes(): Movimentacao[] {
  return lerArmazenamento<Movimentacao[]>(CHAVE_MOVIMENTACOES, []);
}

export function adicionarMovimentacao(movimentacao: Movimentacao): void {
  escreverArmazenamento(CHAVE_MOVIMENTACOES, [...listarMovimentacoes(), movimentacao]);
}

export function listarMovimentacoesPorMaterial(materialId: string): Movimentacao[] {
  return listarMovimentacoes().filter((movimentacao) => movimentacao.materialId === materialId);
}

export function excluirMovimentacoesDoMaterial(materialId: string): void {
  escreverArmazenamento(CHAVE_MOVIMENTACOES, listarMovimentacoes().filter((movimentacao) => movimentacao.materialId !== materialId));
}

export function excluirMovimentacoesDaAtividade(atividadeId: string): void {
  escreverArmazenamento(CHAVE_MOVIMENTACOES, listarMovimentacoes().filter((movimentacao) => movimentacao.atividadeId !== atividadeId));
}
