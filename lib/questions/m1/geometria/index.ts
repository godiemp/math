// M1 Geometría - Modular question imports
import { m1GeometriaPitagorasQuestions } from './teorema-pitagoras';
import { m1GeometriaPerimetroAreaQuestions } from './perimetro-area';
import { m1GeometriaVolumenQuestions } from './volumen';
import { m1GeometriaTransformacionesQuestions } from './transformaciones';

// Export individual topic arrays
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
