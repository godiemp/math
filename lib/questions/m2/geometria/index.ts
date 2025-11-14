// Curriculum-based imports
import { m2Geo001Questions } from './m2-geo-001';
import { m2Geo002Questions } from './m2-geo-002';
import { m2Geo003Questions } from './m2-geo-003';

// Legacy topic-based imports (backward compatibility)
import { m2GeometriaPerimetroAreaQuestions } from './perimetro-area';
import { m2GeometriaVolumenQuestions } from './volumen';
import { m2GeometriaTeoremaDepitagorasQuestions } from './teorema-pitagoras';
import { m2GeometriaTransformacionesQuestions } from './transformaciones';
import { m2GeometriaPlanoCartesianoQuestions } from './plano-cartesiano';
import { m2GeometriaAreaCirculoQuestions } from './area-circulo';

// Export curriculum subsections
export { m2Geo001Questions } from './m2-geo-001';
export { m2Geo002Questions } from './m2-geo-002';
export { m2Geo003Questions } from './m2-geo-003';

// Export legacy topic-based modules (backward compatibility)
export { m2GeometriaPerimetroAreaQuestions } from './perimetro-area';
export { m2GeometriaVolumenQuestions } from './volumen';
export { m2GeometriaTeoremaDepitagorasQuestions } from './teorema-pitagoras';
export { m2GeometriaTransformacionesQuestions } from './transformaciones';
export { m2GeometriaPlanoCartesianoQuestions } from './plano-cartesiano';
export { m2GeometriaAreaCirculoQuestions } from './area-circulo';

// Export combined array for backward compatibility
export const m2GeometriaQuestions = [
  ...m2Geo001Questions,
  ...m2Geo002Questions,
  ...m2Geo003Questions,
  ...m2GeometriaPerimetroAreaQuestions,
  ...m2GeometriaVolumenQuestions,
  ...m2GeometriaTeoremaDepitagorasQuestions,
  ...m2GeometriaTransformacionesQuestions,
  ...m2GeometriaPlanoCartesianoQuestions,
  ...m2GeometriaAreaCirculoQuestions
];
