'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { useExplorePhases } from '@/hooks/lessons';
import { ExampleProgressDots, HintPanel, ActionButton } from '@/components/lessons/primitives';
import { MathText } from '@/components/math/MathDisplay';

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
    expression: '$5^0$',
    steps: ['Cualquier número elevado a 0 es 1'],
    result: '1',
    hint: 'Recuerda: el patrón dice que $a^0 = 1$ siempre',
  },
  {
    id: 'e2',
    expression: '$3^{-1}$',
    steps: ['$3^{-1} = \\frac{1}{3^1}$', '$= \\frac{1}{3}$'],
    result: '$\\frac{1}{3}$',
    hint: 'Un exponente negativo significa "uno dividido por"',
  },
  {
    id: 'e3',
    expression: '$2^{-2}$',
    steps: ['$2^{-2} = \\frac{1}{2^2}$', '$= \\frac{1}{4}$'],
    result: '$\\frac{1}{4}$',
    hint: 'Primero convierte a fracción, luego calcula la potencia',
  },
  {
    id: 'e4',
    expression: '$10^{-3}$',
    steps: ['$10^{-3} = \\frac{1}{10^3}$', '$= \\frac{1}{1000}$'],
    result: '$\\frac{1}{1000}$',
    hint: '$10^3 = 1000$, entonces $10^{-3} = \\frac{1}{1000}$',
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
                <p className="text-2xl text-gray-800 dark:text-gray-200"><MathText content="$a^0 = 1$" /></p>
                <p className="text-sm text-gray-500 mt-2">Cualquier número (excepto 0) elevado a 0 es 1</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 text-center border-2 border-purple-200 dark:border-purple-700">
                <div className="text-4xl mb-2">🔄</div>
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">Exponente Negativo</h3>
                <p className="text-2xl text-gray-800 dark:text-gray-200"><MathText content="$a^{-n} = \\frac{1}{a^n}$" /></p>
                <p className="text-sm text-gray-500 mt-2">Un exponente negativo invierte la fracción</p>
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
              <p className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                <MathText content={currentExample.expression} />
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

            {!showResult && (
              <div className="flex justify-center">
                <ActionButton onClick={handleDiscoverExample} variant="success">
                  Ver resultado
                </ActionButton>
              </div>
            )}

            {showResult && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
                  <div className="text-center space-y-3">
                    <div className="space-y-2">
                      {currentExample.steps.map((step, i) => (
                        <p key={i} className="text-gray-700 dark:text-gray-300">
                          <MathText content={step} />
                        </p>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-4 pt-2">
                      <span className="text-xl text-gray-700 dark:text-gray-300">
                        <MathText content={currentExample.expression} />
                      </span>
                      <span className="text-gray-400">=</span>
                      <span className="text-3xl font-bold text-green-600">
                        <MathText content={currentExample.result} />
                      </span>
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
                  <p className="text-purple-600"><MathText content="$a^0 = 1$" /></p>
                </div>
                <div className="text-sm text-gray-500">
                  Ej: <MathText content="$5^0 = 1$" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Exponente Negativo</p>
                  <p className="text-purple-600"><MathText content="$a^{-n} = \\frac{1}{a^n}$" /></p>
                </div>
                <div className="text-sm text-gray-500">
                  Ej: <MathText content="$2^{-3} = \\frac{1}{8}$" />
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
                    <span className="text-gray-700 dark:text-gray-300">
                      <MathText content={ex.expression} />
                    </span>
                    <span className="text-gray-400">=</span>
                    <span className="font-bold text-green-600"><MathText content={ex.result} /></span>
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
