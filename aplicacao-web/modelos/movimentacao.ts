export type TipoMovimentacao = 'entrada' | 'reserva' | 'retirada' | 'devolucao' | 'baixa' | 'ajuste';

export interface Movimentacao {
  id: string;
  materialId: string;
  atividadeId: string | null;
  tipo: TipoMovimentacao;
  quantidade: number;
  responsavelId: string;
  data: string;
  estadoRegistrado: string;
  observacoes: string;
}
