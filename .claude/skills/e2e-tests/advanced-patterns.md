# Advanced E2E Test Patterns

This covers advanced patterns used in actual tests that go beyond the basics.

---

## Test Configuration Options

### test.setTimeout() - Extend Timeout for Long Tests

```typescript
test('should complete full quiz flow', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds for long flows

  // Long multi-step test...
});

test('should handle Rapid Fire mode', async ({ page }) => {
  test.setTimeout(90000); // 90 seconds - includes animations

  // Test with countdown animations...
});
```

### test.use() - Scope Options to Describe Block

```typescript
test.describe('Admin features', () => {
  test.use({ storageState: '.auth/admin.json' });

  test('should access admin panel', async ({ page }) => {
    // Runs with admin auth
  });
});
```

### Retries for Flaky Tests

```typescript
// Retry this specific test up to 2 times
test('should register successfully', { retries: 2 }, async ({ page }) => {
  // Registration with NextAuth timing issues
});
```

### Skip Tests Conditionally

```typescript
test.skip(process.env.CI === 'true', 'Skipped in CI');

test('should run locally only', async ({ page }) => {
  // Test that only runs locally
});
```

---

## State Checking Methods

### .count() - Check Element Quantity

```typescript
// Verify elements exist
const count = await page.locator('.question-card').count();
expect(count).toBeGreaterThan(0);

// Verify specific count
await expect(page.getByTestId('answer-option')).toHaveCount(4);

// Conditional based on count
const hasQuestions = await page.locator('.question').count() > 0;
if (hasQuestions) {
  // Do something
}
```

### .isVisible() - Check Visibility

```typescript
// Basic check
const visible = await element.isVisible();

// Safe check with fallback (won't throw)
const isVisible = await element.isVisible().catch(() => false);

// Use in conditional
if (await page.getByTestId('loading').isVisible()) {
  await page.getByTestId('loading').waitFor({ state: 'hidden' });
}
```

### .isEnabled() - Check if Interactable

```typescript
// Check button is enabled before clicking
const isEnabled = await submitButton.isEnabled();
expect(isEnabled).toBe(true);

// Wait for button to become enabled
await expect(submitButton).toBeEnabled();
```

### .isChecked() - Check Checkbox/Radio State

```typescript
// Verify checkbox state
const isChecked = await checkbox.isChecked();
expect(isChecked).toBe(true);

// Assert checked state
await expect(checkbox).toBeChecked();
await expect(checkbox).not.toBeChecked();
```

### .isHidden() - Check Hidden State

```typescript
// Check element is hidden
const isHidden = await modal.isHidden();

// Wait for element to hide
await expect(spinner).toBeHidden();
```

---

## Advanced Wait Strategies

### .waitFor() - Explicit State Waits

```typescript
// Wait for visibility
await element.waitFor({ state: 'visible', timeout: 10000 });

// Wait for element to hide (loading spinner)
await spinner.waitFor({ state: 'hidden', timeout: 15000 });

// Wait for element to be attached to DOM
await element.waitFor({ state: 'attached' });

// Wait for element to be detached
await element.waitFor({ state: 'detached' });
```

### Conditional Wait for Spinner

```typescript
// Only wait if spinner exists
const spinner = page.locator('.animate-spin');
const spinnerExists = await spinner.count() > 0;
if (spinnerExists) {
  await spinner.waitFor({ state: 'hidden', timeout: 15000 });
}
```

### Network Idle Wait

```typescript
// Wait for all network activity to complete
await page.waitForLoadState('networkidle');

// Combine with navigation
await page.goto('/dashboard');
await page.waitForLoadState('networkidle');
```

### Wait for Load States

```typescript
// DOM content loaded (faster)
await page.waitForLoadState('domcontentloaded');

// Full page load
await page.waitForLoadState('load');

// Network idle (no requests for 500ms)
await page.waitForLoadState('networkidle');
```

---

## Advanced Assertion Patterns

### toHaveCount() - Assert Element Count

```typescript
await expect(page.getByRole('listitem')).toHaveCount(5);
await expect(page.locator('.error')).toHaveCount(0);
```

### toHaveValue() - Assert Input Value

```typescript
await expect(page.getByTestId('email-input')).toHaveValue('user@test.com');
await expect(page.locator('select')).toHaveValue('option-2');
```

### toHaveClass() - Assert CSS Class

```typescript
// Regex for partial match
await expect(button).toHaveClass(/bg-blue-500/);
await expect(tab).toHaveClass(/active/);

// Exact class string
await expect(element).toHaveClass('btn btn-primary');
```

### toBeFocused() - Assert Focus State

```typescript
await input.focus();
await expect(input).toBeFocused();
```

### toHaveTitle() - Assert Page Title

```typescript
await expect(page).toHaveTitle(/PAES|Matemáticas/i);
await expect(page).toHaveTitle('Dashboard - SimplePAES');
```

### toHaveURL() - Assert Page URL

```typescript
await expect(page).toHaveURL(/\/dashboard/);
await expect(page).toHaveURL('http://localhost:3000/profile');
```

### .or() - Assert Either Element

```typescript
// Either success or redirect is acceptable
await expect(
  page.getByText('Success').or(page.getByText('Redirecting'))
).toBeVisible();
```

### Assertions with Timeout

```typescript
// Custom timeout on assertion
await expect(element).toBeVisible({ timeout: 10000 });
await expect(element).toContainText('Loading complete', { timeout: 15000 });
```

---

## Error Handling & Resilience

### Safe Visibility Check

```typescript
// Won't throw if element doesn't exist
const isVisible = await element.isVisible().catch(() => false);

if (isVisible) {
  await element.click();
}
```

### Promise.race() for Multiple Outcomes

```typescript
// Wait for first of multiple possible outcomes
const result = await Promise.race([
  page.getByText('Success').waitFor({ state: 'visible', timeout: 10000 })
    .then(() => 'success'),
  page.getByText('Error').waitFor({ state: 'visible', timeout: 10000 })
    .then(() => 'error'),
  page.waitForURL(/\/dashboard/, { timeout: 10000 })
    .then(() => 'redirect'),
]).catch(() => null);

expect(result).toBeTruthy();
```

### Try-Finally for Cleanup

```typescript
test('should test in fresh context', async ({ browser }) => {
  const context = await browser.newContext({ storageState: undefined });
  const page = await context.newPage();

  try {
    await page.goto('/protected');
    await expect(page).toHaveURL(/\/signin/);
  } finally {
    await context.close(); // Always cleanup
  }
});
```

### Safe Loop with Break Condition

```typescript
const maxIterations = totalQuestions + 2; // Buffer for safety

for (let i = 0; i < maxIterations; i++) {
  // Check if we should continue
  const isQuestionVisible = await questionCounter.isVisible().catch(() => false);
  if (!isQuestionVisible) break;

  // Answer the question
  await answerOption.click();
  await nextButton.click();
}
```

---

## Helper Functions & Fixtures

### Creating Scoped Locator Helpers

```typescript
// From knowledge-declarations.spec.ts
function getPanel(page: Page) {
  return page.locator('.space-y-6').filter({
    has: page.getByRole('heading', { name: /Lo que sé/i })
  });
}

function getLevelButtons(page: Page) {
  const panel = getPanel(page);
  return {
    m1: panel.getByRole('button', { name: 'M1' }),
    m2: panel.getByRole('button', { name: 'M2' }),
  };
}

// Usage in test
test('should switch levels', async ({ page }) => {
  const { m1, m2 } = getLevelButtons(page);
  await m2.click();
  await expect(m2).toHaveClass(/bg-\[#0A84FF\]/);
});
```

### Extracting Values from Elements

```typescript
// Parse numbers from text
const counterText = await questionCounter.textContent();
const totalQuestions = parseInt(counterText?.match(/de (\d+)/)?.[1] || '10');

// Extract summary stats
const summaryText = await summaryLocator.textContent();
const knownCount = parseInt(summaryText?.split('/')[0] || '0');
```

### Reusable Answer Helper

```typescript
async function answerCurrentQuestion(page: Page) {
  const option = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
  await expect(option).toBeVisible({ timeout: 5000 });
  await option.click();
}
```

---

## Network Event Listening

### Listen to All Responses

```typescript
const apiResponses: { url: string; status: number }[] = [];

page.on('response', response => {
  if (response.url().includes('/api/')) {
    apiResponses.push({
      url: response.url(),
      status: response.status()
    });
  }
});

// Run test actions...

// Verify API calls were made
expect(apiResponses.some(r => r.url.includes('/api/submit'))).toBe(true);
```

### Wait for Specific Response

```typescript
// Start waiting before triggering action
const responsePromise = page.waitForResponse(
  response => response.url().includes('/api/save') && response.status() === 200
);

await page.getByTestId('save-button').click();
const response = await responsePromise;

// Check response data
const data = await response.json();
expect(data.success).toBe(true);
```

---

## Page Evaluation & Scripts

### Inject JavaScript

```typescript
// Set localStorage before navigation
await page.evaluate(() => {
  localStorage.setItem('cookie-consent', 'accepted');
  localStorage.setItem('onboarding-complete', 'true');
});

// Scroll to bottom
await page.evaluate(() => {
  window.scrollTo(0, document.body.scrollHeight);
});

// Get computed style
const color = await page.evaluate((selector) => {
  const el = document.querySelector(selector);
  return getComputedStyle(el!).color;
}, '.my-element');
```

### Add Init Script (Before Page Loads)

```typescript
await page.addInitScript(() => {
  window.localStorage.setItem('feature-flag', 'enabled');
});

await page.goto('/feature');
```

---

## Accessibility Testing

### Focus Management

```typescript
// Tab to element and verify focus
await page.keyboard.press('Tab');
await expect(firstInput).toBeFocused();

// Click and verify focus
await input.focus();
await expect(input).toBeFocused();
```

### ARIA Selectors

```typescript
// By aria-label
await page.locator('button[aria-label="Close modal"]').click();
await page.locator('[aria-expanded="true"]').click();

// By role with aria attributes
await page.getByRole('button', { expanded: true }).click();
```

---

## Debounce & Timing Patterns

### Documented Wait Reasons

```typescript
// Always comment timing waits
await page.waitForTimeout(1500); // Debounce (800ms) + API response time

await page.waitForTimeout(5000); // Zen breathing animation

await page.waitForTimeout(3000); // 3-2-1 Rapid Fire countdown
```

### Wait After User Input

```typescript
// For search/filter inputs with debounce
await page.getByTestId('search-input').fill('query');
await page.waitForTimeout(1000); // Wait for debounce
await expect(page.getByTestId('results')).toContainText('query');
```

---

## Debugging Helpers

### Add Debug Logging

```typescript
test('should navigate correctly', async ({ page }) => {
  await page.goto('/start');
  console.log('Initial URL:', page.url());

  await page.getByRole('link', { name: 'Next' }).click();
  console.log('After click URL:', page.url());

  const cookies = await page.context().cookies();
  console.log('Cookies:', cookies.map(c => c.name));
});
```

### Pause for Inspection

```typescript
// Pause test for manual inspection (headed mode only)
await page.pause();
```

### Screenshot on Failure

```typescript
try {
  await expect(element).toBeVisible();
} catch (error) {
  await page.screenshot({ path: 'debug-screenshot.png' });
  throw error;
}
```

---

## Quick Reference

| Pattern | Code |
|---------|------|
| Extend timeout | `test.setTimeout(60000)` |
| Safe visibility | `await el.isVisible().catch(() => false)` |
| Wait for hidden | `await el.waitFor({ state: 'hidden' })` |
| Network idle | `await page.waitForLoadState('networkidle')` |
| Assert count | `await expect(el).toHaveCount(5)` |
| Assert class | `await expect(el).toHaveClass(/active/)` |
| Assert focused | `await expect(el).toBeFocused()` |
| Assert title | `await expect(page).toHaveTitle(/Title/)` |
| Either visible | `await expect(el1.or(el2)).toBeVisible()` |
| Element count | `const n = await el.count()` |
| Parse text | `text?.match(/(\d+)/)?.[1]` |
| Listen responses | `page.on('response', fn)` |
| Scroll bottom | `page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))` |
