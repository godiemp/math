'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'interactive' | 'discovery';

// Fraction bar component for visualization
function FractionBar({
  numerator,
  denominator,
  color = 'blue',
  showLabel = true,
}: {
  numerator: number;
  denominator: number;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  showLabel?: boolean;
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
  };

  const colors = colorClasses[color];

  return (
    <div className="space-y-1">
      <div
        className={cn(
          'relative h-8 rounded overflow-hidden border-2',
          colors.border,
        )}
      >
        <div className="flex h-full">
          {Array.from({ length: denominator }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 h-full transition-all duration-300',
                i < numerator ? colors.filled : colors.empty,
                i > 0 && 'border-l-2',
                colors.border,
              )}
            />
          ))}
        </div>
      </div>
      {showLabel && (
        <p className={cn('text-center font-bold text-lg', `text-${color}-600 dark:text-${color}-400`)}>
          {numerator}/{denominator}
        </p>
      )}
    </div>
  );
}

// Interactive problem component
function InteractiveProblem({
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
  const correctAnswer = num1 + num2;

  const handleCheck = () => {
    setShowResult(true);
  };

  const isCorrect = userAnswer === correctAnswer;

  return (
    <div className="space-y-4">
      {/* Visual representation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div>
          <FractionBar numerator={num1} denominator={denom} color="orange" />
        </div>
        <div className="flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-400">+</span>
        </div>
        <div>
          <FractionBar numerator={num2} denominator={denom} color="blue" />
        </div>
      </div>

      {/* Answer input */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <p className="text-center text-gray-700 dark:text-gray-300 mb-3">
          <span className="text-orange-600 dark:text-orange-400 font-bold">{num1}/{denom}</span>
          {' + '}
          <span className="text-blue-600 dark:text-blue-400 font-bold">{num2}/{denom}</span>
          {' = '}
          <span className="text-purple-600 dark:text-purple-400 font-bold">?/{denom}</span>
        </p>

        {!showResult ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max={denom * 2}
                value={userAnswer ?? ''}
                onChange={(e) => setUserAnswer(parseInt(e.target.value) || null)}
                className="w-16 h-12 text-center text-xl font-bold border-2 border-purple-300 dark:border-purple-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                  ? 'bg-purple-500 text-white hover:bg-purple-600'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
              )}
            >
              Comprobar
            </button>
          </div>
        ) : (
          <div className="text-center space-y-3">
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
                {num1} + {num2} = {correctAnswer}
              </p>
            </div>

            {/* Result visualization */}
            <div className="w-full max-w-xs mx-auto">
              <FractionBar numerator={correctAnswer} denominator={denom} color="green" />
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

export default function Step2ExploreAddition({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentProblem, setCurrentProblem] = useState(0);

  const problems = [
    { num1: 1, num2: 2, denom: 5 },
    { num1: 3, num2: 4, denom: 10 },
    { num1: 2, num2: 3, denom: 6 },
  ];

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Sumando Pedazos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Descubre el patrón
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300">
              Cuando sumamos fracciones con el <strong>mismo denominador</strong>,
              estamos juntando partes del <strong>mismo tamaño</strong>.
            </p>
          </div>

          <div className="space-y-4 py-4">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-2">Por ejemplo:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center max-w-lg mx-auto">
              <div className="col-span-1">
                <FractionBar numerator={2} denominator={5} color="orange" />
              </div>
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">+</span>
              </div>
              <div className="col-span-1">
                <FractionBar numerator={1} denominator={5} color="blue" />
              </div>
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">=</span>
              </div>
              <div className="col-span-1">
                <FractionBar numerator={3} denominator={5} color="green" />
              </div>
            </div>
          </div>

          <p className="text-center text-purple-700 dark:text-purple-300 mt-4">
            ¡Solo sumamos los numeradores porque los pedazos son del mismo tamaño!
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('interactive')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
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
            Sumando Pedazos
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
                    ? 'bg-blue-500 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600',
              )}
            />
          ))}
        </div>

        <InteractiveProblem
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
            <strong>Pista:</strong> Suma los numeradores. El denominador se queda igual.
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
          Sumando Pedazos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¡Lo descubriste!
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-6">
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">La Regla de la Suma:</p>
            <div className="text-2xl font-bold">
              <span className="text-orange-600 dark:text-orange-400">a</span>
              <span className="text-gray-400">/</span>
              <span className="text-purple-600 dark:text-purple-400">c</span>
              <span className="text-gray-400 mx-2">+</span>
              <span className="text-blue-600 dark:text-blue-400">b</span>
              <span className="text-gray-400">/</span>
              <span className="text-purple-600 dark:text-purple-400">c</span>
              <span className="text-gray-400 mx-2">=</span>
              <span className="text-green-600 dark:text-green-400">(a+b)</span>
              <span className="text-gray-400">/</span>
              <span className="text-purple-600 dark:text-purple-400">c</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">✓ Lo que SÍ cambia:</h4>
            <p className="text-gray-700 dark:text-gray-300">
              El <strong>numerador</strong> es la suma de los numeradores originales.
            </p>
          </div>
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">✗ Lo que NO cambia:</h4>
            <p className="text-gray-700 dark:text-gray-300">
              El <strong>denominador</strong> se mantiene igual.
            </p>
          </div>
        </div>
      </div>

      {/* Example */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <p className="text-center text-purple-800 dark:text-purple-200 font-medium mb-3">
          Ejemplo: 2/7 + 3/7
        </p>
        <div className="flex items-center justify-center gap-2 text-xl font-bold">
          <span>(2 + 3)</span>
          <span className="text-gray-400">/</span>
          <span className="text-purple-600 dark:text-purple-400">7</span>
          <span className="text-gray-400">=</span>
          <span className="text-green-600 dark:text-green-400">5/7</span>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
