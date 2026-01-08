import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  // Authentication is handled via storageState in playwright.config.ts

  test.describe('Page Loading and Basic Layout', () => {
    test('should load dashboard with main elements for authenticated user', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      // Verify page title/heading
      await expect(page.getByTestId('dashboard-title')).toBeVisible();

      // Verify user greeting is shown
      await expect(page.getByTestId('user-greeting')).toBeVisible();
      await expect(page.getByTestId('user-greeting')).toContainText(/Hola/i);

      // Verify navbar buttons
      await expect(page.getByTestId('nav-profile-button')).toBeVisible();
      await expect(page.getByTestId('nav-logout-button')).toBeVisible();
    });

    test('should display user greeting with username', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      const greeting = page.getByTestId('user-greeting');
      await expect(greeting).toBeVisible();
      // Greeting should contain "Hola" and some text (username)
      const greetingText = await greeting.textContent();
      expect(greetingText).toMatch(/Hola/i);
    });
  });

  test.describe('Feature Cards Display', () => {
    test('should display Mini Lessons banner with NUEVO badge', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      await expect(page.getByTestId('mini-lessons-banner')).toBeVisible();
      await expect(page.getByText(/Mini Lecciones/i)).toBeVisible();
      await expect(page.getByText(/NUEVO/i)).toBeVisible();
    });

    test('should display Live Practice card', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      await expect(page.getByTestId('live-practice-card')).toBeVisible();
      await expect(page.getByTestId('live-practice-cta')).toBeVisible();
    });

    test('should display Practice Section with Operations, M1, M2', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      await expect(page.getByTestId('practice-section-card')).toBeVisible();
      await expect(page.getByTestId('practice-operations-link')).toBeVisible();

      // M1 section - check for either link (paid) or locked button (free)
      const m1Link = page.getByTestId('practice-m1-link');
      const m1Locked = page.getByTestId('practice-m1-locked');
      const hasM1Link = await m1Link.isVisible().catch(() => false);
      const hasM1Locked = await m1Locked.isVisible().catch(() => false);
      expect(hasM1Link || hasM1Locked).toBe(true);
    });

    test('should display Temario card', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      await expect(page.getByTestId('temario-card')).toBeVisible();
    });

    test('should display Progress card', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      await expect(page.getByTestId('progress-card')).toBeVisible();
    });

    test('should display footer with links', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      await expect(page.getByTestId('dashboard-footer')).toBeVisible();
      await expect(page.getByTestId('how-it-works-link')).toBeVisible();
    });
  });

  test.describe('Navigation from Dashboard', () => {
    test('should navigate to profile page from navbar', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      await page.getByTestId('nav-profile-button').click();
      await page.waitForURL('/profile', { timeout: 5000 });
      await expect(page.getByRole('heading', { name: /Mi Perfil/i })).toBeVisible();
    });

    test('should navigate to mini-lessons from banner', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      await page.getByTestId('mini-lessons-banner').click();
      await page.waitForURL('/mini-lessons', { timeout: 5000 });
    });

    test('should navigate to live-practice from card', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      await page.getByTestId('live-practice-cta').click();
      await page.waitForURL('/live-practice', { timeout: 5000 });
    });

    test('should navigate to operations practice', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      await page.getByTestId('practice-operations-link').click();
      await page.waitForURL('/practice/operations', { timeout: 5000 });
    });

    test('should navigate to M1 practice (paid user)', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      // Test user has active subscription
      const m1Link = page.getByTestId('practice-m1-link');
      const isEnabled = await m1Link.isVisible().catch(() => false);

      if (isEnabled) {
        await m1Link.click();
        await page.waitForURL('/practice/m1', { timeout: 5000 });
      }
    });

    test('should navigate to progress page (paid user)', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      const progressLink = page.getByTestId('progress-link');
      const isEnabled = await progressLink.isVisible().catch(() => false);

      if (isEnabled) {
        await progressLink.click();
        await page.waitForURL('/progress', { timeout: 5000 });
      }
    });

    test('should navigate to M1 curriculum (paid user)', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      const curriculumLink = page.getByTestId('curriculum-m1-link');
      const isEnabled = await curriculumLink.isVisible().catch(() => false);

      if (isEnabled) {
        await curriculumLink.click();
        await page.waitForURL('/curriculum/m1', { timeout: 5000 });
      }
    });

    test('should logout user and redirect to signin', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      await page.getByTestId('nav-logout-button').click();

      // Should redirect to signin page
      await page.waitForURL(/\/signin/, { timeout: 10000 });
    });
  });

  test.describe('Feature Gating UI', () => {
    test('should show correct gating based on subscription status', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      // Check for premium badges (present for free users, absent for paid)
      const practicePremiumBadge = page.getByTestId('practice-premium-badge');
      const hasPremiumBadges = await practicePremiumBadge.isVisible().catch(() => false);

      if (hasPremiumBadges) {
        // Free user - verify lock icons and badges
        await expect(practicePremiumBadge).toContainText(/Premium/i);
        await expect(page.getByTestId('practice-m1-locked')).toBeVisible();
        await expect(page.getByTestId('progress-locked-button')).toBeVisible();

        // Premium button in navbar should be visible
        await expect(page.getByTestId('nav-premium-button')).toBeVisible();
      } else {
        // Paid user - verify links are enabled
        await expect(page.getByTestId('practice-m1-link')).toBeVisible();
        await expect(page.getByTestId('progress-link')).toBeVisible();

        // Premium button should NOT be in navbar
        const premiumButton = page.getByTestId('nav-premium-button');
        await expect(premiumButton).not.toBeVisible();
      }
    });

    test('should hide admin button for non-admin users', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      // Current test user is NOT admin
      const adminButton = page.getByTestId('nav-admin-button');
      await expect(adminButton).not.toBeVisible();
    });
  });

  test.describe('Welcome Message Modal', () => {
    test('should show welcome modal when ?welcome=true query param is present', async ({ page }) => {
      await page.goto('/dashboard?welcome=true', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      // Welcome modal should be visible - check for exam selection text
      await expect(page.getByText(/¿para qué paes te estás preparando/i)).toBeVisible({ timeout: 5000 });

      // Exam selection buttons should be visible (invierno 2026 and verano 2026)
      await expect(page.getByRole('button', { name: /PAES invierno 2026/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /PAES verano 2026/i })).toBeVisible();
    });

    test('should complete welcome flow for PAES invierno 2026', async ({ page }) => {
      await page.goto('/dashboard?welcome=true', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      // Click PAES invierno 2026 option - this triggers a follow-up question
      await page.getByRole('button', { name: /PAES invierno 2026/i }).click();

      // Wait for follow-up question about verano
      await expect(page.getByText(/también darás la PAES de verano/i)).toBeVisible({ timeout: 5000 });

      // Click "no, solo invierno" option
      await page.getByRole('button', { name: /no, solo invierno/i }).click();

      // Wait for typing animation to complete (may take several seconds)
      await page.waitForTimeout(5000);

      // Should show the completion button
      const comenzarButton = page.getByRole('button', { name: /comenzar/i });
      await expect(comenzarButton).toBeVisible({ timeout: 10000 });

      // Click completion button (stays on dashboard)
      await comenzarButton.click();

      // Should stay on dashboard with ?welcome param removed
      await page.waitForURL('/dashboard', { timeout: 5000 });
    });

    test('should complete welcome flow for PAES verano 2026', async ({ page }) => {
      await page.goto('/dashboard?welcome=true', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      // Click PAES verano 2026 option - this triggers a follow-up question
      await page.getByRole('button', { name: /PAES verano 2026/i }).click();

      // Wait for follow-up question about invierno
      await expect(page.getByText(/también darás la PAES de invierno/i)).toBeVisible({ timeout: 5000 });

      // Click "no, solo verano" option
      await page.getByRole('button', { name: /no, solo verano/i }).click();

      // Wait for typing animation
      await page.waitForTimeout(5000);

      // Should show the completion button
      const comenzarButton = page.getByRole('button', { name: /comenzar/i });
      await expect(comenzarButton).toBeVisible({ timeout: 10000 });

      // Click completion button (stays on dashboard)
      await comenzarButton.click();

      // Should stay on dashboard with ?welcome param removed
      await page.waitForURL('/dashboard', { timeout: 5000 });
    });

    test('should NOT show welcome modal without query param', async ({ page }) => {
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      // Welcome modal should NOT be visible
      const yearSelection = page.getByText(/¿para qué paes te estás preparando/i);
      await expect(yearSelection).not.toBeVisible();
    });
  });

  test.describe('Responsive Layout', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      // Title should still be visible
      await expect(page.getByTestId('dashboard-title')).toBeVisible();

      // All major cards should be visible
      await expect(page.getByTestId('mini-lessons-banner')).toBeVisible();
      await expect(page.getByTestId('live-practice-card')).toBeVisible();
      await expect(page.getByTestId('practice-section-card')).toBeVisible();

      // Navigation buttons should be visible
      await expect(page.getByTestId('nav-profile-button')).toBeVisible();
      await expect(page.getByTestId('nav-logout-button')).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      // All cards should be visible
      await expect(page.getByTestId('temario-card')).toBeVisible();
      await expect(page.getByTestId('progress-card')).toBeVisible();
    });

    test('should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      // Grid layout should show Temario and Progress side by side
      const temarioCard = page.getByTestId('temario-card');
      const progressCard = page.getByTestId('progress-card');

      await expect(temarioCard).toBeVisible();
      await expect(progressCard).toBeVisible();

      // They should be horizontally aligned on desktop
      const temarioBox = await temarioCard.boundingBox();
      const progressBox = await progressCard.boundingBox();

      if (temarioBox && progressBox) {
        // On desktop (md:grid-cols-2), they should have similar Y position
        expect(Math.abs(temarioBox.y - progressBox.y)).toBeLessThan(50);
      }
    });

    test('should maintain layout integrity after scrolling on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);

      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // Footer should be visible
      await expect(page.getByTestId('dashboard-footer')).toBeVisible();

      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      // Navbar should still be visible
      await expect(page.getByTestId('dashboard-title')).toBeVisible();
    });
  });
});
