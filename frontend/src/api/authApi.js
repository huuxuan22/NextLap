import axiosClient from "./axiosClient";

const authApi = {
    login: (data) => axiosClient.post("/auth/login", data),
    register: (data) => axiosClient.post("/auth/register", data),
    me: () => axiosClient.get("/auth/me"),
    refresh: () => axiosClient.post("/auth/refresh"),
};

export default authApi;
