import apiClient from "./client";

const endpoint = "/messages";

const sendMessage = (message, listingId, email = null) => {
    const messageRequestData = {
        message,
        listingId,
        email
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
