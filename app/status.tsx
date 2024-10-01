// - Tela de listagem de bichinhos:
// Listar imagem, o nome, atributos(saúde): alimentação + sono + higiene + diversão
// status (morto, crítico, muito triste, triste, ok, bem, muito bem)


import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ActivityIndicator, ImageBackground, SafeAreaView, Pressable } from 'react-native';
import StatusIcons from '../components/StatusIcons';
import { characters } from '@/components/Characters';
import { useDatabase } from '../app/database/service';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from 'expo-router';
import { CompositeNavigationProp, useIsFocused } from '@react-navigation/native';
import { RootStackParamList } from './_layout';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAttributes } from "@/components/Attributes";
import { getConditionInfo } from "@/components/Condition";

import galaxy from "assets/images/galaxy1.jpg";


type Tamagotchi = {
  id: number;
  image: number;
  name: string;
};

type AttributesProps = {
  hunger: number;
  sleep: number;
  hygiene: number;
  fun: number;
};

type ScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'status'>,
  StackNavigationProp<RootStackParamList>
>;

const Status = () => {

  const navigation = useNavigation<ScreenNavigationProp>();
  const { getTamagotchis } = useDatabase();
  const [tamagotchis, setTamagotchis] = useState<Tamagotchi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useFocusEffect(
    React.useCallback(() => {
      const fetchTamagotchis = async () => {
        try {
          const tamagotchisList = await getTamagotchis();
          if (tamagotchisList.length === 0) {
            setError("Você não tem Tamagotchis");
          } else {
            setTamagotchis(tamagotchisList);
          }
        } catch (err) {
          console.error('Erro ao buscar Tamagotchis:', err);
          setError("Erro ao buscar Tamagotchis.");
        } finally {
          setLoading(false);
        }
      };

      fetchTamagotchis();
    }, [tamagotchis]));

  if (loading) {
    return <ActivityIndicator size="large" color="#D3B4D9" />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground source={galaxy} style={styles.backgroundImage}>
          <View style={styles.menuPlanet}>
            <Pressable onPress={() => navigation.navigate('index')}>
              <Ionicons name="arrow-back-circle-outline" size={48} color="#D3B4D9" />
            </Pressable>
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={galaxy} style={styles.backgroundImage}>
        <View style={styles.menuPlanet}>
          <Pressable onPress={() => navigation.navigate('index')}>
            <Ionicons name="planet" size={48} color="#D3B4D9" />
          </Pressable>
        </View>
        <FlatList
          data={tamagotchis}
          renderItem={({ item }) => <TamagotchiItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.statusContainer}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};


export const TamagotchiItem = ({ item }: { item: Tamagotchi }) => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const { light, setLight, eat, clean, play, hunger, sleep, hygiene, fun, fetchState } = useAttributes(item.id);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchState();
    }
  }, [isFocused]);


  const condition = getConditionInfo({ hunger, sleep, hygiene, fun }).message;

  return (
    <View style={styles.itemContainer}>
      <View style={styles.displayContainer}>
        <Text style={styles.textName}>{item.name}</Text>
        <StatusIcons
          hunger={hunger}
          sleep={sleep}
          hygiene={hygiene}
          fun={fun}
          iconColor="#D3B4D9"
          iconSize={48}
          textStyle={styles.textIcon}
        />
        <View>
          <Text style={styles.textCondition}>{condition}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('details', { id: item.id })}>
          <Image
            source={characters[item.image]?.charactere || require('assets/images/radioactive.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </View >
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    padding: 2,
    marginLeft: 20,
    marginBottom: 10,
  },
  displayContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#D3B4D9',
    textAlign: 'left',
    padding: 4,
  },
  textIcon: {
    color: "#E6B400",
    fontSize: 20,
    fontWeight: "600",
  },
  textCondition: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D3B4D9',
    textAlign: 'right',
    padding: 4,
  },
  menuPlanet: {
    flexDirection: 'row',
    padding: 12,
  },
  image: {
    width: 150,
    height: 160,
    resizeMode: 'contain',
  },
  statusContainer: {
    padding: 20,
    color: '#D3B4D9',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: "#E6B400",
    fontSize: 26,
    fontWeight: "500",
  },
});

export default Status;








