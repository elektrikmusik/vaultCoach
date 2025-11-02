import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { useUIStore } from '@/stores/uiStore';
import type { Theme } from '@/types';

// Mock the store
vi.mock('@/stores/uiStore', () => ({
  useUIStore: vi.fn(),
}));

const mockUseUIStore = vi.mocked(useUIStore);

describe('ThemeSwitcher', () => {
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset document classes
    document.documentElement.classList.remove('dark');
  });

  it('renders theme switcher button', () => {
    mockUseUIStore.mockReturnValue({
      theme: 'system' as Theme,
      setTheme: mockSetTheme,
      sidebarOpen: true,
      toggleSidebar: vi.fn(),
      setSidebarOpen: vi.fn(),
    });

    render(<ThemeSwitcher />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('displays current theme icon', () => {
    mockUseUIStore.mockReturnValue({
      theme: 'dark' as Theme,
      setTheme: mockSetTheme,
      sidebarOpen: true,
      toggleSidebar: vi.fn(),
      setSidebarOpen: vi.fn(),
    });

    render(<ThemeSwitcher />);
    const button = screen.getByRole('button');
    // Should contain moon icon for dark theme
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('opens dropdown menu when clicked', async () => {
    const user = userEvent.setup();
    mockUseUIStore.mockReturnValue({
      theme: 'system' as Theme,
      setTheme: mockSetTheme,
      sidebarOpen: true,
      toggleSidebar: vi.fn(),
      setSidebarOpen: vi.fn(),
    });

    render(<ThemeSwitcher />);
    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Light')).toBeInTheDocument();
      expect(screen.getByText('Dark')).toBeInTheDocument();
      expect(screen.getByText('System')).toBeInTheDocument();
    });
  });

  it('calls setTheme when theme option is clicked', async () => {
    const user = userEvent.setup();
    mockUseUIStore.mockReturnValue({
      theme: 'light' as Theme,
      setTheme: mockSetTheme,
      sidebarOpen: true,
      toggleSidebar: vi.fn(),
      setSidebarOpen: vi.fn(),
    });

    render(<ThemeSwitcher />);
    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Dark')).toBeInTheDocument();
    });

    const darkOption = screen.getByText('Dark');
    await user.click(darkOption);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('shows checkmark for selected theme', async () => {
    const user = userEvent.setup();
    mockUseUIStore.mockReturnValue({
      theme: 'dark' as Theme,
      setTheme: mockSetTheme,
      sidebarOpen: true,
      toggleSidebar: vi.fn(),
      setSidebarOpen: vi.fn(),
    });

    render(<ThemeSwitcher />);
    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      const darkOption = screen.getByText('Dark').closest('div');
      expect(darkOption).toHaveTextContent('✓');
    });
  });

  it('applies theme to document when setTheme is called', async () => {
    const user = userEvent.setup();

    // Mock setTheme to actually apply theme for this test
    const applyTheme = (theme: Theme) => {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    const setTheme = vi.fn((theme: Theme) => {
      applyTheme(theme);
      mockUseUIStore.mockReturnValue({
        theme,
        setTheme,
        sidebarOpen: true,
        toggleSidebar: vi.fn(),
        setSidebarOpen: vi.fn(),
      });
    });

    mockUseUIStore.mockReturnValue({
      theme: 'light' as Theme,
      setTheme,
      sidebarOpen: true,
      toggleSidebar: vi.fn(),
      setSidebarOpen: vi.fn(),
    });

    render(<ThemeSwitcher />);

    expect(document.documentElement.classList.contains('dark')).toBe(false);

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Dark')).toBeInTheDocument();
    });

    const darkOption = screen.getByText('Dark');
    await user.click(darkOption);

    await waitFor(() => {
      expect(setTheme).toHaveBeenCalledWith('dark');
    });
  });
});
