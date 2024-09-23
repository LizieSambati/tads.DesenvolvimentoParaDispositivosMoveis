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
import { TouchableOpacity, StyleSheet, Text, View, ImageBackground, SafeAreaView, Image, Pressable } from "react-native";
import { useRoute, useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useAttributes } from "@/components/Attributes";
import { getConditionInfo } from "@/components/Condition";
import { useDatabase } from '../app/database/service';

import galaxy from "assets/images/galaxy4.jpg";
import { characters } from '@/components/Characters';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import StatusIcons from "@/components/StatusIcons";

type RouteParams = {
    id: number;
};

const Details = () => {
    const route = useRoute()

    const navigation = useNavigation();
    const { updateTamagotchi, getTamagotchiImage } = useDatabase();
    const { id } = route.params as RouteParams;
    const { hunger, sleep, hygiene, fun, eat, clean, medicine, light, setLight, fetchState, saveState } = useAttributes(id);
    const [isLightOn, setIsLightOn] = React.useState(light);
    const [imageId, setImageId] = React.useState<number | null>(null);

    const { message } = getConditionInfo({
        hunger,
        sleep,
        hygiene,
        fun,
    });

    const fetchImage = async () => {
        const imageId = await getTamagotchiImage(id);
        setImageId(imageId);
    };

    fetchImage();
    console.log('id ', id)

    const handleAction = (action: () => void) => {
        action();
    };

    React.useEffect(() => {
        if (message === "Morto") {
            setIsLightOn(false);
        }
    }, [message]);

    useFocusEffect(
        React.useCallback(() => {
            fetchState;
        }, [navigation]));

    useEffect(() => {
        fetchState;
        saveState();
    }, [hunger, hygiene, fun, sleep]);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            fetchState();
        }
    }, [isFocused]);

    const toggleLight = () => {
        if (message !== "Morto") {
            const newLightState = !isLightOn;
            setIsLightOn(newLightState);
            setLight(newLightState);
            updateTamagotchi(id, {
                hunger,
                sleep,
                hygiene,
                fun,
                condition: message,
                light: newLightState
            });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={galaxy} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.menuLight}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons name="alien-outline" size={48} color="#D3B4D9" />
                        </Pressable>
                        <TouchableOpacity onPress={toggleLight} disabled={message === "Morto"}>
                            <MaterialCommunityIcons
                                name={isLightOn ? "lightbulb-on-outline" : "lightbulb"}
                                color={message === "Morto" ? "#A9A9A9" : (isLightOn ? "#E6B400" : "#D3B4D9")}
                                size={48}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textStatus}>
                        {message}
                    </Text>
                    <View>
                        <Image
                            style={styles.imageContainer}
                            source={imageId !== null ? characters[imageId]?.charactere : require('assets/images/radioactive.png')}
                        />
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
                    <View style={styles.statusContainer}>
                        {message !== "Morto" && isLightOn && (
                            <View style={styles.actionContainer}>
                                <TouchableOpacity onPress={() => handleAction(eat)}>
                                    <MaterialCommunityIcons name="food" size={80} color="#E6B400" />
                                </TouchableOpacity>
                                <View>
                                </View>
                                <TouchableOpacity onPress={() => handleAction(clean)}>
                                    <MaterialCommunityIcons name="shower-head" size={80} color="#E6B400" />
                                </TouchableOpacity>
                            </View>
                        )}
                        <View style={styles.actionContainer}>
                            {message !== "Crítico" && message !== "Morto" && isLightOn && (
                                <TouchableOpacity onPress={() => router.push('/game')}>
                                    <MaterialCommunityIcons name="gamepad-variant-outline" size={80} color="#E6B400" />
                                </TouchableOpacity>
                            )}
                            {message === "Crítico" && (
                                <TouchableOpacity onPress={() => handleAction(medicine)}>
                                    <MaterialCommunityIcons name="pill" size={80} color="#E6B400" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView >
    );
};
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
    status: {
        alignItems: "center",
        justifyContent: "center",
        width: 96,
        height: 96,
        padding: 4,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        marginTop: 20,
    },
    imageContainer: {
        width: 320,
        height: 340,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 18,
    },
    textIcon: {
        color: "#E6B400",
        fontSize: 24,
        fontWeight: "600",
    },
    textStatus: {
        color: "#E6B400",
        fontSize: 34,
        fontWeight: "600",
        padding: 18,
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginTop: 20,
        paddingLeft: 0.1,
    },
});