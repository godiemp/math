'use client';

import { useState, useEffect } from 'react';
import { ReadingMode } from './ReadingModeControl';

export type SectionImportance = 'essential' | 'important' | 'advanced';
export type CollapseControl = 'fold-all' | 'unfold-all' | 'unfold-h2' | 'unfold-h3' | 'unfold-h4' | null;

interface CollapsibleSectionProps {
  id: string;
  title: string;
  importance: SectionImportance;
  mode: ReadingMode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  level?: number; // Heading level: 2 for ##, 3 for ###, etc.
  collapseControl?: CollapseControl; // External control
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
  level = 2,
  collapseControl,
}: CollapsibleSectionProps) {
  const visible = shouldShowSection(importance, mode);
  const autoOpen = defaultOpen !== undefined ? defaultOpen : shouldBeOpenByDefault(importance, mode);
  const [isOpen, setIsOpen] = useState(autoOpen);

  // Update open state when mode changes
  useEffect(() => {
    const shouldBeOpen = shouldBeOpenByDefault(importance, mode);
    setIsOpen(shouldBeOpen);
  }, [mode, importance]);

  // Update open state when external collapse control changes
  useEffect(() => {
    if (collapseControl === 'fold-all') {
      setIsOpen(false);
    } else if (collapseControl === 'unfold-all') {
      setIsOpen(true);
    } else if (collapseControl === 'unfold-h2' && level <= 2) {
      setIsOpen(true);
    } else if (collapseControl === 'unfold-h3' && level <= 3) {
      setIsOpen(true);
    } else if (collapseControl === 'unfold-h4' && level <= 4) {
      setIsOpen(true);
    }
  }, [collapseControl, level]);

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

  // Visual hierarchy based on level - minimal and clean
  const levelStyles = {
    2: {
      margin: 'mt-6 mb-4',
      indent: 'pl-0',
      fontSize: 'text-lg',
      fontWeight: 'font-bold',
    },
    3: {
      margin: 'mt-4 mb-3',
      indent: 'pl-4',
      fontSize: 'text-base',
      fontWeight: 'font-semibold',
    },
    4: {
      margin: 'mt-3 mb-2',
      indent: 'pl-8',
      fontSize: 'text-sm',
      fontWeight: 'font-medium',
    },
  };

  const style = levelStyles[level as keyof typeof levelStyles] || levelStyles[2];

  return (
    <div className={`${style.margin}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full ${style.indent} py-2 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors flex items-center justify-between gap-3 text-left group`}
      >
        <div className="flex items-center gap-2">
          <span className="text-gray-400 dark:text-gray-500 transition-transform text-xs" style={{
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          }}>
            ▶
          </span>
          <h3 className={`${style.fontSize} ${style.fontWeight} text-gray-900 dark:text-gray-100`}>
            {title}
          </h3>
          {mode === 'full' && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${importanceColors[importance]} opacity-60 group-hover:opacity-100 transition-opacity`}>
              {importanceLabels[importance]}
            </span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className={`${style.indent} pl-6 pt-2 pb-4`}>
          {children}
        </div>
      )}

      {/* Subtle separator */}
      <div className={`${style.indent} border-b border-gray-100 dark:border-gray-800`}></div>
    </div>
  );
}
