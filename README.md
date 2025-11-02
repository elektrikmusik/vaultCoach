# SaaS Boilerplate

A production-ready SaaS boilerplate template built with modern technologies and best practices. This template provides a comprehensive starting point for building SaaS applications with all core infrastructure, tooling, and patterns already in place.

## 🚀 Tech Stack

- **⚡ Vite** - Fast development and building
- **⚛️ React 19** with TypeScript
- **🧭 TanStack Router** - Type-safe routing
- **🔄 TanStack Query** - Server state management
- **🏪 Zustand** - Client state management
- **🎨 shadcn/ui** - Beautiful components with Tailwind CSS
- **📝 React Hook Form** with Zod validation
- **🧪 Vitest** and React Testing Library for testing
- **🎭 Playwright** for E2E testing
- **📚 Storybook** for component development
- **🌍 i18next** for internationalization
- **📊 D3** for data visualization
- **🐕 Husky** and Commitlint for Git workflow
- **🐳 Docker** support for deployment
- **🤖 Agno** multi-agent AI framework integration
- **🔮 Google Generative AI** integration
- **🗄️ Supabase** PostgreSQL database with authentication

## 📁 Project Structure

```
boilerplate/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── layout/         # Layout components
│   │   ├── forms/          # Form components
│   │   ├── ai/             # AI integration components
│   │   ├── charts/         # D3 chart components
│   │   ├── auth/            # Auth components
│   │   └── i18n/            # i18n components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services, Agno, GenAI clients
│   ├── stores/             # Zustand stores
│   ├── routes/             # TanStack Router routes
│   ├── lib/                # Utilities, helpers
│   ├── types/              # TypeScript type definitions
│   ├── i18n/               # i18next translations
│   ├── styles/             # Global styles
│   ├── pages/              # Page components
│   └── tests/              # Test utilities
├── .storybook/             # Storybook configuration
├── .husky/                 # Git hooks
├── docker/                 # Docker configuration
├── tests/                  # E2E tests
└── docs/                   # Documentation
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- A Supabase account (for authentication)
- (Optional) Google GenAI API key
- (Optional) Agno AgentOS setup

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd boilerplate
```

2. **Install dependencies**

```bash
npm install
```

If you encounter peer dependency conflicts (common with ESLint), use:

```bash
npm install --legacy-peer-deps
```

3. **Set up environment variables**

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

Optional variables:

- `VITE_GOOGLE_GENAI_API_KEY` - Google Generative AI API key
- `VITE_AGNO_AGENTOS_URL` - Agno AgentOS endpoint (default: http://localhost:8000)

4. **Run the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate test coverage
- `npm run test:e2e` - Run E2E tests with Playwright
- `npm run storybook` - Start Storybook
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## 🧪 Testing

### Unit Tests

Run unit tests with Vitest:

```bash
npm run test
```

### E2E Tests

Run end-to-end tests with Playwright:

```bash
npm run test:e2e
```

For interactive mode:

```bash
npm run test:e2e:ui
```

## 📚 Storybook

Start Storybook to view and develop components in isolation:

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`.

## 🐳 Docker

### Development

Build and run with Docker Compose:

```bash
docker-compose -f docker-compose.yml up --build
```

### Production

Build production image:

```bash
docker build -f docker/Dockerfile.prod -t saas-boilerplate:latest .
```

Run production container:

```bash
docker run -p 3000:80 saas-boilerplate:latest
```

## 🌐 Internationalization

The boilerplate includes i18next for internationalization. Translations are located in `src/i18n/locales/`.

To add a new language:

1. Create a new JSON file in `src/i18n/locales/`
2. Add translations following the existing structure
3. Import and add to `src/i18n/config.ts`

## 🔐 Authentication

Authentication is handled through Supabase Auth. The boilerplate includes:

- Sign in/Sign up forms with validation
- Protected routes using TanStack Router
- Session management with Zustand
- Auth hooks with TanStack Query

**📖 Setup Guide**: For detailed Supabase authentication setup instructions, see [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)

## 🤖 AI Integration

### Agno Integration

The boilerplate includes Agno AgentOS client integration. To use:

1. Set up your Agno AgentOS backend
2. Configure `VITE_AGNO_AGENTOS_URL` in `.env`
3. Use the `useAgnoAgent` hook in your components

### Google GenAI Integration

Google Generative AI is integrated for text generation and chat:

1. Get a Google GenAI API key
2. Add `VITE_GOOGLE_GENAI_API_KEY` to `.env`
3. Use the `useGenAI` hook in your components

## 📊 Data Visualization

D3.js is included for data visualization. Example components are available in `src/components/charts/`.

## 📝 Code Style

The project uses:

- **ESLint** for linting
- **Prettier** for code formatting
- **Husky** for Git hooks
- **Commitlint** for commit message validation

Code is automatically formatted and linted on commit.

## 🚀 Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

## 📖 Documentation

- [Architecture](docs/ARCHITECTURE.md) - Architecture decisions and folder structure
- [Contributing](docs/CONTRIBUTING.md) - Coding conventions and PR guidelines
- [Deployment](docs/DEPLOYMENT.md) - Deployment instructions

## 🤝 Contributing

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for contribution guidelines.

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

This boilerplate is built with:

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TanStack](https://tanstack.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/)
- [Agno](https://docs.agno.com/)
- And many other amazing open-source projects
