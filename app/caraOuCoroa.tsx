import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import galaxy from "assets/images/galaxy1.jpg";
import Ionicons from '@expo/vector-icons/Ionicons';

const CaraOuCoroa = () => {

    const navigation = useNavigation();
    const [result, setResult] = useState("Coroa");

    const flipCoin = () => {
        setResult('loading');
        setTimeout(() => {
            const coin = Math.random() < 0.5 ? 'Cara' : 'Coroa';
            setResult(coin);
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={galaxy} style={styles.backgroundImage}>
                <View style={styles.goBack}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-circle-outline" size={48} color="#D3B4D9" />
                    </Pressable>
                </View>
                <View style={styles.container}>
                    {result === 'loading' ? (
                        <MaterialCommunityIcons name="progress-question" size={132} color="#D3B4D9" />
                    ) : result === 'Coroa' ? (
                        <MaterialCommunityIcons name="bitcoin" size={132} color="#E6B400" />
                    ) : (
                        <MaterialCommunityIcons name="account-circle-outline" size={132} color="#E6B400" />
                    )}
                    <TouchableOpacity onPress={flipCoin} style={styles.button}>
                        <MaterialCommunityIcons name="replay" size={64} color="#D3B4D9" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default CaraOuCoroa;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 20,
    },
    goBack: {
        flexDirection: 'row',
        padding: 12,
    },
});