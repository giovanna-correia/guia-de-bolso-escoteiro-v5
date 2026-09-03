import { montarCabecalhoJovem } from '../../../componentes/cabecalho-jovem/cabecalho-jovem';
import { nosEscoteiros, textoIntroducaoNos, type NoEscoteiro } from '../../../dados/dados-nos';
import { exigirAutenticacao } from '../../../servicos/servico-autorizacao';
import { inicializarDadosDemonstrativos } from '../../../servicos/servico-dados-demonstrativos';

function criarCartao(noEscoteiro: NoEscoteiro, principal: boolean): HTMLAnchorElement {
  const link = document.createElement('a');
  link.className = principal ? 'nos-listagem__cartao' : 'nos-listagem__link';
  link.href = `../no-detalhes/index.html?id=${encodeURIComponent(noEscoteiro.id)}`;
  if (principal) {
    const recurso = document.createElement('small');
    recurso.textContent = noEscoteiro.caminhoImagemEsperado ? `Imagem original pendente: ${noEscoteiro.caminhoImagemEsperado}` : 'Técnica escoteira';
    const nome = document.createElement('strong');
    nome.textContent = noEscoteiro.nome;
    link.append(recurso, nome);
  } else link.textContent = noEscoteiro.nome;
  return link;
}

function inicializarPagina(): void {
  inicializarDadosDemonstrativos();
  const usuario = exigirAutenticacao();
  if (!usuario) return;
  montarCabecalhoJovem('Nós Escoteiros', usuario);
  const introducao = document.querySelector<HTMLElement>('#texto-introducao');
  const principais = document.querySelector<HTMLElement>('#lista-principais');
  const gerais = document.querySelector<HTMLElement>('#lista-gerais');
  if (introducao) introducao.textContent = textoIntroducaoNos;
  nosEscoteiros.forEach((noEscoteiro) => {
    const principal = noEscoteiro.categoria === 'principal';
    (principal ? principais : gerais)?.append(criarCartao(noEscoteiro, principal));
  });
}

document.addEventListener('DOMContentLoaded', inicializarPagina);
