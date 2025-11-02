import { test, expect } from '@playwright/test';

test.describe('Theme Switcher', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should display theme switcher button', async ({ page }) => {
    await page.goto('/');

    const themeButton = page.getByRole('button', { name: /toggle theme/i });
    await expect(themeButton).toBeVisible();
  });

  test('should open theme dropdown menu when clicked', async ({ page }) => {
    await page.goto('/');

    const themeButton = page.getByRole('button', { name: /toggle theme/i });
    await themeButton.click();

    await expect(page.getByText('Light')).toBeVisible();
    await expect(page.getByText('Dark')).toBeVisible();
    await expect(page.getByText('System')).toBeVisible();
  });

  test('should switch to dark theme', async ({ page }) => {
    await page.goto('/');

    const themeButton = page.getByRole('button', { name: /toggle theme/i });
    await themeButton.click();

    const darkOption = page.getByText('Dark');
    await darkOption.click();

    // Wait for dropdown to close
    await expect(page.getByText('Dark')).not.toBeVisible();

    // Check that dark class is applied to document
    const hasDarkClass = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );
    expect(hasDarkClass).toBe(true);

    // Check that theme is persisted in localStorage
    const storedTheme = await page.evaluate(() => {
      const stored = localStorage.getItem('ui-store');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed?.state?.theme;
      }
      return null;
    });
    expect(storedTheme).toBe('dark');
  });

  test('should switch to light theme', async ({ page }) => {
    await page.goto('/');

    // First set to dark, then switch to light
    const themeButton = page.getByRole('button', { name: /toggle theme/i });
    await themeButton.click();
    await page.getByText('Dark').click();

    await themeButton.click();
    await page.getByText('Light').click();

    // Check that dark class is removed
    const hasDarkClass = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );
    expect(hasDarkClass).toBe(false);

    // Check that theme is persisted
    const storedTheme = await page.evaluate(() => {
      const stored = localStorage.getItem('ui-store');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed?.state?.theme;
      }
      return null;
    });
    expect(storedTheme).toBe('light');
  });

  test('should persist theme across page reloads', async ({ page }) => {
    await page.goto('/');

    // Set theme to dark
    const themeButton = page.getByRole('button', { name: /toggle theme/i });
    await themeButton.click();
    await page.getByText('Dark').click();

    // Verify dark class is applied
    let hasDarkClass = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );
    expect(hasDarkClass).toBe(true);

    // Reload page
    await page.reload();

    // Verify dark class is still applied after reload
    hasDarkClass = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(hasDarkClass).toBe(true);

    // Verify theme is still stored
    const storedTheme = await page.evaluate(() => {
      const stored = localStorage.getItem('ui-store');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed?.state?.theme;
      }
      return null;
    });
    expect(storedTheme).toBe('dark');
  });

  test('should use system theme when system option is selected', async ({ page }) => {
    await page.goto('/');

    // Mock system preference as dark
    await page.emulateMedia({ colorScheme: 'dark' });

    const themeButton = page.getByRole('button', { name: /toggle theme/i });
    await themeButton.click();
    await page.getByText('System').click();

    // Should apply dark class when system prefers dark
    const hasDarkClass = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );
    expect(hasDarkClass).toBe(true);

    // Change system preference to light
    await page.emulateMedia({ colorScheme: 'light' });

    // Wait a bit for the listener to fire
    await page.waitForTimeout(100);

    // Should remove dark class when system prefers light
    const hasDarkClassAfter = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );
    expect(hasDarkClassAfter).toBe(false);
  });

  test('should show checkmark for currently selected theme', async ({ page }) => {
    await page.goto('/');

    // Set to dark theme first
    const themeButton = page.getByRole('button', { name: /toggle theme/i });
    await themeButton.click();
    await page.getByText('Dark').click();

    // Open menu again
    await themeButton.click();

    // Dark option should have checkmark
    const darkOption = page.getByText('Dark');
    const darkOptionText = await darkOption.textContent();
    expect(darkOptionText).toContain('Dark');

    // Check for checkmark (✓)
    const darkOptionParent = darkOption.locator('..');
    const checkmark = darkOptionParent.locator('text=✓');
    await expect(checkmark).toBeVisible();
  });

  test('should apply theme immediately on page load', async ({ page }) => {
    // Set theme to dark in localStorage before navigating
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem(
        'ui-store',
        JSON.stringify({ state: { theme: 'dark', sidebarOpen: true } })
      );
    });

    // Navigate to a new page (or reload)
    await page.goto('/');

    // Check that dark class is applied immediately (before React renders)
    // This tests the initialization in main.tsx
    const hasDarkClass = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );
    expect(hasDarkClass).toBe(true);
  });
});
