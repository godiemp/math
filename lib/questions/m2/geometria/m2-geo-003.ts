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
  },
  {
    id: 'm2-geo-trig-app-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Desde un punto en el suelo, el ángulo de elevación a la cima de un edificio es 30°. Si el observador está a 50 m del edificio, ¿cuál es la altura del edificio? (usar $\\tan(30°) \\approx 0.577$)',
    questionLatex: '\\text{Ángulo elevación 30°, distancia 50 m. ¿Altura edificio? (usar } \\tan(30^\\circ) \\approx 0.577)',
    options: ['$25$ m', '$28.9$ m', '$43.3$ m', '$50$ m'],
    optionsLatex: ['25\\text{ m}', '28.9\\text{ m}', '43.3\\text{ m}', '50\\text{ m}'],
    correctAnswer: 1,
    explanation: 'tan(30°) = h/50, entonces h = 50 × 0.577 ≈ 28.9 m',
    explanationLatex: '\\tan(30^\\circ) = \\frac{h}{50} \\rightarrow h = 50 \\times 0.577 \\approx 28.9\\text{ m}',
    difficulty: 'hard',
    skills: ['trigonometria-problemas-elevacion-depresion', 'geometria-trigonometria', 'trigonometria-tangente', 'algebra-despeje', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-trig-app-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un avión vuela a 3000 m de altura. Desde un punto en tierra, el ángulo de elevación al avión es 45°. ¿A qué distancia horizontal está el avión del observador?',
    questionLatex: '\\text{Avión a 3000 m, ángulo 45°. ¿Distancia horizontal?}',
    options: ['$1500$ m', '$2121$ m', '$3000$ m', '$4243$ m'],
    optionsLatex: ['1500\\text{ m}', '2121\\text{ m}', '3000\\text{ m}', '4243\\text{ m}'],
    correctAnswer: 2,
    explanation: 'Con ángulo de 45°, tan(45°) = 1, entonces la distancia horizontal = altura = 3000 m',
    explanationLatex: '\\tan(45^\\circ) = \\frac{3000}{d} = 1 \\rightarrow d = 3000\\text{ m}',
    difficulty: 'medium',
    skills: ['trigonometria-problemas-altura-distancia', 'trigonometria-problemas-elevacion-depresion', 'geometria-trigonometria', 'trigonometria-angulos-notables', 'algebra-despeje']
  },
  // Subsection A: Problemas de altura y distancia
  {
    id: 'm2-geo-trig-dist-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un árbol proyecta una sombra de 15 m cuando el ángulo de elevación del sol es 60°. ¿Cuál es la altura del árbol? (Usa $\\tan(60°) \\approx 1.732$)',
    questionLatex: '\\text{Sombra 15 m, ángulo sol 60°. ¿Altura árbol? (} \\tan(60^\\circ) \\approx 1.732)',
    options: ['$15$ m', '$20$ m', '$25.98$ m', '$30$ m'],
    optionsLatex: ['15\\text{ m}', '20\\text{ m}', '25.98\\text{ m}', '30\\text{ m}'],
    correctAnswer: 2,
    explanation: 'tan(60°) = h/15, entonces h = 15 × 1.732 ≈ 25.98 m',
    explanationLatex: '\\tan(60^\\circ) = \\frac{h}{15} \\rightarrow h = 15 \\times 1.732 \\approx 25.98\\text{ m}',
    difficulty: 'medium',
    skills: ['trigonometria-problemas-altura-distancia', 'geometria-trigonometria', 'trigonometria-tangente', 'algebra-despeje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-trig-dist-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Dos edificios están separados por 80 m. Desde la azotea del primero (altura 50 m), el ángulo de depresión hacia la base del segundo es θ. ¿Cuál es tan(θ)?',
    questionLatex: '\\text{Edificios separados 80 m, altura 50 m. ¿} \\tan(\\theta)?',
    options: ['$0.5$', '$0.625$', '$0.8$', '$1.6$'],
    optionsLatex: ['0.5', '0.625', '0.8', '1.6'],
    correctAnswer: 1,
    explanation: 'tan(θ) = cateto opuesto / cateto adyacente = 50/80 = 0.625',
    explanationLatex: '\\tan(\\theta) = \\frac{50}{80} = \\frac{5}{8} = 0.625',
    difficulty: 'hard',
    skills: ['trigonometria-problemas-altura-distancia', 'trigonometria-problemas-elevacion-depresion', 'geometria-trigonometria', 'trigonometria-tangente', 'numeros-fracciones']
  },
  // Subsection B: Ángulos de elevación y depresión
  {
    id: 'm2-geo-elev-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Desde la cima de un faro de 40 m de altura, el ángulo de depresión hacia un barco es 30°. ¿A qué distancia del faro está el barco? (Usa $\\tan(30°) \\approx 0.577$)',
    questionLatex: '\\text{Faro 40 m, ángulo depresión 30°. ¿Distancia barco? (} \\tan(30^\\circ) \\approx 0.577)',
    options: ['$23$ m', '$46.2$ m', '$69.3$ m', '$80$ m'],
    optionsLatex: ['23\\text{ m}', '46.2\\text{ m}', '69.3\\text{ m}', '80\\text{ m}'],
    correctAnswer: 2,
    explanation: 'Ángulo de depresión = ángulo de elevación alterno. tan(30°) = 40/d, entonces d = 40/0.577 ≈ 69.3 m',
    explanationLatex: '\\tan(30^\\circ) = \\frac{40}{d} \\rightarrow d = \\frac{40}{0.577} \\approx 69.3\\text{ m}',
    difficulty: 'hard',
    skills: ['trigonometria-problemas-elevacion-depresion', 'geometria-trigonometria', 'trigonometria-tangente', 'algebra-despeje', 'numeros-division', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-elev-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un observador en un globo a 200 m de altura ve un automóvil con un ángulo de depresión de 45°. ¿A qué distancia horizontal está el automóvil?',
    questionLatex: '\\text{Globo a 200 m, ángulo depresión 45°. ¿Distancia horizontal?}',
    options: ['$100$ m', '$141$ m', '$200$ m', '$283$ m'],
    optionsLatex: ['100\\text{ m}', '141\\text{ m}', '200\\text{ m}', '283\\text{ m}'],
    correctAnswer: 2,
    explanation: 'Con ángulo de 45°, tan(45°) = 1, entonces distancia horizontal = altura = 200 m',
    explanationLatex: '\\tan(45^\\circ) = \\frac{200}{d} = 1 \\rightarrow d = 200\\text{ m}',
    difficulty: 'medium',
    skills: ['trigonometria-problemas-elevacion-depresion', 'geometria-trigonometria', 'trigonometria-angulos-notables', 'algebra-despeje']
  },
  // Subsection C: Aplicaciones en navegación
  {
    id: 'm2-geo-nav-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un barco navega 50 km hacia el este y luego 30 km hacia el norte. ¿Cuál es la distancia en línea recta desde el punto de partida? (Aproxima al km más cercano)',
    questionLatex: '\\text{Barco: 50 km este, 30 km norte. ¿Distancia recta?}',
    options: ['$58$ km', '$60$ km', '$65$ km', '$80$ km'],
    optionsLatex: ['58\\text{ km}', '60\\text{ km}', '65\\text{ km}', '80\\text{ km}'],
    correctAnswer: 0,
    explanation: 'Usamos Pitágoras: d² = 50² + 30² = 2500 + 900 = 3400, entonces d ≈ 58.3 km',
    explanationLatex: 'd = \\sqrt{50^2 + 30^2} = \\sqrt{3400} \\approx 58\\text{ km}',
    difficulty: 'medium',
    skills: ['trigonometria-problemas-navegacion', 'geometria-pitagoras', 'geometria-aplicaciones', 'numeros-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-nav-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un avión vuela con rumbo N 30° E durante 100 km (30° al este del norte). ¿Cuántos km hacia el este ha viajado? (Usa $\\sin(30°) = 0.5$)',
    questionLatex: '\\text{Avión: rumbo N 30° E, 100 km. ¿Distancia este? (} \\sin(30^\\circ) = 0.5)',
    options: ['$30$ km', '$50$ km', '$70$ km', '$87$ km'],
    optionsLatex: ['30\\text{ km}', '50\\text{ km}', '70\\text{ km}', '87\\text{ km}'],
    correctAnswer: 1,
    explanation: 'Componente este = 100 × sin(30°) = 100 × 0.5 = 50 km',
    explanationLatex: '\\text{Este} = 100 \\times \\sin(30^\\circ) = 100 \\times 0.5 = 50\\text{ km}',
    difficulty: 'hard',
    skills: ['trigonometria-problemas-navegacion', 'geometria-trigonometria', 'trigonometria-seno', 'geometria-vectores', 'numeros-operaciones-basicas']
  },
  // Subsection D: Aplicaciones en arquitectura e ingeniería
  {
    id: 'm2-geo-arq-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un arquitecto diseña un techo inclinado con ángulo de 25° respecto a la horizontal. Si el techo cubre una distancia horizontal de 12 m, ¿cuál es la longitud del techo? (Usa $\\cos(25°) \\approx 0.906$)',
    questionLatex: '\\text{Techo ángulo 25°, distancia horizontal 12 m. ¿Longitud techo? (} \\cos(25^\\circ) \\approx 0.906)',
    options: ['$10.9$ m', '$12$ m', '$13.2$ m', '$15$ m'],
    optionsLatex: ['10.9\\text{ m}', '12\\text{ m}', '13.2\\text{ m}', '15\\text{ m}'],
    correctAnswer: 2,
    explanation: 'cos(25°) = 12/L, entonces L = 12/0.906 ≈ 13.2 m',
    explanationLatex: '\\cos(25^\\circ) = \\frac{12}{L} \\rightarrow L = \\frac{12}{0.906} \\approx 13.2\\text{ m}',
    difficulty: 'hard',
    skills: ['trigonometria-problemas-arquitectura', 'geometria-trigonometria', 'trigonometria-coseno', 'algebra-despeje', 'numeros-division', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-arq-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Una rampa de acceso para sillas de ruedas debe tener una inclinación máxima de 5°. Si la rampa debe salvar una altura de 1 m, ¿cuál es la longitud mínima de la rampa? (Usa $\\sin(5°) \\approx 0.087$)',
    questionLatex: '\\text{Rampa ángulo 5°, altura 1 m. ¿Longitud mínima? (} \\sin(5^\\circ) \\approx 0.087)',
    options: ['$8.7$ m', '$10$ m', '$11.5$ m', '$12$ m'],
    optionsLatex: ['8.7\\text{ m}', '10\\text{ m}', '11.5\\text{ m}', '12\\text{ m}'],
    correctAnswer: 2,
    explanation: 'sin(5°) = 1/L, entonces L = 1/0.087 ≈ 11.5 m',
    explanationLatex: '\\sin(5^\\circ) = \\frac{1}{L} \\rightarrow L = \\frac{1}{0.087} \\approx 11.5\\text{ m}',
    difficulty: 'hard',
    skills: ['trigonometria-problemas-arquitectura', 'geometria-trigonometria', 'trigonometria-seno', 'algebra-despeje', 'numeros-division', 'numeros-operaciones-basicas']
  }
];
