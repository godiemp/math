'use client';

import { useState } from 'react';
import { ArrowRight, Lightbulb, AlertTriangle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type Tab = 'formulas' | 'steps' | 'tips';

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<Tab>('formulas');

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Fórmulas para Figuras Compuestas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Las herramientas que necesitas
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        {[
          { id: 'formulas' as Tab, label: 'Fórmulas Base', icon: BookOpen },
          { id: 'steps' as Tab, label: 'Pasos', icon: ArrowRight },
          { id: 'tips' as Tab, label: 'Consejos', icon: Lightbulb },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm',
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            )}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        {/* FORMULAS TAB */}
        {activeTab === 'formulas' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Para resolver figuras compuestas, necesitas recordar estas fórmulas básicas:
            </p>

            <div className="grid gap-3">
              {/* Rectangle */}
              <div className="flex items-center gap-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <svg viewBox="0 0 60 40" className="w-16 h-10 flex-shrink-0">
                  <rect x="5" y="5" width="50" height="30" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
                  <text x="30" y="38" textAnchor="middle" fontSize="8" fill="#1f2937">b</text>
                  <text x="58" y="22" textAnchor="middle" fontSize="8" fill="#1f2937">h</text>
                </svg>
                <div className="flex-1">
                  <p className="font-semibold text-blue-800 dark:text-blue-200">Rectángulo</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">A = b × h</p>
                </div>
              </div>

              {/* Square */}
              <div className="flex items-center gap-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                <svg viewBox="0 0 50 50" className="w-14 h-14 flex-shrink-0">
                  <rect x="5" y="5" width="40" height="40" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2" />
                  <text x="25" y="48" textAnchor="middle" fontSize="8" fill="#1f2937">l</text>
                </svg>
                <div className="flex-1">
                  <p className="font-semibold text-purple-800 dark:text-purple-200">Cuadrado</p>
                  <p className="text-xl font-bold text-purple-600 dark:text-purple-400">A = l²</p>
                </div>
              </div>

              {/* Triangle */}
              <div className="flex items-center gap-4 bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                <svg viewBox="0 0 60 50" className="w-16 h-12 flex-shrink-0">
                  <polygon points="5,45 55,45 30,5" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
                  <text x="30" y="48" textAnchor="middle" fontSize="8" fill="#1f2937">b</text>
                  <line x1="30" y1="5" x2="30" y2="45" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="35" y="28" fontSize="8" fill="#1f2937">h</text>
                </svg>
                <div className="flex-1">
                  <p className="font-semibold text-green-800 dark:text-green-200">Triángulo</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">A = (b × h) / 2</p>
                </div>
              </div>

              {/* Trapezoid */}
              <div className="flex items-center gap-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4">
                <svg viewBox="0 0 70 50" className="w-18 h-12 flex-shrink-0">
                  <polygon points="15,45 55,45 45,5 25,5" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
                  <text x="35" y="10" textAnchor="middle" fontSize="7" fill="#1f2937">b</text>
                  <text x="35" y="48" textAnchor="middle" fontSize="7" fill="#1f2937">B</text>
                  <line x1="35" y1="5" x2="35" y2="45" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="40" y="28" fontSize="7" fill="#1f2937">h</text>
                </svg>
                <div className="flex-1">
                  <p className="font-semibold text-orange-800 dark:text-orange-200">Trapecio</p>
                  <p className="text-xl font-bold text-orange-600 dark:text-orange-400">A = (B + b) × h / 2</p>
                </div>
              </div>

              {/* Circle */}
              <div className="flex items-center gap-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg p-4">
                <svg viewBox="0 0 50 50" className="w-14 h-14 flex-shrink-0">
                  <circle cx="25" cy="25" r="20" fill="#99f6e4" stroke="#0d9488" strokeWidth="2" />
                  <line x1="25" y1="25" x2="45" y2="25" stroke="#dc2626" strokeWidth="2" />
                  <text x="35" y="22" fontSize="8" fill="#dc2626">r</text>
                </svg>
                <div className="flex-1">
                  <p className="font-semibold text-teal-800 dark:text-teal-200">Círculo</p>
                  <p className="text-xl font-bold text-teal-600 dark:text-teal-400">A = π × r²</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEPS TAB */}
        {activeTab === 'steps' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Sigue estos pasos para calcular el área de cualquier figura compuesta:
            </p>

            <div className="space-y-3">
              {[
                {
                  step: 1,
                  title: 'Identifica la figura',
                  desc: '¿Es una L, T, U o forma irregular? Observa bien sus lados.',
                  color: 'blue',
                },
                {
                  step: 2,
                  title: 'Elige tu estrategia',
                  desc: '¿Es más fácil sumar partes o restar lo que falta?',
                  color: 'purple',
                },
                {
                  step: 3,
                  title: 'Dibuja las divisiones',
                  desc: 'Marca con líneas cómo vas a dividir o completar la figura.',
                  color: 'green',
                },
                {
                  step: 4,
                  title: 'Calcula cada parte',
                  desc: 'Usa las fórmulas básicas para cada rectángulo o triángulo.',
                  color: 'orange',
                },
                {
                  step: 5,
                  title: 'Suma o resta',
                  desc: 'Combina las áreas según la estrategia que elegiste.',
                  color: 'red',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className={cn(
                    'flex items-start gap-4 p-4 rounded-lg',
                    item.color === 'blue' && 'bg-blue-50 dark:bg-blue-900/30',
                    item.color === 'purple' && 'bg-purple-50 dark:bg-purple-900/30',
                    item.color === 'green' && 'bg-green-50 dark:bg-green-900/30',
                    item.color === 'orange' && 'bg-orange-50 dark:bg-orange-900/30',
                    item.color === 'red' && 'bg-red-50 dark:bg-red-900/30'
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0',
                      item.color === 'blue' && 'bg-blue-500',
                      item.color === 'purple' && 'bg-purple-500',
                      item.color === 'green' && 'bg-green-500',
                      item.color === 'orange' && 'bg-orange-500',
                      item.color === 'red' && 'bg-red-500'
                    )}
                  >
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{item.title}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TIPS TAB */}
        {activeTab === 'tips' && (
          <div className="space-y-4 animate-fadeIn">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Consejos para no equivocarte:
            </p>

            <div className="space-y-3">
              {/* Tip 1 */}
              <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                <Lightbulb className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-200">Busca rectángulos primero</p>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    La mayoría de figuras compuestas se pueden dividir en rectángulos. Son los más fáciles de calcular.
                  </p>
                </div>
              </div>

              {/* Tip 2 */}
              <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <Lightbulb className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-blue-800 dark:text-blue-200">Verifica las dimensiones</p>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Cuando divides una figura, asegúrate de usar las medidas correctas para cada parte.
                  </p>
                </div>
              </div>

              {/* Common error */}
              <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-amber-800 dark:text-amber-200">Error común</p>
                  <p className="text-amber-700 dark:text-amber-300 text-sm">
                    No confundas sumar con restar. Si divides la figura, <strong>suma</strong> las partes.
                    Si completas la figura, <strong>resta</strong> lo que sobra.
                  </p>
                </div>
              </div>

              {/* Tip 3 */}
              <div className="flex items-start gap-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                <Lightbulb className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-purple-800 dark:text-purple-200">Usa ambos métodos para verificar</p>
                  <p className="text-purple-700 dark:text-purple-300 text-sm">
                    Si tienes tiempo, calcula con suma Y con resta. Si el resultado es igual, ¡está correcto!
                  </p>
                </div>
              </div>

              {/* Tip 4 */}
              <div className="flex items-start gap-3 bg-teal-50 dark:bg-teal-900/30 rounded-lg p-4">
                <Lightbulb className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-teal-800 dark:text-teal-200">Semicírculos y cuartos de círculo</p>
                  <p className="text-teal-700 dark:text-teal-300 text-sm">
                    Si hay partes curvas: semicírculo = πr²/2, cuarto de círculo = πr²/4
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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
