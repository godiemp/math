import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/signin');

    // Dismiss cookie banner
    await page.evaluate(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });

    // Check page loaded
    await expect(page).toHaveTitle(/PAES|Math|Matemáticas/i);
  });

  test('should login with test student credentials', async ({ page }) => {
    await page.goto('/signin');

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

    // Wait for automatic redirect to dashboard - short timeout to catch race conditions
    // The redirect should happen immediately after auth state updates, not require manual navigation
    await page.waitForURL(/\/dashboard/, { timeout: 3000 });

    // Verify all dashboard cards are rendered by checking for their key links/buttons

    // 1. Live Practice Featured Card - link to /live-practice
    await expect(page.locator('a[href="/live-practice"]')).toBeVisible();

    // 2. Operations Practice - link to /practice/operations
    await expect(page.locator('a[href="/practice/operations"]')).toBeVisible();

    // 3. M1 Practice Section - should have either link or button (based on paid status)
    const hasM1Element = await page.locator('a[href="/practice/m1"], button:has-text("Práctica"), button:has-text("Practice")').first().isVisible();
    expect(hasM1Element).toBeTruthy();

    // 4. Curriculum Card - should have M1 curriculum link or button
    const hasCurriculumElement = await page.locator('a[href="/curriculum/m1"], button:has-text("M1")').first().isVisible();
    expect(hasCurriculumElement).toBeTruthy();

    // 5. Progress Card - should have progress link or button
    const hasProgressElement = await page.locator('a[href="/progress"], button:has-text("Progreso"), button:has-text("Progress")').first().isVisible();
    expect(hasProgressElement).toBeTruthy();

    // Verify we're on the dashboard page
    expect(page.url()).toContain('/dashboard');
  });
});
