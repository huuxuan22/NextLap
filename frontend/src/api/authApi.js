import axiosClient from "./axiosClient";

const authApi = {
    login: (data) => axiosClient.post("/auth/login", data),
    register: (data) => axiosClient.post("/auth/register", data),
    me: () => axiosClient.get("/auth/me"),
    refresh: () => axiosClient.post("/auth/refresh"),
    loginWithGoogle: () => {
        const width = 500;
        const height = 600;
        const left = (window.screen.width / 2) - (width / 2);
        const top = (window.screen.height / 2) - (height / 2);
        return window.open(
            `http://localhost:8000/api/auth/google/login`,
            'google-login',
            `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
        );
    },
    loginWithFacebook: () => {
        const width = 500;
        const height = 600;
        const left = (window.screen.width / 2) - (width / 2);
        const top = (window.screen.height / 2) - (height / 2);

        window.open(
            `http://localhost:8000/api/auth/facebook/login`,
            'facebook-login',
            `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
        );
    }
};

export default authApi;
