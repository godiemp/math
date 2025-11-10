# E2E Test Setup Guide

## Prerequisites

To run the e2e tests for the practice mode, you need:

1. **Docker & Docker Compose** installed on your machine
2. **Node.js 18+** and npm installed
3. **Playwright** browsers installed

## Quick Start

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Install Playwright browsers
npx playwright install

# 3. Start test infrastructure (database + backend)
docker compose -f docker-compose.test.yml up -d

# 4. Wait for services to be healthy (10-15 seconds)
# Check status with:
docker compose -f docker-compose.test.yml ps

# 5. Run all e2e tests
npm run test:e2e

# 6. Or run only practice mode tests
npx playwright test e2e/practice.spec.ts

# 7. Run with UI mode for debugging
npm run test:e2e:ui

# 8. View test report
npm run test:e2e:report

# 9. Clean up when done
docker compose -f docker-compose.test.yml down
```

## Test Infrastructure

### Test Database (PostgreSQL)
- **Port:** 5433
- **Database:** `paes_test`
- **User:** `testuser`
- **Password:** `testpassword`

### Test Backend
- **Port:** 3002
- **Environment:** test
- **Auto-seeded with:**
  - Test admin: `admin@test.com` / `admin123`
  - Test student: `student@test.com` / `student123`
  - Sample M1 and M2 questions

### Frontend Dev Server
- **Port:** 3000
- Automatically started by Playwright's `webServer` configuration
- Uses `npm run dev` command

## Test Database Schema

The test database is automatically populated with:

### Users
- Admin user for testing admin features
- Student user for testing practice/quiz features

### Questions
- M1 test questions across all subjects
- M2 test questions for progress tracking
- Sample questions with varying difficulties

### Sessions
- Sample live session for testing live practice features

## Environment Variables

The following environment variables are used by the test setup:

```bash
# Test Database URL (default if not set)
TEST_DATABASE_URL=postgresql://testuser:testpassword@localhost:5433/paes_test

# Playwright Base URL (default if not set)
PLAYWRIGHT_BASE_URL=http://localhost:3000

# Backend API URL for tests
BACKEND_API_URL=http://localhost:3002
```

## Running Tests in CI

The tests are configured to run in CI with the following differences:

1. `fullyParallel` is disabled (workers: 1)
2. Retries are enabled (2 retries)
3. `webServer.reuseExistingServer` is disabled
4. GitHub Actions reporter is included

### GitHub Actions Example

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps chromium

      - name: Start test infrastructure
        run: docker compose -f docker-compose.test.yml up -d

      - name: Wait for services
        run: sleep 15

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/

      - name: Cleanup
        if: always()
        run: docker compose -f docker-compose.test.yml down
```

## Troubleshooting

### Database Connection Issues

If you see `ECONNREFUSED` errors:

```bash
# Check if test database is running
docker compose -f docker-compose.test.yml ps

# Check database logs
docker compose -f docker-compose.test.yml logs postgres-test

# Restart test infrastructure
docker compose -f docker-compose.test.yml down
docker compose -f docker-compose.test.yml up -d
```

### Port Already in Use

If port 5433 or 3002 is already in use:

```bash
# Find process using the port
lsof -i :5433
lsof -i :3002

# Stop the process or modify docker-compose.test.yml to use different ports
```

### Test Failures

1. **Check service health:**
   ```bash
   docker compose -f docker-compose.test.yml ps
   ```

2. **View backend logs:**
   ```bash
   docker compose -f docker-compose.test.yml logs backend-test
   ```

3. **Run tests with UI mode for debugging:**
   ```bash
   npm run test:e2e:ui
   ```

4. **Run tests in headed mode:**
   ```bash
   npm run test:e2e:headed
   ```

## Test Coverage

The practice mode e2e tests cover:

### M1 Quiz Flow (8 tests)
- ✅ Page display and subject selection
- ✅ Subject and mode selection flow
- ✅ Zen mode quiz completion
- ✅ Difficulty selection for Rapid Fire
- ✅ Rapid Fire quiz start
- ✅ Changing selection before quiz
- ✅ Repeat last configuration
- ✅ Quiz completion and results

### Progress Tracking (2 tests)
- ✅ Progress tracking after completing questions
- ✅ Progress page display with M1 and M2 sections

## Development Tips

### Debugging Specific Tests

```bash
# Run a single test
npx playwright test -g "should display M1 practice page"

# Run tests with a specific tag/suite
npx playwright test -g "Practice Mode - M1 Quiz Flow"

# Debug mode with browser
npx playwright test --debug

# Run only failed tests
npx playwright test --last-failed
```

### Test Data Management

The global setup script (`e2e/global-setup.ts`) handles:
- Clearing the test database
- Seeding test users
- Creating sample questions
- Setting up test sessions

To modify test data, edit `e2e/helpers/db-setup.ts`.

### Visual Debugging

Playwright captures screenshots and videos on failure:
- Screenshots: `test-results/` directory
- Videos: `test-results/` directory
- Traces: Available in HTML report

View the HTML report:
```bash
npm run test:e2e:report
```
