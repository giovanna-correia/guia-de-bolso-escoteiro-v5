import type { Usuario } from '../modelos/usuario';
import { escreverArmazenamento, lerArmazenamento } from '../utilitarios/manipulador-armazenamento';
import { normalizarTexto } from '../utilitarios/normalizador-texto';

export const CHAVE_USUARIOS = 'guia_escoteiro_usuarios';

export function listarUsuarios(): Usuario[] {
  return lerArmazenamento<Usuario[]>(CHAVE_USUARIOS, []);
}

export function buscarUsuarioPorId(id: string): Usuario | null {
  return listarUsuarios().find((usuario) => usuario.id === id) ?? null;
}

export function buscarUsuarioPorRegistro(numeroRegistro: string): Usuario | null {
  const registroNormalizado = normalizarTexto(numeroRegistro);
  return listarUsuarios().find((usuario) => normalizarTexto(usuario.numeroRegistro) === registroNormalizado) ?? null;
}

export function adicionarUsuario(usuario: Usuario): void {
  escreverArmazenamento(CHAVE_USUARIOS, [...listarUsuarios(), usuario]);
}

export function atualizarUsuario(usuarioAtualizado: Usuario): boolean {
  const usuarios = listarUsuarios();
  const indice = usuarios.findIndex((usuario) => usuario.id === usuarioAtualizado.id);
  if (indice < 0) return false;
  usuarios[indice] = usuarioAtualizado;
  escreverArmazenamento(CHAVE_USUARIOS, usuarios);
  return true;
}

export function desativarUsuario(id: string): boolean {
  const usuario = buscarUsuarioPorId(id);
  if (!usuario) return false;
  return atualizarUsuario({ ...usuario, situacao: 'inativo' });
}
