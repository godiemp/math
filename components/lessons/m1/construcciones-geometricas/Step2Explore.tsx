'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Play, Pause, RotateCcw, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';

type TabId = 'mediatriz' | 'bisectriz' | 'perpendicular';
type AnimationPhase = number;

const TABS = [
  { id: 'mediatriz' as TabId, label: 'Mediatriz', maxPhase: 4 },
  { id: 'bisectriz' as TabId, label: 'Bisectriz', maxPhase: 5 },
  { id: 'perpendicular' as TabId, label: 'Perpendicular', maxPhase: 5 },
];

const STEP_DELAY = 1200;

// SVG helper: draw an arc
function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);
  const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('mediatriz');
  const [phase, setPhase] = useState<AnimationPhase>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedTabs, setCompletedTabs] = useState<TabId[]>([]);

  const currentTab = TABS.find((t) => t.id === activeTab)!;
  const maxPhase = currentTab.maxPhase;

  // Auto-advance animation
  useEffect(() => {
    if (!isPlaying) return;
    if (phase >= maxPhase) {
      setIsPlaying(false);
      if (!completedTabs.includes(activeTab)) {
        setCompletedTabs([...completedTabs, activeTab]);
      }
      return;
    }

    const timer = setTimeout(() => {
      setPhase((p) => p + 1);
    }, STEP_DELAY);

    return () => clearTimeout(timer);
  }, [isPlaying, phase, maxPhase, activeTab, completedTabs]);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    setPhase(0);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    if (phase >= maxPhase) {
      setPhase(0);
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setPhase(0);
    setIsPlaying(false);
  };

  const allComplete = completedTabs.length === 3;

  if (!isActive) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Construye con Compás</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Observa paso a paso cómo se realizan las tres construcciones fundamentales.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              'px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2',
              activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {tab.label}
            {completedTabs.includes(tab.id) && <Check size={16} className="text-green-300" />}
          </button>
        ))}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1">
        {Array.from({ length: maxPhase + 1 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-2 h-2 rounded-full transition-all',
              i === phase ? 'bg-blue-500 scale-125' : i < phase ? 'bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'
            )}
          />
        ))}
      </div>

      {/* Animation Canvas */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        {activeTab === 'mediatriz' && <MediatrizAnimation phase={phase} />}
        {activeTab === 'bisectriz' && <BisectrizAnimation phase={phase} />}
        {activeTab === 'perpendicular' && <PerpendicularAnimation phase={phase} />}

        {/* Phase description */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {activeTab === 'mediatriz' && MEDIATRIZ_STEPS[phase]}
            {activeTab === 'bisectriz' && BISECTRIZ_STEPS[phase]}
            {activeTab === 'perpendicular' && PERPENDICULAR_STEPS[phase]}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
        >
          <RotateCcw size={16} />
          <span>Reiniciar</span>
        </button>

        <button
          onClick={() => (isPlaying ? setIsPlaying(false) : handlePlay())}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          <span>{isPlaying ? 'Pausar' : phase >= maxPhase ? 'Ver de nuevo' : 'Ver animación'}</span>
        </button>
      </div>

      {/* Insight card */}
      {phase >= maxPhase && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800 animate-fadeIn">
          <p className="text-green-800 dark:text-green-200 text-center">
            {activeTab === 'mediatriz' && (
              <>
                <strong>La mediatriz</strong> pasa por el punto medio del segmento y es perpendicular a él. Todos los
                puntos de la mediatriz están a igual distancia de A y B.
              </>
            )}
            {activeTab === 'bisectriz' && (
              <>
                <strong>La bisectriz</strong> divide el ángulo en dos partes iguales. Todos los puntos de la bisectriz
                están a igual distancia de los dos lados del ángulo.
              </>
            )}
            {activeTab === 'perpendicular' && (
              <>
                <strong>La perpendicular desde un punto</strong> forma un ángulo de 90° con la recta. Es la distancia
                más corta desde el punto a la recta.
              </>
            )}
          </p>
        </div>
      )}

      {/* Continue button */}
      {allComplete && (
        <button
          onClick={onComplete}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg animate-fadeIn"
        >
          <span>Continuar</span>
          <ArrowRight size={20} />
        </button>
      )}

      {!allComplete && (
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Completa las 3 construcciones para continuar ({completedTabs.length}/3)
        </p>
      )}
    </div>
  );
}

// Step descriptions
const MEDIATRIZ_STEPS = [
  'Paso 0: Tenemos un segmento AB',
  'Paso 1: Abre el compás más de la mitad de AB. Traza un arco desde A.',
  'Paso 2: Sin cambiar la abertura, traza un arco desde B.',
  'Paso 3: Los arcos se cruzan en dos puntos P y Q.',
  'Paso 4: Une los puntos P y Q. ¡Esta es la mediatriz!',
];

const BISECTRIZ_STEPS = [
  'Paso 0: Tenemos un ángulo con vértice V',
  'Paso 1: Traza un arco desde V que corte los dos lados del ángulo.',
  'Paso 2: Marca los puntos P y Q donde el arco corta los lados.',
  'Paso 3: Desde P, traza un arco hacia el interior del ángulo.',
  'Paso 4: Desde Q, traza otro arco con el mismo radio. Se cruzan en R.',
  'Paso 5: Une V con R. ¡Esta es la bisectriz!',
];

const PERPENDICULAR_STEPS = [
  'Paso 0: Tenemos una recta L y un punto P fuera de ella',
  'Paso 1: Desde P, traza un arco que corte la recta en dos puntos.',
  'Paso 2: Marca los puntos A y B donde el arco corta la recta.',
  'Paso 3: Desde A, traza un arco por debajo de la recta.',
  'Paso 4: Desde B, traza otro arco con el mismo radio. Se cruzan en Q.',
  'Paso 5: Une P con Q. ¡Esta es la perpendicular!',
];

// Mediatriz Animation Component
function MediatrizAnimation({ phase }: { phase: number }) {
  // Segment endpoints
  const ax = 50, ay = 100;
  const bx = 250, by = 100;
  const midX = (ax + bx) / 2;
  const r = 120; // arc radius

  // Intersection points
  const dy = Math.sqrt(r * r - (midX - ax) * (midX - ax));
  const p1y = ay - dy;
  const p2y = ay + dy;

  return (
    <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto">
      {/* Background grid */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-gray-700" />
        </pattern>
      </defs>
      <rect width="300" height="200" fill="url(#grid)" />

      {/* Segment AB - always visible */}
      <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#374151" strokeWidth="3" className="dark:stroke-gray-300" />
      <circle cx={ax} cy={ay} r="5" fill="#EF4444" />
      <circle cx={bx} cy={by} r="5" fill="#EF4444" />
      <text x={ax - 10} y={ay + 5} className="text-sm font-bold fill-gray-700 dark:fill-gray-300">A</text>
      <text x={bx + 5} y={by + 5} className="text-sm font-bold fill-gray-700 dark:fill-gray-300">B</text>

      {/* Phase 1: Arc from A */}
      {phase >= 1 && (
        <path
          d={arcPath(ax, ay, r, -60, 60)}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          className="animate-fadeIn"
        />
      )}

      {/* Phase 2: Arc from B */}
      {phase >= 2 && (
        <path
          d={arcPath(bx, by, r, 120, 240)}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          className="animate-fadeIn"
        />
      )}

      {/* Phase 3: Intersection points */}
      {phase >= 3 && (
        <>
          <circle cx={midX} cy={p1y} r="5" fill="#F59E0B" className="animate-fadeIn" />
          <circle cx={midX} cy={p2y} r="5" fill="#F59E0B" className="animate-fadeIn" />
          <text x={midX + 10} y={p1y} className="text-xs font-bold fill-amber-600">P</text>
          <text x={midX + 10} y={p2y + 10} className="text-xs font-bold fill-amber-600">Q</text>
        </>
      )}

      {/* Phase 4: Perpendicular bisector line */}
      {phase >= 4 && (
        <>
          <line
            x1={midX}
            y1={p1y - 10}
            x2={midX}
            y2={p2y + 10}
            stroke="#10B981"
            strokeWidth="3"
            className="animate-fadeIn"
          />
          <circle cx={midX} cy={ay} r="6" fill="#10B981" stroke="white" strokeWidth="2" />
          <text x={midX + 10} y={ay - 10} className="text-xs font-bold fill-green-600">M</text>
        </>
      )}
    </svg>
  );
}

// Bisectriz Animation Component
function BisectrizAnimation({ phase }: { phase: number }) {
  // Vertex at V
  const vx = 50, vy = 150;
  // Two rays of the angle
  const r1x = 280, r1y = 150; // horizontal ray
  const r2x = 200, r2y = 30;  // angled ray (60 degrees up)

  // Arc from V
  const arcRadius = 80;
  // Points P and Q on the rays
  const px = vx + arcRadius;
  const py = vy;
  const angle = Math.atan2(r2y - vy, r2x - vx);
  const qx = vx + arcRadius * Math.cos(angle);
  const qy = vy + arcRadius * Math.sin(angle);

  // Point R (intersection of arcs from P and Q)
  const innerRadius = 60;
  // Approximate R position (bisector direction)
  const bisectorAngle = angle / 2;
  const rx = vx + 120 * Math.cos(bisectorAngle);
  const ry = vy + 120 * Math.sin(bisectorAngle);

  return (
    <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto">
      {/* Background grid */}
      <defs>
        <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-gray-700" />
        </pattern>
      </defs>
      <rect width="300" height="200" fill="url(#grid2)" />

      {/* Angle rays */}
      <line x1={vx} y1={vy} x2={r1x} y2={r1y} stroke="#374151" strokeWidth="3" className="dark:stroke-gray-300" />
      <line x1={vx} y1={vy} x2={r2x} y2={r2y} stroke="#374151" strokeWidth="3" className="dark:stroke-gray-300" />
      <circle cx={vx} cy={vy} r="5" fill="#EF4444" />
      <text x={vx - 15} y={vy + 5} className="text-sm font-bold fill-gray-700 dark:fill-gray-300">V</text>

      {/* Phase 1: Arc from V */}
      {phase >= 1 && (
        <path
          d={arcPath(vx, vy, arcRadius, -60, 0)}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          className="animate-fadeIn"
        />
      )}

      {/* Phase 2: Points P and Q */}
      {phase >= 2 && (
        <>
          <circle cx={px} cy={py} r="5" fill="#F59E0B" className="animate-fadeIn" />
          <circle cx={qx} cy={qy} r="5" fill="#F59E0B" className="animate-fadeIn" />
          <text x={px + 5} y={py + 15} className="text-xs font-bold fill-amber-600">P</text>
          <text x={qx + 10} y={qy} className="text-xs font-bold fill-amber-600">Q</text>
        </>
      )}

      {/* Phase 3: Arc from P */}
      {phase >= 3 && (
        <path
          d={arcPath(px, py, innerRadius, -120, -30)}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeDasharray="4 2"
          className="animate-fadeIn"
        />
      )}

      {/* Phase 4: Arc from Q */}
      {phase >= 4 && (
        <>
          <path
            d={arcPath(qx, qy, innerRadius, -30, 60)}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeDasharray="4 2"
            className="animate-fadeIn"
          />
          <circle cx={rx} cy={ry} r="5" fill="#F59E0B" className="animate-fadeIn" />
          <text x={rx + 10} y={ry} className="text-xs font-bold fill-amber-600">R</text>
        </>
      )}

      {/* Phase 5: Bisector line */}
      {phase >= 5 && (
        <line
          x1={vx}
          y1={vy}
          x2={vx + 200 * Math.cos(bisectorAngle)}
          y2={vy + 200 * Math.sin(bisectorAngle)}
          stroke="#10B981"
          strokeWidth="3"
          className="animate-fadeIn"
        />
      )}
    </svg>
  );
}

// Perpendicular from Point Animation Component
function PerpendicularAnimation({ phase }: { phase: number }) {
  // Line L (horizontal)
  const ly = 140;
  // Point P above the line
  const px = 150, py = 40;

  // Arc from P intersects line at A and B
  const arcRadius = 120;
  const dx = Math.sqrt(arcRadius * arcRadius - (ly - py) * (ly - py));
  const ax = px - dx;
  const bx = px + dx;

  // Arcs from A and B meet at Q below the line
  const innerRadius = 80;
  const qy = ly + Math.sqrt(innerRadius * innerRadius - ((bx - ax) / 2) * ((bx - ax) / 2));
  const qx = (ax + bx) / 2;

  return (
    <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto">
      {/* Background grid */}
      <defs>
        <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-gray-700" />
        </pattern>
      </defs>
      <rect width="300" height="200" fill="url(#grid3)" />

      {/* Line L */}
      <line x1="20" y1={ly} x2="280" y2={ly} stroke="#374151" strokeWidth="3" className="dark:stroke-gray-300" />
      <text x="275" y={ly - 10} className="text-sm font-bold fill-gray-700 dark:fill-gray-300">L</text>

      {/* Point P */}
      <circle cx={px} cy={py} r="5" fill="#EF4444" />
      <text x={px + 10} y={py + 5} className="text-sm font-bold fill-gray-700 dark:fill-gray-300">P</text>

      {/* Phase 1: Arc from P */}
      {phase >= 1 && (
        <path
          d={arcPath(px, py, arcRadius, 50, 130)}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          className="animate-fadeIn"
        />
      )}

      {/* Phase 2: Points A and B */}
      {phase >= 2 && (
        <>
          <circle cx={ax} cy={ly} r="5" fill="#F59E0B" className="animate-fadeIn" />
          <circle cx={bx} cy={ly} r="5" fill="#F59E0B" className="animate-fadeIn" />
          <text x={ax - 5} y={ly + 20} className="text-xs font-bold fill-amber-600">A</text>
          <text x={bx - 5} y={ly + 20} className="text-xs font-bold fill-amber-600">B</text>
        </>
      )}

      {/* Phase 3: Arc from A */}
      {phase >= 3 && (
        <path
          d={arcPath(ax, ly, innerRadius, 30, 90)}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeDasharray="4 2"
          className="animate-fadeIn"
        />
      )}

      {/* Phase 4: Arc from B */}
      {phase >= 4 && (
        <>
          <path
            d={arcPath(bx, ly, innerRadius, 90, 150)}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeDasharray="4 2"
            className="animate-fadeIn"
          />
          <circle cx={qx} cy={qy} r="5" fill="#F59E0B" className="animate-fadeIn" />
          <text x={qx + 10} y={qy + 5} className="text-xs font-bold fill-amber-600">Q</text>
        </>
      )}

      {/* Phase 5: Perpendicular line */}
      {phase >= 5 && (
        <>
          <line x1={px} y1={py} x2={qx} y2={qy} stroke="#10B981" strokeWidth="3" className="animate-fadeIn" />
          {/* Right angle marker */}
          <path
            d={`M ${qx - 10} ${ly} L ${qx - 10} ${ly - 10} L ${qx} ${ly - 10}`}
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            className="animate-fadeIn"
          />
        </>
      )}
    </svg>
  );
}
