export type TipoMaterial = 'duravel' | 'consumivel' | 'componente';
export type EstadoMaterial = 'bom' | 'incompleto' | 'aguardando_limpeza' | 'aguardando_secagem' | 'em_manutencao' | 'danificado' | 'baixado';
export type OrigemMaterial = 'compra' | 'doacao' | 'emenda' | 'outro';

export interface Material {
  id: string;
  codigoPatrimonio: string;
  nome: string;
  descricao: string;
  tipo: TipoMaterial;
  categoriaId: string;
  secaoId: string | null;
  localizacaoId: string;
  quantidadeTotal: number;
  quantidadeMinimaDesejada: number;
  unidadeMedida: string;
  estado: EstadoMaterial;
  origem: OrigemMaterial;
  valorUnitario: number | null;
  dataAquisicao: string | null;
  controlaComponentes: boolean;
  capacidadePessoas: number | null;
  comprimentoMetros: number | null;
  restricaoUso: string | null;
  observacoes: string;
  caminhoImagem: string | null;
  dataCadastro: string;
}
