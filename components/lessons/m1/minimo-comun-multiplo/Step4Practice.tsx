'use client';

import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface PracticeQuestion {
  id: string;
  type: 'find-lcm' | 'identify-multiples' | 'find-denominator' | 'context' | 'formula';
  question: string;
  numbers?: number[];
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q1',
    type: 'identify-multiples',
    question: '¿Cuáles son los primeros 5 múltiplos de 8?',
    numbers: [8],
    options: ['8, 16, 24, 32, 40', '1, 2, 4, 8, 16', '8, 18, 28, 38, 48', '8, 16, 32, 64, 128'],
    correctAnswer: 0,
    explanation: 'Los múltiplos de 8 son: 8×1=8, 8×2=16, 8×3=24, 8×4=32, 8×5=40.',
  },
  {
    id: 'q2',
    type: 'find-lcm',
    question: '¿Cuál es el M.C.M. de 3 y 4?',
    numbers: [3, 4],
    options: ['7', '12', '1', '24'],
    correctAnswer: 1,
    explanation: 'Múltiplos de 3: 3, 6, 9, 12... Múltiplos de 4: 4, 8, 12... El primero común es 12.',
  },
  {
    id: 'q3',
    type: 'find-lcm',
    question: '¿Cuál es el M.C.M. de 5 y 15?',
    numbers: [5, 15],
    options: ['5', '15', '30', '75'],
    correctAnswer: 1,
    explanation: 'Como 5 divide a 15, el M.C.M. es simplemente 15. Cuando un número divide al otro, el M.C.M. es el mayor.',
  },
  {
    id: 'q4',
    type: 'find-lcm',
    question: '¿Cuál es el M.C.M. de 7 y 11?',
    numbers: [7, 11],
    options: ['18', '77', '1', '44'],
    correctAnswer: 1,
    explanation: '7 y 11 son primos (coprimos). Como no comparten factores, M.C.M. = 7 × 11 = 77.',
  },
  {
    id: 'q5',
    type: 'find-lcm',
    question: '¿Cuál es el M.C.M. de 6 y 9?',
    numbers: [6, 9],
    options: ['18', '54', '3', '15'],
    correctAnswer: 0,
    explanation: '6 = 2×3, 9 = 3². M.C.M. = 2×3² = 18. También: Múltiplos de 6: 6, 12, 18... Múltiplos de 9: 9, 18...',
  },
  {
    id: 'q6',
    type: 'context',
    question: 'Un autobús pasa cada 12 minutos y otro cada 15 minutos. Si ambos pasan ahora, ¿en cuántos minutos volverán a coincidir?',
    numbers: [12, 15],
    options: ['27 min', '30 min', '60 min', '180 min'],
    correctAnswer: 2,
    explanation: 'M.C.M.(12, 15) = 60. Ambos buses coinciden cada 60 minutos.',
  },
  {
    id: 'q7',
    type: 'formula',
    question: 'Si M.C.D.(24, 36) = 12, ¿cuál es M.C.M.(24, 36)?',
    numbers: [24, 36],
    options: ['12', '72', '864', '6'],
    correctAnswer: 1,
    explanation: 'Usando M.C.M. = (a × b) ÷ M.C.D. = (24 × 36) ÷ 12 = 864 ÷ 12 = 72.',
  },
  {
    id: 'q8',
    type: 'find-denominator',
    question: 'Para sumar 1/6 + 1/8, necesitas un denominador común. ¿Cuál es el menor denominador común?',
    numbers: [6, 8],
    options: ['14', '24', '48', '2'],
    correctAnswer: 1,
    explanation: 'El mínimo común denominador es el M.C.M.(6, 8) = 24.',
  },
  {
    id: 'q9',
    type: 'find-lcm',
    question: '¿Cuál es el M.C.M. de 15 y 20?',
    numbers: [15, 20],
    options: ['30', '60', '300', '5'],
    correctAnswer: 1,
    explanation: '15 = 3×5, 20 = 2²×5. M.C.M. = 2²×3×5 = 4×3×5 = 60.',
  },
  {
    id: 'q10',
    type: 'find-lcm',
    question: '¿Cuál es el M.C.M. de 4, 6 y 10?',
    numbers: [4, 6, 10],
    options: ['60', '120', '20', '240'],
    correctAnswer: 0,
    explanation: '4 = 2², 6 = 2×3, 10 = 2×5. M.C.M. = 2²×3×5 = 4×3×5 = 60.',
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
              ? '¡Excelente! Dominas el M.C.M.'
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
            question.type === 'find-lcm'
              ? 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300'
              : question.type === 'identify-multiples'
                ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                : question.type === 'find-denominator'
                  ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                  : question.type === 'formula'
                    ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                    : 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300',
          )}
        >
          {question.type === 'find-lcm' && 'Calcular M.C.M.'}
          {question.type === 'identify-multiples' && 'Identificar múltiplos'}
          {question.type === 'find-denominator' && 'Denominador común'}
          {question.type === 'formula' && 'Usar fórmula'}
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
        <div className="bg-cyan-50 dark:bg-cyan-900/30 rounded-lg p-3 border border-cyan-200 dark:border-cyan-700">
          <p className="text-cyan-800 dark:text-cyan-200 text-sm text-center">
            <strong>Recuerda:</strong> Lista los múltiplos de cada número, encuentra los comunes
            y elige el menor. O usa factorización con exponentes máximos.
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
