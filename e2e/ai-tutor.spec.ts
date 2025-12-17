import { test, expect } from '@playwright/test';

test.describe('AI Tutor Chat', () => {
  test('should open AI tutor modal and send a message successfully', async ({ page }) => {
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

    // Wait for the Zen breathing animation to complete
    const questionCounter = page.getByTestId('question-counter');
    await expect(questionCounter).toBeVisible({ timeout: 10000 });

    // Get the total number of questions
    const questionCounterText = await questionCounter.textContent();
    const totalQuestions = parseInt(questionCounterText?.match(/de (\d+)/)?.[1] || '10');

    // Answer all questions
    for (let i = 1; i <= totalQuestions; i++) {
      await expect(questionCounter).toContainText(`Pregunta ${i} de ${totalQuestions}`, { timeout: 5000 });

      // Select an answer
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

    // After submission, we're in review mode - the AI tutor button should now be visible
    // Look for the AI tutor button
    const aiTutorButton = page.getByRole('button', { name: /Conversar con tu tutor IA/i });
    await expect(aiTutorButton).toBeVisible({ timeout: 5000 });

    // Click to open AI tutor modal
    await aiTutorButton.click();

    // Verify the AI tutor modal opened
    await expect(page.getByText('Tu Tutor IA')).toBeVisible();

    // Verify the welcome message is displayed
    await expect(page.getByText(/Estoy aquí para ayudarte|Bien hecho/i)).toBeVisible();

    // Type a message in the input
    const chatInput = page.getByPlaceholder('Escribe tu pregunta aquí...');
    await expect(chatInput).toBeVisible();
    await chatInput.fill('hola');

    // Click send button
    const sendButton = page.getByRole('button', { name: /Enviar/i });
    await expect(sendButton).toBeVisible();
    await sendButton.click();

    // Wait for AI response - should NOT show error message
    // The error message "Perdón, tuve un problema" indicates a 400 error
    const errorMessage = page.getByText(/Perdón, tuve un problema al procesar tu mensaje/i);
    const aiResponse = page.locator('.markdown-chat-message').last();

    // Wait for either response or error
    await expect(aiResponse.or(errorMessage)).toBeVisible({ timeout: 15000 });

    // Verify NO error occurred - the error message should NOT be visible
    // If this fails, it means the 400 error is still happening
    await expect(errorMessage).not.toBeVisible();

    // Verify we got an actual AI response (not the error message)
    const responseCount = await page.locator('.markdown-chat-message').count();
    expect(responseCount).toBeGreaterThanOrEqual(2); // Welcome message + AI response
  });
});
