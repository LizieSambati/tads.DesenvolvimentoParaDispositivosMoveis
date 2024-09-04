import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Header from '@/components/Header';
import { StackScreenProps } from '@react-navigation/stack';

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
export type ListScreenProps = StackScreenProps<RootStackParamList, 'list'>;

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
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
      <Stack.Screen
        name="list"
        options={{ header: () => <Header title="Listagem" /> }}
      />
    </Stack>
  );
}
