'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, TrendingUp, AlertTriangle, Lightbulb, Building2, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

// Base employee salaries (in thousands)
const BASE_SALARIES = [400, 450, 500, 550, 600];

function calculateMean(data: number[]) {
  return data.reduce((a, b) => a + b, 0) / data.length;
}

function calculateMedian(data: number[]) {
  const sorted = [...data].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

export default function Step5Advanced({ onComplete, isActive }: LessonStepProps) {
  const [ceoSalary, setCeoSalary] = useState(600);
  const [showInsight, setShowInsight] = useState(false);

  const allSalaries = useMemo(() => [...BASE_SALARIES, ceoSalary], [ceoSalary]);

  const baseMean = calculateMean(BASE_SALARIES);
  const baseMedian = calculateMedian(BASE_SALARIES);

  const currentMean = useMemo(() => calculateMean(allSalaries), [allSalaries]);
  const currentMedian = useMemo(() => calculateMedian(allSalaries), [allSalaries]);

  const meanChange = currentMean - baseMean;
  const medianChange = currentMedian - baseMedian;

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
          <TrendingUp className="w-5 h-5 text-amber-600" />
          <span className="text-amber-700 dark:text-amber-300 font-medium">
            El Efecto del Outlier
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¿Cual medida resiste mejor los valores extremos?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Mueve el control para cambiar el sueldo del CEO
        </p>
      </div>

      {/* Scenario */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-3">
          <Building2 className="w-6 h-6 text-slate-600" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Empresa TechCo - Sueldos (en miles $)
          </span>
        </div>

        {/* Employee salaries */}
        <div className="flex flex-wrap gap-2 mb-4">
          {BASE_SALARIES.map((salary, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <User size={16} className="text-gray-400" />
              <span className="font-mono text-gray-700 dark:text-gray-300">${salary}k</span>
            </div>
          ))}
          <div
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all',
              ceoSalary > 1000
                ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            )}
          >
            <span className="text-lg">👔</span>
            <span className={cn(
              'font-mono font-bold',
              ceoSalary > 1000 ? 'text-amber-600' : 'text-gray-700 dark:text-gray-300'
            )}>
              ${ceoSalary}k
            </span>
            <span className="text-xs text-gray-500">(CEO)</span>
          </div>
        </div>

        {/* Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>$600k</span>
            <span className={cn(
              'font-semibold',
              ceoSalary > 1500 ? 'text-amber-600' : 'text-gray-600'
            )}>
              Sueldo CEO: ${ceoSalary}k
            </span>
            <span>$3000k</span>
          </div>
          <input
            type="range"
            min={600}
            max={3000}
            step={100}
            value={ceoSalary}
            onChange={(e) => {
              setCeoSalary(Number(e.target.value));
              if (Number(e.target.value) > 1500 && !showInsight) {
                setShowInsight(true);
              }
            }}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-green-300 via-amber-300 to-red-400"
          />
        </div>
      </div>

      {/* Comparison dashboard */}
      <div className="grid grid-cols-2 gap-4">
        {/* Mean */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">MEDIA</div>
          <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
            ${Math.round(currentMean)}k
          </div>
          <div className={cn(
            'text-sm mt-2 flex items-center gap-1',
            meanChange > 50 ? 'text-red-600' : 'text-gray-500'
          )}>
            {meanChange > 0 ? '+' : ''}{Math.round(meanChange)}k vs base
            {meanChange > 200 && <AlertTriangle size={14} />}
          </div>

          {/* Visual bar */}
          <div className="mt-3 h-4 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${Math.min(100, (currentMean / 1000) * 100)}%` }}
            />
          </div>
        </div>

        {/* Median */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
          <div className="text-sm text-green-600 dark:text-green-400 mb-1">MEDIANA</div>
          <div className="text-3xl font-bold text-green-700 dark:text-green-300">
            ${Math.round(currentMedian)}k
          </div>
          <div className="text-sm mt-2 text-gray-500">
            {medianChange > 0 ? '+' : ''}{Math.round(medianChange)}k vs base
          </div>

          {/* Visual bar */}
          <div className="mt-3 h-4 bg-green-200 dark:bg-green-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${Math.min(100, (currentMedian / 1000) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Change comparison */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Comparacion de cambios:
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-20 text-sm text-gray-500">Media:</span>
            <div className="flex-1 h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${Math.min(100, (meanChange / 500) * 100)}%` }}
              />
            </div>
            <span className={cn(
              'w-20 text-right font-mono text-sm',
              meanChange > 100 ? 'text-red-600 font-bold' : 'text-gray-600'
            )}>
              +{Math.round(meanChange)}k
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-20 text-sm text-gray-500">Mediana:</span>
            <div className="flex-1 h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${Math.min(100, (medianChange / 500) * 100)}%` }}
              />
            </div>
            <span className="w-20 text-right font-mono text-sm text-green-600">
              +{Math.round(medianChange)}k
            </span>
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
                La <strong>mediana</strong> apenas cambio (+{Math.round(medianChange)}k), mientras la
                <strong> media</strong> subio mucho (+{Math.round(meanChange)}k).
              </p>
              <p className="text-green-700 dark:text-green-300 text-sm mt-2">
                Por eso, cuando hay <strong>valores extremos</strong> (como sueldos de CEO,
                precios de casas), la <strong>mediana es mejor</strong> para representar
                el valor &ldquo;tipico&rdquo;.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Continue button */}
      {showInsight && (
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
      {!showInsight && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Mueve el control hacia la derecha para ver el efecto de un sueldo muy alto
        </p>
      )}
    </div>
  );
}
