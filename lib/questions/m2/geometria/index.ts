import { m2GeometriaPlanoCartesianoQuestions } from './plano-cartesiano';
import { m2GeometriaVolumenQuestions } from './volumen';
import { m2GeometriaTeoremaDepitagorasQuestions } from './teorema-pitagoras';
import { m2GeometriaAreaCirculoQuestions } from './area-circulo';

// Export individual topic arrays
export { m2GeometriaPlanoCartesianoQuestions } from './plano-cartesiano';
export { m2GeometriaVolumenQuestions } from './volumen';
export { m2GeometriaTeoremaDepitagorasQuestions } from './teorema-pitagoras';
export { m2GeometriaAreaCirculoQuestions } from './area-circulo';

// Export combined array for backward compatibility
export const m2GeometriaQuestions = [
  ...m2GeometriaPlanoCartesianoQuestions,
  ...m2GeometriaVolumenQuestions,
  ...m2GeometriaTeoremaDepitagorasQuestions,
  ...m2GeometriaAreaCirculoQuestions
];
