# Anti-Patterns: What NOT to Do in E2E Tests

Before completing any test implementation, verify NONE of these anti-patterns exist in your code.

---

## Anti-Pattern 1: waitForTimeout for Synchronization

This is the **MOST COMMON mistake**. Never use arbitrary timeouts for synchronization.

### WRONG

```typescript
await page.click('button');
await page.waitForTimeout(2000); // Waiting arbitrary time
await expect(element).toBeVisible();
```

### CORRECT

```typescript
await page.click('button');
await expect(element).toBeVisible({ timeout: 5000 });
```

### Detection

Search for `waitForTimeout` - acceptable only for:
- Animation delays with no state change to wait for
- Brief buffer after parallel operations

---

## Anti-Pattern 2: Generic CSS Selectors

Fragile selectors break when UI changes.

### WRONG

```typescript
await page.locator('.btn').click();
await page.locator('div > span > button').first().click();
await page.locator('#submit').click();
await page.locator('button').nth(3).click();
```

### CORRECT

```typescript
await page.getByTestId('submit-button').click();
await page.getByRole('button', { name: /Submit/i }).click();
```

### Detection

Search for `.locator('.` without `data-testid` - consider adding test IDs.

---

## Anti-Pattern 3: Test Interdependence

Tests must be independent - they can run in any order.

### WRONG

```typescript
test('should create item', async ({ page }) => {
  // Creates item that next test depends on
  await page.getByTestId('create').click();
});

test('should edit item', async ({ page }) => {
  // Assumes item from previous test exists - WILL FAIL if run alone
  await page.getByTestId('edit').click();
});
```

### CORRECT

```typescript
test('should create item', async ({ page }) => {
  await page.getByTestId('create').click();
  // Complete test with assertions
});

test('should edit item', async ({ page }) => {
  // Create own item first, then edit
  await page.getByTestId('create').click();
  await page.getByTestId('edit').click();
});
```

---

## Anti-Pattern 4: Missing Cookie Banner Handling

In unauthenticated tests, the cookie banner may overlay inputs.

### WRONG

```typescript
await page.goto('/signin');
await page.fill('input[type="email"]', 'user@test.com');
// May fail if cookie banner overlays input
```

### CORRECT

```typescript
await page.goto('/signin');
await page.evaluate(() => {
  localStorage.setItem('cookie-consent', 'accepted');
});
await page.fill('input[type="email"]', 'user@test.com');
```

### Note

Authenticated tests don't need this - the auth setup handles it.

---

## Anti-Pattern 5: Not Handling Loading States

Clicking before content loads causes flaky tests.

### WRONG

```typescript
await page.goto('/page');
await page.getByText('Content').click(); // May click before content loads
```

### CORRECT

```typescript
await page.goto('/page', { waitUntil: 'domcontentloaded' });
await expect(page.getByText('Content')).toBeVisible();
await page.getByText('Content').click();
```

---

## Anti-Pattern 6: Hardcoded Credentials

Use test users from db-setup, not real credentials.

### WRONG

```typescript
await page.fill('input[name="email"]', 'admin@mycompany.com');
await page.fill('input[type="password"]', 'MyRealPassword123!');
```

### CORRECT

```typescript
// Use test users from db-setup.ts
await page.fill('input[name="email"]', 'student@test.com');
await page.fill('input[type="password"]', 'StudentTest123!');
```

---

## Anti-Pattern 7: Race Conditions in Assertions

Don't assert on values that might not be updated yet.

### WRONG

```typescript
await button.click();
const count = await counter.textContent();
expect(count).toBe('1'); // May fail if not waited
```

### CORRECT

```typescript
await button.click();
await expect(counter).toContainText('1');
```

---

## Anti-Pattern 8: Ignoring Error States

Only testing happy paths misses bugs.

### WRONG

```typescript
test('should submit form', async ({ page }) => {
  await page.fill('input', 'value');
  await page.click('button');
  // Only tests happy path - what if there's an error?
});
```

### CORRECT

```typescript
test('should submit form successfully', async ({ page }) => {
  // Happy path with valid input
  await page.fill('input', 'valid-value');
  await page.click('button');
  await expect(page.getByText(/success/i)).toBeVisible();
});

test('should show error for invalid input', async ({ page }) => {
  // Error case
  await page.fill('input', '');
  await page.click('button');
  await expect(page.getByText(/required/i)).toBeVisible();
});
```

---

## Anti-Pattern 9: Non-Deterministic Test Names

Test names should describe expected behavior.

### WRONG

```typescript
test('test 1', async ({ page }) => { });
test('form works', async ({ page }) => { });
test('check button', async ({ page }) => { });
```

### CORRECT

```typescript
test('should display error when email is invalid', async ({ page }) => { });
test('should navigate to dashboard after successful login', async ({ page }) => { });
test('should disable submit button while form is submitting', async ({ page }) => { });
```

---

## Acceptable waitForTimeout Uses

```typescript
// ACCEPTABLE: After CSS transition animation
await page.click('button');
await page.waitForTimeout(300); // Wait for CSS transition to complete

// ACCEPTABLE: Zen mode breathing animation (has no state change)
await page.getByTestId('start-quiz-button').click();
await page.waitForTimeout(5000); // 5-second breathing animation

// ACCEPTABLE: Rapid Fire countdown
await page.waitForTimeout(3000); // 3-2-1 countdown

// ACCEPTABLE: Before taking screenshots
await page.waitForTimeout(200); // Let animations settle
```

---

## Quick Checklist

Before committing tests:

- [ ] No `waitForTimeout` without justification comment
- [ ] All selectors use testid/role/text (not generic CSS)
- [ ] Tests are independent (no shared state between tests)
- [ ] Cookie banner handled in unauthenticated tests
- [ ] Loading states awaited before interactions
- [ ] Both success and error cases covered
- [ ] Test names describe expected behavior with "should"
