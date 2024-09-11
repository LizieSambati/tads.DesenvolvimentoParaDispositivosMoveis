import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

interface StatusIconsProps {
    containerStyle?: StyleProp<ViewStyle>;
    statusStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    iconColor?: string;
    iconSize?: number;
    hunger: number;
    sleep: number;
    hygiene: number;
    fun: number;
}

const StatusIcons = ({ containerStyle, statusStyle, textStyle, iconColor, iconSize, hunger, sleep, hygiene, fun }: StatusIconsProps) => {

    return (
        <View style={[styles.statusContainer, containerStyle]}>
            <View style={[styles.status, statusStyle]}>
                <Text style={[styles.text, textStyle]}>{hunger}%</Text>
                <MaterialCommunityIcons name="arm-flex-outline" size={iconSize} color={iconColor} />
            </View>
            <View style={[styles.status, statusStyle]}>
                <Text style={[styles.text, textStyle]}>{hygiene}%</Text>
                <MaterialCommunityIcons name="paper-roll-outline" size={iconSize} color={iconColor} />
            </View>
            <View style={[styles.status, statusStyle]}>
                <Text style={[styles.text, textStyle]}>{sleep}%</Text>
                <MaterialCommunityIcons name="sleep" size={iconSize} color={iconColor} />
            </View>
            <View style={[styles.status, statusStyle]}>
                <Text style={[styles.text, textStyle]}>{fun}%</Text>
                <Ionicons name="star-outline" size={iconSize} color={iconColor} />
                {/* <MaterialCommunityIcons name="star-face" size={iconSize} color={iconColor || "black"} /> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    status: {
        alignItems: "center",
    },
    text: {
        fontSize: 20,
    },
});
export default StatusIcons;