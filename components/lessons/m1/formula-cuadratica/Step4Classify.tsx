'use client';

import { Check, X } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { useMultipleChoice } from '@/hooks/lessons';
import {
  ProgressDots,
  FeedbackPanel,
  OptionButton,
  ActionButton,
  ResultsSummary,
  QuestionPrompt,
} from '@/components/lessons/primitives';
import { InlineMath, MathText } from '@/components/math/MathDisplay';

interface Question {
  id: string;
  type: 'identify' | 'discriminant' | 'solutions' | 'method';
  question: string;
  equation?: string;
  context?: string;
  correctAnswer: number;
  options: string[];
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'identify',
    question: 'En la ecuación $3x^2 - 5x + 2 = 0$, ¿cuáles son los valores de $a$, $b$ y $c$?',
    equation: '3x^2 - 5x + 2 = 0',
    correctAnswer: 1,
    options: ['$a = 3$, $b = 5$, $c = 2$', '$a = 3$, $b = -5$, $c = 2$', '$a = 3$, $b = -5$, $c = -2$', '$a = -3$, $b = 5$, $c = 2$'],
    explanation: 'En $ax^2 + bx + c = 0$: $a = 3$ (coef. de $x^2$), $b = -5$ (coef. de $x$, ¡incluyendo el signo!), $c = 2$ (término independiente).',
  },
  {
    id: 'q2',
    type: 'discriminant',
    question: '¿Cuál es el valor del discriminante ($\\Delta = b^2 - 4ac$)?',
    equation: 'x^2 + 6x + 9 = 0',
    context: '$a = 1$, $b = 6$, $c = 9$',
    correctAnswer: 2,
    options: ['$\\Delta = 72$', '$\\Delta = -72$', '$\\Delta = 0$', '$\\Delta = 36$'],
    explanation: '$\\Delta = b^2 - 4ac = (6)^2 - 4(1)(9) = 36 - 36 = 0$. Cuando $\\Delta = 0$, hay una solución repetida.',
  },
  {
    id: 'q3',
    type: 'solutions',
    question: '¿Cuántas soluciones reales tiene esta ecuación?',
    equation: 'x^2 + 2x + 5 = 0',
    context: '$\\Delta = 4 - 20 = -16$',
    correctAnswer: 0,
    options: ['Ninguna solución real', 'Una solución (repetida)', 'Dos soluciones diferentes', 'Infinitas soluciones'],
    explanation: 'Como $\\Delta = -16 < 0$, no hay soluciones reales. La raíz de un número negativo no es real.',
  },
  {
    id: 'q4',
    type: 'solutions',
    question: '¿Cuáles son las soluciones de $x^2 - 5x + 6 = 0$?',
    equation: 'x^2 - 5x + 6 = 0',
    context: '$\\Delta = 25 - 24 = 1$',
    correctAnswer: 3,
    options: ['$x = 1$ y $x = 6$', '$x = -2$ y $x = -3$', '$x = 5$ y $x = 6$', '$x = 2$ y $x = 3$'],
    explanation: '$x = \\frac{5 \\pm \\sqrt{1}}{2} = \\frac{5 \\pm 1}{2}$. Entonces $x = \\frac{6}{2} = 3$ y $x = \\frac{4}{2} = 2$.',
  },
  {
    id: 'q5',
    type: 'method',
    question: '¿Qué método es más eficiente para resolver esta ecuación?',
    equation: 'x^2 - 7x + 10 = 0',
    correctAnswer: 1,
    options: ['Solo la fórmula cuadrática', 'Factorizar (buscar dos números que sumen $-7$ y multipliquen $10$)', 'Completar el cuadrado', 'No tiene solución'],
    explanation: 'Esta ecuación se factoriza fácilmente: $x^2 - 7x + 10 = (x - 2)(x - 5) = 0$, porque $-2 + (-5) = -7$ y $(-2)(-5) = 10$.',
  },
];

export default function Step4Classify({ onComplete, isActive }: LessonStepProps) {
  const mc = useMultipleChoice({
    items: QUESTIONS,
    getCorrectAnswer: (item) => item.correctAnswer,
    passThreshold: 4,
  });

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Identifica y Calcula
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Practica identificar coeficientes, discriminantes y soluciones
        </p>
      </div>

      {!mc.isComplete ? (
        <>
          <ProgressDots
            items={QUESTIONS}
            currentIndex={mc.currentIndex}
            getStatus={(_, i) =>
              mc.answers[i] !== null
                ? mc.answers[i] === QUESTIONS[i].correctAnswer
                  ? 'correct'
                  : 'incorrect'
                : i === mc.currentIndex
                  ? 'current'
                  : 'pending'
            }
          />

          {/* Question card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            {/* Question type badge */}
            <div className="flex justify-center mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  mc.currentItem.type === 'identify'
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : mc.currentItem.type === 'discriminant'
                      ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300'
                      : mc.currentItem.type === 'solutions'
                        ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                        : 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                }`}
              >
                {mc.currentItem.type === 'identify' && 'Identificar a, b, c'}
                {mc.currentItem.type === 'discriminant' && 'Calcular Δ'}
                {mc.currentItem.type === 'solutions' && 'Soluciones'}
                {mc.currentItem.type === 'method' && 'Método'}
              </span>
            </div>

            <QuestionPrompt variant="math">
              <div className="text-lg text-gray-800 dark:text-gray-200 mb-4">
                <MathText content={mc.currentItem.question} />
              </div>

              {mc.currentItem.equation && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
                  <div className="text-xl text-center text-purple-600 dark:text-purple-400 font-bold">
                    <InlineMath latex={mc.currentItem.equation} />
                  </div>
                  {mc.currentItem.context && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                      <MathText content={mc.currentItem.context} />
                    </div>
                  )}
                </div>
              )}
            </QuestionPrompt>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
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
              onClick={mc.showFeedback ? mc.next : mc.check}
              disabled={!mc.showFeedback && mc.selectedAnswer === null}
            >
              {mc.showFeedback
                ? mc.currentIndex < QUESTIONS.length - 1
                  ? 'Siguiente'
                  : 'Ver Resultados'
                : 'Verificar'}
            </ActionButton>
          </div>
        </>
      ) : (
        <ResultsSummary
          correctCount={mc.correctCount}
          totalCount={QUESTIONS.length}
          passed={mc.passed}
          passThreshold={4}
          successMessage="¡Muy bien!"
          successSubtext="Dominas la identificación de coeficientes y el discriminante"
          failureSubtext="Repasa la fórmula y los casos del discriminante"
          items={QUESTIONS}
          getIsCorrect={(_, i) => mc.answers[i] === QUESTIONS[i].correctAnswer}
          renderItem={(q, _, isCorrect) => (
            <>
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <span className="text-gray-700 dark:text-gray-300 text-sm flex-1">
                {q.equation ? <InlineMath latex={q.equation} /> : q.question.slice(0, 40) + '...'}
              </span>
            </>
          )}
          onRetry={mc.reset}
          onContinue={onComplete}
        />
      )}
    </div>
  );
}
