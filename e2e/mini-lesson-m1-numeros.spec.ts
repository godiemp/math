import { test, expect } from '@playwright/test';

test.describe('Mini Lesson - M1 Números Enteros Orden', () => {
  // No beforeEach needed - authentication is handled via storageState in playwright.config.ts

  test('should load the lesson and display Step 1 (Hook)', async ({ page }) => {
    // Navigate to the lesson
    await page.goto('/lessons/m1/numeros-enteros-orden', { waitUntil: 'domcontentloaded' });

    // Check lesson title is visible
    await expect(page.getByText('Orden y Valor Absoluto')).toBeVisible();

    // Check Step 1 header
    await expect(page.getByText('El Termómetro Loco')).toBeVisible();

    // Check the question is displayed
    await expect(page.getByText('¿Cuál temperatura está más lejos de 0°C?')).toBeVisible();

    // Check that both city options are visible
    await expect(page.getByText('Punta Arenas')).toBeVisible();
    await expect(page.getByText('Santiago')).toBeVisible();

    // Check temperature values are displayed
    await expect(page.getByText('-5°C')).toBeVisible();
    await expect(page.getByText('25°C')).toBeVisible();
  });

  test('should complete Step 1 (Hook) with correct answer', async ({ page }) => {
    await page.goto('/lessons/m1/numeros-enteros-orden', { waitUntil: 'domcontentloaded' });

    // Wait for the lesson to load
    await expect(page.getByText('El Termómetro Loco')).toBeVisible();

    // Select Santiago (correct answer - 25 is farther from 0 than -5)
    await page.getByText('Santiago').click();

    // Click "Ver Respuesta" button
    await page.getByRole('button', { name: 'Ver Respuesta' }).click();

    // Should show correct feedback
    await expect(page.getByText('¡Correcto!')).toBeVisible();

    // Should show explanation
    await expect(page.getByText(/Santiago.*25°C.*está más lejos de 0°C/)).toBeVisible();

    // Should show insight about absolute value
    await expect(page.getByText(/valor absoluto/i)).toBeVisible();

    // Click Continue to go to Step 2
    await page.getByRole('button', { name: 'Continuar' }).click();

    // Should be on Step 2 - check for Step 2 content (La Recta Numérica)
    await expect(page.getByText('Paso 2 de 6')).toBeVisible();
  });

  test('should complete Step 1 (Hook) with wrong answer', async ({ page }) => {
    await page.goto('/lessons/m1/numeros-enteros-orden', { waitUntil: 'domcontentloaded' });

    // Wait for the lesson to load
    await expect(page.getByText('El Termómetro Loco')).toBeVisible();

    // Select Punta Arenas (incorrect answer)
    await page.getByText('Punta Arenas').click();

    // Click "Ver Respuesta" button
    await page.getByRole('button', { name: 'Ver Respuesta' }).click();

    // Should show "almost" feedback (not incorrect, still encouraging)
    await expect(page.getByText('¡Casi!')).toBeVisible();

    // Should still show explanation
    await expect(page.getByText(/Santiago.*25°C.*está más lejos de 0°C/)).toBeVisible();

    // Continue button should still be available
    await expect(page.getByRole('button', { name: 'Continuar' })).toBeVisible();
  });

  test('should navigate through all steps', async ({ page }) => {
    await page.goto('/lessons/m1/numeros-enteros-orden', { waitUntil: 'domcontentloaded' });

    // Step 1: Complete the Hook
    await page.getByText('Santiago').click();
    await page.getByRole('button', { name: 'Ver Respuesta' }).click();
    await page.getByRole('button', { name: 'Continuar' }).click();

    // Step 2: La Recta Numérica - should auto-advance or have continue
    await expect(page.getByText('Paso 2 de 6')).toBeVisible();

    // Use back button to verify navigation
    const backButton = page.locator('button').filter({ hasText: 'Anterior' }).first();
    await backButton.click();

    // Should be back on Step 1
    await expect(page.getByText('Paso 1 de 6')).toBeVisible();

    // Go forward again
    await page.getByText('Santiago').click();
    await page.getByRole('button', { name: 'Ver Respuesta' }).click();
    await page.getByRole('button', { name: 'Continuar' }).click();

    // Should be on Step 2 again
    await expect(page.getByText('Paso 2 de 6')).toBeVisible();
  });

  test('should display progress bar and step indicators', async ({ page }) => {
    await page.goto('/lessons/m1/numeros-enteros-orden', { waitUntil: 'domcontentloaded' });

    // Check progress indicator shows correct step
    await expect(page.getByText('Paso 1 de 6')).toBeVisible();

    // Complete Step 1 to check progress updates
    await page.getByText('Santiago').click();
    await page.getByRole('button', { name: 'Ver Respuesta' }).click();
    await page.getByRole('button', { name: 'Continuar' }).click();

    // Progress should now show Step 2
    await expect(page.getByText('Paso 2 de 6')).toBeVisible();
  });

  test('should complete the full lesson with checkpoint quiz', async ({ page }) => {
    // Increase timeout for full lesson completion
    test.setTimeout(90000);

    await page.goto('/lessons/m1/numeros-enteros-orden', { waitUntil: 'domcontentloaded' });

    // Step 1: Complete the Hook
    await page.getByText('Santiago').click();
    await page.getByRole('button', { name: 'Ver Respuesta' }).click();
    await page.getByRole('button', { name: 'Continuar' }).click();

    // Step 2-5: Navigate through interactive steps
    // These steps may have "Continuar" buttons or auto-complete behavior
    // We'll look for and click continue/complete buttons as they appear

    // Navigate through remaining steps
    for (let step = 2; step <= 5; step++) {
      // Wait for the step to load
      await expect(page.getByText(`Paso ${step} de 6`)).toBeVisible({ timeout: 5000 });

      // Look for any continue/next button to advance
      const continueButton = page.getByRole('button', { name: /Continuar|Siguiente|Entendido/i });
      const nextButton = page.locator('button').filter({ hasText: 'Siguiente' }).first();

      // Try to find and click a continue button
      if (await continueButton.isVisible().catch(() => false)) {
        await continueButton.click();
      } else if (await nextButton.isVisible().catch(() => false)) {
        await nextButton.click();
      } else {
        // Some steps may require interaction - look for interactive elements
        // For now, wait a moment for auto-advance or find the next navigation
        await page.waitForTimeout(1000);

        // Try footer navigation if available
        const footerNext = page.locator('.fixed button').filter({ hasText: /Siguiente/i });
        if (await footerNext.isVisible().catch(() => false)) {
          await footerNext.click();
        }
      }
    }

    // Step 6: Checkpoint Quiz
    await expect(page.getByText('Paso 6 de 6')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Checkpoint Final')).toBeVisible();

    // Answer the 4 checkpoint questions (need 3/4 correct)
    const answers = [
      0, // Q1: -5, -1, 0, 2, 4 (correct ordering)
      1, // Q2: -3 is greater than -7
      1, // Q3: |-8| = 8
      2, // Q4: x = 5 and -5
    ];

    for (let i = 0; i < 4; i++) {
      // Wait for question to load
      await expect(page.getByText(`Pregunta ${i + 1} de 4`)).toBeVisible({ timeout: 5000 });

      // Select the answer (option button by letter)
      const optionLetter = String.fromCharCode(65 + answers[i]); // A, B, C, or D
      const optionButton = page.locator('button').filter({ has: page.locator(`text="${optionLetter}"`) }).first();

      // Click the option
      await optionButton.click();

      // Click "Verificar"
      await page.getByRole('button', { name: 'Verificar' }).click();

      // Wait for feedback
      await page.waitForTimeout(500);

      // Click next (or "Ver Resultados" on last question)
      if (i < 3) {
        await page.getByRole('button', { name: 'Siguiente Pregunta' }).click();
      } else {
        await page.getByRole('button', { name: 'Ver Resultados' }).click();
      }
    }

    // Should show completion results
    await expect(page.getByText('¡Felicitaciones!')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('4 / 4')).toBeVisible();

    // Click to complete lesson
    await page.getByRole('button', { name: 'Completar Lección' }).click();

    // Should show celebration modal
    await expect(page.getByText('¡Lección Completada!')).toBeVisible({ timeout: 5000 });

    // Click to finish and redirect
    await page.getByRole('button', { name: 'Finalizar' }).click();

    // Should redirect to mini-lessons page
    await page.waitForURL('**/mini-lessons', { timeout: 10000 });
  });

  test('should allow exit from lesson', async ({ page }) => {
    await page.goto('/lessons/m1/numeros-enteros-orden', { waitUntil: 'domcontentloaded' });

    // Wait for lesson to load
    await expect(page.getByText('El Termómetro Loco')).toBeVisible();

    // Click the back/exit button (shows "Salir" on first step)
    const exitButton = page.locator('button').filter({ hasText: 'Salir' }).first();
    await exitButton.click();

    // Should redirect to mini-lessons page
    await page.waitForURL('**/mini-lessons', { timeout: 10000 });
  });
});
