'use client';

import { useState } from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { useExplorePhases } from '@/hooks/lessons';
import { ExampleProgressDots, HintPanel, ActionButton } from '@/components/lessons/primitives';

type Phase = 'intro' | 'discover' | 'pattern';

interface InequalityExample {
  id: string;
  inequality: string;
  steps: { description: string; result: string }[];
  solution: string;
  hint: string;
  isNegative: boolean;
  numberLineDirection: 'left' | 'right';
  numberLineValue: number;
  numberLineOpen: boolean;
}

const EXAMPLES: InequalityExample[] = [
  {
    id: 'simple',
    inequality: '2x < 10',
    steps: [
      { description: 'Dividimos ambos lados entre 2', result: '2x / 2 < 10 / 2' },
      { description: 'Simplificamos', result: 'x < 5' },
    ],
    solution: 'x < 5',
    hint: 'Dividir entre un número positivo NO cambia el signo',
    isNegative: false,
    numberLineDirection: 'left',
    numberLineValue: 5,
    numberLineOpen: true,
  },
  {
    id: 'addition',
    inequality: 'x + 4 > 7',
    steps: [
      { description: 'Restamos 4 de ambos lados', result: 'x + 4 - 4 > 7 - 4' },
      { description: 'Simplificamos', result: 'x > 3' },
    ],
    solution: 'x > 3',
    hint: 'Lo que sumas, lo restas - igual que en ecuaciones',
    isNegative: false,
    numberLineDirection: 'right',
    numberLineValue: 3,
    numberLineOpen: true,
  },
  {
    id: 'negative',
    inequality: '-3x < 12',
    steps: [
      { description: 'Dividimos ambos lados entre -3', result: '-3x / (-3) ? 12 / (-3)' },
      { description: 'CUIDADO: Al dividir por negativo...', result: '¡El signo SE INVIERTE!' },
      { description: 'Resultado final', result: 'x > -4' },
    ],
    solution: 'x > -4',
    hint: 'Cuando divides por un número NEGATIVO, el signo de desigualdad CAMBIA',
    isNegative: true,
    numberLineDirection: 'right',
    numberLineValue: -4,
    numberLineOpen: true,
  },
  {
    id: 'combined',
    inequality: '5 - 2x >= 11',
    steps: [
      { description: 'Restamos 5 de ambos lados', result: '5 - 2x - 5 >= 11 - 5' },
      { description: 'Simplificamos', result: '-2x >= 6' },
      { description: 'Dividimos entre -2 (SE INVIERTE)', result: 'x <= -3' },
    ],
    solution: 'x <= -3',
    hint: 'Primero aísla el término con x, luego aplica la regla del negativo',
    isNegative: true,
    numberLineDirection: 'left',
    numberLineValue: -3,
    numberLineOpen: false,
  },
];

function NumberLine({ value, direction, open }: { value: number; direction: 'left' | 'right'; open: boolean }) {
  const min = Math.min(-6, value - 2);
  const max = Math.max(6, value + 2);
  const range = max - min;
  const valuePosition = ((value - min) / range) * 100;

  return (
    <div className="relative w-full h-16 mt-4">
      {/* Line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-600" />

      {/* Arrow ends */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2">
        <svg width="12" height="12" viewBox="0 0 12 12" className="text-gray-400">
          <path d="M10 6L2 2v8l8-4z" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2">
        <svg width="12" height="12" viewBox="0 0 12 12" className="text-gray-400">
          <path d="M2 6l8-4v8l-8-4z" fill="currentColor" />
        </svg>
      </div>

      {/* Tick marks */}
      {Array.from({ length: range + 1 }, (_, i) => {
        const tickValue = min + i;
        const tickPos = (i / range) * 100;
        return (
          <div key={tickValue} className="absolute top-1/2" style={{ left: `${tickPos}%` }}>
            <div className="w-0.5 h-3 bg-gray-400 dark:bg-gray-500 -translate-x-1/2 -translate-y-1/2" />
            <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400">
              {tickValue}
            </span>
          </div>
        );
      })}

      {/* Solution indicator */}
      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{ left: `${valuePosition}%` }}
      >
        {/* Circle */}
        <div
          className={cn(
            'w-4 h-4 rounded-full border-2 -translate-x-1/2',
            open
              ? 'bg-white dark:bg-gray-900 border-green-500'
              : 'bg-green-500 border-green-500'
          )}
        />
      </div>

      {/* Solution ray */}
      <div
        className="absolute top-1/2 h-1 -translate-y-1/2 bg-green-500/50"
        style={{
          left: direction === 'left' ? '0%' : `${valuePosition}%`,
          width: direction === 'left' ? `${valuePosition}%` : `${100 - valuePosition}%`,
        }}
      />
    </div>
  );
}

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
  } = useExplorePhases<Phase, InequalityExample>({
    phases: ['intro', 'discover', 'pattern'],
    examples: EXAMPLES,
    getExampleId: (ex) => ex.id,
  });

  // Local state for step-reveal
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Descubre el Patrón</h2>
        <p className="text-gray-600 dark:text-gray-300">Aprende a resolver inecuaciones paso a paso</p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              Resolver una inecuación es <strong>MUY parecido</strong> a resolver una ecuación...
              <br />
              pero hay <strong className="text-red-500">UNA REGLA ESPECIAL</strong> que debes conocer.
            </p>

            {/* Visual comparison */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="text-center space-y-4">
                <p className="text-gray-500 dark:text-gray-400">Las operaciones inversas funcionan igual:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                    <div className="text-3xl mb-2">+ ↔ -</div>
                    <p className="font-semibold text-blue-700 dark:text-blue-300">Suma ↔ Resta</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">x + 5 {'<'} 10 → x {'<'} 10 - 5</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                    <div className="text-3xl mb-2">× ↔ ÷</div>
                    <p className="font-semibold text-purple-700 dark:text-purple-300">Multiplicación ↔ División</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">3x {'>'} 12 → x {'>'} 12 ÷ 3</p>
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-4 mt-4 border-2 border-red-300 dark:border-red-700">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <p className="text-red-800 dark:text-red-200 font-bold">REGLA ESPECIAL:</p>
                  </div>
                  <p className="text-red-700 dark:text-red-300">
                    Al multiplicar o dividir por un número <strong>NEGATIVO</strong>,
                    <br />
                    ¡el signo de desigualdad <strong>SE INVIERTE</strong>!
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

          {/* Warning for negative examples */}
          {currentExample.isNegative && currentStep === 0 && !showSolution && (
            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700 animate-fadeIn">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <p className="text-red-700 dark:text-red-300 font-medium">
                  ¡Atención: Esta inecuación tiene un coeficiente NEGATIVO!
                </p>
              </div>
            </div>
          )}

          {/* Example card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Resuelve:</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {currentExample.inequality}
              </p>
            </div>

            {/* Steps breakdown */}
            <div className="space-y-3 mb-6">
              {currentExample.steps.slice(0, currentStep + 1).map((step, i) => (
                <div
                  key={i}
                  className={cn(
                    'rounded-xl p-4 animate-fadeIn',
                    step.description.includes('CUIDADO') || step.description.includes('SE INVIERTE')
                      ? 'bg-red-50 dark:bg-red-900/30 ring-2 ring-red-400'
                      : i === currentStep && !showSolution
                      ? 'bg-gray-50 dark:bg-gray-700/50 ring-2 ring-blue-400'
                      : 'bg-gray-50 dark:bg-gray-700/50'
                  )}
                >
                  <p
                    className={cn(
                      'text-sm mb-2',
                      step.description.includes('CUIDADO') || step.description.includes('SE INVIERTE')
                        ? 'text-red-600 dark:text-red-400 font-bold'
                        : 'text-gray-600 dark:text-gray-400'
                    )}
                  >
                    Paso {i + 1}: {step.description}
                  </p>
                  <p
                    className={cn(
                      'font-mono text-lg text-center',
                      step.description.includes('SE INVIERTE')
                        ? 'text-red-600 dark:text-red-400 font-bold'
                        : 'text-gray-800 dark:text-gray-200'
                    )}
                  >
                    {step.result}
                  </p>
                </div>
              ))}
            </div>

            {/* Hint */}
            {!showSolution && (
              <HintPanel hint={currentExample.hint} isVisible={showHint} onToggle={toggleHint} className="mb-4 text-center" />
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
                <div
                  className={cn(
                    'rounded-xl p-6 border',
                    currentExample.isNegative
                      ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700'
                      : 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700'
                  )}
                >
                  <div className="text-center space-y-3">
                    <p className="text-gray-600 dark:text-gray-400">Solución:</p>
                    <p
                      className={cn(
                        'font-mono text-3xl font-bold',
                        currentExample.isNegative ? 'text-purple-600' : 'text-green-600'
                      )}
                    >
                      {currentExample.solution}
                    </p>

                    {/* Number line visualization */}
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Representación en recta numérica:</p>
                      <NumberLine
                        value={currentExample.numberLineValue}
                        direction={currentExample.numberLineDirection}
                        open={currentExample.numberLineOpen}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
                        {currentExample.numberLineOpen ? 'Círculo abierto' : 'Círculo cerrado'} = el valor{' '}
                        {currentExample.numberLineOpen ? 'NO' : 'SÍ'} está incluido
                      </p>
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
              Pasos para Resolver Inecuaciones Lineales
            </h3>

            {/* Steps */}
            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Aísla el término con x</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Usa operaciones inversas (igual que ecuaciones)</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Despeja x</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Divide o multiplica ambos lados</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4 border-2 border-red-300 dark:border-red-700">
                <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-red-700 dark:text-red-300">REGLA CRÍTICA</p>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Si multiplicas o divides por NEGATIVO, <strong>INVIERTE EL SIGNO</strong>
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Representa la solución</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Usa la recta numérica con círculo abierto o cerrado</p>
                </div>
              </div>
            </div>

            {/* Visual rule summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">La Regla del Signo:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 text-center">
                  <p className="text-green-700 dark:text-green-300 font-bold mb-2">POSITIVO</p>
                  <p className="font-mono text-sm">2x {'<'} 10</p>
                  <p className="text-gray-400">↓</p>
                  <p className="font-mono text-sm">x {'<'} 5</p>
                  <p className="text-xs text-gray-500 mt-2">Signo NO cambia</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-4 text-center">
                  <p className="text-red-700 dark:text-red-300 font-bold mb-2">NEGATIVO</p>
                  <p className="font-mono text-sm">-2x {'<'} 10</p>
                  <p className="text-gray-400">↓</p>
                  <p className="font-mono text-sm">x {'>'} -5</p>
                  <p className="text-xs text-red-500 mt-2 font-bold">¡Signo CAMBIA!</p>
                </div>
              </div>
            </div>

            {/* Summary of all examples */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mt-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">Ejemplos resueltos:</h4>
              <div className="space-y-2">
                {EXAMPLES.map((ex) => (
                  <div
                    key={ex.id}
                    className={cn(
                      'flex items-center justify-between p-2 rounded-lg',
                      ex.isNegative ? 'bg-red-50 dark:bg-red-900/30' : 'bg-gray-50 dark:bg-gray-700/50'
                    )}
                  >
                    <span className="font-mono text-gray-700 dark:text-gray-300">{ex.inequality}</span>
                    <span className="text-gray-400">→</span>
                    <span className={cn('font-mono font-bold', ex.isNegative ? 'text-purple-600' : 'text-green-600')}>
                      {ex.solution}
                    </span>
                    {ex.isNegative && <span className="text-xs text-red-500 ml-2">(signo invertido)</span>}
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
