import axios from "axios";
import { Platform } from "react-native";

const getBaseURL = () => {
  if (Platform.OS === "web")     return "http://localhost:8000/api";
  if (Platform.OS === "android") return "http://10.0.2.2:8000/api";
  return "http://localhost:8000/api";
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: { "Content-Type": "application/json" },
  timeout: 8000,
});

// Inject Bearer token automatically from Zustand store
apiClient.interceptors.request.use((config) => {
  try {
    // Zustand persists to memory; we import lazily to avoid circular deps
    const { token } = require("../store/authStore").default.getState();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (_) {}
  return config;
});

export const authAPI = {
  register: (data) => apiClient.post("/auth/register", data),
  login:    (data) => apiClient.post("/auth/login", data),
};

export const planAPI = {
  create:  (data) => apiClient.post("/plans", data),
  getAll:  ()     => apiClient.get("/plans"),
  getById: (id)   => apiClient.get(`/plans/${id}`),
};

export default apiClient;
