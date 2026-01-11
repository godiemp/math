import { test, expect } from '@playwright/test';

/**
 * E2E tests for teacher login redirect functionality
 *
 * Tests that teacher users are redirected to /teacher after login
 * instead of the default /dashboard.
 *
 * Test user: teacher@test.com (created in e2e/helpers/db-setup.ts)
 *
 * Runs in chromium-unauthenticated project (no storageState).
 */

test.describe('Teacher Login Redirect', () => {
  test('should redirect teacher to /teacher after login', async ({ page }) => {
    await page.goto('/signin');

    // Dismiss cookie banner
    await page.evaluate(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });

    // Fill login form with teacher credentials
    await page.fill('input[type="email"], input[name="email"], input[name="username"]', 'teacher@test.com');
    await page.fill('input[type="password"]', 'TeacherTest123!');

    // Click login button
    await page.click('button[type="submit"]');

    // Verify redirect to /teacher (not /dashboard)
    await page.waitForURL(/\/teacher/, { timeout: 15000 });
    expect(page.url()).toContain('/teacher');

    // Verify we're on the teacher dashboard
    await expect(page.getByText('Bienvenido, Profesor')).toBeVisible({ timeout: 10000 });
  });
});
