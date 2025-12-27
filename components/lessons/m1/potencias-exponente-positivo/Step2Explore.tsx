'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { useExplorePhases } from '@/hooks/lessons';
import { ExampleProgressDots, HintPanel, ActionButton } from '@/components/lessons/primitives';

type Phase = 'intro' | 'discover' | 'pattern';

interface PowerExample {
  id: string;
  base: number;
  exponent: number;
  expanded: string;
  result: number;
  hint: string;
}

const EXAMPLES: PowerExample[] = [
  {
    id: 'simple',
    base: 3,
    exponent: 2,
    expanded: '3 × 3',
    result: 9,
    hint: 'El exponente 2 significa "multiplicar 3 dos veces"',
  },
  {
    id: 'cube',
    base: 2,
    exponent: 3,
    expanded: '2 × 2 × 2',
    result: 8,
    hint: 'El exponente 3 significa "multiplicar 2 tres veces"',
  },
  {
    id: 'power4',
    base: 5,
    exponent: 2,
    expanded: '5 × 5',
    result: 25,
    hint: '5 al cuadrado = 5 multiplicado por sí mismo',
  },
  {
    id: 'power5',
    base: 10,
    exponent: 3,
    expanded: '10 × 10 × 10',
    result: 1000,
    hint: '10 al cubo = 10 × 10 × 10',
  },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const {
    phase,
    nextPhase,
    currentExample,
    currentExampleIndex,
    discoveredIds,
    isLastExample,
    discoverCurrent,
    nextExample,
    showHint,
    toggleHint,
    hideHint,
  } = useExplorePhases<Phase, PowerExample>({
    phases: ['intro', 'discover', 'pattern'],
    examples: EXAMPLES,
    getExampleId: (ex) => ex.id,
  });

  // Local state for lesson-specific behavior
  const [showResult, setShowResult] = useState(false);

  const handleDiscoverExample = () => {
    discoverCurrent();
    setShowResult(true);
  };

  const handleNextExample = () => {
    hideHint();
    setShowResult(false);
    nextExample();
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
          Explora cómo funcionan las potencias
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              Una potencia tiene dos partes: la <strong>base</strong> y el <strong>exponente</strong>.
            </p>

            {/* Visual explanation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="text-center space-y-6">
                <div className="flex justify-center items-baseline">
                  <span className="text-6xl font-bold text-blue-600">a</span>
                  <sup className="text-3xl font-bold text-purple-600">n</sup>
                </div>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                    <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Base (a)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      El número que se multiplica
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                    <p className="font-semibold text-purple-700 dark:text-purple-300 mb-1">Exponente (n)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Cuántas veces se multiplica
                    </p>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 max-w-md mx-auto">
                  <p className="font-mono text-lg">
                    <span className="text-blue-600">3</span><sup className="text-purple-600">4</sup> = <span className="text-blue-600">3</span> × <span className="text-blue-600">3</span> × <span className="text-blue-600">3</span> × <span className="text-blue-600">3</span> = <span className="text-green-600 font-bold">81</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Base 3, exponente 4: multiplicamos 3 cuatro veces
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ActionButton onClick={nextPhase} variant="secondary" icon={<ArrowRight size={20} />}>
              Practicar con ejemplos
            </ActionButton>
          </div>
        </div>
      )}

      {phase === 'discover' && currentExample && (
        <div className="space-y-6 animate-fadeIn">
          {/* Progress */}
          <ExampleProgressDots
            total={EXAMPLES.length}
            currentIndex={currentExampleIndex}
            discoveredIds={discoveredIds}
            getExampleId={(i) => EXAMPLES[i].id}
            size="lg"
            showCounter={false}
          />

          {/* Example card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Calcula:</p>
              <div className="flex justify-center items-baseline">
                <span className="text-5xl font-bold text-blue-600">{currentExample.base}</span>
                <sup className="text-2xl font-bold text-purple-600">{currentExample.exponent}</sup>
              </div>
            </div>

            {/* Interactive breakdown */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 text-center">
                Piensa: ¿qué significa el exponente {currentExample.exponent}?
              </p>
              <div className="flex justify-center items-center gap-2 flex-wrap">
                <span className="font-mono text-xl text-blue-600">{currentExample.base}</span>
                {Array.from({ length: currentExample.exponent - 1 }).map((_, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className="text-gray-400 text-xl">×</span>
                    <span className="font-mono text-xl text-blue-600">{currentExample.base}</span>
                  </span>
                ))}
              </div>
              <p className="text-xs text-center text-gray-500 mt-2">
                ({currentExample.exponent} veces)
              </p>
            </div>

            {/* Hint */}
            {!showResult && (
              <HintPanel
                hint={currentExample.hint}
                isVisible={showHint}
                onToggle={toggleHint}
                className="mb-4 text-center"
              />
            )}

            {/* Calculate button */}
            {!showResult && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <ActionButton onClick={handleDiscoverExample} variant="success">
                    Ver resultado
                  </ActionButton>
                </div>
              </div>
            )}

            {/* Result */}
            {showResult && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
                  <div className="text-center space-y-3">
                    <p className="text-gray-600 dark:text-gray-400">
                      {currentExample.expanded}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <span className="font-mono text-2xl text-blue-600">{currentExample.base}<sup className="text-lg text-purple-600">{currentExample.exponent}</sup></span>
                      <span className="text-gray-400">=</span>
                      <span className="font-mono text-3xl font-bold text-green-600">{currentExample.result}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ActionButton onClick={handleNextExample} variant="secondary" icon={<ArrowRight size={20} />}>
                    {isLastExample ? 'Ver resumen' : 'Siguiente ejemplo'}
                  </ActionButton>
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
              Las Reglas de las Potencias
            </h3>

            {/* Key concepts */}
            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">La Base</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Es el número que se multiplica repetidamente</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">El Exponente</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Indica cuántas veces se usa la base como factor</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Casos Especiales</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    a¹ = a (cualquier número a la 1 es él mismo)<br />
                    a⁰ = 1 (cualquier número a la 0 es 1, excepto 0⁰)
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
                    <span className="font-mono text-lg text-blue-600">{ex.base}<sup className="text-sm text-purple-600">{ex.exponent}</sup></span>
                    <span className="text-gray-400">=</span>
                    <span className="font-mono text-sm text-gray-600 dark:text-gray-400">{ex.expanded}</span>
                    <span className="text-gray-400">=</span>
                    <span className="font-mono font-bold text-green-600">{ex.result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Special powers table */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-4 text-center">
              Potencias de números importantes
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Cuadrados</p>
                <p className="font-mono text-sm">2² = 4</p>
                <p className="font-mono text-sm">3² = 9</p>
                <p className="font-mono text-sm">4² = 16</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Cubos</p>
                <p className="font-mono text-sm">2³ = 8</p>
                <p className="font-mono text-sm">3³ = 27</p>
                <p className="font-mono text-sm">4³ = 64</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Potencias de 10</p>
                <p className="font-mono text-sm">10¹ = 10</p>
                <p className="font-mono text-sm">10² = 100</p>
                <p className="font-mono text-sm">10³ = 1000</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ActionButton onClick={onComplete} variant="secondary" icon={<ArrowRight size={20} />}>
              Continuar
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  );
}
