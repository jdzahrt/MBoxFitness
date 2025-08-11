const {Expo} = require('expo-server-sdk');

const sendPushNotification = async (expoPushToken, title, body) => {
    const expo = new Expo();
    const message = [{
        to: expoPushToken,
        sound: 'default',
        title: title,
        body: body,
        data: {withSome: 'data'},
    }];

    const chunks = expo.chunkPushNotifications(message);
    const tickets = [];

    for (const chunk of chunks) {
        try {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
        } catch (error) {
            console.error(error);
        }
    }
}
