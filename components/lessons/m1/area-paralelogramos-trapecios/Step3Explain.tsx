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
            Las Fórmulas
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Tu kit de herramientas para figuras especiales
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-orange-100 dark:from-purple-900/40 dark:to-orange-900/40 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <span className="text-lg font-semibold text-purple-800 dark:text-purple-200">
              Fórmulas de Área
            </span>
          </div>

          {/* Formula cards */}
          <div className="space-y-4">
            {/* Parallelogram */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 60 50" className="w-16 h-14 flex-shrink-0">
                  <polygon points="15,45 25,5 55,5 45,45" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
                  <line x1="25" y1="5" x2="25" y2="45" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="35" y="50" textAnchor="middle" fontSize="8" fill="#1f2937">b</text>
                  <text x="20" y="28" textAnchor="end" fontSize="8" fill="#1f2937">h</text>
                </svg>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">Paralelogramo</h3>
                  <div className="mt-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg px-4 py-2">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      A = b × h
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trapezoid */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 60 50" className="w-16 h-14 flex-shrink-0">
                  <polygon points="10,45 18,5 42,5 50,45" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
                  <line x1="30" y1="5" x2="30" y2="45" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="30" y="3" textAnchor="middle" fontSize="6" fill="#1f2937">b</text>
                  <text x="30" y="50" textAnchor="middle" fontSize="6" fill="#1f2937">B</text>
                  <text x="34" y="28" textAnchor="start" fontSize="8" fill="#1f2937">h</text>
                </svg>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">Trapecio</h3>
                  <div className="mt-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg px-4 py-2">
                    <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      A = ½ × (B + b) × h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connection to rectangle */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <p className="text-blue-800 dark:text-blue-200 text-center">
            <strong>Conexión con el rectángulo:</strong>
            <br />
            <span className="text-sm">
              El paralelogramo se transforma en rectángulo (misma fórmula).
              El trapecio es la mitad de un paralelogramo con base (B+b).
            </span>
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <p className="text-amber-800 dark:text-amber-200">
              <strong>Recuerda:</strong> La <strong>altura (h)</strong> siempre es perpendicular a la base.
              En estas figuras, los lados inclinados NO son la altura.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPhase('examples')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-orange-600 transition-all shadow-lg"
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
          Aplicando las fórmulas paso a paso
        </p>
      </div>

      <div className="space-y-4">
        {/* Example 1 - Parallelogram */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <svg viewBox="0 0 40 35" className="w-10 h-9">
              <polygon points="8,30 15,5 35,5 28,30" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
            </svg>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Ejemplo 1: Paralelogramo
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Un paralelogramo con base = 10 m y altura = 4 m
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
            <p className="text-sm">
              <strong>Fórmula:</strong> A = b × h
            </p>
            <p className="text-sm">
              <strong>Sustitución:</strong> A = 10 × 4
            </p>
            <p className="text-sm">
              <strong>Resultado:</strong> A = <span className="text-purple-600 dark:text-purple-400 font-bold">40 m²</span>
            </p>
          </div>
        </div>

        {/* Example 2 - Trapezoid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <svg viewBox="0 0 40 35" className="w-10 h-9">
              <polygon points="10,30 8,5 32,5 35,30" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
            </svg>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Ejemplo 2: Trapecio
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Base mayor = 12 cm, base menor = 8 cm, altura = 5 cm
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
            <p className="text-sm">
              <strong>Fórmula:</strong> A = ½ × (B + b) × h
            </p>
            <p className="text-sm">
              <strong>Sustitución:</strong> A = ½ × (12 + 8) × 5
            </p>
            <p className="text-sm">
              <strong>Cálculo:</strong> A = ½ × 20 × 5 = ½ × 100
            </p>
            <p className="text-sm">
              <strong>Resultado:</strong> A = <span className="text-orange-600 dark:text-orange-400 font-bold">50 cm²</span>
            </p>
          </div>
        </div>

        {/* Example 3 - Another Trapezoid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <svg viewBox="0 0 40 35" className="w-10 h-9">
              <polygon points="5,30 12,5 28,5 35,30" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
            </svg>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Ejemplo 3: Trapecio (otro)
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Base mayor = 10 m, base menor = 6 m, altura = 4 m
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
            <p className="text-sm">
              <strong>Fórmula:</strong> A = ½ × (B + b) × h
            </p>
            <p className="text-sm">
              <strong>Sustitución:</strong> A = ½ × (10 + 6) × 4
            </p>
            <p className="text-sm">
              <strong>Cálculo:</strong> A = ½ × 16 × 4 = ½ × 64
            </p>
            <p className="text-sm">
              <strong>Resultado:</strong> A = <span className="text-orange-600 dark:text-orange-400 font-bold">32 m²</span>
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
              <li>- Usar un lado inclinado como altura</li>
              <li>- Olvidar dividir por 2 en trapecios</li>
              <li>- Confundir base mayor (B) con base menor (b)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-orange-600 transition-all shadow-lg"
        >
          <span>¡Hora de practicar!</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
