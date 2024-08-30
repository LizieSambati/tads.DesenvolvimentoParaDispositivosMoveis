import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Header from '@/components/Header';

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
    </Stack>
  );
}
