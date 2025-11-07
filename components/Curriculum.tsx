'use client';

import Link from 'next/link';

interface CurriculumProps {
  level: 'M1' | 'M2';
}

// Official PAES curriculum structure
const paesM1Content = [
  {
    name: 'Números',
    icon: '🔢',
    color: 'bg-blue-100 dark:bg-blue-900',
    borderColor: 'border-blue-300 dark:border-blue-700',
    textColor: 'text-blue-900 dark:text-blue-100',
    topics: [
      'Enteros y racionales: operaciones, orden, comparación y problemas',
      'Porcentaje: concepto, cálculo y problemas en contexto',
      'Potencias y raíces enésimas: propiedades, descomposición y problemas'
    ]
  },
  {
    name: 'Álgebra y Funciones',
    icon: '📐',
    color: 'bg-purple-100 dark:bg-purple-900',
    borderColor: 'border-purple-300 dark:border-purple-700',
    textColor: 'text-purple-900 dark:text-purple-100',
    topics: [
      'Expresiones algebraicas: productos notables, factorizaciones, operatoria y aplicaciones',
      'Proporcionalidad directa e inversa',
      'Ecuaciones e inecuaciones lineales',
      'Sistemas de ecuaciones lineales (2×2)',
      'Función lineal y afín: concepto, tablas, gráficos y problemas',
      'Función cuadrática: resolución, gráfica, vértice, ceros, intersecciones y problemas'
    ]
  },
  {
    name: 'Geometría',
    icon: '📏',
    color: 'bg-green-100 dark:bg-green-900',
    borderColor: 'border-green-300 dark:border-green-700',
    textColor: 'text-green-900 dark:text-green-100',
    topics: [
      'Teorema de Pitágoras',
      'Perímetro y área de triángulos, paralelogramos, trapecios y círculos',
      'Área y volumen de prismas rectos y cilindros',
      'Transformaciones isométricas: rotación, traslación y reflexión'
    ]
  },
  {
    name: 'Probabilidad y Estadística',
    icon: '📊',
    color: 'bg-orange-100 dark:bg-orange-900',
    borderColor: 'border-orange-300 dark:border-orange-700',
    textColor: 'text-orange-900 dark:text-orange-100',
    topics: [
      'Tablas y gráficos (frecuencia absoluta y relativa)',
      'Medidas de tendencia central y rango',
      'Medidas de posición (cuartiles, percentiles, diagrama de caja)',
      'Reglas de probabilidad (aditiva y multiplicativa)'
    ]
  }
];

const paesM2AdditionalContent = [
  {
    name: 'Números',
    additions: [
      'Números reales: operaciones y problemas',
      'Matemática financiera: AFP, jubilación, créditos',
      'Logaritmos: relación con potencias y raíces, propiedades y aplicaciones'
    ]
  },
  {
    name: 'Álgebra y Funciones',
    additions: [
      'Sistemas de ecuaciones lineales: análisis de soluciones (única, infinitas, ninguna)',
      'Función potencia: gráficos y problemas'
    ]
  },
  {
    name: 'Geometría',
    additions: [
      'Homotecia de figuras planas',
      'Razones trigonométricas (seno, coseno, tangente) y aplicaciones'
    ]
  },
  {
    name: 'Probabilidad y Estadística',
    additions: [
      'Medidas de dispersión',
      'Probabilidad condicional',
      'Permutaciones y combinatoria',
      'Modelos probabilísticos (binomial)'
    ]
  }
];

export default function Curriculum({ level }: CurriculumProps) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-4"
          >
            ← Volver al Inicio
          </Link>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
            Curriculum PAES - Nivel {level}
          </h1>
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

        {/* Habilidades */}
        <div className="mb-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-6 border-2 border-indigo-200 dark:border-indigo-700">
          <h2 className="text-xl font-bold mb-3 text-indigo-900 dark:text-indigo-100">
            🎯 Habilidades Evaluadas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Resolver problemas', 'Modelar', 'Representar', 'Argumentar'].map((skill) => (
              <div key={skill} className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Official PAES Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            📚 Ejes Temáticos y Contenidos Oficiales PAES
          </h2>

          <div className="space-y-4">
            {paesM1Content.map((area, index) => {
              const m2Addition = level === 'M2' ? paesM2AdditionalContent.find(a => a.name === area.name) : null;

              return (
                <div
                  key={area.name}
                  className={`${area.color} rounded-lg p-6 border-2 ${area.borderColor}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{area.icon}</span>
                    <div>
                      <h3 className={`text-2xl font-bold ${area.textColor}`}>
                        {index + 1}. {area.name}
                      </h3>
                    </div>
                  </div>

                  {/* M1 Content */}
                  <div className="mb-4">
                    <ul className="space-y-2">
                      {area.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-gray-700 dark:text-gray-300 mr-2">•</span>
                          <span className="text-gray-800 dark:text-gray-200">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* M2 Additions */}
                  {m2Addition && m2Addition.additions.length > 0 && (
                    <div className="mt-4 pt-4 border-t-2 border-dashed border-current opacity-70">
                      <p className="font-bold text-sm mb-2 text-gray-900 dark:text-gray-100">
                        ➕ En M2 se agrega:
                      </p>
                      <ul className="space-y-2">
                        {m2Addition.additions.map((addition, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-gray-700 dark:text-gray-300 mr-2">•</span>
                            <span className="text-gray-800 dark:text-gray-200 text-sm">{addition}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
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
            href="/"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
