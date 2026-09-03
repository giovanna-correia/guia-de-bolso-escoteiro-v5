export type SituacaoItemAtividade = 'planejado' | 'reservado' | 'retirado' | 'devolvido' | 'pendente';

export interface ItemAtividade {
  id: string;
  atividadeId: string;
  materialId: string;
  quantidadeSolicitada: number;
  quantidadeRetirada: number;
  quantidadeDevolvida: number;
  situacao: SituacaoItemAtividade;
}
