import apiClient from "./client";

const sendMessage = (message, listingId) => {
    const messageRequestData = {
        message,
        listingId
    }

    return apiClient.post("/messages", messageRequestData);
}

export default {
    sendMessage
}
