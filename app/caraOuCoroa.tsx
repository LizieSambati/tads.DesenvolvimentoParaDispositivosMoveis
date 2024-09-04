import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';





const CaraOuCoroa = () => {

    const [result, setResult] = useState("Coroa");

    const flipCoin = () => {
        setResult('loading');

        setTimeout(() => {
            const coin = Math.random() < 0.5 ? 'Cara' : 'Coroa';
            setResult(coin); // Atualiza o resultado após 1 segundo
        }, 1000);
    };

    return (
        <View style={styles.container}>
            {result === 'Coroa' ? (
                <MaterialCommunityIcons name="bitcoin" size={132} color="black" />
            ) : (
                <MaterialCommunityIcons name="account-circle-outline" size={132} color="black" />
            )}
            <TouchableOpacity
                onPress={flipCoin}
            >
                <MaterialCommunityIcons name="replay" size={64} color="black" />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default CaraOuCoroa;