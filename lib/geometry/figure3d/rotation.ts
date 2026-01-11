/**
 * 3D Rotation Utilities
 */

import type { Point3D } from '../../types/figure3d';

/**
 * Convert degrees to radians
 */
export function degToRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Rotate a point around the X axis
 */
export function rotateX(point: Point3D, angleDeg: number): Point3D {
  const rad = degToRad(angleDeg);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x,
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos,
  };
}

/**
 * Rotate a point around the Y axis
 */
export function rotateY(point: Point3D, angleDeg: number): Point3D {
  const rad = degToRad(angleDeg);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x * cos + point.z * sin,
    y: point.y,
    z: -point.x * sin + point.z * cos,
  };
}

/**
 * Rotate a point around the Z axis
 */
export function rotateZ(point: Point3D, angleDeg: number): Point3D {
  const rad = degToRad(angleDeg);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos,
    z: point.z,
  };
}

/**
 * Apply combined azimuth (Y-axis) and elevation (X-axis) rotation
 * Order: rotate around Y first (azimuth), then around X (elevation)
 */
export function rotatePoint(point: Point3D, azimuthDeg: number, elevationDeg: number): Point3D {
  // First rotate around Y (azimuth - horizontal rotation)
  const afterY = rotateY(point, azimuthDeg);
  // Then rotate around X (elevation - tilt)
  return rotateX(afterY, elevationDeg);
}
