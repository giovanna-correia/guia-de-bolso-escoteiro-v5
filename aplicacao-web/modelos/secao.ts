export type RamoSecao = 'lobinho' | 'escoteiro' | 'senior' | 'pioneiro' | 'diretoria';

export interface Secao {
  id: string;
  nome: string;
  ramo: RamoSecao;
  situacao: 'ativa' | 'inativa';
}
