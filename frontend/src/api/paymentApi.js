import axiosClient from "./axiosClient";

const paymentApi = {
    createPayment: (amount) => {
        return axiosClient.get(`/payment/create-payment?amount=${amount}`);
    },
};

export default paymentApi;