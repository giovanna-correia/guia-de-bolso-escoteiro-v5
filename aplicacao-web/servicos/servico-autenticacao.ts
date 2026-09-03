import type { ResultadoAutenticacao } from '../compartilhado/tipos/tipos-comuns';
import { atualizarUsuario, buscarUsuarioPorRegistro } from '../repositorios/repositorio-usuarios';
import { criarSessao } from './servico-sessao';

export function autenticar(numeroRegistro: string, pin: string): ResultadoAutenticacao {
  const usuario = buscarUsuarioPorRegistro(numeroRegistro.trim());
  if (!usuario) return { sucesso: false, mensagem: 'Registro escoteiro não encontrado.' };
  if (usuario.situacao !== 'ativo') return { sucesso: false, mensagem: 'Este acesso está desativado.' };
  if (usuario.pin !== pin) return { sucesso: false, mensagem: 'PIN incorreto.' };

  criarSessao(usuario.id);
  atualizarUsuario({ ...usuario, ultimoAcesso: new Date().toISOString() });
  return { sucesso: true, mensagem: 'Acesso realizado com sucesso.' };
}
