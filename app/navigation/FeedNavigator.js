import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ClassBookingScreen from "../screens/ClassBookingScreen";
import EventsScreen from "../screens/EventsScreen";
import routes from "./routes";

const Stack = createStackNavigator();

const FeedNavigator = () => (
    <Stack.Navigator presentation={'modal'} screenOptions={{headerShown: false}}>
        <Stack.Screen
            name={routes.LISTINGS}
            component={ListingsScreen}
        />
        <Stack.Screen
            name={routes.LISTING_DETAILS}
            component={ListingDetailsScreen}
        />
        <Stack.Screen
            name={routes.CLASS_BOOKING}
            component={ClassBookingScreen}
        />
        <Stack.Screen
            name={routes.EVENTS}
            component={EventsScreen}
        />
    </Stack.Navigator>
)

export default FeedNavigator;
