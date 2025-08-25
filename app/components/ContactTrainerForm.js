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
        if (!user) {
            console.log('User not authenticated');
            return;
        }
        
        // Use a default trainer ID - you should replace this with your actual trainer user ID
        const trainerId = listing.userId || '82d9325a-6775-4c94-9daa-5d3f1ca34cd8'; // Your trainer ID
        
        console.log('Sending message:', { message, trainerId, user: user.id });
        
        const result = await messagesApi.sendMessage(
            message, 
            trainerId,
            'Training Inquiry',
            'training_request'
        )

        console.log('Message result:', result);

        if (!result.ok) {
            console.log('Error sending message:', {
                problem: result.problem,
                status: result.status,
                data: result.data,
                originalError: result.originalError
            });
            // Show user-friendly error
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Message failed to send',
                    body: 'Please try again later',
                },
                trigger: null,
            });
        } else {
            setMessages([...messages, {content: message, recipient: trainerId}])

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
