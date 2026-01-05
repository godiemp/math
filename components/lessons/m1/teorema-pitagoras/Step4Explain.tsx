'use client';

import { useState } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import MathDisplay from '@/components/math/MathDisplay';
import TriangleFigure from '@/components/figures/TriangleFigure';

type Phase = 'formula' | 'terminology' | 'applications' | 'shortcuts';

const PHASES: Phase[] = ['formula', 'terminology', 'applications', 'shortcuts'];

export default function Step4Explain({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('formula');
  const [selectedExample, setSelectedExample] = useState<'hypotenuse' | 'leg' | null>(null);

  const currentIndex = PHASES.indexOf(phase);

  const handleNext = () => {
    switch (phase) {
      case 'formula':
        setPhase('terminology');
        break;
      case 'terminology':
        setPhase('applications');
        break;
      case 'applications':
        setPhase('shortcuts');
        break;
      case 'shortcuts':
        onComplete();
        break;
    }
  };

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {PHASES.map((p, i) => (
          <div
            key={p}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              i === currentIndex
                ? 'bg-green-500 scale-125'
                : i < currentIndex
                ? 'bg-green-300'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Phase 1: Formula */}
      {phase === 'formula' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              El Teorema de Pitágoras
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              La relación fundamental en triángulos rectángulos
            </p>
          </div>

          {/* Main theorem box */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-2xl p-6 border-2 border-green-400 dark:border-green-600">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Triangle diagram */}
              <div className="flex-shrink-0">
                <TriangleFigure
                  fromSides={{ sides: [3, 4, 5], size: 100 }}
                  sides={[
                    { label: 'a', color: '#3b82f6' },
                    { label: 'b', color: '#22c55e' },
                    { label: 'c', color: '#f59e0b' },
                  ]}
                  showRightAngleMarker
                  fill="#D1FAE5"
                  stroke="#059669"
                  width={160}
                  height={144}
                />
              </div>

              {/* Formula */}
              <div className="flex-1 text-center">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md inline-block">
                  <MathDisplay latex="a^2 + b^2 = c^2" displayMode className="text-2xl" />
                </div>
                <p className="text-green-800 dark:text-green-200 mt-4 font-medium">
                  En todo triángulo rectángulo, la suma de los cuadrados de los catetos
                  es igual al cuadrado de la hipotenusa.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Phase 2: Terminology */}
      {phase === 'terminology' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Los Componentes del Triángulo
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Conoce las partes de un triángulo rectángulo
            </p>
          </div>

          {/* Triangle diagram with labels */}
          <div className="flex justify-center">
            <TriangleFigure
              fromSides={{ sides: [3, 4, 5], size: 140 }}
              sides={[
                { label: 'a', color: '#3b82f6', strokeWidth: 5 },
                { label: 'b', color: '#10B981', strokeWidth: 5 },
                { label: 'c', color: '#F59E0B', strokeWidth: 5 },
              ]}
              angles={[
                undefined,
                { label: '90°', showArc: false },
                undefined,
              ]}
              showRightAngleMarker
              fill="#F0FDF4"
              stroke="#059669"
              width={256}
              height={192}
            />
          </div>

          {/* Terminology cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4">
              <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded" />
                Catetos (a y b)
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                Son los dos lados que forman el ángulo recto (90°).
                Son los lados más cortos del triángulo.
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4">
              <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded" />
                Hipotenusa (c)
              </h3>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                Es el lado opuesto al ángulo recto.
                Siempre es el lado más largo del triángulo.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Phase 3: Applications */}
      {phase === 'applications' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ¿Cómo se usa el teorema?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Dos formas de aplicar la fórmula
            </p>
          </div>

          {/* Two use cases */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Find hypotenuse */}
              <button
                onClick={() => setSelectedExample('hypotenuse')}
                className={cn(
                  'flex-1 p-4 rounded-xl border-2 transition-all text-left',
                  selectedExample === 'hypotenuse'
                    ? 'bg-white dark:bg-gray-800 border-purple-500 shadow-lg'
                    : 'bg-white/50 dark:bg-gray-800/50 border-transparent hover:border-purple-300'
                )}
              >
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                  Encontrar la hipotenusa
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Si conoces los dos catetos (a y b)
                </p>
                <div className="mt-2 text-center">
                  <MathDisplay latex="c = \sqrt{a^2 + b^2}" />
                </div>
              </button>

              {/* Find leg */}
              <button
                onClick={() => setSelectedExample('leg')}
                className={cn(
                  'flex-1 p-4 rounded-xl border-2 transition-all text-left',
                  selectedExample === 'leg'
                    ? 'bg-white dark:bg-gray-800 border-purple-500 shadow-lg'
                    : 'bg-white/50 dark:bg-gray-800/50 border-transparent hover:border-purple-300'
                )}
              >
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                  Encontrar un cateto
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Si conoces la hipotenusa (c) y un cateto
                </p>
                <div className="mt-2 text-center">
                  <MathDisplay latex="a = \sqrt{c^2 - b^2}" />
                </div>
              </button>
            </div>

            {/* Example calculation */}
            {selectedExample && (
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-4 animate-fadeIn">
                {selectedExample === 'hypotenuse' ? (
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      <strong>Ejemplo:</strong> Si a = 3 y b = 4, ¿cuánto mide c?
                    </p>
                    <div className="space-y-2 text-center">
                      <MathDisplay latex="c = \sqrt{3^2 + 4^2}" />
                      <MathDisplay latex="c = \sqrt{9 + 16}" />
                      <MathDisplay latex="c = \sqrt{25} = 5" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      <strong>Ejemplo:</strong> Si c = 13 y b = 12, ¿cuánto mide a?
                    </p>
                    <div className="space-y-2 text-center">
                      <MathDisplay latex="a = \sqrt{13^2 - 12^2}" />
                      <MathDisplay latex="a = \sqrt{169 - 144}" />
                      <MathDisplay latex="a = \sqrt{25} = 5" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Important note */}
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-1">
                  ¡Importante!
                </h4>
                <p className="text-amber-700 dark:text-amber-300 text-sm">
                  El Teorema de Pitágoras <strong>solo funciona en triángulos rectángulos</strong> (los que tienen un ángulo de 90°).
                  Antes de usarlo, verifica que el triángulo tenga un ángulo recto.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Phase 4: Shortcuts (Pythagorean Triples) */}
      {phase === 'shortcuts' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Ternas Pitagóricas
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Tu atajo mental para resolver problemas rápido
            </p>
          </div>

          {/* Explanation */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-5 border border-indigo-200 dark:border-indigo-700">
            <p className="text-sm text-indigo-700 dark:text-indigo-300 text-center mb-4">
              Son grupos de 3 números enteros que <strong>siempre</strong> cumplen el teorema.
              Si los memorizas, puedes resolver problemas <strong>sin calculadora</strong>.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {[
                { a: 3, b: 4, c: 5 },
                { a: 5, b: 12, c: 13 },
                { a: 8, b: 15, c: 17 },
                { a: 7, b: 24, c: 25 },
              ].map((triple, i) => (
                <div
                  key={i}
                  className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-indigo-100 dark:border-indigo-800"
                >
                  <span className="text-blue-600 font-semibold">{triple.a}</span>
                  <span className="text-gray-400 mx-1">-</span>
                  <span className="text-green-600 font-semibold">{triple.b}</span>
                  <span className="text-gray-400 mx-1">-</span>
                  <span className="text-amber-600 font-semibold">{triple.c}</span>
                </div>
              ))}
            </div>

            {/* Example of using a triple */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>Ejemplo:</strong> Si un triángulo tiene catetos de 6 y 8, ¿cuánto mide la hipotenusa?
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Truco:</strong> 6 y 8 son el doble de <span className="text-blue-600 font-semibold">3</span> y <span className="text-green-600 font-semibold">4</span>.
                Entonces la hipotenusa es el doble de <span className="text-amber-600 font-semibold">5</span> = <strong>10</strong>.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Los múltiplos de una terna también son ternas: (6-8-10), (9-12-15), (12-16-20)...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Continue button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>{phase === 'shortcuts' ? 'Continuar a Practicar' : 'Continuar'}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
