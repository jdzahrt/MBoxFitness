import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

function AuthNavigator(props) {
    const Stack = createStackNavigator();

    const StackNavigator = () => (
        <Stack.Navigator>
            <Stack.Screen name={'Welcome'} component={WelcomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name={'Login'} component={LoginScreen}/>
            <Stack.Screen name={'Register'} component={RegisterScreen}/>
            <Stack.Screen name={'ForgotPassword'} component={ForgotPasswordScreen} options={{title: 'Reset Password'}}/>
            <Stack.Screen name={'ResetPassword'} component={ResetPasswordScreen} options={{title: 'Set New Password'}}/>
        </Stack.Navigator>
    )

    return (
        <StackNavigator/>
    );
}

export default AuthNavigator;
