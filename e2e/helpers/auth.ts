import { Page } from '@playwright/test';

/**
 * Authenticates as a test student and navigates to the dashboard.
 * This helper sets up the authentication state so tests can start directly
 * at authenticated pages without having to login each time.
 */
export async function loginAsStudent(page: Page) {
  // Navigate to login page
  await page.goto('/');

  // Dismiss cookie banner before interacting with the page
  await page.evaluate(() => {
    localStorage.setItem('cookie-consent', 'accepted');
  });

  // Fill in credentials
  await page.fill('input[type="email"], input[name="email"], input[name="username"]', 'student@test.com');
  // SECURITY: Updated to use new password that meets security requirements
  await page.fill('input[type="password"]', 'StudentTest123!');

  // Submit login
  await page.click('button[type="submit"]');

  // Wait for navigation to complete
  await page.waitForTimeout(2000);

  // Verify we're authenticated (should be on dashboard or not on login page)
  const url = page.url();
  if (url === '/' || url.endsWith('/')) {
    // Check if we have dashboard content
    const hasDashboardContent = await page.getByText(/dashboard|práctica|inicio/i).count() > 0;
    if (!hasDashboardContent) {
      throw new Error('Login failed - still on login page');
    }
  }
}

/**
 * Navigates directly to the dashboard as an authenticated student.
 * This should be called after loginAsStudent() in a beforeAll or beforeEach hook.
 */
export async function goToDashboard(page: Page) {
  await page.goto('/dashboard');
  await page.waitForTimeout(1000);
}

/**
 * Convenience method that logs in and goes to dashboard.
 * Use this in beforeEach to start tests from the dashboard.
 */
export async function setupAuthenticatedSession(page: Page) {
  await loginAsStudent(page);
  await goToDashboard(page);
}
