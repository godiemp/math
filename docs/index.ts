/**
 * Documentation structure export
 * Centralized configuration for curriculum documentation navigation
 */

export interface DocItem {
  title: string;
  slug: string;
}

export interface DocSection {
  title: string;
  path: string;
  items: DocItem[];
}

export interface DocsStructure {
  title: string;
  sections: DocSection[];
}

/**
 * M1 (Basic Level) Documentation Structure
 */
export const m1DocsStructure: DocsStructure = {
  title: 'M1 - Nivel Básico',
  sections: [
    {
      title: 'Números y Operaciones',
      path: 'numeros',
      items: [
        { title: 'Enteros y Racionales', slug: 'numeros/enteros-racionales' },
        { title: 'Porcentajes', slug: 'numeros/porcentaje' },
        { title: 'Potencias y Raíces', slug: 'numeros/potencias-raices' },
        { title: 'Proporcionalidad', slug: 'numeros/proporcionalidad' },
      ],
    },
    {
      title: 'Álgebra y Funciones',
      path: 'algebra',
      items: [
        { title: 'Expresiones Algebraicas', slug: 'algebra/expresiones-algebraicas' },
        { title: 'Ecuaciones e Inecuaciones', slug: 'algebra/ecuaciones-inecuaciones' },
        { title: 'Sistemas de Ecuaciones', slug: 'algebra/sistemas-ecuaciones' },
        { title: 'Función Lineal', slug: 'algebra/funciones-lineales' },
        { title: 'Función Cuadrática', slug: 'algebra/funciones-cuadraticas' },
      ],
    },
    {
      title: 'Geometría',
      path: 'geometria',
      items: [
        { title: 'Perímetro y Área', slug: 'geometria/perimetro-area' },
        { title: 'Teorema de Pitágoras', slug: 'geometria/teorema-pitagoras' },
        { title: 'Volumen', slug: 'geometria/volumen' },
        { title: 'Transformaciones Isométricas', slug: 'geometria/transformaciones' },
      ],
    },
    {
      title: 'Probabilidad y Estadística',
      path: 'probabilidad',
      items: [
        { title: 'Tablas y Gráficos', slug: 'probabilidad/tablas-graficos' },
        { title: 'Medidas de Tendencia Central', slug: 'probabilidad/tendencia-central' },
        { title: 'Medidas de Posición', slug: 'probabilidad/medidas-posicion' },
        { title: 'Reglas de Probabilidad', slug: 'probabilidad/reglas-probabilidad' },
      ],
    },
  ],
};

/**
 * M2 (Advanced Level) Documentation Structure
 * TODO: Add M2 documentation structure when M2 docs are available
 */
export const m2DocsStructure: DocsStructure = {
  title: 'M2 - Nivel Avanzado',
  sections: [
    // To be populated when M2 documentation is created
  ],
};

/**
 * Helper function to get all doc slugs from a structure
 * Useful for static generation and routing
 */
export function getAllDocSlugs(structure: DocsStructure): string[][] {
  const slugs: string[][] = [[]]; // Include empty slug for main index

  structure.sections.forEach((section) => {
    section.items.forEach((item) => {
      slugs.push(item.slug.split('/'));
    });
  });

  return slugs;
}

/**
 * Helper function to find a doc item by slug
 */
export function findDocBySlug(
  structure: DocsStructure,
  slug: string
): { section: DocSection; item: DocItem } | null {
  for (const section of structure.sections) {
    const item = section.items.find((i) => i.slug === slug);
    if (item) {
      return { section, item };
    }
  }
  return null;
}

/**
 * Helper function to get total number of docs in a structure
 */
export function getDocCount(structure: DocsStructure): number {
  return structure.sections.reduce((total, section) => total + section.items.length, 0);
}
