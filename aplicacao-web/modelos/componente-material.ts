export interface ComponenteMaterial {
  id: string;
  materialId: string;
  nome: string;
  quantidadeEsperada: number;
  quantidadeEncontrada: number;
  estado: 'bom' | 'ausente' | 'danificado';
  observacoes: string;
}
