import apiClient from "./client";

const updatePushToken = (pushToken) => {
    return apiClient.put("/users/push-token", { pushToken });
};

export default {
    updatePushToken
};