import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Magnetometer } from 'expo-sensors';
import { FONTES } from '../estilos/fontes';
import BarraSuperior from '../componentes/BarraSuperior';

const CORES = {
  fundo: '#FFFFFF',
  titulo: '#3E3A36',
  texto: '#243142',
  verde: '#5F6D49',
  verdeClaro: '#C7D0BC',
  verdeMedio: '#9BAA86',
  borda: '#5F6D49',
  perigo: '#9B2E2E',
  branco: '#FFFFFF',
};

const TAMANHOS = {
  margemHorizontal: 28,
  larguraMaximaConteudo: 330,
  tamanhoBussola: 238,
};

function calcularGraus({ x, y }) {
  let angulo = Math.atan2(y, x) * (180 / Math.PI);

  if (angulo < 0) {
    angulo += 360;
  }

  return Math.round(angulo);
}

function obterPontoCardeal(graus) {
  const pontos = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
  const indice = Math.round(graus / 45) % pontos.length;
  return pontos[indice];
}

export default function TelaBussola({ navigation }) {
  const [graus, setGraus] = useState(0);
  const [disponivel, setDisponivel] = useState(true);
  const [ativa, setAtiva] = useState(true);

  useEffect(() => {
    let assinatura;
    let montado = true;

    async function iniciarBussola() {
      const sensorDisponivel = await Magnetometer.isAvailableAsync();

      if (!montado) {
        return;
      }

      setDisponivel(sensorDisponivel);

      if (!sensorDisponivel || !ativa) {
        return;
      }

      Magnetometer.setUpdateInterval(300);
      assinatura = Magnetometer.addListener((dados) => {
        setGraus(calcularGraus(dados));
      });
    }

    iniciarBussola();

    return () => {
      montado = false;

      if (assinatura) {
        assinatura.remove();
      }
    };
  }, [ativa]);

  return (
    <View style={estilos.tela}>
      {/* Navbar superior com acesso ao menu lateral. */}
      <BarraSuperior />

      {/* Conteúdo rolável da bússola. */}
      <ScrollView
        style={estilos.areaRolavel}
        contentContainerStyle={estilos.conteudoRolavel}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        scrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.conteudo}>
          <Text style={estilos.tituloSessao}>Bússola</Text>

          <Text style={estilos.textoIntrodutorio}>
            Use a bússola para se orientar em atividades ao ar livre. Para
            melhorar a precisão, mova o celular em formato de 8 antes da
            leitura.
          </Text>

          {/* Mostrador circular da bússola. */}
          <View style={estilos.areaBussola}>
            <Text style={[estilos.marcador, estilos.marcadorNorte]}>N</Text>
            <Text style={[estilos.marcador, estilos.marcadorLeste]}>L</Text>
            <Text style={[estilos.marcador, estilos.marcadorSul]}>S</Text>
            <Text style={[estilos.marcador, estilos.marcadorOeste]}>O</Text>

            <View
              style={[
                estilos.agulha,
                { transform: [{ rotate: `${graus}deg` }] },
              ]}
            >
              <Feather name="navigation" size={92} color={CORES.verde} />
            </View>
          </View>

          {/* Resultado em graus e ponto cardeal. */}
          <View style={estilos.cartaoResultado}>
            <Text style={estilos.textoGraus}>{graus}°</Text>
            <Text style={estilos.textoPonto}>{obterPontoCardeal(graus)}</Text>
          </View>

          {!disponivel ? (
            <Text style={estilos.textoAviso}>
              O sensor de bússola não está disponível neste dispositivo.
            </Text>
          ) : null}

          {/* Botão para pausar ou retomar a leitura do sensor. */}
          <TouchableOpacity
            activeOpacity={0.84}
            style={estilos.botaoControle}
            onPress={() => setAtiva((valorAtual) => !valorAtual)}
          >
            <Feather
              name={ativa ? 'pause' : 'play'}
              size={17}
              color={CORES.branco}
            />
            <Text style={estilos.textoBotaoControle}>
              {ativa ? 'PAUSAR LEITURA' : 'RETOMAR LEITURA'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  // Estrutura principal da tela.
  tela: {
    flex: 1,
    width: '100%',
    backgroundColor: CORES.fundo,
    overflow: 'hidden',
  },
  areaRolavel: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  conteudoRolavel: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: TAMANHOS.margemHorizontal,
    paddingTop: 24,
    paddingBottom: 30,
  },
  conteudo: {
    width: '100%',
    maxWidth: TAMANHOS.larguraMaximaConteudo,
    alignItems: 'center',
  },

  // Textos introdutórios.
  tituloSessao: {
    marginBottom: 16,
    fontFamily: FONTES.titulo,
    fontSize: 24,
    lineHeight: 29,
    color: CORES.titulo,
    textAlign: 'center',
  },
  textoIntrodutorio: {
    width: '100%',
    marginBottom: 18,
    fontFamily: FONTES.corpo,
    fontSize: 14.5,
    lineHeight: 20,
    color: CORES.texto,
  },

  // Mostrador da bússola.
  areaBussola: {
    width: TAMANHOS.tamanhoBussola,
    height: TAMANHOS.tamanhoBussola,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: CORES.verdeClaro,
    borderWidth: 3,
    borderColor: CORES.borda,
    borderRadius: TAMANHOS.tamanhoBussola / 2,
  },
  marcador: {
    position: 'absolute',
    fontFamily: FONTES.corpoNegrito,
    fontSize: 16,
    lineHeight: 20,
    color: CORES.verde,
  },
  marcadorNorte: {
    top: 13,
  },
  marcadorLeste: {
    right: 16,
  },
  marcadorSul: {
    bottom: 13,
  },
  marcadorOeste: {
    left: 16,
  },
  agulha: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Resultado da leitura do sensor.
  cartaoResultado: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 13,
    paddingVertical: 13,
    backgroundColor: CORES.verdeMedio,
    borderRadius: 12,
  },
  textoGraus: {
    fontFamily: FONTES.titulo,
    fontSize: 34,
    lineHeight: 39,
    color: CORES.branco,
  },
  textoPonto: {
    fontFamily: FONTES.corpoNegrito,
    fontSize: 15,
    lineHeight: 19,
    color: CORES.branco,
  },
  textoAviso: {
    marginBottom: 13,
    fontFamily: FONTES.corpoSemibold,
    fontSize: 13,
    lineHeight: 17,
    color: CORES.perigo,
    textAlign: 'center',
  },

  // Botão de controle da leitura.
  botaoControle: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    backgroundColor: CORES.verde,
    borderRadius: 6,
  },
  textoBotaoControle: {
    marginLeft: 7,
    fontFamily: FONTES.corpoNegrito,
    fontSize: 13,
    lineHeight: 17,
    color: CORES.branco,
  },
});
