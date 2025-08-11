import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

function AuthNavigator(props) {
    const Stack = createStackNavigator();

    const StackNavigator = () => (
        <Stack.Navigator>
            <Stack.Screen name={'Welcome'} component={WelcomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name={'Login'} component={LoginScreen}/>
            <Stack.Screen name={'Register'} component={RegisterScreen}/>
        </Stack.Navigator>
    )

    return (
        <StackNavigator/>
    );
}

export default AuthNavigator;
