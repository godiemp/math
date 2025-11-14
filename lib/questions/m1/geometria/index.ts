// M1 Geometría - Modular question imports
import { m1GeometriaPitagorasQuestions } from './teorema-pitagoras';
import { m1GeometriaPerimetroAreaQuestions } from './perimetro-area';
import { m1GeometriaVolumenQuestions } from './volumen';
import { m1GeometriaTransformacionesQuestions } from './transformaciones';

// Curriculum-based imports (M1-GEO-###)
import { m1Geo001Questions } from './m1-geo-001';

// Export curriculum subsections
// M1-GEO-001: Teorema de Pitágoras
export { m1Geo001Questions } from './m1-geo-001';

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
