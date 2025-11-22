'use client';

import { CollapseControl } from '@/components/shared/CollapsibleSection';

interface CollapseControlsProps {
  onControlChange: (control: CollapseControl) => void;
  className?: string;
}

export function CollapseControls({ onControlChange, className = '' }: CollapseControlsProps) {
  const handleControl = (control: CollapseControl) => {
    onControlChange(control);
    // Reset control after a short delay to allow multiple triggers
    setTimeout(() => onControlChange(null), 100);
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
        Controles:
      </span>

      <button
        onClick={() => handleControl('unfold-all')}
        className="px-3 py-1.5 text-xs font-medium rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
      >
        📖 Expandir Todo
      </button>

      <button
        onClick={() => handleControl('fold-all')}
        className="px-3 py-1.5 text-xs font-medium rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        📕 Colapsar Todo
      </button>

      <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>

      <span className="text-xs text-gray-500 dark:text-gray-400">
        Por nivel:
      </span>

      <button
        onClick={() => handleControl('unfold-h2')}
        className="px-2 py-1 text-xs font-medium rounded bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
        title="Expandir solo títulos principales (H2)"
      >
        H2
      </button>

      <button
        onClick={() => handleControl('unfold-h3')}
        className="px-2 py-1 text-xs font-medium rounded bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
        title="Expandir hasta subtítulos (H3)"
      >
        H3
      </button>

      <button
        onClick={() => handleControl('unfold-h4')}
        className="px-2 py-1 text-xs font-medium rounded bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
        title="Expandir hasta nivel 4 (H4)"
      >
        H4
      </button>
    </div>
  );
}
