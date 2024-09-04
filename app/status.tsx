// - Tela de listagem de bichinhos:
// Listar imagem, o nome, atributos(saúde): alimentação + sono + higiene + diversão
// status (morto, crítico, muito triste, triste, ok, bem, muito bem)

import * as React from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useRouter } from 'expo-router';
import { Condition } from "@/components/Condition";
import { Attributes } from "@/components/Attributes";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const Status = () => {

  const router = useRouter();
  const { hunger, sleep, hygiene, fun } = Attributes();
  const { message } = Condition({ hunger, sleep, hygiene, fun });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>
          Nome do bichinho
        </Text>

        <Text>
          imagem do bichinho
        </Text>

        <View>
          <Text style={styles.textStatus}>
            {message}
            {/* idade do bichinho? */}
          </Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonsStyle}
            onPress={() => router.push('/game')}
          >
            <MaterialCommunityIcons name="gamepad-variant-outline" size={64} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonsStyle}
            onPress={() => router.push('/details')}
          >
            <MaterialCommunityIcons name="apps" size={64} color="black" />
          </TouchableOpacity>

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