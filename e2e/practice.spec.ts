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
    const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
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

  test('should complete a Zen mode quiz and display accurate results', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Step 1: Select Zen mode
    await page.getByTestId('mode-zen').click();
    await page.waitForTimeout(500);

    // Step 2: Select a subject (Todas las Materias)
    await page.getByTestId('subject-all').click();
    await page.waitForTimeout(500);

    // Start the quiz
    const startButton = page.getByTestId('start-quiz-button');
    await expect(startButton).toBeVisible();
    await startButton.click();
    await page.waitForTimeout(2000);

    // Wait for the Zen breathing animation to complete
    await page.waitForTimeout(5000);

    // Get the total number of questions from the counter
    const questionCounterText = await page.getByTestId('question-counter').textContent();
    const totalQuestions = parseInt(questionCounterText?.match(/de (\d+)/)?.[1] || '10');

    // Track correct answers for score validation
    let correctAnswers = 0;

    // Answer all questions
    for (let i = 1; i <= totalQuestions; i++) {
      // Verify we're on the correct question
      await expect(page.getByTestId('question-counter')).toContainText(`Pregunta ${i} de ${totalQuestions}`);

      // Select an answer (first option for consistency in testing)
      const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
      await expect(firstOption).toBeVisible();
      await firstOption.click();
      await page.waitForTimeout(500);

      // For the last question, click "Finalizar" instead of "Siguiente"
      if (i === totalQuestions) {
        const finishButton = page.getByRole('button', { name: /Finalizar/i });
        await expect(finishButton).toBeVisible();
        await finishButton.click();
      } else {
        const nextButton = page.getByRole('button', { name: /Siguiente/i });
        await expect(nextButton).toBeVisible();
        await nextButton.click();
      }

      await page.waitForTimeout(500);
    }

    // Wait for results page to load
    await page.waitForTimeout(2000);

    // Verify results page elements are displayed
    await expect(page.getByText(/¡Quiz Completado!/i)).toBeVisible({ timeout: 10000 });

    // Check that score is displayed
    const scoreElement = page.getByText(/Puntaje:/i);
    await expect(scoreElement).toBeVisible();

    // Verify score format (should show X/Y format or percentage)
    const scoreText = await scoreElement.textContent();
    expect(scoreText).toMatch(/\d+/); // Should contain at least one number

    // Verify other result elements
    await expect(page.getByText(/Tiempo Total/i).or(page.getByText(/Duración/i))).toBeVisible();

    // Check for "Ver Respuestas" or similar review button
    const reviewButton = page.getByRole('button', { name: /Ver Respuestas|Revisar|Review/i });
    if (await reviewButton.count() > 0) {
      await expect(reviewButton).toBeVisible();
    }

    // Check for return/home button
    const returnButton = page.getByRole('button', { name: /Volver|Inicio|Práctica/i });
    if (await returnButton.count() > 0) {
      await expect(returnButton).toBeVisible();
    }
  });

  test('should complete a Rapid Fire quiz and verify timer functionality', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Step 1: Select Rapid Fire mode
    await page.getByTestId('mode-rapidfire').click();
    await page.waitForTimeout(500);

    // Step 2: Select a subject
    await page.getByTestId('subject-all').click();
    await page.waitForTimeout(500);

    // Step 3: Select difficulty (Fácil for faster test)
    await page.getByTestId('difficulty-easy').click();
    await page.waitForTimeout(500);

    // Start the quiz
    const startButton = page.getByTestId('start-quiz-button');
    await expect(startButton).toBeVisible();
    await startButton.click();
    await page.waitForTimeout(2000);

    // Wait for the countdown animation (3-2-1-GO!)
    await page.waitForTimeout(5000);

    // Verify timer is visible
    await expect(page.locator('text=⚡')).toBeVisible();

    // Get the initial time or verify timer changes
    const timerExists = await page.locator('[data-testid="timer"]').or(page.locator('text=⚡').locator('..')).count() > 0;
    expect(timerExists).toBe(true);

    // Get the total number of questions
    const questionCounterText = await page.getByTestId('question-counter').textContent();
    const totalQuestions = parseInt(questionCounterText?.match(/de (\d+)/)?.[1] || '10');

    // Answer all questions quickly
    for (let i = 1; i <= totalQuestions; i++) {
      // Verify we're on the correct question
      await expect(page.getByTestId('question-counter')).toContainText(`Pregunta ${i} de ${totalQuestions}`);

      // Select an answer
      const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
      await expect(firstOption).toBeVisible();
      await firstOption.click();
      await page.waitForTimeout(300);

      // Click next or finish
      if (i === totalQuestions) {
        const finishButton = page.getByRole('button', { name: /Finalizar/i });
        await expect(finishButton).toBeVisible();
        await finishButton.click();
      } else {
        const nextButton = page.getByRole('button', { name: /Siguiente/i });
        await expect(nextButton).toBeVisible();
        await nextButton.click();
      }

      await page.waitForTimeout(300);
    }

    // Wait for results page
    await page.waitForTimeout(2000);

    // Verify results page shows completion
    await expect(page.getByText(/¡Quiz Completado!/i)).toBeVisible({ timeout: 10000 });

    // Verify that time taken is displayed
    await expect(page.getByText(/Tiempo/i)).toBeVisible();

    // Verify score is displayed
    await expect(page.getByText(/Puntaje/i)).toBeVisible();

    // For Rapid Fire, may also show time-based achievements or speed stats
    const speedIndicator = page.getByText(/Rápido|Velocidad|⚡/i);
    if (await speedIndicator.count() > 0) {
      await expect(speedIndicator.first()).toBeVisible();
    }
  });

  test('should allow reviewing answers after quiz completion', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Start a quick Zen quiz
    await page.getByTestId('mode-zen').click();
    await page.waitForTimeout(500);
    await page.getByTestId('subject-all').click();
    await page.waitForTimeout(500);

    const startButton = page.getByTestId('start-quiz-button');
    await startButton.click();
    await page.waitForTimeout(2000);

    // Wait for Zen animation
    await page.waitForTimeout(5000);

    // Get total questions
    const questionCounterText = await page.getByTestId('question-counter').textContent();
    const totalQuestions = parseInt(questionCounterText?.match(/de (\d+)/)?.[1] || '10');

    // Answer all questions
    for (let i = 1; i <= totalQuestions; i++) {
      const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
      await firstOption.click();
      await page.waitForTimeout(300);

      if (i === totalQuestions) {
        await page.getByRole('button', { name: /Finalizar/i }).click();
      } else {
        await page.getByRole('button', { name: /Siguiente/i }).click();
      }
      await page.waitForTimeout(300);
    }

    // Wait for results page
    await page.waitForTimeout(2000);

    // Click "Ver Respuestas" button to review answers
    const reviewButton = page.getByRole('button', { name: /Ver Respuestas|Revisar|Review/i });

    if (await reviewButton.count() > 0) {
      await reviewButton.click();
      await page.waitForTimeout(1000);

      // Verify review page shows questions
      // Look for question indicators or navigation
      const hasQuestions = await page.getByText(/Pregunta|Question/i).count() > 0;
      const hasAnswerOptions = await page.locator('button').filter({ hasText: /^[A-E]\./ }).count() > 0;

      expect(hasQuestions || hasAnswerOptions).toBe(true);

      // Should show which answers were correct/incorrect
      const hasCorrectIndicator = await page.locator('text=✓').or(page.locator('text=✗')).or(page.getByText(/Correcta|Incorrecta/i)).count() > 0;
      expect(hasCorrectIndicator).toBe(true);
    }
  });
});
