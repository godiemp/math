'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, Sparkles, Target } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'review' | 'question' | 'reveal';

// Simple dataset to illustrate the concept - 7 values for clean odd case
const DATA = [10, 20, 30, 40, 50, 60, 70];
const MEDIAN = 40; // The middle value
const LOWER_HALF = [10, 20, 30];
const UPPER_HALF = [50, 60, 70];
const Q1 = 20; // Median of lower half
const Q3 = 60; // Median of upper half

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('review');

  if (!isActive) return null;

  // ============ PHASE 1: REVIEW - Connect to prior knowledge ============
  if (phase === 'review') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <Target className="w-5 h-5 text-green-600" />
            <span className="text-green-700 dark:text-green-300 font-medium">
              ¿Recuerdas la mediana?
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            La Mediana Divide en 2
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ya sabes encontrar el valor del medio. ¡Repasemos!
          </p>
        </div>

        {/* Data visualization with median highlighted */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
          <p className="text-sm text-green-600 dark:text-green-400 mb-4 text-center">
            Datos ordenados:
          </p>
          <div className="flex items-center justify-center gap-2">
            {/* Lower half */}
            <div className="flex gap-2 p-2 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg">
              {LOWER_HALF.map((val, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-lg bg-white dark:bg-gray-700 border-2 border-blue-300 flex items-center justify-center font-bold text-blue-700 dark:text-blue-300"
                >
                  {val}
                </div>
              ))}
            </div>

            {/* Median */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-green-500 border-2 border-green-600 flex items-center justify-center font-bold text-white text-lg shadow-lg">
                {MEDIAN}
              </div>
              <span className="text-xs font-bold text-green-600 mt-1">MEDIANA</span>
            </div>

            {/* Upper half */}
            <div className="flex gap-2 p-2 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg">
              {UPPER_HALF.map((val, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-lg bg-white dark:bg-gray-700 border-2 border-purple-300 flex items-center justify-center font-bold text-purple-700 dark:text-purple-300"
                >
                  {val}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-around mt-4 text-sm">
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Mitad inferior (50%)
            </span>
            <span className="text-purple-600 dark:text-purple-400 font-medium">
              Mitad superior (50%)
            </span>
          </div>
        </div>

        {/* Key insight */}
        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
          <p className="text-green-800 dark:text-green-200 text-center">
            La mediana divide los datos en <strong>2 partes iguales</strong> de 50% cada una.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('question')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Entendido, ¿que sigue?</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: QUESTION - The key insight ============
  if (phase === 'question') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <span className="text-amber-700 dark:text-amber-300 font-medium">
              Una idea poderosa
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Y si dividimos MAS?
          </h2>
        </div>

        {/* The question visualization */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
          <p className="text-amber-800 dark:text-amber-200 text-center mb-4">
            Ya tenemos la mediana de TODOS los datos...
          </p>

          <div className="flex items-center justify-center gap-2 mb-6">
            {/* Lower half with question */}
            <div className="flex flex-col items-center">
              <div className="flex gap-1 p-2 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg">
                {LOWER_HALF.map((val, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 border-2 border-blue-300 flex items-center justify-center font-bold text-sm text-blue-700 dark:text-blue-300"
                  >
                    {val}
                  </div>
                ))}
              </div>
              <div className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-bold animate-pulse">
                ¿Mediana de estos?
              </div>
            </div>

            {/* Center */}
            <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center font-bold text-white">
              {MEDIAN}
            </div>

            {/* Upper half with question */}
            <div className="flex flex-col items-center">
              <div className="flex gap-1 p-2 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg">
                {UPPER_HALF.map((val, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 border-2 border-purple-300 flex items-center justify-center font-bold text-sm text-purple-700 dark:text-purple-300"
                  >
                    {val}
                  </div>
                ))}
              </div>
              <div className="mt-2 px-3 py-1 bg-purple-500 text-white rounded-full text-sm font-bold animate-pulse">
                ¿Mediana de estos?
              </div>
            </div>
          </div>

          <p className="text-amber-800 dark:text-amber-200 text-center font-semibold">
            ¿Que pasa si encontramos la mediana de CADA MITAD?
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('reveal')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            <span>¡Ver que pasa!</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: REVEAL - Introducing quartiles ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="text-purple-700 dark:text-purple-300 font-medium">
            ¡Nacen los Cuartiles!
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Ahora Tenemos 4 Partes
        </h2>
      </div>

      {/* The reveal visualization */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
        <div className="flex items-center justify-center gap-1">
          {/* Section 1: below Q1 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 border border-blue-300 flex items-center justify-center font-bold text-sm">10</div>
            <span className="text-xs text-gray-500 mt-1">25%</span>
          </div>

          {/* Q1 marker */}
          <div className="flex flex-col items-center mx-1">
            <div className="w-11 h-11 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-white">20</div>
            <span className="text-xs font-bold text-blue-600">Q₁</span>
          </div>

          {/* Section 2: Q1 to Q2 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 border border-blue-300 flex items-center justify-center font-bold text-sm">30</div>
            <span className="text-xs text-gray-500 mt-1">25%</span>
          </div>

          {/* Q2 marker (median) */}
          <div className="flex flex-col items-center mx-1">
            <div className="w-11 h-11 rounded-lg bg-green-500 flex items-center justify-center font-bold text-white">40</div>
            <span className="text-xs font-bold text-green-600">Q₂</span>
          </div>

          {/* Section 3: Q2 to Q3 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 border border-purple-300 flex items-center justify-center font-bold text-sm">50</div>
            <span className="text-xs text-gray-500 mt-1">25%</span>
          </div>

          {/* Q3 marker */}
          <div className="flex flex-col items-center mx-1">
            <div className="w-11 h-11 rounded-lg bg-purple-500 flex items-center justify-center font-bold text-white">60</div>
            <span className="text-xs font-bold text-purple-600">Q₃</span>
          </div>

          {/* Section 4: above Q3 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 border border-purple-300 flex items-center justify-center font-bold text-sm">70</div>
            <span className="text-xs text-gray-500 mt-1">25%</span>
          </div>
        </div>
      </div>

      {/* Explanation cards - THE KEY INSIGHT */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
          <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-white">Q₁</div>
          <div>
            <p className="font-semibold text-blue-800 dark:text-blue-200">Primer Cuartil = {Q1}</p>
            <p className="text-sm text-blue-600 dark:text-blue-400">Mediana de [{LOWER_HALF.join(', ')}] → el del medio es <strong>{Q1}</strong></p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-xl">
          <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center font-bold text-white">Q₂</div>
          <div>
            <p className="font-semibold text-green-800 dark:text-green-200">Segundo Cuartil = {MEDIAN}</p>
            <p className="text-sm text-green-600 dark:text-green-400">¡La mediana que ya conocias!</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
          <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center font-bold text-white">Q₃</div>
          <div>
            <p className="font-semibold text-purple-800 dark:text-purple-200">Tercer Cuartil = {Q3}</p>
            <p className="text-sm text-purple-600 dark:text-purple-400">Mediana de [{UPPER_HALF.join(', ')}] → el del medio es <strong>{Q3}</strong></p>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-green-800 dark:text-green-200 font-semibold">
              ¡Asi de simple!
            </p>
            <p className="text-green-700 dark:text-green-300 text-sm mt-1">
              Los cuartiles son solo <strong>3 medianas</strong>: la del medio (Q₂),
              la de la mitad inferior (Q₁) y la de la mitad superior (Q₃).
              Dividen los datos en <strong>4 partes de 25%</strong> cada una.
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
          <span>¡Practicar calculando!</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
