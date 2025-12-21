import apiClient from "./client";

const endpoint = "/bookings";

const createBooking = (bookingData) => apiClient.post(endpoint, bookingData);

const getMyBookings = async () => {

    const bookings =  await apiClient.get(`${endpoint}/my-bookings`);
    console.log("bookings", bookings);
    return bookings;
}

const getClassSchedule = (classId) => apiClient.get(`${endpoint}/schedule/${classId}`);

export default {
    createBooking,
    getMyBookings,
    getClassSchedule
};
