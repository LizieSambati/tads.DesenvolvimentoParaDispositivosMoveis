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
import { useNavigation, useRouter } from 'expo-router';
import { Attributes } from "@/components/Attributes";
import { Condition } from "@/components/Condition";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Details = () => {

    const router = useRouter();
    const { hunger, sleep, hygiene, fun, eat, clean, medicine, light, setLight } = Attributes();
    const [currentHunger, setHunger] = useState(hunger);
    const [currentSleep, setSleep] = useState(sleep);
    const [currentHygiene, setHygiene] = useState(hygiene);
    const [currentFun, setFun] = useState(fun);

    useEffect(() => {
        setHunger(hunger);
        setSleep(sleep);
        setHygiene(hygiene);
        setFun(fun);
    }, [hunger, sleep, hygiene, fun]);

    const navigation = useNavigation()

    const { message } = Condition({
        hunger: currentHunger,
        sleep: currentSleep,
        hygiene: currentHygiene,
        fun: currentFun
    });

    const handleAction = (action: () => void) => {
        action();
        setHunger(hunger);
        setSleep(sleep);
        setHygiene(hygiene);
        setFun(fun);
    };

    const toggleLight = () => {
        setLight(!light);
    };

    return (
        <View style={styles.container}>
            <View style={styles.menuLight}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="alien" size={48} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleLight}>
                    <MaterialCommunityIcons
                        name={light ? "lightbulb-on-outline" : "lightbulb"}
                        size={48}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.statusContainer}>
                <View style={styles.status}>
                    <Text style={styles.text}>{hunger}%</Text>
                    <MaterialCommunityIcons name="arm-flex-outline" size={48} color="black" />
                </View>
                <View style={styles.status}>
                    <Text style={styles.text}>{hygiene}%</Text>
                    <MaterialCommunityIcons name="paper-roll-outline" size={48} color="black" />

                </View>
                <View style={styles.status}>
                    <Text style={styles.text}>{sleep}%</Text>
                    <MaterialCommunityIcons name="sleep" size={48} color="black" />
                </View>
                <View style={styles.status}>
                    <Text style={styles.text}>{fun}%</Text>
                    <MaterialCommunityIcons name="star-face" size={48} color="black" />
                </View>
            </View>
            <Text style={styles.text}>
                imagem,
            </Text>
            <Text style={styles.text}>
                {message}
            </Text>
            <View style={styles.statusContainer}>
                <TouchableOpacity
                    onPress={() => handleAction(eat)}>
                    <MaterialCommunityIcons name="food" size={48} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleAction(clean)}>
                    <MaterialCommunityIcons name="shower-head" size={48} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/game')}>
                    <MaterialCommunityIcons name="gamepad-variant-outline" size={48} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleAction(medicine)}>
                    <MaterialCommunityIcons name="pill" size={48} color="black" />
                </TouchableOpacity>
            </View>

            {/* botão configurações->resetar jogo??? */}
        </View>
    );
}
export default Details;

const styles = StyleSheet.create({
    container: {
        // justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    status: {
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        bottom: 20,
        right: 20,
        height: 60,
        backgroundColor: "#4c1b",
    },
    text: {
        color: "#5178",
        fontSize: 20,
        fontWeight: "500",
    },
    menuLight: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        padding: 10,
        backgroundColor: "#4fab",
    },
})