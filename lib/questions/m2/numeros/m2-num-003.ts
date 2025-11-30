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
  },
  // Capitalización mensual / Monthly compounding
  {
    id: 'm2-num-fin-cap-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'A = P\\left(1 + \\frac{r}{n}\\right)^{nt}',
    questionLatex: '\\text{Un banco ofrece una tasa de interés del 12\\% anual con capitalización mensual. Si depositas \\$1.000.000, ¿cuánto tendrás después de 1 año? (Usa } (1{,}01)^{12} \\approx 1{,}1268)',
    options: ['$1.100.000', '$1.120.000', '$1.126.800', '$1.144.000'],
    correctAnswer: 2,
    explanation: 'A = 1{,}000{,}000 \\times \\left(1 + \\frac{0{,}12}{12}\\right)^{12} = 1{,}000{,}000 \\times 1{,}01^{12} \\approx 1{,}126{,}800',
    difficulty: 'hard',
    skills: ['finanzas-interes-compuesto', 'finanzas-capitalizacion', 'numeros-potencias', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-fin-cap-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'A = P\\left(1 + \\frac{r}{n}\\right)^{nt}',
    questionLatex: '\\text{¿Cuál es la diferencia entre depositar \\$2.000.000 al 12\\% anual simple versus 12\\% anual con capitalización mensual durante 2 años? (Usa } (1{,}01)^{24} \\approx 1{,}2697)',
    options: ['$0', '$19.400', '$59.400', '$100.000'],
    correctAnswer: 2,
    explanation: '\\text{Simple: } 2{,}000{,}000 \\times 0{,}24 = 480{,}000. \\quad \\text{Compuesto: } 2{,}000{,}000 \\times 1{,}2697 - 2{,}000{,}000 = 539{,}400. \\quad \\text{Diferencia} = 59{,}400',
    difficulty: 'extreme',
    skills: ['finanzas-interes-compuesto', 'finanzas-capitalizacion', 'finanzas-interes-simple', 'numeros-potencias', 'numeros-operaciones-basicas']
  },
  // Valor presente y futuro / Present and Future Value
  {
    id: 'm2-num-fin-vp-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'VP = \\frac{VF}{(1 + r)^t}',
    questionLatex: '\\text{¿Cuánto dinero debes depositar hoy en una cuenta que paga 10\\% anual compuesto para tener \\$1.000.000 en exactamente 2 años?}',
    options: ['$800.000', '$826.446', '$900.000', '$909.091'],
    correctAnswer: 1,
    explanation: 'VP = \\frac{1{,}000{,}000}{(1{,}10)^2} = \\frac{1{,}000{,}000}{1{,}21} \\approx 826{,}446',
    difficulty: 'hard',
    skills: ['finanzas-valor-presente', 'finanzas-interes-compuesto', 'numeros-potencias', 'numeros-division', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-fin-vp-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: 'VP = \\frac{VF}{(1 + r)^t}',
    questionLatex: '\\text{Los padres de Martina quieren regalarle \\$5.000.000 cuando cumpla 18 años (en 5 años más). Si el banco ofrece 8\\% anual, ¿cuánto deben depositar hoy? (Usa } (1{,}08)^5 \\approx 1{,}4693)',
    options: ['$3.000.000', '$3.402.916', '$4.000.000', '$4.629.630'],
    correctAnswer: 1,
    explanation: 'VP = \\frac{5{,}000{,}000}{(1{,}08)^5} = \\frac{5{,}000{,}000}{1{,}4693} \\approx 3{,}402{,}916',
    difficulty: 'hard',
    skills: ['finanzas-valor-presente', 'finanzas-interes-compuesto', 'numeros-potencias', 'numeros-division', 'numeros-operaciones-basicas']
  },
  // Créditos y amortización / Loans and amortization
  {
    id: 'm2-num-fin-cred-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: '\\text{Intereses} = \\text{Total pagado} - \\text{Capital}',
    questionLatex: '\\text{María solicita un crédito de consumo de \\$3.000.000 a 24 meses con cuota mensual de \\$141.220. ¿Cuánto pagará en total por intereses durante todo el crédito?}',
    options: ['$300.000', '$389.280', '$420.000', '$489.280'],
    correctAnswer: 1,
    explanation: '\\text{Total pagado} = 141{,}220 \\times 24 = 3{,}389{,}280. \\quad \\text{Intereses} = 3{,}389{,}280 - 3{,}000{,}000 = 389{,}280',
    difficulty: 'medium',
    skills: ['finanzas-creditos', 'finanzas-amortizacion', 'numeros-multiplicacion', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-fin-cred-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Dos bancos ofrecen créditos de \\$1.000.000 a 12 meses: Banco A con cuota de \\$89.000 y Banco B con cuota de \\$91.200. ¿Cuál es la diferencia en el total a pagar entre ambos bancos?}',
    options: ['$2.200', '$12.000', '$24.000', '$26.400'],
    correctAnswer: 3,
    explanation: '\\text{Banco A: } 89{,}000 \\times 12 = 1{,}068{,}000. \\quad \\text{Banco B: } 91{,}200 \\times 12 = 1{,}094{,}400. \\quad \\text{Diferencia} = 26{,}400',
    difficulty: 'medium',
    skills: ['finanzas-creditos', 'finanzas-comparacion', 'numeros-multiplicacion', 'numeros-operaciones-basicas']
  },
  // CAE - Carga Anual Equivalente (Chilean specific)
  {
    id: 'm2-num-fin-cae-1',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Al comparar créditos de consumo en Chile, se usa el CAE (Carga Anual Equivalente). Si el Banco A ofrece un crédito con CAE de 15\\% y el Banco B ofrece CAE de 18\\%, ¿cuál conviene más y cuál es la diferencia porcentual?}',
    options: ['\\text{Banco A, difieren en 3 puntos porcentuales}', '\\text{Banco B, difieren en 3 puntos porcentuales}', '\\text{Banco A, difieren en 20\\%}', '\\text{Son equivalentes}'],
    correctAnswer: 0,
    explanation: '\\text{Menor CAE = menor costo total. CAE de 15\\% < 18\\%. Diferencia} = 18\\% - 15\\% = 3 \\text{ puntos porcentuales}',
    difficulty: 'easy',
    skills: ['finanzas-cae', 'finanzas-creditos', 'finanzas-comparacion', 'numeros-porcentaje']
  },
  {
    id: 'm2-num-fin-cae-2',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Un crédito de \\$500.000 tiene tasa mensual de 1,5\\% y el CAE informado es 19,56\\%. Si la tasa mensual simple sería } 1{,}5\\% \\times 12 = 18\\%\\text{, ¿por qué el CAE es mayor?}',
    options: ['\\text{El CAE incluye comisiones y seguros}', '\\text{El CAE es siempre mayor}', '\\text{Error de cálculo del banco}', '\\text{El CAE no incluye IVA}'],
    correctAnswer: 0,
    explanation: '\\text{El CAE incluye todos los costos: intereses, comisiones, seguros y otros gastos, por eso es mayor que la tasa simple.}',
    difficulty: 'medium',
    skills: ['finanzas-cae', 'finanzas-creditos', 'finanzas-conceptos', 'numeros-porcentaje']
  },
  // AFP - More complex scenarios (Chilean pension system)
  {
    id: 'm2-num-fin-afp-3',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Carolina tiene su fondo de AFP en el Fondo A (más riesgoso) con \\$15.000.000. El año pasado, el Fondo A tuvo rentabilidad de 12\\% y el Fondo E (conservador) tuvo 4\\%. ¿Cuánto más ganó por estar en el Fondo A en vez del E?}',
    options: ['$600.000', '$1.200.000', '$1.800.000', '$2.400.000'],
    correctAnswer: 1,
    explanation: '\\text{Diferencia de rentabilidad} = 12\\% - 4\\% = 8\\%. \\quad 15{,}000{,}000 \\times 0{,}08 = 1{,}200{,}000',
    difficulty: 'medium',
    skills: ['finanzas-afp', 'finanzas-rentabilidad', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-fin-afp-4',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    operacionBase: '\\text{Descuento total} = \\text{Cotización} + \\text{Comisión AFP}',
    questionLatex: '\\text{Felipe tiene sueldo imponible de \\$1.200.000. Su AFP cobra 1,44\\% de comisión sobre el sueldo imponible, además del 10\\% obligatorio de cotización. ¿Cuánto se descuenta mensualmente en total para la AFP?}',
    options: ['$120.000', '$137.280', '$144.000', '$154.080'],
    correctAnswer: 1,
    explanation: '\\text{Cotización} = 1{,}200{,}000 \\times 0{,}10 = 120{,}000. \\quad \\text{Comisión} = 1{,}200{,}000 \\times 0{,}0144 = 17{,}280. \\quad \\text{Total} = 137{,}280',
    difficulty: 'medium',
    skills: ['finanzas-afp', 'finanzas-comisiones', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-fin-afp-5',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Andrea hace APV (Ahorro Previsional Voluntario) de \\$100.000 mensuales. Su empleador aporta 50\\% adicional por cada peso que ella ahorre en APV. ¿Cuánto se deposita mensualmente en total por concepto de APV?}',
    options: ['$100.000', '$125.000', '$150.000', '$200.000'],
    correctAnswer: 2,
    explanation: '\\text{APV Andrea} = 100{,}000. \\quad \\text{Aporte empleador} = 100{,}000 \\times 0{,}50 = 50{,}000. \\quad \\text{Total APV} = 150{,}000',
    difficulty: 'medium',
    skills: ['finanzas-afp', 'finanzas-apv', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  },
  {
    id: 'm2-num-fin-afp-6',
    level: 'M2',
    topic: 'Números',
    subject: 'números',
    questionLatex: '\\text{Tomás tiene 55 años y debe elegir entre los 5 fondos de AFP (A, B, C, D, E). Por ley, a su edad no puede tener más del 60\\% en el Fondo A. Si tiene \\$20.000.000, ¿cuánto es lo máximo que puede tener en el Fondo A?}',
    options: ['$8.000.000', '$10.000.000', '$12.000.000', '$20.000.000'],
    correctAnswer: 2,
    explanation: '20{,}000{,}000 \\times 0{,}60 = 12{,}000{,}000',
    difficulty: 'easy',
    skills: ['finanzas-afp', 'finanzas-multifondos', 'numeros-porcentaje', 'numeros-operaciones-basicas']
  }
];
