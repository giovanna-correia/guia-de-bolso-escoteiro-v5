import { montarCabecalhoJovem } from '../../../componentes/cabecalho-jovem/cabecalho-jovem';
import { nosEscoteiros, type NoEscoteiro } from '../../../dados/dados-nos';
import { exigirAutenticacao } from '../../../servicos/servico-autorizacao';
import { inicializarDadosDemonstrativos } from '../../../servicos/servico-dados-demonstrativos';
import { obterParametro } from '../../../utilitarios/manipulador-url';

function listaComTitulo(titulo: string, itens: string[]): DocumentFragment {
  const fragmento = document.createDocumentFragment();
  const subtitulo = document.createElement('h2');
  subtitulo.className = 'no-detalhes__subtitulo';
  subtitulo.textContent = titulo;
  const lista = document.createElement('ol');
  lista.className = 'no-detalhes__lista';
  if (titulo === 'Usos') lista.setAttribute('role', 'list');
  itens.forEach((texto) => {
    const item = document.createElement('li');
    item.textContent = texto;
    lista.append(item);
  });
  fragmento.append(subtitulo, lista);
  return fragmento;
}

function renderizarNo(noEscoteiro: NoEscoteiro, conteudo: HTMLElement): void {
  const titulo = document.createElement('h1');
  titulo.className = 'no-detalhes__titulo';
  titulo.textContent = noEscoteiro.nome;
  const video = document.createElement('a');
  video.className = 'no-detalhes__video';
  video.href = `https://www.youtube.com/watch?v=${encodeURIComponent(noEscoteiro.videoId)}`;
  video.textContent = '▶ Abrir vídeo demonstrativo no YouTube';
  const regra = document.createElement('p');
  regra.className = 'no-detalhes__regra';
  regra.textContent = `Regra de ouro: “${noEscoteiro.regra}”`;
  conteudo.append(titulo, video, regra, listaComTitulo('Como fazer', noEscoteiro.passos), listaComTitulo('Usos', noEscoteiro.usos));
  if (noEscoteiro.cuidado) {
    const cuidado = document.createElement('p');
    cuidado.className = 'no-detalhes__cuidado';
    cuidado.textContent = `Cuidado: ${noEscoteiro.cuidado}`;
    conteudo.append(cuidado);
  }
}

function inicializarPagina(): void {
  inicializarDadosDemonstrativos();
  const usuario = exigirAutenticacao();
  if (!usuario) return;
  montarCabecalhoJovem('Detalhe do nó', usuario);
  const conteudo = document.querySelector<HTMLElement>('#conteudo-no');
  if (!conteudo) return;
  const noEscoteiro = nosEscoteiros.find((noAtual) => noAtual.id === obterParametro('id'));
  if (!noEscoteiro) {
    const mensagem = document.createElement('p');
    mensagem.className = 'no-detalhes__vazio';
    mensagem.textContent = 'Nó não encontrado. Volte à listagem e escolha uma técnica disponível.';
    conteudo.append(mensagem);
    return;
  }
  renderizarNo(noEscoteiro, conteudo);
}

document.addEventListener('DOMContentLoaded', inicializarPagina);
