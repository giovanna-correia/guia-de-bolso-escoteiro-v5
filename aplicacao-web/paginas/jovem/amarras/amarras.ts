import { montarCabecalhoJovem } from '../../../componentes/cabecalho-jovem/cabecalho-jovem';
import { amarras, textoIntroducaoAmarras, type AmarraEscoteira } from '../../../dados/dados-amarras';
import { exigirAutenticacao } from '../../../servicos/servico-autorizacao';
import { inicializarDadosDemonstrativos } from '../../../servicos/servico-dados-demonstrativos';

function criarCartao(amarra: AmarraEscoteira): HTMLElement {
  const artigo = document.createElement('article');
  artigo.className = 'amarras__cartao';
  const visual = document.createElement('div');
  visual.className = 'amarras__visual';
  const recurso = document.createElement('span');
  recurso.textContent = `Miniatura original pendente: ${amarra.caminhoImagemEsperado}`;
  visual.append(recurso);
  const conteudo = document.createElement('div');
  conteudo.className = 'amarras__conteudo';
  const nome = document.createElement('h2');
  nome.className = 'amarras__nome';
  nome.textContent = amarra.nome;
  const descricao = document.createElement('p');
  descricao.className = 'amarras__descricao';
  descricao.textContent = amarra.descricao;
  const video = document.createElement('a');
  video.className = 'amarras__video';
  video.href = `https://www.youtube.com/watch?v=${encodeURIComponent(amarra.videoId)}`;
  video.textContent = '▶ Abrir vídeo no YouTube';
  conteudo.append(nome, descricao, video);
  artigo.append(visual, conteudo);
  return artigo;
}

function inicializarPagina(): void {
  inicializarDadosDemonstrativos();
  const usuario = exigirAutenticacao();
  if (!usuario) return;
  montarCabecalhoJovem('Amarras', usuario);
  const introducao = document.querySelector<HTMLElement>('#texto-introducao');
  const lista = document.querySelector<HTMLElement>('#lista-amarras');
  if (introducao) introducao.textContent = textoIntroducaoAmarras;
  amarras.forEach((amarra) => lista?.append(criarCartao(amarra)));
}

document.addEventListener('DOMContentLoaded', inicializarPagina);
