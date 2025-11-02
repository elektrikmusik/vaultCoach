import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About</h1>
        <p className="text-lg text-muted-foreground mb-4">
          This is a production-ready SaaS boilerplate built with modern technologies.
        </p>
        <p className="text-lg text-muted-foreground">
          It includes React 19, TypeScript, TanStack Router, TanStack Query, Zustand, shadcn/ui, and
          many other industry-standard tools.
        </p>
      </div>
    </div>
  );
}
