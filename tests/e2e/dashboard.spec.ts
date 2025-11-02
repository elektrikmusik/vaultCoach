import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard');

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });

  // Uncomment when authentication is set up for E2E tests
  // test('should display dashboard content when authenticated', async ({ page }) => {
  //   // Set up authentication (using cookies or localStorage)
  //   await page.goto('/dashboard');
  //
  //   await expect(page.getByText(/dashboard/i)).toBeVisible();
  //   await expect(page.getByText(/welcome/i)).toBeVisible();
  // });
});
