import type { Kit } from '../modelos/kit';
import type { ItemKit } from '../modelos/item-kit';
import { escreverArmazenamento, lerArmazenamento } from '../utilitarios/manipulador-armazenamento';

export const CHAVE_KITS = 'guia_escoteiro_kits';
export const CHAVE_ITENS_KITS = 'guia_escoteiro_itens_kits';

export function listarKits(): Kit[] {
  return lerArmazenamento<Kit[]>(CHAVE_KITS, []);
}

export function buscarKitPorId(id: string): Kit | null {
  return listarKits().find((kit) => kit.id === id) ?? null;
}

export function adicionarKit(kit: Kit): void {
  escreverArmazenamento(CHAVE_KITS, [...listarKits(), kit]);
}

export function atualizarKit(kitAtualizado: Kit): boolean {
  const kits = listarKits();
  const indice = kits.findIndex((kit) => kit.id === kitAtualizado.id);
  if (indice < 0) return false;
  kits[indice] = kitAtualizado;
  escreverArmazenamento(CHAVE_KITS, kits);
  return true;
}

export function listarItensKits(): ItemKit[] {
  return lerArmazenamento<ItemKit[]>(CHAVE_ITENS_KITS, []);
}

export function listarItensDoKit(kitId: string): ItemKit[] {
  return listarItensKits().filter((item) => item.kitId === kitId);
}

export function salvarItensDoKit(kitId: string, itens: ItemKit[]): void {
  const outrosItens = listarItensKits().filter((item) => item.kitId !== kitId);
  escreverArmazenamento(CHAVE_ITENS_KITS, [...outrosItens, ...itens]);
}
