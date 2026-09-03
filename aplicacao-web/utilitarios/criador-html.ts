export function escaparHtml(valor: string | number | null): string {
  if (valor === null) return '';
  return String(valor)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function textoSituacao(valor: string): string {
  return valor.replaceAll('_', ' ').replace(/\b\w/g, (letra) => letra.toLocaleUpperCase('pt-BR'));
}
