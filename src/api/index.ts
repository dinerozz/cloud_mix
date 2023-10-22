import axios from "axios";

const accessToken = localStorage.getItem("AUTH_TOKEN");

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

// catch 401 -> refresh
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("REFRESH_TOKEN");
      const res = await axiosInstance.post("/api/v1/auth/refresh", {
        refreshToken,
      });
      const newToken = res.data.accessToken;

      localStorage.setItem("AUTH_TOKEN", newToken);
      localStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);

      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export const api = axiosInstance;
