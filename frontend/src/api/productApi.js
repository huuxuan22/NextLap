import axiosClient from './axiosClient';

const productApi = {
  getAll: (skip = 0, limit = 10, brandId = null, categoryId = null) => {
    const params = new URLSearchParams();
    params.append('skip', skip);
    params.append('limit', limit);
    if (brandId) params.append('brand_id', brandId);
    if (categoryId) params.append('category_id', categoryId);
    return axiosClient.get(`/products?${params.toString()}`);
  },
  getById: (id) => axiosClient.get(`/products/${id}`),
  create: (payload) => axiosClient.post('/products', payload),
  update: (id, payload) => axiosClient.put(`/products/${id}`, payload),
  delete: (id) => axiosClient.delete(`/products/${id}`),
};

export default productApi;
