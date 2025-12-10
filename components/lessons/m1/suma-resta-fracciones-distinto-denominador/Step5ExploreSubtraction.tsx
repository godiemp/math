'use client';

import { useState } from 'react';
import { ArrowRight, Check, Minus, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'interactive' | 'discovery';

interface Problem {
  num1: number;
  denom1: number;
  num2: number;
  denom2: number;
}

// GCD and LCM helper functions
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function simplifyFraction(num: number, denom: number): [number, number] {
  if (num === 0) return [0, 1];
  const g = gcd(Math.abs(num), denom);
  return [num / g, denom / g];
}

// Fraction bar component
function FractionBar({
  numerator,
  denominator,
  color = 'blue',
}: {
  numerator: number;
  denominator: number;
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
      empty: 'bg-red-100 dark:bg-red-900/30',
      border: 'border-red-700 dark:border-red-400',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="w-full">
      <div
        className={cn(
          'relative h-6 rounded overflow-hidden border',
          colors.border,
        )}
      >
        <div className="flex h-full">
          {Array.from({ length: denominator }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 h-full',
                i < numerator ? colors.filled : colors.empty,
                i > 0 && 'border-l',
                colors.border,
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Interactive subtraction problem
function SubtractionProblem({
  problem,
  onSolve,
}: {
  problem: Problem;
  onSolve: () => void;
}) {
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const { num1, denom1, num2, denom2 } = problem;
  const lcd = lcm(denom1, denom2);
  const factor1 = lcd / denom1;
  const factor2 = lcd / denom2;
  const convertedNum1 = num1 * factor1;
  const convertedNum2 = num2 * factor2;
  const resultNum = convertedNum1 - convertedNum2;
  const [simplifiedNum, simplifiedDenom] = simplifyFraction(resultNum, lcd);

  const handleCheck = () => {
    setShowResult(true);
  };

  const isCorrect = userAnswer === resultNum;

  return (
    <div className="space-y-4">
      {/* Problem display */}
      <div className="bg-gradient-to-r from-orange-50 to-blue-50 dark:from-orange-900/30 dark:to-blue-900/30 rounded-xl p-4">
        <div className="text-center text-2xl font-bold mb-4">
          <span className="text-orange-600 dark:text-orange-400">{num1}/{denom1}</span>
          <span className="text-gray-400 mx-3">−</span>
          <span className="text-blue-600 dark:text-blue-400">{num2}/{denom2}</span>
        </div>

        {/* Conversion hint */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">
          MCM({denom1}, {denom2}) = {lcd}
        </div>

        {/* Visual conversion */}
        <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
          <div className="text-center p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
            <div className="w-24">
              <FractionBar numerator={convertedNum1} denominator={lcd} color="orange" />
            </div>
            <p className="text-sm font-bold text-orange-600 dark:text-orange-400 mt-1">
              {num1}/{denom1} = {convertedNum1}/{lcd}
            </p>
          </div>
          <span className="text-xl font-bold text-gray-400">−</span>
          <div className="text-center p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
            <div className="w-24">
              <FractionBar numerator={convertedNum2} denominator={lcd} color="blue" />
            </div>
            <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">
              {num2}/{denom2} = {convertedNum2}/{lcd}
            </p>
          </div>
        </div>
      </div>

      {/* Answer input */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <p className="text-center text-gray-700 dark:text-gray-300 mb-3">
          <span className="text-orange-600 dark:text-orange-400 font-bold">{convertedNum1}/{lcd}</span>
          {' − '}
          <span className="text-blue-600 dark:text-blue-400 font-bold">{convertedNum2}/{lcd}</span>
          {' = '}
          <span className="text-red-600 dark:text-red-400 font-bold">?/{lcd}</span>
        </p>

        {!showResult ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={userAnswer ?? ''}
                onChange={(e) => setUserAnswer(parseInt(e.target.value) || null)}
                className="w-16 h-12 text-center text-xl font-bold border-2 border-red-300 dark:border-red-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="?"
              />
              <span className="text-xl font-bold text-gray-600 dark:text-gray-400">/{lcd}</span>
            </div>
            <button
              onClick={handleCheck}
              disabled={userAnswer === null}
              className={cn(
                'px-6 py-2 rounded-lg font-semibold transition-all',
                userAnswer !== null
                  ? 'bg-red-500 text-white hover:bg-red-600'
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
                {isCorrect ? '¡Correcto!' : `La respuesta es ${resultNum}/${lcd}`}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {convertedNum1} − {convertedNum2} = {resultNum}
                {simplifiedNum !== resultNum && (
                  <span> = {simplifiedNum}/{simplifiedDenom} (simplificado)</span>
                )}
              </p>
            </div>

            {/* Result visualization */}
            <div className="w-full max-w-xs mx-auto">
              <FractionBar numerator={Math.max(0, resultNum)} denominator={lcd} color="red" />
              <p className="text-center text-sm font-bold text-red-600 dark:text-red-400 mt-1">
                {resultNum}/{lcd}
                {simplifiedNum !== resultNum && ` = ${simplifiedNum}/${simplifiedDenom}`}
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

  const problems: Problem[] = [
    { num1: 3, denom1: 4, num2: 1, denom2: 3 },
    { num1: 5, denom1: 6, num2: 1, denom2: 2 },
    { num1: 2, denom1: 3, num2: 1, denom2: 4 },
  ];

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Restando con Distinto Denominador
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            El mismo proceso, diferente operación
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-red-500 rounded-full">
              <Minus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-red-700 dark:text-red-300">
              Para Restar
            </h3>
          </div>

          <div className="flex items-start gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300">
              <strong>¡Buenas noticias!</strong> El proceso para restar fracciones con distinto denominador
              es <strong>exactamente igual</strong> que para sumar.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-3">Solo cambia el paso 3:</p>
            <ol className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600 dark:text-purple-400">1.</span>
                Encuentra el <strong>MCM</strong>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600 dark:text-purple-400">2.</span>
                <strong>Convierte</strong> las fracciones
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600 dark:text-red-400">3.</span>
                <strong className="text-red-600 dark:text-red-400">Resta</strong> los numeradores (en vez de sumar)
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600 dark:text-purple-400">4.</span>
                <strong>Simplifica</strong>
              </li>
            </ol>
          </div>
        </div>

        {/* Example */}
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <p className="text-center text-purple-800 dark:text-purple-200 font-medium mb-3">
            Ejemplo: 3/4 − 1/3
          </p>
          <div className="text-center space-y-1 text-sm">
            <p className="text-gray-600 dark:text-gray-400">MCM(4, 3) = 12</p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="text-orange-600 dark:text-orange-400">3/4 = 9/12</span>
              {' y '}
              <span className="text-blue-600 dark:text-blue-400">1/3 = 4/12</span>
            </p>
            <p className="font-bold text-lg">
              <span className="text-orange-600 dark:text-orange-400">9/12</span>
              <span className="text-gray-400 mx-1">−</span>
              <span className="text-blue-600 dark:text-blue-400">4/12</span>
              <span className="text-gray-400 mx-1">=</span>
              <span className="text-red-600 dark:text-red-400">5/12</span>
            </p>
          </div>
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
            Restando con Distinto Denominador
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
          problem={problem}
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
            <strong>Pista:</strong> Resta los numeradores después de convertir.
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
          Restando con Distinto Denominador
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          ¡Lo dominaste!
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Check className="w-8 h-8 text-green-500" />
          <p className="text-xl font-bold text-green-700 dark:text-green-300">
            ¡Excelente trabajo!
          </p>
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-700 dark:text-gray-300">
            Ahora puedes <strong>sumar y restar</strong> cualquier fracción,
            <br />
            ¡sin importar los denominadores!
          </p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 text-center">
            Resumen: Suma y Resta con Distinto Denominador
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg text-center">
              <p className="font-bold text-green-700 dark:text-green-300 mb-1">Suma</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Convierte → Suma numeradores
              </p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg text-center">
              <p className="font-bold text-red-700 dark:text-red-300 mb-1">Resta</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Convierte → Resta numeradores
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
        >
          <span>Continuar al Checkpoint</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
