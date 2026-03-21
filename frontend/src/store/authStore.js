import { create } from "zustand";
import { authAPI } from "../api/client";

const _parseError = (err, fallback) => {
  if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
    return "Serveur inaccessible — vérifiez que le backend est démarré.";
  }
  if (err.code === "ERR_NETWORK" || err.message?.includes("Network Error")) {
    return "Pas de connexion au serveur. Vérifiez votre réseau et le backend.";
  }
  return err.response?.data?.detail || fallback;
};

const useAuthStore = create((set) => ({
  user:      null,
  token:     null,
  isLoading: false,
  error:     null,

  register: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.register({ username, email, password });
      const { access_token, user } = response.data;
      set({ user, token: access_token, isLoading: false });
      return { success: true };
    } catch (err) {
      const message = _parseError(err, "Erreur d'inscription. Réessayez.");
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.login({ email, password });
      const { access_token, user } = response.data;
      set({ user, token: access_token, isLoading: false });
      return { success: true };
    } catch (err) {
      const message = _parseError(err, "Erreur de connexion. Réessayez.");
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },

  logout:     () => set({ user: null, token: null, error: null }),
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
