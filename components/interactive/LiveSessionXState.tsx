'use client';

import { useState } from 'react';
import type { LiveSession } from '@/lib/types';
import { getCurrentUser } from '@/lib/auth';
import { QuestionRenderer } from '@/components/quiz/QuestionRenderer';
import { useLiveSession, getMinutesUntilStart } from '@/lib/hooks/useLiveSession';
import dynamic from 'next/dynamic';
import QuickNavigation from './QuickNavigation';

// Dynamically import EssayReview to avoid SSR issues
const EssayReview = dynamic(() => import('@/components/content/EssayReview'), { ssr: false });

interface LiveSessionProps {
  sessionId: string;
  onExit: () => void;
  previewMode?: boolean;
  previewState?: 'scheduled' | 'lobby' | 'active' | 'completed';
}

export default function LiveSessionXState({
  sessionId,
  onExit,
  previewMode,
  previewState,
}: LiveSessionProps) {
  const {
    // State flags
    isLoading,
    isScheduled,
    isLobby,
    isActive,
    isCompleted,
    isError,
    isSubmitting,

    // Data
    session,
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    myAnswers,
    error,

    // Navigation
    canGoNext,
    canGoPrevious,

    // Actions
    selectAnswer,
    nextQuestion,
    previousQuestion,
    navigateToQuestion,
    retry,
    exit,
  } = useLiveSession(sessionId, {
    previewMode,
    previewState,
  });

  const currentUser = getCurrentUser();

  // Finish confirmation modal state
  const [showFinishModal, setShowFinishModal] = useState(false);

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);

  // ============================================================================
  // RENDER STATES
  // ============================================================================

  /**
   * Loading state
   */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Cargando sesión...</h2>
        </div>
      </div>
    );
  }

  /**
   * Error state with retry
   */
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Error desconocido'}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={retry}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Reintentar
            </button>
            <button
              onClick={() => onExit()}
              className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!session || !currentUser) {
    return null; // Should not happen but TypeScript needs this
  }

  /**
   * Scheduled state - Waiting for lobby to open
   */
  if (isScheduled) {
    const startTime = new Date(session.scheduledStartTime);
    const lobbyTime = session.lobbyOpenTime ? new Date(session.lobbyOpenTime) : null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {session.name}
              </h1>
              <button
                onClick={() => onExit()}
                className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base"
              >
                Salir
              </button>
            </div>

            <div className="text-center py-6 sm:py-8 md:py-12">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">⏰</div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">
                Ensayo Programado
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 px-2">
                El lobby se abrirá el:
              </p>
              {lobbyTime && (
                <div className="text-base sm:text-lg font-semibold text-yellow-600 dark:text-yellow-400 mb-3 sm:mb-4 px-2">
                  {lobbyTime.toLocaleString('es-CL', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              )}
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 px-2">
                El ensayo comenzará automáticamente el:
              </p>
              <div className="text-base sm:text-lg md:text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6 sm:mb-8 px-2">
                {startTime.toLocaleString('es-CL', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>

              <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2">
                <p>
                  <strong>Nivel:</strong> {session.level}
                </p>
                <p>
                  <strong>Preguntas:</strong> {session.questions.length}
                </p>
                <p>
                  <strong>Duración:</strong> {session.durationMinutes} minutos
                </p>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 px-2">
                Vuelve cuando el lobby esté abierto para unirte antes del inicio.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Lobby state - Waiting for session to start
   */
  if (isLobby) {
    const startTime = new Date(session.scheduledStartTime);
    const minutesUntilStart = getMinutesUntilStart(session);

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {session.name}
              </h1>
              <button
                onClick={() => onExit()}
                className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Salir del Lobby
              </button>
            </div>

            <div className="text-center py-6 sm:py-8 md:py-12">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 animate-pulse">🎯</div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">
                ¡Bienvenido al Lobby!
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 px-2">
                El ensayo comenzará en aproximadamente:
              </p>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-6 sm:mb-8">
                {minutesUntilStart} minuto{minutesUntilStart !== 1 ? 's' : ''}
              </div>
              <div className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 px-2">
                Hora de inicio:{' '}
                {startTime.toLocaleString('es-CL', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>

              <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2">
                <p>
                  <strong>Nivel:</strong> {session.level}
                </p>
                <p>
                  <strong>Preguntas:</strong> {session.questions.length}
                </p>
                <p>
                  <strong>Duración:</strong> {session.durationMinutes} minutos
                </p>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 px-2">
                Mantén esta página abierta. El ensayo comenzará automáticamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Completed state - Showing results
   */
  if (isCompleted && session) {
    // Calculate results
    const totalQuestions = session.questions.length;
    const answeredCount = myAnswers.filter(answer => answer !== null).length;
    const unansweredCount = totalQuestions - answeredCount;

    // Calculate correct answers
    let correctCount = 0;
    Object.entries(myAnswers).forEach(([idx, answerIndex]) => {
      const questionIndex = parseInt(idx);
      const question = session.questions[questionIndex];
      if (question && answerIndex !== null && question.correctAnswer === answerIndex) {
        correctCount++;
      }
    });

    const incorrectCount = answeredCount - correctCount;
    const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4">🎉</div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                ¡Ensayo Completado!
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {session.name}
              </p>
            </div>

            {/* Score Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-xl p-6 mb-6">
              <div className="text-center mb-4">
                <div className="text-5xl sm:text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  {correctCount}/{totalQuestions}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Respuestas correctas
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
                    {scorePercentage}%
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Puntaje</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {accuracy}%
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Precisión</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${scorePercentage}%` }}
                />
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                  {correctCount}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Correctas</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-center">
                <div className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">
                  {incorrectCount}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Incorrectas</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg p-3 text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-400">
                  {unansweredCount}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Sin responder</p>
              </div>
            </div>

            {/* Session Info */}
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 mb-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <div className="flex justify-between">
                <span>Nivel:</span>
                <span className="font-medium">{session.level}</span>
              </div>
              <div className="flex justify-between">
                <span>Total de preguntas:</span>
                <span className="font-medium">{totalQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span>Respondidas:</span>
                <span className="font-medium">{answeredCount}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setShowReviewModal(true)}
                className="w-full py-2 sm:py-3 px-4 sm:px-6 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm sm:text-base"
              >
                Revisar Respuestas
              </button>
              <button
                onClick={() => onExit()}
                className="w-full py-2 sm:py-3 px-4 sm:px-6 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base"
              >
                Volver al Lobby
              </button>
            </div>
          </div>
        </div>

        {/* Essay Review Modal */}
        {showReviewModal && (
          <EssayReview
            sessionId={sessionId}
            onClose={() => setShowReviewModal(false)}
          />
        )}
      </div>
    );
  }

  /**
   * Active state - Quiz in progress
   */
  if (isActive && currentQuestion) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
              {/* Header */}
              <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {session.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Pregunta {currentQuestionIndex + 1} de {session.questions.length}
                </p>
              </div>

              {/* Progress bar */}
              <div className="mb-4 sm:mb-6">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentQuestionIndex + 1) / session.questions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-4 sm:mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                    {currentQuestion.topic}
                  </h3>
                </div>

                {/* Use centralized QuestionRenderer */}
                <QuestionRenderer
                  question={currentQuestion}
                  mode="with-options"
                  selectedAnswer={selectedAnswer}
                  onAnswerSelect={selectAnswer}
                  disabled={isSubmitting}
                />
              </div>

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={previousQuestion}
                  disabled={!canGoPrevious}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                >
                  Anterior
                </button>

                <button
                  onClick={nextQuestion}
                  disabled={!canGoNext}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                >
                  {canGoNext ? 'Siguiente' : 'Última pregunta'}
                </button>
              </div>

              {/* Finish Button */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowFinishModal(true)}
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base font-medium"
                >
                  Finalizar Ensayo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation Component */}
        <QuickNavigation
          currentQuestion={currentQuestionIndex}
          totalQuestions={session.questions.length}
          myAnswers={myAnswers}
          onNavigate={navigateToQuestion}
        />

        {/* Finish Confirmation Modal */}
        {showFinishModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowFinishModal(false)}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scaleIn">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                ¿Finalizar ensayo?
              </h3>

              <div className="mb-6 space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Estás a punto de finalizar y entregar tu ensayo.
                </p>

                {session && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                    <p className="text-sm font-medium text-yellow-900 dark:text-yellow-200 mb-2">
                      Resumen:
                    </p>
                    <ul className="text-xs text-yellow-800 dark:text-yellow-300 space-y-1">
                      <li>
                        • Preguntas respondidas:{' '}
                        <strong>{myAnswers.filter(a => a !== null).length}</strong> de{' '}
                        <strong>{session.questions.length}</strong>
                      </li>
                      {session.questions.length - myAnswers.filter(a => a !== null).length > 0 && (
                        <li className="text-red-600 dark:text-red-400 font-medium">
                          • Sin responder:{' '}
                          {session.questions.length - myAnswers.filter(a => a !== null).length}
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                <p className="text-xs text-gray-500 dark:text-gray-500">
                  No podrás realizar cambios después de finalizar.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowFinishModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setShowFinishModal(false);
                    exit(); // This will trigger the exit which goes to completed state
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  Sí, finalizar
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback (should never reach here)
  return null;
}
