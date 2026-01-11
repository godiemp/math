/**
 * 3D to 2D Projection Utilities
 */

import type { Point3D, ProjectedPoint, ProjectionConfig, ProjectionType } from '../../types/figure3d';
import { rotatePoint } from './rotation';
import { degToRad } from './rotation';

/**
 * Normalize projection config from type shorthand or full config
 */
export function normalizeProjectionConfig(
  projection: ProjectionConfig | ProjectionType | undefined,
  rotationOverride?: { azimuth: number; elevation: number }
): ProjectionConfig {
  const defaults = {
    isometric: { azimuth: 45, elevation: 35.264, depthScale: 1 },
    cavalier: { azimuth: 45, elevation: 0, depthScale: 1 },
    cabinet: { azimuth: 45, elevation: 0, depthScale: 0.5 },
    dimetric: { azimuth: 42, elevation: 20, depthScale: 0.5 },
  };

  if (typeof projection === 'string') {
    const def = defaults[projection];
    return {
      type: projection,
      azimuth: rotationOverride?.azimuth ?? def.azimuth,
      elevation: rotationOverride?.elevation ?? def.elevation,
      scale: def.depthScale,
    };
  }

  if (projection) {
    const def = defaults[projection.type];
    return {
      type: projection.type,
      azimuth: rotationOverride?.azimuth ?? projection.azimuth ?? def.azimuth,
      elevation: rotationOverride?.elevation ?? projection.elevation ?? def.elevation,
      scale: projection.scale ?? def.depthScale,
    };
  }

  // Default to isometric
  const def = defaults.isometric;
  return {
    type: 'isometric',
    azimuth: rotationOverride?.azimuth ?? def.azimuth,
    elevation: rotationOverride?.elevation ?? def.elevation,
    scale: 1,
  };
}

/**
 * Project a 3D point to 2D using isometric projection
 * Standard isometric: 30° angles, equal foreshortening on all axes
 */
export function projectIsometric(point: Point3D): { x: number; y: number } {
  // Isometric projection angles
  const angle = degToRad(30);
  const cos30 = Math.cos(angle);
  const sin30 = Math.sin(angle);

  return {
    x: (point.x - point.z) * cos30,
    y: -point.y + (point.x + point.z) * sin30,
  };
}

/**
 * Project a 3D point to 2D using cavalier projection
 * Cavalier: depth at 45°, full scale
 */
export function projectCavalier(point: Point3D): { x: number; y: number } {
  const angle = degToRad(45);
  const cos45 = Math.cos(angle);
  const sin45 = Math.sin(angle);

  return {
    x: point.x + point.z * cos45,
    y: -point.y + point.z * sin45,
  };
}

/**
 * Project a 3D point to 2D using cabinet projection
 * Cabinet: depth at 45°, half scale
 */
export function projectCabinet(point: Point3D): { x: number; y: number } {
  const angle = degToRad(45);
  const cos45 = Math.cos(angle);
  const sin45 = Math.sin(angle);
  const depthScale = 0.5;

  return {
    x: point.x + point.z * cos45 * depthScale,
    y: -point.y + point.z * sin45 * depthScale,
  };
}

/**
 * Project a 3D point to 2D with arbitrary rotation (dimetric/custom)
 */
export function projectWithRotation(
  point: Point3D,
  azimuthDeg: number,
  elevationDeg: number
): { x: number; y: number; depth: number } {
  // Rotate point based on view angles
  const rotated = rotatePoint(point, azimuthDeg, elevationDeg);

  // Orthographic projection (drop z for x,y, keep z as depth)
  return {
    x: rotated.x,
    y: -rotated.y, // Invert Y for SVG coordinate system
    depth: rotated.z,
  };
}

/**
 * Main projection function - project 3D point to 2D with offset and scale
 */
export function project3Dto2D(
  point: Point3D,
  config: ProjectionConfig,
  centerX: number,
  centerY: number,
  scale: number = 1
): ProjectedPoint {
  const azimuth = config.azimuth ?? 45;
  const elevation = config.elevation ?? 35;

  // Use rotation-based projection for all types (most flexible)
  const projected = projectWithRotation(point, azimuth, elevation);

  return {
    x: centerX + projected.x * scale,
    y: centerY + projected.y * scale,
    visible: true, // Will be updated by visibility calculation
    depth: projected.depth,
  };
}

/**
 * Project all vertices of a solid
 */
export function projectVertices(
  vertices: Point3D[],
  config: ProjectionConfig,
  centerX: number,
  centerY: number,
  scale: number = 1
): ProjectedPoint[] {
  return vertices.map((v) => project3Dto2D(v, config, centerX, centerY, scale));
}
