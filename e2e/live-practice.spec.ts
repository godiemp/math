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

    const registerButton = page.getByRole('button', { name: /^Registrarse$/i });
    const unregisterButton = page.getByRole('button', { name: /Cancelar Registro/i });

    // Check if already registered, if so, unregister first
    const unregisterCount = await unregisterButton.count();

    if (unregisterCount > 0) {
      // Already registered, unregister first to test registration
      await unregisterButton.click();
      await page.waitForTimeout(2000);
      // Wait for unregistration to complete
      await expect(registerButton).toBeVisible({ timeout: 5000 });
    }

    // Click the register button
    await registerButton.click();

    // Wait for the toast notification
    await page.waitForTimeout(2000);

    // Check for success toast message
    await expect(page.getByText(/registrado.*exitosamente/i)).toBeVisible({ timeout: 5000 });

    // After registration, the button should change to "Cancelar Registro"
    await expect(unregisterButton).toBeVisible({ timeout: 5000 });
  });

  test('should unregister from a scheduled session', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1000);

    // Check if already registered, if not, register first
    const registerButton = page.getByRole('button', { name: /^Registrarse$/i });
    const unregisterButton = page.getByRole('button', { name: /Cancelar Registro/i });

    // Wait briefly and check which button is visible
    const registerCount = await registerButton.count();
    const unregisterCount = await unregisterButton.count();

    if (registerCount > 0) {
      // Not registered yet, need to register first
      await registerButton.click();
      await page.waitForTimeout(2000);
      // Wait for registration to complete
      await expect(unregisterButton).toBeVisible({ timeout: 5000 });
    } else if (unregisterCount === 0) {
      // Neither button found, fail the test
      throw new Error('Could not find registration or unregistration button');
    }

    // Now unregister
    await unregisterButton.click();
    await page.waitForTimeout(2000);

    // Check for success toast message
    await expect(page.getByText(/cancelado.*exitosamente/i)).toBeVisible({ timeout: 5000 });

    // After unregistering, the button should change back to "Registrarse"
    await expect(registerButton).toBeVisible({ timeout: 5000 });
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
