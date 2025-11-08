import { m1ProbabilidadTablasGraficosQuestions } from './tablas-graficos';
import { m1ProbabilidadTendenciaCentralQuestions } from './tendencia-central';
import { m1ProbabilidadMedidasPosicionQuestions } from './medidas-posicion';
import { m1ProbabilidadReglasProbabilidadQuestions } from './reglas-probabilidad';

// Export individual question arrays
export { m1ProbabilidadTablasGraficosQuestions } from './tablas-graficos';
export { m1ProbabilidadTendenciaCentralQuestions } from './tendencia-central';
export { m1ProbabilidadMedidasPosicionQuestions } from './medidas-posicion';
export { m1ProbabilidadReglasProbabilidadQuestions } from './reglas-probabilidad';

// Export combined array for backward compatibility
export const m1ProbabilidadQuestions = [
  ...m1ProbabilidadReglasProbabilidadQuestions,
  ...m1ProbabilidadTablasGraficosQuestions,
  ...m1ProbabilidadTendenciaCentralQuestions,
  ...m1ProbabilidadMedidasPosicionQuestions
];
