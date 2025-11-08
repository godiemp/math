import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

export function Spinner({ size = 'md', variant = 'primary' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xl',
    md: 'w-16 h-16 text-4xl',
    lg: 'w-24 h-24 text-6xl',
  };

  const containerSizes = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`relative ${containerSizes[size]}`}>
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#0A84FF]/20 dark:border-[#0A84FF]/30 animate-spin" style={{ animationDuration: '3s' }}></div>

        {/* Math symbols orbiting */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeClasses[size]}`}>
            <span className="inline-block animate-pulse" style={{ animationDuration: '2s' }}>π</span>
          </div>
        </div>

        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }}>
          <div className={`absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 ${sizeClasses[size]}`}>
            <span className="inline-block animate-pulse" style={{ animationDuration: '2.5s' }}>√</span>
          </div>
        </div>

        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s' }}>
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 ${sizeClasses[size]}`}>
            <span className="inline-block animate-pulse" style={{ animationDuration: '3s' }}>∫</span>
          </div>
        </div>

        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '5.5s', animationDirection: 'reverse' }}>
          <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 ${sizeClasses[size]}`}>
            <span className="inline-block animate-pulse" style={{ animationDuration: '2.8s' }}>Σ</span>
          </div>
        </div>

        {/* Center rotating symbol */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeClasses[size]} animate-spin`} style={{ animationDuration: '2s' }}>
          <span className={variant === 'primary' ? 'text-[#0A84FF]' : 'text-[#5E5CE6]'}>∞</span>
        </div>
      </div>
    </div>
  );
}

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Cargando...' }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F7F7] via-[#FAFAFA] to-[#F0F0F0] dark:from-[#000000] dark:via-[#0A0A0A] dark:to-[#000000] flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient orbs in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0A84FF]/5 dark:bg-[#0A84FF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#5E5CE6]/5 dark:bg-[#5E5CE6]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      </div>

      {/* Main content */}
      <div className="text-center relative z-10 animate-fadeIn px-6">
        {/* Spinner with glow effect */}
        <div className="relative inline-block">
          {/* Glow effect */}
          <div className="absolute inset-0 blur-2xl opacity-20">
            <Spinner size="lg" variant="primary" />
          </div>
          {/* Actual spinner */}
          <div className="relative">
            <Spinner size="lg" variant="primary" />
          </div>
        </div>

        {/* Message with animated dots */}
        <div className="mt-8 space-y-3">
          <p className="text-xl font-semibold text-black/80 dark:text-white/90 tracking-tight animate-fadeIn">
            {message}
          </p>

          {/* Animated progress dots */}
          <div className="flex items-center justify-center gap-2 h-6">
            <div className="w-2 h-2 rounded-full bg-[#0A84FF] animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }}></div>
            <div className="w-2 h-2 rounded-full bg-[#0A84FF] animate-bounce" style={{ animationDelay: '150ms', animationDuration: '1s' }}></div>
            <div className="w-2 h-2 rounded-full bg-[#0A84FF] animate-bounce" style={{ animationDelay: '300ms', animationDuration: '1s' }}></div>
          </div>

          {/* Subtle hint text */}
          <p className="text-sm text-black/40 dark:text-white/40 animate-fadeIn" style={{ animationDelay: '200ms' }}>
            Un momento por favor
          </p>
        </div>
      </div>

    </div>
  );
}
