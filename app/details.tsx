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
import { TouchableOpacity, StyleSheet, Text, View, ImageBackground, SafeAreaView } from "react-native";
import { useNavigation, useRouter } from 'expo-router';
import { Attributes } from "@/components/Attributes";
import { Condition } from "@/components/Condition";
import StatusIcons from "@/components/StatusIcons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import galaxy from "assets/images/galaxy4.jpg";

const Details = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const { hunger, sleep, hygiene, fun, eat, clean, medicine, light, setLight } = Attributes();
    const [isLightOn, setIsLightOn] = React.useState(light);

    const { message } = Condition({
        hunger,
        sleep,
        hygiene,
        fun
    });

    const handleAction = (action: () => void) => {
        action();
    };

    React.useEffect(() => {
        if (message === "Morto") {
            setIsLightOn(false);
        }
    }, [message]);

    const toggleLight = () => {
        if (message !== "Morto") {
            setIsLightOn(prevLight => !prevLight);
            setLight(prevLight => !prevLight);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={galaxy} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.menuLight}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons name="alien" size={48} color="#D3B4D9" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleLight} disabled={message === "Morto"}>
                            <MaterialCommunityIcons
                                name={isLightOn ? "lightbulb-on-outline" : "lightbulb"}
                                size={48}
                                color="#D3B4D9"
                            />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <StatusIcons
                            containerStyle={styles.statusContainer}
                            statusStyle={styles.status}
                            textStyle={styles.textIcon}
                            iconColor="#D3B4D9"
                            iconSize={58}
                            hunger={hunger}
                            sleep={sleep}
                            hygiene={hygiene}
                            fun={fun}
                        />
                    </View>

                    <Text style={styles.text}>
                        IMAGEM DO BICHINHO
                    </Text>

                    <Text style={styles.text}>
                        {message}
                    </Text>

                    {message !== "Morto" && isLightOn && (
                        <View style={styles.statusContainer}>
                            <TouchableOpacity
                                onPress={() => handleAction(eat)}>
                                <MaterialCommunityIcons name="food" size={72} color="#D3B4D9" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleAction(clean)}>
                                <MaterialCommunityIcons name="shower-head" size={72} color="#D3B4D9" />
                            </TouchableOpacity>
                        </View>
                    )}

                    <View>
                        {message !== "Crítico" && message !== "Morto" && isLightOn && (
                            <TouchableOpacity onPress={() => router.push('/game')}>
                                <MaterialCommunityIcons name="gamepad-variant-outline" size={96} color="#D3B4D9" />
                            </TouchableOpacity>
                        )}

                        {message === "Crítico" && (
                            <TouchableOpacity
                                onPress={() => handleAction(medicine)}>
                                <MaterialCommunityIcons name="pill" size={96} color="#D3B4D9" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default Details;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        alignItems: "center",
        flex: 1,
    },
    menuLight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        padding: 12,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        marginTop: 20,
    },
    status: {
        alignItems: "center",
        justifyContent: "center",
        width: 96,
        height: 96,
        padding: 4,
        // backgroundColor: "#4c1b",
    },
    textIcon: {
        color: "#D3B4D9",
        fontSize: 24,
        fontWeight: "600",
    },
    text: {
        color: "#D3B4D9",
        fontSize: 36,
        fontWeight: "500",
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        marginTop: 20,
        backgroundColor: "#D3B4D9",
    },
});