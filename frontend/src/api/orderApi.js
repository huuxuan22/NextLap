import axiosClient from './axiosClient';

const orderApi = {
  getAll: (skip = 0, limit = 10, status = null) => {
    const params = new URLSearchParams();
    params.append('skip', skip);
    params.append('limit', limit);
    if (status) params.append('status', status);
    return axiosClient.get(`/orders?${params.toString()}`);
  },
  getById: (id) => axiosClient.get(`/orders/${id}`),
  updateStatus: (orderId, data) => {
    return axiosClient.patch(`/orders/${orderId}/status`, data);
  },
};

export default orderApi;
