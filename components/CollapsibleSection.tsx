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
    essential: 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900',
    important: 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900',
    advanced: 'bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-900',
  };

  const importanceLabels = {
    essential: 'Esencial',
    important: 'Importante',
    advanced: 'Avanzado',
  };

  // Visual hierarchy based on level - modern and clean
  const levelStyles = {
    2: {
      margin: 'mt-8 mb-2',
      indent: 'pl-0',
      fontSize: 'text-lg',
      fontWeight: 'font-semibold',
    },
    3: {
      margin: 'mt-6 mb-2',
      indent: 'pl-0',
      fontSize: 'text-base',
      fontWeight: 'font-medium',
    },
    4: {
      margin: 'mt-4 mb-2',
      indent: 'pl-0',
      fontSize: 'text-sm',
      fontWeight: 'font-medium',
    },
  };

  const style = levelStyles[level as keyof typeof levelStyles] || levelStyles[2];

  return (
    <div className={`${style.margin}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full rounded-lg px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all flex items-center justify-between gap-3 text-left group border border-transparent hover:border-slate-200 dark:hover:border-slate-700`}
      >
        <div className="flex items-center gap-3">
          <span className="text-slate-400 dark:text-slate-500 transition-transform duration-200" style={{
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          }}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </span>
          <h3 className={`${style.fontSize} ${style.fontWeight} text-slate-900 dark:text-slate-50`}>
            {title}
          </h3>
        </div>
        {mode === 'full' && (
          <span className={`text-[10px] px-2 py-1 rounded-full border ${importanceColors[importance]} opacity-70 group-hover:opacity-100 transition-opacity font-medium`}>
            {importanceLabels[importance]}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="mt-3 mb-4 px-4">
          {children}
        </div>
      )}
    </div>
  );
}
