import { m2ProbabilidadTendenciaCentralQuestions } from './tendencia-central';
import { m2ProbabilidadMedidasPosicionQuestions } from './medidas-posicion';
import { m2ProbabilidadReglasProbabilidadQuestions } from './reglas-probabilidad';
import { m2ProbabilidadTablasGraficosQuestions } from './tablas-graficos';
import { m2ProbabilidadMedidasDispersionQuestions } from './medidas-dispersion';
import { m2ProbabilidadCombinatoriaQuestions } from './combinatoria';

// Export individual topic arrays
export { m2ProbabilidadTendenciaCentralQuestions } from './tendencia-central';
export { m2ProbabilidadMedidasPosicionQuestions } from './medidas-posicion';
export { m2ProbabilidadReglasProbabilidadQuestions } from './reglas-probabilidad';
export { m2ProbabilidadTablasGraficosQuestions } from './tablas-graficos';
export { m2ProbabilidadMedidasDispersionQuestions } from './medidas-dispersion';
export { m2ProbabilidadCombinatoriaQuestions } from './combinatoria';

// Export combined array for backward compatibility
export const m2ProbabilidadQuestions = [
  ...m2ProbabilidadTendenciaCentralQuestions,
  ...m2ProbabilidadMedidasPosicionQuestions,
  ...m2ProbabilidadReglasProbabilidadQuestions,
  ...m2ProbabilidadTablasGraficosQuestions,
  ...m2ProbabilidadMedidasDispersionQuestions,
  ...m2ProbabilidadCombinatoriaQuestions
];
