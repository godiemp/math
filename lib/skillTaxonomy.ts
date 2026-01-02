/**
 * Comprehensive Skill Taxonomy for PAES Math M1
 * Organized by topic with hierarchical skill definitions
 */

import type { Skill } from './types';

// Re-export for convenience
export type { Skill };

export const SKILLS: Record<string, Skill> = {
  // ============================================================================
  // NÚMEROS Y OPERACIONES - ENTEROS Y RACIONALES (ATOMIC SKILLS)
  // ============================================================================

  // ============================================================================
  // A. COMPRENSIÓN CONCEPTUAL
  // ============================================================================
  'numeros-enteros-comprender-significado': {
    id: 'numeros-enteros-comprender-significado',
    name: 'Comprender el significado de número entero',
    description: 'Entender qué es un número entero y su representación',
    topic: 'números',
    category: 'comprension-conceptual'
  },
  'numeros-racionales-comprender-significado': {
    id: 'numeros-racionales-comprender-significado',
    name: 'Comprender el significado de número racional',
    description: 'Entender qué es un número racional y sus formas de representación',
    topic: 'números',
    category: 'comprension-conceptual'
  },
  'numeros-identificar-contextos': {
    id: 'numeros-identificar-contextos',
    name: 'Identificar números enteros y racionales en contextos',
    description: 'Reconocer números enteros y racionales en situaciones reales',
    topic: 'números',
    category: 'comprension-conceptual'
  },
  'numeros-representar-recta-numerica': {
    id: 'numeros-representar-recta-numerica',
    name: 'Representar enteros y fracciones en la recta numérica',
    description: 'Ubicar números enteros y fracciones en la recta numérica',
    topic: 'números',
    category: 'comprension-conceptual'
  },
  'numeros-valor-absoluto': {
    id: 'numeros-valor-absoluto',
    name: 'Comprender valor absoluto y distancia al cero',
    description: 'Entender el concepto de valor absoluto como distancia al origen',
    topic: 'números',
    category: 'comprension-conceptual'
  },
  'numeros-equivalencia-fracciones': {
    id: 'numeros-equivalencia-fracciones',
    name: 'Reconocer equivalencia de fracciones',
    description: 'Identificar fracciones equivalentes (simplificar o ampliar)',
    topic: 'números',
    category: 'comprension-conceptual'
  },
  'numeros-relacionar-fraccion-decimal-porcentaje': {
    id: 'numeros-relacionar-fraccion-decimal-porcentaje',
    name: 'Relacionar fracción, decimal y porcentaje',
    description: 'Convertir y relacionar fracciones, decimales y porcentajes',
    topic: 'números',
    category: 'comprension-conceptual'
  },
  'numeros-signo-direccion': {
    id: 'numeros-signo-direccion',
    name: 'Reconocer el signo como dirección o sentido',
    description: 'Interpretar el signo como ganancia/pérdida, arriba/abajo',
    topic: 'números',
    category: 'comprension-conceptual'
  },
  'numeros-diferenciar-magnitudes': {
    id: 'numeros-diferenciar-magnitudes',
    name: 'Diferenciar magnitudes negativas y positivas',
    description: 'Distinguir entre magnitudes positivas y negativas en contexto',
    topic: 'números',
    category: 'comprension-conceptual'
  },
  'numeros-densidad-racionales': {
    id: 'numeros-densidad-racionales',
    name: 'Comprender la densidad de los racionales',
    description: 'Entender que entre dos números racionales siempre hay otro',
    topic: 'números',
    category: 'comprension-conceptual'
  },
  'numeros-fracciones-periodicas': {
    id: 'numeros-fracciones-periodicas',
    name: 'Reconocer fracciones periódicas',
    description: 'Identificar fracciones periódicas y su patrón repetitivo',
    topic: 'números',
    category: 'comprension-conceptual'
  },
  'numeros-convertir-decimal-periodico': {
    id: 'numeros-convertir-decimal-periodico',
    name: 'Convertir de decimal periódico a fracción',
    description: 'Convertir decimales periódicos a fracción y viceversa',
    topic: 'números',
    category: 'comprension-conceptual'
  },
  'numeros-fracciones-impropias-mixtos': {
    id: 'numeros-fracciones-impropias-mixtos',
    name: 'Reconocer fracciones impropias y números mixtos',
    description: 'Identificar y convertir entre fracciones impropias y números mixtos',
    topic: 'números',
    category: 'comprension-conceptual'
  },

  // ============================================================================
  // B. OPERACIONES BÁSICAS
  // ============================================================================
  'numeros-enteros-sumar-restar': {
    id: 'numeros-enteros-sumar-restar',
    name: 'Sumar y restar enteros con signo',
    description: 'Realizar sumas y restas con números enteros positivos y negativos',
    topic: 'números',
    category: 'operaciones-basicas'
  },
  'numeros-enteros-multiplicar-dividir': {
    id: 'numeros-enteros-multiplicar-dividir',
    name: 'Multiplicar y dividir enteros con signo',
    description: 'Realizar multiplicaciones y divisiones con números enteros',
    topic: 'números',
    category: 'operaciones-basicas'
  },
  'numeros-fracciones-sumar-restar-mismo-denominador': {
    id: 'numeros-fracciones-sumar-restar-mismo-denominador',
    name: 'Sumar y restar fracciones con igual denominador',
    description: 'Operar fracciones que tienen el mismo denominador',
    topic: 'números',
    category: 'operaciones-basicas'
  },
  'numeros-fracciones-sumar-restar-distinto-denominador': {
    id: 'numeros-fracciones-sumar-restar-distinto-denominador',
    name: 'Sumar y restar fracciones con distinto denominador',
    description: 'Operar fracciones con diferentes denominadores',
    topic: 'números',
    category: 'operaciones-basicas'
  },
  'numeros-fracciones-multiplicar-dividir': {
    id: 'numeros-fracciones-multiplicar-dividir',
    name: 'Multiplicar y dividir fracciones',
    description: 'Realizar multiplicaciones y divisiones de fracciones',
    topic: 'números',
    category: 'operaciones-basicas'
  },
  'numeros-decimales-sumar-restar': {
    id: 'numeros-decimales-sumar-restar',
    name: 'Sumar y restar decimales',
    description: 'Realizar sumas y restas con números decimales',
    topic: 'números',
    category: 'operaciones-basicas'
  },
  'numeros-decimales-multiplicar-dividir': {
    id: 'numeros-decimales-multiplicar-dividir',
    name: 'Multiplicar y dividir decimales',
    description: 'Realizar multiplicaciones y divisiones con decimales',
    topic: 'números',
    category: 'operaciones-basicas'
  },
  'numeros-jerarquia-operaciones': {
    id: 'numeros-jerarquia-operaciones',
    name: 'Aplicar la jerarquía de operaciones con paréntesis',
    description: 'Resolver operaciones respetando la precedencia y paréntesis',
    topic: 'números',
    category: 'operaciones-basicas'
  },
  'numeros-inverso-aditivo-multiplicativo': {
    id: 'numeros-inverso-aditivo-multiplicativo',
    name: 'Identificar y usar inverso aditivo y multiplicativo',
    description: 'Trabajar con inversos aditivos (opuesto) y multiplicativos (recíproco)',
    topic: 'números',
    category: 'operaciones-basicas'
  },
  'numeros-simplificar-fracciones': {
    id: 'numeros-simplificar-fracciones',
    name: 'Simplificar fracciones y resultados',
    description: 'Reducir fracciones a su forma más simple',
    topic: 'números',
    category: 'operaciones-basicas'
  },
  'numeros-potencias-raices-racionales': {
    id: 'numeros-potencias-raices-racionales',
    name: 'Calcular potencias y raíces con exponentes racionales',
    description: 'Operar con potencias y raíces de exponentes racionales simples',
    topic: 'números',
    category: 'operaciones-basicas'
  },
  'numeros-decimales-orden-magnitud': {
    id: 'numeros-decimales-orden-magnitud',
    name: 'Controlar orden de magnitud con decimales',
    description: 'Dividir o multiplicar por decimales controlando la magnitud',
    topic: 'números',
    category: 'operaciones-basicas'
  },
  'numeros-estimar-resultados': {
    id: 'numeros-estimar-resultados',
    name: 'Estimar resultados antes del cálculo',
    description: 'Hacer estimaciones para controlar errores de cálculo',
    topic: 'números',
    category: 'operaciones-basicas'
  },

  // ============================================================================
  // C. COMPARACIÓN Y ORDEN
  // ============================================================================
  'numeros-enteros-ordenar-recta': {
    id: 'numeros-enteros-ordenar-recta',
    name: 'Ordenar números enteros en la recta numérica',
    description: 'Ubicar y ordenar enteros en la recta numérica',
    topic: 'números',
    category: 'comparacion-orden'
  },
  'numeros-fracciones-comparar-mismo-denominador': {
    id: 'numeros-fracciones-comparar-mismo-denominador',
    name: 'Comparar fracciones con igual denominador',
    description: 'Determinar cuál fracción es mayor cuando tienen igual denominador',
    topic: 'números',
    category: 'comparacion-orden'
  },
  'numeros-fracciones-comparar-distinto-denominador': {
    id: 'numeros-fracciones-comparar-distinto-denominador',
    name: 'Comparar fracciones con distinto denominador',
    description: 'Comparar fracciones con diferentes denominadores',
    topic: 'números',
    category: 'comparacion-orden'
  },
  'numeros-decimales-comparar': {
    id: 'numeros-decimales-comparar',
    name: 'Comparar decimales con distinto número de cifras',
    description: 'Comparar números decimales con diferente cantidad de decimales',
    topic: 'números',
    category: 'comparacion-orden'
  },
  'numeros-convertir-para-comparar': {
    id: 'numeros-convertir-para-comparar',
    name: 'Convertir entre fracciones y decimales para comparar',
    description: 'Cambiar representación para facilitar comparaciones',
    topic: 'números',
    category: 'comparacion-orden'
  },
  'numeros-identificar-mayor-menor-mixtos': {
    id: 'numeros-identificar-mayor-menor-mixtos',
    name: 'Identificar el número mayor o menor en conjuntos mixtos',
    description: 'Comparar números en diferentes representaciones',
    topic: 'números',
    category: 'comparacion-orden'
  },
  'numeros-estimar-magnitudes-comparar': {
    id: 'numeros-estimar-magnitudes-comparar',
    name: 'Estimar magnitudes antes de comparar',
    description: 'Hacer estimaciones para facilitar comparaciones',
    topic: 'números',
    category: 'comparacion-orden'
  },
  'numeros-comparar-distancia-cero': {
    id: 'numeros-comparar-distancia-cero',
    name: 'Comparar por distancia al cero (magnitud absoluta)',
    description: 'Comparar números usando su valor absoluto',
    topic: 'números',
    category: 'comparacion-orden'
  },
  'numeros-interpretar-mayor-negativos': {
    id: 'numeros-interpretar-mayor-negativos',
    name: 'Interpretar "mayor que" en contextos negativos',
    description: 'Entender comparaciones con números negativos o pérdidas',
    topic: 'números',
    category: 'comparacion-orden'
  },
  'numeros-racionales-efecto-multiplicativo': {
    id: 'numeros-racionales-efecto-multiplicativo',
    name: 'Analizar efecto multiplicativo de racionales',
    description: 'Determinar si un racional es mayor/menor que 1 y su efecto al multiplicar',
    topic: 'números',
    category: 'comparacion-orden'
  },

  // ============================================================================
  // D. PROPIEDADES Y RELACIONES
  // ============================================================================
  'numeros-propiedades-conmutativa-asociativa-distributiva': {
    id: 'numeros-propiedades-conmutativa-asociativa-distributiva',
    name: 'Aplicar propiedades conmutativa, asociativa y distributiva',
    description: 'Usar propiedades de las operaciones para simplificar cálculos',
    topic: 'números',
    category: 'propiedades-relaciones'
  },
  'numeros-equivalencias-fraccionales': {
    id: 'numeros-equivalencias-fraccionales',
    name: 'Usar equivalencias fraccionales para simplificar',
    description: 'Aplicar fracciones equivalentes en expresiones',
    topic: 'números',
    category: 'propiedades-relaciones'
  },
  'numeros-patrones-signos': {
    id: 'numeros-patrones-signos',
    name: 'Detectar patrones de signos',
    description: 'Reconocer patrones como −×−=+',
    topic: 'números',
    category: 'propiedades-relaciones'
  },
  'numeros-neutralidad-cero-uno': {
    id: 'numeros-neutralidad-cero-uno',
    name: 'Reconocer neutralidad de 0 y 1',
    description: 'Entender el rol neutro del 0 en suma y del 1 en multiplicación',
    topic: 'números',
    category: 'propiedades-relaciones'
  },
  'numeros-efecto-multiplicar-dividir-fracciones': {
    id: 'numeros-efecto-multiplicar-dividir-fracciones',
    name: 'Evaluar efecto de multiplicar/dividir por fracciones',
    description: 'Analizar el resultado al multiplicar/dividir por fracciones >1 o <1',
    topic: 'números',
    category: 'propiedades-relaciones'
  },
  'numeros-patrones-equivalencia-simbolica': {
    id: 'numeros-patrones-equivalencia-simbolica',
    name: 'Reconocer patrones de equivalencia simbólica',
    description: 'Identificar equivalencias como 2x/4 = x/2',
    topic: 'números',
    category: 'propiedades-relaciones'
  },
  'numeros-justificar-con-propiedades': {
    id: 'numeros-justificar-con-propiedades',
    name: 'Justificar resultados usando propiedades',
    description: 'Argumentar resultados con propiedades, no solo cálculo',
    topic: 'números',
    category: 'propiedades-relaciones'
  },

  // ============================================================================
  // E. PROBLEMAS Y MODELAMIENTO CONTEXTUAL
  // ============================================================================
  'numeros-representar-ganancias-perdidas': {
    id: 'numeros-representar-ganancias-perdidas',
    name: 'Representar ganancias/pérdidas con signo',
    description: 'Modelar temperaturas, desplazamientos, ganancias/pérdidas con números con signo',
    topic: 'números',
    category: 'problemas-modelamiento'
  },
  'numeros-modelar-proporciones-repartos': {
    id: 'numeros-modelar-proporciones-repartos',
    name: 'Modelar proporciones o repartos equitativos',
    description: 'Usar fracciones para representar repartos y proporciones',
    topic: 'números',
    category: 'problemas-modelamiento'
  },
  'numeros-problemas-mezcla-concentracion': {
    id: 'numeros-problemas-mezcla-concentracion',
    name: 'Resolver problemas de mezcla o concentración',
    description: 'Aplicar racionales en problemas de mezclas y concentraciones',
    topic: 'números',
    category: 'problemas-modelamiento'
  },
  'numeros-problemas-comparacion-relativa': {
    id: 'numeros-problemas-comparacion-relativa',
    name: 'Resolver problemas de comparación relativa',
    description: 'Problemas de "más/menos que", diferencias relativas',
    topic: 'números',
    category: 'problemas-modelamiento'
  },
  'numeros-problemas-unidades-conversiones': {
    id: 'numeros-problemas-unidades-conversiones',
    name: 'Resolver problemas con unidades o conversiones',
    description: 'Problemas con unidades y conversiones racionales',
    topic: 'números',
    category: 'problemas-modelamiento'
  },
  'numeros-problemas-crecimiento-reduccion': {
    id: 'numeros-problemas-crecimiento-reduccion',
    name: 'Plantear problemas de crecimiento o reducción iterada',
    description: 'Modelar y resolver situaciones de crecimiento/reducción repetida',
    topic: 'números',
    category: 'problemas-modelamiento'
  },
  'numeros-interpretar-resultados-razonabilidad': {
    id: 'numeros-interpretar-resultados-razonabilidad',
    name: 'Interpretar resultados y justificar razonabilidad',
    description: 'Verificar que los resultados tengan sentido en el contexto',
    topic: 'números',
    category: 'problemas-modelamiento'
  },
  'numeros-aplicar-restricciones': {
    id: 'numeros-aplicar-restricciones',
    name: 'Aplicar restricciones en problemas',
    description: 'Trabajar con condiciones como "sin pasarse", "mínimo posible"',
    topic: 'números',
    category: 'problemas-modelamiento'
  },
  'numeros-analizar-magnitudes-relativas': {
    id: 'numeros-analizar-magnitudes-relativas',
    name: 'Analizar magnitudes relativas',
    description: 'Interpretar "el doble", "la mitad", "dos tercios más que"',
    topic: 'números',
    category: 'problemas-modelamiento'
  },
  'numeros-calcular-promedios-racionales': {
    id: 'numeros-calcular-promedios-racionales',
    name: 'Calcular promedios racionales',
    description: 'Calcular media de fracciones o decimales',
    topic: 'números',
    category: 'problemas-modelamiento'
  },
  'numeros-interpretar-razones-tasas': {
    id: 'numeros-interpretar-razones-tasas',
    name: 'Interpretar razones y tasas como cocientes',
    description: 'Trabajar con velocidad, densidad, costo unitario como razones',
    topic: 'números',
    category: 'problemas-modelamiento'
  },

  // ============================================================================
  // F. RAZONAMIENTO Y METACOGNICIÓN
  // ============================================================================
  'numeros-traducir-verbal-simbolico': {
    id: 'numeros-traducir-verbal-simbolico',
    name: 'Traducir entre lenguaje verbal y simbólico',
    description: 'Convertir problemas verbales a expresiones matemáticas y viceversa',
    topic: 'números',
    category: 'razonamiento-metacognicion'
  },
  'numeros-argumentar-sentido-resultado': {
    id: 'numeros-argumentar-sentido-resultado',
    name: 'Argumentar por qué un resultado tiene sentido',
    description: 'Justificar resultados por signo, magnitud, proporción',
    topic: 'números',
    category: 'razonamiento-metacognicion'
  },
  'numeros-detectar-corregir-errores': {
    id: 'numeros-detectar-corregir-errores',
    name: 'Detectar y corregir errores',
    description: 'Identificar errores de cálculo o interpretación y corregirlos',
    topic: 'números',
    category: 'razonamiento-metacognicion'
  },
  'numeros-evaluar-coherencia-contexto': {
    id: 'numeros-evaluar-coherencia-contexto',
    name: 'Evaluar coherencia con el contexto',
    description: 'Verificar si una respuesta es coherente con el problema planteado',
    topic: 'números',
    category: 'razonamiento-metacognicion'
  },
  'numeros-generalizar-patrones': {
    id: 'numeros-generalizar-patrones',
    name: 'Generalizar patrones de operaciones',
    description: 'Identificar patrones generales en operaciones con enteros y racionales',
    topic: 'números',
    category: 'razonamiento-metacognicion'
  },
  'numeros-verificar-aproximaciones': {
    id: 'numeros-verificar-aproximaciones',
    name: 'Verificar coherencia entre aproximaciones y resultados',
    description: 'Comprobar que aproximaciones y resultados exactos sean consistentes',
    topic: 'números',
    category: 'razonamiento-metacognicion'
  },
  'numeros-redondear-precision': {
    id: 'numeros-redondear-precision',
    name: 'Redondear racionales según precisión requerida',
    description: 'Ajustar la precisión de números racionales según el contexto',
    topic: 'números',
    category: 'razonamiento-metacognicion'
  },

  // ============================================================================
  // LEGACY SKILLS (keeping for backward compatibility with existing questions)
  // ============================================================================
  'numeros-porcentajes': {
    id: 'numeros-porcentajes',
    name: 'Porcentajes',
    description: 'Calcular porcentajes y aplicarlos',
    topic: 'números'
  },
  'numeros-porcentajes-descuentos': {
    id: 'numeros-porcentajes-descuentos',
    name: 'Descuentos',
    description: 'Aplicar descuentos porcentuales',
    topic: 'números',
    parentSkill: 'numeros-porcentajes'
  },
  'numeros-proporcionalidad': {
    id: 'numeros-proporcionalidad',
    name: 'Proporcionalidad',
    description: 'Proporciones directas e inversas',
    topic: 'números'
  },
  'numeros-proporcionalidad-directa': {
    id: 'numeros-proporcionalidad-directa',
    name: 'Proporcionalidad directa',
    description: 'Resolver problemas de proporcionalidad directa',
    topic: 'números',
    parentSkill: 'numeros-proporcionalidad'
  },
  'numeros-proporcionalidad-inversa': {
    id: 'numeros-proporcionalidad-inversa',
    name: 'Proporcionalidad inversa',
    description: 'Resolver problemas de proporcionalidad inversa',
    topic: 'números',
    parentSkill: 'numeros-proporcionalidad'
  },
  'numeros-potencias': {
    id: 'numeros-potencias',
    name: 'Potencias',
    description: 'Calcular y operar con potencias',
    topic: 'números'
  },
  'numeros-potencias-propiedades': {
    id: 'numeros-potencias-propiedades',
    name: 'Propiedades de potencias',
    description: 'Aplicar propiedades de multiplicación y división de potencias',
    topic: 'números',
    parentSkill: 'numeros-potencias'
  },
  'numeros-raices': {
    id: 'numeros-raices',
    name: 'Raíces',
    description: 'Calcular raíces cuadradas',
    topic: 'números'
  },
  'numeros-mcd-mcm': {
    id: 'numeros-mcd-mcm',
    name: 'MCD y MCM',
    description: 'Máximo común divisor y mínimo común múltiplo',
    topic: 'números'
  },

  // ============================================================================
  // ÁLGEBRA Y FUNCIONES
  // ============================================================================
  'algebra-expresiones': {
    id: 'algebra-expresiones',
    name: 'Expresiones algebraicas',
    description: 'Simplificar y evaluar expresiones algebraicas',
    topic: 'álgebra'
  },
  'algebra-terminos-semejantes': {
    id: 'algebra-terminos-semejantes',
    name: 'Términos semejantes',
    description: 'Reducir términos semejantes',
    topic: 'álgebra',
    parentSkill: 'algebra-expresiones'
  },
  'algebra-ecuaciones-lineales': {
    id: 'algebra-ecuaciones-lineales',
    name: 'Ecuaciones lineales',
    description: 'Resolver ecuaciones lineales de primer grado',
    topic: 'álgebra'
  },
  'algebra-despeje': {
    id: 'algebra-despeje',
    name: 'Despeje de variables',
    description: 'Despejar variables en ecuaciones',
    topic: 'álgebra',
    parentSkill: 'algebra-ecuaciones-lineales'
  },
  'algebra-funciones': {
    id: 'algebra-funciones',
    name: 'Funciones',
    description: 'Evaluar y trabajar con funciones',
    topic: 'álgebra'
  },
  'algebra-evaluacion-funciones': {
    id: 'algebra-evaluacion-funciones',
    name: 'Evaluación de funciones',
    description: 'Evaluar funciones para valores específicos',
    topic: 'álgebra',
    parentSkill: 'algebra-funciones'
  },
  'algebra-funciones-lineales': {
    id: 'algebra-funciones-lineales',
    name: 'Funciones lineales',
    description: 'Trabajar con funciones de la forma y = mx + b',
    topic: 'álgebra',
    parentSkill: 'algebra-funciones'
  },
  'algebra-pendiente': {
    id: 'algebra-pendiente',
    name: 'Pendiente',
    description: 'Identificar la pendiente de una recta',
    topic: 'álgebra',
    parentSkill: 'algebra-funciones-lineales'
  },
  'algebra-factorizacion': {
    id: 'algebra-factorizacion',
    name: 'Factorización',
    description: 'Factorizar expresiones algebraicas',
    topic: 'álgebra'
  },
  'algebra-diferencia-cuadrados': {
    id: 'algebra-diferencia-cuadrados',
    name: 'Diferencia de cuadrados',
    description: 'Factorizar diferencia de cuadrados a² - b²',
    topic: 'álgebra',
    parentSkill: 'algebra-factorizacion'
  },
  'algebra-expansion': {
    id: 'algebra-expansion',
    name: 'Expansión algebraica',
    description: 'Expandir productos de binomios',
    topic: 'álgebra'
  },
  'algebra-propiedad-distributiva': {
    id: 'algebra-propiedad-distributiva',
    name: 'Propiedad distributiva',
    description: 'Aplicar la propiedad distributiva',
    topic: 'álgebra',
    parentSkill: 'algebra-expansion'
  },
  'algebra-desigualdades': {
    id: 'algebra-desigualdades',
    name: 'Desigualdades',
    description: 'Resolver desigualdades lineales',
    topic: 'álgebra'
  },

  // ============================================================================
  // GEOMETRÍA
  // ============================================================================
  'geometria-perimetro': {
    id: 'geometria-perimetro',
    name: 'Perímetro',
    description: 'Calcular perímetros de figuras',
    topic: 'geometría'
  },
  'geometria-area': {
    id: 'geometria-area',
    name: 'Área',
    description: 'Calcular áreas de figuras planas',
    topic: 'geometría'
  },
  'geometria-volumen': {
    id: 'geometria-volumen',
    name: 'Volumen',
    description: 'Calcular volúmenes de cuerpos geométricos',
    topic: 'geometría'
  },
  'geometria-triangulos': {
    id: 'geometria-triangulos',
    name: 'Triángulos',
    description: 'Propiedades y cálculos con triángulos',
    topic: 'geometría'
  },
  'geometria-pitagoras': {
    id: 'geometria-pitagoras',
    name: 'Teorema de Pitágoras',
    description: 'Aplicar el teorema de Pitágoras en triángulos rectángulos',
    topic: 'geometría',
    parentSkill: 'geometria-triangulos'
  },
  'geometria-area-triangulo': {
    id: 'geometria-area-triangulo',
    name: 'Área de triángulo',
    description: 'Calcular el área de un triángulo',
    topic: 'geometría',
    parentSkill: 'geometria-triangulos'
  },
  'geometria-circulos': {
    id: 'geometria-circulos',
    name: 'Círculos',
    description: 'Área y circunferencia de círculos',
    topic: 'geometría'
  },
  'geometria-area-circulo': {
    id: 'geometria-area-circulo',
    name: 'Área de círculo',
    description: 'Calcular el área de un círculo',
    topic: 'geometría',
    parentSkill: 'geometria-circulos'
  },
  'geometria-rectangulos': {
    id: 'geometria-rectangulos',
    name: 'Rectángulos',
    description: 'Perímetro y área de rectángulos',
    topic: 'geometría'
  },
  'geometria-cuadrados': {
    id: 'geometria-cuadrados',
    name: 'Cuadrados',
    description: 'Perímetro y área de cuadrados',
    topic: 'geometría'
  },
  'geometria-trapecio': {
    id: 'geometria-trapecio',
    name: 'Trapecio',
    description: 'Área de trapecio',
    topic: 'geometría'
  },
  'geometria-angulos': {
    id: 'geometria-angulos',
    name: 'Ángulos',
    description: 'Tipos y propiedades de ángulos',
    topic: 'geometría'
  },
  'geometria-angulos-complementarios': {
    id: 'geometria-angulos-complementarios',
    name: 'Ángulos complementarios',
    description: 'Ángulos que suman 90°',
    topic: 'geometría',
    parentSkill: 'geometria-angulos'
  },
  'geometria-angulos-suplementarios': {
    id: 'geometria-angulos-suplementarios',
    name: 'Ángulos suplementarios',
    description: 'Ángulos que suman 180°',
    topic: 'geometría',
    parentSkill: 'geometria-angulos'
  },
  'geometria-angulos-adyacentes': {
    id: 'geometria-angulos-adyacentes',
    name: 'Ángulos adyacentes',
    description: 'Suma de ángulos adyacentes',
    topic: 'geometría',
    parentSkill: 'geometria-angulos'
  },
  'geometria-plano-cartesiano': {
    id: 'geometria-plano-cartesiano',
    name: 'Plano cartesiano',
    description: 'Trabajar con coordenadas en el plano',
    topic: 'geometría'
  },
  'geometria-distancia': {
    id: 'geometria-distancia',
    name: 'Distancia entre puntos',
    description: 'Calcular distancia entre dos puntos',
    topic: 'geometría',
    parentSkill: 'geometria-plano-cartesiano'
  },
  'geometria-volumen-cubo': {
    id: 'geometria-volumen-cubo',
    name: 'Volumen de cubo',
    description: 'Calcular el volumen de un cubo',
    topic: 'geometría',
    parentSkill: 'geometria-volumen'
  },

  // ============================================================================
  // PROBABILIDAD Y ESTADÍSTICA
  // ============================================================================
  'probabilidad-basica': {
    id: 'probabilidad-basica',
    name: 'Probabilidad básica',
    description: 'Calcular probabilidades simples',
    topic: 'probabilidad'
  },
  'probabilidad-casos-favorables': {
    id: 'probabilidad-casos-favorables',
    name: 'Casos favorables y posibles',
    description: 'Identificar casos favorables y posibles',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-basica'
  },
  'probabilidad-eventos-compuestos': {
    id: 'probabilidad-eventos-compuestos',
    name: 'Eventos compuestos',
    description: 'Probabilidad de eventos múltiples',
    topic: 'probabilidad'
  },
  'estadistica-media': {
    id: 'estadistica-media',
    name: 'Media aritmética',
    description: 'Calcular la media o promedio',
    topic: 'probabilidad'
  },
  'estadistica-mediana': {
    id: 'estadistica-mediana',
    name: 'Mediana',
    description: 'Encontrar la mediana de un conjunto de datos',
    topic: 'probabilidad'
  },
  'estadistica-moda': {
    id: 'estadistica-moda',
    name: 'Moda',
    description: 'Identificar la moda (valor más frecuente)',
    topic: 'probabilidad'
  },
  'estadistica-rango': {
    id: 'estadistica-rango',
    name: 'Rango',
    description: 'Calcular el rango de un conjunto de datos',
    topic: 'probabilidad'
  },
  'estadistica-porcentajes': {
    id: 'estadistica-porcentajes',
    name: 'Porcentajes en datos',
    description: 'Calcular porcentajes a partir de datos',
    topic: 'probabilidad'
  },

  // ============================================================================
  // M2 ADVANCED SKILLS - NÚMEROS
  // ============================================================================
  'numeros-racionalizacion': {
    id: 'numeros-racionalizacion',
    name: 'Racionalización',
    description: 'Racionalizar denominadores con raíces',
    topic: 'números'
  },
  'numeros-factorizacion-prima': {
    id: 'numeros-factorizacion-prima',
    name: 'Factorización prima',
    description: 'Descomponer números en factores primos',
    topic: 'números'
  },

  // ============================================================================
  // M2 ADVANCED SKILLS - ÁLGEBRA
  // ============================================================================
  'algebra-sistemas-ecuaciones': {
    id: 'algebra-sistemas-ecuaciones',
    name: 'Sistemas de ecuaciones',
    description: 'Resolver sistemas de ecuaciones lineales',
    topic: 'álgebra'
  },
  'algebra-metodo-sustitucion': {
    id: 'algebra-metodo-sustitucion',
    name: 'Método de sustitución',
    description: 'Resolver sistemas por sustitución',
    topic: 'álgebra',
    parentSkill: 'algebra-sistemas-ecuaciones'
  },
  'algebra-metodo-eliminacion': {
    id: 'algebra-metodo-eliminacion',
    name: 'Método de eliminación',
    description: 'Resolver sistemas por eliminación/suma',
    topic: 'álgebra',
    parentSkill: 'algebra-sistemas-ecuaciones'
  },
  'algebra-ecuaciones-cuadraticas': {
    id: 'algebra-ecuaciones-cuadraticas',
    name: 'Ecuaciones cuadráticas',
    description: 'Resolver ecuaciones de segundo grado',
    topic: 'álgebra'
  },
  'algebra-factorizacion-cuadratica': {
    id: 'algebra-factorizacion-cuadratica',
    name: 'Factorización cuadrática',
    description: 'Factorizar ecuaciones cuadráticas',
    topic: 'álgebra',
    parentSkill: 'algebra-ecuaciones-cuadraticas'
  },
  'algebra-discriminante': {
    id: 'algebra-discriminante',
    name: 'Discriminante',
    description: 'Calcular y analizar el discriminante',
    topic: 'álgebra',
    parentSkill: 'algebra-ecuaciones-cuadraticas'
  },
  'algebra-formula-cuadratica': {
    id: 'algebra-formula-cuadratica',
    name: 'Fórmula cuadrática',
    description: 'Aplicar la fórmula general cuadrática',
    topic: 'álgebra',
    parentSkill: 'algebra-ecuaciones-cuadraticas'
  },

  // ============================================================================
  // M2 ADVANCED SKILLS - GEOMETRÍA
  // ============================================================================
  'geometria-volumen-cilindro': {
    id: 'geometria-volumen-cilindro',
    name: 'Volumen de cilindro',
    description: 'Calcular el volumen de un cilindro',
    topic: 'geometría',
    parentSkill: 'geometria-volumen'
  },
  'geometria-rectas-perpendiculares': {
    id: 'geometria-rectas-perpendiculares',
    name: 'Rectas perpendiculares',
    description: 'Identificar y trabajar con rectas perpendiculares',
    topic: 'geometría'
  },
  'geometria-pendiente-perpendicular': {
    id: 'geometria-pendiente-perpendicular',
    name: 'Pendientes perpendiculares',
    description: 'Calcular pendiente de recta perpendicular',
    topic: 'geometría',
    parentSkill: 'geometria-rectas-perpendiculares'
  },
  'geometria-ley-cosenos': {
    id: 'geometria-ley-cosenos',
    name: 'Ley de cosenos',
    description: 'Aplicar la ley de cosenos en triángulos',
    topic: 'geometría',
    parentSkill: 'geometria-triangulos'
  },

  // ============================================================================
  // M2 ADVANCED SKILLS - PROBABILIDAD Y ESTADÍSTICA
  // ============================================================================
  'estadistica-cuartiles': {
    id: 'estadistica-cuartiles',
    name: 'Cuartiles',
    description: 'Calcular cuartiles Q1, Q2, Q3',
    topic: 'probabilidad'
  },
  'estadistica-rango-intercuartilico': {
    id: 'estadistica-rango-intercuartilico',
    name: 'Rango intercuartílico (IQR)',
    description: 'Calcular el rango intercuartílico',
    topic: 'probabilidad',
    parentSkill: 'estadistica-cuartiles'
  },
  'probabilidad-combinatoria': {
    id: 'probabilidad-combinatoria',
    name: 'Combinatoria',
    description: 'Combinaciones y permutaciones',
    topic: 'probabilidad'
  },
  'probabilidad-combinaciones': {
    id: 'probabilidad-combinaciones',
    name: 'Combinaciones',
    description: 'Calcular combinaciones C(n,r)',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-combinatoria'
  },
  'probabilidad-factorial': {
    id: 'probabilidad-factorial',
    name: 'Factorial',
    description: 'Calcular y aplicar factoriales',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-combinatoria'
  },

  // ============================================================================
  // M1-PROB-006: GRÁFICOS DE DISPERSIÓN Y COMPRENSIÓN DEL AZAR
  // ============================================================================
  'estadistica-graficos-dispersion': {
    id: 'estadistica-graficos-dispersion',
    name: 'Gráficos de dispersión',
    description: 'Construir e interpretar gráficos de dispersión (nubes de puntos)',
    topic: 'probabilidad'
  },
  'estadistica-comparar-poblaciones': {
    id: 'estadistica-comparar-poblaciones',
    name: 'Comparar poblaciones',
    description: 'Comparar dos o más poblaciones usando gráficos estadísticos',
    topic: 'probabilidad',
    parentSkill: 'estadistica-graficos-dispersion'
  },
  'estadistica-frecuencia-relativa': {
    id: 'estadistica-frecuencia-relativa',
    name: 'Frecuencia relativa',
    description: 'Calcular e interpretar frecuencias relativas',
    topic: 'probabilidad'
  },
  'probabilidad-azar': {
    id: 'probabilidad-azar',
    name: 'Comprensión del azar',
    description: 'Comprender la naturaleza aleatoria de eventos y experimentos',
    topic: 'probabilidad'
  },
  'probabilidad-ley-grandes-numeros': {
    id: 'probabilidad-ley-grandes-numeros',
    name: 'Ley de los grandes números',
    description: 'Comprender cómo la frecuencia relativa se estabiliza con muchas repeticiones',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-azar'
  },

  // ============================================================================
  // ESTADÍSTICA - SKILLS ADICIONALES
  // ============================================================================
  'estadistica-frecuencia': {
    id: 'estadistica-frecuencia',
    name: 'Frecuencia absoluta',
    description: 'Contar y calcular frecuencias absolutas de datos',
    topic: 'probabilidad'
  },
  'estadistica-frecuencia-acumulada': {
    id: 'estadistica-frecuencia-acumulada',
    name: 'Frecuencia acumulada',
    description: 'Calcular frecuencias acumuladas',
    topic: 'probabilidad',
    parentSkill: 'estadistica-frecuencia'
  },
  'estadistica-tablas': {
    id: 'estadistica-tablas',
    name: 'Tablas de frecuencia',
    description: 'Construir e interpretar tablas de frecuencia',
    topic: 'probabilidad'
  },
  'estadistica-graficos': {
    id: 'estadistica-graficos',
    name: 'Gráficos estadísticos',
    description: 'Construir e interpretar gráficos estadísticos',
    topic: 'probabilidad'
  },
  'estadistica-graficos-circulares': {
    id: 'estadistica-graficos-circulares',
    name: 'Gráficos circulares',
    description: 'Construir e interpretar gráficos circulares (de torta)',
    topic: 'probabilidad',
    parentSkill: 'estadistica-graficos'
  },
  'estadistica-histogramas': {
    id: 'estadistica-histogramas',
    name: 'Histogramas',
    description: 'Construir e interpretar histogramas',
    topic: 'probabilidad',
    parentSkill: 'estadistica-graficos'
  },
  'estadistica-interpretacion': {
    id: 'estadistica-interpretacion',
    name: 'Interpretación de datos',
    description: 'Interpretar información de gráficos y tablas estadísticas',
    topic: 'probabilidad'
  },
  'estadistica-interpretacion-graficos': {
    id: 'estadistica-interpretacion-graficos',
    name: 'Interpretación de gráficos',
    description: 'Interpretar información de gráficos estadísticos',
    topic: 'probabilidad',
    parentSkill: 'estadistica-interpretacion'
  },
  'estadistica-conceptos': {
    id: 'estadistica-conceptos',
    name: 'Conceptos estadísticos',
    description: 'Comprender conceptos fundamentales de estadística',
    topic: 'probabilidad'
  },
  'estadistica-varianza': {
    id: 'estadistica-varianza',
    name: 'Varianza',
    description: 'Calcular la varianza de un conjunto de datos',
    topic: 'probabilidad'
  },
  'estadistica-varianza-desviacion': {
    id: 'estadistica-varianza-desviacion',
    name: 'Varianza y desviación estándar',
    description: 'Calcular varianza y desviación estándar',
    topic: 'probabilidad',
    parentSkill: 'estadistica-varianza'
  },
  'estadistica-desviacion-estandar': {
    id: 'estadistica-desviacion-estandar',
    name: 'Desviación estándar',
    description: 'Calcular e interpretar la desviación estándar',
    topic: 'probabilidad',
    parentSkill: 'estadistica-varianza'
  },
  'estadistica-desviacion-media': {
    id: 'estadistica-desviacion-media',
    name: 'Desviación media absoluta',
    description: 'Calcular la desviación media absoluta',
    topic: 'probabilidad'
  },
  'estadistica-coeficiente-variacion': {
    id: 'estadistica-coeficiente-variacion',
    name: 'Coeficiente de variación',
    description: 'Calcular e interpretar el coeficiente de variación',
    topic: 'probabilidad'
  },
  'estadistica-comparacion-dispersion': {
    id: 'estadistica-comparacion-dispersion',
    name: 'Comparación de dispersión',
    description: 'Comparar la dispersión entre diferentes grupos de datos',
    topic: 'probabilidad'
  },
  'estadistica-comparacion-grupos': {
    id: 'estadistica-comparacion-grupos',
    name: 'Comparación de grupos',
    description: 'Comparar estadísticas entre diferentes grupos',
    topic: 'probabilidad'
  },
  'estadistica-interpretacion-dispersion': {
    id: 'estadistica-interpretacion-dispersion',
    name: 'Interpretación de dispersión',
    description: 'Interpretar medidas de dispersión en contexto',
    topic: 'probabilidad'
  },
  'estadistica-medidas-dispersion': {
    id: 'estadistica-medidas-dispersion',
    name: 'Medidas de dispersión',
    description: 'Conocer y aplicar medidas de dispersión',
    topic: 'probabilidad'
  },
  'estadistica-medidas-posicion': {
    id: 'estadistica-medidas-posicion',
    name: 'Medidas de posición',
    description: 'Calcular e interpretar medidas de posición',
    topic: 'probabilidad'
  },
  'estadistica-percentiles': {
    id: 'estadistica-percentiles',
    name: 'Percentiles',
    description: 'Calcular e interpretar percentiles',
    topic: 'probabilidad',
    parentSkill: 'estadistica-cuartiles'
  },
  'estadistica-diagramas-caja': {
    id: 'estadistica-diagramas-caja',
    name: 'Diagramas de caja',
    description: 'Construir e interpretar diagramas de caja (box plots)',
    topic: 'probabilidad',
    parentSkill: 'estadistica-cuartiles'
  },
  'estadistica-propiedades-varianza': {
    id: 'estadistica-propiedades-varianza',
    name: 'Propiedades de la varianza',
    description: 'Aplicar propiedades de la varianza bajo transformaciones',
    topic: 'probabilidad',
    parentSkill: 'estadistica-varianza'
  },
  'estadistica-propiedades': {
    id: 'estadistica-propiedades',
    name: 'Propiedades estadísticas',
    description: 'Aplicar propiedades de medidas estadísticas',
    topic: 'probabilidad'
  },
  'estadistica-dispersion': {
    id: 'estadistica-dispersion',
    name: 'Dispersión de datos',
    description: 'Comprender el concepto de dispersión',
    topic: 'probabilidad'
  },
  'estadistica-simetria': {
    id: 'estadistica-simetria',
    name: 'Simetría de distribuciones',
    description: 'Identificar simetría en distribuciones de datos',
    topic: 'probabilidad'
  },
  'estadistica-asimetria': {
    id: 'estadistica-asimetria',
    name: 'Asimetría de distribuciones',
    description: 'Identificar y analizar asimetría en distribuciones',
    topic: 'probabilidad'
  },
  'estadistica-outliers': {
    id: 'estadistica-outliers',
    name: 'Valores atípicos',
    description: 'Identificar y analizar valores atípicos (outliers)',
    topic: 'probabilidad'
  },
  'estadistica-distribucion-normal': {
    id: 'estadistica-distribucion-normal',
    name: 'Distribución normal',
    description: 'Comprender propiedades de la distribución normal',
    topic: 'probabilidad'
  },
  'estadistica-analisis-datos': {
    id: 'estadistica-analisis-datos',
    name: 'Análisis de datos',
    description: 'Analizar conjuntos de datos estadísticos',
    topic: 'probabilidad'
  },
  'estadistica-analisis-critico': {
    id: 'estadistica-analisis-critico',
    name: 'Análisis crítico',
    description: 'Analizar críticamente información estadística',
    topic: 'probabilidad'
  },
  'estadistica-aplicaciones-contexto': {
    id: 'estadistica-aplicaciones-contexto',
    name: 'Aplicaciones en contexto',
    description: 'Aplicar estadística en situaciones reales',
    topic: 'probabilidad'
  },

  // ============================================================================
  // PROBABILIDAD - SKILLS ADICIONALES
  // ============================================================================
  'probabilidad-conceptos': {
    id: 'probabilidad-conceptos',
    name: 'Conceptos de probabilidad',
    description: 'Comprender conceptos fundamentales de probabilidad',
    topic: 'probabilidad'
  },
  'probabilidad-clasica': {
    id: 'probabilidad-clasica',
    name: 'Probabilidad clásica',
    description: 'Calcular probabilidades usando la definición clásica',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-basica'
  },
  'probabilidad-experimental': {
    id: 'probabilidad-experimental',
    name: 'Probabilidad experimental',
    description: 'Calcular probabilidades basadas en experimentos',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-basica'
  },
  'probabilidad-espacio-muestral': {
    id: 'probabilidad-espacio-muestral',
    name: 'Espacio muestral',
    description: 'Identificar y construir espacios muestrales',
    topic: 'probabilidad'
  },
  'probabilidad-eventos': {
    id: 'probabilidad-eventos',
    name: 'Eventos',
    description: 'Identificar y describir eventos probabilísticos',
    topic: 'probabilidad'
  },
  'probabilidad-eventos-excluyentes': {
    id: 'probabilidad-eventos-excluyentes',
    name: 'Eventos mutuamente excluyentes',
    description: 'Identificar y trabajar con eventos mutuamente excluyentes',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-eventos'
  },
  'probabilidad-eventos-independientes': {
    id: 'probabilidad-eventos-independientes',
    name: 'Eventos independientes',
    description: 'Identificar y trabajar con eventos independientes',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-eventos'
  },
  'probabilidad-eventos-dependientes': {
    id: 'probabilidad-eventos-dependientes',
    name: 'Eventos dependientes',
    description: 'Identificar y trabajar con eventos dependientes',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-eventos'
  },
  'probabilidad-union': {
    id: 'probabilidad-union',
    name: 'Unión de eventos',
    description: 'Calcular probabilidad de la unión de eventos',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-eventos-compuestos'
  },
  'probabilidad-complemento': {
    id: 'probabilidad-complemento',
    name: 'Evento complementario',
    description: 'Calcular probabilidad del evento complementario',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-eventos-compuestos'
  },
  'probabilidad-regla-aditiva': {
    id: 'probabilidad-regla-aditiva',
    name: 'Regla aditiva',
    description: 'Aplicar la regla aditiva de probabilidad',
    topic: 'probabilidad'
  },
  'probabilidad-regla-multiplicativa': {
    id: 'probabilidad-regla-multiplicativa',
    name: 'Regla multiplicativa',
    description: 'Aplicar la regla multiplicativa de probabilidad',
    topic: 'probabilidad'
  },
  'probabilidad-reglas-multiplicacion': {
    id: 'probabilidad-reglas-multiplicacion',
    name: 'Reglas de multiplicación',
    description: 'Aplicar reglas de multiplicación en probabilidad',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-regla-multiplicativa'
  },
  'probabilidad-condicional': {
    id: 'probabilidad-condicional',
    name: 'Probabilidad condicional',
    description: 'Calcular probabilidades condicionales',
    topic: 'probabilidad'
  },
  'probabilidad-condicional-concepto': {
    id: 'probabilidad-condicional-concepto',
    name: 'Concepto de probabilidad condicional',
    description: 'Comprender el concepto de probabilidad condicional',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-condicional'
  },
  'probabilidad-condicional-aplicaciones': {
    id: 'probabilidad-condicional-aplicaciones',
    name: 'Aplicaciones de probabilidad condicional',
    description: 'Aplicar probabilidad condicional en problemas',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-condicional'
  },
  'probabilidad-bayes': {
    id: 'probabilidad-bayes',
    name: 'Teorema de Bayes',
    description: 'Aplicar el teorema de Bayes',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-condicional'
  },
  'probabilidad-teorema-bayes': {
    id: 'probabilidad-teorema-bayes',
    name: 'Aplicación del teorema de Bayes',
    description: 'Resolver problemas usando el teorema de Bayes',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-bayes'
  },
  'probabilidad-sin-reposicion': {
    id: 'probabilidad-sin-reposicion',
    name: 'Probabilidad sin reposición',
    description: 'Calcular probabilidades en extracciones sin reposición',
    topic: 'probabilidad'
  },
  'probabilidad-tablas': {
    id: 'probabilidad-tablas',
    name: 'Tablas de probabilidad',
    description: 'Usar tablas para calcular probabilidades',
    topic: 'probabilidad'
  },
  'probabilidad-formulas': {
    id: 'probabilidad-formulas',
    name: 'Fórmulas de probabilidad',
    description: 'Conocer y aplicar fórmulas de probabilidad',
    topic: 'probabilidad'
  },
  'probabilidad-casos-excluyentes': {
    id: 'probabilidad-casos-excluyentes',
    name: 'Casos excluyentes',
    description: 'Identificar y trabajar con casos mutuamente excluyentes',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-eventos-excluyentes'
  },
  'probabilidad-conteo': {
    id: 'probabilidad-conteo',
    name: 'Técnicas de conteo en probabilidad',
    description: 'Aplicar técnicas de conteo para calcular probabilidades',
    topic: 'probabilidad'
  },
  'probabilidad-principio-multiplicativo': {
    id: 'probabilidad-principio-multiplicativo',
    name: 'Principio multiplicativo',
    description: 'Aplicar el principio multiplicativo de conteo',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-combinatoria'
  },
  'probabilidad-permutaciones': {
    id: 'probabilidad-permutaciones',
    name: 'Permutaciones',
    description: 'Calcular permutaciones',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-combinatoria'
  },
  'probabilidad-permutaciones-repeticion': {
    id: 'probabilidad-permutaciones-repeticion',
    name: 'Permutaciones con repetición',
    description: 'Calcular permutaciones cuando hay elementos repetidos',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-permutaciones'
  },
  'probabilidad-variaciones': {
    id: 'probabilidad-variaciones',
    name: 'Variaciones',
    description: 'Calcular variaciones',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-combinatoria'
  },
  'probabilidad-distribucion-binomial': {
    id: 'probabilidad-distribucion-binomial',
    name: 'Distribución binomial',
    description: 'Comprender y aplicar la distribución binomial',
    topic: 'probabilidad'
  },
  'probabilidad-calculo-binomial': {
    id: 'probabilidad-calculo-binomial',
    name: 'Cálculo binomial',
    description: 'Calcular probabilidades usando la fórmula binomial',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-distribucion-binomial'
  },
  'probabilidad-esperanza': {
    id: 'probabilidad-esperanza',
    name: 'Esperanza matemática',
    description: 'Calcular e interpretar el valor esperado',
    topic: 'probabilidad'
  },
  'probabilidad-varianza': {
    id: 'probabilidad-varianza',
    name: 'Varianza probabilística',
    description: 'Calcular la varianza de una variable aleatoria',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-esperanza'
  },
  'probabilidad-desviacion-estandar': {
    id: 'probabilidad-desviacion-estandar',
    name: 'Desviación estándar probabilística',
    description: 'Calcular la desviación estándar de una variable aleatoria',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-varianza'
  },
  'probabilidad-otros-modelos': {
    id: 'probabilidad-otros-modelos',
    name: 'Otros modelos probabilísticos',
    description: 'Conocer otros modelos de distribución de probabilidad',
    topic: 'probabilidad'
  },
  'probabilidad-geometrica': {
    id: 'probabilidad-geometrica',
    name: 'Distribución geométrica',
    description: 'Comprender y aplicar la distribución geométrica',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-otros-modelos'
  },
  'probabilidad-uniforme': {
    id: 'probabilidad-uniforme',
    name: 'Distribución uniforme',
    description: 'Comprender y aplicar la distribución uniforme',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-otros-modelos'
  },
  'probabilidad-poisson': {
    id: 'probabilidad-poisson',
    name: 'Distribución de Poisson',
    description: 'Comprender y aplicar la distribución de Poisson',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-otros-modelos'
  },
  'probabilidad-modelos-aplicaciones': {
    id: 'probabilidad-modelos-aplicaciones',
    name: 'Aplicaciones de modelos',
    description: 'Aplicar modelos probabilísticos en problemas reales',
    topic: 'probabilidad'
  },

  // ============================================================================
  // CONTEO Y COMBINATORIA - SKILLS ADICIONALES
  // ============================================================================
  'conteo-combinaciones': {
    id: 'conteo-combinaciones',
    name: 'Combinaciones (conteo)',
    description: 'Calcular combinaciones para problemas de conteo',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-combinaciones'
  },
  'conteo-permutaciones': {
    id: 'conteo-permutaciones',
    name: 'Permutaciones (conteo)',
    description: 'Calcular permutaciones para problemas de conteo',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-permutaciones'
  },
  'combinatoria-principio-multiplicativo': {
    id: 'combinatoria-principio-multiplicativo',
    name: 'Principio multiplicativo (combinatoria)',
    description: 'Aplicar el principio multiplicativo en problemas de conteo',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-combinatoria'
  },
  'combinatoria-combinaciones': {
    id: 'combinatoria-combinaciones',
    name: 'Combinaciones (combinatoria)',
    description: 'Calcular combinaciones en problemas de combinatoria',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-combinaciones'
  },
  'combinatoria-permutaciones': {
    id: 'combinatoria-permutaciones',
    name: 'Permutaciones (combinatoria)',
    description: 'Calcular permutaciones en problemas de combinatoria',
    topic: 'probabilidad',
    parentSkill: 'probabilidad-permutaciones'
  },
  'combinatoria-problemas-probabilidad': {
    id: 'combinatoria-problemas-probabilidad',
    name: 'Problemas de probabilidad con conteo',
    description: 'Resolver problemas de probabilidad usando técnicas de conteo',
    topic: 'probabilidad'
  },

  // ============================================================================
  // NÚMEROS - SKILLS GENÉRICOS ADICIONALES
  // ============================================================================
  'numeros-fracciones': {
    id: 'numeros-fracciones',
    name: 'Operaciones con fracciones',
    description: 'Realizar operaciones con fracciones',
    topic: 'números'
  },
  'numeros-decimales': {
    id: 'numeros-decimales',
    name: 'Operaciones con decimales',
    description: 'Realizar operaciones con números decimales',
    topic: 'números'
  },
  'numeros-operaciones-basicas': {
    id: 'numeros-operaciones-basicas',
    name: 'Operaciones básicas',
    description: 'Realizar operaciones aritméticas básicas',
    topic: 'números'
  },
  'numeros-division': {
    id: 'numeros-division',
    name: 'División',
    description: 'Realizar divisiones',
    topic: 'números',
    parentSkill: 'numeros-operaciones-basicas'
  },
  'numeros-multiplicacion': {
    id: 'numeros-multiplicacion',
    name: 'Multiplicación',
    description: 'Realizar multiplicaciones',
    topic: 'números',
    parentSkill: 'numeros-operaciones-basicas'
  },
  'numeros-orden': {
    id: 'numeros-orden',
    name: 'Ordenar números',
    description: 'Ordenar números de menor a mayor o viceversa',
    topic: 'números'
  },
  'numeros-comparacion': {
    id: 'numeros-comparacion',
    name: 'Comparar números',
    description: 'Comparar magnitudes numéricas',
    topic: 'números'
  },
  'numeros-porcentaje': {
    id: 'numeros-porcentaje',
    name: 'Cálculo de porcentajes',
    description: 'Calcular porcentajes',
    topic: 'números',
    parentSkill: 'numeros-porcentajes'
  },
  'numeros-factorial': {
    id: 'numeros-factorial',
    name: 'Factorial',
    description: 'Calcular factoriales',
    topic: 'números'
  },
  'numeros-primos': {
    id: 'numeros-primos',
    name: 'Números primos',
    description: 'Identificar y trabajar con números primos',
    topic: 'números'
  },
  'numeros-divisores': {
    id: 'numeros-divisores',
    name: 'Divisores',
    description: 'Encontrar divisores de un número',
    topic: 'números',
    parentSkill: 'numeros-mcd-mcm'
  },
  'numeros-multiplos': {
    id: 'numeros-multiplos',
    name: 'Múltiplos',
    description: 'Encontrar múltiplos de un número',
    topic: 'números',
    parentSkill: 'numeros-mcd-mcm'
  },
};

// Helper function to get all skills for a topic
export function getSkillsByTopic(topic: 'números' | 'álgebra' | 'geometría' | 'probabilidad'): Skill[] {
  return Object.values(SKILLS).filter(skill => skill.topic === topic);
}

// Helper function to get skill by ID
export function getSkillById(skillId: string): Skill | undefined {
  return SKILLS[skillId];
}

// Helper function to get all skill IDs
export function getAllSkillIds(): string[] {
  return Object.keys(SKILLS);
}

// Helper function to get skill names for display
export function getSkillNames(skillIds: string[]): string[] {
  return skillIds.map(id => SKILLS[id]?.name || id).filter(Boolean);
}

// Legacy export for backward compatibility
export const M1_SKILLS = SKILLS;
