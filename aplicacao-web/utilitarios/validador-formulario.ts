export function campoObrigatorio(valor: string): boolean {
  return valor.trim().length > 0;
}

export function pinValido(pin: string): boolean {
  return /^\d{4}$/.test(pin);
}

export function numeroNaoNegativo(valor: number): boolean {
  return Number.isFinite(valor) && valor >= 0;
}
