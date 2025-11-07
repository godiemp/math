'use client';

import { useState, useEffect } from 'react';
import type { LiveSession, SessionParticipant } from '@/lib/types';
import { getSession, submitAnswer, completeSession, updateParticipantReady, startSession, leaveSession } from '@/lib/liveSessions';
import { getCurrentUser } from '@/lib/auth';
import { MathText } from './MathDisplay';

interface LiveSessionProps {
  sessionId: string;
  onExit: () => void;
}

export default function LiveSessionComponent({ sessionId, onExit }: LiveSessionProps) {
  const [session, setSession] = useState<LiveSession | null>(null);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const refreshSession = () => {
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

  const handleReady = () => {
    if (!currentUser || !session) return;
    const participant = session.participants.find(p => p.userId === currentUser.id);
    if (participant) {
      updateParticipantReady(sessionId, currentUser.id, !participant.isReady);
      refreshSession();
    }
  };

  const handleStart = () => {
    if (!currentUser || !session) return;
    if (session.hostId !== currentUser.id) return;

    const result = startSession(sessionId);
    if (result.success) {
      refreshSession();
    }
  };

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

  const handleComplete = () => {
    if (!currentUser || !session) return;
    completeSession(sessionId);
    refreshSession();
    setShowResults(true);
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

  const isHost = session.hostId === currentUser.id;
  const currentParticipant = session.participants.find(p => p.userId === currentUser.id);
  const allReady = session.participants.every(p => p.isReady);
  const currentQuestion = session.questions[currentQuestionIndex];

  // Waiting room
  if (session.status === 'waiting') {
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

            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Nivel:</strong> {session.level} • <strong>Preguntas:</strong> {session.questions.length} • <strong>Anfitrión:</strong> {session.hostName}
              </p>
            </div>

            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Participantes ({session.participants.length}/{session.maxParticipants})
            </h2>

            <div className="space-y-2 mb-6">
              {session.participants.map((participant) => (
                <div
                  key={participant.userId}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${participant.isReady ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {participant.displayName}
                      {participant.userId === session.hostId && ' (Anfitrión)'}
                      {participant.userId === currentUser.id && ' (Tú)'}
                    </span>
                  </div>
                  <span className={`text-sm ${participant.isReady ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                    {participant.isReady ? 'Listo' : 'Esperando'}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleReady}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                  currentParticipant?.isReady
                    ? 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {currentParticipant?.isReady ? 'No Estoy Listo' : 'Estoy Listo'}
              </button>

              {isHost && (
                <button
                  onClick={handleStart}
                  disabled={!allReady || session.participants.length < 1}
                  className="flex-1 py-3 px-6 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Iniciar Sesión
                </button>
              )}
            </div>

            {isHost && !allReady && (
              <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
                Esperando a que todos los participantes estén listos...
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (session.status === 'completed' || showResults) {
    const sortedParticipants = [...session.participants].sort((a, b) => b.score - a.score);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Resultados de la Sesión
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {session.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pregunta {currentQuestionIndex + 1} de {session.questions.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {session.participants.length} participantes
              </div>
            </div>
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
              <div className="text-gray-800 dark:text-gray-200">
                {currentQuestion.questionLatex ? (
                  <MathText content={currentQuestion.questionLatex} />
                ) : (
                  currentQuestion.question
                )}
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const optionsLatex = currentQuestion.optionsLatex;
                const displayOption = optionsLatex && optionsLatex[index] ? optionsLatex[index] : option;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedAnswer === index
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                        : 'border-gray-300 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                          selectedAnswer === index
                            ? 'border-indigo-500 bg-indigo-500'
                            : 'border-gray-400'
                        }`}
                      >
                        {selectedAnswer === index && (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        {optionsLatex && optionsLatex[index] ? (
                          <MathText content={displayOption} />
                        ) : (
                          option
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
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

            {currentQuestionIndex < session.questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Finalizar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
