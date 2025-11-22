'use client';

import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link as LinkIcon, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export type SharePlatform = 'twitter' | 'facebook' | 'linkedin' | 'whatsapp' | 'copy';

export interface ShareData {
  title?: string;
  text: string;
  url?: string;
  hashtags?: string[]; // For Twitter
}

interface ShareButtonProps {
  shareData: ShareData;
  platforms?: SharePlatform[];
  variant?: 'button' | 'menu';
  buttonText?: string;
  buttonVariant?: 'primary' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const platformConfig = {
  twitter: {
    name: 'Twitter/X',
    icon: Twitter,
    color: 'hover:bg-black/10 dark:hover:bg-white/10',
    generateUrl: (data: ShareData) => {
      const params = new URLSearchParams();
      if (data.text) params.append('text', data.text);
      if (data.url) params.append('url', data.url);
      if (data.hashtags?.length) params.append('hashtags', data.hashtags.join(','));
      return `https://twitter.com/intent/tweet?${params.toString()}`;
    }
  },
  facebook: {
    name: 'Facebook',
    icon: Facebook,
    color: 'hover:bg-[#1877F2]/10',
    generateUrl: (data: ShareData) => {
      const url = data.url || window.location.href;
      const params = new URLSearchParams({ u: url });
      if (data.text) params.append('quote', data.text);
      return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
    }
  },
  linkedin: {
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'hover:bg-[#0A66C2]/10',
    generateUrl: (data: ShareData) => {
      const url = data.url || window.location.href;
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    }
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: MessageCircle,
    color: 'hover:bg-[#25D366]/10',
    generateUrl: (data: ShareData) => {
      const text = `${data.text}${data.url ? `\n${data.url}` : ''}`;
      return `https://wa.me/?text=${encodeURIComponent(text)}`;
    }
  },
  copy: {
    name: 'Copiar enlace',
    icon: LinkIcon,
    color: 'hover:bg-blue-500/10',
    generateUrl: () => '' // Copy doesn't use URL
  }
};

export function ShareButton({
  shareData,
  platforms = ['twitter', 'facebook', 'whatsapp', 'copy'],
  variant = 'button',
  buttonText = 'Compartir',
  buttonVariant = 'ghost',
  size = 'md',
  className
}: ShareButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if Web Share API is available
  const canUseWebShare = typeof navigator !== 'undefined' && navigator.share;

  const handleWebShare = async () => {
    if (!canUseWebShare) return;

    try {
      await navigator.share({
        title: shareData.title,
        text: shareData.text,
        url: shareData.url || window.location.href,
      });
      toast.success('¡Compartido exitosamente!');
    } catch (error) {
      // User cancelled or error occurred
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error sharing:', error);
        toast.error('Error al compartir');
      }
    }
  };

  const handlePlatformShare = (platform: SharePlatform) => {
    if (platform === 'copy') {
      handleCopyLink();
      return;
    }

    const config = platformConfig[platform];
    const url = config.generateUrl(shareData);
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
    setIsMenuOpen(false);
    toast.success(`Compartiendo en ${config.name}`);
  };

  const handleCopyLink = async () => {
    const url = shareData.url || window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('¡Enlace copiado al portapapeles!');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Error al copiar el enlace');
    }
  };

  // If Web Share API is available on mobile, use it
  if (variant === 'button' && canUseWebShare) {
    return (
      <Button
        variant={buttonVariant}
        size={size}
        onClick={handleWebShare}
        className={cn('gap-2', className)}
      >
        <Share2 className="w-4 h-4" />
        {buttonText}
      </Button>
    );
  }

  // Desktop fallback: show menu with platform options
  if (variant === 'button') {
    return (
      <div className="relative">
        <Button
          variant={buttonVariant}
          size={size}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={cn('gap-2', className)}
        >
          <Share2 className="w-4 h-4" />
          {buttonText}
        </Button>

        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu */}
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-[#1C1C1E] shadow-lg border border-black/10 dark:border-white/10 z-50 overflow-hidden">
              <div className="py-1">
                {platforms.map((platform) => {
                  const config = platformConfig[platform];
                  const Icon = config.icon;
                  return (
                    <button
                      key={platform}
                      onClick={() => handlePlatformShare(platform)}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 text-sm text-left',
                        'transition-colors',
                        config.color,
                        'text-black dark:text-white'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{config.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Menu variant: just show the icons inline
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {platforms.map((platform) => {
        const config = platformConfig[platform];
        const Icon = config.icon;
        return (
          <button
            key={platform}
            onClick={() => handlePlatformShare(platform)}
            className={cn(
              'p-2 rounded-lg transition-all',
              'active:scale-95',
              config.color,
              'text-black dark:text-white'
            )}
            title={`Compartir en ${config.name}`}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
}

// Utility function to generate common share messages
export function generateShareMessage(type: 'quiz' | 'streak' | 'skill' | 'session', data: any): ShareData {
  switch (type) {
    case 'quiz':
      return {
        text: `¡Obtuve ${data.correct}/${data.total} en PAES Matemáticas ${data.level}! 📊`,
        url: data.url,
        hashtags: ['PAESChile', 'Matemáticas']
      };

    case 'streak':
      return {
        text: `¡Llevo ${data.streak} días de racha en PAES Matemáticas! 🔥`,
        url: data.url,
        hashtags: ['PAESChile', 'Estudio']
      };

    case 'skill':
      return {
        text: `¡Dominé la habilidad "${data.skillName}" en PAES Matemáticas! 🎓`,
        url: data.url,
        hashtags: ['PAESChile', 'Aprendizaje']
      };

    case 'session':
      return {
        text: `Completé el Ensayo PAES - Posición #${data.position}/${data.total} 🏆`,
        url: data.url,
        hashtags: ['PAESChile', 'Ensayo']
      };

    default:
      return {
        text: '¡Practica PAES Matemáticas conmigo!',
        url: data.url
      };
  }
}
