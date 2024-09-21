// - Tela de jogos:
// Deverão ser implementados 2 minigames distintos e em telas separadas (exemplo: jogo da velha, jogo da memória, par ou impar, pedra-papel-tesoura, etc.)
// Um dos minigames deve utilizar algum módulo nativo do dispositivo (giroscópio, câmera, localização, etc.)
// Ao jogar, o atributo “diversão” do bichinho deverá ser atualizado
// Caso os alunos desejem implementar mais de 2 minigames, é permitido
// cara ou coroa, jogo da velha, forca, caça-palavra???

import { StyleSheet, View, TouchableOpacity, ImageBackground, SafeAreaView } from "react-native";
import { useNavigation, useRouter } from 'expo-router';
import { RootStackParamList } from "./_layout";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import galaxy from "assets/images/galaxy5.jpg";

type GameScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, 'game'>,
    StackNavigationProp<RootStackParamList>
>;

const Game = () => {

    const navigation = useNavigation<GameScreenNavigationProp>()

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={galaxy} style={styles.backgroundImage}>
                <View style={styles.goBack}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-circle-outline" size={64} color="#D3B4D9" />
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('caraOuCoroa')}
                    >
                        <MaterialCommunityIcons name="bitcoin" size={64} color="#D3B4D9" />
                    </TouchableOpacity>
                </View>
            </ImageBackground >
        </SafeAreaView >
    );
}
export default Game;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    goBack: {
        flexDirection: 'row',
        padding: 12,
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
})
