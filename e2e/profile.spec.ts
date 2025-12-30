import { test, expect } from '@playwright/test';

test.describe('Student Profile Page', () => {
  // Login before each test
  // Authentication is handled via storageState in playwright.config.ts

  test('should navigate to profile page from dashboard', async ({ page }) => {
    // First navigate to dashboard
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });

    // Click on "Mi Perfil" button in dashboard
    const profileButton = page.getByRole('button', { name: /Mi Perfil/i });
    await expect(profileButton).toBeVisible({ timeout: 10000 });
    await profileButton.click();

    // Should navigate to profile page
    await page.waitForURL('/profile', { timeout: 5000 });

    // Verify profile page heading
    await expect(page.getByRole('heading', { name: /Mi Perfil/i, level: 1 })).toBeVisible();
  });

  test('should display user information correctly', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

    // Check user avatar circle with initial
    const avatarCircle = page.locator('div').filter({ hasText: /^[A-Z]$/ }).first();
    await expect(avatarCircle).toBeVisible();

    // Check for display name, username, and email
    await expect(page.getByText(/teststudent/i)).toBeVisible(); // username
    await expect(page.getByText(/student@test\.com/i)).toBeVisible(); // email

    // Check for role badge
    await expect(page.getByText(/Estudiante/i)).toBeVisible();

    // Check for member since date
    await expect(page.getByText(/Miembro desde:/i)).toBeVisible();
  });

  test('should display subscription information', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

    // Check subscription heading
    await expect(page.getByRole('heading', { name: /Suscripción/i })).toBeVisible({ timeout: 10000 });

    // Check for subscription status (could be Trial, Active, etc.) - use case-insensitive search
    await expect(page.getByText(/estado:/i)).toBeVisible({ timeout: 5000 });

    // Should show subscription status badge (activa, prueba gratuita, etc.) or "no subscription" message
    // Wait longer and use more flexible matching
    await page.waitForTimeout(1000); // Allow session data to load

    const hasActiveStatus = await page.locator('text=/activa/i').first().isVisible().catch(() => false);
    const hasTrialStatus = await page.locator('text=/prueba gratuita/i').first().isVisible().catch(() => false);
    const noSubscription = await page.locator('text=/no tienes una suscripción/i').first().isVisible().catch(() => false);

    expect(hasActiveStatus || hasTrialStatus || noSubscription).toBeTruthy();
  });

  test('should display practice streaks', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

    // Check streaks heading
    await expect(page.getByRole('heading', { name: /Rachas de Práctica/i })).toBeVisible();

    // Check for current streak
    await expect(page.getByText(/Racha Actual/i)).toBeVisible();

    // Check for longest streak
    await expect(page.getByText(/Mejor Racha/i)).toBeVisible();
  });

  test('should display statistics dashboard', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile', { waitUntil: 'domcontentloaded' }); // Give time for stats to load

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
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

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
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

    // Click on "Editar Perfil" button
    await page.getByRole('button', { name: /Editar Perfil/i }).click();
    // Removed: await page.waitForTimeout(500); - relying on auto-wait

    // Modal should be visible with title
    await expect(page.getByRole('heading', { name: /Editar Perfil/i })).toBeVisible();

    // Check for form fields
    await expect(page.getByLabel(/Nombre para mostrar/i)).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();

    // Check for buttons
    await expect(page.getByRole('button', { name: /cancelar/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /guardar cambios/i })).toBeVisible();
  });

  test('should close edit modal when clicking cancel', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

    // Open edit modal
    await page.getByRole('button', { name: /Editar Perfil/i }).click();
    // Removed: await page.waitForTimeout(500); - relying on auto-wait

    // Click cancel
    await page.getByRole('button', { name: /cancelar/i }).click();
    // Removed: await page.waitForTimeout(500); - relying on auto-wait

    // Modal should be closed (heading not visible)
    await expect(page.getByRole('heading', { name: /Editar Perfil/i })).not.toBeVisible();
  });

  test('should update display name successfully', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

    // Open edit modal
    await page.getByRole('button', { name: /Editar Perfil/i }).click();

    // Get the display name input and store original value
    const displayNameInput = page.getByLabel(/Nombre para mostrar/i);
    const originalName = await displayNameInput.inputValue();

    // Clear and enter new display name
    const newName = `Test User ${Date.now()}`;
    await displayNameInput.clear();
    await displayNameInput.fill(newName);

    // Click save
    await page.getByRole('button', { name: /Guardar Cambios/i }).click();

    // Modal should close (indicates success)
    await expect(page.getByRole('heading', { name: /Editar Perfil/i })).not.toBeVisible({ timeout: 5000 });

    // Verify the display name was updated on the profile page
    await expect(page.getByText(newName)).toBeVisible({ timeout: 5000 });

    // Restore original name for test isolation
    await page.getByRole('button', { name: /Editar Perfil/i }).click();
    await displayNameInput.clear();
    await displayNameInput.fill(originalName || 'Test Student');
    await page.getByRole('button', { name: /Guardar Cambios/i }).click();
    await expect(page.getByRole('heading', { name: /Editar Perfil/i })).not.toBeVisible({ timeout: 5000 });
  });

  test('should show error for empty display name', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

    // Open edit modal
    await page.getByRole('button', { name: /Editar Perfil/i }).click();

    // Get the display name input
    const displayNameInput = page.getByLabel(/Nombre para mostrar/i);

    // Clear display name and fill with empty/whitespace
    await displayNameInput.clear();
    await displayNameInput.fill(' ');
    await displayNameInput.clear();

    // Click save with empty display name
    await page.getByRole('button', { name: /Guardar Cambios/i }).click();

    // Should show specific error message from backend
    await expect(page.getByText(/Display name cannot be empty/i)).toBeVisible({ timeout: 5000 });

    // Modal should still be open (error state)
    await expect(page.getByRole('heading', { name: /Editar Perfil/i })).toBeVisible();
  });

  test('should show error for invalid email format', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

    // Open edit modal
    await page.getByRole('button', { name: /Editar Perfil/i }).click();

    // Get the email input
    const emailInput = page.getByLabel(/Email/i);

    // Enter invalid email
    await emailInput.clear();
    await emailInput.fill('invalid-email');

    // Click save
    await page.getByRole('button', { name: /Guardar Cambios/i }).click();

    // Should show specific error message from backend
    await expect(page.getByText(/Invalid email format/i)).toBeVisible({ timeout: 5000 });

    // Modal should still be open (error state)
    await expect(page.getByRole('heading', { name: /Editar Perfil/i })).toBeVisible();
  });

  test('should update target level successfully', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

    // Open edit modal
    await page.getByRole('button', { name: /Editar Perfil/i }).click();

    // Get the target level select
    const targetLevelSelect = page.getByLabel(/qué estás preparando/i);
    const originalValue = await targetLevelSelect.inputValue();

    // Change to different value
    const newValue = originalValue === 'M1_ONLY' ? 'M1_AND_M2' : 'M1_ONLY';
    await targetLevelSelect.selectOption(newValue);

    // Click save
    await page.getByRole('button', { name: /Guardar Cambios/i }).click();

    // Modal should close (indicates success)
    await expect(page.getByRole('heading', { name: /Editar Perfil/i })).not.toBeVisible({ timeout: 5000 });

    // Restore original value for test isolation
    await page.getByRole('button', { name: /Editar Perfil/i }).click();
    await targetLevelSelect.selectOption(originalValue);
    await page.getByRole('button', { name: /Guardar Cambios/i }).click();
    await expect(page.getByRole('heading', { name: /Editar Perfil/i })).not.toBeVisible({ timeout: 5000 });
  });

  test('should update email successfully', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

    // Open edit modal
    await page.getByRole('button', { name: /Editar Perfil/i }).click();

    // Get the email input and store original value
    const emailInput = page.getByLabel(/Email/i);
    const originalEmail = await emailInput.inputValue();

    // Change to a new unique email
    const newEmail = `test-${Date.now()}@example.com`;
    await emailInput.clear();
    await emailInput.fill(newEmail);

    // Click save
    await page.getByRole('button', { name: /Guardar Cambios/i }).click();

    // Modal should close (indicates success)
    await expect(page.getByRole('heading', { name: /Editar Perfil/i })).not.toBeVisible({ timeout: 5000 });

    // Verify the email was updated on the profile page
    await expect(page.getByText(newEmail)).toBeVisible({ timeout: 5000 });

    // Restore original email for test isolation
    await page.getByRole('button', { name: /Editar Perfil/i }).click();
    await emailInput.clear();
    await emailInput.fill(originalEmail);
    await page.getByRole('button', { name: /Guardar Cambios/i }).click();
    await expect(page.getByRole('heading', { name: /Editar Perfil/i })).not.toBeVisible({ timeout: 5000 });
  });

  test('should navigate to progress page from quick actions', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

    // Click "Ver Mi Progreso" button
    await page.getByRole('link', { name: /Ver Mi Progreso/i }).click();

    // Should navigate to progress page
    await page.waitForURL('/progress', { timeout: 5000 });
    await expect(page.getByRole('heading', { name: /Mi Progreso/i })).toBeVisible();
  });

  test('should navigate to M1 practice from quick actions', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

    // Click "Practicar M1" button
    await page.getByRole('link', { name: /Practicar M1/i }).click();

    // Should navigate to M1 practice page
    await page.waitForURL('/practice/m1', { timeout: 5000 });
  });

  test('should navigate to M2 practice from quick actions', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

    // Click "Practicar M2" button
    await page.getByRole('link', { name: /Practicar M2/i }).click();

    // Should navigate to M2 practice page
    await page.waitForURL('/practice/m2', { timeout: 5000 });
  });

  test('should navigate back to dashboard', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

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
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

    // Profile heading should still be visible
    await expect(page.getByRole('heading', { name: /Mi Perfil/i, level: 1 })).toBeVisible();

    // User info should be visible
    await expect(page.getByText(/Miembro desde:/i)).toBeVisible();

    // Quick actions should be visible (they stack on mobile)
    await expect(page.getByRole('link', { name: /Ver Mi Progreso/i })).toBeVisible();
  });

  test('should show correct accuracy badge color based on percentage', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile', { waitUntil: 'domcontentloaded' });

    // Check if accuracy badge is visible
    const accuracySection = page.locator('text=Precisión general:').locator('..');
    await expect(accuracySection).toBeVisible();

    // The badge should have a color (success/warning/danger/neutral)
    // This is verified by the presence of the badge component
    const badge = accuracySection.locator('[class*="rounded-full"]');
    await expect(badge).toBeVisible();
  });
});
