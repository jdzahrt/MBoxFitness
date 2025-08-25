import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import pushTokensApi from '../api/pushTokens';
import useAuth from '../auth/useAuth';

export default function usePushNotifications() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    registerForPushNotificationsAsync().then(token => {
      if (token) {
        pushTokensApi.updatePushToken(token);
      }
    });
  }, [user]);

  const registerForPushNotificationsAsync = async () => {
    if (!Device.isDevice) {
      console.log('Must use physical device for Push Notifications');
      return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
    
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    
    return token;
  };
}