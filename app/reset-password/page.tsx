'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { resetPassword } from '@/lib/auth';
import { useTranslations } from 'next-intl';

function ResetPasswordForm() {
  const t = useTranslations('auth.resetPassword');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toast.error(t('errors.invalidToken'));
    }
  }, [searchParams, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!token) {
        toast.error(t('errors.invalidToken'));
        setIsLoading(false);
        return;
      }

      if (!password || !confirmPassword) {
        toast.error(t('errors.completeFields'));
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        toast.error(t('errors.passwordLength'));
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        toast.error(t('errors.passwordMismatch'));
        setIsLoading(false);
        return;
      }

      const result = await resetPassword(token, password);

      if (result.success) {
        setResetSuccess(true);
        toast.success(t('toast.success'));
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        toast.error(result.error || t('toast.error'));
      }
    } catch (error) {
      toast.error(t('errors.connection'));
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
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
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(24px, 5vw, 28px)',
              color: 'var(--color-label-primary)',
              marginBottom: 'var(--spacing-4)',
            }}
          >
            {t('invalid.title')}
          </h1>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--color-label-secondary)',
              marginBottom: 'var(--spacing-8)',
            }}
          >
            {t('invalid.message')}
          </p>
          <button
            onClick={() => router.push('/forgot-password')}
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
          >
            {t('button.requestNew')}
          </button>
        </div>
      </div>
    );
  }

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
        }}
      >
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1
            className="text-center font-semibold mb-2"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(24px, 5vw, 28px)',
              lineHeight: '1.2',
              letterSpacing: '-0.5px',
              color: 'var(--color-label-primary)',
            }}
          >
            {resetSuccess ? t('titleDone') : t('titleNewPassword')}
          </h1>
          <p
            className="text-center"
            style={{
              fontSize: '15px',
              color: 'var(--color-label-secondary)',
            }}
          >
            {resetSuccess
              ? t('subtitleSuccess')
              : t('subtitleEnter')}
          </p>
        </div>

        {!resetSuccess ? (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--color-label-primary)',
                    marginBottom: 'var(--spacing-2)',
                  }}
                >
                  {t('label.newPassword')}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="spring-motion"
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 var(--spacing-6)',
                    fontSize: '17px',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-label-primary)',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-separator)',
                    borderRadius: 'var(--radius-sm)',
                    outline: 'none',
                  }}
                  placeholder={t('placeholder.newPassword')}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-tint)';
                    e.target.style.borderWidth = '2px';
                    e.target.style.boxShadow = 'var(--shadow-ambient)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-separator)';
                    e.target.style.borderWidth = '1px';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--color-label-primary)',
                    marginBottom: 'var(--spacing-2)',
                  }}
                >
                  {t('label.confirmPassword')}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className="spring-motion"
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 var(--spacing-6)',
                    fontSize: '17px',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-label-primary)',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-separator)',
                    borderRadius: 'var(--radius-sm)',
                    outline: 'none',
                  }}
                  placeholder={t('placeholder.confirmPassword')}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-tint)';
                    e.target.style.borderWidth = '2px';
                    e.target.style.boxShadow = 'var(--shadow-ambient)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-separator)';
                    e.target.style.borderWidth = '1px';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Password Requirements */}
              <div
                style={{
                  fontSize: '13px',
                  color: 'var(--color-label-secondary)',
                  background: 'var(--color-fill)',
                  padding: 'var(--spacing-4)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                {t('requirement')}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="spring-emphasized"
                style={{
                  width: '100%',
                  height: '44px',
                  marginTop: 'var(--spacing-4)',
                  padding: '0 var(--spacing-8)',
                  fontSize: '17px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  color: 'white',
                  background: isLoading ? 'var(--color-separator)' : 'var(--color-tint)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: 'var(--shadow-ambient)',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-raised)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-ambient)';
                  }
                }}
                onMouseDown={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'scale(0.98)';
                  }
                }}
                onMouseUp={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
              >
                {isLoading ? t('button.resetting') : t('button.reset')}
              </button>
            </div>
          </form>
        ) : (
          <div>
            {/* Success Message */}
            <div
              className="spring-motion"
              style={{
                fontSize: '15px',
                textAlign: 'center',
                color: 'var(--color-success)',
                background: 'var(--color-fill)',
                padding: 'var(--spacing-8)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-success)',
                marginBottom: 'var(--spacing-8)',
              }}
            >
              {t('successMessage')}
            </div>

            {/* Manual Redirect Button */}
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
              {t('button.goToLogin')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  const t = useTranslations('auth.resetPassword');

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
          {t('loading')}
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
