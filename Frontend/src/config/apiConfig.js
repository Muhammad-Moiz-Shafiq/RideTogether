// API Configuration
// Try to use the environment variable if present, otherwise fall back to localhost
// Note: For Vite to expose env variables to the client, they must be prefixed with VITE_
const API_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : "http://localhost:5000/api";

console.log("API URL being used:", API_URL);

// Create axios instance with default config
import axios from "axios";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
