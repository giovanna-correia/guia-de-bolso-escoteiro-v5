export type TipoMensagem = 'sucesso' | 'aviso' | 'erro' | 'informacao';

export interface ItemChecklist {
  id: string;
  nome: string;
  marcado: boolean;
  personalizado: boolean;
}

export interface ResultadoAutenticacao {
  sucesso: boolean;
  mensagem: string;
}

export interface OpcaoSelecao {
  valor: string;
  rotulo: string;
}
