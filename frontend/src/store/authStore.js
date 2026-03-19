import { create } from "zustand";
import { authAPI } from "../api/client";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.login({ email, password });
      const { access_token, user } = response.data;
      set({ user, token: access_token, isLoading: false });
      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.detail || "Erreur de connexion. Réessayez.";
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },

  register: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.register({ username, email, password });
      const { access_token, user } = response.data;
      set({ user, token: access_token, isLoading: false });
      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.detail || "Erreur d'inscription. Réessayez.";
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },

  logout: () => set({ user: null, token: null, error: null }),

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
