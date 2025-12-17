'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'discover' | 'pattern';

interface GroupingExample {
  id: string;
  expression: string;
  terms: string[];
  group1: string;
  group2: string;
  factor1: string;
  factor2: string;
  commonFactor: string;
  result: string;
  hint: string;
}

const EXAMPLES: GroupingExample[] = [
  {
    id: 'simple',
    expression: 'ax + ay + bx + by',
    terms: ['ax', 'ay', 'bx', 'by'],
    group1: '(ax + ay)',
    group2: '(bx + by)',
    factor1: 'a(x + y)',
    factor2: 'b(x + y)',
    commonFactor: '(x + y)',
    result: '(x + y)(a + b)',
    hint: 'Agrupa los primeros dos términos (que tienen "a") y los últimos dos (que tienen "b")',
  },
  {
    id: 'numbers',
    expression: '2x + 2y + 3x + 3y',
    terms: ['2x', '2y', '3x', '3y'],
    group1: '(2x + 2y)',
    group2: '(3x + 3y)',
    factor1: '2(x + y)',
    factor2: '3(x + y)',
    commonFactor: '(x + y)',
    result: '(x + y)(2 + 3) = 5(x + y)',
    hint: 'Agrupa los términos con 2 y los términos con 3',
  },
  {
    id: 'squared',
    expression: 'x² + 2x + 3x + 6',
    terms: ['x²', '2x', '3x', '6'],
    group1: '(x² + 2x)',
    group2: '(3x + 6)',
    factor1: 'x(x + 2)',
    factor2: '3(x + 2)',
    commonFactor: '(x + 2)',
    result: '(x + 2)(x + 3)',
    hint: 'Del primer grupo sacamos x, del segundo sacamos 3',
  },
  {
    id: 'negative',
    expression: 'x² - 3x + 2x - 6',
    terms: ['x²', '-3x', '2x', '-6'],
    group1: '(x² - 3x)',
    group2: '(2x - 6)',
    factor1: 'x(x - 3)',
    factor2: '2(x - 3)',
    commonFactor: '(x - 3)',
    result: '(x - 3)(x + 2)',
    hint: '¡Cuidado con los signos! El factor común tiene un signo negativo',
  },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentExample, setCurrentExample] = useState(0);
  const [discoveredExamples, setDiscoveredExamples] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showFactorResult, setShowFactorResult] = useState(false);
  const [showStep, setShowStep] = useState(0);

  const example = EXAMPLES[currentExample];

  const handleDiscoverExample = () => {
    if (showStep < 4) {
      setShowStep(showStep + 1);
    } else {
      if (!discoveredExamples.includes(example.id)) {
        setDiscoveredExamples([...discoveredExamples, example.id]);
      }
      setShowFactorResult(true);
    }
  };

  const handleNextExample = () => {
    if (currentExample < EXAMPLES.length - 1) {
      setCurrentExample(currentExample + 1);
      setShowHint(false);
      setShowFactorResult(false);
      setShowStep(0);
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
          Aprende a factorizar agrupando términos de a pares
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              Para factorizar por agrupación, seguimos <strong className="text-purple-600">4 pasos</strong>:
            </p>

            {/* Visual explanation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="text-center space-y-4">
                {/* Step 1 */}
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <div className="text-2xl mb-2">1️⃣</div>
                  <p className="font-semibold text-blue-700 dark:text-blue-300">Agrupa de a pares</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Forma dos grupos con paréntesis
                  </p>
                </div>

                <div className="text-gray-400">↓</div>

                {/* Step 2 */}
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                  <div className="text-2xl mb-2">2️⃣</div>
                  <p className="font-semibold text-purple-700 dark:text-purple-300">
                    Saca factor común del primer grupo
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Extrae lo que se repite en los primeros dos términos
                  </p>
                </div>

                <div className="text-gray-400">↓</div>

                {/* Step 3 */}
                <div className="bg-teal-50 dark:bg-teal-900/30 rounded-lg p-4">
                  <div className="text-2xl mb-2">3️⃣</div>
                  <p className="font-semibold text-teal-700 dark:text-teal-300">
                    Saca factor común del segundo grupo
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Extrae lo que se repite en los últimos dos términos
                  </p>
                </div>

                <div className="text-gray-400">↓</div>

                {/* Step 4 */}
                <div className="bg-pink-50 dark:bg-pink-900/30 rounded-lg p-4">
                  <div className="text-2xl mb-2">4️⃣</div>
                  <p className="font-semibold text-pink-700 dark:text-pink-300">
                    Saca el factor común final
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Si los paréntesis son iguales, ese es tu factor común final
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
              <p className="text-gray-500 dark:text-gray-400 mb-2">Factoriza por agrupación:</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {example.expression}
              </p>
            </div>

            {/* Terms breakdown */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 text-center">
                Los 4 términos:
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                {example.terms.map((term, i) => (
                  <div
                    key={i}
                    className={cn(
                      'bg-white dark:bg-gray-800 rounded-lg px-4 py-2 border-2 text-center font-mono font-bold',
                      i < 2
                        ? 'border-blue-200 dark:border-blue-600 text-blue-600'
                        : 'border-purple-200 dark:border-purple-600 text-purple-600'
                    )}
                  >
                    {term}
                  </div>
                ))}
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

            {/* Step by step reveal */}
            {!showFactorResult && (
              <div className="space-y-4">
                {/* Progressive steps */}
                {showStep >= 1 && (
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 animate-fadeIn">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Paso 1: Agrupar</p>
                    <p className="font-mono text-lg text-blue-600 text-center">
                      {example.group1} + {example.group2}
                    </p>
                  </div>
                )}

                {showStep >= 2 && (
                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3 animate-fadeIn">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Paso 2: Factor común del grupo 1</p>
                    <p className="font-mono text-lg text-purple-600 text-center">{example.factor1}</p>
                  </div>
                )}

                {showStep >= 3 && (
                  <div className="bg-teal-50 dark:bg-teal-900/30 rounded-lg p-3 animate-fadeIn">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Paso 3: Factor común del grupo 2</p>
                    <p className="font-mono text-lg text-teal-600 text-center">{example.factor2}</p>
                  </div>
                )}

                {showStep >= 4 && (
                  <div className="bg-pink-50 dark:bg-pink-900/30 rounded-lg p-3 animate-fadeIn">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Paso 4: Factor común final</p>
                    <p className="text-center mb-2">
                      <span className="font-mono text-purple-600">{example.factor1}</span>
                      <span className="text-gray-400 mx-2">+</span>
                      <span className="font-mono text-teal-600">{example.factor2}</span>
                    </p>
                    <p className="text-sm text-gray-500 text-center">
                      Ambos tienen <span className="font-mono font-bold text-pink-600">{example.commonFactor}</span> como factor
                    </p>
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    onClick={handleDiscoverExample}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
                  >
                    {showStep < 4 ? 'Ver siguiente paso' : 'Confirmar'}
                  </button>
                </div>
              </div>
            )}

            {/* Result */}
            {showFactorResult && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
                  <div className="text-center space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Factor común: <span className="font-mono font-bold text-pink-600">{example.commonFactor}</span>
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <span className="font-mono text-xl text-gray-700 dark:text-gray-300">
                        {example.expression}
                      </span>
                      <span className="text-gray-400">=</span>
                      <span className="font-mono text-2xl font-bold text-green-600">
                        {example.result}
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
              Factorización por Agrupación
            </h3>

            {/* Formula */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-3">Fórmula general:</p>
              <p className="font-mono text-2xl text-purple-600 font-bold">
                ab + ac + db + dc = (a + d)(b + c)
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Agrupa de a pares</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    (ab + ac) + (db + dc)
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Saca factor común de cada grupo</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    a(b + c) + d(b + c)
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Extrae el factor común binomial</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    (b + c)(a + d)
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
                    <span className="font-mono text-sm text-gray-700 dark:text-gray-300">{ex.expression}</span>
                    <span className="text-gray-400">=</span>
                    <span className="font-mono font-bold text-green-600 text-sm">{ex.result}</span>
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
