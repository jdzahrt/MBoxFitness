import React from 'react';
import {View, StyleSheet, FlatList} from "react-native";

import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

const menuItems = [
    {
        title: 'My Listings',
        icon: {
            name: 'format-list-bulleted',
            backgroundColor: colors.primary
        },
        targetScreen: routes.LISTINGS
    },
    {
        title: 'My Messages',
        icon: {
            name: 'email',
            backgroundColor: colors.secondary
        },
        targetScreen: routes.MESSAGES
    },
]

function MyAccountScreen({navigation}) {
    const {user, logOut} = useAuth();

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItem
                    title={user.name}
                    subTitle={user.email}
                    image={require('../assets/jzpic.jpeg')}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={menuItem => menuItem.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({item}) =>
                        <ListItem
                            title={item.title}
                            IconComponent={
                                <Icon
                                    name={item.icon.name}
                                    backgroundColor={item.icon.backgroundColor}
                                />
                            }
                            onPress={() => navigation.navigate(item.targetScreen)}
                        />
                    }
                />
            </View>
            <ListItem
                title={'Log Out'}
                IconComponent={
                    <Icon
                        name={'logout'}
                        backgroundColor='#ffe66d'
                    />
                }
                onPress={()=>logOut()}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },
    listingsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    listings: {
        padding: 20,
        backgroundColor: '#f93e16',
        marginVertical: 10,
        borderRadius: 35
    },
    messages: {
        padding: 20,
        backgroundColor: '#4fd9cc',
        marginVertical: 10,
        borderRadius: 35
    },
    logout: {
        padding: 20,
        backgroundColor: '#eccd0b',
        borderRadius: 35
    },
    screen: {
        backgroundColor: colors.light
    }
});

export default MyAccountScreen;
