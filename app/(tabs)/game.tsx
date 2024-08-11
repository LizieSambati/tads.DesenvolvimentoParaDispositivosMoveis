import { Button, StyleSheet, Text, View } from "react-native";

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

const Game = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Teste!
            </Text>

        </View>
    );
}

export default Game;