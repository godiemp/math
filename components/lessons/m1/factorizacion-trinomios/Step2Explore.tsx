'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'discover' | 'pattern';

interface TrinomialExample {
  id: string;
  trinomial: string;
  b: number;
  c: number;
  p: number;
  q: number;
  factored: string;
  hint: string;
}

const EXAMPLES: TrinomialExample[] = [
  {
    id: 'simple',
    trinomial: 'x² + 5x + 6',
    b: 5,
    c: 6,
    p: 2,
    q: 3,
    factored: '(x + 2)(x + 3)',
    hint: '¿Qué dos números suman 5 y multiplican 6?',
  },
  {
    id: 'larger',
    trinomial: 'x² + 9x + 20',
    b: 9,
    c: 20,
    p: 4,
    q: 5,
    factored: '(x + 4)(x + 5)',
    hint: 'Piensa en los factores de 20 que sumen 9',
  },
  {
    id: 'negative-c',
    trinomial: 'x² + 2x - 15',
    b: 2,
    c: -15,
    p: 5,
    q: -3,
    factored: '(x + 5)(x - 3)',
    hint: 'Necesitas números que multipliquen -15 (uno positivo, uno negativo)',
  },
  {
    id: 'negative-b',
    trinomial: 'x² - 7x + 12',
    b: -7,
    c: 12,
    p: -3,
    q: -4,
    factored: '(x - 3)(x - 4)',
    hint: 'Ambos números deben ser negativos (para sumar -7 y multiplicar +12)',
  },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentExample, setCurrentExample] = useState(0);
  const [discoveredExamples, setDiscoveredExamples] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showFactorResult, setShowFactorResult] = useState(false);

  const example = EXAMPLES[currentExample];

  const handleDiscoverExample = () => {
    if (!discoveredExamples.includes(example.id)) {
      setDiscoveredExamples([...discoveredExamples, example.id]);
    }
    setShowFactorResult(true);
  };

  const handleNextExample = () => {
    if (currentExample < EXAMPLES.length - 1) {
      setCurrentExample(currentExample + 1);
      setShowHint(false);
      setShowFactorResult(false);
    } else {
      setPhase('pattern');
    }
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
          Encuentra los números que factorizan cada trinomio
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              Para factorizar <strong>x² + bx + c</strong>, buscamos dos números <strong>p</strong> y{' '}
              <strong>q</strong> tales que:
            </p>

            {/* Visual explanation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="text-center space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4">
                    <div className="text-3xl mb-2">➕</div>
                    <p className="font-semibold text-amber-700 dark:text-amber-300">p + q = b</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Suman el coeficiente de x
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                    <div className="text-3xl mb-2">✖️</div>
                    <p className="font-semibold text-green-700 dark:text-green-300">p × q = c</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Multiplican el término independiente
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Entonces:</p>
                  <p className="font-mono text-xl text-purple-600 font-bold">
                    x² + bx + c = (x + p)(x + q)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setPhase('discover')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
            >
              <span>Practicar con ejemplos</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {phase === 'discover' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Progress */}
          <div className="flex justify-center gap-2">
            {EXAMPLES.map((ex, i) => (
              <div
                key={ex.id}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                  discoveredExamples.includes(ex.id)
                    ? 'bg-green-500 text-white'
                    : i === currentExample
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                )}
              >
                {discoveredExamples.includes(ex.id) ? <Check size={18} /> : i + 1}
              </div>
            ))}
          </div>

          {/* Example card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Factoriza:</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {example.trinomial}
              </p>
            </div>

            {/* Interactive breakdown */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 text-center">
                Identifica los valores:
              </p>
              <div className="flex justify-center gap-6 flex-wrap">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-amber-200 dark:border-amber-600 text-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">b =</span>
                  <span className="font-mono text-xl text-amber-600 font-bold ml-2">{example.b}</span>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-green-200 dark:border-green-600 text-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">c =</span>
                  <span className="font-mono text-xl text-green-600 font-bold ml-2">{example.c}</span>
                </div>
              </div>
            </div>

            {/* Hint button */}
            {!showFactorResult && (
              <div className="text-center mb-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 mx-auto text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400"
                >
                  <Lightbulb size={16} />
                  <span>{showHint ? 'Ocultar pista' : 'Ver pista'}</span>
                </button>
              </div>
            )}

            {showHint && !showFactorResult && (
              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 mb-4 animate-fadeIn border border-amber-200 dark:border-amber-700">
                <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
                  {example.hint}
                </p>
              </div>
            )}

            {/* Factor selection */}
            {!showFactorResult && (
              <div className="space-y-4">
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Los números son: <span className="font-mono font-bold text-purple-600">{example.p}</span> y{' '}
                  <span className="font-mono font-bold text-purple-600">{example.q}</span>
                </p>
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    {example.p} + {example.q} = {example.b} ✓
                  </p>
                  <p>
                    {example.p} × {example.q} = {example.c} ✓
                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleDiscoverExample}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
                  >
                    Ver factorización
                  </button>
                </div>
              </div>
            )}

            {/* Result */}
            {showFactorResult && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
                  <div className="text-center space-y-3">
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>
                        p = <span className="font-mono font-bold text-purple-600">{example.p}</span>
                      </span>
                      <span>
                        q = <span className="font-mono font-bold text-purple-600">{example.q}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <span className="font-mono text-xl text-gray-700 dark:text-gray-300">
                        {example.trinomial}
                      </span>
                      <span className="text-gray-400">=</span>
                      <span className="font-mono text-2xl font-bold text-green-600">
                        {example.factored}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleNextExample}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
                  >
                    <span>
                      {currentExample < EXAMPLES.length - 1 ? 'Siguiente ejemplo' : 'Ver resumen'}
                    </span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {phase === 'pattern' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="text-lg font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
              Pasos para Factorizar x² + bx + c
            </h3>

            {/* Steps */}
            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Identifica b y c</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    b es el coeficiente de x, c es el término independiente
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Busca p y q</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Dos números que <strong>sumen b</strong> y <strong>multipliquen c</strong>
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    Considera los signos
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Si c &gt; 0: ambos signos iguales. Si c &lt; 0: signos diferentes
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Escribe la factorización</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    (x + p)(x + q) - recuerda usar - si p o q son negativos
                  </p>
                </div>
              </div>
            </div>

            {/* Summary of all examples */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
                Ejemplos trabajados:
              </h4>
              <div className="space-y-2">
                {EXAMPLES.map((ex) => (
                  <div
                    key={ex.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <span className="font-mono text-gray-700 dark:text-gray-300">{ex.trinomial}</span>
                    <span className="text-gray-400">=</span>
                    <span className="font-mono font-bold text-green-600">{ex.factored}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
