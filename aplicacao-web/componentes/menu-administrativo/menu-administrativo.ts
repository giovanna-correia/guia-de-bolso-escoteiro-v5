import { encerrarSessao } from '../../servicos/servico-sessao';
import type { Usuario } from '../../modelos/usuario';
import { restaurarDadosDemonstrativos } from '../../servicos/servico-dados-demonstrativos';
import { obterCaminhoRaiz } from '../../utilitarios/manipulador-url';
import { solicitarConfirmacao } from '../modal-confirmacao/modal-confirmacao';

const itensMenu = [
  ['Painel Geral', 'paginas/administracao/painel/index.html'],
  ['Membros e Acessos', 'paginas/administracao/membros-listagem/index.html'],
  ['Materiais e Equipamentos', 'paginas/administracao/materiais-listagem/index.html'],
  ['Atividades', 'paginas/administracao/atividades-listagem/index.html'],
  ['Limpeza e Manutenção', 'paginas/administracao/manutencoes-listagem/index.html'],
  ['Necessidades e Compras', 'paginas/administracao/necessidades-listagem/index.html']
];

export function montarMenuAdministrativo(usuario: Usuario): void {
  const hospedeiro = document.querySelector<HTMLElement>('#menu-administrativo');
  if (!hospedeiro) return;
  const raiz = obterCaminhoRaiz();
  const gaveta = document.createElement('aside');
  gaveta.id = 'menu-administrativo__gaveta';
  gaveta.className = 'menu-administrativo__gaveta';
  gaveta.setAttribute('aria-hidden', 'true');
  const topo = document.createElement('div');
  topo.className = 'menu-administrativo__topo';
  const fechar = document.createElement('button');
  fechar.type = 'button';
  fechar.className = 'menu-administrativo__fechar';
  fechar.setAttribute('aria-label', 'Fechar menu');
  fechar.textContent = '×';
  topo.append(fechar);
  const identificacao = document.createElement('p');
  identificacao.className = 'menu-administrativo__usuario';
  identificacao.textContent = usuario.nomeCompleto;
  const navegacao = document.createElement('nav');
  navegacao.className = 'menu-administrativo__navegacao';
  navegacao.setAttribute('aria-label', 'Administração');
  itensMenu.forEach(([rotulo, caminho]) => {
    if (!rotulo || !caminho) return;
    const link = document.createElement('a');
    link.className = 'menu-administrativo__link';
    link.href = `${raiz}${caminho}`;
    link.textContent = rotulo;
    if (window.location.pathname.endsWith(caminho)) {
      link.classList.add('menu-administrativo__link--ativo');
      link.setAttribute('aria-current', 'page');
    }
    navegacao.append(link);
  });
  const guia = document.createElement('a');
  guia.className = 'menu-administrativo__link menu-administrativo__link--guia';
  guia.href = `${raiz}paginas/jovem/inicio/index.html`;
  guia.textContent = 'Ir para o guia de bolso';
  navegacao.append(guia);
  const restaurar = document.createElement('button');
  restaurar.type = 'button';
  restaurar.className = 'menu-administrativo__acao';
  restaurar.textContent = 'Restaurar dados demonstrativos';
  const sair = document.createElement('button');
  sair.type = 'button';
  sair.className = 'menu-administrativo__acao menu-administrativo__acao--sair';
  sair.textContent = 'Sair';
  gaveta.append(topo, identificacao, navegacao, restaurar, sair);
  const fundo = document.createElement('button');
  fundo.type = 'button';
  fundo.className = 'menu-administrativo__fundo';
  fundo.setAttribute('aria-label', 'Fechar menu');
  hospedeiro.append(gaveta, fundo);

  function fecharMenu(): void {
    document.body.classList.remove('menu-administrativo--aberto');
    gaveta.setAttribute('aria-hidden', 'true');
  }
  fechar.addEventListener('click', fecharMenu);
  fundo.addEventListener('click', fecharMenu);
  sair.addEventListener('click', () => {
    encerrarSessao();
    window.location.replace(`${raiz}paginas/autenticacao/login/index.html`);
  });
  restaurar.addEventListener('click', async () => {
    const confirmado = await solicitarConfirmacao('Restaurar dados?', 'Todos os cadastros e alterações locais serão substituídos pelos dados demonstrativos.', 'Restaurar');
    if (confirmado) {
      restaurarDadosDemonstrativos();
      window.location.reload();
    }
  });
}
