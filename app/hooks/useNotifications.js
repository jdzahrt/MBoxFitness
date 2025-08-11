import * as Notifications from "expo-notifications";
import expoPushTokenApi from "../api/expoPushToken";
import {useEffect} from "react";
import navigation from "../navigation/rootNavigation";
import routes from "../navigation/routes";

export default useNotifications = (notificationListener) => {
    useEffect(() => {
        registerForPushNotifications()

        if (notificationListener) Notifications.addNotificationReceivedListener(notificationListener => {
            // console.log('Notification received: ', notification)
            navigation.navigate(routes.ACCOUNT)
        })
    }, []);

    const registerForPushNotifications = async () => {
        try {
            const permission = await Notifications.requestPermissionsAsync();
            if (!permission.granted) return;
            const token = await Notifications.getExpoPushTokenAsync();
            console.log(token);
            const ok = await expoPushTokenApi.register(token.data);
            console.log('Push token: ', ok)

        } catch (error) {
            console.log('Error getting a push token', error);
        }
    }
}
