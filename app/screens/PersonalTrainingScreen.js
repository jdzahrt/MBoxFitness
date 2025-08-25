import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import AppText from "../components/AppText";
import {Image} from 'react-native-expo-image-cache';
import ContactTrainerForm from "../components/ContactTrainerForm";

function PersonalTrainingScreen({route}) {
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
                        <AppText style={styles.description}>
                            Ready to transform your fitness journey? Send me a message about your goals, 
                            training preferences, and schedule. I'll get back to you within 24 hours to 
                            discuss your personalized training plan.
                        </AppText>
                        <AppText style={styles.subDescription}>
                            • One-on-one personal training
                            • Flexible scheduling
                        </AppText>
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
        marginVertical: 30,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
        color: '#333',
    },
    subDescription: {
        fontSize: 14,
        lineHeight: 20,
        color: '#666',
    }
});

export default PersonalTrainingScreen;