export type PerfilUsuario = 'jovem_beneficiario' | 'escotista';
export type SituacaoUsuario = 'ativo' | 'inativo';

export interface Usuario {
  id: string;
  nomeCompleto: string;
  numeroRegistro: string;
  pin: string;
  perfil: PerfilUsuario;
  secaoId: string | null;
  patrulhaId: string | null;
  situacao: SituacaoUsuario;
  dataCadastro: string;
  ultimoAcesso: string | null;
}
