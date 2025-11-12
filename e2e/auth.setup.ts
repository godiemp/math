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

  // Wait for navigation to complete - login should redirect us somewhere
  // Wait for network to be idle to ensure all auth cookies/tokens are set
  await page.waitForLoadState('networkidle', { timeout: 15000 });

  // Navigate to dashboard to ensure we end up on an authenticated page
  await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });

  // Wait a moment for any additional auth setup
  await page.waitForLoadState('domcontentloaded');

  // Save signed-in state - this captures all cookies, localStorage, sessionStorage
  await page.context().storageState({ path: authFile });
});
