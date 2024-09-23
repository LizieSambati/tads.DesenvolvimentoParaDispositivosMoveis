import * as React from 'react';
import { ImageBackground, Pressable, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './_layout';
import { useDatabase } from './database/service';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import galaxy from "assets/images/galaxy3.jpg";

type ScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, 'index'>,
    StackNavigationProp<RootStackParamList>
>;

export default function Index() {

    const navigation = useNavigation<ScreenNavigationProp>()
    const { clear } = useDatabase();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={galaxy} style={styles.backgroundImage}>
                <View style={styles.menuAlien}>
                    <Pressable onPress={() => navigation.navigate('status')}>
                        <MaterialCommunityIcons name="alien-outline" size={48} color="#D3B4D9" />
                    </Pressable>
                    <TouchableOpacity onPress={() => clear()}>
                        <Ionicons name="warning-outline" size={48} color="#E6B400" />
                    </TouchableOpacity>
                </View>
                <View style={styles.menuCreate}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('register')}
                    >
                        <MaterialCommunityIcons name="radioactive" size={320} color="#D3B4D9" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    menuAlien: {
        flexDirection: 'row',
        padding: 12,
        justifyContent: 'space-between',
    },
    menuCreate: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    }
})
