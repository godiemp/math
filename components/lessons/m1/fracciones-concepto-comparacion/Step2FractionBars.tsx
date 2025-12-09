'use client';

import { useState } from 'react';
import { ArrowRight, Plus, Minus, Equal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'explore' | 'equivalent' | 'summary';

// Interactive fraction bar component
function FractionBar({
  denominator,
  numerator,
  showLabel = true,
  highlight = true,
  color = 'blue',
  className = '',
}: {
  denominator: number;
  numerator: number;
  showLabel?: boolean;
  highlight?: boolean;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  className?: string;
}) {
  const colorClasses = {
    blue: {
      filled: 'bg-blue-500 dark:bg-blue-600',
      empty: 'bg-blue-100 dark:bg-blue-900/30',
      border: 'border-blue-700 dark:border-blue-400',
      text: 'text-blue-700 dark:text-blue-300',
    },
    green: {
      filled: 'bg-green-500 dark:bg-green-600',
      empty: 'bg-green-100 dark:bg-green-900/30',
      border: 'border-green-700 dark:border-green-400',
      text: 'text-green-700 dark:text-green-300',
    },
    purple: {
      filled: 'bg-purple-500 dark:bg-purple-600',
      empty: 'bg-purple-100 dark:bg-purple-900/30',
      border: 'border-purple-700 dark:border-purple-400',
      text: 'text-purple-700 dark:text-purple-300',
    },
    orange: {
      filled: 'bg-orange-500 dark:bg-orange-600',
      empty: 'bg-orange-100 dark:bg-orange-900/30',
      border: 'border-orange-700 dark:border-orange-400',
      text: 'text-orange-700 dark:text-orange-300',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className={cn('space-y-2', className)}>
      {showLabel && (
        <div className={cn('text-center font-bold text-xl', colors.text)}>
          {numerator}/{denominator}
        </div>
      )}
      <div className={cn(
        'relative w-full h-10 rounded-lg overflow-hidden border-2',
        colors.border
      )}>
        <div className="flex h-full">
          {Array.from({ length: denominator }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 h-full transition-all duration-300',
                highlight && i < numerator ? colors.filled : colors.empty,
                i > 0 && 'border-l',
                colors.border
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Step2FractionBars({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [numerator, setNumerator] = useState(1);
  const [denominator, setDenominator] = useState(4);
  const [showEquivalent, setShowEquivalent] = useState(false);

  if (!isActive) return null;

  const handleNumeratorChange = (delta: number) => {
    const newValue = numerator + delta;
    if (newValue >= 0 && newValue <= denominator) {
      setNumerator(newValue);
    }
  };

  const handleDenominatorChange = (delta: number) => {
    const newValue = denominator + delta;
    if (newValue >= 2 && newValue <= 8) {
      setDenominator(newValue);
      // Adjust numerator if needed
      if (numerator > newValue) {
        setNumerator(newValue);
      }
    }
  };

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Barra de Fracciones
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Exploremos cómo funcionan las fracciones
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Una fracción tiene <strong>dos partes</strong>:
            </p>

            <div className="flex justify-center items-center gap-8 py-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">3</div>
                <div className="h-1 w-16 bg-gray-400 dark:bg-gray-500 mx-auto my-2"></div>
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">4</div>
              </div>

              <div className="text-left space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">Numerador:</span>
                  <span className="text-gray-700 dark:text-gray-300">partes que tienes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">Denominador:</span>
                  <span className="text-gray-700 dark:text-gray-300">partes totales</span>
                </div>
              </div>
            </div>

            <FractionBar denominator={4} numerator={3} color="blue" />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('explore')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Explorar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: EXPLORE ============
  if (phase === 'explore') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Barra de Fracciones
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Experimenta cambiando los números!
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-6">
          {/* Interactive controls */}
          <div className="flex justify-center items-center gap-8">
            {/* Numerator control */}
            <div className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Numerador</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNumeratorChange(-1)}
                  disabled={numerator <= 0}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                    numerator > 0
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 hover:bg-blue-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  )}
                >
                  <Minus size={20} />
                </button>
                <span className="text-4xl font-bold text-blue-600 dark:text-blue-400 w-12 text-center">
                  {numerator}
                </span>
                <button
                  onClick={() => handleNumeratorChange(1)}
                  disabled={numerator >= denominator}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                    numerator < denominator
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 hover:bg-blue-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  )}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Fraction line */}
            <div className="h-1 w-16 bg-gray-400 dark:bg-gray-500 self-center mt-6"></div>

            {/* Denominator control */}
            <div className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Denominador</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDenominatorChange(-1)}
                  disabled={denominator <= 2}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                    denominator > 2
                      ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 hover:bg-purple-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  )}
                >
                  <Minus size={20} />
                </button>
                <span className="text-4xl font-bold text-purple-600 dark:text-purple-400 w-12 text-center">
                  {denominator}
                </span>
                <button
                  onClick={() => handleDenominatorChange(1)}
                  disabled={denominator >= 8}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                    denominator < 8
                      ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 hover:bg-purple-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  )}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Visual bar */}
          <div className="max-w-md mx-auto">
            <FractionBar
              denominator={denominator}
              numerator={numerator}
              showLabel={false}
              color="blue"
            />
          </div>

          {/* Dynamic insight */}
          <div className="text-center text-gray-700 dark:text-gray-300">
            <span className="font-bold text-blue-600 dark:text-blue-400">{numerator}</span>
            {' '}de{' '}
            <span className="font-bold text-purple-600 dark:text-purple-400">{denominator}</span>
            {' '}partes = {' '}
            <span className="font-bold text-lg">
              {numerator === 0 ? 'nada' :
               numerator === denominator ? 'todo el entero' :
               numerator === 1 && denominator === 2 ? 'la mitad' :
               `${numerator}/${denominator} del entero`}
            </span>
          </div>
        </div>

        {/* Hint */}
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
            <strong>Experimenta:</strong> Aumenta el denominador y observa cómo las partes se hacen más pequeñas.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('equivalent')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: EQUIVALENT ============
  if (phase === 'equivalent') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Fracciones Equivalentes
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Diferentes fracciones pueden representar lo mismo!
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-6 space-y-4">
          <p className="text-center text-gray-700 dark:text-gray-300">
            Observa estas dos fracciones:
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <FractionBar denominator={2} numerator={1} color="blue" />
            <FractionBar denominator={4} numerator={2} color="green" />
          </div>

          <button
            onClick={() => setShowEquivalent(true)}
            className={cn(
              'mx-auto flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all',
              showEquivalent
                ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                : 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 hover:bg-purple-200'
            )}
          >
            {showEquivalent ? (
              <>
                <Equal size={20} />
                <span>¡Son iguales!</span>
              </>
            ) : (
              <span>¿Son iguales?</span>
            )}
          </button>

          {showEquivalent && (
            <div className="animate-fadeIn space-y-4">
              <div className="flex items-center justify-center gap-4 text-2xl font-bold">
                <span className="text-blue-600 dark:text-blue-400">1/2</span>
                <span className="text-gray-500">=</span>
                <span className="text-green-600 dark:text-green-400">2/4</span>
              </div>

              <p className="text-center text-gray-700 dark:text-gray-300 text-sm">
                Ambas representan <strong>la mitad</strong> del entero.
                <br />
                Son <strong>fracciones equivalentes</strong>.
              </p>

              {/* More examples */}
              <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto pt-2">
                <FractionBar denominator={2} numerator={1} color="blue" className="text-sm" />
                <FractionBar denominator={4} numerator={2} color="green" className="text-sm" />
                <FractionBar denominator={8} numerator={4} color="purple" className="text-sm" />
              </div>
              <p className="text-center text-purple-700 dark:text-purple-300 text-sm">
                1/2 = 2/4 = 4/8 = ... ¡Todas son la mitad!
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('summary')}
            disabled={!showEquivalent}
            className={cn(
              'flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all',
              showEquivalent
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Barra de Fracciones
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Lo que aprendimos
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
            <p className="text-gray-700 dark:text-gray-300">
              El <strong className="text-purple-600 dark:text-purple-400">denominador</strong> dice en cuántas partes iguales se divide el entero.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
            <p className="text-gray-700 dark:text-gray-300">
              El <strong className="text-blue-600 dark:text-blue-400">numerador</strong> dice cuántas partes tomamos.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Mayor denominador = partes más pequeñas</strong>
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
            <p className="text-gray-700 dark:text-gray-300">
              Fracciones diferentes pueden representar la misma cantidad (<strong>equivalentes</strong>).
            </p>
          </div>
        </div>
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
