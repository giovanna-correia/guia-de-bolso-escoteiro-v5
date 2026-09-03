export interface AmarraEscoteira {
  id: string;
  nome: string;
  descricao: string;
  videoId: string;
  caminhoImagemEsperado: string;
}

export const textoIntroducaoAmarras = 'Não quebre a cabeça tentando descobrir como prender os troncos! As amarras escoteiras servem exatamente para isso: unir madeiras e bambus com total segurança.\n\nCom elas, você ganha a liberdade de construir o que precisar no acampamento, desde um simples banco para descansar, um tripé para panelas, até pórticos gigantescos para a entrada do seu campo. É a arte de usar cordas para transformar varas de madeira em facilidades para a sua patrulha. Mãos à obra!';

export const amarras: AmarraEscoteira[] = [
  { id: 'quadrada', nome: 'Amarra Quadrada', descricao: 'Une dois troncos em ângulo de 90 graus.', videoId: 'GJyGI6qTjdo', caminhoImagemEsperado: 'amarra-quadrada-thumb.png' },
  { id: 'diagonal', nome: 'Amarra Diagonal', descricao: 'Aproxima e une troncos que estão afastados em formato de X.', videoId: '2TmsPibd9Bg', caminhoImagemEsperado: 'amarra-diagonal-thumb.png' },
  { id: 'paralela', nome: 'Amarra Paralela', descricao: 'Une dois troncos paralelos para prolongar o tamanho.', videoId: '5C7w7xUsE6Y', caminhoImagemEsperado: 'amarra-paralela-thumb.png' },
  { id: 'tripe', nome: 'Amarra de Tripé', descricao: 'Cria a base para pioneirias erguendo três troncos.', videoId: 'eqYDS0rlszk', caminhoImagemEsperado: 'amarra-tripe-thumb.png' }
];
