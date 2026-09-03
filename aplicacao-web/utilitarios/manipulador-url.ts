export function obterParametro(nome: string): string | null {
  return new URLSearchParams(window.location.search).get(nome);
}

export function obterCaminhoRaiz(): string {
  return document.body.dataset.raiz ?? '../../../';
}

export function navegarPara(caminho: string): void {
  window.location.href = `${obterCaminhoRaiz()}${caminho}`;
}
