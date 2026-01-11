import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/student.json');
const teacherAuthFile = path.join(__dirname, '../.auth/teacher.json');
const syncStudentAuthFile = path.join(__dirname, '../.auth/sync-student.json');
const adminAuthFile = path.join(__dirname, '../.auth/admin.json');

/**
 * Global authentication setup for student user.
 * This runs once before all tests and saves the authentication state.
 * All tests will automatically use this saved state, avoiding repeated logins.
 */
setup('authenticate as student', async ({ page }) => {
  // Navigate to login page
  await page.goto('/signin');

  // Dismiss cookie banner
  await page.evaluate(() => {
    localStorage.setItem('cookie-consent', 'accepted');
  });

  // Fill in credentials
  await page.fill('input[name="username"]', 'student@test.com');
  await page.fill('input[type="password"]', 'StudentTest123!');

  // Submit login
  await page.click('button[type="submit"]');

  // Wait for automatic redirect to dashboard - this tests the actual login flow
  // Don't manually navigate to /dashboard as that masks redirect bugs
  await page.waitForURL(/\/dashboard/, { timeout: 5000 });

  // Wait for network to settle to ensure auth state is fully saved
  await page.waitForLoadState('networkidle', { timeout: 10000 });

  // Save signed-in state - this captures all cookies, localStorage, sessionStorage
  await page.context().storageState({ path: authFile });
});

/**
 * Authentication setup for teacher user.
 * Used by teacher-student-sync tests that need teacher auth state.
 */
setup('authenticate as teacher', async ({ page }) => {
  await page.goto('/signin');

  await page.evaluate(() => {
    localStorage.setItem('cookie-consent', 'accepted');
  });

  await page.fill('input[name="username"]', 'teacher@test.com');
  await page.fill('input[type="password"]', 'TeacherTest123!');
  await page.click('button[type="submit"]');

  await page.waitForURL(/\/(teacher|dashboard)/, { timeout: 10000 });
  await page.waitForLoadState('networkidle', { timeout: 10000 });

  await page.context().storageState({ path: teacherAuthFile });
});

/**
 * Authentication setup for sync student (assigned to test teacher).
 * Used by teacher-student-sync tests that need student auth state.
 */
setup('authenticate as sync student', async ({ page }) => {
  await page.goto('/signin');

  await page.evaluate(() => {
    localStorage.setItem('cookie-consent', 'accepted');
  });

  await page.fill('input[name="username"]', 'sync.student@test.com');
  await page.fill('input[type="password"]', 'SyncStudent123!');
  await page.click('button[type="submit"]');

  await page.waitForURL(/\/dashboard/, { timeout: 10000 });
  await page.waitForLoadState('networkidle', { timeout: 10000 });

  await page.context().storageState({ path: syncStudentAuthFile });
});

/**
 * Authentication setup for admin user.
 * Used by admin tests that need admin auth state (e.g., session creation).
 */
setup('authenticate as admin', async ({ page }) => {
  await page.goto('/signin');

  await page.evaluate(() => {
    localStorage.setItem('cookie-consent', 'accepted');
  });

  await page.fill('input[name="username"]', 'admin@test.com');
  await page.fill('input[type="password"]', 'AdminTest123!');
  await page.click('button[type="submit"]');

  await page.waitForURL(/\/(admin|dashboard)/, { timeout: 10000 });
  await page.waitForLoadState('networkidle', { timeout: 10000 });

  await page.context().storageState({ path: adminAuthFile });
});
