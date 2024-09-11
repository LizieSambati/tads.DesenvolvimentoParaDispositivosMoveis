import * as React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './_layout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import galaxy from "assets/images/galaxy3.jpg";

type ScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, 'index'>,
    StackNavigationProp<RootStackParamList>
>;

export default function Index() {
    const navigation = useNavigation<ScreenNavigationProp>()
    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={galaxy} style={styles.backgroundImage}>
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
                            <MaterialCommunityIcons name="radioactive" size={128} color="black" />
                        </TouchableOpacity>
                    </View>
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
})
