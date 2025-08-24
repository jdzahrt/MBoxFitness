import apiClient from "./client";

const endpoint = "/messages";

const sendMessage = (message, listingId) => {
    const messageRequestData = {
        message,
        listingId
    }

    return apiClient.post("/messages", messageRequestData);
}

const getMessages = async () =>
{const resp = await apiClient.get(`${endpoint}/my-messages`);
    console.log(resp);
return resp;}


export default {
    sendMessage,
    getMessages
}
