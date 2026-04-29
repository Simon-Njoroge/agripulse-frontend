import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/auth.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
      setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      clearAuth: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'agripulse-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);