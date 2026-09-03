import type { Localizacao } from '../modelos/localizacao';
import { lerArmazenamento } from '../utilitarios/manipulador-armazenamento';

export const CHAVE_LOCALIZACOES = 'guia_escoteiro_localizacoes';

export function listarLocalizacoes(): Localizacao[] {
  return lerArmazenamento<Localizacao[]>(CHAVE_LOCALIZACOES, []);
}

export function buscarLocalizacaoPorId(id: string): Localizacao | null {
  return listarLocalizacoes().find((localizacao) => localizacao.id === id) ?? null;
}
