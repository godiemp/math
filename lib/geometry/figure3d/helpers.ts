/**
 * Helper Functions for 3D Figures
 */

/**
 * Determine if a face index represents a base face for given solid type
 */
export function isBaseFace(faceIndex: number, solidType: string | undefined): boolean {
  if (!solidType) return false;

  // Base faces are typically index 0 (bottom) for most solids
  switch (solidType) {
    case 'cubo':
    case 'prisma_rectangular':
      return faceIndex === 0; // Bottom face
    case 'prisma_triangular':
      return faceIndex === 0; // Bottom triangle
    case 'piramide_cuadrada':
    case 'piramide_triangular':
      return faceIndex === 0; // Base face
    case 'cilindro':
      return faceIndex === 0; // Bottom circle
    case 'cono':
      return faceIndex === 0; // Base circle
    default:
      return false;
  }
}

/**
 * Get solid type display name in Spanish
 */
export function getSolidTypeName(solidType: string): string {
  const names: Record<string, string> = {
    cubo: 'Cubo',
    prisma_rectangular: 'Prisma Rectangular',
    prisma_triangular: 'Prisma Triangular',
    piramide_cuadrada: 'Pirámide Cuadrada',
    piramide_triangular: 'Pirámide Triangular',
    cilindro: 'Cilindro',
    cono: 'Cono',
    esfera: 'Esfera',
  };
  return names[solidType] || solidType;
}
