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

    // Answer all questions
    for (let i = 1; i <= totalQuestions; i++) {
      // Verify we're on the correct question
      await expect(page.getByTestId('question-counter')).toContainText(`Pregunta ${i} de ${totalQuestions}`);

      // Select an answer (first option for consistency in testing)
      const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
      await expect(firstOption).toBeVisible();
      await firstOption.click();
      await page.waitForTimeout(500);

      // Navigate to next question (except on last question)
      if (i < totalQuestions) {
        const nextButton = page.getByRole('button', { name: /Siguiente/i });
        await expect(nextButton).toBeVisible();
        await nextButton.click();
        await page.waitForTimeout(500);
      }
    }

    // After answering all questions, submit the quiz using the "Enviar Quiz" button
    const submitButton = page.getByRole('button', { name: /Enviar Quiz/i });
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    await page.waitForTimeout(2000);

    // After submission, quiz goes to review mode (question 0)
    // Navigate to last question to access "Ver Resumen" button
    for (let i = 1; i < totalQuestions; i++) {
      await page.getByRole('button', { name: /Siguiente/i }).click();
      await page.waitForTimeout(300);
    }

    // Click "Ver Resumen" to see the completion screen
    const verResumenButton = page.getByRole('button', { name: /Ver Resumen/i });
    await expect(verResumenButton).toBeVisible();
    await verResumenButton.click();
    await page.waitForTimeout(1000);

    // Now verify completion screen elements are displayed
    await expect(page.getByText(/¡Quiz Completado!/i)).toBeVisible();

    // Check that score percentage is displayed
    await expect(page.locator('text=/\\d+%/')).toBeVisible();

    // Check that the score breakdown is displayed (X de Y respuestas correctas)
    await expect(page.getByText(/de.*respuestas correctas/i)).toBeVisible();

    // Check for "Revisar Respuestas" button
    const reviewButton = page.getByRole('button', { name: /Revisar Respuestas/i });
    await expect(reviewButton).toBeVisible();

    // Check for "Nuevo Quiz" button
    await expect(page.getByRole('button', { name: /Nuevo Quiz/i })).toBeVisible();

    // Check for "Volver al Inicio" link
    await expect(page.getByRole('link', { name: /Volver al Inicio/i })).toBeVisible();
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

    // Get the total number of questions
    const questionCounterText = await page.getByTestId('question-counter').textContent();
    const totalQuestions = parseInt(questionCounterText?.match(/de (\d+)/)?.[1] || '10');

    // Answer all questions - Rapid Fire auto-advances after each answer
    let questionsAnswered = 0;
    while (questionsAnswered < totalQuestions) {
      // Get current question number
      const currentCounterText = await page.getByTestId('question-counter').textContent();
      const currentQuestionNum = parseInt(currentCounterText?.match(/Pregunta (\d+)/)?.[1] || '1');

      // Select an answer
      const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
      await expect(firstOption).toBeVisible();
      await firstOption.click();

      questionsAnswered++;

      // Wait for auto-advance (1.5s) or auto-submit
      await page.waitForTimeout(2000);

      // Check if quiz ended early (game over or completed)
      const completedEarly = await page.getByText(/¡Quiz Completado!/i).isVisible().catch(() => false);
      if (completedEarly || questionsAnswered >= totalQuestions) {
        break;
      }

      // Verify we advanced to next question (unless quiz ended)
      const newCounterText = await page.getByTestId('question-counter').textContent().catch(() => '');
      if (newCounterText && newCounterText.includes('Pregunta')) {
        const newQuestionNum = parseInt(newCounterText.match(/Pregunta (\d+)/)?.[1] || '0');
        // If still on same question, quiz might have ended
        if (newQuestionNum === currentQuestionNum) {
          break;
        }
      }
    }

    // Wait for auto-submit to complete and navigate to review mode
    await page.waitForTimeout(3000);

    // After auto-submit, quiz goes to review mode at question 0
    // Check if we're in review mode or already on completion screen
    const isCompletionVisible = await page.getByText(/¡Quiz Completado!/i).isVisible().catch(() => false);

    if (!isCompletionVisible) {
      // Navigate to last question to access "Ver Resumen"
      const questionsToNavigate = Math.min(questionsAnswered, totalQuestions) - 1;
      for (let i = 0; i < questionsToNavigate; i++) {
        const nextBtn = page.getByRole('button', { name: /Siguiente/i });
        if (await nextBtn.isVisible()) {
          await nextBtn.click();
          await page.waitForTimeout(300);
        }
      }

      // Click "Ver Resumen"
      const verResumenButton = page.getByRole('button', { name: /Ver Resumen/i });
      if (await verResumenButton.isVisible()) {
        await verResumenButton.click();
        await page.waitForTimeout(1000);
      }
    }

    // Now verify completion screen
    await expect(page.getByText(/¡Quiz Completado!/i)).toBeVisible({ timeout: 5000 });

    // Verify score is displayed - Rapid Fire shows points
    await expect(page.getByText(/Puntaje Total/i).or(page.getByText(/Puntos/i))).toBeVisible();

    // Verify accuracy percentage
    await expect(page.getByText(/Precisión/i).or(page.getByText(/Accuracy/i))).toBeVisible();

    // Verify time used is displayed
    await expect(page.getByText(/Tiempo Usado/i).or(page.getByText(/Time Used/i))).toBeVisible();

    // Check for review and restart buttons
    await expect(page.getByRole('button', { name: /Revisar Respuestas/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Nuevo Quiz/i })).toBeVisible();
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

      // Navigate to next question (except on last)
      if (i < totalQuestions) {
        await page.getByRole('button', { name: /Siguiente/i }).click();
        await page.waitForTimeout(300);
      }
    }

    // Submit the quiz
    await page.getByRole('button', { name: /Enviar Quiz/i }).click();
    await page.waitForTimeout(2000);

    // After submission, navigate to completion screen
    // Quiz puts us in review mode at question 0, need to navigate to last question
    for (let i = 1; i < totalQuestions; i++) {
      await page.getByRole('button', { name: /Siguiente/i }).click();
      await page.waitForTimeout(300);
    }

    // Click "Ver Resumen" to see completion screen
    await page.getByRole('button', { name: /Ver Resumen/i }).click();
    await page.waitForTimeout(1000);

    // Should be on results page
    await expect(page.getByText(/¡Quiz Completado!/i)).toBeVisible();

    // Click "Revisar Respuestas" button to review answers
    const reviewButton = page.getByRole('button', { name: /Revisar Respuestas/i });
    await expect(reviewButton).toBeVisible();
    await reviewButton.click();
    await page.waitForTimeout(1000);

    // Should be back on question view in review mode
    // Verify we can see a question with feedback
    await expect(page.getByTestId('question-counter')).toBeVisible();
    await expect(page.getByTestId('question-counter')).toContainText('Pregunta 1 de');

    // Should show answer options
    const answerOptions = page.locator('button').filter({ hasText: /^[A-E]\./ });
    await expect(answerOptions.first()).toBeVisible();

    // In review mode, should show feedback indicators (correct/incorrect markers)
    // The correct answer should be highlighted or marked
    const hasGreenMarker = await page.locator('.bg-green-500, .text-green-700, .border-green-500').count() > 0;
    const hasCorrectText = await page.getByText(/Correcta|✓/i).count() > 0;

    expect(hasGreenMarker || hasCorrectText).toBe(true);

    // Should have navigation to see other questions
    await expect(page.getByRole('button', { name: /Siguiente/i })).toBeVisible();
  });
});
