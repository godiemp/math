'use client';

import { useState } from 'react';
import { ArrowRight, Plus, Minus, X, Divide, Lightbulb, AlertTriangle, BookOpen } from 'lucide-react';
import { LessonStepProps } from '@/lib/lessons/types';
import { InlineMath, BlockMath } from '@/components/math/MathDisplay';
import { ActionButton } from '@/components/lessons/primitives';

type TabId = 'operations' | 'special' | 'common' | 'tips';

interface TabConfig {
  id: TabId;
  title: string;
  icon: React.ReactNode;
}

const TABS: TabConfig[] = [
  { id: 'operations', title: 'Operaciones', icon: <Plus className="w-4 h-4" /> },
  { id: 'special', title: 'Casos Especiales', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'common', title: 'Expresiones Comunes', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'tips', title: 'Tips', icon: <Lightbulb className="w-4 h-4" /> },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('operations');

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Las Reglas de Traducción</h2>
        <p className="text-gray-600 dark:text-gray-300">Referencia completa del lenguaje algebraico</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        {activeTab === 'operations' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-600" />
              Las Cuatro Operaciones
            </h3>

            <div className="grid gap-4">
              {/* Addition */}
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-2">
                  <Plus className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <h4 className="font-bold text-green-700 dark:text-green-300">Suma / Adición</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Palabras clave: <strong>más, suma, aumentado en, añadir, agregar</strong>
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">&quot;Un número más cinco&quot;</p>
                  <div className="text-xl">
                    <InlineMath latex="x + 5" />
                  </div>
                </div>
              </div>

              {/* Subtraction */}
              <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3 mb-2">
                  <Minus className="w-6 h-6 text-red-600 dark:text-red-400" />
                  <h4 className="font-bold text-red-700 dark:text-red-300">Resta / Sustracción</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Palabras clave: <strong>menos, diferencia, disminuido en, restar, quitar</strong>
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">&quot;Un número menos tres&quot;</p>
                  <div className="text-xl">
                    <InlineMath latex="x - 3" />
                  </div>
                </div>
              </div>

              {/* Multiplication */}
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-2">
                  <X className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-bold text-blue-700 dark:text-blue-300">Multiplicación</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Palabras clave: <strong>por, veces, producto, multiplicado por</strong>
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">&quot;Cuatro veces un número&quot;</p>
                  <div className="text-xl">
                    <InlineMath latex="4x" />
                  </div>
                </div>
              </div>

              {/* Division */}
              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3 mb-2">
                  <Divide className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  <h4 className="font-bold text-amber-700 dark:text-amber-300">División</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Palabras clave: <strong>dividido, entre, cociente, partido por</strong>
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">&quot;Un número dividido entre dos&quot;</p>
                  <div className="text-xl">
                    <InlineMath latex="\frac{x}{2}" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'special' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Casos Especiales (¡Cuidado!)
            </h3>

            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
              <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-3">El orden importa en la resta</h4>

              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>&quot;5 menos que un número&quot;</strong>
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-red-500 line-through text-lg"><InlineMath latex="5 - x" /></span>
                    <span className="text-gray-400">✗ Incorrecto</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="text-green-600 text-lg"><InlineMath latex="x - 5" /></span>
                    <span className="text-gray-400">✓ Correcto</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    &quot;5 menos que x&quot; significa que a x le quitamos 5.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>&quot;x menos 5&quot;</strong> vs <strong>&quot;5 menos que x&quot;</strong>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ambos se traducen igual: <InlineMath latex="x - 5" />
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-3">El orden en la división</h4>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>&quot;El cociente de x y 3&quot;</strong>
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-green-600 text-lg"><InlineMath latex="\frac{x}{3}" /></span>
                  <span className="text-gray-400">✓ x dividido por 3</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  El primer número mencionado va arriba (numerador).
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'common' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Expresiones Comunes
            </h3>

            <div className="grid gap-3">
              {[
                { phrase: 'El doble de un número', latex: '2x' },
                { phrase: 'El triple de un número', latex: '3x' },
                { phrase: 'La mitad de un número', latex: '\\frac{x}{2}' },
                { phrase: 'La tercera parte de un número', latex: '\\frac{x}{3}' },
                { phrase: 'El cuadrado de un número', latex: 'x^2' },
                { phrase: 'El cubo de un número', latex: 'x^3' },
                { phrase: 'El opuesto de un número', latex: '-x' },
                { phrase: 'El recíproco de un número', latex: '\\frac{1}{x}' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 border border-gray-200 dark:border-gray-600"
                >
                  <span className="text-gray-700 dark:text-gray-300">{item.phrase}</span>
                  <span className="text-xl">
                    <InlineMath latex={item.latex} />
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
              <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">Combinaciones</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Las expresiones se pueden combinar:
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3">
                  <span className="text-gray-700 dark:text-gray-300 text-sm">&quot;El doble de un número, más 5&quot;</span>
                  <InlineMath latex="2x + 5" />
                </div>
                <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3">
                  <span className="text-gray-700 dark:text-gray-300 text-sm">&quot;El cuadrado de un número, menos 1&quot;</span>
                  <InlineMath latex="x^2 - 1" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Tips para Traducir
            </h3>

            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">💡 Tip 1: Identifica la variable</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  &quot;Un número&quot;, &quot;una cantidad desconocida&quot;, &quot;cierto valor&quot; → todos se representan con <InlineMath latex="x" /> (o cualquier letra).
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-800">
                <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">�� Tip 2: Lee de izquierda a derecha</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  En la mayoría de los casos, puedes traducir en el orden que lees: &quot;un número más 5&quot; → <InlineMath latex="x + 5" />
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">💡 Tip 3: Cuidado con &quot;menos que&quot;</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  &quot;5 menos que x&quot; invierte el orden: <InlineMath latex="x - 5" /> (no <InlineMath latex="5 - x" />)
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">💡 Tip 4: Verifica con números</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Si no estás seguro, prueba con un número. &quot;5 menos que 10&quot; = 5, entonces la expresión es <InlineMath latex="x - 5" />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <ActionButton onClick={onComplete} variant="secondary" icon={<ArrowRight size={20} />}>
          Practicar traducciones
        </ActionButton>
      </div>
    </div>
  );
}
