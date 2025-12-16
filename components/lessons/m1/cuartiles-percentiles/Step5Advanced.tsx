'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, AlertTriangle, BarChart3, Sparkles, Lightbulb, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'outliers-intro' | 'outliers-formula' | 'outliers-example' | 'boxplot-intro' | 'boxplot-build';

// Example dataset with a potential outlier
const DATA = [20, 30, 40, 50, 55, 60, 65, 70, 80, 150];
const SORTED_DATA = [...DATA].sort((a, b) => a - b);

// Calculate quartiles
const N = SORTED_DATA.length; // 10 (even)
const MID = N / 2; // 5
const LOWER_HALF = SORTED_DATA.slice(0, MID); // [20, 30, 40, 50, 55]
const UPPER_HALF = SORTED_DATA.slice(MID); // [60, 65, 70, 80, 150]

const Q1 = LOWER_HALF[Math.floor(LOWER_HALF.length / 2)]; // 40
const Q2 = (SORTED_DATA[MID - 1] + SORTED_DATA[MID]) / 2; // (55+60)/2 = 57.5
const Q3 = UPPER_HALF[Math.floor(UPPER_HALF.length / 2)]; // 70
const IQR = Q3 - Q1; // 30

// Outlier boundaries
const LOWER_FENCE = Q1 - 1.5 * IQR; // 40 - 45 = -5
const UPPER_FENCE = Q3 + 1.5 * IQR; // 70 + 45 = 115

export default function Step5Advanced({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('outliers-intro');

  if (!isActive) return null;

  // Identify outliers
  const outliers = SORTED_DATA.filter(v => v < LOWER_FENCE || v > UPPER_FENCE);
  const nonOutliers = SORTED_DATA.filter(v => v >= LOWER_FENCE && v <= UPPER_FENCE);
  const whiskerMin = Math.min(...nonOutliers);
  const whiskerMax = Math.max(...nonOutliers);

  // ============ PHASE 1: Outliers Introduction ============
  if (phase === 'outliers-intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-red-700 dark:text-red-300 font-medium">
              Detectando valores sospechosos
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Que son los Outliers?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            El IQR nos ayuda a encontrar valores que &quot;no encajan&quot;
          </p>
        </div>

        {/* Dataset with suspicious value */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-red-200 dark:border-red-700">
          <p className="text-sm text-red-600 dark:text-red-400 mb-4 text-center">
            Mira estos datos. ¿Ves algo raro?
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {SORTED_DATA.map((val, i) => (
              <div
                key={i}
                className={cn(
                  'w-12 h-12 rounded-lg flex items-center justify-center font-bold transition-all',
                  val > 100
                    ? 'bg-red-500 text-white border-2 border-red-600 scale-110 animate-pulse'
                    : 'bg-white dark:bg-gray-700 border-2 border-gray-300 text-gray-700 dark:text-gray-300'
                )}
              >
                {val}
              </div>
            ))}
          </div>
        </div>

        {/* The problem */}
        <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 dark:text-red-200 font-semibold">
                El valor 150 parece muy diferente al resto
              </p>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                ¿Sera un error? ¿O es un caso especial? Necesitamos una forma <strong>matematica</strong> de detectar estos valores.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('outliers-formula')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>Ver la formula</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: Outliers Formula ============
  if (phase === 'outliers-formula') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-red-700 dark:text-red-300 font-medium">
              La regla del 1.5 × IQR
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Limites para Outliers
          </h2>
        </div>

        {/* The formula */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-red-200 dark:border-red-700">
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-500 text-sm mb-2">Limite inferior</p>
              <p className="text-center font-mono text-lg text-blue-700 dark:text-blue-300">
                Q₁ - 1.5 × IQR
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-500 text-sm mb-2">Limite superior</p>
              <p className="text-center font-mono text-lg text-purple-700 dark:text-purple-300">
                Q₃ + 1.5 × IQR
              </p>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 dark:text-amber-200 font-semibold">
                ¿Por que 1.5?
              </p>
              <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
                Es una convencion estadistica. Un valor que esta a mas de 1.5 veces el IQR desde los cuartiles se considera <strong>sospechoso</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('outliers-example')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>Calcular con nuestros datos</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: Outliers Example ============
  if (phase === 'outliers-example') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
            <Check className="w-5 h-5 text-red-600" />
            <span className="text-red-700 dark:text-red-300 font-medium">
              Aplicando la formula
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Es 150 un Outlier?
          </h2>
        </div>

        {/* Step by step calculation */}
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              <strong>Paso 1:</strong> Calculamos los cuartiles
            </p>
            <p className="font-mono text-blue-700 dark:text-blue-300 mt-1">
              Q₁ = {Q1}, Q₃ = {Q3}
            </p>
          </div>

          <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-xl">
            <p className="text-orange-800 dark:text-orange-200 text-sm">
              <strong>Paso 2:</strong> Calculamos el IQR
            </p>
            <p className="font-mono text-orange-700 dark:text-orange-300 mt-1">
              IQR = Q₃ - Q₁ = {Q3} - {Q1} = {IQR}
            </p>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
            <p className="text-purple-800 dark:text-purple-200 text-sm">
              <strong>Paso 3:</strong> Calculamos los limites
            </p>
            <p className="font-mono text-purple-700 dark:text-purple-300 mt-1 text-sm">
              Inferior: {Q1} - 1.5 × {IQR} = {Q1} - {1.5 * IQR} = {LOWER_FENCE}<br />
              Superior: {Q3} + 1.5 × {IQR} = {Q3} + {1.5 * IQR} = {UPPER_FENCE}
            </p>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-xl border-2 border-red-400">
            <p className="text-red-800 dark:text-red-200 text-sm">
              <strong>Paso 4:</strong> ¿Esta 150 fuera de los limites?
            </p>
            <p className="font-mono text-red-700 dark:text-red-300 mt-1">
              150 &gt; {UPPER_FENCE} ? <strong className="text-red-600">¡SI!</strong>
            </p>
            <p className="text-red-600 dark:text-red-400 font-bold mt-2 text-center">
              150 es un OUTLIER
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('boxplot-intro')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Visualizar con el Boxplot</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: Boxplot Introduction ============
  if (phase === 'boxplot-intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <span className="text-purple-700 dark:text-purple-300 font-medium">
              El Diagrama de Caja
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Boxplot
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Una forma visual de mostrar cuartiles y outliers
          </p>
        </div>

        {/* Boxplot parts explanation */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
          <p className="text-sm text-purple-600 dark:text-purple-400 mb-4 text-center">
            El boxplot tiene 5 partes principales:
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="w-8 h-4 bg-gray-400 rounded-sm" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Bigotes:</strong> Desde el minimo hasta Q₁ y desde Q₃ hasta el maximo (sin outliers)
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="w-8 h-4 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 rounded-sm border border-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Caja:</strong> Va de Q₁ a Q₃ (contiene el 50% central)
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="w-2 h-4 bg-green-600 rounded-sm" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Linea central:</strong> La mediana (Q₂)
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Puntos:</strong> Los outliers se muestran como puntos separados
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('boxplot-build')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Ver nuestro boxplot</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 5: Boxplot Build ============
  // Calculate positions for the boxplot visualization
  const visualMin = Math.min(...SORTED_DATA) - 10;
  const visualMax = Math.max(...SORTED_DATA) + 10;
  const scale = (val: number) => ((val - visualMin) / (visualMax - visualMin)) * 100;

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-green-600" />
          <span className="text-green-700 dark:text-green-300 font-medium">
            Tu primer boxplot
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Todo en una Imagen
        </h2>
      </div>

      {/* The boxplot */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="relative h-24 mx-4">
          {/* Axis line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 dark:bg-gray-600" />

          {/* Whiskers and box */}
          <div className="absolute bottom-8 left-0 right-0 h-12">
            {/* Lower whisker */}
            <div
              className="absolute h-full border-l-2 border-gray-500"
              style={{ left: `${scale(whiskerMin)}%` }}
            />
            <div
              className="absolute top-1/2 h-0.5 bg-gray-500"
              style={{
                left: `${scale(whiskerMin)}%`,
                width: `${scale(Q1) - scale(whiskerMin)}%`,
              }}
            />

            {/* Box (Q1 to Q3) */}
            <div
              className="absolute top-0 h-full bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 dark:from-blue-800/50 dark:via-green-800/50 dark:to-purple-800/50 border-2 border-gray-500 rounded"
              style={{
                left: `${scale(Q1)}%`,
                width: `${scale(Q3) - scale(Q1)}%`,
              }}
            />

            {/* Median line (Q2) */}
            <div
              className="absolute top-0 h-full w-1 bg-green-600 dark:bg-green-400"
              style={{ left: `${scale(Q2)}%` }}
            />

            {/* Upper whisker */}
            <div
              className="absolute top-1/2 h-0.5 bg-gray-500"
              style={{
                left: `${scale(Q3)}%`,
                width: `${scale(whiskerMax) - scale(Q3)}%`,
              }}
            />
            <div
              className="absolute h-full border-l-2 border-gray-500"
              style={{ left: `${scale(whiskerMax)}%` }}
            />

            {/* Outliers */}
            {outliers.map((outlier, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-red-500 border-2 border-red-700"
                style={{ left: `calc(${scale(outlier)}% - 8px)` }}
              />
            ))}
          </div>

          {/* Labels */}
          <div
            className="absolute bottom-1 text-xs text-gray-600 font-medium"
            style={{ left: `calc(${scale(whiskerMin)}% - 8px)` }}
          >
            {whiskerMin}
          </div>
          <div
            className="absolute bottom-1 text-xs text-blue-600 font-bold"
            style={{ left: `calc(${scale(Q1)}% - 8px)` }}
          >
            Q₁
          </div>
          <div
            className="absolute bottom-1 text-xs text-green-600 font-bold"
            style={{ left: `calc(${scale(Q2)}% - 8px)` }}
          >
            Q₂
          </div>
          <div
            className="absolute bottom-1 text-xs text-purple-600 font-bold"
            style={{ left: `calc(${scale(Q3)}% - 8px)` }}
          >
            Q₃
          </div>
          <div
            className="absolute bottom-1 text-xs text-gray-600 font-medium"
            style={{ left: `calc(${scale(whiskerMax)}% - 8px)` }}
          >
            {whiskerMax}
          </div>
          {outliers.map((outlier, i) => (
            <div
              key={i}
              className="absolute bottom-1 text-xs text-red-600 font-bold"
              style={{ left: `calc(${scale(outlier)}% - 12px)` }}
            >
              {outlier}
            </div>
          ))}
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-5 gap-2 text-center">
        <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
          <div className="text-xs text-gray-500">Min</div>
          <div className="font-bold text-gray-700 dark:text-gray-300">{whiskerMin}</div>
        </div>
        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
          <div className="text-xs text-blue-600">Q₁</div>
          <div className="font-bold text-blue-700 dark:text-blue-300">{Q1}</div>
        </div>
        <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded">
          <div className="text-xs text-green-600">Q₂</div>
          <div className="font-bold text-green-700 dark:text-green-300">{Q2}</div>
        </div>
        <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded">
          <div className="text-xs text-purple-600">Q₃</div>
          <div className="font-bold text-purple-700 dark:text-purple-300">{Q3}</div>
        </div>
        <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
          <div className="text-xs text-gray-500">Max*</div>
          <div className="font-bold text-gray-700 dark:text-gray-300">{whiskerMax}</div>
        </div>
      </div>

      {/* Outlier note */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-sm text-red-700 dark:text-red-300">
            Outlier: {outliers.join(', ')}
          </span>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-green-800 dark:text-green-200 font-semibold">
              ¡Ahora puedes leer un boxplot!
            </p>
            <p className="text-green-700 dark:text-green-300 text-sm mt-1">
              El boxplot muestra de un vistazo: los cuartiles, la dispersion (IQR = ancho de la caja), y los outliers (puntos separados).
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>Ir al checkpoint final</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
