'use client';

import { type LessonThumbnail as LessonThumbnailType } from '@/lib/lessons/types';
import { TriangleFigure } from '@/components/figures/TriangleFigure';
import { CircleFigure } from '@/components/figures/CircleFigure';
import { QuadrilateralFigure } from '@/components/figures/QuadrilateralFigure';
import BarChart from '@/components/lessons/shared/BarChart';
import PieChart from '@/components/lessons/shared/PieChart';
import LineChart from '@/components/lessons/shared/LineChart';
import ScatterPlot from '@/components/lessons/shared/ScatterPlot';
import Histogram from '@/components/lessons/shared/Histogram';
import NumberLine from '@/components/lessons/shared/NumberLine';
import VennDiagram from '@/components/lessons/shared/VennDiagram';
import FactorGrid from '@/components/lessons/shared/FactorGrid';
import { cn } from '@/lib/utils';

interface LessonThumbnailProps {
  thumbnail: LessonThumbnailType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_MAP = {
  sm: 48,
  md: 64,
  lg: 80,
};

export function LessonThumbnail({
  thumbnail,
  size = 'md',
  className,
}: LessonThumbnailProps) {
  const dimension = SIZE_MAP[size];
  const config = thumbnail.config || {};

  const containerClass = cn(
    'flex items-center justify-center overflow-hidden',
    className
  );

  switch (thumbnail.type) {
    case 'triangle':
      return (
        <div className={containerClass} style={{ width: dimension, height: dimension }}>
          <TriangleFigure
            width={dimension}
            height={dimension}
            padding={8}
            showVertices={false}
            {...config}
          />
        </div>
      );

    case 'circle':
      return (
        <div className={containerClass} style={{ width: dimension, height: dimension }}>
          <CircleFigure
            center={{ x: dimension / 2, y: dimension / 2 }}
            radius={(config.radius as number) ?? dimension / 3}
            width={dimension}
            height={dimension}
            padding={8}
            showRadius={(config.showRadius as boolean) ?? false}
            sector={config.sectors ? (config.sectors as { startAngle: number; endAngle: number; fill?: string }[])[0] : undefined}
          />
        </div>
      );

    case 'quadrilateral':
      return (
        <div className={containerClass} style={{ width: dimension, height: dimension }}>
          <QuadrilateralFigure
            width={dimension}
            height={dimension}
            padding={8}
            showVertices={false}
            {...config}
          />
        </div>
      );

    case 'bar-chart':
      return (
        <div className={containerClass} style={{ width: dimension, height: dimension }}>
          <BarChart
            data={(config.data as { category: string; value: number }[]) || [
              { category: 'A', value: 3 },
              { category: 'B', value: 5 },
              { category: 'C', value: 2 },
            ]}
            height="sm"
            showValues={false}
            showLabels={false}
            animated={false}
            className="w-full h-full"
          />
        </div>
      );

    case 'pie-chart':
      return (
        <div className={containerClass} style={{ width: dimension, height: dimension }}>
          <PieChart
            data={(config.data as { category: string; value: number; color: string }[]) || [
              { category: 'A', value: 3, color: '#3B82F6' },
              { category: 'B', value: 2, color: '#10B981' },
              { category: 'C', value: 1, color: '#F59E0B' },
            ]}
            size="sm"
            showLegend={false}
            showPercentages={false}
          />
        </div>
      );

    case 'line-chart':
      return (
        <div className={containerClass} style={{ width: dimension, height: dimension }}>
          <LineChart
            data={(config.data as { label: string; value: number }[]) || [
              { label: '1', value: 2 },
              { label: '2', value: 4 },
              { label: '3', value: 3 },
              { label: '4', value: 5 },
            ]}
            height="sm"
            showValues={false}
            showLabels={false}
            showGrid={false}
            className="w-full h-full"
          />
        </div>
      );

    case 'scatter-plot':
      return (
        <div className={containerClass} style={{ width: dimension, height: dimension }}>
          <ScatterPlot
            data={(config.data as { x: number; y: number; label?: string }[]) || [
              { x: 1, y: 2 },
              { x: 2, y: 4 },
              { x: 3, y: 3 },
              { x: 4, y: 5 },
            ]}
            height="sm"
            showGrid={false}
            showLegend={false}
            showXAxis={false}
            showYAxis={false}
          />
        </div>
      );

    case 'histogram':
      return (
        <div className={containerClass} style={{ width: dimension, height: dimension }}>
          <Histogram
            data={(config.data as { interval: string; frequency: number }[]) || [
              { interval: '[0-10)', frequency: 3 },
              { interval: '[10-20)', frequency: 5 },
              { interval: '[20-30)', frequency: 2 },
            ]}
            height="sm"
            showFrequencies={false}
            showIntervals={false}
            className="w-full h-full"
          />
        </div>
      );

    case 'number-line':
      return (
        <div className={containerClass} style={{ width: dimension, height: dimension }}>
          <NumberLine
            min={(config.min as number) ?? -5}
            max={(config.max as number) ?? 5}
            markers={(config.markers as number[]) ?? []}
            showLabels={false}
            className="w-full"
          />
        </div>
      );

    case 'venn':
      return (
        <div className={containerClass} style={{ width: dimension, height: dimension }}>
          <VennDiagram
            mode="overlapping"
            showLabels={false}
            countA={(config.countA as number) ?? 5}
            countB={(config.countB as number) ?? 4}
            countBoth={(config.countBoth as number) ?? 2}
            {...config}
          />
        </div>
      );

    case 'factor-grid':
      return (
        <div className={containerClass} style={{ width: dimension, height: dimension }}>
          <FactorGrid
            number={(config.number as number) ?? 12}
            {...config}
          />
        </div>
      );

    case 'equation':
      // Simple equation display using SVG text
      return (
        <div className={containerClass} style={{ width: dimension, height: dimension }}>
          <svg viewBox="0 0 80 80" className="w-full h-full">
            <text
              x="40"
              y="44"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-800 dark:fill-gray-200"
              fontSize="14"
              fontFamily="serif"
              fontStyle="italic"
            >
              {(config.equation as string) || 'x + 1'}
            </text>
          </svg>
        </div>
      );

    case 'fraction-bar':
      // Visual fraction bar
      const numerator = (config.numerator as number) ?? 3;
      const denominator = (config.denominator as number) ?? 4;
      return (
        <div className={containerClass} style={{ width: dimension, height: dimension }}>
          <svg viewBox="0 0 80 80" className="w-full h-full">
            <rect x="10" y="30" width="60" height="20" rx="2" className="fill-gray-200 dark:fill-gray-700" />
            <rect
              x="10"
              y="30"
              width={(60 * numerator) / denominator}
              height="20"
              rx="2"
              className="fill-blue-500"
            />
            <text x="40" y="70" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-xs">
              {numerator}/{denominator}
            </text>
          </svg>
        </div>
      );

    case 'area-model':
      // Simple area model visualization
      return (
        <div className={containerClass} style={{ width: dimension, height: dimension }}>
          <svg viewBox="0 0 80 80" className="w-full h-full">
            <rect x="10" y="10" width="30" height="25" className="fill-blue-400" />
            <rect x="40" y="10" width="30" height="25" className="fill-blue-300" />
            <rect x="10" y="35" width="30" height="25" className="fill-purple-300" />
            <rect x="40" y="35" width="30" height="25" className="fill-purple-200" />
            <line x1="10" y1="10" x2="10" y2="60" className="stroke-gray-600" strokeWidth="1" />
            <line x1="10" y1="10" x2="70" y2="10" className="stroke-gray-600" strokeWidth="1" />
            <line x1="70" y1="10" x2="70" y2="60" className="stroke-gray-600" strokeWidth="1" />
            <line x1="10" y1="60" x2="70" y2="60" className="stroke-gray-600" strokeWidth="1" />
          </svg>
        </div>
      );

    case 'coordinate-plane':
      // Simple coordinate plane with optional point/line
      const points = (config.points as { x: number; y: number }[]) ?? [{ x: 2, y: 3 }];
      return (
        <div className={containerClass} style={{ width: dimension, height: dimension }}>
          <svg viewBox="0 0 80 80" className="w-full h-full">
            {/* Grid */}
            <line x1="10" y1="40" x2="70" y2="40" className="stroke-gray-400" strokeWidth="1" />
            <line x1="40" y1="10" x2="40" y2="70" className="stroke-gray-400" strokeWidth="1" />
            {/* Points */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={40 + p.x * 8}
                cy={40 - p.y * 8}
                r="4"
                className="fill-blue-500"
              />
            ))}
          </svg>
        </div>
      );

    case 'custom':
      if (thumbnail.customSvg) {
        return (
          <div
            className={containerClass}
            style={{ width: dimension, height: dimension }}
            dangerouslySetInnerHTML={{ __html: thumbnail.customSvg }}
          />
        );
      }
      return (
        <div
          className={cn(containerClass, 'bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg')}
          style={{ width: dimension, height: dimension }}
        />
      );

    default:
      // Fallback gradient
      return (
        <div
          className={cn(containerClass, 'bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg')}
          style={{ width: dimension, height: dimension }}
        />
      );
  }
}

export default LessonThumbnail;
