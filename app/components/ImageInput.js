import React, {useEffect} from 'react';
import {StyleSheet, View, Image, TouchableWithoutFeedback, Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";
import colors from "../config/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";

function ImageInput({imageUri, onChangeImage}) {
    useEffect(() => {
        requestPermission()
    }, []);

    const requestPermission = async () => {
        const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!granted) {
            alert('You need to enable permission to access library')
        }
    }

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5
            })
            if (!result.canceled) {
                onChangeImage(result.assets[0].uri)
            }
        } catch (error) {
            console.log('Error reading an image', error)
        }
    }

    const handlePress = () => {
        if (!imageUri) {
            selectImage()
        } else {
            Alert.alert('Delete', 'Are you sure you want to delete this image?', [
                {text: 'Yes', onPress: () => onChangeImage(null)},
                {text: 'No'}
            ])
        }
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                {!imageUri && (<MaterialCommunityIcons name={'camera'}/>)}
                {imageUri && (<Image source={{uri: imageUri}} style={styles.image}/>)}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: 100,
        borderRadius: 15,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15
    }
});

export default ImageInput;
