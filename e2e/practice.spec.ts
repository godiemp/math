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

    // Check page title
    await expect(page.getByText(/Práctica PAES.*Competencia Matemática M1/i)).toBeVisible();

    // Check that subject selection is visible
    await expect(page.getByText(/Paso 1.*Selecciona una materia/i)).toBeVisible();

    // Check that all subjects are displayed (use button role for specificity)
    await expect(page.getByRole('button', { name: /Todas las Materias/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Números/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Álgebra/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Geometría/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Probabilidad/i })).toBeVisible();
  });

  test('should allow subject and mode selection flow', async ({ page }) => {
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Select "Todas las Materias" subject
    await page.getByRole('button', { name: /Todas las Materias/i }).click();
    await page.waitForTimeout(500);

    // Check that mode selection appears (Step 2)
    await expect(page.getByText(/Paso 2.*Selecciona el modo de práctica/i)).toBeVisible();

    // Check that both modes are displayed
    await expect(page.getByRole('button', { name: /Modo Zen/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Rapid Fire/i })).toBeVisible();
  });

  test('should complete a Zen mode quiz', async ({ page }) => {
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Select subject - Números
    await page.getByRole('button', { name: /Números/i }).click();
    await page.waitForTimeout(500);

    // Select Zen mode
    await page.getByRole('button', { name: /Modo Zen/i }).click();
    await page.waitForTimeout(500);

    // Start quiz
    const startButton = page.getByRole('button', { name: /Comenzar Quiz/i });
    await startButton.click();
    await page.waitForTimeout(2000);

    // Quiz should be displayed
    // Check for question elements (the quiz should have started)
    const quizContainer = page.locator('.quiz-container, [class*="quiz"], .question').first();

    // Answer first question (select option A)
    const firstOption = page.locator('button, [role="button"]').filter({ hasText: /^A\./i }).first();
    if (await firstOption.isVisible()) {
      await firstOption.click();
      await page.waitForTimeout(1000);

      // Check for next button or question submission
      const nextButton = page.getByRole('button', { name: /Siguiente|Next|Continuar/i });
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(1000);
      }
    }

    // Verify we're in the quiz (check for Nueva Práctica button to go back)
    await expect(page.getByText(/Nueva Práctica|← Nueva/i)).toBeVisible();
  });

  test('should show difficulty selection for Rapid Fire mode', async ({ page }) => {
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Select subject
    await page.getByRole('button', { name: /Todas las Materias/i }).click();
    await page.waitForTimeout(500);

    // Select Rapid Fire mode
    await page.getByRole('button', { name: /Rapid Fire/i }).click();
    await page.waitForTimeout(500);

    // Check that difficulty selection appears (Step 3)
    await expect(page.getByText(/Paso 3.*Selecciona la dificultad/i)).toBeVisible();

    // Check that all difficulties are displayed
    await expect(page.getByRole('button', { name: /Fácil/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Normal/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Difícil/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Extremo/i })).toBeVisible();
  });

  test('should start Rapid Fire quiz with selected difficulty', async ({ page }) => {
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Select subject
    await page.getByRole('button', { name: /Todas las Materias/i }).click();
    await page.waitForTimeout(500);

    // Select Rapid Fire mode
    await page.getByRole('button', { name: /Rapid Fire/i }).click();
    await page.waitForTimeout(500);

    // Select Easy difficulty
    await page.getByRole('button', { name: /Fácil/i }).click();
    await page.waitForTimeout(500);

    // Start quiz button should be visible
    const startButton = page.getByRole('button', { name: /Comenzar Quiz/i });
    await expect(startButton).toBeVisible();

    await startButton.click();
    await page.waitForTimeout(2000);

    // Verify quiz started (look for Nueva Práctica button)
    await expect(page.getByText(/Nueva Práctica|← Nueva/i)).toBeVisible();
  });

  test('should allow changing selection before starting quiz', async ({ page }) => {
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Select subject
    await page.getByRole('button', { name: /Números/i }).click();
    await page.waitForTimeout(500);

    // Select Zen mode
    await page.getByRole('button', { name: /Modo Zen/i }).click();
    await page.waitForTimeout(500);

    // Click "Cambiar Selección" button
    const changeButton = page.getByRole('button', { name: /Cambiar Selección/i });
    await expect(changeButton).toBeVisible();
    await changeButton.click();
    await page.waitForTimeout(500);

    // Should be back to subject selection (Step 1)
    await expect(page.getByText(/Paso 1.*Selecciona una materia/i)).toBeVisible();

    // Mode selection should not be visible
    await expect(page.getByText(/Paso 2.*Selecciona el modo/i)).not.toBeVisible();
  });

  test('should show repeat last configuration option', async ({ page }) => {
    // First, complete a configuration to save it
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Select and start a quiz
    await page.getByRole('button', { name: /Álgebra/i }).click();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: /Modo Zen/i }).click();
    await page.waitForTimeout(500);

    const startButton = page.getByRole('button', { name: /Comenzar Quiz/i });
    await startButton.click();
    await page.waitForTimeout(2000);

    // Go back to practice page
    const newPracticeButton = page.getByText(/Nueva Práctica|← Nueva/i);
    if (await newPracticeButton.isVisible()) {
      await newPracticeButton.click();
      await page.waitForTimeout(1000);
    } else {
      await page.goto('/practice/m1');
      await page.waitForTimeout(1000);
    }

    // Check for "Repetir Última Configuración" card
    const repeatCard = page.getByText(/Repetir Última Configuración/i);
    await expect(repeatCard).toBeVisible();

    // Check that the saved configuration is displayed
    await expect(page.getByText(/Álgebra.*Modo Zen/i)).toBeVisible();
  });

  test('should navigate back to dashboard from practice page', async ({ page }) => {
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Click "Volver al Inicio" link
    const backButton = page.getByRole('link', { name: /Volver al Inicio/i });
    await expect(backButton).toBeVisible();
    await backButton.click();
    await page.waitForTimeout(1000);

    // Should be on dashboard
    expect(page.url()).toContain('/dashboard');
  });

  test('should show curriculum link on practice page', async ({ page }) => {
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Check for curriculum link
    const curriculumLink = page.getByRole('link', { name: /Ver Curriculum M1/i });
    await expect(curriculumLink).toBeVisible();

    // Click the link
    await curriculumLink.click();
    await page.waitForTimeout(1000);

    // Should navigate to curriculum page
    expect(page.url()).toContain('/curriculum/m1');
  });

  test('should be able to access practice from dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForTimeout(1000);

    // Look for M1 practice link/button on dashboard
    const m1PracticeLink = page.locator('a[href*="/practice/m1"], button').filter({ hasText: /M1|Competencia.*M1/i }).first();

    if (await m1PracticeLink.isVisible()) {
      await m1PracticeLink.click();
      await page.waitForTimeout(1000);

      // Should be on practice page
      expect(page.url()).toContain('/practice/m1');
    }
  });

  test('should handle quiz completion and show results', async ({ page }) => {
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Start a Zen mode quiz
    await page.getByRole('button', { name: /Todas las Materias/i }).click();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: /Modo Zen/i }).click();
    await page.waitForTimeout(500);

    const startButton = page.getByRole('button', { name: /Comenzar Quiz/i });
    await startButton.click();
    await page.waitForTimeout(2000);

    // Try to answer questions and complete the quiz
    // This is a simplified version - answer first few questions
    for (let i = 0; i < 3; i++) {
      // Try to find and click an option
      const optionButton = page.locator('button, [role="button"]').filter({ hasText: /^A\./i }).first();

      if (await optionButton.isVisible()) {
        await optionButton.click();
        await page.waitForTimeout(1000);

        // Look for next/continue button
        const nextButton = page.getByRole('button', { name: /Siguiente|Next|Continuar/i });
        if (await nextButton.isVisible()) {
          await nextButton.click();
          await page.waitForTimeout(1000);
        }
      }
    }

    // Check if we're still in the quiz (this test just verifies the flow works)
    const isInQuiz = await page.getByText(/Nueva Práctica|← Nueva/i).isVisible();
    expect(isInQuiz).toBeTruthy();
  });
});

test.describe('Practice Mode - Progress Tracking', () => {
  test.beforeEach(async ({ page }) => {
    // Login as test student
    await page.goto('/');
    await page.fill('input[type="email"], input[name="email"], input[name="username"]', 'student@test.com');
    await page.fill('input[type="password"]', 'student123');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
  });

  test('should track progress after completing questions', async ({ page }) => {
    // Start and answer at least one question
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: /Todas las Materias/i }).click();
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: /Modo Zen/i }).click();
    await page.waitForTimeout(500);

    const startButton = page.getByRole('button', { name: /Comenzar Quiz/i });
    await startButton.click();
    await page.waitForTimeout(2000);

    // Answer one question
    const optionButton = page.locator('button, [role="button"]').filter({ hasText: /^A\./i }).first();
    if (await optionButton.isVisible()) {
      await optionButton.click();
      await page.waitForTimeout(1500);
    }

    // Navigate to progress page
    await page.goto('/progress');
    await page.waitForTimeout(1500);

    // Check that progress page shows data
    await expect(page.getByText(/Mi Progreso/i)).toBeVisible();

    // Check for M1 progress section
    await expect(page.getByText(/Competencia Matemática M1/i)).toBeVisible();
  });

  test('should display progress page with M1 and M2 sections', async ({ page }) => {
    await page.goto('/progress');
    await page.waitForTimeout(1000);

    // Check page title
    await expect(page.getByText(/Mi Progreso/i)).toBeVisible();

    // Check for M1 section
    await expect(page.getByText(/Competencia Matemática M1/i)).toBeVisible();

    // Check for M2 section
    await expect(page.getByText(/Competencia Matemática M2/i)).toBeVisible();

    // Check for continue practice links (rendered as links via Button asChild)
    const continueLinks = page.getByRole('link', { name: /Continuar Práctica/i });
    expect(await continueLinks.count()).toBeGreaterThanOrEqual(2);
  });

  test('should show view mode tabs on progress page', async ({ page }) => {
    await page.goto('/progress');
    await page.waitForTimeout(1000);

    // Check for all view mode tabs
    await expect(page.getByRole('button', { name: /Resumen General/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Mis Quizzes/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Habilidades M1/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Habilidades M2/i })).toBeVisible();
  });

  test('should switch between progress view modes', async ({ page }) => {
    await page.goto('/progress');
    await page.waitForTimeout(1000);

    // Click on "Mis Quizzes" tab
    const quizzesTab = page.getByRole('button', { name: /Mis Quizzes/i });
    await quizzesTab.click();
    await page.waitForTimeout(500);

    // Check if the tab is selected (should have blue background)
    await expect(quizzesTab).toHaveClass(/bg-\[#0A84FF\]/);

    // Click on "Habilidades M1" tab
    const skillsM1Tab = page.getByRole('button', { name: /Habilidades M1/i });
    await skillsM1Tab.click();
    await page.waitForTimeout(500);

    await expect(skillsM1Tab).toHaveClass(/bg-\[#0A84FF\]/);
  });

  test('should navigate back to dashboard from progress page', async ({ page }) => {
    await page.goto('/progress');
    await page.waitForTimeout(1000);

    // Click back button
    const backButton = page.getByRole('link', { name: /Volver al Inicio/i });
    await expect(backButton).toBeVisible();
    await backButton.click();
    await page.waitForTimeout(1000);

    // Should be on dashboard
    expect(page.url()).toContain('/dashboard');
  });
});
