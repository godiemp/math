'use client';

import { useState } from 'react';
import { ArrowRight, Check, Ruler, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'group' | 'build' | 'summary';

// Height data for students (in cm)
const HEIGHT_DATA = [
  152, 158, 161, 155, 167, 172, 163, 159, 170, 165,
  154, 168, 162, 157, 173, 160, 166, 171, 156, 169,
  153, 164, 175, 158, 167, 161, 170, 163, 155, 168,
];

// Intervals for grouping
const INTERVALS = [
  { min: 150, max: 155, label: '150-155' },
  { min: 155, max: 160, label: '155-160' },
  { min: 160, max: 165, label: '160-165' },
  { min: 165, max: 170, label: '165-170' },
  { min: 170, max: 175, label: '170-175' },
  { min: 175, max: 180, label: '175-180' },
];

// Helper to determine which interval a value belongs to
function getIntervalIndex(value: number): number {
  return INTERVALS.findIndex((int) => value >= int.min && value < int.max);
}

// Precomputed correct counts for each interval
const CORRECT_COUNTS = INTERVALS.map(
  (int) => HEIGHT_DATA.filter((h) => h >= int.min && h < int.max).length
);

const INTERVAL_COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899'];

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('group');
  const [ungroupedData, setUngroupedData] = useState(
    HEIGHT_DATA.map((val, idx) => ({ id: idx, value: val }))
  );
  const [groupedCounts, setGroupedCounts] = useState<number[]>(Array(INTERVALS.length).fill(0));

  if (!isActive) return null;

  const totalGrouped = groupedCounts.reduce((a, b) => a + b, 0);
  const allGrouped = ungroupedData.length === 0;
  const maxCount = Math.max(...groupedCounts, 1);

  // Handle clicking on an item to group it
  const handleItemClick = (item: { id: number; value: number }) => {
    const intervalIdx = getIntervalIndex(item.value);
    if (intervalIdx === -1) return;

    // Remove from ungrouped
    setUngroupedData((prev) => prev.filter((i) => i.id !== item.id));

    // Add to grouped counts
    setGroupedCounts((prev) => {
      const newCounts = [...prev];
      newCounts[intervalIdx]++;
      return newCounts;
    });
  };

  // ============ PHASE 1: GROUP - Interactive grouping ============
  if (phase === 'group') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Ruler className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              Estaturas de la Clase
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Agrupa los Datos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Toca cada estatura para clasificarla en su intervalo
          </p>
        </div>

        {/* Progress indicator */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 text-center">
          <span className="text-blue-700 dark:text-blue-300 font-medium">
            Agrupados: <strong>{totalGrouped}</strong> / {HEIGHT_DATA.length}
          </span>
          <div className="w-full h-2 bg-blue-200 dark:bg-blue-800 rounded mt-2">
            <div
              className="h-full bg-blue-500 rounded transition-all duration-300"
              style={{ width: `${(totalGrouped / HEIGHT_DATA.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left column: Ungrouped data */}
          <div className="space-y-4">
            {/* Ungrouped items */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 min-h-32">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Estaturas sin agrupar (cm):
              </p>
              <div className="flex flex-wrap gap-2">
                {ungroupedData.map((item) => {
                  const intervalIdx = getIntervalIndex(item.value);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className={cn(
                        'px-3 py-2 rounded-lg border-2 transition-all font-mono text-sm',
                        'hover:scale-105 hover:shadow-md active:scale-95',
                        'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                      )}
                      style={{
                        borderColor: intervalIdx >= 0 ? INTERVAL_COLORS[intervalIdx] : undefined,
                      }}
                      title={`Clasificar: ${item.value} cm`}
                    >
                      {item.value}
                    </button>
                  );
                })}
                {ungroupedData.length === 0 && (
                  <p className="text-green-600 dark:text-green-400 font-medium flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    ¡Todos agrupados!
                  </p>
                )}
              </div>
            </div>

            {/* Frequency table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Tabla de Frecuencia (datos agrupados)
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-2 text-left text-gray-600 dark:text-gray-400">Intervalo</th>
                    <th className="py-2 text-center text-gray-600 dark:text-gray-400">f</th>
                  </tr>
                </thead>
                <tbody>
                  {INTERVALS.map((interval, idx) => (
                    <tr
                      key={interval.label}
                      className="border-b border-gray-100 dark:border-gray-700/50"
                    >
                      <td className="py-2">
                        <span
                          className="inline-block w-3 h-3 rounded mr-2"
                          style={{ backgroundColor: INTERVAL_COLORS[idx] }}
                        />
                        <span className="font-mono">{interval.label}</span>
                      </td>
                      <td className="py-2 text-center font-bold">{groupedCounts[idx]}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <td className="py-2 font-semibold">Total</td>
                    <td className="py-2 text-center font-bold">{totalGrouped}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column: Histogram building */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Histograma
            </h3>
            <div className="h-64 flex items-end justify-around gap-2 border-b-2 border-l-2 border-gray-300 dark:border-gray-600 p-2">
              {INTERVALS.map((interval, idx) => {
                const height = (groupedCounts[idx] / 10) * 100; // Scale to percentage
                return (
                  <div key={interval.label} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full rounded-t transition-all duration-300 relative"
                      style={{
                        height: `${height}%`,
                        backgroundColor: INTERVAL_COLORS[idx],
                        minHeight: groupedCounts[idx] > 0 ? '20px' : '0px',
                      }}
                    >
                      {groupedCounts[idx] > 0 && (
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-700 dark:text-gray-300">
                          {groupedCounts[idx]}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* X-axis labels */}
            <div className="flex justify-around gap-2 mt-2">
              {INTERVALS.map((interval) => (
                <span
                  key={interval.label}
                  className="text-xs text-gray-500 dark:text-gray-400 text-center flex-1"
                >
                  {interval.label}
                </span>
              ))}
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">Estatura (cm)</p>
          </div>
        </div>

        {/* Continue button */}
        {allGrouped && (
          <div className="flex justify-center animate-fadeIn">
            <button
              onClick={() => setPhase('build')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Siguiente: Conceptos Clave</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* Auto-group button */}
        {!allGrouped && (
          <div className="flex justify-center">
            <button
              onClick={() => {
                setGroupedCounts(CORRECT_COUNTS);
                setUngroupedData([]);
              }}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
            >
              Agrupar automaticamente
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 2: BUILD - Key concepts ============
  if (phase === 'build') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <span className="text-purple-700 dark:text-purple-300 font-medium">
              Conceptos Importantes
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Partes del Histograma
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Observa las caracteristicas de los datos agrupados
          </p>
        </div>

        {/* Interactive histogram with annotations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="relative">
            {/* Y-axis label */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-500 dark:text-gray-400">
              Frecuencia
            </div>

            <div className="ml-6 h-48 flex items-end justify-around gap-1 border-b-2 border-l-2 border-gray-300 dark:border-gray-600 p-2">
              {INTERVALS.map((interval, idx) => {
                const height = (CORRECT_COUNTS[idx] / 10) * 100;
                return (
                  <div key={interval.label} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full rounded-t transition-all duration-500 relative"
                      style={{
                        height: `${height}%`,
                        backgroundColor: INTERVAL_COLORS[idx],
                        minHeight: CORRECT_COUNTS[idx] > 0 ? '20px' : '0px',
                        animationDelay: `${idx * 100}ms`,
                      }}
                    >
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-700 dark:text-gray-300">
                        {CORRECT_COUNTS[idx]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* X-axis labels */}
            <div className="ml-6 flex justify-around gap-1 mt-2">
              {INTERVALS.map((interval) => (
                <span
                  key={interval.label}
                  className="text-xs text-gray-500 dark:text-gray-400 text-center flex-1"
                >
                  {interval.label}
                </span>
              ))}
            </div>
            <p className="text-xs text-center text-gray-400 mt-1 ml-6">Estatura (cm)</p>
          </div>
        </div>

        {/* Key concepts cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Intervalo (Clase)
            </h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Cada rango de valores, por ejemplo <strong>160-165 cm</strong>.
              Todos los intervalos tienen el mismo <strong>ancho</strong> (5 cm).
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Frecuencia
            </h4>
            <p className="text-purple-700 dark:text-purple-300 text-sm">
              El numero de datos que caen en cada intervalo.
              Se representa con la <strong>altura</strong> de la barra.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Barras Contiguas
            </h4>
            <p className="text-green-700 dark:text-green-300 text-sm">
              En un histograma, las barras se <strong>tocan</strong> porque
              los intervalos son continuos (no hay espacios entre ellos).
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Marca de Clase
            </h4>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              El punto medio del intervalo. Para 160-165, la marca es{' '}
              <strong>162.5 cm</strong>.
            </p>
          </div>
        </div>

        {/* Continue button */}
        <div className="flex justify-center">
          <button
            onClick={() => setPhase('summary')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Ver resumen</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Lo Lograste!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Has construido tu primer histograma con datos agrupados
        </p>
      </div>

      {/* Comparison: Before vs After */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-700">
          <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 text-center">
            Sin Agrupar
          </h4>
          <div className="flex flex-wrap gap-1 justify-center text-xs font-mono text-gray-600 dark:text-gray-400">
            {HEIGHT_DATA.slice(0, 15).map((h, i) => (
              <span key={i} className="px-1 py-0.5 bg-white dark:bg-gray-700 rounded">
                {h}
              </span>
            ))}
            <span>...</span>
          </div>
          <p className="text-xs text-center text-red-600 dark:text-red-400 mt-2">
            Dificil ver patrones
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 text-center">
            Agrupados en Histograma
          </h4>
          <div className="h-20 flex items-end justify-around gap-1">
            {CORRECT_COUNTS.map((count, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-t"
                style={{
                  height: `${(count / 10) * 100}%`,
                  backgroundColor: INTERVAL_COLORS[idx],
                  minHeight: count > 0 ? '8px' : '0px',
                }}
              />
            ))}
          </div>
          <p className="text-xs text-center text-green-600 dark:text-green-400 mt-2">
            ¡Patron claro!
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
        <h4 className="font-semibold text-center text-gray-800 dark:text-gray-200 mb-3">
          ¿Cuando usar un histograma?
        </h4>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span>
              Cuando tienes <strong>muchos datos numericos</strong> (estaturas, edades, notas...)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span>
              Para ver la <strong>distribucion</strong> de los datos (donde se concentran)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span>
              Cuando quieres identificar <strong>patrones</strong> o valores atipicos
            </span>
          </li>
        </ul>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
