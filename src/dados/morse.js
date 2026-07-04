// Texto explicativo exibido no topo da tela de Código Morse.
export const textoIntroducaoMorse =
  'O código Morse pode ser usado em atividades escoteiras para treinar comunicação, atenção e transmissão de mensagens simples usando pontos e traços.';

// Tabela usada pelo conversor de texto para Morse.
export const codigoMorse = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  0: '-----',
  1: '.----',
  2: '..---',
  3: '...--',
  4: '....-',
  5: '.....',
  6: '-....',
  7: '--...',
  8: '---..',
  9: '----.',
};

// Lista pronta para renderizar a tabela visual na tela.
export const alfabetoMorse = Object.keys(codigoMorse).map((caractere) => ({
  caractere,
  codigo: codigoMorse[caractere],
}));
