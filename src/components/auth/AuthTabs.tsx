import { useState } from 'react';
import { LoginForm } from '@/components/forms/LoginForm';
import { SignUpForm } from '@/components/forms/SignUpForm';
import { ForgotPasswordForm } from '@/components/forms/ForgotPasswordForm';
import { MagicLinkForm } from '@/components/forms/MagicLinkForm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import type { OAuthProvider } from '@/services/auth';

export type AuthMode = 'sign-in' | 'sign-up' | 'forgot-password' | 'magic-link';

interface AuthTabsProps {
  initialMode?: AuthMode;
}

export function AuthTabs({ initialMode = 'sign-in' }: AuthTabsProps) {
  // Map initialMode to tab value (only sign-in/sign-up are tabs)
  const getInitialTabValue = () => {
    if (initialMode === 'sign-in' || initialMode === 'forgot-password') {
      return 'sign-in';
    }
    return initialMode;
  };

  const [activeTab, setActiveTab] = useState<'sign-in' | 'sign-up'>(
    getInitialTabValue() as 'sign-in' | 'sign-up'
  );
  const [specialMode, setSpecialMode] = useState<AuthMode | null>(
    initialMode === 'forgot-password' || initialMode === 'magic-link' ? initialMode : null
  );
  const { signInWithOAuth } = useAuth();

  const handleOAuth = async (provider: OAuthProvider) => {
    try {
      await signInWithOAuth(provider);
      // Redirect is handled by Supabase
    } catch (error) {
      console.error('OAuth error:', error);
      // Error handling can be improved with toast notifications
    }
  };

  const handleSwitchToForgotPassword = () => {
    setSpecialMode('forgot-password');
  };

  const handleSwitchToMagicLink = () => {
    setSpecialMode('magic-link');
  };

  const handleSwitchBack = () => {
    setSpecialMode(null);
  };

  // If in special mode (forgot-password or magic-link), show that form
  if (specialMode === 'forgot-password') {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-semibold">Reset Password</h2>
          <Button variant="ghost" size="sm" onClick={handleSwitchBack}>
            ← Back to Sign In
          </Button>
        </div>
        <ForgotPasswordForm onSwitchToSignIn={handleSwitchBack} />
      </div>
    );
  }

  if (specialMode === 'magic-link') {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-semibold">Magic Link</h2>
          <Button variant="ghost" size="sm" onClick={handleSwitchBack}>
            ← Back to Sign In
          </Button>
        </div>
        <MagicLinkForm onSwitchToSignIn={handleSwitchBack} />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <Tabs value={activeTab} onValueChange={value => setActiveTab(value as 'sign-in' | 'sign-up')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Sign In</TabsTrigger>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="sign-in" className="space-y-6">
          <LoginForm
            onSwitchToSignUp={() => setActiveTab('sign-up')}
            onSwitchToForgotPassword={handleSwitchToForgotPassword}
          />

          {/* OAuth Providers */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuth('google')}
                className="w-full"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuth('github')}
                className="w-full"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 5.425 3.865 9.98 9.039 11.05.66.12.9-.287.9-.637 0-.315-.01-1.17-.015-2.297-3.837.835-4.646-1.85-4.646-1.85-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 6.59c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 5.177-1.059 9.039-5.621 9.039-11.044C22 6.484 17.519 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </Button>
            </div>

            <Button
              type="button"
              variant="ghost"
              className="w-full text-sm"
              onClick={handleSwitchToMagicLink}
            >
              Sign in with magic link
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="sign-up" className="space-y-6">
          <SignUpForm onSwitchToSignIn={() => setActiveTab('sign-in')} />

          {/* OAuth Providers */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuth('google')}
                className="w-full"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuth('github')}
                className="w-full"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 5.425 3.865 9.98 9.039 11.05.66.12.9-.287.9-.637 0-.315-.01-1.17-.015-2.297-3.837.835-4.646-1.85-4.646-1.85-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 6.59c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 5.177-1.059 9.039-5.621 9.039-11.044C22 6.484 17.519 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </Button>
            </div>

            <Button
              type="button"
              variant="ghost"
              className="w-full text-sm"
              onClick={handleSwitchToMagicLink}
            >
              Sign in with magic link
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
