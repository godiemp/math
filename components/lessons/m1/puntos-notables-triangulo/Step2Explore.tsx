'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Hand } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonStepProps } from '@/lib/lessons/types';
import { TriangleFigure } from '@/components/figures/TriangleFigure';
import type {
  SpecialLineConfig,
  NotablePointConfig,
  TriangleCircleConfig,
  NotablePointType,
} from '@/lib/types/triangle';

type Phase = 'intro' | 'circuncentro' | 'incentro' | 'baricentro' | 'ortocentro' | 'compare';

type LineType = 'simetrales' | 'bisectrices' | 'transversales' | 'alturas';

interface PhaseConfig {
  id: Phase;
  title: string;
  subtitle: string;
  description: string;
  lines: LineType | null;
  point: NotablePointType | null;
  showCircumscribed?: boolean;
  showInscribed?: boolean;
  color: string;
  lineDescription: string;
}

const PHASES: PhaseConfig[] = [
  {
    id: 'intro',
    title: 'Explora los Puntos Notables',
    subtitle: 'Preparación',
    description: 'Vamos a descubrir los 4 puntos notables de un triángulo. Cada uno se construye de forma diferente.',
    lines: null,
    point: null,
    color: 'blue',
    lineDescription: '',
  },
  {
    id: 'circuncentro',
    title: 'El Circuncentro',
    subtitle: 'Punto 1 de 4',
    description: 'El circuncentro es equidistante de los 3 vértices. Por eso es el centro del círculo circunscrito (que pasa por los 3 vértices).',
    lines: 'simetrales',
    point: 'circuncentro',
    showCircumscribed: true,
    color: 'purple',
    lineDescription: 'Se construye con las 3 simetrales (perpendiculares por el punto medio de cada lado)',
  },
  {
    id: 'incentro',
    title: 'El Incentro',
    subtitle: 'Punto 2 de 4',
    description: 'El incentro es equidistante de los 3 lados. Por eso es el centro del círculo inscrito (tangente a los 3 lados).',
    lines: 'bisectrices',
    point: 'incentro',
    showInscribed: true,
    color: 'amber',
    lineDescription: 'Se construye con las 3 bisectrices (líneas que dividen cada ángulo en dos partes iguales)',
  },
  {
    id: 'baricentro',
    title: 'El Baricentro',
    subtitle: 'Punto 3 de 4',
    description: 'El baricentro es el centro de gravedad del triángulo. Si recortas el triángulo en cartulina, se equilibraría en este punto.',
    lines: 'transversales',
    point: 'baricentro',
    color: 'emerald',
    lineDescription: 'Se construye con las 3 transversales de gravedad (líneas desde cada vértice al punto medio del lado opuesto)',
  },
  {
    id: 'ortocentro',
    title: 'El Ortocentro',
    subtitle: 'Punto 4 de 4',
    description: 'El ortocentro puede estar dentro o fuera del triángulo. En triángulos obtusángulos, ¡está afuera!',
    lines: 'alturas',
    point: 'ortocentro',
    color: 'red',
    lineDescription: 'Se construye con las 3 alturas (perpendiculares desde cada vértice al lado opuesto)',
  },
  {
    id: 'compare',
    title: 'Los 4 Puntos',
    subtitle: 'Comparación',
    description: '¡Arrastra los vértices para ver cómo se mueven los puntos! Observa que solo el baricentro siempre está dentro del triángulo.',
    lines: null,
    point: null,
    color: 'blue',
    lineDescription: '',
  },
];

// Map line types to SpecialLineConfig arrays
function getSpecialLines(lineType: LineType | null): SpecialLineConfig[] {
  if (!lineType) return [];

  const lineTypeMap: Record<LineType, SpecialLineConfig['type']> = {
    simetrales: 'simetral',
    bisectrices: 'bisectriz',
    transversales: 'transversal',
    alturas: 'altura',
  };

  const type = lineTypeMap[lineType];
  // Add right angle markers for alturas and simetrales
  const showRightAngle = lineType === 'alturas' || lineType === 'simetrales';
  // Add equal division marks for simetrales and transversales
  const showEqualMarks = lineType === 'simetrales' || lineType === 'transversales';

  return [
    { type, fromVertex: 0, showRightAngleMarker: showRightAngle, showEqualMarks },
    { type, fromVertex: 1, showRightAngleMarker: showRightAngle, showEqualMarks },
    { type, fromVertex: 2, showRightAngleMarker: showRightAngle, showEqualMarks },
  ];
}

// Get notable points config for display
function getNotablePoints(point: NotablePointType | null, isComparePhase: boolean = false, animate: boolean = true): NotablePointConfig[] {
  // In compare phase, show all 4 notable points
  if (isComparePhase) {
    return [
      { type: 'circuncentro', animate: false },
      { type: 'incentro', animate: false },
      { type: 'baricentro', animate: false },
      { type: 'ortocentro', animate: false },
    ];
  }
  if (!point) return [];
  return [{ type: point, animate }];
}

// Get circles config
function getCircles(showCircumscribed?: boolean, showInscribed?: boolean): TriangleCircleConfig[] {
  const circles: TriangleCircleConfig[] = [];
  if (showCircumscribed) {
    circles.push({ type: 'circumscribed', showCenter: false });
  }
  if (showInscribed) {
    circles.push({ type: 'inscribed', showCenter: false });
  }
  return circles;
}

export default function Step2Explore({ onComplete, isActive }: LessonStepProps) {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  if (!isActive) return null;

  const phase = PHASES[currentPhaseIndex];
  const isFirst = currentPhaseIndex === 0;
  const isLast = currentPhaseIndex === PHASES.length - 1;

  // Build props for TriangleFigure
  const isComparePhase = phase.id === 'compare';
  const specialLines = getSpecialLines(phase.lines);
  const notablePoints = getNotablePoints(phase.point, isComparePhase);
  const circles = getCircles(phase.showCircumscribed, phase.showInscribed);
  const isDraggable = isComparePhase || phase.point !== null;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentPhaseIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentPhaseIndex(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{phase.subtitle}</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {phase.title}
        </h2>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {PHASES.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setCurrentPhaseIndex(i)}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              i === currentPhaseIndex
                ? `bg-${phase.color}-500 scale-125`
                : i < currentPhaseIndex
                  ? 'bg-green-500'
                  : 'bg-gray-300 dark:bg-gray-600'
            )}
            style={{
              backgroundColor:
                i === currentPhaseIndex
                  ? phase.color === 'purple' ? 'rgb(168, 85, 247)'
                    : phase.color === 'amber' ? 'rgb(245, 158, 11)'
                    : phase.color === 'emerald' ? 'rgb(16, 185, 129)'
                    : phase.color === 'red' ? 'rgb(239, 68, 68)'
                    : 'rgb(59, 130, 246)'
                  : undefined
            }}
          />
        ))}
      </div>

      {/* Interactive Triangle */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <TriangleFigure
          vertices={[
            { x: 200, y: 60, label: 'A' },
            { x: 80, y: 280, label: 'B' },
            { x: 320, y: 280, label: 'C' },
          ]}
          specialLines={specialLines}
          notablePoints={notablePoints}
          circles={circles}
          draggable={isDraggable}
          showGrid
          className="mx-auto max-w-sm"
          ariaLabel="Triángulo interactivo con puntos notables"
        />

        {/* Drag instruction */}
        {isDraggable && (
          <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
            <Hand size={16} />
            <span>Arrastra los vértices para explorar</span>
          </div>
        )}
      </div>

      {/* Description */}
      <div className={cn(
        'rounded-xl p-4 border',
        phase.color === 'purple' && 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700',
        phase.color === 'amber' && 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700',
        phase.color === 'emerald' && 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700',
        phase.color === 'red' && 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700',
        phase.color === 'blue' && 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700',
      )}>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          {phase.description}
        </p>
        {phase.lineDescription && (
          <p className={cn(
            'text-sm mt-2 font-medium',
            phase.color === 'purple' && 'text-purple-700 dark:text-purple-300',
            phase.color === 'amber' && 'text-amber-700 dark:text-amber-300',
            phase.color === 'emerald' && 'text-emerald-700 dark:text-emerald-300',
            phase.color === 'red' && 'text-red-700 dark:text-red-300',
          )}>
            {phase.lineDescription}
          </p>
        )}
      </div>

      {/* Legend for compare phase */}
      {phase.id === 'compare' && (
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg px-3 py-2">
            <div className="w-4 h-4 rounded-full bg-purple-500" />
            <span className="text-purple-800 dark:text-purple-200">Circuncentro</span>
          </div>
          <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg px-3 py-2">
            <div className="w-4 h-4 rounded-full bg-amber-500" />
            <span className="text-amber-800 dark:text-amber-200">Incentro</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg px-3 py-2">
            <div className="w-4 h-4 rounded-full bg-emerald-500" />
            <span className="text-emerald-800 dark:text-emerald-200">Baricentro</span>
          </div>
          <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/30 rounded-lg px-3 py-2">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span className="text-red-800 dark:text-red-200">Ortocentro</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={isFirst}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
            isFirst
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          )}
        >
          <ArrowLeft size={18} />
          <span>Anterior</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
        >
          <span>{isLast ? 'Ver resumen' : 'Siguiente'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
