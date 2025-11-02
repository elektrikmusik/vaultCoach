import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { User } from '@/types';
import * as authService from '@/services/auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      set => ({
        user: null,
        isLoading: true,
        isAuthenticated: false,

        setUser: user => {
          set({ user, isAuthenticated: !!user });
        },

        setLoading: loading => {
          set({ isLoading: loading });
        },

        checkAuth: async () => {
          try {
            set({ isLoading: true });
            const user = await authService.getCurrentUser();
            set({ user, isAuthenticated: !!user, isLoading: false });
          } catch (error) {
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        },

        logout: async () => {
          try {
            await authService.signOut();
            set({ user: null, isAuthenticated: false });
          } catch (error) {
            console.error('Logout error:', error);
          }
        },
      }),
      {
        name: 'auth-store',
      }
    ),
    {
      enabled: import.meta.env.DEV,
    }
  )
);
