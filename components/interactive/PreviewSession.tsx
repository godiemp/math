'use client';

import { useState } from 'react';
import type { LiveSession } from '@/lib/types';
import { QuestionRenderer } from '@/components/quiz/QuestionRenderer';

interface PreviewSessionProps {
  session: LiveSession;
  onClose: () => void;
}

export default function PreviewSession({ session, onClose }: PreviewSessionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [previewAnswers, setPreviewAnswers] = useState<(number | null)[]>(
    new Array(session.questions.length).fill(null)
  );

  const currentQuestion = session.questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...previewAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setPreviewAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < session.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(previewAnswers[nextIndex]);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setSelectedAnswer(previewAnswers[prevIndex]);
    }
  };

  // Active quiz - matching exact student experience from LiveSession.tsx
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Preview Banner - ONLY difference from student view */}
        <div className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">👁️</span>
              <div>
                <p className="text-sm font-bold text-yellow-900 dark:text-yellow-100">
                  MODO PREVIEW
                </p>
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  Esto es exactamente lo que ven los estudiantes
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-3 py-1 text-sm text-yellow-900 dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded transition-colors"
            >
              ✕ Cerrar Preview
            </button>
          </div>
        </div>

        {/* Main Quiz Container - EXACT copy from LiveSession.tsx */}
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
