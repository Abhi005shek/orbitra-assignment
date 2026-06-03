import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  hasHydrated: boolean;
  isAuthenticated: boolean;

  login: (user: UserProfile, token: string) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      hasHydrated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
