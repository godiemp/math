'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'positive-positive' | 'positive-negative' | 'negative-positive' | 'negative-negative';

interface FormulaTab {
  id: TabId;
  title: string;
  shortTitle: string;
  description: string;
  signPattern: string;
  example: {
    input: string;
    b: number;
    c: number;
    p: number;
    q: number;
    steps: string[];
    result: string;
  };
  color: string;
}

const FORMULAS: FormulaTab[] = [
  {
    id: 'positive-positive',
    title: 'Ambos Positivos',
    shortTitle: 'b>0, c>0',
    description: 'Cuando b y c son positivos, ambos números p y q son positivos',
    signPattern: '(x + p)(x + q)',
    example: {
      input: 'x² + 8x + 15',
      b: 8,
      c: 15,
      p: 3,
      q: 5,
      steps: [
        'b = 8 (positivo), c = 15 (positivo)',
        'Buscamos p + q = 8 y p × q = 15',
        'Factores de 15: 1×15, 3×5',
        '3 + 5 = 8 ✓',
      ],
      result: '(x + 3)(x + 5)',
    },
    color: 'green',
  },
  {
    id: 'negative-positive',
    title: 'b Negativo, c Positivo',
    shortTitle: 'b<0, c>0',
    description: 'Cuando b es negativo y c es positivo, ambos números son negativos',
    signPattern: '(x - p)(x - q)',
    example: {
      input: 'x² - 9x + 20',
      b: -9,
      c: 20,
      p: -4,
      q: -5,
      steps: [
        'b = -9 (negativo), c = 20 (positivo)',
        'c positivo → p y q tienen el mismo signo',
        'b negativo → ambos son negativos',
        '-4 + (-5) = -9 ✓ y (-4)×(-5) = 20 ✓',
      ],
      result: '(x - 4)(x - 5)',
    },
    color: 'purple',
  },
  {
    id: 'positive-negative',
    title: 'b Positivo, c Negativo',
    shortTitle: 'b>0, c<0',
    description: 'Cuando c es negativo, un número es positivo y otro negativo. El mayor en valor absoluto es positivo',
    signPattern: '(x + p)(x - q)',
    example: {
      input: 'x² + 2x - 15',
      b: 2,
      c: -15,
      p: 5,
      q: -3,
      steps: [
        'b = 2 (positivo), c = -15 (negativo)',
        'c negativo → p y q tienen signos diferentes',
        'b positivo → el positivo es mayor en valor absoluto',
        '5 + (-3) = 2 ✓ y 5×(-3) = -15 ✓',
      ],
      result: '(x + 5)(x - 3)',
    },
    color: 'blue',
  },
  {
    id: 'negative-negative',
    title: 'Ambos Negativos',
    shortTitle: 'b<0, c<0',
    description: 'Cuando b y c son negativos, un número es positivo y otro negativo. El mayor en valor absoluto es negativo',
    signPattern: '(x - p)(x + q)',
    example: {
      input: 'x² - 4x - 21',
      b: -4,
      c: -21,
      p: -7,
      q: 3,
      steps: [
        'b = -4 (negativo), c = -21 (negativo)',
        'c negativo → p y q tienen signos diferentes',
        'b negativo → el negativo es mayor en valor absoluto',
        '-7 + 3 = -4 ✓ y (-7)×3 = -21 ✓',
      ],
      result: '(x - 7)(x + 3)',
    },
    color: 'pink',
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; tab: string }> = {
  green: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-200 dark:border-green-700',
    tab: 'bg-green-500 text-white',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-700',
    tab: 'bg-purple-500 text-white',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-700',
    tab: 'bg-blue-500 text-white',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-900/30',
    text: 'text-pink-700 dark:text-pink-300',
    border: 'border-pink-200 dark:border-pink-700',
    tab: 'bg-pink-500 text-white',
  },
};

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('positive-positive');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['positive-positive']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const currentFormula = FORMULAS.find((f) => f.id === activeTab)!;
  const colors = colorClasses[currentFormula.color];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Los Casos Según los Signos
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          El signo de b y c determina los signos de p y q
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
      </div>

      {/* Formula content */}
      <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className={cn('w-6 h-6', colors.text)} />
          <h3 className={cn('text-xl font-bold', colors.text)}>{currentFormula.title}</h3>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4">{currentFormula.description}</p>

        {/* Main pattern */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
          <p className="text-center font-mono text-2xl text-gray-800 dark:text-gray-200">
            x² + bx + c = {currentFormula.signPattern}
          </p>
        </div>

        {/* Example */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Ejemplo:
          </h4>
          <div className="space-y-3">
            <p className="font-mono text-lg text-gray-800 dark:text-gray-200">
              {currentFormula.example.input}
            </p>
            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 font-mono">
              <span>
                b = <span className="text-amber-600 font-bold">{currentFormula.example.b}</span>
              </span>
              <span>
                c = <span className="text-green-600 font-bold">{currentFormula.example.c}</span>
              </span>
            </div>
            <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
              {currentFormula.example.steps.map((step, i) => (
                <p key={i} className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                  {i === currentFormula.example.steps.length - 1 ? '→ ' : '• '}
                  {step}
                </p>
              ))}
            </div>
            <div className={cn('p-3 rounded-lg mt-4', colors.bg)}>
              <p className={cn('font-mono font-bold text-lg text-center', colors.text)}>
                = {currentFormula.example.result}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Decision Table */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
          Tabla de Decisión de Signos
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="py-2 px-3 text-left text-gray-600 dark:text-gray-400">c (producto)</th>
                <th className="py-2 px-3 text-left text-gray-600 dark:text-gray-400">b (suma)</th>
                <th className="py-2 px-3 text-left text-gray-600 dark:text-gray-400">Signos de p y q</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2 px-3 text-green-600 font-bold">+ (positivo)</td>
                <td className="py-2 px-3 text-green-600">+ (positivo)</td>
                <td className="py-2 px-3">Ambos <span className="text-green-600 font-bold">positivos</span></td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2 px-3 text-green-600 font-bold">+ (positivo)</td>
                <td className="py-2 px-3 text-red-600">- (negativo)</td>
                <td className="py-2 px-3">Ambos <span className="text-red-600 font-bold">negativos</span></td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2 px-3 text-red-600 font-bold">- (negativo)</td>
                <td className="py-2 px-3 text-green-600">+ (positivo)</td>
                <td className="py-2 px-3">Diferentes (el <span className="text-green-600 font-bold">+</span> es mayor)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-red-600 font-bold">- (negativo)</td>
                <td className="py-2 px-3 text-red-600">- (negativo)</td>
                <td className="py-2 px-3">Diferentes (el <span className="text-red-600 font-bold">-</span> es mayor)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips and common errors */}
      <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-700">
        <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Tips y errores comunes:
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Correcto:</h5>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Primero mira c: determina si los signos son iguales</li>
              <li>• Luego mira b: determina cuál signo domina</li>
              <li>• Verifica: p + q = b y p × q = c</li>
              <li>• Expande para confirmar tu respuesta</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Confundir los signos de p y q</li>
              <li>• Olvidar verificar la suma Y el producto</li>
              <li>• No considerar números negativos</li>
              <li>• Escribir mal los signos en la respuesta</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Verification tip */}
      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
        <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Verificación rápida:
        </h4>
        <p className="text-gray-700 dark:text-gray-300">
          Para verificar tu factorización, <strong>expande usando FOIL</strong>. Si obtienes el
          trinomio original, ¡está correcto!
        </p>
        <div className="mt-3 bg-white dark:bg-gray-800 rounded-lg p-4 font-mono text-center text-sm">
          <span className="text-green-600">(x + 3)(x + 5)</span>
          <span className="text-gray-400 mx-2">=</span>
          <span className="text-blue-600">x² + 5x + 3x + 15</span>
          <span className="text-gray-400 mx-2">=</span>
          <span className="text-purple-600">x² + 8x + 15</span>
          <span className="text-green-500 ml-2">✓</span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {FORMULAS.map((formula) => {
          const cardColors = colorClasses[formula.color];
          return (
            <div
              key={formula.id}
              className={cn('p-3 rounded-lg border text-center', cardColors.bg, cardColors.border)}
            >
              <p className={cn('font-mono text-sm font-bold', cardColors.text)}>{formula.shortTitle}</p>
            </div>
          );
        })}
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
