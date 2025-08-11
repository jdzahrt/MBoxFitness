import AsyncStorage from "@react-native-async-storage/async-storage";

const store = async (key, value) => {
    try {
        const item = {
            value,
            timestamp: Date.now()
        }

        await AsyncStorage.setItem(key, JSON.stringify(item))
    }
    catch (e) {
        console.error(e)
    }
}

const isExpired = (item) => {
    const now = Date.now()
    const storedTime = item.timestamp
    const elapsed = now - storedTime

    return elapsed > 5 * 60 * 1000
}

const get = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        const item = JSON.parse(value)

        if (!item) return null

        if (isExpired(item)) {
            await AsyncStorage.removeItem(key)
            return null
        }

        return item.value
    }
    catch (e) {
        console.error(e)
    }
}

export default {
    store,
    get
}
