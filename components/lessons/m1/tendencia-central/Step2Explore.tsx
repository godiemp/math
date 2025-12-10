'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, FlaskConical, Plus, X, Calculator, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'build' | 'discover' | 'complete';

// Available numbers to add
const AVAILABLE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15];

// Calculate all central tendency measures
function calculateMeasures(data: number[]) {
  if (data.length === 0) {
    return { mean: null, median: null, mode: null, range: null };
  }

  // Mean
  const sum = data.reduce((a, b) => a + b, 0);
  const mean = sum / data.length;

  // Median
  const sorted = [...data].sort((a, b) => a - b);
  let median: number;
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) {
    median = sorted[mid];
  } else {
    median = (sorted[mid - 1] + sorted[mid]) / 2;
  }

  // Mode
  const freq: Record<number, number> = {};
  data.forEach(n => freq[n] = (freq[n] || 0) + 1);
  const maxFreq = Math.max(...Object.values(freq));
  let mode: number[] | null = null;
  if (maxFreq > 1) {
    mode = Object.entries(freq)
      .filter(([, f]) => f === maxFreq)
      .map(([v]) => Number(v));
  }

  // Range
  const range = Math.max(...data) - Math.min(...data);

  return { mean, median, mode, range };
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('build');
  const [dataset, setDataset] = useState<number[]>([3, 5, 7, 7, 9]);
  const [showCalculation, setShowCalculation] = useState<'mean' | 'median' | 'mode' | 'range' | null>(null);
  const [discoveryStep, setDiscoveryStep] = useState(0);

  const measures = useMemo(() => calculateMeasures(dataset), [dataset]);
  const sortedData = useMemo(() => [...dataset].sort((a, b) => a - b), [dataset]);

  const addNumber = (num: number) => {
    if (dataset.length < 12) {
      setDataset([...dataset, num]);
    }
  };

  const removeNumber = (index: number) => {
    setDataset(dataset.filter((_, i) => i !== index));
  };

  if (!isActive) return null;

  // ============ PHASE 1: BUILD - Interactive data sandbox ============
  if (phase === 'build') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <FlaskConical className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              El Laboratorio de Datos
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Construye tu Conjunto de Datos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Agrega y quita numeros para ver como cambian las medidas
          </p>
        </div>

        {/* Number pool */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-center">
            Toca un numero para agregarlo:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {AVAILABLE_NUMBERS.map((num) => (
              <button
                key={num}
                onClick={() => addNumber(num)}
                disabled={dataset.length >= 12}
                className={cn(
                  'w-10 h-10 rounded-lg font-bold text-lg transition-all',
                  'bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600',
                  'hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Current dataset */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Tu conjunto de datos ({dataset.length} valores):
            </span>
            {dataset.length < 3 && (
              <span className="text-xs text-amber-600 dark:text-amber-400">
                Minimo 3 valores
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 min-h-12">
            {dataset.map((num, index) => (
              <button
                key={index}
                onClick={() => removeNumber(index)}
                className="group relative w-10 h-10 rounded-lg font-bold text-lg bg-white dark:bg-gray-700 border-2 border-blue-300 dark:border-blue-600 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all"
              >
                {num}
                <X
                  size={14}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </button>
            ))}
            {dataset.length === 0 && (
              <span className="text-gray-400 dark:text-gray-500 italic">
                Agrega numeros arriba
              </span>
            )}
          </div>
        </div>

        {/* Measures dashboard */}
        {dataset.length >= 3 && (
          <div className="grid grid-cols-2 gap-3 animate-fadeIn">
            {/* Mean */}
            <button
              onClick={() => setShowCalculation(showCalculation === 'mean' ? null : 'mean')}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-left',
                showCalculation === 'mean'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              )}
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Media</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {measures.mean?.toFixed(1)}
              </div>
              <div className="text-xs text-gray-400 mt-1">promedio</div>
            </button>

            {/* Median */}
            <button
              onClick={() => setShowCalculation(showCalculation === 'median' ? null : 'median')}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-left',
                showCalculation === 'median'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
              )}
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Mediana</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {measures.median}
              </div>
              <div className="text-xs text-gray-400 mt-1">valor central</div>
            </button>

            {/* Mode */}
            <button
              onClick={() => setShowCalculation(showCalculation === 'mode' ? null : 'mode')}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-left',
                showCalculation === 'mode'
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
              )}
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Moda</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {measures.mode ? measures.mode.join(', ') : '---'}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {measures.mode
                  ? measures.mode.length > 1 ? 'bimodal' : 'mas frecuente'
                  : 'sin moda'}
              </div>
            </button>

            {/* Range */}
            <button
              onClick={() => setShowCalculation(showCalculation === 'range' ? null : 'range')}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-left',
                showCalculation === 'range'
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
              )}
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Rango</div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {measures.range}
              </div>
              <div className="text-xs text-gray-400 mt-1">dispersion</div>
            </button>
          </div>
        )}

        {/* Calculation detail */}
        {showCalculation && dataset.length >= 3 && (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 animate-fadeIn">
            <div className="flex items-center gap-2 mb-2">
              <Calculator size={16} className="text-gray-500" />
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Como se calcula:
              </span>
            </div>
            {showCalculation === 'mean' && (
              <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                <p>Media = (suma de todos) / n</p>
                <p className="mt-1">
                  = ({dataset.join(' + ')}) / {dataset.length}
                </p>
                <p className="mt-1">
                  = {dataset.reduce((a, b) => a + b, 0)} / {dataset.length} = <strong className="text-blue-600">{measures.mean?.toFixed(1)}</strong>
                </p>
              </div>
            )}
            {showCalculation === 'median' && (
              <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                <p>1. Ordenar: [{sortedData.join(', ')}]</p>
                <p className="mt-1">
                  2. {dataset.length % 2 !== 0
                    ? `n impar (${dataset.length}), tomar el valor central`
                    : `n par (${dataset.length}), promediar los dos del medio`}
                </p>
                <p className="mt-1">
                  Mediana = <strong className="text-green-600">{measures.median}</strong>
                </p>
              </div>
            )}
            {showCalculation === 'mode' && (
              <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                <p>Contar frecuencias:</p>
                {Object.entries(
                  dataset.reduce((acc, n) => ({ ...acc, [n]: (acc[n] || 0) + 1 }), {} as Record<number, number>)
                ).map(([val, freq]) => (
                  <p key={val} className="ml-2">
                    {val}: {freq} {freq > 1 ? 'veces' : 'vez'}
                  </p>
                ))}
                <p className="mt-1">
                  Moda = <strong className="text-purple-600">{measures.mode ? measures.mode.join(', ') : 'ninguna'}</strong>
                </p>
              </div>
            )}
            {showCalculation === 'range' && (
              <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                <p>Rango = Maximo - Minimo</p>
                <p className="mt-1">
                  = {Math.max(...dataset)} - {Math.min(...dataset)} = <strong className="text-orange-600">{measures.range}</strong>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Continue button */}
        {dataset.length >= 5 && (
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('discover')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
            >
              <span>Descubrir algo importante</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 2: DISCOVER - Guided discovery ============
  if (phase === 'discover') {
    const discoveries = [
      {
        instruction: 'Agrega el numero 15 a tu conjunto',
        targetNum: 15,
        insight: '¿Notaste como la MEDIA subio bastante? Un solo valor alto la afecta mucho.',
      },
      {
        instruction: 'Ahora agrega otro 7 (o el valor que mas se repite)',
        targetNum: 7,
        insight: '¡Aparecio una MODA! Es el valor que mas se repite.',
      },
      {
        instruction: 'Finalmente, agrega un numero muy alto: 50',
        targetNum: 50,
        insight: 'La MEDIA salto muchisimo, pero la MEDIANA casi no cambio. ¡La mediana resiste valores extremos!',
      },
    ];

    const currentDiscovery = discoveries[discoveryStep];

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <span className="text-amber-700 dark:text-amber-300 font-medium">
              Descubrimiento {discoveryStep + 1} de {discoveries.length}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {currentDiscovery.instruction}
          </h2>
        </div>

        {/* Current dataset */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <div className="flex flex-wrap gap-2 justify-center">
            {dataset.map((num, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-lg font-bold text-lg bg-white dark:bg-gray-700 border-2 border-amber-300 flex items-center justify-center"
              >
                {num}
              </div>
            ))}
            <button
              onClick={() => {
                addNumber(currentDiscovery.targetNum);
              }}
              className="w-10 h-10 rounded-lg font-bold text-lg bg-amber-500 text-white border-2 border-amber-600 flex items-center justify-center hover:bg-amber-600 transition-all animate-pulse"
            >
              <Plus size={20} />
            </button>
          </div>
          <p className="text-center text-sm text-amber-600 dark:text-amber-400 mt-2">
            Toca + para agregar {currentDiscovery.targetNum}
          </p>
        </div>

        {/* Live measures */}
        <div className="grid grid-cols-4 gap-2">
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-center">
            <div className="text-xs text-blue-500">Media</div>
            <div className="font-bold text-blue-600">{measures.mean?.toFixed(1)}</div>
          </div>
          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/30 text-center">
            <div className="text-xs text-green-500">Mediana</div>
            <div className="font-bold text-green-600">{measures.median}</div>
          </div>
          <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-center">
            <div className="text-xs text-purple-500">Moda</div>
            <div className="font-bold text-purple-600">{measures.mode?.join(',') || '---'}</div>
          </div>
          <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/30 text-center">
            <div className="text-xs text-orange-500">Rango</div>
            <div className="font-bold text-orange-600">{measures.range}</div>
          </div>
        </div>

        {/* Insight after adding */}
        {dataset.includes(currentDiscovery.targetNum) && (
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700 animate-fadeIn">
            <p className="text-green-800 dark:text-green-200">
              <strong>¡Observa!</strong> {currentDiscovery.insight}
            </p>
            <div className="mt-3 flex justify-center">
              <button
                onClick={() => {
                  if (discoveryStep < discoveries.length - 1) {
                    setDiscoveryStep(discoveryStep + 1);
                  } else {
                    setPhase('complete');
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all"
              >
                <span>{discoveryStep < discoveries.length - 1 ? 'Siguiente descubrimiento' : 'Continuar'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 3: COMPLETE - Summary ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <Lightbulb className="w-5 h-5 text-green-600" />
          <span className="text-green-700 dark:text-green-300 font-medium">
            Descubrimientos clave
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Lo que aprendiste!
        </h2>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</div>
          <div>
            <p className="font-semibold text-blue-800 dark:text-blue-200">La Media es sensible</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Un valor muy alto o bajo la afecta mucho</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">2</div>
          <div>
            <p className="font-semibold text-green-800 dark:text-green-200">La Mediana es resistente</p>
            <p className="text-sm text-green-700 dark:text-green-300">No cambia mucho con valores extremos</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">3</div>
          <div>
            <p className="font-semibold text-purple-800 dark:text-purple-200">La Moda muestra lo popular</p>
            <p className="text-sm text-purple-700 dark:text-purple-300">El valor que mas se repite (si existe)</p>
          </div>
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
