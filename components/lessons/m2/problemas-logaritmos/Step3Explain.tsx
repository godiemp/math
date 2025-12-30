'use client';

import { useState } from 'react';
import { ArrowRight, HelpCircle, Key, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'porque' | 'clave' | 'richter' | 'decibeles' | 'ph' | 'tips';

const colorClasses: Record<string, { bg: string; text: string; border: string; tab: string }> = {
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-700',
    tab: 'bg-purple-500 text-white',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-900/30',
    text: 'text-indigo-700 dark:text-indigo-300',
    border: 'border-indigo-200 dark:border-indigo-700',
    tab: 'bg-indigo-500 text-white',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-300',
    border: 'border-orange-200 dark:border-orange-700',
    tab: 'bg-orange-500 text-white',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-700',
    tab: 'bg-blue-500 text-white',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-200 dark:border-green-700',
    tab: 'bg-green-500 text-white',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-700',
    tab: 'bg-amber-500 text-white',
  },
};

const TAB_CONFIG: { id: TabId; label: string; emoji: string; color: string }[] = [
  { id: 'porque', label: '¿Por qué?', emoji: '❓', color: 'purple' },
  { id: 'clave', label: 'Idea clave', emoji: '🔑', color: 'indigo' },
  { id: 'richter', label: 'Richter', emoji: '🌋', color: 'orange' },
  { id: 'decibeles', label: 'Decibeles', emoji: '🔊', color: 'blue' },
  { id: 'ph', label: 'pH', emoji: '🧪', color: 'green' },
  { id: 'tips', label: 'Tips', emoji: '💡', color: 'amber' },
];

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('porque');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['porque']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const currentConfig = TAB_CONFIG.find(t => t.id === activeTab)!;
  const colors = colorClasses[currentConfig.color];

  if (!isActive) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'porque':
        return (
          <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className={cn('w-6 h-6', colors.text)} />
              <h3 className={cn('text-xl font-bold', colors.text)}>
                ¿Por qué existen las escalas logarítmicas?
              </h3>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>El problema:</strong> Algunas cosas varían MUCHÍSIMO.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Por ejemplo, la energía de terremotos puede ir desde 1 hasta 1.000.000.000 (¡mil millones!) de veces más fuerte.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Usar una escala normal sería imposible de leer o dibujar.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>La solución:</strong> Contar &quot;cuántas veces multiplicamos por 10&quot;
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400">Valor real</th>
                      <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400">Como potencia</th>
                      <th className="text-left py-2 px-3 text-gray-600 dark:text-gray-400">En escala log</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 px-3">10</td>
                      <td className="py-2 px-3">10¹</td>
                      <td className="py-2 px-3 text-purple-600 font-bold">1</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 px-3">100</td>
                      <td className="py-2 px-3">10²</td>
                      <td className="py-2 px-3 text-purple-600 font-bold">2</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 px-3">1.000</td>
                      <td className="py-2 px-3">10³</td>
                      <td className="py-2 px-3 text-purple-600 font-bold">3</td>
                    </tr>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 px-3">1.000.000</td>
                      <td className="py-2 px-3">10⁶</td>
                      <td className="py-2 px-3 text-purple-600 font-bold">6</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">1.000.000.000</td>
                      <td className="py-2 px-3">10⁹</td>
                      <td className="py-2 px-3 text-purple-600 font-bold">9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
              <p className="text-green-800 dark:text-green-200 text-center">
                <strong>¡Mil millones se convierte en solo 9!</strong>
                <br />
                <span className="text-sm">La escala logarítmica &quot;comprime&quot; números enormes en números manejables.</span>
              </p>
            </div>
          </div>
        );

      case 'clave':
        return (
          <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
            <div className="flex items-center gap-3 mb-4">
              <Key className={cn('w-6 h-6', colors.text)} />
              <h3 className={cn('text-xl font-bold', colors.text)}>
                La idea clave para resolver problemas
              </h3>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-4">
              <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
                Cuando comparas dos valores en una escala logarítmica:
              </p>
              <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-xl p-4 text-center mb-4">
                <p className="font-mono text-xl text-indigo-700 dark:text-indigo-300 font-bold">
                  factor = 10^(diferencia)
                </p>
              </div>
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                La diferencia en la escala es el exponente de 10
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Ejemplos:</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <span className="text-gray-500">Si la diferencia es</span>
                  <span className="font-mono font-bold text-indigo-600">2</span>
                  <span className="text-gray-500">→</span>
                  <span className="font-mono">10² =</span>
                  <span className="font-bold text-green-600">100×</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <span className="text-gray-500">Si la diferencia es</span>
                  <span className="font-mono font-bold text-indigo-600">3</span>
                  <span className="text-gray-500">→</span>
                  <span className="font-mono">10³ =</span>
                  <span className="font-bold text-green-600">1.000×</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <span className="text-gray-500">Si la diferencia es</span>
                  <span className="font-mono font-bold text-indigo-600">5</span>
                  <span className="text-gray-500">→</span>
                  <span className="font-mono">10⁵ =</span>
                  <span className="font-bold text-green-600">100.000×</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
              <p className="text-amber-800 dark:text-amber-200 text-center">
                <strong>Esta es la única fórmula que necesitas.</strong>
                <br />
                <span className="text-sm">Cada escala (Richter, dB, pH) es solo una variación de esta idea.</span>
              </p>
            </div>
          </div>
        );

      case 'richter':
        return (
          <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🌋</span>
              <h3 className={cn('text-xl font-bold', colors.text)}>
                Escala Richter (Terremotos)
              </h3>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Usa la idea directamente:</strong>
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Cada punto en la escala Richter = multiplicar la amplitud por 10
              </p>
              <div className="bg-orange-100 dark:bg-orange-900/50 rounded-lg p-3 text-center">
                <p className="font-mono text-orange-700 dark:text-orange-300">
                  1 punto de diferencia → 10× más amplitud
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Ejemplo: Terremoto de magnitud 7 vs magnitud 5
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  • Diferencia: 7 - 5 = <strong>2 puntos</strong>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  • Aplicamos la fórmula: 10² = <strong>100</strong>
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3 mt-3 text-center">
                <p className="text-green-700 dark:text-green-300 font-bold">
                  El terremoto de magnitud 7 tiene 100× más amplitud
                </p>
              </div>
            </div>
          </div>
        );

      case 'decibeles':
        return (
          <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🔊</span>
              <h3 className={cn('text-xl font-bold', colors.text)}>
                Decibeles (Sonido)
              </h3>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Variación:</strong> La escala está &quot;estirada&quot; por 10
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                En vez de 1 punto = 10×, aquí son <strong>10 puntos (dB)</strong> = 10×
              </p>
              <div className="bg-blue-100 dark:bg-blue-900/50 rounded-lg p-3 text-center mb-3">
                <p className="font-mono text-blue-700 dark:text-blue-300">
                  10 dB de diferencia → 10× más intenso
                </p>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                (Esto viene de la fórmula dB = 10·log, pero no necesitas memorizarla)
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Ejemplo: Concierto (100 dB) vs Conversación (60 dB)
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  • Diferencia: 100 - 60 = <strong>40 dB</strong>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  • ¿Cuántos &quot;saltos&quot; de 10 dB? → 40 ÷ 10 = <strong>4 saltos</strong>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  • Aplicamos: 10⁴ = <strong>10.000</strong>
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3 mt-3 text-center">
                <p className="text-green-700 dark:text-green-300 font-bold">
                  El concierto es 10.000× más intenso que una conversación
                </p>
              </div>
            </div>
          </div>
        );

      case 'ph':
        return (
          <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🧪</span>
              <h3 className={cn('text-xl font-bold', colors.text)}>
                Escala pH (Acidez)
              </h3>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Variación:</strong> La escala está &quot;invertida&quot;
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Número <strong>menor</strong> = más ácido (al revés de lo que esperarías)
              </p>
              <div className="bg-green-100 dark:bg-green-900/50 rounded-lg p-3 text-center mb-3">
                <p className="font-mono text-green-700 dark:text-green-300">
                  1 punto menos en pH → 10× más ácido
                </p>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                pH 3 es más ácido que pH 4 (número menor = más ácido)
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Ejemplo: Jugo de limón (pH 2) vs Agua pura (pH 7)
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  • Diferencia: 7 - 2 = <strong>5 puntos</strong>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  • Aplicamos: 10⁵ = <strong>100.000</strong>
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3 mt-3 text-center">
                <p className="text-green-700 dark:text-green-300 font-bold">
                  El limón es 100.000× más ácido que el agua pura
                </p>
              </div>
            </div>
          </div>
        );

      case 'tips':
        return (
          <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className={cn('w-6 h-6', colors.text)} />
              <h3 className={cn('text-xl font-bold', colors.text)}>Resumen y Tips</h3>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                La fórmula universal:
              </h4>
              <div className="bg-indigo-100 dark:bg-indigo-900/50 rounded-lg p-4 text-center mb-3">
                <p className="font-mono text-xl text-indigo-700 dark:text-indigo-300 font-bold">
                  factor = 10^(diferencia)
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Variaciones por escala:
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                  <span>🌋</span>
                  <span className="flex-1"><strong>Richter:</strong> diferencia directa (2 puntos → 10²)</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <span>🔊</span>
                  <span className="flex-1"><strong>Decibeles:</strong> dividir por 10 primero (40 dB → 4 → 10⁴)</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <span>🧪</span>
                  <span className="flex-1"><strong>pH:</strong> diferencia directa, pero invertida (menor = más ácido)</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Estrategia:</h5>
                <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
                  <li>Calcula la diferencia en la escala</li>
                  <li>En dB: divide por 10</li>
                  <li>Ese número es el exponente de 10</li>
                </ol>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Olvidar dividir dB por 10</li>
                  <li>• En pH: menor = MÁS ácido</li>
                  <li>• Confundir × con +</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Escalas Logarítmicas
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Entiende el concepto, luego aplícalo
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {TAB_CONFIG.map((tab) => {
          const tabColors = colorClasses[tab.color];
          const isVisited = visitedTabs.includes(tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'px-3 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-1',
                activeTab === tab.id
                  ? tabColors.tab
                  : isVisited
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              )}
            >
              <span>{tab.emoji}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              {isVisited && activeTab !== tab.id && (
                <span className="ml-1 text-green-500">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {renderTabContent()}

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
