'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { verifyEmail } from '@/lib/auth';
import { useTranslations } from 'next-intl';

function VerifyEmailContent() {
  const t = useTranslations('auth.verifyEmail');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setErrorMessage(t('errors.invalidToken'));
      return;
    }

    // Verify email with token
    const verify = async () => {
      try {
        const result = await verifyEmail(token);

        if (result.success) {
          setStatus('success');
          toast.success(t('toast.success'));
        } else {
          setStatus('error');
          setErrorMessage(result.error || t('errors.generic'));
          toast.error(result.error || t('errors.generic'));
        }
      } catch (error) {
        setStatus('error');
        setErrorMessage(t('errors.connection'));
        toast.error(t('errors.connection'));
      }
    };

    verify();
  }, [searchParams, t]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-8)',
        background: 'var(--color-background)',
      }}
    >
      <div
        className="translucent spring-motion"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: 'clamp(24px, 5vw, 40px)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-ambient)',
          textAlign: 'center',
        }}
      >
        {status === 'loading' && (
          <>
            <div
              style={{
                width: '48px',
                height: '48px',
                margin: '0 auto var(--spacing-6)',
                border: '3px solid var(--color-separator)',
                borderTop: '3px solid var(--color-tint)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
            <style jsx>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(24px, 5vw, 28px)',
                color: 'var(--color-label-primary)',
                marginBottom: 'var(--spacing-4)',
              }}
            >
              {t('loading.title')}
            </h1>
            <p
              style={{
                fontSize: '15px',
                color: 'var(--color-label-secondary)',
              }}
            >
              {t('loading.message')}
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto var(--spacing-6)',
                background: 'var(--color-success)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
              }}
            >
              <span role="img" aria-label="success">&#10003;</span>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(24px, 5vw, 28px)',
                color: 'var(--color-label-primary)',
                marginBottom: 'var(--spacing-4)',
              }}
            >
              {t('success.title')}
            </h1>
            <p
              style={{
                fontSize: '15px',
                color: 'var(--color-label-secondary)',
                marginBottom: 'var(--spacing-8)',
              }}
            >
              {t('success.message')}
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="spring-emphasized"
              style={{
                width: '100%',
                height: '44px',
                padding: '0 var(--spacing-8)',
                fontSize: '17px',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                color: 'white',
                background: 'var(--color-tint)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-ambient)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = 'var(--shadow-raised)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'var(--shadow-ambient)';
              }}
            >
              {t('button.goToDashboard')}
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto var(--spacing-6)',
                background: 'var(--color-destructive)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                color: 'white',
              }}
            >
              <span role="img" aria-label="error">&#10005;</span>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(24px, 5vw, 28px)',
                color: 'var(--color-label-primary)',
                marginBottom: 'var(--spacing-4)',
              }}
            >
              {t('error.title')}
            </h1>
            <p
              style={{
                fontSize: '15px',
                color: 'var(--color-label-secondary)',
                marginBottom: 'var(--spacing-8)',
              }}
            >
              {errorMessage || t('error.message')}
            </p>
            <button
              onClick={() => router.push('/')}
              className="spring-emphasized"
              style={{
                width: '100%',
                height: '44px',
                padding: '0 var(--spacing-8)',
                fontSize: '17px',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                color: 'white',
                background: 'var(--color-tint)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-ambient)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = 'var(--shadow-raised)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'var(--shadow-ambient)';
              }}
            >
              {t('button.goToHome')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  const t = useTranslations('auth.verifyEmail');

  return (
    <Suspense fallback={
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-background)',
        }}
      >
        <div style={{ fontSize: '17px', color: 'var(--color-label-secondary)' }}>
          {t('loading.title')}
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
