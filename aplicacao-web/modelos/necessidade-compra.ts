export type PrioridadeNecessidade = 'baixa' | 'media' | 'alta' | 'urgente';
export type SituacaoNecessidade = 'identificada' | 'em_analise' | 'aprovada' | 'aguardando_compra' | 'comprada' | 'recebida' | 'cancelada';

export interface NecessidadeCompra {
  id: string;
  materialId: string | null;
  nomeMaterial: string;
  secaoId: string | null;
  quantidadeAtual: number;
  quantidadeDesejada: number;
  quantidadeComprar: number;
  valorUnitarioEstimado: number | null;
  prioridade: PrioridadeNecessidade;
  justificativa: string;
  fonteRecurso: 'emenda' | 'doacao' | 'recurso_proprio' | 'nao_definida';
  situacao: SituacaoNecessidade;
  dataCadastro: string;
}
