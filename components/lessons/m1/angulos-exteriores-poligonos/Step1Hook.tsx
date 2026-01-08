'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Play, Pause, RotateCcw, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { buildRegularPolygon, regularExteriorAngle, polygonPath } from '@/lib/geometry/polygonUtils';

type Phase = 'intro' | 'walking' | 'question' | 'result';

// Pentagon configuration
const SIDES = 5;
const RADIUS = 70;
const CENTER_X = 120;
const CENTER_Y = 110;
const VERTICES = buildRegularPolygon(SIDES, RADIUS, CENTER_X, CENTER_Y, -90);
const EXTERIOR_ANGLE = regularExteriorAngle(SIDES); // 72°

export default function Step1Hook({ onComplete, isActive }: LessonStepProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentVertex, setCurrentVertex] = useState(0);
  const [totalRotation, setTotalRotation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showExteriorAngles, setShowExteriorAngles] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const correctAnswer = 1; // 360°

  // Reset animation
  const resetAnimation = useCallback(() => {
    setCurrentVertex(0);
    setTotalRotation(0);
    setShowExteriorAngles([]);
    setIsPlaying(false);
  }, []);

  // Animation effect
  useEffect(() => {
    if (!isPlaying || phase !== 'walking' || currentVertex >= SIDES) return;

    const timer = setTimeout(() => {
      const nextVertex = currentVertex + 1;
      setShowExteriorAngles((prev) => [...prev, currentVertex]);
      setTotalRotation(nextVertex * EXTERIOR_ANGLE);
      setCurrentVertex(nextVertex);

      // Stop playing when animation completes
      if (nextVertex >= SIDES) {
        setIsPlaying(false);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [isPlaying, currentVertex, phase]);

  if (!isActive) return null;

  // Calculate robot position and direction
  const getRobotTransform = () => {
    if (currentVertex >= SIDES) {
      // Completed - back at start
      const v = VERTICES[0];
      const nextV = VERTICES[1];
      const angle = Math.atan2(nextV.y - v.y, nextV.x - v.x) * (180 / Math.PI);
      return { x: v.x, y: v.y, rotation: angle };
    }

    const v = VERTICES[currentVertex];
    const nextV = VERTICES[(currentVertex + 1) % SIDES];
    const angle = Math.atan2(nextV.y - v.y, nextV.x - v.x) * (180 / Math.PI);
    return { x: v.x, y: v.y, rotation: angle };
  };

  // Draw exterior angle arc at vertex
  const renderExteriorAngle = (vertexIndex: number) => {
    const n = SIDES;
    const v = VERTICES[vertexIndex];
    const prev = VERTICES[(vertexIndex - 1 + n) % n];
    const next = VERTICES[(vertexIndex + 1) % n];

    // Direction from prev to current vertex (extended)
    const dx1 = v.x - prev.x;
    const dy1 = v.y - prev.y;
    const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

    // Extended point
    const extLen = 30;
    const extX = v.x + (dx1 / len1) * extLen;
    const extY = v.y + (dy1 / len1) * extLen;

    // Direction to next vertex
    const dx2 = next.x - v.x;
    const dy2 = next.y - v.y;
    const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

    // Point along next edge
    const nextX = v.x + (dx2 / len2) * 25;
    const nextY = v.y + (dy2 / len2) * 25;

    // Calculate arc
    const arcRadius = 18;
    const angle1 = Math.atan2(extY - v.y, extX - v.x);
    const angle2 = Math.atan2(nextY - v.y, nextX - v.x);

    // Arc path
    const startX = v.x + arcRadius * Math.cos(angle1);
    const startY = v.y + arcRadius * Math.sin(angle1);
    const endX = v.x + arcRadius * Math.cos(angle2);
    const endY = v.y + arcRadius * Math.sin(angle2);

    // Determine sweep direction
    let angleDiff = angle2 - angle1;
    if (angleDiff < 0) angleDiff += 2 * Math.PI;
    const largeArc = angleDiff > Math.PI ? 1 : 0;
    const sweep = 1;

    return (
      <g key={`ext-${vertexIndex}`} className="animate-fadeIn">
        {/* Extended line (dashed) */}
        <line
          x1={v.x}
          y1={v.y}
          x2={extX}
          y2={extY}
          stroke="#9ca3af"
          strokeWidth="1.5"
          strokeDasharray="4,3"
        />
        {/* Exterior angle arc */}
        <path
          d={`M ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArc} ${sweep} ${endX} ${endY}`}
          fill="none"
          stroke="#ef4444"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Small angle indicator fill */}
        <path
          d={`M ${v.x} ${v.y} L ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArc} ${sweep} ${endX} ${endY} Z`}
          fill="rgba(239, 68, 68, 0.2)"
        />
      </g>
    );
  };

  // ============ PHASE 1: INTRO ============
  if (phase === 'intro') {
    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Caminando por el Polígono
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Un robot aprende geometría...</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Un robot quiere caminar alrededor de un <strong>pentágono</strong>. En cada
              vértice, gira para seguir el borde.
            </p>

            {/* Static pentagon with robot */}
            <div className="flex justify-center py-4">
              <svg viewBox="0 0 240 220" className="w-64 h-56">
                {/* Pentagon */}
                <path
                  d={polygonPath(VERTICES)}
                  fill="rgba(59, 130, 246, 0.15)"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  className="dark:stroke-blue-400"
                />

                {/* Vertex labels */}
                {VERTICES.map((v, i) => {
                  const cx = CENTER_X;
                  const cy = CENTER_Y;
                  const dx = v.x - cx;
                  const dy = v.y - cy;
                  const len = Math.sqrt(dx * dx + dy * dy);
                  const labelX = v.x + (dx / len) * 18;
                  const labelY = v.y + (dy / len) * 18;
                  return (
                    <text
                      key={i}
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="12"
                      fontWeight="bold"
                      fill="#374151"
                      className="dark:fill-gray-300"
                    >
                      {String.fromCharCode(65 + i)}
                    </text>
                  );
                })}

                {/* Robot at vertex A */}
                <g transform={`translate(${VERTICES[0].x}, ${VERTICES[0].y})`}>
                  <circle r="10" fill="#8b5cf6" stroke="#5b21b6" strokeWidth="2" />
                  <circle r="3" cx="3" cy="-2" fill="white" />
                  <circle r="3" cx="-3" cy="-2" fill="white" />
                  {/* Direction indicator */}
                  <polygon points="12,0 8,-4 8,4" fill="#5b21b6" />
                </g>

                {/* "Interior" label */}
                <text
                  x={CENTER_X}
                  y={CENTER_Y}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#6b7280"
                  className="dark:fill-gray-400"
                >
                  Interior
                </text>
              </svg>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900/40 rounded-lg p-4 border-2 border-purple-300 dark:border-purple-600">
              <p className="text-purple-800 dark:text-purple-200 font-semibold">
                ¿Cuántos grados girará el robot en total después de dar una vuelta completa?
              </p>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Cada giro que hace el robot es un <strong>ángulo exterior</strong> del polígono.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              setPhase('walking');
              resetAnimation();
            }}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
          >
            <span>Ver el recorrido</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 2: WALKING ============
  if (phase === 'walking') {
    const robot = getRobotTransform();
    const isComplete = currentVertex >= SIDES;

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            El Robot Caminante
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Observa cómo gira en cada vértice</p>
        </div>

        {/* Animation visualization */}
        <div className="flex justify-center py-2">
          <svg viewBox="0 0 240 220" className="w-72 h-60">
            {/* Pentagon */}
            <path
              d={polygonPath(VERTICES)}
              fill="rgba(59, 130, 246, 0.1)"
              stroke="#3b82f6"
              strokeWidth="2"
              className="dark:stroke-blue-400"
            />

            {/* Exterior angles shown */}
            {showExteriorAngles.map((idx) => renderExteriorAngle(idx))}

            {/* Vertex labels */}
            {VERTICES.map((v, i) => {
              const cx = CENTER_X;
              const cy = CENTER_Y;
              const dx = v.x - cx;
              const dy = v.y - cy;
              const len = Math.sqrt(dx * dx + dy * dy);
              const labelX = v.x + (dx / len) * 18;
              const labelY = v.y + (dy / len) * 18;
              return (
                <text
                  key={i}
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="11"
                  fontWeight="bold"
                  fill="#374151"
                  className="dark:fill-gray-300"
                >
                  {String.fromCharCode(65 + i)}
                </text>
              );
            })}

            {/* Robot */}
            <g
              transform={`translate(${robot.x}, ${robot.y}) rotate(${robot.rotation})`}
              className="transition-all duration-300"
            >
              <circle r="9" fill="#8b5cf6" stroke="#5b21b6" strokeWidth="2" />
              <circle r="2.5" cx="2" cy="-2" fill="white" />
              <circle r="2.5" cx="-2" cy="-2" fill="white" />
              <polygon points="11,0 7,-3 7,3" fill="#5b21b6" />
            </g>
          </svg>
        </div>

        {/* Rotation counter */}
        <div className="flex justify-center">
          <div
            className={cn(
              'px-6 py-3 rounded-xl font-bold text-xl transition-all',
              isComplete
                ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-2 border-green-400'
                : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
            )}
          >
            Total de giros: {Math.round(totalRotation)}°
          </div>
        </div>

        {/* Animation controls */}
        <div className="flex justify-center gap-3">
          {!isComplete && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all',
                isPlaying
                  ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-300'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              )}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              {isPlaying ? 'Pausar' : 'Reproducir'}
            </button>
          )}

          <button
            onClick={resetAnimation}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            <RotateCcw size={18} />
            Reiniciar
          </button>
        </div>

        {/* Insight when complete */}
        {isComplete && (
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-5 border border-green-200 dark:border-green-700 animate-fadeIn">
            <p className="text-green-800 dark:text-green-200 text-center font-medium">
              El robot regresó al punto de inicio habiendo girado exactamente{' '}
              <strong>360°</strong> — ¡una vuelta completa!
            </p>
          </div>
        )}

        {isComplete && (
          <div className="flex justify-center">
            <button
              onClick={() => setPhase('question')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
            >
              <span>Continuar</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // ============ PHASE 3: QUESTION ============
  if (phase === 'question') {
    const handleSubmit = () => {
      if (selectedAnswer === null) return;
      setPhase('result');
    };

    return (
      <div className="space-y-6 animate-fadeIn pb-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Pregunta Clave
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ¿Cuántos grados giró el robot en total?
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
          <p className="text-blue-800 dark:text-blue-200 text-center">
            El robot caminó alrededor del pentágono, girando en cada vértice hasta regresar al
            punto de partida.
          </p>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '180°', value: 0 },
            { label: '360°', value: 1 },
            { label: '540°', value: 2 },
            { label: 'Depende del polígono', value: 3 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedAnswer(option.value)}
              className={cn(
                'p-4 rounded-xl font-semibold transition-all border-2',
                selectedAnswer === option.value
                  ? 'bg-purple-100 dark:bg-purple-900/50 border-purple-500 text-purple-800 dark:text-purple-200'
                  : 'bg-gray-50 dark:bg-gray-800 border-transparent hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className={cn(
              'px-8 py-3 rounded-xl font-semibold transition-all',
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            )}
          >
            Verificar
          </button>
        </div>
      </div>
    );
  }

  // ============ PHASE 4: RESULT ============
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="space-y-6 animate-fadeIn pb-32">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ¡Descubrimiento Importante!
        </h2>
      </div>

      {/* Answer feedback */}
      <div
        className={cn(
          'p-5 rounded-xl border-2',
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/30 border-green-400'
            : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'
        )}
      >
        <div className="flex items-start gap-4">
          {isCorrect ? (
            <Check className="w-7 h-7 text-green-600 flex-shrink-0" />
          ) : (
            <X className="w-7 h-7 text-amber-600 flex-shrink-0" />
          )}
          <div>
            <h3
              className={cn(
                'font-bold text-lg mb-1',
                isCorrect
                  ? 'text-green-800 dark:text-green-300'
                  : 'text-amber-800 dark:text-amber-300'
              )}
            >
              {isCorrect ? '¡Correcto!' : '¡Casi!'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              El robot giró exactamente <strong>360°</strong> — una vuelta completa.
            </p>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-5 border border-purple-200 dark:border-purple-700">
        <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-3 text-center text-lg">
          La Regla de los 360°
        </h4>
        <p className="text-purple-700 dark:text-purple-300 text-center">
          Al caminar alrededor de <strong>cualquier polígono convexo</strong>, la suma de todos
          los giros (ángulos exteriores) es siempre <strong>360°</strong>.
        </p>
        <div className="mt-4 text-center">
          <span className="inline-block bg-purple-200 dark:bg-purple-800 px-4 py-2 rounded-lg text-purple-900 dark:text-purple-100 font-bold text-xl">
            Σ ángulos exteriores = 360°
          </span>
        </div>
      </div>

      {/* Teaser */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
        <p className="text-blue-800 dark:text-blue-200 text-center text-sm">
          Pero espera... ¿esto funciona para <em>todos</em> los polígonos? ¿Triángulos?
          ¿Hexágonos? ¿Decágonos? ¡Vamos a explorar!
        </p>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>Explorar el patrón</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
