import axios from "axios";

const accessToken = localStorage.getItem("AUTH_TOKEN");

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// catch 401 -> refresh
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      localStorage.removeItem("IS_LOGGED_IN");
      originalRequest._retry = true;

      try {
        await axiosInstance.post("/api/v1/auth/refresh");
        localStorage.setItem("IS_LOGGED_IN", "true");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const api = axiosInstance;
