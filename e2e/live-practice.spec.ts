import { test, expect } from '@playwright/test';

test.describe('Live Practice Registration', () => {
  test.beforeEach(async ({ page }) => {
    // Login as test student
    await page.goto('/');
    await page.fill('input[type="email"], input[name="email"], input[name="username"]', 'student@test.com');
    await page.fill('input[type="password"]', 'student123');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
  });

  test('should display live practice page and available sessions', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1000);

    // Check that the page header is visible
    await expect(page.getByText(/Ensayo PAES en Vivo/i)).toBeVisible();

    // Check that the test session is displayed
    await expect(page.getByText(/Test PAES Session/i)).toBeVisible();
  });

  test('should register for a scheduled session', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1000);

    // Find the test session card
    const sessionCard = page.locator('text=Test PAES Session').locator('..');

    // Click the register button
    await page.getByRole('button', { name: /Registrarse/i }).click();

    // Wait for the toast notification
    await page.waitForTimeout(2000);

    // Check for success toast message
    await expect(page.getByText(/registrado.*exitosamente/i)).toBeVisible({ timeout: 5000 });

    // After registration, the button should change to "Cancelar Registro"
    await expect(page.getByRole('button', { name: /Cancelar Registro/i })).toBeVisible({ timeout: 5000 });
  });

  test('should unregister from a scheduled session', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1000);

    // First, register for the session
    await page.getByRole('button', { name: /Registrarse/i }).click();
    await page.waitForTimeout(2000);

    // Wait for registration to complete
    await expect(page.getByRole('button', { name: /Cancelar Registro/i })).toBeVisible({ timeout: 5000 });

    // Now unregister
    await page.getByRole('button', { name: /Cancelar Registro/i }).click();
    await page.waitForTimeout(2000);

    // Check for success toast message
    await expect(page.getByText(/cancelado.*exitosamente/i)).toBeVisible({ timeout: 5000 });

    // After unregistering, the button should change back to "Registrarse"
    await expect(page.getByRole('button', { name: /^Registrarse$/i })).toBeVisible({ timeout: 5000 });
  });

  test('should display session details correctly', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1000);

    // Check session name
    await expect(page.getByText('Test PAES Session')).toBeVisible();

    // Check session description
    await expect(page.getByText('Session for e2e testing')).toBeVisible();

    // Check host name
    await expect(page.getByText(/por Test Admin/i)).toBeVisible();

    // Check status badge
    await expect(page.getByText('Programado')).toBeVisible();

    // Check level badge
    await expect(page.getByText('M1')).toBeVisible();

    // Check scheduled date is displayed
    await expect(page.getByText(/📅 Fecha:/i)).toBeVisible();
  });

  test('should show user welcome message', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1000);

    // Check that user's display name is shown
    await expect(page.getByText('Test Student')).toBeVisible();

    // Check welcome text
    await expect(page.getByText(/Bienvenido/i)).toBeVisible();
  });

  test('should navigate back to dashboard', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1000);

    // Click the dashboard/Inicio button
    await page.getByRole('button', { name: /Inicio/i }).click();
    await page.waitForTimeout(1000);

    // Should be redirected to dashboard
    expect(page.url()).toContain('/dashboard');
  });
});
