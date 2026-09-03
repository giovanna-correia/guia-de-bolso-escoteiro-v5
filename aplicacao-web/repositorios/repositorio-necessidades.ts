import type { NecessidadeCompra } from '../modelos/necessidade-compra';
import { escreverArmazenamento, lerArmazenamento } from '../utilitarios/manipulador-armazenamento';

export const CHAVE_NECESSIDADES = 'guia_escoteiro_necessidades';

export function listarNecessidades(): NecessidadeCompra[] {
  return lerArmazenamento<NecessidadeCompra[]>(CHAVE_NECESSIDADES, []);
}

export function buscarNecessidadePorId(id: string): NecessidadeCompra | null {
  return listarNecessidades().find((necessidade) => necessidade.id === id) ?? null;
}

export function adicionarNecessidade(necessidade: NecessidadeCompra): void {
  escreverArmazenamento(CHAVE_NECESSIDADES, [...listarNecessidades(), necessidade]);
}

export function atualizarNecessidade(necessidadeAtualizada: NecessidadeCompra): boolean {
  const necessidades = listarNecessidades();
  const indice = necessidades.findIndex((necessidade) => necessidade.id === necessidadeAtualizada.id);
  if (indice < 0) return false;
  necessidades[indice] = necessidadeAtualizada;
  escreverArmazenamento(CHAVE_NECESSIDADES, necessidades);
  return true;
}

export function excluirNecessidade(id: string): void {
  escreverArmazenamento(CHAVE_NECESSIDADES, listarNecessidades().filter((necessidade) => necessidade.id !== id));
}

export function desvincularNecessidadesDoMaterial(materialId: string): void {
  escreverArmazenamento(CHAVE_NECESSIDADES, listarNecessidades().map((necessidade) => necessidade.materialId === materialId ? { ...necessidade, materialId: null } : necessidade));
}
