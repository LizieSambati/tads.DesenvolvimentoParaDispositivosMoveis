// - Tela de cadastro de bichinhos:
// Informar os campos para cadastro: Nome; Imagem

import { useCallback, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image, SafeAreaView } from "react-native";
import { useNavigation, useRouter } from 'expo-router';
import { RootStackParamList } from "./_layout";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, TextInput } from "react-native-gesture-handler";
import alien1 from "assets/images/alien-gangster-chefao.png";
import alien2 from "assets/images/alien-gangster-estiloso.png";
import alien3 from "assets/images/alien-gangster-chapado.png";
import alien4 from "assets/images/alien-gangster-dancarino.png";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


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
        <SafeAreaView style={styles.container}>
            <View>
                <FlatList contentContainerStyle={styles.listContainer} data={imageArray} renderItem={({ index, item }) => {
                    return (<TouchableOpacity onPress={() => setImage(index)}>
                        <Image style={image === index ? styles.selectedListImage : styles.listImage} source={item} />
                    </TouchableOpacity>)
                }} />
            </View>

            <View style={styles.textInputContainer}>
                <TextInput value={name} onChangeText={setName} style={styles.textInput} />
            </View>

            <View>
                <TouchableOpacity
                    onPress={create}
                >
                    <MaterialCommunityIcons name="radioactive" size={96} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('list')}
                >
                    <MaterialCommunityIcons name="alien" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
export default Create;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#2fa'
    },
    listContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        padding: 8,
        paddingHorizontal: 64,
        margin: 4,
        backgroundColor: 'green',
    },
    listImage: {
        aspectRatio: 4 / 4,
        resizeMode: 'cover',
        // width: '100%',
        padding: 128,
        height: 100,
        margin: 4,
        backgroundColor: 'blue',
    },
    selectedListImage: {
        aspectRatio: 4 / 4,
        resizeMode: 'cover',
        // width: '100%',
        padding: 128,
        height: 150,
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        margin: 4,
        backgroundColor: 'red',
    },
    textInput: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    textInputContainer: {
        flexDirection: 'row',
        padding: 8,
        width: '100%',
    },
});

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     button: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: 'blue',
//         padding: 10,
//         borderRadius: 5,
//     },
//     buttonText: {
//         color: 'black',
//         fontSize: 16,
//         marginLeft: 8,
//     },
//     textInput: {
//         flex: 1,
//         borderColor: 'black',
//         borderWidth: 1,
//         borderRadius: 4,
//     },
//     textInputContainer: {
//         flexDirection: 'row',
//         padding: 8,
//     },
//     listContainer: {
//         flexGrow: 1, // Permite que o FlatList cresça conforme necessário
//         justifyContent: 'space-between',
//         padding: 8,
//         // flexDirection: 'row',
//         // gap: 8,
//         // flexWrap: 'wrap',
//         // maxWidth: 300,
//         // justifyContent: 'space-between',
//     },
//     listImage: {
//         aspectRatio: 4 / 4,
//         resizeMode: 'cover',
//         width: 120,
//         height: 120
//     },
//     selectedListImage: {
//         aspectRatio: 4 / 4,
//         resizeMode: 'cover',
//         width: 150,
//         height: 150,
//         shadowColor: 'red',
//         shadowOffset: { width: 0, height: 0 }, // Centraliza a sombra
//         shadowOpacity: 0.8, // Opacidade da sombra
//         shadowRadius: 5,
//     },
//     menuLight: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignSelf: 'stretch',
//         padding: 10,
//         backgroundColor: "#4fab",
//     },
// });