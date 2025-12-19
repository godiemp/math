'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, AlertTriangle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'ax-b-c' | 'ax-b-cx-d' | 'tips';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const TABS: Tab[] = [
  { id: 'ax-b-c', label: 'ax + b = c', icon: <BookOpen size={18} /> },
  { id: 'ax-b-cx-d', label: 'ax + b = cx + d', icon: <BookOpen size={18} /> },
  { id: 'tips', label: 'Consejos', icon: <Lightbulb size={18} /> },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('ax-b-c');

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Tipos de Ecuaciones Lineales
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explora los diferentes casos y sus métodos de solución
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all',
              activeTab === tab.id
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        {activeTab === 'ax-b-c' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Ecuaciones de la forma <span className="font-mono text-purple-600">ax + b = c</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                La variable aparece solo en un lado de la ecuación
              </p>
            </div>

            {/* Formula box */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
              <div className="text-center space-y-4">
                <p className="font-mono text-2xl text-purple-800 dark:text-purple-200">
                  ax + b = c
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg">
                    <strong className="text-amber-600">a</strong> = coeficiente
                  </span>
                  <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg">
                    <strong className="text-blue-600">b</strong> = constante
                  </span>
                  <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg">
                    <strong className="text-green-600">c</strong> = resultado
                  </span>
                </div>
              </div>
            </div>

            {/* Method */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Método de solución:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Paso 1: Aislar el término con x</p>
                  <p className="font-mono text-center text-lg">ax = c - b</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Paso 2: Despejar x</p>
                  <p className="font-mono text-center text-lg">x = (c - b) / a</p>
                </div>
              </div>
            </div>

            {/* Example */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-4">Ejemplo:</h4>
              <div className="text-center space-y-3">
                <p className="font-mono text-xl">4x + 3 = 19</p>
                <p className="text-gray-600 dark:text-gray-400">↓</p>
                <p className="font-mono">4x = 19 - 3 = 16</p>
                <p className="text-gray-600 dark:text-gray-400">↓</p>
                <p className="font-mono text-xl text-green-600 font-bold">x = 16 / 4 = 4</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ax-b-cx-d' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Ecuaciones de la forma <span className="font-mono text-purple-600">ax + b = cx + d</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                La variable aparece en ambos lados de la ecuación
              </p>
            </div>

            {/* Formula box */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
              <div className="text-center space-y-4">
                <p className="font-mono text-2xl text-purple-800 dark:text-purple-200">
                  ax + b = cx + d
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Debemos agrupar las x en un lado y las constantes en el otro
                </p>
              </div>
            </div>

            {/* Method */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Método de solución:</h4>
              <div className="space-y-3">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Paso 1: Mover las x a un lado</p>
                  <p className="font-mono text-center text-lg">ax - cx + b = d</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Paso 2: Mover las constantes al otro lado</p>
                  <p className="font-mono text-center text-lg">(a - c)x = d - b</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Paso 3: Despejar x</p>
                  <p className="font-mono text-center text-lg">x = (d - b) / (a - c)</p>
                </div>
              </div>
            </div>

            {/* Example */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-4">Ejemplo:</h4>
              <div className="text-center space-y-3">
                <p className="font-mono text-xl">5x + 2 = 3x + 10</p>
                <p className="text-gray-600 dark:text-gray-400">↓ restamos 3x de ambos lados</p>
                <p className="font-mono">5x - 3x + 2 = 10</p>
                <p className="font-mono">2x + 2 = 10</p>
                <p className="text-gray-600 dark:text-gray-400">↓ restamos 2 de ambos lados</p>
                <p className="font-mono">2x = 8</p>
                <p className="text-gray-600 dark:text-gray-400">↓ dividimos entre 2</p>
                <p className="font-mono text-xl text-green-600 font-bold">x = 4</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Consejos y Errores Comunes
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Evita estos errores frecuentes
              </p>
            </div>

            {/* Tips */}
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Siempre verifica tu respuesta</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Sustituye el valor de x en la ecuación original. Ambos lados deben ser iguales.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Orden de operaciones</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Primero elimina sumas y restas, luego multiplicaciones y divisiones.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Cuidado con los signos</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Al mover un término al otro lado, cambia de signo: + pasa a - y viceversa.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Common errors */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Errores comunes:
              </h4>

              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-red-600 font-bold text-lg">X</span>
                    <div>
                      <p className="font-mono text-sm line-through text-gray-500">x + 5 = 10 → x = 10 + 5</p>
                      <p className="text-xs text-red-600">Error: al pasar el 5, debe restar, no sumar</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-green-600 font-bold text-lg">O</span>
                    <p className="font-mono text-sm text-green-700">x + 5 = 10 → x = 10 - 5 = 5</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-red-600 font-bold text-lg">X</span>
                    <div>
                      <p className="font-mono text-sm line-through text-gray-500">3x = 12 → x = 12 - 3</p>
                      <p className="text-xs text-red-600">Error: 3 multiplica a x, debe dividirse, no restarse</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-green-600 font-bold text-lg">O</span>
                    <p className="font-mono text-sm text-green-700">3x = 12 → x = 12 / 3 = 4</p>
                  </div>
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
          <span>Practicar clasificación</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
