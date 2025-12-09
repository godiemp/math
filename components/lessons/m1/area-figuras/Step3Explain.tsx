'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';

type Phase = 'formulas' | 'trapezoid' | 'examples';

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('formulas');

  if (!isActive) return null;

  // ============ FORMULAS OVERVIEW ============
  if (phase === 'formulas') {
    return (
      <div className="space-y-6 animate-fadeIn">
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

            {/* Parallelogram */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 60 50" className="w-16 h-14 flex-shrink-0">
                  <polygon points="15,45 25,5 55,5 45,45" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
                  <line x1="25" y1="5" x2="25" y2="45" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="30" y="50" textAnchor="middle" fontSize="8" fill="#1f2937">b</text>
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
          </div>
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
            onClick={() => setPhase('trapezoid')}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Ver el Trapecio</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ TRAPEZOID ============
  if (phase === 'trapezoid') {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Trapecio
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Una figura con dos bases diferentes
          </p>
        </div>

        {/* Trapezoid explanation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 220 140" className="w-full max-w-sm">
              {/* Trapezoid */}
              <polygon
                points="50,110 30,30 170,30 190,110"
                fill="#fde68a"
                stroke="#b45309"
                strokeWidth="2"
              />
              {/* Height line */}
              <line x1="100" y1="30" x2="100" y2="110" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,4" />
              {/* Labels */}
              <text x="100" y="22" textAnchor="middle" fontSize="14" fill="#1f2937" fontWeight="bold">Base menor (b)</text>
              <text x="120" y="125" textAnchor="middle" fontSize="14" fill="#1f2937" fontWeight="bold">Base mayor (B)</text>
              <text x="107" y="75" textAnchor="start" fontSize="14" fill="#1f2937" fontWeight="bold">h</text>
              {/* Dimension marks */}
              <line x1="30" y1="25" x2="170" y2="25" stroke="#1f2937" strokeWidth="1" />
              <line x1="50" y1="115" x2="190" y2="115" stroke="#1f2937" strokeWidth="1" />
            </svg>
          </div>

          <div className="text-center">
            <p className="text-gray-700 dark:text-gray-300">
              El trapecio tiene <strong>dos bases paralelas</strong> de diferente longitud.
            </p>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-5 border border-orange-200 dark:border-orange-700">
          <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-3 text-center">
            Fórmula del Trapecio
          </h4>
          <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-4 text-center shadow-sm">
            <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              A = ½ × (B + b) × h
            </span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <span className="font-bold text-orange-600">B</span>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Base mayor</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <span className="font-bold text-orange-600">b</span>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Base menor</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded p-2">
              <span className="font-bold text-orange-600">h</span>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Altura</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <p className="text-purple-800 dark:text-purple-200 text-center">
            <strong>¿Por qué (B + b)?</strong>
            <br />
            <span className="text-sm">
              Es el promedio de las dos bases. Imagina que &ldquo;aplanamos&rdquo; el trapecio en un rectángulo.
            </span>
          </p>
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
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Ejemplos Resueltos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aplicando las fórmulas paso a paso
        </p>
      </div>

      <div className="space-y-4">
        {/* Example 1 - Triangle */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <svg viewBox="0 0 40 35" className="w-10 h-9">
              <polygon points="20,5 5,30 35,30" fill="#86efac" stroke="#166534" strokeWidth="2" />
            </svg>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Ejemplo 1: Triángulo
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

        {/* Example 2 - Parallelogram */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <svg viewBox="0 0 40 35" className="w-10 h-9">
              <polygon points="8,30 15,5 35,5 28,30" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
            </svg>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Ejemplo 2: Paralelogramo
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

        {/* Example 3 - Trapezoid */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <svg viewBox="0 0 40 35" className="w-10 h-9">
              <polygon points="10,30 8,5 32,5 35,30" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
            </svg>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Ejemplo 3: Trapecio
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
              <li>- Olvidar dividir por 2 en triángulos y trapecios</li>
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
