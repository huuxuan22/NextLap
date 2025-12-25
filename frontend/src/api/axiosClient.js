// src/api/axiosClient.js
import axios from "axios";
import { getToken, clearAuth } from "../utils/storage";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15000,
});

// ====== ⬇️ REQUEST INTERCEPTOR (tự gắn token) ======
axiosClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ====== ⬇️ RESPONSE INTERCEPTOR (chặn lỗi, đá ra login) ======
axiosClient.interceptors.response.use(
    (response) => response.data,

    async (error) => {
        const status = error?.response?.status;

        if (status === 401) {
            clearAuth();
            window.location.href = "/login";
        }

        // Lỗi server
        if (status >= 500) {
            console.error("Server error:", error);
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
