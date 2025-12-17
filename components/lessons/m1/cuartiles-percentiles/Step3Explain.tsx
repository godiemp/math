'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, BarChart3, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'intro' | 'formula' | 'meaning' | 'example';

// Use same data from Step2Explore for continuity
const DATA = [12, 18, 24, 30, 36, 42, 48, 54, 60];
const Q1 = 21; // (18+24)/2
const Q2 = 36;
const Q3 = 51; // (48+54)/2
const IQR = Q3 - Q1; // 30

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');

  if (!isActive) return null;

  // ============ INTRO: The key question ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
            <Lightbulb className="w-5 h-5 text-orange-600" />
            <span className="text-orange-700 dark:text-orange-300 font-medium">
              El siguiente paso
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Que hay entre Q₁ y Q₃?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ya sabes calcular los cuartiles. Ahora veamos que podemos hacer con ellos.
          </p>
        </div>

        {/* Visual reminder of quartiles */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
          <p className="text-sm text-orange-600 dark:text-orange-400 mb-4 text-center">
            Recuerda los cuartiles que calculaste:
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {/* Below Q1 */}
            <div className="flex gap-1 opacity-50">
              {DATA.slice(0, 2).map((val, i) => (
                <div key={i} className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center font-bold text-xs text-gray-500">
                  {val}
                </div>
              ))}
            </div>

            {/* Q1 */}
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold">
                {Q1}
              </div>
              <span className="text-xs font-bold text-blue-600">Q₁</span>
            </div>

            {/* Between Q1 and Q3 - THE MIDDLE 50% */}
            <div className="flex gap-1 p-2 bg-orange-200/50 dark:bg-orange-800/30 rounded-lg border-2 border-orange-400 border-dashed">
              {DATA.slice(2, 4).map((val, i) => (
                <div key={i} className="w-9 h-9 rounded-lg bg-orange-100 dark:bg-orange-900/50 border border-orange-300 flex items-center justify-center font-bold text-xs text-orange-700">
                  {val}
                </div>
              ))}
              <div className="w-9 h-9 rounded-lg bg-green-500 text-white flex items-center justify-center font-bold text-xs">
                {Q2}
              </div>
              {DATA.slice(5, 7).map((val, i) => (
                <div key={i} className="w-9 h-9 rounded-lg bg-orange-100 dark:bg-orange-900/50 border border-orange-300 flex items-center justify-center font-bold text-xs text-orange-700">
                  {val}
                </div>
              ))}
            </div>

            {/* Q3 */}
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-lg bg-purple-500 text-white flex items-center justify-center font-bold">
                {Q3}
              </div>
              <span className="text-xs font-bold text-purple-600">Q₃</span>
            </div>

            {/* Above Q3 */}
            <div className="flex gap-1 opacity-50">
              {DATA.slice(7).map((val, i) => (
                <div key={i} className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center font-bold text-xs text-gray-500">
                  {val}
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-sm text-orange-700 dark:text-orange-300 mt-4 font-medium">
            El area marcada contiene el <strong>50% central</strong> de los datos
          </p>
        </div>

        {/* The insight */}
        <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 border border-orange-200 dark:border-orange-700">
          <p className="text-orange-800 dark:text-orange-200 text-center">
            ¿Que tan <strong>dispersos</strong> estan estos datos del medio?<br />
            ¿Estan muy juntos o muy separados?
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('formula')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
          >
            <span>Descubrir el IQR</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ FORMULA: Introducing IQR ============
  if (phase === 'formula') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
            <BarChart3 className="w-5 h-5 text-orange-600" />
            <span className="text-orange-700 dark:text-orange-300 font-medium">
              El Rango Intercuartilico
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            IQR = Q₃ - Q₁
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Una formula simple pero poderosa
          </p>
        </div>

        {/* The formula card */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
          <div className="flex items-start justify-center gap-4 text-2xl font-bold">
            <div className="text-center">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                <span className="text-purple-600">{Q3}</span>
              </div>
              <span className="text-xs text-purple-600 mt-1 block">Q₃</span>
            </div>
            <div className="p-4 flex items-center">
              <span className="text-gray-500">-</span>
            </div>
            <div className="text-center">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                <span className="text-blue-600">{Q1}</span>
              </div>
              <span className="text-xs text-blue-600 mt-1 block">Q₁</span>
            </div>
            <div className="p-4 flex items-center">
              <span className="text-gray-500">=</span>
            </div>
            <div className="text-center">
              <div className="p-4 bg-orange-500 text-white rounded-xl">
                <span>{IQR}</span>
              </div>
              <span className="text-xs text-orange-600 mt-1 font-bold block">IQR</span>
            </div>
          </div>
        </div>

        {/* What it means */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">I</div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Interquartile</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Entre cuartiles (Q₁ a Q₃)</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">R</div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Range</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rango (distancia entre dos valores)</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('meaning')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
          >
            <span>¿Para que sirve?</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ MEANING: Why IQR matters ============
  if (phase === 'meaning') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
            <Lightbulb className="w-5 h-5 text-orange-600" />
            <span className="text-orange-700 dark:text-orange-300 font-medium">
              El poder del IQR
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¿Que nos dice el IQR?
          </h2>
        </div>

        {/* Key insights */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-200 dark:border-green-700">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <p className="font-semibold text-green-800 dark:text-green-200 mb-1">
                  Mide la dispersion del 50% central
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Un IQR pequeño = datos muy agrupados en el centro.<br />
                  Un IQR grande = datos mas dispersos.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <p className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                  Ignora los valores extremos
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  El IQR solo considera el 50% central, asi que un valor muy alto o muy bajo no lo afecta.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <p className="font-semibold text-purple-800 dark:text-purple-200 mb-1">
                  Ayuda a detectar valores atipicos
                </p>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Valores muy alejados del IQR pueden ser <strong>outliers</strong> (valores sospechosos).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('example')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
          >
            <span>Ver ejemplo practico</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ EXAMPLE: Practical example ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-orange-600" />
          <span className="text-orange-700 dark:text-orange-300 font-medium">
            Ejemplo practico
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Comparando dos cursos
        </h2>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Course A */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <h3 className="font-bold text-blue-800 dark:text-blue-200 text-center mb-3">
            Curso A
          </h3>
          <div className="text-center space-y-2">
            <div className="flex justify-center gap-2 text-sm">
              <span className="px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded">Q₁ = 60</span>
              <span className="px-2 py-1 bg-green-200 dark:bg-green-800 rounded">Q₂ = 70</span>
              <span className="px-2 py-1 bg-purple-200 dark:bg-purple-800 rounded">Q₃ = 80</span>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
              <span className="text-sm text-orange-600">IQR = </span>
              <span className="font-bold text-orange-700">80 - 60 = 20</span>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Notas mas concentradas
            </p>
          </div>
        </div>

        {/* Course B */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <h3 className="font-bold text-purple-800 dark:text-purple-200 text-center mb-3">
            Curso B
          </h3>
          <div className="text-center space-y-2">
            <div className="flex justify-center gap-2 text-sm">
              <span className="px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded">Q₁ = 45</span>
              <span className="px-2 py-1 bg-green-200 dark:bg-green-800 rounded">Q₂ = 70</span>
              <span className="px-2 py-1 bg-purple-200 dark:bg-purple-800 rounded">Q₃ = 90</span>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
              <span className="text-sm text-orange-600">IQR = </span>
              <span className="font-bold text-orange-700">90 - 45 = 45</span>
            </div>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Notas mas dispersas
            </p>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-green-800 dark:text-green-200 font-semibold">
              ¿Que significa?
            </p>
            <p className="text-green-700 dark:text-green-300 text-sm mt-1">
              Ambos cursos tienen la <strong>misma mediana (70)</strong>, pero el Curso B tiene mayor variabilidad.
              El IQR del Curso B (45) es mas del doble que el del Curso A (20).
            </p>
          </div>
        </div>
      </div>

      {/* Summary formula */}
      <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 border border-orange-200 dark:border-orange-700">
        <p className="text-center text-orange-800 dark:text-orange-200">
          <strong className="text-lg">IQR = Q₃ - Q₁</strong><br />
          <span className="text-sm">Mide que tan disperso esta el 50% central de los datos</span>
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>¡A practicar!</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
