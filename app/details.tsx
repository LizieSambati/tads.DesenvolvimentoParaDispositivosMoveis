// - Tela de detalhes do bichinho:
//  Acessada através da listagem, deve mostrar a imagem do bichinho, sua foto, atributos, status e fornecer as opções:
// 	Alimentar: irá alimentar o bichinho, e por consequência aumentar o seu atributo “fome”
// 	Dormir: Irá colocar o bichinho para dormir, aumentando seu atributo “sono”
// 	Brincar: Irá abrir a tela de jogos
// deve mostrar:
// 	imagem do bichinho
// 	status (morto, crítico, muito triste, triste, ok, bem, muito bem)
// 	fornecer as opções:
// 		alimentação: dar comida aumenta o nível de alimentação
// 			0% alimentado a 100% alimentado
// 		sono: a iluminação determina se o bichinho irá dormir ou não
// 			Luz acesa/apagada
// 		higiene: cuidar dos dejetos do bichinho
// 		diversão: o bichinho se tornará mais feliz brincando nos jogos
// 			Irá abrir a tela de jogos

import * as React from 'react';
import { useState, useEffect } from "react";
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useRouter } from 'expo-router';
import { Attributes } from "@/components/Attributes";
import { Condition } from "@/components/Condition";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Details = () => {

    const router = useRouter();
    const { hunger, sleep, hygiene, fun, eat, clean, rest, medicine } = Attributes();
    const [currentHunger, setHunger] = useState(hunger);
    const [currentSleep, setSleep] = useState(sleep);
    const [currentHygiene, setHygiene] = useState(hygiene);
    const [currentFun, setFun] = useState(fun);

    // Atualiza os estados locais com os valores do Attributes
    useEffect(() => {
        setHunger(hunger);
        setSleep(sleep);
        setHygiene(hygiene);
        setFun(fun);
    }, [hunger, sleep, hygiene, fun]);

    // Atualiza a condição sempre que os valores mudarem
    const { message } = Condition({ hunger: currentHunger, sleep: currentSleep, hygiene: currentHygiene, fun: currentFun });

    // Função para executar a ação e atualizar os estados locais
    const handleAction = (action: () => void) => {
        action();
        // Atualiza os valores de estado depois da ação
        setHunger(hunger);
        setSleep(sleep);
        setHygiene(hygiene);
        setFun(fun);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {message}
            </Text>
            <Text style={styles.text}>
                imagem,
            </Text>
            <TouchableOpacity onPress={() => router.push('/status')}>
                <MaterialCommunityIcons name="alien" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.status}>
                <Text>{hunger}%</Text>
                <MaterialCommunityIcons name="arm-flex-outline" size={24} color="black" />
            </View>
            <View style={styles.status}>
                <Text>{hygiene}%</Text>
                <MaterialCommunityIcons name="paper-roll-outline" size={24} color="black" />
                <MaterialCommunityIcons name="emoticon-poop" size={24} color="black" />
            </View>
            <View style={styles.status}>
                <Text>{sleep}%</Text>
                <MaterialCommunityIcons name="sleep" size={24} color="black" />
            </View>
            <View style={styles.status}>
                <Text>{fun}%</Text>
                <MaterialCommunityIcons name="star-face" size={24} color="black" />
            </View>

            <TouchableOpacity
                onPress={() => handleAction(eat)}>
                <MaterialCommunityIcons name="food" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleAction(clean)}>
                <MaterialCommunityIcons name="shower-head" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleAction(rest)}>
                <MaterialCommunityIcons name="lightbulb" size={24} color="black" />
                <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/game')}>
                <MaterialCommunityIcons name="gamepad-variant-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleAction(medicine)}>
                <MaterialCommunityIcons name="pill" size={24} color="black" />
            </TouchableOpacity>

            {/* botão configurações->resetar jogo??? */}
        </View>
    );
}
export default Details;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    status: {
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        bottom: 20,
        right: 20,
        height: 60,
        backgroundColor: "#4fab",
    },
    text: {
        color: "#5178"
    }
})