'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useExplorePhases } from '@/hooks/lessons';
import { ExampleProgressDots, HintPanel, ActionButton } from '@/components/lessons/primitives';

type Phase = 'intro' | 'discover' | 'pattern';

interface EquationExample {
  id: string;
  equation: string;
  steps: { description: string; result: string }[];
  solution: string;
  hint: string;
}

const EXAMPLES: EquationExample[] = [
  {
    id: 'simple',
    equation: 'x + 7 = 12',
    steps: [
      { description: 'Restamos 7 de ambos lados', result: 'x + 7 - 7 = 12 - 7' },
      { description: 'Simplificamos', result: 'x = 5' },
    ],
    solution: 'x = 5',
    hint: '¿Qué operación deshace la suma de 7?',
  },
  {
    id: 'subtraction',
    equation: 'x - 4 = 10',
    steps: [
      { description: 'Sumamos 4 a ambos lados', result: 'x - 4 + 4 = 10 + 4' },
      { description: 'Simplificamos', result: 'x = 14' },
    ],
    solution: 'x = 14',
    hint: '¿Qué operación deshace la resta de 4?',
  },
  {
    id: 'multiplication',
    equation: '3x = 21',
    steps: [
      { description: 'Dividimos ambos lados entre 3', result: '3x ÷ 3 = 21 ÷ 3' },
      { description: 'Simplificamos', result: 'x = 7' },
    ],
    solution: 'x = 7',
    hint: '¿Qué operación deshace la multiplicación por 3?',
  },
  {
    id: 'combined',
    equation: '2x + 5 = 17',
    steps: [
      { description: 'Restamos 5 de ambos lados', result: '2x + 5 - 5 = 17 - 5' },
      { description: 'Simplificamos', result: '2x = 12' },
      { description: 'Dividimos ambos lados entre 2', result: '2x ÷ 2 = 12 ÷ 2' },
      { description: 'Simplificamos', result: 'x = 6' },
    ],
    solution: 'x = 6',
    hint: 'Primero elimina la suma, luego la multiplicación',
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
  } = useExplorePhases<Phase, EquationExample>({
    phases: ['intro', 'discover', 'pattern'],
    examples: EXAMPLES,
    getExampleId: (ex) => ex.id,
  });

  // Local state for step-reveal (lesson-specific)
  const [currentStep, setCurrentStep] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const handleShowNextStep = () => {
    if (!currentExample) return;
    if (currentStep < currentExample.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSolution(true);
      discoverCurrent();
    }
  };

  const handleNextExample = () => {
    hideHint();
    setCurrentStep(0);
    setShowSolution(false);
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
          Aprende a resolver ecuaciones paso a paso
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              Para resolver una ecuación, usamos <strong>operaciones inversas</strong> para despejar la variable.
            </p>

            {/* Visual explanation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="text-center space-y-4">
                <p className="text-gray-500 dark:text-gray-400">Las operaciones inversas son:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                    <div className="text-3xl mb-2">➕ ↔️ ➖</div>
                    <p className="font-semibold text-blue-700 dark:text-blue-300">Suma ↔ Resta</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">x + 5 = 10 → x = 10 - 5</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                    <div className="text-3xl mb-2">✖️ ↔️ ➗</div>
                    <p className="font-semibold text-purple-700 dark:text-purple-300">Multiplicación ↔ División</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">3x = 12 → x = 12 ÷ 3</p>
                  </div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 mt-4">
                  <p className="text-amber-800 dark:text-amber-200 text-sm">
                    <strong>Regla de oro:</strong> Lo que hagas a un lado de la ecuación, debes hacerlo al otro lado.
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
              <p className="text-gray-500 dark:text-gray-400 mb-2">Resuelve:</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {currentExample.equation}
              </p>
            </div>

            {/* Steps breakdown */}
            <div className="space-y-3 mb-6">
              {currentExample.steps.slice(0, currentStep + 1).map((step, i) => (
                <div
                  key={i}
                  className={cn(
                    'bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 animate-fadeIn',
                    i === currentStep && !showSolution ? 'ring-2 ring-blue-400' : ''
                  )}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Paso {i + 1}: {step.description}
                  </p>
                  <p className="font-mono text-lg text-center text-gray-800 dark:text-gray-200">
                    {step.result}
                  </p>
                </div>
              ))}
            </div>

            {/* Hint */}
            {!showSolution && (
              <HintPanel
                hint={currentExample.hint}
                isVisible={showHint}
                onToggle={toggleHint}
                className="mb-4 text-center"
              />
            )}

            {/* Action buttons */}
            {!showSolution ? (
              <div className="flex justify-center">
                <ActionButton onClick={handleShowNextStep} variant="secondary">
                  {currentStep < currentExample.steps.length - 1 ? 'Siguiente paso' : 'Ver solución'}
                </ActionButton>
              </div>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
                  <div className="text-center space-y-3">
                    <p className="text-gray-600 dark:text-gray-400">Solución:</p>
                    <p className="font-mono text-3xl font-bold text-green-600">{currentExample.solution}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Verificación: {currentExample.equation.replace('x', `(${currentExample.solution.split('= ')[1]})`)}
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
              Pasos para Resolver Ecuaciones Lineales
            </h3>

            {/* Steps */}
            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Identifica la variable</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">La incógnita que queremos despejar (generalmente x)</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Elimina sumas o restas</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Usa la operación inversa en ambos lados</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Elimina multiplicaciones o divisiones</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Divide o multiplica ambos lados según corresponda</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Verifica tu respuesta</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sustituye el valor en la ecuación original</p>
                </div>
              </div>
            </div>

            {/* Summary of all examples */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">Ejemplos resueltos:</h4>
              <div className="space-y-2">
                {EXAMPLES.map((ex) => (
                  <div
                    key={ex.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <span className="font-mono text-gray-700 dark:text-gray-300">{ex.equation}</span>
                    <span className="text-gray-400">→</span>
                    <span className="font-mono font-bold text-green-600">{ex.solution}</span>
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
