import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StackScreenProps } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from '@/components/Header';
import { SQLiteProvider } from 'expo-sqlite';
import { initDatabase } from './database/initDatabase';

export type RootStackParamList = {
  index: undefined;
  status: undefined;
  details: { id: number };
  register: undefined;
  game: undefined;
  caraOuCoroa: undefined;
  jogoDaMemoria: undefined;
};

export type IndexScreenProps = StackScreenProps<RootStackParamList, 'index'>;
export type StatusScreenProps = StackScreenProps<RootStackParamList, 'status'>;
export type DetailsScreenProps = StackScreenProps<RootStackParamList, 'details'>;
export type CreateScreenProps = StackScreenProps<RootStackParamList, 'register'>;
export type GameScreenProps = StackScreenProps<RootStackParamList, 'game'>;
export type CaraOuCoroaScreenProps = StackScreenProps<RootStackParamList, 'caraOuCoroa'>;
export type jogoDaMemoriaScreenProps = StackScreenProps<RootStackParamList, 'jogoDaMemoria'>;

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SQLiteProvider databaseName="tamagotchi.db" onInit={initDatabase}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ header: () => <Header title="Há muito tempo..." /> }}
          />
          <Stack.Screen
            name="status"
            options={{ header: () => <Header title="Status" /> }}
          />
          <Stack.Screen
            name="details"
            options={{ header: () => <Header title="Detalhes" /> }}
          />
          <Stack.Screen
            name="register"
            options={{ header: () => <Header title="Novo Tamagotchi" /> }}
          />
          <Stack.Screen
            name="game"
            options={{ header: () => <Header title="Jogos" /> }}
          />
          <Stack.Screen
            name="caraOuCoroa"
            options={{ header: () => <Header title="Cara Ou Coroa?" /> }}
          />
          <Stack.Screen
            name="jogoDaMemoria"
            options={{ header: () => <Header title="Jogo Da Memória" /> }}
          />
        </Stack>
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
}
