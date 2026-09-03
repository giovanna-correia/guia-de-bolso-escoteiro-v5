import type { Material } from '../modelos/material';
import { escreverArmazenamento, lerArmazenamento } from '../utilitarios/manipulador-armazenamento';

export const CHAVE_MATERIAIS = 'guia_escoteiro_materiais';

export function listarMateriais(): Material[] {
  return lerArmazenamento<Material[]>(CHAVE_MATERIAIS, []);
}

export function buscarMaterialPorId(id: string): Material | null {
  return listarMateriais().find((material) => material.id === id) ?? null;
}

export function adicionarMaterial(material: Material): void {
  escreverArmazenamento(CHAVE_MATERIAIS, [...listarMateriais(), material]);
}

export function atualizarMaterial(materialAtualizado: Material): boolean {
  const materiais = listarMateriais();
  const indice = materiais.findIndex((material) => material.id === materialAtualizado.id);
  if (indice < 0) return false;
  materiais[indice] = materialAtualizado;
  escreverArmazenamento(CHAVE_MATERIAIS, materiais);
  return true;
}

export function baixarMaterial(id: string): boolean {
  const material = buscarMaterialPorId(id);
  if (!material) return false;
  return atualizarMaterial({ ...material, estado: 'baixado' });
}
