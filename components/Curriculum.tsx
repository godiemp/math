'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CurriculumSidebar } from './ui/CurriculumSidebar';
import { skillsArray, type EnhancedSkill } from '@/lib/skillsArray';
import { getSkillById } from '@/lib/skills';

interface CurriculumProps {
  level: 'M1' | 'M2';
}

// Map curriculum subject names to practice page subject keys
function mapSubjectToKey(subjectName: string): string {
  const mapping: { [key: string]: string } = {
    'Números': 'números',
    'Álgebra y Funciones': 'álgebra',
    'Geometría': 'geometría',
    'Probabilidad y Estadística': 'probabilidad'
  };
  return mapping[subjectName] || '';
}

// Skill-Topic Matrix: Which skills are evaluated in each axis
const skillTopicMatrix = {
  'Números': {
    skills: ['Resolver', 'Modelar', 'Argumentar'],
    description: 'Problemas con porcentajes, potencias, modelos financieros'
  },
  'Álgebra y Funciones': {
    skills: ['Resolver', 'Modelar', 'Representar', 'Argumentar'],
    description: 'Ecuaciones, funciones, tablas y gráficos'
  },
  'Geometría': {
    skills: ['Resolver', 'Modelar', 'Representar'],
    description: 'Figuras, plano cartesiano, vectores'
  },
  'Probabilidad y Estadística': {
    skills: ['Resolver', 'Modelar', 'Representar', 'Argumentar'],
    description: 'Datos, gráficos, inferencias'
  }
};

// Map curriculum topics to specific skills from the skill taxonomy
const topicSkillMapping: Record<string, string[]> = {
  // NÚMEROS
  'Enteros y racionales: operaciones, orden, comparación y problemas': [
    'numeros-operaciones-basicas',
    'numeros-enteros',
    'numeros-fracciones',
    'numeros-orden-operaciones'
  ],
  'Porcentaje: concepto, cálculo y problemas en contexto': [
    'numeros-porcentajes',
    'numeros-porcentajes-descuentos',
    'numeros-decimales'
  ],
  'Potencias y raíces enésimas: propiedades, descomposición y problemas': [
    'numeros-potencias',
    'numeros-potencias-propiedades',
    'numeros-raices'
  ],
  'Números reales: operaciones y problemas': [
    'numeros-enteros',
    'numeros-decimales',
    'numeros-raices'
  ],
  'Matemática financiera: AFP, jubilación, créditos': [
    'numeros-porcentajes',
    'numeros-proporcionalidad'
  ],
  'Logaritmos: relación con potencias y raíces, propiedades y aplicaciones': [
    'numeros-potencias',
    'numeros-raices'
  ],

  // ÁLGEBRA Y FUNCIONES
  'Expresiones algebraicas: productos notables, factorizaciones, operatoria y aplicaciones': [
    'algebra-expresiones',
    'algebra-terminos-semejantes',
    'algebra-factorizacion',
    'algebra-diferencia-cuadrados',
    'algebra-expansion',
    'algebra-propiedad-distributiva'
  ],
  'Proporcionalidad directa e inversa': [
    'numeros-proporcionalidad',
    'numeros-proporcionalidad-directa',
    'numeros-proporcionalidad-inversa'
  ],
  'Ecuaciones e inecuaciones lineales': [
    'algebra-ecuaciones-lineales',
    'algebra-despeje',
    'algebra-desigualdades'
  ],
  'Sistemas de ecuaciones lineales (2×2)': [
    'algebra-sistemas-ecuaciones',
    'algebra-metodo-sustitucion',
    'algebra-metodo-eliminacion'
  ],
  'Función lineal y afín: concepto, tablas, gráficos y problemas': [
    'algebra-funciones',
    'algebra-funciones-lineales',
    'algebra-pendiente',
    'algebra-evaluacion-funciones'
  ],
  'Función cuadrática: resolución, gráfica, vértice, ceros, intersecciones y problemas': [
    'algebra-ecuaciones-cuadraticas',
    'algebra-factorizacion-cuadratica',
    'algebra-discriminante',
    'algebra-formula-cuadratica'
  ],
  'Sistemas de ecuaciones lineales: análisis de soluciones (única, infinitas, ninguna)': [
    'algebra-sistemas-ecuaciones',
    'algebra-metodo-sustitucion',
    'algebra-metodo-eliminacion'
  ],
  'Función potencia: gráficos y problemas': [
    'algebra-funciones',
    'numeros-potencias'
  ],

  // GEOMETRÍA
  'Teorema de Pitágoras': [
    'geometria-pitagoras',
    'geometria-triangulos',
    'numeros-raices'
  ],
  'Perímetro y área de triángulos, paralelogramos, trapecios y círculos': [
    'geometria-perimetro',
    'geometria-area',
    'geometria-triangulos',
    'geometria-area-triangulo',
    'geometria-rectangulos',
    'geometria-trapecio',
    'geometria-circulos',
    'geometria-area-circulo'
  ],
  'Área y volumen de prismas rectos y cilindros': [
    'geometria-area',
    'geometria-volumen',
    'geometria-volumen-cubo',
    'geometria-volumen-cilindro'
  ],
  'Transformaciones isométricas: rotación, traslación y reflexión': [
    'geometria-plano-cartesiano'
  ],
  'Homotecia de figuras planas': [
    'geometria-plano-cartesiano'
  ],
  'Razones trigonométricas (seno, coseno, tangente) y aplicaciones': [
    'geometria-triangulos',
    'geometria-pitagoras'
  ],

  // PROBABILIDAD Y ESTADÍSTICA
  'Tablas y gráficos (frecuencia absoluta y relativa)': [
    'estadistica-porcentajes'
  ],
  'Medidas de tendencia central y rango': [
    'estadistica-media',
    'estadistica-mediana',
    'estadistica-moda',
    'estadistica-rango'
  ],
  'Medidas de posición (cuartiles, percentiles, diagrama de caja)': [
    'estadistica-cuartiles',
    'estadistica-rango-intercuartilico'
  ],
  'Reglas de probabilidad (aditiva y multiplicativa)': [
    'probabilidad-basica',
    'probabilidad-casos-favorables',
    'probabilidad-eventos-compuestos'
  ],
  'Medidas de dispersión': [
    'estadistica-cuartiles',
    'estadistica-rango-intercuartilico'
  ],
  'Probabilidad condicional': [
    'probabilidad-basica',
    'probabilidad-eventos-compuestos'
  ],
  'Permutaciones y combinatoria': [
    'probabilidad-combinatoria',
    'probabilidad-combinaciones',
    'probabilidad-factorial'
  ],
  'Modelos probabilísticos (binomial)': [
    'probabilidad-basica',
    'probabilidad-combinatoria'
  ]
};

// Official PAES curriculum structure with question distribution and difficulty
const paesM1Content = [
  {
    name: 'Números',
    icon: '🔢',
    color: 'bg-blue-100 dark:bg-blue-900',
    borderColor: 'border-blue-300 dark:border-blue-700',
    textColor: 'text-blue-900 dark:text-blue-100',
    questionCount: 24,
    percentage: 37,
    topics: [
      {
        text: 'Enteros y racionales: operaciones, orden, comparación y problemas',
        difficulty: 1,
        cognitiveLevel: 'Básico',
        skills: ['Resolver'],
        example: 'Ej: Si -3 < x < 2, ¿cuántos enteros cumple x?',
        keyPoints: 'Orden en la recta numérica, operaciones con signos'
      },
      {
        text: 'Porcentaje: concepto, cálculo y problemas en contexto',
        difficulty: 1,
        cognitiveLevel: 'Básico/Medio',
        skills: ['Resolver', 'Modelar'],
        realWorldContext: '💰 Economía personal',
        example: 'Ej: Un producto de $20.000 tiene 15% descuento, ¿cuál es el precio final?',
        keyPoints: 'Porcentaje de aumento/descuento, cálculo del valor original'
      },
      {
        text: 'Potencias y raíces enésimas: propiedades, descomposición y problemas',
        difficulty: 2,
        cognitiveLevel: 'Medio',
        skills: ['Resolver', 'Argumentar'],
        example: 'Ej: Simplificar (2³ · 2²) / 2⁴',
        keyPoints: 'Propiedades: aⁿ · aᵐ = aⁿ⁺ᵐ, (aⁿ)ᵐ = aⁿᵐ'
      }
    ]
  },
  {
    name: 'Álgebra y Funciones',
    icon: '📐',
    color: 'bg-purple-100 dark:bg-purple-900',
    borderColor: 'border-purple-300 dark:border-purple-700',
    textColor: 'text-purple-900 dark:text-purple-100',
    questionCount: 18,
    percentage: 28,
    topics: [
      {
        text: 'Expresiones algebraicas: productos notables, factorizaciones, operatoria y aplicaciones',
        difficulty: 2,
        cognitiveLevel: 'Medio',
        skills: ['Resolver', 'Argumentar'],
        example: 'Ej: Factorizar x² - 9 = (x+3)(x-3)',
        keyPoints: '(a+b)² = a² + 2ab + b², diferencia de cuadrados'
      },
      {
        text: 'Proporcionalidad directa e inversa',
        difficulty: 1,
        cognitiveLevel: 'Básico',
        skills: ['Resolver', 'Modelar'],
        realWorldContext: '🏗️ Trabajo y producción',
        example: 'Ej: Si 3 obreros tardan 6 días, ¿cuánto tardan 9 obreros?',
        keyPoints: 'Directa: y = kx, Inversa: y = k/x'
      },
      {
        text: 'Ecuaciones e inecuaciones lineales',
        difficulty: 2,
        cognitiveLevel: 'Medio',
        skills: ['Resolver'],
        example: 'Ej: Resolver 2x + 5 < 11',
        keyPoints: 'Despejar variable, invertir signo al multiplicar por negativo'
      },
      {
        text: 'Sistemas de ecuaciones lineales (2×2)',
        difficulty: 2,
        cognitiveLevel: 'Medio',
        skills: ['Resolver', 'Modelar'],
        example: 'Ej: x + y = 5, x - y = 1',
        keyPoints: 'Métodos: sustitución, igualación, reducción'
      },
      {
        text: 'Función lineal y afín: concepto, tablas, gráficos y problemas',
        difficulty: 2,
        cognitiveLevel: 'Medio',
        skills: ['Resolver', 'Representar', 'Modelar'],
        realWorldContext: '📈 Tendencias y proyecciones',
        example: 'Ej: Si f(x) = 2x + 3, encontrar f(5)',
        keyPoints: 'f(x) = mx + n, pendiente m, intercepto n'
      },
      {
        text: 'Función cuadrática: resolución, gráfica, vértice, ceros, intersecciones y problemas',
        difficulty: 3,
        cognitiveLevel: 'Medio',
        skills: ['Resolver', 'Representar', 'Argumentar'],
        realWorldContext: '🚀 Trayectorias y movimiento',
        example: 'Ej: Hallar vértice de y = x² - 4x + 3',
        keyPoints: 'Vértice: x = -b/2a, factorizar o fórmula general'
      }
    ]
  },
  {
    name: 'Geometría',
    icon: '📏',
    color: 'bg-green-100 dark:bg-green-900',
    borderColor: 'border-green-300 dark:border-green-700',
    textColor: 'text-green-900 dark:text-green-100',
    questionCount: 8,
    percentage: 12,
    topics: [
      {
        text: 'Teorema de Pitágoras',
        difficulty: 1,
        cognitiveLevel: 'Básico',
        skills: ['Resolver'],
        realWorldContext: '🏗️ Construcción y distancias',
        example: 'Ej: Triángulo con lados 3 y 4, ¿hipotenusa?',
        keyPoints: 'a² + b² = c², identificar hipotenusa'
      },
      {
        text: 'Perímetro y área de triángulos, paralelogramos, trapecios y círculos',
        difficulty: 2,
        cognitiveLevel: 'Básico/Medio',
        skills: ['Resolver', 'Modelar'],
        realWorldContext: '🏡 Superficies y terrenos',
        example: 'Ej: Área de trapecio = (B+b)h/2',
        keyPoints: 'Fórmulas específicas para cada figura'
      },
      {
        text: 'Área y volumen de prismas rectos y cilindros',
        difficulty: 2,
        cognitiveLevel: 'Medio',
        skills: ['Resolver', 'Modelar', 'Representar'],
        realWorldContext: '📦 Capacidad y almacenamiento',
        example: 'Ej: Volumen cilindro = πr²h',
        keyPoints: 'Área base × altura, área lateral'
      },
      {
        text: 'Transformaciones isométricas: rotación, traslación y reflexión',
        difficulty: 2,
        cognitiveLevel: 'Medio',
        skills: ['Resolver', 'Representar'],
        realWorldContext: '🎨 Diseño y simetría',
        example: 'Ej: Reflejar punto (2,3) sobre eje x',
        keyPoints: 'Conservan forma y tamaño, sistema coordenado'
      }
    ]
  },
  {
    name: 'Probabilidad y Estadística',
    icon: '📊',
    color: 'bg-orange-100 dark:bg-orange-900',
    borderColor: 'border-orange-300 dark:border-orange-700',
    textColor: 'text-orange-900 dark:text-orange-100',
    questionCount: 15,
    percentage: 23,
    topics: [
      {
        text: 'Tablas y gráficos (frecuencia absoluta y relativa)',
        difficulty: 1,
        cognitiveLevel: 'Básico',
        skills: ['Representar', 'Resolver'],
        realWorldContext: '📰 Interpretación de datos',
        example: 'Ej: Si 12 de 40 estudiantes aprueban, ¿frecuencia relativa?',
        keyPoints: 'Fr = frecuencia absoluta / total'
      },
      {
        text: 'Medidas de tendencia central y rango',
        difficulty: 1,
        cognitiveLevel: 'Básico',
        skills: ['Resolver'],
        realWorldContext: '📊 Análisis de datos',
        example: 'Ej: Media de {2,4,4,5,5} = 4',
        keyPoints: 'Media, mediana, moda, rango = max - min'
      },
      {
        text: 'Medidas de posición (cuartiles, percentiles, diagrama de caja)',
        difficulty: 2,
        cognitiveLevel: 'Medio',
        skills: ['Resolver', 'Representar', 'Argumentar'],
        realWorldContext: '📈 Distribución de datos',
        example: 'Ej: Q1 = percentil 25, Q2 = mediana',
        keyPoints: 'Dividir datos ordenados en cuartos'
      },
      {
        text: 'Reglas de probabilidad (aditiva y multiplicativa)',
        difficulty: 2,
        cognitiveLevel: 'Medio',
        skills: ['Resolver', 'Modelar', 'Argumentar'],
        realWorldContext: '🎲 Toma de decisiones',
        example: 'Ej: P(A o B) = P(A) + P(B) - P(A∩B)',
        keyPoints: 'Eventos independientes: P(A∩B) = P(A)·P(B)'
      }
    ]
  }
];

const paesM2AdditionalContent = [
  {
    name: 'Números',
    questionCount: 20,
    percentage: 36,
    additions: [
      {
        text: 'Números reales: operaciones y problemas',
        difficulty: 2,
        cognitiveLevel: 'Medio',
        skills: ['Resolver', 'Argumentar'],
        example: 'Ej: Ordenar √8, 2.8, 8/3 de menor a mayor',
        keyPoints: 'Irracionales, aproximaciones decimales'
      },
      {
        text: 'Matemática financiera: AFP, jubilación, créditos',
        difficulty: 2,
        cognitiveLevel: 'Medio',
        skills: ['Resolver', 'Modelar'],
        realWorldContext: '💰 Economía personal - AFP',
        example: 'Ej: Interés compuesto, capitalización',
        keyPoints: 'Fórmula: M = C(1+i)ⁿ'
      },
      {
        text: 'Logaritmos: relación con potencias y raíces, propiedades y aplicaciones',
        difficulty: 3,
        cognitiveLevel: 'Medio/Avanzado',
        skills: ['Resolver', 'Argumentar'],
        realWorldContext: '🔬 Ciencias - escalas',
        example: 'Ej: log₂8 = 3 porque 2³ = 8',
        keyPoints: 'log(ab) = log(a) + log(b), log(aⁿ) = n·log(a)'
      }
    ]
  },
  {
    name: 'Álgebra y Funciones',
    questionCount: 16,
    percentage: 29,
    additions: [
      {
        text: 'Sistemas de ecuaciones lineales: análisis de soluciones (única, infinitas, ninguna)',
        difficulty: 3,
        cognitiveLevel: 'Avanzado',
        skills: ['Resolver', 'Argumentar'],
        example: 'Ej: Sistema incompatible (sin solución)',
        keyPoints: 'Analizar determinantes, rectas paralelas'
      },
      {
        text: 'Función potencia: gráficos y problemas',
        difficulty: 2,
        cognitiveLevel: 'Medio',
        skills: ['Resolver', 'Representar', 'Modelar'],
        realWorldContext: '🔬 Ciencias - crecimiento',
        example: 'Ej: f(x) = x³, comportamiento creciente/decreciente',
        keyPoints: 'Exponente par/impar, dominio y recorrido'
      }
    ]
  },
  {
    name: 'Geometría',
    questionCount: 8,
    percentage: 15,
    additions: [
      {
        text: 'Homotecia de figuras planas',
        difficulty: 3,
        cognitiveLevel: 'Avanzado',
        skills: ['Resolver', 'Representar', 'Argumentar'],
        realWorldContext: '🎨 Diseño y escalado',
        example: 'Ej: Ampliar triángulo con razón k=2',
        keyPoints: 'Semejanza, razón de escala, centro de homotecia'
      },
      {
        text: 'Razones trigonométricas (seno, coseno, tangente) y aplicaciones',
        difficulty: 2,
        cognitiveLevel: 'Medio',
        skills: ['Resolver', 'Modelar'],
        realWorldContext: '🏗️ Ángulos y alturas',
        example: 'Ej: En triángulo 3-4-5, sen(α) = 3/5',
        keyPoints: 'SOH-CAH-TOA, triángulos rectángulos'
      }
    ]
  },
  {
    name: 'Probabilidad y Estadística',
    questionCount: 11,
    percentage: 20,
    additions: [
      {
        text: 'Medidas de dispersión',
        difficulty: 2,
        cognitiveLevel: 'Medio',
        skills: ['Resolver', 'Argumentar'],
        realWorldContext: '📊 Variabilidad de datos',
        example: 'Ej: Varianza, desviación estándar',
        keyPoints: 'σ² = Σ(x-μ)²/n'
      },
      {
        text: 'Probabilidad condicional',
        difficulty: 3,
        cognitiveLevel: 'Avanzado',
        skills: ['Resolver', 'Modelar', 'Argumentar'],
        realWorldContext: '🔬 Inferencia y diagnóstico',
        example: 'Ej: P(A|B) = P(A∩B)/P(B)',
        keyPoints: 'Eventos dependientes, teorema de Bayes'
      },
      {
        text: 'Permutaciones y combinatoria',
        difficulty: 2,
        cognitiveLevel: 'Medio',
        skills: ['Resolver', 'Modelar'],
        realWorldContext: '🎯 Conteo y posibilidades',
        example: 'Ej: ¿De cuántas formas ordenar 5 personas?',
        keyPoints: 'n! permutaciones, C(n,k) combinaciones'
      },
      {
        text: 'Modelos probabilísticos (binomial)',
        difficulty: 3,
        cognitiveLevel: 'Medio/Avanzado',
        skills: ['Resolver', 'Modelar', 'Argumentar'],
        realWorldContext: '🔬 Ciencias - experimentos',
        example: 'Ej: Probabilidad de 3 éxitos en 5 intentos',
        keyPoints: 'P(X=k) = C(n,k)·pᵏ·(1-p)ⁿ⁻ᵏ'
      }
    ]
  }
];

export default function Curriculum({ level }: CurriculumProps) {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const getDifficultyStars = (difficulty: number) => {
    const stars = ['⭐', '⭐⭐', '⭐⭐⭐'];
    const labels = ['Básico', 'Intermedio', 'Avanzado'];
    return { stars: stars[difficulty - 1] || '⭐', label: labels[difficulty - 1] || 'Básico' };
  };

  // Get skills for a specific topic
  const getTopicSkills = (topicText: string): EnhancedSkill[] => {
    const skillIds = topicSkillMapping[topicText] || [];
    return skillIds
      .map(id => skillsArray.find(skill => skill.id === id))
      .filter((skill): skill is EnhancedSkill => skill !== undefined);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#000000] font-[system-ui,-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Segoe_UI',sans-serif]">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 h-14 backdrop-blur-[20px] bg-white/80 dark:bg-[#121212]/80 border-b border-black/[0.12] dark:border-white/[0.16] saturate-[1.2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex justify-between items-center">
          <h1 className="text-lg font-semibold text-[#0A84FF]">
            PAES Chile - Matemática
          </h1>
          <Link
            href="/dashboard"
            className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </nav>

      {/* Main layout with sidebar */}
      <div className="flex">
        <CurriculumSidebar currentLevel={level} />

        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-3">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
                  Curriculum PAES - Nivel {level}
                </h1>
                {level === 'M1' && (
                  <Link
                    href="/curriculum/m1/docs"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center gap-2"
                  >
                    📖 Ver Documentación Detallada
                  </Link>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
                {level === 'M1'
                  ? 'Competencia Matemática 1 - Contenidos básicos'
                  : 'Competencia Matemática 2 - Contenidos avanzados'}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Duración:</span> 2h 20min |
                <span className="font-semibold ml-2">Preguntas:</span> {level === 'M1' ? '65 (60 para puntaje)' : '55 (50 para puntaje)'}
                {level === 'M2' && ' | Incluye Suficiencia de Datos'}
              </div>
            </div>

        {/* Official PAES Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            📚 Ejes Temáticos y Contenidos Oficiales PAES
          </h2>

          <div className="space-y-4 mb-6">
            {paesM1Content.map((area, index) => {
              const m2Addition = level === 'M2' ? paesM2AdditionalContent.find(a => a.name === area.name) : null;
              const displayQuestionCount = level === 'M2' && m2Addition ? m2Addition.questionCount : area.questionCount;
              const displayPercentage = level === 'M2' && m2Addition ? m2Addition.percentage : area.percentage;

              return (
                <div
                  key={area.name}
                  className={`${area.color} rounded-lg p-6 border-2 ${area.borderColor}`}
                >
                  {/* Header with question distribution */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{area.icon}</span>
                      <div>
                        <h3 className={`text-2xl font-bold ${area.textColor}`}>
                          {index + 1}. {area.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            ~{displayQuestionCount} preguntas ({displayPercentage}% del examen)
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/practice/${level.toLowerCase()}?subject=${mapSubjectToKey(area.name)}`}
                      className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 transition-colors text-sm whitespace-nowrap"
                    >
                      Practicar →
                    </Link>
                  </div>

                  {/* M1 Content - Expandable topics */}
                  <div className="mb-4">
                    <ul className="space-y-2">
                      {area.topics.map((topic, idx) => {
                        const topicId = `${area.name}-${idx}`;
                        const isExpanded = expandedTopics[topicId];
                        const { stars, label } = getDifficultyStars(topic.difficulty);

                        return (
                          <li key={idx} className="border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                            <button
                              onClick={() => toggleTopic(topicId)}
                              className="flex items-start justify-between w-full text-left hover:opacity-80 transition-opacity"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-gray-800 dark:text-gray-200">{topic.text}</span>
                                  <span className="text-xs" title={label}>{stars}</span>
                                  {topic.realWorldContext && (
                                    <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded">
                                      {topic.realWorldContext}
                                    </span>
                                  )}
                                </div>
                                {isExpanded && (
                                  <div className="mt-2 pl-4 space-y-2">
                                    <div className="flex gap-2 flex-wrap mb-2">
                                      <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                                        Nivel: {topic.cognitiveLevel}
                                      </span>
                                      {topic.skills && topic.skills.map((skill: string) => (
                                        <span key={skill} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                    <div className="bg-white/50 dark:bg-gray-800/50 rounded p-2 text-sm">
                                      <p className="font-semibold text-gray-700 dark:text-gray-300">💡 Ejemplo:</p>
                                      <p className="text-gray-600 dark:text-gray-400">{topic.example}</p>
                                    </div>
                                    <div className="bg-white/50 dark:bg-gray-800/50 rounded p-2 text-sm">
                                      <p className="font-semibold text-gray-700 dark:text-gray-300">📌 Puntos clave:</p>
                                      <p className="text-gray-600 dark:text-gray-400">{topic.keyPoints}</p>
                                    </div>
                                    {(() => {
                                      const topicSkills = getTopicSkills(topic.text);
                                      if (topicSkills.length > 0) {
                                        return (
                                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded p-3 text-sm border border-green-200 dark:border-green-700">
                                            <p className="font-semibold text-green-800 dark:text-green-200 mb-2">🎯 Habilidades específicas:</p>
                                            <div className="flex flex-wrap gap-1.5">
                                              {topicSkills.map(skill => (
                                                <span
                                                  key={skill.id}
                                                  className="text-xs bg-white dark:bg-gray-800 text-green-700 dark:text-green-300 px-2 py-1 rounded border border-green-300 dark:border-green-600"
                                                  title={skill.description}
                                                >
                                                  {skill.name}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        );
                                      }
                                      return null;
                                    })()}
                                  </div>
                                )}
                              </div>
                              <span className="text-gray-500 dark:text-gray-400 ml-2">
                                {isExpanded ? '▼' : '▶'}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* M2 Additions - Expandable */}
                  {m2Addition && m2Addition.additions.length > 0 && (
                    <div className="mt-4 pt-4 border-t-2 border-dashed border-current opacity-70">
                      <p className="font-bold text-sm mb-2 text-gray-900 dark:text-gray-100">
                        ➕ En M2 se agrega:
                      </p>
                      <ul className="space-y-2">
                        {m2Addition.additions.map((addition, idx) => {
                          const topicId = `${area.name}-m2-${idx}`;
                          const isExpanded = expandedTopics[topicId];
                          const { stars, label } = getDifficultyStars(addition.difficulty);

                          return (
                            <li key={idx} className="border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                              <button
                                onClick={() => toggleTopic(topicId)}
                                className="flex items-start justify-between w-full text-left hover:opacity-80 transition-opacity"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <span className="text-gray-800 dark:text-gray-200 text-sm">{addition.text}</span>
                                    <span className="text-xs" title={label}>{stars}</span>
                                    {addition.realWorldContext && (
                                      <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded">
                                        {addition.realWorldContext}
                                      </span>
                                    )}
                                  </div>
                                  {isExpanded && (
                                    <div className="mt-2 pl-4 space-y-2">
                                      <div className="flex gap-2 flex-wrap mb-2">
                                        <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                                          Nivel: {addition.cognitiveLevel}
                                        </span>
                                        {addition.skills && addition.skills.map((skill: string) => (
                                          <span key={skill} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                                            {skill}
                                          </span>
                                        ))}
                                      </div>
                                      <div className="bg-white/50 dark:bg-gray-800/50 rounded p-2 text-sm">
                                        <p className="font-semibold text-gray-700 dark:text-gray-300">💡 Ejemplo:</p>
                                        <p className="text-gray-600 dark:text-gray-400">{addition.example}</p>
                                      </div>
                                      <div className="bg-white/50 dark:bg-gray-800/50 rounded p-2 text-sm">
                                        <p className="font-semibold text-gray-700 dark:text-gray-300">📌 Puntos clave:</p>
                                        <p className="text-gray-600 dark:text-gray-400">{addition.keyPoints}</p>
                                      </div>
                                      {(() => {
                                        const topicSkills = getTopicSkills(addition.text);
                                        if (topicSkills.length > 0) {
                                          return (
                                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded p-3 text-sm border border-green-200 dark:border-green-700">
                                              <p className="font-semibold text-green-800 dark:text-green-200 mb-2">🎯 Habilidades específicas:</p>
                                              <div className="flex flex-wrap gap-1.5">
                                                {topicSkills.map(skill => (
                                                  <span
                                                    key={skill.id}
                                                    className="text-xs bg-white dark:bg-gray-800 text-green-700 dark:text-green-300 px-2 py-1 rounded border border-green-300 dark:border-green-600"
                                                    title={skill.description}
                                                  >
                                                    {skill.name}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>
                                          );
                                        }
                                        return null;
                                      })()}
                                    </div>
                                  )}
                                </div>
                                <span className="text-gray-500 dark:text-gray-400 ml-2">
                                  {isExpanded ? '▼' : '▶'}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Habilidades */}
          <div className="mb-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-6 border-2 border-indigo-200 dark:border-indigo-700">
            <h3 className="text-xl font-bold mb-3 text-indigo-900 dark:text-indigo-100">
              🎯 Habilidades Evaluadas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Resolver problemas', 'Modelar', 'Representar', 'Argumentar'].map((skill) => (
                <div key={skill} className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill-Topic Matrix */}
          <div className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border-2 border-purple-200 dark:border-purple-700">
            <h3 className="text-xl font-bold mb-3 text-purple-900 dark:text-purple-100">
              🧩 Matriz Habilidad-Eje Temático
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Cada eje temático evalúa diferentes habilidades. Esta matriz muestra qué habilidades se requieren en cada área.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(skillTopicMatrix).map(([axis, data]) => (
                <div key={axis} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                  <h4 className="font-bold text-sm mb-2 text-gray-800 dark:text-gray-200">{axis}</h4>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {data.skills.map((skill) => (
                      <span key={skill} className="text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{data.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Link
                href={`/practice/${level.toLowerCase()}`}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Comenzar Práctica
              </Link>
              <Link
                href="/dashboard"
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
