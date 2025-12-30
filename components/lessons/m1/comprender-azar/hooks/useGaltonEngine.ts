import { useEffect, useRef, useCallback } from 'react';
import Matter from 'matter-js';

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
  releaseBall: () => void;
  startPhysics: () => void;
  resetBalls: () => void;
  pegAreaBottom: number;
  numBins: number;
  getBinX: (binIndex: number) => number;
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
  const processedBallsRef = useRef<Set<string>>(new Set());
  const ballsReleasedRef = useRef(0);
  const runIdRef = useRef(0);

  const numBins = rows + 1;
  const pegAreaBottom = boardHeight - binAreaHeight;
  const horizontalSpacing = boardWidth / numBins;

  const getPegPosition = useCallback(
    (row: number, col: number) => {
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

  // Initialize physics engine
  useEffect(() => {
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.8, scale: 0.001 },
    });
    engineRef.current = engine;

    // Create pegs with unique IDs for collision tracking
    const pegs: Matter.Body[] = [];
    let pegId = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col <= row; col++) {
        const pos = getPegPosition(row, col);
        const peg = Matter.Bodies.circle(pos.x, pos.y, pegRadius, {
          isStatic: true,
          restitution: 0.5,
          friction: 0.00001, // Very low - consistent with balls
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

    // Collision detection
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
    const engine = engineRef.current;
    if (!engine) return;

    const ball = Matter.Bodies.circle(
      boardWidth / 2 + (Math.random() - 0.5) * 4,
      5,
      ballRadius,
      {
        restitution: 0.5,
        friction: 0.00001, // Very low - balls don't stick to pegs
        frictionAir: 0.042, // Higher - dampens bouncing for smoother motion
        density: 0.001,
        label: `ball-${runIdRef.current}-${ballsReleasedRef.current++}`,
      }
    );

    Matter.Composite.add(engine.world, ball);
    allBallsRef.current.add(ball);
  }, [boardWidth, ballRadius]);

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

    allBallsRef.current.forEach((ball) => {
      Matter.Composite.remove(engine.world, ball);
    });
    allBallsRef.current.clear();
    processedBallsRef.current.clear();
    ballsReleasedRef.current = 0;
    runIdRef.current++;
  }, []);

  return {
    engineRef,
    runnerRef,
    allBallsRef,
    releaseBall,
    startPhysics,
    resetBalls,
    pegAreaBottom,
    numBins,
    getBinX,
  };
}
