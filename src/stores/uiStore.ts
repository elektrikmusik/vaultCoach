import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { Theme } from '@/types';

interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

// Helper function to apply theme to document
const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      set => ({
        theme: 'system',
        sidebarOpen: true,

        setTheme: theme => {
          set({ theme });
          applyTheme(theme);
        },

        toggleSidebar: () => {
          set(state => ({ sidebarOpen: !state.sidebarOpen }));
        },

        setSidebarOpen: (open: boolean) => {
          set({ sidebarOpen: open });
        },
      }),
      {
        name: 'ui-store',
        onRehydrateStorage: () => {
          // Apply theme immediately after rehydration
          return state => {
            if (state?.theme) {
              applyTheme(state.theme);
            }
          };
        },
      }
    ),
    {
      enabled: import.meta.env.DEV,
    }
  )
);

// Listen for system preference changes when theme is 'system'
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemThemeChange = () => {
    const state = useUIStore.getState();
    if (state.theme === 'system') {
      applyTheme('system');
    }
  };

  // Use addEventListener if available, fallback to addListener for older browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleSystemThemeChange);
  } else {
    mediaQuery.addListener(handleSystemThemeChange);
  }
}
