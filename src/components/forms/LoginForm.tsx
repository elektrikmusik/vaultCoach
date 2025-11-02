import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/lib/formSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormLabel, FormError } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';

interface LoginFormProps {
  onSwitchToSignUp?: () => void;
  onSwitchToForgotPassword?: () => void;
}

export function LoginForm({ onSwitchToSignUp, onSwitchToForgotPassword }: LoginFormProps) {
  const navigate = useNavigate();
  const { signIn, isSigningIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn({
        email: data.email,
        password: data.password,
      });
      navigate({ to: '/dashboard' });
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : 'Failed to sign in',
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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

      {onSwitchToForgotPassword && (
        <div className="text-right">
          <button
            type="button"
            onClick={onSwitchToForgotPassword}
            className="text-sm text-primary hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      )}

      {errors.root && <FormError message={errors.root.message} />}

      <Button type="submit" className="w-full" disabled={isSigningIn}>
        {isSigningIn ? 'Signing in...' : 'Sign in'}
      </Button>

      {onSwitchToSignUp && (
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      )}
    </Form>
  );
}
