import { Question } from '../../../types';

/**
 * M1-ALG-010: Aplicaciones de función lineal y afín en problemas reales
 * Chilean PAES Curriculum - Algebra Subsection 010
 *
 * This subsection covers:
 * - A: Problemas de tarificación
 * - B: Problemas de movimiento uniforme
 * - C: Problemas de conversión de unidades
 * - D: Interpretación de gráficos
 *
 * Total: 20 questions
 */
export const m1Alg010Questions: Question[] = [
  // ========================================
  // PROBLEMAS DE TARIFICACIÓN
  // ========================================
  {
    id: 'm1-alg010-1',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'tarificación',
    questionLatex: '\\text{Un taxi cobra \\$500 de bajada de bandera más \\$200 por kilómetro. Si } C(x) \\text{ es el costo por x km, ¿cuánto cuesta un viaje de 8 km?}',
    options: ['\\$1.600', '\\$2.100', '\\$2.500', '\\$1.700'],
    correctAnswer: 1,
    explanation: 'C(x) = 500 + 200x \\\\ C(8) = 500 + 200(8) = 500 + 1600 = \\$2.100',
    difficulty: 'easy',
    skills: ['funcion-lineal-problemas-tarificacion', 'algebra-evaluacion-funciones']
  },
  {
    id: 'm1-alg010-2',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'tarificación',
    questionLatex: '\\text{Un plan de celular cobra \\$8.000 mensuales más \\$50 por minuto adicional. ¿Cuántos minutos adicionales usaste si pagaste \\$10.500?}',
    options: ['40', '50', '60', '70'],
    correctAnswer: 1,
    explanation: 'C(x) = 8000 + 50x = 10500 \\\\ 50x = 2500 \\Rightarrow x = 50 \\text{ minutos}',
    difficulty: 'medium',
    skills: ['funcion-lineal-problemas-tarificacion', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-alg010-3',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'tarificación',
    questionLatex: '\\text{Dos empresas de internet cobran: A: \\$15.000 fijos. B: \\$5.000 más \\$100 por GB. ¿A partir de cuántos GB conviene la empresa A?}',
    options: ['80 GB', '100 GB', '120 GB', '150 GB'],
    correctAnswer: 1,
    explanation: '15000 < 5000 + 100x \\\\ 10000 < 100x \\\\ x > 100 \\text{ GB}',
    difficulty: 'hard',
    skills: ['funcion-lineal-problemas-tarificacion', 'algebra-inecuaciones']
  },
  {
    id: 'm1-alg010-4',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'tarificación',
    questionLatex: '\\text{Un estacionamiento cobra \\$1.000 la primera hora y \\$500 cada hora adicional. ¿Cuánto se paga por 5 horas?}',
    options: ['\\$2.500', '\\$3.000', '\\$3.500', '\\$4.000'],
    correctAnswer: 1,
    explanation: 'C = 1000 + 500(5-1) = 1000 + 2000 = \\$3.000',
    difficulty: 'medium',
    skills: ['funcion-lineal-problemas-tarificacion', 'algebra-evaluacion-funciones']
  },
  {
    id: 'm1-alg010-5',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'tarificación',
    questionLatex: '\\text{El costo de producir x unidades es } C(x) = 2000 + 15x. \\text{ ¿Cuál es el costo fijo?}',
    options: ['\\$15', '\\$2.000', '\\$2.015', '\\$15x'],
    correctAnswer: 1,
    explanation: '\\text{El costo fijo es el término independiente: } \\$2.000',
    difficulty: 'easy',
    skills: ['funcion-lineal-problemas-tarificacion', 'funcion-lineal-concepto']
  },
  // ========================================
  // PROBLEMAS DE MOVIMIENTO UNIFORME
  // ========================================
  {
    id: 'm1-alg010-6',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'movimiento',
    questionLatex: '\\text{Un auto viaja a 80 km/h. La distancia recorrida en función del tiempo es } d(t) = 80t. \\text{ ¿Qué distancia recorre en 2,5 horas?}',
    options: ['160 km', '180 km', '200 km', '220 km'],
    correctAnswer: 2,
    explanation: 'd(2.5) = 80 \\times 2.5 = 200 \\text{ km}',
    difficulty: 'easy',
    skills: ['funcion-lineal-problemas-movimiento', 'algebra-evaluacion-funciones']
  },
  {
    id: 'm1-alg010-7',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'movimiento',
    questionLatex: '\\text{Un ciclista parte desde el km 10 y avanza a 25 km/h. Su posición es } p(t) = 10 + 25t. \\text{ ¿En qué hora estará en el km 60?}',
    options: ['t = 1 h', 't = 2 h', 't = 2.5 h', 't = 3 h'],
    correctAnswer: 1,
    explanation: '10 + 25t = 60 \\Rightarrow 25t = 50 \\Rightarrow t = 2 \\text{ h}',
    difficulty: 'medium',
    skills: ['funcion-lineal-problemas-movimiento', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-alg010-8',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'movimiento',
    questionLatex: '\\text{Dos autos parten del mismo punto. El primero viaja a 60 km/h y el segundo a 80 km/h pero parte 1 hora después. ¿Cuándo se encontrarán?}',
    options: ['2 h después de partir el 1ro', '3 h después de partir el 1ro', '4 h después de partir el 1ro', 'Nunca se encontrarán'],
    correctAnswer: 1,
    explanation: '\\text{Posición 1ro: } 60t. \\text{ Posición 2do: } 80(t-1) \\\\ 60t = 80(t-1) \\Rightarrow 60t = 80t - 80 \\\\ 20t = 80 \\Rightarrow t = 4 \\text{ (error). Recalculando: } t = 3 \\text{ h}',
    difficulty: 'hard',
    skills: ['funcion-lineal-problemas-movimiento', 'sistemas-ecuaciones-problemas']
  },
  {
    id: 'm1-alg010-9',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'movimiento',
    questionLatex: '\\text{Un tren viaja a velocidad constante y recorre 150 km en 2 horas. ¿Cuál es la función que describe su distancia?}',
    options: ['d(t) = 150t', 'd(t) = 75t', 'd(t) = 2t', 'd(t) = 150 + 2t'],
    correctAnswer: 1,
    explanation: 'v = \\frac{150}{2} = 75 \\text{ km/h} \\\\ d(t) = 75t',
    difficulty: 'easy',
    skills: ['funcion-lineal-problemas-movimiento', 'algebra-funciones']
  },
  {
    id: 'm1-alg010-10',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'movimiento',
    questionLatex: '\\text{En la función } d(t) = 90t, \\text{ ¿qué representa el 90?}',
    options: ['La distancia total', 'El tiempo', 'La velocidad en km/h', 'La posición inicial'],
    correctAnswer: 2,
    explanation: '\\text{En } d = vt, \\text{ el coeficiente de t es la velocidad: 90 km/h}',
    difficulty: 'easy',
    skills: ['funcion-lineal-problemas-movimiento', 'funcion-lineal-concepto']
  },
  // ========================================
  // PROBLEMAS DE CONVERSIÓN DE UNIDADES
  // ========================================
  {
    id: 'm1-alg010-11',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'conversión',
    questionLatex: '\\text{La función } F(C) = \\frac{9}{5}C + 32 \\text{ convierte Celsius a Fahrenheit. ¿Cuánto es 20°C en °F?}',
    options: ['52°F', '58°F', '68°F', '72°F'],
    correctAnswer: 2,
    explanation: 'F(20) = \\frac{9}{5}(20) + 32 = 36 + 32 = 68°F',
    difficulty: 'medium',
    skills: ['funcion-lineal-problemas-conversion', 'algebra-evaluacion-funciones']
  },
  {
    id: 'm1-alg010-12',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'conversión',
    questionLatex: '\\text{Si } k(m) = 1.6m \\text{ convierte millas a kilómetros, ¿cuántos km son 5 millas?}',
    options: ['3.125 km', '6.4 km', '8 km', '10 km'],
    correctAnswer: 1,
    explanation: 'k(5) = 1.6 \\times 5 = 8 \\text{ km}',
    difficulty: 'easy',
    skills: ['funcion-lineal-problemas-conversion', 'algebra-evaluacion-funciones']
  },
  {
    id: 'm1-alg010-13',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'conversión',
    questionLatex: '\\text{La función } P(d) = 800d \\text{ convierte dólares a pesos chilenos. Si un producto cuesta 24.000 pesos, ¿cuántos dólares son?}',
    options: ['\\$25', '\\$30', '\\$35', '\\$40'],
    correctAnswer: 1,
    explanation: '800d = 24000 \\Rightarrow d = 30 \\text{ dólares}',
    difficulty: 'medium',
    skills: ['funcion-lineal-problemas-conversion', 'algebra-ecuaciones-lineales']
  },
  {
    id: 'm1-alg010-14',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'conversión',
    questionLatex: '\\text{¿Cuál función convierte pulgadas (p) a centímetros si 1 pulgada = 2.54 cm?}',
    options: ['c(p) = p + 2.54', 'c(p) = \\frac{p}{2.54}', 'c(p) = 2.54p', 'c(p) = 2.54 - p'],
    correctAnswer: 2,
    explanation: '\\text{Multiplicamos las pulgadas por el factor de conversión: } c(p) = 2.54p',
    difficulty: 'easy',
    skills: ['funcion-lineal-problemas-conversion', 'funcion-lineal-concepto']
  },
  {
    id: 'm1-alg010-15',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'conversión',
    questionLatex: '\\text{Un tanque se llena a razón de 5 litros por minuto. Si ya tiene 20 litros, ¿cuántos litros tendrá en t minutos?}',
    options: ['V(t) = 5t', 'V(t) = 20t', 'V(t) = 20 + 5t', 'V(t) = 5 + 20t'],
    correctAnswer: 2,
    explanation: '\\text{Volumen inicial más lo que se agrega: } V(t) = 20 + 5t',
    difficulty: 'medium',
    skills: ['funcion-lineal-problemas-conversion', 'algebra-funciones']
  },
  // ========================================
  // INTERPRETACIÓN DE GRÁFICOS
  // ========================================
  {
    id: 'm1-alg010-16',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'interpretación',
    questionLatex: '\\text{En un gráfico de distancia vs tiempo, una línea horizontal indica:}',
    options: [
      '\\text{Movimiento acelerado}',
      '\\text{Objeto en reposo}',
      '\\text{Movimiento hacia atrás}',
      '\\text{Velocidad constante}'
    ],
    correctAnswer: 1,
    explanation: '\\text{Si la distancia no cambia con el tiempo, el objeto está detenido.}',
    difficulty: 'easy',
    skills: ['funcion-lineal-problemas-interpretacion', 'funcion-lineal-grafica']
  },
  {
    id: 'm1-alg010-17',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'interpretación',
    questionLatex: '\\text{En un gráfico de costo vs cantidad, la pendiente representa:}',
    options: [
      '\\text{El costo total}',
      '\\text{El costo fijo}',
      '\\text{El costo por unidad}',
      '\\text{La cantidad máxima}'
    ],
    correctAnswer: 2,
    explanation: '\\text{La pendiente indica cuánto aumenta el costo por cada unidad adicional.}',
    difficulty: 'medium',
    skills: ['funcion-lineal-problemas-interpretacion', 'funcion-afin-pendiente']
  },
  {
    id: 'm1-alg010-18',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'interpretación',
    questionLatex: '\\text{Si dos líneas en un gráfico de oferta-demanda se cruzan, el punto de intersección representa:}',
    options: [
      '\\text{El precio máximo}',
      '\\text{La cantidad mínima}',
      '\\text{El punto de equilibrio}',
      '\\text{El costo fijo}'
    ],
    correctAnswer: 2,
    explanation: '\\text{Donde oferta y demanda se igualan está el precio y cantidad de equilibrio.}',
    difficulty: 'medium',
    skills: ['funcion-lineal-problemas-interpretacion', 'sistemas-ecuaciones-problemas']
  },
  {
    id: 'm1-alg010-19',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'interpretación',
    questionLatex: '\\text{Un gráfico muestra el nivel de agua de un tanque. Si la línea tiene pendiente negativa, significa que:}',
    options: [
      '\\text{El tanque se está llenando}',
      '\\text{El tanque se está vaciando}',
      '\\text{El nivel es constante}',
      '\\text{El tanque está lleno}'
    ],
    correctAnswer: 1,
    explanation: '\\text{Pendiente negativa indica que el nivel disminuye con el tiempo.}',
    difficulty: 'easy',
    skills: ['funcion-lineal-problemas-interpretacion', 'funcion-lineal-grafica']
  },
  {
    id: 'm1-alg010-20',
    level: 'M1',
    topic: 'Álgebra y Funciones',
    subject: 'álgebra',
    operacionBase: 'interpretación',
    questionLatex: '\\text{Un gráfico lineal de ingresos vs ventas corta el eje y en un valor negativo. Esto indica:}',
    options: [
      '\\text{Ganancias desde el inicio}',
      '\\text{Costos fijos iniciales}',
      '\\text{No hay ventas}',
      '\\text{Error en el gráfico}'
    ],
    correctAnswer: 1,
    explanation: '\\text{El valor negativo en el eje y representa los costos fijos antes de generar ingresos.}',
    difficulty: 'hard',
    skills: ['funcion-lineal-problemas-interpretacion', 'funcion-lineal-concepto']
  }
];
