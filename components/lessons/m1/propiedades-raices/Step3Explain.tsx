'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { InlineMath, BlockMath, MathText } from '@/components/math/MathDisplay';

type TabId = 'product' | 'quotient' | 'rootOfRoot' | 'tips';

interface FormulaTab {
  id: Exclude<TabId, 'tips'>;
  title: string;
  shortTitle: string;
  description: string;
  formula: string;
  formulaLatex: string;
  example: {
    input: string;
    steps: string[];
    result: string;
  };
  color: string;
}

const FORMULAS: FormulaTab[] = [
  {
    id: 'product',
    title: 'Propiedad del Producto',
    shortTitle: 'Producto',
    description: 'La raíz de un producto es igual al producto de las raíces',
    formula: 'ⁿ√(a · b) = ⁿ√a · ⁿ√b',
    formulaLatex: '\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}',
    example: {
      input: '\\sqrt{4 \\times 25}',
      steps: [
        'Separamos: $\\sqrt{4} \\times \\sqrt{25}$',
        'Calculamos cada raíz: $2 \\times 5$',
      ],
      result: '10',
    },
    color: 'blue',
  },
  {
    id: 'quotient',
    title: 'Propiedad del Cociente',
    shortTitle: 'Cociente',
    description: 'La raíz de un cociente es igual al cociente de las raíces',
    formula: 'ⁿ√(a / b) = ⁿ√a / ⁿ√b',
    formulaLatex: '\\sqrt[n]{\\dfrac{a}{b}} = \\dfrac{\\sqrt[n]{a}}{\\sqrt[n]{b}}',
    example: {
      input: '\\sqrt{\\dfrac{81}{9}}',
      steps: [
        'Separamos: $\\dfrac{\\sqrt{81}}{\\sqrt{9}}$',
        'Calculamos cada raíz: $\\dfrac{9}{3}$',
      ],
      result: '3',
    },
    color: 'purple',
  },
  {
    id: 'rootOfRoot',
    title: 'Raíz de una Raíz',
    shortTitle: 'Raíz²',
    description: 'Al tener una raíz de otra raíz, los índices se multiplican',
    formula: 'ᵐ√(ⁿ√a) = ᵐˣⁿ√a',
    formulaLatex: '\\sqrt[m]{\\sqrt[n]{a}} = \\sqrt[m \\cdot n]{a}',
    example: {
      input: '\\sqrt[3]{\\sqrt{64}}',
      steps: [
        'Multiplicamos índices: $3 \\times 2 = 6$',
        'Queda: $\\sqrt[6]{64}$',
        'Como $2^6 = 64$, entonces $\\sqrt[6]{64} = 2$',
      ],
      result: '2',
    },
    color: 'teal',
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
  const [activeTab, setActiveTab] = useState<TabId>('product');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['product']);

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
          Propiedades de las Raíces
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Las tres propiedades fundamentales
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
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• <InlineMath latex="\sqrt{4 \times 9} = \sqrt{4} \times \sqrt{9} = 2 \times 3 = 6" /></li>
                <li>• <InlineMath latex="\sqrt{\dfrac{16}{4}} = \dfrac{\sqrt{16}}{\sqrt{4}} = \dfrac{4}{2} = 2" /></li>
                <li>• <InlineMath latex="\sqrt{\sqrt{81}} = \sqrt[4]{81} = 3" /></li>
                <li>• Los índices deben ser iguales para usar producto/cociente</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• <span className="line-through"><InlineMath latex="\sqrt{9+16} = \sqrt{9} + \sqrt{16}" /></span> ❌</li>
                <li>• <span className="line-through"><InlineMath latex="\sqrt{25-9} = \sqrt{25} - \sqrt{9}" /></span> ❌</li>
                <li>• <MathText content="Confundir $\sqrt{\sqrt{a}}$ con $(\sqrt{a})^2$" /></li>
                <li>• Olvidar simplificar el resultado final</li>
              </ul>
            </div>
          </div>

          {/* Key insight */}
          <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-6 border border-red-200 dark:border-red-700 mb-4">
            <h4 className="font-bold text-red-800 dark:text-red-200 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              ¡La regla más importante!
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Las propiedades <strong>SOLO funcionan</strong> con multiplicación y división.
            </p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-green-600"><InlineMath latex="\sqrt{a \times b} = \sqrt{a} \times \sqrt{b}" /> ✓</div>
                  <div className="text-green-600"><InlineMath latex="\sqrt{\dfrac{a}{b}} = \dfrac{\sqrt{a}}{\sqrt{b}}" /> ✓</div>
                </div>
                <div className="space-y-2">
                  <div className="text-red-600"><InlineMath latex="\sqrt{a + b} \neq \sqrt{a} + \sqrt{b}" /> ✗</div>
                  <div className="text-red-600"><InlineMath latex="\sqrt{a - b} \neq \sqrt{a} - \sqrt{b}" /> ✗</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Clave para recordar:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Multiplica y divide, pero no sumes ni restes</strong> cuando uses propiedades de raíces.
            </p>
          </div>
        </div>
      ) : (
        /* Formula content */
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

          {/* Main formula */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6">
            <div className="text-center text-2xl text-gray-800 dark:text-gray-200">
              <BlockMath latex={currentFormula!.formulaLatex} />
            </div>
          </div>

          {/* Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Ejemplo:
            </h4>
            <div className="space-y-3">
              <div className="text-lg text-gray-800 dark:text-gray-200">
                <InlineMath latex={currentFormula!.example.input} />
              </div>
              <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
                {currentFormula!.example.steps.map((step, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-400 text-sm">
                    {i === currentFormula!.example.steps.length - 1 ? '→ ' : '• '}
                    <MathText content={step} />
                  </p>
                ))}
              </div>
              <div className={cn('p-3 rounded-lg mt-4', colors.bg)}>
                <p className={cn('font-bold text-lg text-center', colors.text)}>
                  = {currentFormula!.example.result}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {FORMULAS.map((formula) => {
          const cardColors = colorClasses[formula.color];
          return (
            <div
              key={formula.id}
              className={cn(
                'p-3 rounded-lg border text-center',
                cardColors.bg,
                cardColors.border
              )}
            >
              <p className={cn('text-xs font-bold', cardColors.text)}>
                {formula.shortTitle}
              </p>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                <InlineMath latex={formula.formulaLatex.split('=')[0].trim()} />
              </div>
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
