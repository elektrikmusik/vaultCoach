import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { magicLinkSchema, type MagicLinkFormData } from '@/lib/formSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormLabel, FormError } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';

interface MagicLinkFormProps {
  onSwitchToSignIn?: () => void;
}

export function MagicLinkForm({ onSwitchToSignIn }: MagicLinkFormProps) {
  const { signInWithMagicLink, isSendingMagicLink } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<MagicLinkFormData>({
    resolver: zodResolver(magicLinkSchema),
  });

  const onSubmit = async (data: MagicLinkFormData) => {
    try {
      await signInWithMagicLink(data.email);
      setIsSuccess(true);
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : 'Failed to send magic link',
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Magic link sent! Please check your email and click the link to sign in.
          </p>
        </div>
        {onSwitchToSignIn && (
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
        )}
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter your email address and we'll send you a magic link to sign in without a password.
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

      <Button type="submit" className="w-full" disabled={isSendingMagicLink}>
        {isSendingMagicLink ? 'Sending...' : 'Send Magic Link'}
      </Button>

      {onSwitchToSignIn && (
        <Button type="button" variant="ghost" className="w-full mt-2" onClick={onSwitchToSignIn}>
          Back to Sign In
        </Button>
      )}
    </Form>
  );
}
