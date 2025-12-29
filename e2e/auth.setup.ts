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
  await page.goto('/signin');

  // Dismiss cookie banner
  await page.evaluate(() => {
    localStorage.setItem('cookie-consent', 'accepted');
  });

  // Fill in credentials
  await page.fill('input[name="username"]', 'student@test.com');
  await page.fill('input[type="password"]', 'StudentTest123!');

  // Submit login
  await page.click('button[type="submit"]');

  // Wait for automatic redirect to dashboard - this tests the actual login flow
  // Don't manually navigate to /dashboard as that masks redirect bugs
  await page.waitForURL(/\/dashboard/, { timeout: 5000 });

  // Wait for network to settle to ensure auth state is fully saved
  await page.waitForLoadState('networkidle', { timeout: 10000 });

  // Save signed-in state - this captures all cookies, localStorage, sessionStorage
  await page.context().storageState({ path: authFile });
});
