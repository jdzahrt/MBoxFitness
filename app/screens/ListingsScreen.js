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
    // const getListingsApi = useApi(listingsAPI.getListings)
    //
    //
    // useEffect(() => {
    //     getListingsApi.request();
    // }, []);
    const mockListings = [
        {
            id: 1,
            title: "Personal Training",
            price: 75,
            images: [
                {
                    url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
                    thumbnailUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=150"
                }
            ]
        },
        {
            id: 2,
            title: "Mitt Groups / Classes",
            price: 120,
            images: [
                {
                    url: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400",
                    thumbnailUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=150"
                }
            ]
        },
        {
            id: 3,
            title: "Hikes & Walks",
            price: 25,
            images: [
                {
                    url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400",
                    thumbnailUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=150"
                }
            ]
        },
        {
            id: 4,
            title: "Events",
            price: 45,
            images: [
                {
                    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
                    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150"
                }
            ]
        }
    ];

    const getListingsApi = { data: mockListings, error: null };

    return (
        <>
            <Screen style={styles.screen}>
                {/*{getListingsApi.error && (*/}
                {/*    <>*/}
                {/*        <Text>Could not retrieve the listings.</Text>*/}
                {/*        <AppButton title="Retry" onPress={getListingsApi.request}/>*/}
                {/*    </>*/}
                {/*)}*/}

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
