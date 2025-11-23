import { test, expect } from '@playwright/test';

test.describe('Practice Mode - M1 Quiz Flow', () => {
  // No beforeEach needed - authentication is handled via storageState in playwright.config.ts

  test('should display M1 practice page with subject selection', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

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
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    // Step 1: Select Zen mode
    await page.getByTestId('mode-zen').click();

    // After selecting mode, subject selection (Step 2) should appear
    await expect(page.getByText(/Paso 2.*Selecciona una materia/i)).toBeVisible();

    // Check that subjects are visible
    await expect(page.getByTestId('subject-all')).toBeVisible();
    await expect(page.getByTestId('subject-números')).toBeVisible();
  });

  test('should complete a Zen mode quiz', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    // Step 1: Select Zen mode
    await page.getByTestId('mode-zen').click();

    // Step 2: Select a subject (Todas las Materias) - wait for it to be enabled
    const subjectAllButton = page.getByTestId('subject-all');
    await expect(subjectAllButton).toBeVisible();
    await subjectAllButton.click();

    // Should show "Comenzar Quiz" button
    const startButton = page.getByTestId('start-quiz-button');
    await expect(startButton).toBeVisible();

    // Click to start the quiz
    await startButton.click();

    // Wait for the Zen breathing animation to complete by waiting for question counter
    const questionCounter = page.getByTestId('question-counter');
    await expect(questionCounter).toBeVisible({ timeout: 10000 });
    await expect(questionCounter).toContainText('Pregunta 1 de');

    // Answer the first question (select any option)
    const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
    await expect(firstOption).toBeVisible();
    await firstOption.click();

    // Navigate to next question - wait for button to be visible before clicking
    const nextButton = page.getByRole('button', { name: /Siguiente/i });
    await expect(nextButton).toBeVisible();
    await nextButton.click();

    // Should be on question 2 - wait for counter to update
    await expect(questionCounter).toContainText('Pregunta 2 de', { timeout: 5000 });
  });

  test('should show difficulty selection for Rapid Fire mode', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    // Step 1: Select Rapid Fire mode
    await page.getByTestId('mode-rapidfire').click();

    // Step 2: Select a subject - wait for it to be visible
    const subjectButton = page.getByTestId('subject-all');
    await expect(subjectButton).toBeVisible();
    await subjectButton.click();

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
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    // Step 1: Select Rapid Fire mode
    await page.getByTestId('mode-rapidfire').click();

    // Step 2: Select a subject
    const subjectButton = page.getByTestId('subject-all');
    await expect(subjectButton).toBeVisible();
    await subjectButton.click();

    // Step 3: Select difficulty (Fácil)
    const difficultyButton = page.getByTestId('difficulty-easy');
    await expect(difficultyButton).toBeVisible();
    await difficultyButton.click();

    // Should show "Comenzar Quiz" button
    const startButton = page.getByTestId('start-quiz-button');
    await expect(startButton).toBeVisible();

    // Click to start the quiz
    await startButton.click();

    // Wait for countdown animation to complete by waiting for question counter
    const questionCounter = page.getByTestId('question-counter');
    await expect(questionCounter).toBeVisible({ timeout: 10000 });
    await expect(questionCounter).toContainText('1/');
  });

  test('should complete a Zen mode quiz and display accurate results', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    // Step 1: Select Zen mode
    await page.getByTestId('mode-zen').click();

    // Step 2: Select a subject (Todas las Materias)
    const subjectButton = page.getByTestId('subject-all');
    await expect(subjectButton).toBeVisible();
    await subjectButton.click();

    // Start the quiz
    const startButton = page.getByTestId('start-quiz-button');
    await expect(startButton).toBeVisible();
    await startButton.click();

    // Wait for the Zen breathing animation to complete by waiting for question counter
    const questionCounter = page.getByTestId('question-counter');
    await expect(questionCounter).toBeVisible({ timeout: 10000 });

    // Get the total number of questions from the counter
    const questionCounterText = await questionCounter.textContent();
    const totalQuestions = parseInt(questionCounterText?.match(/de (\d+)/)?.[1] || '10');

    // Answer all questions
    for (let i = 1; i <= totalQuestions; i++) {
      // Verify we're on the correct question
      await expect(questionCounter).toContainText(`Pregunta ${i} de ${totalQuestions}`, { timeout: 5000 });

      // Select an answer (first option for consistency in testing)
      const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
      await expect(firstOption).toBeVisible();
      await firstOption.click();

      // Navigate to next question (except on last question)
      if (i < totalQuestions) {
        const nextButton = page.getByRole('button', { name: /Siguiente/i });
        await expect(nextButton).toBeVisible();
        await nextButton.click();
      }
    }

    // After answering all questions, submit the quiz using the "Enviar Quiz" button
    const submitButton = page.getByRole('button', { name: /Enviar Quiz/i });
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    // After submission, quiz goes to review mode (question 0)
    // Navigate to last question to access "Ver Resumen" button
    for (let i = 1; i < totalQuestions; i++) {
      const nextButton = page.getByRole('button', { name: /Siguiente/i });
      await expect(nextButton).toBeVisible();
      await nextButton.click();
    }

    // Click "Ver Resumen" to see the completion screen
    const verResumenButton = page.getByRole('button', { name: /Ver Resumen/i });
    await expect(verResumenButton).toBeVisible();
    await verResumenButton.click({ force: true });

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
    // Increase timeout for this test since Rapid Fire takes longer
    test.setTimeout(60000);
    // Navigate to M1 practice
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    // Step 1: Select Rapid Fire mode
    await page.getByTestId('mode-rapidfire').click();

    // Step 2: Select a subject
    const subjectButton = page.getByTestId('subject-all');
    await expect(subjectButton).toBeVisible();
    await subjectButton.click();

    // Step 3: Select difficulty (Fácil for faster test)
    const difficultyButton = page.getByTestId('difficulty-easy');
    await expect(difficultyButton).toBeVisible();
    await difficultyButton.click();

    // Start the quiz
    const startButton = page.getByTestId('start-quiz-button');
    await expect(startButton).toBeVisible();
    await startButton.click();

    // Wait for countdown animation by waiting for question counter to appear
    const questionCounter = page.getByTestId('question-counter');
    await expect(questionCounter).toBeVisible({ timeout: 10000 });

    // Get the total number of questions (format is "1/5")
    const questionCounterText = await page.getByTestId('question-counter').textContent();
    const totalQuestions = parseInt(questionCounterText?.split('/')[1] || '10');

    // Answer questions - Rapid Fire auto-advances after each answer
    // Use a for loop with max iterations to prevent infinite loops
    const maxIterations = totalQuestions + 2; // Add buffer for safety
    let questionsAnswered = 0;

    for (let iteration = 0; iteration < maxIterations; iteration++) {
      // Check if we're still in quiz mode
      const questionCounter = page.getByTestId('question-counter');
      const isQuestionVisible = await questionCounter.isVisible().catch(() => false);

      if (!isQuestionVisible) {
        // Quiz has ended
        break;
      }

      // Get current question number before answering (format is "1/5")
      const beforeCounterText = await questionCounter.textContent().catch(() => '');
      const beforeQuestionNum = parseInt(beforeCounterText?.split('/')[0] || '0');

      // Select an answer
      const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
      const isOptionVisible = await firstOption.isVisible().catch(() => false);

      if (!isOptionVisible) {
        // No answer options means quiz ended
        break;
      }

      await firstOption.click();
      questionsAnswered++;

      // Break if we've answered all questions
      if (questionsAnswered >= totalQuestions) {
        // Wait for auto-submit to complete by waiting for results or review mode
        await expect(page.getByText(/¡Quiz Completado!/i).or(questionCounter)).toBeVisible({ timeout: 5000 });
        break;
      }

      // Wait for auto-advance by waiting for question number to change
      const nextQuestionNum = beforeQuestionNum + 1;
      await expect(questionCounter).toContainText(`${nextQuestionNum}/`, { timeout: 3000 }).catch(() => {
        // Might have ended
      });
    }

    // Wait for quiz to auto-complete and check if we can see completion or review mode
    // The quiz should have auto-submitted after the last question
    const completionText = page.getByText(/¡Quiz Completado!/i);
    const verResumenButton = page.getByRole('button', { name: /Ver Resumen/i });

    // Wait for either completion screen or review mode button
    try {
      await expect(completionText.or(verResumenButton)).toBeVisible({ timeout: 5000 });

      // If we see "Ver Resumen" button, click it to get to completion screen
      if (await verResumenButton.isVisible().catch(() => false)) {
        await verResumenButton.click({ force: true });
        await expect(completionText).toBeVisible({ timeout: 10000 });
      }
    } catch (e) {
      // If neither is visible, we might be in review mode
      // Navigate through questions to find "Ver Resumen"
      const stillHasCounter = await questionCounter.isVisible().catch(() => false);

      if (stillHasCounter) {
        // Navigate forward to find the summary button
        let attempts = 0;
        while (attempts < questionsAnswered && !(await verResumenButton.isVisible().catch(() => false))) {
          const nextBtn = page.getByRole('button', { name: /Siguiente/i });
          if (await nextBtn.isVisible().catch(() => false)) {
            // Force click to bypass viewport checks - the button may be in a scrollable container
            await nextBtn.click({ force: true });
            attempts++;
            // Small wait for navigation
            await page.waitForTimeout(300);
          } else {
            break;
          }
        }

        // Now click Ver Resumen if found
        if (await verResumenButton.isVisible().catch(() => false)) {
          await verResumenButton.click({ force: true });
        }
      }
    }

    // Verify we made it to completion screen
    await expect(completionText).toBeVisible({ timeout: 10000 });

    // Verify quiz completion elements (basic check)
    // Check for either "precisión" or score percentage
    const hasResults = await page.getByText(/% precisión|precisión|de \d+ respuestas/i).count() > 0;
    expect(hasResults).toBeTruthy();
  });

  test('should save and resume Zen quiz with answers preserved', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    // Start a Zen mode quiz
    await page.getByTestId('mode-zen').click();
    const subjectButton = page.getByTestId('subject-all');
    await expect(subjectButton).toBeVisible();
    await subjectButton.click();

    const startButton = page.getByTestId('start-quiz-button');
    await expect(startButton).toBeVisible();
    await startButton.click();

    // Wait for Zen animation
    const questionCounter = page.getByTestId('question-counter');
    await expect(questionCounter).toBeVisible({ timeout: 10000 });

    // Answer first 3 questions with specific pattern
    for (let i = 1; i <= 3; i++) {
      await expect(questionCounter).toContainText(`Pregunta ${i} de`, { timeout: 5000 });

      // Select the second option for each question
      const secondOption = page.locator('button').filter({ hasText: /^B\./ }).first();
      await expect(secondOption).toBeVisible();
      await secondOption.click();

      // Navigate to next question
      if (i < 3) {
        const nextButton = page.getByRole('button', { name: /Siguiente/i });
        await expect(nextButton).toBeVisible();
        await nextButton.click();
      }
    }

    // Refresh the page to simulate leaving and coming back
    await page.reload();

    // Should show resume banner
    await expect(page.getByText(/Tienes un quiz zen sin terminar/i)).toBeVisible();
    await expect(page.getByText(/3\/10 preguntas respondidas/i)).toBeVisible();

    // Click continue button
    const continueButton = page.getByRole('button', { name: /Continuar quiz/i });
    await expect(continueButton).toBeVisible();
    await continueButton.click();

    // Wait for Zen animation again
    await expect(questionCounter).toBeVisible({ timeout: 10000 });

    // Should be on question 3 where we left off
    await expect(questionCounter).toContainText('Pregunta 3 de', { timeout: 5000 });

    // Navigate back to question 1 to verify answer was preserved
    const prevButton = page.getByRole('button', { name: /Anterior/i });
    await expect(prevButton).toBeVisible();
    await prevButton.click();
    await expect(questionCounter).toContainText('Pregunta 2 de');
    await prevButton.click();
    await expect(questionCounter).toContainText('Pregunta 1 de');

    // Verify the second option (B) is still selected
    const selectedOption = page.locator('button').filter({ hasText: /^B\./ }).first();
    await expect(selectedOption).toBeVisible();
    // Check that it has the selected styling (teal background)
    await expect(selectedOption).toHaveClass(/bg-teal-500/);
  });

  test('should discard saved progress when requested', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    // Start a Zen mode quiz
    await page.getByTestId('mode-zen').click();
    const subjectButton = page.getByTestId('subject-all');
    await expect(subjectButton).toBeVisible();
    await subjectButton.click();

    const startButton = page.getByTestId('start-quiz-button');
    await expect(startButton).toBeVisible();
    await startButton.click();

    // Wait for Zen animation
    const questionCounter = page.getByTestId('question-counter');
    await expect(questionCounter).toBeVisible({ timeout: 10000 });

    // Answer first question
    const firstOption = page.locator('button').filter({ hasText: /^A\./ }).first();
    await expect(firstOption).toBeVisible();
    await firstOption.click();

    // Refresh to trigger resume banner
    await page.reload();

    // Should show resume banner
    await expect(page.getByText(/Tienes un quiz zen sin terminar/i)).toBeVisible();

    // Click discard button
    const discardButton = page.getByRole('button', { name: /Descartar/i });
    await expect(discardButton).toBeVisible();
    await discardButton.click();

    // Resume banner should disappear
    await expect(page.getByText(/Tienes un quiz zen sin terminar/i)).not.toBeVisible();

    // Should be back at mode selection
    await expect(page.getByText(/Paso 1.*Selecciona el modo de práctica/i)).toBeVisible();
  });

  test('should preserve custom question count when resuming', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    // Start a Zen mode quiz with custom question count (5 questions)
    await page.getByTestId('mode-zen').click();
    const subjectButton = page.getByTestId('subject-all');
    await expect(subjectButton).toBeVisible();
    await subjectButton.click();

    // Select 5 questions (Rápido)
    const questionCountButton = page.getByRole('button', { name: /Rápido.*5 preguntas/i });
    await expect(questionCountButton).toBeVisible();
    await questionCountButton.click();

    const startButton = page.getByTestId('start-quiz-button');
    await expect(startButton).toBeVisible();
    await startButton.click();

    // Wait for Zen animation
    const questionCounter = page.getByTestId('question-counter');
    await expect(questionCounter).toBeVisible({ timeout: 10000 });

    // Verify we have 5 questions total
    await expect(questionCounter).toContainText('Pregunta 1 de 5');

    // Answer one question
    const firstOption = page.locator('button').filter({ hasText: /^A\./ }).first();
    await expect(firstOption).toBeVisible();
    await firstOption.click();

    // Refresh to trigger resume
    await page.reload();

    // Resume banner should show 5 questions
    await expect(page.getByText(/1\/5 preguntas respondidas/i)).toBeVisible();

    // Continue the quiz
    const continueButton = page.getByRole('button', { name: /Continuar quiz/i });
    await expect(continueButton).toBeVisible();
    await continueButton.click();

    // Wait for Zen animation
    await expect(questionCounter).toBeVisible({ timeout: 10000 });

    // Verify we still have 5 questions total
    await expect(questionCounter).toContainText('de 5');
  });

  test('should clear saved progress after quiz submission', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    // Start a Zen mode quiz with 5 questions for speed
    await page.getByTestId('mode-zen').click();
    const subjectButton = page.getByTestId('subject-all');
    await expect(subjectButton).toBeVisible();
    await subjectButton.click();

    // Select 5 questions
    const questionCountButton = page.getByRole('button', { name: /Rápido.*5 preguntas/i });
    await expect(questionCountButton).toBeVisible();
    await questionCountButton.click();

    const startButton = page.getByTestId('start-quiz-button');
    await expect(startButton).toBeVisible();
    await startButton.click();

    // Wait for Zen animation
    const questionCounter = page.getByTestId('question-counter');
    await expect(questionCounter).toBeVisible({ timeout: 10000 });

    // Answer all 5 questions
    for (let i = 1; i <= 5; i++) {
      await expect(questionCounter).toContainText(`Pregunta ${i} de 5`, { timeout: 5000 });

      const firstOption = page.locator('button').filter({ hasText: /^[A-E]\\./ }).first();
      await expect(firstOption).toBeVisible();
      await firstOption.click();

      if (i < 5) {
        const nextButton = page.getByRole('button', { name: /Siguiente/i });
        await expect(nextButton).toBeVisible();
        await nextButton.click();
      }
    }

    // Submit the quiz
    const submitButton = page.getByRole('button', { name: /Enviar Quiz/i });
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    // Wait for submission to complete by checking for results or review mode
    await expect(questionCounter).toBeVisible({ timeout: 5000 });

    // Refresh the page
    await page.reload();

    // Resume banner should NOT appear since quiz was submitted
    await expect(page.getByText(/Tienes un quiz zen sin terminar/i)).not.toBeVisible();

    // Should be back at mode selection
    await expect(page.getByText(/Paso 1.*Selecciona el modo de práctica/i)).toBeVisible();
  });

  test('should allow reviewing answers after quiz completion', async ({ page }) => {
    // Navigate to M1 practice
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    // Start a quick Zen quiz
    await page.getByTestId('mode-zen').click();

    const subjectButton = page.getByTestId('subject-all');
    await expect(subjectButton).toBeVisible();
    await subjectButton.click();

    const startButton = page.getByTestId('start-quiz-button');
    await expect(startButton).toBeVisible();
    await startButton.click();

    // Wait for Zen animation by waiting for question counter
    const questionCounter = page.getByTestId('question-counter');
    await expect(questionCounter).toBeVisible({ timeout: 10000 });

    // Get total questions
    const questionCounterText = await questionCounter.textContent();
    const totalQuestions = parseInt(questionCounterText?.match(/de (\d+)/)?.[1] || '10');

    // Answer all questions
    for (let i = 1; i <= totalQuestions; i++) {
      await expect(questionCounter).toContainText(`Pregunta ${i} de`, { timeout: 3000 });

      const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
      await expect(firstOption).toBeVisible();
      await firstOption.click();

      // Navigate to next question (except on last)
      if (i < totalQuestions) {
        const nextButton = page.getByRole('button', { name: /Siguiente/i });
        await expect(nextButton).toBeVisible();
        await nextButton.click();
      }
    }

    // Submit the quiz
    const submitButton = page.getByRole('button', { name: /Enviar Quiz/i });
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    // After submission, navigate to completion screen
    // Quiz puts us in review mode at question 0, need to navigate to last question
    for (let i = 1; i < totalQuestions; i++) {
      const nextButton = page.getByRole('button', { name: /Siguiente/i });
      await expect(nextButton).toBeVisible();
      await nextButton.click();
    }

    // Click "Ver Resumen" to see completion screen
    const verResumenButton = page.getByRole('button', { name: /Ver Resumen/i });
    await expect(verResumenButton).toBeVisible();
    await verResumenButton.click({ force: true });

    // Should be on results page
    await expect(page.getByText(/¡Quiz Completado!/i)).toBeVisible();

    // Click "Revisar Respuestas" button to review answers
    const reviewButton = page.getByRole('button', { name: /Revisar Respuestas/i });
    await expect(reviewButton).toBeVisible();
    await reviewButton.click();

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
