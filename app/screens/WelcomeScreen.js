import React from 'react';
import {ImageBackground, StyleSheet, View, Image, Text} from "react-native";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";

function WelcomeScreen({navigation}) {
    return (
        <ImageBackground
            style={styles.background}
            blurRadius='5'
        >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/MBOX.jpeg')}/>
                {/*<Text style={styles.text}>MBox Fitness</Text>*/}
            </View>
            <View style={styles.buttonsContainer}>
                <AppButton title='login' color={colors.primary} onPress={() => navigation.navigate(routes.LOGIN)}>login</AppButton>
                <AppButton title='register' color={colors.primary} onPress={()=> navigation.navigate(routes.REGISTER)}>register</AppButton>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: colors.black
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 200,
        alignItems: 'center'
    },
    logo: {
        width: 300,
        height: 300,
    },
    logoContainer: {
        position: 'absolute',
        top: 120,
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.black,
        paddingVertical: 20
    }
});

export default WelcomeScreen;
