/**
 * Context Library
 *
 * Real-life situations and scenarios that can be used to generate math problems.
 * Each context defines variables and is compatible with specific atomic skills.
 */

import { Context } from '../types/core';

/**
 * Context library - collection of real-world situations
 */
export const contextLibrary: Context[] = [
  // ============================================================================
  // NÚMEROS (Numbers)
  // ============================================================================
  {
    id: 'ctx-shopping-discount',
    name: 'Compras con descuento',
    description: 'Una tienda ofrece descuentos en varios productos',
    category: 'shopping',
    compatibleSkills: [
      'numeros-porcentajes',
      'numeros-decimales',
      'numeros-operaciones-basicas',
      'numeros-proporcionalidad',
    ],
    variables: [
      {
        name: 'precio_original',
        type: 'decimal',
        min: 10,
        max: 1000,
        step: 5,
        unit: 'pesos',
        description: 'Precio original del producto',
      },
      {
        name: 'descuento',
        type: 'integer',
        min: 5,
        max: 70,
        step: 5,
        unit: '%',
        description: 'Porcentaje de descuento',
      },
      {
        name: 'producto',
        type: 'name',
        options: ['zapatos', 'camisa', 'pantalón', 'chaqueta', 'mochila', 'libro'],
        description: 'Tipo de producto',
      },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  {
    id: 'ctx-cooking-recipe',
    name: 'Receta de cocina',
    description: 'Preparando una receta que requiere ajustar las cantidades',
    category: 'cooking',
    compatibleSkills: [
      'numeros-fracciones',
      'numeros-proporcionalidad',
      'numeros-operaciones-basicas',
      'numeros-decimales',
    ],
    variables: [
      {
        name: 'cantidad_original',
        type: 'fraction',
        min: 1,
        max: 10,
        description: 'Cantidad original en la receta',
      },
      {
        name: 'porciones_original',
        type: 'integer',
        min: 2,
        max: 8,
        description: 'Número de porciones de la receta original',
      },
      {
        name: 'porciones_deseadas',
        type: 'integer',
        min: 4,
        max: 20,
        description: 'Número de porciones deseadas',
      },
      {
        name: 'ingrediente',
        type: 'name',
        options: ['harina', 'azúcar', 'leche', 'huevos', 'mantequilla', 'chocolate'],
        description: 'Ingrediente de la receta',
      },
      {
        name: 'unidad',
        type: 'unit',
        options: ['tazas', 'gramos', 'ml', 'unidades'],
        description: 'Unidad de medida',
      },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  {
    id: 'ctx-travel-distance',
    name: 'Viaje y distancia',
    description: 'Un viaje que involucra distancia, velocidad y tiempo',
    category: 'travel',
    compatibleSkills: [
      'numeros-proporcionalidad',
      'numeros-decimales',
      'numeros-operaciones-basicas',
    ],
    variables: [
      {
        name: 'distancia',
        type: 'decimal',
        min: 50,
        max: 500,
        step: 10,
        unit: 'km',
        description: 'Distancia del viaje',
      },
      {
        name: 'velocidad',
        type: 'integer',
        min: 40,
        max: 120,
        step: 10,
        unit: 'km/h',
        description: 'Velocidad del vehículo',
      },
      {
        name: 'ciudad_origen',
        type: 'name',
        options: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Temuco'],
        description: 'Ciudad de origen',
      },
      {
        name: 'ciudad_destino',
        type: 'name',
        options: ['Viña del Mar', 'Antofagasta', 'Puerto Montt', 'Iquique', 'Punta Arenas'],
        description: 'Ciudad de destino',
      },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // ============================================================================
  // ÁLGEBRA (Algebra)
  // ============================================================================
  {
    id: 'ctx-phone-plan',
    name: 'Plan de teléfono',
    description: 'Comparación de planes de teléfono con costo fijo y variable',
    category: 'finance',
    compatibleSkills: [
      'algebra-funciones-lineales',
      'algebra-ecuaciones-lineales',
      'algebra-sistemas-ecuaciones',
      'algebra-expresiones-algebraicas',
    ],
    variables: [
      {
        name: 'costo_fijo',
        type: 'integer',
        min: 5000,
        max: 20000,
        step: 1000,
        unit: 'pesos',
        description: 'Costo fijo mensual',
      },
      {
        name: 'costo_minuto',
        type: 'integer',
        min: 10,
        max: 100,
        step: 5,
        unit: 'pesos',
        description: 'Costo por minuto',
      },
      {
        name: 'minutos',
        type: 'integer',
        min: 50,
        max: 500,
        step: 10,
        unit: 'minutos',
        description: 'Cantidad de minutos usados',
      },
      {
        name: 'compania',
        type: 'name',
        options: ['Plan A', 'Plan B', 'Plan C'],
        description: 'Nombre del plan',
      },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  {
    id: 'ctx-garden-fence',
    name: 'Cerca de jardín',
    description: 'Construcción de una cerca alrededor de un jardín rectangular',
    category: 'construction',
    compatibleSkills: [
      'algebra-expresiones-algebraicas',
      'algebra-ecuaciones-lineales',
      'geometria-perimetro',
    ],
    variables: [
      {
        name: 'largo',
        type: 'integer',
        min: 5,
        max: 30,
        step: 1,
        unit: 'm',
        description: 'Largo del jardín',
      },
      {
        name: 'ancho',
        type: 'integer',
        min: 3,
        max: 20,
        step: 1,
        unit: 'm',
        description: 'Ancho del jardín',
      },
      {
        name: 'costo_metro',
        type: 'integer',
        min: 1000,
        max: 5000,
        step: 500,
        unit: 'pesos',
        description: 'Costo por metro de cerca',
      },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // ============================================================================
  // GEOMETRÍA (Geometry)
  // ============================================================================
  {
    id: 'ctx-soccer-field',
    name: 'Cancha de fútbol',
    description: 'Una cancha de fútbol rectangular con áreas específicas',
    category: 'sports',
    compatibleSkills: [
      'geometria-perimetro',
      'geometria-area',
      'geometria-rectangulo',
      'numeros-operaciones-basicas',
    ],
    variables: [
      {
        name: 'largo_cancha',
        type: 'integer',
        min: 90,
        max: 120,
        step: 5,
        unit: 'm',
        description: 'Largo de la cancha',
      },
      {
        name: 'ancho_cancha',
        type: 'integer',
        min: 45,
        max: 90,
        step: 5,
        unit: 'm',
        description: 'Ancho de la cancha',
      },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  {
    id: 'ctx-triangle-roof',
    name: 'Techo triangular',
    description: 'Construcción de un techo triangular para una casa',
    category: 'construction',
    compatibleSkills: [
      'geometria-triangulos',
      'geometria-teorema-pitagoras',
      'geometria-area',
      'numeros-raices',
    ],
    variables: [
      {
        name: 'base',
        type: 'integer',
        min: 6,
        max: 12,
        step: 2,
        unit: 'm',
        description: 'Base del techo',
      },
      {
        name: 'altura',
        type: 'integer',
        min: 3,
        max: 8,
        step: 1,
        unit: 'm',
        description: 'Altura del techo',
      },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // ============================================================================
  // PROBABILIDAD Y ESTADÍSTICA (Probability and Statistics)
  // ============================================================================
  {
    id: 'ctx-dice-game',
    name: 'Juego de dados',
    description: 'Un juego que involucra lanzar dados',
    category: 'abstract',
    compatibleSkills: [
      'probabilidad-eventos-simples',
      'probabilidad-eventos-compuestos',
      'probabilidad-reglas',
      'numeros-fracciones',
    ],
    variables: [
      {
        name: 'num_dados',
        type: 'integer',
        min: 1,
        max: 3,
        description: 'Número de dados',
      },
      {
        name: 'resultado_deseado',
        type: 'integer',
        min: 1,
        max: 6,
        description: 'Resultado deseado en el dado',
      },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  {
    id: 'ctx-class-grades',
    name: 'Notas de la clase',
    description: 'Análisis de las calificaciones de estudiantes en una clase',
    category: 'abstract',
    compatibleSkills: [
      'probabilidad-media',
      'probabilidad-mediana',
      'probabilidad-moda',
      'probabilidad-rango',
      'probabilidad-cuartiles',
    ],
    variables: [
      {
        name: 'num_estudiantes',
        type: 'integer',
        min: 10,
        max: 30,
        description: 'Número de estudiantes',
      },
      {
        name: 'asignatura',
        type: 'name',
        options: ['Matemáticas', 'Ciencias', 'Historia', 'Lenguaje'],
        description: 'Asignatura evaluada',
      },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  {
    id: 'ctx-survey-responses',
    name: 'Encuesta de opinión',
    description: 'Resultados de una encuesta sobre preferencias',
    category: 'abstract',
    compatibleSkills: [
      'probabilidad-graficos',
      'probabilidad-tablas-frecuencia',
      'probabilidad-porcentajes',
      'numeros-porcentajes',
    ],
    variables: [
      {
        name: 'total_encuestados',
        type: 'integer',
        min: 50,
        max: 200,
        step: 10,
        description: 'Total de personas encuestadas',
      },
      {
        name: 'tema',
        type: 'name',
        options: ['deporte favorito', 'comida preferida', 'hobby', 'programa de TV'],
        description: 'Tema de la encuesta',
      },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

/**
 * Get contexts by category
 */
export function getContextsByCategory(category: string): Context[] {
  return contextLibrary.filter((ctx) => ctx.category === category);
}

/**
 * Get contexts compatible with given skills
 */
export function getContextsBySkills(skills: string[]): Context[] {
  return contextLibrary.filter((ctx) =>
    skills.some((skill) => ctx.compatibleSkills.includes(skill))
  );
}

/**
 * Get context by ID
 */
export function getContextById(id: string): Context | undefined {
  return contextLibrary.find((ctx) => ctx.id === id);
}

/**
 * Get contexts that support ALL given skills
 */
export function getContextsSupportingAllSkills(skills: string[]): Context[] {
  return contextLibrary.filter((ctx) =>
    skills.every((skill) => ctx.compatibleSkills.includes(skill))
  );
}
