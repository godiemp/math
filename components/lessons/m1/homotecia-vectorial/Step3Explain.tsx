'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen, Lightbulb, AlertTriangle, ZoomIn, ZoomOut, RotateCcw, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'amplificacion' | 'reduccion' | 'inversion' | 'tips';

interface FormulaTab {
  id: Exclude<TabId, 'tips'>;
  title: string;
  shortTitle: string;
  description: string;
  condition: string;
  icon: LucideIcon;
  example: {
    k: number;
    center: { x: number; y: number };
    point: { x: number; y: number };
    result: { x: number; y: number };
    steps: string[];
  };
  color: string;
}

const FORMULAS: FormulaTab[] = [
  {
    id: 'amplificacion',
    title: 'Amplificación',
    shortTitle: 'k > 1',
    description:
      'Cuando k es mayor que 1, la figura se agranda. Las distancias desde el centro se multiplican por k.',
    condition: 'k > 1',
    icon: ZoomIn,
    example: {
      k: 2,
      center: { x: 0, y: 0 },
      point: { x: 3, y: 2 },
      result: { x: 6, y: 4 },
      steps: [
        "P' = C + k · (P - C)",
        "P' = (0, 0) + 2 · ((3, 2) - (0, 0))",
        "P' = (0, 0) + 2 · (3, 2)",
        "P' = (6, 4)",
      ],
    },
    color: 'green',
  },
  {
    id: 'reduccion',
    title: 'Reducción',
    shortTitle: '0 < k < 1',
    description:
      'Cuando k está entre 0 y 1, la figura se reduce. El punto imagen está más cerca del centro.',
    condition: '0 < k < 1',
    icon: ZoomOut,
    example: {
      k: 0.5,
      center: { x: 0, y: 0 },
      point: { x: 4, y: 6 },
      result: { x: 2, y: 3 },
      steps: [
        "P' = C + k · (P - C)",
        "P' = (0, 0) + 0.5 · ((4, 6) - (0, 0))",
        "P' = (0, 0) + 0.5 · (4, 6)",
        "P' = (2, 3)",
      ],
    },
    color: 'amber',
  },
  {
    id: 'inversion',
    title: 'Inversión',
    shortTitle: 'k < 0',
    description:
      'Cuando k es negativo, el punto imagen aparece al lado opuesto del centro. La figura se "invierte".',
    condition: 'k < 0',
    icon: RotateCcw,
    example: {
      k: -1,
      center: { x: 2, y: 2 },
      point: { x: 5, y: 4 },
      result: { x: -1, y: 0 },
      steps: [
        "P' = C + k · (P - C)",
        "P' = (2, 2) + (-1) · ((5, 4) - (2, 2))",
        "P' = (2, 2) + (-1) · (3, 2)",
        "P' = (2 - 3, 2 - 2) = (-1, 0)",
      ],
    },
    color: 'red',
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; tab: string }> = {
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
  red: {
    bg: 'bg-red-50 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-200 dark:border-red-700',
    tab: 'bg-red-500 text-white',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-700',
    tab: 'bg-purple-500 text-white',
  },
};

export default function Step3Explain({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('amplificacion');
  const [visitedTabs, setVisitedTabs] = useState<TabId[]>(['amplificacion']);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
  };

  const currentFormula = FORMULAS.find((f) => f.id === activeTab);
  const colors = activeTab === 'tips' ? colorClasses.purple : colorClasses[currentFormula!.color];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Tipos de Homotecia
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explora los diferentes casos según el valor de k
        </p>
      </div>

      {/* Main formula */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 rounded-xl p-6 text-center border border-purple-200 dark:border-purple-700">
        <p className="text-gray-600 dark:text-gray-400 mb-2">Fórmula de la homotecia:</p>
        <p className="font-mono text-2xl text-purple-700 dark:text-purple-300 font-bold">
          P&apos; = C + k · (P - C)
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          C = centro, P = punto original, P&apos; = punto imagen, k = razón
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {FORMULAS.map((formula) => {
          const tabColors = colorClasses[formula.color];
          const isVisited = visitedTabs.includes(formula.id);
          const IconComponent = formula.icon;
          return (
            <button
              key={formula.id}
              onClick={() => handleTabChange(formula.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm',
                activeTab === formula.id
                  ? tabColors.tab
                  : isVisited
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              )}
            >
              <IconComponent size={16} />
              <span>{formula.shortTitle}</span>
              {isVisited && activeTab !== formula.id && (
                <span className="ml-1 text-green-500">✓</span>
              )}
            </button>
          );
        })}
        {/* Tips tab */}
        <button
          onClick={() => handleTabChange('tips')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm',
            activeTab === 'tips'
              ? colorClasses.purple.tab
              : visitedTabs.includes('tips')
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
          )}
        >
          <AlertTriangle size={16} />
          <span>Tips</span>
          {visitedTabs.includes('tips') && activeTab !== 'tips' && (
            <span className="ml-1 text-green-500">✓</span>
          )}
        </button>
      </div>

      {/* Content */}
      {activeTab === 'tips' ? (
        /* Tips content */
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>Tips y errores comunes</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Recuerda:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• El <strong>centro C</strong> siempre queda fijo (C&apos; = C)</li>
                <li>• Si k = 1, no hay transformación (P&apos; = P)</li>
                <li>• Las distancias se multiplican por |k|</li>
                <li>• La forma se conserva (figuras semejantes)</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Olvidar restar el centro antes de multiplicar</li>
                <li>• Confundir k negativo con solo reducción</li>
                <li>• Pensar que el centro se mueve</li>
                <li>• Aplicar k solo a x o solo a y</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Clave para no equivocarse
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Siempre calcula <strong>(P - C)</strong> primero. Este vector representa la
              &quot;distancia direccional&quot; del centro al punto. Luego multiplica por k y suma
              al centro.
            </p>
            <div className="mt-3 font-mono text-sm bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400">
                1. Vector: (P - C) = (Px - Cx, Py - Cy)
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                2. Escalar: k · (P - C) = (k(Px - Cx), k(Py - Cy))
              </p>
              <p className="text-green-600 dark:text-green-400 font-bold">
                3. Resultado: P&apos; = C + k · (P - C)
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Formula content */
        <div className={cn('rounded-2xl p-6 border', colors.bg, colors.border)}>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className={cn('w-6 h-6', colors.text)} />
            <h3 className={cn('text-xl font-bold', colors.text)}>{currentFormula!.title}</h3>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4">{currentFormula!.description}</p>

          {/* Condition highlight */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 text-center">
            <p className="text-gray-500 text-sm mb-2">Condición:</p>
            <p className={cn('text-2xl font-mono font-bold', colors.text)}>
              {currentFormula!.condition}
            </p>
          </div>

          {/* Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Ejemplo con k = {currentFormula!.example.k}:
            </h4>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span>
                  Centro: C = ({currentFormula!.example.center.x}, {currentFormula!.example.center.y})
                </span>
                <span>
                  Punto: P = ({currentFormula!.example.point.x}, {currentFormula!.example.point.y})
                </span>
              </div>
              <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
                {currentFormula!.example.steps.map((step, i) => (
                  <p
                    key={i}
                    className={cn(
                      'font-mono text-sm',
                      i === currentFormula!.example.steps.length - 1
                        ? cn('font-bold', colors.text)
                        : 'text-gray-600 dark:text-gray-400'
                    )}
                  >
                    {i === currentFormula!.example.steps.length - 1 ? '→ ' : '• '}
                    {step}
                  </p>
                ))}
              </div>
              <div className={cn('p-3 rounded-lg mt-4', colors.bg)}>
                <p className={cn('font-mono font-bold text-lg text-center', colors.text)}>
                  Imagen: P&apos; = ({currentFormula!.example.result.x},{' '}
                  {currentFormula!.example.result.y})
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
          const IconComponent = formula.icon;
          return (
            <div
              key={formula.id}
              className={cn(
                'p-3 rounded-lg border text-center',
                cardColors.bg,
                cardColors.border
              )}
            >
              <IconComponent className={cn('w-5 h-5 mx-auto mb-1', cardColors.text)} />
              <p className={cn('font-mono text-sm font-bold', cardColors.text)}>
                {formula.shortTitle}
              </p>
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
