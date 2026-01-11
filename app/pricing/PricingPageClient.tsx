'use client';

import React, { useEffect } from 'react';
import useSWR from 'swr';
import { Plan } from '@/lib/types';
import { getActivePlans } from '@/lib/api/payments';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { analytics } from '@/lib/analytics';
import { useTranslations } from 'next-intl';
import { LandingNav } from '@/components/landing';
import Footer from '@/components/layout/Footer';

const openIntercomInstitutions = () => {
  if (typeof window !== 'undefined' && window.Intercom) {
    window.Intercom('showNewMessage', 'Hola, quiero información sobre planes para colegios/instituciones');
  }
};

export function PricingPageClient() {
  const t = useTranslations('pricing');

  // Fetch active plans
  const { data: plansResponse, error, isLoading } = useSWR(
    '/api/payments/plans',
    async () => {
      const result = await getActivePlans();
      if (result.error) {
        throw new Error(result.error.error);
      }
      return result.data;
    }
  );

  const plans = plansResponse?.plans || [];

  // Track pricing page view
  useEffect(() => {
    analytics.track('pricing_viewed', {
      source: 'direct',
      plansAvailable: plans.length,
    });
  }, [plans.length]);

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'CLP') {
      return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
      }).format(price);
    }
    return `${currency} ${price}`;
  };

  const formatDuration = (days: number) => {
    if (days === 7) return t('duration.oneWeek');
    if (days === 30) return t('duration.oneMonth');
    if (days === 90) return t('duration.threeMonths');
    if (days === 180) return t('duration.sixMonths');
    if (days === 365) return t('duration.oneYear');
    if (days >= 36500) return t('duration.permanent');
    return t('duration.days', { days });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
        <LandingNav />
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
        <LandingNav />
        <div className="container mx-auto px-4 py-16">
          <Card padding="lg">
            <div className="text-center text-red-500">
              <p className="text-lg font-semibold mb-2">Error al cargar los planes</p>
              <p className="text-sm">{error.message}</p>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <LandingNav />
      <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('header.title')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('header.subtitle')}
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan: Plan) => {
          const hasFreeTrial = plan.trialDurationDays > 0;

          return (
            <Card
              key={plan.id}
              padding="lg"
              className="flex flex-col relative overflow-hidden"
            >
              {/* Recommended Badge */}
              {plan.displayOrder === 1 && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  {t('badge.recommended')}
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                {plan.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {plan.description}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">
                    {formatPrice(plan.price, plan.currency)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t('plan.per')} {formatDuration(plan.durationDays)}
                </p>
                {hasFreeTrial && (
                  <Badge variant="success" className="mt-2">
                    {t('plan.trialDays', { days: plan.trialDurationDays })}
                  </Badge>
                )}
              </div>

              {/* Features */}
              <div className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          );
        })}
      </div>

      {/* No Plans Message */}
      {plans.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Card padding="lg">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('noPlans')}
            </p>
          </Card>
        </div>
      )}

      {/* Additional Info */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <Card padding="lg">
          <h3 className="text-xl font-bold mb-4">{t('faqSection.header')}</h3>
          <div className="text-left space-y-4">
            <div>
              <p className="font-semibold mb-1">{t('faqSection.trial.question')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('faqSection.trial.answer')}
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">{t('faqSection.cancel.question')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('faqSection.cancel.answer')}
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">{t('faqSection.payment.question')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('faqSection.payment.answer')}
              </p>
            </div>
          </div>
        </Card>
      </div>

      </div>

      {/* Institution Pricing Section */}
      <section
        className="py-16 px-4"
        style={{
          background: 'linear-gradient(135deg, var(--color-tint) 0%, #5E5CE6 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(24px, 4vw, 32px)',
                  fontWeight: 600,
                  color: 'white',
                  marginBottom: '16px',
                }}
              >
                {t('institutions.title')}
              </h2>
              <p
                style={{
                  fontSize: '17px',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '24px',
                }}
              >
                {t('institutions.description')}
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  marginBottom: '24px',
                }}
              >
                {[
                  t('institutions.feature1'),
                  t('institutions.feature2'),
                  t('institutions.feature3'),
                  t('institutions.feature4'),
                ].map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px',
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontSize: '15px',
                    }}
                  >
                    <svg
                      className="w-5 h-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center md:text-right">
              <p
                style={{
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '16px',
                }}
              >
                {t('institutions.customPricing')}
              </p>
              <button
                onClick={openIntercomInstitutions}
                className="spring-emphasized"
                style={{
                  padding: '16px 40px',
                  background: 'white',
                  color: 'var(--color-tint)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '17px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {t('institutions.cta')}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
