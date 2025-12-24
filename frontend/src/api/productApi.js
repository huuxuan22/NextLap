import axiosClient from "./axiosClient";

const productApi = {
    getAll: () => axiosClient.get("/products"),
    getById: (id) => axiosClient.get(`/products/${id}`),
    create: (payload) => axiosClient.post("/products", payload),
};

export default productApi;
