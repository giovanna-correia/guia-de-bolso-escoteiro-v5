import { montarCabecalhoJovem } from '../../../componentes/cabecalho-jovem/cabecalho-jovem';
import { alfabetoMorse, codigoMorse, textoIntroducaoMorse } from '../../../dados/dados-morse';
import { exigirAutenticacao } from '../../../servicos/servico-autorizacao';
import { inicializarDadosDemonstrativos } from '../../../servicos/servico-dados-demonstrativos';

function converterParaMorse(texto: string): string {
  return texto.toLocaleUpperCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .split(/\s+/).map((palavra) => palavra.split('').map((caractere) => codigoMorse[caractere] ?? '').filter(Boolean).join(' ')).filter(Boolean).join(' / ');
}

function atualizarResultado(): void {
  const campo = document.querySelector<HTMLTextAreaElement>('#campo-mensagem');
  const resultado = document.querySelector<HTMLOutputElement>('#resultado-morse');
  if (!campo || !resultado) return;
  resultado.textContent = converterParaMorse(campo.value) || 'A mensagem em Morse aparecerá aqui.';
}

function renderizarTabela(): void {
  const tabela = document.querySelector<HTMLElement>('#tabela-morse');
  alfabetoMorse.forEach(({ caractere, codigo }) => {
    const cartao = document.createElement('article');
    cartao.className = 'morse__simbolo';
    const letra = document.createElement('strong');
    letra.textContent = caractere;
    const morse = document.createElement('span');
    morse.textContent = codigo;
    cartao.append(letra, morse);
    tabela?.append(cartao);
  });
}

function inicializarPagina(): void {
  inicializarDadosDemonstrativos();
  const usuario = exigirAutenticacao();
  if (!usuario) return;
  montarCabecalhoJovem('Código Morse', usuario);
  const introducao = document.querySelector<HTMLElement>('#texto-introducao');
  if (introducao) introducao.textContent = textoIntroducaoMorse;
  document.querySelector('#campo-mensagem')?.addEventListener('input', atualizarResultado);
  document.querySelector('#botao-limpar')?.addEventListener('click', () => {
    const campo = document.querySelector<HTMLTextAreaElement>('#campo-mensagem');
    if (campo) campo.value = '';
    atualizarResultado();
    campo?.focus();
  });
  renderizarTabela();
}

document.addEventListener('DOMContentLoaded', inicializarPagina);
