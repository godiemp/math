import { Question } from '../../../types';

/**
 * M2-GEO-003: Aplicaciones de razones trigonométricas en problemas cotidianos
 *
 * Subsections:
 * A. Problemas de altura y distancia
 *    Habilidades: trigonometria-problemas-altura
 * B. Ángulos de elevación y depresión
 *    Habilidades: trigonometria-problemas-angulos
 * C. Aplicaciones en navegación
 *    Habilidades: trigonometria-problemas-navegacion
 * D. Aplicaciones en arquitectura e ingeniería
 *    Habilidades: trigonometria-problemas-arquitectura
 */

export const m2Geo003Questions: Question[] = [
  {
    id: 'm2-geo-pit-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Una escalera de 10 m se apoya contra una pared. Si la base está a 6 m de la pared, ¿a qué altura llega la escalera?',
    questionLatex: '\\text{Una escalera de 10 m se apoya contra una pared. Si la base está a 6 m de la pared, ¿a qué altura llega la escalera?}',
    options: ['6 m', '7 m', '8 m', '9 m'],
    correctAnswer: 2,
    explanation: 'Usando el teorema de Pitágoras: h² + 6² = 10²',
    explanationLatex: 'h^2 + 6^2 = 10^2 \\rightarrow h^2 + 36 = 100 \\rightarrow h^2 = 64 \\rightarrow h = 8 \\text{ m}',
    difficulty: 'medium',
    skills: ['geometria-pitagoras', 'geometria-triangulos', 'geometria-aplicaciones', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-pit-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un triángulo rectángulo tiene catetos de 9 cm y 12 cm. ¿Cuánto mide la hipotenusa?',
    questionLatex: '\\text{Un triángulo rectángulo tiene catetos de 9 cm y 12 cm. ¿Cuánto mide la hipotenusa?}',
    options: ['13 cm', '15 cm', '17 cm', '21 cm'],
    correctAnswer: 1,
    explanation: 'Usando el teorema de Pitágoras: c² = a² + b²',
    explanationLatex: 'c^2 = 9^2 + 12^2 = 81 + 144 = 225 \\rightarrow c = \\sqrt{225} = 15 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-pitagoras', 'geometria-triangulos', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-pit-3',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'La diagonal de un rectángulo mide 10 cm y uno de sus lados mide 8 cm. ¿Cuánto mide el otro lado?',
    questionLatex: '\\text{Diagonal de rectángulo = 10 cm, un lado = 8 cm. ¿Otro lado?}',
    options: ['4 cm', '5 cm', '6 cm', '7 cm'],
    correctAnswer: 2,
    explanation: 'La diagonal forma un triángulo rectángulo con los lados:',
    explanationLatex: '10^2 = 8^2 + b^2 \\rightarrow 100 = 64 + b^2 \\rightarrow b^2 = 36 \\rightarrow b = 6 \\text{ cm}',
    difficulty: 'hard',
    skills: ['geometria-pitagoras', 'geometria-rectangulo', 'geometria-aplicaciones', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  }
];
