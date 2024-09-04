// - Tela de jogos:
// Deverão ser implementados 2 minigames distintos e em telas separadas (exemplo: jogo da velha, jogo da memória, par ou impar, pedra-papel-tesoura, etc.)
// Um dos minigames deve utilizar algum módulo nativo do dispositivo (giroscópio, câmera, localização, etc.)
// Ao jogar, o atributo “diversão” do bichinho deverá ser atualizado
// Caso os alunos desejem implementar mais de 2 minigames, é permitido
// cara ou coroa, jogo da velha, forca, caça-palavra???

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation, useRouter } from 'expo-router';
import { Condition } from "@/components/Condition";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from "./_layout";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";

type GameScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, 'game'>,
    StackNavigationProp<RootStackParamList>
>;

const Game = () => {

    const navigation = useNavigation<GameScreenNavigationProp>()

    return (

        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('status')}
            >
                <MaterialCommunityIcons name="alien" size={64} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('caraOuCoroa')}
            >
                <MaterialCommunityIcons name="bitcoin" size={64} color="black" />
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
