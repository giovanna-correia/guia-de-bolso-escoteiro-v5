import type { PerfilUsuario, SituacaoUsuario, Usuario } from '../../../modelos/usuario';
import { listarPatrulhasPorSecao, buscarPatrulhaPorId } from '../../../repositorios/repositorio-patrulhas';
import { listarSecoes } from '../../../repositorios/repositorio-secoes';
import { adicionarUsuario, atualizarUsuario, buscarUsuarioPorId, buscarUsuarioPorRegistro } from '../../../repositorios/repositorio-usuarios';
import { inicializarPaginaAdministrativa } from '../../../servicos/servico-pagina-administrativa';
import { gerarIdentificador } from '../../../utilitarios/gerador-identificador';
import { obterParametro } from '../../../utilitarios/manipulador-url';
import { pinValido } from '../../../utilitarios/validador-formulario';

const campoNome = document.querySelector<HTMLInputElement>('#campo-nome'); const campoRegistro = document.querySelector<HTMLInputElement>('#campo-registro'); const campoPin = document.querySelector<HTMLInputElement>('#campo-pin');
const campoPerfil = document.querySelector<HTMLSelectElement>('#campo-perfil'); const campoSituacao = document.querySelector<HTMLSelectElement>('#campo-situacao'); const campoSecao = document.querySelector<HTMLSelectElement>('#campo-secao'); const campoPatrulha = document.querySelector<HTMLSelectElement>('#campo-patrulha');
let usuarioEmEdicao: Usuario | null = null;

function definirErro(id: string, mensagem: string): void { const elemento = document.querySelector<HTMLElement>(`#${id}`); if (elemento) elemento.textContent = mensagem; }
function renderizarPatrulhas(patrulhaSelecionada = ''): void {
  if (!campoPatrulha) return; campoPatrulha.replaceChildren(); const vazia = document.createElement('option'); vazia.value = ''; vazia.textContent = 'Não informada'; campoPatrulha.append(vazia);
  listarPatrulhasPorSecao(campoSecao?.value ?? '').forEach((patrulha) => { const opcao = document.createElement('option'); opcao.value = patrulha.id; opcao.textContent = patrulha.nome; opcao.selected = patrulha.id === patrulhaSelecionada; campoPatrulha.append(opcao); });
}
function validarFormulario(): boolean {
  if (!campoNome || !campoRegistro || !campoPin || !campoPerfil || !campoSecao || !campoPatrulha) return false;
  definirErro('erro-nome', campoNome.value.trim() ? '' : 'Informe o nome completo.'); definirErro('erro-registro', campoRegistro.value.trim() ? '' : 'Informe o registro.'); definirErro('erro-pin', pinValido(campoPin.value) ? '' : 'O PIN deve ter quatro dígitos.'); definirErro('erro-perfil', campoPerfil.value ? '' : 'Selecione o perfil.');
  const jovem = campoPerfil.value === 'jovem_beneficiario'; definirErro('erro-secao', !jovem || campoSecao.value ? '' : 'A seção é obrigatória para jovem.');
  const patrulha = buscarPatrulhaPorId(campoPatrulha.value || null); definirErro('erro-patrulha', !patrulha || patrulha.secaoId === campoSecao.value ? '' : 'A patrulha deve pertencer à seção selecionada.');
  const duplicado = buscarUsuarioPorRegistro(campoRegistro.value); if (duplicado && duplicado.id !== usuarioEmEdicao?.id) definirErro('erro-registro', 'Este registro já está cadastrado.');
  return !['erro-nome', 'erro-registro', 'erro-pin', 'erro-perfil', 'erro-secao', 'erro-patrulha'].some((id) => document.querySelector(`#${id}`)?.textContent);
}
function salvarMembro(evento: Event): void {
  evento.preventDefault(); if (!validarFormulario() || !campoNome || !campoRegistro || !campoPin || !campoPerfil || !campoSituacao || !campoSecao || !campoPatrulha) { definirErro('erro-geral', 'Corrija os campos indicados.'); return; }
  const usuario: Usuario = { id: usuarioEmEdicao?.id ?? gerarIdentificador('usuario'), nomeCompleto: campoNome.value.trim(), numeroRegistro: campoRegistro.value.trim(), pin: campoPin.value, perfil: campoPerfil.value as PerfilUsuario, secaoId: campoSecao.value || null, patrulhaId: campoPatrulha.value || null, situacao: campoSituacao.value as SituacaoUsuario, dataCadastro: usuarioEmEdicao?.dataCadastro ?? new Date().toISOString(), ultimoAcesso: usuarioEmEdicao?.ultimoAcesso ?? null };
  if (usuarioEmEdicao) atualizarUsuario(usuario); else adicionarUsuario(usuario);
  window.location.href = `../membro-detalhes/index.html?id=${encodeURIComponent(usuario.id)}&salvo=1`;
}
function carregarEdicao(): void {
  const id = obterParametro('id'); if (!id) return; usuarioEmEdicao = buscarUsuarioPorId(id); if (!usuarioEmEdicao) { definirErro('erro-geral', 'Registro não encontrado.'); return; }
  const titulo = document.querySelector<HTMLElement>('#titulo-formulario'); if (titulo) titulo.textContent = 'Editar membro';
  if (campoNome) campoNome.value = usuarioEmEdicao.nomeCompleto; if (campoRegistro) campoRegistro.value = usuarioEmEdicao.numeroRegistro; if (campoPin) campoPin.value = usuarioEmEdicao.pin; if (campoPerfil) campoPerfil.value = usuarioEmEdicao.perfil; if (campoSituacao) campoSituacao.value = usuarioEmEdicao.situacao; if (campoSecao) campoSecao.value = usuarioEmEdicao.secaoId ?? ''; renderizarPatrulhas(usuarioEmEdicao.patrulhaId ?? '');
}
function inicializarPagina(): void {
  if (!inicializarPaginaAdministrativa('Cadastro de Membro')) return;
  listarSecoes().filter((secao) => secao.situacao === 'ativa').forEach((secao) => { const opcao = document.createElement('option'); opcao.value = secao.id; opcao.textContent = secao.nome; campoSecao?.append(opcao); });
  carregarEdicao(); campoSecao?.addEventListener('change', () => renderizarPatrulhas()); campoPerfil?.addEventListener('change', () => { if (campoPerfil.value === 'escotista' && campoPatrulha) campoPatrulha.value = ''; }); document.querySelector('#formulario-membro')?.addEventListener('submit', salvarMembro);
}
document.addEventListener('DOMContentLoaded', inicializarPagina);
