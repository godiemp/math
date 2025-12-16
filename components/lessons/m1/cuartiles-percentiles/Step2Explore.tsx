'use client';

import { useState } from 'react';
import { ArrowRight, Target, Calculator, Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'step1' | 'step2' | 'step3' | 'summary';

// Example dataset - 9 values for clean odd case
const DATA = [12, 18, 24, 30, 36, 42, 48, 54, 60];
const SORTED_DATA = [...DATA].sort((a, b) => a - b);
const N = SORTED_DATA.length; // 9

// For n=9 (odd): median is at position 5 (index 4)
const MEDIAN_INDEX = 4;
const MEDIAN = SORTED_DATA[MEDIAN_INDEX]; // 36

// Lower half: indices 0-3 (without median)
const LOWER_HALF = SORTED_DATA.slice(0, MEDIAN_INDEX); // [12, 18, 24, 30]
// Upper half: indices 5-8 (without median)
const UPPER_HALF = SORTED_DATA.slice(MEDIAN_INDEX + 1); // [42, 48, 54, 60]

// Q1 = median of lower half [12, 18, 24, 30] = (18+24)/2 = 21
const Q1 = (LOWER_HALF[1] + LOWER_HALF[2]) / 2; // 21
// Q3 = median of upper half [42, 48, 54, 60] = (48+54)/2 = 51
const Q3 = (UPPER_HALF[1] + UPPER_HALF[2]) / 2; // 51

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  if (!isActive) return null;

  const markStepComplete = (step: string) => {
    setCompletedSteps(new Set([...completedSteps, step]));
  };

  // ============ INTRO: Set up the problem ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Calculator className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              ¡Tu turno de calcular!
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Encontremos los Cuartiles
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Apliquemos lo que aprendiste: los cuartiles son 3 medianas
          </p>
        </div>

        {/* Dataset presentation */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-4 text-center">
            Aqui tienes {N} datos ordenados:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {SORTED_DATA.map((val, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-lg bg-white dark:bg-gray-700 border-2 border-blue-300 flex items-center justify-center font-bold text-blue-700 dark:text-blue-300"
              >
                {val}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            n = {N} (impar)
          </p>
        </div>

        {/* Steps preview */}
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Vamos paso a paso:
          </p>
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">1</div>
            <span className="text-green-800 dark:text-green-200">Encontrar Q₂ (la mediana de todos)</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">2</div>
            <span className="text-blue-800 dark:text-blue-200">Encontrar Q₁ (mediana de la mitad inferior)</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">3</div>
            <span className="text-purple-800 dark:text-purple-200">Encontrar Q₃ (mediana de la mitad superior)</span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('step1')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <span>¡Empezar!</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ STEP 1: Find Q2 (median) ============
  if (phase === 'step1') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <Target className="w-5 h-5 text-green-600" />
            <span className="text-green-700 dark:text-green-300 font-medium">
              Paso 1 de 3
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Encontrar Q₂ (Mediana)
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cual es el valor del medio?
          </p>
        </div>

        {/* Data with positions */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
          <p className="text-sm text-green-600 dark:text-green-400 mb-2 text-center">
            {N} datos ordenados:
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {SORTED_DATA.map((val, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-xs text-gray-400 mb-1">{i + 1}°</span>
                <div
                  className={cn(
                    'w-12 h-12 rounded-lg flex items-center justify-center font-bold transition-all',
                    i === MEDIAN_INDEX
                      ? 'bg-green-500 text-white border-2 border-green-600 scale-110'
                      : 'bg-white dark:bg-gray-700 border-2 border-gray-300 text-gray-700 dark:text-gray-300'
                  )}
                >
                  {val}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Con n = {N} (impar), el valor del medio esta en la posicion {MEDIAN_INDEX + 1}
          </p>
        </div>

        {/* Explanation */}
        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
          <p className="text-green-800 dark:text-green-200 text-center">
            <strong>Q₂ = {MEDIAN}</strong> (el {MEDIAN_INDEX + 1}° valor)
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 text-center mt-2">
            Hay {MEDIAN_INDEX} valores antes y {MEDIAN_INDEX} valores despues
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              markStepComplete('q2');
              setPhase('step2');
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <Check size={20} />
            <span>Q₂ = {MEDIAN} ¡Listo!</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ STEP 2: Find Q1 ============
  if (phase === 'step2') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              Paso 2 de 3
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Encontrar Q₁
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Mediana de la mitad inferior (SIN incluir Q₂)
          </p>
        </div>

        {/* Data split visualization */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {/* Lower half */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-blue-600 mb-2 font-medium">Mitad inferior</span>
              <div className="flex gap-1 p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                {LOWER_HALF.map((val, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-11 h-11 rounded-lg flex items-center justify-center font-bold text-sm transition-all',
                      (i === 1 || i === 2)
                        ? 'bg-blue-500 text-white border-2 border-blue-600 scale-105'
                        : 'bg-white dark:bg-gray-700 border border-blue-300 text-blue-700 dark:text-blue-300'
                    )}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>

            {/* Q2 marker */}
            <div className="flex flex-col items-center px-2 opacity-50">
              <span className="text-xs text-green-600 mb-2 font-medium">Q₂</span>
              <div className="w-11 h-11 rounded-lg bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                {MEDIAN}
              </div>
            </div>

            {/* Upper half (dimmed) */}
            <div className="flex flex-col items-center opacity-30">
              <span className="text-xs text-gray-500 mb-2 font-medium">Mitad superior</span>
              <div className="flex gap-1 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                {UPPER_HALF.map((val, i) => (
                  <div
                    key={i}
                    className="w-11 h-11 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 flex items-center justify-center font-bold text-sm text-gray-500"
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calculation */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <p className="text-blue-800 dark:text-blue-200 mb-2">
            Mitad inferior: [{LOWER_HALF.join(', ')}]
          </p>
          <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
            Con 4 valores (par), la mediana es el promedio de los 2 del medio:
          </p>
          <p className="text-blue-800 dark:text-blue-200 text-center font-mono text-lg">
            Q₁ = ({LOWER_HALF[1]} + {LOWER_HALF[2]}) ÷ 2 = <strong>{Q1}</strong>
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              markStepComplete('q1');
              setPhase('step3');
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
          >
            <Check size={20} />
            <span>Q₁ = {Q1} ¡Listo!</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ STEP 3: Find Q3 ============
  if (phase === 'step3') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <Target className="w-5 h-5 text-purple-600" />
            <span className="text-purple-700 dark:text-purple-300 font-medium">
              Paso 3 de 3
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Encontrar Q₃
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Mediana de la mitad superior (SIN incluir Q₂)
          </p>
        </div>

        {/* Data split visualization */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {/* Lower half (dimmed) */}
            <div className="flex flex-col items-center opacity-30">
              <span className="text-xs text-gray-500 mb-2 font-medium">Mitad inferior</span>
              <div className="flex gap-1 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                {LOWER_HALF.map((val, i) => (
                  <div
                    key={i}
                    className="w-11 h-11 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 flex items-center justify-center font-bold text-sm text-gray-500"
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>

            {/* Q2 marker */}
            <div className="flex flex-col items-center px-2 opacity-50">
              <span className="text-xs text-green-600 mb-2 font-medium">Q₂</span>
              <div className="w-11 h-11 rounded-lg bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                {MEDIAN}
              </div>
            </div>

            {/* Upper half */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-purple-600 mb-2 font-medium">Mitad superior</span>
              <div className="flex gap-1 p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                {UPPER_HALF.map((val, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-11 h-11 rounded-lg flex items-center justify-center font-bold text-sm transition-all',
                      (i === 1 || i === 2)
                        ? 'bg-purple-500 text-white border-2 border-purple-600 scale-105'
                        : 'bg-white dark:bg-gray-700 border border-purple-300 text-purple-700 dark:text-purple-300'
                    )}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calculation */}
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <p className="text-purple-800 dark:text-purple-200 mb-2">
            Mitad superior: [{UPPER_HALF.join(', ')}]
          </p>
          <p className="text-purple-700 dark:text-purple-300 text-sm mb-2">
            Con 4 valores (par), la mediana es el promedio de los 2 del medio:
          </p>
          <p className="text-purple-800 dark:text-purple-200 text-center font-mono text-lg">
            Q₃ = ({UPPER_HALF[1]} + {UPPER_HALF[2]}) ÷ 2 = <strong>{Q3}</strong>
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              markStepComplete('q3');
              setPhase('summary');
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <Check size={20} />
            <span>Q₃ = {Q3} ¡Listo!</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ SUMMARY: All quartiles found ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-green-600" />
          <span className="text-green-700 dark:text-green-300 font-medium">
            ¡Completado!
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Los 3 Cuartiles
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Dividiste los datos en 4 partes iguales
        </p>
      </div>

      {/* Visual summary */}
      <div className="bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 dark:from-blue-900/20 dark:via-green-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center gap-1 flex-wrap">
          {/* 25% below Q1 */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1">
              {LOWER_HALF.slice(0, 2).map((val, i) => (
                <div key={i} className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 border border-blue-300 flex items-center justify-center font-bold text-xs text-blue-700">
                  {val}
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-500 mt-1">25%</span>
          </div>

          {/* Q1 */}
          <div className="flex flex-col items-center mx-1">
            <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold">
              {Q1}
            </div>
            <span className="text-xs font-bold text-blue-600">Q₁</span>
          </div>

          {/* 25% between Q1-Q2 */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1">
              {LOWER_HALF.slice(2).map((val, i) => (
                <div key={i} className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 border border-green-300 flex items-center justify-center font-bold text-xs text-green-700">
                  {val}
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-500 mt-1">25%</span>
          </div>

          {/* Q2 */}
          <div className="flex flex-col items-center mx-1">
            <div className="w-12 h-12 rounded-lg bg-green-500 text-white flex items-center justify-center font-bold">
              {MEDIAN}
            </div>
            <span className="text-xs font-bold text-green-600">Q₂</span>
          </div>

          {/* 25% between Q2-Q3 */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1">
              {UPPER_HALF.slice(0, 2).map((val, i) => (
                <div key={i} className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 border border-purple-300 flex items-center justify-center font-bold text-xs text-purple-700">
                  {val}
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-500 mt-1">25%</span>
          </div>

          {/* Q3 */}
          <div className="flex flex-col items-center mx-1">
            <div className="w-12 h-12 rounded-lg bg-purple-500 text-white flex items-center justify-center font-bold">
              {Q3}
            </div>
            <span className="text-xs font-bold text-purple-600">Q₃</span>
          </div>

          {/* 25% above Q3 */}
          <div className="flex flex-col items-center">
            <div className="flex gap-1">
              {UPPER_HALF.slice(2).map((val, i) => (
                <div key={i} className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/50 border border-pink-300 flex items-center justify-center font-bold text-xs text-pink-700">
                  {val}
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-500 mt-1">25%</span>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-center">
          <div className="text-xs text-blue-600 uppercase tracking-wide">Primer Cuartil</div>
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">Q₁ = {Q1}</div>
          <div className="text-xs text-blue-500 mt-1">25% por debajo</div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl text-center">
          <div className="text-xs text-green-600 uppercase tracking-wide">Mediana</div>
          <div className="text-2xl font-bold text-green-700 dark:text-green-300">Q₂ = {MEDIAN}</div>
          <div className="text-xs text-green-500 mt-1">50% por debajo</div>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl text-center">
          <div className="text-xs text-purple-600 uppercase tracking-wide">Tercer Cuartil</div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">Q₃ = {Q3}</div>
          <div className="text-xs text-purple-500 mt-1">75% por debajo</div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-green-800 dark:text-green-200 font-semibold">
              ¡Ahora puedes calcular cuartiles!
            </p>
            <p className="text-green-700 dark:text-green-300 text-sm mt-1">
              Recuerda: con n impar, <strong>no incluyas la mediana</strong> al dividir en mitades.
              Con n par, simplemente divides a la mitad.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>Aprender sobre el IQR</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
