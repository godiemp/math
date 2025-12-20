'use client';

import { useState } from 'react';
import { ArrowRight, ArrowUp, ArrowDown, AlertTriangle, Lightbulb, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Tab = 'concept' | 'why' | 'method' | 'example1' | 'example2';

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<Tab>('concept');

  if (!isActive) return null;

  const tabs = [
    { id: 'concept' as Tab, label: 'Concepto', icon: '📚' },
    { id: 'why' as Tab, label: '¿Por qué?', icon: '💡' },
    { id: 'method' as Tab, label: 'Método', icon: '🔧' },
    { id: 'example1' as Tab, label: 'Ejemplo 1', icon: '✏️' },
    { id: 'example2' as Tab, label: 'Ejemplo 2', icon: '✏️' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Proporcionalidad Compuesta
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Cuando varias magnitudes afectan el resultado
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 flex-wrap">
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
        {activeTab === 'concept' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">⚙️</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                ¿Qué es la Proporcionalidad Compuesta?
              </h3>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4">
              <p className="text-purple-800 dark:text-purple-200">
                <strong>Definición:</strong> Se usa cuando hay <strong>más de dos magnitudes</strong>{' '}
                relacionadas con la incógnita. Cada magnitud puede ser directa o inversa respecto al
                resultado.
              </p>
            </div>

            {/* Comparison */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  Proporcionalidad Simple
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                  Solo 2 magnitudes relacionadas
                </p>
                <div className="font-mono text-sm bg-white/50 dark:bg-gray-800/50 p-2 rounded">
                  Si 3 kg cuestan $1.500, ¿cuánto cuestan 5 kg?
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4">
                <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                  Proporcionalidad Compuesta
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
                  3 o más magnitudes relacionadas
                </p>
                <div className="font-mono text-sm bg-white/50 dark:bg-gray-800/50 p-2 rounded">
                  Si 4 obreros en 6 horas hacen X, ¿cuánto harán 6 obreros en 8 horas?
                </div>
              </div>
            </div>

            {/* Key insight */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4">
              <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                <Lightbulb className="inline w-5 h-5 mr-1 text-yellow-500" /> Idea Clave:
              </p>
              <p className="text-blue-700 dark:text-blue-300">
                En proporcionalidad compuesta, analizas <strong>cada magnitud por separado</strong> y
                luego combinas todos los efectos multiplicando.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'why' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">💡</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                ¿Por qué funciona la fórmula?
              </h3>
            </div>

            {/* The key insight */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-xl p-5 border border-yellow-200 dark:border-yellow-800">
              <p className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-3">
                La idea central: El trabajo total es constante
              </p>
              <p className="text-amber-700 dark:text-amber-300">
                En problemas de trabajo, el <strong>esfuerzo total</strong> necesario para completar una
                tarea no cambia. Lo que cambia es cómo distribuimos ese esfuerzo.
              </p>
            </div>

            {/* Visual explanation */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-5 border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Ejemplo: Construir muros (combina directa e inversa)
              </h4>

              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 mb-4">
                <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                  Si <strong>6 obreros</strong> construyen <strong>2 muros</strong> en{' '}
                  <strong>10 días</strong>, ¿cuántos días tardarán <strong>4 obreros</strong> en
                  construir <strong>3 muros</strong>?
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Trabajo por obrero-día:
                  </p>
                  <p className="font-mono text-purple-700 dark:text-purple-300 text-center">
                    6 obreros × 10 días = <strong>60</strong> obrero-días para 2 muros
                  </p>
                  <p className="font-mono text-purple-700 dark:text-purple-300 text-center">
                    → <strong>30</strong> obrero-días por muro
                  </p>
                </div>

                <div className="flex justify-center">
                  <ArrowDown className="w-6 h-6 text-gray-400" />
                </div>

                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Para 3 muros con 4 obreros:
                  </p>
                  <p className="font-mono text-green-700 dark:text-green-300 text-center">
                    3 muros × 30 = <strong>90</strong> obrero-días necesarios
                  </p>
                  <p className="font-mono text-green-700 dark:text-green-300 text-center">
                    90 ÷ 4 obreros = <strong>22,5 días</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Why fractions work */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-5 border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                ¿Por qué las fracciones dan lo mismo?
              </h4>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4">
                    <p className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                      Obreros: 6 → 4 (Inversa)
                    </p>
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                      Menos obreros = más tiempo.
                    </p>
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                      Multiplicamos por <strong>6/4</strong>
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                    <p className="font-semibold text-green-700 dark:text-green-300 mb-2">
                      Muros: 2 → 3 (Directa)
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Más muros = más tiempo.
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Multiplicamos por <strong>3/2</strong>
                    </p>
                  </div>
                </div>

                <div className="bg-purple-100 dark:bg-purple-900/50 rounded-lg p-4">
                  <p className="text-center font-mono text-purple-700 dark:text-purple-300">
                    x = 10 × <span className="text-orange-600">(6/4)</span> ×{' '}
                    <span className="text-green-600">(3/2)</span> = 10 × 1,5 × 1,5 ={' '}
                    <strong>22,5 días</strong>
                  </p>
                  <p className="text-center text-sm text-purple-600 dark:text-purple-400 mt-2">
                    ¡El mismo resultado! Una inversa y una directa.
                  </p>
                </div>
              </div>
            </div>

            {/* Fractions explanation */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                El secreto de las fracciones:
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white/70 dark:bg-gray-800/50 rounded-lg p-3 border-l-4 border-green-500">
                  <p className="font-semibold text-green-700 dark:text-green-300">
                    Fracción {'>'} 1 → Aumenta
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Ejemplo: <span className="font-mono">6/4 = 1,5</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Multiplica por algo mayor que 1 → el resultado crece
                  </p>
                </div>
                <div className="bg-white/70 dark:bg-gray-800/50 rounded-lg p-3 border-l-4 border-red-500">
                  <p className="font-semibold text-red-700 dark:text-red-300">
                    Fracción {'<'} 1 → Disminuye
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Ejemplo: <span className="font-mono">4/6 = 0,67</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Multiplica por algo menor que 1 → el resultado baja
                  </p>
                </div>
              </div>
            </div>

            {/* Contrasting example */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-5 border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Contraejemplo: Cuando el resultado disminuye
              </h4>

              <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 mb-4">
                <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                  Si <strong>4 obreros</strong> construyen <strong>3 muros</strong> en{' '}
                  <strong>15 días</strong>, ¿cuántos días tardarán <strong>6 obreros</strong> en
                  construir <strong>2 muros</strong>?
                </p>
              </div>

              <div className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-3">
                    <p className="font-semibold text-red-700 dark:text-red-300 text-sm">
                      Obreros: 4 → 6 (Inversa)
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400">
                      Más obreros = menos días → <span className="font-mono">4/6 = 0,67</span>
                    </p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-3">
                    <p className="font-semibold text-red-700 dark:text-red-300 text-sm">
                      Muros: 3 → 2 (Directa)
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400">
                      Menos muros = menos días → <span className="font-mono">2/3 = 0,67</span>
                    </p>
                  </div>
                </div>

                <div className="bg-purple-100 dark:bg-purple-900/50 rounded-lg p-3">
                  <p className="text-center font-mono text-purple-700 dark:text-purple-300 text-sm">
                    x = 15 × <span className="text-red-600">(4/6)</span> ×{' '}
                    <span className="text-red-600">(2/3)</span> = 15 × 0,67 × 0,67 ≈{' '}
                    <strong>6,7 días</strong>
                  </p>
                  <p className="text-center text-xs text-purple-600 dark:text-purple-400 mt-1">
                    ¡Ambas fracciones {'<'} 1 → el resultado disminuye!
                  </p>
                </div>
              </div>
            </div>

            {/* Summary rule */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-xl p-5">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Resumen: ¿Cómo armar la fracción?
              </h4>
              <div className="space-y-3 text-sm">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>1.</strong> Pregúntate: si esta magnitud aumenta, ¿el resultado aumenta o
                    disminuye?
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>2.</strong> Arma la fracción para que refleje el efecto correcto:
                  </p>
                  <ul className="mt-2 ml-4 space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• Si el resultado debe <strong>aumentar</strong> → fracción {'>'} 1</li>
                    <li>• Si el resultado debe <strong>disminuir</strong> → fracción {'<'} 1</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'method' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">🔧</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Método de Resolución
              </h3>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                    Identifica las magnitudes
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Lista todas las cantidades que cambian y la incógnita que buscas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                    Analiza cada magnitud
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Para cada una pregunta: si esta magnitud aumenta, ¿la incógnita aumenta (directa)
                    o disminuye (inversa)?
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                    Arma la fracción
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Para cada magnitud:
                  </p>
                  <div className="flex gap-4">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 flex-1">
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        <strong>Directa:</strong> nuevo/antiguo
                      </p>
                    </div>
                    <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-3 flex-1">
                      <p className="text-orange-700 dark:text-orange-300 text-sm">
                        <strong>Inversa:</strong> antiguo/nuevo
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                    Multiplica todo
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Resultado = valor inicial × todas las fracciones
                  </p>
                </div>
              </div>
            </div>

            {/* Formula */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Fórmula General</p>
              <div className="text-xl font-mono font-bold text-purple-700 dark:text-purple-300">
                x = valor₁ × (mag₁) × (mag₂) × ...
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Donde cada (mag) es nuevo/antiguo o antiguo/nuevo según sea directa o inversa
              </p>
            </div>
          </div>
        )}

        {activeTab === 'example1' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Ejemplo 1: Obreros y Días
              </h3>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4">
              <p className="text-amber-800 dark:text-amber-200">
                Si <strong>6 obreros</strong> trabajando <strong>8 horas/día</strong> terminan una
                obra en <strong>15 días</strong>, ¿cuántos días tardarán <strong>4 obreros</strong>{' '}
                trabajando <strong>6 horas/día</strong>?
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                    <th className="py-3 px-4 text-gray-700 dark:text-gray-300">Obreros</th>
                    <th className="py-3 px-4 text-gray-700 dark:text-gray-300">Horas/día</th>
                    <th className="py-3 px-4 text-gray-700 dark:text-gray-300">Días</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <td className="py-3 px-4 font-mono">6</td>
                    <td className="py-3 px-4 font-mono">8</td>
                    <td className="py-3 px-4 font-mono">15</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono">4</td>
                    <td className="py-3 px-4 font-mono">6</td>
                    <td className="py-3 px-4 font-mono text-purple-600 font-bold">x = ?</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Analysis */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Análisis:</h4>

              <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                <div className="flex items-center gap-1">
                  <ArrowDown className="w-4 h-4 text-orange-600" />
                </div>
                <p className="text-orange-700 dark:text-orange-300">
                  <strong>Obreros:</strong> 6 → 4 (↓). Menos obreros = más días →{' '}
                  <strong>Inversa</strong> → <span className="font-mono">6/4</span>
                </p>
              </div>

              <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                <div className="flex items-center gap-1">
                  <ArrowDown className="w-4 h-4 text-orange-600" />
                </div>
                <p className="text-orange-700 dark:text-orange-300">
                  <strong>Horas:</strong> 8 → 6 (↓). Menos horas/día = más días →{' '}
                  <strong>Inversa</strong> → <span className="font-mono">8/6</span>
                </p>
              </div>
            </div>

            {/* Calculation */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Cálculo:</h4>
              <div className="font-mono space-y-1 text-gray-700 dark:text-gray-300">
                <p>
                  x = 15 × <span className="text-orange-600">(6/4)</span> ×{' '}
                  <span className="text-orange-600">(8/6)</span>
                </p>
                <p>x = 15 × (3/2) × (4/3)</p>
                <p>x = 15 × 2 = <strong className="text-purple-600">30 días</strong></p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'example2' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Ejemplo 2: Producción
              </h3>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4">
              <p className="text-amber-800 dark:text-amber-200">
                Si <strong>3 máquinas</strong> trabajando <strong>4 horas</strong> producen{' '}
                <strong>120 piezas</strong>, ¿cuántas piezas producirán <strong>5 máquinas</strong>{' '}
                trabajando <strong>6 horas</strong>?
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                    <th className="py-3 px-4 text-gray-700 dark:text-gray-300">Máquinas</th>
                    <th className="py-3 px-4 text-gray-700 dark:text-gray-300">Horas</th>
                    <th className="py-3 px-4 text-gray-700 dark:text-gray-300">Piezas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <td className="py-3 px-4 font-mono">3</td>
                    <td className="py-3 px-4 font-mono">4</td>
                    <td className="py-3 px-4 font-mono">120</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono">5</td>
                    <td className="py-3 px-4 font-mono">6</td>
                    <td className="py-3 px-4 font-mono text-purple-600 font-bold">x = ?</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Analysis */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Análisis:</h4>

              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <div className="flex items-center gap-1">
                  <ArrowUp className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-green-700 dark:text-green-300">
                  <strong>Máquinas:</strong> 3 → 5 (↑). Más máquinas = más piezas →{' '}
                  <strong>Directa</strong> → <span className="font-mono">5/3</span>
                </p>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <div className="flex items-center gap-1">
                  <ArrowUp className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-green-700 dark:text-green-300">
                  <strong>Horas:</strong> 4 → 6 (↑). Más horas = más piezas →{' '}
                  <strong>Directa</strong> → <span className="font-mono">6/4</span>
                </p>
              </div>
            </div>

            {/* Calculation */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Cálculo:</h4>
              <div className="font-mono space-y-1 text-gray-700 dark:text-gray-300">
                <p>
                  x = 120 × <span className="text-green-600">(5/3)</span> ×{' '}
                  <span className="text-green-600">(6/4)</span>
                </p>
                <p>x = 120 × (5/3) × (3/2)</p>
                <p>x = 120 × (5/2) = <strong className="text-purple-600">300 piezas</strong></p>
              </div>
            </div>

            {/* Key difference */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                <Lightbulb className="inline w-5 h-5 mr-1 text-yellow-500" /> Nota importante:
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                En este ejemplo ambas magnitudes son <strong>directas</strong>: más máquinas y más
                horas = más producción. Por eso las fracciones son nuevo/antiguo.
              </p>
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
