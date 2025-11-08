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
    <div className="min-h-screen bg-white dark:bg-[#000000] flex items-center justify-center relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A84FF]/[0.02] to-transparent dark:via-[#0A84FF]/[0.04]"></div>

      {/* Main content card */}
      <div className="text-center relative z-10 px-6 max-w-md">
        {/* Clean spinner container */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Subtle outer ring */}
            <div className="w-20 h-20 rounded-full border-2 border-[#0A84FF]/10 dark:border-[#0A84FF]/20"></div>

            {/* Animated spinner ring */}
            <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-transparent border-t-[#0A84FF] animate-spin"></div>

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl animate-pulse" style={{ animationDuration: '2s' }}>π</span>
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-3 tracking-tight">
          {message}
        </h2>

        {/* Simple progress indicator */}
        <div className="flex justify-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0A84FF]/40 animate-pulse" style={{ animationDelay: '0ms', animationDuration: '1.5s' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#0A84FF]/60 animate-pulse" style={{ animationDelay: '200ms', animationDuration: '1.5s' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#0A84FF] animate-pulse" style={{ animationDelay: '400ms', animationDuration: '1.5s' }}></div>
        </div>
      </div>
    </div>
  );
}
