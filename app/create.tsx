// - Tela de cadastro de bichinhos:
// Informar os campos para cadastro: Nome; Imagem

import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Create = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text>Campo definir Nome</Text>
            <Text>Campo definir Imagem</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/status')}
            >
                <MaterialCommunityIcons name="alien" size={24} color="white" />
                <Text style={styles.buttonText}>começar</Text>
            </TouchableOpacity>
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
        color: 'white',
        fontSize: 16,
        marginLeft: 8,
    },
});