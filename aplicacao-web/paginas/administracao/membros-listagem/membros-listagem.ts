import { criarIndicadorSituacao } from '../../../componentes/indicador-situacao/indicador-situacao';
import { mostrarMensagem } from '../../../componentes/mensagem-retorno/mensagem-retorno';
import { solicitarConfirmacao } from '../../../componentes/modal-confirmacao/modal-confirmacao';
import type { Usuario } from '../../../modelos/usuario';
import { buscarPatrulhaPorId } from '../../../repositorios/repositorio-patrulhas';
import { buscarSecaoPorId, listarSecoes } from '../../../repositorios/repositorio-secoes';
import { atualizarUsuario, listarUsuarios } from '../../../repositorios/repositorio-usuarios';
import { inicializarPaginaAdministrativa } from '../../../servicos/servico-pagina-administrativa';
import { normalizarTexto } from '../../../utilitarios/normalizador-texto';

function criarCartao(usuario: Usuario): HTMLElement {
  const artigo = document.createElement('article');
  artigo.className = 'membros-listagem__cartao';
  const cabecalho = document.createElement('header');
  const nome = document.createElement('h3');
  nome.className = 'membros-listagem__nome';
  nome.textContent = usuario.nomeCompleto;
  cabecalho.append(nome, criarIndicadorSituacao(usuario.situacao));
  const dados = document.createElement('dl');
  dados.className = 'membros-listagem__dados';
  const valores: Array<[string, string]> = [
    ['Registro', usuario.numeroRegistro], ['Perfil', usuario.perfil === 'escotista' ? 'Escotista' : 'Jovem beneficiário'],
    ['Seção', buscarSecaoPorId(usuario.secaoId)?.nome ?? 'Não informada'], ['Patrulha/equipe', buscarPatrulhaPorId(usuario.patrulhaId)?.nome ?? 'Não informada']
  ];
  valores.forEach(([rotulo, valor]) => {
    const grupo = document.createElement('div'); const termo = document.createElement('dt'); const descricao = document.createElement('dd');
    termo.textContent = rotulo; descricao.textContent = valor; grupo.append(termo, descricao); dados.append(grupo);
  });
  const acoes = document.createElement('footer');
  acoes.className = 'membros-listagem__acoes';
  const visualizar = document.createElement('a'); visualizar.href = `../membro-detalhes/index.html?id=${encodeURIComponent(usuario.id)}`; visualizar.textContent = 'Visualizar';
  const editar = document.createElement('a'); editar.href = `../membro-formulario/index.html?id=${encodeURIComponent(usuario.id)}`; editar.textContent = 'Editar';
  const alternar = document.createElement('button'); alternar.type = 'button'; alternar.textContent = usuario.situacao === 'ativo' ? 'Desativar' : 'Ativar';
  alternar.addEventListener('click', () => void alternarSituacao(usuario));
  acoes.append(visualizar, editar, alternar); artigo.append(cabecalho, dados, acoes); return artigo;
}

async function alternarSituacao(usuario: Usuario): Promise<void> {
  if (usuario.id === 'usuario-escotista' && usuario.situacao === 'ativo') {
    mostrarMensagem('O escotista administrador demonstrativo não pode ser desativado.', 'erro'); return;
  }
  const proxima = usuario.situacao === 'ativo' ? 'inativo' : 'ativo';
  const confirmado = await solicitarConfirmacao(`${proxima === 'ativo' ? 'Ativar' : 'Desativar'} membro?`, `O acesso de ${usuario.nomeCompleto} ficará ${proxima}.`);
  if (!confirmado) { mostrarMensagem('Ação cancelada.', 'informacao'); return; }
  atualizarUsuario({ ...usuario, situacao: proxima });
  mostrarMensagem('Membro atualizado com sucesso.', 'sucesso'); renderizarLista();
}

function renderizarLista(): void {
  const pesquisa = document.querySelector<HTMLInputElement>('#filtro-pesquisa')?.value ?? '';
  const perfil = document.querySelector<HTMLSelectElement>('#filtro-perfil')?.value ?? '';
  const secao = document.querySelector<HTMLSelectElement>('#filtro-secao')?.value ?? '';
  const situacao = document.querySelector<HTMLSelectElement>('#filtro-situacao')?.value ?? '';
  const termo = normalizarTexto(pesquisa);
  const usuarios = listarUsuarios().filter((usuario) => {
    const correspondeTexto = normalizarTexto(`${usuario.nomeCompleto} ${usuario.numeroRegistro}`).includes(termo);
    return correspondeTexto && (!perfil || usuario.perfil === perfil) && (!secao || usuario.secaoId === secao) && (!situacao || usuario.situacao === situacao);
  });
  const lista = document.querySelector<HTMLElement>('#lista-membros');
  const resumo = document.querySelector<HTMLElement>('#resumo-membros');
  lista?.replaceChildren();
  if (usuarios.length === 0) { const vazio = document.createElement('p'); vazio.className = 'membros-listagem__vazio'; vazio.textContent = 'Nenhum membro encontrado. Ajuste os filtros ou cadastre o primeiro membro.'; lista?.append(vazio); }
  else usuarios.forEach((usuario) => lista?.append(criarCartao(usuario)));
  if (resumo) resumo.textContent = `${usuarios.length} membro(s) encontrado(s).`;
}

function inicializarPagina(): void {
  if (!inicializarPaginaAdministrativa('Membros e Acessos')) return;
  const filtroSecao = document.querySelector<HTMLSelectElement>('#filtro-secao');
  listarSecoes().forEach((secao) => { const opcao = document.createElement('option'); opcao.value = secao.id; opcao.textContent = secao.nome; filtroSecao?.append(opcao); });
  document.querySelectorAll<HTMLInputElement | HTMLSelectElement>('.membros-listagem__filtros input, .membros-listagem__filtros select').forEach((campo) => campo.addEventListener('input', renderizarLista));
  renderizarLista();
}

document.addEventListener('DOMContentLoaded', inicializarPagina);
