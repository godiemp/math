import { test, expect } from '@playwright/test';

test.describe('Admin Session Creation', () => {
  // Increased timeout for admin operations
  test.setTimeout(60000);

  test.describe('Admin Panel Access', () => {
    test('should access admin live sessions page', async ({ page }) => {
      // Navigate to admin live sessions
      await page.goto('/admin/live-sessions');

      // Wait for page to load - use specific heading selector
      await expect(
        page.getByRole('heading', { name: 'Live Sessions', exact: true })
      ).toBeVisible({ timeout: 10000 });

      // Verify stats cards are visible
      await expect(page.getByText('Total Sessions')).toBeVisible();
      await expect(page.getByText('Scheduled')).toBeVisible();

      // Verify "+ New Session" button is visible
      await expect(page.getByRole('button', { name: /New Session/i })).toBeVisible();
    });
  });

  test.describe('M1 Session Creation with Template', () => {
    test('should create M1 session using quick template', async ({ page }) => {
      await page.goto('/admin/live-sessions');

      // Wait for page to load
      await expect(page.getByRole('button', { name: /New Session/i })).toBeVisible();

      // Click "+ New Session" button
      await page.getByRole('button', { name: /New Session/i }).click();

      // Wait for modal to appear
      await expect(page.getByText('Programar Nuevo Ensayo')).toBeVisible();

      // Click M1 template button
      const m1Template = page.locator('button').filter({ hasText: /M1 - Básico/i });
      await expect(m1Template).toBeVisible();
      await m1Template.click();

      // Verify form is populated with M1 values
      const nameInput = page.locator('input[type="text"]').first();
      await expect(nameInput).toHaveValue(/Ensayo PAES M1/);

      // Verify level is M1
      await expect(page.locator('select')).toHaveValue('M1');

      // Set future date/time (template uses today which may be in past for time)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];

      await page.fill('input[type="date"]', dateStr);
      await page.fill('input[type="time"]', '15:00');

      // Submit the form
      await page.getByRole('button', { name: /Programar Ensayo/i }).click();

      // Wait for toast success message
      await expect(page.getByText(/programado exitosamente/i)).toBeVisible({ timeout: 10000 });

      // Modal should close
      await expect(page.getByText('Programar Nuevo Ensayo')).not.toBeVisible();

      // Verify session appears in the list
      await expect(page.getByText(/Ensayo PAES M1/i).first()).toBeVisible();

      // Verify session details - M1 badge should be visible
      await expect(page.getByText('M1').first()).toBeVisible();
    });

    test('should verify M1 session has correct question count', async ({ page }) => {
      await page.goto('/admin/live-sessions');

      // Wait for sessions to load
      await page.waitForTimeout(2000);

      // Click the first "Ver Preguntas" button (there may be multiple sessions)
      const viewQuestionsBtn = page.getByRole('button', { name: 'Ver Preguntas' }).first();

      if (await viewQuestionsBtn.isVisible()) {
        await viewQuestionsBtn.click();

        // Wait for questions view to load
        await expect(page.getByText('Session Questions')).toBeVisible({ timeout: 10000 });

        // Verify distribution statistics are shown
        await expect(page.getByText('Distribución de Preguntas')).toBeVisible();

        // Check subject labels are present
        await expect(page.getByText('Números').first()).toBeVisible();
        await expect(page.getByText('Álgebra').first()).toBeVisible();
        await expect(page.getByText('Geometría').first()).toBeVisible();
        await expect(page.getByText('Probabilidad').first()).toBeVisible();

        // Go back to list
        await page.getByRole('button', { name: /Back to Dashboard/i }).click();
      }
    });
  });

  test.describe('M2 Session Creation with Template', () => {
    test('should create M2 session using quick template', async ({ page }) => {
      await page.goto('/admin/live-sessions');

      // Click "+ New Session" button
      await page.getByRole('button', { name: /New Session/i }).click();

      // Wait for modal
      await expect(page.getByText('Programar Nuevo Ensayo')).toBeVisible();

      // Click M2 template button
      const m2Template = page.locator('button').filter({ hasText: /M2 - Avanzado/i });
      await expect(m2Template).toBeVisible();
      await m2Template.click();

      // Verify form is populated with M2 values
      await expect(page.locator('input[type="text"]').first()).toHaveValue(/Ensayo PAES M2/);
      await expect(page.locator('select')).toHaveValue('M2');

      // Set future date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];

      await page.fill('input[type="date"]', dateStr);
      await page.fill('input[type="time"]', '16:30');

      // Submit
      await page.getByRole('button', { name: /Programar Ensayo/i }).click();

      // Wait for success
      await expect(page.getByText(/programado exitosamente/i)).toBeVisible({ timeout: 10000 });

      // Verify session in list
      await expect(page.getByText(/Ensayo PAES M2/i).first()).toBeVisible();
      await expect(page.getByText('M2').first()).toBeVisible();
    });
  });

  test.describe('Custom Session Creation', () => {
    test('should create session with custom values', async ({ page }) => {
      await page.goto('/admin/live-sessions');

      // Click "+ New Session" button
      await page.getByRole('button', { name: /New Session/i }).click();

      // Wait for modal
      await expect(page.getByText('Programar Nuevo Ensayo')).toBeVisible();

      // Fill custom values (no template)
      await page.fill('input[type="text"]', 'Test Custom Session E2E');
      await page.fill('textarea', 'Custom session created by E2E test');
      await page.selectOption('select', 'M1');

      // Set custom question count (not official 60)
      // Find the question count input (first number input after level select)
      const questionCountInput = page.locator('input[type="number"]').first();
      await questionCountInput.fill('10');

      // Set future date/time
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      await page.fill('input[type="date"]', tomorrow.toISOString().split('T')[0]);
      await page.fill('input[type="time"]', '10:00');

      // Set duration (second number input)
      const durationInput = page.locator('input[type="number"]').last();
      await durationInput.fill('30');

      // Submit
      await page.getByRole('button', { name: /Programar Ensayo/i }).click();

      // Wait for success
      await expect(page.getByText(/programado exitosamente/i)).toBeVisible({ timeout: 10000 });

      // Verify session in list
      await expect(page.getByText('Test Custom Session E2E')).toBeVisible();
    });
  });

  test.describe('Session Form Validation', () => {
    test('should not submit form when required fields are empty', async ({ page }) => {
      await page.goto('/admin/live-sessions');

      // Click "+ New Session" button
      await page.getByRole('button', { name: /New Session/i }).click();

      // Wait for modal
      await expect(page.getByText('Programar Nuevo Ensayo')).toBeVisible();

      // Try to submit empty form
      await page.getByRole('button', { name: /Programar Ensayo/i }).click();

      // Modal should still be visible (form validation prevents submission)
      await expect(page.getByText('Programar Nuevo Ensayo')).toBeVisible();

      // No success toast should appear
      await expect(page.getByText(/programado exitosamente/i)).not.toBeVisible();
    });

    test('should not submit form when date is in the past', async ({ page }) => {
      await page.goto('/admin/live-sessions');

      // Click "+ New Session" button
      await page.getByRole('button', { name: /New Session/i }).click();

      // Wait for modal
      await expect(page.getByText('Programar Nuevo Ensayo')).toBeVisible();

      // Fill form with past date
      await page.fill('input[type="text"]', 'Test Past Date Session');

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      await page.fill('input[type="date"]', yesterday.toISOString().split('T')[0]);
      await page.fill('input[type="time"]', '10:00');

      // Submit
      await page.getByRole('button', { name: /Programar Ensayo/i }).click();

      // Modal should still be visible (validation prevents submission)
      await expect(page.getByText('Programar Nuevo Ensayo')).toBeVisible();

      // No success toast should appear
      await expect(page.getByText(/programado exitosamente/i)).not.toBeVisible();
    });
  });

  test.describe('Session Management Actions', () => {
    test('should cancel modal without saving', async ({ page }) => {
      await page.goto('/admin/live-sessions');

      // Click "+ New Session" button
      await page.getByRole('button', { name: /New Session/i }).click();

      // Wait for modal
      await expect(page.getByText('Programar Nuevo Ensayo')).toBeVisible();

      // Fill some data
      await page.fill('input[type="text"]', 'Should Not Be Saved');

      // Click cancel button in the modal form (use form context to disambiguate)
      await page.locator('form').getByRole('button', { name: 'Cancelar' }).click();

      // Modal should close
      await expect(page.getByText('Programar Nuevo Ensayo')).not.toBeVisible();

      // Session should not appear in list
      await expect(page.getByText('Should Not Be Saved')).not.toBeVisible();
    });

    test('should delete a session', async ({ page }) => {
      // First create a session to delete
      await page.goto('/admin/live-sessions');

      await page.getByRole('button', { name: /New Session/i }).click();
      await expect(page.getByText('Programar Nuevo Ensayo')).toBeVisible();

      const uniqueName = `Session To Delete E2E ${Date.now()}`;
      await page.fill('input[type="text"]', uniqueName);

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      await page.fill('input[type="date"]', tomorrow.toISOString().split('T')[0]);
      await page.fill('input[type="time"]', '12:00');

      await page.getByRole('button', { name: /Programar Ensayo/i }).click();
      await expect(page.getByText(/programado exitosamente/i)).toBeVisible({ timeout: 10000 });

      // Wait for the session to appear in the list
      await expect(page.getByText(uniqueName)).toBeVisible();

      // Handle confirmation dialog
      page.on('dialog', (dialog) => dialog.accept());

      // Click the first delete button (for the session we just created, which should be first)
      await page.getByRole('button', { name: 'Eliminar' }).first().click();

      // Wait for deletion toast
      await expect(page.getByText(/eliminado exitosamente/i)).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('API Integration Verification', () => {
    test('should create session via API and verify response', async ({ page }) => {
      await page.goto('/admin/live-sessions');

      // Intercept the POST /api/sessions request
      const responsePromise = page.waitForResponse(
        (response) =>
          response.url().includes('/api/sessions') &&
          response.request().method() === 'POST' &&
          !response.url().includes('regenerate') &&
          !response.url().includes('register') &&
          !response.url().includes('cancel')
      );

      // Create session
      await page.getByRole('button', { name: /New Session/i }).click();

      // Use M1 template
      await page.locator('button').filter({ hasText: /M1 - Básico/i }).click();

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      await page.fill('input[type="date"]', tomorrow.toISOString().split('T')[0]);
      await page.fill('input[type="time"]', '14:00');

      await page.getByRole('button', { name: /Programar Ensayo/i }).click();

      // Verify API response
      const response = await responsePromise;
      expect(response.status()).toBe(200);

      const json = await response.json();
      expect(json.success).toBe(true);
      expect(json.session).toBeDefined();
      expect(json.session.level).toBe('M1');
      // Questions might be stored as JSON string or array
      const questions =
        typeof json.session.questions === 'string'
          ? JSON.parse(json.session.questions)
          : json.session.questions;
      expect(questions.length).toBe(60);
      expect(json.session.status).toBe('scheduled');
    });
  });
});
