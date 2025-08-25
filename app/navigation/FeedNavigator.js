import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import PersonalTrainingScreen from "../screens/PersonalTrainingScreen";
import ClassBookingScreen from "../screens/ClassBookingScreen";
import EventsScreen from "../screens/EventsScreen";
import HikesScreen from "../screens/HikesScreen";
import MyClassesScreen from "../screens/MyClassesScreen";
import routes from "./routes";
import CreateHikeScreen from "../screens/CreateHikeScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
    <Stack.Navigator presentation={'modal'} screenOptions={{headerShown: false}}>
        <Stack.Screen
            name={routes.LISTINGS}
            component={ListingsScreen}
        />
        <Stack.Screen
            name={routes.PERSONAL_TRAINING}
            component={PersonalTrainingScreen}
        />
        <Stack.Screen
            name={routes.CLASS_BOOKING}
            component={ClassBookingScreen}
        />
        <Stack.Screen
            name={routes.EVENTS}
            component={EventsScreen}
        />
        <Stack.Screen
            name={routes.HIKES}
            component={HikesScreen}
        />
        <Stack.Screen
            name={routes.CREATE_HIKE}
            component={CreateHikeScreen}
        />
        <Stack.Screen
            name={routes.MY_CLASSES}
            component={MyClassesScreen}
        />
    </Stack.Navigator>
)

export default FeedNavigator;
