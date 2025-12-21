# E2E Test Selector Strategy Guide

This guide helps you choose the right selector strategy for robust, maintainable tests.

## Priority Order

1. **data-testid** - Most reliable, won't break with UI changes
2. **getByRole** - Semantic, tests accessibility
3. **getByText** - User-visible text, good for dynamic content
4. **CSS selectors** - Last resort, fragile

---

## 1. data-testid Selectors (PREFERRED)

### When to Use

- Critical user interactions (buttons, forms, navigation)
- Elements that may have multiple similar siblings
- Elements where text/role might change with i18n

### How to Add data-testid in React

```tsx
// In React component
<button data-testid="submit-form-button">Submit</button>
<input data-testid="email-input" type="email" />
<div data-testid="error-message">{error}</div>
```

### How to Use in Tests

```typescript
await page.getByTestId('submit-form-button').click();
await page.getByTestId('email-input').fill('user@test.com');
await expect(page.getByTestId('error-message')).toBeVisible();
```

### Project Naming Conventions

Use kebab-case with feature prefixes:

| Pattern | Example |
|---------|---------|
| `{feature}-{element}` | `auth-email-input` |
| `{action}-{target}-button` | `start-quiz-button` |
| `{element}-{state}` | `error-message` |

Examples from this codebase:
- `mode-zen`, `mode-rapid`
- `subject-all`, `subject-numeros`
- `start-quiz-button`
- `question-counter`
- `auth-submit-button`
- `auth-error-message`

---

## 2. getByRole Selectors (GOOD)

### Common Roles

```typescript
// Buttons
await page.getByRole('button', { name: /Submit/i }).click();
await page.getByRole('button', { name: /Siguiente/i }).click();

// Links
await page.getByRole('link', { name: /Home/i }).click();
await page.getByRole('link', { name: /Volver/i }).click();

// Headings
await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible();
await expect(page.getByRole('heading', { level: 1 })).toContainText('Title');

// Form inputs by label
await page.getByRole('textbox', { name: /Email/i }).fill('user@test.com');
await page.getByRole('spinbutton', { name: /Cantidad/i }).fill('5');

// Checkboxes and radios
await page.getByRole('checkbox', { name: /Accept terms/i }).check();
await page.getByRole('radio', { name: /Option A/i }).click();

// Navigation
await page.getByRole('navigation').getByRole('link', { name: /Profile/i }).click();

// Dialog/modal
await expect(page.getByRole('dialog')).toBeVisible();
await page.getByRole('dialog').getByRole('button', { name: /Close/i }).click();
```

### When to Use

- Standard HTML elements with clear roles
- When testing accessibility is important
- When text is stable and meaningful

### Regex Flags

```typescript
// Case-insensitive matching (recommended for i18n)
await page.getByRole('button', { name: /siguiente/i }); // Matches "Siguiente", "SIGUIENTE"

// Exact match when needed
await page.getByRole('button', { name: 'Submit', exact: true });
```

---

## 3. getByText Selectors (ACCEPTABLE)

### When to Use

```typescript
// Static text content
await expect(page.getByText('Welcome back!')).toBeVisible();

// Regex for flexible matching
await expect(page.getByText(/Práctica PAES/i)).toBeVisible();

// Partial match
await expect(page.getByText(/Pregunta \d+ de/)).toBeVisible();

// Exact match when needed
await expect(page.getByText('Submit', { exact: true })).toBeVisible();
```

### Cautions

- Can match multiple elements (use `.first()` or scope to parent)
- May break if text is translated/changed
- Case-sensitive unless using `/regex/i`

```typescript
// Problem: Multiple matches
await page.getByText('Click').click(); // Might match multiple!

// Solution: Scope to parent
const card = page.getByTestId('user-card');
await card.getByText('Click').click();
```

---

## 4. CSS Selectors (LAST RESORT)

### When Acceptable

```typescript
// Class with semantic meaning
await page.locator('.error-state').isVisible();

// Input by type (when no testid or label)
await page.locator('input[type="email"]').fill('user@test.com');

// Structural for forms without labels
await page.locator('form input[type="password"]').fill('pass');
```

### When to Avoid

```typescript
// Too generic - fragile
await page.locator('.btn').click();
await page.locator('button').click();

// Deep nesting - will break
await page.locator('div > span > button').click();

// Position-based - will break
await page.locator('button').nth(3).click();

// Generated IDs - will break
await page.locator('#app-button-17').click();
```

---

## Combining Selectors

### Scoped Locators

```typescript
// Find button within specific section
const modal = page.locator('[data-testid="modal"]');
await modal.getByRole('button', { name: /Close/i }).click();

// Scope to card
const firstCard = page.getByTestId('quiz-card').first();
await firstCard.getByRole('button', { name: /Start/i }).click();

// Navigation within header
const header = page.getByRole('banner');
await header.getByRole('link', { name: /Profile/i }).click();
```

### Filter Pattern

```typescript
// Filter by contained text
await page.locator('button').filter({ hasText: /^[A-E]\./ }).first().click();

// Filter by child element
await page.locator('button').filter({
  has: page.locator('span.rounded-full'),
}).first().click();

// Filter by NOT having text
await page.locator('button').filter({ hasNotText: 'Disabled' }).click();
```

### Chaining

```typescript
// Chain multiple filters
const activeCard = page
  .getByTestId('lesson-card')
  .filter({ hasText: 'Active' })
  .filter({ has: page.locator('.green-border') });
```

---

## Common Patterns in This Codebase

### Quiz Answer Options

```typescript
// Select first answer option (A., B., C., D., E.)
const firstOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
await expect(firstOption).toBeVisible();
await firstOption.click();
```

### Navigation Buttons

```typescript
// Next button
await page.getByRole('button', { name: /Siguiente/i }).click();

// Previous button
await page.getByRole('button', { name: /Anterior/i }).click();

// Back to dashboard
await page.getByRole('link', { name: /Volver al Inicio/i }).click();
```

### Form Inputs

```typescript
// By test ID (preferred)
await page.getByTestId('auth-email-input').fill('user@test.com');

// By placeholder
await page.getByPlaceholder(/Escribe tu pregunta/i).fill('text');

// By label
await page.getByLabel('Email').fill('user@test.com');

// Multiple selectors (fallback pattern)
await page.fill('input[type="email"], input[name="email"]', 'user@test.com');
```

### Step Indicators

```typescript
// Lesson step
await expect(page.getByText(/Paso \d+ de \d+/)).toBeVisible();
await expect(page.getByText('Paso 2 de 6')).toBeVisible();

// Question counter
await expect(page.getByTestId('question-counter')).toContainText('Pregunta 1 de');
```

### Dropdown/Select

```typescript
// Native select
await page.locator('select#recent-count').selectOption('20');
await page.getByRole('combobox').selectOption({ label: 'Option A' });

// Custom dropdown (click to open, then select)
await page.getByTestId('dropdown-trigger').click();
await page.getByTestId('dropdown-option-1').click();
```

---

## Adding data-testid to Components

When a selector is fragile, request adding data-testid:

### Before (Fragile)

```tsx
<button className="bg-blue-500 text-white">
  Start Quiz
</button>
```

```typescript
// Fragile test
await page.getByText('Start Quiz').click(); // Will break if text changes
```

### After (Robust)

```tsx
<button data-testid="start-quiz-button" className="bg-blue-500 text-white">
  Start Quiz
</button>
```

```typescript
// Robust test
await page.getByTestId('start-quiz-button').click(); // Won't break
```

---

## Debugging Selectors

### In Headed Mode

```typescript
// Highlight element
await page.locator('[data-testid="element"]').highlight();

// Pause for inspection
await page.pause();
```

### Count Matches

```typescript
// Check how many elements match
const count = await page.locator('.my-class').count();
console.log(`Found ${count} elements`);

// Useful for debugging "strict mode violation"
const buttons = await page.getByRole('button', { name: /Submit/i }).count();
if (buttons > 1) {
  console.log('Warning: Multiple submit buttons found');
}
```

### Playwright Inspector

```bash
# Run with inspector
npx playwright test --debug -g "test name"

# Use codegen to find selectors
npx playwright codegen http://localhost:3000
```

---

## Real-World Selector Patterns

These patterns are used in actual tests in this codebase.

### Chevron/Arrow Toggle Selectors

```typescript
// Expand/collapse buttons with chevrons
await page.locator('li button').filter({ hasText: /▶|▼/ }).first().click();

// Or by aria-label
await page.locator('button[aria-label="Expandir"]').click();
await page.locator('button[aria-label="Colapsar"]').click();
```

### Emoji Selectors

```typescript
// Filter by emoji content
await page.locator('button').filter({ hasText: '🔢' }).click(); // Numbers
await page.locator('button').filter({ hasText: '📐' }).click(); // Geometry
await page.locator('button').filter({ hasText: '✓' }).click();  // Checkmark
```

### Tailwind Class Selectors

```typescript
// Loading spinners
const spinner = page.locator('.animate-spin');
await spinner.waitFor({ state: 'hidden' });

// Grid layouts
const grid = page.locator('.grid-cols-2').first();

// Responsive visibility
await expect(page.locator('.md\\:block')).toBeVisible();
await expect(page.locator('.md\\:hidden')).not.toBeVisible();

// Color/state classes
await expect(button).toHaveClass(/bg-\[#0A84FF\]/); // Active state
await expect(element).toHaveClass(/border-green-500/);
```

### ARIA Attribute Selectors

```typescript
// By aria-label
await page.locator('button[aria-label="Close modal"]').click();
await page.locator('[aria-label="Menú principal"]').click();

// By aria-expanded state
await page.locator('[aria-expanded="true"]').click();
await page.locator('[aria-expanded="false"]').first().click();

// Playwright role with ARIA options
await page.getByRole('button', { expanded: true }).click();
await page.getByRole('checkbox', { checked: true }).click();
```

### Toast/Notification Selectors

```typescript
// Sonner toast library
await page.locator('[data-sonner-toast]').filter({ hasText: /success/i });

// Generic toast
await page.locator('[role="alert"]').filter({ hasText: /error/i });
```

### Dynamic Content Selectors

```typescript
// Elements with changing content
const counter = page.getByTestId('question-counter');
await expect(counter).toContainText(/\d+ de \d+/);

// Parse value from text
const text = await counter.textContent();
const current = parseInt(text?.match(/(\d+) de/)?.[1] || '0');
```

### Scoped Child Selectors

```typescript
// Find element within specific parent
const modal = page.getByRole('dialog');
await modal.getByRole('button', { name: /Cerrar/i }).click();

// Find within card
const card = page.getByTestId('quiz-card').first();
await card.locator('button').click();

// Nested within list
const firstItem = page.locator('ul li').first();
await firstItem.getByRole('checkbox').check();
```

---

## Quick Reference

| Need | Selector |
|------|----------|
| Unique element | `getByTestId('id')` |
| Button by text | `getByRole('button', { name: /Text/i })` |
| Link | `getByRole('link', { name: /Text/i })` |
| Heading | `getByRole('heading', { name: /Title/i })` |
| Input by label | `getByLabel('Label')` |
| Input by placeholder | `getByPlaceholder('Placeholder')` |
| Text content | `getByText(/text/i)` |
| First of many | `locator.first()` |
| Scoped search | `parent.getByRole(...)` |
| Filter by text | `locator.filter({ hasText: 'text' })` |
