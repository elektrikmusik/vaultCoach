import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, type SignUpFormData } from '@/lib/formSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormLabel, FormError } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';

interface SignUpFormProps {
  onSwitchToSignIn?: () => void;
}

export function SignUpForm({ onSwitchToSignIn }: SignUpFormProps) {
  const navigate = useNavigate();
  const { signUp, isSigningUp, resendConfirmationEmail, isResendingConfirmation } = useAuth();
  const [needsEmailConfirmation, setNeedsEmailConfirmation] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signUp({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      // Check if email confirmation is required
      if (result.user && !result.session) {
        // Email confirmation required
        setNeedsEmailConfirmation(true);
        setUserEmail(data.email);
        setError('root', {
          message: 'Please check your email to confirm your account before signing in.',
          type: 'info',
        });
      } else {
        // Auto-signed in, redirect to dashboard
        navigate({ to: '/dashboard' });
      }
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : 'Failed to sign up',
      });
    }
  };

  const handleResendConfirmation = async () => {
    try {
      await resendConfirmationEmail(userEmail);
      setError('root', {
        message: 'Confirmation email sent! Please check your inbox.',
        type: 'info',
      });
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : 'Failed to resend confirmation email',
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <FormLabel htmlFor="name">Name (optional)</FormLabel>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          {...register('name')}
          aria-invalid={!!errors.name}
        />
        {errors.name && <FormError message={errors.name.message} />}
      </FormField>

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

      <FormField>
        <FormLabel htmlFor="password" required>
          Password
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
          Confirm Password
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

      {errors.root && (
        <div className="space-y-2">
          <FormError
            message={errors.root.message}
            className={errors.root.type === 'info' ? 'text-blue-600 dark:text-blue-400' : ''}
          />
          {needsEmailConfirmation && errors.root.type === 'info' && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleResendConfirmation}
              disabled={isResendingConfirmation}
            >
              {isResendingConfirmation ? 'Sending...' : 'Resend Confirmation Email'}
            </Button>
          )}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isSigningUp}>
        {isSigningUp ? 'Signing up...' : 'Sign up'}
      </Button>

      {onSwitchToSignIn && (
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </button>
        </p>
      )}
    </Form>
  );
}
