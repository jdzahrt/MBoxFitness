import React from 'react';
import Constants from 'expo-constants'
import {SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform} from "react-native";

function Screen({children, style}) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            <KeyboardAvoidingView 
                style={[styles.view, style]}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {children}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight, flex: 1
    }, view: {
        flex: 1
    }
})

export default Screen;
