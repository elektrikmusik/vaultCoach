import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/formSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormLabel, FormError } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';

interface ForgotPasswordFormProps {
  onSwitchToSignIn?: () => void;
}

export function ForgotPasswordForm({ onSwitchToSignIn }: ForgotPasswordFormProps) {
  const { resetPassword, isResettingPassword } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await resetPassword(data.email);
      setIsSuccess(true);
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : 'Failed to send reset email',
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <p className="text-sm text-green-800 dark:text-green-200">
            Password reset email sent! Please check your inbox and follow the instructions to reset
            your password.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            setIsSuccess(false);
            if (onSwitchToSignIn) {
              onSwitchToSignIn();
            }
          }}
        >
          Back to Sign In
        </Button>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <FormField>
        <FormLabel htmlFor="email" required>
          Email
        </FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          aria-invalid={!!errors.email}
        />
        {errors.email && <FormError message={errors.email.message} />}
      </FormField>

      {errors.root && <FormError message={errors.root.message} />}

      <Button type="submit" className="w-full" disabled={isResettingPassword}>
        {isResettingPassword ? 'Sending...' : 'Send Reset Link'}
      </Button>

      {onSwitchToSignIn && (
        <Button type="button" variant="ghost" className="w-full mt-2" onClick={onSwitchToSignIn}>
          Back to Sign In
        </Button>
      )}
    </Form>
  );
}
