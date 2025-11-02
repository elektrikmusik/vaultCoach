import { Link } from '@tanstack/react-router';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/lib/constants';

export function Home() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-bold">{t('pages.home.title')}</h1>
          <p className="text-xl text-muted-foreground">{t('pages.home.description')}</p>
          <div className="flex gap-4 justify-center">
            <Link to={ROUTES.LOGIN}>
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to={ROUTES.ABOUT}>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>React 19</CardTitle>
              <CardDescription>Latest React features</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Built with React 19 and TypeScript for type safety.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>TanStack Router</CardTitle>
              <CardDescription>Type-safe routing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Type-safe routing with automatic code splitting.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supabase Auth</CardTitle>
              <CardDescription>Secure authentication</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Integrated authentication with Supabase.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
