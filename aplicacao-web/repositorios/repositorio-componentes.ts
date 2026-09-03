import type { ComponenteMaterial } from '../modelos/componente-material';
import { escreverArmazenamento, lerArmazenamento } from '../utilitarios/manipulador-armazenamento';

export const CHAVE_COMPONENTES = 'guia_escoteiro_componentes';

export function listarComponentes(): ComponenteMaterial[] {
  return lerArmazenamento<ComponenteMaterial[]>(CHAVE_COMPONENTES, []);
}

export function listarComponentesPorMaterial(materialId: string): ComponenteMaterial[] {
  return listarComponentes().filter((componente) => componente.materialId === materialId);
}

export function salvarComponentesDoMaterial(materialId: string, componentes: ComponenteMaterial[]): void {
  const outrosComponentes = listarComponentes().filter((componente) => componente.materialId !== materialId);
  escreverArmazenamento(CHAVE_COMPONENTES, [...outrosComponentes, ...componentes]);
}
