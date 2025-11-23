# Subscription Trial E2E Tests

This document describes the comprehensive end-to-end tests created for the free trial subscription flow.

## Created Files

### 1. `e2e/subscription-trial.spec.ts`
**Test Count:** ~30 tests
**Focus:** Free trial activation, paywall behavior, subscription status display

### 2. `e2e/helpers/db-setup.ts` (Updated)
**Changes:** Added trial plan seed data for testing

## Test Coverage

### ✅ Pricing Page Display (4 tests)
Tests the pricing page UI and user experience:

- **Display active plans** - Verifies pricing page loads with available subscription plans
- **Show plan details** - Checks price, features, and trial duration badges are displayed
- **Show FAQ section** - Verifies informational content about trials
- **Redirect unauthenticated users** - Ensures login is required before subscribing

### ✅ Free Trial Activation - MVP Mode (6 tests)
Tests the actual trial activation flow (no MercadoPago, instant activation):

- **Show subscription status** - Displays current subscription status on pricing page
- **Activate via start-trial API** - Complete trial activation flow with API calls
- **Show trial status in profile** - Verify profile displays trial subscription
- **Show trial expiration date** - Check expiration date is shown for trial users
- **Redirect to dashboard** - Verify redirect after successful activation
- **Show loading state** - Check loading indicators during activation

### ✅ Paywall & Feature Gating (6 tests)
Tests access control based on subscription status:

- **Show paywall without subscription** - Free users see paywall on Practice/Curriculum/Progress
- **Allow trial users Practice access** - Trial/paid users can access Practice module
- **Allow trial users Curriculum access** - Trial/paid users can access Curriculum module
- **Allow trial users Progress access** - Trial/paid users can access Progress tracking
- **Allow all users Live Practice** - Live Practice remains free for everyone
- **Admin bypass** - Admin users bypass all paywalls (documented behavior)

### ✅ Edge Cases (5 tests)
Tests error handling and boundary conditions:

- **Prevent duplicate trial** - Users cannot activate trial twice
- **Show "already subscribed" message** - Clear messaging for subscribed users
- **Handle expired trial** - Profile shows expired trial status gracefully
- **Handle API errors** - Graceful error handling for server errors (500)
- **Handle network errors** - Graceful error handling for network failures

### ✅ Subscription Status Display (4 tests)
Tests consistent status display across pages:

- **Display in profile** - Subscription section visible with status
- **Show trial badge** - Trial indicator with expiration info
- **Reflect on dashboard** - Premium access reflected in dashboard cards
- **Consistent across pages** - Status shown consistently (profile, pricing, etc.)

### ✅ MVP Mode Behavior (2 tests)
Tests the MVP mode implementation (no payment gateway):

- **Immediate activation** - Trial activates instantly without redirect to payment
- **Show success message** - Success message includes trial duration (e.g., "7 días gratis")

## Test Data Setup

### Database Seed Data (Updated)

The `e2e/helpers/db-setup.ts` now creates two test plans:

#### 1. Free Test Plan
```javascript
{
  id: 'test-plan',
  name: 'Test Plan',
  description: 'Plan for e2e testing',
  price: 0,
  currency: 'CLP',
  duration_days: 365,
  trial_duration_days: 7,
  features: ['all-features'],
  is_active: true
}
```

#### 2. Paid Premium Plan (NEW)
```javascript
{
  id: 'test-paid-plan',
  name: 'Plan Premium',
  description: 'Plan premium para pruebas con período de prueba',
  price: 9990,
  currency: 'CLP',
  duration_days: 30,
  trial_duration_days: 7,
  features: [
    'Acceso completo a práctica M1 y M2',
    'Acceso al currículum completo',
    'Seguimiento de progreso',
    'Estadísticas detalladas'
  ],
  is_active: true,
  display_order: 1
}
```

### Test Users

- **student@test.com** - Test student with active subscription (existing)
- **admin@test.com** - Test admin with full access (existing)

## Running the Tests

### Run All Subscription Tests
```bash
npm run test:e2e -- subscription-trial.spec.ts
```

### Run Specific Test Suites
```bash
# Pricing page tests only
npm run test:e2e -- subscription-trial.spec.ts -g "Pricing Page Display"

# Trial activation tests only
npm run test:e2e -- subscription-trial.spec.ts -g "Free Trial Activation"

# Paywall tests only
npm run test:e2e -- subscription-trial.spec.ts -g "Paywall"

# Edge cases only
npm run test:e2e -- subscription-trial.spec.ts -g "Edge Cases"
```

### Run with UI Mode
```bash
npm run test:e2e:ui
```

## Key Test Scenarios

### 1. Complete Trial Activation Flow
```
User Journey:
1. Navigate to /pricing
2. Click "Subscribe" button
3. Modal appears with trial options
4. Click "Try First" (no card required)
5. API calls /api/payments/start-trial
6. Success toast appears
7. Redirect to /dashboard
8. Verify premium access to modules
```

### 2. Paywall Verification
```
Free User Journey:
1. Navigate to /practice/m1
2. See paywall message
3. Click CTA to /pricing
4. Activate trial
5. Return to /practice/m1
6. Full access granted
```

### 3. Duplicate Trial Prevention
```
Subscribed User Journey:
1. Already has active subscription
2. Navigate to /pricing
3. See "Already Subscribed" status
4. Subscribe button disabled or shows "Subscribed"
5. Cannot activate another trial
```

## Implementation Details

### MVP Mode vs Production Mode

**Current Implementation (MVP Mode):**
- No MercadoPago integration
- Instant trial activation
- Both `/start-trial` and `/create-preference` endpoints activate trials
- Returns: `{ mvpMode: true, subscription, trialDays, message }`

**Future Production Mode:**
- MercadoPago payment gateway integration
- Redirect to checkout
- Webhook-based activation
- Actual payment processing

### API Endpoints Tested

1. **GET /api/payments/plans** - Fetch active subscription plans
2. **POST /api/payments/start-trial** - Activate free trial without payment
3. **POST /api/payments/create-preference** - In MVP mode, also activates trial

### Feature Gates Tested

**Premium Modules (Require Subscription):**
- `/practice/m1` - M1 Practice
- `/practice/m2` - M2 Practice
- `/curriculum/m1` - M1 Curriculum
- `/curriculum/m2` - M2 Curriculum
- `/progress` - Progress Tracking

**Free Modules:**
- `/live-practice` - Live Practice Sessions
- `/dashboard` - Dashboard (view only)
- `/profile` - Profile (view only)

### Authorization Logic

From `AuthContext.tsx`:
```typescript
const isPaidUser = !!user && (
  user.role === 'admin' ||
  user.subscription?.status === 'active' ||
  user.subscription?.status === 'trial'
);
```

**Access Granted To:**
- Admin users (all access)
- Users with `subscription.status = 'trial'`
- Users with `subscription.status = 'active'`

## Test Maintenance

### When to Update Tests

1. **Payment Integration Changes** - When MercadoPago is fully integrated
2. **Plan Structure Changes** - New plan fields or pricing models
3. **Trial Duration Changes** - Different trial periods
4. **Feature Gate Changes** - New premium/free modules
5. **UI Changes** - Pricing page redesign

### Known Limitations

1. **Time-based testing** - Tests don't verify actual trial expiration (would require time manipulation)
2. **Email testing** - No email verification (would require email service mocking)
3. **Payment webhooks** - Not tested (production-only feature)
4. **Multi-plan subscriptions** - Only single plan per user tested

## Next Steps

### Recommended Additional Tests

1. **Trial Expiration Flow**
   - Mock time to test trial expiration
   - Verify access revoked after expiration
   - Test renewal/resubscription flow

2. **Admin Panel Tests**
   - Create/edit/delete plans
   - View subscription analytics
   - Manage user subscriptions

3. **Email Notifications**
   - Trial welcome email
   - Trial expiration warning
   - Trial expiration notification

4. **Production Mode Tests**
   - MercadoPago redirect flow
   - Webhook handling
   - Payment success/failure pages

## Troubleshooting

### Common Issues

**Issue:** Tests fail with "user already has subscription"
- **Cause:** Test database not cleaned between runs
- **Solution:** Run `npm run test:e2e` to trigger global setup

**Issue:** Paywall tests fail
- **Cause:** Test user has active subscription
- **Solution:** Check `db-setup.ts` - test student has pre-activated subscription

**Issue:** Pricing page doesn't show plans
- **Cause:** Plans not seeded in test database
- **Solution:** Verify `db-setup.ts` creates both test plans

## Documentation References

- [E2E Test Setup](./E2E_TEST_SETUP.md)
- [Payment Integration](./PAYMENT_INTEGRATION.md)
- [Subscription Service](./backend/src/services/subscriptionService.ts)
- [Payment Service](./backend/src/services/paymentService.ts)

---

**Created:** November 23, 2024
**Author:** Claude Code
**Branch:** missing-e2e-tests
**Test Framework:** Playwright 1.56.1
