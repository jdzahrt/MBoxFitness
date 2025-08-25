import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from "react-native";
import AppText from "../components/AppText";
import { Image } from 'react-native-expo-image-cache';
import colors from "../config/colors";
import hikesApi from "../api/hikes";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";

function HikesScreen({ route, navigation }) {
    const listing = route.params;
    const { user } = useAuth();
    const [hikes, setHikes] = useState([]);
    const getHikesApi = useApi(hikesApi.getHikes);
    
    useEffect(() => {
        loadHikes();
    }, []);
    
    const loadHikes = async () => {
        const result = await getHikesApi.request();
        if (result.ok) {
            setHikes(result.data);
        }
    };
    
    const isAdmin = user?.role === 'admin';

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
                    {isAdmin && (
                        <TouchableOpacity 
                            style={styles.addButton}
                            onPress={() => navigation.navigate('CreateHike', { onHikeCreated: loadHikes })}
                        >
                            <AppText style={styles.addButtonText}>+ Add Hike</AppText>
                        </TouchableOpacity>
                    )}
                </View>

                <FlatList
                    data={hikes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderHikeRow}
                    scrollEnabled={false}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <AppText style={styles.emptyText}>No hikes scheduled yet</AppText>
                        </View>
                    )}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    addButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    addButtonText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '600',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        color: colors.medium,
        fontSize: 16,
    },
});

export default HikesScreen;