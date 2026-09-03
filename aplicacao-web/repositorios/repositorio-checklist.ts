import type { ItemChecklist } from '../compartilhado/tipos/tipos-comuns';
import { escreverArmazenamento, lerArmazenamento } from '../utilitarios/manipulador-armazenamento';

export const CHAVE_CHECKLIST = 'guia_escoteiro_checklist_acampamento';

export function listarItensChecklist(): ItemChecklist[] {
  return lerArmazenamento<ItemChecklist[]>(CHAVE_CHECKLIST, []);
}

export function salvarItensChecklist(itens: ItemChecklist[]): void {
  escreverArmazenamento(CHAVE_CHECKLIST, itens);
}
