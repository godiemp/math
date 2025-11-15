'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { logoutUser } from '@/lib/auth';
import { Button, Heading, Text, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showUserInfo?: boolean;
  showLogout?: boolean;
  showAdmin?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = false,
  showUserInfo = true,
  showLogout = true,
  showAdmin = true,
  children,
  className,
}) => {
  const router = useRouter();
  const { user, setUser, isAdmin } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    router.push('/');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className={cn(
        // Sticky positioning
        'sticky top-0 z-30',
        // Variable blur material
        'backdrop-blur-[20px]',
        'bg-white/80 dark:bg-[#121212]/80',
        // Border
        'border-b border-black/[0.12] dark:border-white/[0.16]',
        // Increased saturation
        'saturate-[1.2]',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          {/* Left side - Title or Back Button */}
          <div className="flex items-center gap-3">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#0A84FF] hover:text-[#0A84FF]/80 transition-colors duration-[180ms]"
              >
                ← Volver
              </button>
            )}
            {title && !showBackButton && (
              <Heading level={1} size="xs" className="text-[#0A84FF] text-sm sm:text-base">
                {title}
              </Heading>
            )}
          </div>

          {/* Right side - User info and actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {showUserInfo && user && (
              <div className="flex items-center gap-2">
                <Text size="sm" variant="secondary" className="text-xs sm:text-sm">
                  {user.displayName || user.username || 'Usuario'}
                </Text>
                {isAdmin && (
                  <Badge variant="info" size="sm" className="text-[10px] sm:text-xs">
                    Admin
                  </Badge>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2 ml-auto sm:ml-0">
              {children}
              {showAdmin && isAdmin && (
                <Button
                  variant="secondary"
                  onClick={() => router.push('/admin')}
                  className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
                >
                  Admin
                </Button>
              )}
              {showLogout && (
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
                >
                  Salir
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PageHeader.displayName = 'PageHeader';
