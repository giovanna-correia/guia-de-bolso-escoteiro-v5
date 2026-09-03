import type { Secao } from '../modelos/secao';
import { lerArmazenamento } from '../utilitarios/manipulador-armazenamento';

export const CHAVE_SECOES = 'guia_escoteiro_secoes';

export function listarSecoes(): Secao[] {
  return lerArmazenamento<Secao[]>(CHAVE_SECOES, []);
}

export function buscarSecaoPorId(id: string | null): Secao | null {
  if (!id) return null;
  return listarSecoes().find((secao) => secao.id === id) ?? null;
}
