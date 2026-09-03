import {
  atividadesIniciais, categoriasIniciais, componentesIniciais, itensAtividadesIniciais,
  localizacoesIniciais, manutencoesIniciais, materiaisIniciais, movimentacoesIniciais,
  necessidadesIniciais, patrulhasIniciais, secoesIniciais, usuariosIniciais
} from '../dados/dados-iniciais';
import { itensAcampamentoIniciais } from '../dados/dados-acampamento';
import { CHAVE_USUARIOS } from '../repositorios/repositorio-usuarios';
import { CHAVE_SECOES } from '../repositorios/repositorio-secoes';
import { CHAVE_PATRULHAS } from '../repositorios/repositorio-patrulhas';
import { CHAVE_CATEGORIAS } from '../repositorios/repositorio-categorias';
import { CHAVE_LOCALIZACOES } from '../repositorios/repositorio-localizacoes';
import { CHAVE_MATERIAIS } from '../repositorios/repositorio-materiais';
import { CHAVE_COMPONENTES } from '../repositorios/repositorio-componentes';
import { CHAVE_ATIVIDADES, CHAVE_ITENS_ATIVIDADES } from '../repositorios/repositorio-atividades';
import { CHAVE_MOVIMENTACOES } from '../repositorios/repositorio-movimentacoes';
import { CHAVE_MANUTENCOES } from '../repositorios/repositorio-manutencoes';
import { CHAVE_NECESSIDADES } from '../repositorios/repositorio-necessidades';
import { CHAVE_CHECKLIST } from '../repositorios/repositorio-checklist';
import { chaveExiste, escreverArmazenamento, removerArmazenamento } from '../utilitarios/manipulador-armazenamento';

const dadosPorChave: ReadonlyArray<readonly [string, object]> = [
  [CHAVE_USUARIOS, usuariosIniciais], [CHAVE_SECOES, secoesIniciais], [CHAVE_PATRULHAS, patrulhasIniciais],
  [CHAVE_CATEGORIAS, categoriasIniciais], [CHAVE_LOCALIZACOES, localizacoesIniciais],
  [CHAVE_MATERIAIS, materiaisIniciais], [CHAVE_COMPONENTES, componentesIniciais],
  [CHAVE_ATIVIDADES, atividadesIniciais],
  [CHAVE_ITENS_ATIVIDADES, itensAtividadesIniciais], [CHAVE_MOVIMENTACOES, movimentacoesIniciais],
  [CHAVE_MANUTENCOES, manutencoesIniciais], [CHAVE_NECESSIDADES, necessidadesIniciais],
  [CHAVE_CHECKLIST, itensAcampamentoIniciais]
];

const chavesDescontinuadas = [
  'guia_escoteiro_kits',
  'guia_escoteiro_itens_kits',
  'guia_escoteiro_conferencias',
  'guia_escoteiro_itens_conferencias'
] as const;

function limparDadosDescontinuados(): void {
  chavesDescontinuadas.forEach((chave) => removerArmazenamento(chave));
}

export function inicializarDadosDemonstrativos(): void {
  limparDadosDescontinuados();
  dadosPorChave.forEach(([chave, dados]) => {
    if (!chaveExiste(chave)) escreverArmazenamento(chave, dados);
  });
}

export function restaurarDadosDemonstrativos(): void {
  limparDadosDescontinuados();
  dadosPorChave.forEach(([chave]) => removerArmazenamento(chave));
  inicializarDadosDemonstrativos();
}
