import type { CategoriaMaterial } from '../modelos/categoria-material';
import { lerArmazenamento } from '../utilitarios/manipulador-armazenamento';

export const CHAVE_CATEGORIAS = 'guia_escoteiro_categorias';

export function listarCategorias(): CategoriaMaterial[] {
  return lerArmazenamento<CategoriaMaterial[]>(CHAVE_CATEGORIAS, []);
}

export function buscarCategoriaPorId(id: string): CategoriaMaterial | null {
  return listarCategorias().find((categoria) => categoria.id === id) ?? null;
}
