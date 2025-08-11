import React, {useState} from 'react';
import Screen from '../components/Screen'

import {StyleSheet, Image} from 'react-native';

import * as Yup from "yup";
import {AppForm, AppFormField, SubmitButton} from '../components/forms'
import AppFormPicker from "../components/forms/AppFormPicker";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import listingsApi from "../api/listings";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label('Title'),
    price: Yup.number().required().min(1).max(10000).label('Price'),
    category: Yup.object().required().label('Category'),
    description: Yup.string().optional().nullable().label('Description'),
    images: Yup.array().min(1, 'Please select at least one image').label('Images')
})

const categories = [
    {label: 'Furniture', value: 1, iconName: 'floor-lamp', backgroundColor: '#fc5c65'},
    {label: 'Clothing', value: 2, iconName: 'shoe-heel', backgroundColor: '#2bcbba'},
    {label: 'Camera', value: 3, iconName: 'camera', backgroundColor: '#fed330'},
    {label: 'Cars', value: 4, iconName: 'car', backgroundColor: '#fd9644'},
    {label: 'Sports', value: 5, iconName: 'basketball', backgroundColor: '#45aaf2'},
    {label: 'Music & Movies', value: 6, iconName: 'headphones', backgroundColor: '#4b7bec'},
    {label: 'Books', value: 7, iconName: 'book', backgroundColor: '#b700ff'},
    {label: 'Games', value: 8, iconName: 'cards', backgroundColor: '#5dd94f'},
    {label: 'Other', value: 9, iconName: 'calendar', backgroundColor: '#7b8ca1'},
]

function ListEditScreen(props) {
    const location = useLocation();

    const handleSubmit = async (listing, { resetForm }) => {
        const result = await listingsApi.postListing(
            {...listing, location})

        if (!result.ok) {
            console.log('Error posting listing', result)
            return alert('Could not post listing')
        }

        resetForm();
        props.navigation.navigate('Listings')

    }

    return (
        <Screen style={styles.container}>
            <UploadScreen />
            <Image
                style={styles.logo}
                source={require('../assets/logo-red.png')}
            />
            <AppForm
                initialValues={{
                    title: '',
                    price: '',
                    description: '',
                    category: null,
                    images: []
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <FormImagePicker name={'images'}/>
                <AppFormField
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    keyboardTypef={'title'}
                    maxLength={255}
                    name={'title'}
                    placeholder={'Title'}
                    textContentType={'title'}
                    width={200}
                />
                <AppFormField
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    maxLength={8}
                    name={'price'}
                    keyboardTypef={'price'}
                    placeholder={'Price'}
                    textContentType={'price'}
                    width={150}
                />
                <AppFormPicker
                    items={categories}
                    name={'category'}
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder={'Category'}
                    width={150}
                />
                <AppFormField
                    maxLength={255}
                    multiline
                    name={'description'}
                    placeholder={'Description'}
                    textContentType={'description'}
                />
                <SubmitButton title='POST'/>
            </AppForm>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20
    }
});

export default ListEditScreen;
