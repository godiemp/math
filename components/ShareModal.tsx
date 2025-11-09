'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui';
import { Twitter, Facebook, MessageCircle, Link as LinkIcon, Copy, Check, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export type SharePlatform = 'twitter' | 'facebook' | 'whatsapp' | 'copy';

export interface ShareModalData {
  title: string;
  message: string;
  url: string;
  hashtags?: string[];
  // Live session specific
  sessionName?: string;
  sessionLevel?: string;
  sessionDate?: string;
  sessionTime?: string;
  registeredCount?: number;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ShareModalData;
  platforms?: SharePlatform[];
}

const platformConfig = {
  twitter: {
    name: 'Twitter/X',
    icon: Twitter,
    bgColor: 'bg-black hover:bg-black/90',
    textColor: 'text-white',
    generateUrl: (data: ShareModalData) => {
      const params = new URLSearchParams();
      params.append('text', data.message);
      params.append('url', data.url);
      if (data.hashtags?.length) params.append('hashtags', data.hashtags.join(','));
      return `https://twitter.com/intent/tweet?${params.toString()}`;
    }
  },
  facebook: {
    name: 'Facebook',
    icon: Facebook,
    bgColor: 'bg-[#1877F2] hover:bg-[#1877F2]/90',
    textColor: 'text-white',
    generateUrl: (data: ShareModalData) => {
      const params = new URLSearchParams({ u: data.url });
      params.append('quote', data.message);
      return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
    }
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: MessageCircle,
    bgColor: 'bg-[#25D366] hover:bg-[#25D366]/90',
    textColor: 'text-white',
    generateUrl: (data: ShareModalData) => {
      const text = `${data.message}\n\n${data.url}`;
      return `https://wa.me/?text=${encodeURIComponent(text)}`;
    }
  },
  copy: {
    name: 'Copiar enlace',
    icon: LinkIcon,
    bgColor: 'bg-[#5E5CE6] hover:bg-[#5E5CE6]/90',
    textColor: 'text-white',
    generateUrl: () => ''
  }
};

export function ShareModal({
  isOpen,
  onClose,
  data,
  platforms = ['whatsapp', 'twitter', 'facebook', 'copy']
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: SharePlatform) => {
    if (platform === 'copy') {
      handleCopyLink();
      return;
    }

    const config = platformConfig[platform];
    const url = config.generateUrl(data);
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
    toast.success(`Compartiendo en ${config.name}`);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(data.url);
      setCopied(true);
      toast.success('¡Enlace copiado al portapapeles!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Error al copiar el enlace');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md" title={data.title}>
      {/* Session Details Card */}
      {data.sessionName && (
        <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-[#5E5CE6] to-[#0A84FF] text-white">
          <div className="text-center">
            <div className="text-4xl mb-3">📝</div>
            <Heading level={3} size="xs" className="text-white mb-2">
              {data.sessionName}
            </Heading>
            {data.sessionLevel && (
              <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-3">
                {data.sessionLevel}
              </div>
            )}
            <div className="space-y-1 mt-3">
              {data.sessionDate && (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-white/90">📅</span>
                  <Text size="sm" className="text-white">
                    {data.sessionDate}
                  </Text>
                </div>
              )}
              {data.sessionTime && (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-white/90">⏰</span>
                  <Text size="sm" className="text-white">
                    {data.sessionTime} hrs
                  </Text>
                </div>
              )}
              {data.registeredCount !== undefined && data.registeredCount > 0 && (
                <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-white/20">
                  <Users className="w-4 h-4 text-white/90" />
                  <Text size="sm" className="text-white font-semibold">
                    {data.registeredCount} {data.registeredCount === 1 ? 'estudiante registrado' : 'estudiantes registrados'}
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Share Message Preview */}
      <div className="mb-6">
        <Text size="xs" variant="secondary" className="mb-2 font-semibold uppercase tracking-wider">
          Mensaje para compartir
        </Text>
        <div className="p-4 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.08]">
          <Text size="sm" className="whitespace-pre-line">
            {data.message}
          </Text>
          <div className="mt-3 pt-3 border-t border-black/[0.08] dark:border-white/[0.08]">
            <Text size="xs" variant="secondary" className="break-all">
              🔗 {data.url}
            </Text>
          </div>
        </div>
      </div>

      {/* Social Media Buttons */}
      <div className="mb-6">
        <Text size="xs" variant="secondary" className="mb-3 font-semibold uppercase tracking-wider">
          Compartir en
        </Text>
        <div className="grid grid-cols-2 gap-3">
          {platforms.map((platform) => {
            const config = platformConfig[platform];
            const Icon = config.icon;
            const isCopy = platform === 'copy';

            return (
              <button
                key={platform}
                onClick={() => handleShare(platform)}
                className={cn(
                  'flex items-center justify-center gap-3 p-4 rounded-xl font-semibold transition-all duration-200',
                  'active:scale-95',
                  config.bgColor,
                  config.textColor,
                  'shadow-lg hover:shadow-xl'
                )}
              >
                {isCopy && copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
                <span>{isCopy && copied ? '¡Copiado!' : config.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Copy Link Button (Quick Access) */}
      <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08]">
        <button
          onClick={handleCopyLink}
          className={cn(
            'w-full flex items-center justify-center gap-2 p-3 rounded-xl transition-all duration-200',
            'bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12]',
            'border border-black/[0.08] dark:border-white/[0.08]'
          )}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#34C759]" />
              <Text size="sm" className="font-semibold text-[#34C759]">
                ¡Enlace copiado!
              </Text>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <Text size="sm" className="font-semibold">
                Copiar enlace directo
              </Text>
            </>
          )}
        </button>
      </div>

      {/* Help Text */}
      <div className="mt-4 text-center">
        <Text size="xs" variant="secondary">
          💡 Invita a tus amigos y estudien juntos para la PAES
        </Text>
      </div>
    </Modal>
  );
}
