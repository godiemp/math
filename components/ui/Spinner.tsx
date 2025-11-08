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
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-[#000000] flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-6 text-lg font-medium text-black/60 dark:text-white/60">
          {message}
        </p>
      </div>
    </div>
  );
}
