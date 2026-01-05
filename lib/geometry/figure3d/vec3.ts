/**
 * 3D Vector Math Utilities
 */

import type { Point3D } from '../../types/figure3d';

/**
 * Create a Point3D
 */
export function vec3(x: number, y: number, z: number, label?: string): Point3D {
  return { x, y, z, label };
}

/**
 * Add two 3D vectors
 */
export function vec3Add(a: Point3D, b: Point3D): Point3D {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

/**
 * Subtract two 3D vectors (a - b)
 */
export function vec3Subtract(a: Point3D, b: Point3D): Point3D {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

/**
 * Scale a 3D vector
 */
export function vec3Scale(v: Point3D, s: number): Point3D {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}

/**
 * Dot product of two 3D vectors
 */
export function vec3Dot(a: Point3D, b: Point3D): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

/**
 * Cross product of two 3D vectors
 */
export function vec3Cross(a: Point3D, b: Point3D): Point3D {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

/**
 * Length of a 3D vector
 */
export function vec3Length(v: Point3D): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

/**
 * Normalize a 3D vector (unit length)
 */
export function vec3Normalize(v: Point3D): Point3D {
  const len = vec3Length(v);
  if (len === 0) return { x: 0, y: 0, z: 0 };
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

/**
 * Calculate centroid of multiple 3D points
 */
export function vec3Centroid(points: Point3D[]): Point3D {
  if (points.length === 0) return { x: 0, y: 0, z: 0 };
  const sum = points.reduce(
    (acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y, z: acc.z + p.z }),
    { x: 0, y: 0, z: 0 }
  );
  return {
    x: sum.x / points.length,
    y: sum.y / points.length,
    z: sum.z / points.length,
  };
}
