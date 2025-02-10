import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_REACT_BACKEND_BASE_URL || "http://localhost:8080/api"; // Get URL from environment variable

// Function to get token from local storage (or any storage mechanism)
const getToken = (): string | null => {
  return localStorage.getItem("token"); // Change if you use cookies or session storage
};

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Automatically adds Authorization token to each request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handles unauthorized errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access! Redirecting to login...");
      localStorage.removeItem("token"); // Clear token if expired
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
