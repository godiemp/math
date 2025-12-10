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
            Fórmulas de Área
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Tu kit de herramientas geométricas
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <span className="text-lg font-semibold text-purple-800 dark:text-purple-200">
              Fórmulas Principales
            </span>
          </div>

          {/* Formula cards */}
          <div className="space-y-4">
            {/* Rectangle/Square */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 60 50" className="w-16 h-14 flex-shrink-0">
                  <rect x="5" y="5" width="50" height="40" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
                  <text x="30" y="48" textAnchor="middle" fontSize="8" fill="#1f2937">b</text>
                  <text x="58" y="28" textAnchor="start" fontSize="8" fill="#1f2937">h</text>
                </svg>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">Rectángulo / Cuadrado</h3>
                  <div className="mt-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg px-4 py-2">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      A = b × h
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Triangle */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 60 50" className="w-16 h-14 flex-shrink-0">
                  <polygon points="30,5 5,45 55,45" fill="#86efac" stroke="#166534" strokeWidth="2" />
                  <line x1="30" y1="5" x2="30" y2="45" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="30" y="50" textAnchor="middle" fontSize="8" fill="#1f2937">b</text>
                  <text x="35" y="28" textAnchor="start" fontSize="8" fill="#1f2937">h</text>
                </svg>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">Triángulo</h3>
                  <div className="mt-2 bg-green-50 dark:bg-green-900/30 rounded-lg px-4 py-2">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      A = ½ × b × h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why triangle is half */}
        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
          <p className="text-green-800 dark:text-green-200 text-center">
            <strong>¿Por qué el triángulo tiene ½?</strong>
            <br />
            <span className="text-sm">
              Porque un triángulo es exactamente la mitad de un rectángulo con la misma base y altura.
            </span>
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <p className="text-amber-800 dark:text-amber-200">
              <strong>Recuerda:</strong> La <strong>altura (h)</strong> siempre es perpendicular a la base.
              No es un lado inclinado, es la distancia vertical.
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
          Aplicando las fórmulas paso a paso
        </p>
      </div>

      <div className="space-y-4">
        {/* Example 1 - Rectangle */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <svg viewBox="0 0 40 30" className="w-10 h-8">
              <rect x="5" y="3" width="30" height="24" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
            </svg>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Ejemplo 1: Rectángulo
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Un rectángulo con base = 7 m y altura = 4 m
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
            <p className="text-sm">
              <strong>Fórmula:</strong> A = b × h
            </p>
            <p className="text-sm">
              <strong>Sustitución:</strong> A = 7 × 4
            </p>
            <p className="text-sm">
              <strong>Resultado:</strong> A = <span className="text-blue-600 dark:text-blue-400 font-bold">28 m²</span>
            </p>
          </div>
        </div>

        {/* Example 2 - Triangle */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <svg viewBox="0 0 40 35" className="w-10 h-9">
              <polygon points="20,5 5,30 35,30" fill="#86efac" stroke="#166534" strokeWidth="2" />
            </svg>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Ejemplo 2: Triángulo
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Un triángulo con base = 8 cm y altura = 6 cm
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
            <p className="text-sm">
              <strong>Fórmula:</strong> A = ½ × b × h
            </p>
            <p className="text-sm">
              <strong>Sustitución:</strong> A = ½ × 8 × 6
            </p>
            <p className="text-sm">
              <strong>Resultado:</strong> A = <span className="text-green-600 dark:text-green-400 font-bold">24 cm²</span>
            </p>
          </div>
        </div>

        {/* Example 3 - Square (special rectangle) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <svg viewBox="0 0 40 40" className="w-10 h-10">
              <rect x="5" y="5" width="30" height="30" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
            </svg>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Ejemplo 3: Cuadrado
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Un cuadrado con lado = 5 cm
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
            <p className="text-sm">
              <strong>Fórmula:</strong> A = b × h = lado × lado = lado²
            </p>
            <p className="text-sm">
              <strong>Sustitución:</strong> A = 5 × 5 = 5²
            </p>
            <p className="text-sm">
              <strong>Resultado:</strong> A = <span className="text-purple-600 dark:text-purple-400 font-bold">25 cm²</span>
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
              <li>- Confundir la altura con un lado inclinado</li>
              <li>- Olvidar dividir por 2 en triángulos</li>
              <li>- Mezclar unidades (cm con m)</li>
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
