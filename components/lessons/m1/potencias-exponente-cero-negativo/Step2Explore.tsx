'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'discover' | 'pattern';

interface Example {
  id: string;
  expression: string;
  steps: string[];
  result: string;
  hint: string;
}

const EXAMPLES: Example[] = [
  {
    id: 'e1',
    expression: '5⁰',
    steps: ['Cualquier número elevado a 0 es 1'],
    result: '1',
    hint: 'Recuerda: el patrón dice que a⁰ = 1 siempre',
  },
  {
    id: 'e2',
    expression: '3⁻¹',
    steps: ['3⁻¹ = 1/3¹', '= 1/3'],
    result: '1/3',
    hint: 'Un exponente negativo significa "uno dividido por"',
  },
  {
    id: 'e3',
    expression: '2⁻²',
    steps: ['2⁻² = 1/2²', '= 1/4'],
    result: '1/4',
    hint: 'Primero convierte a fracción, luego calcula la potencia',
  },
  {
    id: 'e4',
    expression: '10⁻³',
    steps: ['10⁻³ = 1/10³', '= 1/1000'],
    result: '1/1000',
    hint: '10³ = 1000, entonces 10⁻³ = 1/1000',
  },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentExample, setCurrentExample] = useState(0);
  const [discoveredExamples, setDiscoveredExamples] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const example = EXAMPLES[currentExample];

  const handleDiscoverExample = () => {
    if (!discoveredExamples.includes(example.id)) {
      setDiscoveredExamples([...discoveredExamples, example.id]);
    }
    setShowResult(true);
  };

  const handleNextExample = () => {
    if (currentExample < EXAMPLES.length - 1) {
      setCurrentExample(currentExample + 1);
      setShowHint(false);
      setShowResult(false);
    } else {
      setPhase('pattern');
    }
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Exploremos cómo funcionan los exponentes cero y negativos
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              Hay dos reglas fundamentales que vamos a descubrir:
            </p>

            {/* Rules overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 text-center border-2 border-green-200 dark:border-green-700">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">Exponente Cero</h3>
                <p className="font-mono text-2xl text-gray-800 dark:text-gray-200">a⁰ = 1</p>
                <p className="text-sm text-gray-500 mt-2">Cualquier número (excepto 0) elevado a 0 es 1</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 text-center border-2 border-purple-200 dark:border-purple-700">
                <div className="text-4xl mb-2">🔄</div>
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">Exponente Negativo</h3>
                <p className="font-mono text-2xl text-gray-800 dark:text-gray-200">a⁻ⁿ = 1/aⁿ</p>
                <p className="text-sm text-gray-500 mt-2">Un exponente negativo invierte la fracción</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setPhase('discover')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
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
                    ? 'bg-blue-500 text-white'
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
              <p className="text-gray-500 dark:text-gray-400 mb-2">Calcula:</p>
              <p className="font-mono text-4xl font-bold text-gray-800 dark:text-gray-200">
                {example.expression}
              </p>
            </div>

            {/* Hint button */}
            {!showResult && (
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

            {showHint && !showResult && (
              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 mb-4 animate-fadeIn border border-amber-200 dark:border-amber-700">
                <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
                  {example.hint}
                </p>
              </div>
            )}

            {!showResult && (
              <div className="flex justify-center">
                <button
                  onClick={handleDiscoverExample}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
                >
                  Ver resultado
                </button>
              </div>
            )}

            {showResult && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
                  <div className="text-center space-y-3">
                    <div className="space-y-2">
                      {example.steps.map((step, i) => (
                        <p key={i} className="font-mono text-gray-700 dark:text-gray-300">
                          {step}
                        </p>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-4 pt-2">
                      <span className="font-mono text-xl text-gray-700 dark:text-gray-300">
                        {example.expression}
                      </span>
                      <span className="text-gray-400">=</span>
                      <span className="font-mono text-3xl font-bold text-green-600">
                        {example.result}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleNextExample}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
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
              Resumen de las Reglas
            </h3>

            {/* Rules summary */}
            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Exponente Cero</p>
                  <p className="font-mono text-purple-600">a⁰ = 1</p>
                </div>
                <div className="text-sm text-gray-500">
                  Ej: 5⁰ = 1
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Exponente Negativo</p>
                  <p className="font-mono text-purple-600">a⁻ⁿ = 1/aⁿ</p>
                </div>
                <div className="text-sm text-gray-500">
                  Ej: 2⁻³ = 1/8
                </div>
              </div>
            </div>

            {/* Examples summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
                Ejemplos trabajados:
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {EXAMPLES.map((ex) => (
                  <div
                    key={ex.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <span className="font-mono text-gray-700 dark:text-gray-300">
                      {ex.expression}
                    </span>
                    <span className="text-gray-400">=</span>
                    <span className="font-mono font-bold text-green-600">{ex.result}</span>
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
