import type { TipoMensagem } from '../../compartilhado/tipos/tipos-comuns';

export function mostrarMensagem(mensagem: string, tipo: TipoMensagem = 'informacao'): void {
  let regiao = document.querySelector<HTMLElement>('#mensagem-retorno');
  if (!regiao) {
    regiao = document.createElement('p');
    regiao.id = 'mensagem-retorno';
    regiao.className = 'mensagem-retorno';
    regiao.setAttribute('role', 'status');
    regiao.setAttribute('aria-live', 'polite');
    document.body.append(regiao);
  }
  regiao.textContent = mensagem;
  regiao.className = `mensagem-retorno mensagem-retorno--${tipo} mensagem-retorno--visivel`;
  window.setTimeout(() => regiao?.classList.remove('mensagem-retorno--visivel'), 4500);
}
