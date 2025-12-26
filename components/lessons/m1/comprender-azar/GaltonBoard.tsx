'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Matter from 'matter-js';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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

// Color schemes for light/dark mode
const COLORS = {
  light: {
    background: '#f3f4f6',
    peg: '#9ca3af',
    ball: '#f59e0b',
    histogram: '#3b82f6',
    bellCurve: '#22c55e',
    text: '#4b5563',
    divider: '#d1d5db',
  },
  dark: {
    background: '#1f2937',
    peg: '#6b7280',
    ball: '#fbbf24',
    histogram: '#60a5fa',
    bellCurve: '#4ade80',
    text: '#9ca3af',
    divider: '#4b5563',
  },
};

// Calculate theoretical bell curve (binomial distribution)
const calculateBellCurve = (rows: number, totalBalls: number): number[] => {
  const curve: number[] = [];
  for (let k = 0; k <= rows; k++) {
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
  const [distribution, setDistribution] = useState<number[]>(Array(rows + 1).fill(0));
  const [isRunning, setIsRunning] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [isDark, setIsDark] = useState(false);

  // Refs for physics
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const activeBallsRef = useRef<Set<Matter.Body>>(new Set());
  const ballsReleasedRef = useRef(0);
  const releaseIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const renderLoopRef = useRef<number>(0);
  const distributionRef = useRef<number[]>(Array(rows + 1).fill(0));
  const completedCountRef = useRef(0);

  // Board dimensions
  const boardWidth = 320;
  const boardHeight = 300;
  const histogramHeight = 100;
  const pegRadius = 4;
  const ballRadius = 5;
  const numBins = rows + 1;

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

  // Calculate peg position
  const getPegPosition = useCallback(
    (row: number, col: number) => {
      const verticalSpacing = (boardHeight - 60) / rows;
      const horizontalSpacing = 22;
      const rowStartX = boardWidth / 2 - (row * horizontalSpacing) / 2;
      return {
        x: rowStartX + col * horizontalSpacing,
        y: 40 + row * verticalSpacing,
      };
    },
    [rows]
  );

  // Get bin X position
  const getBinX = useCallback(
    (binIndex: number) => {
      const binWidth = boardWidth / numBins;
      return binWidth / 2 + binIndex * binWidth;
    },
    [numBins]
  );

  // Initialize physics engine
  useEffect(() => {
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.8, scale: 0.001 },
    });
    engineRef.current = engine;

    // Create pegs
    const pegs: Matter.Body[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col <= row; col++) {
        const pos = getPegPosition(row, col);
        const peg = Matter.Bodies.circle(pos.x, pos.y, pegRadius, {
          isStatic: true,
          restitution: 0.5,
          friction: 0.05,
          label: 'peg',
        });
        pegs.push(peg);
      }
    }

    // Create walls
    const wallThickness = 20;
    const walls = [
      // Left wall
      Matter.Bodies.rectangle(
        -wallThickness / 2,
        boardHeight / 2,
        wallThickness,
        boardHeight,
        { isStatic: true, label: 'wall' }
      ),
      // Right wall
      Matter.Bodies.rectangle(
        boardWidth + wallThickness / 2,
        boardHeight / 2,
        wallThickness,
        boardHeight,
        { isStatic: true, label: 'wall' }
      ),
      // Bottom
      Matter.Bodies.rectangle(
        boardWidth / 2,
        boardHeight + wallThickness / 2,
        boardWidth,
        wallThickness,
        { isStatic: true, label: 'floor' }
      ),
    ];

    // Create bin sensors
    const binSensors: Matter.Body[] = [];
    const binWidth = boardWidth / numBins;
    for (let i = 0; i < numBins; i++) {
      const sensor = Matter.Bodies.rectangle(
        getBinX(i),
        boardHeight - 15,
        binWidth - 4,
        20,
        {
          isStatic: true,
          isSensor: true,
          label: `bin-sensor-${i}`,
        }
      );
      binSensors.push(sensor);
    }

    // Create bin dividers
    const dividers: Matter.Body[] = [];
    for (let i = 0; i <= numBins; i++) {
      const x = (i * boardWidth) / numBins;
      const divider = Matter.Bodies.rectangle(
        x,
        boardHeight - 25,
        2,
        50,
        { isStatic: true, label: 'divider' }
      );
      dividers.push(divider);
    }

    Matter.Composite.add(engine.world, [...pegs, ...walls, ...binSensors, ...dividers]);

    // Collision detection for bin sensors
    const processedBalls = new Set<string>();

    Matter.Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        const ball = bodyA.label.startsWith('ball-')
          ? bodyA
          : bodyB.label.startsWith('ball-')
          ? bodyB
          : null;
        const sensor = bodyA.label.startsWith('bin-sensor-')
          ? bodyA
          : bodyB.label.startsWith('bin-sensor-')
          ? bodyB
          : null;

        if (ball && sensor && !processedBalls.has(ball.label)) {
          processedBalls.add(ball.label);
          const binIndex = parseInt(sensor.label.split('-')[2]);

          // Remove ball from world
          Matter.Composite.remove(engine.world, ball);
          activeBallsRef.current.delete(ball);

          // Update distribution
          distributionRef.current = [...distributionRef.current];
          distributionRef.current[binIndex]++;
          setDistribution([...distributionRef.current]);

          // Update completed count
          completedCountRef.current++;
          setCompletedCount(completedCountRef.current);
        }
      });
    });

    // Create runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    return () => {
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      cancelAnimationFrame(renderLoopRef.current);
      if (releaseIntervalRef.current) {
        clearInterval(releaseIntervalRef.current);
      }
    };
  }, [rows, getPegPosition, getBinX, numBins]);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = engineRef.current;
    if (!canvas || !engine) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = isDark ? COLORS.dark : COLORS.light;

    const render = () => {
      ctx.clearRect(0, 0, boardWidth, boardHeight);

      // Draw background with rounded corners
      ctx.fillStyle = colors.background;
      ctx.beginPath();
      ctx.roundRect(0, 0, boardWidth, boardHeight, 12);
      ctx.fill();

      // Draw pegs
      ctx.fillStyle = colors.peg;
      engine.world.bodies
        .filter((b) => b.label === 'peg')
        .forEach((peg) => {
          ctx.beginPath();
          ctx.arc(peg.position.x, peg.position.y, pegRadius, 0, Math.PI * 2);
          ctx.fill();
        });

      // Draw entry funnel
      ctx.strokeStyle = colors.peg;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(boardWidth / 2 - 15, 0);
      ctx.lineTo(boardWidth / 2, 20);
      ctx.lineTo(boardWidth / 2 + 15, 0);
      ctx.stroke();

      // Draw bin dividers
      ctx.strokeStyle = colors.divider;
      ctx.lineWidth = 1;
      for (let i = 0; i <= numBins; i++) {
        const x = (i * boardWidth) / numBins;
        ctx.beginPath();
        ctx.moveTo(x, boardHeight - 50);
        ctx.lineTo(x, boardHeight);
        ctx.stroke();
      }

      // Draw active balls
      ctx.fillStyle = colors.ball;
      activeBallsRef.current.forEach((ball) => {
        ctx.beginPath();
        ctx.arc(ball.position.x, ball.position.y, ballRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      renderLoopRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(renderLoopRef.current);
    };
  }, [isDark, numBins]);

  // Release a ball
  const releaseBall = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;

    const ball = Matter.Bodies.circle(
      boardWidth / 2 + (Math.random() - 0.5) * 6,
      5,
      ballRadius,
      {
        restitution: 0.4,
        friction: 0.001,
        frictionAir: 0.0005,
        density: 0.002,
        label: `ball-${ballsReleasedRef.current++}`,
      }
    );

    Matter.Composite.add(engine.world, ball);
    activeBallsRef.current.add(ball);
  }, []);

  // Notify when distribution changes
  useEffect(() => {
    onDistributionChange?.(distribution);
  }, [distribution, onDistributionChange]);

  // Check if all balls are complete
  useEffect(() => {
    if (
      completedCount >= ballsToRelease &&
      completedCount > 0 &&
      activeBallsRef.current.size === 0
    ) {
      setIsRunning(false);
      if (releaseIntervalRef.current) {
        clearInterval(releaseIntervalRef.current);
        releaseIntervalRef.current = null;
      }
      onAllBallsComplete?.();
    }
  }, [completedCount, ballsToRelease, onAllBallsComplete]);

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart && !isRunning && completedCount === 0) {
      handleStart();
    }
  }, [autoStart]);

  const handleStart = () => {
    if (isRunning) return;

    const engine = engineRef.current;
    const runner = runnerRef.current;
    if (!engine || !runner) return;

    // Reset state
    activeBallsRef.current.forEach((ball) => {
      Matter.Composite.remove(engine.world, ball);
    });
    activeBallsRef.current.clear();
    distributionRef.current = Array(rows + 1).fill(0);
    setDistribution(Array(rows + 1).fill(0));
    completedCountRef.current = 0;
    setCompletedCount(0);
    ballsReleasedRef.current = 0;

    setIsRunning(true);

    // Start physics
    Matter.Runner.run(runner, engine);

    // Release balls at intervals
    releaseBall();
    releaseIntervalRef.current = setInterval(() => {
      if (ballsReleasedRef.current < ballsToRelease) {
        releaseBall();
      } else {
        if (releaseIntervalRef.current) {
          clearInterval(releaseIntervalRef.current);
          releaseIntervalRef.current = null;
        }
      }
    }, SPEED_MAP[speed]);
  };

  const maxBinCount = Math.max(...distribution, 1);
  const bellCurve = showBellCurve ? calculateBellCurve(rows, ballsToRelease) : [];
  const colors = isDark ? COLORS.dark : COLORS.light;

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {/* Physics canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={boardWidth}
          height={boardHeight}
          className="rounded-xl"
        />
      </div>

      {/* Histogram (SVG) */}
      <svg
        width={boardWidth}
        height={histogramHeight + 20}
        className="overflow-visible"
        style={{ marginTop: -8 }}
      >
        {/* Bin dividers */}
        {Array.from({ length: numBins + 1 }).map((_, i) => {
          const x = (i * boardWidth) / numBins;
          return (
            <line
              key={`divider-${i}`}
              x1={x}
              y1={0}
              x2={x}
              y2={histogramHeight}
              stroke={colors.divider}
              strokeWidth={1}
            />
          );
        })}

        {/* Histogram base line */}
        <line
          x1={0}
          y1={histogramHeight}
          x2={boardWidth}
          y2={histogramHeight}
          stroke={colors.peg}
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
              y={histogramHeight - barHeight}
              width={binWidth - 4}
              height={barHeight}
              rx={2}
              initial={{ height: 0 }}
              animate={{ height: barHeight }}
              fill={colors.histogram}
            />
          );
        })}

        {/* Bell curve overlay */}
        {showBellCurve && completedCount > 0 && (
          <path
            d={bellCurve
              .map((val, i) => {
                const x = getBinX(i);
                const y = histogramHeight - (val / maxBinCount) * (histogramHeight - 10);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              })
              .join(' ')}
            fill="none"
            stroke={colors.bellCurve}
            strokeWidth={2}
            strokeDasharray="4 4"
          />
        )}

        {/* Bin labels */}
        {distribution.map((count, i) => (
          <text
            key={`label-${i}`}
            x={getBinX(i)}
            y={histogramHeight + 15}
            textAnchor="middle"
            fill={colors.text}
            className="text-xs"
          >
            {count}
          </text>
        ))}
      </svg>

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
            <span className="text-gray-600 dark:text-gray-400">Frecuencia real</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0 border-t-2 border-dashed border-green-500 dark:border-green-400" />
            <span className="text-gray-600 dark:text-gray-400">Curva teorica</span>
          </div>
        </div>
      )}
    </div>
  );
}
