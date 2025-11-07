import { Question } from './types';

export const questions: Question[] = [
  // M1 Questions - Basic Level
  {
    id: 'm1-1',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    question: 'Si 3 obreros construyen un muro en 12 días, ¿cuántos días tardarán 4 obreros en construir el mismo muro?',
    questionLatex: '\\text{Si 3 obreros construyen un muro en 12 días, ¿cuántos días tardarán 4 obreros en construir el mismo muro?}',
    options: ['8 días', '9 días', '10 días', '16 días'],
    correctAnswer: 1,
    explanation: 'Es una proporción inversa. Si aumentan los obreros, disminuyen los días.',
    explanationLatex: '3 \\times 12 = 4 \\times x \\text{, entonces } x = \\frac{36}{4} = 9 \\text{ días}',
    difficulty: 'easy'
  },
  {
    id: 'm1-2',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Si $f(x) = 2x + 3$, ¿cuál es el valor de $f(5)$?',
    questionLatex: '\\text{Si } f(x) = 2x + 3 \\text{, ¿cuál es el valor de } f(5)?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 3,
    explanation: 'Sustituimos $x = 5$:',
    explanationLatex: 'f(5) = 2(5) + 3 = 10 + 3 = 13',
    difficulty: 'easy'
  },
  {
    id: 'm1-3',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un triángulo rectángulo tiene catetos de 3 cm y 4 cm. ¿Cuál es la longitud de su hipotenusa?',
    questionLatex: '\\text{Un triángulo rectángulo tiene catetos de 3 cm y 4 cm. ¿Cuál es la longitud de su hipotenusa?}',
    options: ['5 cm', '6 cm', '7 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'Por el teorema de Pitágoras:',
    explanationLatex: 'h^2 = 3^2 + 4^2 = 9 + 16 = 25 \\text{, entonces } h = \\sqrt{25} = 5 \\text{ cm}',
    difficulty: 'easy'
  },
  {
    id: 'm1-4',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Al lanzar un dado de 6 caras, ¿cuál es la probabilidad de obtener un número par?',
    questionLatex: '\\text{Al lanzar un dado de 6 caras, ¿cuál es la probabilidad de obtener un número par?}',
    options: ['$\\frac{1}{6}$', '$\\frac{1}{3}$', '$\\frac{1}{2}$', '$\\frac{2}{3}$'],
    optionsLatex: ['\\frac{1}{6}', '\\frac{1}{3}', '\\frac{1}{2}', '\\frac{2}{3}'],
    correctAnswer: 2,
    explanation: 'Los números pares son 2, 4 y 6. Hay 3 casos favorables de 6 posibles:',
    explanationLatex: 'P = \\frac{3}{6} = \\frac{1}{2}',
    difficulty: 'easy'
  },
  {
    id: 'm1-5',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Resolver la ecuación: $2x - 5 = 11$',
    questionLatex: '\\text{Resolver la ecuación: } 2x - 5 = 11',
    options: ['$x = 6$', '$x = 7$', '$x = 8$', '$x = 9$'],
    optionsLatex: ['x = 6', 'x = 7', 'x = 8', 'x = 9'],
    correctAnswer: 2,
    explanation: 'Despejamos $x$:',
    explanationLatex: '2x - 5 = 11 \\rightarrow 2x = 16 \\rightarrow x = 8',
    difficulty: 'easy'
  },
  {
    id: 'm1-6',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un círculo con radio 5 cm es aproximadamente (usar $\\pi \\approx 3.14$):',
    questionLatex: '\\text{El área de un círculo con radio 5 cm es aproximadamente (usar } \\pi \\approx 3.14):',
    options: ['31.4 cm²', '62.8 cm²', '78.5 cm²', '157 cm²'],
    correctAnswer: 2,
    explanation: 'Usamos la fórmula del área del círculo:',
    explanationLatex: 'A = \\pi r^2 = 3.14 \\times 5^2 = 3.14 \\times 25 = 78.5 \\text{ cm}^2',
    difficulty: 'medium'
  },
  {
    id: 'm1-7',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    question: 'El 25% de 80 es igual a:',
    questionLatex: '\\text{El 25\\% de 80 es igual a:}',
    options: ['15', '20', '25', '30'],
    correctAnswer: 1,
    explanation: 'Calculamos el porcentaje:',
    explanationLatex: '25\\% \\text{ de } 80 = 0.25 \\times 80 = 20',
    difficulty: 'easy'
  },
  {
    id: 'm1-8',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'La media aritmética de los números 4, 6, 8 y 10 es:',
    questionLatex: '\\text{La media aritmética de los números 4, 6, 8 y 10 es:}',
    options: ['6', '7', '8', '9'],
    correctAnswer: 1,
    explanation: 'Calculamos la media:',
    explanationLatex: '\\bar{x} = \\frac{4 + 6 + 8 + 10}{4} = \\frac{28}{4} = 7',
    difficulty: 'easy'
  },
  // Additional M1 Questions - Números
  {
    id: 'm1-9',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    question: '¿Cuál es el resultado de $\\frac{2}{3} + \\frac{1}{4}$?',
    questionLatex: '\\text{¿Cuál es el resultado de } \\frac{2}{3} + \\frac{1}{4}?',
    options: ['$\\frac{3}{7}$', '$\\frac{11}{12}$', '$\\frac{5}{6}$', '$\\frac{3}{4}$'],
    optionsLatex: ['\\frac{3}{7}', '\\frac{11}{12}', '\\frac{5}{6}', '\\frac{3}{4}'],
    correctAnswer: 1,
    explanation: 'Para sumar fracciones, necesitamos un denominador común:',
    explanationLatex: '\\frac{2}{3} + \\frac{1}{4} = \\frac{8}{12} + \\frac{3}{12} = \\frac{11}{12}',
    difficulty: 'easy'
  },
  {
    id: 'm1-10',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    question: '¿Cuál es el valor de $\\sqrt{49}$?',
    questionLatex: '\\text{¿Cuál es el valor de } \\sqrt{49}?',
    options: ['6', '7', '8', '24.5'],
    correctAnswer: 1,
    explanation: 'La raíz cuadrada de 49 es el número que multiplicado por sí mismo da 49:',
    explanationLatex: '\\sqrt{49} = 7 \\text{ porque } 7 \\times 7 = 49',
    difficulty: 'easy'
  },
  {
    id: 'm1-11',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    question: '¿Cuál es el Máximo Común Divisor (MCD) de 12 y 18?',
    questionLatex: '\\text{¿Cuál es el Máximo Común Divisor (MCD) de 12 y 18?}',
    options: ['2', '3', '6', '36'],
    correctAnswer: 2,
    explanation: 'Factorizamos ambos números y encontramos los factores comunes:',
    explanationLatex: '12 = 2^2 \\times 3, \\quad 18 = 2 \\times 3^2 \\quad \\Rightarrow \\quad \\text{MCD} = 2 \\times 3 = 6',
    difficulty: 'medium'
  },
  {
    id: 'm1-12',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    question: '¿Cuál es el resultado de $2^4$?',
    questionLatex: '\\text{¿Cuál es el resultado de } 2^4?',
    options: ['8', '16', '24', '32'],
    correctAnswer: 1,
    explanation: 'Multiplicamos 2 por sí mismo 4 veces:',
    explanationLatex: '2^4 = 2 \\times 2 \\times 2 \\times 2 = 16',
    difficulty: 'easy'
  },
  // Additional M1 Questions - Álgebra
  {
    id: 'm1-13',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Simplificar la expresión: $3x + 5x - 2x$',
    questionLatex: '\\text{Simplificar la expresión: } 3x + 5x - 2x',
    options: ['$6x$', '$10x$', '$8x$', '$5x$'],
    optionsLatex: ['6x', '10x', '8x', '5x'],
    correctAnswer: 0,
    explanation: 'Sumamos y restamos los coeficientes de términos semejantes:',
    explanationLatex: '3x + 5x - 2x = (3 + 5 - 2)x = 6x',
    difficulty: 'easy'
  },
  {
    id: 'm1-14',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Factorizar: $x^2 - 9$',
    questionLatex: '\\text{Factorizar: } x^2 - 9',
    options: ['$(x-3)(x-3)$', '$(x+3)(x+3)$', '$(x-3)(x+3)$', '$x(x-9)$'],
    optionsLatex: ['(x-3)(x-3)', '(x+3)(x+3)', '(x-3)(x+3)', 'x(x-9)'],
    correctAnswer: 2,
    explanation: 'Es una diferencia de cuadrados:',
    explanationLatex: 'x^2 - 9 = x^2 - 3^2 = (x-3)(x+3)',
    difficulty: 'medium'
  },
  {
    id: 'm1-15',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Si $y = 3x - 2$, ¿cuál es la pendiente de la recta?',
    questionLatex: '\\text{Si } y = 3x - 2 \\text{, ¿cuál es la pendiente de la recta?}',
    options: ['-2', '2', '3', '-3'],
    correctAnswer: 2,
    explanation: 'En la forma $y = mx + b$, $m$ es la pendiente:',
    explanationLatex: 'y = 3x - 2 \\quad \\Rightarrow \\quad m = 3',
    difficulty: 'easy'
  },
  {
    id: 'm1-16',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Resolver la desigualdad: $2x + 3 > 7$',
    questionLatex: '\\text{Resolver la desigualdad: } 2x + 3 > 7',
    options: ['$x > 2$', '$x < 2$', '$x > 5$', '$x < 5$'],
    optionsLatex: ['x > 2', 'x < 2', 'x > 5', 'x < 5'],
    correctAnswer: 0,
    explanation: 'Despejamos $x$ igual que en una ecuación:',
    explanationLatex: '2x + 3 > 7 \\rightarrow 2x > 4 \\rightarrow x > 2',
    difficulty: 'medium'
  },
  // Additional M1 Questions - Geometría
  {
    id: 'm1-17',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si dos ángulos son complementarios y uno mide 35°, ¿cuánto mide el otro?',
    questionLatex: '\\text{Si dos ángulos son complementarios y uno mide } 35^\\circ\\text{, ¿cuánto mide el otro?}',
    options: ['55°', '65°', '145°', '325°'],
    correctAnswer: 0,
    explanation: 'Ángulos complementarios suman 90°:',
    explanationLatex: '90^\\circ - 35^\\circ = 55^\\circ',
    difficulty: 'easy'
  },
  {
    id: 'm1-18',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: '¿Cuál es el perímetro de un rectángulo de 8 cm de largo y 5 cm de ancho?',
    questionLatex: '\\text{¿Cuál es el perímetro de un rectángulo de 8 cm de largo y 5 cm de ancho?}',
    options: ['13 cm', '26 cm', '40 cm', '65 cm'],
    correctAnswer: 1,
    explanation: 'El perímetro de un rectángulo es:',
    explanationLatex: 'P = 2(\\text{largo} + \\text{ancho}) = 2(8 + 5) = 2(13) = 26 \\text{ cm}',
    difficulty: 'easy'
  },
  {
    id: 'm1-19',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un cubo tiene arista de 3 cm. ¿Cuál es su volumen?',
    questionLatex: '\\text{Un cubo tiene arista de 3 cm. ¿Cuál es su volumen?}',
    options: ['9 cm³', '18 cm³', '27 cm³', '36 cm³'],
    correctAnswer: 2,
    explanation: 'El volumen de un cubo es:',
    explanationLatex: 'V = a^3 = 3^3 = 27 \\text{ cm}^3',
    difficulty: 'easy'
  },
  {
    id: 'm1-20',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'La distancia entre los puntos $A(1, 2)$ y $B(4, 6)$ es:',
    questionLatex: '\\text{La distancia entre los puntos } A(1, 2) \\text{ y } B(4, 6) \\text{ es:}',
    options: ['3', '4', '5', '7'],
    correctAnswer: 2,
    explanation: 'Usamos la fórmula de distancia:',
    explanationLatex: 'd = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5',
    difficulty: 'medium'
  },
  {
    id: 'm1-21',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un trapecio con bases de 6 cm y 10 cm, y altura de 4 cm es:',
    questionLatex: '\\text{El área de un trapecio con bases de 6 cm y 10 cm, y altura de 4 cm es:}',
    options: ['24 cm²', '32 cm²', '40 cm²', '64 cm²'],
    correctAnswer: 1,
    explanation: 'El área de un trapecio es:',
    explanationLatex: 'A = \\frac{(b_1 + b_2) \\times h}{2} = \\frac{(6 + 10) \\times 4}{2} = \\frac{64}{2} = 32 \\text{ cm}^2',
    difficulty: 'medium'
  },
  // Additional M1 Questions - Probabilidad y Estadística
  {
    id: 'm1-22',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: '¿Cuál es la mediana del conjunto de datos: 3, 7, 5, 9, 11?',
    questionLatex: '\\text{¿Cuál es la mediana del conjunto de datos: 3, 7, 5, 9, 11?}',
    options: ['5', '7', '9', '11'],
    correctAnswer: 1,
    explanation: 'Primero ordenamos los datos: 3, 5, 7, 9, 11. La mediana es el valor central:',
    explanationLatex: '\\text{Mediana} = 7',
    difficulty: 'easy'
  },
  {
    id: 'm1-23',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: '¿Cuál es la moda del conjunto: 2, 3, 3, 5, 7, 3, 9?',
    questionLatex: '\\text{¿Cuál es la moda del conjunto: 2, 3, 3, 5, 7, 3, 9?}',
    options: ['2', '3', '5', '7'],
    correctAnswer: 1,
    explanation: 'La moda es el valor que más se repite:',
    explanationLatex: '\\text{Moda} = 3 \\text{ (aparece 3 veces)}',
    difficulty: 'easy'
  },
  {
    id: 'm1-24',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En una bolsa hay 5 bolas rojas y 3 azules. ¿Cuál es la probabilidad de sacar una bola azul?',
    questionLatex: '\\text{En una bolsa hay 5 bolas rojas y 3 azules. ¿Cuál es la probabilidad de sacar una bola azul?}',
    options: ['$\\frac{3}{5}$', '$\\frac{5}{8}$', '$\\frac{3}{8}$', '$\\frac{1}{3}$'],
    optionsLatex: ['\\frac{3}{5}', '\\frac{5}{8}', '\\frac{3}{8}', '\\frac{1}{3}'],
    correctAnswer: 2,
    explanation: 'La probabilidad es el cociente entre casos favorables y casos totales:',
    explanationLatex: 'P(\\text{azul}) = \\frac{3}{5+3} = \\frac{3}{8}',
    difficulty: 'easy'
  },
  {
    id: 'm1-25',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'El rango del conjunto de datos 12, 8, 15, 20, 9 es:',
    questionLatex: '\\text{El rango del conjunto de datos 12, 8, 15, 20, 9 es:}',
    options: ['8', '9', '12', '12'],
    correctAnswer: 2,
    explanation: 'El rango es la diferencia entre el valor máximo y mínimo:',
    explanationLatex: '\\text{Rango} = 20 - 8 = 12',
    difficulty: 'easy'
  },

  // M2 Questions - Advanced PAES topics (NO calculus)
  {
    id: 'm2-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'El mínimo común múltiplo (MCM) de 12, 18 y 24 es:',
    questionLatex: '\\text{El mínimo común múltiplo (MCM) de 12, 18 y 24 es:}',
    options: ['36', '48', '72', '144'],
    correctAnswer: 2,
    explanation: 'Factorizando: 12 = 2² × 3, 18 = 2 × 3², 24 = 2³ × 3. MCM = 2³ × 3² = 8 × 9 = 72',
    explanationLatex: '12 = 2^2 \\times 3, \\quad 18 = 2 \\times 3^2, \\quad 24 = 2^3 \\times 3 \\quad \\Rightarrow \\quad \\text{MCM} = 2^3 \\times 3^2 = 8 \\times 9 = 72',
    difficulty: 'medium'
  },
  {
    id: 'm2-2',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Resuelve el sistema: 2x + y = 8 y x - y = 1',
    questionLatex: '\\text{Resuelve el sistema: } 2x + y = 8 \\text{ y } x - y = 1',
    options: ['x = 2, y = 4', 'x = 3, y = 2', 'x = 4, y = 0', 'x = 1, y = 6'],
    correctAnswer: 1,
    explanation: 'Sumando las ecuaciones: 3x = 9, entonces x = 3. Sustituyendo: 3 - y = 1, entonces y = 2',
    explanationLatex: '3x = 9 \\rightarrow x = 3. \\quad \\text{Sustituyendo: } 3 - y = 1 \\rightarrow y = 2',
    difficulty: 'medium'
  },
  {
    id: 'm2-3',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Las raíces de la ecuación x² - 5x + 6 = 0 son:',
    questionLatex: '\\text{Las raíces de la ecuación } x^2 - 5x + 6 = 0 \\text{ son:}',
    options: ['x = 1, x = 6', 'x = 2, x = 3', 'x = -2, x = -3', 'x = 1, x = 5'],
    correctAnswer: 1,
    explanation: 'Factorizando: (x - 2)(x - 3) = 0, por lo tanto x = 2 o x = 3',
    explanationLatex: '(x - 2)(x - 3) = 0 \\quad \\Rightarrow \\quad x = 2 \\text{ o } x = 3',
    difficulty: 'medium'
  },
  {
    id: 'm2-4',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'La distancia entre los puntos A(1, 2) y B(4, 6) es:',
    questionLatex: '\\text{La distancia entre los puntos } A(1, 2) \\text{ y } B(4, 6) \\text{ es:}',
    options: ['3', '4', '5', '7'],
    correctAnswer: 2,
    explanation: 'd = √[(4-1)² + (6-2)²] = √[3² + 4²] = √[9 + 16] = √25 = 5',
    explanationLatex: 'd = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5',
    difficulty: 'medium'
  },
  {
    id: 'm2-5',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El volumen de un cilindro con radio 3 cm y altura 4 cm es (usar π ≈ 3.14):',
    questionLatex: '\\text{El volumen de un cilindro con radio 3 cm y altura 4 cm es (usar } \\pi \\approx 3.14):',
    options: ['37.68 cm³', '75.36 cm³', '113.04 cm³', '150.72 cm³'],
    correctAnswer: 2,
    explanation: 'V = πr²h = 3.14 × 3² × 4 = 3.14 × 9 × 4 = 113.04 cm³',
    explanationLatex: 'V = \\pi r^2 h = 3.14 \\times 3^2 \\times 4 = 3.14 \\times 9 \\times 4 = 113.04 \\text{ cm}^3',
    difficulty: 'medium'
  },
  {
    id: 'm2-6',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'El discriminante de x² + 4x + 1 = 0 es:',
    questionLatex: '\\text{El discriminante de } x^2 + 4x + 1 = 0 \\text{ es:}',
    options: ['12', '16', '20', '8'],
    correctAnswer: 0,
    explanation: 'Discriminante = b² - 4ac = 4² - 4(1)(1) = 16 - 4 = 12. Como es > 0, hay dos soluciones reales.',
    explanationLatex: '\\Delta = b^2 - 4ac = 4^2 - 4(1)(1) = 16 - 4 = 12',
    difficulty: 'medium'
  },
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
    difficulty: 'hard'
  },
  {
    id: 'm2-8',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: '¿De cuántas formas se pueden elegir 3 estudiantes de un grupo de 5?',
    questionLatex: '\\text{¿De cuántas formas se pueden elegir 3 estudiantes de un grupo de 5?}',
    options: ['10', '15', '20', '60'],
    correctAnswer: 0,
    explanation: 'Combinaciones: C(5,3) = 5!/(3!×2!) = (5×4)/(2×1) = 10',
    explanationLatex: 'C(5,3) = \\frac{5!}{3! \\times 2!} = \\frac{5 \\times 4}{2 \\times 1} = 10',
    difficulty: 'medium'
  },
  {
    id: 'm2-9',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Racionaliza: 6/√3',
    questionLatex: '\\text{Racionaliza: } \\frac{6}{\\sqrt{3}}',
    options: ['2√3', '3√2', '6√3', '√18'],
    optionsLatex: ['2\\sqrt{3}', '3\\sqrt{2}', '6\\sqrt{3}', '\\sqrt{18}'],
    correctAnswer: 0,
    explanation: '6/√3 = (6/√3) × (√3/√3) = 6√3/3 = 2√3',
    explanationLatex: '\\frac{6}{\\sqrt{3}} = \\frac{6}{\\sqrt{3}} \\times \\frac{\\sqrt{3}}{\\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}',
    difficulty: 'medium'
  },
  {
    id: 'm2-10',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Dos rectas son perpendiculares. Si una tiene pendiente m = 2, ¿cuál es la pendiente de la otra?',
    questionLatex: '\\text{Dos rectas son perpendiculares. Si una tiene pendiente } m = 2\\text{, ¿cuál es la pendiente de la otra?}',
    options: ['2', '-2', '1/2', '-1/2'],
    optionsLatex: ['2', '-2', '\\frac{1}{2}', '-\\frac{1}{2}'],
    correctAnswer: 3,
    explanation: 'Rectas perpendiculares tienen pendientes que son recíprocas negativas: m₁ × m₂ = -1. Si m₁ = 2, entonces m₂ = -1/2',
    explanationLatex: 'm_1 \\times m_2 = -1 \\quad \\Rightarrow \\quad 2 \\times m_2 = -1 \\quad \\Rightarrow \\quad m_2 = -\\frac{1}{2}',
    difficulty: 'medium'
  },

  // PHASE 1 (CRITICAL) - Additional Practice Questions from Official Curriculum

  // Números - Fractions (division and multiplication)
  {
    id: 'm1-26',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    question: '¿Cuál es el resultado de $\\frac{3}{4} \\times \\frac{2}{5}$?',
    questionLatex: '\\text{¿Cuál es el resultado de } \\frac{3}{4} \\times \\frac{2}{5}?',
    options: ['$\\frac{5}{9}$', '$\\frac{6}{20}$', '$\\frac{3}{10}$', '$\\frac{6}{9}$'],
    optionsLatex: ['\\frac{5}{9}', '\\frac{6}{20}', '\\frac{3}{10}', '\\frac{6}{9}'],
    correctAnswer: 2,
    explanation: 'Multiplicamos numeradores y denominadores:',
    explanationLatex: '\\frac{3}{4} \\times \\frac{2}{5} = \\frac{3 \\times 2}{4 \\times 5} = \\frac{6}{20} = \\frac{3}{10}',
    difficulty: 'easy'
  },
  {
    id: 'm1-27',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    question: '¿Cuál es el resultado de $\\frac{2}{3} \\div \\frac{4}{5}$?',
    questionLatex: '\\text{¿Cuál es el resultado de } \\frac{2}{3} \\div \\frac{4}{5}?',
    options: ['$\\frac{8}{15}$', '$\\frac{5}{6}$', '$\\frac{10}{12}$', '$\\frac{6}{5}$'],
    optionsLatex: ['\\frac{8}{15}', '\\frac{5}{6}', '\\frac{10}{12}', '\\frac{6}{5}'],
    correctAnswer: 1,
    explanation: 'Para dividir fracciones, multiplicamos por el recíproco:',
    explanationLatex: '\\frac{2}{3} \\div \\frac{4}{5} = \\frac{2}{3} \\times \\frac{5}{4} = \\frac{10}{12} = \\frac{5}{6}',
    difficulty: 'medium'
  },

  // Números - Decimals
  {
    id: 'm1-28',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    question: '¿Cuál es el resultado de 3.5 × 2.4?',
    questionLatex: '\\text{¿Cuál es el resultado de } 3.5 \\times 2.4?',
    options: ['7.4', '8.2', '8.4', '9.6'],
    correctAnswer: 2,
    explanation: 'Multiplicamos los decimales:',
    explanationLatex: '3.5 \\times 2.4 = 8.4',
    difficulty: 'easy'
  },
  {
    id: 'm1-29',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    question: 'Convierte la fracción $\\frac{3}{8}$ a decimal:',
    questionLatex: '\\text{Convierte la fracción } \\frac{3}{8} \\text{ a decimal:}',
    options: ['0.25', '0.325', '0.375', '0.425'],
    correctAnswer: 2,
    explanation: 'Dividimos 3 entre 8:',
    explanationLatex: '\\frac{3}{8} = 3 \\div 8 = 0.375',
    difficulty: 'easy'
  },

  // Números - Ratios and Proportions
  {
    id: 'm1-30',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    question: 'Si la razón entre dos números es 3:5 y el menor es 12, ¿cuál es el mayor?',
    questionLatex: '\\text{Si la razón entre dos números es } 3:5 \\text{ y el menor es 12, ¿cuál es el mayor?}',
    options: ['15', '18', '20', '25'],
    correctAnswer: 2,
    explanation: 'Si 3 partes equivalen a 12, cada parte vale 4. Entonces 5 partes:',
    explanationLatex: '\\frac{3}{5} = \\frac{12}{x} \\quad \\Rightarrow \\quad 3x = 60 \\quad \\Rightarrow \\quad x = 20',
    difficulty: 'medium'
  },
  {
    id: 'm1-31',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    question: 'Una receta para 4 personas requiere 200g de harina. ¿Cuántos gramos se necesitan para 6 personas?',
    questionLatex: '\\text{Una receta para 4 personas requiere 200g de harina. ¿Cuántos gramos se necesitan para 6 personas?}',
    options: ['250g', '280g', '300g', '350g'],
    correctAnswer: 2,
    explanation: 'Es una proporción directa:',
    explanationLatex: '\\frac{4}{200} = \\frac{6}{x} \\quad \\Rightarrow \\quad 4x = 1200 \\quad \\Rightarrow \\quad x = 300\\text{g}',
    difficulty: 'easy'
  },

  // Números - More Percentages
  {
    id: 'm1-32',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    question: 'Un producto cuesta $45,000 y tiene un descuento del 20%. ¿Cuál es el precio final?',
    questionLatex: '\\text{Un producto cuesta \\$45,000 y tiene un descuento del 20\\%. ¿Cuál es el precio final?}',
    options: ['$25,000', '$30,000', '$36,000', '$40,000'],
    correctAnswer: 2,
    explanation: 'Restamos el 20% del precio original:',
    explanationLatex: '45000 - (0.20 \\times 45000) = 45000 - 9000 = 36000',
    difficulty: 'medium'
  },
  {
    id: 'm1-33',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    question: 'Si un artículo aumenta su precio de $80 a $100, ¿cuál es el porcentaje de aumento?',
    questionLatex: '\\text{Si un artículo aumenta su precio de \\$80 a \\$100, ¿cuál es el porcentaje de aumento?}',
    options: ['20%', '25%', '30%', '40%'],
    correctAnswer: 1,
    explanation: 'El aumento es $20. Calculamos el porcentaje sobre el precio original:',
    explanationLatex: '\\frac{20}{80} \\times 100\\% = 25\\%',
    difficulty: 'medium'
  },

  // Álgebra - Distributing and Expanding
  {
    id: 'm1-34',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Expande: $3(x + 4)$',
    questionLatex: '\\text{Expande: } 3(x + 4)',
    options: ['$3x + 4$', '$3x + 12$', '$x + 12$', '$3x + 7$'],
    optionsLatex: ['3x + 4', '3x + 12', 'x + 12', '3x + 7'],
    correctAnswer: 1,
    explanation: 'Aplicamos la propiedad distributiva:',
    explanationLatex: '3(x + 4) = 3 \\cdot x + 3 \\cdot 4 = 3x + 12',
    difficulty: 'easy'
  },
  {
    id: 'm1-35',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Expande: $(x + 2)(x + 3)$',
    questionLatex: '\\text{Expande: } (x + 2)(x + 3)',
    options: ['$x^2 + 5x + 6$', '$x^2 + 6x + 5$', '$x^2 + 5x + 5$', '$x^2 + 6x + 6$'],
    optionsLatex: ['x^2 + 5x + 6', 'x^2 + 6x + 5', 'x^2 + 5x + 5', 'x^2 + 6x + 6'],
    correctAnswer: 0,
    explanation: 'Aplicamos FOIL (First, Outer, Inner, Last):',
    explanationLatex: '(x+2)(x+3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6',
    difficulty: 'medium'
  },

  // Geometría - Triangle Types
  {
    id: 'm1-36',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un triángulo tiene todos sus lados iguales. ¿Cómo se llama este triángulo?',
    questionLatex: '\\text{Un triángulo tiene todos sus lados iguales. ¿Cómo se llama este triángulo?}',
    options: ['Escaleno', 'Isósceles', 'Equilátero', 'Rectángulo'],
    correctAnswer: 2,
    explanation: 'Un triángulo con todos los lados iguales es equilátero.',
    explanationLatex: '\\text{Triángulo equilátero: todos los lados iguales}',
    difficulty: 'easy'
  },
  {
    id: 'm1-37',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'La suma de los ángulos interiores de un triángulo es:',
    questionLatex: '\\text{La suma de los ángulos interiores de un triángulo es:}',
    options: ['90°', '180°', '270°', '360°'],
    correctAnswer: 1,
    explanation: 'Propiedad fundamental de los triángulos:',
    explanationLatex: '\\text{La suma de los ángulos interiores de un triángulo siempre es } 180^\\circ',
    difficulty: 'easy'
  },
  {
    id: 'm1-38',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Un triángulo tiene ángulos de 60°, 70° y x. ¿Cuánto mide x?',
    questionLatex: '\\text{Un triángulo tiene ángulos de } 60^\\circ, 70^\\circ \\text{ y } x\\text{. ¿Cuánto mide } x?',
    options: ['40°', '50°', '60°', '70°'],
    correctAnswer: 1,
    explanation: 'La suma de los ángulos debe ser 180°:',
    explanationLatex: '60^\\circ + 70^\\circ + x = 180^\\circ \\quad \\Rightarrow \\quad x = 50^\\circ',
    difficulty: 'easy'
  },

  // Geometría - More Quadrilaterals
  {
    id: 'm1-39',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un cuadrado de lado 6 cm es:',
    questionLatex: '\\text{El área de un cuadrado de lado 6 cm es:}',
    options: ['12 cm²', '24 cm²', '36 cm²', '42 cm²'],
    correctAnswer: 2,
    explanation: 'El área de un cuadrado es lado al cuadrado:',
    explanationLatex: 'A = l^2 = 6^2 = 36 \\text{ cm}^2',
    difficulty: 'easy'
  },
  {
    id: 'm1-40',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un triángulo con base 10 cm y altura 6 cm es:',
    questionLatex: '\\text{El área de un triángulo con base 10 cm y altura 6 cm es:}',
    options: ['16 cm²', '30 cm²', '60 cm²', '100 cm²'],
    correctAnswer: 1,
    explanation: 'El área de un triángulo es base por altura dividido 2:',
    explanationLatex: 'A = \\frac{b \\times h}{2} = \\frac{10 \\times 6}{2} = 30 \\text{ cm}^2',
    difficulty: 'easy'
  },

  // Probabilidad - More Basic Probability
  {
    id: 'm1-41',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Al lanzar dos monedas, ¿cuál es la probabilidad de obtener dos caras?',
    questionLatex: '\\text{Al lanzar dos monedas, ¿cuál es la probabilidad de obtener dos caras?}',
    options: ['$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{1}{4}$', '$\\frac{1}{8}$'],
    optionsLatex: ['\\frac{1}{2}', '\\frac{1}{3}', '\\frac{1}{4}', '\\frac{1}{8}'],
    correctAnswer: 2,
    explanation: 'Hay 4 resultados posibles: CC, CS, SC, SS. Solo 1 es favorable:',
    explanationLatex: 'P(\\text{dos caras}) = \\frac{1}{4}',
    difficulty: 'medium'
  },
  {
    id: 'm1-42',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Si la probabilidad de lluvia es 0.3, ¿cuál es la probabilidad de que NO llueva?',
    questionLatex: '\\text{Si la probabilidad de lluvia es 0.3, ¿cuál es la probabilidad de que NO llueva?}',
    options: ['0.3', '0.5', '0.7', '1.0'],
    correctAnswer: 2,
    explanation: 'La probabilidad del evento complementario:',
    explanationLatex: 'P(\\text{no lluvia}) = 1 - P(\\text{lluvia}) = 1 - 0.3 = 0.7',
    difficulty: 'easy'
  },

  // PHASE 2 (HIGH PRIORITY) - Additional Practice Questions

  // Álgebra - Quadratic Formula
  {
    id: 'm2-11',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Resuelve usando la fórmula cuadrática: $x^2 + 6x + 5 = 0$',
    questionLatex: '\\text{Resuelve usando la fórmula cuadrática: } x^2 + 6x + 5 = 0',
    options: ['$x = -1, x = -5$', '$x = 1, x = 5$', '$x = -2, x = -3$', '$x = 2, x = 3$'],
    optionsLatex: ['x = -1, x = -5', 'x = 1, x = 5', 'x = -2, x = -3', 'x = 2, x = 3'],
    correctAnswer: 0,
    explanation: 'Aplicamos la fórmula cuadrática con a=1, b=6, c=5:',
    explanationLatex: 'x = \\frac{-6 \\pm \\sqrt{36-20}}{2} = \\frac{-6 \\pm 4}{2} \\quad \\Rightarrow \\quad x = -1 \\text{ o } x = -5',
    difficulty: 'medium'
  },
  {
    id: 'm2-12',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: '¿Cuántas soluciones reales tiene la ecuación $x^2 + 2x + 5 = 0$?',
    questionLatex: '\\text{¿Cuántas soluciones reales tiene la ecuación } x^2 + 2x + 5 = 0?',
    options: ['0', '1', '2', '3'],
    correctAnswer: 0,
    explanation: 'El discriminante es negativo:',
    explanationLatex: '\\Delta = b^2 - 4ac = 4 - 20 = -16 < 0 \\quad \\Rightarrow \\quad \\text{No hay soluciones reales}',
    difficulty: 'medium'
  },

  // Funciones - Domain and Range
  {
    id: 'm2-13',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: '¿Cuál es el dominio de $f(x) = \\frac{1}{x-3}$?',
    questionLatex: '\\text{¿Cuál es el dominio de } f(x) = \\frac{1}{x-3}?',
    options: ['Todos los reales', 'Todos los reales excepto x = 3', 'Todos los reales excepto x = -3', 'x > 3'],
    correctAnswer: 1,
    explanation: 'El denominador no puede ser cero:',
    explanationLatex: 'x - 3 \\neq 0 \\quad \\Rightarrow \\quad x \\neq 3',
    difficulty: 'medium'
  },
  {
    id: 'm2-14',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'El vértice de la parábola $y = x^2 - 4x + 3$ es:',
    questionLatex: '\\text{El vértice de la parábola } y = x^2 - 4x + 3 \\text{ es:}',
    options: ['(2, -1)', '(-2, 1)', '(2, 1)', '(-2, -1)'],
    correctAnswer: 0,
    explanation: 'El vértice está en x = -b/2a. Con a=1, b=-4:',
    explanationLatex: 'x = \\frac{-(-4)}{2(1)} = 2, \\quad y = 2^2 - 4(2) + 3 = -1 \\quad \\Rightarrow \\quad (2, -1)',
    difficulty: 'hard'
  },

  // Geometría - Special Triangles
  {
    id: 'm2-15',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'En un triángulo 45-45-90, si un cateto mide 5, ¿cuánto mide la hipotenusa?',
    questionLatex: '\\text{En un triángulo 45-45-90, si un cateto mide 5, ¿cuánto mide la hipotenusa?}',
    options: ['$5$', '$5\\sqrt{2}$', '$10$', '$5\\sqrt{3}$'],
    optionsLatex: ['5', '5\\sqrt{2}', '10', '5\\sqrt{3}'],
    correctAnswer: 1,
    explanation: 'En un triángulo 45-45-90, la razón es 1:1:√2:',
    explanationLatex: '\\text{Si cateto} = 5, \\text{ entonces hipotenusa} = 5\\sqrt{2}',
    difficulty: 'medium'
  },
  {
    id: 'm2-16',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'En un triángulo 30-60-90, si el lado opuesto al ángulo de 30° mide 4, ¿cuánto mide la hipotenusa?',
    questionLatex: '\\text{En un triángulo 30-60-90, si el lado opuesto al ángulo de } 30^\\circ \\text{ mide 4, ¿cuánto mide la hipotenusa?}',
    options: ['4', '6', '8', '12'],
    correctAnswer: 2,
    explanation: 'En un triángulo 30-60-90, la razón es 1:√3:2. El lado menor es 4:',
    explanationLatex: '\\text{Si el lado menor} = 4, \\text{ entonces hipotenusa} = 2 \\times 4 = 8',
    difficulty: 'medium'
  },

  // Geometría - 3D Volumes (Cone, Sphere, Pyramid)
  {
    id: 'm2-17',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El volumen de un cono con radio 3 cm y altura 4 cm es (usar π ≈ 3.14):',
    questionLatex: '\\text{El volumen de un cono con radio 3 cm y altura 4 cm es (usar } \\pi \\approx 3.14):',
    options: ['12.56 cm³', '25.12 cm³', '37.68 cm³', '50.24 cm³'],
    correctAnswer: 2,
    explanation: 'El volumen de un cono es V = (1/3)πr²h:',
    explanationLatex: 'V = \\frac{1}{3} \\times 3.14 \\times 3^2 \\times 4 = \\frac{1}{3} \\times 113.04 = 37.68 \\text{ cm}^3',
    difficulty: 'medium'
  },
  {
    id: 'm2-18',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El volumen de una esfera con radio 3 cm es (usar π ≈ 3.14):',
    questionLatex: '\\text{El volumen de una esfera con radio 3 cm es (usar } \\pi \\approx 3.14):',
    options: ['28.26 cm³', '56.52 cm³', '84.78 cm³', '113.04 cm³'],
    correctAnswer: 3,
    explanation: 'El volumen de una esfera es V = (4/3)πr³:',
    explanationLatex: 'V = \\frac{4}{3} \\times 3.14 \\times 3^3 = \\frac{4}{3} \\times 3.14 \\times 27 = 113.04 \\text{ cm}^3',
    difficulty: 'medium'
  },
  {
    id: 'm2-19',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El volumen de una pirámide de base cuadrada con lado 6 cm y altura 9 cm es:',
    questionLatex: '\\text{El volumen de una pirámide de base cuadrada con lado 6 cm y altura 9 cm es:}',
    options: ['54 cm³', '108 cm³', '162 cm³', '324 cm³'],
    correctAnswer: 1,
    explanation: 'El volumen de una pirámide es V = (1/3) × área base × altura:',
    explanationLatex: 'V = \\frac{1}{3} \\times 6^2 \\times 9 = \\frac{1}{3} \\times 36 \\times 9 = 108 \\text{ cm}^3',
    difficulty: 'medium'
  },

  // Geometría - Midpoint Formula
  {
    id: 'm2-20',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El punto medio entre A(2, 4) y B(6, 8) es:',
    questionLatex: '\\text{El punto medio entre } A(2, 4) \\text{ y } B(6, 8) \\text{ es:}',
    options: ['(3, 5)', '(4, 6)', '(5, 7)', '(8, 12)'],
    correctAnswer: 1,
    explanation: 'La fórmula del punto medio es M = ((x₁+x₂)/2, (y₁+y₂)/2):',
    explanationLatex: 'M = \\left(\\frac{2+6}{2}, \\frac{4+8}{2}\\right) = (4, 6)',
    difficulty: 'easy'
  },

  // Geometría - Parallel Lines and Angles
  {
    id: 'm2-21',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Dos ángulos suplementarios tienen la propiedad de que suman:',
    questionLatex: '\\text{Dos ángulos suplementarios tienen la propiedad de que suman:}',
    options: ['45°', '90°', '180°', '360°'],
    correctAnswer: 2,
    explanation: 'Ángulos suplementarios suman 180°:',
    explanationLatex: '\\text{Ángulos suplementarios: } \\alpha + \\beta = 180^\\circ',
    difficulty: 'easy'
  },
  {
    id: 'm2-22',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Dos rectas paralelas son cortadas por una transversal. Si un ángulo mide 120°, ¿cuánto mide su ángulo alterno interno?',
    questionLatex: '\\text{Dos rectas paralelas son cortadas por una transversal. Si un ángulo mide } 120^\\circ\\text{, ¿cuánto mide su ángulo alterno interno?}',
    options: ['60°', '90°', '120°', '180°'],
    correctAnswer: 2,
    explanation: 'Los ángulos alternos internos son iguales:',
    explanationLatex: '\\text{Ángulo alterno interno} = 120^\\circ',
    difficulty: 'medium'
  },

  // PHASE 3 (MEDIUM PRIORITY) - Additional Practice Questions

  // Números - Prime Factorization
  {
    id: 'm2-23',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: '¿Cuál es la factorización prima de 60?',
    questionLatex: '\\text{¿Cuál es la factorización prima de 60?}',
    options: ['$2^2 \\times 3 \\times 5$', '$2 \\times 3^2 \\times 5$', '$2 \\times 3 \\times 5^2$', '$2^3 \\times 3 \\times 5$'],
    optionsLatex: ['2^2 \\times 3 \\times 5', '2 \\times 3^2 \\times 5', '2 \\times 3 \\times 5^2', '2^3 \\times 3 \\times 5'],
    correctAnswer: 0,
    explanation: 'Factorizamos 60 en números primos:',
    explanationLatex: '60 = 2 \\times 30 = 2 \\times 2 \\times 15 = 2 \\times 2 \\times 3 \\times 5 = 2^2 \\times 3 \\times 5',
    difficulty: 'medium'
  },
  {
    id: 'm2-24',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: '¿Cuál de los siguientes números es primo?',
    questionLatex: '\\text{¿Cuál de los siguientes números es primo?}',
    options: ['21', '27', '29', '33'],
    correctAnswer: 2,
    explanation: 'Un número primo solo es divisible por 1 y por sí mismo:',
    explanationLatex: '29 \\text{ es primo (solo divisible por 1 y 29)}',
    difficulty: 'easy'
  },

  // Números - Simplifying Radicals
  {
    id: 'm2-25',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Simplifica: $\\sqrt{48}$',
    questionLatex: '\\text{Simplifica: } \\sqrt{48}',
    options: ['$4\\sqrt{3}$', '$3\\sqrt{4}$', '$6\\sqrt{2}$', '$2\\sqrt{6}$'],
    optionsLatex: ['4\\sqrt{3}', '3\\sqrt{4}', '6\\sqrt{2}', '2\\sqrt{6}'],
    correctAnswer: 0,
    explanation: 'Factorizamos 48 y sacamos los cuadrados perfectos:',
    explanationLatex: '\\sqrt{48} = \\sqrt{16 \\times 3} = \\sqrt{16} \\times \\sqrt{3} = 4\\sqrt{3}',
    difficulty: 'medium'
  },
  {
    id: 'm2-26',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: 'Simplifica: $\\sqrt{75}$',
    questionLatex: '\\text{Simplifica: } \\sqrt{75}',
    options: ['$5\\sqrt{3}$', '$3\\sqrt{5}$', '$15$', '$25\\sqrt{3}$'],
    optionsLatex: ['5\\sqrt{3}', '3\\sqrt{5}', '15', '25\\sqrt{3}'],
    correctAnswer: 0,
    explanation: 'Factorizamos 75:',
    explanationLatex: '\\sqrt{75} = \\sqrt{25 \\times 3} = \\sqrt{25} \\times \\sqrt{3} = 5\\sqrt{3}',
    difficulty: 'medium'
  },

  // Álgebra - Absolute Value Inequalities
  {
    id: 'm2-27',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Resuelve: $|x| < 3$',
    questionLatex: '\\text{Resuelve: } |x| < 3',
    options: ['$x < 3$', '$-3 < x < 3$', '$x > -3$', '$x < -3$ o $x > 3$'],
    optionsLatex: ['x < 3', '-3 < x < 3', 'x > -3', 'x < -3 \\text{ o } x > 3'],
    correctAnswer: 1,
    explanation: 'El valor absoluto menor que 3 significa:',
    explanationLatex: '|x| < 3 \\quad \\Rightarrow \\quad -3 < x < 3',
    difficulty: 'medium'
  },
  {
    id: 'm2-28',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Resuelve: $|x| > 2$',
    questionLatex: '\\text{Resuelve: } |x| > 2',
    options: ['$x > 2$', '$-2 < x < 2$', '$x < -2$ o $x > 2$', '$x > -2$'],
    optionsLatex: ['x > 2', '-2 < x < 2', 'x < -2 \\text{ o } x > 2', 'x > -2'],
    correctAnswer: 2,
    explanation: 'El valor absoluto mayor que 2 significa:',
    explanationLatex: '|x| > 2 \\quad \\Rightarrow \\quad x < -2 \\text{ o } x > 2',
    difficulty: 'medium'
  },

  // Álgebra - Compound Inequalities
  {
    id: 'm2-29',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Resuelve: $-3 \\leq x < 5$. ¿Cuántos enteros cumple $x$?',
    questionLatex: '\\text{Resuelve: } -3 \\leq x < 5\\text{. ¿Cuántos enteros cumple } x?',
    options: ['6', '7', '8', '9'],
    correctAnswer: 2,
    explanation: 'Los enteros son: -3, -2, -1, 0, 1, 2, 3, 4:',
    explanationLatex: '\\text{Enteros en } [-3, 5): \\{-3, -2, -1, 0, 1, 2, 3, 4\\} = 8 \\text{ valores}',
    difficulty: 'medium'
  },

  // Probabilidad y Estadística - Weighted Average
  {
    id: 'm2-30',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Un estudiante obtiene 80 en un examen que vale 30% y 90 en otro que vale 70%. ¿Cuál es su promedio ponderado?',
    questionLatex: '\\text{Un estudiante obtiene 80 en un examen que vale 30\\% y 90 en otro que vale 70\\%. ¿Cuál es su promedio ponderado?}',
    options: ['85', '86', '87', '88'],
    correctAnswer: 2,
    explanation: 'Multiplicamos cada nota por su peso:',
    explanationLatex: '80 \\times 0.30 + 90 \\times 0.70 = 24 + 63 = 87',
    difficulty: 'medium'
  },

  // Probabilidad - Permutations
  {
    id: 'm2-31',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: '¿De cuántas formas se pueden ordenar 4 libros en un estante?',
    questionLatex: '\\text{¿De cuántas formas se pueden ordenar 4 libros en un estante?}',
    options: ['4', '8', '16', '24'],
    correctAnswer: 3,
    explanation: 'Es una permutación de 4 elementos:',
    explanationLatex: 'P(4) = 4! = 4 \\times 3 \\times 2 \\times 1 = 24',
    difficulty: 'medium'
  },
  {
    id: 'm2-32',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: '¿Cuál es el valor de 5!?',
    questionLatex: '\\text{¿Cuál es el valor de } 5!?',
    options: ['20', '60', '120', '720'],
    correctAnswer: 2,
    explanation: 'El factorial es el producto de todos los enteros positivos hasta ese número:',
    explanationLatex: '5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120',
    difficulty: 'easy'
  },

  // Probabilidad - More Combinations
  {
    id: 'm2-33',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: '¿Cuántos grupos de 2 personas se pueden formar de 6 personas?',
    questionLatex: '\\text{¿Cuántos grupos de 2 personas se pueden formar de 6 personas?}',
    options: ['12', '15', '20', '30'],
    correctAnswer: 1,
    explanation: 'Usamos la fórmula de combinaciones:',
    explanationLatex: 'C(6,2) = \\frac{6!}{2! \\times 4!} = \\frac{6 \\times 5}{2 \\times 1} = 15',
    difficulty: 'medium'
  },

  // Probabilidad - Multiplication Rule
  {
    id: 'm2-34',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Al lanzar un dado y una moneda, ¿cuál es la probabilidad de obtener un 6 y cara?',
    questionLatex: '\\text{Al lanzar un dado y una moneda, ¿cuál es la probabilidad de obtener un 6 y cara?}',
    options: ['$\\frac{1}{6}$', '$\\frac{1}{8}$', '$\\frac{1}{12}$', '$\\frac{1}{2}$'],
    optionsLatex: ['\\frac{1}{6}', '\\frac{1}{8}', '\\frac{1}{12}', '\\frac{1}{2}'],
    correctAnswer: 2,
    explanation: 'Eventos independientes: multiplicamos las probabilidades:',
    explanationLatex: 'P(6 \\text{ y cara}) = P(6) \\times P(\\text{cara}) = \\frac{1}{6} \\times \\frac{1}{2} = \\frac{1}{12}',
    difficulty: 'medium'
  },

  // Estadística - Reading Data
  {
    id: 'm2-35',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En un conjunto de datos, si Q1 = 20 y Q3 = 40, ¿cuál es el rango intercuartílico (IQR)?',
    questionLatex: '\\text{En un conjunto de datos, si } Q_1 = 20 \\text{ y } Q_3 = 40\\text{, ¿cuál es el rango intercuartílico (IQR)?}',
    options: ['10', '20', '30', '60'],
    correctAnswer: 1,
    explanation: 'El IQR es la diferencia entre Q3 y Q1:',
    explanationLatex: '\\text{IQR} = Q_3 - Q_1 = 40 - 20 = 20',
    difficulty: 'easy'
  },

  // Additional Mixed Practice Questions
  {
    id: 'm1-43',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    question: '¿Cuál es el valor de $2^3 \\times 2^2$?',
    questionLatex: '\\text{¿Cuál es el valor de } 2^3 \\times 2^2?',
    options: ['$2^5$', '$2^6$', '$4^5$', '$16$'],
    optionsLatex: ['2^5', '2^6', '4^5', '16'],
    correctAnswer: 0,
    explanation: 'Aplicamos la propiedad de exponentes: $a^m \\times a^n = a^{m+n}$:',
    explanationLatex: '2^3 \\times 2^2 = 2^{3+2} = 2^5 = 32',
    difficulty: 'easy'
  },
  {
    id: 'm1-44',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'La circunferencia de un círculo con diámetro 10 cm es (usar π ≈ 3.14):',
    questionLatex: '\\text{La circunferencia de un círculo con diámetro 10 cm es (usar } \\pi \\approx 3.14):',
    options: ['15.7 cm', '31.4 cm', '62.8 cm', '78.5 cm'],
    correctAnswer: 1,
    explanation: 'La circunferencia es C = πd:',
    explanationLatex: 'C = \\pi d = 3.14 \\times 10 = 31.4 \\text{ cm}',
    difficulty: 'easy'
  },
  {
    id: 'm2-36',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Factoriza completamente: $x^2 + 8x + 16$',
    questionLatex: '\\text{Factoriza completamente: } x^2 + 8x + 16',
    options: ['$(x+4)(x+4)$', '$(x+2)(x+8)$', '$(x+16)(x+1)$', '$(x-4)(x-4)$'],
    optionsLatex: ['(x+4)(x+4)', '(x+2)(x+8)', '(x+16)(x+1)', '(x-4)(x-4)'],
    correctAnswer: 0,
    explanation: 'Es un trinomio cuadrado perfecto:',
    explanationLatex: 'x^2 + 8x + 16 = (x+4)^2 = (x+4)(x+4)',
    difficulty: 'medium'
  },
  {
    id: 'm2-37',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    question: '¿Cuál es el resultado de $\\frac{2^4}{2^2}$?',
    questionLatex: '\\text{¿Cuál es el resultado de } \\frac{2^4}{2^2}?',
    options: ['$2$', '$2^2$', '$2^6$', '$2^8$'],
    optionsLatex: ['2', '2^2', '2^6', '2^8'],
    correctAnswer: 1,
    explanation: 'Aplicamos la propiedad de división de exponentes:',
    explanationLatex: '\\frac{2^4}{2^2} = 2^{4-2} = 2^2 = 4',
    difficulty: 'easy'
  },
  {
    id: 'm2-38',
    level: 'M2',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Dos rectas son paralelas si tienen:',
    questionLatex: '\\text{Dos rectas son paralelas si tienen:}',
    options: ['La misma pendiente', 'Pendientes opuestas', 'Pendientes que suman 1', 'Pendientes recíprocas negativas'],
    correctAnswer: 0,
    explanation: 'Rectas paralelas tienen la misma pendiente:',
    explanationLatex: '\\text{Rectas paralelas: } m_1 = m_2',
    difficulty: 'easy'
  },
  {
    id: 'm2-39',
    level: 'M2',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Si $f(x) = x^2 - 1$ y $g(x) = 2x$, ¿cuál es $f(g(2))$?',
    questionLatex: '\\text{Si } f(x) = x^2 - 1 \\text{ y } g(x) = 2x\\text{, ¿cuál es } f(g(2))?',
    options: ['3', '7', '15', '31'],
    correctAnswer: 2,
    explanation: 'Primero calculamos g(2) = 4, luego f(4):',
    explanationLatex: 'g(2) = 2(2) = 4, \\quad f(4) = 4^2 - 1 = 16 - 1 = 15',
    difficulty: 'hard'
  },
  {
    id: 'm2-40',
    level: 'M2',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'La desviación estándar es una medida de:',
    questionLatex: '\\text{La desviación estándar es una medida de:}',
    options: ['Tendencia central', 'Dispersión', 'Posición', 'Frecuencia'],
    correctAnswer: 1,
    explanation: 'La desviación estándar mide qué tan dispersos están los datos:',
    explanationLatex: '\\text{Desviación estándar: medida de dispersión de los datos}',
    difficulty: 'easy'
  }
];

export function getQuestionsByLevel(level: 'M1' | 'M2'): Question[] {
  return questions.filter(q => q.level === level);
}

export function getQuestionsByTopic(topic: string): Question[] {
  return questions.filter(q => q.topic === topic);
}

export function getRandomQuestions(level: 'M1' | 'M2', count: number = 10): Question[] {
  const levelQuestions = getQuestionsByLevel(level);

  // If there are fewer questions than requested, return all of them
  if (levelQuestions.length <= count) {
    return [...levelQuestions].sort(() => Math.random() - 0.5);
  }

  // Fisher-Yates shuffle algorithm to get random questions
  const shuffled = [...levelQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}
