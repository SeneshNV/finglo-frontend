// src/lib/api/client.ts
import axios from "axios";

// Make sure this points to gateway
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        `🚀 ${config.method?.toUpperCase()} ${config.url}`,
        config.data,
      );
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Add response interceptor for logging
apiClient.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        `${response.config.method?.toUpperCase()} ${response.config.url}`,
        response.data,
      );
    }
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
