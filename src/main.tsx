import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/lib/router';
import '@/styles/globals.css';
import '@/i18n/config';
import type { Theme } from '@/types';

// Initialize theme before React renders to prevent flash
function initializeTheme() {
  const stored = localStorage.getItem('ui-store');
  let theme: Theme = 'system';

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed?.state?.theme) {
        theme = parsed.state.theme;
      }
    } catch {
      // Invalid stored data, use default
    }
  }

  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

// Apply theme immediately
initializeTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
