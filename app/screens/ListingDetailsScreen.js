import React from 'react';
import {View, StyleSheet} from "react-native";
import AppText from "../components/AppText";
import ListItem from "../components/lists/ListItem";
import {Image} from 'react-native-expo-image-cache';
import ContactSellerForm from "../components/ContactSellerForm";

function ListingDetailsScreen({route}) {
    const listing = route.params;
    return (
        <View>
            <Image
                style={styles.image}
                preview={{uri: listing.images[0].thumbnailUrl}}
                tint={"light"}
                uri={listing.images[0].url}></Image>
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{listing.title}</AppText>
                <AppText style={styles.price}>{listing.price}</AppText>
                <View style={styles.userContainer}>
                    <ListItem
                        image={require('../assets/jzpic.jpeg')}
                        title='Mosh Hamedani'
                        subTitle='5 Listings'
                    />
                </View>
            </View>
            <ContactSellerForm listing={listing}/>
        </View>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        padding: 20,
    },
    image: {
        width: '100%',
        height: 300,
    },
    price: {
        color: 'green',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
    },
    userContainer: {
        marginVertical: 40,
    }
});

export default ListingDetailsScreen;
