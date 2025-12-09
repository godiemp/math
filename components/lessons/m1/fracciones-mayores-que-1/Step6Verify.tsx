'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps, VerifyQuestion } from '@/lib/lessons/types';
import { Celebration } from '@/components/lessons/shared';

const QUESTIONS: VerifyQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el número mixto equivalente a 9/4?',
    type: 'multiple-choice',
    options: ['1 1/4', '2 1/4', '2 1/2', '3 1/4'],
    correctAnswer: 1, // 2 1/4
    explanation:
      '9 ÷ 4 = 2 con resto 1. Entonces 9/4 = 2 enteros y 1/4, es decir, 2 1/4.',
  },
  {
    id: 'q2',
    question: '¿Cuál fracción impropia es igual a 3 2/5?',
    type: 'multiple-choice',
    options: ['17/5', '15/5', '11/5', '8/5'],
    correctAnswer: 0, // 17/5
    explanation:
      '(3 × 5) + 2 = 15 + 2 = 17. Por lo tanto, 3 2/5 = 17/5.',
  },
  {
    id: 'q3',
    question: 'Una fracción es impropia cuando:',
    type: 'multiple-choice',
    options: [
      'El denominador es mayor que el numerador',
      'El numerador es mayor o igual al denominador',
      'Ambos números son iguales',
      'El denominador es 1',
    ],
    correctAnswer: 1,
    explanation:
      'Una fracción es impropia cuando el numerador es mayor o igual al denominador, lo que significa que representa 1 o más.',
  },
  {
    id: 'q4',
    question: '¿Dónde se ubicaría 7/3 en la recta numérica?',
    type: 'multiple-choice',
    options: ['Entre 0 y 1', 'Entre 1 y 2', 'Entre 2 y 3', 'Exactamente en 2'],
    correctAnswer: 2, // Between 2 and 3
    explanation:
      '7/3 = 2 1/3. Como 2 1/3 está entre 2 y 3, ahí se ubica en la recta numérica.',
  },
];

export default function Step6Verify({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const question = QUESTIONS[currentQuestion];
  const isCorrect = selectedAnswer === question?.correctAnswer;
  const isComplete = currentQuestion >= QUESTIONS.length;

  if (!isActive) return null;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion === QUESTIONS.length - 1) {
      setShowCelebration(true);
      setCurrentQuestion(prev => prev + 1);
    } else {
      setSelectedAnswer(null);
      setShowFeedback(false);
      setCurrentQuestion(prev => prev + 1);
    }
  };

  // ============ COMPLETION SCREEN ============
  if (isComplete) {
    const percentage = Math.round((correctCount / QUESTIONS.length) * 100);
    const passed = percentage >= 75;

    return (
      <div className="space-y-6 animate-fadeIn">
        {showCelebration && <Celebration />}

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Checkpoint
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Resultados finales!
          </p>
        </div>

        <div
          className={cn(
            'p-8 rounded-xl border-2 text-center',
            passed
              ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
              : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400',
          )}
        >
          <Trophy
            className={cn(
              'w-16 h-16 mx-auto mb-4',
              passed ? 'text-green-500' : 'text-amber-500',
            )}
          />

          <div className="text-5xl font-bold mb-2">
            {correctCount}/{QUESTIONS.length}
          </div>

          <p className="text-2xl font-medium mb-4">{percentage}% correcto</p>

          <p
            className={cn(
              'font-medium text-lg',
              passed
                ? 'text-green-700 dark:text-green-300'
                : 'text-amber-700 dark:text-amber-300',
            )}
          >
            {percentage === 100 &&
              '¡Perfecto! Dominaste las fracciones mayores que 1.'}
            {percentage >= 75 &&
              percentage < 100 &&
              '¡Muy bien! Tienes un sólido entendimiento.'}
            {percentage >= 50 &&
              percentage < 75 &&
              'Buen progreso. Repasa los conceptos de conversión.'}
            {percentage < 50 && 'Sigue practicando. ¡Lo lograrás!'}
          </p>
        </div>

        {/* Summary of key concepts */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">
            Resumen de la lección:
          </h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <strong>Fracción impropia</strong>: numerador ≥ denominador (valor ≥ 1)
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <strong>Número mixto</strong>: entero + fracción propia
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <strong>Impropia → Mixto</strong>: divide y usa el resto
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <strong>Mixto → Impropia</strong>: (entero × den) + num
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>Completar lección</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Checkpoint
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Pregunta {currentQuestion + 1} de {QUESTIONS.length}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              i < currentQuestion
                ? 'bg-green-500'
                : i === currentQuestion
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600',
            )}
          />
        ))}
      </div>

      {/* Question */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          {question.question}
        </h3>

        <div className="space-y-3 max-w-md mx-auto">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={showFeedback}
              className={cn(
                'w-full p-4 rounded-xl text-left transition-all border-2',
                selectedAnswer === index
                  ? showFeedback
                    ? isCorrect
                      ? 'bg-green-100 dark:bg-green-900/50 border-green-400'
                      : 'bg-red-100 dark:bg-red-900/50 border-red-400'
                    : 'bg-blue-100 dark:bg-blue-900/50 border-blue-400'
                  : showFeedback && index === question.correctAnswer
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-400'
                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500',
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center font-bold',
                    selectedAnswer === index
                      ? showFeedback
                        ? isCorrect
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-blue-500 text-white'
                      : showFeedback && index === question.correctAnswer
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300',
                  )}
                >
                  {showFeedback &&
                  (selectedAnswer === index ||
                    index === question.correctAnswer) ? (
                    index === question.correctAnswer ? (
                      <Check size={18} />
                    ) : (
                      <X size={18} />
                    )
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </div>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {option}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={cn(
            'p-4 rounded-xl border-2 animate-fadeIn',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
              : 'bg-red-50 dark:bg-red-900/30 border-red-400',
          )}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <X className="w-6 h-6 text-red-600 flex-shrink-0" />
            )}
            <div>
              <h4
                className={cn(
                  'font-bold',
                  isCorrect
                    ? 'text-green-800 dark:text-green-300'
                    : 'text-red-800 dark:text-red-300',
                )}
              >
                {isCorrect ? '¡Correcto!' : 'Incorrecto'}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-center">
        {!showFeedback ? (
          <button
            onClick={handleCheck}
            disabled={selectedAnswer === null}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
            )}
          >
            Comprobar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>
              {currentQuestion < QUESTIONS.length - 1
                ? 'Siguiente'
                : 'Ver resultados'}
            </span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
