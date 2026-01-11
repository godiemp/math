/**
 * ============================================================================
 * GEOMETRY RENDERING TYPES
 * ============================================================================
 *
 * Types for geometry figure rendering in GeometryCanvas and QuestionRenderer.
 * Provides type-safe discriminated unions for different geometric shapes.
 *
 * Route association: Used in geometry questions across all routes
 */

import type { Question, QuestionRenderMode } from './core';

/**
 * ============================================================================
 * GEOMETRY FIGURE TYPES
 * ============================================================================
 */

/**
 * Geometry figure types for canvas rendering
 */
export type GeometryFigureType = 'triangle' | 'rectangle' | 'circle' | 'line' | 'point' | 'polygon';

/**
 * Base geometry figure
 * Common properties for all geometric shapes
 */
export interface GeometryFigure {
  type: GeometryFigureType;
  label?: string;
  color?: string;
}

/**
 * Triangle figure
 */
export interface Triangle extends GeometryFigure {
  type: 'triangle';
  points: [number, number, number, number, number, number]; // x1,y1, x2,y2, x3,y3
  sideLabels?: [string?, string?, string?];
  angleLabels?: [string?, string?, string?];
}

/**
 * Rectangle figure
 */
export interface Rectangle extends GeometryFigure {
  type: 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
  labels?: {
    width?: string;
    height?: string;
  };
}

/**
 * Circle figure
 */
export interface Circle extends GeometryFigure {
  type: 'circle';
  cx: number;
  cy: number;
  radius: number;
  radiusLabel?: string;
}

/**
 * Point figure
 */
export interface Point extends GeometryFigure {
  type: 'point';
  x: number;
  y: number;
  label: string;
}

/**
 * Line figure
 */
export interface Line extends GeometryFigure {
  type: 'line';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
}

/**
 * Polygon figure
 */
export interface Polygon extends GeometryFigure {
  type: 'polygon';
  points: number[]; // Flat array [x1, y1, x2, y2, ...]
  vertexLabels?: string[];
}

/**
 * Union of all geometry figure types
 * Discriminated union for type-safe rendering
 */
export type GeometryFigureUnion = Triangle | Rectangle | Circle | Point | Line | Polygon;

/**
 * ============================================================================
 * COMPONENT PROPS
 * ============================================================================
 */

/**
 * Props for QuestionRenderer component
 * Handles rendering of questions with optional geometry figures
 */
export interface QuestionRendererProps {
  question: Question;
  mode?: QuestionRenderMode;
  selectedAnswer?: number | null;
  showFeedback?: boolean;
  onAnswerSelect?: (answerIndex: number) => void;
  disabled?: boolean;
  compact?: boolean;
  quizMode?: 'zen' | 'rapidfire' | 'adaptive';
  onRequestAIHelp?: () => void;
}
