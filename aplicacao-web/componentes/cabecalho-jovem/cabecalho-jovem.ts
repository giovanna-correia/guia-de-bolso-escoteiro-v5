import type { Usuario } from '../../modelos/usuario';
import { encerrarSessao } from '../../servicos/servico-sessao';
import { obterCaminhoRaiz } from '../../utilitarios/manipulador-url';

const itensMenu = [
  ['Início', 'paginas/jovem/inicio/index.html'], ['Nós', 'paginas/jovem/nos-listagem/index.html'],
  ['Amarras', 'paginas/jovem/amarras/index.html'], ['Leis Escoteiras', 'paginas/jovem/leis/index.html'],
  ['Acampamento', 'paginas/jovem/acampamento/index.html'], ['Bússola', 'paginas/jovem/bussola/index.html'],
  ['Código Morse', 'paginas/jovem/morse/index.html'], ['Sobre', 'paginas/jovem/sobre/index.html']
];

export function montarCabecalhoJovem(tituloPagina: string, usuario: Usuario): void {
  const hospedeiro = document.querySelector<HTMLElement>('#cabecalho-jovem');
  if (!hospedeiro) return;
  const raiz = obterCaminhoRaiz();
  const barra = document.createElement('header');
  barra.className = 'cabecalho-jovem__barra';
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'cabecalho-jovem__botao-menu';
  botao.setAttribute('aria-label', 'Abrir menu');
  botao.setAttribute('aria-expanded', 'false');
  botao.textContent = '☰';
  const titulo = document.createElement('strong');
  titulo.className = 'cabecalho-jovem__titulo';
  titulo.textContent = tituloPagina;
  barra.append(botao, titulo);

  const gaveta = document.createElement('aside');
  gaveta.className = 'cabecalho-jovem__gaveta';
  gaveta.setAttribute('aria-hidden', 'true');
  const fechar = document.createElement('button');
  fechar.type = 'button';
  fechar.className = 'cabecalho-jovem__fechar';
  fechar.setAttribute('aria-label', 'Fechar menu');
  fechar.textContent = '×';
  const identificacao = document.createElement('p');
  identificacao.className = 'cabecalho-jovem__usuario';
  identificacao.textContent = usuario.nomeCompleto;
  const navegacao = document.createElement('nav');
  navegacao.className = 'cabecalho-jovem__navegacao';
  navegacao.setAttribute('aria-label', 'Seções do Guia de Bolso');
  itensMenu.forEach(([rotulo, caminho]) => {
    if (!rotulo || !caminho) return;
    const link = document.createElement('a');
    link.className = 'cabecalho-jovem__link';
    link.href = `${raiz}${caminho}`;
    link.textContent = rotulo;
    navegacao.append(link);
  });
  if (usuario.perfil === 'escotista') {
    const painel = document.createElement('a');
    painel.className = 'cabecalho-jovem__link cabecalho-jovem__link--painel';
    painel.href = `${raiz}paginas/administracao/painel/index.html`;
    painel.textContent = 'Voltar ao painel administrativo';
    navegacao.append(painel);
  }
  const sair = document.createElement('button');
  sair.type = 'button';
  sair.className = 'cabecalho-jovem__sair';
  sair.textContent = 'Sair';
  gaveta.append(fechar, identificacao, navegacao, sair);
  const fundo = document.createElement('button');
  fundo.type = 'button';
  fundo.className = 'cabecalho-jovem__fundo';
  fundo.setAttribute('aria-label', 'Fechar menu');
  hospedeiro.append(barra, gaveta, fundo);

  function alternarMenu(aberto: boolean): void {
    document.body.classList.toggle('cabecalho-jovem--menu-aberto', aberto);
    botao.setAttribute('aria-expanded', String(aberto));
    gaveta.setAttribute('aria-hidden', String(!aberto));
    if (aberto) fechar.focus(); else botao.focus();
  }
  botao.addEventListener('click', () => alternarMenu(true));
  fechar.addEventListener('click', () => alternarMenu(false));
  fundo.addEventListener('click', () => alternarMenu(false));
  sair.addEventListener('click', () => {
    encerrarSessao();
    window.location.replace(`${raiz}paginas/autenticacao/login/index.html`);
  });
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && document.body.classList.contains('cabecalho-jovem--menu-aberto')) alternarMenu(false);
  });
}
