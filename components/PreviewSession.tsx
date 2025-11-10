'use client';

import { useState } from 'react';
import type { LiveSession } from '@/lib/types';
import { QuestionRenderer } from './QuestionRenderer';
import { Button, Heading, Text, Badge } from '@/components/ui';

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

  const answeredCount = previewAnswers.filter(a => a !== null).length;
  const progressPercentage = ((currentQuestionIndex + 1) / session.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Preview Banner */}
        <div className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👁️</span>
              <div>
                <Heading level={3} size="xs" className="text-yellow-900 dark:text-yellow-100">
                  MODO PREVIEW
                </Heading>
                <Text size="xs" className="text-yellow-800 dark:text-yellow-200">
                  Esta es una vista previa de cómo verán los estudiantes este ensayo. Las respuestas no se guardarán.
                </Text>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-yellow-900 dark:text-yellow-100">
              ✕ Cerrar Preview
            </Button>
          </div>
        </div>

        {/* Main Quiz Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <Heading level={2} size="md" className="text-gray-900 dark:text-white">
                {session.name}
              </Heading>
              <div className="flex gap-2">
                <Badge variant="info" size="sm">
                  {session.level}
                </Badge>
                <Badge variant="neutral" size="sm">
                  Preview
                </Badge>
              </div>
            </div>
            {session.description && (
              <Text size="sm" variant="secondary" className="mb-2">
                {session.description}
              </Text>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Pregunta {currentQuestionIndex + 1} de {session.questions.length}</span>
              <span>•</span>
              <span>{answeredCount} respondidas</span>
              <span>•</span>
              <span>{session.durationMinutes} minutos</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <Text size="xs" variant="secondary">
                Progreso
              </Text>
              <Text size="xs" variant="secondary">
                {Math.round(progressPercentage)}%
              </Text>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Question metadata */}
          <div className="mb-4 flex gap-2 flex-wrap">
            <Badge variant="info" size="sm">
              {currentQuestion.subject}
            </Badge>
            <Badge
              variant={
                currentQuestion.difficulty === 'easy' ? 'success' :
                currentQuestion.difficulty === 'medium' ? 'warning' : 'danger'
              }
              size="sm"
            >
              {currentQuestion.difficulty === 'easy' ? 'Fácil' :
               currentQuestion.difficulty === 'medium' ? 'Media' : 'Difícil'}
            </Badge>
            <Badge variant="neutral" size="sm">
              {currentQuestion.topic}
            </Badge>
          </div>

          {/* Question */}
          <div className="mb-6">
            <QuestionRenderer
              question={currentQuestion}
              mode="with-options"
              selectedAnswer={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
              disabled={false}
            />
          </div>

          {/* Question Navigator Grid (optional - for quick navigation) */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <Text size="xs" variant="secondary" className="mb-2 font-medium">
              Navegación rápida:
            </Text>
            <div className="grid grid-cols-10 gap-2">
              {session.questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentQuestionIndex(idx);
                    setSelectedAnswer(previewAnswers[idx]);
                  }}
                  className={`
                    w-full aspect-square rounded-lg font-medium text-xs transition-all
                    ${idx === currentQuestionIndex
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 ring-offset-2'
                      : previewAnswers[idx] !== null
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                    }
                  `}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            <Button
              variant="secondary"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              ← Anterior
            </Button>

            <Button
              variant="primary"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex >= session.questions.length - 1}
              className="flex-1"
            >
              {currentQuestionIndex < session.questions.length - 1 ? 'Siguiente →' : 'Última pregunta'}
            </Button>
          </div>

          {/* Close button at bottom */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              onClick={onClose}
              fullWidth
            >
              Cerrar Preview y Volver al Panel Admin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
