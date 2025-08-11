import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import colors from "../config/colors";

function AppButton({title, color, onPress}) {
    const useColor = color === 'secondary' ? colors.secondary : colors.primary
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: useColor}]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5
    },
    text: {
        color: colors.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});

export default AppButton;
