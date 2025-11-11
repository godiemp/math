import { test, expect } from '@playwright/test';

/**
 * ============================================================================
 * USER REGISTRATION E2E TESTS
 * ============================================================================
 *
 * Tests for user registration flow including:
 * - Successful registration
 * - Form validation (username, email, password)
 * - Required field validation
 * - Terms and conditions acceptance
 * - Duplicate user handling
 * - UI state management (switching between login/register)
 */

test.describe('User Registration', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to landing page
    await page.goto('/');

    // Dismiss cookie banner
    await page.evaluate(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });

    // Switch to register mode
    await page.click('button:has-text("Regístrate gratis")');
    await page.waitForTimeout(500);
  });

  test('should display registration form', async ({ page }) => {
    // Verify registration form elements are visible
    await expect(page.locator('h2')).toContainText('Crear Cuenta');
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="displayName"]')).toBeVisible();
    await expect(page.locator('input[name="acceptedTerms"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText('Crear Cuenta Gratis');
  });

  test('should successfully register a new user', async ({ page }) => {
    const timestamp = Date.now();
    const username = `testuser${timestamp}`;
    const email = `testuser${timestamp}@example.com`;

    // Fill in registration form
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="displayName"]', 'Test User');
    await page.check('input[name="acceptedTerms"]');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await page.waitForTimeout(3000);

    // Verify successful registration - should be redirected to dashboard
    const url = page.url();
    expect(url).toContain('/dashboard');

    // Verify dashboard content is visible
    const dashboardContentCount = await page.getByText(/dashboard|práctica|inicio/i).count();
    expect(dashboardContentCount).toBeGreaterThan(0);
  });

  test('should show error for username less than 3 characters', async ({ page }) => {
    // Fill form with short username
    await page.fill('input[name="username"]', 'ab');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="displayName"]', 'Test User');
    await page.check('input[name="acceptedTerms"]');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for error message
    await page.waitForTimeout(1500);

    // Verify error is shown (either in toast or error message div)
    const errorCount = await page.getByText(/nombre de usuario debe tener al menos 3 caracteres/i).count();
    expect(errorCount).toBeGreaterThan(0);

    // Should still be on login page
    const url = page.url();
    expect(url).not.toContain('/dashboard');
  });

  test('should show error for invalid email format', async ({ page }) => {
    const timestamp = Date.now();

    // Fill form with invalid email
    await page.fill('input[name="username"]', `user${timestamp}`);
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="displayName"]', 'Test User');
    await page.check('input[name="acceptedTerms"]');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for error message
    await page.waitForTimeout(1500);

    // Verify error is shown
    const errorCount = await page.getByText(/correo electrónico inválido|email.*inválido/i).count();
    expect(errorCount).toBeGreaterThan(0);

    // Should still be on login page
    const url = page.url();
    expect(url).not.toContain('/dashboard');
  });

  test('should show error for password less than 6 characters', async ({ page }) => {
    const timestamp = Date.now();

    // Fill form with short password
    await page.fill('input[name="username"]', `user${timestamp}`);
    await page.fill('input[name="email"]', `user${timestamp}@example.com`);
    await page.fill('input[name="password"]', '12345');
    await page.fill('input[name="displayName"]', 'Test User');
    await page.check('input[name="acceptedTerms"]');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for error message
    await page.waitForTimeout(1500);

    // Verify error is shown
    const errorCount = await page.getByText(/contraseña debe tener al menos 6 caracteres/i).count();
    expect(errorCount).toBeGreaterThan(0);

    // Should still be on login page
    const url = page.url();
    expect(url).not.toContain('/dashboard');
  });

  test('should show error when required fields are missing', async ({ page }) => {
    // Only fill username, leave others empty
    await page.fill('input[name="username"]', 'testuser');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for error message
    await page.waitForTimeout(1500);

    // Verify error is shown
    const errorCount = await page.getByText(/completa todos los campos/i).count();
    expect(errorCount).toBeGreaterThan(0);

    // Should still be on login page
    const url = page.url();
    expect(url).not.toContain('/dashboard');
  });

  test('should show error when terms are not accepted', async ({ page }) => {
    const timestamp = Date.now();

    // Fill all fields but don't check terms
    await page.fill('input[name="username"]', `user${timestamp}`);
    await page.fill('input[name="email"]', `user${timestamp}@example.com`);
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="displayName"]', 'Test User');
    // Don't check acceptedTerms

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for error message
    await page.waitForTimeout(1500);

    // Verify error is shown
    const errorCount = await page.getByText(/aceptar los términos/i).count();
    expect(errorCount).toBeGreaterThan(0);

    // Should still be on login page
    const url = page.url();
    expect(url).not.toContain('/dashboard');
  });

  test('should show error for duplicate username/email', async ({ page }) => {
    // Try to register with existing test user credentials
    await page.fill('input[name="username"]', 'teststudent');
    await page.fill('input[name="email"]', 'student@test.com');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="displayName"]', 'Test User');
    await page.check('input[name="acceptedTerms"]');

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for error message
    await page.waitForTimeout(1500);

    // Verify error is shown (should mention user already exists)
    const errorCount = await page.getByText(/ya existe|already exists/i).count();
    expect(errorCount).toBeGreaterThan(0);

    // Should still be on login page
    const url = page.url();
    expect(url).not.toContain('/dashboard');
  });

  test('should switch between login and register modes', async ({ page }) => {
    // Should be in register mode
    await expect(page.locator('h2')).toContainText('Crear Cuenta');
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="displayName"]')).toBeVisible();
    await expect(page.locator('input[name="acceptedTerms"]')).toBeVisible();

    // Switch to login mode
    await page.click('button:has-text("Inicia sesión")');
    await page.waitForTimeout(500);

    // Verify login mode
    await expect(page.locator('h2')).toContainText('Iniciar Sesión');
    await expect(page.locator('input[name="email"]')).not.toBeVisible();
    await expect(page.locator('input[name="displayName"]')).not.toBeVisible();
    await expect(page.locator('input[name="acceptedTerms"]')).not.toBeVisible();

    // Switch back to register mode
    await page.click('button:has-text("Regístrate gratis")');
    await page.waitForTimeout(500);

    // Verify register mode again
    await expect(page.locator('h2')).toContainText('Crear Cuenta');
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });

  test('should show loading state during registration', async ({ page }) => {
    const timestamp = Date.now();

    // Fill in registration form
    await page.fill('input[name="username"]', `user${timestamp}`);
    await page.fill('input[name="email"]', `user${timestamp}@example.com`);
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="displayName"]', 'Test User');
    await page.check('input[name="acceptedTerms"]');

    // Submit form
    await page.click('button[type="submit"]');

    // Immediately check for loading state
    const loadingButton = page.locator('button[type="submit"]:has-text("Cargando")');

    // Give it a moment to show loading state (this is fast, so we check quickly)
    await page.waitForTimeout(100);

    // Button text should change to "Cargando..." or button should be disabled
    const isDisabled = await page.locator('button[type="submit"]').isDisabled();
    const hasLoadingText = await page.locator('button:has-text("Cargando")').count() > 0;

    expect(isDisabled || hasLoadingText).toBeTruthy();
  });

  test('should have accessible form labels', async ({ page }) => {
    // Check that all form inputs have associated labels
    const usernameLabel = page.locator('label[for="username"]');
    const emailLabel = page.locator('label[for="email"]');
    const passwordLabel = page.locator('label[for="password"]');
    const displayNameLabel = page.locator('label[for="displayName"]');
    const termsLabel = page.locator('label[for="acceptedTerms"]');

    await expect(usernameLabel).toBeVisible();
    await expect(emailLabel).toBeVisible();
    await expect(passwordLabel).toBeVisible();
    await expect(displayNameLabel).toBeVisible();
    await expect(termsLabel).toBeVisible();
  });

  test('should have links to terms and privacy policy', async ({ page }) => {
    // Check that terms and privacy links are present in the registration form
    const termsLink = page.locator('form a[href="/legal/terminos"]');
    const privacyLink = page.locator('form a[href="/legal/privacidad"]');

    await expect(termsLink).toBeVisible();
    await expect(privacyLink).toBeVisible();
  });
});
