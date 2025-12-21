import React from 'react';
import {View, StyleSheet, FlatList} from "react-native";

import Screen from "../components/Screen";
import ListItem from "../components/lists/ListItem";
import AppText from "../components/AppText";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";

const menuItems = [
    {
        title: 'My Training Sessions',
        icon: {
            name: 'dumbbell',
            backgroundColor: colors.primary
        },
        targetScreen: routes.MY_CLASSES
    },
    {
        title: 'My Messages',
        icon: {
            name: 'email',
            backgroundColor: colors.secondary
        },
        targetScreen: routes.MESSAGES
    },
    {
        title: 'Reset Password',
        icon: {
            name: 'lock-reset',
            backgroundColor: colors.danger
        },
        targetScreen: routes.RESET_PASSWORD
    },
]

function MyAccountScreen({navigation}) {
    const {user, logOut} = useAuth();
    console.log(user, user.name,user.email);

    return (
        <Screen style={styles.screen}>
            <View style={styles.userInfo}>
                <AppText style={styles.userName}>{user.name}</AppText>
                <AppText style={styles.userEmail}>{user.email}</AppText>
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
    userInfo: {
        backgroundColor: colors.white,
        padding: 30,
        marginVertical: 20,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: colors.dark,
        textAlign: 'center'
    },
    userEmail: {
        fontSize: 16,
        color: colors.medium,
        textAlign: 'center'
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
