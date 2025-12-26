'use client';

import { Lightbulb, Check, X } from 'lucide-react';
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
  context: string;
  hint: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    question: 'Calcula la pendiente de la recta que pasa por (2, 5) y (6, 13)',
    context: 'Usa la fórmula: m = (y₂ - y₁) / (x₂ - x₁)',
    hint: 'm = (13 - 5) / (6 - 2) = 8 / 4',
    options: ['m = 2', 'm = 4', 'm = 8', 'm = 0.5'],
    correctAnswer: 0,
    explanation: 'm = (13 - 5) / (6 - 2) = 8 / 4 = 2. La pendiente es 2.',
  },
  {
    id: 'p2',
    question: 'Una función tiene pendiente 3 y pasa por (0, -4). ¿Cuál es su ecuación?',
    context: 'Usa y = mx + b donde m = 3 y el punto (0, -4) nos da b',
    hint: 'Si la función pasa por (0, -4), entonces cuando x = 0, y = -4. Eso significa que b = -4.',
    options: ['y = 3x - 4', 'y = -4x + 3', 'y = 3x + 4', 'y = -3x - 4'],
    correctAnswer: 0,
    explanation: 'Con m = 3 y b = -4 (ya que el punto (0, -4) nos da el intercepto y), la ecuación es y = 3x - 4.',
  },
  {
    id: 'p3',
    question: 'Para f(x) = 2x + 1, calcula f(3)',
    context: 'Evalúa la función reemplazando x por 3',
    hint: 'f(3) = 2(3) + 1 = 6 + 1',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    explanation: 'f(3) = 2(3) + 1 = 6 + 1 = 7',
  },
  {
    id: 'p4',
    question: 'Un taxi cobra $800 de bajada de bandera más $300 por km. ¿Cuál es la ecuación del costo C?',
    context: 'C depende de los kilómetros k recorridos',
    hint: 'El costo fijo (bajada de bandera) es b = 800. El costo por km es m = 300.',
    options: ['C = 300k + 800', 'C = 800k + 300', 'C = 300k', 'C = 800k'],
    correctAnswer: 0,
    explanation: 'C = 300k + 800 donde 300 es el costo por km (pendiente) y 800 es el costo fijo (intercepto).',
  },
  {
    id: 'p5',
    question: 'La recta y = -2x + 6 pasa por el punto (2, ?). ¿Cuál es el valor de y?',
    context: 'Evalúa la función en x = 2',
    hint: 'y = -2(2) + 6 = -4 + 6',
    options: ['y = 0', 'y = 2', 'y = 4', 'y = 6'],
    correctAnswer: 1,
    explanation: 'y = -2(2) + 6 = -4 + 6 = 2. El punto es (2, 2).',
  },
];

export default function Step5Practice({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: PROBLEMS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 3,
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplica lo aprendido sobre funciones lineales y afines
        </p>
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
                Problema {mc.currentIndex + 1}
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
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {mc.currentItem.context}
            </p>

            {/* Hint */}
            {hint.showHint && !mc.showFeedback && (
              <div className={`rounded-lg p-4 mb-6 animate-fadeIn ${colors.hint.container}`}>
                <div className="flex items-start gap-2">
                  <Lightbulb className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.hint.icon}`} />
                  <p className={`text-sm font-mono ${colors.hint.text}`}>
                    {mc.currentItem.hint}
                  </p>
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
          passThreshold={3}
          successMessage={mc.correctCount === PROBLEMS.length ? '¡Perfecto!' : '¡Muy bien!'}
          failureMessage="¡Sigue practicando!"
          successSubtext="Dominas las funciones lineales y afines"
          failureSubtext="Repasa los conceptos y vuelve a intentar"
          items={PROBLEMS}
          getIsCorrect={(_, i) => mc.answers[i] === PROBLEMS[i].correctAnswer}
          renderItem={(problem, _, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1">
                {problem.question}
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
