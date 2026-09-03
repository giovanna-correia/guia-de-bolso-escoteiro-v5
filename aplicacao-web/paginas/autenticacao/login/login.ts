import { mostrarMensagem } from '../../../componentes/mensagem-retorno/mensagem-retorno';
import { autenticar } from '../../../servicos/servico-autenticacao';
import { inicializarDadosDemonstrativos } from '../../../servicos/servico-dados-demonstrativos';
import { obterUsuarioLogado } from '../../../servicos/servico-sessao';
import { obterCaminhoRaiz } from '../../../utilitarios/manipulador-url';
import { pinValido } from '../../../utilitarios/validador-formulario';

const formulario = document.querySelector<HTMLFormElement>('#formulario-login');
const campoRegistro = document.querySelector<HTMLInputElement>('#campo-numero-registro');
const campoPin = document.querySelector<HTMLInputElement>('#campo-pin');
const erroRegistro = document.querySelector<HTMLElement>('#erro-registro');
const erroPin = document.querySelector<HTMLElement>('#erro-pin');
const erroLogin = document.querySelector<HTMLElement>('#erro-login');

function redirecionarUsuario(): void {
  const usuario = obterUsuarioLogado();
  if (!usuario) return;
  const destino = usuario.perfil === 'escotista'
    ? 'paginas/administracao/painel/index.html'
    : 'paginas/jovem/inicio/index.html';
  window.location.replace(`${obterCaminhoRaiz()}${destino}`);
}

function validarCampos(): boolean {
  if (!campoRegistro || !campoPin || !erroRegistro || !erroPin) return false;
  erroRegistro.textContent = campoRegistro.value.trim() ? '' : 'Informe o registro escoteiro.';
  erroPin.textContent = pinValido(campoPin.value) ? '' : 'O PIN deve conter exatamente quatro dígitos.';
  return !erroRegistro.textContent && !erroPin.textContent;
}

function enviarFormulario(evento: Event): void {
  evento.preventDefault();
  if (!campoRegistro || !campoPin || !erroLogin || !validarCampos()) return;
  erroLogin.textContent = '';
  const resultado = autenticar(campoRegistro.value, campoPin.value);
  if (!resultado.sucesso) {
    erroLogin.textContent = resultado.mensagem;
    mostrarMensagem(resultado.mensagem, 'erro');
    return;
  }
  redirecionarUsuario();
}

function inicializarPagina(): void {
  inicializarDadosDemonstrativos();
  if (obterUsuarioLogado()) {
    redirecionarUsuario();
    return;
  }
  formulario?.addEventListener('submit', enviarFormulario);
}

document.addEventListener('DOMContentLoaded', inicializarPagina);
