import { test, expect } from '@playwright/test';

/**
 * E2E tests for the Teacher Students page (/teacher/students)
 *
 * These tests verify the student management functionality including:
 * - Page loading and header display
 * - Student table with seeded managed student
 * - Search and filter functionality
 * - Create student flow
 * - Grade assignment changes
 *
 * Test user: teacher@test.com (created in e2e/helpers/db-setup.ts)
 * Test student: María González (seeded with assigned_by_teacher_id = teacherId)
 *
 * Uses storageState from .auth/teacher.json for authentication.
 */

test.describe('Teacher Students Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/teacher/students', { waitUntil: 'domcontentloaded' });
  });

  test('should load page and display header', async ({ page }) => {
    // Verify header is visible
    const header = page.getByTestId('teacher-students-header');
    await expect(header).toBeVisible({ timeout: 10000 });

    // Verify page title
    await expect(page.getByText('Gestionar Estudiantes')).toBeVisible();

    // Verify subtitle
    await expect(page.getByText('Crea y administra las cuentas de tus estudiantes.')).toBeVisible();

    // Verify add student button is visible
    const addButton = page.getByTestId('teacher-students-add-button');
    await expect(addButton).toBeVisible();
    await expect(addButton).toHaveText(/Agregar Estudiante/);
  });

  test('should display filter controls', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByTestId('teacher-students-header')).toBeVisible({ timeout: 10000 });

    // Verify search input
    const searchInput = page.getByTestId('teacher-students-search-input');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('placeholder', 'Buscar por nombre o email...');

    // Verify grade filter dropdown
    const filterSelect = page.getByTestId('teacher-students-filter-select');
    await expect(filterSelect).toBeVisible();

    // Verify search button
    const searchButton = page.getByTestId('teacher-students-search-button');
    await expect(searchButton).toBeVisible();
    await expect(searchButton).toHaveText('Buscar');
  });

  test('should display student table with seeded managed student', async ({ page }) => {
    // Wait for table to be visible (not loading state)
    const table = page.getByTestId('teacher-students-table');
    await expect(table).toBeVisible({ timeout: 15000 });

    // Verify seeded student is displayed
    await expect(page.getByText('María González')).toBeVisible();
    await expect(page.getByText('maria.gonzalez@student.simplepaes.cl')).toBeVisible();

    // Verify grade badge shows 1° Medio
    await expect(page.getByText('1° Medio')).toBeVisible();

    // Verify table headers
    await expect(page.getByText('Estudiante')).toBeVisible();
    await expect(page.getByText('Nivel Actual')).toBeVisible();
    await expect(page.getByText('Asignar Nivel')).toBeVisible();
    await expect(page.getByText('Última Práctica')).toBeVisible();
    await expect(page.getByText('Acciones')).toBeVisible();
  });

  test('should filter students by search query', async ({ page }) => {
    // Wait for table to load
    const table = page.getByTestId('teacher-students-table');
    await expect(table).toBeVisible({ timeout: 15000 });

    // Search for a student that doesn't exist
    const searchInput = page.getByTestId('teacher-students-search-input');
    await searchInput.fill('nonexistent@test.com');

    const searchButton = page.getByTestId('teacher-students-search-button');
    await searchButton.click();

    // Should show empty state
    const emptyState = page.getByTestId('teacher-students-empty-state');
    await expect(emptyState).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('No se encontraron estudiantes')).toBeVisible();

    // Clear filters and verify student appears again
    await page.getByText('Limpiar filtros').click();
    await expect(table).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('María González')).toBeVisible();
  });

  test('should filter students by grade level', async ({ page }) => {
    // Wait for table to load
    const table = page.getByTestId('teacher-students-table');
    await expect(table).toBeVisible({ timeout: 15000 });

    // Filter by 2° Medio (no students should match)
    const filterSelect = page.getByTestId('teacher-students-filter-select');
    await filterSelect.selectOption('2-medio');

    // Click search to apply filter
    const searchButton = page.getByTestId('teacher-students-search-button');
    await searchButton.click();

    // Should show empty state
    const emptyState = page.getByTestId('teacher-students-empty-state');
    await expect(emptyState).toBeVisible({ timeout: 10000 });

    // Filter by 1° Medio (should show our seeded student)
    await filterSelect.selectOption('1-medio');
    await searchButton.click();

    await expect(table).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('María González')).toBeVisible();
  });

  test('should open add student modal', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByTestId('teacher-students-header')).toBeVisible({ timeout: 10000 });

    // Click add student button
    const addButton = page.getByTestId('teacher-students-add-button');
    await addButton.click();

    // Verify modal appears
    const modal = page.getByTestId('teacher-add-student-modal');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Verify modal title
    await expect(modal.getByText('Agregar Estudiante')).toBeVisible();

    // Verify form fields
    await expect(modal.getByText('Nombre')).toBeVisible();
    await expect(modal.getByText('Apellido')).toBeVisible();
    await expect(modal.getByText('Nivel')).toBeVisible();

    // Verify buttons
    await expect(modal.getByText('Cancelar')).toBeVisible();
    await expect(modal.getByText('Crear Estudiante')).toBeVisible();
  });

  test('should close add student modal on cancel', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByTestId('teacher-students-header')).toBeVisible({ timeout: 10000 });

    // Open modal
    await page.getByTestId('teacher-students-add-button').click();
    const modal = page.getByTestId('teacher-add-student-modal');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Click cancel
    await modal.getByText('Cancelar').click();

    // Modal should be hidden
    await expect(modal).not.toBeVisible();
  });

  test('should create new student and show credentials', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByTestId('teacher-students-header')).toBeVisible({ timeout: 10000 });

    // Open modal
    await page.getByTestId('teacher-students-add-button').click();
    const modal = page.getByTestId('teacher-add-student-modal');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Fill form with unique data
    const timestamp = Date.now();
    await modal.getByPlaceholder('Ej: María').fill(`Test${timestamp}`);
    await modal.getByPlaceholder('Ej: González').fill(`Student${timestamp}`);

    // Select grade level (defaults to 7° Básico, let's pick 2° Medio)
    await modal.locator('select').selectOption('2-medio');

    // Submit form
    await modal.getByText('Crear Estudiante').click();

    // Wait for credentials modal
    const credentialsModal = page.getByTestId('teacher-credentials-modal');
    await expect(credentialsModal).toBeVisible({ timeout: 15000 });

    // Verify credentials modal content
    await expect(credentialsModal.getByText('Estudiante Creado')).toBeVisible();
    await expect(credentialsModal.getByText('Usuario')).toBeVisible();
    await expect(credentialsModal.getByText('Contraseña')).toBeVisible();

    // Close credentials modal
    await credentialsModal.getByText('Entendido').click();
    await expect(credentialsModal).not.toBeVisible();

    // Verify new student appears in table
    const table = page.getByTestId('teacher-students-table');
    await expect(table).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(`Test${timestamp} Student${timestamp}`)).toBeVisible();
  });

  test('should display info box about grade levels', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByTestId('teacher-students-header')).toBeVisible({ timeout: 10000 });

    // Verify info box is visible
    await expect(page.getByText('Sobre los niveles escolares')).toBeVisible();
    await expect(page.getByText(/Cuando asignas un nivel escolar/)).toBeVisible();
  });
});
