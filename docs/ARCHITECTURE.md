# Architecture Documentation

This document describes the architecture decisions, folder structure, and design patterns used in the SaaS boilerplate.

## Architecture Overview

The boilerplate follows a feature-based architecture with clear separation of concerns:

- **Presentation Layer**: React components, pages, and UI
- **State Management**: Zustand for client state, TanStack Query for server state
- **Routing**: TanStack Router for type-safe routing
- **Data Layer**: Services for API calls and external integrations
- **Infrastructure**: Configuration, utilities, and tooling

## Folder Structure

### `/src/components`

Components are organized by purpose:

- `ui/` - Reusable UI components (shadcn/ui based)
- `layout/` - Layout components (Header, Footer, Sidebar)
- `forms/` - Form components with validation
- `auth/` - Authentication-related components
- `ai/` - AI integration components (Agno, GenAI)
- `charts/` - Data visualization components (D3)
- `i18n/` - Internationalization components

### `/src/routes`

TanStack Router file-based routing:

- Routes are defined as React components
- Route protection handled via `beforeLoad` hooks
- Type-safe navigation throughout the app

### `/src/services`

Service layer for external integrations:

- `supabase.ts` - Supabase client
- `auth.ts` - Authentication service
- `api.ts` - Generic API service
- `agno.ts` - Agno AgentOS client
- `genai.ts` - Google Generative AI client

### `/src/stores`

Zustand stores for client state:

- `authStore.ts` - Authentication state
- `uiStore.ts` - UI state (theme, sidebar, etc.)

### `/src/hooks`

Custom React hooks:

- `useAuth.ts` - Authentication hook with TanStack Query
- `useAgnoAgent.ts` - Agno agent interaction hook
- `useGenAI.ts` - Google GenAI interaction hook
- `useUsers.ts` - Example data fetching hook
- `useTranslation.ts` - i18next translation hook

## Design Patterns

### Component Pattern

Components follow atomic design principles:

- **Atoms**: Basic UI elements (Button, Input)
- **Molecules**: Simple combinations (FormField, Card)
- **Organisms**: Complex components (LoginForm, Dashboard)
- **Pages**: Full page components

### State Management Pattern

- **Client State**: Zustand stores for UI state and local data
- **Server State**: TanStack Query for API data
- **Form State**: React Hook Form for form management

### Routing Pattern

- File-based routing with TanStack Router
- Protected routes using `beforeLoad` hooks
- Type-safe navigation with TypeScript

### Error Handling

Custom error classes and consistent error handling:

- `ApiError` - API errors
- `AuthenticationError` - Auth errors
- `ValidationError` - Form validation errors

## Type Safety

Full TypeScript coverage with:

- Strict mode enabled
- Path aliases for clean imports
- Typed routes with TanStack Router
- Typed API responses
- Generic service functions

## Authentication Flow

1. User submits credentials via form
2. Form validated with Zod schema
3. Auth service called (Supabase)
4. Session stored in Zustand store
5. Protected routes check auth state
6. TanStack Query manages auth state

## Data Fetching Pattern

1. Define query hooks using `useQuery`
2. Services handle API calls
3. TanStack Query manages caching and refetching
4. Error handling via query error states

## Internationalization Pattern

1. Translations in JSON files
2. i18next configured with language detection
3. `useTranslation` hook for typed translations
4. Language switcher component

## Testing Strategy

- **Unit Tests**: Vitest for component and utility testing
- **Component Tests**: React Testing Library for component behavior
- **E2E Tests**: Playwright for end-to-end scenarios
- **Visual Tests**: Storybook for component documentation

## Build & Deployment

- **Development**: Vite dev server with HMR
- **Production**: Vite build with code splitting
- **Docker**: Multi-stage builds for optimized images
- **Nginx**: Production server with SPA routing

## Performance Optimizations

- Code splitting with Vite
- Lazy loading for routes
- TanStack Query caching
- D3 chart memoization
- Image optimization

## Security Considerations

- Environment variables for secrets
- Supabase RLS (Row Level Security) for database
- CSRF protection via Supabase
- Secure session management
- HTTPS in production
