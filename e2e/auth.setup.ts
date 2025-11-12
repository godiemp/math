import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/student.json');

/**
 * Global authentication setup for student user.
 * This runs once before all tests and saves the authentication state.
 * All tests will automatically use this saved state, avoiding repeated logins.
 */
setup('authenticate as student', async ({ page }) => {
  // Navigate to login page
  await page.goto('/');

  // Dismiss cookie banner
  await page.evaluate(() => {
    localStorage.setItem('cookie-consent', 'accepted');
  });

  // Fill in credentials
  await page.fill('input[type="email"], input[name="email"], input[name="username"]', 'student@test.com');
  await page.fill('input[type="password"]', 'StudentTest123!');

  // Submit login
  await page.click('button[type="submit"]');

  // Wait for navigation to complete using event-based wait
  await page.waitForURL(/\/(dashboard|$)/, { timeout: 10000 });

  // Verify we're authenticated
  const url = page.url();
  if (url === '/' || url.endsWith('/')) {
    // Check for dashboard content
    const dashboardContent = page.getByText(/dashboard|práctica|inicio/i);
    await expect(dashboardContent.first()).toBeVisible({ timeout: 5000 });
  }

  // Save signed-in state
  await page.context().storageState({ path: authFile });
});
