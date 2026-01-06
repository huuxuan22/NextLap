import axiosClient from './axiosClient';

const brandApi = {
  getAll: ({ page = 1, limit = 10, search = '' } = {}) => {
    const params = new URLSearchParams();

    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (search) params.append('search', search);

    return axiosClient.get(`/brands?${params.toString()}`);
  },

  getById: (id) => axiosClient.get(`/brands/${id}`),
  create: (payload) => axiosClient.post('/brands', payload),
  update: (id, payload) => axiosClient.put(`/brands/${id}`, payload),
  delete: (id) => axiosClient.delete(`/brands/${id}`),
};

export default brandApi;
