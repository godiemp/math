'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface NumberLineProps {
  /** Minimum value on the number line */
  min?: number;
  /** Maximum value on the number line */
  max?: number;
  /** Show tick marks at each integer */
  showTicks?: boolean;
  /** Show labels at each integer */
  showLabels?: boolean;
  /** Numbers to display as markers (for placement exercises) */
  markers?: number[];
  /** Numbers that user needs to place (draggable) */
  draggableNumbers?: number[];
  /** Called when a number is placed */
  onPlacement?: (number: number, position: number) => void;
  /** Called when all numbers are correctly placed */
  onAllCorrect?: () => void;
  /** Highlight zero specially */
  highlightZero?: boolean;
  /** Show absolute value distance from zero for a number */
  showDistanceFor?: number | null;
  /** Read-only mode (no dragging) */
  readOnly?: boolean;
  /** Custom class name */
  className?: string;
}

interface PlacedNumber {
  value: number;
  position: number;
  isCorrect: boolean;
}

export default function NumberLine({
  min = -5,
  max = 5,
  showTicks = true,
  showLabels = true,
  markers = [],
  draggableNumbers = [],
  onPlacement,
  onAllCorrect,
  highlightZero = true,
  showDistanceFor = null,
  readOnly = false,
  className,
}: NumberLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const allCorrectCalledRef = useRef(false);
  const [placedNumbers, setPlacedNumbers] = useState<PlacedNumber[]>([]);
  const [dragging, setDragging] = useState<number | null>(null);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);

  const range = max - min;
  const ticks = Array.from({ length: range + 1 }, (_, i) => min + i);

  // Get position percentage for a number
  const getPositionPercent = (num: number) => {
    return ((num - min) / range) * 100;
  };

  // Get number from position
  const getNumberFromPosition = (clientX: number) => {
    if (!lineRef.current) return 0;
    const rect = lineRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const value = min + (percent / 100) * range;
    return Math.round(value); // Snap to integers
  };

  // Check if a number is already placed
  const isPlaced = (num: number) => {
    return placedNumbers.some(p => p.value === num);
  };

  // Handle drag start
  const handleDragStart = (num: number, e: React.MouseEvent | React.TouchEvent) => {
    if (readOnly) return;
    e.preventDefault();
    setDragging(num);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragPosition({ x: clientX, y: clientY });
  };

  // Handle drag move
  useEffect(() => {
    if (dragging === null) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setDragPosition({ x: clientX, y: clientY });
    };

    const handleEnd = (e: MouseEvent | TouchEvent) => {
      if (!lineRef.current) return;

      const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
      const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY;

      // Check if dropped on the number line
      const rect = lineRef.current.getBoundingClientRect();
      const isOnLine = clientY >= rect.top - 50 && clientY <= rect.bottom + 50;

      if (isOnLine && dragging !== null) {
        const position = getNumberFromPosition(clientX);
        const isCorrect = position === dragging;

        setPlacedNumbers(prev => {
          // Remove if already placed
          const filtered = prev.filter(p => p.value !== dragging);
          return [...filtered, { value: dragging, position, isCorrect }];
        });

        onPlacement?.(dragging, position);

        // Check if all correct
        setTimeout(() => {
          setPlacedNumbers(current => {
            const allPlaced = draggableNumbers.every(n =>
              current.some(p => p.value === n)
            );
            const allCorrect = current.every(p => p.isCorrect);

            if (allPlaced && allCorrect && !allCorrectCalledRef.current) {
              allCorrectCalledRef.current = true;
              onAllCorrect?.();
            }
            return current;
          });
        }, 100);
      }

      setDragging(null);
      setDragPosition(null);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [dragging, draggableNumbers, onPlacement, onAllCorrect]);

  return (
    <div className={cn('w-full', className)}>
      {/* Draggable numbers pool */}
      {draggableNumbers.length > 0 && !readOnly && (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {draggableNumbers
            .filter(n => !isPlaced(n) && n !== dragging)
            .map(num => (
              <div
                key={num}
                onMouseDown={(e) => handleDragStart(num, e)}
                onTouchStart={(e) => handleDragStart(num, e)}
                className={cn(
                  'w-12 h-12 flex items-center justify-center',
                  'bg-gradient-to-br from-blue-500 to-purple-500 text-white',
                  'rounded-xl font-bold text-lg',
                  'cursor-grab active:cursor-grabbing',
                  'shadow-lg hover:shadow-xl transition-shadow',
                  'select-none touch-none'
                )}
              >
                {num}
              </div>
            ))}
        </div>
      )}

      {/* Number line */}
      <div className="relative py-12">
        {/* Main line */}
        <div
          ref={lineRef}
          className="relative h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-8"
        >
          {/* Gradient overlay for visual interest */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 dark:from-blue-900 dark:via-purple-900 dark:to-blue-900 rounded-full opacity-50" />

          {/* Tick marks and labels */}
          {showTicks &&
            ticks.map(num => (
              <div
                key={num}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${getPositionPercent(num)}%` }}
              >
                {/* Tick */}
                <div
                  className={cn(
                    'w-0.5 transition-all',
                    num === 0 && highlightZero
                      ? 'h-8 bg-red-500 -mt-3.5'
                      : 'h-4 bg-gray-400 dark:bg-gray-500 -mt-1.5'
                  )}
                />

                {/* Label */}
                {showLabels && (
                  <div
                    className={cn(
                      'absolute top-6 left-1/2 -translate-x-1/2 text-sm font-medium',
                      num === 0 && highlightZero
                        ? 'text-red-600 dark:text-red-400 font-bold text-base'
                        : 'text-gray-600 dark:text-gray-400'
                    )}
                  >
                    {num}
                  </div>
                )}
              </div>
            ))}

          {/* Fixed markers */}
          {markers.map(num => (
            <div
              key={`marker-${num}`}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
              style={{ left: `${getPositionPercent(num)}%` }}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full font-bold shadow-lg -mt-4">
                {num}
              </div>
            </div>
          ))}

          {/* Placed draggable numbers */}
          {placedNumbers.map(({ value, position, isCorrect }) => (
            <div
              key={`placed-${value}`}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 transition-all duration-300"
              style={{ left: `${getPositionPercent(position)}%` }}
            >
              <div
                className={cn(
                  'w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-lg -mt-4 transition-all',
                  isCorrect
                    ? 'bg-gradient-to-br from-green-400 to-green-600 text-white ring-4 ring-green-200'
                    : 'bg-gradient-to-br from-amber-400 to-amber-600 text-white animate-pulse'
                )}
              >
                {value}
              </div>
            </div>
          ))}

          {/* Distance visualization */}
          {showDistanceFor !== null && (
            <>
              {/* Distance line */}
              <div
                className="absolute top-1/2 h-2 bg-blue-400/50 -translate-y-1/2"
                style={{
                  left: `${getPositionPercent(Math.min(0, showDistanceFor))}%`,
                  width: `${Math.abs(getPositionPercent(showDistanceFor) - getPositionPercent(0))}%`,
                }}
              />
              {/* Distance label */}
              <div
                className="absolute -top-8 text-blue-600 dark:text-blue-400 font-bold text-lg"
                style={{
                  left: `${(getPositionPercent(showDistanceFor) + getPositionPercent(0)) / 2}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                |{showDistanceFor}| = {Math.abs(showDistanceFor)}
              </div>
            </>
          )}

          {/* Arrows at ends */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-gray-400" />
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-400" />
          </div>
        </div>
      </div>

      {/* Dragging indicator - rendered in portal to avoid containing block issues */}
      {dragging !== null && dragPosition && typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed z-[9999] pointer-events-none w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg shadow-2xl opacity-90"
            style={{
              left: dragPosition.x,
              top: dragPosition.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {dragging}
          </div>,
          document.body
        )}
    </div>
  );
}
