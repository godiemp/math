'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'interactive' | 'discovery';

// Fraction bar component for visualization
function FractionBar({
  numerator,
  denominator,
  highlightRemoved = 0,
  color = 'blue',
}: {
  numerator: number;
  denominator: number;
  highlightRemoved?: number;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}) {
  const colorClasses = {
    blue: {
      filled: 'bg-blue-500 dark:bg-blue-600',
      empty: 'bg-blue-100 dark:bg-blue-900/30',
      border: 'border-blue-700 dark:border-blue-400',
    },
    green: {
      filled: 'bg-green-500 dark:bg-green-600',
      empty: 'bg-green-100 dark:bg-green-900/30',
      border: 'border-green-700 dark:border-green-400',
    },
    purple: {
      filled: 'bg-purple-500 dark:bg-purple-600',
      empty: 'bg-purple-100 dark:bg-purple-900/30',
      border: 'border-purple-700 dark:border-purple-400',
    },
    orange: {
      filled: 'bg-orange-500 dark:bg-orange-600',
      empty: 'bg-orange-100 dark:bg-orange-900/30',
      border: 'border-orange-700 dark:border-orange-400',
    },
    red: {
      filled: 'bg-red-500 dark:bg-red-600',
      removed: 'bg-red-300 dark:bg-red-900/50',
      empty: 'bg-red-100 dark:bg-red-900/30',
      border: 'border-red-700 dark:border-red-400',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="w-full">
      <div
        className={cn(
          'relative h-8 rounded overflow-hidden border-2',
          colors.border,
        )}
      >
        <div className="flex h-full">
          {Array.from({ length: denominator }).map((_, i) => {
            const isFilled = i < numerator;
            const isRemoved = highlightRemoved > 0 && i >= numerator && i < numerator + highlightRemoved;

            return (
              <div
                key={i}
                className={cn(
                  'flex-1 h-full transition-all duration-300 relative',
                  isFilled
                    ? colors.filled
                    : isRemoved && 'removed' in colors
                      ? colors.removed
                      : colors.empty,
                  i > 0 && 'border-l-2',
                  colors.border,
                )}
              >
                {isRemoved && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-red-600 dark:bg-red-400 rotate-45" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Interactive subtraction problem
function SubtractionProblem({
  num1,
  num2,
  denom,
  onSolve,
}: {
  num1: number;
  num2: number;
  denom: number;
  onSolve: () => void;
}) {
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const correctAnswer = num1 - num2;

  const handleCheck = () => {
    setShowResult(true);
    // Animate the removal
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnimationStep(step);
      if (step >= num2) {
        clearInterval(interval);
      }
    }, 300);
  };

  const isCorrect = userAnswer === correctAnswer;

  return (
    <div className="space-y-4">
      {/* Visual representation */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <p className="text-center text-gray-600 dark:text-gray-400 mb-3">
          Empezamos con <span className="font-bold text-orange-600 dark:text-orange-400">{num1}/{denom}</span>
        </p>

        <div className="max-w-xs mx-auto mb-4">
          <FractionBar
            numerator={showResult ? correctAnswer : num1}
            denominator={denom}
            highlightRemoved={showResult ? Math.min(animationStep, num2) : 0}
            color={showResult ? 'green' : 'orange'}
          />
        </div>

        {showResult && (
          <p className="text-center text-gray-600 dark:text-gray-400 animate-fadeIn">
            Quitamos <span className="font-bold text-red-600 dark:text-red-400">{num2}</span> partes
          </p>
        )}
      </div>

      {/* Question */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <p className="text-center text-gray-700 dark:text-gray-300 mb-3">
          <span className="text-orange-600 dark:text-orange-400 font-bold">{num1}/{denom}</span>
          {' − '}
          <span className="text-red-600 dark:text-red-400 font-bold">{num2}/{denom}</span>
          {' = '}
          <span className="text-green-600 dark:text-green-400 font-bold">?/{denom}</span>
        </p>

        {!showResult ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max={num1}
                value={userAnswer ?? ''}
                onChange={(e) => setUserAnswer(parseInt(e.target.value) || null)}
                className="w-16 h-12 text-center text-xl font-bold border-2 border-green-300 dark:border-green-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="?"
              />
              <span className="text-xl font-bold text-gray-600 dark:text-gray-400">/{denom}</span>
            </div>
            <button
              onClick={handleCheck}
              disabled={userAnswer === null}
              className={cn(
                'px-6 py-2 rounded-lg font-semibold transition-all',
                userAnswer !== null
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
              )}
            >
              Comprobar
            </button>
          </div>
        ) : (
          <div className="text-center space-y-3 animate-fadeIn">
            <div
              className={cn(
                'p-3 rounded-lg',
                isCorrect
                  ? 'bg-green-100 dark:bg-green-900/50'
                  : 'bg-red-100 dark:bg-red-900/50',
              )}
            >
              <p
                className={cn(
                  'font-bold',
                  isCorrect
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300',
                )}
              >
                {isCorrect ? '¡Correcto!' : `La respuesta es ${correctAnswer}/${denom}`}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {num1} − {num2} = {correctAnswer}
              </p>
            </div>

            <button
              onClick={onSolve}
              className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all mx-auto"
            >
              <span>Siguiente</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Step5ExploreSubtraction({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentProblem, setCurrentProblem] = useState(0);

  const problems = [
    { num1: 5, num2: 2, denom: 6 },
    { num1: 7, num2: 4, denom: 8 },
    { num1: 4, num2: 1, denom: 5 },
  ];

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Restando Pedazos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Quitar partes iguales
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-red-500 rounded-full">
              <Minus className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Restar fracciones con igual denominador es como <strong>quitar pedazos</strong> de una barra.
            </p>
          </div>

          <div className="space-y-4 py-4">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-2">Por ejemplo: 5/6 − 2/6</p>
            </div>

            {/* Step 1 */}
            <div className="max-w-xs mx-auto">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 text-center">
                Empezamos con 5/6:
              </p>
              <FractionBar numerator={5} denominator={6} color="orange" />
            </div>

            {/* Step 2 */}
            <div className="max-w-xs mx-auto">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 text-center">
                Quitamos 2 partes:
              </p>
              <FractionBar numerator={3} denominator={6} highlightRemoved={2} color="red" />
            </div>

            {/* Result */}
            <div className="max-w-xs mx-auto">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 text-center">
                Nos quedan 3/6:
              </p>
              <FractionBar numerator={3} denominator={6} color="green" />
            </div>
          </div>

          <p className="text-center text-red-700 dark:text-red-300 mt-4">
            5 − 2 = 3 → El resultado es <strong>3/6</strong>
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('interactive')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>¡Practicar!</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: INTERACTIVE ============
  if (phase === 'interactive') {
    const problem = problems[currentProblem];

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Restando Pedazos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Problema {currentProblem + 1} de {problems.length}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2">
          {problems.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                i < currentProblem
                  ? 'bg-green-500'
                  : i === currentProblem
                    ? 'bg-red-500 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600',
              )}
            />
          ))}
        </div>

        <SubtractionProblem
          key={currentProblem}
          num1={problem.num1}
          num2={problem.num2}
          denom={problem.denom}
          onSolve={() => {
            if (currentProblem < problems.length - 1) {
              setCurrentProblem(prev => prev + 1);
            } else {
              setPhase('discovery');
            }
          }}
        />

        {/* Hint */}
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
            <strong>Pista:</strong> Resta los numeradores. El denominador se queda igual.
          </p>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: DISCOVERY ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Restando Pedazos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¡Lo dominaste!
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-6">
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">La Regla de la Resta:</p>
            <div className="text-2xl font-bold">
              <span className="text-orange-600 dark:text-orange-400">a</span>
              <span className="text-gray-400">/</span>
              <span className="text-purple-600 dark:text-purple-400">c</span>
              <span className="text-gray-400 mx-2">−</span>
              <span className="text-red-600 dark:text-red-400">b</span>
              <span className="text-gray-400">/</span>
              <span className="text-purple-600 dark:text-purple-400">c</span>
              <span className="text-gray-400 mx-2">=</span>
              <span className="text-green-600 dark:text-green-400">(a−b)</span>
              <span className="text-gray-400">/</span>
              <span className="text-purple-600 dark:text-purple-400">c</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-purple-800 dark:text-purple-200 font-medium">
                ¡Es igual que la suma!
              </p>
              <p className="text-purple-700 dark:text-purple-300 text-sm mt-1">
                La única diferencia es que <strong>restas</strong> los numeradores en lugar de sumarlos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-700">
          <h4 className="font-bold text-green-700 dark:text-green-300 mb-2 text-center">Suma</h4>
          <p className="text-center text-lg font-bold">
            <span className="text-gray-700 dark:text-gray-300">(a + b) / c</span>
          </p>
        </div>
        <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-xl border border-red-200 dark:border-red-700">
          <h4 className="font-bold text-red-700 dark:text-red-300 mb-2 text-center">Resta</h4>
          <p className="text-center text-lg font-bold">
            <span className="text-gray-700 dark:text-gray-300">(a − b) / c</span>
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
        >
          <span>Continuar al checkpoint</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
