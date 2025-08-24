import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useStripe } from '@stripe/stripe-react-native';
import AppText from "../components/AppText";
import { Image } from 'react-native-expo-image-cache';
import colors from "../config/colors";
import bookingApi from "../api/booking";
import paymentsApi from "../api/payments";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";

function ClassBookingScreen({ route, navigation }) {
    const listing = route.params;
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [loading, setLoading] = useState(false);

    // Mock class schedule data
    const classSchedule = {
        '2025-08-15': ['9:00 AM', '11:00 AM', '6:00 PM'],
        '2025-08-16': ['10:00 AM', '7:00 PM'],
        '2025-08-17': ['9:00 AM', '5:00 PM'],
        '2025-08-18': ['11:00 AM', '6:00 PM'],
        '2025-08-19': ['9:00 AM', '10:00 AM', '7:00 PM'],
    };

    const availableDates = Object.keys(classSchedule);

    const createBookingApi = useApi(bookingApi.createBooking);
    const createPaymentIntentApi = useApi(paymentsApi.createPaymentIntent);

    const handleBookClass = async () => {
        if (!selectedDate || !selectedTime) {
            Alert.alert('Please select both date and time');
            return;
        }
        
        setLoading(true);
        
        try {
            // Create payment intent
            const paymentResult = await createPaymentIntentApi.request(listing.price);
            
            if (!paymentResult.ok) {
                Alert.alert('Error', 'Failed to initialize payment');
                return;
            }
            
            // Initialize payment sheet
            const { error } = await initPaymentSheet({
                merchantDisplayName: 'MBox Fitness',
                paymentIntentClientSecret: paymentResult.data.clientSecret,
            });
            
            if (error) {
                Alert.alert('Error', error.message);
                return;
            }
            
            // Present payment sheet
            const { error: paymentError } = await presentPaymentSheet();
            
            if (paymentError) {
                Alert.alert('Payment cancelled', paymentError.message);
                return;
            }
            
            // Create booking after successful payment
            const bookingData = {
                classId: listing.id,
                className: listing.title,
                date: selectedDate,
                time: selectedTime,
                price: listing.price,
                paymentIntentId: paymentResult.data.id
            };
            
            const result = await createBookingApi.request(bookingData);
            
            if (result.ok) {
                Alert.alert(
                    'Success!', 
                    `${listing.title} booked for ${selectedDate} at ${selectedTime}`,
                    [{ text: 'OK', onPress: () => navigation.navigate(routes.FEED) }]
                );
            } else {
                Alert.alert('Error', 'Payment successful but booking failed. Please contact support.');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    style={styles.image}
                    preview={{ uri: listing.images[0].thumbnailUrl }}
                    tint={"light"}
                    uri={listing.images[0].url}
                />
                
                <View style={styles.detailsContainer}>
                    <AppText style={styles.title}>{listing.title}</AppText>
                    <AppText style={styles.price}>${listing.price} per class</AppText>
                    
                    <AppText style={styles.description}>
                        High-intensity boxing classes with focus mitts. Perfect for all skill levels.
                        Build strength, improve technique, and have fun!
                    </AppText>

                    <AppText style={styles.sectionTitle}>Select Date:</AppText>
                    <View style={styles.dateContainer}>
                        {availableDates.map((date) => (
                            <TouchableOpacity
                                key={date}
                                style={[
                                    styles.dateButton,
                                    selectedDate === date && styles.selectedDateButton
                                ]}
                                onPress={() => {
                                    setSelectedDate(date);
                                    setSelectedTime(null); // Reset time when date changes
                                }}
                            >
                                <AppText style={[
                                    styles.dateText,
                                    selectedDate === date && styles.selectedDateText
                                ]}>
                                    {new Date(date).toLocaleDateString('en-US', { 
                                        weekday: 'short', 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })}
                                </AppText>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {selectedDate && (
                        <>
                            <AppText style={styles.sectionTitle}>Select Time:</AppText>
                            <View style={styles.timeContainer}>
                                {classSchedule[selectedDate].map((time) => (
                                    <TouchableOpacity
                                        key={time}
                                        style={[
                                            styles.timeButton,
                                            selectedTime === time && styles.selectedTimeButton
                                        ]}
                                        onPress={() => setSelectedTime(time)}
                                    >
                                        <AppText style={[
                                            styles.timeText,
                                            selectedTime === time && styles.selectedTimeText
                                        ]}>
                                            {time}
                                        </AppText>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    )}

                    <TouchableOpacity 
                        style={[
                            styles.bookButton,
                            (!selectedDate || !selectedTime || loading) && styles.disabledButton
                        ]}
                        onPress={handleBookClass}
                        disabled={!selectedDate || !selectedTime || loading}
                    >
                        <AppText style={styles.bookButtonText}>
                            {loading ? 'Processing...' : 'Book & Pay'}
                        </AppText>
                    </TouchableOpacity>
                </View>
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
    title: {
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 10,
    },
    price: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 30,
        color: colors.medium,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        marginTop: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    dateButton: {
        backgroundColor: colors.light,
        padding: 12,
        borderRadius: 8,
        margin: 5,
        minWidth: 80,
        alignItems: 'center',
    },
    selectedDateButton: {
        backgroundColor: colors.primary,
    },
    dateText: {
        fontSize: 14,
        color: colors.dark,
    },
    selectedDateText: {
        color: colors.white,
        fontWeight: '600',
    },
    timeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 30,
    },
    timeButton: {
        backgroundColor: colors.light,
        padding: 12,
        borderRadius: 8,
        margin: 5,
        minWidth: 80,
        alignItems: 'center',
    },
    selectedTimeButton: {
        backgroundColor: colors.primary,
    },
    timeText: {
        fontSize: 14,
        color: colors.dark,
    },
    selectedTimeText: {
        color: colors.white,
        fontWeight: '600',
    },
    bookButton: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: colors.medium,
    },
    bookButtonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '600',
    },
});

export default ClassBookingScreen;