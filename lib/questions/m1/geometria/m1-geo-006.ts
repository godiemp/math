import { Question } from '../../../types';

/**
 * M1-GEO-006: Semejanza de triángulos, congruencia y ángulos con paralelas
 * Chilean PAES Curriculum - Geometry Subsection 006
 *
 * This subsection covers:
 * - A: Triángulos semejantes (criterios AA, SAS, SSS)
 * - B: Triángulos congruentes (criterios SSS, SAS, ASA, AAS)
 * - C: Ángulos entre paralelas cortadas por una transversal
 * - D: Triángulos especiales (30-60-90, 45-45-90)
 * - E: Polígonos regulares
 *
 * Total: 25 questions
 */

export const m1Geo006Questions: Question[] = [
  // ========================================
  // TRIÁNGULOS SEMEJANTES
  // ========================================
  {
    id: 'm1-geo006-1',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\triangle ABC \\sim \\triangle DEF',
    questionLatex: '\\text{Dos triángulos son semejantes si tienen la misma forma pero no necesariamente el mismo tamaño. Si } \\triangle ABC \\sim \\triangle DEF \\text{ con razón de semejanza 2:3, y el lado AB mide 8 cm, ¿cuánto mide el lado DE correspondiente?}',
    options: ['4 cm', '6 cm', '12 cm', '16 cm'],
    correctAnswer: 2,
    explanation: '\\frac{AB}{DE} = \\frac{2}{3} \\Rightarrow \\frac{8}{DE} = \\frac{2}{3} \\Rightarrow DE = 12 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-semejanza', 'geometria-triangulos', 'numeros-proporcionalidad']
  },
  {
    id: 'm1-geo006-2',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Criterio AA}',
    questionLatex: '\\text{¿Cuál es el criterio mínimo para demostrar que dos triángulos son semejantes?}',
    options: ['Un ángulo igual', 'Dos ángulos iguales (AA)', 'Tres ángulos iguales', 'Un lado igual'],
    correctAnswer: 1,
    explanation: '\\text{El criterio AA: si dos triángulos tienen dos ángulos iguales, son semejantes}',
    difficulty: 'easy',
    skills: ['geometria-semejanza', 'geometria-triangulos', 'geometria-criterios']
  },
  {
    id: 'm1-geo006-3',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}',
    questionLatex: '\\text{En dos triángulos semejantes, los lados del primero miden 3, 4 y 5 cm. Si el lado más largo del segundo triángulo mide 15 cm, ¿cuánto mide su lado más corto?}',
    options: ['6 cm', '9 cm', '12 cm', '18 cm'],
    correctAnswer: 1,
    explanation: '\\frac{5}{15} = \\frac{3}{x} \\Rightarrow x = 9 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-semejanza', 'geometria-triangulos', 'numeros-proporcionalidad']
  },
  {
    id: 'm1-geo006-4',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Razón de áreas} = k^2',
    questionLatex: '\\text{Si dos triángulos semejantes tienen una razón de semejanza de 1:2 (sus lados están en proporción 1:2), ¿cuál es la razón entre sus áreas?}',
    options: ['1:2', '1:4', '1:8', '2:4'],
    correctAnswer: 1,
    explanation: '\\text{Si la razón de lados es } k = \\frac{1}{2}, \\text{ la razón de áreas es } k^2 = \\frac{1}{4}',
    difficulty: 'hard',
    skills: ['geometria-semejanza', 'geometria-area', 'numeros-proporcionalidad']
  },
  {
    id: 'm1-geo006-5',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Teorema de Tales}',
    questionLatex: '\\text{Una línea paralela a la base de un triángulo divide a los otros dos lados proporcionalmente. Si en el triángulo ABC, la línea DE es paralela a BC, AD = 4 cm, DB = 6 cm y AE = 5 cm, ¿cuánto mide EC?}',
    options: ['5 cm', '6 cm', '7.5 cm', '8 cm'],
    correctAnswer: 2,
    explanation: '\\frac{AD}{DB} = \\frac{AE}{EC} \\Rightarrow \\frac{4}{6} = \\frac{5}{EC} \\Rightarrow EC = 7.5 \\text{ cm}',
    difficulty: 'hard',
    skills: ['geometria-semejanza', 'geometria-teorema-tales', 'numeros-proporcionalidad']
  },
  // ========================================
  // TRIÁNGULOS CONGRUENTES
  // ========================================
  {
    id: 'm1-geo006-6',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Criterio SSS}',
    questionLatex: '\\text{¿Qué criterio de congruencia se aplica cuando dos triángulos tienen sus tres lados respectivamente iguales?}',
    options: ['SAS', 'ASA', 'SSS', 'AAS'],
    correctAnswer: 2,
    explanation: '\\text{SSS (Side-Side-Side): si los tres lados son iguales, los triángulos son congruentes}',
    difficulty: 'easy',
    skills: ['geometria-congruencia', 'geometria-triangulos', 'geometria-criterios']
  },
  {
    id: 'm1-geo006-7',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Criterio SAS}',
    questionLatex: '\\text{Un ingeniero verifica que dos piezas triangulares son idénticas. Si ambas tienen dos lados de 5 cm y 7 cm, y el ángulo entre estos lados es de 60°, ¿qué criterio de congruencia aplica?}',
    options: ['SSS', 'SAS', 'ASA', 'SSA'],
    correctAnswer: 1,
    explanation: '\\text{SAS (Side-Angle-Side): dos lados iguales y el ángulo comprendido igual}',
    difficulty: 'easy',
    skills: ['geometria-congruencia', 'geometria-triangulos', 'geometria-criterios']
  },
  {
    id: 'm1-geo006-8',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Criterio ASA}',
    questionLatex: '\\text{Dos triángulos tienen un lado de 10 cm cada uno. En ambos, los ángulos adyacentes a ese lado miden 45° y 75°. Los triángulos son:}',
    options: ['Semejantes pero no congruentes', 'Congruentes por criterio ASA', 'Congruentes por criterio SAS', 'No se puede determinar'],
    correctAnswer: 1,
    explanation: '\\text{ASA (Angle-Side-Angle): un lado igual y los dos ángulos adyacentes iguales}',
    difficulty: 'medium',
    skills: ['geometria-congruencia', 'geometria-triangulos', 'geometria-criterios']
  },
  {
    id: 'm1-geo006-9',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\triangle ABC \\cong \\triangle DEF',
    questionLatex: '\\text{Si } \\triangle ABC \\cong \\triangle DEF, AB = 6 \\text{ cm}, BC = 8 \\text{ cm y } CA = 10 \\text{ cm, ¿cuánto mide EF?}',
    options: ['6 cm', '8 cm', '10 cm', '24 cm'],
    correctAnswer: 1,
    explanation: '\\text{En triángulos congruentes, los lados correspondientes son iguales: } EF = BC = 8 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-congruencia', 'geometria-triangulos']
  },
  {
    id: 'm1-geo006-10',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Diferencia semejanza vs congruencia}',
    questionLatex: '\\text{¿Cuál es la diferencia principal entre triángulos semejantes y triángulos congruentes?}',
    options: ['Los semejantes tienen ángulos diferentes', 'Los congruentes tienen el mismo tamaño y forma; los semejantes solo la misma forma', 'Los congruentes tienen diferente forma', 'No hay diferencia'],
    correctAnswer: 1,
    explanation: '\\text{Congruentes: misma forma y tamaño. Semejantes: misma forma, diferente tamaño}',
    difficulty: 'easy',
    skills: ['geometria-congruencia', 'geometria-semejanza', 'geometria-conceptos']
  },
  // ========================================
  // ÁNGULOS CON PARALELAS Y TRANSVERSALES
  // ========================================
  {
    id: 'm1-geo006-11',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulos correspondientes}',
    questionLatex: '\\text{Dos rectas paralelas son cortadas por una transversal. Si uno de los ángulos correspondientes mide 65°, ¿cuánto mide el otro ángulo correspondiente?}',
    options: ['25°', '65°', '115°', '180°'],
    correctAnswer: 1,
    explanation: '\\text{Los ángulos correspondientes entre paralelas cortadas por una transversal son iguales}',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-paralelas', 'geometria-transversal']
  },
  {
    id: 'm1-geo006-12',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulos alternos internos}',
    questionLatex: '\\text{Si dos rectas paralelas son cortadas por una transversal y un ángulo alterno interno mide 72°, ¿cuánto mide el otro ángulo alterno interno?}',
    options: ['18°', '72°', '108°', '144°'],
    correctAnswer: 1,
    explanation: '\\text{Los ángulos alternos internos entre paralelas son iguales}',
    difficulty: 'easy',
    skills: ['geometria-angulos', 'geometria-paralelas', 'geometria-transversal']
  },
  {
    id: 'm1-geo006-13',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulos co-internos}',
    questionLatex: '\\text{Los ángulos co-internos (o conjugados internos) entre paralelas cortadas por una transversal son:}',
    options: ['Iguales', 'Complementarios (suman 90°)', 'Suplementarios (suman 180°)', 'Opuestos por el vértice'],
    correctAnswer: 2,
    explanation: '\\text{Los ángulos co-internos son suplementarios: suman 180°}',
    difficulty: 'medium',
    skills: ['geometria-angulos', 'geometria-paralelas', 'geometria-transversal']
  },
  {
    id: 'm1-geo006-14',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\alpha + \\beta = 180°',
    questionLatex: '\\text{Dos rectas paralelas son cortadas por una transversal. Si un ángulo co-interno mide 110°, ¿cuánto mide el otro ángulo co-interno?}',
    options: ['70°', '90°', '110°', '180°'],
    correctAnswer: 0,
    explanation: '180° - 110° = 70°',
    difficulty: 'medium',
    skills: ['geometria-angulos', 'geometria-paralelas', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo006-15',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Identificación de ángulos}',
    questionLatex: '\\text{En la figura, las rectas } l \\text{ y } m \\text{ son paralelas. Si el ángulo 1 mide 55° y está arriba de la transversal a la izquierda, ¿cuánto mide el ángulo 5 que está abajo de la transversal a la derecha (alterno externo)?}',
    options: ['55°', '125°', '35°', '145°'],
    correctAnswer: 0,
    explanation: '\\text{Los ángulos alternos externos son iguales: } \\angle 5 = \\angle 1 = 55°',
    difficulty: 'medium',
    skills: ['geometria-angulos', 'geometria-paralelas', 'geometria-transversal']
  },
  // ========================================
  // TRIÁNGULOS ESPECIALES (30-60-90 y 45-45-90)
  // ========================================
  {
    id: 'm1-geo006-16',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Triángulo 45-45-90}',
    questionLatex: '\\text{En un triángulo rectángulo isósceles (45-45-90), si los catetos miden 5 cm cada uno, ¿cuánto mide la hipotenusa?}',
    options: ['5 cm', '5\\sqrt{2} \\text{ cm}', '10 cm', '5\\sqrt{3} \\text{ cm}'],
    correctAnswer: 1,
    explanation: '\\text{En un triángulo 45-45-90, la hipotenusa es } \\text{cateto} \\times \\sqrt{2} = 5\\sqrt{2}',
    difficulty: 'medium',
    skills: ['geometria-triangulos', 'geometria-triangulos-especiales', 'geometria-pitagoras', 'numeros-raices']
  },
  {
    id: 'm1-geo006-17',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Triángulo 30-60-90}',
    questionLatex: '\\text{En un triángulo 30-60-90, la hipotenusa mide 10 cm. ¿Cuánto mide el cateto opuesto al ángulo de 30°?}',
    options: ['5 cm', '5\\sqrt{2} \\text{ cm}', '5\\sqrt{3} \\text{ cm}', '10 cm'],
    correctAnswer: 0,
    explanation: '\\text{En un triángulo 30-60-90, el cateto menor (opuesto a 30°) es la mitad de la hipotenusa: } \\frac{10}{2} = 5',
    difficulty: 'medium',
    skills: ['geometria-triangulos', 'geometria-triangulos-especiales']
  },
  {
    id: 'm1-geo006-18',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Triángulo 30-60-90}',
    questionLatex: '\\text{En un triángulo 30-60-90, el cateto menor mide 4 cm. ¿Cuánto mide el cateto mayor (opuesto al ángulo de 60°)?}',
    options: ['4 cm', '4\\sqrt{2} \\text{ cm}', '4\\sqrt{3} \\text{ cm}', '8 cm'],
    correctAnswer: 2,
    explanation: '\\text{El cateto mayor es cateto menor} \\times \\sqrt{3} = 4\\sqrt{3}',
    difficulty: 'hard',
    skills: ['geometria-triangulos', 'geometria-triangulos-especiales', 'numeros-raices']
  },
  {
    id: 'm1-geo006-19',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Triángulo 45-45-90}',
    questionLatex: '\\text{La diagonal de un cuadrado mide } 8\\sqrt{2} \\text{ cm. ¿Cuánto mide el lado del cuadrado?}',
    options: ['4 cm', '8 cm', '16 cm', '4\\sqrt{2} \\text{ cm}'],
    correctAnswer: 1,
    explanation: '\\text{Diagonal} = \\text{lado} \\times \\sqrt{2} \\Rightarrow \\text{lado} = \\frac{8\\sqrt{2}}{\\sqrt{2}} = 8 \\text{ cm}',
    difficulty: 'hard',
    skills: ['geometria-cuadrados', 'geometria-triangulos-especiales', 'numeros-raices']
  },
  // ========================================
  // POLÍGONOS REGULARES
  // ========================================
  {
    id: 'm1-geo006-20',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Suma ángulos interiores} = 180°(n-2)',
    questionLatex: '\\text{¿Cuál es la suma de los ángulos interiores de un hexágono (6 lados)?}',
    options: ['360°', '540°', '720°', '900°'],
    correctAnswer: 2,
    explanation: '\\text{Suma} = 180°(n-2) = 180°(6-2) = 180° \\times 4 = 720°',
    difficulty: 'medium',
    skills: ['geometria-poligonos', 'geometria-angulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo006-21',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulo interior} = \\frac{180°(n-2)}{n}',
    questionLatex: '\\text{¿Cuánto mide cada ángulo interior de un octógono regular (8 lados)?}',
    options: ['120°', '135°', '144°', '150°'],
    correctAnswer: 1,
    explanation: '\\text{Ángulo} = \\frac{180°(8-2)}{8} = \\frac{180° \\times 6}{8} = \\frac{1080°}{8} = 135°',
    difficulty: 'medium',
    skills: ['geometria-poligonos', 'geometria-angulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo006-22',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulo exterior} = \\frac{360°}{n}',
    questionLatex: '\\text{¿Cuánto mide cada ángulo exterior de un pentágono regular?}',
    options: ['60°', '72°', '90°', '108°'],
    correctAnswer: 1,
    explanation: '\\text{Ángulo exterior} = \\frac{360°}{5} = 72°',
    difficulty: 'easy',
    skills: ['geometria-poligonos', 'geometria-angulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo006-23',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Suma ángulos exteriores} = 360°',
    questionLatex: '\\text{¿Cuánto suma los ángulos exteriores de cualquier polígono convexo?}',
    options: ['180°', '270°', '360°', 'Depende del número de lados'],
    correctAnswer: 2,
    explanation: '\\text{La suma de los ángulos exteriores de cualquier polígono convexo es siempre 360°}',
    difficulty: 'easy',
    skills: ['geometria-poligonos', 'geometria-angulos']
  },
  {
    id: 'm1-geo006-24',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\frac{180°(n-2)}{n} = 140°',
    questionLatex: '\\text{Si cada ángulo interior de un polígono regular mide 140°, ¿cuántos lados tiene?}',
    options: ['7 lados', '8 lados', '9 lados', '10 lados'],
    correctAnswer: 2,
    explanation: '\\frac{180(n-2)}{n} = 140 \\Rightarrow 180n - 360 = 140n \\Rightarrow 40n = 360 \\Rightarrow n = 9',
    difficulty: 'hard',
    skills: ['geometria-poligonos', 'geometria-angulos', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-geo006-25',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulo interior + exterior} = 180°',
    questionLatex: '\\text{El ángulo interior de un polígono regular mide 150°. ¿Cuánto mide su ángulo exterior?}',
    options: ['15°', '30°', '45°', '60°'],
    correctAnswer: 1,
    explanation: '\\text{Ángulo exterior} = 180° - 150° = 30°',
    difficulty: 'easy',
    skills: ['geometria-poligonos', 'geometria-angulos', 'numeros-operaciones-basicas']
  }
];
