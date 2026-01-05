/**
 * 3D Visibility and Depth Sorting Utilities
 */

import type { Point3D, ProjectionConfig } from '../../types/figure3d';
import { vec3Subtract, vec3Cross, vec3Normalize, vec3Centroid } from './vec3';
import { degToRad, rotatePoint } from './rotation';

/**
 * Calculate face normal vector (assumes CCW vertex order)
 */
export function calculateFaceNormal(vertices: Point3D[], face: number[]): Point3D {
  if (face.length < 3) return { x: 0, y: 0, z: 1 };

  const v0 = vertices[face[0]];
  const v1 = vertices[face[1]];
  const v2 = vertices[face[2]];

  const edge1 = vec3Subtract(v1, v0);
  const edge2 = vec3Subtract(v2, v0);

  return vec3Normalize(vec3Cross(edge1, edge2));
}

/**
 * Determine if a face is front-facing based on view direction
 * NOTE: Vertices should already be rotated to match the projection view
 */
export function isFaceFrontFacing(
  vertices: Point3D[],
  face: number[],
  _viewDirection: Point3D // Kept for API compatibility but not used
): boolean {
  const normal = calculateFaceNormal(vertices, face);
  // After rotation, camera looks from +Z toward -Z (orthographic)
  // Face is front-facing if normal points toward +Z (toward camera)
  return normal.z > 0;
}

/**
 * Get view direction based on projection config
 */
export function getViewDirection(config: ProjectionConfig): Point3D {
  // View direction is opposite to camera position
  // For our coordinate system, camera looks from positive Z toward origin
  const azimuth = config.azimuth ?? 45;
  const elevation = config.elevation ?? 35;

  // Create unit vector pointing from camera toward origin
  const rad_az = degToRad(azimuth);
  const rad_el = degToRad(elevation);

  return {
    x: -Math.sin(rad_az) * Math.cos(rad_el),
    y: -Math.sin(rad_el),
    z: -Math.cos(rad_az) * Math.cos(rad_el),
  };
}

/**
 * Calculate face centroid depth for sorting
 */
export function getFaceDepth(
  vertices: Point3D[],
  face: number[],
  config: ProjectionConfig
): number {
  // Calculate centroid of face
  const faceVertices = face.map((i) => vertices[i]);
  const centroid = vec3Centroid(faceVertices);

  // Rotate centroid same as projection
  const azimuth = config.azimuth ?? 45;
  const elevation = config.elevation ?? 35;
  const rotated = rotatePoint(centroid, azimuth, elevation);

  return rotated.z;
}

/**
 * Sort faces by depth (painter's algorithm) - back to front
 */
export function sortFacesByDepth(
  vertices: Point3D[],
  faces: number[][],
  config: ProjectionConfig
): number[] {
  const faceDepths = faces.map((face, index) => ({
    index,
    depth: getFaceDepth(vertices, face, config),
  }));

  // Sort by depth (most negative = furthest = draw first)
  faceDepths.sort((a, b) => a.depth - b.depth);

  return faceDepths.map((f) => f.index);
}

/**
 * Determine edge visibility based on adjacent faces
 */
export function getEdgeVisibility(
  vertices: Point3D[],
  edge: [number, number],
  faces: number[][],
  config: ProjectionConfig
): 'visible' | 'hidden' {
  const azimuth = config.azimuth ?? 45;
  const elevation = config.elevation ?? 35;

  // Rotate vertices to match projection view
  const rotatedVertices = vertices.map((v) => rotatePoint(v, azimuth, elevation));
  const viewDirection = getViewDirection(config);

  // Find faces that contain this edge
  const adjacentFaces = faces.filter((face) => {
    const hasV0 = face.includes(edge[0]);
    const hasV1 = face.includes(edge[1]);
    return hasV0 && hasV1;
  });

  // If any adjacent face is front-facing, edge is visible
  for (const face of adjacentFaces) {
    if (isFaceFrontFacing(rotatedVertices, face, viewDirection)) {
      return 'visible';
    }
  }

  return 'hidden';
}

/**
 * Get all edge visibilities for a solid
 */
export function getAllEdgeVisibilities(
  vertices: Point3D[],
  edges: [number, number][],
  faces: number[][],
  config: ProjectionConfig
): ('visible' | 'hidden')[] {
  const azimuth = config.azimuth ?? 45;
  const elevation = config.elevation ?? 35;

  // Rotate vertices once for all edge checks
  const rotatedVertices = vertices.map((v) => rotatePoint(v, azimuth, elevation));
  const viewDirection = getViewDirection(config);

  return edges.map((edge) => {
    // Find faces that contain this edge
    const adjacentFaces = faces.filter((face) => {
      const hasV0 = face.includes(edge[0]);
      const hasV1 = face.includes(edge[1]);
      return hasV0 && hasV1;
    });

    // If any adjacent face is front-facing, edge is visible
    for (const face of adjacentFaces) {
      if (isFaceFrontFacing(rotatedVertices, face, viewDirection)) {
        return 'visible';
      }
    }

    return 'hidden';
  });
}
