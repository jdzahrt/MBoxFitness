import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import AppText from "../components/AppText";
import ListItem from "../components/lists/ListItem";
import {Image} from 'react-native-expo-image-cache';
import ContactTrainerForm from "../components/ContactTrainerForm";

function ListingDetailsScreen({route}) {
    const listing = route.params;
    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            // keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    style={styles.image}
                    preview={{uri: listing.images[0].thumbnailUrl}}
                    tint={"light"}
                    uri={listing.images[0].url}></Image>
                <View style={styles.detailsContainer}>
                    <AppText style={styles.title}>{listing.title}</AppText>
                    {/*<AppText style={styles.price}>{listing.price}</AppText>*/}
                    <View style={styles.userContainer}>
                        <AppText>{listing.id === 1 ? 'Please send what type of training you are looking for and how often. ' +
                            'I will get back to you within 24 hours.' : 'Goodbye' }</AppText>
                        {/*<ListItem*/}
                        {/*    image={require('../assets/jzpic.jpeg')}*/}
                        {/*    title='Jesse'*/}
                        {/*    subTitle='5 Listings'*/}
                        {/*/>*/}
                    </View>
                </View>
                <ContactTrainerForm listing={listing}/>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
