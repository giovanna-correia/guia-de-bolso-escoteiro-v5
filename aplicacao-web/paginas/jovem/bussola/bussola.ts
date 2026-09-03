import { montarCabecalhoJovem } from '../../../componentes/cabecalho-jovem/cabecalho-jovem';
import { exigirAutenticacao } from '../../../servicos/servico-autorizacao';
import { inicializarDadosDemonstrativos } from '../../../servicos/servico-dados-demonstrativos';

interface OrientacaoComPermissao {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

type EventoOrientacaoEstendido = DeviceOrientationEvent & { webkitCompassHeading?: number };

const pontosCardeais = ['Norte', 'Nordeste', 'Leste', 'Sudeste', 'Sul', 'Sudoeste', 'Oeste', 'Noroeste'];
let leituraAtiva = false;
let recebeuLeitura = false;

function obterPontoCardeal(graus: number): string {
  return pontosCardeais[Math.round(graus / 45) % pontosCardeais.length] ?? 'Direção indefinida';
}

function tratarOrientacao(evento: DeviceOrientationEvent): void {
  if (!leituraAtiva) return;
  const eventoEstendido = evento as EventoOrientacaoEstendido;
  const graus = eventoEstendido.webkitCompassHeading ?? (evento.alpha === null ? null : 360 - evento.alpha);
  if (graus === null || !Number.isFinite(graus)) return;
  recebeuLeitura = true;
  const valor = Math.round((graus + 360) % 360);
  const agulha = document.querySelector<HTMLElement>('#agulha');
  const resultado = document.querySelector<HTMLOutputElement>('#resultado-bussola');
  const aviso = document.querySelector<HTMLElement>('#aviso-bussola');
  if (agulha) agulha.style.transform = `rotate(${valor}deg)`;
  if (resultado) {
    resultado.replaceChildren();
    const numero = document.createElement('strong');
    numero.textContent = `${valor}°`;
    const ponto = document.createElement('span');
    ponto.textContent = obterPontoCardeal(valor);
    resultado.append(numero, ponto);
  }
  if (aviso) aviso.textContent = 'Leitura ativa. Afaste o aparelho de objetos metálicos para melhorar a precisão.';
}

function iniciarEscuta(): void {
  leituraAtiva = true;
  recebeuLeitura = false;
  window.addEventListener('deviceorientation', tratarOrientacao);
  const pausar = document.querySelector<HTMLButtonElement>('#botao-pausar');
  if (pausar) {
    pausar.disabled = false;
    pausar.textContent = 'Pausar leitura';
  }
  window.setTimeout(() => {
    const aviso = document.querySelector<HTMLElement>('#aviso-bussola');
    if (leituraAtiva && !recebeuLeitura && aviso) aviso.textContent = 'O navegador não forneceu dados de orientação. O sensor pode estar indisponível neste dispositivo.';
  }, 3000);
}

async function solicitarAcesso(): Promise<void> {
  const aviso = document.querySelector<HTMLElement>('#aviso-bussola');
  if (!('DeviceOrientationEvent' in window)) {
    if (aviso) aviso.textContent = 'O sensor de bússola não está disponível neste dispositivo.';
    return;
  }
  const orientacao = DeviceOrientationEvent as typeof DeviceOrientationEvent & OrientacaoComPermissao;
  if (orientacao.requestPermission) {
    try {
      const permissao = await orientacao.requestPermission();
      if (permissao !== 'granted') {
        if (aviso) aviso.textContent = 'Permissão do sensor não concedida.';
        return;
      }
    } catch {
      if (aviso) aviso.textContent = 'Não foi possível solicitar acesso ao sensor.';
      return;
    }
  }
  iniciarEscuta();
}

function alternarPausa(): void {
  const botao = document.querySelector<HTMLButtonElement>('#botao-pausar');
  if (leituraAtiva) {
    leituraAtiva = false;
    window.removeEventListener('deviceorientation', tratarOrientacao);
    if (botao) botao.textContent = 'Retomar leitura';
  } else {
    iniciarEscuta();
  }
}

function inicializarPagina(): void {
  inicializarDadosDemonstrativos();
  const usuario = exigirAutenticacao();
  if (!usuario) return;
  montarCabecalhoJovem('Bússola', usuario);
  const aviso = document.querySelector<HTMLElement>('#aviso-bussola');
  if (!('DeviceOrientationEvent' in window) && aviso) aviso.textContent = 'O sensor de bússola não está disponível neste dispositivo.';
  else if (aviso) aviso.textContent = 'Toque em “Ativar bússola” para iniciar a leitura do sensor.';
  document.querySelector('#botao-permissao')?.addEventListener('click', () => void solicitarAcesso());
  document.querySelector('#botao-pausar')?.addEventListener('click', alternarPausa);
}

document.addEventListener('DOMContentLoaded', inicializarPagina);
