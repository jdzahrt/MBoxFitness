import React from 'react';
import Screen from "../components/Screen";
import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import colors from "../config/colors";
import routes from "../navigation/routes";


function ListingsScreen({navigation}) {
    const mittGroupsData = {
        id: 2,
        title: "Training Sessions",
        price: 30,
        description: "Get 1-on-1 training to hit your boxing goals",
        imageUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600",
        images: [
            {
                url: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600",
                thumbnailUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=150"
            }
        ]
    };

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Training Sessions</Text>
                <Text style={styles.headerSubtitle}>Book your next workout session</Text>

                <TouchableOpacity
                    style={styles.classCard}
                    onPress={() => navigation.navigate(routes.CLASS_BOOKING, mittGroupsData)}
                    activeOpacity={0.8}
                >
                    <Image
                        source={{uri: mittGroupsData.imageUrl}}
                        style={styles.classImage}
                        resizeMode="cover"
                    />
                    <View style={styles.cardContent}>
                        <Text style={styles.classTitle}>{mittGroupsData.title}</Text>
                        <Text style={styles.classDescription}>{mittGroupsData.description}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceLabel}>Starting at</Text>
                            <Text style={styles.price}>${mittGroupsData.price}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Book Now</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light,
        flex: 1
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.dark,
        textAlign: 'center',
        marginBottom: 8
    },
    headerSubtitle: {
        fontSize: 16,
        color: colors.medium,
        textAlign: 'center',
        marginBottom: 40
    },
    classCard: {
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: colors.dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        backgroundColor: colors.white
    },
    classImage: {
        width: '100%',
        height: 200
    },
    cardContent: {
        padding: 24,
        backgroundColor: colors.white
    },
    classTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.dark,
        marginBottom: 8
    },
    classDescription: {
        fontSize: 16,
        color: colors.medium,
        marginBottom: 16,
        lineHeight: 22
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 20
    },
    priceLabel: {
        fontSize: 14,
        color: colors.medium,
        marginRight: 8
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.primary
    },
    buttonContainer: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center'
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '600'
    }
});

export default ListingsScreen;
