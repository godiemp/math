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
    question: 'Factoriza: 10x + 15',
    hint: 'El MCD de 10 y 15 es 5. Divide cada término entre 5.',
    options: [
      '5(x + 3)',
      '5(2x + 3)',
      '10(x + 1.5)',
      '5(2x + 15)',
    ],
    correctAnswer: 1,
    explanation: '10x + 15 = 5(2x) + 5(3) = 5(2x + 3). Verificación: 5 · 2x + 5 · 3 = 10x + 15 ✓',
  },
  {
    id: 'p2',
    question: 'Factoriza: x² + 5x',
    hint: 'Ambos términos tienen la variable x. ¿Cuál es la menor potencia?',
    options: [
      'x(x + 5)',
      'x²(1 + 5)',
      '5x(x + 1)',
      'x(x² + 5)',
    ],
    correctAnswer: 0,
    explanation: 'x² + 5x = x(x) + x(5) = x(x + 5). La menor potencia de x es x¹.',
  },
  {
    id: 'p3',
    question: 'Factoriza: 6a² + 9a',
    hint: 'MCD de 6 y 9 es 3. Ambos términos tienen "a". Menor potencia de a es a¹.',
    options: [
      '3a(2a + 3)',
      '3(2a² + 3a)',
      'a(6a + 9)',
      '6a(a + 1.5)',
    ],
    correctAnswer: 0,
    explanation: '6a² + 9a = 3a(2a) + 3a(3) = 3a(2a + 3). Factor común: 3a.',
  },
  {
    id: 'p4',
    question: 'Factoriza: 4x³ + 8x² + 12x',
    hint: 'MCD(4,8,12) = 4. Todos tienen x, menor potencia es x¹.',
    options: [
      '4x(x² + 2x + 3)',
      '4(x³ + 2x² + 3x)',
      'x(4x² + 8x + 12)',
      '2x(2x² + 4x + 6)',
    ],
    correctAnswer: 0,
    explanation: '4x³ + 8x² + 12x = 4x(x²) + 4x(2x) + 4x(3) = 4x(x² + 2x + 3).',
  },
  {
    id: 'p5',
    question: 'Factoriza: 15xy² + 20x²y',
    hint: 'MCD(15,20) = 5. Ambos tienen x (menor: x¹) e y (menor: y¹).',
    options: [
      '5xy(3y + 4x)',
      '5(3xy² + 4x²y)',
      'xy(15y + 20x)',
      '5xy(3 + 4)',
    ],
    correctAnswer: 0,
    explanation: '15xy² + 20x²y = 5xy(3y) + 5xy(4x) = 5xy(3y + 4x). Factor común: 5xy.',
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
          Factoriza las siguientes expresiones
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
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">
                Factor Común
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
          successSubtext="Dominas la factorización por factor común"
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
