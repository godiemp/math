/**
 * ============================================================================
 * GEOMETRÍA - SKILL DEFINITIONS
 * ============================================================================
 * Skills related to perimeter, area, volume, triangles, circles,
 * angles, Pythagorean theorem, and coordinate geometry.
 */

import type { Skill } from './types';

export const GEOMETRIA_SKILLS: Record<string, Skill> = {
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
  // M2 Advanced Skills
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
};
