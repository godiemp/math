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
    question: 'Para la ecuacion 3x + 2y = 18, encuentra el intercepto Y',
    context: 'El intercepto Y es donde la recta cruza el eje Y (x = 0)',
    hint: 'Sustituye x = 0: 3(0) + 2y = 18 → 2y = 18',
    options: ['(0, 6)', '(0, 9)', '(0, 3)', '(0, 18)'],
    correctAnswer: 1,
    explanation: 'Con x = 0: 2y = 18, entonces y = 9. El intercepto Y es (0, 9).',
  },
  {
    id: 'p2',
    question: 'Una tienda vende cuadernos a $3 y lapices a $2. Si gastas exactamente $12, ¿cual ecuacion representa esto?',
    context: 'Sea x = cuadernos e y = lapices',
    hint: 'El costo total es: (precio cuaderno × cantidad) + (precio lapiz × cantidad) = total',
    options: ['3x + 2y = 12', '2x + 3y = 12', 'x + y = 12', '5xy = 12'],
    correctAnswer: 0,
    explanation: '3x (cuadernos) + 2y (lapices) = 12 (total). La ecuacion es 3x + 2y = 12.',
  },
  {
    id: 'p3',
    question: 'En 4x + 5y = 20, si x = 5, ¿cual es el valor de y?',
    context: 'Sustituye el valor de x y despeja y',
    hint: '4(5) + 5y = 20 → 20 + 5y = 20 → 5y = 0',
    options: ['y = 4', 'y = 0', 'y = 5', 'y = -4'],
    correctAnswer: 1,
    explanation: '4(5) + 5y = 20 → 20 + 5y = 20 → 5y = 0 → y = 0. El punto es (5, 0).',
  },
  {
    id: 'p4',
    question: 'Para la recta x + y = 7, encuentra el intercepto X',
    context: 'El intercepto X es donde la recta cruza el eje X (y = 0)',
    hint: 'Sustituye y = 0: x + 0 = 7',
    options: ['(0, 7)', '(7, 0)', '(1, 6)', '(3.5, 3.5)'],
    correctAnswer: 1,
    explanation: 'Con y = 0: x = 7. El intercepto X es (7, 0).',
  },
  {
    id: 'p5',
    question: 'Un estacionamiento cobra $500 de entrada mas $200 por hora. Si pagas $1500, ¿cuantas horas estacionaste?',
    context: 'La ecuacion es: 500 + 200h = 1500, donde h = horas',
    hint: '200h = 1500 - 500 = 1000',
    options: ['3 horas', '4 horas', '5 horas', '7.5 horas'],
    correctAnswer: 2,
    explanation: '500 + 200h = 1500 → 200h = 1000 → h = 5 horas.',
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
          Practica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplica lo aprendido sobre relaciones lineales
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
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">
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
          successSubtext="Dominas las relaciones lineales"
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
