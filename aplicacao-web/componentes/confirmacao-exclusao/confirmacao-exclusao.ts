import './confirmacao-exclusao.css';
import { obterUsuarioLogado } from '../../servicos/servico-sessao';
import { solicitarConfirmacao } from '../modal-confirmacao/modal-confirmacao';

export async function confirmarExclusao(titulo: string, impacto: string): Promise<boolean> {
  if (!await solicitarConfirmacao(titulo, impacto, 'Continuar')) return false;
  const usuario = obterUsuarioLogado();
  if (!usuario) return false;
  return new Promise((resolver) => {
    const dialogo = document.createElement('dialog'); dialogo.className = 'confirmacao-exclusao';
    const formulario = document.createElement('form'); formulario.className = 'confirmacao-exclusao__formulario';
    const h2 = document.createElement('h2'); h2.className = 'confirmacao-exclusao__titulo'; h2.textContent = 'Confirme seu PIN';
    const texto = document.createElement('p'); texto.className = 'confirmacao-exclusao__texto'; texto.textContent = `Digite o PIN da sessão de ${usuario.nomeCompleto}. Outro PIN não será aceito.`;
    const grupo = document.createElement('div'); grupo.className = 'confirmacao-exclusao__grupo'; const label = document.createElement('label'); label.htmlFor = 'confirmacao-exclusao-pin'; label.textContent = 'PIN *'; const input = document.createElement('input'); input.id = 'confirmacao-exclusao-pin'; input.type = 'password'; input.inputMode = 'numeric'; input.maxLength = 4; input.required = true; const erro = document.createElement('p'); erro.className = 'confirmacao-exclusao__erro';
    const acoes = document.createElement('footer'); acoes.className = 'confirmacao-exclusao__acoes'; const cancelar = document.createElement('button'); cancelar.type = 'button'; cancelar.className = 'confirmacao-exclusao__cancelar'; cancelar.textContent = 'Cancelar'; const excluir = document.createElement('button'); excluir.type = 'submit'; excluir.className = 'confirmacao-exclusao__excluir'; excluir.textContent = 'Excluir definitivamente';
    grupo.append(label, input); acoes.append(cancelar, excluir); formulario.append(h2, texto, grupo, erro, acoes); dialogo.append(formulario); document.body.append(dialogo);
    let concluido = false; const concluir = (resultado: boolean) => { if (concluido) return; concluido = true; dialogo.close(); dialogo.remove(); resolver(resultado); };
    cancelar.addEventListener('click', () => concluir(false)); dialogo.addEventListener('cancel', (evento) => { evento.preventDefault(); concluir(false); }); formulario.addEventListener('submit', (evento) => { evento.preventDefault(); if (input.value !== usuario.pin) { erro.textContent = 'PIN incorreto para o usuário desta sessão.'; input.value = ''; input.focus(); return; } concluir(true); });
    dialogo.showModal(); input.focus();
  });
}
