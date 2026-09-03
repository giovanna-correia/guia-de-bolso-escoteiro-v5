import type { Patrulha } from '../modelos/patrulha';
import { lerArmazenamento } from '../utilitarios/manipulador-armazenamento';

export const CHAVE_PATRULHAS = 'guia_escoteiro_patrulhas';

export function listarPatrulhas(): Patrulha[] {
  return lerArmazenamento<Patrulha[]>(CHAVE_PATRULHAS, []);
}

export function buscarPatrulhaPorId(id: string | null): Patrulha | null {
  if (!id) return null;
  return listarPatrulhas().find((patrulha) => patrulha.id === id) ?? null;
}

export function listarPatrulhasPorSecao(secaoId: string): Patrulha[] {
  return listarPatrulhas().filter((patrulha) => patrulha.secaoId === secaoId && patrulha.situacao === 'ativa');
}
