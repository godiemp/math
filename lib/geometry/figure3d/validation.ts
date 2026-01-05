/**
 * Validation Functions for 3D Solid Dimensions
 */

import type {
  ValidationResult,
  SolidDimensions,
  CubeDimensions,
  PrismaRectangularDimensions,
  PrismaTriangularDimensions,
  PiramideCuadradaDimensions,
  PiramideTriangularDimensions,
  CilindroDimensions,
  ConoDimensions,
  EsferaDimensions,
} from '../../types/figure3d';

/**
 * Validate cube dimensions
 */
export function validateCubeDimensions(d: CubeDimensions): ValidationResult {
  if (d.lado <= 0) {
    return { valid: false, error: 'El lado debe ser positivo' };
  }
  return { valid: true };
}

/**
 * Validate rectangular prism dimensions
 */
export function validatePrismaRectangularDimensions(
  d: PrismaRectangularDimensions
): ValidationResult {
  if (d.largo <= 0 || d.ancho <= 0 || d.altura <= 0) {
    return { valid: false, error: 'Todas las dimensiones deben ser positivas' };
  }
  return { valid: true };
}

/**
 * Validate triangular prism dimensions
 */
export function validatePrismaTriangularDimensions(
  d: PrismaTriangularDimensions
): ValidationResult {
  if (d.baseWidth <= 0 || d.baseHeight <= 0 || d.profundidad <= 0) {
    return { valid: false, error: 'Todas las dimensiones deben ser positivas' };
  }
  return { valid: true };
}

/**
 * Validate pyramid dimensions
 */
export function validatePiramideDimensions(
  d: PiramideCuadradaDimensions | PiramideTriangularDimensions
): ValidationResult {
  if (d.base <= 0 || d.altura <= 0) {
    return { valid: false, error: 'Base y altura deben ser positivas' };
  }
  return { valid: true };
}

/**
 * Validate cylinder dimensions
 */
export function validateCilindroDimensions(d: CilindroDimensions): ValidationResult {
  if (d.radio <= 0 || d.altura <= 0) {
    return { valid: false, error: 'Radio y altura deben ser positivos' };
  }
  return { valid: true };
}

/**
 * Validate cone dimensions
 */
export function validateConoDimensions(d: ConoDimensions): ValidationResult {
  if (d.radio <= 0 || d.altura <= 0) {
    return { valid: false, error: 'Radio y altura deben ser positivos' };
  }
  return { valid: true };
}

/**
 * Validate sphere dimensions
 */
export function validateEsferaDimensions(d: EsferaDimensions): ValidationResult {
  if (d.radio <= 0) {
    return { valid: false, error: 'El radio debe ser positivo' };
  }
  return { valid: true };
}

/**
 * Validate any solid dimensions
 */
export function validateSolidDimensions(solid: SolidDimensions): ValidationResult {
  switch (solid.type) {
    case 'cubo':
      return validateCubeDimensions(solid.dimensions);
    case 'prisma_rectangular':
      return validatePrismaRectangularDimensions(solid.dimensions);
    case 'prisma_triangular':
      return validatePrismaTriangularDimensions(solid.dimensions);
    case 'piramide_cuadrada':
    case 'piramide_triangular':
      return validatePiramideDimensions(solid.dimensions);
    case 'cilindro':
      return validateCilindroDimensions(solid.dimensions);
    case 'cono':
      return validateConoDimensions(solid.dimensions);
    case 'esfera':
      return validateEsferaDimensions(solid.dimensions);
    default:
      return { valid: false, error: 'Tipo de sólido no reconocido' };
  }
}
