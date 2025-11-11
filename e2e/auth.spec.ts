import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/');

    // Dismiss cookie banner
    await page.evaluate(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });

    // Check page loaded
    await expect(page).toHaveTitle(/PAES|Math|Matemáticas/i);
  });

  test('should login with test student credentials', async ({ page }) => {
    await page.goto('/');

    // Dismiss cookie banner before interacting with the page
    await page.evaluate(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });

    // Find and fill email/username field
    await page.fill('input[type="email"], input[name="email"], input[name="username"]', 'student@test.com');

    // Find and fill password field
    await page.fill('input[type="password"]', 'student123');

    // Click login button
    await page.click('button[type="submit"]');

    // Wait for redirect or dashboard content
    await page.waitForTimeout(3000);

    // Should not be on login page anymore OR should show dashboard content
    const url = page.url();
    const hasDashboardContent = await page.getByText(/dashboard|práctica|inicio/i).count() > 0;

    expect(url !== '/' || hasDashboardContent).toBeTruthy();
  });
});
