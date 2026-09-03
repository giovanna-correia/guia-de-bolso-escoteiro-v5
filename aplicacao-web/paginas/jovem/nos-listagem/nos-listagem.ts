import { montarCabecalhoJovem } from '../../../componentes/cabecalho-jovem/cabecalho-jovem';
import { nosEscoteiros, textoIntroducaoNos, type NoEscoteiro } from '../../../dados/dados-nos';
import { exigirAutenticacao } from '../../../servicos/servico-autorizacao';
import { inicializarDadosDemonstrativos } from '../../../servicos/servico-dados-demonstrativos';
import { obterCaminhoRaiz } from '../../../utilitarios/manipulador-url';

function criarCartao(noEscoteiro: NoEscoteiro, principal: boolean): HTMLAnchorElement {
  const link = document.createElement('a');
  link.className = principal ? 'nos-listagem__cartao' : 'nos-listagem__link';
  link.href = `../no-detalhes/index.html?id=${encodeURIComponent(noEscoteiro.id)}`;
  if (principal) {
    const imagem = document.createElement('img');
    imagem.className = 'nos-listagem__imagem';
    imagem.src = `${obterCaminhoRaiz()}recursos/imagens/nos/${noEscoteiro.caminhoImagemEsperado}`;
    imagem.alt = `Demonstração do ${noEscoteiro.nome}`;
    const conteudo = document.createElement('span');
    conteudo.className = 'nos-listagem__conteudo';
    const recurso = document.createElement('small');
    recurso.textContent = 'Técnica escoteira';
    const nome = document.createElement('strong');
    nome.textContent = noEscoteiro.nome;
    conteudo.append(recurso, nome);
    link.append(imagem, conteudo);
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
