'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { useExplorePhases } from '@/hooks/lessons';
import { ExampleProgressDots, HintPanel, ActionButton } from '@/components/lessons/primitives';

type Phase = 'intro' | 'discover' | 'pattern';

interface TrinomialExample {
  id: string;
  trinomial: string;
  a: number;
  b: number;
  c: number;
  ac: number;
  m: number;
  n: number;
  rewritten: string;
  grouped: string;
  factored: string;
  hint: string;
}

const EXAMPLES: TrinomialExample[] = [
  {
    id: 'simple',
    trinomial: '2x² + 5x + 3',
    a: 2,
    b: 5,
    c: 3,
    ac: 6,
    m: 2,
    n: 3,
    rewritten: '2x² + 2x + 3x + 3',
    grouped: '2x(x + 1) + 3(x + 1)',
    factored: '(x + 1)(2x + 3)',
    hint: 'a×c = 2×3 = 6. ¿Qué números suman 5 y multiplican 6?',
  },
  {
    id: 'larger',
    trinomial: '3x² + 10x + 8',
    a: 3,
    b: 10,
    c: 8,
    ac: 24,
    m: 4,
    n: 6,
    rewritten: '3x² + 4x + 6x + 8',
    grouped: 'x(3x + 4) + 2(3x + 4)',
    factored: '(3x + 4)(x + 2)',
    hint: 'a×c = 3×8 = 24. Busca factores de 24 que sumen 10',
  },
  {
    id: 'negative-c',
    trinomial: '2x² + x - 6',
    a: 2,
    b: 1,
    c: -6,
    ac: -12,
    m: 4,
    n: -3,
    rewritten: '2x² + 4x - 3x - 6',
    grouped: '2x(x + 2) - 3(x + 2)',
    factored: '(x + 2)(2x - 3)',
    hint: 'a×c = 2×(-6) = -12. Números que suman 1 y multiplican -12',
  },
  {
    id: 'negative-b',
    trinomial: '3x² - 11x + 6',
    a: 3,
    b: -11,
    c: 6,
    ac: 18,
    m: -2,
    n: -9,
    rewritten: '3x² - 2x - 9x + 6',
    grouped: 'x(3x - 2) - 3(3x - 2)',
    factored: '(3x - 2)(x - 3)',
    hint: 'a×c = 3×6 = 18. Números negativos que suman -11 y multiplican 18',
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
  } = useExplorePhases<Phase, TrinomialExample>({
    phases: ['intro', 'discover', 'pattern'],
    examples: EXAMPLES,
    getExampleId: (ex) => ex.id,
  });

  // Local state for multi-step reveal (0: none, 1: rewritten, 2: grouped, 3: factored)
  const [showFactorResult, setShowFactorResult] = useState(false);
  const [showStep, setShowStep] = useState(0);

  const handleDiscoverExample = () => {
    if (showStep < 3) {
      setShowStep(showStep + 1);
    } else {
      discoverCurrent();
      setShowFactorResult(true);
    }
  };

  const handleNextExample = () => {
    hideHint();
    setShowFactorResult(false);
    setShowStep(0);
    nextExample();
  };

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Método AC
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aprende a factorizar trinomios cuando a ≠ 1
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              Para factorizar <strong>ax² + bx + c</strong> cuando <strong>a ≠ 1</strong>, usamos el{' '}
              <strong className="text-purple-600">Método AC</strong>:
            </p>

            {/* Visual explanation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="text-center space-y-4">
                {/* Step 1 */}
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <div className="text-2xl mb-2">1️⃣</div>
                  <p className="font-semibold text-blue-700 dark:text-blue-300">Calcula a × c</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Multiplica el primer coeficiente por el último
                  </p>
                </div>

                <div className="text-gray-400">↓</div>

                {/* Step 2 */}
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                  <div className="text-2xl mb-2">2️⃣</div>
                  <p className="font-semibold text-purple-700 dark:text-purple-300">
                    Busca m y n tales que m + n = b y m × n = a×c
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Igual que antes, pero multiplicando a×c en vez de solo c
                  </p>
                </div>

                <div className="text-gray-400">↓</div>

                {/* Step 3 */}
                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                  <div className="text-2xl mb-2">3️⃣</div>
                  <p className="font-semibold text-green-700 dark:text-green-300">
                    Reescribe bx como mx + nx
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Divide el término medio en dos partes
                  </p>
                </div>

                <div className="text-gray-400">↓</div>

                {/* Step 4 */}
                <div className="bg-pink-50 dark:bg-pink-900/30 rounded-lg p-4">
                  <div className="text-2xl mb-2">4️⃣</div>
                  <p className="font-semibold text-pink-700 dark:text-pink-300">
                    Agrupa y factoriza
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Factoriza por agrupación para obtener el resultado
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
              <p className="text-gray-500 dark:text-gray-400 mb-2">Factoriza usando el Método AC:</p>
              <p className="font-mono text-3xl font-bold text-gray-800 dark:text-gray-200">
                {example.trinomial}
              </p>
            </div>

            {/* Values breakdown */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 text-center">
                Identifica los valores:
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-red-200 dark:border-red-600 text-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">a =</span>
                  <span className="font-mono text-xl text-red-600 font-bold ml-2">{example.a}</span>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-amber-200 dark:border-amber-600 text-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">b =</span>
                  <span className="font-mono text-xl text-amber-600 font-bold ml-2">{example.b}</span>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-green-200 dark:border-green-600 text-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">c =</span>
                  <span className="font-mono text-xl text-green-600 font-bold ml-2">{example.c}</span>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-2 border-purple-200 dark:border-purple-600 text-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">a×c =</span>
                  <span className="font-mono text-xl text-purple-600 font-bold ml-2">{example.ac}</span>
                </div>
              </div>
            </div>

            {/* Hint */}
            {!showFactorResult && (
              <HintPanel
                hint={example.hint}
                isVisible={showHint}
                onToggle={toggleHint}
                className="mb-4 text-center"
              />
            )}

            {/* Step by step reveal */}
            {!showFactorResult && (
              <div className="space-y-4">
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Los números son: <span className="font-mono font-bold text-purple-600">{example.m}</span> y{' '}
                  <span className="font-mono font-bold text-purple-600">{example.n}</span>
                </p>
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    {example.m} + {example.n} = {example.b} ✓
                  </p>
                  <p>
                    {example.m} × {example.n} = {example.ac} ✓
                  </p>
                </div>

                {/* Progressive steps */}
                {showStep >= 1 && (
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 animate-fadeIn">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Paso 1: Reescribir</p>
                    <p className="font-mono text-lg text-blue-600 text-center">{example.rewritten}</p>
                  </div>
                )}

                {showStep >= 2 && (
                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3 animate-fadeIn">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Paso 2: Agrupar</p>
                    <p className="font-mono text-lg text-purple-600 text-center">{example.grouped}</p>
                  </div>
                )}

                {showStep >= 3 && (
                  <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3 animate-fadeIn">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Paso 3: Factor común</p>
                    <p className="font-mono text-xl text-green-600 text-center font-bold">{example.factored}</p>
                  </div>
                )}

                <div className="flex justify-center">
                  <ActionButton onClick={handleDiscoverExample} variant="success">
                    {showStep < 3 ? 'Ver siguiente paso' : 'Confirmar'}
                  </ActionButton>
                </div>
              </div>
            )}

            {/* Result */}
            {showFactorResult && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
                  <div className="text-center space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      m = <span className="font-mono font-bold text-purple-600">{example.m}</span>,
                      n = <span className="font-mono font-bold text-purple-600">{example.n}</span>
                    </p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <span className="font-mono text-xl text-gray-700 dark:text-gray-300">
                        {example.trinomial}
                      </span>
                      <span className="text-gray-400">=</span>
                      <span className="font-mono text-2xl font-bold text-green-600">
                        {example.factored}
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
              Método AC para ax² + bx + c
            </h3>

            {/* Steps */}
            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Calcula el producto a × c</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Este será el nuevo &quot;objetivo&quot; para el producto de m y n
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Busca m y n</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Dos números que <strong>sumen b</strong> y <strong>multipliquen a×c</strong>
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    Reescribe el trinomio
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ax² + mx + nx + c (divide bx en mx + nx)
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Factoriza por agrupación</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Agrupa los primeros dos términos y los últimos dos, luego saca factor común
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
                    <span className="font-mono text-gray-700 dark:text-gray-300">{ex.trinomial}</span>
                    <span className="text-gray-400">=</span>
                    <span className="font-mono font-bold text-green-600">{ex.factored}</span>
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
