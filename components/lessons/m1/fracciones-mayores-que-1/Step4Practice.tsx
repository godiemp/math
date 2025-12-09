'use client';

import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PracticeQuestion {
  id: string;
  type: 'to-mixed' | 'to-improper';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  // Improper to Mixed
  {
    id: 'q1',
    type: 'to-mixed',
    question: 'Convierte 7/4 a número mixto:',
    options: ['1 1/4', '1 3/4', '2 1/4', '1 2/4'],
    correctAnswer: 1, // 1 3/4
    explanation: '7 ÷ 4 = 1 con resto 3. Por lo tanto, 7/4 = 1 3/4',
  },
  {
    id: 'q2',
    type: 'to-mixed',
    question: 'Convierte 5/2 a número mixto:',
    options: ['2 1/2', '1 1/2', '2 1/4', '3 1/2'],
    correctAnswer: 0, // 2 1/2
    explanation: '5 ÷ 2 = 2 con resto 1. Por lo tanto, 5/2 = 2 1/2',
  },
  {
    id: 'q3',
    type: 'to-mixed',
    question: 'Convierte 11/3 a número mixto:',
    options: ['3 1/3', '2 2/3', '3 2/3', '4 1/3'],
    correctAnswer: 2, // 3 2/3
    explanation: '11 ÷ 3 = 3 con resto 2. Por lo tanto, 11/3 = 3 2/3',
  },
  {
    id: 'q4',
    type: 'to-mixed',
    question: 'Convierte 8/5 a número mixto:',
    options: ['1 2/5', '1 3/5', '2 3/5', '1 4/5'],
    correctAnswer: 1, // 1 3/5
    explanation: '8 ÷ 5 = 1 con resto 3. Por lo tanto, 8/5 = 1 3/5',
  },
  // Mixed to Improper
  {
    id: 'q5',
    type: 'to-improper',
    question: 'Convierte 2 1/4 a fracción impropia:',
    options: ['9/4', '7/4', '8/4', '6/4'],
    correctAnswer: 0, // 9/4
    explanation: '(2 × 4) + 1 = 9. Por lo tanto, 2 1/4 = 9/4',
  },
  {
    id: 'q6',
    type: 'to-improper',
    question: 'Convierte 1 2/3 a fracción impropia:',
    options: ['4/3', '5/3', '6/3', '3/3'],
    correctAnswer: 1, // 5/3
    explanation: '(1 × 3) + 2 = 5. Por lo tanto, 1 2/3 = 5/3',
  },
  {
    id: 'q7',
    type: 'to-improper',
    question: 'Convierte 3 1/2 a fracción impropia:',
    options: ['5/2', '6/2', '7/2', '8/2'],
    correctAnswer: 2, // 7/2
    explanation: '(3 × 2) + 1 = 7. Por lo tanto, 3 1/2 = 7/2',
  },
  {
    id: 'q8',
    type: 'to-improper',
    question: 'Convierte 2 3/5 a fracción impropia:',
    options: ['11/5', '12/5', '13/5', '10/5'],
    correctAnswer: 2, // 13/5
    explanation: '(2 × 5) + 3 = 13. Por lo tanto, 2 3/5 = 13/5',
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
            Conversiones
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
              ? '¡Excelente! Dominas las conversiones.'
              : 'Buen esfuerzo. Sigue practicando las conversiones.'}
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
          Conversiones
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
            question.type === 'to-mixed'
              ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300'
              : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
          )}
        >
          {question.type === 'to-mixed'
            ? 'Impropia → Mixto'
            : 'Mixto → Impropia'}
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
            {question.type === 'to-mixed' ? (
              <>
                <strong>Estrategia:</strong> Divide el numerador entre el
                denominador
              </>
            ) : (
              <>
                <strong>Estrategia:</strong> (entero × denominador) + numerador
              </>
            )}
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
