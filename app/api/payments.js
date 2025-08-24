import apiClient from "./client";

const createPaymentIntent = async (amount, currency = 'usd') => {
    const result = await apiClient.post("/payments/create-payment-intent", {
        amount: Math.round(amount * 100), // Convert to cents
        currency
    });
    console.log('payment result', result);
    return result;
};

export default {
    createPaymentIntent
};