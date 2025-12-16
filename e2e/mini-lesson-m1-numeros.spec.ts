import { test, expect } from '@playwright/test';

test.describe('Mini Lesson - M1 Números Enteros Orden', () => {
  // No beforeEach needed - authentication is handled via storageState in playwright.config.ts

  test('should load the lesson and display Step 1 (Hook)', async ({ page }) => {
    // Navigate to the lesson
    await page.goto('/lessons/m1/numeros-enteros-orden', { waitUntil: 'domcontentloaded' });

    // Check lesson title is visible in the header
    await expect(page.getByRole('heading', { name: 'Orden y Valor Absoluto' })).toBeVisible();

    // Check Step 1 header (use getByRole to avoid matching progress text)
    await expect(page.getByRole('heading', { name: 'El Termómetro Loco' })).toBeVisible();

    // Check the question is displayed
    await expect(page.getByText('¿Cuál temperatura está más lejos de 0°C?')).toBeVisible();

    // Check that both city options are visible
    await expect(page.getByText('Punta Arenas')).toBeVisible();
    await expect(page.getByText('Santiago')).toBeVisible();

    // Check temperature values are displayed
    await expect(page.getByText('-5°C')).toBeVisible();
    await expect(page.getByText('25°C')).toBeVisible();

    // Check progress indicator
    await expect(page.getByText('Paso 1 de 6')).toBeVisible();
  });

  test('should complete Step 1 (Hook) with correct answer', async ({ page }) => {
    await page.goto('/lessons/m1/numeros-enteros-orden', { waitUntil: 'domcontentloaded' });

    // Wait for the lesson to load
    await expect(page.getByRole('heading', { name: 'El Termómetro Loco' })).toBeVisible();

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
    await expect(page.getByRole('heading', { name: 'La Recta Numérica' })).toBeVisible();
  });

  test('should complete Step 1 (Hook) with wrong answer', async ({ page }) => {
    await page.goto('/lessons/m1/numeros-enteros-orden', { waitUntil: 'domcontentloaded' });

    // Wait for the lesson to load
    await expect(page.getByRole('heading', { name: 'El Termómetro Loco' })).toBeVisible();

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

  test('should navigate back from Step 2 to Step 1', async ({ page }) => {
    await page.goto('/lessons/m1/numeros-enteros-orden', { waitUntil: 'domcontentloaded' });

    // Step 1: Complete the Hook
    await page.getByText('Santiago').click();
    await page.getByRole('button', { name: 'Ver Respuesta' }).click();
    await page.getByRole('button', { name: 'Continuar' }).click();

    // Step 2: La Recta Numérica
    await expect(page.getByText('Paso 2 de 6')).toBeVisible();

    // Use back button to verify navigation
    const backButton = page.locator('button').filter({ hasText: 'Anterior' }).first();
    await backButton.click();

    // Should be back on Step 1
    await expect(page.getByText('Paso 1 de 6')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'El Termómetro Loco' })).toBeVisible();
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

  test('should allow exit from lesson', async ({ page }) => {
    await page.goto('/lessons/m1/numeros-enteros-orden', { waitUntil: 'domcontentloaded' });

    // Wait for lesson to load
    await expect(page.getByRole('heading', { name: 'El Termómetro Loco' })).toBeVisible();

    // Click the back/exit button (shows "Salir" on first step)
    const exitButton = page.locator('button').filter({ hasText: 'Salir' }).first();
    await exitButton.click();

    // Should redirect to mini-lessons page
    await page.waitForURL('**/mini-lessons', { timeout: 10000 });
  });
});
