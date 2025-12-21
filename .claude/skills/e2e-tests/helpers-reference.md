# E2E Helper Functions Reference

This documents the helper functions available for e2e tests.

## Authentication Helper (`e2e/helpers/auth.ts`)

### loginAsStudent(page: Page)

Authenticates as the test student user.

```typescript
import { loginAsStudent } from './helpers/auth';

// In test
await loginAsStudent(page);
```

**What it does:**
1. Navigates to `/`
2. Dismisses cookie banner via localStorage
3. Fills email: `student@test.com`
4. Fills password: `StudentTest123!`
5. Submits form
6. Waits for redirect to dashboard

**When to use:**
- Rarely needed - most tests use cached auth state
- Use only in unauthenticated tests that need to test login flow manually

### goToDashboard(page: Page)

Navigates to the dashboard page.

```typescript
import { goToDashboard } from './helpers/auth';

await goToDashboard(page);
```

### setupAuthenticatedSession(page: Page)

Combines login and dashboard navigation.

```typescript
import { setupAuthenticatedSession } from './helpers/auth';

await setupAuthenticatedSession(page);
```

---

## Database Helper (`e2e/helpers/db-setup.ts`)

### clearDatabase()

Truncates all test database tables using CASCADE.

```typescript
import { clearDatabase } from './helpers/db-setup';

await clearDatabase();
```

**Tables cleared:**
- `quiz_attempts`
- `quiz_sessions`
- `question_attempts`
- `session_participants`
- `session_registrations`
- `sessions`
- `pdf_uploads`
- `questions`
- `refresh_tokens`
- `subscriptions`
- `users`
- `plans`
- `last_quiz_config`

### seedTestData()

Seeds essential test data.

```typescript
import { seedTestData } from './helpers/db-setup';

const { adminId, studentId, sessionId } = await seedTestData();
```

**Data created:**

| Entity | Details |
|--------|---------|
| Admin user | `admin@test.com` / `AdminTest123!` |
| Student user | `student@test.com` / `StudentTest123!` |
| Free plan | 365-day duration, 7-day trial |
| Paid plan | CLP $9,990, 30-day duration, 7-day trial |
| Student subscription | Active, 1 year duration |
| Sample questions | M1 números, M1 álgebra, M2 geometría |
| Test session | Scheduled for tomorrow |

### closeDatabase()

Closes the database connection pool.

```typescript
import { closeDatabase } from './helpers/db-setup';

await closeDatabase();
```

**When to use:**
- In global teardown
- After test suite completion

---

## Global Setup (`e2e/global-setup.ts`)

Runs automatically before all tests via `playwright.config.ts`:

```typescript
globalSetup: './e2e/global-setup.ts',
```

**What it does:**
1. Clears test database
2. Seeds test data
3. Closes database connection

You don't need to call this manually - it runs before your tests.

---

## Auth Setup (`e2e/auth.setup.ts`)

Creates cached auth state for authenticated tests.

**What it does:**
1. Navigates to `/signin`
2. Dismisses cookie banner
3. Logs in as student
4. Saves browser state to `.auth/student.json`

**Result:**
- All tests in `chromium-authenticated` project skip login
- Tests use cached cookies/localStorage
- Much faster test execution

---

## Test Users

| Role | Email | Password | Username | ID |
|------|-------|----------|----------|-----|
| Admin | `admin@test.com` | `AdminTest123!` | `testadmin` | `test-admin` |
| Student | `student@test.com` | `StudentTest123!` | `teststudent` | `test-student` |

**Password requirements met:**
- 12+ characters
- Uppercase letter
- Lowercase letter
- Number
- Special character

---

## Sample Questions

| ID | Level | Subject | Topic |
|----|-------|---------|-------|
| `test-q1` | M1 | números | Operaciones básicas |
| `test-q2` | M1 | álgebra | Ecuaciones lineales |
| `test-q3` | M2 | geometría | Área de figuras |

---

## Environment Variables

```bash
# Test database (used by db-setup.ts)
TEST_DATABASE_URL=postgresql://testuser:testpassword@localhost:5433/paes_test

# Playwright base URL
PLAYWRIGHT_BASE_URL=http://localhost:3000

# These are set in CI workflow
DATABASE_URL=postgresql://testuser:testpassword@localhost:5433/paes_test
NODE_ENV=test
JWT_SECRET=test-jwt-secret-key-for-e2e-tests-minimum-32-chars
JWT_REFRESH_SECRET=test-jwt-refresh-secret-key-for-e2e-tests-minimum-32-chars
AUTH_SECRET=test-auth-secret-key-for-e2e-tests-minimum-32-characters
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3002
```

---

## Common Helper Patterns

### Waiting for API Response

```typescript
// Wait for specific API call to complete
const responsePromise = page.waitForResponse(
  response => response.url().includes('/api/endpoint') && response.status() === 200
);
await page.getByTestId('trigger-button').click();
const response = await responsePromise;

// Check response data
const data = await response.json();
expect(data.success).toBe(true);
```

### Creating Fresh Browser Context

```typescript
test('should test unauthenticated flow', async ({ page, browser }) => {
  // Create fresh context without auth state
  const newContext = await browser.newContext({
    storageState: undefined, // No auth
  });
  const newPage = await newContext.newPage();

  try {
    await newContext.clearCookies();
    await newPage.goto('/protected-page');

    // Should redirect to signin
    await newPage.waitForURL(/\/signin/);
  } finally {
    // Always close context
    await newContext.close();
  }
});
```

### Intercepting and Modifying Requests

```typescript
// Mock API response
await page.route('**/api/data', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      success: true,
      data: { items: ['mock1', 'mock2'] }
    }),
  });
});

// Delay response (test loading states)
await page.route('**/api/slow', async route => {
  await new Promise(r => setTimeout(r, 3000));
  await route.continue();
});

// Abort request (test error handling)
await page.route('**/api/failing', route => {
  route.abort('failed');
});
```

### Capturing Network Requests

```typescript
let capturedRequest: { url: string; body: unknown } | null = null;

await page.route('**/api/submit', async route => {
  capturedRequest = {
    url: route.request().url(),
    body: route.request().postDataJSON(),
  };
  await route.continue();
});

await page.getByTestId('submit').click();

// Verify request was made correctly
expect(capturedRequest).not.toBeNull();
expect(capturedRequest?.body).toHaveProperty('expectedField');
```

---

## File Locations

| File | Path |
|------|------|
| Auth helper | `e2e/helpers/auth.ts` |
| DB helper | `e2e/helpers/db-setup.ts` |
| Global setup | `e2e/global-setup.ts` |
| Auth setup | `e2e/auth.setup.ts` |
| Config | `playwright.config.ts` |
| Auth state | `.auth/student.json` (gitignored) |
