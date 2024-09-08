import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StackScreenProps } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from '@/components/Header';
import { SQLiteProvider } from 'expo-sqlite';
// import { initDatabase } from './database/initDatabase';

export type RootStackParamList = {
  index: undefined;
  status: undefined;
  details: undefined;
  create: undefined;
  game: undefined;
  caraOuCoroa: undefined;
  list: undefined;
};

export type IndexScreenProps = StackScreenProps<RootStackParamList, 'index'>;
export type StatusScreenProps = StackScreenProps<RootStackParamList, 'status'>;
export type DetailsScreenProps = StackScreenProps<RootStackParamList, 'details'>;
export type CreateScreenProps = StackScreenProps<RootStackParamList, 'create'>;
export type GameScreenProps = StackScreenProps<RootStackParamList, 'game'>;
export type CaraOuCoroaScreenProps = StackScreenProps<RootStackParamList, 'caraOuCoroa'>;

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    // <SQLiteProvider databaseName={''} onInit={initDatabase}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ header: () => <Header title="TAMAGOTCHI" /> }}
        />
        <Stack.Screen
          name="status"
          options={{ header: () => <Header title="status" /> }}
        />
        <Stack.Screen
          name="details"
          options={{ header: () => <Header title="detalhes" /> }}
        />
        <Stack.Screen
          name="create"
          options={{ header: () => <Header title="novo bichinho!!!" /> }}
        />
        <Stack.Screen
          name="game"
          options={{ header: () => <Header title="Jogos" /> }}
        />
        <Stack.Screen
          name="caraOuCoroa"
          options={{ header: () => <Header title="Cara Ou Coroa?" /> }}
        />
      </Stack>
    </GestureHandlerRootView>
    // </SQLiteProvider>
  );
}
