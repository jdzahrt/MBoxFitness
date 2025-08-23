import React, {useEffect} from 'react';
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import AppText from "../components/AppText";
import { Image } from 'react-native-expo-image-cache';
import colors from "../config/colors";
import eventsApi from "../api/events";
import useApi from "../hooks/useApi";

function EventsScreen({ route }) {
    const listing = route.params;
    const getEventsApi = useApi(eventsApi.getEvents);

    useEffect(() => {
        getEventsApi.request();
    }, []);

    // useEffect(() => {
    //     console.log('Events API data:', getEventsApi.data);
    //     console.log('Events API data keys:', getEventsApi.data ? Object.keys(getEventsApi.data) : 'no data');
    //     console.log('upcomingEvents:', getEventsApi.data?.upcomingEvents);
    //     console.log('Events API loading:', getEventsApi.loading);
    //     console.log('Events API error:', getEventsApi.error);
    // }, [getEventsApi.data, getEventsApi.loading, getEventsApi.error]);

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
                    data={getEventsApi.data || []}
                    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
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