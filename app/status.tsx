// - Tela de listagem de bichinhos:
// Listar imagem, o nome, atributos(saúde): alimentação + sono + higiene + diversão
// status (morto, crítico, muito triste, triste, ok, bem, muito bem)


import * as React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";


const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: {
    color: "#f12"
  }
})


const Status = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>
          Nome,
          imagem,
          saúde,
          status de vida,
        </Text>
      </SafeAreaView>
    </View>
  );
}

export default Status;