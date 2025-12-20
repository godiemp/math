'use client';

import { useState } from 'react';
import { ArrowRight, ArrowUp, ArrowDown, AlertTriangle, Lightbulb, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Tab = 'direct' | 'inverse' | 'method';

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<Tab>('direct');

  if (!isActive) return null;

  const tabs = [
    { id: 'direct' as Tab, label: 'Directa', icon: '↑↑' },
    { id: 'inverse' as Tab, label: 'Inversa', icon: '↑↓' },
    { id: 'method' as Tab, label: 'Método', icon: '?' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Fórmulas y Método de Resolución
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Las herramientas para resolver problemas de proporcionalidad
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2',
              activeTab === tab.id
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        {activeTab === 'direct' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUp className="w-6 h-6" />
                <ArrowUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Proporcionalidad Directa
              </h3>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4">
              <p className="text-green-800 dark:text-green-200 mb-2">
                <strong>Definición:</strong> Dos cantidades son directamente proporcionales cuando al
                aumentar una, la otra aumenta en la misma proporción (y viceversa).
              </p>
            </div>

            {/* Formula */}
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Fórmula</p>
              <div className="text-3xl font-mono font-bold text-green-700 dark:text-green-300">
                y/x = k
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                o equivalentemente: <span className="font-mono">y = k · x</span>
              </p>
            </div>

            {/* Worked example */}
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                <BookOpen className="inline w-5 h-5 mr-1" /> Ejemplo resuelto:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  Si 3 kg de manzanas cuestan $1.500, ¿cuánto cuestan 5 kg?
                </p>
                <div className="font-mono text-sm space-y-1 text-gray-600 dark:text-gray-400">
                  <p>1. Encontrar k: k = 1500 / 3 = 500 (precio por kg)</p>
                  <p>2. Calcular: y = 500 · 5 = <strong className="text-green-600">$2.500</strong></p>
                </div>
              </div>
            </div>

            {/* Regla de tres */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4">
              <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                <Lightbulb className="inline w-5 h-5 mr-1 text-yellow-500" /> Regla de Tres Directa:
              </p>
              <div className="grid grid-cols-2 gap-4 text-center font-mono">
                <div>
                  <p className="text-sm text-gray-500">x₁</p>
                  <p className="text-xl font-bold">3 kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">y₁</p>
                  <p className="text-xl font-bold">$1.500</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">x₂</p>
                  <p className="text-xl font-bold">5 kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">y₂</p>
                  <p className="text-xl font-bold text-green-600">?</p>
                </div>
              </div>
              <p className="text-center mt-4 font-mono text-blue-700 dark:text-blue-300">
                y₂ = (x₂ · y₁) / x₁ = (5 · 1500) / 3 = <strong>$2.500</strong>
              </p>
            </div>
          </div>
        )}

        {activeTab === 'inverse' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 text-orange-600">
                <ArrowUp className="w-6 h-6" />
                <ArrowDown className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Proporcionalidad Inversa
              </h3>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4">
              <p className="text-orange-800 dark:text-orange-200 mb-2">
                <strong>Definición:</strong> Dos cantidades son inversamente proporcionales cuando al
                aumentar una, la otra disminuye en la misma proporción (y viceversa).
              </p>
            </div>

            {/* Formula */}
            <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-900/50 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Fórmula</p>
              <div className="text-3xl font-mono font-bold text-orange-700 dark:text-orange-300">
                x · y = k
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                o equivalentemente: <span className="font-mono">y = k / x</span>
              </p>
            </div>

            {/* Worked example */}
            <div className="border-l-4 border-orange-500 pl-4">
              <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                <BookOpen className="inline w-5 h-5 mr-1" /> Ejemplo resuelto:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  Si 6 trabajadores terminan una obra en 10 días, ¿cuántos días tardarán 15
                  trabajadores?
                </p>
                <div className="font-mono text-sm space-y-1 text-gray-600 dark:text-gray-400">
                  <p>1. Encontrar k: k = 6 · 10 = 60 (trabajo total)</p>
                  <p>2. Calcular: y = 60 / 15 = <strong className="text-orange-600">4 días</strong></p>
                </div>
              </div>
            </div>

            {/* Regla de tres */}
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4">
              <p className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                <Lightbulb className="inline w-5 h-5 mr-1 text-yellow-500" /> Regla de Tres Inversa:
              </p>
              <div className="grid grid-cols-2 gap-4 text-center font-mono">
                <div>
                  <p className="text-sm text-gray-500">x₁</p>
                  <p className="text-xl font-bold">6 trab.</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">y₁</p>
                  <p className="text-xl font-bold">10 días</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">x₂</p>
                  <p className="text-xl font-bold">15 trab.</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">y₂</p>
                  <p className="text-xl font-bold text-orange-600">?</p>
                </div>
              </div>
              <p className="text-center mt-4 font-mono text-amber-700 dark:text-amber-300">
                y₂ = (x₁ · y₁) / x₂ = (6 · 10) / 15 = <strong>4 días</strong>
              </p>
            </div>
          </div>
        )}

        {activeTab === 'method' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center text-purple-600 font-bold">
                ?
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                ¿Cómo identificar el tipo?
              </h3>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4">
              <p className="text-purple-800 dark:text-purple-200">
                <strong>Pregunta clave:</strong> Si una cantidad aumenta, ¿qué pasa con la otra?
              </p>
            </div>

            {/* Decision tree */}
            <div className="space-y-4">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4">
                <p className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  Si ambas aumentan o ambas disminuyen:
                </p>
                <p className="text-green-700 dark:text-green-300 text-center text-xl font-bold">
                  → DIRECTA
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Ejemplos: precio y cantidad, distancia y tiempo (velocidad constante), sueldo y
                  horas trabajadas
                </p>
              </div>

              <div className="bg-orange-100 dark:bg-orange-900/30 rounded-xl p-4">
                <p className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                  Si una aumenta y la otra disminuye:
                </p>
                <p className="text-orange-700 dark:text-orange-300 text-center text-xl font-bold">
                  → INVERSA
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Ejemplos: velocidad y tiempo, trabajadores y días, grifos y tiempo de llenado
                </p>
              </div>
            </div>

            {/* Common mistakes */}
            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-800">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="font-bold text-red-800 dark:text-red-200 mb-2">Errores comunes:</p>
                  <ul className="text-sm text-red-700 dark:text-red-300 space-y-1 list-disc ml-4">
                    <li>
                      Usar la fórmula de directa cuando es inversa (y viceversa)
                    </li>
                    <li>
                      Olvidar que en la inversa se <strong>multiplica</strong> para encontrar k
                    </li>
                    <li>
                      No verificar si el resultado tiene sentido lógico
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick tip */}
            <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                <div>
                  <p className="font-bold text-yellow-800 dark:text-yellow-200">Tip rápido:</p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Siempre pregúntate: &ldquo;¿Tiene sentido que con más trabajadores se tarde
                    menos?&rdquo; Si tu resultado no tiene sentido, probablemente usaste la fórmula
                    incorrecta.
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
