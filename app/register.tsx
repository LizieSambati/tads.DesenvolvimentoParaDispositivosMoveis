// - Tela de cadastro de bichinhos:
// Informar os campos para cadastro: Nome; Imagem

import { Button, Text, View } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
    navigation: StackNavigationProp<any>;
};

const Register = ({ navigation }: Props) => {
    return (
        <View>
            <Text>Campo definir Nome</Text>
            <Text>Campo definir Imagem</Text>
            <Button
                title="JOGAR!"
                onPress={() => navigation.navigate('Status')}
            />
        </View>
    );
}
export default Register;