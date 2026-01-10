'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { MathText } from '@/components/math/MathDisplay';

type TabId = 'definition' | 'to-scientific' | 'to-standard' | 'real-world' | 'tips';

interface FormulaTab {
  id: TabId;
  title: string;
  shortTitle: string;
  description: string;
  content: React.ReactNode;
  color: string;
}

const FORMULAS: FormulaTab[] = [
  {
    id: 'definition',
    title: 'Definición',
    shortTitle: 'Definición',
    description: 'Un número en notación científica tiene la forma:',
    content: (
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
          <p className="text-2xl text-gray-800 dark:text-gray-200">
            <MathText content="$a \times 10^n$" />
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Coeficiente (a):</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Debe ser mayor o igual a 1 y menor que 10
            </p>
            <p className="text-blue-600 mt-2"><MathText content="$1 \leq a < 10$" /></p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
            <p className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Exponente (n):</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Puede ser positivo, negativo o cero
            </p>
            <p className="text-purple-600 mt-2"><MathText content="$n \in \mathbb{Z}$" /></p>
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
          <p className="font-semibold text-green-700 dark:text-green-300 mb-2">Ejemplos válidos:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <span className="bg-white dark:bg-gray-800 p-2 rounded text-center"><MathText content="$3,5 \times 10^4$" /></span>
            <span className="bg-white dark:bg-gray-800 p-2 rounded text-center"><MathText content="$1 \times 10^0$" /></span>
            <span className="bg-white dark:bg-gray-800 p-2 rounded text-center"><MathText content="$9,99 \times 10^{-2}$" /></span>
            <span className="bg-white dark:bg-gray-800 p-2 rounded text-center"><MathText content="$6,02 \times 10^{23}$" /></span>
          </div>
        </div>
      </div>
    ),
    color: 'blue',
  },
  {
    id: 'to-scientific',
    title: 'Convertir a Científica',
    shortTitle: 'A Científica',
    description: 'Pasos para convertir un número a notación científica:',
    content: (
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Mueve la coma decimal</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Hasta que el número esté entre 1 y 10
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Cuenta las posiciones</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  El número de lugares que moviste = exponente
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Determina el signo</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Izquierda → positivo | Derecha → negativo
                </p>
              </div>
            </li>
          </ol>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-300 mb-3">Ejemplo: 47.500.000</p>
          <div className="font-mono text-sm space-y-2 pl-4 border-l-2 border-purple-300">
            <p>47.500.000 → 4,75 (movimos 7 lugares a la izquierda)</p>
            <p className="text-purple-600">= <MathText content="$4,75 \times 10^7$" /></p>
          </div>
        </div>
        <div className="bg-teal-50 dark:bg-teal-900/30 p-4 rounded-lg">
          <p className="font-semibold text-teal-700 dark:text-teal-300 mb-3">Ejemplo: 0,000089</p>
          <div className="font-mono text-sm space-y-2 pl-4 border-l-2 border-teal-300">
            <p>0,000089 → 8,9 (movimos 5 lugares a la derecha)</p>
            <p className="text-teal-600">= <MathText content="$8,9 \times 10^{-5}$" /></p>
          </div>
        </div>
      </div>
    ),
    color: 'purple',
  },
  {
    id: 'to-standard',
    title: 'Convertir a Estándar',
    shortTitle: 'A Estándar',
    description: 'Pasos para convertir de notación científica a estándar:',
    content: (
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Mira el exponente</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Positivo → mueve a la derecha | Negativo → mueve a la izquierda
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Mueve la coma</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tantas posiciones como indica el exponente (valor absoluto)
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">Rellena con ceros</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Si es necesario, agrega ceros para completar
                </p>
              </div>
            </li>
          </ol>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
          <p className="font-semibold text-purple-700 dark:text-purple-300 mb-3">Ejemplo: <MathText content="$6,3 \times 10^5$" /></p>
          <div className="font-mono text-sm space-y-2 pl-4 border-l-2 border-purple-300">
            <p>Exponente +5 → mover 5 a la derecha</p>
            <p>6,3 → 6,30000 → 630000</p>
            <p className="text-purple-600">= 630.000</p>
          </div>
        </div>
        <div className="bg-teal-50 dark:bg-teal-900/30 p-4 rounded-lg">
          <p className="font-semibold text-teal-700 dark:text-teal-300 mb-3">Ejemplo: <MathText content="$2,5 \times 10^{-4}$" /></p>
          <div className="font-mono text-sm space-y-2 pl-4 border-l-2 border-teal-300">
            <p>Exponente -4 → mover 4 a la izquierda</p>
            <p>2,5 → 0,00025</p>
            <p className="text-teal-600">= 0,00025</p>
          </div>
        </div>
      </div>
    ),
    color: 'teal',
  },
  {
    id: 'real-world',
    title: 'Mundo Real',
    shortTitle: 'Ejemplos',
    description: 'La notación científica en el mundo real:',
    content: (
      <div className="space-y-4">
        <div className="grid gap-4">
          <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
            <p className="font-semibold text-purple-700 dark:text-purple-300 mb-2">🌍 Astronomía</p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 dark:text-gray-400">Distancia a la Luna:</p>
              <p>384.400 km = <MathText content="$3,844 \times 10^5$" /> km</p>
              <p className="text-gray-600 dark:text-gray-400">Distancia al Sol:</p>
              <p>150.000.000 km = <MathText content="$1,5 \times 10^8$" /> km</p>
            </div>
          </div>
          <div className="bg-teal-50 dark:bg-teal-900/30 p-4 rounded-lg">
            <p className="font-semibold text-teal-700 dark:text-teal-300 mb-2">🔬 Biología</p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 dark:text-gray-400">Tamaño de una bacteria:</p>
              <p>0,000002 m = <MathText content="$2 \times 10^{-6}$" /> m</p>
              <p className="text-gray-600 dark:text-gray-400">Diámetro del ADN:</p>
              <p>0,000000002 m = <MathText content="$2 \times 10^{-9}$" /> m</p>
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg">
            <p className="font-semibold text-amber-700 dark:text-amber-300 mb-2">⚗️ Química</p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 dark:text-gray-400">Número de Avogadro:</p>
              <p className="font-mono">602.214.076.000.000.000.000.000</p>
              <p className="text-amber-600">= <MathText content="$6,02214076 \times 10^{23}$" /></p>
            </div>
          </div>
        </div>
      </div>
    ),
    color: 'amber',
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
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-900/30',
    text: 'text-teal-700 dark:text-teal-300',
    border: 'border-teal-200 dark:border-teal-700',
    tab: 'bg-teal-500 text-white',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-700',
    tab: 'bg-amber-500 text-white',
  },
};

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('definition');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['definition']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const currentFormula = FORMULAS.find(f => f.id === activeTab);
  const colors = activeTab === 'tips' ? colorClasses.amber : colorClasses[currentFormula!.color];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Notación Científica
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          La forma compacta de escribir números muy grandes o muy pequeños
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
              {isVisited && activeTab !== formula.id && (
                <span className="ml-1 text-green-500">✓</span>
              )}
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

      {/* Tab content */}
      {activeTab === 'tips' ? (
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>
              Tips y errores comunes
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Correcto:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• <MathText content="$5,2 \times 10^4$" /> (coeficiente entre 1 y 10)</li>
                <li>• <MathText content="$1 \times 10^0 = 1$" /> (forma válida)</li>
                <li>• <MathText content="$9,99 \times 10^{-3}$" /> (exponente negativo)</li>
                <li>• Número grande → exponente positivo</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• <MathText content="$52 \times 10^3$" /> (52 no está entre 1 y 10)</li>
                <li>• <MathText content="$0,5 \times 10^4$" /> (0,5 es menor que 1)</li>
                <li>• Confundir signo del exponente</li>
                <li>• Contar mal las posiciones</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>
              {currentFormula!.title}
            </h3>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {currentFormula!.description}
          </p>

          {currentFormula!.content}
        </div>
      )}

      {/* Memory trick */}
      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
        <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Truco para recordar:
        </h4>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <p className="text-2xl mb-1">📈</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Número grande</p>
              <p className="font-bold text-purple-600">Exponente POSITIVO</p>
              <p className="text-xs text-gray-500 mt-1">(coma va a la izquierda)</p>
            </div>
            <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-900/20">
              <p className="text-2xl mb-1">🔬</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Número pequeño</p>
              <p className="font-bold text-teal-600">Exponente NEGATIVO</p>
              <p className="text-xs text-gray-500 mt-1">(coma va a la derecha)</p>
            </div>
          </div>
        </div>
      </div>

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
