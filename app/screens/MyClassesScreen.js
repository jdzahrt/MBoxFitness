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
        getMyBookingsApi.request();
    }, []);

    const renderClassItem = ({ item }) => (
        <View style={styles.classItem}>
            <AppText style={styles.className}>{item.className}</AppText>
            <AppText style={styles.classDate}>{item.date}</AppText>
            <AppText style={styles.classTime}>{item.time}</AppText>
        </View>
    );

    return (
        <Screen style={styles.container}>
            <AppText style={styles.title}>My Booked Classes</AppText>
            <FlatList
                data={getMyBookingsApi.data || []}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                renderItem={renderClassItem}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
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
});

export default MyClassesScreen;