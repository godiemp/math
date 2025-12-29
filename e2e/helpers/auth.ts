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

  // Wait for navigation to complete using event-based wait
  await page.waitForURL(/\/(dashboard|$)/, { timeout: 10000 });

  // Verify we're authenticated (should be on dashboard or not on login page)
  const url = page.url();
  if (url === '/' || url.endsWith('/')) {
    // Check if we have dashboard content
    const dashboardContent = page.getByText(/dashboard|práctica|inicio/i);
    const hasDashboardContent = await dashboardContent.count() > 0;
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
  await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
}

/**
 * Convenience method that logs in and goes to dashboard.
 * Use this in beforeEach to start tests from the dashboard.
 */
export async function setupAuthenticatedSession(page: Page) {
  await loginAsStudent(page);
  await goToDashboard(page);
}

/**
 * Authenticates as a test teacher and navigates to the teacher dashboard.
 * Used for testing teacher-specific features like live lessons.
 */
export async function loginAsTeacher(page: Page) {
  await page.goto('/');

  // Dismiss cookie banner
  await page.evaluate(() => {
    localStorage.setItem('cookie-consent', 'accepted');
  });

  // Fill in teacher credentials
  await page.fill('input[type="email"], input[name="email"], input[name="username"]', 'teacher@test.com');
  await page.fill('input[type="password"]', 'TeacherTest123!');

  // Submit login
  await page.click('button[type="submit"]');

  // Wait for navigation to teacher dashboard or regular dashboard
  await page.waitForURL(/\/(teacher|dashboard|$)/, { timeout: 10000 });
}

/**
 * Authenticates as a sync student (assigned to test teacher).
 * Used for testing real-time lesson sync features.
 */
export async function loginAsSyncStudent(page: Page) {
  await page.goto('/');

  // Dismiss cookie banner
  await page.evaluate(() => {
    localStorage.setItem('cookie-consent', 'accepted');
  });

  // Fill in sync student credentials
  await page.fill('input[type="email"], input[name="email"], input[name="username"]', 'sync.student@test.com');
  await page.fill('input[type="password"]', 'SyncStudent123!');

  // Submit login
  await page.click('button[type="submit"]');

  // Wait for navigation to dashboard
  await page.waitForURL(/\/(dashboard|$)/, { timeout: 10000 });
}
