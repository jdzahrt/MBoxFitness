import {useEffect, useState} from "react";
import * as Location from "expo-location";

const useLocation = () => {
    const [location, setLocation] = useState();

    const getLocation = async () => {
        try {
            const {granted} = await Location.requestForegroundPermissionsAsync()
            if (!granted) {
                // alert('Permission to access location was denied')
                return
            }
            const {coords: {latitude, longitude}} = await Location.getLastKnownPositionAsync()
            setLocation({latitude, longitude})

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getLocation()
    }, []);

    return location
}

export default useLocation;
