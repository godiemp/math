import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { createWebPageSchema } from '@/lib/seo/schemas';
import { CookiesPageClient } from './CookiesPageClient';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description:
    'Política de cookies de SimplePAES. Información sobre cookies esenciales, de funcionalidad y análisis que utilizamos.',
  alternates: {
    canonical: `${SITE_URL}/legal/cookies`,
  },
  openGraph: {
    title: 'Política de Cookies - SimplePAES',
    description:
      'Información sobre las cookies y tecnologías similares que utilizamos.',
    type: 'website',
    url: `${SITE_URL}/legal/cookies`,
    siteName: SITE_NAME,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webPageSchema = createWebPageSchema({
  name: 'Política de Cookies SimplePAES',
  description:
    'Política de cookies y almacenamiento local de SimplePAES.',
  url: `${SITE_URL}/legal/cookies`,
  breadcrumbItems: [
    { name: 'Inicio', url: SITE_URL },
    { name: 'Legal', url: `${SITE_URL}/legal/terminos` },
    { name: 'Política de Cookies', url: `${SITE_URL}/legal/cookies` },
  ],
});

export default function CookiesPage() {
  return (
    <>
      <JsonLd data={webPageSchema} />
      <CookiesPageClient />
    </>
  );
}
