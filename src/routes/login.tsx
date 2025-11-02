import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { AuthTabs, type AuthMode } from '@/components/auth/AuthTabs';
import { useAuthStore } from '@/stores/authStore';
import { useEffect } from 'react';

export const Route = createFileRoute('/login')({
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      mode: (search.mode as AuthMode) || 'sign-in',
    };
  },
});

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { mode } = useSearch({ from: '/login' });

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/dashboard' });
    }
  }, [isAuthenticated, navigate]);

  // Get title based on mode
  const getTitle = () => {
    switch (mode) {
      case 'sign-up':
        return 'Create your account';
      case 'forgot-password':
        return 'Reset your password';
      case 'magic-link':
        return 'Sign in with magic link';
      default:
        return 'Sign in to your account';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {getTitle()}
          </h2>
        </div>
        <AuthTabs initialMode={mode} />
      </div>
    </div>
  );
}
