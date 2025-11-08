import { Question } from '../../../types';

export const m2GeometriaTransformacionesQuestions: Question[] = [
  {
    id: 'm2-geo-trans-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si el punto A(3, 4) se refleja respecto al eje x, ¿cuáles son las coordenadas del punto reflejado?',
    questionLatex: '\\text{Si el punto } A(3, 4) \\text{ se refleja respecto al eje } x\\text{, ¿coordenadas del punto reflejado?}',
    options: ['(3, -4)', '(-3, 4)', '(-3, -4)', '(4, 3)'],
    correctAnswer: 0,
    explanation: 'Al reflejar respecto al eje x, la coordenada x permanece igual y la coordenada y cambia de signo:',
    explanationLatex: 'A(3, 4) \\xrightarrow{\\text{reflejo eje } x} A\'(3, -4)',
    difficulty: 'medium',
    skills: ['geometria-transformaciones', 'geometria-reflexion', 'geometria-plano-cartesiano']
  }
];
