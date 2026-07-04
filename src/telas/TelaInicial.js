import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FONTES } from '../estilos/fontes';
import BarraSuperior from '../componentes/BarraSuperior';
import BotaoMenuInicial from '../componentes/BotaoMenuInicial';

const imagemPrincipal = require('../../assets/imagem-tela-principal-sem-fundo.png');
const imagemNos = require('../../assets/menu-no-direito.png');
const imagemAmarras = require('../../assets/menu-amarras.png');
const imagemAcampamento = require('../../assets/menu-acampamento.jpeg');
const imagemLeis = require('../../assets/menu-leis-escoteiras.png');
const imagemBussola = require('../../assets/menu-bussola.png');
const imagemMorse = require('../../assets/menu-morse.png');

const CORES = {
  fundo: '#FFFFFF',
  texto: '#4A3828',
};

const TAMANHOS = {
  margemHorizontal: 27,
  larguraMaximaConteudo: 330,
  larguraLogo: 330,
  alturaLogo: 230,
  espacoEntreMenus: 14,
};

const MENUS = [
  {
    nome: 'Nós',
    rota: 'Nós Escoteiros',
    imagem: imagemNos,
    zoom: 1.58,
  },
  {
    nome: 'Amarras',
    rota: 'Amarras',
    imagem: imagemAmarras,
    zoom: 1.5,
  },
  {
    nome: 'Acampamento',
    rota: 'Acampamento',
    imagem: imagemAcampamento,
    zoom: 1.35,
  },
  {
    nome: 'Leis Escoteiras',
    rota: 'Leis Escoteiras',
    imagem: imagemLeis,
    zoom: 1.35,
  },
  {
    nome: 'Bússola',
    rota: 'Bússola',
    imagem: imagemBussola,
    zoom: 1.2,
  },
  {
    nome: 'Código Morse',
    rota: 'Código Morse',
    imagem: imagemMorse,
    zoom: 1.2,
  },
];

export default function TelaInicial({ navigation }) {
  return (
    <View style={estilos.tela}>
      {/* Navbar superior com menu lateral. */}
      <BarraSuperior />

      {/* Área rolável da tela inicial. */}
      <ScrollView
        style={estilos.areaRolavel}
        contentContainerStyle={estilos.conteudoRolavel}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.conteudo}>
          {/* Logo principal do aplicativo. */}
          <View style={estilos.areaLogo}>
            <Image
              source={imagemPrincipal}
              style={estilos.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={estilos.textoSecao}>Selecione uma seção:</Text>

          {/* Lista de botões de entrada para cada seção do app. */}
          <View style={estilos.listaMenus}>
            {MENUS.map((menu, indice) => (
              <View
                key={menu.rota}
                style={indice < MENUS.length - 1 ? estilos.espacoMenu : null}
              >
                <BotaoMenuInicial
                  nome={menu.nome}
                  imagem={menu.imagem}
                  zoom={menu.zoom}
                  onPress={() => navigation.navigate(menu.rota)}
                />
              </View>
            ))}
          </View>
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
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: TAMANHOS.margemHorizontal,
    paddingTop: 14,
    paddingBottom: 30,
  },
  conteudo: {
    width: '100%',
    maxWidth: TAMANHOS.larguraMaximaConteudo,
    alignItems: 'center',
  },

  // Logo da tela inicial.
  areaLogo: {
    width: TAMANHOS.larguraLogo,
    height: TAMANHOS.alturaLogo,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logo: {
    width: '124%',
    height: '112%',
  },
  textoSecao: {
    marginBottom: 13,
    fontFamily: FONTES.titulo,
    fontSize: 19,
    lineHeight: 24,
    color: CORES.texto,
    textAlign: 'center',
  },

  // Botões de entrada para as seções.
  listaMenus: {
    width: '100%',
  },
  espacoMenu: {
    marginBottom: TAMANHOS.espacoEntreMenus,
  },
});
