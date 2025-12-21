# E2E Test Templates

Copy-paste these templates for common test scenarios. Replace placeholder values with your specific implementation.

---

## Template 1: Basic Authenticated Test File

Use for most tests - authentication is handled automatically.

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  // Authentication handled via storageState in playwright.config.ts
  // No beforeEach login needed

  test('should display feature page with expected elements', async ({ page }) => {
    await page.goto('/feature-path', { waitUntil: 'domcontentloaded' });

    // Check page heading
    await expect(page.getByRole('heading', { name: /Feature Title/i })).toBeVisible();

    // Check key elements
    await expect(page.getByTestId('element-1')).toBeVisible();
    await expect(page.getByTestId('element-2')).toBeVisible();
  });

  test('should perform main action successfully', async ({ page }) => {
    await page.goto('/feature-path', { waitUntil: 'domcontentloaded' });

    // Interact with element
    await page.getByTestId('action-button').click();

    // Verify result
    await expect(page.getByText(/Success/i)).toBeVisible();
  });

  test.describe('Sub-feature', () => {
    test('should handle sub-feature behavior', async ({ page }) => {
      await page.goto('/feature-path', { waitUntil: 'domcontentloaded' });

      // Sub-feature specific tests
    });
  });
});
```

---

## Template 2: Unauthenticated Test File (Login/Registration)

Use for testing auth flows from logged-out state.

```typescript
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signin');

    // Dismiss cookie banner
    await page.evaluate(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });
  });

  test('should display login form', async ({ page }) => {
    await expect(page.getByTestId('auth-heading')).toContainText(/Sign In|Iniciar/i);
    await expect(page.getByTestId('auth-email-input')).toBeVisible();
    await expect(page.getByTestId('auth-password-input')).toBeVisible();
  });

  test('should login successfully', async ({ page }) => {
    await page.getByTestId('auth-email-input').fill('student@test.com');
    await page.getByTestId('auth-password-input').fill('StudentTest123!');
    await page.getByTestId('auth-submit-button').click();

    await page.waitForURL(/\/dashboard/, { timeout: 5000 });
    expect(page.url()).toContain('/dashboard');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.getByTestId('auth-email-input').fill('wrong@test.com');
    await page.getByTestId('auth-password-input').fill('WrongPass123!');
    await page.getByTestId('auth-submit-button').click();

    await expect(page.getByTestId('auth-error-message')).toBeVisible();
    expect(page.url()).not.toContain('/dashboard');
  });
});
```

---

## Template 3: Form Validation Test

Use for testing form validation and error states.

```typescript
import { test, expect } from '@playwright/test';

test.describe('Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/form-page', { waitUntil: 'domcontentloaded' });
  });

  test('should show error for missing required field', async ({ page }) => {
    // Leave required field empty and submit
    await page.getByTestId('submit-button').click();

    // Check for error
    await expect(page.getByText(/required|requerido/i)).toBeVisible();
  });

  test('should show error for invalid email format', async ({ page }) => {
    await page.getByTestId('email-input').fill('invalid-email');
    await page.getByTestId('submit-button').click();

    await expect(page.getByText(/invalid|inválido|correo/i)).toBeVisible();
  });

  test('should show error for password too short', async ({ page }) => {
    await page.getByTestId('password-input').fill('short');
    await page.getByTestId('submit-button').click();

    await expect(page.getByText(/caracteres|characters|mínimo/i)).toBeVisible();
  });

  test('should submit successfully with valid data', async ({ page }) => {
    await page.getByTestId('email-input').fill('valid@example.com');
    await page.getByTestId('password-input').fill('ValidPass123!');
    await page.getByTestId('submit-button').click();

    await expect(page.getByText(/success|éxito/i)).toBeVisible();
  });
});
```

---

## Template 4: API Interception Test

Use for testing error handling and API edge cases.

```typescript
import { test, expect } from '@playwright/test';

test.describe('API Error Handling', () => {
  test('should handle server error gracefully', async ({ page }) => {
    // Intercept API and return error
    await page.route('**/api/endpoint', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, error: 'Internal server error' }),
      });
    });

    await page.goto('/page-that-calls-api', { waitUntil: 'domcontentloaded' });

    // Verify error handling
    await expect(page.getByText(/error|problema/i)).toBeVisible();
  });

  test('should handle network failure', async ({ page }) => {
    await page.route('**/api/endpoint', route => {
      route.abort('failed');
    });

    await page.goto('/page-that-calls-api', { waitUntil: 'domcontentloaded' });

    // Error should be handled gracefully
    await expect(page.getByText(/connection|conexión|error/i)).toBeVisible();
  });

  test('should capture and verify API payload', async ({ page }) => {
    let capturedPayload: Record<string, unknown> | null = null;

    await page.route('**/api/endpoint', async route => {
      capturedPayload = route.request().postDataJSON();
      await route.continue();
    });

    await page.goto('/page', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('trigger-api-call').click();

    // Wait for API call to complete
    await expect(page.getByText(/success|completado/i)).toBeVisible();

    expect(capturedPayload).not.toBeNull();
    expect(capturedPayload).toHaveProperty('expectedField');
  });

  test('should handle slow API response', async ({ page }) => {
    await page.route('**/api/endpoint', async route => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      await route.continue();
    });

    await page.goto('/page', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('trigger-api-call').click();

    // Should show loading state
    await expect(page.getByTestId('loading-indicator')).toBeVisible();

    // Eventually should complete
    await expect(page.getByText(/success/i)).toBeVisible({ timeout: 10000 });
  });
});
```

---

## Template 5: Quiz/Multi-Step Flow Test

Use for testing multi-step user journeys like quizzes.

```typescript
import { test, expect } from '@playwright/test';

test.describe('Multi-Step Quiz Flow', () => {
  test('should complete quiz and display results', async ({ page }) => {
    test.setTimeout(60000); // Extend timeout for long flow

    await page.goto('/quiz-page', { waitUntil: 'domcontentloaded' });

    // Step 1: Select mode
    await page.getByTestId('mode-option').click();

    // Step 2: Select subject
    await expect(page.getByTestId('subject-option')).toBeVisible();
    await page.getByTestId('subject-option').click();

    // Step 3: Start quiz
    await page.getByTestId('start-button').click();

    // Wait for questions to load (may have animation)
    const questionCounter = page.getByTestId('question-counter');
    await expect(questionCounter).toBeVisible({ timeout: 10000 });

    // Get total questions from counter text
    const counterText = await questionCounter.textContent();
    const match = counterText?.match(/de\s+(\d+)/);
    const totalQuestions = match ? parseInt(match[1]) : 3;

    // Answer all questions
    for (let i = 1; i <= totalQuestions; i++) {
      await expect(questionCounter).toContainText(`${i}`, { timeout: 5000 });

      // Select first answer option
      const option = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
      await expect(option).toBeVisible();
      await option.click();

      if (i < totalQuestions) {
        await page.getByRole('button', { name: /Next|Siguiente/i }).click();
      }
    }

    // Submit quiz
    await page.getByRole('button', { name: /Submit|Enviar|Terminar/i }).click();

    // Verify results
    await expect(page.getByText(/Completed|Completado|Resultado/i)).toBeVisible({ timeout: 10000 });
  });
});
```

---

## Template 6: Mini-Lesson Test

Use for testing interactive lesson flows.

```typescript
import { test, expect } from '@playwright/test';

test.describe('Mini Lesson - Lesson Name', () => {
  test('should load lesson and display Step 1', async ({ page }) => {
    await page.goto('/lessons/m1/lesson-slug', { waitUntil: 'domcontentloaded' });

    // Check lesson title
    await expect(page.getByRole('heading', { name: /Lesson Title/i })).toBeVisible();

    // Check step indicator
    await expect(page.getByText(/Paso 1 de \d+/i)).toBeVisible();
  });

  test('should complete Step 1 with correct answer', async ({ page }) => {
    await page.goto('/lessons/m1/lesson-slug', { waitUntil: 'domcontentloaded' });

    // Select correct answer
    await page.getByText('Correct Option Text').click();
    await page.getByRole('button', { name: /Ver Respuesta/i }).click();

    // Verify feedback
    await expect(page.getByText(/¡Correcto!/i)).toBeVisible();

    // Continue to next step
    await page.getByRole('button', { name: /Continuar/i }).click();
    await expect(page.getByText(/Paso 2 de/i)).toBeVisible();
  });

  test('should show error feedback for wrong answer', async ({ page }) => {
    await page.goto('/lessons/m1/lesson-slug', { waitUntil: 'domcontentloaded' });

    // Select wrong answer
    await page.getByText('Wrong Option Text').click();
    await page.getByRole('button', { name: /Ver Respuesta/i }).click();

    // Verify error feedback
    await expect(page.getByText(/Incorrecto|Intenta de nuevo/i)).toBeVisible();
  });

  test('should allow navigation between steps', async ({ page }) => {
    await page.goto('/lessons/m1/lesson-slug', { waitUntil: 'domcontentloaded' });

    // Complete Step 1
    await page.getByText('Option').click();
    await page.getByRole('button', { name: /Ver Respuesta/i }).click();
    await page.getByRole('button', { name: /Continuar/i }).click();

    // Should be on Step 2
    await expect(page.getByText(/Paso 2 de/i)).toBeVisible();

    // Go back
    await page.getByRole('button', { name: /Anterior/i }).click();

    // Should be on Step 1
    await expect(page.getByText(/Paso 1 de/i)).toBeVisible();
  });
});
```

---

## Template 7: Responsive Layout Test

Use for testing responsive breakpoints.

```typescript
import { test, expect } from '@playwright/test';

test.describe('Responsive Layout', () => {
  test('should display desktop layout on large screens', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/page', { waitUntil: 'domcontentloaded' });

    // Desktop-specific elements should be visible
    await expect(page.getByTestId('desktop-sidebar')).toBeVisible();
    await expect(page.getByTestId('desktop-nav')).toBeVisible();

    // Mobile elements should be hidden
    await expect(page.getByTestId('mobile-menu-button')).not.toBeVisible();
  });

  test('should display mobile layout on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/page', { waitUntil: 'domcontentloaded' });

    // Mobile-specific elements should be visible
    await expect(page.getByTestId('mobile-menu-button')).toBeVisible();

    // Desktop elements should be hidden
    await expect(page.getByTestId('desktop-sidebar')).not.toBeVisible();
  });

  test('should open mobile menu on tap', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/page', { waitUntil: 'domcontentloaded' });

    await page.getByTestId('mobile-menu-button').click();
    await expect(page.getByTestId('mobile-menu')).toBeVisible();

    // Close menu
    await page.getByTestId('mobile-menu-close').click();
    await expect(page.getByTestId('mobile-menu')).not.toBeVisible();
  });
});
```

---

## Template 8: Unauthenticated Context Test

Use within authenticated tests to test logged-out behavior.

```typescript
import { test, expect } from '@playwright/test';

test.describe('Paywall Protection', () => {
  test('should redirect unauthenticated users to signin', async ({ page, browser }) => {
    // Create fresh context without auth state
    const newContext = await browser.newContext({
      storageState: undefined,
    });
    const newPage = await newContext.newPage();

    try {
      await newContext.clearCookies();
      await newPage.goto('/protected-page', { waitUntil: 'domcontentloaded' });

      // Should be redirected to signin
      await newPage.waitForURL(/\/signin/, { timeout: 5000 });
      expect(newPage.url()).toContain('/signin');
    } finally {
      await newContext.close();
    }
  });

  test('should show upgrade prompt for free users', async ({ page, browser }) => {
    // Create context with free user auth state (if you have one)
    const newContext = await browser.newContext({
      storageState: '.auth/free-user.json', // Would need to create this
    });
    const newPage = await newContext.newPage();

    try {
      await newPage.goto('/premium-feature', { waitUntil: 'domcontentloaded' });

      // Should show upgrade prompt
      await expect(newPage.getByText(/upgrade|actualizar|premium/i)).toBeVisible();
    } finally {
      await newContext.close();
    }
  });
});
```

---

## Template 9: Resilient Loop Pattern

Use for tests that iterate through unknown number of items with safety.

```typescript
import { test, expect, Page } from '@playwright/test';

test.describe('Dynamic List Processing', () => {
  // Helper function for reusable answer logic
  async function answerQuestion(page: Page) {
    const option = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
    await expect(option).toBeVisible({ timeout: 5000 });
    await option.click();
  }

  test('should process all items with safe iteration', async ({ page }) => {
    test.setTimeout(90000); // Extended timeout for long flows

    await page.goto('/quiz', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('start-button').click();

    // Wait for first question
    const questionCounter = page.getByTestId('question-counter');
    await expect(questionCounter).toBeVisible({ timeout: 10000 });

    // Parse total from "Pregunta 1 de 10"
    const counterText = await questionCounter.textContent();
    const totalQuestions = parseInt(counterText?.match(/de (\d+)/)?.[1] || '10');

    // Add buffer for safety - prevents infinite loops
    const maxIterations = totalQuestions + 2;

    for (let iteration = 0; iteration < maxIterations; iteration++) {
      // Safe visibility check - won't throw if element gone
      const isQuestionVisible = await questionCounter.isVisible().catch(() => false);
      if (!isQuestionVisible) break;

      // Answer the current question
      await answerQuestion(page);

      // Check if there's a next button or we're done
      const nextButton = page.getByRole('button', { name: /Siguiente/i });
      const finishButton = page.getByRole('button', { name: /Terminar|Enviar/i });

      const hasNext = await nextButton.isVisible().catch(() => false);
      const hasFinish = await finishButton.isVisible().catch(() => false);

      if (hasFinish) {
        await finishButton.click();
        break;
      } else if (hasNext) {
        await nextButton.click();
      }
    }

    // Verify completion
    await expect(page.getByText(/Resultado|Completado/i)).toBeVisible({ timeout: 10000 });
  });
});
```

---

## Template 10: Multiple Outcomes with Promise.race

Use when test can end with multiple valid outcomes.

```typescript
import { test, expect } from '@playwright/test';

test.describe('Multiple Outcome Handling', () => {
  test('should handle registration with timing variations', { retries: 2 }, async ({ page }) => {
    await page.goto('/register');

    // Fill registration form
    await page.getByTestId('username-input').fill('newuser123');
    await page.getByTestId('email-input').fill('newuser@test.com');
    await page.getByTestId('password-input').fill('SecurePass123!');
    await page.getByTestId('submit-button').click();

    // Wait for first of multiple possible success indicators
    const successIndicator = await Promise.race([
      // Toast notification
      page.getByText(/success|created|bienvenido/i)
        .waitFor({ state: 'visible', timeout: 15000 })
        .then(() => 'toast'),

      // Redirect to dashboard
      page.waitForURL(/\/dashboard/, { timeout: 15000 })
        .then(() => 'redirect'),

      // Sonner toast component
      page.locator('[data-sonner-toast]')
        .filter({ hasText: /success/i })
        .waitFor({ state: 'visible', timeout: 15000 })
        .then(() => 'sonner'),
    ]).catch(() => null);

    // At least one success indicator should appear
    expect(successIndicator).toBeTruthy();
  });

  test('should handle either content or empty state', async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });

    // Wait for either questions or empty state
    const quizHeading = page.getByRole('heading', { name: /quiz|práctica/i });
    const emptyState = page.getByText(/no hay|empty|sin datos/i);

    await Promise.race([
      quizHeading.waitFor({ state: 'visible', timeout: 10000 }),
      emptyState.waitFor({ state: 'visible', timeout: 10000 }),
    ]);

    // Check which one appeared
    const hasQuiz = await quizHeading.isVisible().catch(() => false);
    const isEmpty = await emptyState.isVisible().catch(() => false);

    expect(hasQuiz || isEmpty).toBe(true);

    if (hasQuiz) {
      // Test with content
      await expect(page.getByTestId('quiz-card')).toBeVisible();
    } else {
      // Test empty state
      await expect(page.getByRole('button', { name: /crear|start/i })).toBeVisible();
    }
  });
});
```

---

## Template 11: Scoped Helper Functions

Use for complex pages with repeated locator patterns.

```typescript
import { test, expect, Page } from '@playwright/test';

// Scoped locator helpers - keeps selectors DRY and maintainable
function getKnowledgePanel(page: Page) {
  return page.locator('.space-y-6').filter({
    has: page.getByRole('heading', { name: /Lo que sé/i })
  });
}

function getLevelButtons(page: Page) {
  const panel = getKnowledgePanel(page);
  return {
    m1: panel.getByRole('button', { name: 'M1' }),
    m2: panel.getByRole('button', { name: 'M2' }),
  };
}

function getTopicList(page: Page) {
  const panel = getKnowledgePanel(page);
  return panel.locator('ul li');
}

function getSummary(page: Page) {
  const panel = getKnowledgePanel(page);
  return panel.locator('.grid-cols-2').first();
}

test.describe('Knowledge Declarations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });
    // Expand the knowledge panel
    await page.getByRole('button', { name: /Lo que sé/i }).click();
  });

  test('should switch between M1 and M2 levels', async ({ page }) => {
    const { m1, m2 } = getLevelButtons(page);

    // M1 should be active by default
    await expect(m1).toHaveClass(/bg-\[#0A84FF\]/);

    // Switch to M2
    await m2.click();
    await expect(m2).toHaveClass(/bg-\[#0A84FF\]/);
  });

  test('should display topics for selected level', async ({ page }) => {
    const topics = getTopicList(page);
    const count = await topics.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should update summary when topic is selected', async ({ page }) => {
    const summary = getSummary(page);
    const topics = getTopicList(page);

    // Get initial summary
    const initialText = await summary.textContent();
    const initialCount = parseInt(initialText?.split('/')[0] || '0');

    // Click first topic
    const firstTopic = topics.first();
    await firstTopic.click();

    // Summary should update
    const updatedText = await summary.textContent();
    const updatedCount = parseInt(updatedText?.split('/')[0] || '0');

    expect(updatedCount).not.toBe(initialCount);
  });
});
```

---

## Template 12: Loading State & Spinner Handling

Use when pages have loading states that must complete before testing.

```typescript
import { test, expect } from '@playwright/test';

test.describe('Loading State Handling', () => {
  test('should wait for content to load', async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });

    // Wait for any spinners to disappear
    const spinner = page.locator('.animate-spin');
    const spinnerCount = await spinner.count();

    if (spinnerCount > 0) {
      await spinner.first().waitFor({ state: 'hidden', timeout: 15000 });
    }

    // Now test the loaded content
    await expect(page.getByTestId('main-content')).toBeVisible();
  });

  test('should show loading then content', async ({ page }) => {
    // Intercept to add delay
    await page.route('**/api/data', async route => {
      await new Promise(r => setTimeout(r, 2000));
      await route.continue();
    });

    await page.goto('/page');

    // Should show loading initially
    await expect(page.getByTestId('loading-skeleton')).toBeVisible();

    // Should show content after load
    await expect(page.getByTestId('content')).toBeVisible({ timeout: 10000 });

    // Loading should be gone
    await expect(page.getByTestId('loading-skeleton')).not.toBeVisible();
  });

  test('should handle page reload', async ({ page }) => {
    await page.goto('/page', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');

    // Perform action that requires reload
    await page.getByTestId('refresh-button').click();

    // Wait for reload to complete
    await page.waitForLoadState('networkidle');

    // Verify content reloaded
    await expect(page.getByTestId('timestamp')).toBeVisible();
  });
});
```

---

## Template Checklist

When using any template:

- [ ] Replace all placeholder paths (`/feature-path`, `/page`)
- [ ] Replace placeholder test IDs (`element-1`, `action-button`)
- [ ] Replace placeholder text (`Feature Title`, `Success`)
- [ ] Add appropriate error case tests
- [ ] Remove unused test cases
- [ ] Verify all selectors exist in the UI
