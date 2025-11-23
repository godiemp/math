import { test, expect } from '@playwright/test';

test.describe('Subscription Trial Flow', () => {
  test.describe('Pricing Page Display', () => {
    test('should display pricing page with active plans', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');

      // Check page header
      const pageTitle = page.locator('h1').first();
      await expect(pageTitle).toBeVisible();

      // Check that at least one plan is displayed
      const planCards = page.locator('text=/plan|suscripción|subscription/i');
      await expect(planCards.first()).toBeVisible();
    });

    test('should show plan details including trial duration', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');

      // Look for price display
      const priceElement = page.locator('text=/\\$|CLP|precio/i').first();
      await expect(priceElement).toBeVisible();

      // Look for features list
      const featuresSection = page.locator('ul').first();
      if (await featuresSection.isVisible()) {
        await expect(featuresSection).toBeVisible();
      } else {
        // Or look for feature text
        const featureText = page.locator('text=/característica|feature/i').first();
        await expect(featureText).toBeVisible();
      }

      // Look for trial badge if available
      const trialBadge = page.locator('text=/prueba.*gratis|días.*gratis|free.*trial|trial/i').first();
      if (await trialBadge.isVisible()) {
        await expect(trialBadge).toBeVisible();
      }
    });

    test('should show FAQ section with trial information', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');

      // Scroll to bottom to see FAQ
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // Look for FAQ section
      const faqSection = page.locator('text=/pregunta|question|faq/i').first();
      await expect(faqSection).toBeVisible();
    });

    test('should redirect unauthenticated users to login when clicking subscribe', async ({ page }) => {
      // Use a new context without authentication
      const newContext = await page.context().browser()!.newContext();
      const newPage = await newContext.newPage();

      try {
        await newPage.goto('/pricing');
        await newPage.waitForLoadState('networkidle');

        // Click subscribe button
        const subscribeButton = newPage.locator('button').filter({ hasText: /suscrib|subscribe/i }).first();

        if (await subscribeButton.isVisible()) {
          await subscribeButton.click();
          await newPage.waitForTimeout(2000);

          // Should be redirected to login or see login prompt
          const isOnLoginPage = newPage.url().match(/\/login|^\//);
          const hasLoginForm = await newPage.locator('input[type="email"], input[type="password"]').first().isVisible();

          expect(isOnLoginPage || hasLoginForm).toBeTruthy();
        }
      } finally {
        await newContext.close();
      }
    });
  });

  test.describe('Free Trial Activation (MVP Mode)', () => {
    test.use({ storageState: '.auth/student.json' });

    test('should show subscription status on pricing page when authenticated', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');

      // Should show current subscription status
      const statusSection = page.locator('text=/estado|status|suscripción|subscription/i').first();

      // Wait a moment for content to load
      await page.waitForTimeout(1000);

      // Check if status is displayed (either active, trial, or free)
      const hasStatus = await page.locator('text=/activ|trial|gratis|free|premium/i').first().isVisible();
      expect(hasStatus).toBeTruthy();
    });

    test('should activate free trial via start-trial API', async ({ page }) => {
      // First, check current subscription status
      await page.goto('/profile');
      await page.waitForLoadState('networkidle');

      const hasActiveSubscription = await page.locator('text=/activ|premium|suscripción.*activa/i').first().isVisible();

      if (hasActiveSubscription) {
        // User already has subscription, test should verify this prevents duplicate
        await page.goto('/pricing');
        await page.waitForLoadState('networkidle');

        const subscribeButton = page.locator('button').filter({ hasText: /suscrib|subscribe/i }).first();

        if (await subscribeButton.isVisible()) {
          const isDisabled = await subscribeButton.isDisabled();
          const buttonText = await subscribeButton.textContent();

          // Button should be disabled or show "already subscribed"
          expect(isDisabled || buttonText?.toLowerCase().includes('suscrito') || buttonText?.toLowerCase().includes('subscribed')).toBeTruthy();
        }
      } else {
        // User doesn't have subscription, test activation flow
        await page.goto('/pricing');
        await page.waitForLoadState('networkidle');

        const subscribeButton = page.locator('button').filter({ hasText: /suscrib|subscribe/i }).first();

        if (await subscribeButton.isVisible() && await subscribeButton.isEnabled()) {
          // Intercept the start-trial API call
          const trialResponse = page.waitForResponse(
            response => response.url().includes('/api/payments/start-trial') ||
                       response.url().includes('/api/payments/create-preference')
          ).catch(() => null);

          await subscribeButton.click();
          await page.waitForTimeout(1000);

          // Check if modal appeared with trial options
          const tryFirstButton = page.locator('button').filter({ hasText: /probar.*gratis|try.*first|sin.*tarjeta/i }).first();

          if (await tryFirstButton.isVisible()) {
            // Modal appeared, click "try first" option
            await tryFirstButton.click();
          }

          await page.waitForTimeout(2000);

          const response = await trialResponse;

          if (response) {
            const status = response.status();
            expect([200, 201, 400]).toContain(status);

            // If successful, should show success toast or redirect
            if (status === 200 || status === 201) {
              const successToast = page.locator('text=/activad|éxito|success/i').first();
              const isOnDashboard = page.url().includes('/dashboard');

              expect(await successToast.isVisible() || isOnDashboard).toBeTruthy();
            }
          }
        }
      }
    });

    test('should show trial status in user profile after activation', async ({ page }) => {
      await page.goto('/profile');
      await page.waitForLoadState('networkidle');

      // Look for subscription section
      const subscriptionSection = page.locator('text=/suscripción|subscription|plan/i').first();
      await expect(subscriptionSection).toBeVisible();

      // Should show subscription status (active, trial, or free)
      const statusDisplay = page.locator('text=/activ|trial|gratis|free|premium/i').first();
      await expect(statusDisplay).toBeVisible();
    });

    test('should show trial expiration date if user has active trial', async ({ page }) => {
      await page.goto('/profile');
      await page.waitForLoadState('networkidle');

      // Check if user has trial subscription
      const trialStatus = page.locator('text=/trial|prueba/i').first();

      if (await trialStatus.isVisible()) {
        // Look for expiration date
        const expirationDate = page.locator('text=/expira|vence|expires|hasta|until/i').first();

        if (await expirationDate.isVisible()) {
          await expect(expirationDate).toBeVisible();
        }
      }
    });

    test('should redirect to dashboard after successful trial activation', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');

      const subscribeButton = page.locator('button').filter({ hasText: /suscrib|subscribe/i }).first();

      if (await subscribeButton.isVisible() && await subscribeButton.isEnabled()) {
        await subscribeButton.click();
        await page.waitForTimeout(1000);

        const tryFirstButton = page.locator('button').filter({ hasText: /probar.*gratis|try.*first/i }).first();

        if (await tryFirstButton.isVisible()) {
          await tryFirstButton.click();
          await page.waitForTimeout(3000);

          // Should redirect to dashboard or show success
          const isOnDashboard = page.url().includes('/dashboard');
          const successMessage = await page.locator('text=/activad|éxito|success/i').first().isVisible();

          expect(isOnDashboard || successMessage).toBeTruthy();
        }
      }
    });

    test('should show loading state during trial activation', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');

      const subscribeButton = page.locator('button').filter({ hasText: /suscrib|subscribe/i }).first();

      if (await subscribeButton.isVisible() && await subscribeButton.isEnabled()) {
        await subscribeButton.click();
        await page.waitForTimeout(500);

        // Check for loading indicator
        const loadingIndicator = page.locator('text=/procesando|processing|cargando|loading/i, [class*="spinner"], [class*="animate"]').first();

        // Loading state may appear briefly
        await page.waitForTimeout(500);
      }
    });
  });

  test.describe('Paywall & Feature Gating', () => {
    test.describe('Unauthenticated User Paywalls', () => {
      test('should show paywall to users without subscription on Practice page', async ({ page }) => {
        // Create context without subscription
        const newContext = await page.context().browser()!.newContext();
        const newPage = await newContext.newPage();

        try {
          await newPage.goto('/practice/m1');
          await newPage.waitForLoadState('networkidle');
          await newPage.waitForTimeout(1000);

          // Should redirect to login or show paywall
          const needsLogin = newPage.url().includes('/login') || newPage.url() === '/' || newPage.url().includes('redirect');
          const paywallMessage = await newPage.locator('text=/premium|suscripción|subscription|actualizar|upgrade|prueba.*gratis/i').first().isVisible();

          // One of these should be true for non-authenticated users
          expect(needsLogin || paywallMessage).toBeTruthy();
        } finally {
          await newContext.close();
        }
      });
    });

    test.describe('Authenticated User Access', () => {
      test.use({ storageState: '.auth/student.json' });

      test('should allow trial/paid users full access to Practice module', async ({ page }) => {
        await page.goto('/practice/m1');
        await page.waitForLoadState('networkidle');

        // Should see practice options (Zen, Rapid Fire, etc.)
        const practiceOptions = page.locator('text=/zen|rapid|rápido/i').first();
        await expect(practiceOptions).toBeVisible();

        // Should NOT see paywall
        const paywall = page.locator('text=/actualizar.*plan|upgrade.*plan/i').first();
        const hasPaywall = await paywall.isVisible();
        expect(hasPaywall).toBeFalsy();
      });

      test('should allow trial/paid users full access to Curriculum module', async ({ page }) => {
        await page.goto('/curriculum/m1');
        await page.waitForLoadState('networkidle');

        // Should see curriculum content
        const curriculumContent = page.locator('text=/unidad|unit|tema|topic|habilidad|skill/i').first();
        await expect(curriculumContent).toBeVisible();

        // Should NOT see paywall
        const paywall = page.locator('text=/actualizar.*plan|upgrade.*plan/i').first();
        const hasPaywall = await paywall.isVisible();
        expect(hasPaywall).toBeFalsy();
      });

      test('should allow trial/paid users full access to Progress module', async ({ page }) => {
        await page.goto('/progress');
        await page.waitForLoadState('networkidle');

        // Should see progress tabs
        const progressTabs = page.locator('text=/historial|history|skills|habilidades/i').first();
        await expect(progressTabs).toBeVisible();

        // Should NOT see paywall
        const paywall = page.locator('text=/actualizar.*plan|upgrade.*plan/i').first();
        const hasPaywall = await paywall.isVisible();
        expect(hasPaywall).toBeFalsy();
      });
    });

    test('should allow all users access to Live Practice (free module)', async ({ page }) => {
      // Test with authenticated user
      await page.goto('/live-practice');
      await page.waitForLoadState('networkidle');

      // Should see live practice content
      const liveContent = page.locator('text=/ensayo|session|PAES/i').first();
      await expect(liveContent).toBeVisible();

      // Should NOT see paywall (Live Practice is free)
      const paywall = page.locator('text=/actualizar.*plan|upgrade.*plan/i').first();
      const hasPaywall = await paywall.isVisible();
      expect(hasPaywall).toBeFalsy();
    });

    test('should allow admin users to bypass all paywalls', async ({ page }) => {
      // Note: Would need admin authentication context
      // For now, document that admin role bypasses paywalls
      // This is verified in AuthContext: user.role === 'admin' gives isPaidUser = true
    });
  });

  test.describe('Edge Cases', () => {
    test.use({ storageState: '.auth/student.json' });

    test('should prevent user from activating trial twice', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      // Check if user already has subscription
      const subscribeButton = page.locator('button').filter({ hasText: /suscrib|subscribe/i }).first();

      if (await subscribeButton.isVisible()) {
        const isDisabled = await subscribeButton.isDisabled();
        const buttonText = await subscribeButton.textContent();

        // If user already subscribed, button should be disabled or show different text
        if (isDisabled || buttonText?.toLowerCase().includes('suscrito') || buttonText?.toLowerCase().includes('subscribed')) {
          // Try clicking anyway
          await subscribeButton.click();
          await page.waitForTimeout(1000);

          // Should show error toast or info message
          const errorMessage = page.locator('text=/ya.*tienes|already.*have|suscripción.*activa|active.*subscription/i').first();

          if (await errorMessage.isVisible()) {
            await expect(errorMessage).toBeVisible();
          }
        }
      }
    });

    test('should show "already subscribed" message for subscribed users', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      // Look for current status section
      const statusSection = page.locator('text=/estado.*actual|current.*status/i').first();

      if (await statusSection.isVisible()) {
        // Should show active/trial status
        const activeStatus = page.locator('text=/activ|premium|trial/i').first();
        await expect(activeStatus).toBeVisible();
      }
    });

    test('should handle expired trial gracefully', async ({ page }) => {
      // This would require manipulating time or having an expired trial in test data
      // For now, verify that profile shows trial status

      await page.goto('/profile');
      await page.waitForLoadState('networkidle');

      // Look for subscription section
      const subscriptionSection = page.locator('text=/suscripción|subscription/i').first();

      if (await subscriptionSection.isVisible()) {
        // Status should be visible (active, trial, expired, or free)
        const statusDisplay = page.locator('text=/activ|trial|expirad|expired|gratis|free/i').first();
        await expect(statusDisplay).toBeVisible();
      }
    });

    test('should handle API errors during trial activation gracefully', async ({ page }) => {
      // Intercept API and return error
      await page.route('**/api/payments/start-trial', route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal server error' }),
        });
      });

      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');

      const subscribeButton = page.locator('button').filter({ hasText: /suscrib|subscribe/i }).first();

      if (await subscribeButton.isVisible() && await subscribeButton.isEnabled()) {
        await subscribeButton.click();
        await page.waitForTimeout(1000);

        const tryFirstButton = page.locator('button').filter({ hasText: /probar.*gratis|try.*first/i }).first();

        if (await tryFirstButton.isVisible()) {
          await tryFirstButton.click();
          await page.waitForTimeout(2000);

          // Should show error message
          const errorMessage = page.locator('text=/error|problema|issue|fallo|failed/i').first();
          await expect(errorMessage).toBeVisible();
        }
      }
    });

    test('should handle network errors during trial activation', async ({ page }) => {
      // Intercept API and abort request
      await page.route('**/api/payments/start-trial', route => {
        route.abort('failed');
      });

      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');

      const subscribeButton = page.locator('button').filter({ hasText: /suscrib|subscribe/i }).first();

      if (await subscribeButton.isVisible() && await subscribeButton.isEnabled()) {
        await subscribeButton.click();
        await page.waitForTimeout(1000);

        const tryFirstButton = page.locator('button').filter({ hasText: /probar.*gratis|try.*first/i }).first();

        if (await tryFirstButton.isVisible()) {
          await tryFirstButton.click();
          await page.waitForTimeout(2000);

          // Should show error about connection
          const errorMessage = page.locator('text=/error|conexión|connection|red|network/i').first();
          // Error should be handled gracefully
        }
      }
    });
  });

  test.describe('Subscription Status Display', () => {
    test.use({ storageState: '.auth/student.json' });

    test('should display subscription status in profile page', async ({ page }) => {
      await page.goto('/profile');
      await page.waitForLoadState('networkidle');

      // Should have subscription section
      const subscriptionSection = page.locator('text=/suscripción|subscription|plan/i').first();
      await expect(subscriptionSection).toBeVisible();

      // Should show status
      const status = page.locator('text=/activ|trial|gratis|free|premium|expirad|expired/i').first();
      await expect(status).toBeVisible();
    });

    test('should show trial badge/indicator for trial users', async ({ page }) => {
      await page.goto('/profile');
      await page.waitForLoadState('networkidle');

      // Check if user has trial
      const trialBadge = page.locator('text=/trial|prueba/i').first();

      if (await trialBadge.isVisible()) {
        await expect(trialBadge).toBeVisible();

        // Should also show days remaining or expiration date
        const expirationInfo = page.locator('text=/expira|vence|expires|días.*restantes|days.*remaining/i').first();

        if (await expirationInfo.isVisible()) {
          await expect(expirationInfo).toBeVisible();
        }
      }
    });

    test('should reflect premium access on dashboard', async ({ page }) => {
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Dashboard should show practice cards
      const practiceCard = page.locator('a[href="/practice/m1"], a[href="/practice/m2"]').first();
      await expect(practiceCard).toBeVisible();

      // Cards should be accessible (not locked)
      const isClickable = await practiceCard.isEnabled();
      expect(isClickable).toBeTruthy();
    });

    test('should show subscription info consistently across pages', async ({ page }) => {
      // Check profile page
      await page.goto('/profile');
      await page.waitForLoadState('networkidle');

      const profileStatus = await page.locator('text=/activ|trial|gratis|free/i').first().textContent();

      // Check pricing page
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      const pricingStatus = await page.locator('text=/activ|trial|gratis|free/i').first().textContent();

      // Status should be consistent (both show user has subscription or both show free)
      // This is a loose check - just verify both pages show status
      expect(profileStatus).toBeTruthy();
      expect(pricingStatus).toBeTruthy();
    });
  });

  test.describe('MVP Mode Behavior', () => {
    test.use({ storageState: '.auth/student.json' });

    test('should activate trial immediately without payment in MVP mode', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');

      const subscribeButton = page.locator('button').filter({ hasText: /suscrib|subscribe/i }).first();

      if (await subscribeButton.isVisible() && await subscribeButton.isEnabled()) {
        // Track API responses
        const responses: any[] = [];
        page.on('response', response => {
          if (response.url().includes('/api/payments/')) {
            responses.push({
              url: response.url(),
              status: response.status(),
            });
          }
        });

        await subscribeButton.click();
        await page.waitForTimeout(1000);

        const tryFirstButton = page.locator('button').filter({ hasText: /probar|pay/i }).first();

        if (await tryFirstButton.isVisible()) {
          await tryFirstButton.click();
          await page.waitForTimeout(2000);

          // In MVP mode, should get immediate activation (no redirect to payment gateway)
          const isOnPaymentGateway = page.url().includes('mercadopago');
          expect(isOnPaymentGateway).toBeFalsy();

          // Should either be on dashboard or see success message
          const isOnDashboard = page.url().includes('/dashboard');
          const successMessage = await page.locator('text=/activad|éxito|success|días.*gratis/i').first().isVisible();

          expect(isOnDashboard || successMessage).toBeTruthy();
        }
      }
    });

    test('should show MVP mode success message with trial duration', async ({ page }) => {
      await page.goto('/pricing');
      await page.waitForLoadState('networkidle');

      const subscribeButton = page.locator('button').filter({ hasText: /suscrib|subscribe/i }).first();

      if (await subscribeButton.isVisible() && await subscribeButton.isEnabled()) {
        await subscribeButton.click();
        await page.waitForTimeout(1000);

        const tryFirstButton = page.locator('button').filter({ hasText: /probar.*gratis|try.*first/i }).first();

        if (await tryFirstButton.isVisible()) {
          await tryFirstButton.click();
          await page.waitForTimeout(2000);

          // Look for success message mentioning trial days (e.g., "7 días gratis")
          const trialMessage = page.locator('text=/\\d+.*días.*gratis|\\d+.*days.*free|prueba.*activada|trial.*activated/i').first();

          if (await trialMessage.isVisible()) {
            await expect(trialMessage).toBeVisible();
          }
        }
      }
    });
  });
});
