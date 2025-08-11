import React, {useEffect} from 'react';
import Screen from "../components/Screen";
import {FlatList, StyleSheet, Text} from "react-native";
import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import AppButton from "../components/AppButton";
import useApi from "../hooks/useApi";
import listingsAPI from "../api/listings";


function ListingsScreen({navigation}) {
    const getListingsApi = useApi(listingsAPI.getListings)


    useEffect(() => {
        getListingsApi.request();
    }, []);

    return (
        <>
            <Screen style={styles.screen}>
                {getListingsApi.error && (
                    <>
                        <Text>Could not retrieve the listings.</Text>
                        <AppButton title="Retry" onPress={getListingsApi.request}/>
                    </>
                )}

                <FlatList
                    data={getListingsApi.data}
                    keyExtractor={listing => listing.id.toString()}
                    renderItem={({item}) =>
                        <Card
                            title={item.title}
                            subTitle={'$' + item.price}
                            imageUrl={item.images[0].url}
                            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                            thumbnailUrl={item.images[0].thumbnailUrl}
                        />
                    }
                />
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        backgroundColor: colors.light
    }
});

export default ListingsScreen;
