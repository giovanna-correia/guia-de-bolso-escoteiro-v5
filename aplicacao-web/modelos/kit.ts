export type TipoKit = 'caixa_patrulha' | 'cozinha' | 'pioneiria' | 'primeiros_socorros' | 'limpeza' | 'cerimonia' | 'acampamento' | 'outro';
export type SituacaoKit = 'disponivel' | 'incompleto' | 'reservado' | 'em_atividade' | 'em_conferencia';

export interface Kit {
  id: string;
  nome: string;
  tipo: TipoKit;
  secaoId: string | null;
  patrulhaId: string | null;
  situacao: SituacaoKit;
  observacoes: string;
  dataCadastro: string;
}
