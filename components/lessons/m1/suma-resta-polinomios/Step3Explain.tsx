'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, AlertTriangle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Tab = 'addition' | 'subtraction' | 'tips';

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<Tab>('addition');

  const tabs = [
    { id: 'addition' as Tab, label: 'Suma', icon: '➕' },
    { id: 'subtraction' as Tab, label: 'Resta', icon: '➖' },
    { id: 'tips' as Tab, label: 'Tips', icon: '💡' },
  ];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Las Reglas de la Operatoria
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Aprende las reglas formales para sumar y restar polinomios
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2',
              activeTab === tab.id
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        {activeTab === 'addition' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Suma de Polinomios
              </h3>
            </div>

            {/* Formula */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
              <p className="text-sm text-green-600 dark:text-green-400 mb-2">Fórmula general:</p>
              <p className="text-xl font-mono text-center text-gray-800 dark:text-gray-200">
                (ax² + bx + c) + (dx² + ex + f) = (a+d)x² + (b+e)x + (c+f)
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Pasos:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Elimina los paréntesis</strong> (el signo + no cambia nada)
                </li>
                <li>
                  <strong>Identifica términos semejantes</strong> (misma variable y exponente)
                </li>
                <li>
                  <strong>Suma los coeficientes</strong> de los términos semejantes
                </li>
                <li>
                  <strong>Escribe el resultado</strong> ordenado de mayor a menor grado
                </li>
              </ol>
            </div>

            {/* Worked example */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Ejemplo trabajado:</p>
              <div className="space-y-2 font-mono text-gray-800 dark:text-gray-200">
                <p>(2x² + 3x - 1) + (4x² - x + 5)</p>
                <p>= 2x² + 3x - 1 + 4x² - x + 5</p>
                <p>= (2x² + 4x²) + (3x - x) + (-1 + 5)</p>
                <p className="text-green-600 dark:text-green-400 font-bold">= 6x² + 2x + 4</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subtraction' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Resta de Polinomios
              </h3>
            </div>

            {/* Warning */}
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800 dark:text-amber-200">
                  <strong>¡Importante!</strong> Al restar, debes cambiar el signo de TODOS los términos
                  del segundo polinomio.
                </p>
              </div>
            </div>

            {/* Formula */}
            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-6 border border-red-200 dark:border-red-700">
              <p className="text-sm text-red-600 dark:text-red-400 mb-2">Fórmula general:</p>
              <p className="text-xl font-mono text-center text-gray-800 dark:text-gray-200">
                (ax² + bx + c) - (dx² + ex + f) = (a-d)x² + (b-e)x + (c-f)
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Pasos:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Cambia el signo</strong> de cada término del segundo polinomio
                </li>
                <li>
                  <strong>Elimina los paréntesis</strong> y escribe todo como suma
                </li>
                <li>
                  <strong>Agrupa términos semejantes</strong>
                </li>
                <li>
                  <strong>Opera los coeficientes</strong>
                </li>
              </ol>
            </div>

            {/* Worked example */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Ejemplo trabajado:</p>
              <div className="space-y-2 font-mono text-gray-800 dark:text-gray-200">
                <p>(5x² + 2x - 3) - (2x² - 4x + 1)</p>
                <p>= 5x² + 2x - 3 <span className="text-red-500">- 2x² + 4x - 1</span></p>
                <p>= (5x² - 2x²) + (2x + 4x) + (-3 - 1)</p>
                <p className="text-green-600 dark:text-green-400 font-bold">= 3x² + 6x - 4</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Consejos y Errores Comunes
              </h3>
            </div>

            {/* Tips */}
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border-l-4 border-green-500">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  ✓ Ordena antes de operar
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Escribe los polinomios ordenados de mayor a menor grado para no olvidar ningún término.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border-l-4 border-green-500">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  ✓ Usa colores o subrayados
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Marca los términos semejantes con el mismo color para no confundirte al agrupar.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border-l-4 border-green-500">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  ✓ Verifica tu resultado
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Sustituye un valor (como x=1) en ambos lados para comprobar que sean iguales.
                </p>
              </div>
            </div>

            {/* Common errors */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Errores comunes
              </h4>

              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border-l-4 border-red-500">
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                  ✗ No cambiar TODOS los signos al restar
                </h4>
                <div className="text-sm font-mono">
                  <p className="text-red-600 dark:text-red-400">
                    Incorrecto: (3x - 2) - (x + 4) = 3x - 2 - x + 4 ❌
                  </p>
                  <p className="text-green-600 dark:text-green-400">
                    Correcto: (3x - 2) - (x + 4) = 3x - 2 - x - 4 ✓
                  </p>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border-l-4 border-red-500">
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                  ✗ Sumar exponentes en vez de coeficientes
                </h4>
                <div className="text-sm font-mono">
                  <p className="text-red-600 dark:text-red-400">
                    Incorrecto: 3x² + 2x² = 5x⁴ ❌
                  </p>
                  <p className="text-green-600 dark:text-green-400">
                    Correcto: 3x² + 2x² = 5x² ✓
                  </p>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border-l-4 border-red-500">
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                  ✗ Sumar términos que no son semejantes
                </h4>
                <div className="text-sm font-mono">
                  <p className="text-red-600 dark:text-red-400">
                    Incorrecto: 3x² + 2x = 5x³ ❌
                  </p>
                  <p className="text-green-600 dark:text-green-400">
                    Correcto: 3x² + 2x = 3x² + 2x (no se simplifican) ✓
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
