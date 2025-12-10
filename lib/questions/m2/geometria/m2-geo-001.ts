import { Question } from '../../../types';

/**
 * M2-GEO-001: Problemas con homotecia en diversos contextos
 *
 * Subsections:
 * A. Concepto de homotecia
 *    Habilidades: geometria-homotecia-concepto
 * B. Razón de homotecia
 *    Habilidades: geometria-homotecia-razon
 * C. Homotecia y semejanza
 *    Habilidades: geometria-homotecia-semejanza
 * D. Aplicaciones de homotecia
 *    Habilidades: geometria-homotecia-aplicaciones
 */

export const m2Geo001Questions: Question[] = [
  // Subsection A: Concepto de homotecia
  {
    id: 'm2-geo-hom-conc-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Homotecia con razón } k',
    questionLatex: '\\text{Un arquitecto está estudiando diferentes transformaciones geométricas para aplicar a sus diseños. Necesita identificar qué tipo de transformación es una homotecia. ¿Cuál de las siguientes opciones describe correctamente una homotecia?}',
    options: ['\\text{Rota figura}', '\\text{Cambia tamaño, mantiene forma}', '\\text{Refleja figura}', '\\text{Traslada sin cambiar tamaño}'],
    correctAnswer: 1,
    explanation: '\\text{Homotecia: cambio de tamaño con factor } k, \\text{ manteniendo forma}',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['geometria-homotecia-concepto', 'geometria-transformaciones', 'geometria-semejanza']
  },
  {
    id: 'm2-geo-trans-5',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'P\'(kx, ky)',
    questionLatex: '\\text{Un programador de videojuegos está desarrollando un efecto de zoom para su aplicación. Cuando el jugador presiona el botón de acercar, todos los objetos en pantalla se amplían desde el centro de la pantalla (el origen) con una homotecia de razón } k = 2\\text{. Si un personaje está ubicado en las coordenadas } D(3, 4) \\text{ antes del zoom, ¿cuáles serán sus nuevas coordenadas después de aplicar el efecto?}',
    options: ['(6, 8)', '(1.5, 2)', '(5, 6)', '(3, 4)'],
    correctAnswer: 0,
    explanation: 'D(3, 4) \\xrightarrow{k=2} D\'(2 \\times 3, 2 \\times 4) = (6, 8)',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['geometria-transformaciones', 'geometria-homotecia', 'geometria-plano-cartesiano', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-hom-1',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'P\'\\left(\\frac{x}{k}, \\frac{y}{k}\\right)',
    questionLatex: '\\text{Una empresa de cartografía está creando un mapa reducido de una ciudad. El mapa original tiene un punto de referencia } A \\text{ ubicado en las coordenadas } (9, 6) \\text{ del sistema de coordenadas del plano. Para el mapa de bolsillo, aplican una homotecia con centro en el origen y razón } k = \\frac{1}{3} \\text{ para reducir todo proporcionalmente. ¿Cuáles serán las nuevas coordenadas del punto } A \\text{ en el mapa reducido?}',
    options: ['(3, 2)', '(6, 3)', '(12, 9)', '(27, 18)'],
    correctAnswer: 0,
    explanation: 'A(9, 6) \\xrightarrow{k=1/3} A\'\\left(\\frac{9}{3}, \\frac{6}{3}\\right) = (3, 2)',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['geometria-homotecia', 'geometria-homotecia-razon', 'geometria-plano-cartesiano', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-hom-2',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A\' = A \\times k^2',
    questionLatex: '\\text{Un estudio de diseño gráfico está creando un logotipo triangular para una empresa. El logotipo original tiene un área de 12 cm². El cliente solicita que el logotipo sea ampliado para un cartel publicitario, utilizando una homotecia con razón } k = 3\\text{. ¿Cuál será el área del logotipo ampliado?}',
    options: ['36\\text{ cm}^2', '108\\text{ cm}^2', '24\\text{ cm}^2', '72\\text{ cm}^2'],
    correctAnswer: 1,
    explanation: 'A\' = A \\times k^2 = 12 \\times 3^2 = 12 \\times 9 = 108\\text{ cm}^2',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['geometria-homotecia', 'geometria-homotecia-semejanza', 'geometria-area', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-hom-3',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'P\' = P \\times k',
    questionLatex: '\\text{Una costurera está confeccionando manteles para un restaurante. Tiene un patrón triangular cuyo perímetro mide 18 cm. El cliente le pide que amplíe el diseño aplicando una homotecia con razón } k = 2\\text{. ¿Cuál será el perímetro del mantel ampliado?}',
    options: ['18\\text{ cm}', '36\\text{ cm}', '54\\text{ cm}', '72\\text{ cm}'],
    correctAnswer: 1,
    explanation: 'P\' = P \\times k = 18 \\times 2 = 36\\text{ cm}',
    difficulty: 'easy',
    difficultyScore: 0.28,
    skills: ['geometria-homotecia', 'geometria-homotecia-semejanza', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-hom-4',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'P\'(kx, ky) \\text{ con } k < 0',
    questionLatex: '\\text{Un profesor de geometría propone el siguiente ejercicio: dado el punto } P(1, 3) \\text{ y aplicando una homotecia con centro en el origen y razón } k = -2\\text{, ¿cuáles serán las coordenadas de la imagen del punto } P\\text{?}',
    options: ['(2, 6)', '(-2, -6)', '(-1, -3)', '(2, -6)'],
    correctAnswer: 1,
    explanation: 'P(1, 3) \\xrightarrow{k=-2} P\'(-2 \\times 1, -2 \\times 3) = (-2, -6)',
    difficulty: 'medium',
    difficultyScore: 0.35,
    skills: ['geometria-homotecia', 'geometria-homotecia-razon', 'geometria-plano-cartesiano', 'numeros-enteros', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-geo-hom-5',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'V\' = V \\times k^3',
    questionLatex: '\\text{Una fábrica de chocolates produce bombones con forma de pirámide. El molde original tiene un volumen de 8 cm³. Para la nueva línea de chocolates premium, el diseñador decide ampliar el molde aplicando una homotecia con razón } k = 3\\text{. ¿Cuál será el volumen del nuevo molde ampliado?}',
    options: ['24\\text{ cm}^3', '72\\text{ cm}^3', '216\\text{ cm}^3', '512\\text{ cm}^3'],
    correctAnswer: 2,
    explanation: 'V\' = V \\times k^3 = 8 \\times 3^3 = 8 \\times 27 = 216\\text{ cm}^3',
    difficulty: 'medium',
    difficultyScore: 0.42,
    skills: ['geometria-homotecia', 'geometria-homotecia-aplicaciones', 'geometria-volumen', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  // Additional homotecia questions
  {
    id: 'm2-geo-hom-6',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A\' = A \\times k^2',
    questionLatex: '\\text{Un fotógrafo amplía una imagen cuadrada utilizando una homotecia con razón } k = 4\\text{. Si la imagen original tenía cierta área, ¿cuántas veces aumenta el área de la imagen ampliada respecto a la original?}',
    options: ['4', '8', '16', '64'],
    correctAnswer: 2,
    explanation: 'A\' = A \\times k^2 = A \\times 4^2 = 16A',
    difficulty: 'medium',
    difficultyScore: 0.32,
    skills: ['geometria-homotecia-semejanza', 'geometria-homotecia-razon', 'geometria-area', 'numeros-potencias']
  },
  {
    id: 'm2-geo-hom-7',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'L\' = L \\times k',
    questionLatex: '\\text{Un diseñador gráfico necesita reducir un logotipo a la mitad de su tamaño original manteniendo sus proporciones. ¿Qué razón de homotecia debe utilizar?}',
    options: ['k = 2', 'k = \\frac{1}{2}', 'k = -2', 'k = -\\frac{1}{2}'],
    correctAnswer: 1,
    explanation: 'k = \\frac{1}{2} \\Rightarrow \\text{figura reducida a la mitad}',
    difficulty: 'easy',
    difficultyScore: 0.18,
    skills: ['geometria-homotecia-razon', 'geometria-homotecia-concepto', 'numeros-fracciones']
  },
  {
    id: 'm2-geo-hom-8',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A\' = A \\times k^2',
    questionLatex: '\\text{Un ingeniero civil tiene dos terrenos triangulares semejantes con razón de semejanza 3:1. Si el área del terreno menor es 5 m², ¿cuál es el área del terreno mayor?}',
    options: ['15\\text{ m}^2', '25\\text{ m}^2', '45\\text{ m}^2', '125\\text{ m}^2'],
    correctAnswer: 2,
    explanation: 'A_{\\text{mayor}} = A_{\\text{menor}} \\times k^2 = 5 \\times 9 = 45\\text{ m}^2',
    difficulty: 'medium',
    difficultyScore: 0.38,
    skills: ['geometria-homotecia-semejanza', 'geometria-semejanza', 'geometria-area', 'numeros-potencias']
  },
  {
    id: 'm2-geo-hom-9',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'P\'(-x, -y) \\text{ cuando } k = -1',
    questionLatex: '\\text{Un estudiante de geometría debe encontrar la imagen del punto } P(3, -2) \\text{ cuando se aplica una homotecia con centro en } O(0,0) \\text{ y razón } k = -1\\text{. ¿Cuáles son las coordenadas de la imagen de } P\\text{?}',
    options: ['(3, -2)', '(-3, 2)', '(3, 2)', '(-3, -2)'],
    correctAnswer: 1,
    explanation: 'P\'(-1 \\times 3, -1 \\times (-2)) = (-3, 2)',
    difficulty: 'medium',
    difficultyScore: 0.32,
    skills: ['geometria-homotecia-razon', 'geometria-homotecia', 'geometria-plano-cartesiano', 'numeros-enteros']
  },
  {
    id: 'm2-geo-hom-10',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Escala } 1:k',
    questionLatex: '\\text{Un arquitecto está revisando un plano a escala 1:100. En el plano, un cuarto mide 5 cm × 4 cm. El arquitecto necesita calcular el área real del cuarto para determinar la cantidad de piso a comprar. ¿Cuál es el área real del cuarto?}',
    options: ['20\\text{ cm}^2', '2\\text{ m}^2', '20\\text{ m}^2', '200\\text{ m}^2'],
    correctAnswer: 2,
    explanation: '5 \\times 100 = 500\\text{ cm} = 5\\text{ m}, \\quad 4 \\times 100 = 400\\text{ cm} = 4\\text{ m}. \\quad A = 5 \\times 4 = 20\\text{ m}^2',
    difficulty: 'medium',
    difficultyScore: 0.48,
    skills: ['geometria-homotecia-aplicaciones', 'geometria-semejanza', 'geometria-area', 'numeros-conversion-unidades']
  }
];
