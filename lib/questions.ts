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
  // Additional M1 Questions - Números (m1-26 to m1-29)
  {
    id: 'm1-26',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    question: '¿Cuál es el resultado de $(-3) \\times (-5)$?',
    questionLatex: '\\text{¿Cuál es el resultado de } (-3) \\times (-5)?',
    options: ['-15', '-8', '8', '15'],
    correctAnswer: 3,
    explanation: 'El producto de dos números negativos es positivo:',
    explanationLatex: '(-3) \\times (-5) = 15',
    difficulty: 'easy'
  },
  {
    id: 'm1-27',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    question: 'Una camisa cuesta $20.000 y tiene un descuento del 15%. ¿Cuál es el precio final?',
    questionLatex: '\\text{Una camisa cuesta \\$20.000 y tiene un descuento del 15\\%. ¿Cuál es el precio final?}',
    options: ['$15.000', '$17.000', '$17.500', '$18.000'],
    correctAnswer: 1,
    explanation: 'Calculamos el 15% de descuento y lo restamos del precio original:',
    explanationLatex: '20.000 \\times 0.15 = 3.000 \\quad \\Rightarrow \\quad 20.000 - 3.000 = 17.000',
    difficulty: 'easy'
  },
  {
    id: 'm1-28',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    question: 'Si $\\frac{3}{4}$ de un número es 15, ¿cuál es el número?',
    questionLatex: '\\text{Si } \\frac{3}{4} \\text{ de un número es 15, ¿cuál es el número?}',
    options: ['12', '18', '20', '24'],
    correctAnswer: 2,
    explanation: 'Planteamos la ecuación y despejamos:',
    explanationLatex: '\\frac{3}{4}x = 15 \\quad \\Rightarrow \\quad x = 15 \\times \\frac{4}{3} = 20',
    difficulty: 'medium'
  },
  {
    id: 'm1-29',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    question: '¿Cuál es el valor de $\\frac{2^3 \\times 2^2}{2^4}$?',
    questionLatex: '\\text{¿Cuál es el valor de } \\frac{2^3 \\times 2^2}{2^4}?',
    options: ['2', '4', '8', '16'],
    correctAnswer: 0,
    explanation: 'Usamos las propiedades de los exponentes:',
    explanationLatex: '\\frac{2^3 \\times 2^2}{2^4} = \\frac{2^{3+2}}{2^4} = \\frac{2^5}{2^4} = 2^{5-4} = 2^1 = 2',
    difficulty: 'medium'
  },
  // Additional M1 Questions - Álgebra (m1-30 to m1-33)
  {
    id: 'm1-30',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Si $x + 5 = 12$, ¿cuál es el valor de $2x$?',
    questionLatex: '\\text{Si } x + 5 = 12 \\text{, ¿cuál es el valor de } 2x?',
    options: ['7', '10', '14', '17'],
    correctAnswer: 2,
    explanation: 'Primero encontramos x, luego calculamos 2x:',
    explanationLatex: 'x + 5 = 12 \\rightarrow x = 7 \\quad \\Rightarrow \\quad 2x = 2(7) = 14',
    difficulty: 'easy'
  },
  {
    id: 'm1-31',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Expandir: $(x + 3)(x + 2)$',
    questionLatex: '\\text{Expandir: } (x + 3)(x + 2)',
    options: ['$x^2 + 5x + 6$', '$x^2 + 6x + 5$', '$x^2 + 5x + 5$', '$x^2 + 6x + 6$'],
    optionsLatex: ['x^2 + 5x + 6', 'x^2 + 6x + 5', 'x^2 + 5x + 5', 'x^2 + 6x + 6'],
    correctAnswer: 0,
    explanation: 'Aplicamos la propiedad distributiva:',
    explanationLatex: '(x + 3)(x + 2) = x^2 + 2x + 3x + 6 = x^2 + 5x + 6',
    difficulty: 'medium'
  },
  {
    id: 'm1-32',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Si $f(x) = x^2 - 1$, ¿cuál es $f(3)$?',
    questionLatex: '\\text{Si } f(x) = x^2 - 1 \\text{, ¿cuál es } f(3)?',
    options: ['6', '7', '8', '9'],
    correctAnswer: 2,
    explanation: 'Sustituimos x por 3:',
    explanationLatex: 'f(3) = 3^2 - 1 = 9 - 1 = 8',
    difficulty: 'easy'
  },
  {
    id: 'm1-33',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    question: 'Resolver: $\\frac{x}{3} + 2 = 5$',
    questionLatex: '\\text{Resolver: } \\frac{x}{3} + 2 = 5',
    options: ['$x = 3$', '$x = 6$', '$x = 9$', '$x = 12$'],
    optionsLatex: ['x = 3', 'x = 6', 'x = 9', 'x = 12'],
    correctAnswer: 2,
    explanation: 'Despejamos x:',
    explanationLatex: '\\frac{x}{3} + 2 = 5 \\rightarrow \\frac{x}{3} = 3 \\rightarrow x = 9',
    difficulty: 'easy'
  },
  // Additional M1 Questions - Geometría (m1-34 to m1-37)
  {
    id: 'm1-34',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un cuadrado con lado de 6 cm es:',
    questionLatex: '\\text{El área de un cuadrado con lado de 6 cm es:}',
    options: ['12 cm²', '24 cm²', '36 cm²', '48 cm²'],
    correctAnswer: 2,
    explanation: 'El área de un cuadrado es lado al cuadrado:',
    explanationLatex: 'A = l^2 = 6^2 = 36 \\text{ cm}^2',
    difficulty: 'easy'
  },
  {
    id: 'm1-35',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'Si dos ángulos son suplementarios y uno mide 110°, ¿cuánto mide el otro?',
    questionLatex: '\\text{Si dos ángulos son suplementarios y uno mide } 110^\\circ\\text{, ¿cuánto mide el otro?}',
    options: ['70°', '80°', '90°', '180°'],
    correctAnswer: 0,
    explanation: 'Ángulos suplementarios suman 180°:',
    explanationLatex: '180^\\circ - 110^\\circ = 70^\\circ',
    difficulty: 'easy'
  },
  {
    id: 'm1-36',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El perímetro de un triángulo equilátero con lado de 5 cm es:',
    questionLatex: '\\text{El perímetro de un triángulo equilátero con lado de 5 cm es:}',
    options: ['10 cm', '15 cm', '20 cm', '25 cm'],
    correctAnswer: 1,
    explanation: 'Un triángulo equilátero tiene tres lados iguales:',
    explanationLatex: 'P = 3 \\times 5 = 15 \\text{ cm}',
    difficulty: 'easy'
  },
  {
    id: 'm1-37',
    level: 'M1',
    topic: 'Geometría',
    subject: 'geometría',
    question: 'El área de un triángulo con base 8 cm y altura 6 cm es:',
    questionLatex: '\\text{El área de un triángulo con base 8 cm y altura 6 cm es:}',
    options: ['14 cm²', '24 cm²', '28 cm²', '48 cm²'],
    correctAnswer: 1,
    explanation: 'El área de un triángulo es base por altura dividido entre 2:',
    explanationLatex: 'A = \\frac{b \\times h}{2} = \\frac{8 \\times 6}{2} = \\frac{48}{2} = 24 \\text{ cm}^2',
    difficulty: 'easy'
  },
  // Additional M1 Questions - Probabilidad (m1-38 to m1-41)
  {
    id: 'm1-38',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Al lanzar una moneda dos veces, ¿cuál es la probabilidad de obtener dos caras?',
    questionLatex: '\\text{Al lanzar una moneda dos veces, ¿cuál es la probabilidad de obtener dos caras?}',
    options: ['$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{1}{4}$', '$\\frac{2}{3}$'],
    optionsLatex: ['\\frac{1}{2}', '\\frac{1}{3}', '\\frac{1}{4}', '\\frac{2}{3}'],
    correctAnswer: 2,
    explanation: 'Los resultados posibles son CC, CS, SC, SS. Solo uno es favorable:',
    explanationLatex: 'P(\\text{dos caras}) = \\frac{1}{4}',
    difficulty: 'medium'
  },
  {
    id: 'm1-39',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'La media de 5, 8, 10 y 13 es:',
    questionLatex: '\\text{La media de 5, 8, 10 y 13 es:}',
    options: ['8', '9', '10', '11'],
    correctAnswer: 1,
    explanation: 'Sumamos todos los valores y dividimos por la cantidad:',
    explanationLatex: '\\bar{x} = \\frac{5 + 8 + 10 + 13}{4} = \\frac{36}{4} = 9',
    difficulty: 'easy'
  },
  {
    id: 'm1-40',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'En una clase hay 12 niños y 18 niñas. ¿Qué porcentaje son niños?',
    questionLatex: '\\text{En una clase hay 12 niños y 18 niñas. ¿Qué porcentaje son niños?}',
    options: ['30%', '40%', '50%', '60%'],
    correctAnswer: 1,
    explanation: 'Calculamos el porcentaje:',
    explanationLatex: '\\frac{12}{12 + 18} = \\frac{12}{30} = 0.4 = 40\\%',
    difficulty: 'easy'
  },
  {
    id: 'm1-41',
    level: 'M1',
    topic: 'Probabilidad y Estadística',
    subject: 'probabilidad',
    question: 'Al lanzar un dado, ¿cuál es la probabilidad de obtener un número mayor que 4?',
    questionLatex: '\\text{Al lanzar un dado, ¿cuál es la probabilidad de obtener un número mayor que 4?}',
    options: ['$\\frac{1}{6}$', '$\\frac{1}{3}$', '$\\frac{1}{2}$', '$\\frac{2}{3}$'],
    optionsLatex: ['\\frac{1}{6}', '\\frac{1}{3}', '\\frac{1}{2}', '\\frac{2}{3}'],
    correctAnswer: 1,
    explanation: 'Los números mayores que 4 son 5 y 6. Hay 2 casos favorables de 6 posibles:',
    explanationLatex: 'P = \\frac{2}{6} = \\frac{1}{3}',
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
  }
];

export function getQuestionsByLevel(level: 'M1' | 'M2'): Question[] {
  return questions.filter(q => q.level === level);
}

export function getQuestionsByTopic(topic: string): Question[] {
  return questions.filter(q => q.topic === topic);
}

export function getQuestionsBySubject(subject: 'números' | 'álgebra' | 'geometría' | 'probabilidad', level?: 'M1' | 'M2'): Question[] {
  return questions.filter(q => {
    if (level) {
      return q.subject === subject && q.level === level;
    }
    return q.subject === subject;
  });
}

export function getRandomQuestions(level: 'M1' | 'M2', count: number = 10, subject?: 'números' | 'álgebra' | 'geometría' | 'probabilidad'): Question[] {
  let levelQuestions = getQuestionsByLevel(level);

  // Filter by subject if specified
  if (subject) {
    levelQuestions = levelQuestions.filter(q => q.subject === subject);
  }

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
