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
  hint: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    question: 'Factoriza: x² - 64',
    hint: '64 = 8². Entonces tenemos x² - 8². Aplica (a + b)(a - b)',
    options: ['(x + 8)(x - 8)', '(x + 32)(x - 32)', '(x - 8)²', '(x + 4)(x - 16)'],
    correctAnswer: 0,
    explanation: 'x² - 64 = x² - 8² = (x + 8)(x - 8). Verificación: (x+8)(x-8) = x² - 64 ✓',
  },
  {
    id: 'p2',
    question: 'Factoriza: 9x² - 1',
    hint: '9x² = (3x)² y 1 = 1². Entonces tenemos (3x)² - 1²',
    options: ['(3x + 1)(3x - 1)', '(9x + 1)(x - 1)', '(3x - 1)²', '(x + 1)(9x - 1)'],
    correctAnswer: 0,
    explanation: '9x² - 1 = (3x)² - 1² = (3x + 1)(3x - 1)',
  },
  {
    id: 'p3',
    question: 'Factoriza: 25x² - 49y²',
    hint: '25x² = (5x)² y 49y² = (7y)². Entonces a = 5x y b = 7y',
    options: ['(5x + 7y)(5x - 7y)', '(5x - 7y)²', '(25x + 49y)(x - y)', '(x + y)(25x - 49y)'],
    correctAnswer: 0,
    explanation: '25x² - 49y² = (5x)² - (7y)² = (5x + 7y)(5x - 7y)',
  },
  {
    id: 'p4',
    question: 'Factoriza: 4x² - 81',
    hint: '4x² = (2x)² y 81 = 9². Identifica a y b correctamente',
    options: ['(2x + 9)(2x - 9)', '(4x + 81)(x - 1)', '(x + 9)(4x - 9)', '(2x - 9)²'],
    correctAnswer: 0,
    explanation: '4x² - 81 = (2x)² - 9² = (2x + 9)(2x - 9)',
  },
  {
    id: 'p5',
    question: 'Factoriza: 100 - x²',
    hint: 'Reordena: es lo mismo que 10² - x². a = 10 y b = x',
    options: ['(10 + x)(10 - x)', '(100 + x)(1 - x)', '(10 - x)²', '(x + 10)(x - 10)'],
    correctAnswer: 0,
    explanation: '100 - x² = 10² - x² = (10 + x)(10 - x). Nota: el orden de los factores puede variar.',
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
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Factoriza las diferencias de cuadrados
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Problema {mc.currentIndex + 1} de {PROBLEMS.length}
            </div>
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
              size="sm"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                Diferencia de Cuadrados
              </span>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {mc.currentItem.question}
            </h3>

            {!mc.showFeedback && !hint.showHint && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={hint.toggleHint}
                  className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                >
                  <Lightbulb size={16} />
                  <span>Ver pista</span>
                </button>
              </div>
            )}

            {hint.showHint && !mc.showFeedback && (
              <div className={`mb-4 p-3 rounded-lg border animate-fadeIn ${colors.hint.container}`}>
                <div className="flex items-start gap-2">
                  <Lightbulb className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.hint.icon}`} />
                  <p className={`text-sm ${colors.hint.text}`}>{mc.currentItem.hint}</p>
                </div>
              </div>
            )}

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
                />
              ))}
            </div>
          </div>

          {mc.showFeedback && (
            <FeedbackPanel isCorrect={mc.isCorrect} explanation={mc.currentItem.explanation} />
          )}

          <div className="flex justify-center">
            <ActionButton
              onClick={mc.showFeedback ? handleNext : mc.check}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < PROBLEMS.length - 1
                  ? 'Siguiente'
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
          successMessage="¡Muy bien!"
          successSubtext="Dominas la diferencia de cuadrados"
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
              <span className="text-sm text-gray-700 dark:text-gray-300">{problem.question}</span>
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
