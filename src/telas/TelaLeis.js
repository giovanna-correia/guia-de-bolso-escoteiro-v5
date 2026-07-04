import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FONTES } from '../estilos/fontes';
import BarraSuperior from '../componentes/BarraSuperior';
import { leisEscoteiras, textoIntroducaoLeis } from '../dados/leis';

const LINK_PDF =
  'https://www.escoteiros.org.br/wp-content/uploads/2016/03/Princ%C3%ADpios-Organiza%C3%A7%C3%A3o-e-Regras.pdf';

const CORES = {
  fundo: '#FFFFFF',
  titulo: '#3E3A36',
  texto: '#243142',
  verdeClaro: '#C7D0BC',
  verdePdf: '#E0E3D8',
  iconePdf: '#6D6D6D',
};

const TAMANHOS = {
  margemHorizontal: 28,
  larguraMaximaConteudo: 330,
};

function abrirPdf() {
  Linking.openURL(LINK_PDF);
}

export default function TelaLeis({ navigation }) {
  return (
    <View style={estilos.tela}>
      {/* Navbar superior com acesso ao menu lateral. */}
      <BarraSuperior />

      {/* Conteúdo rolável da tela de leis. */}
      <ScrollView
        style={estilos.areaRolavel}
        contentContainerStyle={estilos.conteudoRolavel}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        scrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.conteudo}>
          <Text style={estilos.textoIntrodutorio}>
            {textoIntroducaoLeis}
          </Text>

          {/* Botão que abre o PDF oficial. */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={estilos.botaoPdf}
            onPress={abrirPdf}
            accessibilityLabel="Abrir PDF de princípios, organização e regras"
          >
            <MaterialCommunityIcons
              name="file-pdf-box"
              size={31}
              color={CORES.iconePdf}
            />
            <Text style={estilos.nomePdf} numberOfLines={1}>
              Principios_Organização_e_Regras.pdf
            </Text>
          </TouchableOpacity>

          <Text style={estilos.tituloSessao}>As 10 Leis Escoteiras</Text>

          {/* Lista visual das leis escoteiras. */}
          <View style={estilos.listaLeis}>
            {leisEscoteiras.map((lei) => (
              <View key={lei} style={estilos.cartaoLei}>
                <Text style={estilos.textoLei}>{lei}</Text>
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
    paddingTop: 29,
    paddingBottom: 30,
  },
  conteudo: {
    width: '100%',
    maxWidth: TAMANHOS.larguraMaximaConteudo,
  },

  // Texto introdutório.
  textoIntrodutorio: {
    marginBottom: 12,
    fontFamily: FONTES.corpo,
    fontSize: 13,
    lineHeight: 18,
    color: CORES.texto,
  },

  // Botão do PDF.
  botaoPdf: {
    width: '100%',
    minHeight: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 12,
    backgroundColor: CORES.verdePdf,
    borderRadius: 11,
  },
  nomePdf: {
    flex: 1,
    marginLeft: 7,
    fontFamily: FONTES.corpo,
    fontSize: 12.5,
    lineHeight: 17,
    color: CORES.texto,
  },

  // Título e lista das leis.
  tituloSessao: {
    marginBottom: 13,
    fontFamily: FONTES.titulo,
    fontSize: 23,
    lineHeight: 28,
    color: CORES.titulo,
    textAlign: 'center',
  },
  listaLeis: {
    width: '100%',
  },
  cartaoLei: {
    width: '100%',
    minHeight: 58,
    justifyContent: 'center',
    marginBottom: 11,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: CORES.verdeClaro,
    borderRadius: 15,
  },
  textoLei: {
    fontFamily: FONTES.corpoSemibold,
    fontSize: 13,
    lineHeight: 17,
    color: CORES.texto,
  },
});
