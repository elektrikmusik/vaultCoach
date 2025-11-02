# Contributing Guidelines

Thank you for contributing to the SaaS Boilerplate! This document provides guidelines for contributing.

## Code Style

### TypeScript

- Use TypeScript for all new code
- Enable strict mode checks
- Use type inference where appropriate
- Avoid `any` - use `unknown` if needed
- Export types/interfaces for reusable types

### React

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use TypeScript for component props

### Naming Conventions

- **Components**: PascalCase (e.g., `LoginForm.tsx`)
- **Hooks**: camelCase starting with "use" (e.g., `useAuth.ts`)
- **Services**: camelCase (e.g., `authService.ts`)
- **Stores**: camelCase (e.g., `authStore.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS`)
- **Files**: Match the exported name

### File Organization

- One component per file
- Co-locate related files when appropriate
- Group by feature, not by file type
- Use index files for cleaner imports

### Code Formatting

Code is automatically formatted with Prettier. Run before committing:

```bash
npm run format
```

## Git Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test additions/updates
- `chore`: Maintenance tasks

Examples:

```
feat(auth): add password reset functionality

fix(router): resolve navigation issue on dashboard

docs(readme): update installation instructions
```

## Pull Request Process

1. **Fork and Clone**

```bash
git clone <your-fork-url>
cd boilerplate
```

2. **Create Branch**

```bash
git checkout -b feature/your-feature-name
```

3. **Make Changes**

- Write clean, tested code
- Follow code style guidelines
- Update documentation if needed
- Add tests for new features

4. **Test Locally**

```bash
npm run test
npm run lint
npm run type-check
```

5. **Commit Changes**

```bash
git add .
git commit -m "feat(scope): your message"
```

6. **Push and Create PR**

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

## Pull Request Guidelines

- Provide clear description of changes
- Reference related issues
- Ensure all tests pass
- Update documentation as needed
- Request review from maintainers

## Code Review

- All PRs require review
- Address review feedback promptly
- Keep PRs focused and small when possible
- Respond to comments constructively

## Testing Requirements

### Unit Tests

- Write tests for utilities and helpers
- Test component rendering and behavior
- Aim for >80% coverage on new code

### Component Tests

- Test user interactions
- Test error states
- Test loading states
- Use React Testing Library best practices

### E2E Tests

- Add E2E tests for critical user flows
- Test authentication flows
- Test protected routes
- Keep tests maintainable

## Documentation

- Update README for user-facing changes
- Add JSDoc comments for complex functions
- Update architecture docs for structural changes
- Keep examples up to date

## Questions?

If you have questions, please:

1. Check existing documentation
2. Search existing issues
3. Create a new issue with your question

Thank you for contributing! 🎉
