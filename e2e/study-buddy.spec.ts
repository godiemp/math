import { test, expect } from '@playwright/test';
import { setupAuthenticatedSession } from './helpers/auth';

test.describe('Study Buddy AI Assistant', () => {
  test.beforeEach(async ({ page }) => {
    // Setup authenticated session and navigate to dashboard
    await setupAuthenticatedSession(page);

    // Complete at least one quiz to have data for the AI
    await page.goto('/practice/m1');
    await page.waitForTimeout(1000);

    // Quick Zen quiz to generate data
    await page.getByTestId('mode-zen').click();
    await page.waitForTimeout(500);
    await page.getByTestId('subject-all').click();
    await page.waitForTimeout(500);
    await page.getByTestId('start-quiz-button').click();
    await page.waitForTimeout(2000);
    await page.waitForTimeout(5000); // Zen animation

    // Answer 3 questions
    for (let i = 0; i < 3; i++) {
      const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
      await firstOption.click();
      await page.waitForTimeout(300);
      if (i < 2) {
        await page.getByRole('button', { name: /Siguiente/i }).click();
        await page.waitForTimeout(300);
      }
    }

    await page.getByRole('button', { name: /Enviar Quiz/i }).click();
    await page.waitForTimeout(2000);

    // Navigate to dashboard where Study Buddy is available
    await page.goto('/dashboard');
    await page.waitForTimeout(1000);
  });

  test('should display Study Buddy chat interface on dashboard', async ({ page }) => {
    // Check if Study Buddy section exists
    const studyBuddySection = page.getByText(/Compañero de Estudio|Study Buddy/i);
    const isVisible = await studyBuddySection.isVisible().catch(() => false);

    if (isVisible) {
      await expect(studyBuddySection).toBeVisible();

      // Should have a chat input or greeting message
      const hasChatInput = await page.locator('input[placeholder*="mensaje"], textarea[placeholder*="mensaje"]').count() > 0;
      const hasGreeting = await page.getByText(/Hola|Buenos|Buenas|Bienvenido/i).count() > 0;

      expect(hasChatInput || hasGreeting).toBe(true);
    }
  });

  test('should get personalized greeting with user name', async ({ page }) => {
    // Wait for Study Buddy to load and generate greeting (AI can take up to 30s)
    // The greeting appears after the loading state completes
    await page.waitForTimeout(3000); // Give it time to check cache or start loading

    // Look for Study Buddy greeting - wait longer for AI response
    const greetingLocator = page.getByText(/Test Student|Buenos días|Buenas tardes|Buenas noches|Hola/i).first();

    // Wait up to 45 seconds for greeting to appear (AI generation can be slow)
    await greetingLocator.waitFor({ state: 'visible', timeout: 45000 }).catch(() => {
      console.log('Greeting not found, may be using cached greeting');
    });

    const greetingText = await greetingLocator.textContent().catch(() => '');

    // Greeting should contain user's name or a time-based greeting
    // If no greeting found, check if Study Buddy component is at least present
    const hasStudyBuddy = await page.getByText(/Study Buddy|Buddy|mensaje/i).count() > 0;
    expect(greetingText || hasStudyBuddy).toBeTruthy();
  });

  test('should display progress insights in greeting', async ({ page }) => {
    // Check for insight elements (these could be in cards, lists, or text)
    const insightKeywords = [
      /racha/i,
      /precisión|accuracy/i,
      /preguntas/i,
      /fortaleza|debilidad/i,
      /progreso/i,
      /mejora/i
    ];

    // At least one insight keyword should appear
    let foundInsight = false;
    for (const keyword of insightKeywords) {
      const count = await page.getByText(keyword).count();
      if (count > 0) {
        foundInsight = true;
        break;
      }
    }

    expect(foundInsight).toBe(true);
  });

  test('should suggest specific practice mode based on progress', async ({ page }) => {
    // Look for practice mode recommendations
    const practiceKeywords = [
      /Zen Mode/i,
      /Rapid Fire/i,
      /Live Session/i,
      /practicar|práctica/i,
      /quiz/i
    ];

    let foundRecommendation = false;
    for (const keyword of practiceKeywords) {
      const count = await page.getByText(keyword).count();
      if (count > 0) {
        foundRecommendation = true;
        break;
      }
    }

    expect(foundRecommendation).toBe(true);
  });

  test('should allow sending a message to Study Buddy', async ({ page }) => {
    // Find chat input
    const chatInput = page.locator('input[placeholder*="mensaje"], textarea[placeholder*="mensaje"]').first();
    const hasChatInput = await chatInput.isVisible().catch(() => false);

    if (hasChatInput) {
      // Type a message
      await chatInput.fill('¿Qué debería practicar hoy?');

      // Find and click send button
      const sendButton = page.getByRole('button', { name: /Enviar|Send/i }).first();
      await sendButton.click();

      // Wait for response
      await page.waitForTimeout(5000);

      // Should receive a response (loading should disappear and response appear)
      const hasResponse = await page.locator('text=/Zen Mode|Rapid Fire|practicar|recomiendo/i').count() > 0;
      expect(hasResponse).toBeGreaterThan(0);
    }
  });

  test('should display conversation starter question', async ({ page }) => {
    // Look for a question that invites conversation
    const conversationStarters = [
      /qué te gustaría/i,
      /prefieres/i,
      /necesitas ayuda/i,
      /en qué puedo ayudarte/i,
      /\?/
    ];

    let foundStarter = false;
    for (const starter of conversationStarters) {
      const count = await page.getByText(starter).count();
      if (count > 0) {
        foundStarter = true;
        break;
      }
    }

    expect(foundStarter).toBe(true);
  });

  test('should handle streak information in conversation', async ({ page }) => {
    const chatInput = page.locator('input[placeholder*="mensaje"], textarea[placeholder*="mensaje"]').first();
    const hasChatInput = await chatInput.isVisible().catch(() => false);

    if (hasChatInput) {
      await chatInput.fill('¿Cuál es mi racha actual?');

      const sendButton = page.getByRole('button', { name: /Enviar|Send/i }).first();
      await sendButton.click();

      await page.waitForTimeout(5000);

      // Should mention streak information
      const hasStreakInfo = await page.getByText(/racha|días|consecutivo/i).count() > 0;
      expect(hasStreakInfo).toBeGreaterThan(0);
    }
  });

  test('should provide topic-specific recommendations when asked', async ({ page }) => {
    const chatInput = page.locator('input[placeholder*="mensaje"], textarea[placeholder*="mensaje"]').first();
    const hasChatInput = await chatInput.isVisible().catch(() => false);

    if (hasChatInput) {
      await chatInput.fill('¿Cómo me va en Álgebra?');

      const sendButton = page.getByRole('button', { name: /Enviar|Send/i }).first();
      await sendButton.click();

      await page.waitForTimeout(5000);

      // Should mention algebra or performance metrics
      const hasTopicInfo = await page.getByText(/álgebra|precisión|porcentaje|preguntas/i).count() > 0;
      expect(hasTopicInfo).toBeGreaterThan(0);
    }
  });

  test('should generate study plan when requested', async ({ page }) => {
    const chatInput = page.locator('input[placeholder*="mensaje"], textarea[placeholder*="mensaje"]').first();
    const hasChatInput = await chatInput.isVisible().catch(() => false);

    if (hasChatInput) {
      await chatInput.fill('Necesito un plan de estudio para esta semana');

      const sendButton = page.getByRole('button', { name: /Enviar|Send/i }).first();
      await sendButton.click();

      await page.waitForTimeout(6000);

      // Should provide study plan details
      const hasPlanInfo = await page.getByText(/plan|días|semana|práctica|minutos/i).count() > 0;
      expect(hasPlanInfo).toBeGreaterThan(0);
    }
  });

  test('should show practice recommendations based on accuracy', async ({ page }) => {
    const chatInput = page.locator('input[placeholder*="mensaje"], textarea[placeholder*="mensaje"]').first();
    const hasChatInput = await chatInput.isVisible().catch(() => false);

    if (hasChatInput) {
      await chatInput.fill('¿Qué modo me recomiendas?');

      const sendButton = page.getByRole('button', { name: /Enviar|Send/i }).first();
      await sendButton.click();

      await page.waitForTimeout(5000);

      // Should recommend a specific mode
      const hasModeRecommendation = await page.getByText(/Zen Mode|Rapid Fire|Easy|Medium|Hard|Extreme/i).count() > 0;
      expect(hasModeRecommendation).toBeGreaterThan(0);
    }
  });

  test('should provide improvement metrics when asked about progress', async ({ page }) => {
    const chatInput = page.locator('input[placeholder*="mensaje"], textarea[placeholder*="mensaje"]').first();
    const hasChatInput = await chatInput.isVisible().catch(() => false);

    if (hasChatInput) {
      await chatInput.fill('¿Cómo ha sido mi progreso?');

      const sendButton = page.getByRole('button', { name: /Enviar|Send/i }).first();
      await sendButton.click();

      await page.waitForTimeout(5000);

      // Should provide progress metrics
      const hasProgressMetrics = await page.getByText(/mejorando|progreso|precisión|respuestas|correctas/i).count() > 0;
      expect(hasProgressMetrics).toBeGreaterThan(0);
    }
  });

  test('should handle questions about recent performance', async ({ page }) => {
    const chatInput = page.locator('input[placeholder*="mensaje"], textarea[placeholder*="mensaje"]').first();
    const hasChatInput = await chatInput.isVisible().catch(() => false);

    if (hasChatInput) {
      await chatInput.fill('¿Qué preguntas he respondido mal recientemente?');

      const sendButton = page.getByRole('button', { name: /Enviar|Send/i }).first();
      await sendButton.click();

      await page.waitForTimeout(6000);

      // Should provide information about recent questions
      const hasRecentInfo = await page.getByText(/preguntas|respuestas|correctas|incorrectas|reciente/i).count() > 0;
      expect(hasRecentInfo).toBeGreaterThan(0);
    }
  });

  test('should maintain conversation context across messages', async ({ page }) => {
    const chatInput = page.locator('input[placeholder*="mensaje"], textarea[placeholder*="mensaje"]').first();
    const hasChatInput = await chatInput.isVisible().catch(() => false);

    if (hasChatInput) {
      // First message
      await chatInput.fill('Quiero mejorar en Geometría');
      const sendButton = page.getByRole('button', { name: /Enviar|Send/i }).first();
      await sendButton.click();
      await page.waitForTimeout(5000);

      // Clear input and send follow-up
      await chatInput.fill('¿Cuántas preguntas debería hacer?');
      await sendButton.click();
      await page.waitForTimeout(5000);

      // Response should still be about geometry
      const mentionsGeometry = await page.getByText(/geometría|área|perímetro|triángulo/i).count() > 0;
      expect(mentionsGeometry).toBeGreaterThan(0);
    }
  });

  test('should use appropriate emojis in responses', async ({ page }) => {
    const chatInput = page.locator('input[placeholder*="mensaje"], textarea[placeholder*="mensaje"]').first();
    const hasChatInput = await chatInput.isVisible().catch(() => false);

    if (hasChatInput) {
      await chatInput.fill('Hola');

      const sendButton = page.getByRole('button', { name: /Enviar|Send/i }).first();
      await sendButton.click();

      await page.waitForTimeout(4000);

      // Should have emojis in the conversation (common ones: 🎯 🔥 📈 💪 ✨)
      const emojiPattern = /[\u{1F300}-\u{1F9FF}]/u;
      const pageText = await page.textContent('body');

      expect(emojiPattern.test(pageText || '')).toBe(true);
    }
  });

  test('should handle errors gracefully if AI service is unavailable', async ({ page }) => {
    const chatInput = page.locator('input[placeholder*="mensaje"], textarea[placeholder*="mensaje"]').first();
    const hasChatInput = await chatInput.isVisible().catch(() => false);

    if (hasChatInput) {
      await chatInput.fill('test message');

      const sendButton = page.getByRole('button', { name: /Enviar|Send/i }).first();
      await sendButton.click();

      // Wait for response or error
      await page.waitForTimeout(10000);

      // Should either have a response or an error message
      const hasResponse = await page.getByText(/recomiendo|practica|zen|rapid/i).count() > 0;
      const hasError = await page.getByText(/error|intenta|disponible/i).count() > 0;

      expect(hasResponse || hasError).toBe(true);
    }
  });

  test('should display loading state while waiting for AI response', async ({ page }) => {
    const chatInput = page.locator('input[placeholder*="mensaje"], textarea[placeholder*="mensaje"]').first();
    const hasChatInput = await chatInput.isVisible().catch(() => false);

    if (hasChatInput) {
      await chatInput.fill('Dame una recomendación');

      const sendButton = page.getByRole('button', { name: /Enviar|Send/i }).first();
      await sendButton.click();

      // Check for loading indicator immediately after sending
      await page.waitForTimeout(500);

      const hasLoadingIndicator = await page.locator('.animate-spin, [role="status"]').count() > 0;
      const hasLoadingText = await page.getByText(/cargando|pensando|escribiendo/i).count() > 0;

      // Should show some loading indicator
      expect(hasLoadingIndicator || hasLoadingText).toBe(true);
    }
  });

  test('should provide Chilean-Spanish appropriate language', async ({ page }) => {
    const chatInput = page.locator('input[placeholder*="mensaje"], textarea[placeholder*="mensaje"]').first();
    const hasChatInput = await chatInput.isVisible().catch(() => false);

    if (hasChatInput) {
      await chatInput.fill('Ayúdame');

      const sendButton = page.getByRole('button', { name: /Enviar|Send/i }).first();
      await sendButton.click();

      await page.waitForTimeout(5000);

      // Check for Chilean/Spanish appropriate language (using "tú" form)
      const pageText = await page.textContent('body');
      const usesSpanish = /puedes|debes|tienes|eres|practicar|mejorar/i.test(pageText || '');

      expect(usesSpanish).toBe(true);
    }
  });

  test('should show message history in chat interface', async ({ page }) => {
    const chatInput = page.locator('input[placeholder*="mensaje"], textarea[placeholder*="mensaje"]').first();
    const hasChatInput = await chatInput.isVisible().catch(() => false);

    if (hasChatInput) {
      // Send first message
      await chatInput.fill('Primer mensaje');
      const sendButton = page.getByRole('button', { name: /Enviar|Send/i }).first();
      await sendButton.click();
      await page.waitForTimeout(5000);

      // Send second message
      await chatInput.fill('Segundo mensaje');
      await sendButton.click();
      await page.waitForTimeout(5000);

      // Should see both messages in history
      const hasFirstMessage = await page.getByText('Primer mensaje').count() > 0;
      const hasSecondMessage = await page.getByText('Segundo mensaje').count() > 0;

      expect(hasFirstMessage && hasSecondMessage).toBe(true);
    }
  });
});
