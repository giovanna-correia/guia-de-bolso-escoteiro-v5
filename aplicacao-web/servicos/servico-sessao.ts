import type { SessaoUsuario } from '../modelos/sessao-usuario';
import { buscarUsuarioPorId } from '../repositorios/repositorio-usuarios';
import { escreverArmazenamento, lerArmazenamento, removerArmazenamento } from '../utilitarios/manipulador-armazenamento';

export const CHAVE_SESSAO = 'guia_escoteiro_sessao';

export function criarSessao(usuarioId: string): void {
  const sessao: SessaoUsuario = { usuarioId, dataLogin: new Date().toISOString() };
  escreverArmazenamento(CHAVE_SESSAO, sessao);
}

export function obterSessao(): SessaoUsuario | null {
  return lerArmazenamento<SessaoUsuario | null>(CHAVE_SESSAO, null);
}

export function obterUsuarioLogado() {
  const sessao = obterSessao();
  if (!sessao) return null;
  const usuario = buscarUsuarioPorId(sessao.usuarioId);
  if (!usuario || usuario.situacao !== 'ativo') {
    encerrarSessao();
    return null;
  }
  return usuario;
}

export function encerrarSessao(): void {
  removerArmazenamento(CHAVE_SESSAO);
}
