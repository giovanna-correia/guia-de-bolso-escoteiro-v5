import { normalizarTexto } from '../../utilitarios/normalizador-texto';
import { textoSituacao } from '../../utilitarios/criador-html';

const situacoesSucesso = ['ativo', 'ativa', 'bom', 'disponivel', 'concluida', 'recebida'];
const situacoesPerigo = ['inativo', 'inativa', 'danificado', 'baixado', 'cancelada', 'urgente'];
const situacoesInformacao = ['reservado', 'reservada', 'em andamento', 'em atividade'];

export function criarIndicadorSituacao(situacao: string): HTMLElement {
  const indicador = document.createElement('span');
  const situacaoNormalizada = normalizarTexto(situacao.replaceAll('_', ' '));
  let tipo = 'aviso';
  if (situacoesSucesso.includes(situacaoNormalizada)) tipo = 'sucesso';
  if (situacoesPerigo.includes(situacaoNormalizada)) tipo = 'perigo';
  if (situacoesInformacao.includes(situacaoNormalizada)) tipo = 'informacao';
  indicador.className = `indicador-situacao indicador-situacao--${tipo}`;
  indicador.textContent = textoSituacao(situacao);
  return indicador;
}
