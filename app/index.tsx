import * as React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, useNavigation } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './_layout';

type ScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, 'index'>,
    StackNavigationProp<RootStackParamList>
>;

export default function Index() {
    const navigation = useNavigation<ScreenNavigationProp>()
    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate('status')}
            >
                <MaterialCommunityIcons name="alien-outline" size={64} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('create')}
            >
                <MaterialCommunityIcons name="alien" size={64} color="black" />
            </TouchableOpacity>

            {/* <Link href={"/create"}>Registrar</Link> */}
            {/* quando já tiver bichinho criado, como fazer? */}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    text: {
        color: "#f12"
    }
})
