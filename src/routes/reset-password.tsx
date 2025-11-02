import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ResetPasswordForm } from '@/components/forms/ResetPasswordForm';
import { useAuthStore } from '@/stores/authStore';
import { useEffect } from 'react';

export const Route = createFileRoute('/reset-password')({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    // This handles the case where user is redirected after clicking reset link
    if (isAuthenticated) {
      // Small delay to ensure password reset is processed
      setTimeout(() => {
        navigate({ to: '/dashboard' });
      }, 100);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your new password below
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
