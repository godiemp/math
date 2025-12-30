import { useEffect, useRef, useCallback } from 'react';
import Matter from 'matter-js';

// Animated ball interface - for balls descending through pegs
export interface AnimatedBall {
  id: string;
  decisions: boolean[]; // true = right, false = left at each row
  targetBin: number;
  progress: number; // 0 to rows (fraction indicates position in curve)
  x: number;
  y: number;
}

interface Point {
  x: number;
  y: number;
}

// Generate binomial path: simulate coin flips to determine final bin
function generatePath(rows: number): { decisions: boolean[]; targetBin: number } {
  const decisions: boolean[] = [];
  let position = 0;
  for (let i = 0; i < rows; i++) {
    const goRight = Math.random() > 0.5;
    decisions.push(goRight);
    if (goRight) position++;
  }
  return { decisions, targetBin: position };
}

// Quadratic bezier curve interpolation
function quadraticBezier(t: number, p0: Point, p1: Point, p2: Point): Point {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
  };
}

interface UseGaltonEngineOptions {
  rows: number;
  boardWidth: number;
  boardHeight: number;
  pegRadius: number;
  ballRadius: number;
  binAreaHeight: number;
  onBallEnterBin: (binIndex: number) => void;
}

interface UseGaltonEngineReturn {
  engineRef: React.MutableRefObject<Matter.Engine | null>;
  runnerRef: React.MutableRefObject<Matter.Runner | null>;
  allBallsRef: React.MutableRefObject<Set<Matter.Body>>;
  animatedBallsRef: React.MutableRefObject<Map<string, AnimatedBall>>;
  releaseBall: () => void;
  startPhysics: () => void;
  resetBalls: () => void;
  pegAreaBottom: number;
  numBins: number;
  getBinX: (binIndex: number) => number;
  getPegPosition: (row: number, col: number) => Point;
}

export function useGaltonEngine({
  rows,
  boardWidth,
  boardHeight,
  pegRadius,
  ballRadius,
  binAreaHeight,
  onBallEnterBin,
}: UseGaltonEngineOptions): UseGaltonEngineReturn {
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const allBallsRef = useRef<Set<Matter.Body>>(new Set());
  const animatedBallsRef = useRef<Map<string, AnimatedBall>>(new Map());
  const processedBallsRef = useRef<Set<string>>(new Set());
  const ballsReleasedRef = useRef(0);
  const runIdRef = useRef(0);
  const animationFrameRef = useRef<number>(0);

  const numBins = rows + 1;
  const pegAreaBottom = boardHeight - binAreaHeight;
  const horizontalSpacing = boardWidth / numBins;

  const getPegPosition = useCallback(
    (row: number, col: number): Point => {
      const verticalSpacing = (pegAreaBottom - 60) / rows;
      const rowStartX = boardWidth / 2 - (row * horizontalSpacing) / 2;
      return {
        x: rowStartX + col * horizontalSpacing,
        y: 40 + row * verticalSpacing,
      };
    },
    [rows, pegAreaBottom, horizontalSpacing, boardWidth]
  );

  const getBinX = useCallback(
    (binIndex: number) => {
      const binWidth = boardWidth / numBins;
      return binWidth / 2 + binIndex * binWidth;
    },
    [numBins, boardWidth]
  );

  // Calculate ball position along bezier path
  const calculateBallPosition = useCallback(
    (ball: AnimatedBall): Point => {
      const currentRow = Math.floor(ball.progress);
      const t = ball.progress - currentRow; // 0-1 within segment

      // Calculate current column based on decisions made so far
      let col = 0;
      for (let i = 0; i < currentRow && i < ball.decisions.length; i++) {
        if (ball.decisions[i]) col++;
      }

      if (currentRow >= rows) {
        // Past all pegs, go to bin
        return { x: getBinX(ball.targetBin), y: pegAreaBottom };
      }

      if (currentRow === 0 && t < 0.5) {
        // First segment: from top to first peg
        const startY = 20;
        const firstPeg = getPegPosition(0, 0);
        const progress = t * 2; // Scale t to 0-1 for this segment
        return {
          x: boardWidth / 2 + (firstPeg.x - boardWidth / 2) * progress,
          y: startY + (firstPeg.y - pegRadius - 5 - startY) * progress,
        };
      }

      // Get current peg position
      const currentPeg = getPegPosition(currentRow, col);

      // Determine next position
      const nextCol = col + (ball.decisions[currentRow] ? 1 : 0);
      let nextPoint: Point;

      if (currentRow < rows - 1) {
        const nextPeg = getPegPosition(currentRow + 1, nextCol);
        nextPoint = { x: nextPeg.x, y: nextPeg.y - pegRadius - 5 };
      } else {
        // Last row, go to bin
        nextPoint = { x: getBinX(ball.targetBin), y: pegAreaBottom };
      }

      // Bezier curve: start above peg, control at peg side, end at next position
      const goRight = ball.decisions[currentRow];
      const offsetX = goRight ? pegRadius + 3 : -(pegRadius + 3);

      const startPoint: Point = {
        x: currentPeg.x,
        y: currentPeg.y - pegRadius - 5,
      };
      const controlPoint: Point = {
        x: currentPeg.x + offsetX,
        y: currentPeg.y + pegRadius + 5,
      };

      return quadraticBezier(t, startPoint, controlPoint, nextPoint);
    },
    [rows, getPegPosition, getBinX, pegAreaBottom, pegRadius, boardWidth]
  );

  // Create physics body when ball reaches bin area
  const createPhysicsBall = useCallback(
    (animatedBall: AnimatedBall) => {
      const engine = engineRef.current;
      if (!engine) return;

      const binX = getBinX(animatedBall.targetBin);
      const ball = Matter.Bodies.circle(binX, pegAreaBottom + 5, ballRadius, {
        restitution: 0.3,
        friction: 0.1,
        frictionAir: 0.01,
        density: 0.001,
        label: `ball-${animatedBall.id}`,
      });

      // Give it a small initial velocity downward
      Matter.Body.setVelocity(ball, { x: 0, y: 2 });

      Matter.Composite.add(engine.world, ball);
      allBallsRef.current.add(ball);
    },
    [getBinX, pegAreaBottom, ballRadius]
  );

  // Animation loop for animated balls
  useEffect(() => {
    const speed = 0.04; // Progress per frame (adjust for speed)

    const animate = () => {
      const toRemove: string[] = [];

      animatedBallsRef.current.forEach((ball, id) => {
        // Update progress
        ball.progress += speed + Math.random() * 0.01; // Slight randomness

        // Calculate new position
        const pos = calculateBallPosition(ball);
        ball.x = pos.x;
        ball.y = pos.y;

        // Check if ball has reached bin area
        if (ball.progress >= rows) {
          toRemove.push(id);
          createPhysicsBall(ball);
        }
      });

      // Remove completed animated balls
      toRemove.forEach((id) => animatedBallsRef.current.delete(id));

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [rows, calculateBallPosition, createPhysicsBall]);

  // Initialize physics engine (only for bin stacking)
  useEffect(() => {
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.8, scale: 0.001 },
    });
    engineRef.current = engine;

    // Create pegs (visual only, no physics interaction needed)
    const pegs: Matter.Body[] = [];
    let pegId = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col <= row; col++) {
        const pos = getPegPosition(row, col);
        const peg = Matter.Bodies.circle(pos.x, pos.y, pegRadius, {
          isStatic: true,
          label: `peg-${pegId++}`,
        });
        pegs.push(peg);
      }
    }

    // Create walls
    const wallThickness = 20;
    const walls = [
      Matter.Bodies.rectangle(-wallThickness / 2, boardHeight / 2, wallThickness, boardHeight, {
        isStatic: true,
        label: 'wall',
      }),
      Matter.Bodies.rectangle(
        boardWidth + wallThickness / 2,
        boardHeight / 2,
        wallThickness,
        boardHeight,
        { isStatic: true, label: 'wall' }
      ),
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
      const sensor = Matter.Bodies.rectangle(getBinX(i), pegAreaBottom + 10, binWidth - 4, 10, {
        isStatic: true,
        isSensor: true,
        label: `bin-sensor-${i}`,
      });
      binSensors.push(sensor);
    }

    // Create bin dividers
    const dividers: Matter.Body[] = [];
    for (let i = 0; i <= numBins; i++) {
      const x = (i * boardWidth) / numBins;
      const divider = Matter.Bodies.rectangle(x, pegAreaBottom + binAreaHeight / 2, 2, binAreaHeight, {
        isStatic: true,
        label: 'divider',
        restitution: 0.3,
      });
      dividers.push(divider);
    }

    Matter.Composite.add(engine.world, [...pegs, ...walls, ...binSensors, ...dividers]);

    // Collision detection for bin counting
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

        // Count balls entering bins
        if (ball && sensor && !processedBallsRef.current.has(ball.label)) {
          processedBallsRef.current.add(ball.label);
          const binIndex = parseInt(sensor.label.split('-')[2]);
          onBallEnterBin(binIndex);
        }
      });
    });

    // Create runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    return () => {
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, [
    rows,
    getPegPosition,
    getBinX,
    numBins,
    pegAreaBottom,
    binAreaHeight,
    boardWidth,
    boardHeight,
    pegRadius,
    onBallEnterBin,
  ]);

  const releaseBall = useCallback(() => {
    // Generate binomial path
    const { decisions, targetBin } = generatePath(rows);

    // Create animated ball
    const id = `${runIdRef.current}-${ballsReleasedRef.current++}`;
    const animatedBall: AnimatedBall = {
      id,
      decisions,
      targetBin,
      progress: 0,
      x: boardWidth / 2,
      y: 20,
    };

    animatedBallsRef.current.set(id, animatedBall);
  }, [rows, boardWidth]);

  const startPhysics = useCallback(() => {
    const runner = runnerRef.current;
    const engine = engineRef.current;
    if (runner && engine) {
      Matter.Runner.run(runner, engine);
    }
  }, []);

  const resetBalls = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;

    // Clear physics balls
    allBallsRef.current.forEach((ball) => {
      Matter.Composite.remove(engine.world, ball);
    });
    allBallsRef.current.clear();

    // Clear animated balls
    animatedBallsRef.current.clear();

    processedBallsRef.current.clear();
    ballsReleasedRef.current = 0;
    runIdRef.current++;
  }, []);

  return {
    engineRef,
    runnerRef,
    allBallsRef,
    animatedBallsRef,
    releaseBall,
    startPhysics,
    resetBalls,
    pegAreaBottom,
    numBins,
    getBinX,
    getPegPosition,
  };
}
