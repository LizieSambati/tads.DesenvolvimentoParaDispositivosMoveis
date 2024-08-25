import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router';


const Stack = createStackNavigator()

export default function Index() {
    return (
        <View>
            <Text style={styles.text}>
                ir para status
            </Text>
            <Link href={"/register"}>Registrar</Link>
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
