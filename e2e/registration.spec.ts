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
 *
 * Uses data-testid attributes for consistent, maintainable selectors
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
    await page.getByTestId('auth-toggle-button').click();
    await page.waitForTimeout(500);
  });

  test('should display registration form', async ({ page }) => {
    // Verify registration form elements are visible
    await expect(page.getByTestId('auth-heading')).toContainText('Crear Cuenta');
    await expect(page.getByTestId('auth-username-input')).toBeVisible();
    await expect(page.getByTestId('auth-email-input')).toBeVisible();
    await expect(page.getByTestId('auth-password-input')).toBeVisible();
    await expect(page.getByTestId('auth-displayname-input')).toBeVisible();
    await expect(page.getByTestId('auth-terms-checkbox')).toBeVisible();
    await expect(page.getByTestId('auth-submit-button')).toContainText('Crear Cuenta Gratis');
  });

  test('should successfully register a new user', async ({ page }) => {
    const timestamp = Date.now();
    const username = `testuser${timestamp}`;
    const email = `testuser${timestamp}@example.com`;

    // Fill in registration form
    await page.getByTestId('auth-username-input').fill(username);
    await page.getByTestId('auth-email-input').fill(email);
    await page.getByTestId('auth-password-input').fill('password123');
    await page.getByTestId('auth-displayname-input').fill('Test User');
    await page.getByTestId('auth-terms-checkbox').check();

    // Submit form
    await page.getByTestId('auth-submit-button').click();

    // Wait for redirect to dashboard
    await page.waitForTimeout(3000);

    // Verify successful registration - should be redirected to dashboard
    const url = page.url();
    expect(url).toContain('/dashboard');
  });

  test('should show error for username less than 3 characters', async ({ page }) => {
    // Fill form with short username
    await page.getByTestId('auth-username-input').fill('ab');
    await page.getByTestId('auth-email-input').fill('test@example.com');
    await page.getByTestId('auth-password-input').fill('password123');
    await page.getByTestId('auth-displayname-input').fill('Test User');
    await page.getByTestId('auth-terms-checkbox').check();

    // Submit form
    await page.getByTestId('auth-submit-button').click();

    // Wait for error message
    await page.waitForTimeout(1500);

    // Verify error is shown (backend returns "Validación fallida" for Zod validation)
    const errorDiv = page.getByTestId('auth-error-message');
    await expect(errorDiv).toBeVisible();

    // Should still be on login page
    const url = page.url();
    expect(url).not.toContain('/dashboard');
  });

  test('should show error for invalid email format', async ({ page }) => {
    const timestamp = Date.now();

    // Fill form with invalid email - Note: Browser HTML5 validation may prevent submission
    await page.getByTestId('auth-username-input').fill(`user${timestamp}`);
    await page.getByTestId('auth-email-input').fill('invalid-email');
    await page.getByTestId('auth-password-input').fill('password123');
    await page.getByTestId('auth-displayname-input').fill('Test User');
    await page.getByTestId('auth-terms-checkbox').check();

    // Try to submit form - HTML5 validation will prevent actual submission
    await page.getByTestId('auth-submit-button').click();

    // Wait a moment
    await page.waitForTimeout(500);

    // Verify form was not submitted - should still be on landing page
    const url = page.url();
    expect(url).not.toContain('/dashboard');

    // Verify we're still in register mode
    await expect(page.getByTestId('auth-heading')).toContainText('Crear Cuenta');
  });

  test('should show error for password less than 6 characters', async ({ page }) => {
    const timestamp = Date.now();

    // Fill form with short password
    await page.getByTestId('auth-username-input').fill(`user${timestamp}`);
    await page.getByTestId('auth-email-input').fill(`user${timestamp}@example.com`);
    await page.getByTestId('auth-password-input').fill('12345');
    await page.getByTestId('auth-displayname-input').fill('Test User');
    await page.getByTestId('auth-terms-checkbox').check();

    // Submit form
    await page.getByTestId('auth-submit-button').click();

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
    // Only fill username, leave others empty - Browser HTML5 validation will prevent submission
    await page.getByTestId('auth-username-input').fill('testuser');

    // Try to submit form - HTML5 required attribute validation will prevent submission
    await page.getByTestId('auth-submit-button').click();

    // Wait a moment
    await page.waitForTimeout(500);

    // Verify form was not submitted - should still be on landing page
    const url = page.url();
    expect(url).not.toContain('/dashboard');

    // Verify we're still in register mode
    await expect(page.getByTestId('auth-heading')).toContainText('Crear Cuenta');
  });

  test('should show error when terms are not accepted', async ({ page }) => {
    const timestamp = Date.now();

    // Fill all fields but don't check terms
    await page.getByTestId('auth-username-input').fill(`user${timestamp}`);
    await page.getByTestId('auth-email-input').fill(`user${timestamp}@example.com`);
    await page.getByTestId('auth-password-input').fill('password123');
    await page.getByTestId('auth-displayname-input').fill('Test User');
    // Don't check terms checkbox

    // Submit form
    await page.getByTestId('auth-submit-button').click();

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
    await page.getByTestId('auth-username-input').fill('teststudent');
    await page.getByTestId('auth-email-input').fill('student@test.com');
    await page.getByTestId('auth-password-input').fill('password123');
    await page.getByTestId('auth-displayname-input').fill('Test User');
    await page.getByTestId('auth-terms-checkbox').check();

    // Submit form
    await page.getByTestId('auth-submit-button').click();

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
    await expect(page.getByTestId('auth-heading')).toContainText('Crear Cuenta');
    await expect(page.getByTestId('auth-email-input')).toBeVisible();
    await expect(page.getByTestId('auth-displayname-input')).toBeVisible();
    await expect(page.getByTestId('auth-terms-checkbox')).toBeVisible();

    // Switch to login mode
    await page.getByTestId('auth-toggle-button').click();
    await page.waitForTimeout(500);

    // Verify login mode
    await expect(page.getByTestId('auth-heading')).toContainText('Iniciar Sesión');
    await expect(page.getByTestId('auth-email-input')).not.toBeVisible();
    await expect(page.getByTestId('auth-displayname-input')).not.toBeVisible();
    await expect(page.getByTestId('auth-terms-checkbox')).not.toBeVisible();

    // Switch back to register mode
    await page.getByTestId('auth-toggle-button').click();
    await page.waitForTimeout(500);

    // Verify register mode again
    await expect(page.getByTestId('auth-heading')).toContainText('Crear Cuenta');
    await expect(page.getByTestId('auth-email-input')).toBeVisible();
  });

  test('should show loading state during registration', async ({ page }) => {
    const timestamp = Date.now();

    // Fill in registration form
    await page.getByTestId('auth-username-input').fill(`user${timestamp}`);
    await page.getByTestId('auth-email-input').fill(`user${timestamp}@example.com`);
    await page.getByTestId('auth-password-input').fill('password123');
    await page.getByTestId('auth-displayname-input').fill('Test User');
    await page.getByTestId('auth-terms-checkbox').check();

    // Submit form
    await page.getByTestId('auth-submit-button').click();

    // Immediately check for loading state
    await page.waitForTimeout(100);

    // Button should be disabled or show loading text
    const submitButton = page.getByTestId('auth-submit-button');
    const isDisabled = await submitButton.isDisabled();
    const hasLoadingText = await page.getByText('Cargando').count() > 0;

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
    // Check that terms and privacy links are present using test IDs
    const termsLink = page.getByTestId('auth-terms-link');
    const privacyLink = page.getByTestId('auth-privacy-link');

    await expect(termsLink).toBeVisible();
    await expect(privacyLink).toBeVisible();
  });
});
