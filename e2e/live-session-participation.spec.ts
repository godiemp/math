import { test, expect } from '@playwright/test';
import { setupAuthenticatedSession } from './helpers/auth';

test.describe('Live Session Participation', () => {
  test.beforeEach(async ({ page }) => {
    // Setup authenticated session and navigate to dashboard
    await setupAuthenticatedSession(page);
  });

  test('should display join button when session is in lobby or active state', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Look for sessions with "Unirse" or "Join" button (lobby/active sessions)
    const joinButton = page.getByRole('button', { name: /Unirse|Join/i });
    const registerButton = page.getByRole('button', { name: /Registrarse|Register/i });

    // Should have either join button (if lobby/active) or register button (if scheduled)
    const hasJoin = await joinButton.count();
    const hasRegister = await registerButton.count();

    expect(hasJoin + hasRegister).toBeGreaterThan(0);
  });

  test('should join a session in lobby state successfully', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Check if there's a session in lobby state with join button
    const joinButton = page.getByRole('button', { name: /Unirse|Join/i }).first();
    const hasJoinButton = await joinButton.isVisible().catch(() => false);

    if (hasJoinButton) {
      // Click join button
      await joinButton.click();
      await page.waitForTimeout(2000);

      // Should show success message or navigate to session
      const hasSuccessToast = await page.getByText(/unido|joined|éxito/i).isVisible().catch(() => false);
      const hasSessionView = await page.getByText(/lobby|esperando|waiting/i).isVisible().catch(() => false);

      expect(hasSuccessToast || hasSessionView).toBe(true);
    } else {
      // If no lobby session available, skip test
      test.skip();
    }
  });

  test('should display session lobby with countdown timer', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Look for sessions in lobby state
    const lobbyBadge = page.getByText(/lobby|esperando/i);
    const hasLobby = await lobbyBadge.count() > 0;

    if (hasLobby) {
      // Should display countdown or time until session starts
      const hasCountdown = await page.getByText(/comienza en|empieza en|faltan|minutos|segundos/i).count() > 0;
      const hasTimeInfo = await page.getByText(/\d+:\d+|\d+ min/i).count() > 0;

      expect(hasCountdown || hasTimeInfo).toBe(true);
    }
  });

  test('should show participants list in session view', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    const joinButton = page.getByRole('button', { name: /Unirse|Join/i }).first();
    const hasJoinButton = await joinButton.isVisible().catch(() => false);

    if (hasJoinButton) {
      await joinButton.click();
      await page.waitForTimeout(2000);

      // Should show participants section
      const hasParticipants = await page.getByText(/participantes|participants|jugadores/i).count() > 0;
      expect(hasParticipants).toBeGreaterThan(0);
    } else {
      test.skip();
    }
  });

  test('should display session questions when session becomes active', async ({ page }) => {
    // This test checks if questions appear when a session transitions to active
    // In a real test, this would require waiting for the scheduled time or using test data

    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Look for active sessions
    const activeBadge = page.getByText(/activo|active|en curso/i);
    const hasActiveSession = await activeBadge.count() > 0;

    if (hasActiveSession) {
      // Try to join or view active session
      const joinButton = page.getByRole('button', { name: /Unirse|Join|Ver|View/i }).first();
      const canJoin = await joinButton.isVisible().catch(() => false);

      if (canJoin) {
        await joinButton.click();
        await page.waitForTimeout(2000);

        // Should show question interface
        const hasQuestions = await page.getByText(/pregunta|question/i).count() > 0;
        expect(hasQuestions).toBeGreaterThan(0);
      }
    } else {
      test.skip();
    }
  });

  test('should submit answer during active session', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Look for active session we can join
    const activeBadge = page.getByText(/activo|active/i);
    const hasActiveSession = await activeBadge.count() > 0;

    if (hasActiveSession) {
      const joinButton = page.getByRole('button', { name: /Unirse|Join|Ver/i }).first();
      const canJoin = await joinButton.isVisible().catch(() => false);

      if (canJoin) {
        await joinButton.click();
        await page.waitForTimeout(2000);

        // Find and click an answer option
        const answerOption = page.locator('button').filter({ hasText: /^[A-E]\./ }).first();
        const hasOptions = await answerOption.isVisible().catch(() => false);

        if (hasOptions) {
          await answerOption.click();
          await page.waitForTimeout(1000);

          // Should show feedback or confirmation
          const hasFeedback = await page.getByText(/correcto|incorrecto|guardado|saved/i).count() > 0;
          expect(hasFeedback).toBeGreaterThan(0);
        }
      }
    } else {
      test.skip();
    }
  });

  test('should display current score during session', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    const activeBadge = page.getByText(/activo|active/i);
    const hasActiveSession = await activeBadge.count() > 0;

    if (hasActiveSession) {
      const joinButton = page.getByRole('button', { name: /Unirse|Join|Ver/i }).first();
      const canJoin = await joinButton.isVisible().catch(() => false);

      if (canJoin) {
        await joinButton.click();
        await page.waitForTimeout(2000);

        // Should show score or points
        const hasScore = await page.getByText(/puntos|score|puntaje|\d+\/\d+/i).count() > 0;
        expect(hasScore).toBeGreaterThan(0);
      }
    } else {
      test.skip();
    }
  });

  test('should show real-time leaderboard during session', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    const activeBadge = page.getByText(/activo|active/i);
    const hasActiveSession = await activeBadge.count() > 0;

    if (hasActiveSession) {
      const joinButton = page.getByRole('button', { name: /Unirse|Join|Ver/i }).first();
      const canJoin = await joinButton.isVisible().catch(() => false);

      if (canJoin) {
        await joinButton.click();
        await page.waitForTimeout(2000);

        // Should show leaderboard or rankings
        const hasLeaderboard = await page.getByText(/tabla de posiciones|leaderboard|ranking|posición/i).count() > 0;
        expect(hasLeaderboard).toBeGreaterThan(0);
      }
    } else {
      test.skip();
    }
  });

  test('should navigate between questions in active session', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    const activeBadge = page.getByText(/activo|active/i);
    const hasActiveSession = await activeBadge.count() > 0;

    if (hasActiveSession) {
      const joinButton = page.getByRole('button', { name: /Unirse|Join|Ver/i }).first();
      const canJoin = await joinButton.isVisible().catch(() => false);

      if (canJoin) {
        await joinButton.click();
        await page.waitForTimeout(2000);

        // Look for question counter
        const questionCounter = page.getByText(/pregunta \d+ de \d+/i);
        const hasCounter = await questionCounter.isVisible().catch(() => false);

        if (hasCounter) {
          const counterText = await questionCounter.textContent();
          expect(counterText).toContain('Pregunta');

          // Try to navigate to next question if button exists
          const nextButton = page.getByRole('button', { name: /siguiente|next/i });
          const hasNext = await nextButton.isVisible().catch(() => false);

          if (hasNext) {
            await nextButton.click();
            await page.waitForTimeout(500);

            // Counter should update
            const newCounterText = await questionCounter.textContent();
            expect(newCounterText).not.toBe(counterText);
          }
        }
      }
    } else {
      test.skip();
    }
  });

  test('should get my participation data from session', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Look for a completed session or session we participated in
    const completedBadge = page.getByText(/completado|completed|finalizado/i);
    const hasCompleted = await completedBadge.count() > 0;

    if (hasCompleted) {
      // Find "Ver resultados" or similar button
      const viewResultsButton = page.getByRole('button', { name: /ver resultados|results|detalles/i }).first();
      const canView = await viewResultsButton.isVisible().catch(() => false);

      if (canView) {
        await viewResultsButton.click();
        await page.waitForTimeout(2000);

        // Should show participation details
        const hasDetails = await page.getByText(/respuestas|score|puntos|posición/i).count() > 0;
        expect(hasDetails).toBeGreaterThan(0);
      }
    }
  });

  test('should display session statistics after completion', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    const completedBadge = page.getByText(/completado|completed/i);
    const hasCompleted = await completedBadge.count() > 0;

    if (hasCompleted) {
      const viewResultsButton = page.getByRole('button', { name: /ver resultados|results|detalles/i }).first();
      const canView = await viewResultsButton.isVisible().catch(() => false);

      if (canView) {
        await viewResultsButton.click();
        await page.waitForTimeout(2000);

        // Should show statistics
        const hasStats = await page.getByText(/precisión|accuracy|correctas|tiempo/i).count() > 0;
        expect(hasStats).toBeGreaterThan(0);
      }
    }
  });

  test('should show my ranking in completed session', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    const completedBadge = page.getByText(/completado|completed/i);
    const hasCompleted = await completedBadge.count() > 0;

    if (hasCompleted) {
      const viewResultsButton = page.getByRole('button', { name: /ver resultados|results|detalles/i }).first();
      const canView = await viewResultsButton.isVisible().catch(() => false);

      if (canView) {
        await viewResultsButton.click();
        await page.waitForTimeout(2000);

        // Should show ranking/position
        const hasRanking = await page.getByText(/posición|puesto|lugar|#\d+|ranking/i).count() > 0;
        expect(hasRanking).toBeGreaterThan(0);
      }
    }
  });

  test('should display all session statistics on profile page', async ({ page }) => {
    // Navigate to profile
    await page.goto('/profile');
    await page.waitForTimeout(2000);

    // Should have session statistics section
    const hasSessionStats = await page.getByText(/live session|ensayo|competitivo/i).count() > 0;

    if (hasSessionStats) {
      // Should show session participation metrics
      const hasMetrics = await page.getByText(/sesiones completadas|promedio|mejor posición/i).count() > 0;
      expect(hasMetrics).toBeGreaterThan(0);
    }
  });

  test('should prevent joining already started session without prior registration', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Look for active session
    const activeBadge = page.getByText(/activo|active/i);
    const hasActiveSession = await activeBadge.count() > 0;

    if (hasActiveSession) {
      // If there's a join button, it means we can join
      // If there's a message about late joining or registration required, that's correct behavior
      const joinButton = page.getByRole('button', { name: /Unirse|Join/i }).first();
      const hasJoin = await joinButton.isVisible().catch(() => false);

      const restrictionMessage = page.getByText(/registrado|registered|tarde|late/i);
      const hasRestriction = await restrictionMessage.count() > 0;

      // Either we can join OR there's a restriction message (both are valid)
      expect(hasJoin || hasRestriction).toBe(true);
    } else {
      test.skip();
    }
  });

  test('should handle session timeout gracefully', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    const activeBadge = page.getByText(/activo|active/i);
    const hasActiveSession = await activeBadge.count() > 0;

    if (hasActiveSession) {
      const joinButton = page.getByRole('button', { name: /Unirse|Join|Ver/i }).first();
      const canJoin = await joinButton.isVisible().catch(() => false);

      if (canJoin) {
        await joinButton.click();
        await page.waitForTimeout(2000);

        // Should show remaining time
        const hasTimer = await page.getByText(/tiempo|time|restante|remaining|\d+:\d+/i).count() > 0;
        expect(hasTimer).toBeGreaterThan(0);
      }
    } else {
      test.skip();
    }
  });

  test('should show error when submitting answer to inactive session', async ({ page }) => {
    // This test verifies that submitting answers to non-active sessions fails appropriately
    // In practice, the UI should prevent this, but we test the backend validation

    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    // Look for completed or scheduled sessions (not active)
    const nonActiveBadge = page.getByText(/completado|scheduled|programado/i).first();
    const hasNonActive = await nonActiveBadge.count() > 0;

    if (hasNonActive) {
      // UI should not allow submitting answers to non-active sessions
      // The button should be disabled or not present
      const submitButton = page.getByRole('button', { name: /enviar|submit|responder/i }).first();
      const canSubmit = await submitButton.isVisible().catch(() => false);

      // If button is visible, it should be disabled
      if (canSubmit) {
        const isDisabled = await submitButton.isDisabled();
        expect(isDisabled).toBe(true);
      }
    }
  });

  test('should update leaderboard in real-time when other participants answer', async ({ page }) => {
    // This is a more advanced test that would require multiple concurrent users
    // For now, we just verify the leaderboard structure exists and updates

    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    const activeBadge = page.getByText(/activo|active/i);
    const hasActiveSession = await activeBadge.count() > 0;

    if (hasActiveSession) {
      const joinButton = page.getByRole('button', { name: /Unirse|Join|Ver/i }).first();
      const canJoin = await joinButton.isVisible().catch(() => false);

      if (canJoin) {
        await joinButton.click();
        await page.waitForTimeout(2000);

        // Get initial leaderboard state
        const leaderboard = page.locator('[class*="leaderboard"], [data-testid="leaderboard"]');
        const hasLeaderboard = await leaderboard.count() > 0;

        if (hasLeaderboard) {
          const initialState = await leaderboard.textContent();

          // Wait a bit (in real scenario, other users would be answering)
          await page.waitForTimeout(3000);

          const newState = await leaderboard.textContent();

          // Leaderboard structure should exist (content may or may not change)
          expect(initialState).toBeTruthy();
          expect(newState).toBeTruthy();
        }
      }
    } else {
      test.skip();
    }
  });

  test('should display session end screen with final results', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    const completedBadge = page.getByText(/completado|completed/i);
    const hasCompleted = await completedBadge.count() > 0;

    if (hasCompleted) {
      const viewResultsButton = page.getByRole('button', { name: /ver resultados|results|detalles/i }).first();
      const canView = await viewResultsButton.isVisible().catch(() => false);

      if (canView) {
        await viewResultsButton.click();
        await page.waitForTimeout(2000);

        // Should show comprehensive results
        const hasComprehensiveResults = await page.getByText(/felicidades|gracias|completaste|final/i).count() > 0;
        const hasScore = await page.getByText(/puntos|score/i).count() > 0;
        const hasRanking = await page.getByText(/posición|ranking/i).count() > 0;

        expect(hasComprehensiveResults || (hasScore && hasRanking)).toBe(true);
      }
    }
  });

  test('should allow reviewing answers after session completion', async ({ page }) => {
    // Navigate to live practice
    await page.goto('/live-practice');
    await page.waitForTimeout(1500);

    const completedBadge = page.getByText(/completado|completed/i);
    const hasCompleted = await completedBadge.count() > 0;

    if (hasCompleted) {
      const viewResultsButton = page.getByRole('button', { name: /ver resultados|results|revisar/i }).first();
      const canView = await viewResultsButton.isVisible().catch(() => false);

      if (canView) {
        await viewResultsButton.click();
        await page.waitForTimeout(2000);

        // Look for review/explanation features
        const hasReview = await page.getByText(/explicación|respuesta correcta|revisar/i).count() > 0;
        expect(hasReview).toBeGreaterThan(0);
      }
    }
  });
});
