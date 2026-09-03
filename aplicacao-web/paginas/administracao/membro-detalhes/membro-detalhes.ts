import { criarIndicadorSituacao } from '../../../componentes/indicador-situacao/indicador-situacao';
import { mostrarMensagem } from '../../../componentes/mensagem-retorno/mensagem-retorno';
import { solicitarConfirmacao } from '../../../componentes/modal-confirmacao/modal-confirmacao';
import type { Usuario } from '../../../modelos/usuario';
import { buscarPatrulhaPorId } from '../../../repositorios/repositorio-patrulhas';
import { buscarSecaoPorId } from '../../../repositorios/repositorio-secoes';
import { atualizarUsuario, buscarUsuarioPorId } from '../../../repositorios/repositorio-usuarios';
import { inicializarPaginaAdministrativa } from '../../../servicos/servico-pagina-administrativa';
import { formatarDataHora } from '../../../utilitarios/formatador-data';
import { obterParametro } from '../../../utilitarios/manipulador-url';
import { pinValido } from '../../../utilitarios/validador-formulario';

let usuarioAtual: Usuario | null = null;

function renderizarDetalhes(): void {
  const area = document.querySelector<HTMLElement>('#detalhes-membro'); if (!area) return; area.replaceChildren();
  if (!usuarioAtual) { const vazio = document.createElement('p'); vazio.className = 'membro-detalhes__vazio'; vazio.textContent = 'Registro não encontrado. Volte à listagem de membros.'; area.append(vazio); return; }
  const topo = document.createElement('header'); topo.className = 'membro-detalhes__topo'; const titulo = document.createElement('h2'); titulo.className = 'membro-detalhes__titulo'; titulo.textContent = usuarioAtual.nomeCompleto; topo.append(titulo, criarIndicadorSituacao(usuarioAtual.situacao));
  const dados = document.createElement('dl'); dados.className = 'membro-detalhes__dados'; const valores: Array<[string, string]> = [['Registro escoteiro', usuarioAtual.numeroRegistro], ['Perfil', usuarioAtual.perfil === 'escotista' ? 'Escotista' : 'Jovem beneficiário'], ['Seção', buscarSecaoPorId(usuarioAtual.secaoId)?.nome ?? 'Não informada'], ['Patrulha/equipe', buscarPatrulhaPorId(usuarioAtual.patrulhaId)?.nome ?? 'Não informada'], ['Data de cadastro', formatarDataHora(usuarioAtual.dataCadastro)], ['Último acesso', formatarDataHora(usuarioAtual.ultimoAcesso)]];
  valores.forEach(([rotulo, valor]) => { const grupo = document.createElement('div'); const termo = document.createElement('dt'); termo.textContent = rotulo; const descricao = document.createElement('dd'); descricao.textContent = valor; grupo.append(termo, descricao); dados.append(grupo); });
  const acoes = document.createElement('footer'); acoes.className = 'membro-detalhes__acoes'; const editar = document.createElement('a'); editar.href = `../membro-formulario/index.html?id=${encodeURIComponent(usuarioAtual.id)}`; editar.textContent = 'Editar'; const pin = document.createElement('button'); pin.type = 'button'; pin.textContent = 'Redefinir PIN'; pin.addEventListener('click', () => document.querySelector<HTMLDialogElement>('#dialogo-pin')?.showModal()); const situacao = document.createElement('button'); situacao.type = 'button'; situacao.textContent = usuarioAtual.situacao === 'ativo' ? 'Desativar acesso' : 'Ativar acesso'; situacao.addEventListener('click', () => void alternarSituacao()); acoes.append(editar, pin, situacao); area.append(topo, dados, acoes);
}
async function alternarSituacao(): Promise<void> {
  if (!usuarioAtual) return; if (usuarioAtual.id === 'usuario-escotista' && usuarioAtual.situacao === 'ativo') { mostrarMensagem('O escotista administrador demonstrativo não pode ser desativado.', 'erro'); return; }
  const proxima = usuarioAtual.situacao === 'ativo' ? 'inativo' : 'ativo'; const confirmado = await solicitarConfirmacao('Alterar situação?', `O acesso ficará ${proxima}.`); if (!confirmado) { mostrarMensagem('Ação cancelada.', 'informacao'); return; }
  usuarioAtual = { ...usuarioAtual, situacao: proxima }; atualizarUsuario(usuarioAtual); renderizarDetalhes(); mostrarMensagem('Membro atualizado com sucesso.', 'sucesso');
}
function salvarNovoPin(evento: Event): void {
  evento.preventDefault(); const campo = document.querySelector<HTMLInputElement>('#campo-novo-pin'); const erro = document.querySelector<HTMLElement>('#erro-novo-pin'); if (!campo || !erro || !usuarioAtual) return;
  if (!pinValido(campo.value)) { erro.textContent = 'O PIN deve conter exatamente quatro dígitos.'; return; } usuarioAtual = { ...usuarioAtual, pin: campo.value }; atualizarUsuario(usuarioAtual); campo.value = ''; erro.textContent = ''; document.querySelector<HTMLDialogElement>('#dialogo-pin')?.close(); mostrarMensagem('PIN redefinido com sucesso.', 'sucesso');
}
function inicializarPagina(): void {
  if (!inicializarPaginaAdministrativa('Detalhes do Membro')) return; const id = obterParametro('id'); usuarioAtual = id ? buscarUsuarioPorId(id) : null; renderizarDetalhes();
  if (obterParametro('salvo') === '1') mostrarMensagem('Membro salvo com sucesso.', 'sucesso'); document.querySelector('#cancelar-pin')?.addEventListener('click', () => document.querySelector<HTMLDialogElement>('#dialogo-pin')?.close()); document.querySelector('#formulario-pin')?.addEventListener('submit', salvarNovoPin);
}
document.addEventListener('DOMContentLoaded', inicializarPagina);
