import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FONTES } from '../estilos/fontes';
import BarraSuperior from '../componentes/BarraSuperior';

const CORES = {
  fundo: '#FFFFFF',
  titulo: '#4B4B4B',
  texto: '#243142',
  destaque: '#222222',
  verde: '#5F6D49',
  verdeClaro: '#C7D0BC',
  branco: '#FFFFFF',
};

const TAMANHOS = {
  margemHorizontal: 22,
  larguraMaximaConteudo: 320,
  alturaVideo: 220,
};

function LinhaTexto({ children }) {
  return <Text style={estilos.textoInstrucao}>{children}</Text>;
}

function abrirVideo(videoId) {
  Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
}

export default function TelaDetalheNo({ route, navigation }) {
  const { no } = route.params;

  return (
    <View style={estilos.tela}>
      {/* Navbar superior com acesso ao menu lateral. */}
      <BarraSuperior />

      {/* Conteúdo rolável com vídeo e instruções do nó selecionado. */}
      <ScrollView
        style={estilos.areaRolavel}
        contentContainerStyle={estilos.conteudoRolavel}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.conteudo}>
          <Text style={estilos.titulo}>{no.nome}</Text>

          {/* Botão visual que abre o vídeo do nó no YouTube. */}
          <TouchableOpacity
            activeOpacity={0.84}
            style={estilos.areaVideo}
            onPress={() => abrirVideo(no.videoId)}
          >
            <Feather name="play-circle" size={38} color={CORES.branco} />
            <Text style={estilos.textoVideo}>Abrir vídeo no YouTube</Text>
            <Feather name="external-link" size={17} color={CORES.branco} />
          </TouchableOpacity>

          {/* Instruções textuais do nó. */}
          <Text style={estilos.subtitulo}>Como Fazer:</Text>

          <LinhaTexto>Regra de Ouro: "{no.regra}"</LinhaTexto>

          {no.passos.map((passo, indice) => (
            <LinhaTexto key={passo}>
              {indice + 1}. {passo}
            </LinhaTexto>
          ))}

          <Text style={estilos.rotulo}>Usos:</Text>

          {no.usos.map((uso) => (
            <LinhaTexto key={uso}>{uso}</LinhaTexto>
          ))}

          {no.cuidado ? (
            <LinhaTexto>
              <Text style={estilos.rotuloInline}>Cuidado: </Text>
              {no.cuidado}
            </LinhaTexto>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  // Estrutura principal da tela.
  tela: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  areaRolavel: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  conteudoRolavel: {
    alignItems: 'center',
    paddingHorizontal: TAMANHOS.margemHorizontal,
    paddingTop: 21,
    paddingBottom: 30,
  },
  conteudo: {
    width: '100%',
    maxWidth: TAMANHOS.larguraMaximaConteudo,
  },

  // Título e bloco do vídeo/link.
  titulo: {
    marginBottom: 12,
    fontFamily: FONTES.titulo,
    fontSize: 25,
    lineHeight: 31,
    color: CORES.titulo,
    textAlign: 'center',
  },
  areaVideo: {
    width: '100%',
    height: TAMANHOS.alturaVideo,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
    paddingHorizontal: 12,
    backgroundColor: CORES.verde,
    borderRadius: 14,
  },
  textoVideo: {
    flex: 1,
    marginHorizontal: 10,
    fontFamily: FONTES.corpoNegrito,
    fontSize: 16,
    lineHeight: 21,
    color: CORES.branco,
    textAlign: 'center',
  },

  // Textos de instrução.
  subtitulo: {
    marginBottom: 9,
    fontFamily: FONTES.corpoNegrito,
    fontSize: 15,
    lineHeight: 19,
    color: CORES.destaque,
  },
  textoInstrucao: {
    marginBottom: 10,
    fontFamily: FONTES.corpo,
    fontSize: 13.5,
    lineHeight: 18,
    color: CORES.texto,
  },
  rotulo: {
    marginBottom: 1,
    fontFamily: FONTES.corpoNegrito,
    fontSize: 13.5,
    lineHeight: 18,
    color: CORES.texto,
  },
  rotuloInline: {
    fontFamily: FONTES.corpoNegrito,
  },
});
