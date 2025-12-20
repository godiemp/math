'use client';

import { useState } from 'react';
import { ArrowRight, ArrowUp, ArrowDown, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'direct' | 'inverse' | 'complete';

interface Example {
  id: string;
  description: string;
  var1: string;
  var2: string;
  values: { v1: number; v2: number }[];
  type: 'direct' | 'inverse';
  revealed: boolean;
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('direct');
  const [directExamples, setDirectExamples] = useState<Example[]>([
    {
      id: 'd1',
      description: 'Kilos de fruta y precio total',
      var1: 'Kilos',
      var2: 'Precio ($)',
      values: [
        { v1: 1, v2: 500 },
        { v1: 2, v2: 1000 },
        { v1: 3, v2: 1500 },
        { v1: 4, v2: 2000 },
      ],
      type: 'direct',
      revealed: false,
    },
    {
      id: 'd2',
      description: 'Horas trabajadas y sueldo',
      var1: 'Horas',
      var2: 'Sueldo ($)',
      values: [
        { v1: 2, v2: 10000 },
        { v1: 4, v2: 20000 },
        { v1: 6, v2: 30000 },
        { v1: 8, v2: 40000 },
      ],
      type: 'direct',
      revealed: false,
    },
  ]);

  const [inverseExamples, setInverseExamples] = useState<Example[]>([
    {
      id: 'i1',
      description: 'Velocidad y tiempo de viaje',
      var1: 'Velocidad (km/h)',
      var2: 'Tiempo (h)',
      values: [
        { v1: 30, v2: 6 },
        { v1: 60, v2: 3 },
        { v1: 90, v2: 2 },
        { v1: 180, v2: 1 },
      ],
      type: 'inverse',
      revealed: false,
    },
    {
      id: 'i2',
      description: 'Trabajadores y días para terminar',
      var1: 'Trabajadores',
      var2: 'Días',
      values: [
        { v1: 2, v2: 12 },
        { v1: 4, v2: 6 },
        { v1: 6, v2: 4 },
        { v1: 12, v2: 2 },
      ],
      type: 'inverse',
      revealed: false,
    },
  ]);

  const handleRevealDirect = (id: string) => {
    setDirectExamples((prev) => prev.map((ex) => (ex.id === id ? { ...ex, revealed: true } : ex)));
  };

  const handleRevealInverse = (id: string) => {
    setInverseExamples((prev) => prev.map((ex) => (ex.id === id ? { ...ex, revealed: true } : ex)));
  };

  const allDirectRevealed = directExamples.every((ex) => ex.revealed);
  const allInverseRevealed = inverseExamples.every((ex) => ex.revealed);

  if (!isActive) return null;

  const renderTable = (example: Example, onReveal: () => void) => (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all cursor-pointer',
        example.revealed ? 'ring-2 ring-green-400' : 'hover:shadow-lg'
      )}
      onClick={onReveal}
    >
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 text-center">
        {example.description}
      </p>

      {/* Table */}
      <table className="w-full text-center">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="pb-2 text-blue-600 dark:text-blue-400 font-bold">{example.var1}</th>
            <th className="pb-2 text-purple-600 dark:text-purple-400 font-bold">{example.var2}</th>
          </tr>
        </thead>
        <tbody>
          {example.values.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
              <td className="py-2 font-mono text-lg">{row.v1}</td>
              <td className="py-2 font-mono text-lg">{row.v2}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {example.revealed ? (
        <div className="mt-4 animate-fadeIn">
          {example.type === 'direct' ? (
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <span className="font-bold">{example.var1}</span>
                  <ArrowUp className="w-5 h-5" />
                </div>
                <span className="text-2xl">→</span>
                <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                  <span className="font-bold">{example.var2}</span>
                  <ArrowUp className="w-5 h-5" />
                </div>
              </div>
              <p className="text-center text-sm text-green-700 dark:text-green-300 mt-2">
                <strong>Ambas suben juntas</strong> = Proporcionalidad Directa
              </p>
            </div>
          ) : (
            <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-3">
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <span className="font-bold">{example.var1}</span>
                  <ArrowUp className="w-5 h-5" />
                </div>
                <span className="text-2xl">→</span>
                <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                  <span className="font-bold">{example.var2}</span>
                  <ArrowDown className="w-5 h-5" />
                </div>
              </div>
              <p className="text-center text-sm text-orange-700 dark:text-orange-300 mt-2">
                <strong>Una sube, otra baja</strong> = Proporcionalidad Inversa
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 text-center">
          <span className="text-purple-500 text-sm">Toca para descubrir el patrón</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'direct' && 'Observa cómo cambian las cantidades juntas'}
          {phase === 'inverse' && 'Ahora observa cuando cambian en direcciones opuestas'}
          {phase === 'complete' && '¡Has descubierto los dos tipos de proporcionalidad!'}
        </p>
      </div>

      {phase === 'direct' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Instructions */}
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-center">
            <p className="text-green-700 dark:text-green-300 font-medium">
              <strong>Proporcionalidad Directa:</strong> Explora estos ejemplos
            </p>
          </div>

          {/* Direct examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {directExamples.map((example) => (
              <div key={example.id}>{renderTable(example, () => handleRevealDirect(example.id))}</div>
            ))}
          </div>

          {/* Key insight */}
          {allDirectRevealed && (
            <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4 animate-fadeIn">
              <div className="flex items-center gap-3">
                <Check className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-bold text-green-800 dark:text-green-200">
                    Proporcionalidad Directa
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    El <strong>cociente</strong> entre las cantidades es constante: y/x = k
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Continue button */}
          {allDirectRevealed && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('inverse')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
              >
                <span>Ahora: Proporcionalidad Inversa</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'inverse' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Instructions */}
          <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 text-center">
            <p className="text-orange-700 dark:text-orange-300 font-medium">
              <strong>Proporcionalidad Inversa:</strong> Explora estos ejemplos
            </p>
          </div>

          {/* Inverse examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inverseExamples.map((example) => (
              <div key={example.id}>
                {renderTable(example, () => handleRevealInverse(example.id))}
              </div>
            ))}
          </div>

          {/* Key insight */}
          {allInverseRevealed && (
            <div className="bg-orange-100 dark:bg-orange-900/30 rounded-xl p-4 animate-fadeIn">
              <div className="flex items-center gap-3">
                <Check className="w-6 h-6 text-orange-600" />
                <div>
                  <p className="font-bold text-orange-800 dark:text-orange-200">
                    Proporcionalidad Inversa
                  </p>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    El <strong>producto</strong> de las cantidades es constante: x · y = k
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Continue button */}
          {allInverseRevealed && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('complete')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
              >
                <Sparkles size={20} />
                <span>¡Lo descubrí!</span>
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'complete' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Summary */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-yellow-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Resumen de Proporcionalidades
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Direct */}
              <div className="bg-green-100 dark:bg-green-900/50 rounded-xl p-4">
                <h4 className="font-bold text-green-800 dark:text-green-200 mb-2 text-center">
                  Directa
                </h4>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <ArrowUp className="w-5 h-5 text-blue-600" />
                  <span className="text-xl">→</span>
                  <ArrowUp className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-sm text-center text-green-700 dark:text-green-300">
                  Ambas cantidades van en la <strong>misma dirección</strong>
                </p>
                <div className="mt-2 text-center font-mono text-lg text-green-800 dark:text-green-200">
                  y/x = k (constante)
                </div>
              </div>

              {/* Inverse */}
              <div className="bg-orange-100 dark:bg-orange-900/50 rounded-xl p-4">
                <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-2 text-center">
                  Inversa
                </h4>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <ArrowUp className="w-5 h-5 text-blue-600" />
                  <span className="text-xl">→</span>
                  <ArrowDown className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-sm text-center text-orange-700 dark:text-orange-300">
                  Las cantidades van en <strong>direcciones opuestas</strong>
                </p>
                <div className="mt-2 text-center font-mono text-lg text-orange-800 dark:text-orange-200">
                  x · y = k (constante)
                </div>
              </div>
            </div>
          </div>

          {/* Continue button */}
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
