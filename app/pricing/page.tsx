'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { toast } from 'sonner';
import { Plan } from '@/lib/types';
import { getActivePlans, createPaymentPreference } from '@/lib/api/payments';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { analytics } from '@/lib/analytics';
import { useTranslations } from 'next-intl';

export default function PricingPage() {
  const t = useTranslations('pricing');
  const router = useRouter();
  const { isAuthenticated, isPaidUser } = useAuth();
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

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

  const handleSubscribe = async (plan: Plan) => {
    // Track checkout started
    analytics.track('checkout_started', {
      plan: plan.name,
      planId: plan.id,
      amount: plan.price,
      hasTrial: plan.trialDurationDays > 0,
      source: 'pricing_page',
    });

    if (!isAuthenticated) {
      toast.error(t('errors.mustLogin'));
      router.push('/login?redirect=/pricing');
      return;
    }

    if (isPaidUser) {
      toast.info(t('errors.alreadySubscribed'));
      return;
    }

    // If plan has trial and costs money, show payment options modal
    if (plan.trialDurationDays > 0 && plan.price > 0) {
      setSelectedPlan(plan);
      setShowPaymentModal(true);
      return;
    }

    // Otherwise, proceed directly
    await proceedWithPayment(plan.id, false);
  };

  const proceedWithPayment = async (planId: string, startTrialWithoutCard: boolean) => {
    setLoadingPlanId(planId);
    setShowPaymentModal(false);

    try {
      if (startTrialWithoutCard) {
        // Start trial without payment - call backend to create trial subscription
        const response = await fetch('/api/payments/start-trial', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ planId }),
          credentials: 'include',
        });

        const result = await response.json();

        if (!response.ok || result.error) {
          toast.error(result.error || t('errors.trialError'));
          return;
        }

        toast.success(t('trial.activated'));
        router.push('/dashboard');
      } else {
        // Proceed with payment - redirect to MercadoPago (or activate trial in MVP mode)
        const result = await createPaymentPreference(planId);

        if (result.error) {
          toast.error(result.error.error || t('errors.paymentError'));
          return;
        }

        const data = result.data?.data;
        if (!data) {
          toast.error(t('errors.paymentError'));
          return;
        }

        // MVP MODE: If backend returns mvpMode, it activated the trial directly
        if ('mvpMode' in data && data.mvpMode) {
          if (data.alreadyHasSubscription) {
            toast.info(data.message || 'Ya tienes una suscripción activa');
          } else {
            toast.success(data.message || '¡Prueba activada! Disfruta 7 días gratis.');
            setTimeout(() => {
              router.push('/dashboard');
            }, 1000);
          }
          return;
        }

        // PRODUCTION MODE: Redirect to MercadoPago
        if ('initPoint' in data) {
          const checkoutUrl = process.env.NODE_ENV === 'production'
            ? data.initPoint
            : data.sandboxInitPoint;

          window.location.href = checkoutUrl;
        }
      }
    } catch (error) {
      console.error('Error processing subscription:', error);
      toast.error(t('errors.processingError'));
    } finally {
      setLoadingPlanId(null);
    }
  };

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
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card padding="lg">
          <div className="text-center text-red-500">
            <p className="text-lg font-semibold mb-2">Error al cargar los planes</p>
            <p className="text-sm">{error.message}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('header.title')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('header.subtitle')}
        </p>
      </div>

      {/* Current Status */}
      {isAuthenticated && (
        <div className="max-w-2xl mx-auto mb-8">
          <Card padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('currentStatus.label')}</p>
                <p className="font-semibold">
                  {isPaidUser ? (
                    <span className="text-green-500">{t('currentStatus.active')}</span>
                  ) : (
                    <span className="text-gray-500">{t('currentStatus.free')}</span>
                  )}
                </p>
              </div>
              {isPaidUser && (
                <Badge variant="success">{t('badge.premium')}</Badge>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan: Plan) => {
          const isLoading = loadingPlanId === plan.id;
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
              <div className="flex-1 mb-6">
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

              {/* Subscribe Button */}
              <Button
                variant="primary"
                onClick={() => handleSubscribe(plan)}
                disabled={isLoading || (isAuthenticated && isPaidUser)}
                className="w-full"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t('button.processing')}
                  </span>
                ) : isPaidUser ? (
                  t('button.subscribed')
                ) : (
                  t('button.subscribe')
                )}
              </Button>
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

      {/* Payment Options Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-white rounded-lg shadow-xl max-w-lg w-full p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">{t('modal.title')}</h3>
              <p className="text-gray-600">
                {selectedPlan.name} - {formatPrice(selectedPlan.price, selectedPlan.currency)}/mes
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {/* Option 1: Start trial without card */}
              <button
                onClick={() => proceedWithPayment(selectedPlan.id, true)}
                disabled={loadingPlanId === selectedPlan.id}
                className="w-full p-6 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors text-left"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1 text-gray-900">{t('modal.tryFirst.title')}</h4>
                    <p className="text-sm text-gray-600">
                      {t('modal.tryFirst.description')}
                    </p>
                  </div>
                  <Badge variant="success" className="ml-2">{t('badge.recommended')}</Badge>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 mt-3">
                  <li>{t('modal.tryFirst.benefit1')}</li>
                  <li>{t('modal.tryFirst.benefit2')}</li>
                  <li>{t('modal.tryFirst.benefit3')}</li>
                </ul>
              </button>

              {/* Option 2: Pay now with trial */}
              <button
                onClick={() => proceedWithPayment(selectedPlan.id, false)}
                disabled={loadingPlanId === selectedPlan.id}
                className="w-full p-6 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1 text-gray-900">{t('modal.payNow.title')}</h4>
                  <p className="text-sm text-gray-600">
                    {t('modal.payNow.description')}
                  </p>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 mt-3">
                  <li>{t('modal.payNow.benefit1')}</li>
                  <li>{t('modal.payNow.benefit2')}</li>
                  <li>{t('modal.payNow.benefit3')}</li>
                </ul>
              </button>
            </div>

            {/* Close button */}
            <Button
              variant="secondary"
              onClick={() => {
                setShowPaymentModal(false);
                setSelectedPlan(null);
              }}
              disabled={loadingPlanId === selectedPlan.id}
              className="w-full"
            >
              {t('modal.cancel')}
            </Button>

            {loadingPlanId === selectedPlan.id && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  {t('button.processing')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
