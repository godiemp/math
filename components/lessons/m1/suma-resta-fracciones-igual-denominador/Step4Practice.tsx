'use client';

import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PracticeQuestion {
  id: string;
  type: 'addition' | 'subtraction';
  num1: number;
  num2: number;
  denominator: number;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  // Addition questions
  {
    id: 'q1',
    type: 'addition',
    num1: 1,
    num2: 3,
    denominator: 5,
    options: ['4/5', '4/10', '3/5', '2/5'],
    correctAnswer: 0,
    explanation: '1/5 + 3/5 = (1+3)/5 = 4/5. Sumamos los numeradores y mantenemos el denominador.',
  },
  {
    id: 'q2',
    type: 'addition',
    num1: 2,
    num2: 4,
    denominator: 8,
    options: ['6/8', '6/16', '8/8', '2/8'],
    correctAnswer: 0,
    explanation: '2/8 + 4/8 = (2+4)/8 = 6/8. También se puede simplificar a 3/4.',
  },
  {
    id: 'q3',
    type: 'addition',
    num1: 3,
    num2: 2,
    denominator: 6,
    options: ['5/12', '5/6', '6/6', '1/6'],
    correctAnswer: 1,
    explanation: '3/6 + 2/6 = (3+2)/6 = 5/6. El denominador siempre se mantiene igual.',
  },
  // Subtraction questions
  {
    id: 'q4',
    type: 'subtraction',
    num1: 5,
    num2: 2,
    denominator: 7,
    options: ['3/7', '3/14', '7/7', '2/7'],
    correctAnswer: 0,
    explanation: '5/7 − 2/7 = (5−2)/7 = 3/7. Restamos los numeradores y mantenemos el denominador.',
  },
  {
    id: 'q5',
    type: 'subtraction',
    num1: 7,
    num2: 3,
    denominator: 9,
    options: ['4/18', '10/9', '4/9', '3/9'],
    correctAnswer: 2,
    explanation: '7/9 − 3/9 = (7−3)/9 = 4/9.',
  },
  {
    id: 'q6',
    type: 'subtraction',
    num1: 4,
    num2: 2,
    denominator: 4,
    options: ['2/4', '2/8', '6/4', '1/2'],
    correctAnswer: 0,
    explanation: '4/4 − 2/4 = (4−2)/4 = 2/4. También se puede simplificar a 1/2.',
  },
  // Mixed with simplification
  {
    id: 'q7',
    type: 'addition',
    num1: 1,
    num2: 1,
    denominator: 4,
    options: ['2/8', '2/4', '1/2', '1/4'],
    correctAnswer: 1,
    explanation: '1/4 + 1/4 = 2/4. Nota: 2/4 = 1/2 (simplificado).',
  },
  {
    id: 'q8',
    type: 'subtraction',
    num1: 6,
    num2: 4,
    denominator: 10,
    options: ['2/10', '10/10', '2/20', '1/5'],
    correctAnswer: 0,
    explanation: '6/10 − 4/10 = 2/10. También se puede simplificar a 1/5.',
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
              ? '¡Excelente! Dominas la suma y resta de fracciones.'
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
            question.type === 'addition'
              ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
              : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
          )}
        >
          {question.type === 'addition' ? '➕ Suma' : '➖ Resta'}
        </span>
      </div>

      {/* Question */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          Calcula:{' '}
          <span className="text-orange-600 dark:text-orange-400">
            {question.num1}/{question.denominator}
          </span>
          {' '}
          <span className={question.type === 'addition' ? 'text-green-600' : 'text-red-600'}>
            {question.type === 'addition' ? '+' : '−'}
          </span>
          {' '}
          <span className="text-blue-600 dark:text-blue-400">
            {question.num2}/{question.denominator}
          </span>
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
            <strong>Recuerda:</strong>{' '}
            {question.type === 'addition'
              ? 'Suma los numeradores, mantén el denominador.'
              : 'Resta los numeradores, mantén el denominador.'}
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
