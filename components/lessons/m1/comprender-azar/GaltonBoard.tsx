'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useGaltonEngine, useGaltonRenderer } from './hooks';

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

// Board dimensions
const BOARD_WIDTH = 320;
const BOARD_HEIGHT = 400;
const PEG_RADIUS = 6;
const BALL_RADIUS = 5;
const BIN_AREA_HEIGHT = 120;

export default function GaltonBoard({
  rows = 10,
  ballsToRelease,
  speed = 'normal',
  onDistributionChange,
  onAllBallsComplete,
  autoStart = false,
  className,
}: GaltonBoardProps) {
  const [distribution, setDistribution] = useState<number[]>(Array(rows + 1).fill(0));
  const [isRunning, setIsRunning] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const distributionRef = useRef<number[]>(Array(rows + 1).fill(0));
  const completedCountRef = useRef(0);
  const releaseIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const ballsReleasedRef = useRef(0);

  // Handle ball entering bin
  const handleBallEnterBin = useCallback((binIndex: number) => {
    distributionRef.current = [...distributionRef.current];
    distributionRef.current[binIndex]++;
    setDistribution([...distributionRef.current]);

    completedCountRef.current++;
    setCompletedCount(completedCountRef.current);
  }, []);

  // Physics engine hook
  const {
    engineRef,
    allBallsRef,
    releaseBall,
    startPhysics,
    resetBalls,
    pegAreaBottom,
    numBins,
    getBinX,
  } = useGaltonEngine({
    rows,
    boardWidth: BOARD_WIDTH,
    boardHeight: BOARD_HEIGHT,
    pegRadius: PEG_RADIUS,
    ballRadius: BALL_RADIUS,
    binAreaHeight: BIN_AREA_HEIGHT,
    onBallEnterBin: handleBallEnterBin,
  });

  // Renderer hook
  useGaltonRenderer({
    canvasRef,
    engineRef,
    allBallsRef,
    distributionRef,
    boardWidth: BOARD_WIDTH,
    boardHeight: BOARD_HEIGHT,
    pegRadius: PEG_RADIUS,
    ballRadius: BALL_RADIUS,
    numBins,
    pegAreaBottom,
    getBinX,
    isDark,
  });

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Notify when distribution changes
  useEffect(() => {
    onDistributionChange?.(distribution);
  }, [distribution, onDistributionChange]);

  // Check if all balls are complete
  useEffect(() => {
    if (completedCount >= ballsToRelease && completedCount > 0) {
      const timeout = setTimeout(() => {
        setIsRunning(false);
        if (releaseIntervalRef.current) {
          clearInterval(releaseIntervalRef.current);
          releaseIntervalRef.current = null;
        }
        onAllBallsComplete?.();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [completedCount, ballsToRelease, onAllBallsComplete]);

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart && !isRunning && completedCount === 0) {
      handleStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  const handleStart = () => {
    if (isRunning) return;

    // Reset state
    resetBalls();
    distributionRef.current = Array(rows + 1).fill(0);
    setDistribution(Array(rows + 1).fill(0));
    completedCountRef.current = 0;
    setCompletedCount(0);
    ballsReleasedRef.current = 0;

    setIsRunning(true);
    startPhysics();

    // Release balls at intervals
    releaseBall();
    ballsReleasedRef.current++;

    releaseIntervalRef.current = setInterval(() => {
      if (ballsReleasedRef.current < ballsToRelease) {
        releaseBall();
        ballsReleasedRef.current++;
      } else {
        if (releaseIntervalRef.current) {
          clearInterval(releaseIntervalRef.current);
          releaseIntervalRef.current = null;
        }
      }
    }, SPEED_MAP[speed]);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (releaseIntervalRef.current) {
        clearInterval(releaseIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={BOARD_WIDTH}
          height={BOARD_HEIGHT}
          className="rounded-xl"
        />
      </div>

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
    </div>
  );
}
