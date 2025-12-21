'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useAuth } from '@/contexts/AuthContext';
import { loginUser } from '@/lib/auth';
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

function LandingPageContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialAudience: Audience = tabParam === 'colegios' ? 'b2b' : 'b2c';

  const [audience, setAudience] = useState<Audience>(initialAudience);
  const { isAuthenticated, isLoading, refreshSession } = useAuth();
  const router = useRouter();
  const autoLoginAttempted = useRef(false);
  const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';

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

  // Auto-login in Vercel preview deployments
  useEffect(() => {
    if (isPreview && !isLoading && !isAuthenticated && !autoLoginAttempted.current) {
      autoLoginAttempted.current = true;
      (async () => {
        const loginResult = await loginUser('admin', 'admin123');
        if (loginResult.success && loginResult.user) {
          await signIn('credentials', {
            user: JSON.stringify(loginResult.user),
            redirect: false,
          });
          await refreshSession();
          router.push('/dashboard');
        }
      })();
    }
  }, [isPreview, isLoading, isAuthenticated, refreshSession, router]);

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

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: 'var(--color-bg)' }} />}>
      <LandingPageContent />
    </Suspense>
  );
}
