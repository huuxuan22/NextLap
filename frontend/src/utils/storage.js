export const getToken = () => localStorage.getItem("access_token");

export const setToken = (token) =>
  localStorage.setItem("access_token", token);

export const clearAuth = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_principal");
};
