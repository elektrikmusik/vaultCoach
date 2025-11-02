import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should display login form', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait for validation errors
    await expect(page.getByText(/invalid email/i)).toBeVisible();
    await expect(page.getByText(/password must be at least/i)).toBeVisible();
  });

  test('should navigate to dashboard after successful login', async ({ page }) => {
    // Note: This test requires a test user to be set up
    // In a real scenario, you'd use test fixtures or seed data
    await page.goto('/login');

    // Fill in the form (adjust with actual test credentials)
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('password123');

    // Uncomment when you have test authentication set up
    // await page.getByRole('button', { name: /sign in/i }).click();
    // await expect(page).toHaveURL(/\/dashboard/);
  });
});
