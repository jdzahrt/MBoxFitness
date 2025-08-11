import React from 'react';

import AppText from "../AppText";
import {StyleSheet} from "react-native";

function ErrorMessage({error, visible}) {
    if ( visible || error)
        return (
        <AppText style={styles.error}>
            {error}
        </AppText>
    );
    else return null
}

const styles = StyleSheet.create({
    error: {
        color: 'red'
    }
});

export default ErrorMessage;
