import axios from "axios";

const API_BASE_URL = "http://10.0.2.2:8000/api"; // Android emulator → localhost

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const authAPI = {
  register: (data) => apiClient.post("/auth/register", data),
  login: (data) => apiClient.post("/auth/login", data),
};

export default apiClient;
