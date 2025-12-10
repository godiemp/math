'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, BarChart3, Plus, X, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

// Calculate quartiles and related stats
function calculateBoxplotStats(data: number[]) {
  if (data.length < 5) {
    return null;
  }

  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;

  // Min and Max
  const min = sorted[0];
  const max = sorted[n - 1];

  // Q2 (median)
  const mid = Math.floor(n / 2);
  const q2 = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  // Q1 (median of lower half)
  const lowerHalf = sorted.slice(0, mid);
  const q1Mid = Math.floor(lowerHalf.length / 2);
  const q1 = lowerHalf.length % 2 !== 0
    ? lowerHalf[q1Mid]
    : (lowerHalf[q1Mid - 1] + lowerHalf[q1Mid]) / 2;

  // Q3 (median of upper half)
  const upperHalf = n % 2 !== 0 ? sorted.slice(mid + 1) : sorted.slice(mid);
  const q3Mid = Math.floor(upperHalf.length / 2);
  const q3 = upperHalf.length % 2 !== 0
    ? upperHalf[q3Mid]
    : (upperHalf[q3Mid - 1] + upperHalf[q3Mid]) / 2;

  const iqr = q3 - q1;

  // Outlier boundaries
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;

  // Identify outliers and whisker endpoints
  const outliers = sorted.filter(v => v < lowerFence || v > upperFence);
  const nonOutliers = sorted.filter(v => v >= lowerFence && v <= upperFence);
  const whiskerMin = Math.min(...nonOutliers);
  const whiskerMax = Math.max(...nonOutliers);

  return { min, max, q1, q2, q3, iqr, lowerFence, upperFence, outliers, whiskerMin, whiskerMax };
}

// Available numbers to add
const AVAILABLE_NUMBERS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200];

export default function Step5Advanced({ onComplete, isActive }: LessonStepProps) {
  const [dataset, setDataset] = useState<number[]>([20, 30, 40, 50, 55, 60, 65, 70, 80, 90]);
  const [showInsight, setShowInsight] = useState(false);
  const [hasAddedOutlier, setHasAddedOutlier] = useState(false);

  const stats = useMemo(() => calculateBoxplotStats(dataset), [dataset]);
  const sortedData = useMemo(() => [...dataset].sort((a, b) => a - b), [dataset]);

  const addNumber = (num: number) => {
    if (dataset.length < 15) {
      setDataset([...dataset, num]);
      if (num >= 150) {
        setHasAddedOutlier(true);
        setTimeout(() => setShowInsight(true), 500);
      }
    }
  };

  const removeNumber = (index: number) => {
    if (dataset.length > 5) {
      const newData = dataset.filter((_, i) => i !== index);
      setDataset(newData);
    }
  };

  if (!isActive) return null;

  // Calculate positions for the boxplot visualization
  const visualMin = stats ? Math.min(stats.min, stats.lowerFence) - 10 : 0;
  const visualMax = stats ? Math.max(stats.max, stats.upperFence) + 10 : 200;
  const scale = (val: number) => ((val - visualMin) / (visualMax - visualMin)) * 100;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          <span className="text-purple-700 dark:text-purple-300 font-medium">
            El Constructor de Boxplot
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Visualiza los Cuartiles
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          El diagrama de caja muestra los cuartiles de forma visual
        </p>
      </div>

      {/* Number pool */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-center">
          Agrega numeros (prueba agregar 150 o 200):
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {AVAILABLE_NUMBERS.map((num) => (
            <button
              key={num}
              onClick={() => addNumber(num)}
              disabled={dataset.length >= 15}
              className={cn(
                'w-10 h-10 rounded-lg font-bold text-sm transition-all',
                'border-2',
                num >= 150
                  ? 'bg-amber-100 dark:bg-amber-900/50 border-amber-400 hover:bg-amber-200'
                  : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-purple-400 hover:bg-purple-50',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Current dataset */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
            Datos ({dataset.length}):
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sortedData.map((num, index) => {
            const isOutlier = stats && stats.outliers.includes(num);
            const originalIndex = dataset.indexOf(num);
            return (
              <button
                key={index}
                onClick={() => removeNumber(originalIndex)}
                className={cn(
                  'group relative w-10 h-10 rounded-lg font-bold text-sm border-2 transition-all',
                  isOutlier
                    ? 'bg-red-100 dark:bg-red-900/50 border-red-400 text-red-700'
                    : 'bg-white dark:bg-gray-700 border-purple-300 dark:border-purple-600 text-gray-700 dark:text-gray-300',
                  'hover:border-red-400'
                )}
              >
                {num}
                <X
                  size={12}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Boxplot visualization */}
      {stats && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 text-center">
            Diagrama de Caja (Boxplot)
          </h3>

          {/* The boxplot */}
          <div className="relative h-24 mx-4">
            {/* Axis line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 dark:bg-gray-600" />

            {/* Whiskers and box */}
            <div className="absolute bottom-8 left-0 right-0 h-12">
              {/* Lower whisker */}
              <div
                className="absolute h-full border-l-2 border-gray-400 dark:border-gray-500"
                style={{ left: `${scale(stats.whiskerMin)}%` }}
              />
              <div
                className="absolute top-1/2 h-0.5 bg-gray-400 dark:bg-gray-500"
                style={{
                  left: `${scale(stats.whiskerMin)}%`,
                  width: `${scale(stats.q1) - scale(stats.whiskerMin)}%`,
                }}
              />

              {/* Box (Q1 to Q3) */}
              <div
                className="absolute top-0 h-full bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 dark:from-blue-800/50 dark:via-green-800/50 dark:to-purple-800/50 border-2 border-gray-400 dark:border-gray-500 rounded"
                style={{
                  left: `${scale(stats.q1)}%`,
                  width: `${scale(stats.q3) - scale(stats.q1)}%`,
                }}
              />

              {/* Median line (Q2) */}
              <div
                className="absolute top-0 h-full w-1 bg-green-600 dark:bg-green-400"
                style={{ left: `${scale(stats.q2)}%` }}
              />

              {/* Upper whisker */}
              <div
                className="absolute top-1/2 h-0.5 bg-gray-400 dark:bg-gray-500"
                style={{
                  left: `${scale(stats.q3)}%`,
                  width: `${scale(stats.whiskerMax) - scale(stats.q3)}%`,
                }}
              />
              <div
                className="absolute h-full border-l-2 border-gray-400 dark:border-gray-500"
                style={{ left: `${scale(stats.whiskerMax)}%` }}
              />

              {/* Outliers */}
              {stats.outliers.map((outlier, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-red-500 border-2 border-red-700"
                  style={{ left: `calc(${scale(outlier)}% - 6px)` }}
                  title={`Outlier: ${outlier}`}
                />
              ))}
            </div>

            {/* Labels */}
            <div
              className="absolute bottom-1 text-xs text-blue-600 font-semibold"
              style={{ left: `calc(${scale(stats.q1)}% - 8px)` }}
            >
              Q₁
            </div>
            <div
              className="absolute bottom-1 text-xs text-green-600 font-semibold"
              style={{ left: `calc(${scale(stats.q2)}% - 8px)` }}
            >
              Q₂
            </div>
            <div
              className="absolute bottom-1 text-xs text-purple-600 font-semibold"
              style={{ left: `calc(${scale(stats.q3)}% - 8px)` }}
            >
              Q₃
            </div>
          </div>

          {/* Stats summary */}
          <div className="grid grid-cols-5 gap-2 mt-6 text-center">
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
              <div className="text-xs text-gray-500">Min</div>
              <div className="font-bold text-gray-700 dark:text-gray-300">{stats.whiskerMin}</div>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
              <div className="text-xs text-blue-600">Q₁</div>
              <div className="font-bold text-blue-700 dark:text-blue-300">{stats.q1}</div>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded">
              <div className="text-xs text-green-600">Q₂</div>
              <div className="font-bold text-green-700 dark:text-green-300">{stats.q2}</div>
            </div>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded">
              <div className="text-xs text-purple-600">Q₃</div>
              <div className="font-bold text-purple-700 dark:text-purple-300">{stats.q3}</div>
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
              <div className="text-xs text-gray-500">Max</div>
              <div className="font-bold text-gray-700 dark:text-gray-300">{stats.whiskerMax}</div>
            </div>
          </div>

          {/* IQR and outliers info */}
          <div className="mt-4 flex justify-around text-sm">
            <div className="text-center">
              <span className="text-gray-500">IQR: </span>
              <span className="font-bold text-orange-600">{stats.iqr}</span>
            </div>
            <div className="text-center">
              <span className="text-gray-500">Outliers: </span>
              <span className={cn('font-bold', stats.outliers.length > 0 ? 'text-red-600' : 'text-gray-600')}>
                {stats.outliers.length > 0 ? stats.outliers.join(', ') : 'Ninguno'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Boxplot legend */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
          Partes del boxplot:
        </h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-4 bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 border border-gray-400 rounded" />
            <span className="text-gray-600 dark:text-gray-400">Caja = IQR (50% central)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded-sm" />
            <span className="text-gray-600 dark:text-gray-400">Linea = Mediana (Q₂)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">Bigotes = hasta min/max</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-gray-600 dark:text-gray-400">Puntos = Outliers</span>
          </div>
        </div>
      </div>

      {/* Insight */}
      {showInsight && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700 animate-fadeIn">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-800 dark:text-green-200 font-semibold">
                ¡Descubrimiento clave!
              </p>
              <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                Los valores muy alejados aparecen como <strong>puntos rojos</strong> (outliers).
                El boxplot los separa del resto para que no distorsionen la visualizacion.
              </p>
              <p className="text-green-700 dark:text-green-300 text-sm mt-2">
                Nota como la <strong>caja</strong> (el 50% central) se mantiene estable
                aunque agregues outliers.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Continue button */}
      {(showInsight || hasAddedOutlier) && (
        <div className="flex justify-center">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Ir al checkpoint final</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}

      {/* Hint if not discovered yet */}
      {!showInsight && !hasAddedOutlier && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Intenta agregar 150 o 200 para ver como aparecen los outliers en el boxplot
        </p>
      )}
    </div>
  );
}
