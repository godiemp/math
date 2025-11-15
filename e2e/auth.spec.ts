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

    // Find and fill password field - SECURITY: Updated to match new password requirements
    await page.fill('input[type="password"]', 'StudentTest123!');

    // Click login button
    await page.click('button[type="submit"]');

    // Wait for navigation to complete
    await page.waitForURL(/\/dashboard/, { timeout: 5000 });

    // Verify all dashboard cards are rendered

    // 1. Live Practice Featured Card (gradient card with 📝)
    await expect(page.getByText('📝')).toBeVisible();

    // 2. Practice Section Card - Check for Operations, M1, and M2
    await expect(page.getByText('🎯')).toBeVisible(); // Operations
    await expect(page.getByText('📐')).toBeVisible(); // M1

    // 3. Temario/Curriculum Card
    await expect(page.getByText('📚')).toBeVisible();

    // 4. Progress Tracking Card
    await expect(page.getByText('📊')).toBeVisible();

    // 5. Improvement Notice
    await expect(page.getByText('🚀')).toBeVisible();

    // Verify we're on the dashboard page
    expect(page.url()).toContain('/dashboard');
  });
});
