// - Tela de jogos:
// Deverão ser implementados 2 minigames distintos e em telas separadas (exemplo: jogo da velha, jogo da memória, par ou impar, pedra-papel-tesoura, etc.)
// Um dos minigames deve utilizar algum módulo nativo do dispositivo (giroscópio, câmera, localização, etc.)
// Ao jogar, o atributo “diversão” do bichinho deverá ser atualizado
// Caso os alunos desejem implementar mais de 2 minigames, é permitido

import { Button, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    text: {
        color: "#f1f8"
    }
})

const Game = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                ir para jogo 1
                ir para jogo 2
                ir para jogo 3...

                mostrar status de felicidade
            </Text>

        </View>
    );
}

export default Game;