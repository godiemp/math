'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RefreshCw } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { InlineMath } from '@/components/math/MathDisplay';
import { ActionButton, ProgressDots, FeedbackPanel } from '@/components/lessons/primitives';

interface TranslationQuestion {
  id: string;
  phrase: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: TranslationQuestion[] = [
  {
    id: 'q1',
    phrase: 'La suma de un número y nueve',
    options: ['x - 9', 'x + 9', '9x', '\\frac{x}{9}'],
    correctIndex: 1,
    explanation: '"Suma" significa sumar (+), entonces: x + 9',
  },
  {
    id: 'q2',
    phrase: 'El triple de un número',
    options: ['x + 3', 'x - 3', '3x', '\\frac{x}{3}'],
    correctIndex: 2,
    explanation: '"El triple" significa multiplicar por 3: 3x',
  },
  {
    id: 'q3',
    phrase: 'Un número dividido entre cuatro',
    options: ['4x', 'x - 4', 'x + 4', '\\frac{x}{4}'],
    correctIndex: 3,
    explanation: '"Dividido entre 4" significa x/4',
  },
  {
    id: 'q4',
    phrase: 'Siete menos que un número',
    options: ['7 - x', 'x - 7', 'x + 7', '7x'],
    correctIndex: 1,
    explanation: '"7 menos que x" significa quitar 7 a x: x - 7',
  },
  {
    id: 'q5',
    phrase: 'El doble de un número, menos tres',
    options: ['2x - 3', '2(x - 3)', '2x + 3', '\\frac{2x}{3}'],
    correctIndex: 0,
    explanation: '"El doble" es 2x, y "menos tres" resta 3: 2x - 3',
  },
  {
    id: 'q6',
    phrase: 'La mitad de un número, más cinco',
    options: ['\\frac{x + 5}{2}', 'x + \\frac{5}{2}', '\\frac{x}{2} + 5', '\\frac{5x}{2}'],
    correctIndex: 2,
    explanation: '"La mitad" es x/2, y "más cinco" suma 5: x/2 + 5',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUESTIONS.length).fill(null));

  if (!isActive) return null;

  const currentQuestion = QUESTIONS[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedAnswer;
    setAnswers(newAnswers);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setCompleted(false);
  };

  if (completed) {
    const score = Math.round((correctCount / QUESTIONS.length) * 100);
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">¡Ejercicio Completado!</h2>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">{score >= 80 ? '🎉' : score >= 60 ? '👍' : '💪'}</div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            {correctCount} de {QUESTIONS.length} correctas
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {score >= 80
              ? '¡Excelente! Dominas las traducciones.'
              : score >= 60
                ? '¡Buen trabajo! Sigue practicando.'
                : 'Necesitas más práctica. ¡Inténtalo de nuevo!'}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          {score < 80 && (
            <ActionButton onClick={handleRetry} variant="secondary" icon={<RefreshCw size={20} />}>
              Intentar de nuevo
            </ActionButton>
          )}
          <ActionButton onClick={onComplete} icon={<ArrowRight size={20} />}>
            Continuar
          </ActionButton>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">El Traductor</h2>
        <p className="text-gray-600 dark:text-gray-300">Selecciona la expresión algebraica correcta</p>
      </div>

      {/* Progress */}
      <ProgressDots
        items={QUESTIONS}
        currentIndex={currentIndex}
        getStatus={(_, i) =>
          answers[i] !== null
            ? answers[i] === QUESTIONS[i].correctIndex
              ? 'correct'
              : 'incorrect'
            : i === currentIndex
              ? 'current'
              : 'pending'
        }
        size="sm"
        className="gap-4"
      />

      {/* Question Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Traduce esta frase:</p>
          <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
            &quot;{currentQuestion.phrase}&quot;
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isOptionCorrect = index === currentQuestion.correctIndex;

            let buttonClasses = 'p-4 rounded-xl border-2 transition-all text-center ';

            if (showFeedback) {
              if (isOptionCorrect) {
                buttonClasses += 'bg-green-100 dark:bg-green-900/40 border-green-500 dark:border-green-600';
              } else if (isSelected && !isOptionCorrect) {
                buttonClasses += 'bg-red-100 dark:bg-red-900/40 border-red-500 dark:border-red-600';
              } else {
                buttonClasses += 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 opacity-50';
              }
            } else {
              if (isSelected) {
                buttonClasses += 'bg-purple-100 dark:bg-purple-900/40 border-purple-500 dark:border-purple-600';
              } else {
                buttonClasses +=
                  'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 cursor-pointer';
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={buttonClasses}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">
                    <InlineMath latex={option} />
                  </span>
                  {showFeedback && isOptionCorrect && <Check className="w-5 h-5 text-green-600" />}
                  {showFeedback && isSelected && !isOptionCorrect && <X className="w-5 h-5 text-red-600" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <FeedbackPanel isCorrect={isCorrect} explanation={currentQuestion.explanation} />
      )}

      {/* Actions */}
      <div className="flex justify-center">
        {!showFeedback ? (
          <ActionButton
            onClick={handleCheck}
            disabled={selectedAnswer === null}
            variant={selectedAnswer !== null ? 'primary' : 'disabled'}
          >
            Verificar
          </ActionButton>
        ) : (
          <ActionButton onClick={handleNext} icon={<ArrowRight size={20} />}>
            {currentIndex < QUESTIONS.length - 1 ? 'Siguiente' : 'Ver resultados'}
          </ActionButton>
        )}
      </div>
    </div>
  );
}
