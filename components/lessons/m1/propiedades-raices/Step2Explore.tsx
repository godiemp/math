'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { useExplorePhases } from '@/hooks/lessons';
import { ExampleProgressDots, HintPanel, ActionButton } from '@/components/lessons/primitives';
import { InlineMath, BlockMath } from '@/components/math/MathDisplay';

type Phase = 'intro' | 'discover' | 'pattern';
type PropertyType = 'product' | 'quotient' | 'rootOfRoot';

interface PropertyExample {
  id: string;
  type: PropertyType;
  expression: string;
  step1: string;
  step2: string;
  result: string;
  hint: string;
}

const EXAMPLES: PropertyExample[] = [
  {
    id: 'product1',
    type: 'product',
    expression: '\\sqrt{9 \\times 16}',
    step1: '\\sqrt{9} \\times \\sqrt{16}',
    step2: '3 \\times 4',
    result: '12',
    hint: 'Separa la raíz del producto en producto de raíces',
  },
  {
    id: 'quotient1',
    type: 'quotient',
    expression: '\\sqrt{\\dfrac{100}{25}}',
    step1: '\\dfrac{\\sqrt{100}}{\\sqrt{25}}',
    step2: '\\dfrac{10}{5}',
    result: '2',
    hint: 'Separa la raíz del cociente en cociente de raíces',
  },
  {
    id: 'rootOfRoot1',
    type: 'rootOfRoot',
    expression: '\\sqrt{\\sqrt{16}}',
    step1: '\\sqrt[4]{16}',
    step2: '\\sqrt[4]{2^4}',
    result: '2',
    hint: 'Multiplica los índices: 2 × 2 = 4',
  },
  {
    id: 'product2',
    type: 'product',
    expression: '\\sqrt[3]{8 \\cdot 27}',
    step1: '\\sqrt[3]{8} \\cdot \\sqrt[3]{27}',
    step2: '2 \\cdot 3',
    result: '6',
    hint: 'La propiedad funciona igual con raíces cúbicas',
  },
];

const PROPERTY_COLORS: Record<PropertyType, { bg: string; text: string; border: string }> = {
  product: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-700',
  },
  quotient: {
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-700',
  },
  rootOfRoot: {
    bg: 'bg-teal-50 dark:bg-teal-900/30',
    text: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-700',
  },
};

const PROPERTY_LABELS: Record<PropertyType, string> = {
  product: 'Producto',
  quotient: 'Cociente',
  rootOfRoot: 'Raíz de Raíz',
};

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
  } = useExplorePhases<Phase, PropertyExample>({
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
          Descubre las Propiedades
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explora las tres propiedades de las raíces
        </p>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6">
              Las raíces tienen <strong>tres propiedades fundamentales</strong> que nos permiten simplificar expresiones.
            </p>

            {/* Three properties overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2 text-center">Producto</h4>
                <div className="text-center text-gray-700 dark:text-gray-300">
                  <InlineMath latex="\sqrt[n]{a \cdot b} = \sqrt[n]{a} \cdot \sqrt[n]{b}" />
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2 text-center">Cociente</h4>
                <div className="text-center text-gray-700 dark:text-gray-300">
                  <InlineMath latex="\sqrt[n]{\frac{a}{b}} = \frac{\sqrt[n]{a}}{\sqrt[n]{b}}" />
                </div>
              </div>
              <div className="bg-teal-50 dark:bg-teal-900/30 rounded-xl p-4 border border-teal-200 dark:border-teal-700">
                <h4 className="font-bold text-teal-700 dark:text-teal-300 mb-2 text-center">Raíz de Raíz</h4>
                <div className="text-center text-gray-700 dark:text-gray-300">
                  <InlineMath latex="\sqrt[m]{\sqrt[n]{a}} = \sqrt[m \cdot n]{a}" />
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

          {/* Property type indicator */}
          <div className="flex justify-center">
            <span className={`px-4 py-1 rounded-full text-sm font-medium ${PROPERTY_COLORS[currentExample.type].bg} ${PROPERTY_COLORS[currentExample.type].text}`}>
              Propiedad del {PROPERTY_LABELS[currentExample.type]}
            </span>
          </div>

          {/* Example card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Simplifica:</p>
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                <BlockMath latex={currentExample.expression} />
              </div>
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
              <div className="flex justify-center">
                <ActionButton onClick={handleDiscoverExample} variant="success">
                  Ver paso a paso
                </ActionButton>
              </div>
            )}

            {/* Result */}
            {showResult && (
              <div className="space-y-4 animate-fadeIn">
                <div className={`rounded-xl p-6 border ${PROPERTY_COLORS[currentExample.type].bg} ${PROPERTY_COLORS[currentExample.type].border}`}>
                  <div className="text-center space-y-3">
                    <div className="text-lg text-gray-700 dark:text-gray-300">
                      <BlockMath latex={currentExample.expression} />
                    </div>
                    <p className="text-gray-400 text-sm">↓ aplicamos la propiedad</p>
                    <div className="text-lg text-gray-700 dark:text-gray-300">
                      <BlockMath latex={`= ${currentExample.step1}`} />
                    </div>
                    <p className="text-gray-400 text-sm">↓ calculamos cada raíz</p>
                    <div className="text-lg text-gray-700 dark:text-gray-300">
                      <BlockMath latex={`= ${currentExample.step2}`} />
                    </div>
                    <p className="text-gray-400 text-sm">↓ resultado</p>
                    <div className={`text-2xl font-bold ${PROPERTY_COLORS[currentExample.type].text}`}>
                      <BlockMath latex={`= ${currentExample.result}`} />
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
              Las Tres Propiedades de las Raíces
            </h3>

            {/* Properties summary */}
            <div className="space-y-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Propiedad del Producto</p>
                  <div className="text-blue-600 dark:text-blue-400">
                    <InlineMath latex="\sqrt[n]{a \cdot b} = \sqrt[n]{a} \cdot \sqrt[n]{b}" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    La raíz de un producto es el producto de las raíces
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Propiedad del Cociente</p>
                  <div className="text-purple-600 dark:text-purple-400">
                    <InlineMath latex="\sqrt[n]{\frac{a}{b}} = \frac{\sqrt[n]{a}}{\sqrt[n]{b}}" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    La raíz de un cociente es el cociente de las raíces
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-start gap-4">
                <div className="bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Raíz de una Raíz</p>
                  <div className="text-teal-600 dark:text-teal-400">
                    <InlineMath latex="\sqrt[m]{\sqrt[n]{a}} = \sqrt[m \cdot n]{a}" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Los índices se multiplican al tener raíz de raíz
                  </p>
                </div>
              </div>
            </div>

            {/* Examples summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">Ejemplos trabajados:</h4>
              <div className="space-y-2">
                {EXAMPLES.map((ex) => (
                  <div
                    key={ex.id}
                    className={`flex items-center justify-between p-2 rounded-lg ${PROPERTY_COLORS[ex.type].bg}`}
                  >
                    <span className={`text-xs font-medium px-2 py-1 rounded ${PROPERTY_COLORS[ex.type].text}`}>
                      {PROPERTY_LABELS[ex.type]}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300"><InlineMath latex={ex.expression} /></span>
                    <span className="text-gray-400">=</span>
                    <span className="font-bold text-green-600">{ex.result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Warning about sum */}
          <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700">
            <h4 className="font-bold text-red-700 dark:text-red-300 mb-2 flex items-center gap-2">
              ⚠️ ¡Cuidado con la suma!
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              Las raíces <strong>NO</strong> se distribuyen sobre la suma o resta:
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-red-600"><InlineMath latex="\sqrt{a + b} \neq \sqrt{a} + \sqrt{b}" /></div>
              <p className="text-xs text-gray-500 mt-1">
                Ejemplo: <InlineMath latex="\sqrt{9 + 16} = \sqrt{25} = 5" />, pero <InlineMath latex="\sqrt{9} + \sqrt{16} = 3 + 4 = 7" />
              </p>
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
