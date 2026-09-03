export function lerArmazenamento<T>(chave: string, valorPadrao: T): T {
  const valorSalvo = localStorage.getItem(chave);
  if (valorSalvo === null) return valorPadrao;

  try {
    return JSON.parse(valorSalvo) as T;
  } catch {
    return valorPadrao;
  }
}

export function escreverArmazenamento<T>(chave: string, valor: T): void {
  localStorage.setItem(chave, JSON.stringify(valor));
}

export function removerArmazenamento(chave: string): void {
  localStorage.removeItem(chave);
}

export function chaveExiste(chave: string): boolean {
  return localStorage.getItem(chave) !== null;
}
