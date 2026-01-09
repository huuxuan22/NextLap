import axiosClient from './axiosClient';

const dashboardApi = {
  getStats: () => {
    return axiosClient.get('/dashboard/stats');
  },

  getRevenue: (year) => {
    return axiosClient.get(`/dashboard/revenues-chart?year=${year}`);
  },

  getProductsSold: (year) => {
    return axiosClient.get(`/dashboard/products-sales-chart?year=${year}`);
  },
};

export default dashboardApi;
