import { montarCabecalhoJovem } from '../../../componentes/cabecalho-jovem/cabecalho-jovem';
import { mostrarMensagem } from '../../../componentes/mensagem-retorno/mensagem-retorno';
import { buscarSecaoPorId } from '../../../repositorios/repositorio-secoes';
import { exigirAutenticacao } from '../../../servicos/servico-autorizacao';
import { inicializarDadosDemonstrativos } from '../../../servicos/servico-dados-demonstrativos';

function inicializarPagina(): void {
  inicializarDadosDemonstrativos();
  const usuario = exigirAutenticacao();
  if (!usuario) return;
  montarCabecalhoJovem('Guia de Bolso', usuario);
  const saudacao = document.querySelector<HTMLElement>('#saudacao');
  const nomeSecao = document.querySelector<HTMLElement>('#nome-secao');
  const primeiroNome = usuario.nomeCompleto.split(' ')[0] ?? usuario.nomeCompleto;
  if (saudacao) saudacao.textContent = `Olá, ${primeiroNome}!`;
  if (nomeSecao) nomeSecao.textContent = buscarSecaoPorId(usuario.secaoId)?.nome ?? '';
  if (new URLSearchParams(window.location.search).get('aviso') === 'acesso-negado') {
    mostrarMensagem('Acesso não autorizado. Esta área é exclusiva para escotistas.', 'aviso');
    window.history.replaceState({}, '', window.location.pathname);
  }
}

document.addEventListener('DOMContentLoaded', inicializarPagina);
