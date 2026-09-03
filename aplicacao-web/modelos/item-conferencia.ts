export interface ItemConferencia {
  id: string;
  conferenciaId: string;
  materialId: string;
  quantidadeEsperada: number;
  quantidadeEncontrada: number;
  estadoEncontrado: string;
  foiLocalizado: boolean;
  observacoes: string;
}
