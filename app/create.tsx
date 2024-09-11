// - Tela de cadastro de bichinhos:
// Informar os campos para cadastro: Nome; Imagem

import { useCallback, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image, SafeAreaView, ImageBackground } from "react-native";
import { useNavigation, useRouter } from 'expo-router';
import { RootStackParamList } from "./_layout";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, TextInput } from "react-native-gesture-handler";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import alien1 from "assets/images/alien-gangster-chefao.png";
import alien2 from "assets/images/alien-gangster-estiloso.png";
import alien3 from "assets/images/alien-gangster-chapado.png";
import alien4 from "assets/images/alien-gangster-dancarino.png";
import galaxy from "assets/images/galaxy2.jpg";

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
        // depois de criar alien, ir para tela status
    }, [image, name])

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={galaxy} style={styles.backgroundImage}>
                <View style={styles.menuPlanet}>
                    <TouchableOpacity onPress={() => navigation.navigate('index')}>
                        <Ionicons name="planet" size={48} color="#D3B4D9" />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <FlatList
                        horizontal
                        pagingEnabled
                        contentContainerStyle={styles.listContainer}
                        data={imageArray}
                        renderItem={({ index, item }) => {
                            return (<TouchableOpacity onPress={() => setImage(index)}>
                                <Image style={image === index ? styles.selectedListImage : styles.listImage} source={item} />
                            </TouchableOpacity>)
                        }} />

                    <View style={styles.textInputContainer}>
                        <TextInput value={name} onChangeText={setName} style={styles.textInput} />
                    </View>

                    <View>
                        <TouchableOpacity
                            onPress={create}
                        >
                            <MaterialCommunityIcons name="radioactive" size={96} color="#D3B4D9" />
                        </TouchableOpacity>
                    </View>

                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default Create;


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
        padding: 8,
    },
    listContainer: {
        flexGrow: 1,
        margin: 4,
        alignItems: 'center',
    },
    listImage: {
        width: 400,
        height: 400,
        resizeMode: 'cover',
    },
    selectedListImage: {
        width: 400,
        height: 400,
        resizeMode: 'cover',
        shadowColor: 'yellow',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    // listImage: {
    //     aspectRatio: 4 / 4,
    //     resizeMode: 'cover',
    //     padding: 140,
    //     height: 1,
    //     margin: 4,
    // },
    // selectedListImage: {
    //     aspectRatio: 4 / 4,
    //     resizeMode: 'cover',
    //     padding: 140,
    //     height: 1,
    //     shadowColor: 'yellow',
    //     shadowOffset: { width: 0, height: 0 },
    //     shadowOpacity: 0.8,
    //     shadowRadius: 10,
    //     margin: 4,
    // },
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
