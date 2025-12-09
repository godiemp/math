/**
 * M1 Curriculum Structure with Detailed Subsections
 * Based on actual curriculum markdown files in /docs/curriculum/m1/
 */

export interface CurriculumSubsection {
  slug: string;
  name: string;
}

export interface CurriculumTopicDetailed {
  slug: string;
  name: string;
  questionCount: number;
  difficulty: 1 | 2 | 3;
  filePath: string;
  subsections: CurriculumSubsection[];
}

export interface CurriculumSubjectDetailed {
  id: string;
  name: string;
  topics: CurriculumTopicDetailed[];
  totalQuestions: number;
  estimatedWeeks: string;
}

export interface CurriculumLevelDetailed {
  level: string;
  name: string;
  subjects: CurriculumSubjectDetailed[];
  totalTopics: number;
  totalQuestions: number;
}

export const M1_STRUCTURE_DETAILED: CurriculumLevelDetailed = {
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
          filePath: '/docs/curriculum/m1/numeros/enteros-racionales.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'operaciones-enteros', name: 'Operaciones con Enteros' },
            { slug: 'numeros-racionales', name: 'Números Racionales' },
            { slug: 'operaciones-racionales', name: 'Operaciones con Racionales' },
            { slug: 'comparacion', name: 'Comparación de Números' }
          ]
        },
        {
          slug: 'numeros-porcentaje',
          name: 'Porcentaje',
          questionCount: 15,
          difficulty: 1,
          filePath: '/docs/curriculum/m1/numeros/porcentaje.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'conversiones-basicas', name: 'Conversiones Básicas' },
            { slug: 'calcular-porcentaje', name: 'Operaciones con Porcentajes' },
            { slug: 'aumentos-descuentos', name: 'Aumentos y Descuentos Sucesivos' },
            { slug: 'porcentajes-importantes', name: 'Porcentajes Importantes' }
          ]
        },
        {
          slug: 'numeros-potencias-raices',
          name: 'Potencias y Raíces',
          questionCount: 20,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/numeros/potencias-raices.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'propiedades-potencias', name: 'Propiedades de Potencias' },
            { slug: 'notacion-cientifica', name: 'Notación Científica' },
            { slug: 'raices', name: 'Raíces' },
            { slug: 'racionalizacion', name: 'Racionalización' }
          ]
        },
        {
          slug: 'numeros-proporcionalidad',
          name: 'Proporcionalidad',
          questionCount: 12,
          difficulty: 1,
          filePath: '/docs/curriculum/m1/numeros/proporcionalidad.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'proporcion-directa', name: 'Proporción Directa' },
            { slug: 'proporcion-inversa', name: 'Proporción Inversa' },
            { slug: 'regla-tres', name: 'Regla de Tres' }
          ]
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
          filePath: '/docs/curriculum/m1/algebra/expresiones-algebraicas.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'terminos-semejantes', name: 'Términos Semejantes' },
            { slug: 'productos-notables', name: 'Productos Notables' },
            { slug: 'factorizacion', name: 'Factorización' }
          ]
        },
        {
          slug: 'algebra-ecuaciones-inecuaciones',
          name: 'Ecuaciones e Inecuaciones',
          questionCount: 18,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/algebra/ecuaciones-inecuaciones.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'ecuaciones-lineales', name: 'Ecuaciones Lineales' },
            { slug: 'ecuaciones-cuadraticas', name: 'Ecuaciones Cuadráticas' },
            { slug: 'inecuaciones', name: 'Inecuaciones' },
            { slug: 'sistemas', name: 'Sistemas de Ecuaciones' }
          ]
        },
        {
          slug: 'algebra-sistemas-ecuaciones',
          name: 'Sistemas de Ecuaciones',
          questionCount: 10,
          difficulty: 3,
          filePath: '/docs/curriculum/m1/algebra/sistemas-ecuaciones.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'metodo-sustitucion', name: 'Método de Sustitución' },
            { slug: 'metodo-igualacion', name: 'Método de Igualación' },
            { slug: 'metodo-reduccion', name: 'Método de Reducción' },
            { slug: 'metodo-grafico', name: 'Método Gráfico' }
          ]
        },
        {
          slug: 'algebra-funciones-lineales',
          name: 'Funciones Lineales',
          questionCount: 15,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/algebra/funciones-lineales.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'pendiente', name: 'Pendiente' },
            { slug: 'intercepto-y', name: 'Intercepto con el Eje Y' },
            { slug: 'formas-ecuacion', name: 'Formas de la Ecuación' },
            { slug: 'rectas-paralelas', name: 'Rectas Paralelas y Perpendiculares' },
            { slug: 'grafica', name: 'Gráfica de la Función Lineal' }
          ]
        },
        {
          slug: 'algebra-funciones-cuadraticas',
          name: 'Funciones Cuadráticas',
          questionCount: 12,
          difficulty: 3,
          filePath: '/docs/curriculum/m1/algebra/funciones-cuadraticas.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'forma-general', name: 'Forma General' },
            { slug: 'vertice', name: 'Vértice de la Parábola' },
            { slug: 'raices', name: 'Raíces y Discriminante' },
            { slug: 'grafica', name: 'Gráfica de la Parábola' }
          ]
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
          filePath: '/docs/curriculum/m1/geometria/perimetro-area.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'triangulos', name: 'Triángulos' },
            { slug: 'cuadrilateros', name: 'Cuadriláteros' },
            { slug: 'circulos', name: 'Círculos' },
            { slug: 'figuras-compuestas', name: 'Figuras Compuestas' }
          ]
        },
        {
          slug: 'geometria-teorema-pitagoras',
          name: 'Teorema de Pitágoras',
          questionCount: 15,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/geometria/teorema-pitagoras.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'aplicaciones', name: 'Aplicaciones' },
            { slug: 'triangulos-notables', name: 'Triángulos Notables' },
            { slug: 'problemas-espaciales', name: 'Problemas en 3D' }
          ]
        },
        {
          slug: 'geometria-volumen',
          name: 'Volumen',
          questionCount: 8,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/geometria/volumen.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'prismas', name: 'Prismas y Cilindros' },
            { slug: 'piramides', name: 'Pirámides y Conos' },
            { slug: 'esferas', name: 'Esferas' }
          ]
        },
        {
          slug: 'geometria-transformaciones',
          name: 'Transformaciones Isométricas',
          questionCount: 5,
          difficulty: 3,
          filePath: '/docs/curriculum/m1/geometria/transformaciones.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'traslacion', name: 'Traslación' },
            { slug: 'reflexion', name: 'Reflexión' },
            { slug: 'rotacion', name: 'Rotación' }
          ]
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
          filePath: '/docs/curriculum/m1/probabilidad/tablas-graficos.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'tablas-frecuencia', name: 'Tablas de Frecuencia' },
            { slug: 'graficos-barras', name: 'Gráficos de Barras' },
            { slug: 'graficos-linea', name: 'Gráficos de Línea' },
            { slug: 'graficos-circular', name: 'Gráficos Circulares' }
          ]
        },
        {
          slug: 'probabilidad-tendencia-central',
          name: 'Medidas de Tendencia Central',
          questionCount: 18,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/probabilidad/tendencia-central.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'media', name: 'Media Aritmética' },
            { slug: 'mediana', name: 'Mediana' },
            { slug: 'moda', name: 'Moda' },
            { slug: 'comparacion', name: 'Comparación de Medidas' }
          ]
        },
        {
          slug: 'probabilidad-medidas-posicion',
          name: 'Medidas de Posición',
          questionCount: 15,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/probabilidad/medidas-posicion.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'cuartiles', name: 'Cuartiles' },
            { slug: 'percentiles', name: 'Percentiles' },
            { slug: 'rango', name: 'Rango y Rango Intercuartílico' }
          ]
        },
        {
          slug: 'probabilidad-reglas-probabilidad',
          name: 'Reglas de Probabilidad',
          questionCount: 20,
          difficulty: 2,
          filePath: '/docs/curriculum/m1/probabilidad/reglas-probabilidad.md',
          subsections: [
            { slug: 'conceptos-clave', name: 'Conceptos Clave' },
            { slug: 'eventos-simples', name: 'Eventos Simples' },
            { slug: 'regla-suma', name: 'Regla de la Suma' },
            { slug: 'regla-producto', name: 'Regla del Producto' },
            { slug: 'probabilidad-condicional', name: 'Probabilidad Condicional' }
          ]
        }
      ]
    }
  ]
};
