'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Ball {
  id: string;
  path: ('L' | 'R')[];
  currentStep: number;
  finalBin: number;
  isComplete: boolean;
}

interface GaltonBoardProps {
  rows?: number;
  ballsToRelease: number;
  speed?: 'slow' | 'normal' | 'fast';
  onDistributionChange?: (bins: number[]) => void;
  onAllBallsComplete?: () => void;
  showBellCurve?: boolean;
  autoStart?: boolean;
  className?: string;
}

const SPEED_MAP = {
  slow: 400,
  normal: 200,
  fast: 80,
};

// Generate random path for a ball
const generatePath = (rows: number): ('L' | 'R')[] => {
  return Array.from({ length: rows }, () => (Math.random() < 0.5 ? 'L' : 'R'));
};

// Calculate which bin the ball lands in based on path
const calculateBin = (path: ('L' | 'R')[]): number => {
  return path.filter((p) => p === 'R').length;
};

// Calculate theoretical bell curve (binomial distribution)
const calculateBellCurve = (rows: number, totalBalls: number): number[] => {
  const bins = rows + 1;
  const curve: number[] = [];
  for (let k = 0; k <= rows; k++) {
    // Binomial coefficient C(n, k) * (0.5)^n
    const coeff = factorial(rows) / (factorial(k) * factorial(rows - k));
    const prob = coeff * Math.pow(0.5, rows);
    curve.push(prob * totalBalls);
  }
  return curve;
};

const factorial = (n: number): number => {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
};

export default function GaltonBoard({
  rows = 10,
  ballsToRelease,
  speed = 'normal',
  onDistributionChange,
  onAllBallsComplete,
  showBellCurve = false,
  autoStart = false,
  className,
}: GaltonBoardProps) {
  const [balls, setBalls] = useState<Ball[]>([]);
  const [distribution, setDistribution] = useState<number[]>(
    Array(rows + 1).fill(0)
  );
  const [isRunning, setIsRunning] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const ballIdRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const numBins = rows + 1;
  const boardWidth = 320;
  const boardHeight = 300;
  const histogramHeight = 100;
  const pegRadius = 4;
  const ballRadius = 6;

  // Calculate peg positions
  const getPegPosition = useCallback(
    (row: number, col: number) => {
      const verticalSpacing = (boardHeight - 40) / (rows + 1);
      const horizontalSpacing = 24;
      const rowStartX =
        boardWidth / 2 - (row * horizontalSpacing) / 2;
      return {
        x: rowStartX + col * horizontalSpacing,
        y: 30 + row * verticalSpacing,
      };
    },
    [rows, boardWidth, boardHeight]
  );

  // Calculate ball position at each step
  const getBallPosition = useCallback(
    (path: ('L' | 'R')[], step: number) => {
      if (step === 0) {
        return { x: boardWidth / 2, y: 10 };
      }

      const row = step - 1;
      let col = 0;
      for (let i = 0; i < step; i++) {
        if (path[i] === 'R') col++;
      }

      const peg = getPegPosition(row, col);
      return {
        x: peg.x + (path[step - 1] === 'R' ? 8 : -8),
        y: peg.y + 10,
      };
    },
    [getPegPosition, boardWidth]
  );

  // Get bin position at bottom
  const getBinX = useCallback(
    (binIndex: number) => {
      const binWidth = boardWidth / numBins;
      return binWidth / 2 + binIndex * binWidth;
    },
    [boardWidth, numBins]
  );

  // Release a single ball
  const releaseBall = useCallback(() => {
    const path = generatePath(rows);
    const finalBin = calculateBin(path);
    const newBall: Ball = {
      id: `ball-${ballIdRef.current++}`,
      path,
      currentStep: 0,
      finalBin,
      isComplete: false,
    };
    setBalls((prev) => [...prev, newBall]);
  }, [rows]);

  // Animate balls through the board
  useEffect(() => {
    if (!isRunning) return;

    const animationInterval = setInterval(() => {
      setBalls((prevBalls) => {
        const updatedBalls = prevBalls.map((ball) => {
          if (ball.isComplete) return ball;

          const nextStep = ball.currentStep + 1;
          if (nextStep > rows) {
            // Ball reached bottom
            return { ...ball, isComplete: true };
          }
          return { ...ball, currentStep: nextStep };
        });

        // Check for newly completed balls
        const newlyCompleted = updatedBalls.filter(
          (b, i) => b.isComplete && !prevBalls[i].isComplete
        );

        if (newlyCompleted.length > 0) {
          setDistribution((prev) => {
            const newDist = [...prev];
            newlyCompleted.forEach((ball) => {
              newDist[ball.finalBin]++;
            });
            return newDist;
          });
          setCompletedCount((prev) => prev + newlyCompleted.length);
        }

        return updatedBalls;
      });
    }, SPEED_MAP[speed]);

    return () => clearInterval(animationInterval);
  }, [isRunning, rows, speed]);

  // Release balls at intervals
  useEffect(() => {
    if (!isRunning || completedCount >= ballsToRelease) return;

    const releaseInterval = setInterval(() => {
      const activeBalls = balls.filter((b) => !b.isComplete);
      if (activeBalls.length < 10 && balls.length < ballsToRelease) {
        releaseBall();
      }
    }, SPEED_MAP[speed] * 2);

    return () => clearInterval(releaseInterval);
  }, [isRunning, balls, ballsToRelease, releaseBall, speed, completedCount]);

  // Notify when distribution changes
  useEffect(() => {
    onDistributionChange?.(distribution);
  }, [distribution, onDistributionChange]);

  // Check if all balls are complete
  useEffect(() => {
    if (completedCount >= ballsToRelease && balls.every((b) => b.isComplete)) {
      setIsRunning(false);
      onAllBallsComplete?.();
    }
  }, [completedCount, ballsToRelease, balls, onAllBallsComplete]);

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart && !isRunning && completedCount === 0) {
      setIsRunning(true);
      releaseBall();
    }
  }, [autoStart, isRunning, completedCount, releaseBall]);

  const handleStart = () => {
    if (isRunning) return;
    // Reset state
    setBalls([]);
    setDistribution(Array(rows + 1).fill(0));
    setCompletedCount(0);
    ballIdRef.current = 0;
    setIsRunning(true);
    releaseBall();
  };

  const maxBinCount = Math.max(...distribution, 1);
  const bellCurve = showBellCurve
    ? calculateBellCurve(rows, ballsToRelease)
    : [];

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {/* Board */}
      <div className="relative">
        <svg
          width={boardWidth}
          height={boardHeight + histogramHeight + 20}
          className="overflow-visible"
        >
          {/* Background */}
          <rect
            x={0}
            y={0}
            width={boardWidth}
            height={boardHeight}
            rx={12}
            className="fill-gray-100 dark:fill-gray-800"
          />

          {/* Pegs */}
          {Array.from({ length: rows }).map((_, row) =>
            Array.from({ length: row + 1 }).map((_, col) => {
              const pos = getPegPosition(row, col);
              return (
                <circle
                  key={`peg-${row}-${col}`}
                  cx={pos.x}
                  cy={pos.y}
                  r={pegRadius}
                  className="fill-gray-400 dark:fill-gray-500"
                />
              );
            })
          )}

          {/* Entry point */}
          <path
            d={`M${boardWidth / 2 - 15} 0 L${boardWidth / 2} 15 L${boardWidth / 2 + 15} 0`}
            className="fill-none stroke-gray-400 dark:stroke-gray-500"
            strokeWidth={2}
          />

          {/* Bin dividers */}
          {Array.from({ length: numBins + 1 }).map((_, i) => {
            const x = (i * boardWidth) / numBins;
            return (
              <line
                key={`divider-${i}`}
                x1={x}
                y1={boardHeight - 5}
                x2={x}
                y2={boardHeight + histogramHeight}
                className="stroke-gray-300 dark:stroke-gray-600"
                strokeWidth={1}
              />
            );
          })}

          {/* Histogram base line */}
          <line
            x1={0}
            y1={boardHeight + histogramHeight}
            x2={boardWidth}
            y2={boardHeight + histogramHeight}
            className="stroke-gray-400 dark:stroke-gray-500"
            strokeWidth={2}
          />

          {/* Histogram bars */}
          {distribution.map((count, i) => {
            const barHeight = (count / maxBinCount) * (histogramHeight - 10);
            const binWidth = boardWidth / numBins;
            return (
              <motion.rect
                key={`bar-${i}`}
                x={i * binWidth + 2}
                y={boardHeight + histogramHeight - barHeight}
                width={binWidth - 4}
                height={barHeight}
                rx={2}
                initial={{ height: 0 }}
                animate={{ height: barHeight }}
                className="fill-blue-500 dark:fill-blue-400"
              />
            );
          })}

          {/* Bell curve overlay */}
          {showBellCurve && completedCount > 0 && (
            <path
              d={bellCurve
                .map((val, i) => {
                  const x = getBinX(i);
                  const y =
                    boardHeight +
                    histogramHeight -
                    (val / maxBinCount) * (histogramHeight - 10);
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                })
                .join(' ')}
              className="fill-none stroke-green-500 dark:stroke-green-400"
              strokeWidth={2}
              strokeDasharray="4 4"
            />
          )}

          {/* Bin labels */}
          {distribution.map((count, i) => (
            <text
              key={`label-${i}`}
              x={getBinX(i)}
              y={boardHeight + histogramHeight + 15}
              textAnchor="middle"
              className="fill-gray-600 dark:fill-gray-400 text-xs"
            >
              {count}
            </text>
          ))}

          {/* Animated balls */}
          <AnimatePresence>
            {balls
              .filter((b) => !b.isComplete)
              .map((ball) => {
                const pos = getBallPosition(ball.path, ball.currentStep);
                return (
                  <motion.circle
                    key={ball.id}
                    cx={pos.x}
                    cy={pos.y}
                    r={ballRadius}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      cx: pos.x,
                      cy: pos.y,
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="fill-amber-500 dark:fill-amber-400"
                  />
                );
              })}
          </AnimatePresence>
        </svg>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className={cn(
            'px-6 py-2 rounded-lg font-semibold transition-all',
            isRunning
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-md'
          )}
        >
          {isRunning ? 'Cayendo...' : completedCount > 0 ? 'Reiniciar' : 'Soltar Bolas'}
        </button>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {completedCount}
          </span>
          {' / '}
          {ballsToRelease} bolas
        </div>
      </div>

      {/* Legend */}
      {showBellCurve && completedCount > 0 && (
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 bg-blue-500 dark:bg-blue-400 rounded" />
            <span className="text-gray-600 dark:text-gray-400">
              Frecuencia real
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0 border-t-2 border-dashed border-green-500 dark:border-green-400" />
            <span className="text-gray-600 dark:text-gray-400">
              Curva teórica
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
