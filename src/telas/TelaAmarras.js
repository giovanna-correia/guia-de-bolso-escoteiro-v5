import React from 'react';
import {
  Image,
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
import { amarras, textoIntroducaoAmarras } from '../dados/amarras';

const CORES = {
  fundo: '#FFFFFF',
  titulo: '#3E3A36',
  texto: '#243142',
  verde: '#5F6D49',
  bordaVideo: '#334127',
  iconeControle: '#223018',
};

const TAMANHOS = {
  margemHorizontal: 20,
  larguraMaximaConteudo: 330,
  alturaVideo: 235,
  raioVideo: 18,
  zoomThumb: 1,
};

function abrirVideo(videoId) {
  Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
}

function VideoComThumb({ item }) {
  return (
    <View style={estilos.areaVideo}>
      <TouchableOpacity
        activeOpacity={0.86}
        style={estilos.thumbBotao}
        onPress={() => abrirVideo(item.videoId)}
      >
        <Image
          source={item.thumb}
          resizeMode="cover"
          style={[
            estilos.thumb,
            { transform: [{ scale: TAMANHOS.zoomThumb }] },
          ]}
        />
        <View style={estilos.controlesFalsos}>
          <Feather
            name="play"
            size={17}
            color={CORES.iconeControle}
            style={estilos.iconePlay}
          />
          <Text style={estilos.textoAbrirVideo}>Abrir no YouTube</Text>
          <Feather name="external-link" size={15} color={CORES.iconeControle} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function TelaAmarras({ navigation }) {
  return (
    <View style={estilos.tela}>
      {/* Navbar superior com acesso ao menu lateral. */}
      <BarraSuperior />

      {/* Conteúdo rolável da seção de amarras. */}
      <ScrollView
        style={estilos.areaRolavel}
        contentContainerStyle={estilos.conteudoRolavel}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        scrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.conteudo}>
          <Text style={estilos.tituloSessao}>Amarras Escoteiras</Text>

          <Text style={estilos.textoIntrodutorio}>
            {textoIntroducaoAmarras}
          </Text>

          {/* Cards com os links dos vídeos de cada amarra. */}
          {amarras.map((item) => (
            <View key={item.id} style={estilos.cartaoAmarra}>
              <Text style={estilos.nomeAmarra}>{item.nome}</Text>

              <VideoComThumb item={item} />
            </View>
          ))}
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
    paddingTop: 17,
    paddingBottom: 30,
  },
  conteudo: {
    width: '100%',
    maxWidth: TAMANHOS.larguraMaximaConteudo,
  },

  // Textos da seção.
  tituloSessao: {
    marginBottom: 19,
    fontFamily: FONTES.titulo,
    fontSize: 22,
    lineHeight: 27,
    color: CORES.titulo,
    textAlign: 'center',
  },
  textoIntrodutorio: {
    marginBottom: 11,
    fontFamily: FONTES.corpo,
    fontSize: 13.5,
    lineHeight: 18,
    color: CORES.texto,
  },
  cartaoAmarra: {
    marginBottom: 14,
  },
  nomeAmarra: {
    marginBottom: 7,
    fontFamily: FONTES.titulo,
    fontSize: 22,
    lineHeight: 27,
    color: CORES.titulo,
    textAlign: 'center',
  },

  // Card visual do vídeo/link do YouTube.
  areaVideo: {
    width: '100%',
    height: TAMANHOS.alturaVideo,
    overflow: 'hidden',
    backgroundColor: CORES.verde,
    borderWidth: 2,
    borderColor: CORES.bordaVideo,
    borderRadius: TAMANHOS.raioVideo,
  },
  thumbBotao: {
    flex: 1,
    overflow: 'hidden',
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  controlesFalsos: {
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconePlay: {
    marginRight: 'auto',
  },
  textoAbrirVideo: {
    marginRight: 8,
    fontFamily: FONTES.corpoSemibold,
    fontSize: 13,
    lineHeight: 17,
    color: CORES.iconeControle,
  },
});
