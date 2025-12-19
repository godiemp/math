'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { LandingNav, HeroSection, StatsSection, FeaturesSection, CTASection } from '@/components/landing';
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

export default function LandingPage() {
  const [audience, setAudience] = useState<Audience>('b2c');
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
      <LandingNav />

      <main>
        <HeroSection
          audience={audience}
          onAudienceChange={setAudience}
        />

        {audience === 'b2c' ? (
          <>
            <StatsSection />
            <FeaturesSection audience={audience} />
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
