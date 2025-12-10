'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'find-lcd' | 'convert' | 'interactive' | 'discovery';

// Fraction bar component for visualization
function FractionBar({
  numerator,
  denominator,
  color = 'blue',
  showLabel = true,
  highlightConversion = false,
}: {
  numerator: number;
  denominator: number;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  showLabel?: boolean;
  highlightConversion?: boolean;
}) {
  const colorClasses = {
    blue: {
      filled: 'bg-blue-500 dark:bg-blue-600',
      empty: 'bg-blue-100 dark:bg-blue-900/30',
      border: 'border-blue-700 dark:border-blue-400',
      text: 'text-blue-600 dark:text-blue-400',
    },
    green: {
      filled: 'bg-green-500 dark:bg-green-600',
      empty: 'bg-green-100 dark:bg-green-900/30',
      border: 'border-green-700 dark:border-green-400',
      text: 'text-green-600 dark:text-green-400',
    },
    purple: {
      filled: 'bg-purple-500 dark:bg-purple-600',
      empty: 'bg-purple-100 dark:bg-purple-900/30',
      border: 'border-purple-700 dark:border-purple-400',
      text: 'text-purple-600 dark:text-purple-400',
    },
    orange: {
      filled: 'bg-orange-500 dark:bg-orange-600',
      empty: 'bg-orange-100 dark:bg-orange-900/30',
      border: 'border-orange-700 dark:border-orange-400',
      text: 'text-orange-600 dark:text-orange-400',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className={cn('space-y-1', highlightConversion && 'animate-pulse')}>
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
                'flex-1 h-full transition-all duration-500',
                i < numerator ? colors.filled : colors.empty,
                i > 0 && 'border-l-2',
                colors.border,
              )}
            />
          ))}
        </div>
      </div>
      {showLabel && (
        <p className={cn('text-center font-bold text-lg', colors.text)}>
          {numerator}/{denominator}
        </p>
      )}
    </div>
  );
}

// Multiples finder component
function MultiplesFinder({
  number,
  color,
  highlightMultiple,
  maxMultiples = 6,
}: {
  number: number;
  color: 'orange' | 'blue';
  highlightMultiple?: number;
  maxMultiples?: number;
}) {
  const multiples = Array.from({ length: maxMultiples }, (_, i) => number * (i + 1));
  const colorClasses = {
    orange: {
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      highlight: 'bg-orange-500 text-white',
      text: 'text-orange-700 dark:text-orange-300',
    },
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      highlight: 'bg-blue-500 text-white',
      text: 'text-blue-700 dark:text-blue-300',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="space-y-2">
      <p className={cn('font-medium text-sm', colors.text)}>
        Múltiplos de {number}:
      </p>
      <div className="flex flex-wrap gap-2">
        {multiples.map((m) => (
          <span
            key={m}
            className={cn(
              'px-3 py-1 rounded-lg font-bold transition-all',
              m === highlightMultiple
                ? cn(colors.highlight, 'scale-110 ring-2 ring-green-400')
                : colors.bg,
              colors.text,
            )}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

// Interactive LCD problem
function LCDProblem({
  denom1,
  denom2,
  onSolve,
}: {
  denom1: number;
  denom2: number;
  onSolve: () => void;
}) {
  const [userLCD, setUserLCD] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Calculate LCD (LCM of denominators)
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const lcm = (a: number, b: number) => (a * b) / gcd(a, b);
  const correctLCD = lcm(denom1, denom2);

  const handleCheck = () => {
    setShowResult(true);
  };

  const isCorrect = userLCD === correctLCD;

  const options = [
    denom1 * denom2, // Always an option (works but might not be smallest)
    correctLCD, // The actual LCD
    denom1 + denom2, // Common mistake
    Math.max(denom1, denom2), // Another common mistake
  ].filter((v, i, a) => a.indexOf(v) === i) // Remove duplicates
    .sort((a, b) => a - b);

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
          ¿Cuál es el <strong>denominador común</strong> más pequeño para{' '}
          <span className="text-orange-600 dark:text-orange-400 font-bold">{denom1}</span>
          {' y '}
          <span className="text-blue-600 dark:text-blue-400 font-bold">{denom2}</span>?
        </p>

        <MultiplesFinder number={denom1} color="orange" highlightMultiple={showResult ? correctLCD : undefined} />
        <div className="h-2" />
        <MultiplesFinder number={denom2} color="blue" highlightMultiple={showResult ? correctLCD : undefined} />

        {!showResult ? (
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-4 gap-2">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setUserLCD(opt)}
                  className={cn(
                    'p-3 rounded-lg font-bold transition-all',
                    userLCD === opt
                      ? 'bg-purple-500 text-white scale-105'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600',
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleCheck}
                disabled={userLCD === null}
                className={cn(
                  'px-6 py-2 rounded-lg font-semibold transition-all',
                  userLCD !== null
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
                )}
              >
                Comprobar
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <div
              className={cn(
                'p-3 rounded-lg text-center',
                isCorrect
                  ? 'bg-green-100 dark:bg-green-900/50'
                  : 'bg-amber-100 dark:bg-amber-900/50',
              )}
            >
              <p
                className={cn(
                  'font-bold',
                  isCorrect
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-amber-700 dark:text-amber-300',
                )}
              >
                {isCorrect ? '¡Correcto!' : `El MCM es ${correctLCD}`}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {correctLCD} es el primer número que aparece en ambas listas
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

export default function Step2ExploreLCD({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentProblem, setCurrentProblem] = useState(0);

  const problems = [
    { denom1: 2, denom2: 3 },
    { denom1: 3, denom2: 4 },
    { denom1: 2, denom2: 5 },
  ];

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Buscando el Denominador Común
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            El primer paso para sumar fracciones diferentes
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300">
              Para sumar fracciones con <strong>distinto denominador</strong>,
              necesitamos que tengan <strong>pedazos del mismo tamaño</strong>.
            </p>
          </div>

          <div className="space-y-4 py-4">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-2">
              Mira la diferencia:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
              <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-2">
                  Mitades (1/2)
                </p>
                <FractionBar numerator={1} denominator={2} color="orange" />
              </div>
              <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-2">
                  Tercios (1/3)
                </p>
                <FractionBar numerator={1} denominator={3} color="blue" />
              </div>
            </div>

            <p className="text-center text-purple-700 dark:text-purple-300 mt-4">
              Los pedazos son de <strong>diferente tamaño</strong>. ¡No podemos sumarlos directamente!
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('find-lcd')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>¿Cómo lo resolvemos?</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: FIND LCD ============
  if (phase === 'find-lcd') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Mínimo Común Múltiplo (MCM)
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            La clave está en los múltiplos
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
            Para 1/2 + 1/3, buscamos un número que sea <strong>múltiplo de 2</strong> y <strong>múltiplo de 3</strong>.
          </p>

          <div className="space-y-4">
            <MultiplesFinder number={2} color="orange" highlightMultiple={6} maxMultiples={5} />
            <MultiplesFinder number={3} color="blue" highlightMultiple={6} maxMultiples={5} />
          </div>

          <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/50 rounded-xl border-2 border-green-400">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-green-600" />
              <p className="font-bold text-green-700 dark:text-green-300 text-lg">
                MCM(2, 3) = 6
              </p>
            </div>
            <p className="text-sm text-center text-green-600 dark:text-green-400 mt-1">
              6 es el primer número que aparece en ambas listas
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('convert')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Ahora convertimos</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: CONVERT ============
  if (phase === 'convert') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Convirtiendo las Fracciones
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Hacemos los pedazos del mismo tamaño
          </p>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-blue-50 dark:from-orange-900/30 dark:to-blue-900/30 rounded-xl p-6 space-y-6">
          {/* Conversion 1: 1/2 → 3/6 */}
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-3">
              <span className="text-orange-600 dark:text-orange-400 font-bold">1/2</span> → ¿?/6
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="w-32">
                <FractionBar numerator={1} denominator={2} color="orange" />
              </div>
              <div className="text-center">
                <span className="text-gray-400 text-2xl">=</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ×3
                </p>
              </div>
              <div className="w-32">
                <FractionBar numerator={3} denominator={6} color="orange" />
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              1×3 = 3, 2×3 = 6 → <strong className="text-orange-600 dark:text-orange-400">3/6</strong>
            </p>
          </div>

          {/* Conversion 2: 1/3 → 2/6 */}
          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">1/3</span> → ¿?/6
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="w-32">
                <FractionBar numerator={1} denominator={3} color="blue" />
              </div>
              <div className="text-center">
                <span className="text-gray-400 text-2xl">=</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ×2
                </p>
              </div>
              <div className="w-32">
                <FractionBar numerator={2} denominator={6} color="blue" />
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              1×2 = 2, 3×2 = 6 → <strong className="text-blue-600 dark:text-blue-400">2/6</strong>
            </p>
          </div>

          {/* Result */}
          <div className="p-4 bg-green-100 dark:bg-green-900/50 rounded-xl border-2 border-green-400">
            <p className="text-center text-gray-700 dark:text-gray-300 mb-2">
              ¡Ahora sí podemos sumar!
            </p>
            <div className="flex items-center justify-center gap-2 text-xl font-bold">
              <span className="text-orange-600 dark:text-orange-400">3/6</span>
              <span className="text-gray-400">+</span>
              <span className="text-blue-600 dark:text-blue-400">2/6</span>
              <span className="text-gray-400">=</span>
              <span className="text-green-600 dark:text-green-400">5/6</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('interactive')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
          >
            <span>¡Practicar!</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: INTERACTIVE ============
  if (phase === 'interactive') {
    const problem = problems[currentProblem];

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Encuentra el MCM
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

        <LCDProblem
          key={currentProblem}
          denom1={problem.denom1}
          denom2={problem.denom2}
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
            <strong>Pista:</strong> Busca el primer número que aparece en ambas listas de múltiplos.
          </p>
        </div>
      </div>
    );
  }

  // ============ PHASE 5: DISCOVERY ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Encuentra el MCM
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
            Ya sabes encontrar el <strong>Mínimo Común Múltiplo</strong>,
            <br />
            que usamos como <strong>denominador común</strong>.
          </p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 text-center">
            Resumen del Proceso
          </h4>
          <ol className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="font-bold text-purple-600 dark:text-purple-400 w-6">1.</span>
              Lista los <strong>múltiplos</strong> de cada denominador
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-purple-600 dark:text-purple-400 w-6">2.</span>
              Encuentra el <strong>primer múltiplo común</strong> (MCM)
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-purple-600 dark:text-purple-400 w-6">3.</span>
              Ese es tu <strong>denominador común</strong>
            </li>
          </ol>
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
