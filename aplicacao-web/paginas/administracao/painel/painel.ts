import { listarAtividades } from '../../../repositorios/repositorio-atividades';
import { listarManutencoes } from '../../../repositorios/repositorio-manutencoes';
import { listarMateriais, buscarMaterialPorId } from '../../../repositorios/repositorio-materiais';
import { listarMovimentacoes } from '../../../repositorios/repositorio-movimentacoes';
import { listarNecessidades } from '../../../repositorios/repositorio-necessidades';
import { buscarUsuarioPorId, listarUsuarios } from '../../../repositorios/repositorio-usuarios';
import { calcularQuantidadeDisponivel } from '../../../servicos/servico-disponibilidade';
import { inicializarPaginaAdministrativa } from '../../../servicos/servico-pagina-administrativa';
import { formatarDataHora } from '../../../utilitarios/formatador-data';
import { textoSituacao } from '../../../utilitarios/criador-html';

function renderizarIndicadores(): void {
  const usuarios = listarUsuarios();
  const materiais = listarMateriais();
  const atividades = listarAtividades();
  const manutencoes = listarManutencoes();
  const necessidades = listarNecessidades();
  const hoje = new Date();
  const valores: Array<[string, number, string]> = [
    ['Membros ativos', usuarios.filter((usuario) => usuario.situacao === 'ativo').length, '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.7-4.2 3.1-6.3 7-6.3s6.3 2.1 7 6.3"/>'],
    ['Materiais cadastrados', materiais.filter((material) => material.estado !== 'baixado').length, '<path d="m4 7 8-4 8 4-8 4-8-4Zm0 0v10l8 4 8-4V7M12 11v10"/>'],
    ['Unidades disponíveis', materiais.reduce((total, material) => total + calcularQuantidadeDisponivel(material.id), 0), '<path d="M4 5h16v14H4zM4 10h16M8 15l2 2 5-5"/>'],
    ['Atividades futuras', atividades.filter((atividade) => new Date(atividade.dataSaida) >= hoje && !['concluida', 'cancelada'].includes(atividade.situacao)).length, '<path d="M5 5h14v15H5zM8 3v4m8-4v4M5 10h14m-10 4h2m2 0h2"/>'],
    ['Materiais em manutenção', manutencoes.filter((manutencao) => ['pendente', 'em_andamento'].includes(manutencao.situacao)).length, '<path d="M14.5 6.5a4 4 0 0 0-5-5l2.2 2.2-2.8 2.8-2.2-2.2a4 4 0 0 0 5 5L20 17.6 17.6 20l-8.3-8.3"/>'],
    ['Necessidades abertas', necessidades.filter((necessidade) => !['recebida', 'cancelada'].includes(necessidade.situacao)).length, '<path d="M3 4h2l2 11h10l3-8H6m3 12a1 1 0 1 0 0 .1m8-.1a1 1 0 1 0 0 .1M12 9v4m-2-2h4"/>']
  ];
  const area = document.querySelector<HTMLElement>('#indicadores');
  valores.forEach(([rotulo, valor, desenhoIcone]) => {
    const cartao = document.createElement('article');
    cartao.className = 'painel-administrativo__indicador';
    const icone = document.createElement('span');
    icone.className = 'painel-administrativo__indicador-icone';
    icone.setAttribute('aria-hidden', 'true');
    icone.innerHTML = `<svg viewBox="0 0 24 24">${desenhoIcone}</svg>`;
    const numero = document.createElement('strong');
    numero.textContent = String(valor);
    const texto = document.createElement('span');
    texto.textContent = rotulo;
    cartao.append(icone, numero, texto);
    area?.append(cartao);
  });
}

function renderizarAlertas(): void {
  const textos: string[] = [];
  listarMateriais().filter((material) => material.estado === 'aguardando_secagem').forEach((material) => textos.push(`${material.nome} aguarda secagem.`));
  listarAtividades().filter((atividade) => atividade.situacao === 'planejamento').forEach((atividade) => textos.push(`${atividade.nome} ainda possui preparação pendente.`));
  listarManutencoes().filter((manutencao) => manutencao.situacao === 'pendente').forEach((manutencao) => textos.push(`Manutenção pendente: ${buscarMaterialPorId(manutencao.materialId)?.nome ?? 'material não encontrado'}.`));
  listarNecessidades().filter((necessidade) => necessidade.prioridade === 'urgente' && !['recebida', 'cancelada'].includes(necessidade.situacao)).forEach((necessidade) => textos.push(`Compra urgente: ${necessidade.nomeMaterial}.`));
  const area = document.querySelector<HTMLElement>('#alertas');
  if (textos.length === 0) {
    const vazio = document.createElement('p');
    vazio.className = 'painel-administrativo__vazio';
    vazio.textContent = 'Nenhum alerta administrativo no momento.';
    area?.append(vazio);
    return;
  }
  textos.forEach((texto) => {
    const alerta = document.createElement('article');
    alerta.className = 'painel-administrativo__alerta';
    alerta.textContent = texto;
    area?.append(alerta);
  });
}

function renderizarMovimentacoes(): void {
  const area = document.querySelector<HTMLElement>('#movimentacoes');
  const movimentacoes = listarMovimentacoes().sort((a, b) => b.data.localeCompare(a.data)).slice(0, 5);
  if (movimentacoes.length === 0) {
    const vazio = document.createElement('p');
    vazio.className = 'painel-administrativo__vazio';
    vazio.textContent = 'Nenhuma movimentação registrada.';
    area?.append(vazio);
    return;
  }
  movimentacoes.forEach((movimentacao) => {
    const artigo = document.createElement('article');
    artigo.className = 'painel-administrativo__movimentacao';
    const principal = document.createElement('strong');
    principal.textContent = `${textoSituacao(movimentacao.tipo)} · ${buscarMaterialPorId(movimentacao.materialId)?.nome ?? 'Material não encontrado'}`;
    const detalhe = document.createElement('small');
    detalhe.textContent = `${movimentacao.quantidade} unidade(s) · ${buscarUsuarioPorId(movimentacao.responsavelId)?.nomeCompleto ?? 'Responsável não encontrado'} · ${formatarDataHora(movimentacao.data)}`;
    artigo.append(principal, detalhe);
    area?.append(artigo);
  });
}

function inicializarPagina(): void {
  const usuario = inicializarPaginaAdministrativa('Painel Geral');
  if (!usuario) return;
  const saudacao = document.querySelector<HTMLElement>('#saudacao-painel');
  if (saudacao) {
    const primeiroNome = usuario.nomeCompleto.trim().split(/\s+/)[0] ?? '';
    saudacao.textContent = primeiroNome ? `Olá, ${primeiroNome}. Seu grupo em um só lugar.` : 'Seu grupo em um só lugar.';
  }
  renderizarIndicadores();
  renderizarAlertas();
  renderizarMovimentacoes();
}

document.addEventListener('DOMContentLoaded', inicializarPagina);
