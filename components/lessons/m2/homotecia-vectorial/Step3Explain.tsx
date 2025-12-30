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
  k: number;
  color: string;
}

// SVG helpers (mini visualization)
const SCALE = 18;
const toSvgX = (x: number) => 50 + x * SCALE;
const toSvgY = (y: number) => 110 - y * SCALE;

const FORMULAS: FormulaTab[] = [
  {
    id: 'amplificacion',
    title: 'Amplificación',
    shortTitle: 'k > 1',
    description:
      'Cuando k > 1, cada coordenada se multiplica por un número mayor que 1. El punto imagen queda más lejos del centro.',
    condition: 'k > 1',
    icon: ZoomIn,
    k: 2,
    color: 'green',
  },
  {
    id: 'reduccion',
    title: 'Reducción',
    shortTitle: '0 < k < 1',
    description:
      'Cuando 0 < k < 1, cada coordenada se multiplica por una fracción. El punto imagen queda más cerca del centro.',
    condition: '0 < k < 1',
    icon: ZoomOut,
    k: 0.5,
    color: 'amber',
  },
  {
    id: 'inversion',
    title: 'Inversión',
    shortTitle: 'k < 0',
    description:
      'Cuando k < 0, las coordenadas cambian de signo. El punto pasa al lado opuesto del centro.',
    condition: 'k < 0',
    icon: RotateCcw,
    k: -1,
    color: 'red',
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; tab: string; fill: string; stroke: string }> = {
  green: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-200 dark:border-green-700',
    tab: 'bg-green-500 text-white',
    fill: 'fill-green-500',
    stroke: 'stroke-green-500',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-700',
    tab: 'bg-amber-500 text-white',
    fill: 'fill-amber-500',
    stroke: 'stroke-amber-500',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-200 dark:border-red-700',
    tab: 'bg-red-500 text-white',
    fill: 'fill-red-500',
    stroke: 'stroke-red-500',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-700',
    tab: 'bg-purple-500 text-white',
    fill: 'fill-purple-500',
    stroke: 'stroke-purple-500',
  },
};

// Mini visualization component for each k type
function MiniVisualization({ k, color }: { k: number; color: string }) {
  const colors = colorClasses[color];

  // Original point P(2, 3) - simple example
  const originalPoint = { x: 2, y: 3 };
  const transformedPoint = { x: k * originalPoint.x, y: k * originalPoint.y };

  // Grid range
  const minX = Math.min(0, transformedPoint.x) - 1;
  const maxX = Math.max(4, transformedPoint.x) + 1;
  const minY = Math.min(0, transformedPoint.y) - 1;
  const maxY = Math.max(4, transformedPoint.y) + 1;

  return (
    <svg viewBox="0 0 180 140" className="w-full max-w-[200px] mx-auto">
      {/* Grid */}
      {Array.from({ length: maxX - minX + 1 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={toSvgX(minX + i)}
          y1={toSvgY(minY)}
          x2={toSvgX(minX + i)}
          y2={toSvgY(maxY)}
          className="stroke-gray-200 dark:stroke-gray-700"
          strokeWidth="0.5"
        />
      ))}
      {Array.from({ length: maxY - minY + 1 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1={toSvgX(minX)}
          y1={toSvgY(minY + i)}
          x2={toSvgX(maxX)}
          y2={toSvgY(minY + i)}
          className="stroke-gray-200 dark:stroke-gray-700"
          strokeWidth="0.5"
        />
      ))}

      {/* Axes */}
      <line
        x1={toSvgX(minX)}
        y1={toSvgY(0)}
        x2={toSvgX(maxX)}
        y2={toSvgY(0)}
        className="stroke-gray-400"
        strokeWidth="1"
      />
      <line
        x1={toSvgX(0)}
        y1={toSvgY(minY)}
        x2={toSvgX(0)}
        y2={toSvgY(maxY)}
        className="stroke-gray-400"
        strokeWidth="1"
      />

      {/* Center (origin) */}
      <circle cx={toSvgX(0)} cy={toSvgY(0)} r={5} className="fill-purple-500" />
      <text x={toSvgX(0) - 8} y={toSvgY(0) + 12} className="fill-purple-600 text-[7px] font-bold">
        C
      </text>

      {/* Dashed line from center to transformed point */}
      <line
        x1={toSvgX(0)}
        y1={toSvgY(0)}
        x2={toSvgX(transformedPoint.x)}
        y2={toSvgY(transformedPoint.y)}
        className="stroke-gray-400"
        strokeWidth="1"
        strokeDasharray="3"
      />

      {/* Original point */}
      <circle cx={toSvgX(originalPoint.x)} cy={toSvgY(originalPoint.y)} r={4} className="fill-blue-500" />
      <text
        x={toSvgX(originalPoint.x) + 6}
        y={toSvgY(originalPoint.y) - 4}
        className="fill-blue-600 text-[7px] font-bold"
      >
        P({originalPoint.x},{originalPoint.y})
      </text>

      {/* Transformed point */}
      <circle cx={toSvgX(transformedPoint.x)} cy={toSvgY(transformedPoint.y)} r={5} className={colors.fill} />
      <text
        x={toSvgX(transformedPoint.x) + 6}
        y={toSvgY(transformedPoint.y) - 4}
        className={cn('text-[7px] font-bold', colors.text.replace('text', 'fill'))}
      >
        P′({transformedPoint.x},{transformedPoint.y})
      </text>

      {/* Arrow indicator */}
      <defs>
        <marker id={`arrow-${color}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" className={colors.fill} />
        </marker>
      </defs>
      <line
        x1={toSvgX(originalPoint.x) + 3}
        y1={toSvgY(originalPoint.y) - 3}
        x2={toSvgX(transformedPoint.x) - 3}
        y2={toSvgY(transformedPoint.y) + 3}
        className={colors.stroke}
        strokeWidth="1.5"
        markerEnd={`url(#arrow-${color})`}
      />
    </svg>
  );
}

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
        <p className="text-gray-600 dark:text-gray-400 mb-2">Fórmula (con centro en el origen):</p>
        <p className="font-mono text-2xl text-purple-700 dark:text-purple-300 font-bold">
          P′ = k · P
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Cada coordenada se multiplica por k
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
                <li>• El <strong>centro C</strong> siempre queda fijo</li>
                <li>• Si k = 1, no hay transformación (P′ = P)</li>
                <li>• Las distancias se multiplican por |k|</li>
                <li>• La forma se conserva (figuras semejantes)</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Errores comunes:</h5>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Confundir k negativo con reducción</li>
                <li>• Pensar que el centro se mueve</li>
                <li>• Aplicar k solo a x o solo a y</li>
                <li>• Olvidar el signo cuando k &lt; 0</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Clave para no equivocarse
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Con centro en el origen, el cálculo es simple:
            </p>
            <div className="font-mono text-sm bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400">
                Si P = (x, y) y k = valor dado
              </p>
              <p className="text-green-600 dark:text-green-400 font-bold mt-2">
                P′ = (k·x, k·y)
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

          {/* Mini visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 text-center">
              Visualización con k = {currentFormula!.k}
            </h4>
            <MiniVisualization k={currentFormula!.k} color={currentFormula!.color} />
          </div>

          {/* Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Ejemplo con k = {currentFormula!.k}:
            </h4>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span>Centro: C = (0, 0)</span>
                <span>Punto: P = (2, 3)</span>
              </div>
              <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
                <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                  • P′ = k · P = {currentFormula!.k} · (2, 3)
                </p>
                <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                  • P′ = ({currentFormula!.k} × 2, {currentFormula!.k} × 3)
                </p>
                <p className={cn('font-mono text-sm font-bold', colors.text)}>
                  → P′ = ({currentFormula!.k * 2}, {currentFormula!.k * 3})
                </p>
              </div>
              <div className={cn('p-3 rounded-lg mt-4', colors.bg)}>
                <p className={cn('font-mono font-bold text-lg text-center', colors.text)}>
                  Imagen: P′ = ({currentFormula!.k * 2}, {currentFormula!.k * 3})
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
