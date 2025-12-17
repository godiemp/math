'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, FlaskConical, Lightbulb, Calculator, ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'range' | 'deviations' | 'variance' | 'stddev' | 'complete';

// Starting dataset - designed to show concepts clearly
const INITIAL_DATA = [4, 6, 8, 10, 12];

// Calculate stats
function calculateMean(data: number[]) {
  return data.reduce((a, b) => a + b, 0) / data.length;
}

function calculateRange(data: number[]) {
  return Math.max(...data) - Math.min(...data);
}

function calculateDeviations(data: number[]) {
  const mean = calculateMean(data);
  return data.map(x => x - mean);
}

function calculateVariance(data: number[]) {
  const mean = calculateMean(data);
  const squaredDiffs = data.map(x => Math.pow(x - mean, 2));
  return squaredDiffs.reduce((a, b) => a + b, 0) / data.length;
}

function calculateStdDev(data: number[]) {
  return Math.sqrt(calculateVariance(data));
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [data] = useState<number[]>(INITIAL_DATA);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const mean = useMemo(() => calculateMean(data), [data]);
  const range = useMemo(() => calculateRange(data), [data]);
  const deviations = useMemo(() => calculateDeviations(data), [data]);
  const variance = useMemo(() => calculateVariance(data), [data]);
  const stdDev = useMemo(() => calculateStdDev(data), [data]);

  if (!isActive) return null;

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <FlaskConical className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              El Laboratorio de Dispersion
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Como medimos la dispersion?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Vamos a construir paso a paso las formulas
          </p>
        </div>

        {/* Data visualization */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4">
            Nuestro conjunto de datos:
          </p>

          {/* Number line visualization */}
          <div className="relative h-24 mb-4">
            {/* Axis */}
            <div className="absolute bottom-8 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600 rounded" />

            {/* Tick marks and labels */}
            {[0, 2, 4, 6, 8, 10, 12, 14, 16].map((num) => (
              <div
                key={num}
                className="absolute bottom-6"
                style={{ left: `${(num / 16) * 100}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-0.5 h-3 bg-gray-400 dark:bg-gray-500" />
                <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">{num}</span>
              </div>
            ))}

            {/* Mean line */}
            <div
              className="absolute bottom-8 w-0.5 h-16 bg-purple-500"
              style={{ left: `${(mean / 16) * 100}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50 px-2 py-0.5 rounded">
                  Media = {mean}
                </span>
              </div>
            </div>

            {/* Data points */}
            {data.map((num, index) => (
              <div
                key={index}
                className="absolute bottom-10 transform -translate-x-1/2"
                style={{ left: `${(num / 16) * 100}%` }}
              >
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                  {num}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Datos: <strong>{data.join(', ')}</strong>
            </p>
            <p className="text-purple-600 dark:text-purple-400 mt-1">
              Media (promedio): <strong>{mean}</strong>
            </p>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              La pregunta clave: <strong>¿que tan lejos</strong> estan los datos del promedio?
              Vamos a descubrir <strong>tres formas</strong> de medirlo.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('range')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>Comenzar exploracion</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: RANGE ============
  if (phase === 'range') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
            <span className="text-orange-600 font-bold">1</span>
            <span className="text-orange-700 dark:text-orange-300 font-medium">
              El Rango
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La medida mas simple
          </h2>
        </div>

        {/* Range visualization */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
          <div className="relative h-20 mb-4">
            {/* Axis */}
            <div className="absolute bottom-8 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600 rounded" />

            {/* Range bracket */}
            <div
              className="absolute bottom-10 h-6 border-t-4 border-l-4 border-r-4 border-orange-500"
              style={{
                left: `${(Math.min(...data) / 16) * 100}%`,
                width: `${((Math.max(...data) - Math.min(...data)) / 16) * 100}%`,
              }}
            />

            {/* Data points */}
            {data.map((num, index) => (
              <div
                key={index}
                className={cn(
                  'absolute bottom-10 transform -translate-x-1/2 transition-all',
                  (num === Math.min(...data) || num === Math.max(...data))
                    ? 'scale-125'
                    : 'opacity-50'
                )}
                style={{ left: `${(num / 16) * 100}%` }}
              >
                <div className={cn(
                  'w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-lg',
                  num === Math.min(...data) ? 'bg-green-500' :
                    num === Math.max(...data) ? 'bg-red-500' : 'bg-gray-400'
                )}>
                  {num}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">
                Minimo: {Math.min(...data)}
              </span>
              <span className="text-gray-400">→</span>
              <span className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-3 py-1 rounded-full">
                Maximo: {Math.max(...data)}
              </span>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 inline-block">
              <p className="text-gray-600 dark:text-gray-300 font-mono">
                Rango = Maximo - Minimo
              </p>
              <p className="text-2xl font-bold text-orange-600 mt-2">
                {Math.max(...data)} - {Math.min(...data)} = {range}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-sm">
            <strong>Ventaja:</strong> Muy facil de calcular.<br />
            <strong>Desventaja:</strong> Solo usa 2 valores (el mayor y el menor). Ignora todos los demas datos.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('deviations')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
          >
            <span>Ver una mejor medida</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: DEVIATIONS ============
  if (phase === 'deviations') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <span className="text-purple-600 font-bold">2</span>
            <span className="text-purple-700 dark:text-purple-300 font-medium">
              Las Desviaciones
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Distancia de cada dato a la media
          </h2>
        </div>

        {/* Deviations visualization */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
          <div className="space-y-3">
            {data.map((num, index) => {
              const deviation = deviations[index];
              const isPositive = deviation > 0;
              return (
                <div
                  key={index}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer',
                    highlightedIndex === index
                      ? 'bg-purple-100 dark:bg-purple-800/50'
                      : 'bg-white dark:bg-gray-800'
                  )}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onMouseLeave={() => setHighlightedIndex(null)}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center">
                    {num}
                  </div>
                  <span className="text-gray-500">−</span>
                  <div className="w-10 h-10 rounded-full bg-purple-500 text-white font-bold flex items-center justify-center">
                    {mean}
                  </div>
                  <span className="text-gray-500">=</span>
                  <div className={cn(
                    'flex items-center gap-1 px-3 py-1 rounded-full font-bold',
                    isPositive
                      ? 'bg-red-100 dark:bg-red-900/50 text-red-600'
                      : deviation < 0
                        ? 'bg-green-100 dark:bg-green-900/50 text-green-600'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600'
                  )}>
                    {isPositive && <ArrowUp size={14} />}
                    {deviation < 0 && <ArrowDown size={14} />}
                    <span>{deviation > 0 ? '+' : ''}{deviation}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sum of deviations */}
          <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-700">
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3">
              <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                <strong>¡Problema!</strong> Si sumamos todas las desviaciones:
              </p>
              <p className="text-center font-mono text-lg mt-2">
                {deviations.map(d => d > 0 ? `+${d}` : d).join(' ')} = <strong className="text-amber-600">0</strong>
              </p>
              <p className="text-amber-700 dark:text-amber-300 text-xs text-center mt-1">
                Las positivas y negativas se cancelan
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <p className="text-purple-800 dark:text-purple-200 text-sm">
              <strong>Solucion:</strong> Elevamos al cuadrado cada desviacion.
              Asi todas se vuelven positivas y podemos sumarlas.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('variance')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <span>Ver la varianza</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: VARIANCE ============
  if (phase === 'variance') {
    const squaredDeviations = data.map(x => Math.pow(x - mean, 2));

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <span className="text-green-600 font-bold">3</span>
            <span className="text-green-700 dark:text-green-300 font-medium">
              La Varianza (σ²)
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Promedio de las desviaciones al cuadrado
          </h2>
        </div>

        {/* Variance calculation */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
          <div className="space-y-2 mb-4">
            {data.map((num, index) => {
              const deviation = deviations[index];
              const squared = squaredDeviations[index];
              return (
                <div key={index} className="flex items-center gap-2 text-sm font-mono bg-white dark:bg-gray-800 p-2 rounded-lg">
                  <span className="text-gray-500">({num} − {mean})² =</span>
                  <span className="text-purple-600">({deviation})² =</span>
                  <span className="font-bold text-green-600">{squared}</span>
                </div>
              );
            })}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 font-mono text-sm">
                Varianza = (suma de cuadrados) / n
              </p>
              <p className="text-lg mt-2 font-mono">
                = ({squaredDeviations.join(' + ')}) / {data.length}
              </p>
              <p className="text-lg font-mono">
                = {squaredDeviations.reduce((a, b) => a + b, 0)} / {data.length}
              </p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                σ² = {variance}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-sm">
            <strong>Problema:</strong> La varianza esta en &ldquo;unidades al cuadrado&rdquo;.
            Si los datos son puntajes, la varianza esta en &ldquo;puntajes²&rdquo;.
            ¡Eso no tiene sentido! Necesitamos sacar la raiz cuadrada.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('stddev')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Ver la desviacion estandar</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 5: STANDARD DEVIATION ============
  if (phase === 'stddev') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <span className="text-blue-600 font-bold">4</span>
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              Desviacion Estandar (σ)
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La medida de dispersion mas usada
          </h2>
        </div>

        {/* Standard deviation calculation */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 font-mono mb-4">
              Desviacion Estandar = √Varianza
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 inline-block">
              <p className="text-xl font-mono">
                σ = √{variance}
              </p>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                σ ≈ {stdDev.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Visual interpretation */}
          <div className="mt-6 relative h-24">
            {/* Axis */}
            <div className="absolute bottom-8 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600 rounded" />

            {/* Standard deviation zones */}
            <div
              className="absolute bottom-8 h-8 bg-blue-200 dark:bg-blue-800/50 opacity-50"
              style={{
                left: `${((mean - stdDev) / 16) * 100}%`,
                width: `${(stdDev * 2 / 16) * 100}%`,
              }}
            />

            {/* Mean line */}
            <div
              className="absolute bottom-8 w-0.5 h-12 bg-purple-500"
              style={{ left: `${(mean / 16) * 100}%`, transform: 'translateX(-50%)' }}
            />

            {/* Data points */}
            {data.map((num, index) => (
              <div
                key={index}
                className="absolute bottom-10 transform -translate-x-1/2"
                style={{ left: `${(num / 16) * 100}%` }}
              >
                <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                  {num}
                </div>
              </div>
            ))}

            {/* Labels */}
            <div
              className="absolute bottom-0 transform -translate-x-1/2 text-xs text-blue-600 dark:text-blue-400"
              style={{ left: `${((mean - stdDev) / 16) * 100}%` }}
            >
              -{stdDev.toFixed(1)}
            </div>
            <div
              className="absolute bottom-0 transform -translate-x-1/2 text-xs text-purple-600 dark:text-purple-400"
              style={{ left: `${(mean / 16) * 100}%` }}
            >
              Media
            </div>
            <div
              className="absolute bottom-0 transform -translate-x-1/2 text-xs text-blue-600 dark:text-blue-400"
              style={{ left: `${((mean + stdDev) / 16) * 100}%` }}
            >
              +{stdDev.toFixed(1)}
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800 dark:text-green-200 text-sm">
              <strong>Interpretacion:</strong> La desviacion estandar nos dice que, en promedio,
              cada dato se aleja <strong>{stdDev.toFixed(2)} unidades</strong> de la media.
              A mayor σ, mas dispersos estan los datos.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('complete')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
          >
            <span>Ver resumen</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 6: COMPLETE ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <Calculator className="w-5 h-5 text-green-600" />
          <span className="text-green-700 dark:text-green-300 font-medium">
            Resumen de Medidas
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Las 3 medidas de dispersion
        </h2>
      </div>

      <div className="space-y-3">
        {/* Range */}
        <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/30 rounded-xl border border-orange-200 dark:border-orange-700">
          <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">R</div>
          <div className="flex-1">
            <p className="font-semibold text-orange-800 dark:text-orange-200">Rango = Max - Min</p>
            <p className="text-sm text-orange-700 dark:text-orange-300">Simple pero usa solo 2 valores</p>
          </div>
          <div className="text-2xl font-bold text-orange-600">{range}</div>
        </div>

        {/* Variance */}
        <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-700">
          <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">σ²</div>
          <div className="flex-1">
            <p className="font-semibold text-green-800 dark:text-green-200">Varianza = Promedio de (x - x̄)²</p>
            <p className="text-sm text-green-700 dark:text-green-300">Usa todos los datos, pero esta al cuadrado</p>
          </div>
          <div className="text-2xl font-bold text-green-600">{variance}</div>
        </div>

        {/* Standard Deviation */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">σ</div>
          <div className="flex-1">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Desviacion Estandar = √Varianza</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">La mas usada: en las mismas unidades que los datos</p>
          </div>
          <div className="text-2xl font-bold text-blue-600">{stdDev.toFixed(2)}</div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>Aprender las formulas</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
