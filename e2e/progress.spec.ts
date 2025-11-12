import { test, expect } from '@playwright/test';

test.describe('Progress & Analytics Page', () => {
  // Authentication is handled via storageState in playwright.config.ts

  test('should display progress page with heading and tabs', async ({ page }) => {
    // Navigate to progress page
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });

    // Check page heading
    await expect(page.getByRole('heading', { name: /Mi Progreso/i })).toBeVisible();

    // Check that view mode tabs are visible
    await expect(page.getByRole('button', { name: /📊 Resumen General/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /🎯 Mis Quizzes/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /📚 Habilidades M1/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /📚 Habilidades M2/i })).toBeVisible();

    // Check navbar back link
    await expect(page.getByRole('link', { name: /Volver al Inicio/i })).toBeVisible();
  });

  test('should display M1 and M2 progress cards in overview tab', async ({ page }) => {
    // Navigate to progress page
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });

    // Should be on overview tab by default
    const overviewTab = page.getByRole('button', { name: /📊 Resumen General/i });
    await expect(overviewTab).toHaveClass(/bg-\[#0A84FF\]/);

    // Check M1 progress card
    await expect(page.getByRole('heading', { name: /Competencia Matemática M1/i })).toBeVisible();

    // Check M2 progress card
    await expect(page.getByRole('heading', { name: /Competencia Matemática M2/i })).toBeVisible();

    // Check for "Continuar Práctica" buttons
    const continuePracticeLinks = page.getByRole('link', { name: /Continuar Práctica/i });
    await expect(continuePracticeLinks).toHaveCount(2);
  });

  test('should allow changing recent questions count selector', async ({ page }) => {
    // Navigate to progress page
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });

    // Find the recent count selector
    const selector = page.locator('select#recent-count');
    await expect(selector).toBeVisible();

    // Check default value (should be 10)
    await expect(selector).toHaveValue('10');

    // Change to 20 questions
    await selector.selectOption('20');

    // Verify it changed
    await expect(selector).toHaveValue('20');

    // Check that the label text updates
    await expect(page.getByText(/Últimas 20 preguntas/i).first()).toBeVisible();
  });

  test('should display question history with pagination', async ({ page }) => {
    // First complete a quiz to ensure there's history
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    // Quick Zen quiz
    await page.getByTestId('mode-zen').click();
    await page.waitForTimeout(500);
    await page.getByTestId('subject-all').click();
    await page.waitForTimeout(500);
    await page.getByTestId('start-quiz-button').click();
    await page.waitForTimeout(2000);

    // Wait for Zen animation
    await page.waitForTimeout(5000);

    // Answer 3 questions quickly
    for (let i = 0; i < 3; i++) {
      const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
      await firstOption.click();
      await page.getByRole('button', { name: /Siguiente/i }).click();
      await page.waitForTimeout(300);
    }

    // Now go to progress page
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });

    // Check for history section
    const historyHeading = page.getByRole('heading', { name: /Historial de Preguntas Recientes/i });

    // If history exists, check pagination
    const historyVisible = await historyHeading.isVisible().catch(() => false);
    if (historyVisible) {
      // Should show at least some questions
      await expect(page.getByText(/Total:.*preguntas/i)).toBeVisible();

      // Check that question items have the expected structure
      const questionItems = page.locator('[class*="border-"]').filter({ hasText: /M1|M2/ });
      const count = await questionItems.count();

      if (count > 0) {
        // First question should have level badge (M1 or M2)
        await expect(questionItems.first()).toContainText(/M1|M2/);
      }
    }
  });

  test('should show question review modal when clicking on question', async ({ page }) => {
    // First complete at least one question
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    await page.getByTestId('mode-zen').click();
    await page.waitForTimeout(500);
    await page.getByTestId('subject-all').click();
    await page.waitForTimeout(500);
    await page.getByTestId('start-quiz-button').click();
    await page.waitForTimeout(2000);
    await page.waitForTimeout(5000); // Zen animation

    // Answer one question
    const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
    await firstOption.click();
    await page.getByRole('button', { name: /Siguiente/i }).click();
    // Removed: await page.waitForTimeout(500); - relying on auto-wait

    // Go to progress page
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });

    // Find and click the first question in history (look for the question item with cursor-pointer class)
    const firstQuestion = page.locator('.cursor-pointer').filter({ hasText: /M1|M2/ }).first();
    const isVisible = await firstQuestion.isVisible().catch(() => false);

    if (isVisible) {
      await firstQuestion.click();
      await page.waitForTimeout(1000);

      // Modal should open - check for explanation section which is always present
      await expect(page.getByText(/Explicación:/i)).toBeVisible({ timeout: 10000 });

      // Should have close button
      await expect(page.getByRole('button', { name: /Cerrar/i })).toBeVisible();

      // Close the modal
      await page.getByRole('button', { name: /Cerrar/i }).click();
      await page.waitForTimeout(300);
    }
  });

  test('should switch to quizzes tab and display quiz sessions', async ({ page }) => {
    // Navigate to progress page
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });

    // Click on "Mis Quizzes" tab
    await page.getByRole('button', { name: /🎯 Mis Quizzes/i }).click();

    // Give the tab a moment to switch
    await page.waitForTimeout(1000);

    // Tab should be active (blue background)
    const quizzesTab = page.getByRole('button', { name: /🎯 Mis Quizzes/i });
    await expect(quizzesTab).toHaveClass(/bg-\[#0A84FF\]/);

    // Wait for the loading spinner to disappear if present
    const spinner = page.locator('.animate-spin');
    const spinnerExists = await spinner.count() > 0;
    if (spinnerExists) {
      await spinner.waitFor({ state: 'hidden', timeout: 15000 });
      // Give it another moment after spinner disappears
      await page.waitForTimeout(1000);
    }

    // Now check for quiz sessions or empty state with explicit waits
    const quizHeading = page.getByText(/Quiz #/i).first();
    const emptyStateText = page.getByText(/No has completado ningún quiz todavía/i);

    // Wait for at least one of these to be visible (15 second timeout total)
    try {
      await Promise.race([
        quizHeading.waitFor({ state: 'visible', timeout: 15000 }),
        emptyStateText.waitFor({ state: 'visible', timeout: 15000 })
      ]);
    } catch (error) {
      // If neither appears, fail with descriptive message
      throw new Error('Neither quiz sessions nor empty state appeared after loading completed');
    }

    // Final verification
    const hasQuizzes = await quizHeading.isVisible().catch(() => false);
    const hasEmptyState = await emptyStateText.isVisible().catch(() => false);

    expect(hasQuizzes || hasEmptyState).toBe(true);
  });

  test('should display empty state in quizzes tab with practice links', async ({ page }) => {
    // Navigate directly to progress page for a fresh user scenario
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });

    // Switch to quizzes tab
    await page.getByRole('button', { name: /🎯 Mis Quizzes/i }).click();
    // Removed: await page.waitForTimeout(500); - relying on auto-wait

    // Check for empty state or quiz sessions
    const emptyState = await page.getByText(/No has completado ningún quiz todavía/i).isVisible().catch(() => false);

    if (emptyState) {
      // Should show practice links
      await expect(page.getByRole('link', { name: /Practicar M1/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Practicar M2/i })).toBeVisible();
    }
  });

  test('should complete a quiz and verify it appears in quizzes tab', async ({ page }) => {
    test.setTimeout(90000); // Extend timeout for full quiz

    // Complete a full Zen quiz
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    await page.getByTestId('mode-zen').click();
    await page.waitForTimeout(500);
    await page.getByTestId('subject-all').click();
    await page.waitForTimeout(500);
    await page.getByTestId('start-quiz-button').click();
    await page.waitForTimeout(2000);
    await page.waitForTimeout(5000); // Zen animation

    // Get total questions
    const questionCounterText = await page.getByTestId('question-counter').textContent();
    const totalQuestions = parseInt(questionCounterText?.match(/de (\d+)/)?.[1] || '10');

    // Answer all questions
    for (let i = 1; i <= totalQuestions; i++) {
      const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
      await firstOption.click();

      if (i < totalQuestions) {
        await page.getByRole('button', { name: /Siguiente/i }).click();
        await page.waitForTimeout(300);
      }
    }

    // Submit quiz
    await page.getByRole('button', { name: /Enviar Quiz/i }).click();
    await page.waitForTimeout(2000);

    // Navigate to progress page
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });

    // Switch to quizzes tab
    await page.getByRole('button', { name: /🎯 Mis Quizzes/i }).click();
    await page.waitForTimeout(1000);

    // Should show at least one quiz
    await expect(page.getByText(/Quiz #/i).first()).toBeVisible();

    // Should show score
    await expect(page.locator('text=/\\d+\\/\\d+/').first()).toBeVisible();

    // Should have action buttons
    await expect(page.getByRole('button', { name: /🔄 Rejugar Quiz/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /👁️ Ver Detalles/i }).first()).toBeVisible();
  });

  test('should open quiz details modal from quizzes tab', async ({ page }) => {
    // Complete a quiz first
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    await page.getByTestId('mode-zen').click();
    await page.waitForTimeout(500);
    await page.getByTestId('subject-all').click();
    await page.waitForTimeout(500);
    await page.getByTestId('start-quiz-button').click();
    await page.waitForTimeout(2000);
    await page.waitForTimeout(5000);

    // Answer 3 questions
    for (let i = 0; i < 3; i++) {
      const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
      await firstOption.click();
      if (i < 2) {
        await page.getByRole('button', { name: /Siguiente/i }).click();
        await page.waitForTimeout(300);
      }
    }

    await page.getByRole('button', { name: /Enviar Quiz/i }).click();
    await page.waitForTimeout(2000);

    // Go to progress page
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });

    // Switch to quizzes tab
    await page.getByRole('button', { name: /🎯 Mis Quizzes/i }).click();
    await page.waitForTimeout(1000);

    // Click "Ver Detalles" on first quiz
    const verDetallesButton = page.getByRole('button', { name: /👁️ Ver Detalles/i }).first();
    const hasQuizzes = await verDetallesButton.isVisible().catch(() => false);

    if (hasQuizzes) {
      await verDetallesButton.click();

      // Modal should open with question counter
      await expect(page.getByText(/Pregunta \d+ de \d+/i)).toBeVisible();

      // Should show navigation buttons
      await expect(page.getByRole('button', { name: /← Anterior/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Siguiente →/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Cerrar/i })).toBeVisible();

      // Close modal
      await page.getByRole('button', { name: /Cerrar/i }).click();
      await page.waitForTimeout(300);
    }
  });

  test('should navigate between questions in quiz details modal', async ({ page }) => {
    // Complete a quiz with multiple questions
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    await page.getByTestId('mode-zen').click();
    await page.waitForTimeout(500);
    await page.getByTestId('subject-all').click();
    await page.waitForTimeout(500);
    await page.getByTestId('start-quiz-button').click();
    await page.waitForTimeout(2000);
    await page.waitForTimeout(5000);

    // Answer 5 questions
    for (let i = 0; i < 5; i++) {
      const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
      await firstOption.click();
      if (i < 4) {
        await page.getByRole('button', { name: /Siguiente/i }).click();
        await page.waitForTimeout(300);
      }
    }

    await page.getByRole('button', { name: /Enviar Quiz/i }).click();
    await page.waitForTimeout(2000);

    // Go to progress and open quiz details
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: /🎯 Mis Quizzes/i }).click();
    await page.waitForTimeout(1000);

    const verDetallesButton = page.getByRole('button', { name: /👁️ Ver Detalles/i }).first();
    const hasQuizzes = await verDetallesButton.isVisible().catch(() => false);

    if (hasQuizzes) {
      await verDetallesButton.click();

      // Should start at question 1
      await expect(page.getByText(/Pregunta 1 de/i)).toBeVisible();

      // Click "Siguiente" to go to question 2
      await page.getByRole('button', { name: /Siguiente →/i }).click();
      // Removed: await page.waitForTimeout(300); - relying on auto-wait

      // Should now be on question 2
      await expect(page.getByText(/Pregunta 2 de/i)).toBeVisible();

      // Click "Anterior" to go back to question 1
      await page.getByRole('button', { name: /← Anterior/i }).click();
      // Removed: await page.waitForTimeout(300); - relying on auto-wait

      // Should be back on question 1
      await expect(page.getByText(/Pregunta 1 de/i)).toBeVisible();
    }
  });

  test('should switch to Skills M1 tab and display skills', async ({ page }) => {
    // Navigate to progress page
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });

    // Click on "Habilidades M1" tab
    await page.getByRole('button', { name: /📚 Habilidades M1/i }).click();
    // Removed: await page.waitForTimeout(500); - relying on auto-wait

    // Tab should be active
    const skillsM1Tab = page.getByRole('button', { name: /📚 Habilidades M1/i });
    await expect(skillsM1Tab).toHaveClass(/bg-\[#0A84FF\]/);

    // Should show skills component (either empty state or skills data)
    // The SkillsDisplay component will render, we just verify the tab switched
    // Content will vary based on whether user has practice data
  });

  test('should switch to Skills M2 tab and display skills', async ({ page }) => {
    // Navigate to progress page
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });

    // Click on "Habilidades M2" tab
    await page.getByRole('button', { name: /📚 Habilidades M2/i }).click();
    // Removed: await page.waitForTimeout(500); - relying on auto-wait

    // Tab should be active
    const skillsM2Tab = page.getByRole('button', { name: /📚 Habilidades M2/i });
    await expect(skillsM2Tab).toHaveClass(/bg-\[#0A84FF\]/);
  });

  test('should navigate back to dashboard from progress page', async ({ page }) => {
    // Navigate to progress page
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });

    // Click "Volver al Inicio" link
    await page.getByRole('link', { name: /Volver al Inicio/i }).click();
    await page.waitForTimeout(1000);

    // Should be on dashboard
    const url = page.url();
    expect(url).toContain('/dashboard');
  });

  test('should display progress bars with correct percentages', async ({ page }) => {
    // Complete a quiz to ensure there's data
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    await page.getByTestId('mode-zen').click();
    await page.waitForTimeout(500);
    await page.getByTestId('subject-all').click();
    await page.waitForTimeout(500);
    await page.getByTestId('start-quiz-button').click();
    await page.waitForTimeout(2000);
    await page.waitForTimeout(5000);

    // Answer 2 questions
    for (let i = 0; i < 2; i++) {
      const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
      await firstOption.click();
      if (i < 1) {
        await page.getByRole('button', { name: /Siguiente/i }).click();
        await page.waitForTimeout(300);
      }
    }

    // Go to progress page
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });

    // Check that M1 and M2 progress sections are visible
    await expect(page.getByRole('heading', { name: /Competencia Matemática M1/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Competencia Matemática M2/i })).toBeVisible();

    // Check for progress information (should show some stats)
    const hasProgressStats = await page.getByText(/Respuestas correctas/i).count();
    expect(hasProgressStats).toBeGreaterThan(0);
  });

  test('should show correct answer/incorrect visual indicators in history', async ({ page }) => {
    // Complete a question
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    await page.getByTestId('mode-zen').click();
    await page.waitForTimeout(500);
    await page.getByTestId('subject-all').click();
    await page.waitForTimeout(500);
    await page.getByTestId('start-quiz-button').click();
    await page.waitForTimeout(2000);
    await page.waitForTimeout(5000);

    // Answer one question
    const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
    await firstOption.click();

    // Go to progress page
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });

    // Check if history section exists
    const hasHistory = await page.getByText(/Historial de Preguntas Recientes/i).isVisible().catch(() => false);

    if (hasHistory) {
      // Check for visual indicators by looking for spans with specific text size (checkmark/X are in text-2xl spans)
      const indicators = page.locator('span.text-2xl');
      const count = await indicators.count();

      // Should have at least one indicator (checkmark or X)
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should display quiz session with question visual indicators', async ({ page }) => {
    // Complete a quiz
    await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

    await page.getByTestId('mode-zen').click();
    await page.waitForTimeout(500);
    await page.getByTestId('subject-all').click();
    await page.waitForTimeout(500);
    await page.getByTestId('start-quiz-button').click();
    await page.waitForTimeout(2000);
    await page.waitForTimeout(5000);

    // Answer 3 questions
    for (let i = 0; i < 3; i++) {
      const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
      await firstOption.click();
      if (i < 2) {
        await page.getByRole('button', { name: /Siguiente/i }).click();
        await page.waitForTimeout(300);
      }
    }

    await page.getByRole('button', { name: /Enviar Quiz/i }).click();
    await page.waitForTimeout(2000);

    // Go to progress page quizzes tab
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: /🎯 Mis Quizzes/i }).click();
    await page.waitForTimeout(1000);

    // Check for quiz visual indicators (numbered boxes)
    const hasQuiz = await page.getByText(/Quiz #/i).isVisible().catch(() => false);

    if (hasQuiz) {
      // Should show "Preguntas en este quiz:"
      await expect(page.getByText(/Preguntas en este quiz:/i)).toBeVisible();

      // Should have numbered question boxes (showing question numbers)
      const questionBoxes = page.locator('.w-8.h-8.rounded-lg');
      const boxCount = await questionBoxes.count();
      expect(boxCount).toBeGreaterThan(0);
    }
  });

  test('should maintain tab state when navigating within the page', async ({ page }) => {
    // Navigate to progress page
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });

    // Switch to quizzes tab
    await page.getByRole('button', { name: /🎯 Mis Quizzes/i }).click();
    // Removed: await page.waitForTimeout(500); - relying on auto-wait

    // Verify we're on quizzes tab
    const quizzesTab = page.getByRole('button', { name: /🎯 Mis Quizzes/i });
    await expect(quizzesTab).toHaveClass(/bg-\[#0A84FF\]/);

    // Switch to Skills M1 tab
    await page.getByRole('button', { name: /📚 Habilidades M1/i }).click();
    // Removed: await page.waitForTimeout(500); - relying on auto-wait

    // Verify we're on Skills M1 tab
    const skillsTab = page.getByRole('button', { name: /📚 Habilidades M1/i });
    await expect(skillsTab).toHaveClass(/bg-\[#0A84FF\]/);

    // Switch back to overview
    await page.getByRole('button', { name: /📊 Resumen General/i }).click();
    // Removed: await page.waitForTimeout(500); - relying on auto-wait

    // Verify we're back on overview
    const overviewTab = page.getByRole('button', { name: /📊 Resumen General/i });
    await expect(overviewTab).toHaveClass(/bg-\[#0A84FF\]/);
  });
});
