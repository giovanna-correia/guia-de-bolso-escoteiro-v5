export type TipoAtividade = 'reuniao' | 'acampamento' | 'acantonamento' | 'jornada' | 'trilha' | 'mutirao' | 'cerimonia' | 'outro';
export type SituacaoAtividade = 'planejamento' | 'reservada' | 'em_andamento' | 'aguardando_devolucao' | 'concluida' | 'cancelada';

export interface Atividade {
  id: string;
  nome: string;
  tipo: TipoAtividade;
  local: string;
  dataSaida: string;
  dataRetorno: string;
  secaoId: string;
  quantidadeJovens: number;
  quantidadeAdultos: number;
  responsavelId: string;
  situacao: SituacaoAtividade;
  observacoes: string;
  dataCadastro: string;
}
