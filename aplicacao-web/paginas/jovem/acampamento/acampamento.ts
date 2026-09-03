import { montarCabecalhoJovem } from '../../../componentes/cabecalho-jovem/cabecalho-jovem';
import { mostrarMensagem } from '../../../componentes/mensagem-retorno/mensagem-retorno';
import { solicitarConfirmacao } from '../../../componentes/modal-confirmacao/modal-confirmacao';
import type { ItemChecklist } from '../../../compartilhado/tipos/tipos-comuns';
import { textoIntroducaoAcampamento } from '../../../dados/dados-acampamento';
import { listarItensChecklist, salvarItensChecklist } from '../../../repositorios/repositorio-checklist';
import { exigirAutenticacao } from '../../../servicos/servico-autorizacao';
import { inicializarDadosDemonstrativos } from '../../../servicos/servico-dados-demonstrativos';
import { gerarIdentificador } from '../../../utilitarios/gerador-identificador';
import { normalizarTexto } from '../../../utilitarios/normalizador-texto';

const campoPesquisa = document.querySelector<HTMLInputElement>('#campo-pesquisa');
const lista = document.querySelector<HTMLElement>('#lista-itens');
const resumo = document.querySelector<HTMLElement>('#resumo-lista');
const dialogo = document.querySelector<HTMLDialogElement>('#dialogo-adicionar');
const formulario = document.querySelector<HTMLFormElement>('#formulario-adicionar');
const campoNovoItem = document.querySelector<HTMLInputElement>('#campo-novo-item');
const erroNovoItem = document.querySelector<HTMLElement>('#erro-novo-item');
let itens: ItemChecklist[] = [];

function salvarERenderizar(): void {
  salvarItensChecklist(itens);
  renderizarLista();
}

function alternarMarcacao(id: string): void {
  itens = itens.map((item) => item.id === id ? { ...item, marcado: !item.marcado } : item);
  salvarERenderizar();
}

async function excluirItem(id: string): Promise<void> {
  const item = itens.find((itemAtual) => itemAtual.id === id);
  if (!item) return;
  const confirmado = await solicitarConfirmacao('Excluir item?', `“${item.nome}” será removido permanentemente do seu checklist.`, 'Excluir');
  if (!confirmado) {
    mostrarMensagem('Ação cancelada.', 'informacao');
    return;
  }
  itens = itens.filter((itemAtual) => itemAtual.id !== id);
  salvarERenderizar();
  mostrarMensagem('Item excluído com sucesso.', 'sucesso');
}

function criarCartao(item: ItemChecklist): HTMLElement {
  const artigo = document.createElement('article');
  artigo.className = 'acampamento__item';
  const marcar = document.createElement('button');
  marcar.type = 'button';
  marcar.className = `acampamento__marcador${item.marcado ? ' acampamento__marcador--marcado' : ''}`;
  marcar.setAttribute('aria-label', `${item.marcado ? 'Desmarcar' : 'Marcar'} ${item.nome}`);
  marcar.textContent = item.marcado ? '✓' : '';
  marcar.addEventListener('click', () => alternarMarcacao(item.id));
  const nome = document.createElement('span');
  nome.className = `acampamento__nome${item.marcado ? ' acampamento__nome--marcado' : ''}`;
  nome.textContent = item.nome;
  const excluir = document.createElement('button');
  excluir.type = 'button';
  excluir.className = 'acampamento__excluir';
  excluir.setAttribute('aria-label', `Excluir ${item.nome}`);
  excluir.textContent = '×';
  excluir.addEventListener('click', () => void excluirItem(item.id));
  artigo.append(marcar, nome, excluir);
  return artigo;
}

function renderizarLista(): void {
  if (!lista) return;
  const termo = normalizarTexto(campoPesquisa?.value ?? '');
  const filtrados = itens.filter((item) => normalizarTexto(item.nome).includes(termo));
  lista.replaceChildren();
  if (filtrados.length === 0) {
    const vazio = document.createElement('p');
    vazio.className = 'acampamento__vazio';
    vazio.textContent = termo ? 'Nenhum item encontrado. Ajuste a pesquisa ou adicione um novo item.' : 'Nenhum item cadastrado. Adicione o primeiro item da mochila.';
    lista.append(vazio);
  } else filtrados.forEach((item) => lista.append(criarCartao(item)));
  const marcados = itens.filter((item) => item.marcado).length;
  if (resumo) resumo.textContent = `${marcados} de ${itens.length} itens marcados.`;
}

function adicionarItem(evento: Event): void {
  evento.preventDefault();
  if (!campoNovoItem || !erroNovoItem) return;
  const nome = campoNovoItem.value.trim();
  if (!nome) {
    erroNovoItem.textContent = 'Escreva o nome do item.';
    return;
  }
  if (itens.some((item) => normalizarTexto(item.nome) === normalizarTexto(nome))) {
    erroNovoItem.textContent = 'Este item já está na lista.';
    return;
  }
  itens.push({ id: gerarIdentificador('checklist'), nome, marcado: false, personalizado: true });
  salvarERenderizar();
  campoNovoItem.value = '';
  erroNovoItem.textContent = '';
  dialogo?.close();
  mostrarMensagem('Item salvo com sucesso.', 'sucesso');
}

function registrarEventos(): void {
  campoPesquisa?.addEventListener('input', renderizarLista);
  document.querySelector('#botao-adicionar')?.addEventListener('click', () => {
    dialogo?.showModal();
    campoNovoItem?.focus();
  });
  document.querySelector('#botao-cancelar')?.addEventListener('click', () => {
    if (erroNovoItem) erroNovoItem.textContent = '';
    dialogo?.close();
  });
  document.querySelector('#botao-resetar')?.addEventListener('click', () => {
    itens = itens.map((item) => ({ ...item, marcado: false }));
    salvarERenderizar();
    mostrarMensagem('Marcações resetadas. Os itens foram preservados.', 'sucesso');
  });
  formulario?.addEventListener('submit', adicionarItem);
}

function inicializarPagina(): void {
  inicializarDadosDemonstrativos();
  const usuario = exigirAutenticacao();
  if (!usuario) return;
  montarCabecalhoJovem('Acampamento', usuario);
  const introducao = document.querySelector<HTMLElement>('#texto-introducao');
  if (introducao) introducao.textContent = textoIntroducaoAcampamento;
  itens = listarItensChecklist();
  registrarEventos();
  renderizarLista();
}

document.addEventListener('DOMContentLoaded', inicializarPagina);
