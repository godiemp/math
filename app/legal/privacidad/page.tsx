import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { createWebPageSchema } from '@/lib/seo/schemas';
import { PrivacidadPageClient } from './PrivacidadPageClient';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de privacidad de SimplePAES. Cómo recopilamos, usamos y protegemos tus datos personales según la Ley 19.628 de Chile.',
  alternates: {
    canonical: `${SITE_URL}/legal/privacidad`,
  },
  openGraph: {
    title: 'Política de Privacidad - SimplePAES',
    description:
      'Información sobre recopilación, uso y protección de datos personales.',
    type: 'website',
    url: `${SITE_URL}/legal/privacidad`,
    siteName: SITE_NAME,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webPageSchema = createWebPageSchema({
  name: 'Política de Privacidad SimplePAES',
  description:
    'Política de privacidad y protección de datos personales de SimplePAES.',
  url: `${SITE_URL}/legal/privacidad`,
  breadcrumbItems: [
    { name: 'Inicio', url: SITE_URL },
    { name: 'Legal', url: `${SITE_URL}/legal/terminos` },
    { name: 'Política de Privacidad', url: `${SITE_URL}/legal/privacidad` },
  ],
});

export default function PrivacidadPage() {
  return (
    <>
      <JsonLd data={webPageSchema} />
      <PrivacidadPageClient />
    </>
  );
}
