// - Tela de listagem de bichinhos:
// Listar imagem, o nome, atributos(saúde): alimentação + sono + higiene + diversão
// status (morto, crítico, muito triste, triste, ok, bem, muito bem)

import { Button, StyleSheet, Text, View } from "react-native";

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
      <Text style={styles.text}>
        Nome,
        imagem,
        saúde,
        status de vida,
        ...ir para tela de datalhes details.tsx...
      </Text>

    </View>
  );
}

export default Status;