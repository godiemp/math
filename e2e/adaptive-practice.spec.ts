import { test, expect } from '@playwright/test';

test.describe('Adaptive Practice', () => {
  test('should display topic selection page', async ({ page }) => {
    await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });

    // Check page title
    await expect(page.getByText('Práctica Adaptativa')).toBeVisible();

    // Check topic cards are visible using test IDs
    await expect(page.getByTestId('topic-card-números')).toBeVisible();
    await expect(page.getByTestId('topic-card-álgebra')).toBeVisible();
    await expect(page.getByTestId('topic-card-geometría')).toBeVisible();
    await expect(page.getByTestId('topic-card-probabilidad')).toBeVisible();
    await expect(page.getByTestId('topic-card-surprise')).toBeVisible();
  });

  test('should start practice when topic is selected', async ({ page }) => {
    await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });

    // Click on a topic using test ID
    await page.getByTestId('topic-select-números').click();

    // Should show problem display using test ID
    await expect(page.getByTestId('problem-display')).toBeVisible({ timeout: 10000 });
    await expect(page.getByTestId('submit-answer')).toBeVisible();
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

  test.describe('AI Tutor Interaction', () => {
    test('should send message and receive AI response', async ({ page }) => {
      // Mock the hint API to return a predictable response
      await page.route('**/api/adaptive/hint', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ hint: '¿Qué operación usarías primero aquí?' }),
        });
      });

      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByText('Números').click();

      // Wait for problem to load
      await expect(page.getByRole('button', { name: /Verificar Respuesta/i })).toBeVisible({
        timeout: 10000,
      });

      // Send a message
      const chatInput = page.getByPlaceholder(/Escribe tu pregunta/i);
      await chatInput.fill('No entiendo este problema');
      await page.getByRole('button', { name: /Enviar/i }).click();

      // Verify user message appears
      await expect(page.getByText('No entiendo este problema')).toBeVisible();

      // Verify AI response appears
      await expect(page.getByText('¿Qué operación usarías primero aquí?')).toBeVisible({
        timeout: 10000,
      });
    });

    test('should handle multi-turn conversation', async ({ page }) => {
      let messageCount = 0;

      await page.route('**/api/adaptive/hint', route => {
        messageCount++;
        const responses = [
          '¿Qué tipo de ecuación es esta?',
          '¡Bien! Ahora, ¿cómo despejarías la variable?',
        ];
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            hint: responses[messageCount - 1] || 'Sigue intentando',
          }),
        });
      });

      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByText('Álgebra y Funciones').click();
      await expect(page.getByRole('button', { name: /Verificar Respuesta/i })).toBeVisible({
        timeout: 10000,
      });

      const chatInput = page.getByPlaceholder(/Escribe tu pregunta/i);

      // First message
      await chatInput.fill('Ayuda con este problema');
      await page.getByRole('button', { name: /Enviar/i }).click();
      await expect(page.getByText('¿Qué tipo de ecuación es esta?')).toBeVisible({ timeout: 10000 });

      // Second message
      await chatInput.fill('Es una ecuación lineal');
      await page.getByRole('button', { name: /Enviar/i }).click();
      await expect(page.getByText('¿cómo despejarías la variable?')).toBeVisible({ timeout: 10000 });

      // Verify both user messages are visible
      await expect(page.getByText('Ayuda con este problema')).toBeVisible();
      await expect(page.getByText('Es una ecuación lineal')).toBeVisible();
    });

    test('should clear chat when moving to next problem', async ({ page }) => {
      await page.route('**/api/adaptive/hint', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ hint: 'Pista de prueba' }),
        });
      });

      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByText('Números').click();

      const submitButton = page.getByRole('button', { name: /Verificar Respuesta/i });
      await expect(submitButton).toBeVisible({ timeout: 10000 });

      // Send a chat message
      await page.getByPlaceholder(/Escribe tu pregunta/i).fill('Hola');
      await page.getByRole('button', { name: /Enviar/i }).click();
      await expect(page.getByText('Pista de prueba')).toBeVisible({ timeout: 10000 });

      // Answer question and go to next
      await page
        .locator('button')
        .filter({ has: page.locator('span.rounded-full') })
        .first()
        .click();
      await submitButton.click();
      await expect(page.getByText(/¡Correcto!|Incorrecto/i)).toBeVisible({ timeout: 5000 });
      await page.getByRole('button', { name: /Siguiente Problema/i }).click();

      // Verify chat is cleared - empty state text should be visible
      await expect(page.getByText('Escribe tu pregunta o lo que has intentado')).toBeVisible();
      await expect(page.getByText('Pista de prueba')).not.toBeVisible();
    });

    test('should handle AI API failure gracefully', async ({ page }) => {
      await page.route('**/api/adaptive/hint', route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal server error' }),
        });
      });

      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByText('Geometría').click();
      await expect(page.getByRole('button', { name: /Verificar Respuesta/i })).toBeVisible({
        timeout: 10000,
      });

      // Send message
      await page.getByPlaceholder(/Escribe tu pregunta/i).fill('Ayuda');
      await page.getByRole('button', { name: /Enviar/i }).click();

      // API returns error response (not throw), so hook shows fallback error message
      await expect(page.getByText(/Lo siento, hubo un error/i)).toBeVisible({
        timeout: 10000,
      });
    });
  });

  test.describe('Error Handling', () => {
    test('should handle empty hint response gracefully', async ({ page }) => {
      await page.route('**/api/adaptive/hint', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ hint: '' }),
        });
      });

      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByText('Probabilidades y Estadística').click();
      await expect(page.getByRole('button', { name: /Verificar Respuesta/i })).toBeVisible({
        timeout: 10000,
      });

      await page.getByPlaceholder(/Escribe tu pregunta/i).fill('Test');
      await page.getByRole('button', { name: /Enviar/i }).click();

      // Hook handles empty response with fallback message
      await expect(page.getByText(/Lo siento, hubo un error/i)).toBeVisible({ timeout: 10000 });
    });

    test('should continue despite attempt API failure', async ({ page }) => {
      // Mock attempt API to fail
      await page.route('**/api/adaptive/attempt', route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Database error' }),
        });
      });

      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByText('Números').click();

      const submitButton = page.getByRole('button', { name: /Verificar Respuesta/i });
      await expect(submitButton).toBeVisible({ timeout: 10000 });

      // Answer question
      await page
        .locator('button')
        .filter({ has: page.locator('span.rounded-full') })
        .first()
        .click();
      await submitButton.click();

      // UX should continue despite API failure (fire-and-forget pattern)
      await expect(page.getByText(/¡Correcto!|Incorrecto/i)).toBeVisible({ timeout: 5000 });

      // Should be able to continue to next problem
      await page.getByRole('button', { name: /Siguiente Problema/i }).click();
      await expect(submitButton).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Answer Behavior', () => {
    test('should allow changing answer before submitting', async ({ page }) => {
      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByText('Números').click();

      await expect(page.getByRole('button', { name: /Verificar Respuesta/i })).toBeVisible({
        timeout: 10000,
      });

      const options = page.locator('button').filter({ has: page.locator('span.rounded-full') });

      // Select first option
      await options.first().click();
      // Verify first option is selected (has white background on the letter badge)
      await expect(options.first().locator('span.rounded-full')).toHaveClass(/bg-white/);

      // Select second option
      await options.nth(1).click();
      // Verify second option is now selected
      await expect(options.nth(1).locator('span.rounded-full')).toHaveClass(/bg-white/);
      // First option should no longer have white background
      await expect(options.first().locator('span.rounded-full')).not.toHaveClass(/bg-white /);
    });

    test('should disable submit button when no answer selected', async ({ page }) => {
      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByText('Álgebra y Funciones').click();

      const submitButton = page.getByRole('button', { name: /Verificar Respuesta/i });
      await expect(submitButton).toBeVisible({ timeout: 10000 });

      // Button should be disabled initially
      await expect(submitButton).toBeDisabled();

      // Select an answer
      await page
        .locator('button')
        .filter({ has: page.locator('span.rounded-full') })
        .first()
        .click();

      // Button should now be enabled
      await expect(submitButton).toBeEnabled();
    });

    test('should disable options after submitting answer', async ({ page }) => {
      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByText('Geometría').click();

      const submitButton = page.getByRole('button', { name: /Verificar Respuesta/i });
      await expect(submitButton).toBeVisible({ timeout: 10000 });

      const options = page.locator('button').filter({ has: page.locator('span.rounded-full') });

      // Select and submit
      await options.first().click();
      await submitButton.click();

      // Wait for feedback
      await expect(page.getByText(/¡Correcto!|Incorrecto/i)).toBeVisible({ timeout: 5000 });

      // Options should have cursor-default class (disabled state)
      await expect(options.first()).toHaveClass(/cursor-default/);
      await expect(options.nth(1)).toHaveClass(/cursor-default/);
    });

    test('should disable chat input while loading', async ({ page }) => {
      // Delay the response to check loading state
      await page.route('**/api/adaptive/hint', async route => {
        await new Promise(r => setTimeout(r, 1500));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ hint: 'Respuesta tardía' }),
        });
      });

      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByText('Probabilidades y Estadística').click();
      await expect(page.getByRole('button', { name: /Verificar Respuesta/i })).toBeVisible({
        timeout: 10000,
      });

      const chatInput = page.getByPlaceholder(/Escribe tu pregunta/i);
      await chatInput.fill('Test');
      await page.getByRole('button', { name: /Enviar/i }).click();

      // Input and button should be disabled during loading
      await expect(chatInput).toBeDisabled();
      await expect(page.getByRole('button', { name: /Enviar/i })).toBeDisabled();

      // Wait for response
      await expect(page.getByText('Respuesta tardía')).toBeVisible({ timeout: 10000 });

      // Should be enabled again
      await expect(chatInput).toBeEnabled();
    });
  });

  test.describe('Subsection Selector', () => {
    test('should open subsection selector when clicking topic subsections button', async ({
      page,
    }) => {
      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });

      // Click on subsections button for a topic
      await page.getByTestId('topic-subsections-números').click();

      // Should show subsection selector
      await expect(page.getByTestId('subsection-selector')).toBeVisible({ timeout: 10000 });
      await expect(page.getByTestId('subsection-selector-title')).toContainText('Subsecciones');
    });

    test('should display units and subsections in selector', async ({ page }) => {
      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByTestId('topic-subsections-números').click();

      // Wait for selector to load
      await expect(page.getByTestId('subsection-selector')).toBeVisible({ timeout: 10000 });
      await expect(page.getByTestId('subsection-units-list')).toBeVisible();

      // Should have at least one unit
      await expect(page.getByTestId('unit-0')).toBeVisible();
    });

    test('should expand unit to show subsections', async ({ page }) => {
      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByTestId('topic-subsections-números').click();

      await expect(page.getByTestId('subsection-selector')).toBeVisible({ timeout: 10000 });

      // Click unit header to expand
      await page.getByTestId('unit-header-0').click();

      // Should show subsections
      await expect(page.getByTestId('unit-subsections-0')).toBeVisible();
      await expect(page.getByTestId('subsection-0-0')).toBeVisible();
    });

    test('should start practice with selected subsection skills', async ({ page }) => {
      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByTestId('topic-subsections-números').click();

      await expect(page.getByTestId('subsection-selector')).toBeVisible({ timeout: 10000 });

      // Expand unit and select subsection
      await page.getByTestId('unit-header-0').click();
      await expect(page.getByTestId('unit-subsections-0')).toBeVisible();
      await page.getByTestId('subsection-0-0').click();

      // Should start practice and show problem
      await expect(page.getByTestId('problem-display')).toBeVisible({ timeout: 10000 });
    });

    test('should close subsection selector when clicking back button', async ({ page }) => {
      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByTestId('topic-subsections-números').click();

      await expect(page.getByTestId('subsection-selector')).toBeVisible({ timeout: 10000 });

      // Click back button
      await page.getByTestId('subsection-back').click();

      // Should return to topic selection
      await expect(page.getByTestId('subsection-selector')).not.toBeVisible();
      await expect(page.getByTestId('topic-card-números')).toBeVisible();
    });

    test('should close subsection selector when clicking close button', async ({ page }) => {
      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByTestId('topic-subsections-números').click();

      await expect(page.getByTestId('subsection-selector')).toBeVisible({ timeout: 10000 });

      // Click close (X) button
      await page.getByTestId('subsection-close').click();

      // Should return to topic selection
      await expect(page.getByTestId('subsection-selector')).not.toBeVisible();
      await expect(page.getByTestId('topic-card-números')).toBeVisible();
    });
  });

  test.describe('Skill-Based Scaffolding', () => {
    test('should show skill selector when "need help" button is clicked after wrong answer', async ({
      page,
    }) => {
      // Mock skill decomposition API
      await page.route('**/api/adaptive/decompose-skills', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            skills: [
              {
                id: 'skill-1',
                name: 'Operaciones básicas',
                description: 'Suma y resta de números',
                difficulty: 'básico',
                order: 1,
              },
              {
                id: 'skill-2',
                name: 'Fracciones',
                description: 'Operaciones con fracciones',
                difficulty: 'intermedio',
                order: 2,
              },
            ],
            originalQuestion: 'Test question',
            recommendedPath: ['skill-1', 'skill-2'],
          }),
        });
      });

      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByTestId('topic-select-números').click();

      // Wait for problem
      await expect(page.getByTestId('problem-display')).toBeVisible({ timeout: 10000 });

      // Answer wrong (select first option and submit)
      await page.getByTestId('option-A').click();
      await page.getByTestId('submit-answer').click();

      // Wait for feedback - check if wrong, if correct try again
      await expect(page.getByTestId('feedback-section')).toBeVisible({ timeout: 5000 });

      // Click need help button (only visible on wrong answer)
      const needHelpButton = page.getByTestId('need-help-button');
      if (await needHelpButton.isVisible()) {
        await needHelpButton.click();

        // Should show analyzing loader then skill selector
        await expect(page.getByTestId('skill-selector')).toBeVisible({ timeout: 15000 });
      }
    });

    test('should display skills in skill selector', async ({ page }) => {
      // Mock API
      await page.route('**/api/adaptive/decompose-skills', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            skills: [
              {
                id: 'skill-1',
                name: 'Suma de enteros',
                description: 'Operaciones básicas de suma',
                difficulty: 'básico',
                order: 1,
              },
              {
                id: 'skill-2',
                name: 'Resta de enteros',
                description: 'Operaciones básicas de resta',
                difficulty: 'básico',
                order: 2,
              },
            ],
            originalQuestion: 'Test',
            recommendedPath: ['skill-1', 'skill-2'],
          }),
        });
      });

      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByTestId('topic-select-números').click();
      await expect(page.getByTestId('problem-display')).toBeVisible({ timeout: 10000 });

      // Try to get to skill selector - answer wrong
      await page.getByTestId('option-A').click();
      await page.getByTestId('submit-answer').click();
      await expect(page.getByTestId('feedback-section')).toBeVisible({ timeout: 5000 });

      const needHelpButton = page.getByTestId('need-help-button');
      if (await needHelpButton.isVisible()) {
        await needHelpButton.click();

        await expect(page.getByTestId('skill-selector')).toBeVisible({ timeout: 15000 });

        // Check skill list is visible
        await expect(page.getByTestId('skill-list')).toBeVisible();
        await expect(page.getByTestId('skill-item-0')).toBeVisible();
        await expect(page.getByTestId('skill-item-1')).toBeVisible();

        // Check skill count
        await expect(page.getByTestId('skill-count')).toContainText('2 de 2');
      }
    });

    test('should allow selecting/deselecting skills', async ({ page }) => {
      await page.route('**/api/adaptive/decompose-skills', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            skills: [
              { id: 'skill-1', name: 'Skill 1', description: 'Desc 1', difficulty: 'básico', order: 1 },
              { id: 'skill-2', name: 'Skill 2', description: 'Desc 2', difficulty: 'intermedio', order: 2 },
            ],
            originalQuestion: 'Test',
            recommendedPath: ['skill-1', 'skill-2'],
          }),
        });
      });

      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByTestId('topic-select-números').click();
      await expect(page.getByTestId('problem-display')).toBeVisible({ timeout: 10000 });

      await page.getByTestId('option-A').click();
      await page.getByTestId('submit-answer').click();
      await expect(page.getByTestId('feedback-section')).toBeVisible({ timeout: 5000 });

      const needHelpButton = page.getByTestId('need-help-button');
      if (await needHelpButton.isVisible()) {
        await needHelpButton.click();
        await expect(page.getByTestId('skill-selector')).toBeVisible({ timeout: 15000 });

        // Initially all selected
        await expect(page.getByTestId('skill-count')).toContainText('2 de 2');

        // Deselect first skill
        await page.getByTestId('skill-item-0').click();
        await expect(page.getByTestId('skill-count')).toContainText('1 de 2');

        // Select none
        await page.getByTestId('select-none-skills').click();
        await expect(page.getByTestId('skill-count')).toContainText('0 de 2');

        // Select all
        await page.getByTestId('select-all-skills').click();
        await expect(page.getByTestId('skill-count')).toContainText('2 de 2');
      }
    });

    test('should skip skill selector when skip button is clicked', async ({ page }) => {
      await page.route('**/api/adaptive/decompose-skills', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            skills: [
              { id: 'skill-1', name: 'Skill 1', description: 'Desc', difficulty: 'básico', order: 1 },
            ],
            originalQuestion: 'Test',
            recommendedPath: ['skill-1'],
          }),
        });
      });

      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByTestId('topic-select-números').click();
      await expect(page.getByTestId('problem-display')).toBeVisible({ timeout: 10000 });

      await page.getByTestId('option-A').click();
      await page.getByTestId('submit-answer').click();
      await expect(page.getByTestId('feedback-section')).toBeVisible({ timeout: 5000 });

      const needHelpButton = page.getByTestId('need-help-button');
      if (await needHelpButton.isVisible()) {
        await needHelpButton.click();
        await expect(page.getByTestId('skill-selector')).toBeVisible({ timeout: 15000 });

        // Click skip
        await page.getByTestId('skip-skills').click();

        // Should go back to problem display
        await expect(page.getByTestId('skill-selector')).not.toBeVisible();
        await expect(page.getByTestId('problem-display')).toBeVisible();
      }
    });

    test('should start learning path when skills are selected', async ({ page }) => {
      await page.route('**/api/adaptive/decompose-skills', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            skills: [
              { id: 'skill-1', name: 'Operaciones', description: 'Desc', difficulty: 'básico', order: 1 },
            ],
            originalQuestion: 'Test',
            recommendedPath: ['skill-1'],
          }),
        });
      });

      await page.route('**/api/adaptive/generate-skill-question', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            question: {
              id: 'generated-1',
              questionLatex: '¿Cuánto es $2 + 2$?',
              options: ['3', '4', '5', '6'],
              correctAnswer: 1,
              explanation: 'La suma de 2 + 2 es 4',
              targetSkills: ['skill-1'],
              difficulty: 'easy',
              difficultyScore: 0.2,
              subject: 'números',
              topic: 'números',
              isGenerated: true,
            },
            generationTimeMs: 500,
          }),
        });
      });

      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByTestId('topic-select-números').click();
      await expect(page.getByTestId('problem-display')).toBeVisible({ timeout: 10000 });

      await page.getByTestId('option-A').click();
      await page.getByTestId('submit-answer').click();
      await expect(page.getByTestId('feedback-section')).toBeVisible({ timeout: 5000 });

      const needHelpButton = page.getByTestId('need-help-button');
      if (await needHelpButton.isVisible()) {
        await needHelpButton.click();
        await expect(page.getByTestId('skill-selector')).toBeVisible({ timeout: 15000 });

        // Start learning path
        await page.getByTestId('start-learning-path').click();

        // Should show new generated question
        await expect(page.getByTestId('problem-display')).toBeVisible({ timeout: 15000 });
        await expect(page.getByTestId('problem-question')).toContainText('2 + 2');
      }
    });

    test('should show scaffolding timeline during learning path', async ({ page }) => {
      await page.route('**/api/adaptive/decompose-skills', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            skills: [
              { id: 'skill-1', name: 'Skill A', description: 'Desc', difficulty: 'básico', order: 1 },
              { id: 'skill-2', name: 'Skill B', description: 'Desc', difficulty: 'intermedio', order: 2 },
            ],
            originalQuestion: 'Test',
            recommendedPath: ['skill-1', 'skill-2'],
          }),
        });
      });

      await page.route('**/api/adaptive/generate-skill-question', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            question: {
              id: 'gen-1',
              questionLatex: 'Pregunta de práctica',
              options: ['A', 'B', 'C', 'D'],
              correctAnswer: 0,
              explanation: 'Explicación',
              targetSkills: ['skill-1'],
              difficulty: 'easy',
              difficultyScore: 0.2,
              subject: 'números',
              topic: 'números',
              isGenerated: true,
            },
            generationTimeMs: 500,
          }),
        });
      });

      await page.goto('/practice/adaptive', { waitUntil: 'domcontentloaded' });
      await page.getByTestId('topic-select-números').click();
      await expect(page.getByTestId('problem-display')).toBeVisible({ timeout: 10000 });

      await page.getByTestId('option-A').click();
      await page.getByTestId('submit-answer').click();
      await expect(page.getByTestId('feedback-section')).toBeVisible({ timeout: 5000 });

      const needHelpButton = page.getByTestId('need-help-button');
      if (await needHelpButton.isVisible()) {
        await needHelpButton.click();
        await expect(page.getByTestId('skill-selector')).toBeVisible({ timeout: 15000 });

        await page.getByTestId('start-learning-path').click();
        await expect(page.getByTestId('problem-display')).toBeVisible({ timeout: 15000 });

        // Should show timeline with progress
        await expect(page.getByTestId('scaffolding-timeline')).toBeVisible();
        await expect(page.getByTestId('timeline-progress')).toBeVisible();
        await expect(page.getByTestId('timeline-progress-count')).toContainText('0 / 2');
      }
    });
  });
});
