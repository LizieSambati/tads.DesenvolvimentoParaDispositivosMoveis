import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, View } from "react-native";


const Stack = createStackNavigator()

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

export default function Index() {
    return (
        <View>
            <Text style={styles.text}>
                testanndoooo index
            </Text>
        </View>

    );
}