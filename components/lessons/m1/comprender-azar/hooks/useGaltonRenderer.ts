import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import type { AnimatedBall } from './useGaltonEngine';

const COLORS = {
  light: {
    background: '#f3f4f6',
    peg: '#9ca3af',
    ball: '#f59e0b',
    text: '#4b5563',
    divider: '#d1d5db',
  },
  dark: {
    background: '#1f2937',
    peg: '#6b7280',
    ball: '#fbbf24',
    text: '#9ca3af',
    divider: '#4b5563',
  },
};

interface UseGaltonRendererOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  engineRef: React.MutableRefObject<Matter.Engine | null>;
  allBallsRef: React.MutableRefObject<Set<Matter.Body>>;
  animatedBallsRef: React.MutableRefObject<Map<string, AnimatedBall>>;
  distributionRef: React.MutableRefObject<number[]>;
  boardWidth: number;
  boardHeight: number;
  pegRadius: number;
  ballRadius: number;
  numBins: number;
  pegAreaBottom: number;
  getBinX: (binIndex: number) => number;
  isDark: boolean;
}

export function useGaltonRenderer({
  canvasRef,
  engineRef,
  allBallsRef,
  animatedBallsRef,
  distributionRef,
  boardWidth,
  boardHeight,
  pegRadius,
  ballRadius,
  numBins,
  pegAreaBottom,
  getBinX,
  isDark,
}: UseGaltonRendererOptions): void {
  const renderLoopRef = useRef<number>(0);

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
        .filter((b) => b.label.startsWith('peg-'))
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
      ctx.lineWidth = 2;
      for (let i = 0; i <= numBins; i++) {
        const x = (i * boardWidth) / numBins;
        ctx.beginPath();
        ctx.moveTo(x, pegAreaBottom);
        ctx.lineTo(x, boardHeight);
        ctx.stroke();
      }

      // Draw horizontal line separating pegs from bins
      ctx.strokeStyle = colors.divider;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, pegAreaBottom);
      ctx.lineTo(boardWidth, pegAreaBottom);
      ctx.stroke();

      // Draw animated balls (descending through pegs)
      ctx.fillStyle = colors.ball;
      animatedBallsRef.current.forEach((ball) => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw physics balls (in bins)
      allBallsRef.current.forEach((ball) => {
        ctx.beginPath();
        ctx.arc(ball.position.x, ball.position.y, ballRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw bin count labels
      ctx.fillStyle = colors.text;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      for (let i = 0; i < numBins; i++) {
        const x = getBinX(i);
        const count = distributionRef.current[i];
        if (count > 0) {
          ctx.fillText(count.toString(), x, boardHeight - 8);
        }
      }

      renderLoopRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(renderLoopRef.current);
    };
  }, [
    canvasRef,
    engineRef,
    allBallsRef,
    animatedBallsRef,
    distributionRef,
    boardWidth,
    boardHeight,
    pegRadius,
    ballRadius,
    numBins,
    pegAreaBottom,
    getBinX,
    isDark,
  ]);
}
