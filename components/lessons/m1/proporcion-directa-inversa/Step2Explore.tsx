'use client';

import { useState } from 'react';
import { ArrowRight, Check, X, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'direct' | 'inverse' | 'complete';

interface TableRow {
  x: number;
  y: number;
}

interface ProportionExample {
  id: string;
  title: string;
  description: string;
  xLabel: string;
  yLabel: string;
  data: TableRow[];
  type: 'direct' | 'inverse';
  constant: number;
  revealed: boolean;
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('direct');

  const [directExamples, setDirectExamples] = useState<ProportionExample[]>([
    {
      id: 'd1',
      title: 'Precio de manzanas',
      description: 'Si 1 kg cuesta $2, ¿cuánto cuestan más kg?',
      xLabel: 'Kg',
      yLabel: 'Precio ($)',
      data: [
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 3, y: 6 },
        { x: 5, y: 10 },
      ],
      type: 'direct',
      constant: 2,
      revealed: false,
    },
    {
      id: 'd2',
      title: 'Distancia recorrida',
      description: 'Un auto viaja a 60 km/h constante',
      xLabel: 'Horas',
      yLabel: 'Distancia (km)',
      data: [
        { x: 1, y: 60 },
        { x: 2, y: 120 },
        { x: 3, y: 180 },
        { x: 4, y: 240 },
      ],
      type: 'direct',
      constant: 60,
      revealed: false,
    },
  ]);

  const [inverseExamples, setInverseExamples] = useState<ProportionExample[]>([
    {
      id: 'i1',
      title: 'Trabajadores y días',
      description: 'Construir una casa requiere 24 días-trabajador',
      xLabel: 'Trabajadores',
      yLabel: 'Días',
      data: [
        { x: 1, y: 24 },
        { x: 2, y: 12 },
        { x: 4, y: 6 },
        { x: 6, y: 4 },
      ],
      type: 'inverse',
      constant: 24,
      revealed: false,
    },
    {
      id: 'i2',
      title: 'Velocidad y tiempo',
      description: 'Recorrer 120 km a distintas velocidades',
      xLabel: 'Velocidad (km/h)',
      yLabel: 'Tiempo (h)',
      data: [
        { x: 30, y: 4 },
        { x: 40, y: 3 },
        { x: 60, y: 2 },
        { x: 120, y: 1 },
      ],
      type: 'inverse',
      constant: 120,
      revealed: false,
    },
  ]);

  const handleRevealDirect = (id: string) => {
    setDirectExamples(prev => prev.map(ex => ex.id === id ? { ...ex, revealed: true } : ex));
  };

  const handleRevealInverse = (id: string) => {
    setInverseExamples(prev => prev.map(ex => ex.id === id ? { ...ex, revealed: true } : ex));
  };

  const allDirectRevealed = directExamples.every(ex => ex.revealed);
  const allInverseRevealed = inverseExamples.every(ex => ex.revealed);

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Descubre el Patrón
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {phase === 'direct' && 'Explora la proporción directa'}
          {phase === 'inverse' && 'Explora la proporción inversa'}
          {phase === 'complete' && '¡Has descubierto ambos patrones!'}
        </p>
      </div>

      {phase === 'direct' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Direct proportion intro */}
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-bold text-green-800 dark:text-green-200">Proporción Directa</h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Cuando una cantidad aumenta, la otra también aumenta en la misma proporción
                </p>
              </div>
            </div>
          </div>

          {/* Direct examples */}
          <div className="space-y-4">
            {directExamples.map((example) => (
              <div
                key={example.id}
                className={cn(
                  'bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all cursor-pointer',
                  example.revealed ? 'ring-2 ring-green-400' : 'hover:shadow-lg'
                )}
                onClick={() => handleRevealDirect(example.id)}
              >
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
                  {example.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {example.description}
                </p>

                {/* Data table */}
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-center">
                    <thead>
                      <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                        <th className="py-2 px-3 text-blue-600 dark:text-blue-400">{example.xLabel}</th>
                        {example.data.map((row, i) => (
                          <td key={i} className="py-2 px-3 font-bold">{row.x}</td>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th className="py-2 px-3 text-green-600 dark:text-green-400">{example.yLabel}</th>
                        {example.data.map((row, i) => (
                          <td key={i} className="py-2 px-3 font-bold">{row.y}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                {example.revealed ? (
                  <div className="space-y-3 animate-fadeIn">
                    {/* Pattern discovery */}
                    <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                      <p className="text-sm text-green-600 dark:text-green-400 mb-2">El patrón:</p>
                      <div className="flex flex-wrap justify-center gap-3">
                        {example.data.map((row, i) => (
                          <div key={i} className="bg-white dark:bg-gray-800 rounded px-3 py-1">
                            <span className="font-mono">
                              {row.y} ÷ {row.x} = <span className="text-green-600 font-bold">{example.constant}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-center mt-3 font-bold text-green-700 dark:text-green-300">
                        y = {example.constant} × x (constante = {example.constant})
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <span className="text-purple-500 text-sm">Toca para ver el patrón</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          {allDirectRevealed && (
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 animate-fadeIn">
              <p className="text-center text-green-800 dark:text-green-200">
                <strong>Fórmula de proporción directa:</strong>
                <br />
                <span className="font-mono text-lg">y = k × x</span>
                <br />
                <span className="text-sm">donde k es la constante de proporcionalidad</span>
              </p>
            </div>
          )}

          {/* Continue button */}
          {allDirectRevealed && (
            <div className="flex justify-center animate-fadeIn">
              <button
                onClick={() => setPhase('inverse')}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                <span>Proporción Inversa</span>
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'inverse' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Inverse proportion intro */}
          <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-8 h-8 text-orange-600" />
              <div>
                <h3 className="font-bold text-orange-800 dark:text-orange-200">Proporción Inversa</h3>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Cuando una cantidad aumenta, la otra disminuye en la misma proporción
                </p>
              </div>
            </div>
          </div>

          {/* Inverse examples */}
          <div className="space-y-4">
            {inverseExamples.map((example) => (
              <div
                key={example.id}
                className={cn(
                  'bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all cursor-pointer',
                  example.revealed ? 'ring-2 ring-orange-400' : 'hover:shadow-lg'
                )}
                onClick={() => handleRevealInverse(example.id)}
              >
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
                  {example.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {example.description}
                </p>

                {/* Data table */}
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-center">
                    <thead>
                      <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                        <th className="py-2 px-3 text-blue-600 dark:text-blue-400">{example.xLabel}</th>
                        {example.data.map((row, i) => (
                          <td key={i} className="py-2 px-3 font-bold">{row.x}</td>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th className="py-2 px-3 text-orange-600 dark:text-orange-400">{example.yLabel}</th>
                        {example.data.map((row, i) => (
                          <td key={i} className="py-2 px-3 font-bold">{row.y}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                {example.revealed ? (
                  <div className="space-y-3 animate-fadeIn">
                    {/* Pattern discovery */}
                    <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4">
                      <p className="text-sm text-orange-600 dark:text-orange-400 mb-2">El patrón:</p>
                      <div className="flex flex-wrap justify-center gap-3">
                        {example.data.map((row, i) => (
                          <div key={i} className="bg-white dark:bg-gray-800 rounded px-3 py-1">
                            <span className="font-mono">
                              {row.x} × {row.y} = <span className="text-orange-600 font-bold">{example.constant}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-center mt-3 font-bold text-orange-700 dark:text-orange-300">
                        x × y = {example.constant} (producto constante)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <span className="text-purple-500 text-sm">Toca para ver el patrón</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          {allInverseRevealed && (
            <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-xl p-4 animate-fadeIn">
              <p className="text-center text-orange-800 dark:text-orange-200">
                <strong>Fórmula de proporción inversa:</strong>
                <br />
                <span className="font-mono text-lg">x × y = k</span> o <span className="font-mono text-lg">y = k ÷ x</span>
                <br />
                <span className="text-sm">donde k es la constante de proporcionalidad</span>
              </p>
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
                <span>¡Lo logré!</span>
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'complete' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Summary */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                ¡Excelente! Has descubierto los dos tipos de proporción
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Direct */}
              <div className="bg-green-100 dark:bg-green-900/40 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h4 className="font-bold text-green-800 dark:text-green-200">Directa</h4>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                  Si x aumenta, y también aumenta
                </p>
                <p className="font-mono text-center bg-white dark:bg-gray-800 rounded p-2">
                  y = k × x
                </p>
              </div>

              {/* Inverse */}
              <div className="bg-orange-100 dark:bg-orange-900/40 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-orange-600" />
                  <h4 className="font-bold text-orange-800 dark:text-orange-200">Inversa</h4>
                </div>
                <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">
                  Si x aumenta, y disminuye
                </p>
                <p className="font-mono text-center bg-white dark:bg-gray-800 rounded p-2">
                  x × y = k
                </p>
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
