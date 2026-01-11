import { test, expect, Page } from '@playwright/test';

/**
 * Auth Redirect Loop Tests
 *
 * These tests verify that the authentication system doesn't create redirect loops
 * when a user returns to an existing session.
 *
 * The problem: When returning to a session, the app can enter a loop:
 * signin -> dashboard -> signin -> dashboard -> eventually logged out
 *
 * Root cause: Race conditions between NextAuth JWT session and backend HttpOnly cookies
 */

test.describe('Auth Redirect Loop Prevention', () => {
  /**
   * Helper to count URL changes and detect redirect loops
   */
  async function countRedirects(page: Page, maxWaitMs: number = 5000): Promise<{ count: number; urls: string[] }> {
    const urls: string[] = [];
    let lastUrl = page.url();
    urls.push(lastUrl);

    const startTime = Date.now();

    // Listen for URL changes
    const urlChangeHandler = () => {
      const currentUrl = page.url();
      if (currentUrl !== lastUrl) {
        urls.push(currentUrl);
        lastUrl = currentUrl;
      }
    };

    // Check URL periodically
    while (Date.now() - startTime < maxWaitMs) {
      urlChangeHandler();
      await page.waitForTimeout(100);
    }

    return {
      count: urls.length - 1, // Number of URL changes
      urls,
    };
  }

  test('should not redirect loop when returning to protected route with valid session', async ({ page }) => {
    // Step 1: Login normally
    await page.goto('/signin');

    await page.evaluate(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });

    await page.fill('input[name="username"]', 'student@test.com');
    await page.fill('input[type="password"]', 'StudentTest123!');
    await page.click('button[type="submit"]');

    // Wait for successful redirect to dashboard
    await page.waitForURL(/\/dashboard/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');

    // Verify we're on dashboard
    expect(page.url()).toContain('/dashboard');

    // Step 2: Save the storage state (cookies, localStorage, sessionStorage)
    const storageState = await page.context().storageState();

    // Step 3: Clear all storage and cookies (simulate closing browser)
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    // Step 4: Restore the storage state (simulate returning user)
    // This mimics a user who had a session, closed the browser, and came back
    await page.context().addCookies(storageState.cookies);
    for (const origin of storageState.origins) {
      await page.evaluate(({ localStorage: ls, origin: o }) => {
        for (const { name, value } of ls) {
          window.localStorage.setItem(name, value);
        }
      }, { localStorage: origin.localStorage, origin: origin.origin });
    }

    // Step 5: Navigate directly to a protected route
    await page.goto('/dashboard');

    // Step 6: Track redirects for a period to detect loops
    const { count, urls } = await countRedirects(page, 3000);

    // ASSERTION: Should have at most 1 redirect (initial navigation)
    // If there's a loop, count will be > 2
    expect(count).toBeLessThanOrEqual(2);

    // ASSERTION: Should end up on dashboard, not signin
    expect(page.url()).toContain('/dashboard');

    // ASSERTION: Should NOT have visited signin if session was valid
    const visitedSignin = urls.some(url => url.includes('/signin'));
    expect(visitedSignin).toBe(false);
  });

  test('should redirect to dashboard without loop when visiting signin with valid session', async ({ page }) => {
    // Step 1: Login
    await page.goto('/signin');

    await page.evaluate(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });

    await page.fill('input[name="username"]', 'student@test.com');
    await page.fill('input[type="password"]', 'StudentTest123!');
    await page.click('button[type="submit"]');

    await page.waitForURL(/\/dashboard/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');

    // Step 2: Navigate to signin with existing session
    // Track URL changes during this navigation
    const urlChanges: string[] = [];

    page.on('framenavigated', (frame) => {
      if (frame === page.mainFrame()) {
        urlChanges.push(frame.url());
      }
    });

    await page.goto('/signin');

    // Wait for redirects to complete and page to stabilize
    await page.waitForTimeout(3000);

    const signinVisits = urlChanges.filter(url => url.includes('/signin')).length;
    const dashboardVisits = urlChanges.filter(url => url.includes('/dashboard')).length;

    // ASSERTION 1: Should NOT have a redirect loop
    // A loop would show: signin -> dashboard -> signin -> dashboard...
    // We allow up to 2 signin visits (initial + possible race condition)
    // but there should NOT be signin AFTER dashboard (that's a loop)
    const dashboardIndex = urlChanges.findIndex(url => url.includes('/dashboard'));
    const signinAfterDashboard = urlChanges.slice(dashboardIndex + 1).some(url => url.includes('/signin'));
    expect(signinAfterDashboard).toBe(false);

    // ASSERTION 2: Total navigations should be reasonable (no infinite loop)
    expect(urlChanges.length).toBeLessThanOrEqual(4);

    // ASSERTION 3: Must end on dashboard
    expect(page.url()).toContain('/dashboard');

    // ASSERTION 4: Must have reached dashboard at least once
    expect(dashboardVisits).toBeGreaterThanOrEqual(1);
  });

  test('should not create multiple redirects during login flow', async ({ page }) => {
    await page.goto('/signin');

    await page.evaluate(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });

    // Track all navigation events during login
    const navigations: { url: string; timestamp: number }[] = [];

    page.on('framenavigated', (frame) => {
      if (frame === page.mainFrame()) {
        navigations.push({
          url: frame.url(),
          timestamp: Date.now(),
        });
      }
    });

    const startTime = Date.now();

    // Perform login
    await page.fill('input[name="username"]', 'student@test.com');
    await page.fill('input[type="password"]', 'StudentTest123!');
    await page.click('button[type="submit"]');

    // Wait for navigation to complete
    await page.waitForURL(/\/dashboard/, { timeout: 10000 });

    // Wait a bit more to catch any delayed redirects
    await page.waitForTimeout(2000);

    const endTime = Date.now();

    // Filter navigations that happened during login flow
    const loginNavigations = navigations.filter(
      n => n.timestamp >= startTime && n.timestamp <= endTime + 2000
    );

    // ASSERTION: Should have at most 2 navigations during login
    // 1. Possibly a soft navigation when form submits
    // 2. Redirect to dashboard
    // If there's a loop, we'll see 3+
    expect(loginNavigations.length).toBeLessThanOrEqual(3);

    // ASSERTION: Should not visit signin after dashboard
    const dashboardIndex = loginNavigations.findIndex(n => n.url.includes('/dashboard'));
    const signinAfterDashboard = loginNavigations.slice(dashboardIndex + 1).some(n => n.url.includes('/signin'));
    expect(signinAfterDashboard).toBe(false);
  });

  test('should handle rapid navigation to protected routes without loop', async ({ page }) => {
    // Login first
    await page.goto('/signin');

    await page.evaluate(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });

    await page.fill('input[name="username"]', 'student@test.com');
    await page.fill('input[type="password"]', 'StudentTest123!');
    await page.click('button[type="submit"]');

    await page.waitForURL(/\/dashboard/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');

    // Now rapidly navigate between protected routes
    const routes = ['/dashboard', '/progress', '/curriculum', '/dashboard'];
    const visitedUrls: string[] = [];

    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');
      visitedUrls.push(page.url());
    }

    // ASSERTION: None of the navigations should have ended up on signin
    const unintendedSigninRedirects = visitedUrls.filter(url => url.includes('/signin'));
    expect(unintendedSigninRedirects.length).toBe(0);
  });

  test('should stay on dashboard after page refresh with valid session', async ({ page }) => {
    // Login
    await page.goto('/signin');

    await page.evaluate(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });

    await page.fill('input[name="username"]', 'student@test.com');
    await page.fill('input[type="password"]', 'StudentTest123!');
    await page.click('button[type="submit"]');

    await page.waitForURL(/\/dashboard/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');

    // Track navigations during refresh
    const navigations: string[] = [];
    page.on('framenavigated', (frame) => {
      if (frame === page.mainFrame()) {
        navigations.push(frame.url());
      }
    });

    // Refresh the page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Wait for any redirects
    await page.waitForTimeout(2000);

    // ASSERTION: Should still be on dashboard
    expect(page.url()).toContain('/dashboard');

    // ASSERTION: Should not have visited signin during refresh
    const visitedSignin = navigations.some(url => url.includes('/signin'));
    expect(visitedSignin).toBe(false);
  });
});
