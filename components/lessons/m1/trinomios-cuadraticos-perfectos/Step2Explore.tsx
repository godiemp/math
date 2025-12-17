'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles, Check, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

interface Example {
  trinomial: { a2: string; middle: string; b2: string };
  a: string;
  b: string;
  sign: '+' | '-';
  result: string;
}

const EXAMPLES: Example[] = [
  {
    trinomial: { a2: 'x²', middle: '+ 6x', b2: '+ 9' },
    a: 'x',
    b: '3',
    sign: '+',
    result: '(x + 3)²',
  },
  {
    trinomial: { a2: '4x²', middle: '- 12x', b2: '+ 9' },
    a: '2x',
    b: '3',
    sign: '-',
    result: '(2x - 3)²',
  },
  {
    trinomial: { a2: '9a²', middle: '+ 30ab', b2: '+ 25b²' },
    a: '3a',
    b: '5b',
    sign: '+',
    result: '(3a + 5b)²',
  },
  {
    trinomial: { a2: '16x⁴', middle: '- 24x²y', b2: '+ 9y²' },
    a: '4x²',
    b: '3y',
    sign: '-',
    result: '(4x² - 3y)²',
  },
];

type Phase = 'explore' | 'summary';

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('explore');
  const [currentExample, setCurrentExample] = useState(0);
  const [showSteps, setShowSteps] = useState<number[]>([]);

  const example = EXAMPLES[currentExample];

  const handleRevealStep = (step: number) => {
    if (!showSteps.includes(step)) {
      setShowSteps([...showSteps, step]);
    }
  };

  const handleNextExample = () => {
    if (currentExample < EXAMPLES.length - 1) {
      setCurrentExample(currentExample + 1);
      setShowSteps([]);
    } else {
      setPhase('summary');
    }
  };

  const handleReset = () => {
    setShowSteps([]);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'explore'
            ? `Ejemplo ${currentExample + 1} de ${EXAMPLES.length}: Identifica cómo factorizar`
            : 'Resumen del patrón descubierto'}
        </p>
      </div>

      {phase === 'explore' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Progress indicator */}
          <div className="flex justify-center gap-2">
            {EXAMPLES.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'w-3 h-3 rounded-full transition-all',
                  index === currentExample
                    ? 'bg-purple-500 scale-125'
                    : index < currentExample
                    ? 'bg-green-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                )}
              />
            ))}
          </div>

          {/* Trinomial to factor */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-4">
              Factoriza el trinomio:
            </p>
            <div className="flex justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl px-8 py-4 shadow-inner">
                <span className="font-mono text-2xl">
                  <span className="text-blue-600">{example.trinomial.a2}</span>{' '}
                  <span className="text-green-600">{example.trinomial.middle}</span>{' '}
                  <span className="text-purple-600">{example.trinomial.b2}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Interactive steps */}
          <div className="space-y-4">
            {/* Step 1: Identify a² */}
            <button
              onClick={() => handleRevealStep(1)}
              className={cn(
                'w-full p-4 rounded-xl text-left transition-all border-2',
                showSteps.includes(1)
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 cursor-pointer'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center font-bold',
                    showSteps.includes(1)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  1
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    {showSteps.includes(1) ? (
                      <>
                        Identificar <span className="text-blue-600 font-mono">a</span>:{' '}
                        <span className="font-mono">
                          <span className="text-blue-600">{example.trinomial.a2}</span> = (<span className="text-blue-600 font-bold">{example.a}</span>)²
                        </span>
                      </>
                    ) : (
                      'Paso 1: Identificar el primer cuadrado (a²) → ¿Qué es a?'
                    )}
                  </p>
                </div>
                {showSteps.includes(1) && <Check className="w-5 h-5 text-blue-500" />}
              </div>
            </button>

            {/* Step 2: Identify b² */}
            <button
              onClick={() => showSteps.includes(1) && handleRevealStep(2)}
              disabled={!showSteps.includes(1)}
              className={cn(
                'w-full p-4 rounded-xl text-left transition-all border-2',
                showSteps.includes(2)
                  ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700'
                  : showSteps.includes(1)
                  ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-400 cursor-pointer'
                  : 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-50 cursor-not-allowed'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center font-bold',
                    showSteps.includes(2)
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  2
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    {showSteps.includes(2) ? (
                      <>
                        Identificar <span className="text-purple-600 font-mono">b</span>:{' '}
                        <span className="font-mono">
                          <span className="text-purple-600">{example.trinomial.b2.replace(/^\+ /, '')}</span> = (<span className="text-purple-600 font-bold">{example.b}</span>)²
                        </span>
                      </>
                    ) : (
                      'Paso 2: Identificar el tercer término (b²) → ¿Qué es b?'
                    )}
                  </p>
                </div>
                {showSteps.includes(2) && <Check className="w-5 h-5 text-purple-500" />}
              </div>
            </button>

            {/* Step 3: Verify middle term */}
            <button
              onClick={() => showSteps.includes(2) && handleRevealStep(3)}
              disabled={!showSteps.includes(2)}
              className={cn(
                'w-full p-4 rounded-xl text-left transition-all border-2',
                showSteps.includes(3)
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700'
                  : showSteps.includes(2)
                  ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-400 cursor-pointer'
                  : 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-50 cursor-not-allowed'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center font-bold',
                    showSteps.includes(3)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  3
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    {showSteps.includes(3) ? (
                      <>
                        Verificar que el término medio sea <span className="text-green-600 font-mono">±2ab</span>:{' '}
                        <span className="font-mono">
                          2 · <span className="text-blue-600">{example.a}</span> · <span className="text-purple-600">{example.b}</span> = <span className="text-green-600 font-bold">{example.trinomial.middle.replace(/^[+-] /, '').replace(/^[+-]/, '')}</span> ✓
                        </span>
                      </>
                    ) : (
                      'Paso 3: Verificar que el término medio sea ±2ab'
                    )}
                  </p>
                </div>
                {showSteps.includes(3) && <Check className="w-5 h-5 text-green-500" />}
              </div>
            </button>

            {/* Step 4: Write result */}
            <button
              onClick={() => showSteps.includes(3) && handleRevealStep(4)}
              disabled={!showSteps.includes(3)}
              className={cn(
                'w-full p-4 rounded-xl text-left transition-all border-2',
                showSteps.includes(4)
                  ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700'
                  : showSteps.includes(3)
                  ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-amber-400 cursor-pointer'
                  : 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-50 cursor-not-allowed'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center font-bold',
                    showSteps.includes(4)
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  )}
                >
                  4
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    {showSteps.includes(4) ? (
                      <>
                        Escribir la factorización:{' '}
                        <span className="font-mono text-lg">
                          (<span className="text-blue-600">{example.a}</span>{' '}
                          <span className="text-amber-600">{example.sign}</span>{' '}
                          <span className="text-purple-600">{example.b}</span>)² ={' '}
                          <span className="font-bold text-amber-600">{example.result}</span>
                        </span>
                      </>
                    ) : (
                      'Paso 4: Escribir (a ± b)²'
                    )}
                  </p>
                </div>
                {showSteps.includes(4) && <Check className="w-5 h-5 text-amber-500" />}
              </div>
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            {showSteps.length > 0 && showSteps.length < 4 && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <RotateCcw size={16} />
                Reiniciar
              </button>
            )}
            {showSteps.includes(4) && (
              <button
                onClick={handleNextExample}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>{currentExample < EXAMPLES.length - 1 ? 'Siguiente ejemplo' : 'Ver resumen'}</span>
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}

      {phase === 'summary' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Pattern discovered */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-700">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-pink-500" />
              <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">
                ¡Patrón Descubierto!
              </h3>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
              <div className="text-center space-y-4">
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  Para factorizar un trinomio cuadrático perfecto:
                </p>
                <div className="space-y-3">
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                    <p className="font-mono text-lg">
                      <span className="text-blue-600">a²</span> + <span className="text-green-600">2ab</span> + <span className="text-purple-600">b²</span> = (<span className="text-blue-600">a</span> + <span className="text-purple-600">b</span>)²
                    </p>
                  </div>
                  <div className="bg-pink-50 dark:bg-pink-900/30 rounded-lg p-4">
                    <p className="font-mono text-lg">
                      <span className="text-blue-600">a²</span> - <span className="text-green-600">2ab</span> + <span className="text-purple-600">b²</span> = (<span className="text-blue-600">a</span> - <span className="text-purple-600">b</span>)²
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps summary */}
            <div className="space-y-3">
              <p className="font-semibold text-gray-700 dark:text-gray-300">Los 4 pasos:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Identificar <span className="font-mono text-blue-600">a</span> del primer término</span>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Identificar <span className="font-mono text-purple-600">b</span> del tercer término</span>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Verificar que el medio sea <span className="font-mono text-green-600">±2ab</span></span>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Escribir <span className="font-mono text-amber-600">(a ± b)²</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Key insight */}
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
            <p className="text-amber-800 dark:text-amber-200 text-center">
              <strong>Clave:</strong> El signo del término medio determina si es <span className="font-mono">(a + b)²</span> o <span className="font-mono">(a - b)²</span>
            </p>
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Continuar a la teoría</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
