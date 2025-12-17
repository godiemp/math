'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'discover' | 'pattern';

interface PercentExample {
  id: string;
  percent: number;
  total: number;
  result: number;
  hint: string;
  context: string;
}

const EXAMPLES: PercentExample[] = [
  {
    id: 'simple',
    percent: 10,
    total: 200,
    result: 20,
    hint: '10% = 10 de cada 100, o simplemente dividir por 10',
    context: '10% de propina',
  },
  {
    id: 'half',
    percent: 50,
    total: 80,
    result: 40,
    hint: '50% = la mitad del total',
    context: '50% de descuento',
  },
  {
    id: 'quarter',
    percent: 25,
    total: 120,
    result: 30,
    hint: '25% = un cuarto del total',
    context: '25% de batería',
  },
  {
    id: 'twenty',
    percent: 20,
    total: 150,
    result: 30,
    hint: '20% = un quinto del total, o dividir por 5',
    context: '20% de ganancia',
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
          Explora cómo calcular porcentajes
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              &quot;Por ciento&quot; significa <strong>&quot;por cada 100&quot;</strong>. Calcular un porcentaje es muy sencillo.
            </p>

            {/* Visual explanation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="text-center space-y-6">
                <div className="flex justify-center items-baseline gap-2">
                  <span className="text-4xl font-bold text-green-600">x</span>
                  <span className="text-4xl font-bold text-gray-400">%</span>
                  <span className="text-2xl text-gray-500">de</span>
                  <span className="text-4xl font-bold text-amber-600">N</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
                  <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                    <p className="font-semibold text-green-700 dark:text-green-300 mb-1">Porcentaje (x)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Cuántos de cada 100
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4 flex items-center justify-center">
                    <p className="font-mono text-2xl text-gray-500">÷ 100 ×</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4">
                    <p className="font-semibold text-amber-700 dark:text-amber-300 mb-1">Total (N)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      La cantidad completa
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 max-w-md mx-auto">
                  <p className="font-mono text-lg">
                    <span className="text-green-600">20</span><span className="text-gray-400">%</span> de <span className="text-amber-600">50</span> = <span className="text-green-600">20</span> ÷ <span className="text-purple-600">100</span> × <span className="text-amber-600">50</span> = <span className="text-blue-600 font-bold">10</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    20 de cada 100 de 50 = 10
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
            <div className="text-center mb-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                {example.context}
              </span>
            </div>
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Calcula:</p>
              <div className="flex justify-center items-baseline gap-2">
                <span className="text-5xl font-bold text-green-600">{example.percent}</span>
                <span className="text-3xl font-bold text-gray-400">%</span>
                <span className="text-2xl text-gray-500 mx-2">de</span>
                <span className="text-5xl font-bold text-amber-600">{example.total}</span>
              </div>
            </div>

            {/* Interactive breakdown */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 text-center">
                Piensa: {example.percent} de cada 100, aplicado a {example.total}
              </p>
              <div className="flex justify-center items-center gap-2 flex-wrap font-mono">
                <span className="text-xl text-green-600">{example.percent}</span>
                <span className="text-gray-400">÷</span>
                <span className="text-xl text-purple-600">100</span>
                <span className="text-gray-400">×</span>
                <span className="text-xl text-amber-600">{example.total}</span>
                <span className="text-gray-400">=</span>
                <span className="text-xl text-gray-400">?</span>
              </div>
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
                    <p className="text-gray-600 dark:text-gray-400 font-mono">
                      {example.percent} ÷ 100 × {example.total} = {example.percent / 100} × {example.total}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <span className="font-mono text-xl text-green-600">{example.percent}%</span>
                      <span className="text-gray-400">de</span>
                      <span className="font-mono text-xl text-amber-600">{example.total}</span>
                      <span className="text-gray-400">=</span>
                      <span className="font-mono text-3xl font-bold text-blue-600">{example.result}</span>
                    </div>
                  </div>
                </div>

                {/* Visual bar */}
                <div className="bg-gray-100 dark:bg-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 w-12">{example.total}</span>
                    <div className="flex-1 h-6 bg-amber-200 dark:bg-amber-800 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center"
                        style={{ width: `${example.percent}%` }}
                      >
                        <span className="text-xs text-white font-bold">{example.percent}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-green-600 font-bold">= {example.result}</span>
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
              Métodos para Calcular Porcentajes
            </h3>

            {/* Key concepts */}
            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Fórmula General</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">x% de N = (x ÷ 100) × N</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Atajos Útiles</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    10% = dividir por 10 | 50% = dividir por 2 | 25% = dividir por 4
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Porcentajes Clave</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    100% = todo | 50% = mitad | 25% = cuarto | 10% = décima parte
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
                    <span className="font-mono text-lg">
                      <span className="text-green-600">{ex.percent}%</span>
                      <span className="text-gray-400 mx-1">de</span>
                      <span className="text-amber-600">{ex.total}</span>
                    </span>
                    <span className="text-gray-400">=</span>
                    <span className="font-mono font-bold text-blue-600">{ex.result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Common percentages table */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-4 text-center">
              Porcentajes Frecuentes
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-600">10%</p>
                <p className="text-xs text-gray-500">÷ 10</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-600">25%</p>
                <p className="text-xs text-gray-500">÷ 4</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-600">50%</p>
                <p className="text-xs text-gray-500">÷ 2</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-600">100%</p>
                <p className="text-xs text-gray-500">= todo</p>
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
