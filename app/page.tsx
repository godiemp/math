import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            PAES Chile - Matemática
          </h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Prepárate para la PAES
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Practica para la Prueba de Acceso a la Educación Superior con ejercicios organizados por tema
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">📐</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Competencia Matemática M1
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Contenidos básicos: números, álgebra, geometría y probabilidades
            </p>
            <Link
              href="/practice/m1"
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Practicar M1
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Competencia Matemática M2
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Contenidos avanzados para carreras científicas y de ingeniería
            </p>
            <Link
              href="/practice/m2"
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Practicar M2
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Ejes Temáticos PAES
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { title: "Números", desc: "Enteros, racionales, porcentajes, potencias" },
              { title: "Álgebra y Funciones", desc: "Ecuaciones, funciones, logaritmos, exponenciales" },
              { title: "Geometría", desc: "Figuras, cuerpos 3D, transformaciones" },
              { title: "Probabilidad y Estadística", desc: "Medidas, gráficos, probabilidades" }
            ].map((topic, index) => (
              <div
                key={index}
                className="bg-indigo-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-indigo-100 dark:hover:bg-gray-600 transition-colors"
              >
                <p className="text-gray-900 dark:text-gray-100 font-semibold mb-2">
                  {topic.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {topic.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2">📚 M1: Contenidos básicos obligatorios (65 preguntas)</p>
            <p>🎓 M2: Contenidos avanzados para ciencias e ingeniería (incluye funciones trigonométricas, logaritmos, matemática financiera)</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/progress"
            className="text-indigo-600 dark:text-indigo-400 hover:underline text-lg"
          >
            Ver mi progreso →
          </Link>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 PAES Chile - Plataforma de Preparación Matemática</p>
        </div>
      </footer>
    </div>
  );
}
