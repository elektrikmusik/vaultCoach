import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { ROUTES } from '@/lib/constants';

export function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login', search: { mode: 'sign-in' } });
  };

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="text-xl font-bold">
          {t('common.appName')}
        </Link>

        <nav className="flex items-center gap-4">
          <Link to={ROUTES.HOME} className="text-sm hover:underline">
            {t('nav.home')}
          </Link>
          <Link to={ROUTES.ABOUT} className="text-sm hover:underline">
            {t('nav.about')}
          </Link>

          {isAuthenticated ? (
            <>
              <Link to={ROUTES.DASHBOARD} className="text-sm hover:underline">
                {t('nav.dashboard')}
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                {t('auth.signOut')}
              </Button>
            </>
          ) : (
            <Link to={ROUTES.LOGIN} search={{ mode: 'sign-in' }}>
              <Button variant="default" size="sm">
                {t('auth.signIn')}
              </Button>
            </Link>
          )}

          <LanguageSwitcher />
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
}
