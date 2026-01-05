import axiosClient from "./axiosClient";

const userApi = {
    // Get current user profile
    getProfile: () => {
        return axiosClient.get('/auth/me');
    },

    // Update user profile
    updateProfile: (data) => {
        return axiosClient.put('/users/profile', data);
    },

    // Change password
    changePassword: (data) => {
        return axiosClient.post('/users/change-password', data);
    },

    // Get user orders
    getOrders: (params) => {
        return axiosClient.get('/orders', { params });
    },

    // Get order detail
    getOrderDetail: (orderId) => {
        return axiosClient.get(`/orders/${orderId}`);
    }
};

export default userApi;
