import React from 'react';
import messagesApi from "../api/messages";
import * as Notifications from "expo-notifications";
import AppForm from "./forms/AppForm";
import AppFormField from "./forms/AppFormField";
import SubmitButton from "./forms/SubmitButton";
import useAuth from "../auth/useAuth";
import {StyleSheet, View} from "react-native";

function ContactTrainerForm({listing}) {
    const { user } = useAuth();
    
    Notifications.setNotificationHandler({
        handleNotification: () => ({
            shouldShowBanner: true,
            shouldShowList: true,
            // shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    const [messages, setMessages] = React.useState([]);

    const handleSubmit = async ({message}, {resetForm}) => {
        const result = await messagesApi.sendMessage(message, listing.id, user?.email)

        if (!result.ok) {
            console.log('Error sending message:', result.problem)
        } else {
            setMessages([...messages, {message, email: user?.email, listingId: listing.id}])

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Message sent to trainer',
                    body: message,
                },
                trigger: null,
            });

            resetForm()
        }
    }
    return (
        <View style={styles.formContainer}>
            <AppForm
                initialValues={{message: ''}}
                onSubmit={handleSubmit}
            >

                <View style={styles.messageFieldContainer}>
                    <AppFormField
                        autoCapitalize={'none'}
                        name={'message'}
                        placeholder={'Message...'}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <SubmitButton title={'Contact Trainer'}/>
                </View>
            </AppForm>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: 20,
        paddingBottom: 200,
    },
    messageFieldContainer: {
        marginBottom: 10,
    },
    buttonsContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
})

export default ContactTrainerForm;
