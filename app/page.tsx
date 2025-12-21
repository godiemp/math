'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LandingNav, HeroSection, StatsSection, CTASection } from '@/components/landing';
import { FeatureSection } from '@/components/landing/FeatureSections/FeatureSection';
import { PracticeModesDemo } from '@/components/landing/FeatureSections/demos/PracticeModesDemo';
import { AITutorDemo } from '@/components/landing/FeatureSections/demos/AITutorDemo';
import { ProgressDemo } from '@/components/landing/FeatureSections/demos/ProgressDemo';
import { LivePracticeDemo } from '@/components/landing/FeatureSections/demos/LivePracticeDemo';
import { OperationsDemo } from '@/components/landing/FeatureSections/demos/OperationsDemo';
import {
  PainPointsSection,
  HowItWorksSection,
  B2BFeaturesSection,
  B2BStatsSection,
  CurriculumPreviewSection,
  DecisionMakersSection,
  B2BCTASection,
} from '@/components/landing/instituciones';
import Footer from '@/components/layout/Footer';

type Audience = 'b2c' | 'b2b';

function LandingPageContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialAudience: Audience = tabParam === 'colegios' ? 'b2b' : 'b2c';

  const [audience, setAudience] = useState<Audience>(initialAudience);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Sync state with URL param changes
  useEffect(() => {
    const newAudience: Audience = tabParam === 'colegios' ? 'b2b' : 'b2c';
    setAudience(newAudience);
  }, [tabParam]);

  // Update URL when audience changes
  const handleAudienceChange = (newAudience: Audience) => {
    setAudience(newAudience);
    const newTab = newAudience === 'b2b' ? 'colegios' : 'estudiantes';
    router.replace(`/?tab=${newTab}`, { scroll: false });
  };

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // Don't render landing for authenticated users
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <LandingNav />

      <main>
        <HeroSection
          audience={audience}
          onAudienceChange={handleAudienceChange}
        />

        {audience === 'b2c' ? (
          <>
            <StatsSection />

            <FeatureSection
              title="Dos Modos de Práctica"
              description="Elige cómo quieres entrenar: sin presión para aprender, o simulando las condiciones reales de la PAES."
              bullets={[
                'Modo Zen: A tu ritmo, sin límite de tiempo',
                'Desafío Contra el Reloj: Simula condiciones PAES',
                'El Tutor AI está disponible cuando te trabas',
              ]}
              demo={<PracticeModesDemo />}
            />

            <FeatureSection
              title="Tutor AI Socrático"
              description="Cuando te trabas, el tutor te guía con preguntas. No te da la respuesta — te ayuda a pensar y desarrollar tu razonamiento."
              bullets={[
                'Disponible 24/7 en el Modo Zen',
                'Metodología Socrática: preguntas que guían',
                'Desarrolla pensamiento crítico, no dependencia',
              ]}
              demo={<AITutorDemo />}
              reversed
              bgColor="var(--color-fill)"
            />

            <FeatureSection
              title="Métricas de Progreso"
              description="Ve exactamente dónde estás y qué necesitas mejorar. Sin adivinar, con datos reales de tu desempeño."
              bullets={[
                'Rendimiento detallado por tema',
                'Habilidades dominadas vs en progreso',
                'Predicción de tu puntaje PAES',
              ]}
              demo={<ProgressDemo />}
            />

            <FeatureSection
              title="Ensayos en Vivo"
              description="Practica con otros estudiantes en sesiones grupales que simulan el día de la prueba. Competencia sana y resultados inmediatos."
              bullets={[
                'Sesiones programadas con otros estudiantes',
                'Competencia en tiempo real',
                'Ranking y resultados al terminar',
              ]}
              demo={<LivePracticeDemo />}
              reversed
              bgColor="var(--color-fill)"
            />

            <FeatureSection
              title="Práctica de Operaciones"
              description="Domina las operaciones básicas con ejercicios progresivos. Desde aritmética hasta álgebra, avanza a tu ritmo por más de 130 niveles."
              bullets={[
                'Suma, resta, multiplicación y división',
                'Progresión gradual por niveles',
                'Feedback inmediato en cada respuesta',
              ]}
              demo={<OperationsDemo />}
            />

            <CTASection audience={audience} />
          </>
        ) : (
          <>
            <PainPointsSection />
            <HowItWorksSection />
            <B2BFeaturesSection />
            <B2BStatsSection />
            <CurriculumPreviewSection />
            <DecisionMakersSection />
            <B2BCTASection />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: 'var(--color-bg)' }} />}>
      <LandingPageContent />
    </Suspense>
  );
}
