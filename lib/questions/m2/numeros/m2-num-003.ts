import { Question } from '../../../types';

/**
 * M2-NUM-003: Problemas aplicados a finanzas: AFP, jubilación, créditos
 *
 * Subsections:
 * A. Sistemas de AFP y ahorro previsional
 *    Habilidades: finanzas-afp
 * B. Cálculo de jubilación y pensiones
 *    Habilidades: finanzas-jubilacion
 * C. Créditos y sistemas de amortización
 *    Habilidades: finanzas-creditos
 * D. Interés compuesto
 *    Habilidades: finanzas-interes-compuesto
 */

export const m2Num003Questions: Question[] = [
  {
    id: 'm2-num-porc-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Un producto cuesta \\$80.000 con 25\\% descuento y luego 19\\% IVA. ¿Precio final?}',
    options: ['$71.400', '$68.000', '$60.000', '$64.260'],
    correctAnswer: 0,
    explanation: '80{,}000 \\times 0.75 = 60{,}000 \\quad \\Rightarrow \\quad 60{,}000 \\times 1.19 = 71{,}400',
    difficulty: 'medium',
    skills: ['numeros-porcentaje', 'numeros-porcentaje-descuento', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-porc-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Una población aumentó de 40.000 a 52.000 habitantes. ¿Porcentaje de aumento?}',
    options: ['20%', '25%', '30%', '35%'],
    correctAnswer: 2,
    explanation: '\\frac{52{,}000 - 40{,}000}{40{,}000} \\times 100 = \\frac{12{,}000}{40{,}000} \\times 100 = 30\\%',
    difficulty: 'hard',
    skills: ['numeros-porcentaje', 'numeros-porcentaje-variacion', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-prop-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{En un mapa a escala 1:50.000, dos ciudades están separadas por 8 cm. ¿Distancia real?}',
    options: ['4 km', '40 km', '400 km', '4000 km'],
    correctAnswer: 0,
    explanation: '8 \\text{ cm} \\times 50{,}000 = 400{,}000 \\text{ cm} = 4000 \\text{ m} = 4 \\text{ km}',
    difficulty: 'hard',
    skills: ['numeros-proporcionalidad', 'numeros-escala', 'numeros-conversion-unidades', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-prop-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Si 3 kg de manzanas cuestan \\$4.500, ¿cuánto costarán 5 kg?}',
    options: ['$7.500', '$6.750', '$8.000', '$6.000'],
    correctAnswer: 0,
    explanation: '\\frac{3}{4500} = \\frac{5}{x} \\quad \\Rightarrow \\quad x = \\frac{5 \\times 4500}{3} = 7500',
    difficulty: 'medium',
    skills: ['numeros-proporcionalidad', 'numeros-proporcionalidad-directa', 'numeros-regla-tres', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-prop-5',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Maqueta: 40 cm a escala 1:250. ¿Altura real del edificio?}',
    options: ['100 m', '50 m', '200 m', '25 m'],
    correctAnswer: 0,
    explanation: '40 \\text{ cm} \\times 250 = 10{,}000 \\text{ cm} = 100 \\text{ m}',
    difficulty: 'hard',
    skills: ['numeros-proporcionalidad', 'numeros-escala', 'numeros-conversion-unidades', 'numeros-operaciones-basicas']
  },
  // Subsection A: Sistemas de AFP y ahorro previsional
  {
    id: 'm2-num-fin-afp-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{María trabaja en una empresa y su sueldo bruto mensual es de \\$800.000. Su AFP le descuenta el 10\\% obligatorio para su ahorro previsional. Adicionalmente, María decide hacer un aporte voluntario del 2\\% de su sueldo. ¿Cuánto dinero total se deposita mensualmente en su cuenta de AFP?}',
    options: ['$80.000', '$96.000', '$100.000', '$112.000'],
    correctAnswer: 1,
    explanation: '800{,}000 \\times 0.10 + 800{,}000 \\times 0.02 = 80{,}000 + 16{,}000 = 96{,}000',
    difficulty: 'medium',
    skills: ['finanzas-afp', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-fin-afp-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Pedro cotiza en AFP hace 5 años. En su libreta de ahorro previsional observa que ha acumulado \\$6.000.000. Si durante estos 5 años ha aportado exactamente el 10\\% de su sueldo mensual constante de \\$900.000, y considerando 12 meses por año, ¿cuánto ha ganado su fondo por rentabilidad durante este período?}',
    options: ['$600.000', '$1.000.000', '$1.400.000', '$1.600.000'],
    correctAnswer: 0,
    explanation: '90{,}000 \\times 60 = 5{,}400{,}000. \\quad \\text{Rentabilidad} = 6{,}000{,}000 - 5{,}400{,}000 = 600{,}000',
    difficulty: 'hard',
    skills: ['finanzas-afp', 'numeros-porcentaje', 'numeros-multiplicacion', 'numeros-operaciones-basicas']
  },
  // Subsection B: Cálculo de jubilación y pensiones
  {
    id: 'm2-num-fin-jub-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Ana se jubila a los 60 años con un fondo de AFP de \\$40.000.000. La AFP le informa que recibirá una pensión mensual equivalente al 60\\% de su último sueldo, que era de \\$600.000. ¿Cuál será el monto de su pensión mensual?}',
    options: ['$240.000', '$300.000', '$360.000', '$400.000'],
    correctAnswer: 2,
    explanation: '600{,}000 \\times 0.60 = 360{,}000',
    difficulty: 'easy',
    skills: ['finanzas-jubilacion', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-fin-jub-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Carlos tiene 58 años y su fondo de pensión actual es de \\$30.000.000. Si desea jubilarse con un fondo de \\$45.000.000 a los 60 años (en 2 años más), y asumiendo que no hay rentabilidad, ¿cuánto debe aportar mensualmente durante estos 24 meses para alcanzar su meta?}',
    options: ['$500.000', '$550.000', '$625.000', '$750.000'],
    correctAnswer: 2,
    explanation: '\\frac{45{,}000{,}000 - 30{,}000{,}000}{24} = \\frac{15{,}000{,}000}{24} = 625{,}000',
    difficulty: 'medium',
    skills: ['finanzas-jubilacion', 'numeros-division', 'numeros-operaciones-basicas']
  },
  // Subsection C: Créditos y sistemas de amortización
  {
    id: 'm2-num-fin-cred-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Laura solicita un crédito de consumo de \\$1.200.000 que pagará en 12 cuotas mensuales iguales. El banco le informa que pagará un total de \\$1.440.000 al final del período. ¿Cuál es el monto de cada cuota mensual?}',
    options: ['$100.000', '$120.000', '$125.000', '$140.000'],
    correctAnswer: 1,
    explanation: '\\frac{1{,}440{,}000}{12} = 120{,}000',
    difficulty: 'easy',
    skills: ['finanzas-creditos', 'numeros-division', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-fin-cred-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Roberto solicitó un crédito de \\$2.000.000 y lo pagará en 10 cuotas mensuales de \\$250.000 cada una. ¿Cuánto pagará en total por concepto de intereses durante todo el período del crédito?}',
    options: ['$250.000', '$300.000', '$400.000', '$500.000'],
    correctAnswer: 3,
    explanation: '250{,}000 \\times 10 - 2{,}000{,}000 = 2{,}500{,}000 - 2{,}000{,}000 = 500{,}000',
    difficulty: 'medium',
    skills: ['finanzas-creditos', 'numeros-multiplicacion', 'numeros-operaciones-basicas']
  },
  // Subsection D: Interés compuesto
  {
    id: 'm2-num-fin-int-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Sofía deposita \\$1.000.000 en un banco que ofrece un 10\\% de interés anual compuesto. Si no hace ningún retiro ni depósito adicional durante 2 años, ¿cuánto dinero tendrá al final del segundo año? (Usa la fórmula: Capital final = Capital inicial} \\times (1 + \\text{tasa})^{\\text{años}})',
    options: ['$1.100.000', '$1.200.000', '$1.210.000', '$1.300.000'],
    correctAnswer: 2,
    explanation: '1{,}000{,}000 \\times (1.10)^2 = 1{,}000{,}000 \\times 1.21 = 1{,}210{,}000',
    difficulty: 'medium',
    skills: ['finanzas-interes-compuesto', 'numeros-potencias', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-fin-int-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Juan invierte \\$500.000 a interés compuesto del 20\\% anual durante 3 años. Al finalizar el tercer año, ¿cuánto habrá ganado por concepto de intereses? (Recuerda: Intereses = Capital final - Capital inicial)}',
    options: ['$300.000', '$364.000', '$400.000', '$432.000'],
    correctAnswer: 1,
    explanation: '500{,}000 \\times (1.20)^3 - 500{,}000 = 500{,}000 \\times 1.728 - 500{,}000 = 364{,}000',
    difficulty: 'hard',
    skills: ['finanzas-interes-compuesto', 'numeros-potencias', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  }
];
