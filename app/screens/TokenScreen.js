import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

function TokenScreen() {
    const [pushToken, setPushToken] = useState('');
    const [error, setError] = useState('');
    const [isPhysicalDevice, setIsPhysicalDevice] = useState(false);

    useEffect(() => {
        const getPushToken = async () => {
            try {
                // Check if running on physical device
                const isDevice = Device.isDevice;
                setIsPhysicalDevice(isDevice);
                
                if (!isDevice) {
                    setError('Push notifications only work on physical devices');
                    return;
                }

                // Request permissions
                const { status } = await Notifications.requestPermissionsAsync();
                if (status !== 'granted') {
                    setError('Push notification permissions not granted');
                    return;
                }

                const token = await Notifications.getExpoPushTokenAsync();
                setPushToken(token.data);
            } catch (err) {
                setError(`Error getting push token: ${err.message}`);
            }
        };
        getPushToken();
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>Push Token Status</Text>
            
            <Text>Device Type: {isPhysicalDevice ? 'Physical Device' : 'Simulator'}</Text>
            
            {error && (
                <Text style={{ color: 'red', marginTop: 10, marginBottom: 10 }}>
                    {error}
                </Text>
            )}
            
            {pushToken && (
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Push Token:</Text>
                    <Text style={{ fontSize: 12, marginTop: 5 }}>{pushToken}</Text>
                </View>
            )}
            
            <TouchableOpacity 
                style={{ 
                    backgroundColor: '#007AFF', 
                    padding: 10, 
                    borderRadius: 5, 
                    marginTop: 20 
                }}
                onPress={() => Alert.alert('Token', pushToken || error)}
            >
                <Text style={{ color: 'white', textAlign: 'center' }}>Show Token</Text>
            </TouchableOpacity>
        </View>
    );
}

export default TokenScreen;
