import { test, expect } from '@playwright/test';

test.describe('Adaptive Practice', () => {
  test('should display topic selection page', async ({ page }) => {
    await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });

    // Check page title
    await expect(page.getByText('Práctica Adaptativa')).toBeVisible();

    // Check topic cards are visible
    await expect(page.getByText('Números')).toBeVisible();
    await expect(page.getByText('Álgebra y Funciones')).toBeVisible();
    await expect(page.getByText('Geometría')).toBeVisible();
    await expect(page.getByText('Probabilidades y Estadística')).toBeVisible();
    await expect(page.getByText('Sorpréndeme')).toBeVisible();
  });

  test('should start practice when topic is selected', async ({ page }) => {
    await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });

    // Click on a topic (Números)
    await page.getByText('Números').click();

    // Should show problem display - wait for "Verificar Respuesta" button
    const submitButton = page.getByRole('button', { name: /Verificar Respuesta/i });
    await expect(submitButton).toBeVisible({ timeout: 10000 });
  });

  test('should save attempt when answering a question', async ({ page }) => {
    // Set up route interception to capture the attempt API call
    let attemptSaved = false;
    let attemptPayload: Record<string, unknown> | null = null;

    await page.route('**/api/adaptive/attempt', async (route) => {
      attemptSaved = true;
      const request = route.request();
      attemptPayload = request.postDataJSON();

      // Continue with the actual request
      await route.continue();
    });

    await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });

    // Select a topic
    await page.getByText('Números').click();

    // Wait for problem to load - "Verificar Respuesta" button indicates problem is ready
    const submitButton = page.getByRole('button', { name: /Verificar Respuesta/i });
    await expect(submitButton).toBeVisible({ timeout: 10000 });

    // Find and click an option button (buttons with letter spans A-E)
    // Option buttons have a span with single letter and are not action buttons
    const optionButton = page.locator('button').filter({
      has: page.locator('span.rounded-full'),
    }).first();
    await optionButton.click();

    // Click "Verificar Respuesta" button
    await submitButton.click();

    // Wait for feedback to appear (correct or incorrect)
    const feedback = page.getByText(/¡Correcto!|Incorrecto/i);
    await expect(feedback).toBeVisible({ timeout: 5000 });

    // Verify that the attempt was saved
    expect(attemptSaved).toBe(true);

    // Verify the payload has required fields
    expect(attemptPayload).not.toBeNull();
    expect(attemptPayload).toHaveProperty('questionId');
    expect(attemptPayload).toHaveProperty('subject');
    expect(attemptPayload).toHaveProperty('userAnswer');
    expect(attemptPayload).toHaveProperty('correctAnswer');
    expect(attemptPayload).toHaveProperty('isCorrect');
  });

  test('should allow navigating to next problem', async ({ page }) => {
    await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });

    // Select a topic
    await page.getByText('Álgebra y Funciones').click();

    // Wait for problem to load
    const submitButton = page.getByRole('button', { name: /Verificar Respuesta/i });
    await expect(submitButton).toBeVisible({ timeout: 10000 });

    // Click an option button
    const optionButton = page.locator('button').filter({
      has: page.locator('span.rounded-full'),
    }).first();
    await optionButton.click();

    // Submit answer
    await submitButton.click();

    // Wait for feedback
    await expect(page.getByText(/¡Correcto!|Incorrecto/i)).toBeVisible({ timeout: 5000 });

    // Click "Siguiente Problema"
    const nextButton = page.getByRole('button', { name: /Siguiente Problema/i });
    await expect(nextButton).toBeVisible();
    await nextButton.click();

    // Should show new problem - verify submit button is back
    await expect(submitButton).toBeVisible({ timeout: 5000 });
  });

  test('should allow changing topic', async ({ page }) => {
    await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });

    // Select a topic
    await page.getByText('Geometría').click();

    // Wait for problem to load
    const submitButton = page.getByRole('button', { name: /Verificar Respuesta/i });
    await expect(submitButton).toBeVisible({ timeout: 10000 });

    // Click "Cambiar tema" button
    const changeTopicButton = page.getByRole('button', { name: /Cambiar tema/i });
    await expect(changeTopicButton).toBeVisible();
    await changeTopicButton.click();

    // Should be back on topic selection
    await expect(page.getByText('Práctica Adaptativa')).toBeVisible();
    await expect(page.getByText('Números')).toBeVisible();
  });

  test('should display AI tutor chat panel', async ({ page }) => {
    await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });

    // Select a topic
    await page.getByText('Probabilidades y Estadística').click();

    // Wait for problem to load
    const submitButton = page.getByRole('button', { name: /Verificar Respuesta/i });
    await expect(submitButton).toBeVisible({ timeout: 10000 });

    // Check chat panel is visible
    await expect(page.getByText('Tutor AI')).toBeVisible();
    await expect(page.getByText('Pregunta si necesitas ayuda')).toBeVisible();

    // Check chat input is present
    const chatInput = page.getByPlaceholder(/Escribe tu pregunta/i);
    await expect(chatInput).toBeVisible();
  });
});
