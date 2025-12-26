'use client';

import { Lightbulb } from 'lucide-react';
import { Check, X } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice, useHintToggle } from '@/hooks/lessons';
import { colors } from '@/lib/lessons/styles';
import {
  ProgressDots,
  FeedbackPanel,
  OptionButton,
  ActionButton,
  ResultsSummary,
} from '@/components/lessons/primitives';

interface Problem {
  id: string;
  question: string;
  equation: string;
  hint: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    question: 'Resuelve completando el cuadrado:',
    equation: 'x² + 6x + 5 = 0',
    hint: 'Primero completa el cuadrado: x² + 6x + 9 - 9 + 5 = (x + 3)² - 4 = 0. Luego despeja x.',
    options: ['x = -1 o x = -5', 'x = 1 o x = 5', 'x = -3 ± 2', 'x = 3 ± 2'],
    correctAnswer: 0,
    explanation: '(x + 3)² = 4 → x + 3 = ±2 → x = -3 + 2 = -1 o x = -3 - 2 = -5',
  },
  {
    id: 'p2',
    question: 'Resuelve completando el cuadrado:',
    equation: 'x² - 4x - 12 = 0',
    hint: 'Completa el cuadrado: x² - 4x + 4 - 4 - 12 = (x - 2)² - 16 = 0',
    options: ['x = 6 o x = -2', 'x = -6 o x = 2', 'x = 4 o x = -3', 'x = 2 ± 4'],
    correctAnswer: 0,
    explanation: '(x - 2)² = 16 → x - 2 = ±4 → x = 2 + 4 = 6 o x = 2 - 4 = -2',
  },
  {
    id: 'p3',
    question: 'Completa el cuadrado y encuentra el vértice de:',
    equation: 'y = x² + 8x + 10',
    hint: 'Completa el cuadrado: y = (x + 4)² - 16 + 10 = (x + 4)² - 6. El vértice es (-h, k) donde h = 4.',
    options: ['(4, -6)', '(-4, -6)', '(-4, 6)', '(4, 6)'],
    correctAnswer: 1,
    explanation: 'y = (x + 4)² - 6 está en forma y = (x - h)² + k con h = -4 y k = -6. Vértice: (-4, -6)',
  },
  {
    id: 'p4',
    question: 'Resuelve completando el cuadrado:',
    equation: 'x² + 2x - 8 = 0',
    hint: 'Completa el cuadrado: x² + 2x + 1 - 1 - 8 = (x + 1)² - 9 = 0',
    options: ['x = 2 o x = -4', 'x = -2 o x = 4', 'x = 3 o x = -3', 'x = 1 ± 3'],
    correctAnswer: 0,
    explanation: '(x + 1)² = 9 → x + 1 = ±3 → x = -1 + 3 = 2 o x = -1 - 3 = -4',
  },
  {
    id: 'p5',
    question: 'Resuelve completando el cuadrado:',
    equation: 'x² - 6x + 2 = 0',
    hint: 'Completa el cuadrado: x² - 6x + 9 - 9 + 2 = (x - 3)² - 7 = 0. La solución tiene raíz cuadrada.',
    options: ['x = 3 ± √7', 'x = -3 ± √7', 'x = 6 ± √7', 'x = 3 ± 7'],
    correctAnswer: 0,
    explanation: '(x - 3)² = 7 → x - 3 = ±√7 → x = 3 ± √7',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: PROBLEMS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 4,
  });

  const hint = useHintToggle();

  const handleNext = () => {
    hint.hideHint();
    mc.next();
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Práctica Guiada</h2>
        <p className="text-gray-600 dark:text-gray-300">Resuelve ecuaciones completando el cuadrado</p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={PROBLEMS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === PROBLEMS[i].correctAnswer
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Problem card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            {/* Problem type badge and hint toggle */}
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                Completar el Cuadrado
              </span>
              {!mc.showFeedback && (
                <button
                  onClick={hint.toggleHint}
                  className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400"
                >
                  <Lightbulb size={16} />
                  <span>{hint.showHint ? 'Ocultar pista' : 'Ver pista'}</span>
                </button>
              )}
            </div>

            {/* Question */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {mc.currentItem.question}
            </h3>
            <p className="font-mono text-2xl text-blue-600 font-bold mb-4 text-center">
              {mc.currentItem.equation}
            </p>

            {/* Hint */}
            {hint.showHint && !mc.showFeedback && (
              <div className={`rounded-lg p-4 mb-6 animate-fadeIn ${colors.hint.container}`}>
                <div className="flex items-start gap-2">
                  <Lightbulb className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.hint.icon}`} />
                  <p className={`text-sm ${colors.hint.text}`}>{mc.currentItem.hint}</p>
                </div>
              </div>
            )}

            {/* Options */}
            <div className="space-y-3">
              {mc.currentItem.options.map((option, index) => (
                <OptionButton
                  key={index}
                  label={option}
                  index={index}
                  isSelected={mc.selectedAnswer === index}
                  isCorrect={index === mc.currentItem.correctAnswer}
                  showFeedback={mc.showFeedback}
                  onClick={() => mc.select(index)}
                  variant="list"
                  isMono
                />
              ))}
            </div>

            {mc.showFeedback && (
              <FeedbackPanel
                isCorrect={mc.isCorrect}
                explanation={mc.currentItem.explanation}
                className="mt-6"
              />
            )}
          </div>

          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? handleNext : mc.check}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < PROBLEMS.length - 1
                  ? 'Siguiente Problema'
                  : 'Ver Resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={PROBLEMS.length}
          passed={mc.passed}
          passThreshold={4}
          successMessage={mc.correctCount === PROBLEMS.length ? '¡Perfecto!' : '¡Muy bien!'}
          failureMessage="¡Sigue practicando!"
          successSubtext="Dominas la técnica de completar el cuadrado"
          failureSubtext="Repasa los pasos y vuelve a intentar"
          items={PROBLEMS}
          getIsCorrect={(_, i) => mc.answers[i] === PROBLEMS[i].correctAnswer}
          renderItem={(problem, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
                {problem.equation}
              </span>
            </>
          )}
          onRetry={mc.reset}
          onContinue={onComplete}
          continueLabel="Continuar al Checkpoint"
        />
      )}
    </div>
  );
}
