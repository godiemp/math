/**
 * 3D Geometry Utilities for Figure3D component
 * Re-exports all functions from individual modules
 */

// Vector math
export {
  vec3,
  vec3Add,
  vec3Subtract,
  vec3Scale,
  vec3Dot,
  vec3Cross,
  vec3Length,
  vec3Normalize,
  vec3Centroid,
} from './vec3';

// Rotation
export { degToRad, rotateX, rotateY, rotateZ, rotatePoint } from './rotation';

// Projection
export {
  normalizeProjectionConfig,
  projectIsometric,
  projectCavalier,
  projectCabinet,
  projectWithRotation,
  project3Dto2D,
  projectVertices,
} from './projection';

// Solid generators
export {
  generateCube,
  generatePrismaRectangular,
  generatePrismaTriangular,
  generatePiramideCuadrada,
  generatePiramideTriangular,
  generateCilindro,
  generateCono,
  generateEsfera,
  generateSolid,
  isSphereGeometry,
} from './solids';

// Visibility and sorting
export {
  calculateFaceNormal,
  isFaceFrontFacing,
  getViewDirection,
  getFaceDepth,
  sortFacesByDepth,
  getEdgeVisibility,
  getAllEdgeVisibilities,
} from './visibility';

// SVG path generation
export {
  describeFacePath,
  describeEdgeLine,
  getStrokeDashArray,
  calculateViewBox3D,
  calculateSphereViewBox,
} from './svg';

// Label positioning
export {
  calculateHeightLabelPosition,
  calculateBaseLabelPosition,
  calculateEdgeLabelPosition,
} from './labels';

// Volume and surface area calculations
export {
  volumeCubo,
  volumePrismaRectangular,
  volumePrismaTriangular,
  volumePiramide,
  volumePiramideCuadrada,
  volumePiramideTriangular,
  volumeCilindro,
  volumeCono,
  volumeEsfera,
  areaSuperficieCubo,
  areaSuperficiePrismaRectangular,
  areaSuperficieCilindro,
  areaSuperficieCono,
  areaSuperficieEsfera,
} from './calculations';

// Validation
export {
  validateCubeDimensions,
  validatePrismaRectangularDimensions,
  validatePrismaTriangularDimensions,
  validatePiramideDimensions,
  validateCilindroDimensions,
  validateConoDimensions,
  validateEsferaDimensions,
  validateSolidDimensions,
} from './validation';

// Helpers
export { isBaseFace, getSolidTypeName } from './helpers';
