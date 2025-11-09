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
├── practice.spec.ts      # Practice mode & progress tracking tests (16 tests)
├── global-setup.ts       # Database seeding before tests
└── helpers/
    └── db-setup.ts       # Database utilities
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
- Changing selection before quiz start
- Repeat last configuration feature
- Navigation back to dashboard
- Curriculum link display
- Accessing practice from dashboard
- Quiz completion and results

**Progress Tracking (5 tests):**
- Progress tracking after completing questions
- M1 and M2 progress sections display
- View mode tabs (Overview, Quizzes, Skills)
- Switching between view modes
- Navigation to dashboard

## Writing Tests

Example test:

```typescript
import { test, expect } from '@playwright/test';

test('should do something', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/PAES/);
});
```

See [Playwright docs](https://playwright.dev) for more info.
