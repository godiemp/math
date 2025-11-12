import { Question } from '../../../types';
import { m1GeometriaPerimetroAreaAnglesTrianglesQuestions } from './perimetro-area-angles-triangles';
import { m1GeometriaPerimetroAreaQuadrilateralsQuestions } from './perimetro-area-quadrilaterals';
import { m1GeometriaPerimetroAreaCirclesQuestions } from './perimetro-area-circles';

/**
 * M1 Geometría: Perímetro y Área - All Questions
 * Combined export of all perimeter and area questions
 */
export const m1GeometriaPerimetroAreaQuestions: Question[] = [
  ...m1GeometriaPerimetroAreaAnglesTrianglesQuestions,
  ...m1GeometriaPerimetroAreaQuadrilateralsQuestions,
  ...m1GeometriaPerimetroAreaCirclesQuestions,
];

// Re-export individual categories for granular imports
export { m1GeometriaPerimetroAreaAnglesTrianglesQuestions } from './perimetro-area-angles-triangles';
export { m1GeometriaPerimetroAreaQuadrilateralsQuestions } from './perimetro-area-quadrilaterals';
export { m1GeometriaPerimetroAreaCirclesQuestions } from './perimetro-area-circles';
