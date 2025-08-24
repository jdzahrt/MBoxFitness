import React, {useContext} from 'react';
import {ImageBackground, StyleSheet, View, Image, Text} from "react-native";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import testAuth from "../auth/testAuth";
import AuthContext from "../auth/context";

function WelcomeScreen({navigation}) {
    const {setUser} = useContext(AuthContext);

    const handleTestLogin = async (userId) => {
        const user = await testAuth.loginAsTestUser(userId);
        if (user) {
            setUser(user);
        }
    };

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
                {__DEV__ && (
                    <View style={styles.testButtons}>
                        <AppButton title='User' color={colors.medium} onPress={() => handleTestLogin(1)}>User</AppButton>
                        <AppButton title='Trainer' color={colors.secondary} onPress={() => handleTestLogin(2)}>Trainer</AppButton>
                        <AppButton title='Admin' color={colors.danger} onPress={() => handleTestLogin(3)}>Admin</AppButton>
                    </View>
                )}
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
    },
    testButtons: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 10
    }
});

export default WelcomeScreen;
