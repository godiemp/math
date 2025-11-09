/**
 * Template Library
 *
 * Question templates with placeholders that can be filled with values.
 * Each template is linked to goals, skills, and compatible contexts.
 */

import { Template } from '../types/core';

/**
 * Template library - collection of question templates
 */
export const templateLibrary: Template[] = [
  // ============================================================================
  // NÚMEROS - PORCENTAJES (Percentages)
  // ============================================================================
  {
    id: 'tmpl-percentage-basic',
    name: 'Calcular porcentaje de una cantidad',
    templateText: '¿Cuánto es el {{descuento}}% de ${{precio_original}}?',
    templateLatex: '¿Cuánto es el {{descuento}}\\% de \\${{precio_original}}?',
    goalId: 'goal-compute-percentage',
    requiredSkills: ['numeros-porcentajes', 'numeros-operaciones-basicas'],
    compatibleContexts: ['ctx-shopping-discount'],
    variables: [
      {
        name: 'descuento',
        type: 'integer',
        min: 5,
        max: 50,
        step: 5,
        unit: '%',
      },
      {
        name: 'precio_original',
        type: 'decimal',
        min: 100,
        max: 1000,
        step: 50,
        unit: 'pesos',
      },
    ],
    difficultyLevel: 'easy',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  {
    id: 'tmpl-percentage-final-price',
    name: 'Calcular precio final después de descuento',
    templateText:
      'Si {{producto}} cuesta ${{precio_original}} y tiene un descuento del {{descuento}}%, ¿cuál es el precio final?',
    templateLatex:
      'Si {{producto}} cuesta \\${{precio_original}} y tiene un descuento del {{descuento}}\\%, ¿cuál es el precio final?',
    goalId: 'goal-compute-basic',
    requiredSkills: ['numeros-porcentajes', 'numeros-operaciones-basicas', 'numeros-decimales'],
    compatibleContexts: ['ctx-shopping-discount'],
    variables: [
      {
        name: 'producto',
        type: 'name',
        options: ['un libro', 'una mochila', 'unos zapatos'],
      },
      {
        name: 'precio_original',
        type: 'decimal',
        min: 100,
        max: 1000,
        step: 50,
      },
      {
        name: 'descuento',
        type: 'integer',
        min: 10,
        max: 50,
        step: 5,
      },
    ],
    difficultyLevel: 'medium',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  {
    id: 'tmpl-percentage-reverse',
    name: 'Encontrar precio original desde precio con descuento',
    templateText:
      'Después de aplicar un descuento del {{descuento}}%, {{producto}} cuesta ${{precio_final}}. ¿Cuál era el precio original?',
    templateLatex:
      'Después de aplicar un descuento del {{descuento}}\\%, {{producto}} cuesta \\${{precio_final}}. ¿Cuál era el precio original?',
    goalId: 'goal-compute-reverse-percentage',
    requiredSkills: ['numeros-porcentajes', 'numeros-operaciones-basicas', 'numeros-decimales'],
    compatibleContexts: ['ctx-shopping-discount'],
    variables: [
      {
        name: 'descuento',
        type: 'integer',
        min: 10,
        max: 50,
        step: 5,
      },
      {
        name: 'producto',
        type: 'name',
        options: ['un libro', 'una mochila', 'unos zapatos'],
      },
      {
        name: 'precio_final',
        type: 'decimal',
        min: 50,
        max: 500,
        step: 10,
      },
    ],
    constraints: [
      {
        variable: 'precio_final',
        condition: 'divisible-by',
        value: 10,
      },
    ],
    difficultyLevel: 'hard',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // ============================================================================
  // NÚMEROS - PROPORCIONALIDAD (Proportions)
  // ============================================================================
  {
    id: 'tmpl-proportion-recipe-basic',
    name: 'Calcular cantidad proporcional en receta',
    templateText:
      'Una receta para {{porciones_original}} porciones requiere {{cantidad_original}} {{unidad}} de {{ingrediente}}. ¿Cuánto {{ingrediente}} se necesita para {{porciones_deseadas}} porciones?',
    goalId: 'goal-compute-proportion',
    requiredSkills: ['numeros-proporcionalidad', 'numeros-fracciones'],
    compatibleContexts: ['ctx-cooking-recipe'],
    variables: [
      {
        name: 'porciones_original',
        type: 'integer',
        min: 4,
        max: 8,
      },
      {
        name: 'cantidad_original',
        type: 'decimal',
        min: 1,
        max: 5,
        step: 0.5,
      },
      {
        name: 'unidad',
        type: 'unit',
        options: ['tazas', 'gramos', 'ml'],
      },
      {
        name: 'ingrediente',
        type: 'name',
        options: ['harina', 'azúcar', 'leche'],
      },
      {
        name: 'porciones_deseadas',
        type: 'integer',
        min: 6,
        max: 16,
      },
    ],
    difficultyLevel: 'medium',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // ============================================================================
  // ÁLGEBRA - FUNCIONES LINEALES (Linear Functions)
  // ============================================================================
  {
    id: 'tmpl-linear-function-cost',
    name: 'Calcular costo total en función lineal',
    templateText:
      '{{compania}} cobra ${{costo_fijo}} fijos más ${{costo_minuto}} por minuto. ¿Cuál es el costo total si usas {{minutos}} minutos?',
    goalId: 'goal-compute-basic',
    requiredSkills: ['algebra-funciones-lineales', 'algebra-expresiones-algebraicas'],
    compatibleContexts: ['ctx-phone-plan'],
    variables: [
      {
        name: 'compania',
        type: 'name',
        options: ['Plan A', 'Plan B'],
      },
      {
        name: 'costo_fijo',
        type: 'integer',
        min: 5000,
        max: 15000,
        step: 1000,
      },
      {
        name: 'costo_minuto',
        type: 'integer',
        min: 20,
        max: 80,
        step: 10,
      },
      {
        name: 'minutos',
        type: 'integer',
        min: 100,
        max: 300,
        step: 50,
      },
    ],
    difficultyLevel: 'easy',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  {
    id: 'tmpl-linear-function-model',
    name: 'Modelar costo con función lineal',
    templateText:
      '{{compania}} cobra ${{costo_fijo}} fijos más ${{costo_minuto}} por minuto. ¿Cuál es la función que modela el costo total C en función de los minutos m?',
    templateLatex:
      '{{compania}} cobra \\${{costo_fijo}} fijos más \\${{costo_minuto}} por minuto. ¿Cuál es la función que modela el costo total $C$ en función de los minutos $m$?',
    goalId: 'goal-model-function',
    requiredSkills: ['algebra-funciones-lineales', 'algebra-expresiones-algebraicas'],
    compatibleContexts: ['ctx-phone-plan'],
    variables: [
      {
        name: 'compania',
        type: 'name',
        options: ['Plan A', 'Plan B'],
      },
      {
        name: 'costo_fijo',
        type: 'integer',
        min: 5000,
        max: 15000,
        step: 1000,
      },
      {
        name: 'costo_minuto',
        type: 'integer',
        min: 20,
        max: 80,
        step: 10,
      },
    ],
    difficultyLevel: 'medium',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  {
    id: 'tmpl-linear-compare-plans',
    name: 'Comparar dos planes de teléfono',
    templateText:
      'Plan A cobra ${{costo_fijo_a}} fijos más ${{costo_minuto_a}} por minuto. Plan B cobra ${{costo_fijo_b}} fijos más ${{costo_minuto_b}} por minuto. ¿A partir de cuántos minutos es más conveniente Plan B?',
    goalId: 'goal-compare-options',
    requiredSkills: [
      'algebra-funciones-lineales',
      'algebra-sistemas-ecuaciones',
      'algebra-inecuaciones',
    ],
    compatibleContexts: ['ctx-phone-plan'],
    variables: [
      {
        name: 'costo_fijo_a',
        type: 'integer',
        min: 8000,
        max: 12000,
        step: 1000,
      },
      {
        name: 'costo_minuto_a',
        type: 'integer',
        min: 30,
        max: 50,
        step: 5,
      },
      {
        name: 'costo_fijo_b',
        type: 'integer',
        min: 10000,
        max: 15000,
        step: 1000,
      },
      {
        name: 'costo_minuto_b',
        type: 'integer',
        min: 15,
        max: 30,
        step: 5,
      },
    ],
    difficultyLevel: 'hard',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // ============================================================================
  // GEOMETRÍA - PERÍMETRO Y ÁREA (Perimeter and Area)
  // ============================================================================
  {
    id: 'tmpl-perimeter-rectangle',
    name: 'Calcular perímetro de rectángulo',
    templateText:
      'Un jardín rectangular tiene {{largo}} metros de largo y {{ancho}} metros de ancho. ¿Cuál es el perímetro del jardín?',
    goalId: 'goal-compute-perimeter',
    requiredSkills: ['geometria-perimetro', 'geometria-rectangulo', 'numeros-operaciones-basicas'],
    compatibleContexts: ['ctx-garden-fence', 'ctx-soccer-field'],
    variables: [
      {
        name: 'largo',
        type: 'integer',
        min: 10,
        max: 30,
      },
      {
        name: 'ancho',
        type: 'integer',
        min: 5,
        max: 20,
      },
    ],
    difficultyLevel: 'easy',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  {
    id: 'tmpl-area-rectangle',
    name: 'Calcular área de rectángulo',
    templateText:
      'Una cancha de fútbol mide {{largo_cancha}} metros de largo y {{ancho_cancha}} metros de ancho. ¿Cuál es el área de la cancha?',
    goalId: 'goal-compute-area',
    requiredSkills: ['geometria-area', 'geometria-rectangulo', 'numeros-operaciones-basicas'],
    compatibleContexts: ['ctx-soccer-field', 'ctx-garden-fence'],
    variables: [
      {
        name: 'largo_cancha',
        type: 'integer',
        min: 90,
        max: 110,
        step: 5,
      },
      {
        name: 'ancho_cancha',
        type: 'integer',
        min: 45,
        max: 75,
        step: 5,
      },
    ],
    difficultyLevel: 'easy',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  {
    id: 'tmpl-pythagorean-roof',
    name: 'Calcular longitud de lado con Pitágoras',
    templateText:
      'Un techo triangular tiene una base de {{base}} metros y una altura de {{altura}} metros. ¿Cuál es la longitud del lado inclinado del techo?',
    templateLatex:
      'Un techo triangular tiene una base de {{base}} metros y una altura de {{altura}} metros. ¿Cuál es la longitud del lado inclinado del techo? (Usa el teorema de Pitágoras: $c^2 = a^2 + b^2$)',
    goalId: 'goal-compute-pythagorean',
    requiredSkills: [
      'geometria-teorema-pitagoras',
      'geometria-triangulos',
      'numeros-raices',
      'numeros-potencias',
    ],
    compatibleContexts: ['ctx-triangle-roof'],
    variables: [
      {
        name: 'base',
        type: 'integer',
        min: 6,
        max: 10,
        step: 2,
      },
      {
        name: 'altura',
        type: 'integer',
        min: 3,
        max: 6,
      },
    ],
    difficultyLevel: 'medium',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // ============================================================================
  // PROBABILIDAD - MEDIDAS DE TENDENCIA CENTRAL
  // ============================================================================
  {
    id: 'tmpl-mean-grades',
    name: 'Calcular promedio de notas',
    templateText:
      'Las notas de {{asignatura}} de un grupo de estudiantes son: {{notas_lista}}. ¿Cuál es el promedio (media)?',
    goalId: 'goal-compute-basic',
    requiredSkills: ['probabilidad-media', 'numeros-operaciones-basicas', 'numeros-decimales'],
    compatibleContexts: ['ctx-class-grades'],
    variables: [
      {
        name: 'asignatura',
        type: 'name',
        options: ['Matemáticas', 'Ciencias', 'Historia'],
      },
      {
        name: 'notas_lista',
        type: 'name',
        description: 'Lista de notas separadas por comas',
      },
    ],
    difficultyLevel: 'easy',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

/**
 * Get templates by goal ID
 */
export function getTemplatesByGoal(goalId: string): Template[] {
  return templateLibrary.filter((tmpl) => tmpl.goalId === goalId);
}

/**
 * Get templates by difficulty
 */
export function getTemplatesByDifficulty(difficulty: string): Template[] {
  return templateLibrary.filter((tmpl) => tmpl.difficultyLevel === difficulty);
}

/**
 * Get templates compatible with context
 */
export function getTemplatesByContext(contextId: string): Template[] {
  return templateLibrary.filter((tmpl) => tmpl.compatibleContexts.includes(contextId));
}

/**
 * Get templates that require specific skills
 */
export function getTemplatesBySkills(skills: string[]): Template[] {
  return templateLibrary.filter((tmpl) =>
    skills.some((skill) => tmpl.requiredSkills.includes(skill))
  );
}

/**
 * Get templates that require ALL specified skills
 */
export function getTemplatesByAllSkills(skills: string[]): Template[] {
  return templateLibrary.filter((tmpl) =>
    skills.every((skill) => tmpl.requiredSkills.includes(skill))
  );
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): Template | undefined {
  return templateLibrary.find((tmpl) => tmpl.id === id);
}

/**
 * Get templates compatible with both context and skills
 */
export function getCompatibleTemplates(contextId: string, skills: string[]): Template[] {
  return templateLibrary.filter(
    (tmpl) =>
      tmpl.compatibleContexts.includes(contextId) &&
      tmpl.requiredSkills.some((skill) => skills.includes(skill))
  );
}
