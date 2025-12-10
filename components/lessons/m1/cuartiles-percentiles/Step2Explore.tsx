'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, FlaskConical, Plus, X, Calculator, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'build' | 'discover' | 'complete';

// Available numbers to add
const AVAILABLE_NUMBERS = [10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80];

// Calculate quartiles from data
function calculateQuartiles(data: number[]) {
  if (data.length < 4) {
    return { q1: null, q2: null, q3: null, iqr: null };
  }

  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;

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

  return { q1, q2, q3, iqr };
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('build');
  const [dataset, setDataset] = useState<number[]>([15, 20, 30, 40, 50, 60, 70, 80]);
  const [showCalculation, setShowCalculation] = useState<'q1' | 'q2' | 'q3' | 'iqr' | null>(null);
  const [discoveryStep, setDiscoveryStep] = useState(0);
  const [addedForStep, setAddedForStep] = useState(false);

  const quartiles = useMemo(() => calculateQuartiles(dataset), [dataset]);
  const sortedData = useMemo(() => [...dataset].sort((a, b) => a - b), [dataset]);

  const addNumber = (num: number, force = false) => {
    if (force || dataset.length < 15) {
      setDataset([...dataset, num]);
    }
  };

  const removeNumber = (index: number) => {
    if (dataset.length > 4) {
      setDataset(dataset.filter((_, i) => i !== index));
    }
  };

  if (!isActive) return null;

  // ============ PHASE 1: BUILD - Interactive data sandbox ============
  if (phase === 'build') {
    const mid = Math.floor(sortedData.length / 2);
    const lowerHalf = sortedData.slice(0, mid);
    const upperHalf = sortedData.length % 2 !== 0 ? sortedData.slice(mid + 1) : sortedData.slice(mid);

    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <FlaskConical className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              El Divisor de Datos
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Construye y Divide
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Agrega numeros y observa como se calculan los cuartiles
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
                disabled={dataset.length >= 15}
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

        {/* Current dataset - ordered visualization */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Datos ordenados ({dataset.length} valores):
            </span>
            {dataset.length < 4 && (
              <span className="text-xs text-amber-600 dark:text-amber-400">
                Minimo 4 valores
              </span>
            )}
          </div>

          {/* Visual split showing quartiles */}
          {dataset.length >= 4 && (
            <div className="space-y-2">
              {/* Labels */}
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
                <span>Mitad inferior</span>
                <span>Mitad superior</span>
              </div>

              {/* Data points */}
              <div className="flex items-center gap-1">
                {/* Lower half */}
                <div className="flex-1 flex flex-wrap gap-1 p-2 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg">
                  {lowerHalf.map((num, i) => {
                    const originalIndex = dataset.indexOf(num);
                    return (
                      <button
                        key={`l-${i}`}
                        onClick={() => removeNumber(originalIndex)}
                        className="group relative w-9 h-9 rounded-lg font-bold text-sm bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-600 hover:border-red-400 transition-all"
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

                {/* Q2 marker */}
                <div className="flex flex-col items-center px-1">
                  <div className="w-px h-8 bg-green-500"></div>
                  <span className="text-xs font-bold text-green-600">Q₂</span>
                </div>

                {/* Upper half */}
                <div className="flex-1 flex flex-wrap gap-1 p-2 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg">
                  {upperHalf.map((num, i) => {
                    const originalIndex = dataset.lastIndexOf(num);
                    return (
                      <button
                        key={`u-${i}`}
                        onClick={() => removeNumber(originalIndex)}
                        className="group relative w-9 h-9 rounded-lg font-bold text-sm bg-white dark:bg-gray-700 border border-purple-300 dark:border-purple-600 hover:border-red-400 transition-all"
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
            </div>
          )}
        </div>

        {/* Quartiles dashboard */}
        {dataset.length >= 4 && quartiles.q1 !== null && (
          <div className="grid grid-cols-2 gap-3 animate-fadeIn">
            {/* Q1 */}
            <button
              onClick={() => setShowCalculation(showCalculation === 'q1' ? null : 'q1')}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-left',
                showCalculation === 'q1'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              )}
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Q₁ (25%)</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {quartiles.q1}
              </div>
              <div className="text-xs text-gray-400 mt-1">primer cuartil</div>
            </button>

            {/* Q2 */}
            <button
              onClick={() => setShowCalculation(showCalculation === 'q2' ? null : 'q2')}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-left',
                showCalculation === 'q2'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
              )}
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Q₂ (50%)</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {quartiles.q2}
              </div>
              <div className="text-xs text-gray-400 mt-1">mediana</div>
            </button>

            {/* Q3 */}
            <button
              onClick={() => setShowCalculation(showCalculation === 'q3' ? null : 'q3')}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-left',
                showCalculation === 'q3'
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
              )}
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Q₃ (75%)</div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {quartiles.q3}
              </div>
              <div className="text-xs text-gray-400 mt-1">tercer cuartil</div>
            </button>

            {/* IQR */}
            <button
              onClick={() => setShowCalculation(showCalculation === 'iqr' ? null : 'iqr')}
              className={cn(
                'p-4 rounded-xl border-2 transition-all text-left',
                showCalculation === 'iqr'
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
              )}
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">IQR</div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {quartiles.iqr}
              </div>
              <div className="text-xs text-gray-400 mt-1">rango intercuartilico</div>
            </button>
          </div>
        )}

        {/* Calculation detail */}
        {showCalculation && dataset.length >= 4 && (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 animate-fadeIn">
            <div className="flex items-center gap-2 mb-2">
              <Calculator size={16} className="text-gray-500" />
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Como se calcula:
              </span>
            </div>
            {showCalculation === 'q1' && (
              <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                <p>1. Ordenar: [{sortedData.join(', ')}]</p>
                <p className="mt-1">2. Mitad inferior: [{lowerHalf.join(', ')}]</p>
                <p className="mt-1">3. Q₁ = mediana de mitad inferior</p>
                <p className="mt-1">
                  Q₁ = <strong className="text-blue-600">{quartiles.q1}</strong>
                </p>
              </div>
            )}
            {showCalculation === 'q2' && (
              <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                <p>1. Ordenar: [{sortedData.join(', ')}]</p>
                <p className="mt-1">2. n = {sortedData.length} ({sortedData.length % 2 === 0 ? 'par' : 'impar'})</p>
                <p className="mt-1">
                  3. Q₂ = mediana = <strong className="text-green-600">{quartiles.q2}</strong>
                </p>
              </div>
            )}
            {showCalculation === 'q3' && (
              <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                <p>1. Ordenar: [{sortedData.join(', ')}]</p>
                <p className="mt-1">2. Mitad superior: [{upperHalf.join(', ')}]</p>
                <p className="mt-1">3. Q₃ = mediana de mitad superior</p>
                <p className="mt-1">
                  Q₃ = <strong className="text-purple-600">{quartiles.q3}</strong>
                </p>
              </div>
            )}
            {showCalculation === 'iqr' && (
              <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                <p>IQR = Rango Intercuartilico</p>
                <p className="mt-1">IQR = Q₃ - Q₁</p>
                <p className="mt-1">
                  IQR = {quartiles.q3} - {quartiles.q1} = <strong className="text-orange-600">{quartiles.iqr}</strong>
                </p>
                <p className="mt-2 text-xs">El 50% central de los datos esta en un rango de {quartiles.iqr} unidades</p>
              </div>
            )}
          </div>
        )}

        {/* Continue button */}
        {dataset.length >= 6 && (
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('discover')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
            >
              <span>Descubrir el poder del IQR</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 2: DISCOVER - Guided discovery about IQR and outliers ============
  if (phase === 'discover') {
    const discoveries = [
      {
        instruction: 'Agrega el numero 10 (un valor bajo)',
        targetNum: 10,
        insight: 'Observa: Q₁ bajo un poco pero Q₃ casi no cambio. Los cuartiles son estables.',
      },
      {
        instruction: 'Ahora agrega un valor MUY alto: 150',
        targetNum: 150,
        insight: '¡Mira! A pesar del valor extremo, Q₁ y Q₂ casi no cambiaron. Los cuartiles resisten valores atipicos.',
      },
      {
        instruction: 'Agrega otro valor extremo: 200',
        targetNum: 200,
        insight: 'El IQR nos ayuda a detectar estos valores atipicos (outliers). Valores fuera de Q₁-1.5×IQR o Q₃+1.5×IQR son sospechosos.',
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
            {sortedData.map((num, index) => (
              <div
                key={index}
                className={cn(
                  'w-10 h-10 rounded-lg font-bold text-sm flex items-center justify-center border-2',
                  num > 100
                    ? 'bg-red-100 dark:bg-red-900/50 border-red-400 text-red-700'
                    : 'bg-white dark:bg-gray-700 border-amber-300'
                )}
              >
                {num}
              </div>
            ))}
            {!addedForStep && (
              <button
                onClick={() => {
                  addNumber(currentDiscovery.targetNum, true);
                  setAddedForStep(true);
                }}
                className="w-10 h-10 rounded-lg font-bold text-lg bg-amber-500 text-white border-2 border-amber-600 flex items-center justify-center hover:bg-amber-600 transition-all animate-pulse"
              >
                <Plus size={20} />
              </button>
            )}
          </div>
          {!addedForStep && (
            <p className="text-center text-sm text-amber-600 dark:text-amber-400 mt-2">
              Toca + para agregar {currentDiscovery.targetNum}
            </p>
          )}
        </div>

        {/* Live quartiles */}
        <div className="grid grid-cols-4 gap-2">
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-center">
            <div className="text-xs text-blue-500">Q₁</div>
            <div className="font-bold text-blue-600">{quartiles.q1}</div>
          </div>
          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/30 text-center">
            <div className="text-xs text-green-500">Q₂</div>
            <div className="font-bold text-green-600">{quartiles.q2}</div>
          </div>
          <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-center">
            <div className="text-xs text-purple-500">Q₃</div>
            <div className="font-bold text-purple-600">{quartiles.q3}</div>
          </div>
          <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/30 text-center">
            <div className="text-xs text-orange-500">IQR</div>
            <div className="font-bold text-orange-600">{quartiles.iqr}</div>
          </div>
        </div>

        {/* Insight after adding */}
        {addedForStep && (
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700 animate-fadeIn">
            <p className="text-green-800 dark:text-green-200">
              <strong>¡Observa!</strong> {currentDiscovery.insight}
            </p>
            <div className="mt-3 flex justify-center">
              <button
                onClick={() => {
                  if (discoveryStep < discoveries.length - 1) {
                    setDiscoveryStep(discoveryStep + 1);
                    setAddedForStep(false);
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
            <p className="font-semibold text-blue-800 dark:text-blue-200">Los cuartiles dividen en 4</p>
            <p className="text-sm text-blue-700 dark:text-blue-300">Q₁ (25%), Q₂ (50% = mediana), Q₃ (75%)</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">2</div>
          <div>
            <p className="font-semibold text-green-800 dark:text-green-200">Son resistentes a extremos</p>
            <p className="text-sm text-green-700 dark:text-green-300">Valores muy altos o bajos no los afectan mucho</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/30 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">3</div>
          <div>
            <p className="font-semibold text-orange-800 dark:text-orange-200">El IQR mide la dispersion central</p>
            <p className="text-sm text-orange-700 dark:text-orange-300">IQR = Q₃ - Q₁ contiene el 50% de los datos</p>
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
