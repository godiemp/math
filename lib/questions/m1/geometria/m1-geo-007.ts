import { Question } from '../../../types';

/**
 * M1-GEO-007: Propiedades de circunferencias y círculos
 * Chilean PAES Curriculum - Geometry Subsection 007
 *
 * This subsection covers:
 * - A: Ángulos centrales e inscritos
 * - B: Arcos y cuerdas
 * - C: Tangentes y secantes
 * - D: Relaciones entre ángulos y arcos
 *
 * Total: 20 questions
 */

export const m1Geo007Questions: Question[] = [
  // ========================================
  // ÁNGULOS CENTRALES E INSCRITOS
  // ========================================
  {
    id: 'm1-geo007-1',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulo central} = \\text{arco}',
    questionLatex: '\\text{Un ángulo central es aquel cuyo vértice está en el centro de la circunferencia. Si un ángulo central mide 80°, ¿cuánto mide el arco que subtiende?}',
    options: ['40°', '80°', '160°', '320°'],
    correctAnswer: 1,
    explanation: '\\text{El ángulo central es igual a la medida del arco que subtiende: 80°}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-angulos', 'geometria-angulo-central']
  },
  {
    id: 'm1-geo007-2',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulo inscrito} = \\frac{\\text{arco}}{2}',
    questionLatex: '\\text{Un ángulo inscrito es aquel cuyo vértice está sobre la circunferencia. Si un arco mide 100°, ¿cuánto mide el ángulo inscrito que lo subtiende?}',
    options: ['50°', '100°', '150°', '200°'],
    correctAnswer: 0,
    explanation: '\\text{El ángulo inscrito es la mitad del arco que subtiende: } \\frac{100°}{2} = 50°',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-angulos', 'geometria-angulo-inscrito']
  },
  {
    id: 'm1-geo007-3',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulo inscrito} = \\frac{\\text{ángulo central}}{2}',
    questionLatex: '\\text{Si un ángulo central mide 120° y un ángulo inscrito subtiende el mismo arco, ¿cuánto mide el ángulo inscrito?}',
    options: ['30°', '60°', '120°', '240°'],
    correctAnswer: 1,
    explanation: '\\text{El ángulo inscrito es la mitad del ángulo central: } \\frac{120°}{2} = 60°',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-angulos', 'geometria-angulo-inscrito', 'geometria-angulo-central']
  },
  {
    id: 'm1-geo007-4',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulo inscrito en semicírculo} = 90°',
    questionLatex: '\\text{Un ángulo inscrito que subtiende un diámetro (semicírculo) mide:}',
    options: ['45°', '60°', '90°', '180°'],
    correctAnswer: 2,
    explanation: '\\text{Todo ángulo inscrito que subtiende un diámetro es un ángulo recto de 90°}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-angulos', 'geometria-angulo-inscrito']
  },
  {
    id: 'm1-geo007-5',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulos inscritos iguales}',
    questionLatex: '\\text{Dos ángulos inscritos que subtienden el mismo arco son:}',
    options: ['Complementarios', 'Suplementarios', 'Iguales', 'Opuestos'],
    correctAnswer: 2,
    explanation: '\\text{Todos los ángulos inscritos que subtienden el mismo arco son iguales}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-angulos', 'geometria-angulo-inscrito']
  },
  // ========================================
  // ARCOS Y CUERDAS
  // ========================================
  {
    id: 'm1-geo007-6',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Cuerdas iguales} \\Rightarrow \\text{arcos iguales}',
    questionLatex: '\\text{En una circunferencia, dos cuerdas tienen la misma longitud. ¿Qué podemos afirmar sobre los arcos que subtienden?}',
    options: ['Son diferentes', 'Son iguales', 'Uno es el doble del otro', 'No se puede determinar'],
    correctAnswer: 1,
    explanation: '\\text{Cuerdas iguales subtienden arcos iguales en la misma circunferencia}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-cuerdas', 'geometria-arcos']
  },
  {
    id: 'm1-geo007-7',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Diámetro} = \\text{cuerda mayor}',
    questionLatex: '\\text{¿Cuál es la cuerda más larga que se puede trazar en una circunferencia de radio 5 cm?}',
    options: ['5 cm', '10 cm', '15 cm', '25 cm'],
    correctAnswer: 1,
    explanation: '\\text{La cuerda más larga es el diámetro: } 2r = 2 \\times 5 = 10 \\text{ cm}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-cuerdas', 'geometria-diametro']
  },
  {
    id: 'm1-geo007-8',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Perpendicular desde centro biseca cuerda}',
    questionLatex: '\\text{Una cuerda de 16 cm está a 6 cm del centro de la circunferencia. ¿Cuál es el radio de la circunferencia?}',
    options: ['8 cm', '10 cm', '12 cm', '14 cm'],
    correctAnswer: 1,
    explanation: '\\text{La perpendicular biseca la cuerda: mitad} = 8. \\text{ Por Pitágoras: } r = \\sqrt{8^2 + 6^2} = 10',
    difficulty: 'hard',
    skills: ['geometria-circulos', 'geometria-cuerdas', 'geometria-pitagoras', 'numeros-raices']
  },
  // ========================================
  // TANGENTES
  // ========================================
  {
    id: 'm1-geo007-9',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Tangente} \\perp \\text{radio}',
    questionLatex: '\\text{Una línea tangente a una circunferencia forma con el radio en el punto de tangencia un ángulo de:}',
    options: ['45°', '60°', '90°', '180°'],
    correctAnswer: 2,
    explanation: '\\text{La tangente es perpendicular al radio en el punto de tangencia: 90°}',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-tangentes', 'geometria-angulos']
  },
  {
    id: 'm1-geo007-10',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Tangentes desde punto externo}',
    questionLatex: '\\text{Desde un punto externo P se trazan dos tangentes a una circunferencia. Si una tangente mide 12 cm, ¿cuánto mide la otra?}',
    options: ['6 cm', '12 cm', '24 cm', 'Depende del radio'],
    correctAnswer: 1,
    explanation: '\\text{Las dos tangentes trazadas desde un mismo punto externo son iguales: 12 cm}',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-tangentes']
  },
  {
    id: 'm1-geo007-11',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Tangente desde punto externo}',
    questionLatex: '\\text{Un punto P está a 13 cm del centro de una circunferencia de radio 5 cm. ¿Cuánto mide la tangente desde P hasta el punto de tangencia?}',
    options: ['8 cm', '12 cm', '18 cm', '\\sqrt{194} \\text{ cm}'],
    correctAnswer: 1,
    explanation: 't^2 + 5^2 = 13^2 \\Rightarrow t^2 = 169 - 25 = 144 \\Rightarrow t = 12 \\text{ cm}',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-tangentes', 'geometria-pitagoras', 'numeros-raices']
  },
  // ========================================
  // ÁNGULOS FORMADOS POR CUERDAS, SECANTES Y TANGENTES
  // ========================================
  {
    id: 'm1-geo007-12',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulo entre dos cuerdas} = \\frac{\\text{arco}_1 + \\text{arco}_2}{2}',
    questionLatex: '\\text{Dos cuerdas se intersectan dentro de una circunferencia. Los arcos interceptados miden 70° y 110°. ¿Cuánto mide el ángulo formado en la intersección?}',
    options: ['70°', '90°', '110°', '180°'],
    correctAnswer: 1,
    explanation: '\\text{Ángulo} = \\frac{70° + 110°}{2} = \\frac{180°}{2} = 90°',
    difficulty: 'hard',
    skills: ['geometria-circulos', 'geometria-cuerdas', 'geometria-angulos']
  },
  {
    id: 'm1-geo007-13',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulo tangente-cuerda} = \\frac{\\text{arco}}{2}',
    questionLatex: '\\text{El ángulo formado entre una tangente y una cuerda que parten del mismo punto en la circunferencia es igual a:}',
    options: ['El arco interceptado', 'La mitad del arco interceptado', 'El doble del arco interceptado', 'La cuarta parte del arco'],
    correctAnswer: 1,
    explanation: '\\text{El ángulo tangente-cuerda es la mitad del arco interceptado}',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-tangentes', 'geometria-cuerdas', 'geometria-angulos']
  },
  {
    id: 'm1-geo007-14',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulo entre secantes externas}',
    questionLatex: '\\text{Dos secantes desde un punto externo interceptan arcos de 120° y 40°. ¿Cuánto mide el ángulo entre las secantes?}',
    options: ['40°', '60°', '80°', '160°'],
    correctAnswer: 0,
    explanation: '\\text{Ángulo} = \\frac{|120° - 40°|}{2} = \\frac{80°}{2} = 40°',
    difficulty: 'hard',
    skills: ['geometria-circulos', 'geometria-secantes', 'geometria-angulos']
  },
  // ========================================
  // PROBLEMAS DE APLICACIÓN
  // ========================================
  {
    id: 'm1-geo007-15',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Arco + arco} = 360°',
    questionLatex: '\\text{Un ángulo central de una circunferencia mide 150°. ¿Cuánto mide el arco mayor (el arco complementario)?}',
    options: ['30°', '150°', '180°', '210°'],
    correctAnswer: 3,
    explanation: '\\text{Arco mayor} = 360° - 150° = 210°',
    difficulty: 'easy',
    skills: ['geometria-circulos', 'geometria-arcos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo007-16',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Ángulo inscrito}',
    questionLatex: '\\text{Un ángulo inscrito en una circunferencia mide 35°. ¿Cuánto mide el ángulo central que subtiende el mismo arco?}',
    options: ['17.5°', '35°', '70°', '140°'],
    correctAnswer: 2,
    explanation: '\\text{El ángulo central es el doble del inscrito: } 35° \\times 2 = 70°',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-angulo-inscrito', 'geometria-angulo-central']
  },
  {
    id: 'm1-geo007-17',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Cuadrilátero inscrito}',
    questionLatex: '\\text{En un cuadrilátero inscrito en una circunferencia, los ángulos opuestos:}',
    options: ['Son iguales', 'Son complementarios (suman 90°)', 'Son suplementarios (suman 180°)', 'Suman 360°'],
    correctAnswer: 2,
    explanation: '\\text{Los ángulos opuestos de un cuadrilátero inscrito son suplementarios (suman 180°)}',
    difficulty: 'hard',
    skills: ['geometria-circulos', 'geometria-cuadrilateros', 'geometria-angulos']
  },
  {
    id: 'm1-geo007-18',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: '\\text{Cuadrilátero inscrito}',
    questionLatex: '\\text{En un cuadrilátero inscrito, un ángulo mide 75°. ¿Cuánto mide el ángulo opuesto?}',
    options: ['75°', '105°', '115°', '150°'],
    correctAnswer: 1,
    explanation: '\\text{Ángulo opuesto} = 180° - 75° = 105°',
    difficulty: 'medium',
    skills: ['geometria-circulos', 'geometria-cuadrilateros', 'geometria-angulos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo007-19',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'L = \\frac{\\theta}{360°} \\times 2\\pi r',
    questionLatex: '\\text{¿Cuál es la longitud de un arco de 60° en una circunferencia de radio 6 cm? (Usar } \\pi \\approx 3.14\\text{)}',
    options: ['3.14 cm', '6.28 cm', '12.56 cm', '18.84 cm'],
    correctAnswer: 1,
    explanation: 'L = \\frac{60}{360} \\times 2 \\times 3.14 \\times 6 = \\frac{1}{6} \\times 37.68 = 6.28 \\text{ cm}',
    difficulty: 'hard',
    skills: ['geometria-circulos', 'geometria-arcos', 'geometria-perimetro', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-geo007-20',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    operacionBase: 'A = \\frac{\\theta}{360°} \\times \\pi r^2',
    questionLatex: '\\text{¿Cuál es el área de un sector circular de 90° en una circunferencia de radio 4 cm? (Usar } \\pi \\approx 3.14\\text{)}',
    options: ['3.14 cm²', '6.28 cm²', '12.56 cm²', '50.24 cm²'],
    correctAnswer: 2,
    explanation: 'A = \\frac{90}{360} \\times 3.14 \\times 4^2 = \\frac{1}{4} \\times 3.14 \\times 16 = 12.56 \\text{ cm}^2',
    difficulty: 'hard',
    skills: ['geometria-circulos', 'geometria-area', 'numeros-operaciones-basicas']
  }
];
