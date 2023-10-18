import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (reqConfig) => {
  const authToken = localStorage.getItem("AUTH_TOKEN");
  if (authToken && reqConfig.headers) {
    reqConfig.headers["Authorization"] = `Bearer ${authToken}`;
  }

  return reqConfig;
});
// catch 401 and refresh the token
axiosInstance.interceptors.response.use((res) => res);

export const api = axiosInstance;
