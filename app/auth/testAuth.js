import authStorage from "./storage";
import apiClient from "../api/client";

const testUsers = [
    { id: 1, email: "test1@example.com", name: "Test User 1", role: "user" },
    { id: 2, email: "test2@example.com", name: "Test User 2", role: "trainer" },
    { id: 3, email: "admin@example.com", name: "Admin User", role: "admin" }
];

const loginAsTestUser = async (userId = 1) => {
    try {
        const response = await apiClient.post('/auth/test-login', { userId });
        
        if (response.ok && response.data.token) {
            await authStorage.storeToken(response.data.token);
            return response.data.user;
        }
        return false;
    } catch (error) {
        console.log('Test login error:', error);
        return false;
    }
};

export default {
    loginAsTestUser,
    testUsers
};