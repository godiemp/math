import { test, expect } from '@playwright/test';

test.describe('Colegio Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Dismiss cookie banner
    await page.evaluate(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });
  });

  test.describe('Colegio Student Dashboard View', () => {
    test('should show colegio dashboard for student with grade level', async ({ page }) => {
      await page.goto('/signin');

      // Login as 1-medio student
      await page.fill('input[type="email"], input[name="email"], input[name="username"]', '1medio_student');
      await page.fill('input[type="password"]', 'test123');
      await page.click('button[type="submit"]');

      // Wait for dashboard
      await page.waitForURL(/\/dashboard/, { timeout: 10000 });
      await page.waitForTimeout(2000);

      // Verify colegio-specific dashboard elements
      await expect(page.getByTestId('dashboard-title')).toContainText(/Mi Clase/i);

      // Should show grade badge
      await expect(page.getByText('1° Medio')).toBeVisible();

      // Should show mini-lessons banner for grade
      await expect(page.getByTestId('mini-lessons-banner')).toBeVisible();
      await expect(page.getByText(/Mini Lecciones/i)).toBeVisible();
    });

    test('should navigate to grade-specific mini-lessons from dashboard', async ({ page }) => {
      await page.goto('/signin');

      // Login as 1-medio student
      await page.fill('input[type="email"], input[name="email"], input[name="username"]', '1medio_student');
      await page.fill('input[type="password"]', 'test123');
      await page.click('button[type="submit"]');

      await page.waitForURL(/\/dashboard/, { timeout: 10000 });
      await page.waitForTimeout(2000);

      // Click mini-lessons banner
      await page.getByTestId('mini-lessons-banner').click();

      // Should go to grade-specific mini-lessons page
      await page.waitForURL(/\/mini-lessons\/colegios\/1-medio/, { timeout: 5000 });

      // Verify page content
      await expect(page.getByText('1° Medio')).toBeVisible();
      await expect(page.getByText(/Objetivos de Aprendizaje/i)).toBeVisible();
    });

    test('should show adaptive practice placeholder', async ({ page }) => {
      await page.goto('/signin');

      // Login as 1-medio student
      await page.fill('input[type="email"], input[name="email"], input[name="username"]', '1medio_student');
      await page.fill('input[type="password"]', 'test123');
      await page.click('button[type="submit"]');

      await page.waitForURL(/\/dashboard/, { timeout: 10000 });
      await page.waitForTimeout(2000);

      // Should show adaptive practice card with "Próximamente" badge
      await expect(page.getByTestId('adaptive-learning-card')).toBeVisible();
      await expect(page.getByText(/Práctica Adaptativa/i)).toBeVisible();
    });

    test('should show progress placeholder', async ({ page }) => {
      await page.goto('/signin');

      // Login as 1-medio student
      await page.fill('input[type="email"], input[name="email"], input[name="username"]', '1medio_student');
      await page.fill('input[type="password"]', 'test123');
      await page.click('button[type="submit"]');

      await page.waitForURL(/\/dashboard/, { timeout: 10000 });
      await page.waitForTimeout(2000);

      // Should show progress card
      await expect(page.getByTestId('progress-card')).toBeVisible();
      await expect(page.getByText(/Tu Progreso/i)).toBeVisible();
    });

    test('should show colegio account notice', async ({ page }) => {
      await page.goto('/signin');

      // Login as 1-medio student
      await page.fill('input[type="email"], input[name="email"], input[name="username"]', '1medio_student');
      await page.fill('input[type="password"]', 'test123');
      await page.click('button[type="submit"]');

      await page.waitForURL(/\/dashboard/, { timeout: 10000 });
      await page.waitForTimeout(2000);

      // Should show colegio account notice
      await expect(page.getByText(/Cuenta de Colegio/i)).toBeVisible();
      await expect(page.getByText(/asignado por tu profesor/i)).toBeVisible();
    });
  });

  test.describe('Grade Mini-Lessons Page Navigation', () => {
    test('should navigate back to dashboard from grade mini-lessons for colegio student', async ({ page }) => {
      await page.goto('/signin');

      // Login as 1-medio student
      await page.fill('input[type="email"], input[name="email"], input[name="username"]', '1medio_student');
      await page.fill('input[type="password"]', 'test123');
      await page.click('button[type="submit"]');

      await page.waitForURL(/\/dashboard/, { timeout: 10000 });
      await page.waitForTimeout(2000);

      // Navigate to grade mini-lessons
      await page.goto('/mini-lessons/colegios/1-medio');
      await page.waitForTimeout(2000);

      // Click back button (Volver)
      await page.getByText('Volver').first().click();

      // Should go back to dashboard, not /mini-lessons/colegios
      await page.waitForURL(/\/dashboard/, { timeout: 5000 });
      await expect(page.getByTestId('dashboard-title')).toContainText(/Mi Clase/i);
    });
  });

  test.describe('PAES Student Dashboard Comparison', () => {
    test('should show regular PAES dashboard for student without grade level', async ({ page }) => {
      await page.goto('/signin');

      // Login as PAES student (no grade level)
      await page.fill('input[type="email"], input[name="email"], input[name="username"]', 'paes_student');
      await page.fill('input[type="password"]', 'test123');
      await page.click('button[type="submit"]');

      await page.waitForURL(/\/dashboard/, { timeout: 10000 });
      await page.waitForTimeout(2000);

      // Should show regular PAES dashboard (not "Mi Clase")
      await expect(page.getByTestId('dashboard-title')).toContainText(/SimplePAES/i);

      // Should show PAES-specific elements
      await expect(page.getByTestId('mini-lessons-banner')).toBeVisible();

      // Should NOT show grade badge
      const gradeBadge = page.getByText(/1° Medio|2° Medio|3° Medio|4° Medio/);
      await expect(gradeBadge).not.toBeVisible();
    });

    test('should navigate to general mini-lessons from PAES dashboard', async ({ page }) => {
      await page.goto('/signin');

      // Login as PAES student
      await page.fill('input[type="email"], input[name="email"], input[name="username"]', 'paes_student');
      await page.fill('input[type="password"]', 'test123');
      await page.click('button[type="submit"]');

      await page.waitForURL(/\/dashboard/, { timeout: 10000 });
      await page.waitForTimeout(2000);

      // Click mini-lessons banner
      await page.getByTestId('mini-lessons-banner').click();

      // Should go to general mini-lessons page (not grade-specific)
      await page.waitForURL(/\/mini-lessons$/, { timeout: 5000 });
    });
  });

  test.describe('Logout Flow', () => {
    test('should logout colegio student and redirect to signin', async ({ page }) => {
      await page.goto('/signin');

      // Login as 1-medio student
      await page.fill('input[type="email"], input[name="email"], input[name="username"]', '1medio_student');
      await page.fill('input[type="password"]', 'test123');
      await page.click('button[type="submit"]');

      await page.waitForURL(/\/dashboard/, { timeout: 10000 });
      await page.waitForTimeout(2000);

      // Click logout
      await page.getByTestId('nav-logout-button').click();

      // Should redirect to signin
      await page.waitForURL(/\/signin/, { timeout: 10000 });
    });
  });
});
