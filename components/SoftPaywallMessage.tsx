'use client';

import { useRouter } from 'next/navigation';

interface SoftPaywallMessageProps {
  moduleName: string;
}

/**
 * SoftPaywallMessage
 *
 * Friendly message shown to free users when they try to access premium modules.
 * Emphasizes the test version and guides them to available content.
 */
export function SoftPaywallMessage({ moduleName }: SoftPaywallMessageProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-12">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-purple-300"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Versión de Prueba
        </h1>

        {/* Message */}
        <div className="space-y-4 text-gray-200 text-center mb-8">
          <p className="text-lg">
            Estás usando la <span className="text-purple-300 font-semibold">versión de prueba</span> de nuestra plataforma.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-left">
            <h2 className="text-xl font-semibold text-white mb-3">Contenido disponible:</h2>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-white">Ensayo PAES en Vivo</p>
                  <p className="text-sm text-gray-300">Acceso completo y gratuito</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-6 text-left">
            <h2 className="text-xl font-semibold text-white mb-3">Contenido premium:</h2>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Ejercicios de práctica M1 y M2</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Temario completo PAES Matemática</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Seguimiento de progreso personalizado</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-400 italic">
            Estamos en fase de lanzamiento. Pronto podrás acceder a todo el contenido premium.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/live-practice')}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
          >
            Ir a Ensayo en Vivo
          </button>

          <button
            onClick={() => router.push('/dashboard')}
            className="px-8 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
