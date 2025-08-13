import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import * as Notifications from 'expo-notifications';

function TokenScreen() {
    const [pushToken, setPushToken] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getPushToken = async () => {
            try {
                // Request permissions first
                const { status } = await Notifications.requestPermissionsAsync();
                if (status !== 'granted') {
                    setError('Permission not granted');
                    return;
                }

                const token = await Notifications.getExpoPushTokenAsync();
                setPushToken(token.data);
                Alert.alert('Push Token', token.data);
            } catch (err) {
                setError('Push tokens only work on physical devices, not simulator');
                Alert.alert('Error', 'Push tokens only work on physical devices');
            }
        };
        getPushToken();
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <TouchableOpacity onPress={() => Alert.alert('Token', pushToken || error)}>
                <Text>Show Push Token</Text>
            </TouchableOpacity>
            {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
            {pushToken && <Text style={{ marginTop: 10 }}>Token: {pushToken}</Text>}
        </View>
    );
}

export default TokenScreen;
