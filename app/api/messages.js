import apiClient from "./client";

const endpoint = "/messages";

const sendMessage = (content, recipient, title = 'New Message', type = 'message') => {
    const messageRequestData = {
        recipient,
        content,
        type,
        title
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
