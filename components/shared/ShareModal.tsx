'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui';
import { MessageCircle, Link as LinkIcon, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export type SharePlatform = 'whatsapp' | 'copy';

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

const platformConfig: Record<SharePlatform, {
  name: string;
  subtext?: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  textColor: string;
  generateUrl: (data: ShareModalData) => string;
}> = {
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
    name: 'Copiar link',
    subtext: 'Para Instagram, Discord, Telegram',
    icon: LinkIcon,
    bgColor: 'bg-black/[0.08] dark:bg-white/[0.12] hover:bg-black/[0.12] dark:hover:bg-white/[0.16]',
    textColor: 'text-black dark:text-white',
    generateUrl: () => ''
  }
};

export function ShareModal({
  isOpen,
  onClose,
  data,
  platforms = ['whatsapp', 'copy']
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  // Get full URL with origin
  const getFullUrl = () => {
    const url = data.url;
    // If URL is relative, prepend origin
    if (url.startsWith('/')) {
      return `${window.location.origin}${url}`;
    }
    return url;
  };

  const handleShare = (platform: SharePlatform) => {
    if (platform === 'copy') {
      handleCopyLink();
      return;
    }

    const config = platformConfig[platform];
    // Pass data with full URL for share links
    const fullData = { ...data, url: getFullUrl() };
    const url = config.generateUrl(fullData);
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
    toast.success('Compartido');
  };

  const handleCopyLink = async () => {
    try {
      const fullUrl = getFullUrl();
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success('Copiado');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm" title="">
      {/* Minimal Session Info */}
      {data.sessionName && (
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">📝</div>
          <Heading level={3} size="sm" className="mb-2">
            {data.sessionName}
          </Heading>
          {data.sessionDate && data.sessionTime && (
            <Text size="sm" variant="secondary">
              {data.sessionDate} • {data.sessionTime}
            </Text>
          )}
          {data.registeredCount !== undefined && data.registeredCount > 0 && (
            <Text size="sm" variant="secondary" className="mt-2">
              {data.registeredCount} ya {data.registeredCount === 1 ? 'va' : 'van'} 🔥
            </Text>
          )}
        </div>
      )}

      {/* Action Buttons - Big and Minimal */}
      <div className="space-y-3">
        {platforms.map((platform) => {
          const config = platformConfig[platform];
          const Icon = config.icon;
          const isCopy = platform === 'copy';

          return (
            <button
              key={platform}
              onClick={() => handleShare(platform)}
              className={cn(
                'w-full flex flex-col items-center justify-center gap-1 p-4 rounded-2xl font-semibold transition-all duration-200',
                'active:scale-98',
                config.bgColor,
                config.textColor,
                isCopy ? '' : 'shadow-lg hover:shadow-xl'
              )}
            >
              {isCopy && copied ? (
                <>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>Copiado</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{config.name}</span>
                  </div>
                  {config.subtext && (
                    <Text size="xs" variant="secondary" className="opacity-70">
                      {config.subtext}
                    </Text>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* URL Display - Minimal */}
      <div className="mt-6 p-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] text-center">
        <Text size="xs" variant="secondary" className="break-all font-mono">
          {getFullUrl()}
        </Text>
      </div>
    </Modal>
  );
}
