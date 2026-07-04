import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { GentiumBookPlus_700Bold } from '@expo-google-fonts/gentium-book-plus';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FONTES } from './src/estilos/fontes';

import TelaInicial from './src/telas/TelaInicial';
import TelaNos from './src/telas/TelaNos';
import TelaDetalheNo from './src/telas/TelaDetalheNo';
import TelaAmarras from './src/telas/TelaAmarras';
import TelaLeis from './src/telas/TelaLeis';
import TelaAcampamento from './src/telas/TelaAcampamento';
import TelaSobre from './src/telas/TelaSobre';
import TelaBussola from './src/telas/TelaBussola';
import TelaMorse from './src/telas/TelaMorse';

const Navegacao = createStackNavigator();

export default function App() {
  // Fontes usadas em todos os textos do aplicativo.
  const [fontesCarregadas] = useFonts({
    GentiumBookPlus_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontesCarregadas) {
    return (
      <View style={estilosCarregamento.conteiner}>
        <ActivityIndicator color="#5F6D49" />
      </View>
    );
  }

  return (
    // SafeAreaProvider deixa as navbars respeitarem status bar e barra inferior.
    <SafeAreaProvider>
      <NavigationContainer>
        {/* Pilha principal de telas do aplicativo. */}
        <Navegacao.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#5F6D49' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: FONTES.corpoSemibold,
            },
          }}
        >
          <Navegacao.Screen
            name="Início"
            component={TelaInicial}
            options={{ headerShown: false }}
          />
          <Navegacao.Screen
            name="Nós Escoteiros"
            component={TelaNos}
            options={{ headerShown: false }}
          />
          <Navegacao.Screen
            name="Detalhe do Nó"
            component={TelaDetalheNo}
            options={{ headerShown: false }}
          />
          <Navegacao.Screen
            name="Amarras"
            component={TelaAmarras}
            options={{ headerShown: false }}
          />
          <Navegacao.Screen
            name="Leis Escoteiras"
            component={TelaLeis}
            options={{ headerShown: false }}
          />
          <Navegacao.Screen
            name="Acampamento"
            component={TelaAcampamento}
            options={{ headerShown: false }}
          />
          <Navegacao.Screen
            name="Bússola"
            component={TelaBussola}
            options={{ headerShown: false }}
          />
          <Navegacao.Screen
            name="Código Morse"
            component={TelaMorse}
            options={{ headerShown: false }}
          />
          <Navegacao.Screen
            name="Sobre"
            component={TelaSobre}
            options={{ headerShown: false }}
          />
        </Navegacao.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const estilosCarregamento = StyleSheet.create({
  conteiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
});
