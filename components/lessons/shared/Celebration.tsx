'use client';

import { useEffect, useState } from 'react';
import { Award, Sparkles, Star } from 'lucide-react';

interface CelebrationProps {
  title?: string;
  message?: string;
  onContinue?: () => void;
  continueLabel?: string;
}

export default function Celebration({
  title = '¡Lección Completada!',
  message = 'Has demostrado que entiendes el tema.',
  onContinue,
  continueLabel = 'Continuar',
}: CelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {i % 3 === 0 ? (
                <Star size={20} className="text-yellow-400" fill="currentColor" />
              ) : i % 3 === 1 ? (
                <Sparkles size={20} className="text-purple-400" />
              ) : (
                <div className="w-3 h-3 rounded-full bg-blue-400" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/50 via-transparent to-purple-100/50 dark:from-yellow-900/20 dark:to-purple-900/20" />

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
            <Award size={40} className="text-white animate-bounce" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-8">{message}</p>

          {onContinue && (
            <button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
            >
              {continueLabel}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </div>
  );
}
