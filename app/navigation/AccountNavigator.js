import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import MyAccountScreen from "../screens/MyAccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import routes from "./routes";

const Stack = createStackNavigator();

const AccountNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={routes.MY_ACCOUNT}
            component={MyAccountScreen}/>
        <Stack.Screen
            name={routes.MESSAGES}
            component={MessagesScreen}/>
    </Stack.Navigator>
)

export default AccountNavigator;
