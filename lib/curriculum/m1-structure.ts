/**
 * M1 Curriculum Structure for Skill Tree
 * Based on /docs/curriculum/m1/ organization
 */

export interface CurriculumTopic {
  slug: string;
  name: string;
  questionCount: number;
  difficulty: 1 | 2 | 3; // 1-3 stars
  filePath: string;
}

export interface CurriculumSubject {
  id: string;
  name: string;
  topics: CurriculumTopic[];
  totalQuestions: number;
  estimatedWeeks: string;
}

export interface CurriculumLevel {
  level: string;
  name: string;
  subjects: CurriculumSubject[];
  totalTopics: number;
  totalQuestions: number;
}

export const M1_STRUCTURE: CurriculumLevel = {
  level: 'M1',
  name: 'Matemática Nivel 1 - PAES',
  totalTopics: 17,
  totalQuestions: 275,
  subjects: [
    {
      id: 'numeros',
      name: 'Números y Operaciones',
      totalQuestions: 72,
      estimatedWeeks: '2-3 semanas',
      topics: [
        {
          slug: 'numeros-enteros-racionales',
          name: 'Números Enteros y Racionales',
          questionCount: 25,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/numeros/enteros-racionales.md'
        },
        {
          slug: 'numeros-porcentaje',
          name: 'Porcentaje',
          questionCount: 15,
          difficulty: 1,
          filePath: '/docs/curriculum/m1/numeros/porcentaje.md'
        },
        {
          slug: 'numeros-potencias-raices',
          name: 'Potencias y Raíces',
          questionCount: 20,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/numeros/potencias-raices.md'
        },
        {
          slug: 'numeros-proporcionalidad',
          name: 'Proporcionalidad',
          questionCount: 12,
          difficulty: 1,
          filePath: '/docs/curriculum/m1/numeros/proporcionalidad.md'
        }
      ]
    },
    {
      id: 'algebra',
      name: 'Álgebra y Funciones',
      totalQuestions: 80,
      estimatedWeeks: '3-4 semanas',
      topics: [
        {
          slug: 'algebra-expresiones-algebraicas',
          name: 'Expresiones Algebraicas',
          questionCount: 25,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/algebra/expresiones-algebraicas.md'
        },
        {
          slug: 'algebra-ecuaciones-inecuaciones',
          name: 'Ecuaciones e Inecuaciones',
          questionCount: 18,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/algebra/ecuaciones-inecuaciones.md'
        },
        {
          slug: 'algebra-sistemas-ecuaciones',
          name: 'Sistemas de Ecuaciones',
          questionCount: 10,
          difficulty: 3,
          filePath: '/docs/curriculum/m1/algebra/sistemas-ecuaciones.md'
        },
        {
          slug: 'algebra-funciones-lineales',
          name: 'Funciones Lineales',
          questionCount: 15,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/algebra/funciones-lineales.md'
        },
        {
          slug: 'algebra-funciones-cuadraticas',
          name: 'Funciones Cuadráticas',
          questionCount: 12,
          difficulty: 3,
          filePath: '/docs/curriculum/m1/algebra/funciones-cuadraticas.md'
        }
      ]
    },
    {
      id: 'geometria',
      name: 'Geometría',
      totalQuestions: 58,
      estimatedWeeks: '2-3 semanas',
      topics: [
        {
          slug: 'geometria-perimetro-area',
          name: 'Perímetro y Área',
          questionCount: 30,
          difficulty: 1,
          filePath: '/docs/curriculum/m1/geometria/perimetro-area.md'
        },
        {
          slug: 'geometria-teorema-pitagoras',
          name: 'Teorema de Pitágoras',
          questionCount: 15,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/geometria/teorema-pitagoras.md'
        },
        {
          slug: 'geometria-volumen',
          name: 'Volumen',
          questionCount: 8,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/geometria/volumen.md'
        },
        {
          slug: 'geometria-transformaciones',
          name: 'Transformaciones Isométricas',
          questionCount: 5,
          difficulty: 3,
          filePath: '/docs/curriculum/m1/geometria/transformaciones.md'
        }
      ]
    },
    {
      id: 'probabilidad',
      name: 'Probabilidad y Estadística',
      totalQuestions: 65,
      estimatedWeeks: '2-3 semanas',
      topics: [
        {
          slug: 'probabilidad-tablas-graficos',
          name: 'Tablas y Gráficos',
          questionCount: 12,
          difficulty: 1,
          filePath: '/docs/curriculum/m1/probabilidad/tablas-graficos.md'
        },
        {
          slug: 'probabilidad-tendencia-central',
          name: 'Medidas de Tendencia Central',
          questionCount: 18,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/probabilidad/tendencia-central.md'
        },
        {
          slug: 'probabilidad-medidas-posicion',
          name: 'Medidas de Posición',
          questionCount: 15,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/probabilidad/medidas-posicion.md'
        },
        {
          slug: 'probabilidad-reglas-probabilidad',
          name: 'Reglas de Probabilidad',
          questionCount: 20,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/probabilidad/reglas-probabilidad.md'
        }
      ]
    }
  ]
};

/**
 * Get all topic slugs for a given level
 */
export function getAllTopicSlugs(level: CurriculumLevel): string[] {
  return level.subjects.flatMap(subject =>
    subject.topics.map(topic => topic.slug)
  );
}

/**
 * Get topic by slug
 */
export function getTopicBySlug(level: CurriculumLevel, slug: string): CurriculumTopic | undefined {
  for (const subject of level.subjects) {
    const topic = subject.topics.find(t => t.slug === slug);
    if (topic) return topic;
  }
  return undefined;
}

/**
 * Get subject by topic slug
 */
export function getSubjectByTopicSlug(level: CurriculumLevel, slug: string): CurriculumSubject | undefined {
  for (const subject of level.subjects) {
    if (subject.topics.some(t => t.slug === slug)) {
      return subject;
    }
  }
  return undefined;
}
