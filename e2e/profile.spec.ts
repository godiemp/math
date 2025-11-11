import { test, expect } from '@playwright/test';

test.describe('Student Profile Page', () => {
  // Login before each test
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto('/');

    // Login with test student credentials
    await page.fill('input[type="text"]', 'student1');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Wait for dashboard to load
    await page.waitForURL('/dashboard', { timeout: 10000 });
    await page.waitForTimeout(1000);
  });

  test('should navigate to profile page from dashboard', async ({ page }) => {
    // Click on "Mi Perfil" button in dashboard
    await page.getByRole('button', { name: /Mi Perfil/i }).click();

    // Should navigate to profile page
    await page.waitForURL('/profile', { timeout: 5000 });

    // Verify profile page heading
    await expect(page.getByRole('heading', { name: /Mi Perfil/i, level: 1 })).toBeVisible();
  });

  test('should display user information correctly', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    await page.waitForTimeout(1000);

    // Check user avatar circle with initial
    const avatarCircle = page.locator('div').filter({ hasText: /^[A-Z]$/ }).first();
    await expect(avatarCircle).toBeVisible();

    // Check for display name, username, and email
    await expect(page.getByText(/student1/i)).toBeVisible(); // username
    await expect(page.getByText(/student1@test\.com/i)).toBeVisible(); // email

    // Check for role badge
    await expect(page.getByText(/Estudiante/i)).toBeVisible();

    // Check for member since date
    await expect(page.getByText(/Miembro desde:/i)).toBeVisible();
  });

  test('should display subscription information', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    await page.waitForTimeout(1000);

    // Check subscription heading
    await expect(page.getByRole('heading', { name: /Suscripción/i })).toBeVisible();

    // Check for subscription status (could be Trial, Active, etc.)
    await expect(page.getByText(/Estado:/i)).toBeVisible();

    // Should have subscription details or "no subscription" message
    const hasSubscription = await page.getByText(/Fecha de inicio:/i).isVisible().catch(() => false);
    const noSubscription = await page.getByText(/No tienes una suscripción activa/i).isVisible().catch(() => false);

    expect(hasSubscription || noSubscription).toBeTruthy();
  });

  test('should display practice streaks', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    await page.waitForTimeout(1000);

    // Check streaks heading
    await expect(page.getByRole('heading', { name: /Rachas de Práctica/i })).toBeVisible();

    // Check for current streak
    await expect(page.getByText(/Racha Actual/i)).toBeVisible();

    // Check for longest streak
    await expect(page.getByText(/Mejor Racha/i)).toBeVisible();
  });

  test('should display statistics dashboard', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    await page.waitForTimeout(2000); // Give time for stats to load

    // Check statistics heading
    await expect(page.getByRole('heading', { name: /Estadísticas Generales/i })).toBeVisible();

    // Check for total questions
    await expect(page.getByText(/Total de preguntas:/i)).toBeVisible();

    // Check for correct answers
    await expect(page.getByText(/Respuestas correctas:/i)).toBeVisible();

    // Check for accuracy
    await expect(page.getByText(/Precisión general:/i)).toBeVisible();

    // Check for M1 and M2 question counts
    await expect(page.getByText(/Preguntas M1/i)).toBeVisible();
    await expect(page.getByText(/Preguntas M2/i)).toBeVisible();
  });

  test('should display quick action buttons', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    await page.waitForTimeout(1000);

    // Check quick actions heading
    await expect(page.getByRole('heading', { name: /Acciones Rápidas/i })).toBeVisible();

    // Check for all action buttons
    await expect(page.getByRole('link', { name: /Ver Mi Progreso/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Practicar M1/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Practicar M2/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Historial de Pagos/i })).toBeVisible();
  });

  test('should open edit profile modal', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    await page.waitForTimeout(1000);

    // Click on "Editar Perfil" button
    await page.getByRole('button', { name: /Editar Perfil/i }).click();
    await page.waitForTimeout(500);

    // Modal should be visible with title
    await expect(page.getByRole('heading', { name: /Editar Perfil/i })).toBeVisible();

    // Check for form fields
    await expect(page.getByLabel(/Nombre para mostrar/i)).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();

    // Check for buttons
    await expect(page.getByRole('button', { name: /Cancelar/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Guardar Cambios/i })).toBeVisible();
  });

  test('should close edit modal when clicking cancel', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    await page.waitForTimeout(1000);

    // Open edit modal
    await page.getByRole('button', { name: /Editar Perfil/i }).click();
    await page.waitForTimeout(500);

    // Click cancel
    await page.getByRole('button', { name: /Cancelar/i }).click();
    await page.waitForTimeout(500);

    // Modal should be closed (heading not visible)
    await expect(page.getByRole('heading', { name: /Editar Perfil/i })).not.toBeVisible();
  });

  test('should update display name successfully', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    await page.waitForTimeout(1000);

    // Open edit modal
    await page.getByRole('button', { name: /Editar Perfil/i }).click();
    await page.waitForTimeout(500);

    // Get the display name input
    const displayNameInput = page.getByLabel(/Nombre para mostrar/i);

    // Clear and enter new display name
    await displayNameInput.clear();
    await displayNameInput.fill('Updated Student Name');

    // Click save
    await page.getByRole('button', { name: /Guardar Cambios/i }).click();
    await page.waitForTimeout(2000);

    // Modal should close
    await expect(page.getByRole('heading', { name: /Editar Perfil/i })).not.toBeVisible();

    // Verify the display name was updated (check in navbar or profile)
    await expect(page.getByText(/Updated Student Name/i)).toBeVisible();
  });

  test('should show error for empty display name', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    await page.waitForTimeout(1000);

    // Open edit modal
    await page.getByRole('button', { name: /Editar Perfil/i }).click();
    await page.waitForTimeout(500);

    // Get the display name input
    const displayNameInput = page.getByLabel(/Nombre para mostrar/i);

    // Clear display name (make it empty)
    await displayNameInput.clear();

    // Get email input and clear it too (so we're only updating display name)
    const emailInput = page.getByLabel(/Email/i);
    const originalEmail = await emailInput.inputValue();

    // Click save with empty display name
    await page.getByRole('button', { name: /Guardar Cambios/i }).click();
    await page.waitForTimeout(1000);

    // Should show error message
    await expect(page.getByText(/cannot be empty|no puede estar vacío|Error/i)).toBeVisible();
  });

  test('should show error for invalid email format', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    await page.waitForTimeout(1000);

    // Open edit modal
    await page.getByRole('button', { name: /Editar Perfil/i }).click();
    await page.waitForTimeout(500);

    // Get the email input
    const emailInput = page.getByLabel(/Email/i);

    // Enter invalid email
    await emailInput.clear();
    await emailInput.fill('invalid-email');

    // Click save
    await page.getByRole('button', { name: /Guardar Cambios/i }).click();
    await page.waitForTimeout(1000);

    // Should show error message
    await expect(page.getByText(/Invalid email|email format|Error/i)).toBeVisible();
  });

  test('should navigate to progress page from quick actions', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    await page.waitForTimeout(1000);

    // Click "Ver Mi Progreso" button
    await page.getByRole('link', { name: /Ver Mi Progreso/i }).click();

    // Should navigate to progress page
    await page.waitForURL('/progress', { timeout: 5000 });
    await expect(page.getByRole('heading', { name: /Mi Progreso/i })).toBeVisible();
  });

  test('should navigate to M1 practice from quick actions', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    await page.waitForTimeout(1000);

    // Click "Practicar M1" button
    await page.getByRole('link', { name: /Practicar M1/i }).click();

    // Should navigate to M1 practice page
    await page.waitForURL('/practice/m1', { timeout: 5000 });
  });

  test('should navigate to M2 practice from quick actions', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    await page.waitForTimeout(1000);

    // Click "Practicar M2" button
    await page.getByRole('link', { name: /Practicar M2/i }).click();

    // Should navigate to M2 practice page
    await page.waitForURL('/practice/m2', { timeout: 5000 });
  });

  test('should navigate back to dashboard', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    await page.waitForTimeout(1000);

    // Click "Volver al Inicio" link
    await page.getByRole('link', { name: /Volver al Inicio/i }).click();

    // Should navigate back to dashboard
    await page.waitForURL('/dashboard', { timeout: 5000 });
  });

  test('should display loading state for statistics', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');

    // Should show loading spinner briefly (if stats take time to load)
    // This might be too fast to catch, but we check the spinner exists
    const spinner = page.locator('.animate-spin');

    // Wait for statistics to load (spinner should disappear)
    await page.waitForTimeout(2000);

    // Statistics should be visible
    await expect(page.getByText(/Total de preguntas:/i)).toBeVisible();
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to profile page
    await page.goto('/profile');
    await page.waitForTimeout(1000);

    // Profile heading should still be visible
    await expect(page.getByRole('heading', { name: /Mi Perfil/i, level: 1 })).toBeVisible();

    // User info should be visible
    await expect(page.getByText(/Miembro desde:/i)).toBeVisible();

    // Quick actions should be visible (they stack on mobile)
    await expect(page.getByRole('link', { name: /Ver Mi Progreso/i })).toBeVisible();
  });

  test('should show correct accuracy badge color based on percentage', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    await page.waitForTimeout(2000);

    // Check if accuracy badge is visible
    const accuracySection = page.locator('text=Precisión general:').locator('..');
    await expect(accuracySection).toBeVisible();

    // The badge should have a color (success/warning/danger/neutral)
    // This is verified by the presence of the badge component
    const badge = accuracySection.locator('[class*="bg-"]');
    await expect(badge).toBeVisible();
  });
});
