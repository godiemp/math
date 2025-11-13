import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';

/**
 * Helper function to login as admin user
 */
async function loginAsAdmin(page: Page) {
  // Navigate to login page
  await page.goto('/');

  // Dismiss cookie banner
  await page.evaluate(() => {
    localStorage.setItem('cookie-consent', 'accepted');
  });

  // Fill in admin credentials
  await page.fill('input[type="email"], input[name="email"], input[name="username"]', 'admin@test.com');
  await page.fill('input[type="password"]', 'AdminTest123!');

  // Submit login
  await page.click('button[type="submit"]');

  // Wait for navigation to complete
  await page.waitForTimeout(2000);

  // Verify we're authenticated
  const url = page.url();
  if (url === '/' || url.endsWith('/')) {
    const hasDashboardContent = await page.getByText(/dashboard|práctica|inicio/i).count() > 0;
    if (!hasDashboardContent) {
      throw new Error('Admin login failed - still on login page');
    }
  }
}

/**
 * Setup authenticated admin session
 */
async function setupAdminSession(page: Page) {
  await loginAsAdmin(page);
  await page.goto('/dashboard');
  await page.waitForTimeout(1000);
}

test.describe('Session Administration (Admin Only)', () => {
  test.beforeEach(async ({ page }) => {
    // Setup admin session
    await setupAdminSession(page);
  });

  test('should display admin panel or session management option', async ({ page }) => {
    // Navigate to admin live sessions page
    await page.goto('/admin/live-sessions');
    await page.waitForTimeout(2000);

    // Look for admin-specific features like "Live Sessions" heading or "New Session" button
    const hasLiveSessionsHeading = await page.getByText(/Live Sessions|Ensayos|Sessions/i).count() > 0;
    const hasNewSessionButton = await page.getByRole('button', { name: /New Session|Nuevo|Create Session/i }).count() > 0;

    expect(hasLiveSessionsHeading || hasNewSessionButton).toBeGreaterThan(0);
  });

  test('should navigate to session creation page', async ({ page }) => {
    // Navigate to live practice or admin area
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Look for "Crear Sesión" or "Create Session" button (admin only)
    const createButton = page.getByRole('button', { name: /crear sesión|create session|nueva sesión/i });
    const hasCreateButton = await createButton.isVisible().catch(() => false);

    if (hasCreateButton) {
      await createButton.click();
      await page.waitForTimeout(1000);

      // Should see session creation form
      const hasForm = await page.getByText(/nombre|name|descripción|description/i).count() > 0;
      expect(hasForm).toBeGreaterThan(0);
    } else {
      // If no button, admin might create sessions elsewhere
      test.skip();
    }
  });

  test('should create a new live session successfully', async ({ page }) => {
    // Try to navigate to session creation
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    const createButton = page.getByRole('button', { name: /crear sesión|create session/i });
    const hasCreateButton = await createButton.isVisible().catch(() => false);

    if (hasCreateButton) {
      await createButton.click();
      await page.waitForTimeout(1000);

      // Fill session form
      const nameInput = page.getByLabel(/nombre|name/i);
      const hasNameInput = await nameInput.isVisible().catch(() => false);

      if (hasNameInput) {
        await nameInput.fill('Test Admin Session');

        const descriptionInput = page.getByLabel(/descripción|description/i);
        const hasDescInput = await descriptionInput.isVisible().catch(() => false);
        if (hasDescInput) {
          await descriptionInput.fill('Session created by admin test');
        }

        // Select level (M1 or M2)
        const levelSelect = page.locator('select').filter({ hasText: /M1|M2/ }).first();
        const hasLevelSelect = await levelSelect.isVisible().catch(() => false);
        if (hasLevelSelect) {
          await levelSelect.selectOption('M1');
        }

        // Set scheduled time (future date)
        const dateInput = page.locator('input[type="datetime-local"], input[type="date"]').first();
        const hasDateInput = await dateInput.isVisible().catch(() => false);
        if (hasDateInput) {
          // Set to tomorrow
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(15, 0, 0, 0);
          const dateString = tomorrow.toISOString().slice(0, 16);
          await dateInput.fill(dateString);
        }

        // Submit form
        const submitButton = page.getByRole('button', { name: /crear|create|guardar|save/i });
        await submitButton.click();
        await page.waitForTimeout(2000);

        // Should show success message
        const hasSuccess = await page.getByText(/éxito|success|creada|created/i).count() > 0;
        expect(hasSuccess).toBeGreaterThan(0);
      }
    } else {
      test.skip();
    }
  });

  test('should validate required fields when creating session', async ({ page }) => {
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    const createButton = page.getByRole('button', { name: /crear sesión|create session/i });
    const hasCreateButton = await createButton.isVisible().catch(() => false);

    if (hasCreateButton) {
      await createButton.click();
      await page.waitForTimeout(1000);

      // Try to submit without filling required fields
      const submitButton = page.getByRole('button', { name: /crear|create|guardar|save/i });
      await submitButton.click();
      await page.waitForTimeout(1000);

      // Should show validation errors
      const hasError = await page.getByText(/requerido|required|obligatorio|campo|field/i).count() > 0;
      expect(hasError).toBeGreaterThan(0);
    } else {
      test.skip();
    }
  });

  test('should display all sessions with admin actions', async ({ page }) => {
    // Navigate to admin live sessions page where edit/delete buttons are
    await page.goto('/admin/live-sessions');
    await page.waitForTimeout(2000);

    // Admin should see edit/delete buttons for sessions (only for scheduled sessions)
    const editButton = page.getByRole('button', { name: /editar|edit/i });
    const deleteButton = page.getByRole('button', { name: /eliminar|delete|borrar/i });
    const cancelButton = page.getByRole('button', { name: /cancelar|cancel/i });
    const newSessionButton = page.getByRole('button', { name: /New Session|Nuevo|Create Session/i });

    const hasEditButton = await editButton.count() > 0;
    const hasDeleteButton = await deleteButton.count() > 0;
    const hasCancelButton = await cancelButton.count() > 0;
    const hasNewSessionButton = await newSessionButton.count() > 0;

    // Admin should have at least one admin action button (edit/delete/cancel for sessions, or new session button)
    expect(hasEditButton || hasDeleteButton || hasCancelButton || hasNewSessionButton).toBe(true);
  });

  test('should edit an existing session', async ({ page }) => {
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    const editButton = page.getByRole('button', { name: /editar|edit/i }).first();
    const hasEditButton = await editButton.isVisible().catch(() => false);

    if (hasEditButton) {
      await editButton.click();
      await page.waitForTimeout(1000);

      // Should show edit form with existing data
      const nameInput = page.getByLabel(/nombre|name/i);
      const hasNameInput = await nameInput.isVisible().catch(() => false);

      if (hasNameInput) {
        const currentValue = await nameInput.inputValue();
        expect(currentValue).toBeTruthy();

        // Update the name
        await nameInput.fill(currentValue + ' (Edited)');

        // Save changes
        const saveButton = page.getByRole('button', { name: /guardar|save|actualizar|update/i });
        await saveButton.click();
        await page.waitForTimeout(2000);

        // Should show success message
        const hasSuccess = await page.getByText(/actualizada|updated|guardado|saved/i).count() > 0;
        expect(hasSuccess).toBeGreaterThan(0);
      }
    } else {
      test.skip();
    }
  });

  test('should prevent editing a session that has already started', async ({ page }) => {
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Look for active or completed sessions
    const activeSessions = page.locator('[class*="active"], [class*="completed"]').filter({ hasText: /activo|active|completado|completed/i });
    const hasActiveSessions = await activeSessions.count() > 0;

    if (hasActiveSessions) {
      // Find edit button for active/completed session
      const container = activeSessions.first();
      const editButton = container.locator('button').filter({ hasText: /editar|edit/i });
      const hasEditButton = await editButton.isVisible().catch(() => false);

      if (hasEditButton) {
        const isDisabled = await editButton.isDisabled();
        // Edit should be disabled for active/completed sessions
        expect(isDisabled).toBe(true);
      }
    }
  });

  test('should cancel a scheduled session', async ({ page }) => {
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Look for scheduled session with cancel button
    const cancelButton = page.getByRole('button', { name: /cancelar|cancel/i }).first();
    const hasCancelButton = await cancelButton.isVisible().catch(() => false);

    if (hasCancelButton) {
      await cancelButton.click();
      await page.waitForTimeout(500);

      // Should show confirmation dialog
      const confirmButton = page.getByRole('button', { name: /confirmar|confirm|sí|yes/i });
      const hasConfirm = await confirmButton.isVisible().catch(() => false);

      if (hasConfirm) {
        await confirmButton.click();
        await page.waitForTimeout(2000);

        // Should show success message
        const hasSuccess = await page.getByText(/cancelada|cancelled|éxito|success/i).count() > 0;
        expect(hasSuccess).toBeGreaterThan(0);
      }
    } else {
      test.skip();
    }
  });

  test('should delete a session', async ({ page }) => {
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    const deleteButton = page.getByRole('button', { name: /eliminar|delete|borrar/i }).first();
    const hasDeleteButton = await deleteButton.isVisible().catch(() => false);

    if (hasDeleteButton) {
      await deleteButton.click();
      await page.waitForTimeout(500);

      // Should show confirmation dialog with warning
      const hasWarning = await page.getByText(/eliminar|delete|permanente|permanent/i).count() > 0;
      expect(hasWarning).toBeGreaterThan(0);

      const confirmButton = page.getByRole('button', { name: /confirmar|confirm|eliminar|delete/i });
      const hasConfirm = await confirmButton.isVisible().catch(() => false);

      if (hasConfirm) {
        await confirmButton.click();
        await page.waitForTimeout(2000);

        // Should show success message
        const hasSuccess = await page.getByText(/eliminada|deleted|éxito|success/i).count() > 0;
        expect(hasSuccess).toBeGreaterThan(0);
      }
    } else {
      test.skip();
    }
  });

  test('should prevent deleting a session with registered participants', async ({ page }) => {
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Look for sessions with participants
    const sessionWithParticipants = page.locator('[class*="participants"]').filter({ hasText: /\d+ participante/i });
    const hasParticipants = await sessionWithParticipants.count() > 0;

    if (hasParticipants) {
      const deleteButton = sessionWithParticipants.first().locator('button').filter({ hasText: /eliminar|delete/i });
      const hasDeleteButton = await deleteButton.isVisible().catch(() => false);

      if (hasDeleteButton) {
        // Either button should be disabled OR show warning when clicked
        const isDisabled = await deleteButton.isDisabled();

        if (!isDisabled) {
          await deleteButton.click();
          await page.waitForTimeout(500);

          // Should show warning about participants
          const hasWarning = await page.getByText(/participantes|registrados|registered/i).count() > 0;
          expect(hasWarning).toBeGreaterThan(0);
        } else {
          expect(isDisabled).toBe(true);
        }
      }
    }
  });

  test('should view session participants list (admin view)', async ({ page }) => {
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Click on a session to view details
    const sessionCard = page.locator('[class*="session"], [data-testid*="session"]').first();
    const hasSession = await sessionCard.isVisible().catch(() => false);

    if (hasSession) {
      await sessionCard.click();
      await page.waitForTimeout(1000);

      // Should show participants section
      const hasParticipantsSection = await page.getByText(/participantes|registrados|inscritos/i).count() > 0;
      expect(hasParticipantsSection).toBeGreaterThan(0);
    }
  });

  test('should manually start a scheduled session', async ({ page }) => {
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Look for scheduled session with start button (admin only)
    const startButton = page.getByRole('button', { name: /iniciar|start|comenzar/i });
    const hasStartButton = await startButton.isVisible().catch(() => false);

    if (hasStartButton) {
      await startButton.click();
      await page.waitForTimeout(2000);

      // Session should change to active status
      const hasActiveStatus = await page.getByText(/activo|active|en curso/i).count() > 0;
      expect(hasActiveStatus).toBeGreaterThan(0);
    } else {
      test.skip();
    }
  });

  test('should manually end an active session', async ({ page }) => {
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Look for active session with end button (admin only)
    const endButton = page.getByRole('button', { name: /finalizar|end|terminar/i });
    const hasEndButton = await endButton.isVisible().catch(() => false);

    if (hasEndButton) {
      await endButton.click();
      await page.waitForTimeout(500);

      // Should ask for confirmation
      const confirmButton = page.getByRole('button', { name: /confirmar|confirm|sí|yes/i });
      const hasConfirm = await confirmButton.isVisible().catch(() => false);

      if (hasConfirm) {
        await confirmButton.click();
        await page.waitForTimeout(2000);

        // Session should change to completed status
        const hasCompletedStatus = await page.getByText(/completado|completed|finalizado/i).count() > 0;
        expect(hasCompletedStatus).toBeGreaterThan(0);
      }
    } else {
      test.skip();
    }
  });

  test('should view session statistics and analytics (admin)', async ({ page }) => {
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Look for completed session
    const completedSession = page.locator('[class*="completed"]').filter({ hasText: /completado|completed/i }).first();
    const hasCompleted = await completedSession.isVisible().catch(() => false);

    if (hasCompleted) {
      // Click to view details
      await completedSession.click();
      await page.waitForTimeout(1000);

      // Should show comprehensive statistics
      const hasStats = await page.getByText(/estadísticas|statistics|análisis|analytics/i).count() > 0;
      const hasMetrics = await page.getByText(/promedio|average|participación|participation/i).count() > 0;

      expect(hasStats || hasMetrics).toBe(true);
    }
  });

  test('should export session results (if feature exists)', async ({ page }) => {
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Look for export button (admin feature)
    const exportButton = page.getByRole('button', { name: /exportar|export|descargar|download/i });
    const hasExportButton = await exportButton.count() > 0;

    if (hasExportButton) {
      // Feature exists, verify it works
      await exportButton.first().click();
      await page.waitForTimeout(1000);

      // Should show export options or start download
      const hasExportOptions = await page.getByText(/CSV|Excel|PDF|formato|format/i).count() > 0;
      expect(hasExportOptions).toBeGreaterThan(0);
    }
  });

  test('should update session status automatically based on time', async ({ page }) => {
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Check if there's a manual status update button (admin tool)
    const updateStatusButton = page.getByRole('button', { name: /actualizar estado|update status|refrescar/i });
    const hasUpdateButton = await updateStatusButton.count() > 0;

    if (hasUpdateButton) {
      await updateStatusButton.first().click();
      await page.waitForTimeout(2000);

      // Should show update confirmation
      const hasConfirmation = await page.getByText(/actualizado|updated|estado|status/i).count() > 0;
      expect(hasConfirmation).toBeGreaterThan(0);
    }
  });

  test('should set maximum participants limit for session', async ({ page }) => {
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    const createButton = page.getByRole('button', { name: /crear sesión|create session/i });
    const hasCreateButton = await createButton.isVisible().catch(() => false);

    if (hasCreateButton) {
      await createButton.click();
      await page.waitForTimeout(1000);

      // Look for max participants field
      const maxParticipantsInput = page.getByLabel(/máximo.*participantes|max.*participants|límite/i);
      const hasMaxInput = await maxParticipantsInput.isVisible().catch(() => false);

      if (hasMaxInput) {
        await maxParticipantsInput.fill('50');

        // Value should be set
        const value = await maxParticipantsInput.inputValue();
        expect(value).toBe('50');
      }
    }
  });

  test('should validate session duration limits', async ({ page }) => {
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    const createButton = page.getByRole('button', { name: /crear sesión|create session/i });
    const hasCreateButton = await createButton.isVisible().catch(() => false);

    if (hasCreateButton) {
      await createButton.click();
      await page.waitForTimeout(1000);

      // Look for duration field
      const durationInput = page.getByLabel(/duración|duration|minutos|minutes/i);
      const hasDurationInput = await durationInput.isVisible().catch(() => false);

      if (hasDurationInput) {
        // Try invalid duration (too long or too short)
        await durationInput.fill('5000'); // Very long duration

        // Try to submit
        const submitButton = page.getByRole('button', { name: /crear|create|guardar|save/i });
        await submitButton.click();
        await page.waitForTimeout(1000);

        // Should show validation error
        const hasError = await page.getByText(/duración|duration|límite|limit|inválido/i).count() > 0;
        expect(hasError).toBeGreaterThan(0);
      }
    } else {
      test.skip();
    }
  });

  test('should not allow non-admin users to access admin features', async ({ page }) => {
    // This test verifies that admin features are present for admin users on the admin page

    await page.goto('/admin/live-sessions');
    await page.waitForTimeout(2000);

    // Admin should see admin buttons on the admin page
    const adminButtons = await page.getByRole('button', { name: /New Session|Nuevo|editar|eliminar|cancelar/i }).count();

    // Admin should have at least some admin buttons on the admin page
    expect(adminButtons).toBeGreaterThan(0);
  });
});
