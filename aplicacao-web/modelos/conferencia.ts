export type TipoConferencia = 'geral' | 'secao' | 'localizacao' | 'kit';

export interface Conferencia {
  id: string;
  nome: string;
  tipo: TipoConferencia;
  secaoId: string | null;
  localizacaoId: string | null;
  kitId: string | null;
  responsavelId: string;
  dataInicio: string;
  dataFim: string | null;
  situacao: 'em_andamento' | 'concluida' | 'cancelada';
  observacoes: string;
}
