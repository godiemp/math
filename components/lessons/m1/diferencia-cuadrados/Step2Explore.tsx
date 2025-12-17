'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'discover' | 'pattern';

interface Example {
  id: string;
  expression: string;
  a: string;
  b: string;
  aSquared: string;
  bSquared: string;
  factored: string;
  hint: string;
}

const EXAMPLES: Example[] = [
  {
    id: 'numeric',
    expression: 'x² - 9',
    a: 'x',
    b: '3',
    aSquared: 'x²',
    bSquared: '9 = 3²',
    factored: '(x + 3)(x - 3)',
    hint: '¿Qué número al cuadrado da 9?',
  },
  {
    id: 'larger',
    expression: 'x² - 25',
    a: 'x',
    b: '5',
    aSquared: 'x²',
    bSquared: '25 = 5²',
    factored: '(x + 5)(x - 5)',
    hint: '¿Qué número al cuadrado da 25?',
  },
  {
    id: 'coefficient',
    expression: '4x² - 1',
    a: '2x',
    b: '1',
    aSquared: '4x² = (2x)²',
    bSquared: '1 = 1²',
    factored: '(2x + 1)(2x - 1)',
    hint: '¿Qué expresión al cuadrado da 4x²?',
  },
  {
    id: 'both-variables',
    expression: '9x² - 16y²',
    a: '3x',
    b: '4y',
    aSquared: '9x² = (3x)²',
    bSquared: '16y² = (4y)²',
    factored: '(3x + 4y)(3x - 4y)',
    hint: '¿Qué expresiones al cuadrado dan 9x² y 16y²?',
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
          Identifica la diferencia de cuadrados en cada expresión
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              Una <strong>diferencia de cuadrados</strong> tiene la forma <span className="font-mono text-blue-600">a² - b²</span>
            </p>

            {/* Visual explanation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="text-center space-y-4">
                <p className="text-gray-500 dark:text-gray-400">Para reconocerla, busca:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                    <div className="text-3xl mb-2">1️⃣</div>
                    <p className="font-semibold text-blue-700 dark:text-blue-300">Dos términos</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">La expresión tiene exactamente dos términos</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                    <div className="text-3xl mb-2">2️⃣</div>
                    <p className="font-semibold text-purple-700 dark:text-purple-300">Ambos son cuadrados</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cada término es un cuadrado perfecto</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                    <div className="text-3xl mb-2">3️⃣</div>
                    <p className="font-semibold text-green-700 dark:text-green-300">Signo negativo</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Los términos están restando</p>
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
                Identifica los cuadrados:
              </p>
              <div className="flex justify-center gap-8 flex-wrap">
                <div className="text-center">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-blue-200 dark:border-blue-600 mb-2">
                    <span className="font-mono text-xl text-blue-600">{example.aSquared}</span>
                  </div>
                  <p className="text-sm text-gray-500">a = <span className="font-mono text-blue-600 font-bold">{example.a}</span></p>
                </div>
                <div className="flex items-center text-2xl text-gray-400 font-bold">−</div>
                <div className="text-center">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-purple-200 dark:border-purple-600 mb-2">
                    <span className="font-mono text-xl text-purple-600">{example.bSquared}</span>
                  </div>
                  <p className="text-sm text-gray-500">b = <span className="font-mono text-purple-600 font-bold">{example.b}</span></p>
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
                  Aplicamos: <span className="font-mono">a² - b² = (a + b)(a - b)</span>
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
                    <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                      (<span className="text-blue-600">{example.a}</span>)² - (<span className="text-purple-600">{example.b}</span>)²
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                      = (<span className="text-blue-600">{example.a}</span> + <span className="text-purple-600">{example.b}</span>)(<span className="text-blue-600">{example.a}</span> - <span className="text-purple-600">{example.b}</span>)
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
              Pasos para Factorizar una Diferencia de Cuadrados
            </h3>

            {/* Steps */}
            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Verifica que es una diferencia de cuadrados</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dos términos, ambos cuadrados perfectos, con signo negativo entre ellos</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Identifica a y b</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Encuentra la raíz cuadrada de cada término</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Aplica la fórmula</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">a² - b² = (a + b)(a - b)</p>
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
