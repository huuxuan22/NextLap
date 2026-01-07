import axiosClient from './axiosClient';

const userApi = {
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
  },

  getAll: ({ page = 1, limit = 10, search = '' } = {}) => {
    const params = new URLSearchParams();

    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (search) params.append('search', search);

    return axiosClient.get(`/users/?${params.toString()}`);
  },

  lockUser: (id) => axiosClient.put(`/users/lock/${id}`),

  unlockUser: (id) => axiosClient.put(`/users/unlock/${id}`),
};

export default userApi;
