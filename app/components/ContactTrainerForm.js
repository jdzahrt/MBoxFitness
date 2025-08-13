import React from 'react';
import messagesApi from "../api/messages";
import * as Notifications from "expo-notifications";
import AppForm from "./forms/AppForm";
import AppFormField from "./forms/AppFormField";
import SubmitButton from "./forms/SubmitButton";

function ContactTrainerForm({listing}) {
    Notifications.setNotificationHandler({
        handleNotification: () => ({
            shouldShowBanner: true,
            shouldShowList: true,
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    const [messages, setMessages] = React.useState([]);

    const handleSubmit = async ({message}, {resetForm}) => {
        // const result = await messagesApi.sendMessage(message, listing.id)

        // if (!result.ok) {
        //     console.log('error')
        // } else {
            setMessages(message)

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Message sent',
                    body: message,
                },
                trigger: null,
            });

            resetForm()
        }
    // }
    return (
        <AppForm
            initialValues={{message: ''}}
            onSubmit={handleSubmit}
        >
            <AppFormField
                name={'email'}
                placeholder={'Your email (optional)'}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
            />
            <AppFormField
                autoCapitalize={'none'}
                name={'message'}
                placeholder={'Message...'}
            />
            <SubmitButton title={'Contact Trainer'}/>
        </AppForm>
    );
}

export default ContactTrainerForm;
