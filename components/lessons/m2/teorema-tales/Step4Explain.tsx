'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Triangle, Lightbulb, AlertTriangle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import MathDisplay from '@/components/math/MathDisplay';

type TabId = 'intercepto' | 'semejanza' | 'tips';

const colorClasses = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-700',
    tab: 'bg-blue-500 text-white',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-700',
    tab: 'bg-purple-500 text-white',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-700',
    tab: 'bg-amber-500 text-white',
  },
};

export default function Step4Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('intercepto');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['intercepto']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const allTabsVisited = visitedTabs.length === 3;

  const colors =
    activeTab === 'intercepto'
      ? colorClasses.blue
      : activeTab === 'semejanza'
        ? colorClasses.purple
        : colorClasses.amber;

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">El Teorema de Tales</h2>
        <p className="text-gray-600 dark:text-gray-300">Dos formas de aplicarlo</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2">
        {[
          { id: 'intercepto' as TabId, label: 'Intercepto', color: colorClasses.blue },
          { id: 'semejanza' as TabId, label: 'Semejanza', color: colorClasses.purple },
          { id: 'tips' as TabId, label: 'Tips', color: colorClasses.amber },
        ].map((tab) => {
          const isVisited = visitedTabs.includes(tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'px-5 py-2 rounded-lg font-medium transition-all',
                activeTab === tab.id
                  ? tab.color.tab
                  : isVisited
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              )}
            >
              <span>{tab.label}</span>
              {isVisited && activeTab !== tab.id && <span className="ml-1 text-green-500">✓</span>}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'intercepto' && (
        <div className={cn('rounded-2xl p-6 border animate-fadeIn', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>Teorema de Intercepto</h3>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Si <strong>dos o mas lineas paralelas</strong> cortan a dos transversales, entonces los
            segmentos correspondientes en las transversales son <strong>proporcionales</strong>.
          </p>

          {/* Main formula */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
            <div className="text-center">
              <MathDisplay latex="\frac{AB}{BC} = \frac{A'B'}{B'C'}" displayMode />
            </div>
          </div>

          {/* Diagram */}
          <div className="flex justify-center mb-6">
            <svg viewBox="0 0 280 180" className="w-full max-w-xs">
              {/* Parallel lines */}
              <line x1="20" y1="30" x2="260" y2="30" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="20" y1="90" x2="260" y2="90" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="20" y1="150" x2="260" y2="150" stroke="#9CA3AF" strokeWidth="2" />

              {/* Labels for parallel lines */}
              <text x="10" y="35" className="text-xs fill-gray-500">L₁</text>
              <text x="10" y="95" className="text-xs fill-gray-500">L₂</text>
              <text x="10" y="155" className="text-xs fill-gray-500">L₃</text>

              {/* Parallel symbols */}
              <text x="265" y="60" className="text-sm fill-gray-400">∥</text>
              <text x="265" y="120" className="text-sm fill-gray-400">∥</text>

              {/* First transversal */}
              <line x1="60" y1="30" x2="100" y2="150" stroke="#3B82F6" strokeWidth="3" />
              <circle cx="60" cy="30" r="4" fill="#3B82F6" />
              <circle cx="80" cy="90" r="4" fill="#3B82F6" />
              <circle cx="100" cy="150" r="4" fill="#3B82F6" />
              <text x="50" y="25" className="text-sm font-bold fill-blue-600">A</text>
              <text x="65" y="88" className="text-sm font-bold fill-blue-600">B</text>
              <text x="90" y="165" className="text-sm font-bold fill-blue-600">C</text>

              {/* Second transversal */}
              <line x1="180" y1="30" x2="220" y2="150" stroke="#8B5CF6" strokeWidth="3" />
              <circle cx="180" cy="30" r="4" fill="#8B5CF6" />
              <circle cx="200" cy="90" r="4" fill="#8B5CF6" />
              <circle cx="220" cy="150" r="4" fill="#8B5CF6" />
              <text x="170" y="25" className="text-sm font-bold fill-purple-600">A&apos;</text>
              <text x="190" y="88" className="text-sm font-bold fill-purple-600">B&apos;</text>
              <text x="210" y="165" className="text-sm font-bold fill-purple-600">C&apos;</text>
            </svg>
          </div>

          {/* Example */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Ejemplo:</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              Si AB = 4, BC = 6, y A&apos;B&apos; = 8, ¿cuanto es B&apos;C&apos;?
            </p>
            <div className="text-center space-y-1">
              <MathDisplay latex="\frac{4}{6} = \frac{8}{B'C'}" />
              <MathDisplay latex="B'C' = \frac{6 \times 8}{4} = 12" />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'semejanza' && (
        <div className={cn('rounded-2xl p-6 border animate-fadeIn', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <Triangle className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>Triangulos Semejantes</h3>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Si una linea es <strong>paralela a un lado</strong> de un triangulo, entonces divide a
            los otros dos lados en segmentos <strong>proporcionales</strong>.
          </p>

          {/* Main formula */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
            <p className="text-center text-gray-600 dark:text-gray-400 mb-2 text-sm">
              Si DE ∥ BC, entonces:
            </p>
            <div className="text-center">
              <MathDisplay latex="\frac{AD}{DB} = \frac{AE}{EC} = \frac{DE}{BC}" displayMode />
            </div>
          </div>

          {/* Diagram */}
          <div className="flex justify-center mb-6">
            <svg viewBox="0 0 280 200" className="w-full max-w-xs">
              {/* Main triangle ABC */}
              <polygon points="140,20 40,180 240,180" fill="#F3E8FF" stroke="#7C3AED" strokeWidth="2" />

              {/* Parallel line DE */}
              <line x1="80" y1="100" x2="200" y2="100" stroke="#EF4444" strokeWidth="2" strokeDasharray="5" />

              {/* Points */}
              <circle cx="140" cy="20" r="4" fill="#7C3AED" />
              <circle cx="40" cy="180" r="4" fill="#7C3AED" />
              <circle cx="240" cy="180" r="4" fill="#7C3AED" />
              <circle cx="80" cy="100" r="4" fill="#EF4444" />
              <circle cx="200" cy="100" r="4" fill="#EF4444" />

              {/* Labels */}
              <text x="140" y="12" textAnchor="middle" className="text-sm font-bold fill-purple-600">
                A
              </text>
              <text x="28" y="185" className="text-sm font-bold fill-purple-600">
                B
              </text>
              <text x="248" y="185" className="text-sm font-bold fill-purple-600">
                C
              </text>
              <text x="65" y="100" className="text-sm font-bold fill-red-500">
                D
              </text>
              <text x="210" y="100" className="text-sm font-bold fill-red-500">
                E
              </text>

              {/* Parallel symbol */}
              <text x="140" y="90" textAnchor="middle" className="text-xs fill-red-500">
                DE ∥ BC
              </text>

              {/* Segment labels */}
              <text x="95" y="55" className="text-xs fill-gray-600">AD</text>
              <text x="55" y="145" className="text-xs fill-gray-600">DB</text>
              <text x="175" y="55" className="text-xs fill-gray-600">AE</text>
              <text x="215" y="145" className="text-xs fill-gray-600">EC</text>
            </svg>
          </div>

          {/* Example */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Ejemplo:</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              Si AD = 3, DB = 5, y AE = 6, ¿cuanto es EC?
            </p>
            <div className="text-center space-y-1">
              <MathDisplay latex="\frac{AD}{DB} = \frac{AE}{EC}" />
              <MathDisplay latex="\frac{3}{5} = \frac{6}{EC}" />
              <MathDisplay latex="EC = \frac{5 \times 6}{3} = 10" />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tips' && (
        <div className={cn('rounded-2xl p-6 border animate-fadeIn', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>Tips para Recordar</h3>
          </div>

          {/* Good practices */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                <Check size={18} />
                Practicas Correctas
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>
                    <strong>Verificar paralelismo:</strong> El teorema SOLO funciona si las lineas
                    son paralelas.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>
                    <strong>Identificar correspondencia:</strong> AB corresponde con A&apos;B&apos;,
                    BC con B&apos;C&apos;.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>
                    <strong>Mantener el orden:</strong> Escribe las razones con el mismo orden (de
                    arriba a abajo, o de izquierda a derecha).
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangle size={18} />
                Errores Comunes
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>
                    <strong>Confundir segmentos:</strong> AD (parte) no es lo mismo que AB (todo).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>
                    <strong>Olvidar verificar paralelismo:</strong> Si las lineas no son paralelas,
                    el teorema no aplica.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>
                    <strong>Mezclar el orden:</strong> No escribas AB/BC = B&apos;C&apos;/A&apos;B&apos;.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-green-100 dark:bg-green-900/40 rounded-lg p-4 text-center">
              <p className="font-bold text-green-700 dark:text-green-300 text-lg">
                PARALELAS = PROPORCIONALES
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Si hay lineas paralelas, hay proporciones
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Continue button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onComplete}
          disabled={!allTabsVisited}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors',
            allTabsVisited
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          )}
        >
          {allTabsVisited ? (
            <>
              Practicar
              <ArrowRight size={20} />
            </>
          ) : (
            <>Explora todas las pestanas ({visitedTabs.length}/3)</>
          )}
        </button>
      </div>
    </div>
  );
}
