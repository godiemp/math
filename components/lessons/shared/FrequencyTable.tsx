'use client';

import { cn } from '@/lib/utils';

export interface FrequencyTableData {
  category: string;
  frequency: number;
  color?: string;
}

export interface FrequencyTableProps {
  /** Data for each row */
  data: FrequencyTableData[];
  /** Show tally marks column */
  showTally?: boolean;
  /** Show relative frequency column */
  showRelative?: boolean;
  /** Show percentage column */
  showPercentage?: boolean;
  /** Total count (auto-calculated if not provided) */
  total?: number;
  /** Index of row to highlight */
  highlightRow?: number;
  /** Callback when row is clicked */
  onRowClick?: (index: number) => void;
  /** Animate number changes */
  animated?: boolean;
  /** Custom class name */
  className?: string;
}

// Render tally marks (||||) with crossover for groups of 5
function TallyMarks({ count }: { count: number }) {
  const groups = Math.floor(count / 5);
  const remainder = count % 5;

  return (
    <div className="flex items-center gap-3">
      {/* Groups of 5 - using SVG for precise rendering */}
      {Array.from({ length: groups }).map((_, groupIndex) => (
        <svg
          key={`group-${groupIndex}`}
          width="24"
          height="20"
          viewBox="0 0 24 20"
          className="text-gray-700 dark:text-gray-300"
        >
          {/* 4 vertical lines */}
          <line x1="3" y1="2" x2="3" y2="18" stroke="currentColor" strokeWidth="2" />
          <line x1="8" y1="2" x2="8" y2="18" stroke="currentColor" strokeWidth="2" />
          <line x1="13" y1="2" x2="13" y2="18" stroke="currentColor" strokeWidth="2" />
          <line x1="18" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
          {/* Diagonal strike-through */}
          <line x1="1" y1="16" x2="21" y2="4" stroke="currentColor" strokeWidth="2" />
        </svg>
      ))}

      {/* Remaining marks (1-4) */}
      {remainder > 0 && (
        <svg
          width={remainder * 5 + 2}
          height="20"
          viewBox={`0 0 ${remainder * 5 + 2} 20`}
          className="text-gray-700 dark:text-gray-300"
        >
          {Array.from({ length: remainder }).map((_, i) => (
            <line
              key={`remainder-${i}`}
              x1={i * 5 + 3}
              y1="2"
              x2={i * 5 + 3}
              y2="18"
              stroke="currentColor"
              strokeWidth="2"
            />
          ))}
        </svg>
      )}

      {/* Show dash if count is 0 */}
      {count === 0 && <span className="text-gray-400">—</span>}
    </div>
  );
}

export default function FrequencyTable({
  data,
  showTally = false,
  showRelative = false,
  showPercentage = false,
  total: providedTotal,
  highlightRow,
  onRowClick,
  animated = true,
  className,
}: FrequencyTableProps) {
  const total = providedTotal ?? data.reduce((sum, item) => sum + item.frequency, 0);

  const getRelativeFrequency = (frequency: number) => {
    return total > 0 ? (frequency / total).toFixed(2) : '0.00';
  };

  const getPercentage = (frequency: number) => {
    return total > 0 ? Math.round((frequency / total) * 100) : 0;
  };

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              Categoria
            </th>
            {showTally && (
              <th className="px-3 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                Conteo
              </th>
            )}
            <th className="px-3 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              Frecuencia (f<sub>i</sub>)
            </th>
            {showRelative && (
              <th className="px-3 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                Frec. Relativa (h<sub>i</sub>)
              </th>
            )}
            {showPercentage && (
              <th className="px-3 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                Porcentaje
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const isHighlighted = highlightRow === index;
            const rowColor = item.color;

            return (
              <tr
                key={`${item.category}-${index}`}
                onClick={() => onRowClick?.(index)}
                className={cn(
                  'border-b border-gray-100 dark:border-gray-800',
                  animated && 'transition-all duration-300',
                  onRowClick && 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50',
                  isHighlighted && 'bg-amber-50 dark:bg-amber-900/30'
                )}
              >
                {/* Category with color indicator */}
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    {rowColor && (
                      <div
                        className="w-3 h-3 rounded-sm flex-shrink-0"
                        style={{ backgroundColor: rowColor }}
                      />
                    )}
                    <span
                      className={cn(
                        'text-sm',
                        isHighlighted
                          ? 'text-amber-700 dark:text-amber-300 font-semibold'
                          : 'text-gray-800 dark:text-gray-200'
                      )}
                    >
                      {item.category}
                    </span>
                  </div>
                </td>

                {/* Tally marks */}
                {showTally && (
                  <td className="px-3 py-2 text-center">
                    <TallyMarks count={item.frequency} />
                  </td>
                )}

                {/* Absolute frequency */}
                <td className="px-3 py-2 text-center">
                  <span
                    className={cn(
                      'text-sm font-mono',
                      animated && 'transition-all duration-300',
                      isHighlighted
                        ? 'text-amber-700 dark:text-amber-300 font-bold text-base'
                        : 'text-gray-800 dark:text-gray-200'
                    )}
                  >
                    {item.frequency}
                  </span>
                </td>

                {/* Relative frequency */}
                {showRelative && (
                  <td className="px-3 py-2 text-center">
                    <span
                      className={cn(
                        'text-sm font-mono',
                        isHighlighted
                          ? 'text-amber-700 dark:text-amber-300 font-bold'
                          : 'text-gray-600 dark:text-gray-400'
                      )}
                    >
                      {getRelativeFrequency(item.frequency)}
                    </span>
                  </td>
                )}

                {/* Percentage */}
                {showPercentage && (
                  <td className="px-3 py-2 text-center">
                    <span
                      className={cn(
                        'text-sm font-mono',
                        isHighlighted
                          ? 'text-amber-700 dark:text-amber-300 font-bold'
                          : 'text-gray-600 dark:text-gray-400'
                      )}
                    >
                      {getPercentage(item.frequency)}%
                    </span>
                  </td>
                )}
              </tr>
            );
          })}

          {/* Total row */}
          <tr className="bg-gray-50 dark:bg-gray-800/50 font-semibold">
            <td className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
              Total
            </td>
            {showTally && <td className="px-3 py-2"></td>}
            <td className="px-3 py-2 text-center text-sm text-gray-700 dark:text-gray-300 font-mono">
              {total}
            </td>
            {showRelative && (
              <td className="px-3 py-2 text-center text-sm text-gray-700 dark:text-gray-300 font-mono">
                1.00
              </td>
            )}
            {showPercentage && (
              <td className="px-3 py-2 text-center text-sm text-gray-700 dark:text-gray-300 font-mono">
                100%
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
