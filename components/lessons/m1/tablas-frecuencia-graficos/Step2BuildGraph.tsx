'use client';

import { useState } from 'react';
import { ArrowRight, Bus, Train, Car, Bike, Footprints, Check, ToggleLeft, ToggleRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { BarChart, FrequencyTable } from '@/components/lessons/shared';

type Phase = 'categorize' | 'relative' | 'summary';

// Transport categories with icons and colors
const CATEGORIES = [
  { id: 'bus', name: 'Bus', emoji: '🚌', color: '#3B82F6', Icon: Bus },
  { id: 'metro', name: 'Metro', emoji: '🚇', color: '#8B5CF6', Icon: Train },
  { id: 'auto', name: 'Auto', emoji: '🚗', color: '#10B981', Icon: Car },
  { id: 'bici', name: 'Bicicleta', emoji: '🚲', color: '#F59E0B', Icon: Bike },
  { id: 'pie', name: 'A pie', emoji: '🚶', color: '#EF4444', Icon: Footprints },
];

// Generate shuffled transport data (20 items)
const TRANSPORT_COUNTS: Record<string, number> = {
  bus: 6,
  metro: 5,
  auto: 4,
  bici: 3,
  pie: 2,
};

function generateTransportData() {
  const data: { id: string; categoryId: string }[] = [];
  let idCounter = 0;

  Object.entries(TRANSPORT_COUNTS).forEach(([categoryId, count]) => {
    for (let i = 0; i < count; i++) {
      data.push({ id: `item-${idCounter++}`, categoryId });
    }
  });

  // Shuffle
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }

  return data;
}

const INITIAL_DATA = generateTransportData();

export default function Step2BuildGraph({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('categorize');
  const [unsortedItems, setUnsortedItems] = useState(INITIAL_DATA);
  const [categorizedCounts, setCategorizedCounts] = useState<Record<string, number>>({
    bus: 0,
    metro: 0,
    auto: 0,
    bici: 0,
    pie: 0,
  });
  const [showRelative, setShowRelative] = useState(false);

  if (!isActive) return null;

  const totalCategorized = Object.values(categorizedCounts).reduce((a, b) => a + b, 0);
  const allCategorized = unsortedItems.length === 0;

  // Handle clicking on an item to categorize it
  const handleItemClick = (item: { id: string; categoryId: string }) => {
    // Remove from unsorted
    setUnsortedItems((prev) => prev.filter((i) => i.id !== item.id));

    // Add to categorized counts
    setCategorizedCounts((prev) => ({
      ...prev,
      [item.categoryId]: prev[item.categoryId] + 1,
    }));
  };

  // Prepare data for chart and table
  const chartData = CATEGORIES.map((cat) => ({
    category: cat.name,
    value: categorizedCounts[cat.id],
    color: cat.color,
  }));

  const tableData = CATEGORIES.map((cat) => ({
    category: cat.name,
    frequency: categorizedCounts[cat.id],
    color: cat.color,
  }));

  // ============ PHASE 1: CATEGORIZE ============
  if (phase === 'categorize') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Construye tu Grafico
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Toca cada item para clasificarlo y ver el grafico crecer
          </p>
        </div>

        {/* Progress indicator */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 text-center">
          <span className="text-blue-700 dark:text-blue-300 font-medium">
            Clasificados: <strong>{totalCategorized}</strong> / {INITIAL_DATA.length}
          </span>
          <div className="w-full h-2 bg-blue-200 dark:bg-blue-800 rounded mt-2">
            <div
              className="h-full bg-blue-500 rounded transition-all duration-300"
              style={{ width: `${(totalCategorized / INITIAL_DATA.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Two-column layout: Items + Table on left, Chart on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left column: Unsorted items + Frequency table */}
          <div className="space-y-4">
            {/* Unsorted items */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 min-h-32">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Encuesta: ¿Cómo llegas al colegio?
              </p>
              <div className="flex flex-wrap gap-2">
                {unsortedItems.map((item) => {
                  const category = CATEGORIES.find((c) => c.id === item.categoryId)!;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className={cn(
                        'px-3 py-2 rounded-lg border-2 transition-all',
                        'hover:scale-105 hover:shadow-md active:scale-95',
                        'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                      )}
                      title={`Clasificar: ${category.name}`}
                    >
                      <span className="text-xl">{category.emoji}</span>
                    </button>
                  );
                })}
                {unsortedItems.length === 0 && (
                  <p className="text-green-600 dark:text-green-400 font-medium flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    ¡Todos clasificados!
                  </p>
                )}
              </div>
            </div>

            {/* Frequency table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Tabla de Frecuencia
              </h3>
              <FrequencyTable data={tableData} showTally animated />
            </div>
          </div>

          {/* Right column: Bar chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Grafico de Barras
            </h3>
            <BarChart data={chartData} height="lg" animated />
          </div>
        </div>

        {/* Continue button */}
        {allCategorized && (
          <div className="flex justify-center animate-fadeIn">
            <button
              onClick={() => setPhase('relative')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Siguiente: Frecuencia Relativa</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {/* Auto-classify button for impatient users */}
        {!allCategorized && (
          <div className="flex justify-center">
            <button
              onClick={() => {
                setCategorizedCounts(TRANSPORT_COUNTS);
                setUnsortedItems([]);
              }}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
            >
              Clasificar todos automaticamente
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 2: RELATIVE FREQUENCY ============
  if (phase === 'relative') {
    return (
      <div className="space-y-6 animate-fadeIn pb-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Frecuencia Absoluta vs Relativa
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Usa el interruptor para cambiar entre conteo y porcentaje
          </p>
        </div>

        {/* Toggle switch */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowRelative(!showRelative)}
            className={cn(
              'flex items-center gap-3 px-6 py-3 rounded-xl transition-all',
              showRelative
                ? 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-300 dark:border-purple-700'
                : 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-700'
            )}
          >
            {showRelative ? (
              <ToggleRight className="w-6 h-6 text-purple-600" />
            ) : (
              <ToggleLeft className="w-6 h-6 text-blue-600" />
            )}
            <span
              className={cn(
                'font-semibold',
                showRelative ? 'text-purple-700 dark:text-purple-300' : 'text-blue-700 dark:text-blue-300'
              )}
            >
              {showRelative ? 'Frecuencia Relativa (%)' : 'Frecuencia Absoluta (conteo)'}
            </span>
          </button>
        </div>

        {/* Chart and table side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Frequency table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Tabla de Frecuencia
            </h3>
            <FrequencyTable
              data={tableData}
              showTally
              showRelative={showRelative}
              showPercentage={showRelative}
              animated
            />
          </div>

          {/* Bar chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Grafico de Barras
            </h3>
            <BarChart
              data={chartData}
              height="lg"
              valueType={showRelative ? 'percentage' : 'absolute'}
              animated
            />
          </div>
        </div>

        {/* Explanation */}
        <div
          className={cn(
            'rounded-xl p-4 border transition-all',
            showRelative
              ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700'
              : 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700'
          )}
        >
          {showRelative ? (
            <div>
              <p className="text-purple-800 dark:text-purple-200 font-semibold mb-1">
                Frecuencia Relativa (h<sub>i</sub>)
              </p>
              <p className="text-purple-700 dark:text-purple-300 text-sm">
                Muestra qué <strong>proporción del total</strong> representa cada categoría.
                Se calcula: h<sub>i</sub> = f<sub>i</sub> / n
              </p>
            </div>
          ) : (
            <div>
              <p className="text-blue-800 dark:text-blue-200 font-semibold mb-1">
                Frecuencia Absoluta (f<sub>i</sub>)
              </p>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                Es simplemente el <strong>conteo</strong> de cuántas veces aparece cada categoría.
              </p>
            </div>
          )}
        </div>

        {/* Continue button */}
        <div className="flex justify-center">
          <button
            onClick={() => setPhase('summary')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Ver resumen</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 3: SUMMARY ============
  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Lo Lograste!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Has construido tu primera tabla de frecuencia y grafico de barras
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Frecuencia Absoluta
          </h4>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            f<sub>i</sub> = número de veces que aparece cada categoría
          </p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
            Frecuencia Relativa
          </h4>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            h<sub>i</sub> = f<sub>i</sub> / n (proporción del total)
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Grafico de Barras
          </h4>
          <p className="text-green-700 dark:text-green-300 text-sm">
            Visualiza las frecuencias como alturas de barras
          </p>
        </div>
      </div>

      {/* Final chart display */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <BarChart data={chartData} height="md" animated />
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
