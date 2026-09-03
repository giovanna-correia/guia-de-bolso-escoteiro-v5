import type { Usuario } from '../modelos/usuario';
import { obterCaminhoRaiz } from '../utilitarios/manipulador-url';
import { obterUsuarioLogado } from './servico-sessao';

export function exigirAutenticacao(): Usuario | null {
  const usuario = obterUsuarioLogado();
  if (!usuario) window.location.replace(`${obterCaminhoRaiz()}paginas/autenticacao/login/index.html`);
  return usuario;
}

export function exigirPerfilEscotista(): Usuario | null {
  const usuario = exigirAutenticacao();
  if (!usuario) return null;
  if (usuario.perfil !== 'escotista') {
    window.location.replace(`${obterCaminhoRaiz()}paginas/jovem/inicio/index.html?aviso=acesso-negado`);
    return null;
  }
  return usuario;
}
