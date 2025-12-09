'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, RotateCcw, Play, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import MathDisplay from '@/components/math/MathDisplay';

// Granular phases for clear transitions
type ProofPhase =
  | 'intro'           // Explain the strategy
  | 'build-container' // Show the outer square
  | 'build-t1'        // Place triangle 1
  | 'build-t2'        // Place triangle 2
  | 'build-t3'        // Place triangle 3
  | 'build-t4'        // Place triangle 4
  | 'reveal-c2'       // Highlight and label c²
  | 'highlight-c2'    // Make sure student sees c²
  | 'announce-move'   // Prepare to move
  | 'move-t1'         // Move triangle 1
  | 'move-t2'         // Move triangle 2
  | 'move-t34'        // Move triangles 3 and 4
  | 'reveal-ab'       // Show a² and b²
  | 'compare'         // Side-by-side comparison
  | 'conclusion';     // Final formula

const PHASE_ORDER: ProofPhase[] = [
  'intro', 'build-container', 'build-t1', 'build-t2', 'build-t3', 'build-t4',
  'reveal-c2', 'highlight-c2', 'announce-move', 'move-t1', 'move-t2', 'move-t34',
  'reveal-ab', 'compare', 'conclusion'
];

export default function Step3Proof({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<ProofPhase>('intro');
  const [showGhosts, setShowGhosts] = useState(false);
  const [movedTriangles, setMovedTriangles] = useState<number[]>([]);

  // Triangle dimensions
  const a = 40; // shorter leg
  const b = 60; // longer leg
  const size = a + b; // 100

  // Colors for triangles
  const colors = {
    t1: { fill: '#3B82F6', stroke: '#1E40AF' }, // blue
    t2: { fill: '#10B981', stroke: '#047857' }, // green
    t3: { fill: '#F59E0B', stroke: '#B45309' }, // amber
    t4: { fill: '#EF4444', stroke: '#B91C1C' }, // red
  };

  // Arrangement 1: c² in center (tilted)
  const arrangement1 = {
    t1: `0,${size} ${b},${size} 0,${size - a}`,
    t2: `${b},${size} ${size},${size} ${size},${size - b}`,
    t3: `${size},${size - b} ${size},0 ${size - b},0`,
    t4: `${size - b},0 0,0 0,${size - a}`,
  };

  // Arrangement 2: a² and b² in corners
  const arrangement2 = {
    t1: `0,0 ${b},0 0,${a}`,
    t2: `${b},0 ${b},${a} 0,${a}`,
    t3: `${b},${a} ${b},${size} ${size},${a}`,
    t4: `${b},${size} ${size},${size} ${size},${a}`,
  };

  // c² square vertices (tilted square in arrangement1)
  const c2Vertices = [
    { x: 0, y: size - a },      // left
    { x: b, y: size },          // bottom
    { x: size, y: size - b },   // right
    { x: size - b, y: 0 },      // top
  ];

  // Helper to get current triangle position
  const getTrianglePoints = (triangleNum: number): string => {
    const arr1Points = [arrangement1.t1, arrangement1.t2, arrangement1.t3, arrangement1.t4];
    const arr2Points = [arrangement2.t1, arrangement2.t2, arrangement2.t3, arrangement2.t4];

    if (movedTriangles.includes(triangleNum)) {
      return arr2Points[triangleNum - 1];
    }
    return arr1Points[triangleNum - 1];
  };

  // Helper to calculate centroid
  const getCentroid = (points: string) => {
    const coords = points.split(' ').map(p => {
      const [x, y] = p.split(',').map(Number);
      return { x, y };
    });
    return {
      cx: coords.reduce((sum, c) => sum + c.x, 0) / coords.length,
      cy: coords.reduce((sum, c) => sum + c.y, 0) / coords.length,
    };
  };

  // Check which triangles should be visible
  const visibleTriangles = (): number[] => {
    if (phase === 'intro' || phase === 'build-container') return [];
    if (phase === 'build-t1') return [1];
    if (phase === 'build-t2') return [1, 2];
    if (phase === 'build-t3') return [1, 2, 3];
    return [1, 2, 3, 4];
  };

  // Auto-advance for build phases
  useEffect(() => {
    const autoAdvancePhases: ProofPhase[] = ['build-t1', 'build-t2', 'build-t3', 'build-t4'];
    if (autoAdvancePhases.includes(phase)) {
      const timer = setTimeout(() => {
        const nextIndex = PHASE_ORDER.indexOf(phase) + 1;
        if (nextIndex < PHASE_ORDER.length) {
          setPhase(PHASE_ORDER[nextIndex]);
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Handle move transitions
  useEffect(() => {
    if (phase === 'move-t1') {
      const timer = setTimeout(() => {
        setMovedTriangles([1]);
        setShowGhosts(true);
        setTimeout(() => setPhase('move-t2'), 600);
      }, 100);
      return () => clearTimeout(timer);
    }
    if (phase === 'move-t2') {
      const timer = setTimeout(() => {
        setMovedTriangles([1, 2]);
        setTimeout(() => setPhase('move-t34'), 600);
      }, 100);
      return () => clearTimeout(timer);
    }
    if (phase === 'move-t34') {
      const timer = setTimeout(() => {
        setMovedTriangles([1, 2, 3, 4]);
        setTimeout(() => setPhase('reveal-ab'), 800);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleNext = () => {
    const currentIndex = PHASE_ORDER.indexOf(phase);
    if (currentIndex < PHASE_ORDER.length - 1) {
      setPhase(PHASE_ORDER[currentIndex + 1]);
    }
  };

  const handleReset = () => {
    setPhase('intro');
    setMovedTriangles([]);
    setShowGhosts(false);
  };

  const handleStartMove = () => {
    setPhase('move-t1');
  };

  if (!isActive) return null;

  const currentIndex = PHASE_ORDER.indexOf(phase);
  const trianglesToShow = visibleTriangles();
  const showC2Highlight = ['reveal-c2', 'highlight-c2', 'announce-move'].includes(phase);
  const showABHighlight = ['reveal-ab', 'compare', 'conclusion'].includes(phase);
  const isCompareView = phase === 'compare';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          La Prueba Visual
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {phase === 'intro' && 'Vamos a demostrar por qué el teorema siempre funciona'}
          {phase === 'build-container' && 'Empezamos con un cuadrado grande'}
          {['build-t1', 'build-t2', 'build-t3', 'build-t4'].includes(phase) && 'Colocando triángulos idénticos...'}
          {phase === 'reveal-c2' && 'Observa el espacio vacío'}
          {phase === 'highlight-c2' && 'Este es un cuadrado de lado c'}
          {phase === 'announce-move' && '¿Qué pasa si movemos los triángulos?'}
          {['move-t1', 'move-t2', 'move-t34'].includes(phase) && 'Moviendo triángulos...'}
          {phase === 'reveal-ab' && 'Nuevos espacios vacíos'}
          {phase === 'compare' && 'Comparación lado a lado'}
          {phase === 'conclusion' && '¡El teorema queda demostrado!'}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1">
        {['intro', 'build', 'reveal', 'move', 'compare', 'end'].map((step, i) => {
          let isActive = false;
          let isComplete = false;
          if (step === 'intro') { isActive = phase === 'intro'; isComplete = currentIndex > 0; }
          if (step === 'build') { isActive = currentIndex >= 1 && currentIndex <= 6; isComplete = currentIndex > 6; }
          if (step === 'reveal') { isActive = currentIndex >= 7 && currentIndex <= 8; isComplete = currentIndex > 8; }
          if (step === 'move') { isActive = currentIndex >= 9 && currentIndex <= 12; isComplete = currentIndex > 12; }
          if (step === 'compare') { isActive = phase === 'compare'; isComplete = currentIndex > 13; }
          if (step === 'end') { isActive = phase === 'conclusion'; }

          return (
            <div
              key={step}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                isActive ? 'bg-green-500 scale-125' :
                isComplete ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-600'
              )}
            />
          );
        })}
      </div>

      {/* Intro phase - explain the strategy */}
      {phase === 'intro' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-4">
          <div className="text-center space-y-3">
            <p className="text-gray-700 dark:text-gray-300">
              Vamos a colocar <strong>4 triángulos idénticos</strong> dentro de un cuadrado grande de <strong>DOS formas diferentes</strong>.
            </p>

            {/* Preview thumbnails */}
            <div className="flex justify-center gap-8 my-4">
              <div className="text-center">
                <svg viewBox="0 0 100 100" className="w-20 h-20 border border-gray-200 dark:border-gray-600 rounded">
                  <rect x="0" y="0" width="100" height="100" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="2" />
                  <polygon points="0,100 60,100 0,60" fill="#3B82F6" opacity="0.7" />
                  <polygon points="60,100 100,100 100,40" fill="#10B981" opacity="0.7" />
                  <polygon points="100,40 100,0 40,0" fill="#F59E0B" opacity="0.7" />
                  <polygon points="40,0 0,0 0,60" fill="#EF4444" opacity="0.7" />
                  <polygon points="0,60 60,100 100,40 40,0" fill="#8B5CF6" fillOpacity="0.3" stroke="#7C3AED" strokeWidth="1" />
                </svg>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">Forma 1: c²</span>
              </div>
              <div className="text-center">
                <svg viewBox="0 0 100 100" className="w-20 h-20 border border-gray-200 dark:border-gray-600 rounded">
                  <rect x="0" y="0" width="100" height="100" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="2" />
                  <polygon points="0,0 60,0 0,40" fill="#3B82F6" opacity="0.7" />
                  <polygon points="60,0 60,40 0,40" fill="#10B981" opacity="0.7" />
                  <polygon points="60,40 60,100 100,40" fill="#F59E0B" opacity="0.7" />
                  <polygon points="60,100 100,100 100,40" fill="#EF4444" opacity="0.7" />
                  <rect x="60" y="0" width="40" height="40" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="1" />
                  <rect x="0" y="40" width="60" height="60" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1" />
                </svg>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">Forma 2: a² + b²</span>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
              <p className="text-green-700 dark:text-green-300 text-sm">
                <strong>La clave:</strong> Si los triángulos son iguales, el <strong>espacio vacío</strong> también debe ser igual.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main visualization (all phases except intro and compare) */}
      {phase !== 'intro' && !isCompareView && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex flex-col items-center">
            <svg
              viewBox={`-20 -30 ${size + 40} ${size + 50}`}
              className="w-full max-w-sm h-auto"
              style={{ minHeight: '280px' }}
            >
              {/* Dimension labels */}
              {phase === 'build-container' && (
                <>
                  <line x1="0" y1="-15" x2={b} y2="-15" stroke="#10B981" strokeWidth="2" />
                  <line x1={b} y1="-15" x2={size} y2="-15" stroke="#3B82F6" strokeWidth="2" />
                  <text x={b / 2} y="-20" textAnchor="middle" className="text-xs font-bold fill-green-600">b</text>
                  <text x={b + a / 2} y="-20" textAnchor="middle" className="text-xs font-bold fill-blue-600">a</text>
                  <text x={size / 2} y={size + 20} textAnchor="middle" className="text-sm fill-gray-500">(a + b)</text>
                </>
              )}

              {/* Outer square */}
              <rect
                x="0" y="0"
                width={size} height={size}
                fill="#F9FAFB"
                stroke="#9CA3AF"
                strokeWidth="2"
                className={cn(
                  'transition-all duration-500',
                  phase === 'build-container' ? 'animate-pulse' : ''
                )}
              />

              {/* Ghost triangles (original positions) */}
              {showGhosts && (
                <>
                  {movedTriangles.includes(1) && (
                    <polygon
                      points={arrangement1.t1}
                      fill="none"
                      stroke={colors.t1.stroke}
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      opacity="0.25"
                    />
                  )}
                  {movedTriangles.includes(2) && (
                    <polygon
                      points={arrangement1.t2}
                      fill="none"
                      stroke={colors.t2.stroke}
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      opacity="0.25"
                    />
                  )}
                  {movedTriangles.includes(3) && (
                    <polygon
                      points={arrangement1.t3}
                      fill="none"
                      stroke={colors.t3.stroke}
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      opacity="0.25"
                    />
                  )}
                  {movedTriangles.includes(4) && (
                    <polygon
                      points={arrangement1.t4}
                      fill="none"
                      stroke={colors.t4.stroke}
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      opacity="0.25"
                    />
                  )}
                </>
              )}

              {/* c² highlight (tilted square) */}
              {showC2Highlight && (
                <g className="animate-fadeIn">
                  <polygon
                    points={c2Vertices.map(v => `${v.x},${v.y}`).join(' ')}
                    fill="#8B5CF6"
                    fillOpacity="0.2"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    className={phase === 'highlight-c2' ? 'animate-pulse' : ''}
                  />
                  {/* c labels on each side */}
                  {phase !== 'reveal-c2' && (
                    <>
                      <text x={b / 2 - 5} y={size - a / 2 + 15} className="text-xs font-bold fill-purple-600">c</text>
                      <text x={b + a / 2 + 5} y={size - b / 2 + 5} className="text-xs font-bold fill-purple-600">c</text>
                      <text x={size - b / 2 + 5} y={(size - b) / 2 - 5} className="text-xs font-bold fill-purple-600">c</text>
                      <text x={(size - b) / 2 - 10} y={(size - a) / 2} className="text-xs font-bold fill-purple-600">c</text>
                    </>
                  )}
                  <text x={size / 2} y={size / 2 + 5} textAnchor="middle" className="text-lg font-bold fill-purple-600">c²</text>
                </g>
              )}

              {/* a² and b² highlights */}
              {showABHighlight && !showGhosts && (
                <g className="animate-fadeIn">
                  {/* a² square */}
                  <rect
                    x={b} y={0}
                    width={a} height={a}
                    fill="#3B82F6"
                    fillOpacity="0.2"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                  <text x={b + a / 2} y={a / 2 + 5} textAnchor="middle" className="text-sm font-bold fill-blue-600">a²</text>

                  {/* b² square */}
                  <rect
                    x={0} y={a}
                    width={b} height={b}
                    fill="#10B981"
                    fillOpacity="0.2"
                    stroke="#10B981"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                  <text x={b / 2} y={a + b / 2 + 5} textAnchor="middle" className="text-sm font-bold fill-green-600">b²</text>
                </g>
              )}

              {/* Triangles */}
              {trianglesToShow.includes(1) && (
                <g>
                  <polygon
                    points={getTrianglePoints(1)}
                    fill={colors.t1.fill}
                    fillOpacity={showC2Highlight ? 0.6 : 0.85}
                    stroke={colors.t1.stroke}
                    strokeWidth="2"
                    className="transition-all duration-700 ease-in-out"
                  />
                  <text
                    x={getCentroid(getTrianglePoints(1)).cx}
                    y={getCentroid(getTrianglePoints(1)).cy + 4}
                    textAnchor="middle"
                    className="text-xs font-bold fill-white transition-all duration-700"
                  >1</text>
                </g>
              )}

              {trianglesToShow.includes(2) && (
                <g>
                  <polygon
                    points={getTrianglePoints(2)}
                    fill={colors.t2.fill}
                    fillOpacity={showC2Highlight ? 0.6 : 0.85}
                    stroke={colors.t2.stroke}
                    strokeWidth="2"
                    className="transition-all duration-700 ease-in-out"
                  />
                  <text
                    x={getCentroid(getTrianglePoints(2)).cx}
                    y={getCentroid(getTrianglePoints(2)).cy + 4}
                    textAnchor="middle"
                    className="text-xs font-bold fill-white transition-all duration-700"
                  >2</text>
                </g>
              )}

              {trianglesToShow.includes(3) && (
                <g>
                  <polygon
                    points={getTrianglePoints(3)}
                    fill={colors.t3.fill}
                    fillOpacity={showC2Highlight ? 0.6 : 0.85}
                    stroke={colors.t3.stroke}
                    strokeWidth="2"
                    className="transition-all duration-700 ease-in-out"
                  />
                  <text
                    x={getCentroid(getTrianglePoints(3)).cx}
                    y={getCentroid(getTrianglePoints(3)).cy + 4}
                    textAnchor="middle"
                    className="text-xs font-bold fill-white transition-all duration-700"
                  >3</text>
                </g>
              )}

              {trianglesToShow.includes(4) && (
                <g>
                  <polygon
                    points={getTrianglePoints(4)}
                    fill={colors.t4.fill}
                    fillOpacity={showC2Highlight ? 0.6 : 0.85}
                    stroke={colors.t4.stroke}
                    strokeWidth="2"
                    className="transition-all duration-700 ease-in-out"
                  />
                  <text
                    x={getCentroid(getTrianglePoints(4)).cx}
                    y={getCentroid(getTrianglePoints(4)).cy + 4}
                    textAnchor="middle"
                    className="text-xs font-bold fill-white transition-all duration-700"
                  >4</text>
                </g>
              )}
            </svg>

            {/* Legend */}
            {trianglesToShow.length > 0 && (
              <div className="flex justify-center gap-2 mt-3 text-xs flex-wrap">
                {[1, 2, 3, 4].map(n => {
                  const col = [colors.t1, colors.t2, colors.t3, colors.t4][n - 1];
                  const visible = trianglesToShow.includes(n);
                  return (
                    <div
                      key={n}
                      className={cn(
                        'w-5 h-5 rounded flex items-center justify-center text-[10px] text-white font-bold transition-opacity',
                        visible ? 'opacity-100' : 'opacity-30'
                      )}
                      style={{ backgroundColor: col.fill }}
                    >
                      {n}
                    </div>
                  );
                })}
                <span className="text-gray-500 dark:text-gray-400 ml-2 self-center">
                  {trianglesToShow.length} de 4 triángulos
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Compare view - side by side */}
      {isCompareView && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-center gap-4">
            {/* Arrangement 1 */}
            <div className="text-center">
              <svg viewBox="-5 -5 110 110" className="w-36 h-36">
                <rect x="0" y="0" width={size} height={size} fill="#F9FAFB" stroke="#9CA3AF" strokeWidth="1" />
                {/* Triangles faded */}
                <polygon points={arrangement1.t1} fill={colors.t1.fill} fillOpacity="0.3" stroke={colors.t1.stroke} strokeWidth="1" />
                <polygon points={arrangement1.t2} fill={colors.t2.fill} fillOpacity="0.3" stroke={colors.t2.stroke} strokeWidth="1" />
                <polygon points={arrangement1.t3} fill={colors.t3.fill} fillOpacity="0.3" stroke={colors.t3.stroke} strokeWidth="1" />
                <polygon points={arrangement1.t4} fill={colors.t4.fill} fillOpacity="0.3" stroke={colors.t4.stroke} strokeWidth="1" />
                {/* c² highlighted */}
                <polygon
                  points={c2Vertices.map(v => `${v.x},${v.y}`).join(' ')}
                  fill="#8B5CF6"
                  fillOpacity="0.4"
                  stroke="#7C3AED"
                  strokeWidth="2"
                />
                <text x={size / 2} y={size / 2 + 5} textAnchor="middle" className="text-base font-bold fill-purple-700">c²</text>
              </svg>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Arreglo 1</div>
            </div>

            {/* Equals sign */}
            <div className="text-3xl font-bold text-green-600">=</div>

            {/* Arrangement 2 */}
            <div className="text-center">
              <svg viewBox="-5 -5 110 110" className="w-36 h-36">
                <rect x="0" y="0" width={size} height={size} fill="#F9FAFB" stroke="#9CA3AF" strokeWidth="1" />
                {/* Triangles faded */}
                <polygon points={arrangement2.t1} fill={colors.t1.fill} fillOpacity="0.3" stroke={colors.t1.stroke} strokeWidth="1" />
                <polygon points={arrangement2.t2} fill={colors.t2.fill} fillOpacity="0.3" stroke={colors.t2.stroke} strokeWidth="1" />
                <polygon points={arrangement2.t3} fill={colors.t3.fill} fillOpacity="0.3" stroke={colors.t3.stroke} strokeWidth="1" />
                <polygon points={arrangement2.t4} fill={colors.t4.fill} fillOpacity="0.3" stroke={colors.t4.stroke} strokeWidth="1" />
                {/* a² and b² highlighted */}
                <rect x={b} y={0} width={a} height={a} fill="#3B82F6" fillOpacity="0.4" stroke="#3B82F6" strokeWidth="2" />
                <rect x={0} y={a} width={b} height={b} fill="#10B981" fillOpacity="0.4" stroke="#10B981" strokeWidth="2" />
                <text x={b + a / 2} y={a / 2 + 4} textAnchor="middle" className="text-xs font-bold fill-blue-700">a²</text>
                <text x={b / 2} y={a + b / 2 + 4} textAnchor="middle" className="text-sm font-bold fill-green-700">b²</text>
              </svg>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Arreglo 2</div>
            </div>
          </div>

          <div className="text-center mt-4 space-y-2">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Mismos 4 triángulos, mismo cuadrado grande
            </p>
            <p className="text-green-700 dark:text-green-300 font-semibold">
              Por lo tanto, el espacio vacío es igual:
            </p>
          </div>
        </div>
      )}

      {/* Explanation panel */}
      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-5">
        {phase === 'build-container' && (
          <p className="text-green-800 dark:text-green-200 text-center">
            Un cuadrado grande de lado <strong>(a + b)</strong>. Su área siempre será la misma, sin importar cómo lo llenemos.
          </p>
        )}

        {['build-t1', 'build-t2', 'build-t3', 'build-t4'].includes(phase) && (
          <p className="text-green-800 dark:text-green-200 text-center">
            Colocando triángulo <strong>{phase.slice(-1)}</strong> de 4...
            <br />
            <span className="text-sm">Todos los triángulos son idénticos (lados a, b, c)</span>
          </p>
        )}

        {phase === 'reveal-c2' && (
          <p className="text-green-800 dark:text-green-200 text-center">
            El <strong>espacio vacío</strong> en el centro tiene forma de cuadrado...
          </p>
        )}

        {phase === 'highlight-c2' && (
          <div className="text-green-800 dark:text-green-200 text-center space-y-2">
            <p>
              Este cuadrado tiene <strong>lado c</strong> (la hipotenusa de cada triángulo).
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 inline-block">
              <MathDisplay latex="\text{Espacio vacío} = c^2" />
            </div>
          </div>
        )}

        {phase === 'announce-move' && (
          <div className="text-green-800 dark:text-green-200 text-center space-y-2">
            <p>
              <strong>¿Qué pasa si movemos los mismos 4 triángulos?</strong>
            </p>
            <p className="text-sm">
              Observa cómo cambia el espacio vacío...
            </p>
          </div>
        )}

        {['move-t1', 'move-t2', 'move-t34'].includes(phase) && (
          <p className="text-green-800 dark:text-green-200 text-center">
            Moviendo triángulos... <strong>{movedTriangles.length} de 4</strong>
            <br />
            <span className="text-sm text-gray-500">(Las líneas punteadas muestran las posiciones originales)</span>
          </p>
        )}

        {phase === 'reveal-ab' && (
          <div className="text-green-800 dark:text-green-200 text-center space-y-2">
            <p>
              ¡Ahora hay <strong>DOS espacios vacíos</strong>!
            </p>
            <p className="text-sm">
              Un cuadrado de lado <strong className="text-blue-600">a</strong> y otro de lado <strong className="text-green-600">b</strong>
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 inline-block">
              <MathDisplay latex="\text{Espacio vacío} = a^2 + b^2" />
            </div>
          </div>
        )}

        {phase === 'compare' && (
          <div className="text-green-800 dark:text-green-200 text-center space-y-3">
            <p>
              Los <strong>mismos 4 triángulos</strong> en el <strong>mismo cuadrado grande</strong>.
            </p>
            <p>
              Por lo tanto, el espacio vacío debe ser <strong>igual</strong>:
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 inline-block">
              <MathDisplay latex="c^2 = a^2 + b^2" displayMode />
            </div>
          </div>
        )}

        {phase === 'conclusion' && (
          <div className="text-green-800 dark:text-green-200 text-center space-y-3">
            <p className="text-lg font-bold">
              ¡El Teorema de Pitágoras queda demostrado!
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 inline-block">
              <MathDisplay latex="a^2 + b^2 = c^2" displayMode className="text-xl" />
            </div>
            <p className="text-sm">
              Esto funciona para <strong>cualquier</strong> triángulo rectángulo.
            </p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        {phase !== 'intro' && phase !== 'conclusion' && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            <RotateCcw size={16} />
            <span>Reiniciar</span>
          </button>
        )}

        {phase === 'intro' && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <Play size={18} />
            <span>Comenzar</span>
          </button>
        )}

        {phase === 'announce-move' && (
          <button
            onClick={handleStartMove}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            <Eye size={18} />
            <span>¡Mover Triángulos!</span>
          </button>
        )}

        {['build-container', 'reveal-c2', 'highlight-c2', 'reveal-ab', 'compare'].includes(phase) && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Siguiente</span>
            <ArrowRight size={18} />
          </button>
        )}

        {phase === 'conclusion' && (
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
          >
            <span>Continuar</span>
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
