export function formatarData(dataIso: string | null): string {
  if (!dataIso) return 'Não informada';
  const data = new Date(dataIso);
  if (Number.isNaN(data.getTime())) return 'Data inválida';
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(data);
}

export function formatarDataHora(dataIso: string | null): string {
  if (!dataIso) return 'Não informada';
  const data = new Date(dataIso);
  if (Number.isNaN(data.getTime())) return 'Data inválida';
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(data);
}

export function formatarValor(valor: number | null): string {
  if (valor === null) return 'Não informado';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

export function dataLocalParaIso(valor: string): string {
  return new Date(`${valor}T12:00:00`).toISOString();
}

export function isoParaCampoData(valor: string | null): string {
  if (!valor) return '';
  return valor.slice(0, 10);
}
