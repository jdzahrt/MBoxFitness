import React from 'react';
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import AppText from "../components/AppText";
import { Image } from 'react-native-expo-image-cache';
import colors from "../config/colors";

function EventsScreen({ route }) {
    const listing = route.params;

    // Mock events data
    const upcomingEvents = [
        {
            id: 1,
            name: "Boxing Bootcamp Challenge",
            location: "Main Gym Floor",
            date: "Jan 20, 2024",
            time: "10:00 AM"
        },
        {
            id: 2,
            name: "Fitness Competition",
            location: "Outdoor Arena",
            date: "Jan 25, 2024",
            time: "2:00 PM"
        },
        {
            id: 3,
            name: "Nutrition Workshop",
            location: "Conference Room A",
            date: "Feb 1, 2024",
            time: "6:00 PM"
        },
        {
            id: 4,
            name: "Team Building Workout",
            location: "Main Gym Floor",
            date: "Feb 8, 2024",
            time: "9:00 AM"
        },
        {
            id: 5,
            name: "Charity Fitness Run",
            location: "Central Park",
            date: "Feb 15, 2024",
            time: "8:00 AM"
        },
        {
            id: 6,
            name: "Advanced Boxing Seminar",
            location: "Training Room B",
            date: "Feb 22, 2024",
            time: "11:00 AM"
        }
    ];

    const renderEventRow = ({ item }) => (
        <View style={styles.eventRow}>
            <View style={styles.eventInfo}>
                <AppText style={styles.eventName}>{item.name}</AppText>
                <AppText style={styles.eventLocation}>{item.location}</AppText>
            </View>
            <View style={styles.eventDateTime}>
                <AppText style={styles.eventDate}>{item.date}</AppText>
                <AppText style={styles.eventTime}>{item.time}</AppText>
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Image
                style={styles.image}
                preview={{ uri: listing.images[0].thumbnailUrl }}
                tint={"light"}
                uri={listing.images[0].url}
            />
            
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{listing.title}</AppText>
                <AppText style={styles.description}>
                    Join us for exciting fitness events, competitions, and workshops. 
                    All skill levels welcome!
                </AppText>

                <View style={styles.tableHeader}>
                    <AppText style={styles.headerText}>Upcoming Events</AppText>
                </View>

                <FlatList
                    data={upcomingEvents}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderEventRow}
                    scrollEnabled={false}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
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
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 30,
        color: colors.medium,
    },
    tableHeader: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    headerText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    eventRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: colors.white,
    },
    eventInfo: {
        flex: 2,
        paddingRight: 10,
    },
    eventName: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.dark,
        marginBottom: 4,
    },
    eventLocation: {
        fontSize: 14,
        color: colors.medium,
    },
    eventDateTime: {
        flex: 1,
        alignItems: 'flex-end',
    },
    eventDate: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.dark,
        marginBottom: 2,
    },
    eventTime: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '500',
    },
    separator: {
        height: 1,
        backgroundColor: colors.light,
        marginHorizontal: 10,
    },
});

export default EventsScreen;