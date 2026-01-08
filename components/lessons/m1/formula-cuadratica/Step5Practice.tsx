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
import { BlockMath, InlineMath, MathText } from '@/components/math/MathDisplay';

interface Problem {
  id: string;
  question: string;
  equation: string;
  coefficients: string;
  hint: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    question: 'Resuelve usando la fórmula cuadrática:',
    equation: 'x^2 + 2x - 8 = 0',
    coefficients: '$a = 1$, $b = 2$, $c = -8$',
    hint: '$\\Delta = 4 - 4(1)(-8) = 4 + 32 = 36$. Como $\\sqrt{36} = 6$, las soluciones serán enteros.',
    options: ['$x = 2$ y $x = -4$', '$x = -2$ y $x = 4$', '$x = 4$ y $x = 2$', '$x = -4$ y $x = -2$'],
    correctAnswer: 0,
    explanation: '$x = \\frac{-2 \\pm \\sqrt{36}}{2} = \\frac{-2 \\pm 6}{2}$. Entonces $x = \\frac{4}{2} = 2$ y $x = \\frac{-8}{2} = -4$.',
  },
  {
    id: 'p2',
    question: 'Resuelve usando la fórmula cuadrática:',
    equation: 'x^2 - 6x + 9 = 0',
    coefficients: '$a = 1$, $b = -6$, $c = 9$',
    hint: '$\\Delta = 36 - 36 = 0$. Cuando el discriminante es cero, hay una sola solución (repetida).',
    options: ['$x = -3$ (doble)', '$x = 6$ (doble)', '$x = 3$ (doble)', '$x = 9$ (doble)'],
    correctAnswer: 2,
    explanation: '$x = \\frac{6 \\pm \\sqrt{0}}{2} = \\frac{6}{2} = 3$. Es una solución doble porque $\\Delta = 0$.',
  },
  {
    id: 'p3',
    question: 'Resuelve usando la fórmula cuadrática:',
    equation: '2x^2 + 5x - 3 = 0',
    coefficients: '$a = 2$, $b = 5$, $c = -3$',
    hint: '$\\Delta = 25 - 4(2)(-3) = 25 + 24 = 49$. $\\sqrt{49} = 7$. No olvides dividir por $2a = 4$.',
    options: ['$x = 3$ y $x = -1/2$', '$x = 1/2$ y $x = -3$', '$x = -1/2$ y $x = 3$', '$x = 3/2$ y $x = -1$'],
    correctAnswer: 1,
    explanation: '$x = \\frac{-5 \\pm 7}{4}$. Entonces $x = \\frac{2}{4} = \\frac{1}{2}$ y $x = \\frac{-12}{4} = -3$.',
  },
  {
    id: 'p4',
    question: '¿Cuántas soluciones reales tiene?',
    equation: 'x^2 + 4x + 5 = 0',
    coefficients: '$a = 1$, $b = 4$, $c = 5$',
    hint: 'Calcula el discriminante: $\\Delta = 16 - 20 = -4$. ¿Qué significa un discriminante negativo?',
    options: ['No tiene soluciones reales', 'Una solución real', 'Dos soluciones reales', 'Infinitas soluciones'],
    correctAnswer: 0,
    explanation: '$\\Delta = 16 - 20 = -4 < 0$. Como el discriminante es negativo, no hay soluciones reales.',
  },
  {
    id: 'p5',
    question: 'Resuelve usando la fórmula cuadrática:',
    equation: '3x^2 - 12x + 9 = 0',
    coefficients: '$a = 3$, $b = -12$, $c = 9$',
    hint: 'Puedes simplificar dividiendo por 3: $x^2 - 4x + 3 = 0$. O aplicar la fórmula directamente.',
    options: ['$x = 1$ y $x = 3$', '$x = -1$ y $x = -3$', '$x = 2$ (doble)', '$x = 3$ y $x = 4$'],
    correctAnswer: 0,
    explanation: '$\\Delta = 144 - 108 = 36$. $x = \\frac{12 \\pm 6}{6}$. Entonces $x = \\frac{18}{6} = 3$ y $x = \\frac{6}{6} = 1$.',
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Resuelve con la Fórmula
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplica la fórmula cuadrática para resolver ecuaciones
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
                Fórmula Cuadrática
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
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4 mb-4">
              <div className="text-2xl text-purple-600 dark:text-purple-400 font-bold text-center">
                <InlineMath latex={mc.currentItem.equation} />
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                <MathText content={mc.currentItem.coefficients} />
              </div>
            </div>

            {/* Formula reminder */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-4">
              <div className="text-sm text-center text-gray-600 dark:text-gray-400">
                <InlineMath latex="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
              </div>
            </div>

            {/* Hint */}
            {hint.showHint && !mc.showFeedback && (
              <div className={`rounded-lg p-4 mb-6 animate-fadeIn ${colors.hint.container}`}>
                <div className="flex items-start gap-2">
                  <Lightbulb className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.hint.icon}`} />
                  <div className={`text-sm ${colors.hint.text}`}>
                    <MathText content={mc.currentItem.hint} />
                  </div>
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
          successSubtext="Dominas la fórmula cuadrática"
          failureSubtext="Repasa la fórmula y los pasos"
          items={PROBLEMS}
          getIsCorrect={(_, i) => mc.answers[i] === PROBLEMS[i].correctAnswer}
          renderItem={(problem, i, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <InlineMath latex={problem.equation} />
              </span>
              <span className="text-sm text-purple-600 dark:text-purple-400 ml-auto">
                <MathText content={problem.options[problem.correctAnswer]} />
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
