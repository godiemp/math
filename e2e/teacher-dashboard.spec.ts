import { test, expect } from '@playwright/test';

/**
 * E2E tests for the Teacher Dashboard (/teacher)
 *
 * These tests verify the main teacher dashboard functionality including:
 * - Page loading and welcome header
 * - Statistics cards display
 * - Classes section with test data
 * - Quick actions navigation
 *
 * Test user: teacher@test.com (created in e2e/helpers/db-setup.ts)
 * Test class: "Test Math Class" (seeded with teacher user)
 *
 * Uses storageState from .auth/teacher.json for authentication.
 */

test.describe('Teacher Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/teacher', { waitUntil: 'domcontentloaded' });
  });

  test('should load teacher dashboard and display welcome header', async ({ page }) => {
    // Verify welcome header is visible
    const welcomeHeader = page.getByTestId('teacher-welcome-header');
    await expect(welcomeHeader).toBeVisible({ timeout: 10000 });

    // Verify welcome text
    await expect(page.getByText('Bienvenido, Profesor')).toBeVisible();

    // Verify header has gradient styling (emerald-teal)
    await expect(welcomeHeader).toHaveClass(/from-emerald-500/);
  });

  test('should display statistics cards', async ({ page }) => {
    // Wait for loading to complete
    await expect(page.getByTestId('teacher-stats-grid')).toBeVisible({ timeout: 10000 });

    // Verify all 4 stat labels are visible
    await expect(page.getByText('Total Estudiantes')).toBeVisible();
    await expect(page.getByText('Clases Activas')).toBeVisible();
    await expect(page.getByText('Precisión Promedio')).toBeVisible();
    await expect(page.getByText('Con Actividad Reciente')).toBeVisible();
  });

  test('should display classes section with test class', async ({ page }) => {
    // Wait for classes section to be visible
    const classesSection = page.getByTestId('teacher-classes-section');
    await expect(classesSection).toBeVisible({ timeout: 10000 });

    // Verify "Mis Clases" heading
    await expect(page.getByRole('heading', { name: 'Mis Clases' })).toBeVisible();

    // Verify test class from seed is displayed
    await expect(page.getByText('Test Math Class')).toBeVisible();

    // Verify "Ver todas" link is present
    await expect(page.getByText('Ver todas →')).toBeVisible();
  });

  test('should display quick actions section', async ({ page }) => {
    // Wait for quick actions section to be visible
    const quickActions = page.getByTestId('teacher-quick-actions');
    await expect(quickActions).toBeVisible({ timeout: 10000 });

    // Verify "Acciones Rápidas" heading
    await expect(page.getByRole('heading', { name: 'Acciones Rápidas' })).toBeVisible();

    // Verify all 4 action buttons are present
    await expect(page.getByText('Iniciar clase en vivo')).toBeVisible();
    await expect(page.getByText('Gestionar clases')).toBeVisible();
    await expect(page.getByText('Crear nueva clase')).toBeVisible();
    await expect(page.getByText('Ver mini-lecciones')).toBeVisible();
  });

  test('should navigate correctly from quick actions', async ({ page }) => {
    // Wait for quick actions to load
    await expect(page.getByTestId('teacher-quick-actions')).toBeVisible({ timeout: 10000 });

    // Click "Iniciar clase en vivo" and verify navigation
    await page.getByText('Iniciar clase en vivo').click();
    await expect(page).toHaveURL(/\/mini-lessons/, { timeout: 10000 });

    // Go back to teacher dashboard
    await page.goto('/teacher', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('teacher-classes-section')).toBeVisible({ timeout: 10000 });

    // Click "Ver todas →" and verify navigation to classes list
    await page.getByText('Ver todas →').click();
    await expect(page).toHaveURL(/\/teacher\/classes/, { timeout: 10000 });
  });
});
