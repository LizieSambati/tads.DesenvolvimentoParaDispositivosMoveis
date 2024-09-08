import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './_layout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';


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
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('create')}
                >
                    <Ionicons name="planet" size={128} color="black" />
                </TouchableOpacity>
            </View>
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
