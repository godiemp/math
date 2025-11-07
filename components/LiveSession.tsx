'use client';

import { useState, useEffect } from 'react';
import type { LiveSession } from '@/lib/types';
import { getSession, submitAnswer, leaveSession, updateSessionStatuses } from '@/lib/liveSessions';
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

  const refreshSession = () => {
    updateSessionStatuses(); // Auto-update session status based on time
    const updatedSession = getSession(sessionId);
    if (updatedSession) {
      setSession(updatedSession);
    }
  };

  useEffect(() => {
    refreshSession();
    const interval = setInterval(refreshSession, 2000); // Refresh every 2 seconds
    return () => clearInterval(interval);
  }, [sessionId]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!currentUser || !session || session.status !== 'active') return;
    setSelectedAnswer(answerIndex);
    submitAnswer(sessionId, currentUser.id, currentQuestionIndex, answerIndex);
    refreshSession();
  };

  const handleNextQuestion = () => {
    if (!session) return;
    if (currentQuestionIndex < session.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);

      // Load the participant's previously selected answer for this question
      const participant = session.participants.find(p => p.userId === currentUser?.id);
      if (participant) {
        setSelectedAnswer(participant.answers[currentQuestionIndex + 1]);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);

      // Load the participant's previously selected answer for this question
      const participant = session?.participants.find(p => p.userId === currentUser?.id);
      if (participant) {
        setSelectedAnswer(participant.answers[currentQuestionIndex - 1]);
      }
    }
  };

  const handleLeave = () => {
    if (!currentUser) return;
    leaveSession(sessionId, currentUser.id);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {session.name}
              </h1>
              <button
                onClick={handleLeave}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Salir
              </button>
            </div>

            <div className="text-center py-12">
              <div className="text-6xl mb-6">⏰</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ensayo Programado
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                El lobby se abrirá el:
              </p>
              {lobbyTime && (
                <div className="text-lg font-semibold text-yellow-600 dark:text-yellow-400 mb-4">
                  {lobbyTime.toLocaleString('es-CL', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              )}
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                El ensayo comenzará automáticamente el:
              </p>
              <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-8">
                {startTime.toLocaleString('es-CL', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>

              <div className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400">
                <p><strong>Nivel:</strong> {session.level}</p>
                <p><strong>Preguntas:</strong> {session.questions.length}</p>
                <p><strong>Duración:</strong> {session.durationMinutes} minutos</p>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-500">
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {session.name}
              </h1>
              <button
                onClick={handleLeave}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Salir del Lobby
              </button>
            </div>

            <div className="text-center py-12">
              <div className="text-6xl mb-6 animate-pulse">🎯</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                ¡Bienvenido al Lobby!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                El ensayo comenzará en aproximadamente:
              </p>
              <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-8">
                {minutesUntilStart} minuto{minutesUntilStart !== 1 ? 's' : ''}
              </div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-8">
                Hora de inicio: {startTime.toLocaleString('es-CL', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>

              <div className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400">
                <p><strong>Nivel:</strong> {session.level}</p>
                <p><strong>Preguntas:</strong> {session.questions.length}</p>
                <p><strong>Duración:</strong> {session.durationMinutes} minutos</p>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-500">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Resultados del Ensayo
            </h1>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Tabla de Posiciones
              </h2>
              <div className="space-y-3">
                {sortedParticipants.map((participant, index) => (
                  <div
                    key={participant.userId}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      index === 0
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-400'
                        : 'bg-gray-50 dark:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {participant.displayName}
                          {participant.userId === currentUser.id && ' (Tú)'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        {participant.score}/{session.questions.length}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {Math.round((participant.score / session.questions.length) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onExit}
              className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {session.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pregunta {currentQuestionIndex + 1} de {session.questions.length}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / session.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
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
          <div className="flex space-x-4">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex >= session.questions.length - 1}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {currentQuestionIndex < session.questions.length - 1 ? 'Siguiente' : 'Última pregunta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
