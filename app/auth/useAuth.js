import {useContext} from "react";
import AuthContext from "./context";
import authStorage from "./storage";

export default function useAuth() {
    const {user, setUser} = useContext(AuthContext)

    const logIn = (authToken, userData) => {
        setUser(userData)
        authStorage.storeToken(authToken)
    }

    const logOut = () => {
        setUser(null)
        authStorage.removeToken()
    }

    return {user, logIn, logOut}
}
