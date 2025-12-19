'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LandingNav } from '@/components/landing';
import {
  B2BHeroSection,
  PainPointsSection,
  HowItWorksSection,
  B2BFeaturesSection,
  B2BStatsSection,
  CurriculumPreviewSection,
  DecisionMakersSection,
  B2BCTASection,
} from '@/components/landing/instituciones';
import Footer from '@/components/layout/Footer';

export default function InstitucionesPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

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
      <LandingNav variant="b2b" />

      <main>
        <B2BHeroSection />
        <PainPointsSection />
        <HowItWorksSection />
        <B2BFeaturesSection />
        <B2BStatsSection />
        <CurriculumPreviewSection />
        <DecisionMakersSection />
        <B2BCTASection />
      </main>

      <Footer />
    </div>
  );
}
