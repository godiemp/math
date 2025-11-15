'use client';

import { useState, useEffect } from 'react';
import type { LiveSession } from '@/lib/types';
import { getSession, submitAnswerAPI, getMyParticipationAPI } from '@/lib/sessionApi';
import { getCurrentUser } from '@/lib/auth';
import { QuestionRenderer } from './QuestionRenderer';

interface LiveSessionProps {
  sessionId: string;
  onExit: () => void;
}

export default function LiveSessionComponent({ sessionId, onExit }: LiveSessionProps) {
  const [session, setSession] = useState<LiveSession | null>(null);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [myAnswers, setMyAnswers] = useState<(number | null)[]>([]);

  const refreshSession = async () => {
    try {
      // Fetch session from API
      const updatedSession = await getSession(sessionId);
      if (updatedSession) {
        setSession(updatedSession);

        // Fetch my participation data to get my answers
        if (updatedSession.status === 'active' || updatedSession.status === 'completed') {
          const participationResult = await getMyParticipationAPI(sessionId);
          if (participationResult.success && participationResult.data) {
            setMyAnswers(participationResult.data.answers);
          }
        }
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
    }
  };

  useEffect(() => {
    refreshSession();
    const interval = setInterval(refreshSession, 2000); // Refresh every 2 seconds
    return () => clearInterval(interval);
  }, [sessionId]);

  // Sync selected answer when question index or answers change
  useEffect(() => {
    if (myAnswers.length > 0) {
      setSelectedAnswer(myAnswers[currentQuestionIndex]);
    }
  }, [currentQuestionIndex, myAnswers]);

  const handleAnswerSelect = async (answerIndex: number) => {
    if (!currentUser || !session || session.status !== 'active') return;
    setSelectedAnswer(answerIndex);

    // Submit answer to API
    const result = await submitAnswerAPI(sessionId, currentQuestionIndex, answerIndex);
    if (result.success) {
      // Update local state
      const newAnswers = [...myAnswers];
      newAnswers[currentQuestionIndex] = answerIndex;
      setMyAnswers(newAnswers);
    }
  };

  const handleNextQuestion = () => {
    if (!session) return;
    if (currentQuestionIndex < session.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      // Load the previously selected answer for this question
      setSelectedAnswer(myAnswers[nextIndex]);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      // Load the previously selected answer for this question
      setSelectedAnswer(myAnswers[prevIndex]);
    }
  };

  const handleLeave = () => {
    onExit();
  };

  if (!session || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Cargando sesión...</h2>
        </div>
      </div>
    );
  }

  const currentQuestion = session.questions[currentQuestionIndex];

  // Scheduled - waiting for lobby to open
  if (session.status === 'scheduled') {
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
                onClick={handleLeave}
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
                <p><strong>Nivel:</strong> {session.level}</p>
                <p><strong>Preguntas:</strong> {session.questions.length}</p>
                <p><strong>Duración:</strong> {session.durationMinutes} minutos</p>
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

  // Lobby - waiting for session to start
  if (session.status === 'lobby') {
    const startTime = new Date(session.scheduledStartTime);
    const now = Date.now();
    const minutesUntilStart = Math.max(0, Math.ceil((session.scheduledStartTime - now) / 60000));

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {session.name}
              </h1>
              <button
                onClick={handleLeave}
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
                Hora de inicio: {startTime.toLocaleString('es-CL', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>

              <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2">
                <p><strong>Nivel:</strong> {session.level}</p>
                <p><strong>Preguntas:</strong> {session.questions.length}</p>
                <p><strong>Duración:</strong> {session.durationMinutes} minutos</p>
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

  // Results screen
  if (session.status === 'completed') {
    const sortedParticipants = [...session.participants].sort((a, b) => b.score - a.score);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 text-gray-900 dark:text-white px-2">
              Resultados del Ensayo
            </h1>

            <div className="mb-6 sm:mb-8">
              <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                Tabla de Posiciones
              </h2>
              <div className="space-y-2 sm:space-y-3">
                {sortedParticipants.map((participant, index) => (
                  <div
                    key={participant.userId}
                    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 p-3 sm:p-4 rounded-lg ${
                      index === 0
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-400'
                        : 'bg-gray-50 dark:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex-shrink-0">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm sm:text-base text-gray-900 dark:text-white truncate">
                          {participant.displayName}
                          {participant.userId === currentUser.id && ' (Tú)'}
                        </div>
                      </div>
                      <div className="text-right sm:hidden flex-shrink-0">
                        <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          {participant.score}/{session.questions.length}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {Math.round((participant.score / session.questions.length) * 100)}%
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block text-right">
                      <div className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        {participant.score}/{session.questions.length}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {Math.round((participant.score / session.questions.length) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onExit}
              className="w-full py-2 sm:py-3 px-4 sm:px-6 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm sm:text-base"
            >
              Volver al Lobby
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active quiz
  return (
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
                style={{ width: `${((currentQuestionIndex + 1) / session.questions.length) * 100}%` }}
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
              onAnswerSelect={handleAnswerSelect}
              disabled={false}
            />
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
            >
              Anterior
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex >= session.questions.length - 1}
              className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
            >
              {currentQuestionIndex < session.questions.length - 1 ? 'Siguiente' : 'Última pregunta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
