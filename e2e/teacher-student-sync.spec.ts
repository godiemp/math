import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import path from 'path';
import {
  setupSocketMock,
  createTeacherMockHandler,
  createStudentMockHandler,
} from './helpers/socket-mock';

// Auth state files created by auth.setup.ts
const TEACHER_AUTH = path.join(__dirname, '../.auth/teacher.json');
const SYNC_STUDENT_AUTH = path.join(__dirname, '../.auth/sync-student.json');

/**
 * E2E tests for teacher-student real-time lesson sync feature.
 *
 * These tests verify the WebSocket-based synchronization between
 * a teacher controlling a lesson and students following along.
 *
 * WebSocket connections are mocked using Playwright's native routeWebSocket()
 * to enable testing without real WebSocket infrastructure.
 *
 * Test users (created in e2e/helpers/db-setup.ts):
 * - teacher@test.com / TeacherTest123! (test teacher)
 * - sync.student@test.com / SyncStudent123! (student assigned to test teacher)
 */

// Test lesson - using relaciones-lineales which has follow mode support
const TEST_LESSON = {
  slug: 'relaciones-lineales',
  title: 'Relaciones Lineales',
  totalSteps: 6,
};

/**
 * Socket mock return type
 */
type SocketMock = Awaited<ReturnType<typeof setupSocketMock>>;

test.describe('Teacher-Student Real-Time Sync', () => {
  // These tests need more time due to multiple browser contexts and login flows
  // Increased timeout for CI environments
  test.setTimeout(120000);

  let browser: Browser;
  let teacherContext: BrowserContext;
  let studentContext: BrowserContext;
  let teacherPage: Page;
  let studentPage: Page;
  let teacherMock: SocketMock;
  let studentMock: SocketMock;

  test.beforeAll(async ({ browser: testBrowser }) => {
    browser = testBrowser;
  });

  test.beforeEach(async () => {
    // Create browser contexts with pre-loaded auth state (instant, no HTTP login)
    teacherContext = await browser.newContext({
      storageState: TEACHER_AUTH,
    });
    studentContext = await browser.newContext({
      storageState: SYNC_STUDENT_AUTH,
    });

    // Setup WebSocket mocking BEFORE creating pages
    teacherMock = await setupSocketMock(teacherContext, {
      onEvent: createTeacherMockHandler(),
    });
    studentMock = await setupSocketMock(studentContext, {
      onEvent: createStudentMockHandler('test-teacher'),
    });

    teacherPage = await teacherContext.newPage();
    studentPage = await studentContext.newPage();
  });

  test.afterEach(async () => {
    await teacherPage.close();
    await studentPage.close();
    await teacherContext.close();
    await studentContext.close();
  });

  test('teacher can access live lesson control page', async () => {
    // Already authenticated via storageState - navigate directly
    await teacherPage.goto('/teacher');
    await expect(teacherPage.getByText('Bienvenido, Profesor')).toBeVisible({ timeout: 10000 });

    // Navigate to live lesson page
    await teacherPage.goto(`/teacher/live/${TEST_LESSON.slug}`);

    // Verify we're on the live lesson control page - use heading to avoid duplicate text
    await expect(teacherPage.getByRole('heading', { name: TEST_LESSON.title })).toBeVisible({ timeout: 10000 });

    // The page auto-starts the lesson, so wait for "EN VIVO" indicator
    await expect(teacherPage.getByText(/en vivo/i)).toBeVisible({ timeout: 10000 });
  });

  test('teacher can start and control a live lesson', async () => {
    // Already authenticated via storageState - navigate directly
    await teacherPage.goto(`/teacher/live/${TEST_LESSON.slug}`);

    // Wait for lesson to auto-start - should show "EN VIVO" indicator
    await expect(teacherPage.getByText(/en vivo/i)).toBeVisible({ timeout: 10000 });

    // Verify event was emitted (lesson auto-started)
    const emitted = teacherMock.getEmittedEvents();
    expect(emitted.some(e => e.event === 'teacher:start_lesson')).toBe(true);

    // Verify step navigation is visible
    await expect(teacherPage.getByText(/paso 1/i)).toBeVisible({ timeout: 10000 });

    // Navigate to next step
    const nextButton = teacherPage.getByRole('button', { name: /siguiente|next|►/i });
    if (await nextButton.isVisible()) {
      await nextButton.click();
      await expect(teacherPage.getByText(/paso 2/i)).toBeVisible({ timeout: 5000 });
    }

    // End the lesson
    const endButton = teacherPage.getByRole('button', { name: /terminar|finalizar|end/i });
    await expect(endButton).toBeVisible();
    await endButton.click();

    // Verify lesson ended - page redirects to teacher dashboard
    await expect(teacherPage).toHaveURL(/\/teacher$/, { timeout: 10000 });
  });

  test.skip('student assigned to teacher sees live lesson notification', async () => {
    // TODO: This feature is not yet implemented in the student dashboard
    // The student dashboard needs a live lesson notification component
    // Already authenticated via storageState - navigate directly
    await studentPage.goto('/dashboard');

    // Wait for student page to be fully loaded
    await studentPage.waitForTimeout(500);

    // Simulate teacher starting a lesson by sending event to student
    studentMock.sendEvent('lesson:available', {
      teacherId: 'test-teacher',
      teacherUsername: 'Test Teacher',
      lessonId: TEST_LESSON.slug,
      lessonTitle: TEST_LESSON.title,
      currentStep: 1,
      totalSteps: TEST_LESSON.totalSteps,
      roomId: `test-teacher_${TEST_LESSON.slug}`,
    });

    // Student should see the live lesson notification banner
    await expect(
      studentPage.getByText(/clase en vivo|clase disponible/i)
    ).toBeVisible({ timeout: 10000 });
  });

  test.skip('student can join live lesson and follow teacher steps', async () => {
    // TODO: This test requires complex socket event flow that the current mock doesn't fully support
    // The useStudentLessonSync hook needs proper socket initialization and event sequences
    // Already authenticated via storageState - navigate directly
    await teacherPage.goto(`/teacher/live/${TEST_LESSON.slug}`);

    // Verify lesson auto-started - should show "EN VIVO" indicator
    await expect(teacherPage.getByText(/en vivo/i)).toBeVisible({ timeout: 10000 });

    // Send lesson available event to student
    studentMock.sendEvent('lesson:available', {
      teacherId: 'test-teacher',
      teacherUsername: 'Test Teacher',
      lessonId: TEST_LESSON.slug,
      lessonTitle: TEST_LESSON.title,
      currentStep: 1,
      totalSteps: TEST_LESSON.totalSteps,
      roomId: `test-teacher_${TEST_LESSON.slug}`,
    });

    // Student navigates to the lesson page
    await studentPage.goto(`/lessons/m1/${TEST_LESSON.slug}`);

    // Wait for page and socket to be ready
    await studentPage.waitForTimeout(500);

    // Send lesson state to student to enable follow mode
    studentMock.sendEvent('lesson:state', {
      teacherId: 'test-teacher',
      teacherUsername: 'Test Teacher',
      lessonId: TEST_LESSON.slug,
      lessonTitle: TEST_LESSON.title,
      currentStep: 1,
      totalSteps: TEST_LESSON.totalSteps,
      roomId: `test-teacher_${TEST_LESSON.slug}`,
    });

    // Student should see they're in follow mode (following teacher)
    await expect(
      studentPage.getByText(/siguiendo|follow/i)
    ).toBeVisible({ timeout: 10000 });

    // Simulate teacher moving to step 2
    studentMock.sendEvent('lesson:step_changed', {
      lessonId: TEST_LESSON.slug,
      step: 2,
      changedAt: Date.now(),
    });

    // Give time for UI to update
    await studentPage.waitForTimeout(500);

    // Clean up - end the lesson on teacher side
    const endButton = teacherPage.getByRole('button', { name: /terminar|finalizar|end/i });
    await endButton.click();
  });

  test.skip('student receives lesson ended notification when teacher ends lesson', async () => {
    // TODO: This test requires complex socket event flow that the current mock doesn't fully support
    // The useStudentLessonSync hook needs proper socket initialization and event sequences
    // Already authenticated via storageState - navigate directly
    await teacherPage.goto(`/teacher/live/${TEST_LESSON.slug}`);

    // Verify lesson auto-started - should show "EN VIVO" indicator
    await expect(teacherPage.getByText(/en vivo/i)).toBeVisible({ timeout: 10000 });

    // Student goes to lesson page
    await studentPage.goto(`/lessons/m1/${TEST_LESSON.slug}`);
    await studentPage.waitForTimeout(500);

    // Send follow mode state to student
    studentMock.sendEvent('lesson:state', {
      teacherId: 'test-teacher',
      teacherUsername: 'Test Teacher',
      lessonId: TEST_LESSON.slug,
      lessonTitle: TEST_LESSON.title,
      currentStep: 1,
      totalSteps: TEST_LESSON.totalSteps,
      roomId: `test-teacher_${TEST_LESSON.slug}`,
    });

    await expect(studentPage.getByText(/siguiendo|follow/i)).toBeVisible({ timeout: 10000 });

    // Teacher ends the lesson
    const endButton = teacherPage.getByRole('button', { name: /terminar|finalizar|end/i });
    await endButton.click();

    // Send lesson ended event to student
    studentMock.sendEvent('lesson:ended', {
      lessonId: TEST_LESSON.slug,
      reason: 'teacher_ended',
      endedAt: Date.now(),
    });

    // Student should no longer see follow mode indicator
    await studentPage.waitForTimeout(1000);

    // The follow mode banner should disappear or show ended state
    const followingText = studentPage.getByText(/siguiendo|follow/i);
    const isStillFollowing = await followingText.isVisible().catch(() => false);

    // After lesson ends, follow mode should be disabled
    expect(isStillFollowing).toBe(false);
  });

  test('teacher dashboard shows "start live lesson" quick action', async () => {
    // Already authenticated via storageState - navigate directly
    await teacherPage.goto('/teacher');
    await expect(teacherPage.getByText('Bienvenido, Profesor')).toBeVisible({ timeout: 10000 });

    // Check for the "Iniciar clase en vivo" quick action button
    const liveButton = teacherPage.getByRole('button', { name: /iniciar clase en vivo/i });
    await expect(liveButton).toBeVisible();

    // Click should navigate to mini-lessons selection
    await liveButton.click();
    await expect(teacherPage).toHaveURL(/\/mini-lessons/, { timeout: 10000 });
  });

  test('mini-lessons page shows "En Vivo" button for teachers', async () => {
    // Already authenticated via storageState - navigate directly
    await teacherPage.goto('/mini-lessons/m1/algebra');

    // Should see at least one lesson with "En Vivo" button
    const liveButton = teacherPage.getByRole('button', { name: /en vivo/i }).first();
    await expect(liveButton).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Teacher-Student Sync - Edge Cases', () => {
  // These tests need more time due to browser context creation and login flows
  // Increased timeout for CI environments
  test.setTimeout(120000);

  let browser: Browser;
  let teacherContext: BrowserContext;
  let teacherPage: Page;
  let teacherMock: SocketMock;

  test.beforeAll(async ({ browser: testBrowser }) => {
    browser = testBrowser;
  });

  test.beforeEach(async () => {
    // Create browser context with pre-loaded auth state (instant, no HTTP login)
    teacherContext = await browser.newContext({
      storageState: TEACHER_AUTH,
    });

    // Setup WebSocket mocking BEFORE creating page
    teacherMock = await setupSocketMock(teacherContext, {
      onEvent: createTeacherMockHandler(),
    });

    teacherPage = await teacherContext.newPage();
  });

  test.afterEach(async () => {
    await teacherPage.close();
    await teacherContext.close();
  });

  test.skip('non-teacher user on live lesson page does not start lesson', async () => {
    // TODO: This test cannot work with current setup because:
    // 1. The socket mock doesn't distinguish between teacher and student connections
    // 2. The teacherContext has teacher auth pre-loaded via storageState
    // This test would need a separate studentContext with student auth to work properly.
    // Try to navigate to teacher live lesson page
    await teacherPage.goto(`/teacher/live/${TEST_LESSON.slug}`);

    // The page loads but lesson should NOT auto-start for non-teachers
    // because useSocket doesn't emit teacher:start_lesson for non-teacher roles
    // The page shows the lesson info but without "EN VIVO" indicator
    await expect(teacherPage.getByRole('heading', { name: TEST_LESSON.title })).toBeVisible({ timeout: 10000 });

    // After a brief wait, verify "EN VIVO" is NOT shown (socket mock doesn't auto-respond for students)
    await teacherPage.waitForTimeout(1000);
    const isLive = await teacherPage.getByText(/en vivo/i).isVisible().catch(() => false);

    // Student should not be able to start a live lesson
    expect(isLive).toBe(false);
  });

  test('teacher can restart lesson after ending it', async () => {
    // Already authenticated via storageState - navigate directly
    await teacherPage.goto(`/teacher/live/${TEST_LESSON.slug}`);

    // Verify lesson auto-started - should show "EN VIVO" indicator
    await expect(teacherPage.getByText(/en vivo/i)).toBeVisible({ timeout: 10000 });

    // End lesson
    const endButton = teacherPage.getByRole('button', { name: /terminar|finalizar|end/i });
    await endButton.click();

    // After ending, should redirect to teacher dashboard (as per page behavior)
    await expect(teacherPage).toHaveURL(/\/teacher$/, { timeout: 10000 });

    // Navigate back to live lesson page - should auto-start again
    await teacherPage.goto(`/teacher/live/${TEST_LESSON.slug}`);

    // Should be live again
    await expect(teacherPage.getByText(/en vivo/i)).toBeVisible({ timeout: 10000 });
  });
});
