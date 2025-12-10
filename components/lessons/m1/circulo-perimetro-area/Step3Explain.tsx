'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'formulas' | 'examples';

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('formulas');

  if (!isActive) return null;

  // ============ FORMULAS OVERVIEW ============
  if (phase === 'formulas') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Formulas del Circulo
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Tu kit de herramientas para circulos
          </p>
        </div>

        <div className="bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-teal-900/40 dark:to-cyan-900/40 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-teal-600 dark:text-teal-400" />
            <span className="text-lg font-semibold text-teal-800 dark:text-teal-200">
              Formulas Principales
            </span>
          </div>

          {/* Key concepts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-center">
              Conceptos Clave
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                <p className="font-semibold text-gray-800 dark:text-gray-200">Radio (r)</p>
                <p className="text-gray-600 dark:text-gray-400">Centro al borde</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                <p className="font-semibold text-gray-800 dark:text-gray-200">Diametro (d)</p>
                <p className="text-gray-600 dark:text-gray-400">d = 2r</p>
              </div>
            </div>
          </div>

          {/* Formula cards */}
          <div className="space-y-4">
            {/* Circumference */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 60 60" className="w-16 h-14 flex-shrink-0">
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#0d9488" strokeWidth="4" />
                  <circle cx="30" cy="30" r="3" fill="#0d9488" />
                  <line x1="30" y1="30" x2="54" y2="30" stroke="#dc2626" strokeWidth="2" />
                  <text x="42" y="27" fontSize="8" fill="#dc2626">r</text>
                </svg>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">Circunferencia (Perimetro)</h3>
                  <div className="mt-2 bg-teal-50 dark:bg-teal-900/30 rounded-lg px-4 py-2">
                    <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                      C = 2πr = πd
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Area */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 60 60" className="w-16 h-14 flex-shrink-0">
                  <circle cx="30" cy="30" r="24" fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
                  <circle cx="30" cy="30" r="3" fill="#0d9488" />
                  <line x1="30" y1="30" x2="54" y2="30" stroke="#dc2626" strokeWidth="2" />
                  <text x="42" y="27" fontSize="8" fill="#dc2626">r</text>
                </svg>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">Area</h3>
                  <div className="mt-2 bg-teal-50 dark:bg-teal-900/30 rounded-lg px-4 py-2">
                    <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                      A = πr²
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pi reminder */}
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <p className="text-purple-800 dark:text-purple-200 text-center">
            <strong>Recuerda:</strong> π ≈ 3.14 (usamos este valor para calcular)
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <p className="text-amber-800 dark:text-amber-200">
              <strong>Tip:</strong> Si te dan el <strong>diametro</strong>, primero divide por 2 para obtener el radio.
              Por ejemplo: d = 10 → r = 5
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('examples')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Ver ejemplos</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ EXAMPLES ============
  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Ejemplos Resueltos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplicando las formulas paso a paso
        </p>
      </div>

      <div className="space-y-4">
        {/* Example 1 - Circumference with radius */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <svg viewBox="0 0 40 40" className="w-10 h-10">
              <circle cx="20" cy="20" r="16" fill="none" stroke="#0d9488" strokeWidth="3" />
            </svg>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Ejemplo 1: Circunferencia
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Un circulo con radio = 5 cm. ¿Cual es su circunferencia?
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
            <p className="text-sm">
              <strong>Formula:</strong> C = 2πr
            </p>
            <p className="text-sm">
              <strong>Sustitucion:</strong> C = 2 × 3.14 × 5
            </p>
            <p className="text-sm">
              <strong>Resultado:</strong> C = <span className="text-teal-600 dark:text-teal-400 font-bold">31.4 cm</span>
            </p>
          </div>
        </div>

        {/* Example 2 - Area with radius */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <svg viewBox="0 0 40 40" className="w-10 h-10">
              <circle cx="20" cy="20" r="16" fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
            </svg>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Ejemplo 2: Area
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Un circulo con radio = 4 m. ¿Cual es su area?
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
            <p className="text-sm">
              <strong>Formula:</strong> A = πr²
            </p>
            <p className="text-sm">
              <strong>Sustitucion:</strong> A = 3.14 × 4² = 3.14 × 16
            </p>
            <p className="text-sm">
              <strong>Resultado:</strong> A = <span className="text-teal-600 dark:text-teal-400 font-bold">50.24 m²</span>
            </p>
          </div>
        </div>

        {/* Example 3 - Given diameter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <svg viewBox="0 0 40 40" className="w-10 h-10">
              <circle cx="20" cy="20" r="16" fill="#5eead4" stroke="#0d9488" strokeWidth="2" />
              <line x1="4" y1="20" x2="36" y2="20" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,2" />
            </svg>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Ejemplo 3: Dado el diametro
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Una pizza tiene diametro = 30 cm. ¿Cual es su area?
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
            <p className="text-sm">
              <strong>Paso 1:</strong> Calcular radio: r = d ÷ 2 = 30 ÷ 2 = <span className="text-red-600">15 cm</span>
            </p>
            <p className="text-sm">
              <strong>Paso 2:</strong> A = πr² = 3.14 × 15²
            </p>
            <p className="text-sm">
              <strong>Paso 3:</strong> A = 3.14 × 225 = <span className="text-teal-600 dark:text-teal-400 font-bold">706.5 cm²</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
          <div>
            <p className="text-amber-800 dark:text-amber-200 font-semibold">
              Errores comunes a evitar:
            </p>
            <ul className="text-amber-700 dark:text-amber-300 text-sm mt-1 space-y-1">
              <li>- Confundir radio con diametro (r ≠ d)</li>
              <li>- Olvidar elevar al cuadrado en el area (A = πr², no πr)</li>
              <li>- Usar el diametro directamente en A = πr²</li>
              <li>- Confundir circunferencia (longitud) con area (superficie)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>¡Hora de practicar!</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
