import { test, expect } from '@playwright/test';

/**
 * E2E tests for the Teacher Class Detail Page (/teacher/classes/[classId])
 *
 * These tests verify the student management within a class including:
 * - Page loading and header display
 * - Students table with enrolled students
 * - Add student modal (search and create tabs)
 * - Search for available students
 * - Add students to class
 * - Create new student in class
 * - Remove student from class
 *
 * Test user: teacher@test.com (created in e2e/helpers/db-setup.ts)
 * Test class: test-class-1 (Test Math Class)
 * Enrolled student: Sync Student (test-sync-student)
 * Available student: María González (test-managed-student) - NOT enrolled in class
 *
 * Uses storageState from .auth/teacher.json for authentication.
 */

// Use the test class ID from db-setup.ts
const TEST_CLASS_ID = 'test-class-1';

test.describe('Teacher Class Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/teacher/classes/${TEST_CLASS_ID}`, { waitUntil: 'domcontentloaded' });
  });

  test('should load class detail page and display header', async ({ page }) => {
    // Wait for header to be visible
    const header = page.getByTestId('class-detail-header');
    await expect(header).toBeVisible({ timeout: 15000 });

    // Verify class name is displayed
    await expect(page.getByText('Test Math Class')).toBeVisible();

    // Verify add students button is visible
    const addButton = page.getByTestId('class-add-students-button');
    await expect(addButton).toBeVisible();
    await expect(addButton).toHaveText(/Agregar Estudiantes/);
  });

  test('should display enrolled student in students table', async ({ page }) => {
    // Wait for header to load
    await expect(page.getByTestId('class-detail-header')).toBeVisible({ timeout: 15000 });

    // Wait for students table to be visible (desktop view)
    // Note: The seeded Sync Student is enrolled in this class
    const table = page.getByTestId('class-students-table');
    await expect(table).toBeVisible({ timeout: 15000 });

    // Verify enrolled student is displayed in the table (scoped to avoid mobile view duplicate)
    await expect(table.getByText('Sync Student')).toBeVisible();
  });

  test('should open add student modal with search tab active', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByTestId('class-detail-header')).toBeVisible({ timeout: 15000 });

    // Click add students button
    await page.getByTestId('class-add-students-button').click();

    // Verify modal appears
    const modal = page.getByTestId('class-add-student-modal');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Verify modal title
    await expect(modal.getByText('Agregar Estudiantes')).toBeVisible();

    // Verify tabs are present
    await expect(modal.getByText('Buscar Existente')).toBeVisible();
    await expect(modal.getByText('Crear Nuevo')).toBeVisible();

    // Verify search input is visible (search tab is default)
    const searchInput = page.getByTestId('class-student-search-input');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('placeholder', 'Buscar por nombre o email...');

    // Verify search button
    const searchButton = page.getByTestId('class-student-search-button');
    await expect(searchButton).toBeVisible();
  });

  test('should close add student modal on X button click', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByTestId('class-detail-header')).toBeVisible({ timeout: 15000 });

    // Open modal
    await page.getByTestId('class-add-students-button').click();
    const modal = page.getByTestId('class-add-student-modal');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Click X button to close
    await modal.locator('button').first().click();

    // Modal should be hidden
    await expect(modal).not.toBeVisible();
  });

  test('should search for available students and find María González', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByTestId('class-detail-header')).toBeVisible({ timeout: 15000 });

    // Open modal
    await page.getByTestId('class-add-students-button').click();
    const modal = page.getByTestId('class-add-student-modal');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Search for María (seeded student not enrolled in class)
    const searchInput = page.getByTestId('class-student-search-input');
    await searchInput.fill('María');

    const searchButton = page.getByTestId('class-student-search-button');
    await searchButton.click();

    // Wait for search results
    const searchResults = page.getByTestId('class-student-search-results');
    await expect(searchResults).toBeVisible({ timeout: 10000 });

    // Verify María González appears in results (scoped to search results)
    await expect(searchResults.getByText('María González')).toBeVisible({ timeout: 10000 });
    await expect(searchResults.getByText('maria.gonzalez@student.simplepaes.cl')).toBeVisible();
  });

  test('should show empty results when searching for non-existent student', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByTestId('class-detail-header')).toBeVisible({ timeout: 15000 });

    // Open modal
    await page.getByTestId('class-add-students-button').click();
    const modal = page.getByTestId('class-add-student-modal');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Search for non-existent student
    const searchInput = page.getByTestId('class-student-search-input');
    await searchInput.fill('nonexistent12345');

    const searchButton = page.getByTestId('class-student-search-button');
    await searchButton.click();

    // Verify empty state message
    const emptyState = page.getByTestId('class-student-search-empty');
    await expect(emptyState).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('No se encontraron estudiantes')).toBeVisible();
  });

  test('should NOT show already enrolled students in search results', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByTestId('class-detail-header')).toBeVisible({ timeout: 15000 });

    // Open modal
    await page.getByTestId('class-add-students-button').click();
    const modal = page.getByTestId('class-add-student-modal');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Search for Sync (which is already enrolled)
    const searchInput = page.getByTestId('class-student-search-input');
    await searchInput.fill('Sync');

    const searchButton = page.getByTestId('class-student-search-button');
    await searchButton.click();

    // Wait for results and verify Sync Student is NOT in results
    // (they are already enrolled in the class)
    await page.waitForTimeout(1000); // Wait for search to complete

    const searchResults = page.getByTestId('class-student-search-results');
    await expect(searchResults).toBeVisible();

    // The empty state should appear since Sync Student is already enrolled
    const emptyOrResults = page.getByTestId('class-student-search-empty');
    await expect(emptyOrResults).toBeVisible({ timeout: 5000 });
  });

  test('should switch to Create New tab and show form', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByTestId('class-detail-header')).toBeVisible({ timeout: 15000 });

    // Open modal
    await page.getByTestId('class-add-students-button').click();
    const modal = page.getByTestId('class-add-student-modal');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Click on "Crear Nuevo" tab
    await modal.getByText('Crear Nuevo').click();

    // Verify create form fields are visible
    const firstNameInput = page.getByTestId('class-create-student-firstname');
    const lastNameInput = page.getByTestId('class-create-student-lastname');
    const createButton = page.getByTestId('class-create-student-button');

    await expect(firstNameInput).toBeVisible();
    await expect(lastNameInput).toBeVisible();
    await expect(createButton).toBeVisible();
    await expect(createButton).toHaveText('Crear Estudiante');

    // Verify info message about grade level
    await expect(page.getByText(/El nivel del estudiante se asignará automáticamente/)).toBeVisible();
  });

  test('should add searched student to class', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByTestId('class-detail-header')).toBeVisible({ timeout: 15000 });

    // Open modal
    await page.getByTestId('class-add-students-button').click();
    const modal = page.getByTestId('class-add-student-modal');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Search for María González
    const searchInput = page.getByTestId('class-student-search-input');
    await searchInput.fill('María');

    const searchButton = page.getByTestId('class-student-search-button');
    await searchButton.click();

    // Wait for search results (scoped to search results container)
    const searchResults = page.getByTestId('class-student-search-results');
    await expect(searchResults.getByText('María González')).toBeVisible({ timeout: 10000 });

    // Click on María González to select her
    const studentResult = page.getByTestId('class-student-result-test-managed-student');
    await studentResult.click();

    // The result should now be highlighted (selected)
    await expect(studentResult).toHaveClass(/border-emerald-500/);

    // Click Add button
    const addButton = page.getByTestId('class-student-add-button');
    await expect(addButton).toHaveText(/Agregar \(1\)/);
    await addButton.click();

    // Modal should close
    await expect(modal).not.toBeVisible({ timeout: 10000 });

    // Verify María González now appears in the class students table (scoped to table)
    const table = page.getByTestId('class-students-table');
    await expect(table).toBeVisible({ timeout: 15000 });
    await expect(table.getByText('María González')).toBeVisible();
  });

  test('should create new student in class and show credentials', async ({ page }) => {
    // Wait for page to load
    await expect(page.getByTestId('class-detail-header')).toBeVisible({ timeout: 15000 });

    // Open modal
    await page.getByTestId('class-add-students-button').click();
    const modal = page.getByTestId('class-add-student-modal');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Switch to Create New tab
    await modal.getByText('Crear Nuevo').click();

    // Fill form with unique data
    const timestamp = Date.now();
    await page.getByTestId('class-create-student-firstname').fill(`Test${timestamp}`);
    await page.getByTestId('class-create-student-lastname').fill(`Student${timestamp}`);

    // Click create button
    await page.getByTestId('class-create-student-button').click();

    // Wait for credentials modal
    const credentialsModal = page.getByTestId('class-student-credentials-modal');
    await expect(credentialsModal).toBeVisible({ timeout: 15000 });

    // Verify credentials modal content
    await expect(credentialsModal.getByText('Estudiante Creado')).toBeVisible();
    await expect(credentialsModal.getByText('Usuario', { exact: true })).toBeVisible();
    await expect(credentialsModal.getByText('Contraseña', { exact: true })).toBeVisible();

    // Close credentials modal
    await credentialsModal.getByText('Entendido').click();
    await expect(credentialsModal).not.toBeVisible();

    // Verify new student appears in table (scoped to table to avoid mobile view duplicate)
    const table = page.getByTestId('class-students-table');
    await expect(table).toBeVisible({ timeout: 10000 });
    await expect(table.getByText(`Test${timestamp} Student${timestamp}`)).toBeVisible();
  });
});

test.describe('Teacher Class Detail Page - Remove Student', () => {
  // This test modifies data, so we run it in a separate describe block
  // to avoid interfering with other tests

  test('should remove student from class', async ({ page }) => {
    // Navigate to class page
    await page.goto(`/teacher/classes/${TEST_CLASS_ID}`, { waitUntil: 'domcontentloaded' });

    // Wait for header to load
    await expect(page.getByTestId('class-detail-header')).toBeVisible({ timeout: 15000 });

    // Wait for students table
    const table = page.getByTestId('class-students-table');
    await expect(table).toBeVisible({ timeout: 15000 });

    // Verify Sync Student is present in the table (scoped to avoid mobile view duplicate)
    await expect(table.getByText('Sync Student')).toBeVisible();

    // Set up dialog handler to accept confirmation
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });

    // Click remove button for Sync Student
    const removeButton = page.getByTestId('class-remove-student-test-sync-student');
    await removeButton.click();

    // Wait for removal and verify student is no longer in table (scoped to table)
    await expect(table.getByText('Sync Student')).not.toBeVisible({ timeout: 10000 });
  });
});
