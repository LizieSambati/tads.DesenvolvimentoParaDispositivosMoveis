// - Tela de cadastro de bichinhos:
// Informar os campos para cadastro: Nome; Imagem

import { Button, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


const register = ({ navigation }) => {
    return (
        <View>
            <Text>registrar bichinho</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}

export default register;