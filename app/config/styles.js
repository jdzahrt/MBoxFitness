import {Platform} from "react-native";
import colors from "./colors";

export default {
    text: {
        fontSize: 18,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
        color: colors.dark
    },
    colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        black: colors.black,
        white: colors.white,
        medium: colors.medium,
        light: colors.light,
        dark: colors.dark,
        danger: colors.danger
    }
}
