'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'discover' | 'pattern';

interface RootExample {
  id: string;
  index: number;
  radicand: number;
  symbol: string;
  expanded: string;
  result: number;
  hint: string;
}

const EXAMPLES: RootExample[] = [
  {
    id: 'square',
    index: 2,
    radicand: 36,
    symbol: '√36',
    expanded: '6 × 6 = 36',
    result: 6,
    hint: 'Busca qué número multiplicado por sí mismo da 36',
  },
  {
    id: 'cube',
    index: 3,
    radicand: 8,
    symbol: '∛8',
    expanded: '2 × 2 × 2 = 8',
    result: 2,
    hint: 'Busca qué número multiplicado 3 veces da 8',
  },
  {
    id: 'fourth',
    index: 4,
    radicand: 81,
    symbol: '⁴√81',
    expanded: '3 × 3 × 3 × 3 = 81',
    result: 3,
    hint: 'Busca qué número multiplicado 4 veces da 81',
  },
  {
    id: 'fifth',
    index: 5,
    radicand: 32,
    symbol: '⁵√32',
    expanded: '2 × 2 × 2 × 2 × 2 = 32',
    result: 2,
    hint: 'Busca qué número multiplicado 5 veces da 32',
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
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explora cómo funcionan las raíces enésimas
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              Una raíz tiene dos partes: el <strong>índice</strong> y el <strong>radicando</strong>.
            </p>

            {/* Visual explanation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="text-center space-y-6">
                <div className="flex justify-center items-center gap-2">
                  <sup className="text-2xl font-bold text-purple-600">n</sup>
                  <span className="text-5xl font-bold text-blue-600">√</span>
                  <span className="text-4xl font-bold text-green-600">a</span>
                </div>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                    <p className="font-semibold text-purple-700 dark:text-purple-300 mb-1">Índice (n)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Cuántas veces se multiplica el resultado
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                    <p className="font-semibold text-green-700 dark:text-green-300 mb-1">Radicando (a)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      El número del que buscamos la raíz
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 max-w-md mx-auto">
                  <p className="font-mono text-lg">
                    <sup className="text-purple-600">3</sup><span className="text-blue-600">√</span><span className="text-green-600">27</span> = <span className="text-amber-600 font-bold">3</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    porque 3 × 3 × 3 = 27 (3 multiplicado 3 veces)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setPhase('discover')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
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
                    ? 'bg-purple-500 text-white'
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
              <div className="flex justify-center items-center">
                {example.index > 3 && (
                  <sup className="text-2xl font-bold text-purple-600">{example.index}</sup>
                )}
                <span className="text-5xl font-bold text-blue-600">
                  {example.index === 3 ? '∛' : '√'}
                </span>
                <span className="text-4xl font-bold text-green-600">{example.radicand}</span>
              </div>
              {example.index > 3 && (
                <p className="text-sm text-gray-500 mt-2">
                  (raíz {example.index === 4 ? 'cuarta' : 'quinta'})
                </p>
              )}
            </div>

            {/* Interactive breakdown */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 text-center">
                Piensa: ¿qué número multiplicado {example.index} veces da {example.radicand}?
              </p>
              <div className="flex justify-center items-center gap-2 flex-wrap">
                <span className="font-mono text-xl text-amber-600">?</span>
                {Array.from({ length: example.index - 1 }).map((_, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className="text-gray-400 text-xl">×</span>
                    <span className="font-mono text-xl text-amber-600">?</span>
                  </span>
                ))}
                <span className="text-gray-400 text-xl mx-2">=</span>
                <span className="font-mono text-xl text-green-600">{example.radicand}</span>
              </div>
              <p className="text-xs text-center text-gray-500 mt-2">
                ({example.index} veces)
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

            {/* Calculate button */}
            {!showResult && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <button
                    onClick={handleDiscoverExample}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
                  >
                    Ver resultado
                  </button>
                </div>
              </div>
            )}

            {/* Result */}
            {showResult && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
                  <div className="text-center space-y-3">
                    <p className="text-gray-600 dark:text-gray-400">
                      {example.expanded}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <span className="font-mono text-2xl text-blue-600">{example.symbol}</span>
                      <span className="text-gray-400">=</span>
                      <span className="font-mono text-3xl font-bold text-green-600">{example.result}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleNextExample}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
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
              Las Reglas de las Raíces Enésimas
            </h3>

            {/* Key concepts */}
            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Definición</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-mono">ⁿ√a = b</span> significa que <span className="font-mono">bⁿ = a</span>
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">El Índice</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Si n=2 es raíz cuadrada (√), si n=3 es raíz cúbica (∛)
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Operación Inversa</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    La raíz n-ésima &quot;deshace&quot; la potencia n-ésima: <span className="font-mono">ⁿ√(aⁿ) = a</span>
                  </p>
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
                    <span className="font-mono text-lg text-blue-600">{ex.symbol}</span>
                    <span className="text-gray-400">=</span>
                    <span className="font-mono font-bold text-green-600">{ex.result}</span>
                    <span className="text-gray-400 text-sm">porque</span>
                    <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{ex.result}<sup>{ex.index}</sup> = {ex.radicand}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Common roots table */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-4 text-center">
              Raíces importantes para memorizar
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500 mb-2">Raíces cuadradas</p>
                <p className="font-mono text-sm">√4 = 2</p>
                <p className="font-mono text-sm">√9 = 3</p>
                <p className="font-mono text-sm">√16 = 4</p>
                <p className="font-mono text-sm">√25 = 5</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500 mb-2">Raíces cúbicas</p>
                <p className="font-mono text-sm">∛8 = 2</p>
                <p className="font-mono text-sm">∛27 = 3</p>
                <p className="font-mono text-sm">∛64 = 4</p>
                <p className="font-mono text-sm">∛125 = 5</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500 mb-2">Otras raíces</p>
                <p className="font-mono text-sm">⁴√16 = 2</p>
                <p className="font-mono text-sm">⁴√81 = 3</p>
                <p className="font-mono text-sm">⁵√32 = 2</p>
                <p className="font-mono text-sm">⁵√243 = 3</p>
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
