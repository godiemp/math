import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ children, className }) => {
  return (
    <nav
      className={cn(
        // Sticky positioning
        'sticky top-0 z-30',
        // Variable blur material
        'backdrop-blur-[20px]',
        // Border
        'border-b',
        // Increased saturation
        'saturate-[1.2]',
        // Custom className
        className
      )}
      style={{
        background: 'color-mix(in srgb, var(--color-surface) 80%, transparent)',
        borderColor: 'var(--color-separator)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        {children}
      </div>
    </nav>
  );
};

Navbar.displayName = 'Navbar';

// NavbarLink component for back links
interface NavbarLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavbarLink: React.FC<NavbarLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-[15px] font-medium transition-colors duration-[180ms] hover:opacity-80"
      style={{ color: 'var(--color-link)' }}
    >
      {children}
    </Link>
  );
};

NavbarLink.displayName = 'NavbarLink';
