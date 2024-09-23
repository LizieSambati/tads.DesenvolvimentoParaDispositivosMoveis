// - Tela de jogos: memória, par ou impar, pedra-papel-tesoura, etc.)
// Um dos minigames deve utilizar algum módulo nativo do dispositivo (giroscópio, câmera, loca
// Deverão ser implementados 2 minigames distintos e em telas separadas (exemplo: jogo da velha, jogo dalização, etc.)
// Ao jogar, o atributo “diversão” do bichinho deverá ser atualizado
// Caso os alunos desejem implementar mais de 2 minigames, é permitido
// cara ou coroa, jogo da velha, forca, caça-palavra???

import { StyleSheet, View, ImageBackground, SafeAreaView, Pressable } from "react-native";
import { useNavigation } from 'expo-router';
import { useEffect } from "react";
import { RootStackParamList } from "./_layout";
import { StackNavigationProp } from "@react-navigation/stack";
import { CompositeNavigationProp, useRoute } from "@react-navigation/native";
import { useAttributes } from "@/components/Attributes";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import galaxy from "assets/images/galaxy5.jpg";


type GameScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, 'game'>,
    StackNavigationProp<RootStackParamList>
>;

type RouteParams = {
    id: number;
};

const Game = () => {
    const navigation = useNavigation<GameScreenNavigationProp>()
    const route = useRoute()
    const { id } = route.params as RouteParams;
    const { play } = useAttributes(id);

    useEffect(() => {
        play();
    }, [id]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={galaxy} style={styles.backgroundImage}>
                <View style={styles.goBack}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-circle-outline" size={48} color="#E6B400" />
                    </Pressable>
                </View>
                <View style={styles.container}>
                    <Pressable
                        onPress={() => navigation.navigate('jogoDaMemoria')}
                        style={styles.buttonContainer}
                    >
                        <MaterialCommunityIcons name="memory" size={184} color="#D3B4D9" />
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate('caraOuCoroa')}
                        style={styles.buttonContainer}
                    >
                        <MaterialCommunityIcons name="bitcoin" size={164} color="#D3B4D9" />
                    </Pressable>
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
    buttonContainer: {
        padding: 36,
    }
})
