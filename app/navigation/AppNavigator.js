import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ListEditScreen from "../screens/ListEditScreen";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
import useNotifications from "../hooks/useNotifications";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    useNotifications();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: {backgroundColor: 'tomato'},
                headerTintColor: 'white',
            }}
        >
            <Tab.Screen
                name={'Feed'}
                component={FeedNavigator}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name={'home'} color={color} size={size}/>
                    )
                }}
            />
            <Tab.Screen
                name={'ListingEdit'}
                component={ListEditScreen}
                options={({navigation}) => ({
                    tabBarButton: () => <NewListingButton onPress={() => navigation.navigate(routes.LISTING_EDIT)}/>,
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name={'plus-circle'} color={color} size={40}/>
                    ),
                    tabBarLabel: () => null
                })}
            />
            <Tab.Screen
                name={'Account'}
                component={AccountNavigator}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name={'account'} color={color} size={size}/>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default AppNavigator;
