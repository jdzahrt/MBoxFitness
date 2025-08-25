import React from 'react';
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import AppText from "../components/AppText";
import { Image } from 'react-native-expo-image-cache';
import colors from "../config/colors";

function HikesScreen({ route }) {
    const listing = route.params;

    // Iowa and Midwest hikes data
    const upcomingHikes = [
        {
            id: 1,
            name: "Prairie Morning Walk",
            location: "Neal Smith Trail, Altoona",
            date: "Jan 18, 2024",
            time: "7:00 AM",
            difficulty: "Easy"
        },
        {
            id: 2,
            name: "Loess Hills Hike",
            location: "Preparation Canyon State Park",
            date: "Jan 21, 2024",
            time: "9:00 AM",
            difficulty: "Moderate"
        },
        {
            id: 3,
            name: "Effigy Mounds Trek",
            location: "Effigy Mounds National Monument",
            date: "Jan 27, 2024",
            time: "8:00 AM",
            difficulty: "Hard"
        },
        {
            id: 4,
            name: "Lake Walk & Meditation",
            location: "Saylorville Lake Trail",
            date: "Feb 3, 2024",
            time: "6:30 AM",
            difficulty: "Easy"
        },
        {
            id: 5,
            name: "Raccoon River Valley",
            location: "Raccoon River Valley Trail",
            date: "Feb 10, 2024",
            time: "9:00 AM",
            difficulty: "Moderate"
        }
    ];

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return colors.secondary;
            case 'Moderate': return '#FF9500';
            case 'Hard': return '#FF3B30';
            default: return colors.medium;
        }
    };

    const renderHikeRow = ({ item }) => (
        <View style={styles.hikeRow}>
            <View style={styles.hikeInfo}>
                <AppText style={styles.hikeName}>{item.name}</AppText>
                <AppText style={styles.hikeLocation}>{item.location}</AppText>
                <View style={styles.difficultyContainer}>
                    <AppText style={[styles.difficulty, { color: getDifficultyColor(item.difficulty) }]}>
                        {item.difficulty}
                    </AppText>
                </View>
            </View>
            <View style={styles.hikeDateTime}>
                <AppText style={styles.hikeDate}>{item.date}</AppText>
                <AppText style={styles.hikeTime}>{item.time}</AppText>
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
                    Explore Iowa's beautiful prairies, river valleys, and rolling hills with our hiking group. 
                    All fitness levels welcome!
                </AppText>

                <View style={styles.tableHeader}>
                    <AppText style={styles.headerText}>Upcoming Hikes</AppText>
                </View>

                <FlatList
                    data={upcomingHikes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderHikeRow}
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
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
        paddingBottom: 10,
        marginBottom: 15,
    },
    headerText: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
    hikeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: colors.white,
    },
    hikeInfo: {
        flex: 2,
        paddingRight: 10,
    },
    hikeName: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.dark,
        marginBottom: 4,
    },
    hikeLocation: {
        fontSize: 14,
        color: colors.medium,
        marginBottom: 4,
    },
    difficultyContainer: {
        alignSelf: 'flex-start',
    },
    difficulty: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    hikeDateTime: {
        flex: 1,
        alignItems: 'flex-end',
    },
    hikeDate: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.dark,
        marginBottom: 2,
    },
    hikeTime: {
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

export default HikesScreen;