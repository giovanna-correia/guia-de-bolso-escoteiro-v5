import { montarCabecalhoJovem } from '../../../componentes/cabecalho-jovem/cabecalho-jovem';
import { leisEscoteiras, linkPdfLeis, textoIntroducaoLeis } from '../../../dados/dados-leis';
import { exigirAutenticacao } from '../../../servicos/servico-autorizacao';
import { inicializarDadosDemonstrativos } from '../../../servicos/servico-dados-demonstrativos';

function inicializarPagina(): void {
  inicializarDadosDemonstrativos();
  const usuario = exigirAutenticacao();
  if (!usuario) return;
  montarCabecalhoJovem('Leis Escoteiras', usuario);
  const introducao = document.querySelector<HTMLElement>('#texto-introducao');
  const linkPdf = document.querySelector<HTMLAnchorElement>('#link-pdf');
  const lista = document.querySelector<HTMLElement>('#lista-leis');
  if (introducao) introducao.textContent = textoIntroducaoLeis;
  if (linkPdf) linkPdf.href = linkPdfLeis;
  leisEscoteiras.forEach((lei) => {
    const cartao = document.createElement('article');
    cartao.className = 'leis__cartao';
    cartao.textContent = lei.replace(/^\d+\.\s*/, '');
    lista?.append(cartao);
  });
}

document.addEventListener('DOMContentLoaded', inicializarPagina);
