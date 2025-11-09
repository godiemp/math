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
  },
  {
    id: 'm2-geo-trans-3',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si el punto B(-2, 5) se traslada 3 unidades a la derecha y 2 unidades hacia abajo, ¿cuáles son las nuevas coordenadas?',
    questionLatex: '\\text{Si } B(-2, 5) \\text{ se traslada 3 unidades derecha y 2 abajo, ¿nuevas coordenadas?}',
    options: ['$(1, 3)$', '$(-5, 7)$', '$(1, 7)$', '$(-5, 3)$'],
    optionsLatex: ['(1, 3)', '(-5, 7)', '(1, 7)', '(-5, 3)'],
    correctAnswer: 0,
    explanation: 'Traslación: sumamos el desplazamiento a cada coordenada',
    explanationLatex: 'B(-2, 5) + (3, -2) = (-2+3, 5-2) = (1, 3)',
    difficulty: 'medium',
    skills: ['geometria-transformaciones', 'geometria-traslacion', 'geometria-plano-cartesiano', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-trans-4',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si el punto C(4, -3) se refleja respecto al eje y, ¿cuáles son las coordenadas del punto reflejado?',
    questionLatex: '\\text{Si } C(4, -3) \\text{ se refleja respecto al eje } y\\text{, ¿coordenadas del reflejo?}',
    options: ['$(-4, -3)$', '$(4, 3)$', '$(-4, 3)$', '$(3, -4)$'],
    optionsLatex: ['(-4, -3)', '(4, 3)', '(-4, 3)', '(3, -4)'],
    correctAnswer: 0,
    explanation: 'Al reflejar respecto al eje y, la coordenada y permanece igual y la x cambia de signo:',
    explanationLatex: 'C(4, -3) \\xrightarrow{\\text{reflejo eje } y} C\'(-4, -3)',
    difficulty: 'medium',
    skills: ['geometria-transformaciones', 'geometria-reflexion', 'geometria-plano-cartesiano']
  },
  {
    id: 'm2-geo-trans-5',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si se aplica una homotecia de razón 2 centrada en el origen al punto D(3, 4), ¿cuáles son las nuevas coordenadas?',
    questionLatex: '\\text{Homotecia de razón 2 en el origen a } D(3, 4)\\text{, ¿nuevas coordenadas?}',
    options: ['$(6, 8)$', '$(1.5, 2)$', '$(5, 6)$', '$(3, 4)$'],
    optionsLatex: ['(6, 8)', '(1.5, 2)', '(5, 6)', '(3, 4)'],
    correctAnswer: 0,
    explanation: 'Homotecia: multiplicamos cada coordenada por la razón',
    explanationLatex: 'D(3, 4) \\xrightarrow{k=2} D\'(2 \\times 3, 2 \\times 4) = (6, 8)',
    difficulty: 'hard',
    skills: ['geometria-transformaciones', 'geometria-homotecia', 'geometria-plano-cartesiano', 'numeros-operaciones-basicas']
  }
];
