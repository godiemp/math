'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps, VerifyQuestion } from '@/lib/lessons/types';
import { Celebration } from '@/components/lessons/shared';

const QUESTIONS: VerifyQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el M.C.M. de 8 y 12?',
    type: 'multiple-choice',
    options: ['4', '24', '96', '48'],
    correctAnswer: 1,
    explanation: 'Múltiplos de 8: 8, 16, 24... Múltiplos de 12: 12, 24... El menor común es 24.',
  },
  {
    id: 'q2',
    question: '¿Cuál de las siguientes afirmaciones sobre el M.C.M. es VERDADERA?',
    type: 'multiple-choice',
    options: [
      'El M.C.M. siempre es menor que ambos números',
      'El M.C.M. siempre es mayor o igual al número más grande',
      'El M.C.M. siempre es igual al producto de los números',
      'El M.C.M. siempre es igual al M.C.D.',
    ],
    correctAnswer: 1,
    explanation: 'El M.C.M. debe contener todos los factores de ambos números, por lo que siempre es mayor o igual al mayor de ellos.',
  },
  {
    id: 'q3',
    question: 'María va al gimnasio cada 3 días y Pedro cada 5 días. Si hoy fueron juntos, ¿en cuántos días se encontrarán de nuevo?',
    type: 'multiple-choice',
    options: ['8 días', '15 días', '2 días', '30 días'],
    correctAnswer: 1,
    explanation: 'M.C.M.(3, 5) = 15. Como 3 y 5 son coprimos, M.C.M. = 3 × 5 = 15.',
  },
  {
    id: 'q4',
    question: 'Si M.C.M.(a, b) = 30 y M.C.D.(a, b) = 5, ¿cuál es el producto a × b?',
    type: 'multiple-choice',
    options: ['35', '150', '6', '25'],
    correctAnswer: 1,
    explanation: 'Usando la fórmula: M.C.M. × M.C.D. = a × b, entonces 30 × 5 = 150.',
  },
  {
    id: 'q5',
    question: 'Para calcular 2/9 + 5/12, necesitas expresar ambas fracciones con denominador común. ¿Cuál es el mínimo común denominador?',
    type: 'multiple-choice',
    options: ['21', '36', '108', '3'],
    correctAnswer: 1,
    explanation: '9 = 3², 12 = 2²×3. M.C.M.(9, 12) = 2²×3² = 36. Este es el mínimo común denominador.',
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
              '¡Perfecto! Dominaste el M.C.M.'}
            {percentage >= 75 &&
              percentage < 100 &&
              '¡Muy bien! Tienes un sólido entendimiento.'}
            {percentage >= 50 &&
              percentage < 75 &&
              'Buen progreso. Repasa los métodos del M.C.M.'}
            {percentage < 50 && 'Sigue practicando. ¡Lo lograrás!'}
          </p>
        </div>

        {/* Summary of key concepts */}
        <div className="bg-cyan-50 dark:bg-cyan-900/30 rounded-xl p-5 border border-cyan-200 dark:border-cyan-700">
          <h4 className="font-bold text-cyan-800 dark:text-cyan-200 mb-3">
            Resumen de la lección:
          </h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span><strong>M.C.M.</strong> = Mínimo Común Múltiplo</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Es el <strong>número más pequeño</strong> que es múltiplo de todos los números dados</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Se encuentra listando <strong>múltiplos comunes</strong> y eligiendo el menor</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>O usando <strong>factorización prima</strong> con exponentes máximos</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Fórmula: <strong>M.C.M. × M.C.D. = a × b</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Sirve para <strong>encontrar denominadores comunes</strong> y sincronizar eventos</span>
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-cyan-600 transition-all shadow-lg"
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
                  ? 'bg-cyan-500 scale-125'
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
                    : 'bg-cyan-100 dark:bg-cyan-900/50 border-cyan-400'
                  : showFeedback && index === question.correctAnswer
                    ? 'bg-green-100 dark:bg-green-900/50 border-green-400'
                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-cyan-300 dark:hover:border-cyan-500',
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
                        : 'bg-cyan-500 text-white'
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
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
            )}
          >
            Comprobar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg"
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
