import apiClient from "./client";

const addUser = (userData) => {
    const userRequestData = {
        name: userData.user,
        email: userData.email,
        password: userData.password
    }

    return apiClient.post("/users", userRequestData);
}

export default {
    addUser
}
