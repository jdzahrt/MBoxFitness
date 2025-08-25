import apiClient from "./client";

const getHikes = () => apiClient.get("/hikes");

const createHike = (hikeData) => apiClient.post("/hikes", hikeData);

const deleteHike = (id) => apiClient.delete(`/hikes/${id}`);

export default {
    getHikes,
    createHike,
    deleteHike
};