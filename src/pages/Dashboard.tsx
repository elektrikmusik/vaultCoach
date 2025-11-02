import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/stores/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SimpleChart } from '@/components/charts/SimpleChart';
import { AgentChat } from '@/components/ai/AgentChat';
import { GenAIChat } from '@/components/ai/GenAIChat';
import type { ChartDataPoint } from '@/lib/d3Helpers';

const sampleChartData: ChartDataPoint[] = [
  { label: 'Jan', value: 100, color: '#3b82f6' },
  { label: 'Feb', value: 150, color: '#10b981' },
  { label: 'Mar', value: 200, color: '#f59e0b' },
  { label: 'Apr', value: 180, color: '#ef4444' },
  { label: 'May', value: 250, color: '#8b5cf6' },
];

export function Dashboard() {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">{t('pages.dashboard.title')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('pages.dashboard.welcome')}, {user?.email}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sample Chart</CardTitle>
              <CardDescription>D3.js visualization example</CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleChart data={sampleChartData} width={500} height={300} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Info</CardTitle>
              <CardDescription>Current user information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium">Email:</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              {user?.name && (
                <div>
                  <p className="text-sm font-medium">Name:</p>
                  <p className="text-sm text-muted-foreground">{user.name}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Agno Agent</CardTitle>
              <CardDescription>Chat with Agno AI agent</CardDescription>
            </CardHeader>
            <CardContent>
              <AgentChat />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Google GenAI</CardTitle>
              <CardDescription>Chat with Google Generative AI</CardDescription>
            </CardHeader>
            <CardContent>
              <GenAIChat />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
