import apiClient from "./client";

const endpoint = "/bookings";

const createBooking = (bookingData) => apiClient.post(endpoint, bookingData);

const getMyBookings = async () => {
    return await apiClient.get(`${endpoint}/my-bookings`);
}

const getClassSchedule = (classId) => apiClient.get(`${endpoint}/schedule/${classId}`);

export default {
    createBooking,
    getMyBookings,
    getClassSchedule
};