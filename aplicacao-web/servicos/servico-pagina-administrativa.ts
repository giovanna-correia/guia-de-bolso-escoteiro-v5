import { montarCabecalhoAdministrativo } from '../componentes/cabecalho-administrativo/cabecalho-administrativo';
import { montarMenuAdministrativo } from '../componentes/menu-administrativo/menu-administrativo';
import type { Usuario } from '../modelos/usuario';
import { exigirPerfilEscotista } from './servico-autorizacao';
import { inicializarDadosDemonstrativos } from './servico-dados-demonstrativos';

export function inicializarPaginaAdministrativa(titulo: string): Usuario | null {
  inicializarDadosDemonstrativos();
  const usuario = exigirPerfilEscotista();
  if (!usuario) return null;
  montarMenuAdministrativo(usuario);
  montarCabecalhoAdministrativo(titulo, usuario);
  return usuario;
}
