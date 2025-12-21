import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import bookingApi from "../api/booking";
import useApi from "../hooks/useApi";

function MyClassesScreen(props) {
    const getMyBookingsApi = useApi(bookingApi.getMyBookings);

    useEffect(() => {
        console.log('Loading my bookings...');
        getMyBookingsApi.request();
    }, []);

    console.log('MyBookings API state:', {
        data: getMyBookingsApi.data,
        loading: getMyBookingsApi.loading,
        error: getMyBookingsApi.error
    });

    const renderClassItem = ({ item }) => (
        <View style={styles.classItem}>
            <AppText style={styles.className}>{item.className} - {item.userName}</AppText>
            <AppText style={styles.classDate}>{item.date} at {item.time}</AppText>
            <AppText style={styles.classTime}>${item.price} - {item.paymentStatus}</AppText>
            {item.notes && <AppText style={styles.notes}>{item.notes}</AppText>}
        </View>
    );

    if (getMyBookingsApi.loading) {
        return (
            <Screen style={styles.container}>
                <AppText style={styles.title}>Loading...</AppText>
            </Screen>
        );
    }

    if (getMyBookingsApi.error) {
        return (
            <Screen style={styles.container}>
                <AppText style={styles.title}>Error loading bookings</AppText>
                <AppText>{getMyBookingsApi.error}</AppText>
            </Screen>
        );
    }

    return (
        <Screen style={styles.container}>
            <AppText style={styles.title}>My Training Sessions</AppText>
            {(!getMyBookingsApi.data || getMyBookingsApi.data.length === 0) ? (
                <AppText>No bookings found</AppText>
            ) : (
                <FlatList
                    data={getMyBookingsApi.data}
                    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                    renderItem={renderClassItem}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            )}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
        color: colors.dark,
    },
    classItem: {
        backgroundColor: colors.light,
        padding: 15,
        borderRadius: 8,
        marginVertical: 5,
    },
    className: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.dark,
        marginBottom: 5,
    },
    classDate: {
        fontSize: 16,
        color: colors.medium,
        marginBottom: 2,
    },
    classTime: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: '500',
    },
    separator: {
        height: 10,
    },
    notes: {
        fontSize: 14,
        color: colors.medium,
        fontStyle: 'italic',
        marginTop: 5,
    },
});

export default MyClassesScreen;
