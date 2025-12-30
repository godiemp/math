'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { useExplorePhases } from '@/hooks/lessons';
import { ExampleProgressDots, HintPanel, ActionButton } from '@/components/lessons/primitives';

type Phase = 'intro' | 'discover' | 'pattern';

interface Example {
  id: string;
  expression: string;
  a: number;
  b: number;
  c: number;
  halfB: number;
  halfBSquared: number;
  perfectSquare: string;
  remainder: number;
  hint: string;
}

const EXAMPLES: Example[] = [
  {
    id: 'simple',
    expression: 'x² + 4x + 1',
    a: 1,
    b: 4,
    c: 1,
    halfB: 2,
    halfBSquared: 4,
    perfectSquare: '(x + 2)²',
    remainder: -3,
    hint: 'b = 4, entonces b/2 = 2 y (b/2)² = 4. Necesitamos sumar 4 - 1 = 3 para completar el cuadrado.',
  },
  {
    id: 'larger',
    expression: 'x² + 8x + 10',
    a: 1,
    b: 8,
    c: 10,
    halfB: 4,
    halfBSquared: 16,
    perfectSquare: '(x + 4)²',
    remainder: -6,
    hint: 'b = 8, entonces b/2 = 4 y (b/2)² = 16. El trinomio cuadrado perfecto tiene 16, pero tenemos 10.',
  },
  {
    id: 'negative-b',
    expression: 'x² - 6x + 5',
    a: 1,
    b: -6,
    c: 5,
    halfB: -3,
    halfBSquared: 9,
    perfectSquare: '(x - 3)²',
    remainder: -4,
    hint: 'b = -6, entonces b/2 = -3 y (b/2)² = 9. El signo negativo se mantiene en el binomio.',
  },
  {
    id: 'negative-c',
    expression: 'x² + 2x - 8',
    a: 1,
    b: 2,
    c: -8,
    halfB: 1,
    halfBSquared: 1,
    perfectSquare: '(x + 1)²',
    remainder: -9,
    hint: 'b = 2, entonces b/2 = 1 y (b/2)² = 1. Aunque c es negativo, el proceso es igual.',
  },
];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const {
    phase,
    nextPhase,
    currentExample: example,
    currentExampleIndex,
    discoveredIds,
    isLastExample,
    discoverCurrent,
    nextExample,
    showHint,
    toggleHint,
    hideHint,
  } = useExplorePhases<Phase, Example>({
    phases: ['intro', 'discover', 'pattern'],
    examples: EXAMPLES,
    getExampleId: (ex) => ex.id,
  });

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
          Aprende a completar el cuadrado paso a paso
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              Para completar el cuadrado en <strong>x² + bx + c</strong>, seguimos este proceso:
            </p>

            {/* Visual explanation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="text-center space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                    <div className="text-3xl mb-2">1️⃣</div>
                    <p className="font-semibold text-blue-700 dark:text-blue-300">Identifica b</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      El coeficiente de x
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                    <div className="text-3xl mb-2">2️⃣</div>
                    <p className="font-semibold text-purple-700 dark:text-purple-300">Calcula (b/2)²</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      La mitad de b, al cuadrado
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                    <div className="text-3xl mb-2">3️⃣</div>
                    <p className="font-semibold text-green-700 dark:text-green-300">Suma y resta</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Añade (b/2)² y réstalo
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Resultado:</p>
                  <p className="font-mono text-xl text-purple-600 font-bold">
                    x² + bx + c = (x + b/2)² + (c - (b/2)²)
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

      {phase === 'discover' && example && (
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
              <p className="text-gray-500 dark:text-gray-400 mb-2">Completa el cuadrado:</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {example.expression}
              </p>
            </div>

            {/* Interactive breakdown */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 text-center">
                Identifica los valores:
              </p>
              <div className="flex justify-center gap-6 flex-wrap">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-blue-200 dark:border-blue-600 text-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">b =</span>
                  <span className="font-mono text-xl text-blue-600 font-bold ml-2">{example.b}</span>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-purple-200 dark:border-purple-600 text-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">b/2 =</span>
                  <span className="font-mono text-xl text-purple-600 font-bold ml-2">{example.halfB}</span>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-green-200 dark:border-green-600 text-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">(b/2)² =</span>
                  <span className="font-mono text-xl text-green-600 font-bold ml-2">{example.halfBSquared}</span>
                </div>
              </div>
            </div>

            {/* Hint */}
            {!showResult && (
              <HintPanel
                hint={example.hint}
                isVisible={showHint}
                onToggle={toggleHint}
                className="mb-4 text-center"
              />
            )}

            {/* Show result button */}
            {!showResult && (
              <div className="space-y-4">
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    El trinomio cuadrado perfecto x² + {example.b}x + {example.halfBSquared} = {example.perfectSquare}
                  </p>
                  <p>
                    Pero tenemos x² + {example.b}x + {example.c}, así que el residuo es {example.c} - {example.halfBSquared} = {example.remainder}
                  </p>
                </div>
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
                    <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                      {example.expression}
                    </p>
                    <p className="text-gray-400">=</p>
                    <p className="font-mono text-lg text-gray-700 dark:text-gray-300">
                      x² + {example.b}x + <span className="text-green-600">{example.halfBSquared}</span> - <span className="text-red-600">{example.halfBSquared}</span> + {example.c}
                    </p>
                    <p className="text-gray-400">=</p>
                    <p className="font-mono text-2xl font-bold text-green-600">
                      {example.perfectSquare} {example.remainder >= 0 ? '+' : '-'} {Math.abs(example.remainder)}
                    </p>
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
              Pasos para Completar el Cuadrado
            </h3>

            {/* Steps */}
            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Identifica b (el coeficiente de x)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    En x² + bx + c, b es el número que multiplica a x
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Calcula (b/2)²</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Divide b entre 2 y eleva el resultado al cuadrado
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Suma y resta (b/2)²</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    x² + bx + (b/2)² - (b/2)² + c
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Escribe como cuadrado perfecto</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    (x + b/2)² + (c - (b/2)²)
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
                    <span className="font-mono text-gray-700 dark:text-gray-300">{ex.expression}</span>
                    <span className="text-gray-400">=</span>
                    <span className="font-mono font-bold text-green-600">
                      {ex.perfectSquare} {ex.remainder >= 0 ? '+' : '-'} {Math.abs(ex.remainder)}
                    </span>
                  </div>
                ))}
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
