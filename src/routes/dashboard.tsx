import { createFileRoute, redirect } from '@tanstack/react-router';
import { Dashboard as DashboardPage } from '@/pages/Dashboard';
import { useAuthStore } from '@/stores/authStore';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: '/dashboard',
        },
      });
    }
  },
  component: DashboardPage,
});
