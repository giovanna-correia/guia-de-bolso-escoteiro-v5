import type { Conferencia } from '../modelos/conferencia';
import type { ItemConferencia } from '../modelos/item-conferencia';
import { escreverArmazenamento, lerArmazenamento } from '../utilitarios/manipulador-armazenamento';

export const CHAVE_CONFERENCIAS = 'guia_escoteiro_conferencias';
export const CHAVE_ITENS_CONFERENCIAS = 'guia_escoteiro_itens_conferencias';

export function listarConferencias(): Conferencia[] {
  return lerArmazenamento<Conferencia[]>(CHAVE_CONFERENCIAS, []);
}

export function buscarConferenciaPorId(id: string): Conferencia | null {
  return listarConferencias().find((conferencia) => conferencia.id === id) ?? null;
}

export function adicionarConferencia(conferencia: Conferencia): void {
  escreverArmazenamento(CHAVE_CONFERENCIAS, [...listarConferencias(), conferencia]);
}

export function atualizarConferencia(conferenciaAtualizada: Conferencia): boolean {
  const conferencias = listarConferencias();
  const indice = conferencias.findIndex((conferencia) => conferencia.id === conferenciaAtualizada.id);
  if (indice < 0) return false;
  conferencias[indice] = conferenciaAtualizada;
  escreverArmazenamento(CHAVE_CONFERENCIAS, conferencias);
  return true;
}

export function listarItensConferencias(): ItemConferencia[] {
  return lerArmazenamento<ItemConferencia[]>(CHAVE_ITENS_CONFERENCIAS, []);
}

export function listarItensDaConferencia(conferenciaId: string): ItemConferencia[] {
  return listarItensConferencias().filter((item) => item.conferenciaId === conferenciaId);
}

export function salvarItensDaConferencia(conferenciaId: string, itens: ItemConferencia[]): void {
  const outrosItens = listarItensConferencias().filter((item) => item.conferenciaId !== conferenciaId);
  escreverArmazenamento(CHAVE_ITENS_CONFERENCIAS, [...outrosItens, ...itens]);
}
