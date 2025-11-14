import { m1ProbabilidadTablasGraficosQuestions } from './tablas-graficos';
import { m1ProbabilidadTendenciaCentralQuestions } from './tendencia-central';
import { m1ProbabilidadMedidasPosicionQuestions } from './medidas-posicion';
import { m1ProbabilidadReglasProbabilidadQuestions } from './reglas-probabilidad';

// Import reorganized curriculum files
import { m1Prob001Questions } from './m1-prob-001';
import { m1Prob002Questions } from './m1-prob-002';
import { m1Prob003Questions } from './m1-prob-003';
import { m1Prob004Questions } from './m1-prob-004';
import { m1Prob005Questions } from './m1-prob-005';

// Export individual question arrays (legacy)
export { m1ProbabilidadTablasGraficosQuestions } from './tablas-graficos';
export { m1ProbabilidadTendenciaCentralQuestions } from './tendencia-central';
export { m1ProbabilidadMedidasPosicionQuestions } from './medidas-posicion';
export { m1ProbabilidadReglasProbabilidadQuestions } from './reglas-probabilidad';

// Export reorganized curriculum arrays
export { m1Prob001Questions } from './m1-prob-001';
export { m1Prob002Questions } from './m1-prob-002';
export { m1Prob003Questions } from './m1-prob-003';
export { m1Prob004Questions } from './m1-prob-004';
export { m1Prob005Questions } from './m1-prob-005';

// Export combined array for backward compatibility
export const m1ProbabilidadQuestions = [
  ...m1ProbabilidadReglasProbabilidadQuestions,
  ...m1ProbabilidadTablasGraficosQuestions,
  ...m1ProbabilidadTendenciaCentralQuestions,
  ...m1ProbabilidadMedidasPosicionQuestions
];
