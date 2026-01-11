'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuthForm } from '@/hooks/auth/useAuthForm';

interface AuthProps {
  onSuccess: (isNewUser?: boolean) => void;
}

export default function Auth({ onSuccess }: AuthProps) {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');

  const {
    // Form state
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    displayName,
    setDisplayName,
    acceptedTerms,
    setAcceptedTerms,

    // UI state
    isLogin,
    isLoading,
    isRetrying,
    error,
    showPassword,
    setShowPassword,
    isPreview,

    // Actions
    handleSubmit,
    handleQuickSignIn,
    toggleMode,
  } = useAuthForm({ onSuccess });

  return (
    <div
      className="w-full translucent spring-motion p-6 md:p-8"
      style={{
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-ambient)',
      }}
    >
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h2
          data-testid="auth-heading"
          className="text-center font-semibold mb-2"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(24px, 5vw, 28px)',
            lineHeight: '1.2',
            letterSpacing: '-0.5px',
            color: 'var(--color-label-primary)',
          }}
        >
          {isLogin ? t('login.title') : t('register.title')}
        </h2>
        <p
          className="text-center"
          style={{
            fontSize: '15px',
            color: 'var(--color-label-secondary)',
          }}
        >
          {isLogin ? t('login.noAccount') : t('register.hasAccount')}
          {' '}
          <button
            data-testid="auth-toggle-button"
            onClick={toggleMode}
            className="spring-motion"
            style={{
              fontWeight: 500,
              color: 'var(--color-link)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {isLogin ? t('login.registerFree') : t('register.login')}
          </button>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--color-label-primary)',
                marginBottom: 'var(--spacing-2)',
              }}
            >
              {isLogin ? t('login.userOrEmail') : t('register.username')}
            </label>
            <input
              id="username"
              name="username"
              data-testid="auth-username-input"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
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
              placeholder={isLogin ? t('placeholders.usernameOrEmail') : t('placeholders.username')}
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

          {/* Password Input */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2)' }}>
              <label
                htmlFor="password"
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-label-primary)',
                }}
              >
                {t('login.password')}
              </label>
              {isLogin && (
                <a
                  href="/forgot-password"
                  className="spring-motion"
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--color-link)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  {t('login.forgotPassword')}
                </a>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                name="password"
                data-testid="auth-password-input"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isLogin ? "current-password" : "new-password"}
                className="spring-motion"
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '0 var(--spacing-6)',
                  paddingRight: '44px',
                  fontSize: '17px',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-label-primary)',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-separator)',
                  borderRadius: 'var(--radius-sm)',
                  outline: 'none',
                }}
                placeholder={isLogin ? t('placeholders.password') : t('placeholders.passwordMin')}
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? t('aria.hidePassword') : t('aria.showPassword')}
                className="spring-motion"
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '0',
                  height: '44px',
                  width: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-label-tertiary)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-label-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-label-tertiary)';
                }}
              >
                {showPassword ? (
                  <EyeOff size={20} strokeWidth={2} />
                ) : (
                  <Eye size={20} strokeWidth={2} />
                )}
              </button>
            </div>
          </div>

          {/* Email Input (Register Only) */}
          {!isLogin && (
            <div>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-label-primary)',
                  marginBottom: 'var(--spacing-2)',
                }}
              >
                {t('register.email')}
              </label>
              <input
                id="email"
                name="email"
                data-testid="auth-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
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
                placeholder={t('placeholders.email')}
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
          )}

          {/* Display Name Input (Register Only) */}
          {!isLogin && (
            <div>
              <label
                htmlFor="displayName"
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-label-primary)',
                  marginBottom: 'var(--spacing-2)',
                }}
              >
                {t('register.displayName')}
              </label>
              <input
                id="displayName"
                name="displayName"
                data-testid="auth-displayname-input"
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoComplete="name"
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
                placeholder={t('placeholders.displayName')}
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
          )}

          {/* Terms and Conditions Checkbox (Register Only) */}
          {!isLogin && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <input
                id="acceptedTerms"
                name="acceptedTerms"
                data-testid="auth-terms-checkbox"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                style={{
                  width: '18px',
                  height: '18px',
                  marginTop: '2px',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              />
              <label
                htmlFor="acceptedTerms"
                style={{
                  fontSize: '13px',
                  lineHeight: '1.5',
                  color: 'var(--color-label-secondary)',
                  cursor: 'pointer',
                }}
              >
                {t('register.acceptTerms')}{' '}
                <a
                  href="/legal/terminos"
                  data-testid="auth-terms-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--color-link)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  {t('register.termsLink')}
                </a>
              </label>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              data-testid="auth-error-message"
              className="spring-motion"
              style={{
                fontSize: '15px',
                textAlign: 'center',
                color: 'var(--color-danger)',
                background: 'var(--color-fill)',
                padding: 'var(--spacing-6)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-danger)',
              }}
            >
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            data-testid="auth-submit-button"
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
            {isRetrying ? tCommon('connecting') : isLoading ? tCommon('loading') : (isLogin ? t('login.submit') : t('register.titleFree'))}
          </button>

          {/* Quick Sign-In Buttons for Preview Environments */}
          {isPreview && isLogin && (
            <div style={{ marginTop: 'var(--spacing-8)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-4)',
                  marginBottom: 'var(--spacing-4)',
                }}
              >
                <div style={{ flex: 1, height: '1px', background: 'var(--color-separator)' }} />
                <span style={{ fontSize: '12px', color: 'var(--color-label-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Preview Testing
                </span>
                <div style={{ flex: 1, height: '1px', background: 'var(--color-separator)' }} />
              </div>
              {/* Row 1: System accounts */}
              <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-3)' }}>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleQuickSignIn('paes_student', 'test123')}
                  className="spring-motion"
                  style={{
                    flex: 1,
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-label-primary)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.5 : 1,
                  }}
                >
                  PAES Student
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleQuickSignIn('teacher', 'test123')}
                  className="spring-motion"
                  style={{
                    flex: 1,
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-label-primary)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.5 : 1,
                  }}
                >
                  Teacher
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleQuickSignIn('admin', 'admin123')}
                  className="spring-motion"
                  style={{
                    flex: 1,
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-label-primary)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.5 : 1,
                  }}
                >
                  Admin
                </button>
              </div>
              {/* Row 2: Basic education */}
              <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-3)' }}>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleQuickSignIn('7basico_student', 'test123')}
                  className="spring-motion"
                  style={{
                    flex: 1,
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-label-primary)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.5 : 1,
                  }}
                >
                  7° Básico
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleQuickSignIn('8basico_student', 'test123')}
                  className="spring-motion"
                  style={{
                    flex: 1,
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-label-primary)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.5 : 1,
                  }}
                >
                  8° Básico
                </button>
              </div>
              {/* Row 3: Secondary education */}
              <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleQuickSignIn('1medio_student', 'test123')}
                  className="spring-motion"
                  style={{
                    flex: 1,
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-label-primary)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.5 : 1,
                  }}
                >
                  1° Medio
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleQuickSignIn('2medio_student', 'test123')}
                  className="spring-motion"
                  style={{
                    flex: 1,
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-label-primary)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.5 : 1,
                  }}
                >
                  2° Medio
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleQuickSignIn('3medio_student', 'test123')}
                  className="spring-motion"
                  style={{
                    flex: 1,
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-label-primary)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.5 : 1,
                  }}
                >
                  3° Medio
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleQuickSignIn('4medio_student', 'test123')}
                  className="spring-motion"
                  style={{
                    flex: 1,
                    height: '40px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-label-primary)',
                    background: 'var(--color-fill)',
                    border: '1px solid var(--color-separator)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.5 : 1,
                  }}
                >
                  4° Medio
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
