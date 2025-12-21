import React, {useState} from 'react';
import Screen from '../components/Screen'

import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import AppText from '../components/AppText';

import * as Yup from "yup";
import {AppForm, AppFormField, SubmitButton, ErrorMessage} from '../components/forms'
import authAPI from "../api/auth";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(6).label('Password')
})

function LoginScreen(props) {
    const {logIn} = useAuth()
    const [error, setError] = useState(null)

    const handleSubmit = async ({email, password}) => {
        const result = await authAPI.login(email, password)
        if (!result.ok) {
            setError(result.data?.message || "Invalid email and/or password.")
            return
        }
        console.log('rizzydata', result.data)
        setError(null)
        logIn(result.data.token, result.data.user)
    }

    return (
        <Screen style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/MBoxIcon.jpeg')}
            />

            <AppForm
                initialValues={{email: '', password: ''}}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <ErrorMessage error={error} visible={error}/>
                <AppFormField
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    icon={'email'}
                    name={'email'}
                    keyboardTypef={'email-address'}
                    placeholder={'Email'}
                    textContentType={'emailAddress'}
                />
                <AppFormField
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    icon={'lock'}
                    name={'password'}
                    placeholder={'Password'}
                    secureTextEntry
                    textContentType={'password'}
                    returnKeyType={'go'}
                    onSubmitEditing={() => handleSubmit}
                />
                <SubmitButton title='Login'/>
                <TouchableOpacity
                    style={styles.forgotPassword}
                    onPress={() => props.navigation.navigate(routes.FORGOT_PASSWORD)}
                >
                    <AppText style={styles.forgotPasswordText}>Forgot Password?</AppText>
                </TouchableOpacity>
            </AppForm>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.white
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
    forgotPassword: {
        alignSelf: 'center',
        marginTop: 15,
    },
    forgotPasswordText: {
        color: colors.primary,
        fontSize: 16,
    }
});

export default LoginScreen;
