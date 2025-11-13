import { Question } from '../../../types';

/**
 * M1 Geometría: Perímetro y Área - Cuadriláteros y Polígonos
 * Questions covering quadrilaterals, polygons, and plane figures
 */
export const m1GeometriaPerimetroAreaQuadrilateralsQuestions: Question[] = [
  // BATCH 3: CUADRILÁTEROS Y POLÍGONOS (15 questions)

  // Propiedades de cuadriláteros (3)
  {
    id: 'm1-162',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un cuadrilátero con cuatro lados iguales y cuatro ángulos rectos es:',
    questionLatex: '\\text{Cuadrilátero con 4 lados iguales y 4 ángulos rectos es:}',
    options: ['Rombo', 'Rectángulo', 'Cuadrado', 'Trapecio'],
    correctAnswer: 2,
    explanation: 'Por definición:',
    explanationLatex: '\\text{Cuadrado: 4 lados iguales y 4 ángulos de } 90^\\circ',
    difficulty: 'easy',
    skills: ['geometria-cuadrilateros', 'geometria-cuadrados', 'geometria-clasificacion']
  },
  {
    id: 'm1-163',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un paralelogramo con cuatro lados iguales pero ángulos no rectos es:',
    questionLatex: '\\text{Paralelogramo con 4 lados iguales pero ángulos no rectos es:}',
    options: ['Cuadrado', 'Rectángulo', 'Rombo', 'Trapecio'],
    correctAnswer: 2,
    explanation: 'El rombo tiene lados iguales pero ángulos diferentes de 90°:',
    explanationLatex: '\\text{Rombo}',
    difficulty: 'easy',
    skills: ['geometria-cuadrilateros', 'geometria-rombo', 'geometria-clasificacion']
  },
  {
    id: 'm1-164',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un cuadrilátero con solo un par de lados paralelos se llama:',
    questionLatex: '\\text{Cuadrilátero con solo un par de lados paralelos:}',
    options: ['Paralelogramo', 'Trapecio', 'Rombo', 'Rectángulo'],
    correctAnswer: 1,
    explanation: 'Por definición:',
    explanationLatex: '\\text{Trapecio: solo un par de lados paralelos}',
    difficulty: 'easy',
    skills: ['geometria-cuadrilateros', 'geometria-trapecio', 'geometria-clasificacion']
  },

  // Perímetros de cuadriláteros (3)
  {
    id: 'm1-165',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El perímetro de un cuadrado con lado de 9 cm es:',
    questionLatex: '\\text{Perímetro de cuadrado con lado 9 cm:}',
    options: ['18 cm', '27 cm', '36 cm', '81 cm²'],
    correctAnswer: 2,
    explanation: 'El perímetro del cuadrado es 4 veces el lado:',
    explanationLatex: 'P = 4 \\times 9 = 36 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-cuadrados', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-166',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un rombo tiene todos sus lados de 7 cm. ¿Cuál es su perímetro?',
    questionLatex: '\\text{Rombo con lados de 7 cm. Perímetro?}',
    options: ['14 cm', '21 cm', '28 cm', '49 cm²'],
    correctAnswer: 2,
    explanation: 'El rombo tiene 4 lados iguales:',
    explanationLatex: 'P = 4 \\times 7 = 28 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-rombo', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-167',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El perímetro de un rectángulo es 40 cm y su ancho es 8 cm. ¿Cuál es su largo?',
    questionLatex: '\\text{Perímetro 40 cm, ancho 8 cm. ¿Largo?}',
    options: ['12 cm', '16 cm', '20 cm', '24 cm'],
    correctAnswer: 0,
    explanation: 'Usando P = 2(largo + ancho):',
    explanationLatex: '40 = 2(l + 8) \\rightarrow 20 = l + 8 \\rightarrow l = 12 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-rectangulos', 'geometria-perimetro', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },

  // Áreas de cuadriláteros (3)
  {
    id: 'm1-168',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un rectángulo con largo 14 cm y ancho 6 cm es:',
    questionLatex: '\\text{Área de rectángulo: largo 14 cm, ancho 6 cm:}',
    options: ['20 cm²', '40 cm²', '84 cm²', '168 cm²'],
    correctAnswer: 2,
    explanation: 'Área del rectángulo:',
    explanationLatex: 'A = l \\times w = 14 \\times 6 = 84 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-rectangulos', 'geometria-area', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-169',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si el área de un cuadrado es 49 cm², ¿cuánto mide su lado?',
    questionLatex: '\\text{Área de cuadrado } 49 \\text{ cm}^2\\text{. ¿Lado?}',
    options: ['6 cm', '7 cm', '8 cm', '12.25 cm'],
    correctAnswer: 1,
    explanation: 'El área del cuadrado es lado al cuadrado:',
    explanationLatex: 'A = l^2 \\rightarrow 49 = l^2 \\rightarrow l = \\sqrt{49} = 7 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-cuadrados', 'geometria-area', 'numeros-raices', 'numeros-potencias']
  },
  {
    id: 'm1-170',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un rombo tiene diagonales de 10 cm y 8 cm. ¿Cuál es su área?',
    questionLatex: '\\text{Rombo con diagonales 10 cm y 8 cm. Área?}',
    options: ['40 cm²', '80 cm²', '18 cm²', '20 cm²'],
    correctAnswer: 0,
    explanation: 'El área del rombo es producto de diagonales dividido 2:',
    explanationLatex: 'A = \\frac{d_1 \\times d_2}{2} = \\frac{10 \\times 8}{2} = 40 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-rombo', 'geometria-area', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },

  // Polígonos regulares (3)
  {
    id: 'm1-171',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuánto suman los ángulos internos de un pentágono?',
    questionLatex: '\\text{¿Suma de ángulos internos de un pentágono?}',
    options: ['360°', '540°', '720°', '900°'],
    correctAnswer: 1,
    explanation: 'Suma de ángulos internos: (n-2) × 180°:',
    explanationLatex: '(5-2) \\times 180^\\circ = 3 \\times 180^\\circ = 540^\\circ',
    difficulty: 'medium',
    skills: ['geometria-poligonos', 'geometria-suma-angulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-172',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuánto mide cada ángulo interno de un hexágono regular?',
    questionLatex: '\\text{¿Ángulo interno de hexágono regular?}',
    options: ['108°', '120°', '135°', '140°'],
    correctAnswer: 1,
    explanation: 'Suma total: (6-2) × 180° = 720°. Cada ángulo:',
    explanationLatex: '\\frac{720^\\circ}{6} = 120^\\circ',
    difficulty: 'hard',
    skills: ['geometria-poligonos', 'geometria-poligonos-regulares', 'geometria-angulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-173',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El perímetro de un octágono regular con lado de 5 cm es:',
    questionLatex: '\\text{Perímetro de octágono regular con lado 5 cm:}',
    options: ['25 cm', '32 cm', '40 cm', '45 cm'],
    correctAnswer: 2,
    explanation: 'Un octágono tiene 8 lados:',
    explanationLatex: 'P = 8 \\times 5 = 40 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-poligonos', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },

  // Diagonales (3)
  {
    id: 'm1-174',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuántas diagonales tiene un cuadrilátero?',
    questionLatex: '\\text{¿Cuántas diagonales tiene un cuadrilátero?}',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    explanation: 'Un cuadrilátero tiene 2 diagonales:',
    explanationLatex: '\\text{Diagonales} = \\frac{n(n-3)}{2} = \\frac{4(4-3)}{2} = 2',
    difficulty: 'easy',
    skills: ['geometria-cuadrilateros', 'geometria-diagonales']
  },
  {
    id: 'm1-175',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuántas diagonales tiene un pentágono?',
    questionLatex: '\\text{¿Cuántas diagonales tiene un pentágono?}',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: 'Usando la fórmula de diagonales:',
    explanationLatex: '\\text{Diagonales} = \\frac{5(5-3)}{2} = \\frac{5 \\times 2}{2} = 5',
    difficulty: 'medium',
    skills: ['geometria-poligonos', 'geometria-diagonales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-176',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'En un rectángulo, las diagonales:',
    questionLatex: '\\text{En un rectángulo, las diagonales:}',
    options: ['Son perpendiculares', 'Son iguales', 'Se bisecan en ángulos diferentes', 'No se cortan'],
    correctAnswer: 1,
    explanation: 'Propiedad del rectángulo:',
    explanationLatex: '\\text{Las diagonales son iguales en longitud}',
    difficulty: 'easy',
    skills: ['geometria-rectangulos', 'geometria-propiedades', 'geometria-diagonales']
  },

  // BATCH 4: PERÍMETRO Y ÁREA DE FIGURAS PLANAS (15 questions)

  // Área de paralelogramo (3)
  {
    id: 'm1-177',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un paralelogramo con base 12 cm y altura 7 cm es:',
    questionLatex: '\\text{Área de paralelogramo: base 12 cm, altura 7 cm:}',
    options: ['19 cm²', '38 cm²', '84 cm²', '168 cm²'],
    correctAnswer: 2,
    explanation: 'Área del paralelogramo:',
    explanationLatex: 'A = b \\times h = 12 \\times 7 = 84 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-paralelogramo', 'geometria-area', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-178',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un paralelogramo tiene área 60 cm² y base 10 cm. ¿Cuál es su altura?',
    questionLatex: '\\text{Área 60 cm}^2\\text{, base 10 cm. ¿Altura?}',
    options: ['5 cm', '6 cm', '7 cm', '8 cm'],
    correctAnswer: 1,
    explanation: 'Despejamos la altura:',
    explanationLatex: '60 = 10 \\times h \\rightarrow h = 6 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-paralelogramo', 'geometria-area', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-179',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Dos paralelogramos tienen la misma base. Si uno tiene el doble de altura que el otro, ¿cómo son sus áreas?',
    questionLatex: '\\text{Misma base, uno tiene doble altura. ¿Cómo son las áreas?}',
    options: ['Iguales', 'Una es el doble', 'Una es el triple', 'Una es el cuádruple'],
    correctAnswer: 1,
    explanation: 'El área es proporcional a la altura:',
    explanationLatex: 'A_2 = b \\times (2h) = 2(b \\times h) = 2A_1',
    difficulty: 'medium',
    skills: ['geometria-paralelogramo', 'geometria-area', 'geometria-proporciones']
  },

  // Área de trapecio (3)
  {
    id: 'm1-180',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un trapecio tiene bases de 8 cm y 12 cm, y altura de 5 cm. ¿Cuál es su área?',
    questionLatex: '\\text{Trapecio: bases 8 cm y 12 cm, altura 5 cm. Área?}',
    options: ['40 cm²', '50 cm²', '60 cm²', '100 cm²'],
    correctAnswer: 1,
    explanation: 'Área del trapecio:',
    explanationLatex: 'A = \\frac{(b_1 + b_2) \\times h}{2} = \\frac{(8 + 12) \\times 5}{2} = \\frac{100}{2} = 50 \\text{ cm}^2',
    difficulty: 'easy',
    skills: ['geometria-trapecio', 'geometria-area', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-181',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un trapecio es 72 cm². Si sus bases miden 10 cm y 14 cm, ¿cuál es su altura?',
    questionLatex: '\\text{Área 72 cm}^2\\text{, bases 10 cm y 14 cm. ¿Altura?}',
    options: ['4 cm', '6 cm', '8 cm', '12 cm'],
    correctAnswer: 1,
    explanation: 'Despejamos la altura:',
    explanationLatex: '72 = \\frac{(10 + 14) \\times h}{2} \\rightarrow 144 = 24h \\rightarrow h = 6 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-trapecio', 'geometria-area', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-182',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un trapecio isósceles tiene base mayor 16 cm, base menor 10 cm y lados iguales de 5 cm. ¿Cuál es su perímetro?',
    questionLatex: '\\text{Trapecio isósceles: bases 16 cm y 10 cm, lados 5 cm. Perímetro?}',
    options: ['31 cm', '36 cm', '41 cm', '46 cm'],
    correctAnswer: 1,
    explanation: 'Sumamos todos los lados:',
    explanationLatex: 'P = 16 + 10 + 5 + 5 = 36 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-trapecio', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },

  // Figuras compuestas (3)
  {
    id: 'm1-183',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Una figura está formada por un cuadrado de lado 6 cm y un triángulo de base 6 cm y altura 4 cm. ¿Cuál es el área total?',
    questionLatex: '\\text{Cuadrado (lado 6 cm) + triángulo (base 6 cm, altura 4 cm). Área total?}',
    options: ['36 cm²', '42 cm²', '48 cm²', '60 cm²'],
    correctAnswer: 2,
    explanation: 'Sumamos las áreas:',
    explanationLatex: 'A_{\\text{cuadrado}} = 36, \\quad A_{\\text{triángulo}} = \\frac{6 \\times 4}{2} = 12 \\quad \\Rightarrow \\quad A_{\\text{total}} = 48 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-figuras-compuestas', 'geometria-cuadrados', 'geometria-triangulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-184',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un rectángulo de 10 cm × 8 cm tiene un rectángulo de 4 cm × 3 cm recortado de una esquina. ¿Cuál es el área restante?',
    questionLatex: '\\text{Rectángulo 10×8 menos rectángulo 4×3 recortado. Área restante?}',
    options: ['68 cm²', '72 cm²', '76 cm²', '80 cm²'],
    correctAnswer: 0,
    explanation: 'Restamos el área recortada:',
    explanationLatex: 'A = (10 \\times 8) - (4 \\times 3) = 80 - 12 = 68 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-figuras-compuestas', 'geometria-rectangulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-185',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un terreno rectangular de 20 m × 15 m tiene un camino de 2 m de ancho alrededor. ¿Cuál es el área del camino?',
    questionLatex: '\\text{Terreno 20×15 m con camino 2 m alrededor. Área del camino?}',
    options: ['80 m²', '152 m²', '184 m²', '300 m²'],
    correctAnswer: 1,
    explanation: 'Área externa menos área interna:',
    explanationLatex: 'A_{\\text{camino}} = (24 \\times 19) - (20 \\times 15) = 456 - 300 = 156 \\text{ m}^2',
    difficulty: 'hard',
    skills: ['geometria-area', 'geometria-figuras-compuestas', 'geometria-rectangulos', 'numeros-operaciones-basicas']
  },

  // Relaciones de áreas (3)
  {
    id: 'm1-186',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si se duplican las dimensiones de un rectángulo, ¿qué sucede con su área?',
    questionLatex: '\\text{Si duplicamos dimensiones de rectángulo, ¿qué pasa con área?}',
    options: ['Se duplica', 'Se triplica', 'Se cuadruplica', 'Se mantiene'],
    correctAnswer: 2,
    explanation: 'El área es proporcional al producto de dimensiones:',
    explanationLatex: 'A_{\\text{nuevo}} = (2l)(2w) = 4(lw) = 4A_{\\text{original}}',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-proporciones', 'geometria-rectangulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-187',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Dos cuadrados tienen lados en razón 1:3. ¿En qué razón están sus áreas?',
    questionLatex: '\\text{Lados en razón 1:3. ¿Razón de áreas?}',
    options: ['1:3', '1:6', '1:9', '1:12'],
    correctAnswer: 2,
    explanation: 'Las áreas se relacionan con el cuadrado de la razón:',
    explanationLatex: '\\frac{A_1}{A_2} = \\left(\\frac{l_1}{l_2}\\right)^2 = \\left(\\frac{1}{3}\\right)^2 = \\frac{1}{9}',
    difficulty: 'hard',
    skills: ['geometria-area', 'geometria-proporciones', 'geometria-cuadrados', 'numeros-potencias', 'numeros-razones']
  },
  {
    id: 'm1-188',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un cuadrado y un rectángulo tienen el mismo perímetro de 40 cm. El rectángulo mide 12 cm de largo. ¿Cuál tiene mayor área?',
    questionLatex: '\\text{Cuadrado y rectángulo, perímetro 40 cm. Rectángulo: largo 12 cm. ¿Mayor área?}',
    options: ['Cuadrado', 'Rectángulo', 'Igual área', 'Falta información'],
    correctAnswer: 0,
    explanation: 'Cuadrado: lado 10 cm, área 100 cm². Rectángulo: 12×8 cm, área 96 cm²:',
    explanationLatex: 'A_{\\text{cuadrado}} = 100 > A_{\\text{rectángulo}} = 96',
    difficulty: 'hard',
    skills: ['geometria-area', 'geometria-perimetro', 'geometria-comparacion', 'geometria-cuadrados', 'geometria-rectangulos', 'numeros-operaciones-basicas']
  },

  // Conversión de unidades (3)
  {
    id: 'm1-189',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuántos centímetros cuadrados hay en 1 metro cuadrado?',
    questionLatex: '\\text{¿Cuántos cm}^2 \\text{ en 1 m}^2?',
    options: ['100', '1,000', '10,000', '100,000'],
    correctAnswer: 2,
    explanation: 'Conversión de unidades de área:',
    explanationLatex: '1 \\text{ m}^2 = (100 \\text{ cm})^2 = 10,000 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-unidades', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-190',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un cuadrado tiene área de 2.5 m². ¿Cuántos cm² son?',
    questionLatex: '\\text{Área 2.5 m}^2\\text{. ¿Cuántos cm}^2?',
    options: ['250', '2,500', '25,000', '250,000'],
    correctAnswer: 2,
    explanation: 'Multiplicamos por el factor de conversión:',
    explanationLatex: '2.5 \\text{ m}^2 \\times 10,000 = 25,000 \\text{ cm}^2',
    difficulty: 'medium',
    skills: ['geometria-area', 'geometria-unidades', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-191',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El perímetro de un terreno es 500 m. ¿Cuántos kilómetros son?',
    questionLatex: '\\text{Perímetro 500 m. ¿Cuántos km?}',
    options: ['0.05 km', '0.5 km', '5 km', '50 km'],
    correctAnswer: 1,
    explanation: 'Conversión de metros a kilómetros:',
    explanationLatex: '500 \\text{ m} = \\frac{500}{1000} = 0.5 \\text{ km}',
    difficulty: 'easy',
    skills: ['geometria-perimetro', 'geometria-unidades', 'numeros-decimales', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
];
