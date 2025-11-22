'use client';

import { useState, useEffect } from 'react';

export type ReadingMode = 'full' | 'summary' | 'formulas';

interface ReadingModeControlProps {
  onChange: (mode: ReadingMode) => void;
  className?: string;
}

const STORAGE_KEY = 'reading-mode-preference';

const modes = [
  {
    id: 'full' as ReadingMode,
    label: 'Explicación Completa',
    icon: '📖',
    description: 'Todo el contenido detallado',
  },
  {
    id: 'formulas' as ReadingMode,
    label: 'Solo Fórmulas',
    icon: '📐',
    description: 'Fórmulas y definiciones clave',
  },
];

export function ReadingModeControl({ onChange, className = '' }: ReadingModeControlProps) {
  const [selectedMode, setSelectedMode] = useState<ReadingMode>('full');

  // Load saved preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as ReadingMode | null;
      if (saved && ['full', 'summary', 'formulas'].includes(saved)) {
        setSelectedMode(saved);
        onChange(saved);
      }
    }
  }, [onChange]);

  const handleModeChange = (mode: ReadingMode) => {
    setSelectedMode(mode);
    onChange(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, mode);
    }
  };

  return (
    <div className={`bg-white dark:bg-[#1a1a1a] rounded-lg border border-black/[0.12] dark:border-white/[0.16] p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          📖 Modo de lectura:
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleModeChange(mode.id)}
            className={`
              flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all
              ${selectedMode === mode.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
            `}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg">{mode.icon}</span>
              <span className="hidden sm:inline">{mode.label}</span>
              <span className="sm:hidden">{mode.label.split(' ')[0]}</span>
            </div>
            <div className={`text-xs mt-1 ${selectedMode === mode.id ? 'text-indigo-100' : 'text-gray-500 dark:text-gray-400'}`}>
              {mode.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
