import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as authService from '@/services/auth';
import { useAuthStore } from '@/stores/authStore';
import type { SignInCredentials, SignUpCredentials, OAuthProvider } from '@/services/auth';

/**
 * Hook for authentication with TanStack Query
 */

const AUTH_QUERY_KEY = ['auth', 'user'] as const;

export function useAuth() {
  const queryClient = useQueryClient();
  const { setUser, user, isAuthenticated } = useAuthStore();

  // Query current user
  const { data, isLoading, refetch } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      const user = await authService.getCurrentUser();
      setUser(user);
      return user;
    },
    retry: false,
    staleTime: Infinity,
  });

  // Sign in mutation
  const signInMutation = useMutation({
    mutationFn: (credentials: SignInCredentials) => authService.signIn(credentials),
    onSuccess: async () => {
      await refetch();
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });

  // Sign up mutation
  const signUpMutation = useMutation({
    mutationFn: (credentials: SignUpCredentials) => authService.signUp(credentials),
    onSuccess: async () => {
      await refetch();
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });

  // Sign out mutation
  const signOutMutation = useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      setUser(null);
      queryClient.clear();
    },
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: (email: string) => authService.resetPassword(email),
  });

  // Update password mutation
  const updatePasswordMutation = useMutation({
    mutationFn: (newPassword: string) => authService.updatePassword(newPassword),
    onSuccess: async () => {
      await refetch();
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });

  // Resend confirmation email mutation
  const resendConfirmationEmailMutation = useMutation({
    mutationFn: (email: string) => authService.resendConfirmationEmail(email),
  });

  // Magic link mutation
  const magicLinkMutation = useMutation({
    mutationFn: (email: string) => authService.signInWithMagicLink(email),
  });

  // OAuth mutation
  const oAuthMutation = useMutation({
    mutationFn: (provider: OAuthProvider) => authService.signInWithOAuth(provider),
  });

  return {
    user: data || user,
    isAuthenticated,
    isLoading: isLoading || useAuthStore.getState().isLoading,
    signIn: signInMutation.mutateAsync,
    signUp: signUpMutation.mutateAsync,
    signOut: signOutMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,
    updatePassword: updatePasswordMutation.mutateAsync,
    resendConfirmationEmail: resendConfirmationEmailMutation.mutateAsync,
    signInWithMagicLink: magicLinkMutation.mutateAsync,
    signInWithOAuth: oAuthMutation.mutateAsync,
    isSigningIn: signInMutation.isPending,
    isSigningUp: signUpMutation.isPending,
    isSigningOut: signOutMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
    isUpdatingPassword: updatePasswordMutation.isPending,
    isResendingConfirmation: resendConfirmationEmailMutation.isPending,
    isSendingMagicLink: magicLinkMutation.isPending,
    isSigningInWithOAuth: oAuthMutation.isPending,
  };
}
