export function solicitarConfirmacao(titulo: string, mensagem: string, textoConfirmar = 'Confirmar'): Promise<boolean> {
  return new Promise((resolver) => {
    const dialogo = document.createElement('dialog');
    dialogo.className = 'modal-confirmacao';

    const cabecalho = document.createElement('header');
    cabecalho.className = 'modal-confirmacao__cabecalho';
    const tituloElemento = document.createElement('h2');
    tituloElemento.className = 'modal-confirmacao__titulo';
    tituloElemento.textContent = titulo;
    cabecalho.append(tituloElemento);

    const texto = document.createElement('p');
    texto.className = 'modal-confirmacao__mensagem';
    texto.textContent = mensagem;

    const acoes = document.createElement('footer');
    acoes.className = 'modal-confirmacao__acoes';
    const cancelar = document.createElement('button');
    cancelar.type = 'button';
    cancelar.className = 'modal-confirmacao__botao modal-confirmacao__botao--cancelar';
    cancelar.textContent = 'Cancelar';
    const confirmar = document.createElement('button');
    confirmar.type = 'button';
    confirmar.className = 'modal-confirmacao__botao modal-confirmacao__botao--confirmar';
    confirmar.textContent = textoConfirmar;
    acoes.append(cancelar, confirmar);
    dialogo.append(cabecalho, texto, acoes);
    document.body.append(dialogo);

    function concluir(resposta: boolean): void {
      dialogo.close();
      dialogo.remove();
      resolver(resposta);
    }

    cancelar.addEventListener('click', () => concluir(false));
    confirmar.addEventListener('click', () => concluir(true));
    dialogo.addEventListener('cancel', (evento) => {
      evento.preventDefault();
      concluir(false);
    });
    dialogo.showModal();
    confirmar.focus();
  });
}
