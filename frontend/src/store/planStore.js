import { create } from "zustand";
import { planAPI } from "../api/client";

const usePlanStore = create((set) => ({
  plans:       [],
  currentPlan: null,
  isLoading:   false,
  error:       null,

  createPlan: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await planAPI.create(data);
      const newPlan = res.data;
      set((s) => ({
        plans:       [newPlan, ...s.plans],
        currentPlan: newPlan,
        isLoading:   false,
      }));
      return { success: true, plan: newPlan };
    } catch (err) {
      const message = err.response?.data?.detail || "Erreur lors de la création du plan.";
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },

  fetchPlans: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await planAPI.getAll();
      set({ plans: res.data, isLoading: false });
    } catch (err) {
      set({ error: "Impossible de charger les plans.", isLoading: false });
    }
  },

  setCurrentPlan: (plan) => set({ currentPlan: plan }),

  clearPlans: () => set({ plans: [], currentPlan: null, error: null }),
}));

export default usePlanStore;
