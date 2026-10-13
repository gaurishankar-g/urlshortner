import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
