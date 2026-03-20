import axios from "axios";
import { Platform } from "react-native";

// ─────────────────────────────────────────────────────
//  URL automatique selon la plateforme :
//  • Web browser      → localhost
//  • Android Emulator → 10.0.2.2
//  • Téléphone réel   → remplace par ton IP WiFi
// ─────────────────────────────────────────────────────

const getBaseURL = () => {
  if (Platform.OS === "web") {
    return "http://localhost:8000/api";
  }
  if (Platform.OS === "android") {
    return "http://10.0.2.2:8000/api"; // émulateur Android
  }
  return "http://localhost:8000/api"; // iOS simulator
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
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
