# E2E Tests

End-to-end tests for PAES Math Platform using Playwright.

## Running Tests Locally

### Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the test database:
   ```bash
   docker-compose -f docker-compose.test.yml up -d
   ```

3. Start the backend server (in a separate terminal):
   ```bash
   cd backend
   DATABASE_URL=postgresql://testuser:testpassword@localhost:5433/paes_test \
   JWT_SECRET=test-jwt-secret \
   JWT_REFRESH_SECRET=test-refresh-secret \
   PORT=3002 \
   npm run dev
   ```

4. Start the frontend (in another terminal):
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:3002 npm run dev
   ```

### Run Tests

```bash
# Run all tests (headless)
npm run test:e2e

# Run with browser visible
npm run test:e2e:headed

# Open Playwright UI (interactive mode)
npm run test:e2e:ui

# View test report
npm run test:e2e:report
```

## CI/CD

Tests run automatically on:
- All pull requests
- Pushes to main/master branch

GitHub Actions will:
- ✅ Run all e2e tests
- 💬 Comment on PR with test results
- 📸 Upload screenshots and videos on failure
- 📊 Generate HTML report

## Test Structure

```
e2e/
├── auth.spec.ts          # Authentication tests (2 tests)
├── live-practice.spec.ts # Live practice registration tests (6 tests)
├── practice.spec.ts      # Practice mode & quiz tests (11 tests)
├── progress.spec.ts      # Progress & Analytics page tests (20 tests)
├── global-setup.ts       # Database seeding before tests
└── helpers/
    ├── db-setup.ts       # Database utilities
    └── auth.ts           # Authentication helper
```

## Test Coverage

### Authentication Tests (auth.spec.ts)
- Login page display
- Login with student credentials

### Live Practice Tests (live-practice.spec.ts)
- Display available sessions
- Register for a session
- Unregister from a session
- Session details display
- User welcome message
- Navigation to dashboard

### Practice Mode Tests (practice.spec.ts)
**M1 Quiz Flow (11 tests):**
- Subject selection display
- Subject and mode selection flow
- Zen mode quiz completion
- Rapid Fire difficulty selection
- Starting Rapid Fire quiz with difficulty
- Quiz completion with accurate results
- Rapid Fire timer functionality
- Answer review after completion

### Progress & Analytics Tests (progress.spec.ts)
**Overview Tab (8 tests):**
- Progress page display with heading and tabs
- M1 and M2 progress cards display
- Recent questions count selector
- Question history with pagination
- Question review modal
- Visual indicators for correct/incorrect answers
- Progress bars with percentages
- Navigation back to dashboard

**Quizzes Tab (6 tests):**
- Quiz session listing with scores
- Empty state with practice links
- Complete quiz and verify it appears
- Quiz details modal
- Navigate between questions in modal
- Question visual indicators (numbered boxes)

**Skills Tabs (2 tests):**
- Skills M1 tab switching and display
- Skills M2 tab switching and display

**State Management (1 test):**
- Tab state persistence within page

## Writing Tests

### Authentication Helper

For tests that require an authenticated user, use the `setupAuthenticatedSession` helper instead of manually logging in:

```typescript
import { test, expect } from '@playwright/test';
import { setupAuthenticatedSession } from './helpers/auth';

test.describe('My Feature Tests', () => {
  test.beforeEach(async ({ page }) => {
    // This logs in as student@test.com and navigates to /dashboard
    await setupAuthenticatedSession(page);
  });

  test('should do something', async ({ page }) => {
    // Start from dashboard, no need to login manually
    await page.goto('/progress');
    await expect(page).toHaveTitle(/PAES/);
  });
});
```

**Benefits:**
- Faster tests (no repeated login UI interactions)
- Cleaner test code
- Centralized authentication logic
- Easy to update if login flow changes

### Available Helper Functions

From `helpers/auth.ts`:
- `setupAuthenticatedSession(page)` - Login and navigate to dashboard (recommended)
- `loginAsStudent(page)` - Just perform login, stay on current page
- `goToDashboard(page)` - Navigate to dashboard (use after login)

### Basic Example

```typescript
import { test, expect } from '@playwright/test';

test('should do something', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/PAES/);
});
```

See [Playwright docs](https://playwright.dev) for more info.
