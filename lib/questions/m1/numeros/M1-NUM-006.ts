import { Question } from '../../../types';

/**
 * M1-NUM-006: Propiedades de potencias de base y exponente racional
 *
 * Topics covered:
 * - Power operations (multiplication, division)
 * - Properties of exponents (product rule, quotient rule)
 * - Negative exponents and their interpretation
 * - Fractional exponents as roots
 * - Combining power properties
 * - Rational exponents (a^(m/n))
 */

export const m1Num006Questions: Question[] = [
  {
    id: 'm1-12',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '2^4',
    questionLatex: '\\text{Un biólogo está estudiando el crecimiento de una colonia de bacterias que se duplica en cada generación. Comenzó con 2 bacterias en la generación inicial, y las bacterias se han duplicado 4 veces consecutivas. Para calcular cuántas bacterias hay después de estas cuatro duplicaciones, debe calcular dos multiplicado por sí mismo cuatro veces. ¿Cuántas bacterias hay en total?}',
    options: ['8', '16', '24', '32'],
    correctAnswer: 1,
    explanation: '2^4 = 2 \\times 2 \\times 2 \\times 2 = 16',
    difficulty: 'easy',
    skills: ['numeros-potencias', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-29',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\frac{2^3 \\times 2^2}{2^4}',
    questionLatex: '\\text{Un informático está optimizando el almacenamiento de datos en un servidor. Tiene dos grupos de archivos: el primer grupo ocupa el espacio equivalente a 2 elevado al cubo unidades, y el segundo grupo ocupa 2 al cuadrado unidades. Después de combinarlos, necesita dividir el espacio total entre 2 elevado a la cuarta unidades por restricciones del sistema. ¿Cuántas unidades de espacio resultan después de esta operación?}',
    options: ['2', '4', '8', '16'],
    correctAnswer: 0,
    explanation: '\\frac{2^3 \\times 2^2}{2^4} = \\frac{2^{3+2}}{2^4} = \\frac{2^5}{2^4} = 2^{5-4} = 2^1 = 2',
    difficulty: 'medium',
    skills: ['numeros-potencias', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-69',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '2^{-3}',
    questionLatex: '\\text{Un físico está calculando la intensidad de luz a diferentes distancias de una fuente. La fórmula indica que la intensidad se reduce según la expresión } 2^{-3}. \\text{ ¿Cuál es el valor numérico de esta expresión?}',
    options: ['-8', '-6', '\\frac{1}{8}', '\\frac{1}{6}'],
    correctAnswer: 2,
    explanation: '2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}',
    difficulty: 'medium',
    skills: ['numeros-potencias', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-70',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '5^{-2} \\times 5^5',
    questionLatex: '\\text{Un químico está balanceando una ecuación que involucra concentraciones expresadas como potencias de 5. En el reactivo tiene una concentración de 5 elevado a menos 2, y en el producto tiene 5 elevado a 5. Para simplificar la expresión y encontrar la concentración neta, debe multiplicar ambas potencias. ¿Cuál es el resultado simplificado?}',
    options: ['5^3', '5^{-7}', '5^{10}', '25'],
    correctAnswer: 0,
    explanation: '5^{-2} \\times 5^5 = 5^{-2+5} = 5^3',
    difficulty: 'medium',
    skills: ['numeros-potencias', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-71',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '\\frac{3^4}{3^6}',
    questionLatex: '\\text{Un astrónomo está calculando la relación de masas entre dos cuerpos celestes. La masa del primer cuerpo se expresa como 3 elevado a la cuarta potencia, y la del segundo como 3 elevado a la sexta potencia. Para encontrar la relación entre ambas masas, debe dividir la primera expresión entre la segunda y simplificar completamente el resultado. ¿Cuál es el valor simplificado de esta división?}',
    options: ['3^2', '3^{-2}', '9', '\\frac{1}{9}'],
    correctAnswer: 3,
    explanation: '\\frac{3^4}{3^6} = 3^{4-6} = 3^{-2} = \\frac{1}{3^2} = \\frac{1}{9}',
    difficulty: 'hard',
    skills: ['numeros-potencias', 'numeros-potencias-propiedades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-72',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '16^{\\frac{1}{2}}',
    questionLatex: '\\text{Un ingeniero civil está diseñando un terreno cuadrado que debe tener un área de 16 metros cuadrados. Para determinar las dimensiones del lado, necesita calcular } 16^{1/2}. \\text{ ¿Cuántos metros mide cada lado del terreno?}',
    options: ['4', '8', '2', '32'],
    correctAnswer: 0,
    explanation: '16^{1/2} = \\sqrt{16} = 4',
    difficulty: 'easy',
    skills: ['numeros-potencias', 'numeros-potencias-propiedades', 'numeros-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-73',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '8^{\\frac{1}{3}}',
    questionLatex: '\\text{Un diseñador industrial está trabajando con cubos de material. Tiene un cubo cuyo volumen es de 8 centímetros cúbicos y necesita determinar la medida de la arista. Debe calcular } 8^{1/3}. \\text{ ¿Cuántos centímetros mide cada arista del cubo?}',
    options: ['2', '3', '4', '\\frac{8}{3}'],
    correctAnswer: 0,
    explanation: '8^{1/3} = \\sqrt[3]{8} = 2 \\text{ porque } 2^3 = 8',
    difficulty: 'medium',
    skills: ['numeros-potencias', 'numeros-potencias-propiedades', 'numeros-raices', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-74',
    level: 'M1',
    topic: 'Números y Operaciones',
    subject: 'números',
    operacionBase: '27^{\\frac{2}{3}}',
    questionLatex: '\\text{Un matemático está resolviendo una expresión con exponente fraccionario. Debe calcular } 27^{2/3}. \\text{ ¿Cuál es el valor numérico final de esta expresión?}',
    options: ['3', '6', '9', '18'],
    correctAnswer: 2,
    explanation: '27^{2/3} = (\\sqrt[3]{27})^2 = 3^2 = 9',
    difficulty: 'hard',
    skills: ['numeros-potencias', 'numeros-potencias-propiedades', 'numeros-raices', 'numeros-operaciones-basicas']
  }
];
