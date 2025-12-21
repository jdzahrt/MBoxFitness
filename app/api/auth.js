import client from "./client";

const login = (email, password) => client.post("/auth/login", { email, password });
const forgotPassword = (email) => client.post("/auth/reset-password", { email });
const resetPassword = (token, password) => client.post("/auth/reset-password/confirm", { token, password });
const changePassword = (currentPassword, newPassword) => client.post("/auth/change-password", { currentPassword, newPassword });

export default {
    login,
    forgotPassword,
    resetPassword,
    changePassword
}
