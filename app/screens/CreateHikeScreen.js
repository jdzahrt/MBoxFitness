import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import * as Yup from 'yup';
import colors from '../config/colors';
import hikesApi from '../api/hikes';
import useApi from '../hooks/useApi';

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label('Hike Name'),
    location: Yup.string().required().label('Location'),
    date: Yup.string().required().label('Date'),
    time: Yup.string().required().label('Time'),
    difficulty: Yup.string().required().label('Difficulty'),
    description: Yup.string().label('Description')
});

function CreateHikeScreen({ navigation, route }) {
    const createHikeApi = useApi(hikesApi.createHike);
    const { onHikeCreated } = route.params;

    const handleSubmit = async (hikeData) => {
        const result = await createHikeApi.request(hikeData);
        
        if (result.ok) {
            Alert.alert('Success', 'Hike created successfully!', [
                { text: 'OK', onPress: () => {
                    onHikeCreated();
                    navigation.goBack();
                }}
            ]);
        } else {
            Alert.alert('Error', 'Failed to create hike. Please try again.');
        }
    };

    return (
        <Screen style={styles.container}>
            <ScrollView>
                <AppText style={styles.title}>Create New Hike</AppText>
                
                <AppForm
                    initialValues={{
                        name: '',
                        location: '',
                        date: '',
                        time: '',
                        difficulty: 'Easy',
                        description: ''
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <AppFormField
                        name="name"
                        placeholder="Hike Name"
                        icon="hiking"
                    />
                    <AppFormField
                        name="location"
                        placeholder="Location"
                        icon="map-marker"
                    />
                    <AppFormField
                        name="date"
                        placeholder="Date (e.g., Jan 18, 2024)"
                        icon="calendar"
                    />
                    <AppFormField
                        name="time"
                        placeholder="Time (e.g., 7:00 AM)"
                        icon="clock"
                    />
                    <AppFormField
                        name="difficulty"
                        placeholder="Difficulty (Easy, Moderate, Hard)"
                        icon="speedometer"
                    />
                    <AppFormField
                        name="description"
                        placeholder="Description (optional)"
                        icon="text"
                        multiline
                        numberOfLines={3}
                    />
                    
                    <SubmitButton title="Create Hike" />
                </AppForm>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.dark,
        marginBottom: 30,
        textAlign: 'center',
    },
});

export default CreateHikeScreen;