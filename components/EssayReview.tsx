'use client';

import React, { useEffect, useState } from 'react';
import { getSession, getMyParticipationAPI } from '@/lib/sessionApi';
import type { LiveSession, Question } from '@/lib/types';
import { QuestionRenderer } from './QuestionRenderer';

interface EssayReviewProps {
  sessionId: string;
  onClose: () => void;
}

interface ParticipationData {
  userId: string;
  username: string;
  displayName: string;
  answers: (number | null)[];
  score: number;
  joinedAt: number;
  currentQuestionIndex: number;
}

export default function EssayReview({ sessionId, onClose }: EssayReviewProps) {
  const [session, setSession] = useState<LiveSession | null>(null);
  const [participation, setParticipation] = useState<ParticipationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single');

  useEffect(() => {
    loadReviewData();
  }, [sessionId]);

  const loadReviewData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [sessionData, participationResult] = await Promise.all([
        getSession(sessionId),
        getMyParticipationAPI(sessionId),
      ]);

      if (!sessionData) {
        setError('No se pudo cargar la sesión');
        return;
      }

      if (!participationResult.success || !participationResult.data) {
        setError('No se encontró tu participación en esta sesión');
        return;
      }

      setSession(sessionData);
      setParticipation(participationResult.data);
    } catch {
      setError('Error al cargar los datos del ensayo');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 max-w-4xl w-full">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 max-w-4xl w-full">
          <div className="text-center">
            <div className="text-red-600 mb-4">{error}</div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!session || !participation) {
    return null;
  }

  const currentQuestion = session.questions[currentQuestionIndex];
  const userAnswer = participation.answers[currentQuestionIndex];
  const isCorrect = userAnswer === currentQuestion.correctAnswer;
  const totalCorrect = participation.answers.filter(
    (ans, idx) => ans === session.questions[idx].correctAnswer
  ).length;

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < session.questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">{session.name}</h2>
              <p className="text-purple-100 text-sm sm:text-base">
                Revisión de tu ensayo - Puntaje: {totalCorrect}/{session.questions.length} (
                {Math.round((totalCorrect / session.questions.length) * 100)}%)
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 font-medium"
            >
              Cerrar
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setViewMode('single')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'single'
                  ? 'bg-white text-purple-600 font-medium'
                  : 'bg-purple-500 text-white hover:bg-purple-400'
              }`}
            >
              Ver una a una
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'all'
                  ? 'bg-white text-purple-600 font-medium'
                  : 'bg-purple-500 text-white hover:bg-purple-400'
              }`}
            >
              Ver todas
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {viewMode === 'single' ? (
            <>
              {/* Question Navigator */}
              <div className="mb-4 bg-gray-50 p-3 rounded-lg">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                  {session.questions.map((q, idx) => {
                    const ans = participation.answers[idx];
                    const correct = ans === q.correctAnswer;
                    return (
                      <button
                        key={idx}
                        onClick={() => goToQuestion(idx)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-medium transition-all ${
                          idx === currentQuestionIndex
                            ? 'ring-2 ring-offset-2 ring-purple-600'
                            : ''
                        } ${
                          ans === null
                            ? 'bg-gray-300 text-gray-600'
                            : correct
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Current Question */}
              <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Pregunta {currentQuestionIndex + 1} de {session.questions.length}
                  </h3>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      userAnswer === null
                        ? 'bg-gray-100 text-gray-600'
                        : isCorrect
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {userAnswer === null ? 'Sin responder' : isCorrect ? 'Correcta' : 'Incorrecta'}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm text-purple-600 font-medium">{currentQuestion.topic}</span>
                </div>

                <QuestionRenderer
                  question={currentQuestion}
                  mode="with-explanation"
                  selectedAnswer={userAnswer}
                  showFeedback={true}
                  disabled={true}
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => goToQuestion(currentQuestionIndex - 1)}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <button
                  onClick={() => goToQuestion(currentQuestionIndex + 1)}
                  disabled={currentQuestionIndex === session.questions.length - 1}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
            </>
          ) : (
            // All questions view
            <div className="space-y-6">
              {session.questions.map((question, idx) => {
                const ans = participation.answers[idx];
                const correct = ans === question.correctAnswer;
                return (
                  <div key={idx} className="bg-white border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Pregunta {idx + 1}</h3>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          ans === null
                            ? 'bg-gray-100 text-gray-600'
                            : correct
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {ans === null ? 'Sin responder' : correct ? 'Correcta' : 'Incorrecta'}
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-purple-600 font-medium">{question.topic}</span>
                    </div>

                    <QuestionRenderer
                      question={question}
                      mode="with-explanation"
                      selectedAnswer={ans}
                      showFeedback={true}
                      disabled={true}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        <div className="bg-gray-50 p-4 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-600">
            <div>
              <span className="font-medium">Resumen:</span>{' '}
              <span className="text-green-600">{totalCorrect} correctas</span>,{' '}
              <span className="text-red-600">
                {participation.answers.filter((a) => a !== null).length - totalCorrect} incorrectas
              </span>
              ,{' '}
              <span className="text-gray-500">
                {participation.answers.filter((a) => a === null).length} sin responder
              </span>
            </div>
            <div className="text-gray-500">
              Nivel: {session.level} | Duración: {session.durationMinutes} min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
