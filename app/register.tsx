// - Tela de cadastro de bichinhos:
// Informar os campos para cadastro: Nome; Imagem

import { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image, SafeAreaView, ImageBackground, Pressable } from "react-native";
import { useNavigation } from 'expo-router';
import { RootStackParamList } from "./_layout";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { useDatabase } from "./database/service";

import { characters } from "components/Characters";
import galaxy from "assets/images/galaxy2.jpg";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

type ScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, 'register'>,
    StackNavigationProp<RootStackParamList>
>;

const Register = () => {

    const navigation = useNavigation<ScreenNavigationProp>();
    const { createTamagotchi } = useDatabase();
    const [selectedCharacterIndex, setSelectedCharacterIndex] = useState<number>();
    const [name, setName] = useState<string>('');

    const create = async () => {
        if (selectedCharacterIndex === undefined || !name.trim()) {
            return;
        }
        try {
            await createTamagotchi({ image: selectedCharacterIndex, name });
            console.log("Tamagotchi criado com sucesso!");
            setSelectedCharacterIndex(undefined);
            setName('');
            navigation.navigate('status');
        } catch (error) {
            console.log("Erro ao criar o Tamagotchi:", error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={galaxy} style={styles.backgroundImage}>
                <View style={styles.menuPlanet}>
                    <Pressable onPress={() => navigation.navigate('index')}>
                        <Ionicons name="planet" size={48} color="#E6B400" />
                    </Pressable>
                </View>
                <View style={styles.container}>
                    <FlatList
                        numColumns={2}
                        pagingEnabled
                        contentContainerStyle={styles.listContainer}
                        data={characters}
                        renderItem={({ index, item }) => {
                            return (
                                <TouchableOpacity onPress={() => setSelectedCharacterIndex(index)}>
                                    <Image
                                        style={selectedCharacterIndex === index ? styles.selectedListImage : styles.listImage}
                                        source={selectedCharacterIndex === index ? item.images.selected : item.images.notSelected}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                    />
                    <View style={styles.textInputContainer}>
                        <TextInput value={name} onChangeText={setName} style={styles.textInput} />
                    </View>
                    <View>
                        <Pressable onPress={create}>
                            <MaterialCommunityIcons name="radioactive" size={96} color="#E6B400" />
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default Register;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    menuPlanet: {
        flexDirection: 'row',
        padding: 12,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 18,
    },
    listContainer: {
        flexGrow: 1,
        margin: 4,
        alignItems: 'center',
    },
    listImage: {
        width: 184,
        height: 240,
        resizeMode: 'cover',

    },
    selectedListImage: {
        width: 184,
        height: 240,
        resizeMode: 'cover',
        shadowColor: 'yellow',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    textInput: {
        flex: 1,
        color: 'white',
        fontSize: 18,
        borderColor: '#D3B4D9',
        borderWidth: 4,
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    textInputContainer: {
        flexDirection: 'row',
        padding: 8,
        width: '90%',
        borderWidth: 1,
        borderColor: '#D3B4D9',
        marginBottom: 8,
    },
});