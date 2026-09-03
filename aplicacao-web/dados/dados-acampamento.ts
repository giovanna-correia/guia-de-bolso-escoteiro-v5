import type { ItemChecklist } from '../compartilhado/tipos/tipos-comuns';

export const textoIntroducaoAcampamento = 'Não se preocupe! O check list abaixo serve para te ajudar quando não lembrar o que precisa levar para o acampamento. Enquanto estiver montando sua mochila, utilize a lista como uma ferramenta de apoio para não esquecer de nada.';

const nomesItens = [
  'Mochila cargueira', 'Saco de dormir', 'Isolante térmico', 'Cantimplora',
  'Lanterna', 'Pilhas reserva', 'Canivete', 'Prato, copo e talheres',
  'Uniforme escoteiro', 'Capa de chuva', 'Agasalho', 'Roupas reserva',
  'Kit de higiene', 'Protetor solar', 'Repelente', 'Sacola para roupa suja'
];

export const itensAcampamentoIniciais: ItemChecklist[] = nomesItens.map((nome, indice) => ({
  id: `item-acampamento-${indice + 1}`,
  nome,
  marcado: false,
  personalizado: false
}));
