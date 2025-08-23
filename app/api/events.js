import apiClient from "./client";

const endpoint = "/events";

const getEvents = async () => {
    // console.log('GET EVENTS RESULTS FROM API', results.data);
    return await apiClient.get(endpoint);
}

const createEvent = (eventData) => apiClient.post(endpoint, eventData);

const getMyEvents = () => apiClient.get(`${endpoint}/my-events`);

const updateEvent = (id, eventData) => apiClient.put(`${endpoint}/${id}`, eventData);

export default {
    getEvents,
    createEvent,
    getMyEvents,
    updateEvent
};