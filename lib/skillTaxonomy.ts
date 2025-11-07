/**
 * Comprehensive Skill Taxonomy for PAES Math M1
 * Organized by topic with hierarchical skill definitions
 */

export interface Skill {
  id: string;
  name: string;
  description: string;
  topic: 'números' | 'álgebra' | 'geometría' | 'probabilidad';
  parentSkill?: string; // For hierarchical relationships
}

export const M1_SKILLS: Record<string, Skill> = {
  // ============================================================================
  // NÚMEROS Y OPERACIONES
  // ============================================================================
  'numeros-operaciones-basicas': {
    id: 'numeros-operaciones-basicas',
    name: 'Operaciones básicas',
    description: 'Suma, resta, multiplicación y división con números enteros',
    topic: 'números'
  },
  'numeros-fracciones': {
    id: 'numeros-fracciones',
    name: 'Fracciones',
    description: 'Operaciones con fracciones',
    topic: 'números'
  },
  'numeros-fracciones-suma': {
    id: 'numeros-fracciones-suma',
    name: 'Suma de fracciones',
    description: 'Sumar fracciones con común denominador',
    topic: 'números',
    parentSkill: 'numeros-fracciones'
  },
  'numeros-fracciones-comun-denominador': {
    id: 'numeros-fracciones-comun-denominador',
    name: 'Común denominador',
    description: 'Encontrar el común denominador para sumar/restar fracciones',
    topic: 'números',
    parentSkill: 'numeros-fracciones'
  },
  'numeros-decimales': {
    id: 'numeros-decimales',
    name: 'Números decimales',
    description: 'Operaciones con números decimales',
    topic: 'números'
  },
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
  'numeros-enteros': {
    id: 'numeros-enteros',
    name: 'Números enteros',
    description: 'Operaciones con números positivos y negativos',
    topic: 'números'
  },
  'numeros-orden-operaciones': {
    id: 'numeros-orden-operaciones',
    name: 'Orden de operaciones',
    description: 'Aplicar el orden correcto de operaciones',
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
};

// Helper function to get all skills for a topic
export function getSkillsByTopic(topic: 'números' | 'álgebra' | 'geometría' | 'probabilidad'): Skill[] {
  return Object.values(M1_SKILLS).filter(skill => skill.topic === topic);
}

// Helper function to get skill by ID
export function getSkillById(skillId: string): Skill | undefined {
  return M1_SKILLS[skillId];
}

// Helper function to get all skill IDs
export function getAllSkillIds(): string[] {
  return Object.keys(M1_SKILLS);
}

// Helper function to get skill names for display
export function getSkillNames(skillIds: string[]): string[] {
  return skillIds.map(id => M1_SKILLS[id]?.name || id).filter(Boolean);
}
