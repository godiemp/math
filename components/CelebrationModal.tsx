'use client';

import { useEffect, useState } from 'react';
import { Button, Heading, Text } from '@/components/ui';

interface CelebrationModalProps {
  score: number;
  totalQuestions: number;
  onContinue: () => void;
}

export function CelebrationModal({ score, totalQuestions, onContinue }: CelebrationModalProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    // Stop confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const getMessage = () => {
    if (percentage >= 80) {
      return {
        emoji: '🌟',
        title: '¡Excelente Inicio!',
        message: '¡Has demostrado un gran dominio en tu primer quiz! Sigue así y alcanzarás tus metas.',
      };
    } else if (percentage >= 60) {
      return {
        emoji: '👏',
        title: '¡Buen Trabajo!',
        message: 'Un gran comienzo. Con práctica constante mejorarás cada día más.',
      };
    } else if (percentage >= 40) {
      return {
        emoji: '💪',
        title: '¡Has Comenzado!',
        message: 'Todo gran viaje comienza con un primer paso. Sigue practicando y verás el progreso.',
      };
    } else {
      return {
        emoji: '🌱',
        title: '¡Primer Paso Completado!',
        message: 'Lo importante es comenzar. Cada quiz te acerca más a tu objetivo. ¡No te rindas!',
      };
    }
  };

  const { emoji, title, message } = getMessage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: [
                  '#FF453A',
                  '#FF9F0A',
                  '#FFD60A',
                  '#34C759',
                  '#0A84FF',
                  '#5E5CE6',
                  '#FF375F',
                ][Math.floor(Math.random() * 7)],
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] max-w-lg w-full p-8 text-center space-y-6 relative z-10 animate-scale-in">
        {/* Emoji */}
        <div className="text-7xl animate-bounce-slow">{emoji}</div>

        {/* Title */}
        <Heading level={2} size="lg" className="mb-3">
          {title}
        </Heading>

        {/* Score Display */}
        <div className="bg-gradient-to-r from-[#5E5CE6]/10 to-[#0A84FF]/10 dark:from-[#9A99FF]/10 dark:to-[#0A84FF]/10 rounded-2xl p-6">
          <Text size="xs" variant="secondary" className="mb-2 uppercase tracking-wider font-semibold">
            Tu Puntuación
          </Text>
          <div className="text-5xl font-bold text-[#0A84FF] mb-1">
            {score}/{totalQuestions}
          </div>
          <Text size="lg" className="font-semibold">
            {percentage}% Correctas
          </Text>
        </div>

        {/* Message */}
        <Text size="md" variant="secondary" className="leading-relaxed">
          {message}
        </Text>

        {/* Next Steps Checklist */}
        <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-6 text-left space-y-3">
          <Heading level={4} size="xs" className="mb-3 text-center">
            ¿Qué hacer ahora?
          </Heading>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">📚</span>
              <Text size="sm" variant="secondary">
                Revisa las explicaciones de las preguntas que fallaste
              </Text>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">🔄</span>
              <Text size="sm" variant="secondary">
                Prueba otro tema o nivel de dificultad
              </Text>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">🔥</span>
              <Text size="sm" variant="secondary">
                Practica diariamente para mantener tu racha
              </Text>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">📊</span>
              <Text size="sm" variant="secondary">
                Visita la sección de progreso para ver tu evolución
              </Text>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button variant="primary" onClick={onContinue} className="w-full text-lg py-6">
          ¡Continuar Explorando! 🚀
        </Button>

        {/* Encouragement */}
        <Text size="xs" variant="secondary" className="italic">
          "El éxito es la suma de pequeños esfuerzos repetidos día tras día"
        </Text>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }

        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          animation: confetti-fall 3s linear forwards;
        }
      `}</style>
    </div>
  );
}
