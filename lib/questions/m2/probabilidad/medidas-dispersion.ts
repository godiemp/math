import { Question } from '../../../types';

export const m2ProbabilidadMedidasDispersionQuestions: Question[] = [
  {
    id: 'm2-7',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En el conjunto de datos {2, 4, 5, 7, 9, 10, 12}, el rango intercuartílico (IQR) es:',
    questionLatex: '\\text{En el conjunto de datos } \\{2, 4, 5, 7, 9, 10, 12\\}\\text{, el rango intercuartílico (IQR) es:}',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    explanation: 'Q1 = 4, Q3 = 10. IQR = Q3 - Q1 = 10 - 4 = 6',
    explanationLatex: 'Q_1 = 4, \\quad Q_3 = 10 \\quad \\Rightarrow \\quad \\text{IQR} = Q_3 - Q_1 = 10 - 4 = 6',
    difficulty: 'hard',
    skills: ['estadistica-cuartiles', 'estadistica-rango-intercuartilico', 'estadistica-mediana', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-prob-md-1',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En el conjunto {10, 10, 15, 20, 30}, ¿cuál es el rango?',
    questionLatex: '\\text{En el conjunto } \\{10, 10, 15, 20, 30\\}\\text{, ¿cuál es el rango?}',
    options: ['10', '15', '20', '25'],
    correctAnswer: 2,
    explanation: 'El rango es la diferencia entre el valor máximo y el mínimo:',
    explanationLatex: '\\text{Rango} = \\text{Máx} - \\text{Mín} = 30 - 10 = 20',
    difficulty: 'medium',
    skills: ['estadistica-rango', 'estadistica-medidas-dispersion', 'numeros-operaciones-basicas']
  }
];
