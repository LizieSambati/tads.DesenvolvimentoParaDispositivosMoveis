// - Tela de cadastro de bichinhos:
// Informar os campos para cadastro: Nome; Imagem

import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation, useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from "./_layout";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import alien1 from "assets/images/alien-gangster-chefao.png";
import alien2 from "assets/images/alien-gangster-estiloso.png";
import alien3 from "assets/images/alien-gangster-dancarino.png";
import alien4 from "assets/images/alien-gangster-chapado.png";


type ScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, 'create'>,
    StackNavigationProp<RootStackParamList>
>;

const Create = () => {

    const navigation = useNavigation<ScreenNavigationProp>()

    const [name, setName] = useState<string>('')
    const [image, setImage] = useState<number>()

    const imageArray = [alien1, alien2, alien3, alien4]

    const create = useCallback(() => {
        if (!name || image === undefined) return;

    }, [image, name])

    return (
        <View style={styles.container}>
            <View>
                <FlatList contentContainerStyle={styles.listContainer} data={imageArray} renderItem={({ index, item }) => {
                    return (<TouchableOpacity onPress={() => setImage(index)}>
                        <Image style={image === index ? styles.selectedListImage : styles.listImage} source={item} />
                    </TouchableOpacity>)
                }} />
            </View>

            <View style={styles.textImputContainer}>
                <TextInput value={name} onChangeText={setName} style={styles.textImput} />
            </View>

            <View>
                <TouchableOpacity
                    onPress={create}
                >
                    <MaterialCommunityIcons name="emoticon-poop" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('list')}
                >
                    <MaterialCommunityIcons name="alien" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Create;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        marginLeft: 8,
    },
    textImput: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
    },
    textImputContainer: {
        flexDirection: 'row',
        padding: 8,
    },
    listContainer: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
        maxWidth: 300,
        justifyContent: 'space-between',
    },
    listImage: {
        aspectRatio: 4 / 4,
        resizeMode: 'cover',
        width: 120,
        height: 120
    },
    selectedListImage: {
        aspectRatio: 4 / 4,
        resizeMode: 'cover',
        width: 150,
        height: 150,
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 0 }, // Centraliza a sombra
        shadowOpacity: 0.8, // Opacidade da sombra
        shadowRadius: 5,
    },
    menuLight: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        padding: 10,
        backgroundColor: "#4fab",
    },
});