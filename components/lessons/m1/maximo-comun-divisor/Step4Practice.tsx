'use client';

import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PracticeQuestion {
  id: string;
  type: 'find-gcd' | 'identify-factors' | 'simplify-fraction' | 'context';
  question: string;
  numbers?: number[];
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q1',
    type: 'identify-factors',
    question: '¿Cuáles son los divisores de 15?',
    numbers: [15],
    options: ['1, 3, 5, 15', '1, 5, 15', '1, 3, 15', '3, 5, 15'],
    correctAnswer: 0,
    explanation: '15 = 3 × 5, entonces sus divisores son: 1, 3, 5 y 15.',
  },
  {
    id: 'q2',
    type: 'find-gcd',
    question: '¿Cuál es el M.C.D. de 8 y 12?',
    numbers: [8, 12],
    options: ['2', '4', '6', '8'],
    correctAnswer: 1,
    explanation: 'Divisores de 8: 1, 2, 4, 8. Divisores de 12: 1, 2, 3, 4, 6, 12. Comunes: 1, 2, 4. El mayor es 4.',
  },
  {
    id: 'q3',
    type: 'find-gcd',
    question: '¿Cuál es el M.C.D. de 18 y 24?',
    numbers: [18, 24],
    options: ['2', '3', '6', '12'],
    correctAnswer: 2,
    explanation: 'Divisores de 18: 1, 2, 3, 6, 9, 18. Divisores de 24: 1, 2, 3, 4, 6, 8, 12, 24. Comunes: 1, 2, 3, 6. El mayor es 6.',
  },
  {
    id: 'q4',
    type: 'simplify-fraction',
    question: 'Para simplificar 10/15, dividimos numerador y denominador por:',
    numbers: [10, 15],
    options: ['2', '3', '5', '10'],
    correctAnswer: 2,
    explanation: 'M.C.D.(10, 15) = 5. Dividiendo: 10÷5 = 2, 15÷5 = 3. Entonces 10/15 = 2/3.',
  },
  {
    id: 'q5',
    type: 'find-gcd',
    question: '¿Cuál es el M.C.D. de 20 y 30?',
    numbers: [20, 30],
    options: ['5', '10', '15', '20'],
    correctAnswer: 1,
    explanation: 'Divisores de 20: 1, 2, 4, 5, 10, 20. Divisores de 30: 1, 2, 3, 5, 6, 10, 15, 30. El mayor común es 10.',
  },
  {
    id: 'q6',
    type: 'context',
    question: 'María tiene 30 manzanas y 45 naranjas. ¿Cuántas bolsas idénticas puede hacer (máximo)?',
    numbers: [30, 45],
    options: ['5 bolsas', '10 bolsas', '15 bolsas', '30 bolsas'],
    correctAnswer: 2,
    explanation: 'M.C.D.(30, 45) = 15. Puede hacer 15 bolsas con 2 manzanas y 3 naranjas cada una.',
  },
  {
    id: 'q7',
    type: 'find-gcd',
    question: '¿Cuál es el M.C.D. de 14 y 21?',
    numbers: [14, 21],
    options: ['3', '7', '14', '21'],
    correctAnswer: 1,
    explanation: 'Divisores de 14: 1, 2, 7, 14. Divisores de 21: 1, 3, 7, 21. Comunes: 1, 7. El mayor es 7.',
  },
  {
    id: 'q8',
    type: 'find-gcd',
    question: 'Si M.C.D.(a, b) = 1, los números se llaman "coprimos". ¿Cuál par es coprimo?',
    options: ['(6, 9)', '(8, 15)', '(12, 18)', '(10, 25)'],
    correctAnswer: 1,
    explanation: 'M.C.D.(8, 15) = 1 porque no comparten divisores excepto 1. 8 = 2³ y 15 = 3×5, no tienen factores comunes.',
  },
];

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

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
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentQuestion(prev => prev + 1);
  };

  // ============ COMPLETION SCREEN ============
  if (isComplete) {
    const percentage = Math.round((correctCount / QUESTIONS.length) * 100);

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Práctica Guiada
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Práctica completada!
          </p>
        </div>

        <div
          className={cn(
            'p-8 rounded-xl border-2 text-center',
            percentage >= 75
              ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
              : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400',
          )}
        >
          <div className="text-5xl font-bold mb-2">
            {correctCount}/{QUESTIONS.length}
          </div>

          <p className="text-2xl font-medium mb-4">{percentage}% correcto</p>

          <p
            className={cn(
              'font-medium text-lg',
              percentage >= 75
                ? 'text-green-700 dark:text-green-300'
                : 'text-amber-700 dark:text-amber-300',
            )}
          >
            {percentage >= 75
              ? '¡Excelente! Dominas el M.C.D.'
              : 'Buen esfuerzo. Sigue practicando.'}
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
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
          Práctica Guiada
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Pregunta {currentQuestion + 1} de {QUESTIONS.length}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-1.5">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-2.5 h-2.5 rounded-full transition-all',
              i < currentQuestion
                ? 'bg-green-500'
                : i === currentQuestion
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600',
            )}
          />
        ))}
      </div>

      {/* Question type indicator */}
      <div className="flex justify-center">
        <span
          className={cn(
            'px-4 py-1 rounded-full text-sm font-medium',
            question.type === 'find-gcd'
              ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
              : question.type === 'identify-factors'
                ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                : question.type === 'simplify-fraction'
                  ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                  : 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300',
          )}
        >
          {question.type === 'find-gcd' && 'Calcular M.C.D.'}
          {question.type === 'identify-factors' && 'Identificar divisores'}
          {question.type === 'simplify-fraction' && 'Simplificar fracción'}
          {question.type === 'context' && 'Problema contextual'}
        </span>
      </div>

      {/* Question */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          {question.question}
        </h3>

        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={showFeedback}
              className={cn(
                'p-4 rounded-xl text-center transition-all border-2 font-medium text-lg',
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
              <div className="flex items-center justify-center gap-2">
                {showFeedback &&
                  (index === question.correctAnswer ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : selectedAnswer === index ? (
                    <X className="w-5 h-5 text-red-600" />
                  ) : null)}
                <span className="text-gray-800 dark:text-gray-200">
                  {option}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Strategy hint */}
      {!showFeedback && (
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3 border border-purple-200 dark:border-purple-700">
          <p className="text-purple-800 dark:text-purple-200 text-sm text-center">
            <strong>Recuerda:</strong> Lista los divisores de cada número, encuentra los comunes
            y elige el mayor.
          </p>
        </div>
      )}

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
