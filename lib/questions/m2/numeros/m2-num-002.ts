import { Question } from '../../../types';

/**
 * M2-NUM-002: Problemas que involucren números reales en diversos contextos
 *
 * Subsections:
 * A. Problemas con raíces y radicales
 *    Habilidades: numeros-reales-problemas-raices
 * B. Problemas de medición con irracionales
 *    Habilidades: numeros-reales-problemas-medicion
 * C. Problemas de aproximación y error
 *    Habilidades: numeros-reales-problemas-aproximacion
 * D. Aplicaciones en ciencias y tecnología
 *    Habilidades: numeros-reales-problemas-ciencias
 */

export const m2Num002Questions: Question[] = [
  {
    id: 'm2-num-prop-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si 5 obreros construyen un muro en 12 días, ¿cuántos días tardarán 8 obreros?}',
    options: ['7.5 días', '8 días', '9.6 días', '19.2 días'],
    correctAnswer: 0,
    explanation: '5 \\times 12 = 8 \\times x \\quad \\Rightarrow \\quad x = \\frac{60}{8} = 7.5 \\text{ días}',
    difficulty: 'medium',
    skills: ['numeros-proporcionalidad', 'numeros-proporcionalidad-inversa', 'numeros-regla-tres', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-prop-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Una llave llena un tanque en 6 horas. ¿Cuánto tardan 3 llaves simultáneamente?}',
    options: ['2 horas', '3 horas', '4 horas', '18 horas'],
    correctAnswer: 0,
    explanation: '1 \\times 6 = 3 \\times x \\quad \\Rightarrow \\quad x = \\frac{6}{3} = 2 \\text{ horas}',
    difficulty: 'hard',
    skills: ['numeros-proporcionalidad', 'numeros-proporcionalidad-inversa', 'numeros-regla-tres', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-real-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'd = l\\sqrt{2} \\Rightarrow l = \\frac{d}{\\sqrt{2}}',
    questionLatex: '\\text{Un diseñador de interiores está planificando la instalación de un espejo cuadrado en la pared de un salón. El cliente le indica que la diagonal del espejo debe medir exactamente } 10\\sqrt{2} \\text{ centímetros para que encaje perfectamente en el espacio disponible. El diseñador sabe que la diagonal de un cuadrado se relaciona con el lado mediante la fórmula } d = l\\sqrt{2}\\text{. Para calcular cuánto vidrio necesita pedir, el diseñador debe determinar el área del espejo. ¿Cuál es el área del espejo cuadrado?}',
    options: ['100\\text{ cm}^2', '200\\text{ cm}^2', '100\\sqrt{2}\\text{ cm}^2', '400\\text{ cm}^2'],
    correctAnswer: 0,
    explanation: 'd = l\\sqrt{2} \\rightarrow l = \\frac{10\\sqrt{2}}{\\sqrt{2}} = 10\\text{ cm}. \\quad A = l^2 = 10^2 = 100\\text{ cm}^2',
    difficulty: 'hard',
    skills: ['numeros-reales', 'numeros-reales-problemas-raices', 'geometria-area', 'numeros-raices', 'numeros-racionalizacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-real-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: '\\text{Error absoluto} = |\\text{valor exacto} - \\text{valor aproximado}|',
    questionLatex: '\\text{Un estudiante de física está calculando el perímetro de un círculo y utiliza } \\pi \\approx 3.14 \\text{ en lugar del valor más preciso } \\pi \\approx 3.14159\\text{. Para evaluar qué tan precisa es su aproximación, necesita calcular el error absoluto. ¿Cuál es el error absoluto de usar 3.14 en lugar de 3.14159?}',
    options: ['0.00159', '0.0159', '0.159', '1.59'],
    correctAnswer: 0,
    explanation: '\\text{Error absoluto} = |3.14159 - 3.14| = 0.00159',
    difficulty: 'medium',
    skills: ['numeros-reales', 'numeros-reales-problemas-aproximacion', 'numeros-irracionales', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-real-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'A = \\pi r^2',
    questionLatex: '\\text{Una empresa de jardinería está diseñando una fuente circular para el patio central de un edificio corporativo. El arquitecto especifica que el radio de la fuente debe ser exactamente } \\sqrt{50} \\text{ centímetros para que sea proporcional al espacio disponible. El equipo de construcción necesita calcular el área de la base circular para determinar la cantidad de material impermeabilizante que deben comprar. Usando la fórmula } A = \\pi r^2\\text{, ¿cuál es el área de la base de la fuente en su forma simplificada?}',
    options: ['50\\pi\\text{ cm}^2', '25\\pi\\text{ cm}^2', '10\\pi\\sqrt{5}\\text{ cm}^2', '100\\pi\\text{ cm}^2'],
    correctAnswer: 0,
    explanation: 'A = \\pi r^2 = \\pi(\\sqrt{50})^2 = 50\\pi\\text{ cm}^2',
    difficulty: 'medium',
    skills: ['numeros-reales', 'numeros-reales-problemas-raices', 'geometria-area-circulo', 'numeros-raices', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  // Subsection B: Problemas de medición con irracionales
  {
    id: 'm2-num-med-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'A = l^2 \\Rightarrow l = \\sqrt{A}',
    questionLatex: '\\text{Un agrimensor está midiendo un terreno cuadrado cuya área es de 50 metros cuadrados. El propietario necesita conocer la longitud exacta de cada lado para construir una cerca. ¿Cuál es la longitud del lado del terreno expresada en su forma más simple?}',
    options: ['5\\text{ m}', '5\\sqrt{2}\\text{ m}', '10\\text{ m}', '25\\text{ m}'],
    correctAnswer: 1,
    explanation: 'l = \\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}\\text{ m}',
    difficulty: 'medium',
    skills: ['numeros-reales-problemas-medicion', 'geometria-area', 'numeros-raices', 'numeros-simplificacion-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-med-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Una escalera de 5 m se apoya en una pared. Si su base está a } \\sqrt{7} \\text{ m de la pared, ¿a qué altura llega?}',
    options: ['3\\sqrt{2}\\text{ m}', '\\sqrt{18}\\text{ m}', '4\\text{ m}', '6\\text{ m}'],
    correctAnswer: 1,
    explanation: 'h = \\sqrt{25 - 7} = \\sqrt{18} = 3\\sqrt{2}\\text{ m}',
    difficulty: 'hard',
    skills: ['numeros-reales-problemas-medicion', 'geometria-pitagoras', 'numeros-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-med-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'A = \\pi r^2 \\Rightarrow r = \\sqrt{\\frac{A}{\\pi}}',
    questionLatex: '\\text{Un diseñador de jardines está planificando una fuente circular cuya área debe ser exactamente } 18\\pi \\text{ cm}^2\\text{. Para ordenar los materiales correctos, necesita conocer el radio exacto de la fuente. ¿Cuál es el radio expresado en su forma más simple?}',
    options: ['3\\text{ cm}', '3\\sqrt{2}\\text{ cm}', '6\\text{ cm}', '9\\text{ cm}'],
    correctAnswer: 1,
    explanation: 'r = \\sqrt{18} = \\sqrt{9 \\times 2} = 3\\sqrt{2}\\text{ cm}',
    difficulty: 'medium',
    skills: ['numeros-reales-problemas-medicion', 'geometria-area-circulo', 'numeros-raices', 'numeros-simplificacion-raices']
  },
  {
    id: 'm2-num-med-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'd = a\\sqrt{3}',
    questionLatex: '\\text{Un fabricante de cajas está diseñando un empaque cúbico. La diagonal espacial del cubo (de un vértice al opuesto) mide } 6\\sqrt{3} \\text{ cm. Para cortar las piezas de cartón, el fabricante necesita conocer la medida de cada arista del cubo. ¿Cuál es la longitud de la arista?}',
    options: ['3\\text{ cm}', '6\\text{ cm}', '9\\text{ cm}', '12\\text{ cm}'],
    correctAnswer: 1,
    explanation: 'd = a\\sqrt{3} \\rightarrow 6\\sqrt{3} = a\\sqrt{3} \\rightarrow a = 6\\text{ cm}',
    difficulty: 'hard',
    skills: ['numeros-reales-problemas-medicion', 'geometria-volumen', 'numeros-raices', 'algebra-despeje']
  },
  // Subsection C: Problemas de aproximación y error
  {
    id: 'm2-num-aprox-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: '\\text{Error relativo} = \\frac{|\\text{exacto} - \\text{aprox}|}{|\\text{exacto}|} \\times 100\\%',
    questionLatex: '\\text{Un ingeniero utiliza } \\sqrt{2} \\approx 1.41 \\text{ en sus cálculos en lugar del valor más preciso } 1.41421\\text{. Para verificar la calidad de su aproximación, necesita calcular el error relativo porcentual. ¿Cuál es aproximadamente este error?}',
    options: ['\\approx 0.03\\%', '\\approx 0.3\\%', '\\approx 3\\%', '\\approx 0.003\\%'],
    correctAnswer: 1,
    explanation: '\\frac{|1.41421 - 1.41|}{1.41421} \\approx 0.003 \\approx 0.3\\%',
    difficulty: 'hard',
    skills: ['numeros-reales-problemas-aproximacion', 'numeros-decimales', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-aprox-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'x \\pm \\delta = [x - \\delta, x + \\delta]',
    questionLatex: '\\text{Un técnico de laboratorio mide la longitud de una pieza y reporta el resultado como } 15.3 \\pm 0.2 \\text{ cm, indicando la incertidumbre de la medición. ¿Cuál es el intervalo de valores posibles para la longitud real de la pieza?}',
    options: ['[15.1, 15.5]', '[15.0, 15.6]', '[15.2, 15.4]', '[14.8, 15.8]'],
    correctAnswer: 0,
    explanation: '15.3 \\pm 0.2 \\Rightarrow [15.1, 15.5]',
    difficulty: 'easy',
    skills: ['numeros-reales-problemas-aproximacion', 'numeros-reales-intervalos', 'numeros-decimales']
  },
  {
    id: 'm2-num-aprox-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: '\\text{Redondeo: si el siguiente dígito} \\geq 5 \\text{, se aumenta}',
    questionLatex: '\\text{Un estudiante está resolviendo un problema donde necesita calcular } \\sqrt{50}\\text{. El valor exacto es } 7.0710678...\\text{, pero debe reportar el resultado redondeado a 2 decimales. ¿Cuál es el valor redondeado?}',
    options: ['7.07', '7.08', '7.1', '7.0'],
    correctAnswer: 0,
    explanation: '7.0710... \\approx 7.07',
    difficulty: 'easy',
    skills: ['numeros-reales-problemas-aproximacion', 'numeros-reales-aproximaciones', 'numeros-decimales', 'numeros-raices']
  },
  {
    id: 'm2-num-aprox-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'A = \\pi r^2; \\quad \\text{Error} = |A_{\\text{exacto}} - A_{\\text{aprox}}|',
    questionLatex: '\\text{Un jardinero calcula el área de una fuente circular de radio 3 metros usando } \\pi \\approx 3 \\text{ en lugar del valor más preciso. Para saber cuánto material podría faltar o sobrar, necesita conocer el error absoluto en el cálculo del área. ¿Cuál es aproximadamente este error?}',
    options: ['\\approx 1.27\\text{ m}^2', '\\approx 0.27\\text{ m}^2', '\\approx 2.27\\text{ m}^2', '\\approx 4.27\\text{ m}^2'],
    correctAnswer: 0,
    explanation: '|9\\pi - 27| \\approx |28.27 - 27| \\approx 1.27\\text{ m}^2',
    difficulty: 'medium',
    skills: ['numeros-reales-problemas-aproximacion', 'geometria-area-circulo', 'numeros-irracionales', 'numeros-operaciones-basicas']
  },
  // Subsection D: Aplicaciones en ciencias y tecnología
  {
    id: 'm2-num-cienc-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'dB = 10\\log_{10}\\left(\\frac{I}{I_0}\\right)',
    questionLatex: '\\text{Un ingeniero de sonido mide la intensidad de un ruido como } I = 10^{-6} \\text{ W/m}^2\\text{. Usando la intensidad de referencia } I_0 = 10^{-12} \\text{ W/m}^2 \\text{ y la fórmula } dB = 10\\log_{10}(I/I_0)\\text{, necesita expresar este nivel en decibeles. ¿Cuántos decibeles tiene el ruido?}',
    options: ['40\\text{ dB}', '50\\text{ dB}', '60\\text{ dB}', '70\\text{ dB}'],
    correctAnswer: 2,
    explanation: 'dB = 10\\log_{10}\\left(\\frac{10^{-6}}{10^{-12}}\\right) = 10\\log_{10}(10^6) = 10 \\times 6 = 60\\text{ dB}',
    difficulty: 'hard',
    skills: ['numeros-reales-problemas-ciencias', 'logaritmos-problemas-escalas', 'logaritmos-propiedades', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-cienc-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'd = c \\times t',
    questionLatex: '\\text{Un astrónomo está explicando a sus estudiantes la unidad de distancia llamada año luz. Sabiendo que la velocidad de la luz es } c = 3 \\times 10^8 \\text{ m/s y que un año tiene aproximadamente } 3.156 \\times 10^7 \\text{ segundos, ¿cuál es la distancia que recorre la luz en un año?}',
    options: ['\\approx 9.46 \\times 10^{12}\\text{ km}', '\\approx 9.46 \\times 10^{15}\\text{ m}', '\\approx 3 \\times 10^{16}\\text{ m}', '\\approx 1 \\times 10^{13}\\text{ km}'],
    correctAnswer: 1,
    explanation: 'd = ct = 3 \\times 10^8 \\times 3.156 \\times 10^7 \\approx 9.46 \\times 10^{15}\\text{ m}',
    difficulty: 'hard',
    skills: ['numeros-reales-problemas-ciencias', 'numeros-notacion-cientifica', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-cienc-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'T = 2\\pi\\sqrt{\\frac{L}{g}}',
    questionLatex: '\\text{Un físico está estudiando el movimiento de un péndulo simple de longitud } L = 1 \\text{ m. Usando la aceleración de la gravedad } g = 10 \\text{ m/s}^2 \\text{ y la fórmula del período } T = 2\\pi\\sqrt{\\frac{L}{g}}\\text{, calcula el tiempo que tarda el péndulo en completar una oscilación. ¿Cuál es aproximadamente el período?}',
    options: ['\\approx 1\\text{ s}', '\\approx 2\\text{ s}', '\\approx \\pi\\text{ s}', '\\approx 2\\pi\\text{ s}'],
    correctAnswer: 1,
    explanation: 'T = 2\\pi\\sqrt{\\frac{1}{10}} \\approx \\frac{6.28}{3.16} \\approx 2\\text{ s}',
    difficulty: 'hard',
    skills: ['numeros-reales-problemas-ciencias', 'numeros-irracionales', 'numeros-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-cienc-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'a \\times 10^{-n} = 0.\\underbrace{00...0}_{n-1}a',
    questionLatex: '\\text{Un estudiante de física está aprendiendo sobre notación científica. Al escribir la constante de Planck } h = 6.626 \\times 10^{-34} \\text{ J·s en forma decimal estándar, se pregunta cuántos ceros aparecerán después del punto decimal antes de los dígitos significativos. ¿Cuántos ceros hay?}',
    options: ['32', '33', '34', '35'],
    correctAnswer: 1,
    explanation: '6.626 \\times 10^{-34} = 0.\\underbrace{000...000}_{33\\text{ ceros}}6626',
    difficulty: 'medium',
    skills: ['numeros-reales-problemas-ciencias', 'numeros-notacion-cientifica', 'numeros-potencias']
  }
];
