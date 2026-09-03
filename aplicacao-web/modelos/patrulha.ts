export interface Patrulha {
  id: string;
  nome: string;
  secaoId: string;
  situacao: 'ativa' | 'inativa';
}
