import { createRootRoute, Outlet, useRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useEffect } from 'react';
import { supabase } from '@/services/supabase';
import { useAuthStore } from '@/stores/authStore';

function RootComponent() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  useEffect(() => {
    // Handle OAuth and magic link callbacks
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // User signed in via OAuth or magic link
        const user = {
          id: session.user.id,
          email: session.user.email ?? '',
          name: session.user.user_metadata?.name,
          avatar_url: session.user.user_metadata?.avatar_url,
          created_at: session.user.created_at,
          updated_at: session.user.updated_at ?? session.user.created_at,
        };
        setUser(user);
        router.navigate({ to: '/dashboard' });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (event === 'USER_UPDATED') {
        // Password reset completed
        if (session?.user) {
          const user = {
            id: session.user.id,
            email: session.user.email ?? '',
            name: session.user.user_metadata?.name,
            avatar_url: session.user.user_metadata?.avatar_url,
            created_at: session.user.created_at,
            updated_at: session.user.updated_at ?? session.user.created_at,
          };
          setUser(user);
        }
      } else if (event === 'TOKEN_REFRESHED') {
        // Session refreshed
        if (session?.user) {
          const user = {
            id: session.user.id,
            email: session.user.email ?? '',
            name: session.user.user_metadata?.name,
            avatar_url: session.user.user_metadata?.avatar_url,
            created_at: session.user.created_at,
            updated_at: session.user.updated_at ?? session.user.created_at,
          };
          setUser(user);
        }
      }
    });

    // Check for hash fragments (OAuth/magic link callbacks)
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const error = hashParams.get('error');
    const errorDescription = hashParams.get('error_description');

    if (error) {
      console.error('Auth error:', error, errorDescription);
      // Clean up URL and redirect to login
      window.history.replaceState({}, '', '/login');
      router.navigate({
        to: '/login',
        search: { mode: 'sign-in' },
      });
    } else if (accessToken) {
      // Clean up URL hash after handling - Supabase will handle the session
      window.history.replaceState({}, '', window.location.pathname);
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [router, setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </QueryClientProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
