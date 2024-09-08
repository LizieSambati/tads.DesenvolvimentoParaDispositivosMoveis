// - Tela de listagem de bichinhos:
// Listar imagem, o nome, atributos(saúde): alimentação + sono + higiene + diversão
// status (morto, crítico, muito triste, triste, ok, bem, muito bem)

import * as React from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, FlatList, Image } from "react-native";
import { useRouter } from 'expo-router';
import { Condition } from "@/components/Condition";
import { Attributes } from "@/components/Attributes";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import alien1 from "assets/images/alien-gangster-chefao.png";
import alien2 from "assets/images/alien-gangster-estiloso.png";
import alien3 from "assets/images/alien-gangster-chapado.png";
import alien4 from "assets/images/alien-gangster-dancarino.png";

const Status = () => {

  const router = useRouter();
  const { hunger, sleep, hygiene, fun } = Attributes();
  const { message } = Condition({ hunger, sleep, hygiene, fun });

  const imageArray = [alien1, alien2, alien3, alien4]


  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <TouchableOpacity style={styles.buttonsStyle}
            onPress={() => router.push('/details')}
          >
            <View>
              <FlatList data={imageArray} renderItem={({ index, item }) => {
                return (<TouchableOpacity onPress={() => router.push('/details')}>
                  <Image style={Image === index} source={item} />
                </TouchableOpacity>)
              }} />
            </View>
            {/* <MaterialCommunityIcons name="apps" size={64} color="black" /> */}
          </TouchableOpacity>
          <Text style={styles.text}>
            Nome do bichinho
          </Text>
          <View>
            <Text style={styles.textStatus}>
              {message}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
export default Status;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 28,
  },
  imageContainer: {
    aspectRatio: 4 / 4,
    resizeMode: 'cover',
    width: '100%',
    padding: 128,
    height: 100,
    margin: 4,
    backgroundColor: 'blue',
  },
  text: {
    color: "#f12"
  },
  textStatus: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
  },
  buttonsStyle: {
    padding: 10,
    // backgroundColor: 'red',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
})