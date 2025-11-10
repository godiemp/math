import { test, expect } from '@playwright/test';

test.describe('Practice Mode - M1 Quiz Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as test student
    await page.goto('/');
    await page.fill('input[type="email"], input[name="email"], input[name="username"]', 'student@test.com');
    await page.fill('input[type="password"]', 'student123');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
  });

  test('should display M1 practice page with subject selection', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Check that the page header is visible
    await expect(page.getByText(/Práctica PAES.*Competencia Matemática M1/i)).toBeVisible();

    // Check that mode selection is visible (Step 1)
    await expect(page.getByText(/Paso 1.*Selecciona el modo de práctica/i)).toBeVisible();

    // Check that Zen and Rapidfire mode cards are visible
    await expect(page.getByTestId('mode-zen')).toBeVisible();
    await expect(page.getByTestId('mode-rapidfire')).toBeVisible();
  });

  test('should allow subject and mode selection flow', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Step 1: Select Zen mode
    await page.getByTestId('mode-zen').click();
    await page.waitForTimeout(500);

    // After selecting mode, subject selection (Step 2) should appear
    await expect(page.getByText(/Paso 2.*Selecciona una materia/i)).toBeVisible();

    // Check that subjects are visible
    await expect(page.getByTestId('subject-all')).toBeVisible();
    await expect(page.getByTestId('subject-números')).toBeVisible();
  });

  test('should complete a Zen mode quiz', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Step 1: Select Zen mode
    await page.getByTestId('mode-zen').click();
    await page.waitForTimeout(500);

    // Step 2: Select a subject (Todas las Materias)
    await page.getByTestId('subject-all').click();
    await page.waitForTimeout(500);

    // Should show "Comenzar Quiz" button
    const startButton = page.getByTestId('start-quiz-button');
    await expect(startButton).toBeVisible();

    // Click to start the quiz
    await startButton.click();
    await page.waitForTimeout(2000);

    // Wait for the Zen breathing animation to complete
    await page.waitForTimeout(5000);

    // Should see quiz questions
    await expect(page.getByTestId('question-counter')).toBeVisible();
    await expect(page.getByTestId('question-counter')).toContainText('Pregunta 1 de');

    // Answer the first question (select any option)
    const firstOption = page.locator('button').filter({ hasText: /^[A-E]\)/ }).first();
    await firstOption.click();
    await page.waitForTimeout(500);

    // Navigate to next question
    await page.getByRole('button', { name: /Siguiente/i }).click();
    await page.waitForTimeout(500);

    // Should be on question 2
    await expect(page.getByTestId('question-counter')).toContainText('Pregunta 2 de');
  });

  test('should show difficulty selection for Rapid Fire mode', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Step 1: Select Rapid Fire mode
    await page.getByTestId('mode-rapidfire').click();
    await page.waitForTimeout(500);

    // Step 2: Select a subject
    await page.getByTestId('subject-all').click();
    await page.waitForTimeout(500);

    // Step 3: Should show difficulty selection
    await expect(page.getByText(/Paso 3.*Selecciona la dificultad/i)).toBeVisible();

    // Check that difficulty levels are visible
    await expect(page.getByTestId('difficulty-easy')).toBeVisible();
    await expect(page.getByTestId('difficulty-medium')).toBeVisible();
    await expect(page.getByTestId('difficulty-hard')).toBeVisible();
    await expect(page.getByTestId('difficulty-extreme')).toBeVisible();
  });

  test('should start Rapid Fire quiz with selected difficulty', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Step 1: Select Rapid Fire mode
    await page.getByTestId('mode-rapidfire').click();
    await page.waitForTimeout(500);

    // Step 2: Select a subject
    await page.getByTestId('subject-all').click();
    await page.waitForTimeout(500);

    // Step 3: Select difficulty (Fácil)
    await page.getByTestId('difficulty-easy').click();
    await page.waitForTimeout(500);

    // Should show "Comenzar Quiz" button
    const startButton = page.getByTestId('start-quiz-button');
    await expect(startButton).toBeVisible();

    // Click to start the quiz
    await startButton.click();
    await page.waitForTimeout(2000);

    // Wait for the countdown animation (3-2-1-GO!)
    await page.waitForTimeout(5000);

    // Should see quiz questions with timer
    await expect(page.getByTestId('question-counter')).toBeVisible();
    await expect(page.getByTestId('question-counter')).toContainText('Pregunta 1 de');

    // Should see timer indicator
    await expect(page.locator('text=⚡')).toBeVisible();
  });
});
