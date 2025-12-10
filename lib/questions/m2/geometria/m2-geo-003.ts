import { Question } from '../../../types';

/**
 * M2-GEO-003: Aplicaciones de razones trigonométricas en problemas cotidianos
 *
 * Subsections:
 * A. Problemas de altura y distancia
 *    Habilidades: trigonometria-problemas-altura-distancia
 * B. Ángulos de elevación y depresión
 *    Habilidades: trigonometria-problemas-elevacion-depresion
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
    questionLatex: '\\text{Una escalera de 10 m se apoya contra una pared. Si la base está a 6 m de la pared, ¿a qué altura llega la escalera?}',
    options: ['6 m', '7 m', '8 m', '9 m'],
    correctAnswer: 2,
    explanation: 'h^2 + 6^2 = 10^2 \\rightarrow h^2 + 36 = 100 \\rightarrow h^2 = 64 \\rightarrow h = 8 \\text{ m}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['geometria-pitagoras', 'geometria-triangulos', 'geometria-aplicaciones', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-pit-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'c^2 = a^2 + b^2',
    questionLatex: '\\text{Un carpintero está construyendo un marco triangular para una ventana. Los dos lados perpendiculares del marco miden 9 cm y 12 cm respectivamente. Para cortar la pieza diagonal que completará el marco, necesita saber su longitud exacta. ¿Cuánto mide esta pieza diagonal?}',
    options: ['13 cm', '15 cm', '17 cm', '21 cm'],
    correctAnswer: 1,
    explanation: 'c^2 = 9^2 + 12^2 = 81 + 144 = 225 \\rightarrow c = \\sqrt{225} = 15 \\text{ cm}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['geometria-pitagoras', 'geometria-triangulos', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-pit-3',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'd^2 = a^2 + b^2',
    questionLatex: '\\text{Un diseñador de interiores está planificando la colocación de una alfombra rectangular en una sala. Sabe que la diagonal de la alfombra mide 10 cm y uno de sus lados mide 8 cm. Para verificar que la alfombra cabe en el espacio disponible, necesita conocer la medida del otro lado. ¿Cuánto mide el otro lado de la alfombra?}',
    options: ['4 cm', '5 cm', '6 cm', '7 cm'],
    correctAnswer: 2,
    explanation: '10^2 = 8^2 + b^2 \\rightarrow 100 = 64 + b^2 \\rightarrow b^2 = 36 \\rightarrow b = 6 \\text{ cm}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['geometria-pitagoras', 'geometria-rectangulo', 'geometria-aplicaciones', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-trig-app-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Desde un punto en el suelo, el ángulo de elevación a la cima de un edificio es 30°. Si el observador está a 50 m del edificio, ¿cuál es la altura del edificio? (usar } \\tan(30^\\circ) \\approx 0.577)',
    options: ['25\\text{ m}', '28.9\\text{ m}', '43.3\\text{ m}', '50\\text{ m}'],
    correctAnswer: 1,
    explanation: '\\tan(30^\\circ) = \\frac{h}{50} \\rightarrow h = 50 \\times 0.577 \\approx 28.9\\text{ m}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['trigonometria-problemas-elevacion-depresion', 'geometria-trigonometria', 'trigonometria-tangente', 'algebra-despeje', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-trig-app-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un avión vuela a 3000 m de altura. Desde un punto en tierra, el ángulo de elevación al avión es 45°. ¿A qué distancia horizontal está el avión del observador?}',
    options: ['1500\\text{ m}', '2121\\text{ m}', '3000\\text{ m}', '4243\\text{ m}'],
    correctAnswer: 2,
    explanation: '\\tan(45^\\circ) = \\frac{3000}{d} = 1 \\rightarrow d = 3000\\text{ m}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['trigonometria-problemas-altura-distancia', 'trigonometria-problemas-elevacion-depresion', 'geometria-trigonometria', 'trigonometria-angulos-notables', 'algebra-despeje']
  },
  // Subsection A: Problemas de altura y distancia
  {
    id: 'm2-geo-trig-dist-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un árbol proyecta una sombra de 15 m cuando el ángulo de elevación del sol es 60°. ¿Cuál es la altura del árbol? (Usa } \\tan(60^\\circ) \\approx 1.732)',
    options: ['15\\text{ m}', '20\\text{ m}', '25.98\\text{ m}', '30\\text{ m}'],
    correctAnswer: 2,
    explanation: '\\tan(60^\\circ) = \\frac{h}{15} \\rightarrow h = 15 \\times 1.732 \\approx 25.98\\text{ m}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['trigonometria-problemas-altura-distancia', 'geometria-trigonometria', 'trigonometria-tangente', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-trig-dist-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Dos edificios están separados por 80 m. Desde la azotea del primero (altura 50 m), el ángulo de depresión hacia la base del segundo es } \\theta\\text{. ¿Cuál es } \\tan(\\theta)?',
    options: ['0.5', '0.625', '0.8', '1.6'],
    correctAnswer: 1,
    explanation: '\\tan(\\theta) = \\frac{50}{80} = \\frac{5}{8} = 0.625',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['trigonometria-problemas-altura-distancia', 'trigonometria-problemas-elevacion-depresion', 'geometria-trigonometria', 'trigonometria-tangente', 'numeros-fracciones']
  },
  // Subsection B: Ángulos de elevación y depresión
  {
    id: 'm2-geo-elev-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Desde la cima de un faro de 40 m de altura, el ángulo de depresión hacia un barco es 30°. ¿A qué distancia del faro está el barco? (Usa } \\tan(30^\\circ) \\approx 0.577)',
    options: ['23\\text{ m}', '46.2\\text{ m}', '69.3\\text{ m}', '80\\text{ m}'],
    correctAnswer: 2,
    explanation: '\\tan(30^\\circ) = \\frac{40}{d} \\rightarrow d = \\frac{40}{0.577} \\approx 69.3\\text{ m}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['trigonometria-problemas-elevacion-depresion', 'geometria-trigonometria', 'trigonometria-tangente', 'algebra-despeje', 'numeros-division', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-elev-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un observador en un globo a 200 m de altura ve un automóvil con un ángulo de depresión de 45°. ¿A qué distancia horizontal está el automóvil?}',
    options: ['100\\text{ m}', '141\\text{ m}', '200\\text{ m}', '283\\text{ m}'],
    correctAnswer: 2,
    explanation: '\\tan(45^\\circ) = \\frac{200}{d} = 1 \\rightarrow d = 200\\text{ m}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['trigonometria-problemas-elevacion-depresion', 'geometria-trigonometria', 'trigonometria-angulos-notables', 'algebra-despeje']
  },
  // Subsection C: Aplicaciones en navegación
  {
    id: 'm2-geo-nav-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un barco navega 50 km hacia el este y luego 30 km hacia el norte. ¿Cuál es la distancia en línea recta desde el punto de partida? (Aproxima al km más cercano)}',
    options: ['58\\text{ km}', '60\\text{ km}', '65\\text{ km}', '80\\text{ km}'],
    correctAnswer: 0,
    explanation: 'd = \\sqrt{50^2 + 30^2} = \\sqrt{3400} \\approx 58\\text{ km}',
    difficulty: 'medium',
    difficultyScore: 0.55,
    skills: ['trigonometria-problemas-navegacion', 'geometria-pitagoras', 'geometria-aplicaciones', 'numeros-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-nav-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un avión vuela con rumbo N 30° E durante 100 km (30° al este del norte). ¿Cuántos km hacia el este ha viajado? (Usa } \\sin(30^\\circ) = 0.5)',
    options: ['30\\text{ km}', '50\\text{ km}', '70\\text{ km}', '87\\text{ km}'],
    correctAnswer: 1,
    explanation: '\\text{Este} = 100 \\times \\sin(30^\\circ) = 100 \\times 0.5 = 50\\text{ km}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['trigonometria-problemas-navegacion', 'geometria-trigonometria', 'trigonometria-seno', 'geometria-vectores', 'numeros-operaciones-basicas']
  },
  // Subsection D: Aplicaciones en arquitectura e ingeniería
  {
    id: 'm2-geo-arq-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Un arquitecto diseña un techo inclinado con ángulo de 25° respecto a la horizontal. Si el techo cubre una distancia horizontal de 12 m, ¿cuál es la longitud del techo? (Usa } \\cos(25^\\circ) \\approx 0.906)',
    options: ['10.9\\text{ m}', '12\\text{ m}', '13.2\\text{ m}', '15\\text{ m}'],
    correctAnswer: 2,
    explanation: '\\cos(25^\\circ) = \\frac{12}{L} \\rightarrow L = \\frac{12}{0.906} \\approx 13.2\\text{ m}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['trigonometria-problemas-arquitectura', 'geometria-trigonometria', 'trigonometria-coseno', 'algebra-despeje', 'numeros-division', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-arq-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    questionLatex: '\\text{Una rampa de acceso para sillas de ruedas debe tener una inclinación máxima de 5°. Si la rampa debe salvar una altura de 1 m, ¿cuál es la longitud mínima de la rampa? (Usa } \\sin(5^\\circ) \\approx 0.087)',
    options: ['8.7\\text{ m}', '10\\text{ m}', '11.5\\text{ m}', '12\\text{ m}'],
    correctAnswer: 2,
    explanation: '\\sin(5^\\circ) = \\frac{1}{L} \\rightarrow L = \\frac{1}{0.087} \\approx 11.5\\text{ m}',
    difficulty: 'hard',
    difficultyScore: 0.75,
    skills: ['trigonometria-problemas-arquitectura', 'geometria-trigonometria', 'trigonometria-seno', 'algebra-despeje', 'numeros-division', 'numeros-operaciones-basicas']
  }
];
