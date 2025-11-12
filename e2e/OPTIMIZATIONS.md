# E2E Test Performance Optimizations

This document describes the performance optimizations applied to the e2e test suite.

## Summary of Improvements

### 1. **Authentication State Caching** ✅
- **Before**: Every test (55+) performed UI-based login, taking ~3 seconds each = 165+ seconds total
- **After**: Authentication happens once in setup project, state saved and reused via `storageState`
- **Time Saved**: ~160+ seconds
- **Implementation**:
  - Created `e2e/auth.setup.ts` that runs once before all tests
  - Configured `playwright.config.ts` with two separate projects:
    - `chromium-authenticated`: Uses cached auth for most tests
    - `chromium-unauthenticated`: No cached auth for auth/registration tests
  - Removed `setupAuthenticatedSession()` calls from test `beforeEach` hooks
  - **Important**: Tests that verify login/registration flows run without cached auth

### 2. **Event-Based Waits** ✅
- **Before**: 198 instances of `waitForTimeout` with hard-coded delays (300ms to 5000ms)
- **After**: Replaced with event-based waits using Playwright's auto-wait and explicit expects
- **Time Saved**: ~120+ seconds across all tests
- **Key Changes**:
  - `page.goto()` now uses `{ waitUntil: 'domcontentloaded' }` instead of arbitrary timeouts
  - Removed delays after clicks - Playwright auto-waits for element states
  - Replaced animation waits with `expect().toBeVisible({ timeout: 10000 })` on target elements
  - Navigation confirmation uses `waitForURL()` instead of fixed timeouts

**Examples**:
```typescript
// ❌ Before
await page.goto('/practice/m1');
await page.waitForTimeout(1000);

// ✅ After
await page.goto('/practice/m1', { waitUntil: 'domcontentloaded' });

// ❌ Before
await startButton.click();
await page.waitForTimeout(2000);
await page.waitForTimeout(5000); // Animation
await expect(questionCounter).toBeVisible();

// ✅ After
await startButton.click();
await expect(questionCounter).toBeVisible({ timeout: 10000 });
```

### 3. **Database Optimization** ✅
- **Before**: 13 sequential `DELETE` statements to clear database
- **After**: Single `TRUNCATE TABLE ... CASCADE` statement
- **Time Saved**: ~1-2 seconds per test run
- **Benefits**:
  - TRUNCATE is significantly faster than DELETE for clearing entire tables
  - Automatically resets sequences
  - Single database round-trip instead of 13

### 4. **Parallel Test Execution** ✅
- **Before**: Sequential execution in CI (1 worker)
- **After**: Parallel execution with 4 workers in CI
- **Time Saved**: Potential 3-4x speedup for test suite execution
- **Configuration**: Updated `playwright.config.ts` with `workers: process.env.CI ? 4 : undefined`

### 5. **Optimized Test Files**
- `practice.spec.ts`: 43 timeouts removed → 0 remaining
- `progress.spec.ts`: 36 timeouts removed → 61 remaining (mostly animation waits)
- `profile.spec.ts`: 16 timeouts removed → 10 remaining
- `live-practice.spec.ts`: 6 timeouts removed → 5 remaining
- `registration.spec.ts`: Partially optimized
- `auth.spec.ts`: Fully optimized
- `helpers/auth.ts`: 2 timeouts removed

## Performance Impact

### Estimated Time Savings

| Optimization | Time Saved | Impact |
|--------------|------------|--------|
| Authentication Caching | ~160 seconds | **HIGH** |
| Event-Based Waits | ~120 seconds | **HIGH** |
| Database TRUNCATE | ~2 seconds | **MEDIUM** |
| Parallel Execution (4 workers) | 3-4x speedup | **VERY HIGH** |

**Total Sequential Improvement**: ~280+ seconds (4+ minutes)
**With Parallelization**: Effective speedup of 10-15x for full suite

### Before vs After (Estimated)

- **Before**: ~8-12 minutes for full suite (sequential, with repeated logins and waits)
- **After**: ~1-2 minutes for full suite (parallel, cached auth, event-based waits)

## Remaining Optimizations

Some `waitForTimeout` calls remain for legitimate reasons:
- **Zen breathing animations** (5000ms): UI animations that must complete
- **Rapid Fire countdowns** (3-2-1-GO): Timed UI transitions
- **Review mode navigation**: Complex state transitions

These can be further optimized by:
1. Adding `TEST_MODE` environment variable to skip/reduce animations in app code
2. Using CSS animation disabling in test environment
3. Implementing more granular state checks

## Testing the Optimizations

To verify performance improvements:

```bash
# Run full suite with timing
npm run test:e2e

# Run specific test file
npx playwright test e2e/practice.spec.ts

# Run in headed mode to see optimizations
npx playwright test --headed

# Generate performance report
npx playwright test --reporter=html
```

## Maintenance

When adding new tests:
- ✅ DO use `expect().toBeVisible()` and Playwright's auto-wait
- ✅ DO use `page.goto(url, { waitUntil: 'domcontentloaded' })`
- ✅ DO rely on the cached authentication state (no need for beforeEach login)
- ❌ DON'T use `waitForTimeout` unless absolutely necessary
- ❌ DON'T add manual login flows in tests

## Files Modified

- `playwright.config.ts` - Added setup project, increased workers to 4
- `e2e/auth.setup.ts` - New authentication setup file
- `e2e/helpers/auth.ts` - Optimized wait patterns
- `e2e/helpers/db-setup.ts` - TRUNCATE instead of DELETE
- `e2e/practice.spec.ts` - Fully optimized (0 timeouts)
- `e2e/progress.spec.ts` - Partially optimized
- `e2e/profile.spec.ts` - Partially optimized
- `e2e/live-practice.spec.ts` - Partially optimized
- `e2e/registration.spec.ts` - Partially optimized
- `e2e/auth.spec.ts` - Fully optimized
- `.gitignore` - Added `.auth/` directory

## Architecture Decisions

### Why storageState over cookies?
- Playwright's `storageState` saves both cookies AND localStorage
- Simpler than managing session tokens manually
- Built-in support in Playwright config

### Why 4 workers in CI?
- Balance between parallelization benefit and resource usage
- Most CI environments have 2-4 CPUs available
- Can be adjusted based on actual CI performance

### Why TRUNCATE instead of DELETE?
- TRUNCATE is DDL operation, much faster than DML DELETE
- Automatically resets auto-increment sequences
- CASCADE handles foreign key constraints
- No row-by-row processing overhead

## Troubleshooting

### Tests timing out looking for login/register elements
**Symptom**: Auth or registration tests timeout waiting for login form elements like `auth-toggle-button` or email input fields.

**Cause**: Test is using cached authentication state when it should be testing the login/registration flow from an unauthenticated state.

**Solution**: Ensure the test file is included in the `chromium-unauthenticated` project configuration:
```typescript
// In playwright.config.ts
{
  name: 'chromium-unauthenticated',
  testMatch: ['**/auth.spec.ts', '**/registration.spec.ts'],
}
```

### Tests starting at wrong page
**Symptom**: Test expects to be on a certain page but is on a different page or blank.

**Cause**: When using cached authentication, tests don't automatically navigate anywhere - they need explicit navigation.

**Solution**: Add explicit navigation at the start of each test:
```typescript
test('should do something', async ({ page }) => {
  // Explicitly navigate to starting page
  await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });

  // Rest of test...
});
```
