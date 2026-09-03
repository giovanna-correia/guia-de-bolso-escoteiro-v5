import type { Usuario } from '../../modelos/usuario';

export function montarCabecalhoAdministrativo(tituloPagina: string, usuario: Usuario): void {
  const hospedeiro = document.querySelector<HTMLElement>('#cabecalho-administrativo');
  const gaveta = document.querySelector<HTMLElement>('#menu-administrativo__gaveta');
  if (!hospedeiro || !gaveta) return;
  const barra = document.createElement('header');
  barra.className = 'cabecalho-administrativo__barra';
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'cabecalho-administrativo__botao-menu';
  botao.setAttribute('aria-label', 'Abrir menu administrativo');
  botao.setAttribute('aria-expanded', 'false');
  botao.textContent = '☰';
  const textos = document.createElement('div');
  const titulo = document.createElement('h1');
  titulo.className = 'cabecalho-administrativo__titulo';
  titulo.textContent = tituloPagina;
  const usuarioTexto = document.createElement('p');
  usuarioTexto.className = 'cabecalho-administrativo__usuario';
  usuarioTexto.textContent = usuario.nomeCompleto;
  textos.append(titulo, usuarioTexto);
  barra.append(botao, textos);
  hospedeiro.append(barra);

  botao.addEventListener('click', () => {
    const aberto = !document.body.classList.contains('menu-administrativo--aberto');
    document.body.classList.toggle('menu-administrativo--aberto', aberto);
    botao.setAttribute('aria-expanded', String(aberto));
    gaveta.setAttribute('aria-hidden', String(!aberto));
  });
}
