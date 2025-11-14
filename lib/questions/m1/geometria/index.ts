// M1 Geometría - Modular question imports
import { m1GeometriaPitagorasQuestions } from './teorema-pitagoras';
import { m1GeometriaPerimetroAreaQuestions } from './perimetro-area';
import { m1GeometriaVolumenQuestions } from './volumen';
import { m1GeometriaTransformacionesQuestions } from './transformaciones';

// Curriculum-based imports (M1-GEO-###)
import { m1Geo001Questions } from './m1-geo-001';
import { m1Geo002Questions } from './m1-geo-002';
import { m1Geo003Questions } from './m1-geo-003';
import { m1Geo005Questions } from './m1-geo-005';

// Export curriculum subsections
// M1-GEO-001: Teorema de Pitágoras
export { m1Geo001Questions } from './m1-geo-001';

// M1-GEO-002: Perímetros y áreas de triángulos, paralelogramos, trapecios y círculos
export { m1Geo002Questions } from './m1-geo-002';

// M1-GEO-003: Área y volumen de prismas rectos y cilindros
export { m1Geo003Questions } from './m1-geo-003';

// M1-GEO-005: Rotación, traslación y reflexión de figuras geométricas
export { m1Geo005Questions } from './m1-geo-005';

// Export individual topic arrays (LEGACY - for backward compatibility)
export { m1GeometriaPitagorasQuestions } from './teorema-pitagoras';
export { m1GeometriaPerimetroAreaQuestions } from './perimetro-area';
export { m1GeometriaVolumenQuestions } from './volumen';
export { m1GeometriaTransformacionesQuestions } from './transformaciones';

// Export combined array for backward compatibility
export const m1GeometriaQuestions = [
  ...m1GeometriaPitagorasQuestions,
  ...m1GeometriaPerimetroAreaQuestions,
  ...m1GeometriaVolumenQuestions,
  ...m1GeometriaTransformacionesQuestions
];
