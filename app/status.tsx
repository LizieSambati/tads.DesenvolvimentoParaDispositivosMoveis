// - Tela de listagem de bichinhos:
// Listar imagem, o nome, atributos(saúde): alimentação + sono + higiene + diversão
// status (morto, crítico, muito triste, triste, ok, bem, muito bem)

import * as React from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, FlatList, Image, ImageBackground } from "react-native";
import { useNavigation, useRouter } from 'expo-router';
import { Condition } from "@/components/Condition";
import { Attributes } from "@/components/Attributes";
import { CompositeNavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './_layout';
import { StackNavigationProp } from '@react-navigation/stack';
import StatusIcons from "@/components/StatusIcons";
import Ionicons from '@expo/vector-icons/Ionicons';

import alien1 from "assets/images/alien-gangster-chefao.png";
import alien2 from "assets/images/alien-gangster-estiloso.png";
import alien3 from "assets/images/alien-gangster-chapado.png";
import alien4 from "assets/images/alien-gangster-dancarino.png";
import galaxy from "assets/images/galaxy1.jpg";


type ScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'status'>,
  StackNavigationProp<RootStackParamList>
>;

const Status = () => {

  const navigation = useNavigation<ScreenNavigationProp>()
  const router = useRouter();
  const { hunger, sleep, hygiene, fun } = Attributes();
  const { message } = Condition({ hunger, sleep, hygiene, fun });

  const imageArray = [alien1, alien2, alien3, alien4];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={galaxy} style={styles.backgroundImage}>

        <View style={styles.menuPlanet}>
          <TouchableOpacity onPress={() => navigation.navigate('index')}>
            <Ionicons name="planet" size={48} color="#D3B4D9" />
          </TouchableOpacity>
        </View>

        <FlatList data={imageArray} renderItem={({ index, item }) => {
          return (
            <View style={styles.itemContainer}>

              <Text style={styles.textName}>
                Nome do bichinho {index + 1}
              </Text>

              <Text style={styles.textStatus}>
                {message}
              </Text>

              <TouchableOpacity onPress={() => router.push('/details')}>
                <Image style={styles.image} source={item} />
              </TouchableOpacity>

              <StatusIcons
                containerStyle={styles.statusContainer}
                statusStyle={styles.status}
                textStyle={styles.textNumber}
                iconColor="#D3B4D9"
                iconSize={40}
                hunger={hunger}
                sleep={sleep}
                hygiene={hygiene}
                fun={fun}
              />
            </View>

          );
        }}
          numColumns={2}
          keyExtractor={(index) => index.toString()}
        />
      </ImageBackground >
    </SafeAreaView >
  );
}
export default Status;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  menuPlanet: {
    flexDirection: 'row',
    padding: 12,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    marginBottom: 50,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  textName: {
    color: "#D3B4D9",
    fontSize: 20,
    fontWeight: '500',
  },
  textStatus: {
    fontSize: 24,
    color: "white",
    paddingBottom: 6,
  },
  textNumber: {
    color: "white",
    fontSize: 20,
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  status: {
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
  },

});