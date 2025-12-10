import { Question } from '../../../types';

/**
 * M1-NUM-005: Problemas que involucren porcentajes en diversos contextos
 *
 * Topics covered:
 * - Percentage problems in shopping and retail (discounts, sales)
 * - Financial applications (interest, savings, investments)
 * - Successive and compound percentages
 * - Finding original values after percentage changes
 * - Multi-step percentage problems
 * - Real-world contexts:
 *   - Shopping and discounts
 *   - Banking and interest
 *   - Inventory management
 *   - Price adjustments
 */

export const m1Num005Questions: Question[] = [
  {
    id: 'm1-27',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '20000 - (15\\% \\text{ de } 20000)',
    questionLatex: '\\text{En una tienda de ropa, una camisa tiene un precio marcado de \\$20.000 pesos. Durante la liquidación de temporada, la tienda ofrece un descuento del 15\\% en todas las camisas. Un cliente interesado en comprar esta camisa quiere saber cuánto pagará finalmente después de aplicar el descuento promocional. ¿Cuál es el precio final de la camisa?}',
    options: ['$15.000', '$17.000', '$17.500', '$18.000'],
    correctAnswer: 1,
    explanation: '20.000 \\times 0.15 = 3.000 \\quad \\Rightarrow \\quad 20.000 - 3.000 = 17.000',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['numeros-porcentajes', 'numeros-porcentajes-descuentos', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-98',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{560000}{1.12}',
    questionLatex: '\\text{Pedro trabaja en una empresa que acaba de otorgarle un aumento salarial del 12\\% por su excelente desempeño durante el año. Después del aumento, su nuevo sueldo es de \\$560.000 pesos mensuales. El departamento de recursos humanos necesita verificar cuál era su sueldo anterior antes del aumento para actualizar los registros históricos. ¿Cuánto ganaba Pedro antes del aumento?}',
    options: ['$480.000', '$500.000', '$520.000', '$540.000'],
    correctAnswer: 1,
    explanation: '1.12x = 560000 \\quad \\Rightarrow \\quad x = \\frac{560000}{1.12} = 500.000',
    difficulty: 'hard',
    difficultyScore: 0.74,
    skills: ['numeros-porcentajes', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-99',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '100000 + (5\\% \\text{ de } 100000)',
    questionLatex: '\\text{Una persona decide abrir una cuenta de ahorros en un banco que ofrece una tasa de interés simple del 5\\% anual. Deposita inicialmente \\$100.000 pesos y no realiza ningún movimiento adicional durante el año. Al cumplirse los doce meses, quiere saber cuánto dinero tendrá en total en su cuenta, incluyendo el capital inicial más los intereses generados. ¿Cuánto dinero habrá después de 1 año?}',
    options: ['$105.000', '$110.000', '$115.000', '$120.000'],
    correctAnswer: 0,
    explanation: '100000 + (0.05 \\times 100000) = 100000 + 5000 = 105.000',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['numeros-porcentajes', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-101',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '200000 + (8\\% \\text{ de } 200000 \\times 2)',
    questionLatex: '\\text{Una familia decide invertir \\$200.000 pesos en un instrumento financiero que paga un interés simple del 8\\% anual. Planean mantener su inversión durante exactamente 2 años sin realizar retiros ni depósitos adicionales. Al finalizar el segundo año, quieren saber cuánto dinero habrán acumulado en total, considerando el capital inicial más todos los intereses generados. ¿Cuánto dinero habrá después de 2 años?}',
    options: ['$216.000', '$224.000', '$232.000', '$240.000'],
    correctAnswer: 2,
    explanation: '200000 + (0.08 \\times 200000 \\times 2) = 200000 + 32000 = 232.000',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-porcentajes', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-102',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '20\\% \\text{ de } (50\\% \\text{ de } 200)',
    questionLatex: '\\text{Un almacén de granos tiene inicialmente 200 kilogramos de arroz. Durante la primera semana vende el 50\\% de su inventario. En la segunda semana, de lo que quedó después de la primera venta, vende un 20\\% adicional. El encargado del almacén necesita calcular cuántos kilogramos vendió en la segunda semana para actualizar su registro de inventario. ¿Cuántos kilogramos vendió en la segunda semana?}',
    options: ['10', '20', '30', '40'],
    correctAnswer: 1,
    explanation: '50\\% \\text{ de } 200 = 100, \\quad 20\\% \\text{ de } 100 = 20',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['numeros-porcentajes', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-103',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '100000 \\times 0.70 \\times 0.90',
    questionLatex: '\\text{Una tienda departamental anuncia una venta especial con descuentos sucesivos. Un televisor tiene un precio original de \\$100.000 pesos. Primero se aplica un descuento del 30\\%, y sobre el precio ya rebajado se aplica un descuento adicional del 10\\% por pago en efectivo. Un cliente que paga en efectivo quiere saber cuánto pagará finalmente después de aplicar ambos descuentos consecutivos. ¿Cuál es el precio final?}',
    options: ['$60.000', '$63.000', '$66.000', '$70.000'],
    correctAnswer: 1,
    explanation: '100000 \\times 0.70 \\times 0.90 = 70000 \\times 0.90 = 63.000',
    difficulty: 'hard',
    difficultyScore: 0.74,
    skills: ['numeros-porcentajes', 'numeros-porcentajes-descuentos', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-104',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '25\\% \\text{ de } (40\\% \\text{ de } 800)',
    questionLatex: '\\text{Una empresa de logística tiene un almacén con 800 cajas de mercancía. Durante el primer turno del día, los trabajadores cargan el 40\\% de las cajas en camiones para distribución. En el segundo turno, de las cajas que fueron cargadas en el primer turno, el 25\\% requieren ser reubicadas por un cambio en las rutas de entrega. ¿Cuántas cajas deben reubicarse?}',
    options: ['60', '70', '80', '90'],
    correctAnswer: 2,
    explanation: '40\\% \\text{ de } 800 = 320, \\quad 25\\% \\text{ de } 320 = 80',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-porcentajes', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-105',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{24000}{0.80}',
    questionLatex: '\\text{En una liquidación de muebles, un sofá tiene un precio rebajado de \\$24.000 pesos después de aplicar un descuento del 20\\%. Un cliente curioso quiere saber cuál era el precio original del sofá antes de la rebaja, para calcular cuánto dinero está ahorrando realmente con la promoción. ¿Cuál era el precio original?}',
    options: ['$28.000', '$30.000', '$32.000', '$36.000'],
    correctAnswer: 1,
    explanation: '0.80x = 24000 \\quad \\Rightarrow \\quad x = \\frac{24000}{0.80} = 30.000',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-porcentajes', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-106',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{50000}{1.25}',
    questionLatex: '\\text{Una tienda de tecnología ajusta sus precios debido a la inflación. Un computador portátil que anteriormente tenía cierto precio, ahora cuesta \\$50.000 pesos después de un incremento del 25\\%. El vendedor necesita consultar en el sistema cuál era el precio original del computador antes del aumento para verificar un reclamo de un cliente. ¿Cuál era el precio original?}',
    options: ['$37.500', '$40.000', '$42.500', '$45.000'],
    correctAnswer: 1,
    explanation: '1.25x = 50000 \\quad \\Rightarrow \\quad x = \\frac{50000}{1.25} = 40.000',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-porcentajes', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  // ========================================
  // PORCENTAJES SUCESIVOS (Successive Percentages)
  // ========================================
  {
    id: 'm1-123',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '200 \\times 1.10 \\times 1.10',
    questionLatex: '\\text{El precio de un producto es de \\$200. Durante el primer mes aumenta un 10\\%, y durante el segundo mes vuelve a aumentar otro 10\\% sobre el nuevo precio. ¿Cuál es el precio final después de ambos aumentos?}',
    options: ['$220', '$240', '$242', '$244'],
    correctAnswer: 2,
    explanation: '200 \\times 1.10 \\times 1.10 = 200 \\times 1.21 = 242',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-porcentajes', 'numeros-porcentajes-sucesivos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-124',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '500000 \\times 0.80 \\times 0.80',
    questionLatex: '\\text{Una tienda de electrodomésticos tiene una lavadora con precio inicial de \\$500.000. Primero aplica un descuento del 20\\% por fin de temporada, y luego aplica un descuento adicional del 20\\% por apertura de nueva sucursal. ¿Cuál es el precio final de la lavadora?}',
    options: ['$300.000', '$320.000', '$340.000', '$360.000'],
    correctAnswer: 1,
    explanation: '500000 \\times 0.80 \\times 0.80 = 500000 \\times 0.64 = 320.000',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-porcentajes', 'numeros-porcentajes-sucesivos', 'numeros-porcentajes-descuentos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-125',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '1000 \\times 1.50 \\times 0.50',
    questionLatex: '\\text{Un artículo cuesta \\$1.000. Su precio aumenta un 50\\% y luego disminuye un 50\\%. ¿Cuál es el precio final?}',
    options: ['$500', '$750', '$1.000', '$1.250'],
    correctAnswer: 1,
    explanation: '1000 \\times 1.50 \\times 0.50 = 1500 \\times 0.50 = 750',
    difficulty: 'hard',
    difficultyScore: 0.74,
    skills: ['numeros-porcentajes', 'numeros-porcentajes-sucesivos', 'numeros-argumentar-sentido-resultado', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-126',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '800000 \\times 0.85 \\times 0.90 \\times 0.95',
    questionLatex: '\\text{Una tienda ofrece descuentos sucesivos en un refrigerador: 15\\% de descuento por liquidación, 10\\% adicional por pago en efectivo, y 5\\% más por ser cliente frecuente. Si el precio original es \\$800.000, ¿cuál es el precio final después de aplicar los tres descuentos?}',
    options: ['$560.000', '$578.400', '$596.000', '$612.000'],
    correctAnswer: 1,
    explanation: '800000 \\times 0.85 \\times 0.90 \\times 0.95 = 800000 \\times 0.723 = 578.400',
    difficulty: 'hard',
    difficultyScore: 0.74,
    skills: ['numeros-porcentajes', 'numeros-porcentajes-sucesivos', 'numeros-porcentajes-descuentos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-127',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '600 \\times 1.15 \\times 1.20',
    questionLatex: '\\text{El valor de una acción en la bolsa es de \\$600 por acción. Durante la primera semana sube un 15\\%, y durante la segunda semana sube un 20\\% adicional. ¿Cuál es el valor de la acción después de las dos semanas?}',
    options: ['$810', '$828', '$846', '$864'],
    correctAnswer: 1,
    explanation: '600 \\times 1.15 \\times 1.20 = 600 \\times 1.38 = 828',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-porcentajes', 'numeros-porcentajes-sucesivos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-128',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '1200 \\times 1.25 \\times 0.80',
    questionLatex: '\\text{Un producto de \\$1.200 primero aumenta su precio un 25\\% por inflación, y luego tiene un descuento del 20\\% por promoción. ¿Cuál es el precio final?}',
    options: ['$1.140', '$1.200', '$1.260', '$1.320'],
    correctAnswer: 1,
    explanation: '1200 \\times 1.25 \\times 0.80 = 1200 \\times 1.00 = 1.200',
    difficulty: 'hard',
    difficultyScore: 0.74,
    skills: ['numeros-porcentajes', 'numeros-porcentajes-sucesivos', 'numeros-argumentar-sentido-resultado', 'numeros-operaciones-basicas']
  },
  // ========================================
  // DESCUENTOS Y AUMENTOS ADICIONALES
  // ========================================
  {
    id: 'm1-129',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '45000 \\times 1.19',
    questionLatex: '\\text{En Chile, el IVA (Impuesto al Valor Agregado) es del 19\\%. Si un producto tiene un precio neto de \\$45.000, ¿cuál es el precio final que debe pagar el cliente incluyendo el IVA?}',
    options: ['$50.550', '$53.550', '$55.050', '$56.550'],
    correctAnswer: 1,
    explanation: '45000 \\times 1.19 = 53.550',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['numeros-porcentajes', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-130',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{35700}{1.19}',
    questionLatex: '\\text{Un producto tiene un precio final de \\$35.700 con IVA incluido (19\\%). ¿Cuál es el precio neto (sin IVA) del producto?}',
    options: ['$28.000', '$29.000', '$30.000', '$31.000'],
    correctAnswer: 2,
    explanation: 'x = \\frac{35700}{1.19} = 30.000',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-porcentajes', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-131',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '85000 \\times 0.10',
    questionLatex: '\\text{En un restaurante, la cuenta es de \\$85.000. Si se desea dejar una propina del 10\\%, ¿cuánto se debe pagar en total?}',
    options: ['$91.500', '$92.500', '$93.500', '$94.500'],
    correctAnswer: 2,
    explanation: '85000 \\times 1.10 = 93.500',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['numeros-porcentajes', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-132',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '250000 \\times 0.65',
    questionLatex: '\\text{Una chaqueta tiene un precio original de \\$250.000 y está en oferta con un 35\\% de descuento. ¿Cuál es el precio de venta?}',
    options: ['$150.000', '$155.000', '$162.500', '$175.000'],
    correctAnswer: 2,
    explanation: '250000 \\times 0.65 = 162.500',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['numeros-porcentajes', 'numeros-porcentajes-descuentos', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-133',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{136000}{0.85}',
    questionLatex: '\\text{Un teléfono móvil está en oferta con un descuento del 15\\% y su precio rebajado es de \\$136.000. ¿Cuál era su precio original?}',
    options: ['$150.000', '$155.000', '$160.000', '$165.000'],
    correctAnswer: 2,
    explanation: 'x = \\frac{136000}{0.85} = 160.000',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-porcentajes', 'numeros-porcentajes-descuentos', 'algebra-ecuaciones-lineales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-134',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '320000 \\times 1.08',
    questionLatex: '\\text{El salario mínimo en un país es de \\$320.000. Si aumenta un 8\\% para el próximo año, ¿cuál será el nuevo salario mínimo?}',
    options: ['$340.000', '$345.600', '$350.000', '$355.200'],
    correctAnswer: 1,
    explanation: '320000 \\times 1.08 = 345.600',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['numeros-porcentajes', 'numeros-decimales', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-135',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{75}{125} \\times 100',
    questionLatex: '\\text{En una clase de 125 estudiantes, 75 son mujeres. ¿Qué porcentaje de la clase son mujeres?}',
    options: ['55%', '60%', '65%', '70%'],
    correctAnswer: 1,
    explanation: '\\frac{75}{125} \\times 100\\% = \\frac{3}{5} \\times 100\\% = 60\\%',
    difficulty: 'easy',
    difficultyScore: 0.35,
    skills: ['numeros-porcentajes', 'numeros-fracciones', 'numeros-operaciones-basicas']
  },
  {
    id: 'm1-136',
    level: 'M1',
    topic: 'Números y Proporcionalidad',
    subject: 'números',
    operacionBase: '\\frac{180000 - 144000}{180000} \\times 100',
    questionLatex: '\\text{Una computadora que costaba \\$180.000 ahora cuesta \\$144.000. ¿Qué porcentaje de descuento se aplicó?}',
    options: ['15%', '20%', '25%', '30%'],
    correctAnswer: 1,
    explanation: '\\frac{36000}{180000} \\times 100\\% = \\frac{1}{5} \\times 100\\% = 20\\%',
    difficulty: 'medium',
    difficultyScore: 0.54,
    skills: ['numeros-porcentajes', 'numeros-porcentajes-descuentos', 'numeros-operaciones-basicas']
  }
];
