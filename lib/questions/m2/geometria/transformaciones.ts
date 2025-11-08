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
  },
  {
    id: 'm2-geo-trans-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si un punto (x, y) se rota 90° en sentido antihorario respecto al origen, las nuevas coordenadas son:',
    questionLatex: '\\text{Si un punto } (x, y) \\text{ se rota } 90^\\circ \\text{ en sentido antihorario respecto al origen, las nuevas coordenadas son:}',
    options: ['$(-y, x)$', '$(y, -x)$', '$(-x, -y)$', '$(x, -y)$'],
    optionsLatex: ['(-y, x)', '(y, -x)', '(-x, -y)', '(x, -y)'],
    correctAnswer: 0,
    explanation: 'Una rotación de 90° antihoraria transforma (x, y) en (-y, x)',
    explanationLatex: '(x, y) \\xrightarrow{90^\\circ} (-y, x)',
    difficulty: 'hard',
    skills: ['geometria-transformaciones', 'geometria-rotacion', 'geometria-plano-cartesiano']
  }
];
