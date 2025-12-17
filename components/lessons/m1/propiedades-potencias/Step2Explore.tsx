'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'discover' | 'pattern';

interface PropertyExample {
  id: string;
  type: 'multiply' | 'divide' | 'power-of-power';
  expression: string;
  expanded: string;
  result: string;
  hint: string;
}

const EXAMPLES: PropertyExample[] = [
  {
    id: 'mult1',
    type: 'multiply',
    expression: '3² × 3³',
    expanded: '(3 × 3) × (3 × 3 × 3) = 3 × 3 × 3 × 3 × 3',
    result: '3⁵ = 243',
    hint: 'Multiplica potencias con la misma base: suma los exponentes (2 + 3 = 5)',
  },
  {
    id: 'div1',
    type: 'divide',
    expression: '5⁴ ÷ 5²',
    expanded: '(5 × 5 × 5 × 5) ÷ (5 × 5) = 5 × 5',
    result: '5² = 25',
    hint: 'Divide potencias con la misma base: resta los exponentes (4 - 2 = 2)',
  },
  {
    id: 'power1',
    type: 'power-of-power',
    expression: '(2³)²',
    expanded: '2³ × 2³ = 2 × 2 × 2 × 2 × 2 × 2',
    result: '2⁶ = 64',
    hint: 'Potencia de potencia: multiplica los exponentes (3 × 2 = 6)',
  },
  {
    id: 'mult2',
    type: 'multiply',
    expression: '10² × 10³',
    expanded: '(10 × 10) × (10 × 10 × 10) = 100 × 1000',
    result: '10⁵ = 100,000',
    hint: 'Suma los exponentes: 2 + 3 = 5. Con base 10, el exponente indica los ceros.',
  },
];

const TYPE_COLORS = {
  multiply: { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-600', border: 'border-blue-300 dark:border-blue-700' },
  divide: { bg: 'bg-purple-100 dark:bg-purple-900/50', text: 'text-purple-600', border: 'border-purple-300 dark:border-purple-700' },
  'power-of-power': { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-600', border: 'border-green-300 dark:border-green-700' },
};

const TYPE_LABELS = {
  multiply: 'Multiplicación',
  divide: 'División',
  'power-of-power': 'Potencia de Potencia',
};

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
          Descubre las Propiedades
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explora las tres reglas principales de las potencias
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              Las potencias tienen <strong>tres propiedades fundamentales</strong> que simplifican los cálculos.
            </p>

            {/* Three properties preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2 text-center">Multiplicación</p>
                <p className="font-mono text-center text-blue-600">aᵐ × aⁿ = aᵐ⁺ⁿ</p>
                <p className="text-xs text-gray-500 text-center mt-2">Suma exponentes</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                <p className="font-semibold text-purple-700 dark:text-purple-300 mb-2 text-center">División</p>
                <p className="font-mono text-center text-purple-600">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</p>
                <p className="text-xs text-gray-500 text-center mt-2">Resta exponentes</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <p className="font-semibold text-green-700 dark:text-green-300 mb-2 text-center">Potencia de Potencia</p>
                <p className="font-mono text-center text-green-600">(aᵐ)ⁿ = aᵐˣⁿ</p>
                <p className="text-xs text-gray-500 text-center mt-2">Multiplica exponentes</p>
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
            {/* Property type badge */}
            <div className="flex justify-center mb-4">
              <span className={cn(
                'px-4 py-1 rounded-full text-sm font-medium',
                TYPE_COLORS[example.type].bg,
                TYPE_COLORS[example.type].text
              )}>
                {TYPE_LABELS[example.type]}
              </span>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Simplifica:</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
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

            {/* Calculate button */}
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

            {/* Result */}
            {showResult && (
              <div className="space-y-4 animate-fadeIn">
                <div className={cn(
                  'rounded-xl p-6 border',
                  TYPE_COLORS[example.type].bg,
                  TYPE_COLORS[example.type].border
                )}>
                  <div className="text-center space-y-3">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {example.expanded}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <span className="font-mono text-xl text-gray-700 dark:text-gray-300">{example.expression}</span>
                      <span className="text-gray-400">=</span>
                      <span className={cn('font-mono text-2xl font-bold', TYPE_COLORS[example.type].text)}>
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
              Las Tres Propiedades de las Potencias
            </h3>

            {/* Key properties */}
            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-800 dark:text-blue-200">Producto de potencias (misma base)</p>
                    <p className="font-mono text-lg text-blue-600 my-2">aᵐ × aⁿ = aᵐ⁺ⁿ</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Al multiplicar potencias con la misma base, <strong>suma los exponentes</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-800 dark:text-purple-200">Cociente de potencias (misma base)</p>
                    <p className="font-mono text-lg text-purple-600 my-2">aᵐ ÷ aⁿ = aᵐ⁻ⁿ</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Al dividir potencias con la misma base, <strong>resta los exponentes</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div className="flex-1">
                    <p className="font-semibold text-green-800 dark:text-green-200">Potencia de una potencia</p>
                    <p className="font-mono text-lg text-green-600 my-2">(aᵐ)ⁿ = aᵐˣⁿ</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Al elevar una potencia a otro exponente, <strong>multiplica los exponentes</strong>
                    </p>
                  </div>
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
                    className={cn(
                      'flex items-center justify-between p-2 rounded-lg',
                      TYPE_COLORS[ex.type].bg
                    )}
                  >
                    <span className={cn('px-2 py-0.5 rounded text-xs font-medium', TYPE_COLORS[ex.type].bg, TYPE_COLORS[ex.type].text)}>
                      {TYPE_LABELS[ex.type]}
                    </span>
                    <span className="font-mono text-gray-700 dark:text-gray-300">{ex.expression}</span>
                    <span className="text-gray-400">=</span>
                    <span className={cn('font-mono font-bold', TYPE_COLORS[ex.type].text)}>{ex.result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Important note */}
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
            <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Recuerda:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Estas propiedades <strong>solo funcionan con la misma base</strong>.
              No puedes simplificar <span className="font-mono">2³ × 3²</span> porque las bases son diferentes.
            </p>
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
