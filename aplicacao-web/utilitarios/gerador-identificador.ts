export function gerarIdentificador(prefixo: string): string {
  const horario = Date.now().toString(36);
  const trechoAleatorio = Math.random().toString(36).slice(2, 7);
  return `${prefixo}-${horario}-${trechoAleatorio}`;
}
