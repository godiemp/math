'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface ComparisonQuestion {
  id: number;
  fraction1: { num: number; den: number };
  fraction2: { num: number; den: number };
  correctAnswer: 'left' | 'right' | 'equal';
  explanation: string;
  strategy: string;
}

const QUESTIONS: ComparisonQuestion[] = [
  {
    id: 1,
    fraction1: { num: 3, den: 8 },
    fraction2: { num: 5, den: 8 },
    correctAnswer: 'right',
    explanation: 'Cuando el denominador es igual, la fracción con mayor numerador es más grande.',
    strategy: 'Mismo denominador',
  },
  {
    id: 2,
    fraction1: { num: 1, den: 3 },
    fraction2: { num: 1, den: 5 },
    correctAnswer: 'left',
    explanation: '¡Cuidado! Con el mismo numerador, el denominador menor da una fracción más grande.',
    strategy: 'Mismo numerador',
  },
  {
    id: 3,
    fraction1: { num: 3, den: 4 },
    fraction2: { num: 2, den: 5 },
    correctAnswer: 'left',
    explanation: '3/4 es mayor que 1/2, mientras que 2/5 es menor que 1/2. Así que 3/4 > 2/5.',
    strategy: 'Comparar con 1/2',
  },
  {
    id: 4,
    fraction1: { num: 1, den: 2 },
    fraction2: { num: 2, den: 4 },
    correctAnswer: 'equal',
    explanation: '1/2 y 2/4 son fracciones equivalentes. Ambas representan la mitad.',
    strategy: 'Fracciones equivalentes',
  },
];

// Fraction bar for visual feedback
function FractionBar({
  numerator,
  denominator,
  color = 'blue',
}: {
  numerator: number;
  denominator: number;
  color?: 'blue' | 'purple';
}) {
  const colorClasses = {
    blue: {
      filled: 'bg-blue-500 dark:bg-blue-600',
      empty: 'bg-blue-100 dark:bg-blue-900/30',
      border: 'border-blue-700 dark:border-blue-400',
    },
    purple: {
      filled: 'bg-purple-500 dark:bg-purple-600',
      empty: 'bg-purple-100 dark:bg-purple-900/30',
      border: 'border-purple-700 dark:border-purple-400',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className={cn('relative w-full h-6 rounded overflow-hidden border', colors.border)}>
      <div className="flex h-full">
        {Array.from({ length: denominator }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 h-full transition-all duration-300',
              i < numerator ? colors.filled : colors.empty,
              i > 0 && 'border-l',
              colors.border
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default function Step4Practice({ onComplete, isActive }: LessonStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'left' | 'right' | 'equal' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showVisual, setShowVisual] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const isComplete = currentQuestion >= QUESTIONS.length;
  const question = isComplete ? null : QUESTIONS[currentQuestion];
  const isCorrect = question ? selectedAnswer === question.correctAnswer : false;

  if (!isActive) return null;

  const handleSelect = (answer: 'left' | 'right' | 'equal') => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleCheck = () => {
    if (!selectedAnswer) return;
    setShowFeedback(true);
    setShowVisual(true);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowVisual(false);
    setCurrentQuestion(prev => prev + 1);
  };

  // ============ COMPLETION SCREEN ============
  if (isComplete || !question) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Cuál es Mayor?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Práctica completada!
          </p>
        </div>

        <div className={cn(
          'p-6 rounded-xl border-2 text-center',
          correctCount >= 3
            ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
            : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
        )}>
          <div className="text-4xl font-bold mb-2">
            {correctCount}/{QUESTIONS.length}
          </div>
          <p className={cn(
            'font-medium',
            correctCount >= 3
              ? 'text-green-700 dark:text-green-300'
              : 'text-amber-700 dark:text-amber-300'
          )}>
            {correctCount === QUESTIONS.length && '¡Perfecto! Dominas la comparación de fracciones.'}
            {correctCount === 3 && '¡Muy bien! Tienes buen entendimiento.'}
            {correctCount === 2 && '¡Buen intento! Sigue practicando.'}
            {correctCount <= 1 && 'Necesitas más práctica, pero vas bien.'}
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">Estrategias para comparar:</h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li><strong>Mismo denominador:</strong> Mayor numerador = mayor fracción</li>
            <li><strong>Mismo numerador:</strong> Menor denominador = mayor fracción</li>
            <li><strong>Comparar con 1/2:</strong> Usa la mitad como referencia</li>
            <li><strong>Equivalentes:</strong> 1/2 = 2/4 = 3/6 = ...</li>
          </ul>
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
          ¿Cuál es Mayor?
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
                  : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Strategy hint */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg px-4 py-2 text-center">
        <span className="text-sm text-purple-700 dark:text-purple-300">
          <strong>Estrategia:</strong> {question.strategy}
        </span>
      </div>

      {/* Question */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
          ¿Cuál fracción es mayor?
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* Fraction 1 */}
          <button
            onClick={() => handleSelect('left')}
            disabled={showFeedback}
            className={cn(
              'flex flex-col items-center p-4 rounded-xl transition-all min-w-[100px]',
              selectedAnswer === 'left'
                ? 'bg-blue-100 dark:bg-blue-900/50 ring-4 ring-blue-400 scale-105'
                : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600',
              showFeedback && question.correctAnswer === 'left' && 'ring-4 ring-green-400',
              showFeedback && selectedAnswer === 'left' && !isCorrect && 'ring-4 ring-red-400'
            )}
          >
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {question.fraction1.num}
            </div>
            <div className="h-1 w-12 bg-gray-400 dark:bg-gray-500 my-1"></div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {question.fraction1.den}
            </div>
          </button>

          {/* Comparison buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleSelect('equal')}
              disabled={showFeedback}
              className={cn(
                'px-4 py-2 rounded-lg font-bold transition-all',
                selectedAnswer === 'equal'
                  ? 'bg-amber-100 dark:bg-amber-900/50 ring-2 ring-amber-400 text-amber-700 dark:text-amber-300'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300',
                showFeedback && question.correctAnswer === 'equal' && 'ring-2 ring-green-400',
                showFeedback && selectedAnswer === 'equal' && !isCorrect && 'ring-2 ring-red-400'
              )}
            >
              =
            </button>
          </div>

          {/* Fraction 2 */}
          <button
            onClick={() => handleSelect('right')}
            disabled={showFeedback}
            className={cn(
              'flex flex-col items-center p-4 rounded-xl transition-all min-w-[100px]',
              selectedAnswer === 'right'
                ? 'bg-purple-100 dark:bg-purple-900/50 ring-4 ring-purple-400 scale-105'
                : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600',
              showFeedback && question.correctAnswer === 'right' && 'ring-4 ring-green-400',
              showFeedback && selectedAnswer === 'right' && !isCorrect && 'ring-4 ring-red-400'
            )}
          >
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {question.fraction2.num}
            </div>
            <div className="h-1 w-12 bg-gray-400 dark:bg-gray-500 my-1"></div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {question.fraction2.den}
            </div>
          </button>
        </div>

        {/* Visual comparison (shown after feedback) */}
        {showVisual && (
          <div className="mt-6 space-y-3 animate-fadeIn max-w-sm mx-auto">
            <div className="space-y-1">
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {question.fraction1.num}/{question.fraction1.den}
              </div>
              <FractionBar
                numerator={question.fraction1.num}
                denominator={question.fraction1.den}
                color="blue"
              />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                {question.fraction2.num}/{question.fraction2.den}
              </div>
              <FractionBar
                numerator={question.fraction2.num}
                denominator={question.fraction2.den}
                color="purple"
              />
            </div>
          </div>
        )}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={cn(
            'p-4 rounded-xl border-2 animate-fadeIn',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
              : 'bg-red-50 dark:bg-red-900/30 border-red-400'
          )}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <X className="w-6 h-6 text-red-600 flex-shrink-0" />
            )}
            <div>
              <h4 className={cn(
                'font-bold',
                isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'
              )}>
                {isCorrect ? '¡Correcto!' : 'No exactamente'}
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
            disabled={!selectedAnswer}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Comprobar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>{currentQuestion < QUESTIONS.length - 1 ? 'Siguiente' : 'Finalizar'}</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
