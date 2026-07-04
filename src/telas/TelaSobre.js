import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FONTES } from '../estilos/fontes';
import BarraSuperior from '../componentes/BarraSuperior';

const CORES = {
  fundo: '#FFFFFF',
  titulo: '#3E3A36',
  texto: '#243142',
  verde: '#5F6D49',
  verdeClaro: '#C7D0BC',
};

const TAMANHOS = {
  margemHorizontal: 28,
  larguraMaximaConteudo: 330,
};

export default function TelaSobre({ navigation }) {
  return (
    <View style={estilos.tela}>
      {/* Navbar superior com acesso ao menu lateral. */}
      <BarraSuperior />

      {/* Conteúdo rolável da tela sobre o projeto. */}
      <ScrollView
        style={estilos.areaRolavel}
        contentContainerStyle={estilos.conteudoRolavel}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        scrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.conteudo}>
          {/* Ícone principal da seção Sobre. */}
          <View style={estilos.areaIcone}>
            <Feather name="info" size={36} color={CORES.verde} />
          </View>

          <Text style={estilos.tituloSessao}>Sobre</Text>

          <Text style={estilos.textoIntrodutorio}>
            Este guia de bolso foi pensado para jovens de 10 a 17 anos que
            fazem parte do escotismo e precisam consultar informações rápidas
            durante atividades, reuniões, acampamentos e desafios em patrulha.
          </Text>

          <Text style={estilos.textoIntrodutorio}>
            A proposta é reunir conteúdos práticos em um lugar simples de
            acessar: nós, amarras, leis escoteiras e uma lista de apoio para
            organizar a mochila antes do acampamento.
          </Text>

          <Text style={estilos.textoIntrodutorio}>
            O projeto busca ajudar o jovem escoteiro a ganhar autonomia,
            revisar conhecimentos importantes e se preparar melhor para viver
            as atividades com responsabilidade, colaboração e espírito de
            aventura.
          </Text>
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
    paddingTop: 28,
    paddingBottom: 30,
  },
  conteudo: {
    width: '100%',
    maxWidth: TAMANHOS.larguraMaximaConteudo,
    alignItems: 'center',
  },

  // Ícone visual da tela Sobre.
  areaIcone: {
    width: 68,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    backgroundColor: CORES.verdeClaro,
    borderWidth: 2,
    borderColor: CORES.verde,
    borderRadius: 34,
  },

  // Textos da tela Sobre.
  tituloSessao: {
    marginBottom: 20,
    fontFamily: FONTES.titulo,
    fontSize: 24,
    lineHeight: 29,
    color: CORES.titulo,
    textAlign: 'center',
  },
  textoIntrodutorio: {
    width: '100%',
    marginBottom: 14,
    fontFamily: FONTES.corpo,
    fontSize: 15.5,
    lineHeight: 21,
    color: CORES.texto,
    textAlign: 'left',
  },
});
