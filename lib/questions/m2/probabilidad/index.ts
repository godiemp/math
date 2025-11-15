// Curriculum-based imports
import { m2Prob001Questions } from './m2-prob-001';
import { m2Prob002Questions } from './m2-prob-002';
import { m2Prob003Questions } from './m2-prob-003';
import { m2Prob004Questions } from './m2-prob-004';

// Legacy topic-based imports (unique questions not yet in curriculum)
import { m2ProbabilidadTendenciaCentralQuestions } from './tendencia-central';
import { m2ProbabilidadMedidasPosicionQuestions } from './medidas-posicion';
import { m2ProbabilidadReglasProbabilidadQuestions } from './reglas-probabilidad';
import { m2ProbabilidadTablasGraficosQuestions } from './tablas-graficos';

// Export curriculum subsections
export { m2Prob001Questions } from './m2-prob-001';
export { m2Prob002Questions } from './m2-prob-002';
export { m2Prob003Questions } from './m2-prob-003';
export { m2Prob004Questions } from './m2-prob-004';

// Export legacy topic-based modules (unique questions not yet in curriculum)
export { m2ProbabilidadTendenciaCentralQuestions } from './tendencia-central';
export { m2ProbabilidadMedidasPosicionQuestions } from './medidas-posicion';
export { m2ProbabilidadReglasProbabilidadQuestions } from './reglas-probabilidad';
export { m2ProbabilidadTablasGraficosQuestions } from './tablas-graficos';

// Export combined array
export const m2ProbabilidadQuestions = [
  ...m2Prob001Questions,
  ...m2Prob002Questions,
  ...m2Prob003Questions,
  ...m2Prob004Questions,
  ...m2ProbabilidadTendenciaCentralQuestions,
  ...m2ProbabilidadMedidasPosicionQuestions,
  ...m2ProbabilidadReglasProbabilidadQuestions,
  ...m2ProbabilidadTablasGraficosQuestions
];
