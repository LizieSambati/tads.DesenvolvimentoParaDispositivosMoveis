import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert, Text, ImageBackground, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import galaxy from "@/assets/images/galaxy1.jpg";


const icones = [
    { id: 1, icon: 'alien-outline', matched: false },
    { id: 2, icon: 'satellite-variant', matched: false },
    { id: 3, icon: 'alien-outline', matched: false },
    { id: 4, icon: 'satellite-variant', matched: false },
    { id: 5, icon: 'alien', matched: false },
    { id: 6, icon: 'lightbulb-on-outline', matched: false },
    { id: 7, icon: 'alien', matched: false },
    { id: 8, icon: 'lightbulb-on-outline', matched: false },
    { id: 9, icon: 'food', matched: false },
    { id: 10, icon: 'lightbulb', matched: false },
    { id: 11, icon: 'food', matched: false },
    { id: 12, icon: 'lightbulb', matched: false },
    { id: 13, icon: 'shower-head', matched: false },
    { id: 14, icon: 'gamepad-variant-outline', matched: false },
    { id: 15, icon: 'shower-head', matched: false },
    { id: 16, icon: 'gamepad-variant-outline', matched: false },
    { id: 17, icon: 'pill', matched: false },
    { id: 18, icon: 'arm-flex-outline', matched: false },
    { id: 19, icon: 'pill', matched: false },
    { id: 20, icon: 'arm-flex-outline', matched: false },
    { id: 21, icon: 'space-invaders', matched: false },
    { id: 22, icon: 'white-balance-sunny', matched: false },
    { id: 23, icon: 'space-invaders', matched: false },
    { id: 24, icon: 'white-balance-sunny', matched: false },
];

const JogoDaMemoria = () => {

    const navigation = useNavigation();
    const [cards, setCards] = useState(shuffleArray([...icones]));
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [matchedPairs, setMatchedPairs] = useState<number>(0);
    const [time, setTime] = useState<number>(0);
    const [timerActive, setTimerActive] = useState<boolean>(false);
    const [moves, setMoves] = useState<number>(0);

    useEffect(() => {
        if (flippedCards.length === 2) {
            setDisabled(true);
            setTimeout(() => {
                checkMatch();
            }, 1000);
        }
    }, [flippedCards]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (timerActive) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timerActive]);

    function shuffleArray(array: any[]) {
        return array.sort(() => Math.random() - 0.5);
    }

    const flipCard = (index: number) => {
        if (!disabled && flippedCards.length < 2 && !flippedCards.includes(index)) {
            if (!timerActive) {
                setTimerActive(true);
            }
            setFlippedCards([...flippedCards, index]);
        }
    };

    const checkMatch = () => {
        const [firstIndex, secondIndex] = flippedCards;
        if (cards[firstIndex].icon === cards[secondIndex].icon) {
            const updatedCards = [...cards];
            updatedCards[firstIndex].matched = true;
            updatedCards[secondIndex].matched = true;
            setCards(updatedCards);
            setMatchedPairs(matchedPairs + 1);
            if (matchedPairs + 1 === icones.length / 2) {
                setTimerActive(false);
            }
        }
        setFlippedCards([]);
        setDisabled(false);
        setMoves(moves + 1);
    };

    const resetGame = () => {
        const resetCards = icones.map(card => ({ ...card, matched: false }));
        setCards(shuffleArray(resetCards));
        setFlippedCards([]);
        setMatchedPairs(0);
        setDisabled(false);
        setTime(0);
        setMoves(0);
        setTimerActive(true);
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
                    <View style={styles.timerContainer}>
                        <Text style={styles.count}><MaterialCommunityIcons name="timer-sand-complete" size={48} color="#D3B4D9" />{time}</Text>
                        <Text style={styles.count}><MaterialCommunityIcons name="biohazard" size={48} color="#D3B4D9" /> {moves}</Text>
                    </View>
                    <View style={styles.grid}>
                        {cards.map((card, index) => (
                            <Pressable
                                key={index}
                                style={[styles.card, card.matched ? styles.matched : null]}
                                onPress={() => flipCard(index)}
                                disabled={card.matched || flippedCards.includes(index)}
                            >
                                {flippedCards.includes(index) || card.matched ? (
                                    <MaterialCommunityIcons name={card.icon} size={68} color="#E6B400" />
                                ) : (
                                    <MaterialCommunityIcons name="radioactive" size={80} color="#D3B4D9" />
                                )}
                            </Pressable>
                        ))}
                    </View>
                    <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
                        <MaterialCommunityIcons name="radioactive" size={78} color="#E6B400" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default JogoDaMemoria;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    goBack: {
        flexDirection: 'row',
        padding: 12,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    timerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%',
        marginTop: 4,
        marginBottom: 4,
    },
    count: {
        fontSize: 30,
        color: '#E6B400',
        padding: 4,
        marginHorizontal: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 16,
    },
    card: {
        width: 72,
        height: 72,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    matched: {},
    resetButton: {
        marginTop: 30,
        padding: 6,
        alignItems: 'center',
        marginBottom: 18,
    },
});