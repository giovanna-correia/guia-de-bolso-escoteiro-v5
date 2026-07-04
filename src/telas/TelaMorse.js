import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FONTES } from '../estilos/fontes';
import BarraSuperior from '../componentes/BarraSuperior';
import {
  alfabetoMorse,
  codigoMorse,
  textoIntroducaoMorse,
} from '../dados/morse';

const CORES = {
  fundo: '#FFFFFF',
  titulo: '#3E3A36',
  texto: '#243142',
  verde: '#5F6D49',
  verdeClaro: '#C7D0BC',
  verdeMedio: '#E0E3D8',
  borda: '#D8D8D8',
  placeholder: '#A8A8A8',
  branco: '#FFFFFF',
};

const TAMANHOS = {
  margemHorizontal: 28,
  larguraMaximaConteudo: 330,
};

function converterParaMorse(texto) {
  return texto
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(' ')
    .map((palavra) =>
      palavra
        .split('')
        .map((caractere) => codigoMorse[caractere] || '')
        .filter(Boolean)
        .join(' ')
    )
    .filter(Boolean)
    .join(' / ');
}

export default function TelaMorse({ navigation }) {
  const [mensagem, setMensagem] = useState('');

  const mensagemConvertida = useMemo(
    () => converterParaMorse(mensagem),
    [mensagem]
  );

  return (
    <View style={estilos.tela}>
      {/* Navbar superior com acesso ao menu lateral. */}
      <BarraSuperior />

      {/* Conteúdo rolável do conversor Morse. */}
      <ScrollView
        style={estilos.areaRolavel}
        contentContainerStyle={estilos.conteudoRolavel}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        scrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.conteudo}>
          <Text style={estilos.tituloSessao}>Código Morse</Text>

          <Text style={estilos.textoIntrodutorio}>
            {textoIntroducaoMorse}
          </Text>

          {/* Campo onde a mensagem é digitada. */}
          <TextInput
            style={estilos.campoMensagem}
            value={mensagem}
            onChangeText={setMensagem}
            placeholder="Digite uma mensagem"
            placeholderTextColor={CORES.placeholder}
            multiline
          />

          {/* Card com a mensagem convertida para Morse. */}
          <View style={estilos.cartaoResultado}>
            <Text style={estilos.rotuloResultado}>Resultado</Text>
            <Text style={estilos.textoResultado}>
              {mensagemConvertida || 'A mensagem em Morse aparecerá aqui.'}
            </Text>
          </View>

          {/* Botão que limpa o campo da mensagem. */}
          <TouchableOpacity
            activeOpacity={0.84}
            style={estilos.botaoLimpar}
            onPress={() => setMensagem('')}
          >
            <Feather name="trash-2" size={15} color={CORES.branco} />
            <Text style={estilos.textoBotaoLimpar}>LIMPAR</Text>
          </TouchableOpacity>

          <Text style={estilos.subtitulo}>Tabela rápida</Text>

          {/* Tabela de consulta rápida do alfabeto Morse. */}
          <View style={estilos.gradeMorse}>
            {alfabetoMorse.map((item) => (
              <View key={item.caractere} style={estilos.cartaoMorse}>
                <Text style={estilos.caractereMorse}>{item.caractere}</Text>
                <Text style={estilos.codigoMorse}>{item.codigo}</Text>
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
    paddingTop: 24,
    paddingBottom: 30,
  },
  conteudo: {
    width: '100%',
    maxWidth: TAMANHOS.larguraMaximaConteudo,
  },

  // Textos da seção.
  tituloSessao: {
    marginBottom: 16,
    fontFamily: FONTES.titulo,
    fontSize: 24,
    lineHeight: 29,
    color: CORES.titulo,
    textAlign: 'center',
  },
  textoIntrodutorio: {
    marginBottom: 15,
    fontFamily: FONTES.corpo,
    fontSize: 14.5,
    lineHeight: 20,
    color: CORES.texto,
  },

  // Campo de digitação.
  campoMensagem: {
    width: '100%',
    minHeight: 88,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: FONTES.corpo,
    fontSize: 15,
    lineHeight: 20,
    color: CORES.texto,
    textAlignVertical: 'top',
    backgroundColor: CORES.fundo,
    borderWidth: 1,
    borderColor: CORES.borda,
    borderRadius: 8,
  },

  // Resultado da conversão.
  cartaoResultado: {
    width: '100%',
    minHeight: 86,
    marginBottom: 12,
    padding: 12,
    backgroundColor: CORES.verdeMedio,
    borderRadius: 10,
  },
  rotuloResultado: {
    marginBottom: 6,
    fontFamily: FONTES.corpoNegrito,
    fontSize: 13,
    lineHeight: 17,
    color: CORES.verde,
  },
  textoResultado: {
    fontFamily: FONTES.corpoSemibold,
    fontSize: 16,
    lineHeight: 22,
    color: CORES.texto,
  },

  // Botão limpar.
  botaoLimpar: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginBottom: 18,
    paddingHorizontal: 16,
    backgroundColor: CORES.verde,
    borderRadius: 6,
  },
  textoBotaoLimpar: {
    marginLeft: 6,
    fontFamily: FONTES.corpoNegrito,
    fontSize: 13,
    lineHeight: 17,
    color: CORES.branco,
  },

  // Tabela de consulta Morse.
  subtitulo: {
    marginBottom: 10,
    fontFamily: FONTES.titulo,
    fontSize: 21,
    lineHeight: 25,
    color: CORES.titulo,
    textAlign: 'center',
  },
  gradeMorse: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cartaoMorse: {
    width: '23%',
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: CORES.verdeClaro,
    borderRadius: 8,
  },
  caractereMorse: {
    fontFamily: FONTES.corpoNegrito,
    fontSize: 15,
    lineHeight: 19,
    color: CORES.verde,
  },
  codigoMorse: {
    fontFamily: FONTES.corpoSemibold,
    fontSize: 12.5,
    lineHeight: 16,
    color: CORES.texto,
  },
});
