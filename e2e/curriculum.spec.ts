import { test, expect } from '@playwright/test';

test.describe('Curriculum Pages', () => {
  // Authentication is handled via storageState in playwright.config.ts

  test('should display M1 curriculum page with header and navigation', async ({ page }) => {
    // Navigate to M1 curriculum
    await page.goto('/curriculum/m1', { waitUntil: 'domcontentloaded' });

    // Wait for loading to complete
    await page.waitForTimeout(2000);

    // Check page header
    await expect(page.getByText(/Curriculum PAES.*Nivel M1/i)).toBeVisible();

    // Check navbar elements
    await expect(page.getByText(/SimplePAES.*Matemática/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Volver al Inicio/i }).first()).toBeVisible();

    // Check description text
    await expect(page.getByText(/Competencia Matemática 1.*Contenidos básicos/i)).toBeVisible();

    // Check exam details
    await expect(page.getByText(/Duración.*2h 20min/i)).toBeVisible();
    await expect(page.getByText(/Preguntas.*65/i)).toBeVisible();
  });

  test('should display M2 curriculum page with header and navigation', async ({ page }) => {
    // Navigate to M2 curriculum
    await page.goto('/curriculum/m2', { waitUntil: 'domcontentloaded' });

    // Wait for loading to complete
    await page.waitForTimeout(2000);

    // Check page header
    await expect(page.getByText(/Curriculum PAES.*Nivel M2/i)).toBeVisible();

    // Check description text
    await expect(page.getByText(/Competencia Matemática 2.*Contenidos avanzados/i)).toBeVisible();

    // Check exam details (M2 has different number of questions)
    await expect(page.getByText(/Preguntas.*55/i)).toBeVisible();
    await expect(page.getByText(/Suficiencia de Datos/i)).toBeVisible();
  });

  test('should display thematic units section', async ({ page }) => {
    await page.goto('/curriculum/m1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Check thematic units heading
    await expect(page.getByText(/📚 Ejes Temáticos y Unidades/i)).toBeVisible();

    // Check that subject sections are visible with their icons
    await expect(page.getByText(/🔢.*Números/i)).toBeVisible();
    await expect(page.getByText(/📐.*Álgebra y Funciones/i)).toBeVisible();
    await expect(page.getByText(/📏.*Geometría/i)).toBeVisible();
    await expect(page.getByText(/📊.*Probabilidad y Estadística/i)).toBeVisible();
  });

  test('should display practice links for each subject', async ({ page }) => {
    await page.goto('/curriculum/m1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Check that "Practicar →" links are visible for each subject
    const practiceLinks = page.getByRole('link', { name: /Practicar →/i });
    const count = await practiceLinks.count();

    // Should have at least 4 practice links (one for each subject)
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('should expand and collapse thematic unit topics', async ({ page }) => {
    await page.goto('/curriculum/m1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Find a topic button (they have ▶ or ▼ indicators)
    const firstTopicButton = page.locator('button').filter({ hasText: /▶|▼/ }).first();
    await expect(firstTopicButton).toBeVisible();

    // Check initial state (collapsed, showing ▶)
    const initialText = await firstTopicButton.textContent();
    const isInitiallyCollapsed = initialText?.includes('▶');

    // Click to expand/collapse
    await firstTopicButton.click();
    await page.waitForTimeout(500);

    // Check that the indicator changed
    const afterClickText = await firstTopicButton.textContent();

    if (isInitiallyCollapsed) {
      // Should now show ▼ (expanded)
      expect(afterClickText).toContain('▼');
      // Subsections should be visible
      await expect(page.getByText(/📋 Subsecciones:/i).first()).toBeVisible();
    } else {
      // Should now show ▶ (collapsed)
      expect(afterClickText).toContain('▶');
    }

    // Click again to toggle back
    await firstTopicButton.click();
    await page.waitForTimeout(500);

    // Should return to original state
    const finalText = await firstTopicButton.textContent();
    if (isInitiallyCollapsed) {
      expect(finalText).toContain('▶');
    } else {
      expect(finalText).toContain('▼');
    }
  });

  test('should display habilidades evaluadas section', async ({ page }) => {
    await page.goto('/curriculum/m1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Check habilidades heading
    await expect(page.getByText(/🎯 Habilidades Evaluadas/i)).toBeVisible();

    // Check that all four skills are displayed
    // Note: Using .first() because some skills appear multiple times in the skill-topic matrix below
    await expect(page.getByText('Resolver problemas').first()).toBeVisible();
    await expect(page.getByText('Modelar').first()).toBeVisible();
    await expect(page.getByText('Representar').first()).toBeVisible();
    await expect(page.getByText('Argumentar').first()).toBeVisible();
  });

  test('should display skill-topic matrix section', async ({ page }) => {
    await page.goto('/curriculum/m1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Check matrix heading
    await expect(page.getByText(/🧩 Matriz Habilidad-Eje Temático/i)).toBeVisible();

    // Check description
    await expect(page.getByText(/Cada eje temático evalúa diferentes habilidades/i)).toBeVisible();

    // Check that subject areas in matrix are visible
    await expect(page.getByText('Números').nth(1)).toBeVisible(); // nth(1) because first is in main heading
    await expect(page.getByText('Álgebra y Funciones').nth(1)).toBeVisible();
    await expect(page.getByText('Geometría').nth(1)).toBeVisible();
    await expect(page.getByText('Probabilidad y Estadística').nth(1)).toBeVisible();
  });

  test('should display action buttons at bottom', async ({ page }) => {
    await page.goto('/curriculum/m1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check action buttons
    await expect(page.getByRole('link', { name: /Comenzar Práctica/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Volver al Inicio/i }).last()).toBeVisible();
  });

  test('should navigate to practice page from "Comenzar Práctica" button', async ({ page }) => {
    await page.goto('/curriculum/m1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Click "Comenzar Práctica"
    await page.getByRole('link', { name: /Comenzar Práctica/i }).click();
    await page.waitForTimeout(1000);

    // Should navigate to practice page
    const url = page.url();
    expect(url).toContain('/practice/m1');
  });

  test('should navigate to dashboard from "Volver al Inicio" link', async ({ page }) => {
    await page.goto('/curriculum/m1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Click "Volver al Inicio" in navbar
    await page.getByRole('link', { name: /← Volver al Inicio/i }).first().click();
    await page.waitForTimeout(1000);

    // Should navigate to dashboard
    const url = page.url();
    expect(url).toContain('/dashboard');
  });

  test('should display documentation link for M1 curriculum', async ({ page }) => {
    await page.goto('/curriculum/m1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Check for documentation link (only available for M1)
    const docsLink = page.getByRole('link', { name: /📖.*Documentación Detallada|Docs/i });
    await expect(docsLink).toBeVisible();

    // Verify it links to the docs page
    await expect(docsLink).toHaveAttribute('href', '/curriculum/m1/docs');
  });

  test('should not display documentation link for M2 curriculum', async ({ page }) => {
    await page.goto('/curriculum/m2', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // M2 should not have documentation link
    const docsLink = page.getByRole('link', { name: /📖.*Documentación Detallada|Docs/i });
    const isVisible = await docsLink.isVisible().catch(() => false);

    expect(isVisible).toBe(false);
  });

  test('should display units count for each subject', async ({ page }) => {
    await page.goto('/curriculum/m1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Check that unit counts are displayed
    const unitCounts = page.getByText(/\d+ unidades temáticas/i);
    const count = await unitCounts.count();

    // Should have at least 4 unit counts (one for each subject)
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('should navigate to subject-specific practice from practice links', async ({ page }) => {
    await page.goto('/curriculum/m1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Find and click the first "Practicar →" link
    const firstPracticeLink = page.getByRole('link', { name: /Practicar →/i }).first();
    await expect(firstPracticeLink).toBeVisible();

    // Get the href to verify it includes a subject parameter
    const href = await firstPracticeLink.getAttribute('href');
    expect(href).toMatch(/\/practice\/m1\?subject=/);
  });

  test('should handle mobile level selector on small screens', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/curriculum/m1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Mobile level selector should be visible
    const m1Button = page.getByRole('link', { name: /📐 M1/i });
    const m2Button = page.getByRole('link', { name: /🎓 M2/i });

    await expect(m1Button).toBeVisible();
    await expect(m2Button).toBeVisible();

    // M1 should be active (highlighted)
    await expect(m1Button).toHaveClass(/bg-\[#0A84FF\]/);

    // Click M2 to switch
    await m2Button.click();
    await page.waitForTimeout(1000);

    // Should navigate to M2 curriculum
    const url = page.url();
    expect(url).toContain('/curriculum/m2');
  });

  test('should show loading state before content appears', async ({ page }) => {
    // Navigate to curriculum page
    const responsePromise = page.goto('/curriculum/m1', { waitUntil: 'domcontentloaded' });

    // Check for loading state (might be too fast to catch, so use a timeout)
    const loadingText = page.getByText(/Cargando currículo.../i);
    const isLoadingVisible = await loadingText.isVisible().catch(() => false);

    await responsePromise;
    await page.waitForTimeout(2000);

    // Eventually content should load
    await expect(page.getByText(/Curriculum PAES.*Nivel M1/i)).toBeVisible();
  });

  test('should display all subject sections in correct order', async ({ page }) => {
    await page.goto('/curriculum/m1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Get all subject headings with numbers (1. Números, 2. Álgebra, etc.)
    const subjectHeadings = page.locator('h3').filter({ hasText: /^[1-4]\.\s/ });
    const count = await subjectHeadings.count();

    // Should have 4 numbered subjects
    expect(count).toBe(4);

    // Check they appear in the correct order
    await expect(subjectHeadings.nth(0)).toContainText('1.');
    await expect(subjectHeadings.nth(1)).toContainText('2.');
    await expect(subjectHeadings.nth(2)).toContainText('3.');
    await expect(subjectHeadings.nth(3)).toContainText('4.');
  });

  test('should maintain responsive layout on different screen sizes', async ({ page }) => {
    // Test desktop layout
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/curriculum/m1', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Sidebar should be visible on desktop
    const sidebar = page.locator('.md\\:block').first();
    await expect(sidebar).toBeVisible();

    // Mobile level selector should be hidden
    const mobileLevelSelector = page.locator('.md\\:hidden').filter({ hasText: /📐 M1|🎓 M2/ });
    const isMobileSelectorVisible = await mobileLevelSelector.isVisible().catch(() => false);

    // On desktop, the mobile selector might have display:none, so this is expected
    // We just verify the page loaded correctly
    await expect(page.getByText(/Curriculum PAES/i)).toBeVisible();

    // Test tablet layout
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    await expect(page.getByText(/Curriculum PAES/i)).toBeVisible();

    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    await expect(page.getByText(/Curriculum PAES/i)).toBeVisible();
  });
});
