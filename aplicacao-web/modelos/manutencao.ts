export type TipoManutencao = 'limpeza' | 'secagem' | 'afiacao' | 'costura' | 'impermeabilizacao' | 'reposicao_componente' | 'conserto' | 'avaliacao_descarte' | 'outro';
export type SituacaoManutencao = 'pendente' | 'em_andamento' | 'concluida' | 'cancelada';

export interface Manutencao {
  id: string;
  materialId: string;
  atividadeId: string | null;
  tipo: TipoManutencao;
  descricaoProblema: string;
  responsavelId: string | null;
  dataAbertura: string;
  dataConclusao: string | null;
  custoEstimado: number | null;
  custoReal: number | null;
  situacao: SituacaoManutencao;
  resultado: 'liberado' | 'baixado' | null;
  observacoes: string;
}
