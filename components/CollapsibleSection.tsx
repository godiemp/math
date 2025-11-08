'use client';

import { useState, useEffect } from 'react';
import { ReadingMode } from './ReadingModeControl';

export type SectionImportance = 'essential' | 'important' | 'advanced';

interface CollapsibleSectionProps {
  id: string;
  title: string;
  importance: SectionImportance;
  mode: ReadingMode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

// Determine if section should be visible based on mode and importance
function shouldShowSection(importance: SectionImportance, mode: ReadingMode): boolean {
  if (mode === 'formulas') {
    // In formulas mode, we don't show regular sections (only formulas are shown separately)
    return false;
  }

  if (mode === 'summary') {
    // In summary mode, only show essential and important (collapsed)
    return importance === 'essential' || importance === 'important';
  }

  // In full mode, show everything
  return true;
}

// Determine if section should be open by default
function shouldBeOpenByDefault(importance: SectionImportance, mode: ReadingMode): boolean {
  if (mode === 'full') {
    return true; // Everything open in full mode
  }

  if (mode === 'summary') {
    return importance === 'essential'; // Only essential open in summary
  }

  return false;
}

export function CollapsibleSection({
  id,
  title,
  importance,
  mode,
  children,
  defaultOpen,
}: CollapsibleSectionProps) {
  const visible = shouldShowSection(importance, mode);
  const autoOpen = defaultOpen !== undefined ? defaultOpen : shouldBeOpenByDefault(importance, mode);
  const [isOpen, setIsOpen] = useState(autoOpen);

  // Update open state when mode changes
  useEffect(() => {
    const shouldBeOpen = shouldBeOpenByDefault(importance, mode);
    setIsOpen(shouldBeOpen);
  }, [mode, importance]);

  if (!visible) {
    return null;
  }

  const importanceColors = {
    essential: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700',
    important: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700',
    advanced: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-700',
  };

  const importanceLabels = {
    essential: 'Esencial',
    important: 'Importante',
    advanced: 'Avanzado',
  };

  return (
    <div className="my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-gray-500 dark:text-gray-400 transition-transform" style={{
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          }}>
            ▶
          </span>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-left">
            {title}
          </h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full border ${importanceColors[importance]}`}>
          {importanceLabels[importance]}
        </span>
      </button>

      {isOpen && (
        <div className="px-4 py-4 bg-white dark:bg-transparent">
          {children}
        </div>
      )}
    </div>
  );
}
