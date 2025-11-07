'use client';

import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/auth";

function DashboardContent() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            PAES Chile - Matemática
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-gray-300">
              Hola, {user?.displayName}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
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
            <div className="flex gap-2">
              <Link
                href="/practice/m1"
                className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Practicar M1
              </Link>
              <Link
                href="/curriculum/m1"
                className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Ver Curriculum
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Competencia Matemática M2
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Contenidos avanzados para carreras científicas y de ingeniería
            </p>
            <div className="flex gap-2">
              <Link
                href="/practice/m2"
                className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Practicar M2
              </Link>
              <Link
                href="/curriculum/m2"
                className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Ver Curriculum
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-md p-8 mb-12">
          <div className="text-center">
            <div className="text-5xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold mb-3 text-white">
              Práctica en Vivo
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              ¡Nuevo! Practica con otros estudiantes en tiempo real. Únete a sesiones grupales, compite con tus compañeros y mejora tus habilidades juntos.
            </p>
            <Link
              href="/live-practice"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold shadow-lg"
            >
              Entrar a Práctica en Vivo →
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Temas Principales
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Números y Proporcionalidad",
              "Álgebra y Funciones",
              "Geometría",
              "Probabilidad y Estadística",
              "Límites y Derivadas",
              "Cálculo Integral"
            ].map((topic, index) => (
              <div
                key={index}
                className="bg-indigo-50 dark:bg-gray-700 rounded-lg p-4 text-center hover:bg-indigo-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <p className="text-gray-800 dark:text-gray-200 font-medium">
                  {topic}
                </p>
              </div>
            ))}
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

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
