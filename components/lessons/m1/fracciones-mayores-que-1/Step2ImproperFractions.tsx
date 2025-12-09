'use client';

import { useState } from 'react';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'explore' | 'discover' | 'summary';

// Multiple fraction bars component
function MultipleFractionBars({
  numerator,
  denominator,
  showLabel = true,
  color = 'blue',
}: {
  numerator: number;
  denominator: number;
  showLabel?: boolean;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}) {
  const wholeBars = Math.ceil(numerator / denominator);
  const displayBars = Math.max(wholeBars, 1);

  const colorClasses = {
    blue: {
      filled: 'bg-blue-500 dark:bg-blue-600',
      empty: 'bg-blue-100 dark:bg-blue-900/30',
      border: 'border-blue-700 dark:border-blue-400',
      text: 'text-blue-700 dark:text-blue-300',
      label: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200',
    },
    green: {
      filled: 'bg-green-500 dark:bg-green-600',
      empty: 'bg-green-100 dark:bg-green-900/30',
      border: 'border-green-700 dark:border-green-400',
      text: 'text-green-700 dark:text-green-300',
      label: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200',
    },
    purple: {
      filled: 'bg-purple-500 dark:bg-purple-600',
      empty: 'bg-purple-100 dark:bg-purple-900/30',
      border: 'border-purple-700 dark:border-purple-400',
      text: 'text-purple-700 dark:text-purple-300',
      label: 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200',
    },
    orange: {
      filled: 'bg-orange-500 dark:bg-orange-600',
      empty: 'bg-orange-100 dark:bg-orange-900/30',
      border: 'border-orange-700 dark:border-orange-400',
      text: 'text-orange-700 dark:text-orange-300',
      label: 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200',
    },
  };

  const colors = colorClasses[color];
  let remainingToFill = numerator;

  return (
    <div className="space-y-3">
      {showLabel && (
        <div className={cn('text-center font-bold text-2xl', colors.text)}>
          {numerator}/{denominator}
        </div>
      )}

      <div className="space-y-2">
        {Array.from({ length: displayBars }).map((_, barIndex) => {
          const segmentsToFill = Math.min(remainingToFill, denominator);
          remainingToFill -= segmentsToFill;

          return (
            <div key={barIndex} className="flex items-center gap-2">
              <div
                className={cn(
                  'relative flex-1 h-10 rounded-lg overflow-hidden border-2',
                  colors.border,
                )}
              >
                <div className="flex h-full">
                  {Array.from({ length: denominator }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'flex-1 h-full transition-all duration-300',
                        i < segmentsToFill ? colors.filled : colors.empty,
                        i > 0 && 'border-l',
                        colors.border,
                      )}
                    />
                  ))}
                </div>
              </div>
              <span
                className={cn(
                  'text-xs px-2 py-1 rounded-full font-medium',
                  colors.label,
                )}
              >
                {barIndex + 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Step2ImproperFractions({
  onComplete,
  isActive,
}: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [numerator, setNumerator] = useState(5);
  const [denominator, setDenominator] = useState(4);

  if (!isActive) return null;

  const handleNumeratorChange = (delta: number) => {
    const newValue = numerator + delta;
    if (newValue >= 0 && newValue <= 12) {
      setNumerator(newValue);
    }
  };

  const handleDenominatorChange = (delta: number) => {
    const newValue = denominator + delta;
    if (newValue >= 2 && newValue <= 6) {
      setDenominator(newValue);
    }
  };

  const wholeNumber = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;
  const isImproper = numerator >= denominator;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Fracciones Impropias
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Cuando el numerador es mayor o igual al denominador
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              En la lección anterior, vimos fracciones donde el numerador era{' '}
              <strong>menor</strong> que el denominador.
            </p>

            <div className="flex justify-center items-center gap-4 py-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  3/4
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Fracción propia
                </div>
              </div>
              <div className="text-2xl text-gray-400">→</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  5/4
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Fracción impropia
                </div>
              </div>
            </div>

            <div className="border-t border-blue-200 dark:border-blue-700 pt-4">
              <p className="text-purple-700 dark:text-purple-300 font-medium">
                Una <strong>fracción impropia</strong> tiene un numerador
                <br />
                mayor o igual al denominador.
              </p>
            </div>
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
            Fracciones Impropias
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¡Experimenta aumentando el numerador!
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-6">
          {/* Interactive controls */}
          <div className="flex justify-center items-center gap-8">
            {/* Numerator control */}
            <div className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Numerador
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNumeratorChange(-1)}
                  disabled={numerator <= 0}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                    numerator > 0
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 hover:bg-blue-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
                  )}
                >
                  <Minus size={20} />
                </button>
                <span className="text-4xl font-bold text-blue-600 dark:text-blue-400 w-12 text-center">
                  {numerator}
                </span>
                <button
                  onClick={() => handleNumeratorChange(1)}
                  disabled={numerator >= 12}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                    numerator < 12
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 hover:bg-blue-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
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
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Denominador
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDenominatorChange(-1)}
                  disabled={denominator <= 2}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                    denominator > 2
                      ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 hover:bg-purple-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
                  )}
                >
                  <Minus size={20} />
                </button>
                <span className="text-4xl font-bold text-purple-600 dark:text-purple-400 w-12 text-center">
                  {denominator}
                </span>
                <button
                  onClick={() => handleDenominatorChange(1)}
                  disabled={denominator >= 6}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                    denominator < 6
                      ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 hover:bg-purple-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed',
                  )}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Visual bars */}
          <div className="max-w-md mx-auto">
            <MultipleFractionBars
              numerator={numerator}
              denominator={denominator}
              showLabel={false}
              color="blue"
            />
          </div>

          {/* Dynamic insight */}
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold">
              <span className="text-blue-600 dark:text-blue-400">
                {numerator}
              </span>
              <span className="text-gray-400">/</span>
              <span className="text-purple-600 dark:text-purple-400">
                {denominator}
              </span>
              <span className="text-gray-400 mx-2">=</span>
              {numerator === 0 ? (
                <span className="text-gray-500">0</span>
              ) : wholeNumber > 0 ? (
                <span className="text-green-600 dark:text-green-400">
                  {wholeNumber}
                  {remainder > 0 && (
                    <span className="text-orange-600 dark:text-orange-400">
                      {' '}
                      {remainder}/{denominator}
                    </span>
                  )}
                </span>
              ) : (
                <span className="text-orange-600 dark:text-orange-400">
                  {numerator}/{denominator}
                </span>
              )}
            </div>

            <div
              className={cn(
                'inline-block px-4 py-2 rounded-full text-sm font-medium',
                isImproper
                  ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300'
                  : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
              )}
            >
              {numerator === 0
                ? 'Cero'
                : numerator === denominator
                  ? '¡Exactamente 1 entero!'
                  : isImproper
                    ? `¡Fracción impropia! = ${wholeNumber} ${remainder > 0 ? `entero${wholeNumber > 1 ? 's' : ''} y ${remainder}/${denominator}` : `entero${wholeNumber > 1 ? 's' : ''}`}`
                    : 'Fracción propia (menor que 1)'}
            </div>
          </div>
        </div>

        {/* Hint */}
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
            <strong>Experimenta:</strong> Aumenta el numerador más allá del
            denominador y observa cómo aparecen más barras.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('discover')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: DISCOVER ============
  if (phase === 'discover') {
    const examples = [
      { num: 4, den: 4, label: '4/4 = 1 entero exacto' },
      { num: 5, den: 4, label: '5/4 = 1 entero y 1/4' },
      { num: 8, den: 4, label: '8/4 = 2 enteros exactos' },
      { num: 9, den: 4, label: '9/4 = 2 enteros y 1/4' },
    ];

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Fracciones Impropias
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Patrones importantes
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-6 space-y-4">
          <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
            Observa estos ejemplos con denominador 4:
          </p>

          <div className="space-y-3">
            {examples.map((ex, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg"
              >
                <div className="w-20 text-center">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {ex.num}/{ex.den}
                  </span>
                </div>
                <div className="flex-1">
                  <MultipleFractionBars
                    numerator={ex.num}
                    denominator={ex.den}
                    showLabel={false}
                    color={ex.num === 4 || ex.num === 8 ? 'green' : 'orange'}
                  />
                </div>
                <div className="w-36 text-sm text-gray-600 dark:text-gray-300">
                  {ex.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key observation */}
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
          <p className="text-purple-800 dark:text-purple-200 text-center">
            <strong>Observación clave:</strong>
            <br />
            Cuando el numerador es{' '}
            <strong>múltiplo</strong> del denominador,
            <br />
            obtienes <strong>enteros exactos</strong> (4/4 = 1, 8/4 = 2, etc.)
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('summary')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
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
          Fracciones Impropias
        </h2>
        <p className="text-gray-600 dark:text-gray-300">Lo que aprendimos</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              1
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Una <strong className="text-orange-600 dark:text-orange-400">fracción impropia</strong>{' '}
              tiene el numerador mayor o igual al denominador.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              2
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Las fracciones impropias valen{' '}
              <strong>1 o más</strong>.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              3
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Se pueden representar con{' '}
              <strong>múltiples barras</strong> o unidades.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              4
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Hay otra forma de escribirlas:{' '}
              <strong className="text-green-600 dark:text-green-400">números mixtos</strong>.
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
