// - Tela de jogos:
// Deverão ser implementados 2 minigames distintos e em telas separadas (exemplo: jogo da velha, jogo da memória, par ou impar, pedra-papel-tesoura, etc.)
// Um dos minigames deve utilizar algum módulo nativo do dispositivo (giroscópio, câmera, localização, etc.)
// Ao jogar, o atributo “diversão” do bichinho deverá ser atualizado
// Caso os alunos desejem implementar mais de 2 minigames, é permitido
// cara ou coroa, jogo da velha, forca, caça-palavra???

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import { Condition } from "@/components/Condition";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Game = () => {
    const { message } = Condition({ message });

    const router = useRouter();

    return (

        <View style={styles.container}>

            <Text style={styles.text}>
                {message}
            </Text>

            <Text style={styles.text}>
                ir para jogo 1
                ir para jogo 2
                ir para jogo 3...
                mostrar status de felicidade
            </Text>
            <TouchableOpacity
                onPress={() => router.push('/status')}
            >
                <MaterialCommunityIcons name="alien" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}
export default Game;

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
