'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'discover' | 'pattern';

interface FactorPart {
  id: string;
  expression: string;
  terms: { coefficient: number; variables: string }[];
  commonFactor: string;
  factored: string;
  hint: string;
}

const EXAMPLES: FactorPart[] = [
  {
    id: 'numeric',
    expression: '6x + 12',
    terms: [
      { coefficient: 6, variables: 'x' },
      { coefficient: 12, variables: '' },
    ],
    commonFactor: '6',
    factored: '6(x + 2)',
    hint: '¿Qué número divide a 6 y a 12?',
  },
  {
    id: 'variable',
    expression: 'x² + x',
    terms: [
      { coefficient: 1, variables: 'x²' },
      { coefficient: 1, variables: 'x' },
    ],
    commonFactor: 'x',
    factored: 'x(x + 1)',
    hint: '¿Qué variable aparece en ambos términos?',
  },
  {
    id: 'combined',
    expression: '4x² + 8x',
    terms: [
      { coefficient: 4, variables: 'x²' },
      { coefficient: 8, variables: 'x' },
    ],
    commonFactor: '4x',
    factored: '4x(x + 2)',
    hint: '¿Hay un número Y una variable en común?',
  },
  {
    id: 'three-terms',
    expression: '3x³ + 6x² + 9x',
    terms: [
      { coefficient: 3, variables: 'x³' },
      { coefficient: 6, variables: 'x²' },
      { coefficient: 9, variables: 'x' },
    ],
    commonFactor: '3x',
    factored: '3x(x² + 2x + 3)',
    hint: 'Busca el MCD de los coeficientes y la menor potencia de x',
  },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentExample, setCurrentExample] = useState(0);
  const [discoveredExamples, setDiscoveredExamples] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [selectedFactor, setSelectedFactor] = useState<string | null>(null);
  const [showFactorResult, setShowFactorResult] = useState(false);

  const example = EXAMPLES[currentExample];
  const allDiscovered = discoveredExamples.length === EXAMPLES.length;

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
      setSelectedFactor(null);
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
          Encuentra el factor común en cada expresión
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              Para factorizar por factor común, debemos encontrar qué tienen en común <strong>TODOS</strong> los términos.
            </p>

            {/* Visual explanation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="text-center space-y-4">
                <p className="text-gray-500 dark:text-gray-400">El factor común puede ser:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                    <div className="text-3xl mb-2">🔢</div>
                    <p className="font-semibold text-blue-700 dark:text-blue-300">Un número</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">6x + 12 = 6(x + 2)</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                    <div className="text-3xl mb-2">📐</div>
                    <p className="font-semibold text-purple-700 dark:text-purple-300">Una variable</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">x² + x = x(x + 1)</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                    <div className="text-3xl mb-2">✨</div>
                    <p className="font-semibold text-green-700 dark:text-green-300">Ambos</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">4x² + 8x = 4x(x + 2)</p>
                  </div>
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
                {example.expression}
              </p>
            </div>

            {/* Interactive breakdown */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 text-center">
                Descomposición de términos:
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                {example.terms.map((term, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {i > 0 && <span className="text-gray-400 text-xl">+</span>}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-gray-200 dark:border-gray-600">
                      <span className="font-mono text-xl">
                        <span className="text-amber-600">{term.coefficient}</span>
                        <span className="text-purple-600">{term.variables}</span>
                      </span>
                    </div>
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

            {/* Factor selection */}
            {!showFactorResult && (
              <div className="space-y-4">
                <p className="text-center text-gray-600 dark:text-gray-400">
                  El factor común es: <span className="font-mono font-bold text-amber-600">{example.commonFactor}</span>
                </p>
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
                    <p className="text-gray-600 dark:text-gray-400">
                      Factor común: <span className="font-mono font-bold text-amber-600 text-xl">{example.commonFactor}</span>
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <span className="font-mono text-xl text-gray-700 dark:text-gray-300">{example.expression}</span>
                      <span className="text-gray-400">=</span>
                      <span className="font-mono text-2xl font-bold text-green-600">{example.factored}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleNextExample}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
                  >
                    <span>{currentExample < EXAMPLES.length - 1 ? 'Siguiente ejemplo' : 'Ver resumen'}</span>
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
              Pasos para Factorizar por Factor Común
            </h3>

            {/* Steps */}
            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Identifica los términos</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Separa la expresión en sus términos individuales</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Encuentra el MCD de coeficientes</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">El mayor número que divide a todos los coeficientes</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Identifica variables comunes</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">La menor potencia de cada variable que aparece en todos los términos</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Extrae y simplifica</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Saca el factor común y divide cada término entre él</p>
                </div>
              </div>
            </div>

            {/* Summary of all examples */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">Ejemplos trabajados:</h4>
              <div className="space-y-2">
                {EXAMPLES.map((ex) => (
                  <div
                    key={ex.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <span className="font-mono text-gray-700 dark:text-gray-300">{ex.expression}</span>
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
