'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'formula' | 'solving' | 'vertex' | 'tips';

interface FormulaTab {
  id: TabId;
  title: string;
  shortTitle: string;
  description: string;
  example: {
    input: string;
    steps: string[];
    result: string;
  };
  color: string;
}

const FORMULAS: FormulaTab[] = [
  {
    id: 'formula',
    title: 'La Fórmula General',
    shortTitle: 'Fórmula',
    description: 'Para x² + bx + c, completamos el cuadrado sumando y restando (b/2)²',
    example: {
      input: 'x² + 6x + 2',
      steps: [
        'b = 6, entonces b/2 = 3 y (b/2)² = 9',
        'x² + 6x + 9 - 9 + 2',
        '(x + 3)² - 7',
      ],
      result: '(x + 3)² - 7',
    },
    color: 'blue',
  },
  {
    id: 'solving',
    title: 'Resolver Ecuaciones',
    shortTitle: 'Ecuaciones',
    description: 'Completar el cuadrado nos permite resolver ecuaciones cuadráticas sin factorizar',
    example: {
      input: 'x² + 4x - 5 = 0',
      steps: [
        'Completamos: (x + 2)² - 4 - 5 = 0',
        '(x + 2)² - 9 = 0',
        '(x + 2)² = 9',
        'x + 2 = ±3',
        'x = -2 + 3 = 1 o x = -2 - 3 = -5',
      ],
      result: 'x = 1 o x = -5',
    },
    color: 'purple',
  },
  {
    id: 'vertex',
    title: 'Forma del Vértice',
    shortTitle: 'Vértice',
    description: 'Completar el cuadrado convierte y = ax² + bx + c a la forma y = a(x - h)² + k',
    example: {
      input: 'y = x² - 8x + 10',
      steps: [
        'b = -8, entonces b/2 = -4 y (b/2)² = 16',
        'y = x² - 8x + 16 - 16 + 10',
        'y = (x - 4)² - 6',
        'Vértice: (h, k) = (4, -6)',
      ],
      result: 'y = (x - 4)² - 6, vértice (4, -6)',
    },
    color: 'green',
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; tab: string }> = {
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

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('formula');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['formula']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const currentFormula = FORMULAS.find((f) => f.id === activeTab);
  const colors = activeTab === 'tips' ? colorClasses.amber : colorClasses[currentFormula!.color];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Completar el Cuadrado
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Tres aplicaciones importantes de esta técnica
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {FORMULAS.map((formula) => {
          const tabColors = colorClasses[formula.color];
          const isVisited = visitedTabs.includes(formula.id);
          return (
            <button
              key={formula.id}
              onClick={() => handleTabChange(formula.id)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all text-sm',
                activeTab === formula.id
                  ? tabColors.tab
                  : isVisited
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              )}
            >
              <span>{formula.shortTitle}</span>
              {isVisited && activeTab !== formula.id && <span className="ml-1 text-green-500">✓</span>}
            </button>
          );
        })}
        <button
          onClick={() => handleTabChange('tips')}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-all text-sm',
            activeTab === 'tips'
              ? colorClasses.amber.tab
              : visitedTabs.includes('tips')
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
          )}
        >
          <span>Tips</span>
          {visitedTabs.includes('tips') && activeTab !== 'tips' && (
            <span className="ml-1 text-green-500">✓</span>
          )}
        </button>
      </div>

      {activeTab === 'tips' ? (
        /* Tips content */
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>Tips y errores comunes</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Correcto:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Siempre calcula (b/2)² correctamente</li>
                <li>• Suma Y resta el mismo valor</li>
                <li>• El signo dentro del paréntesis es b/2</li>
                <li>• Verifica expandiendo tu respuesta</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Olvidar elevar (b/2) al cuadrado</li>
                <li>• Solo sumar (b/2)² sin restarlo</li>
                <li>• Confundir el signo de b/2</li>
                <li>• Calcular mal cuando b es negativo</li>
              </ul>
            </div>
          </div>

          {/* Verification tip */}
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Verificación rápida:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Para verificar tu resultado, <strong>expande el cuadrado</strong> y simplifica.
              Debes obtener la expresión original.
            </p>
            <div className="mt-3 bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-center text-sm">
              <span className="text-green-600">(x + 3)² - 7</span>
              <span className="text-gray-400 mx-2">=</span>
              <span className="text-blue-600">x² + 6x + 9 - 7</span>
              <span className="text-gray-400 mx-2">=</span>
              <span className="text-purple-600">x² + 6x + 2</span>
              <span className="text-green-500 ml-2">✓</span>
            </div>
          </div>
        </div>
      ) : (
        /* Formula content */
        <>
          <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className={cn('w-6 h-6', colors.text)} />
              <h3 className={cn('text-xl font-bold', colors.text)}>{currentFormula!.title}</h3>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">{currentFormula!.description}</p>

            {/* Main formula */}
            {activeTab === 'formula' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
                <p className="text-center font-mono text-xl text-gray-800 dark:text-gray-200 mb-4">
                  x² + bx + c = (x + b/2)² + (c - (b/2)²)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                    <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Trinomio cuadrado perfecto:</p>
                    <p className="font-mono text-gray-600 dark:text-gray-400">x² + bx + (b/2)² = (x + b/2)²</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
                    <p className="font-semibold text-purple-700 dark:text-purple-300 mb-1">Ajuste:</p>
                    <p className="font-mono text-gray-600 dark:text-gray-400">Restamos (b/2)² para compensar</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'solving' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
                <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
                  Pasos para resolver x² + bx + c = 0:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <p className="text-gray-600 dark:text-gray-400">Completar el cuadrado: (x + h)² + k = 0</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <p className="text-gray-600 dark:text-gray-400">Despejar: (x + h)² = -k</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <p className="text-gray-600 dark:text-gray-400">Raíz cuadrada: x + h = ±√(-k)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <p className="text-gray-600 dark:text-gray-400">Resolver: x = -h ± √(-k)</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vertex' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
                <div className="text-center mb-4">
                  <p className="font-mono text-lg text-gray-800 dark:text-gray-200">
                    y = x² + bx + c → y = (x - h)² + k
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
                    <p className="font-semibold text-green-700 dark:text-green-300 mb-1">Vértice:</p>
                    <p className="text-gray-600 dark:text-gray-400">El punto (h, k) es el vértice de la parábola</p>
                  </div>
                  <div className="bg-teal-50 dark:bg-teal-900/30 rounded-lg p-3">
                    <p className="font-semibold text-teal-700 dark:text-teal-300 mb-1">Valores:</p>
                    <p className="font-mono text-gray-600 dark:text-gray-400">h = -b/2, k = c - (b/2)²</p>
                  </div>
                </div>
              </div>
            )}

            {/* Example */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Ejemplo:
              </h4>
              <div className="space-y-3">
                <p className="font-mono text-lg text-gray-800 dark:text-gray-200">
                  {currentFormula!.example.input}
                </p>
                <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
                  {currentFormula!.example.steps.map((step, i) => (
                    <p key={i} className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                      {i === currentFormula!.example.steps.length - 1 ? '→ ' : '• '}
                      {step}
                    </p>
                  ))}
                </div>
                <div className={cn('p-3 rounded-lg mt-4', colors.bg)}>
                  <p className={cn('font-mono font-bold text-lg text-center', colors.text)}>
                    {currentFormula!.example.result}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Formula Box */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              Fórmula Clave
            </h4>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
              <p className="font-mono text-xl text-purple-600 font-bold mb-2">
                x² + bx + c = (x + b/2)² - (b/2)² + c
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                El &quot;número mágico&quot; que completa el cuadrado siempre es <strong>(b/2)²</strong>
              </p>
            </div>
          </div>
        </>
      )}

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
