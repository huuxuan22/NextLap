import axiosClient from './axiosClient';

const productApi = {
  getAll: (skip = 0, limit = 10, brandId = null, search = null) => {
    const params = new URLSearchParams();
    params.append('skip', skip);
    params.append('limit', limit);
    if (search) params.append('search', search);
    if (brandId) params.append('brand_id', brandId);
    return axiosClient.get(`/products?${params.toString()}`);
  },
  getById: (id) => axiosClient.get(`/products/${id}`),
  create: (payload) =>
    axiosClient.post('/products', payload, {
      headers: {
        'Content-Type':
          payload instanceof FormData
            ? 'multipart/form-data'
            : 'application/json',
      },
    }),
  update: (id, payload) =>
    axiosClient.put(`/products/${id}`, payload, {
      headers: {
        'Content-Type':
          payload instanceof FormData
            ? 'multipart/form-data'
            : 'application/json',
      },
    }),
  delete: (id) => axiosClient.delete(`/products/${id}`),
};

export default productApi;
