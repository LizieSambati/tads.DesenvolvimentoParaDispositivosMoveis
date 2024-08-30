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
  // const { message, action } = Condition({message});

  // Você pode usar `action()` aqui para disparar a ação se necessário. ?????



  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>
          Nome
          imagem
          idade??
        </Text>

        <Text style={styles.text}>
          {/* {message} */}
        </Text>

        <TouchableOpacity
          onPress={() => router.push('/details')}
        >
          <MaterialCommunityIcons name="apps" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/game')}
        >
          <MaterialCommunityIcons name="gamepad-variant-outline" size={24} color="black" />
        </TouchableOpacity>
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
})