import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/lib/formSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormLabel, FormError } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/services/supabase';

export function ResetPasswordForm() {
  const navigate = useNavigate();
  const { updatePassword, isUpdatingPassword } = useAuth();
  const [isValidating, setIsValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    // Check if we have a valid session (user clicked the reset link)
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setIsValidToken(true);
      } else {
        setError('root', {
          message: 'Invalid or expired reset token. Please request a new password reset.',
        });
      }
      setIsValidating(false);
    };

    checkSession();
  }, [setError]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await updatePassword(data.password);
      navigate({ to: '/dashboard' });
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : 'Failed to update password',
      });
    }
  };

  if (isValidating) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">Validating reset token...</p>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-sm text-red-800 dark:text-red-200">
            Invalid or expired reset token. Please request a new password reset.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => navigate({ to: '/login?mode=forgot-password' })}
        >
          Go to Forgot Password
        </Button>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">Enter your new password below.</p>
      </div>

      <FormField>
        <FormLabel htmlFor="password" required>
          New Password
        </FormLabel>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          aria-invalid={!!errors.password}
        />
        {errors.password && <FormError message={errors.password.message} />}
      </FormField>

      <FormField>
        <FormLabel htmlFor="confirmPassword" required>
          Confirm New Password
        </FormLabel>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          {...register('confirmPassword')}
          aria-invalid={!!errors.confirmPassword}
        />
        {errors.confirmPassword && <FormError message={errors.confirmPassword.message} />}
      </FormField>

      {errors.root && <FormError message={errors.root.message} />}

      <Button type="submit" className="w-full" disabled={isUpdatingPassword}>
        {isUpdatingPassword ? 'Updating...' : 'Update Password'}
      </Button>
    </Form>
  );
}
