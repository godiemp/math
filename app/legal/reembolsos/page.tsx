import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { createWebPageSchema } from '@/lib/seo/schemas';
import { ReembolsosPageClient } from './ReembolsosPageClient';

export const metadata: Metadata = {
  title: 'Política de Reembolsos',
  description:
    'Política de reembolsos de SimplePAES. Derecho a retracto de 10 días, cancelación sin permanencia, y proceso de devolución.',
  alternates: {
    canonical: `${SITE_URL}/legal/reembolsos`,
  },
  openGraph: {
    title: 'Política de Reembolsos - SimplePAES',
    description:
      'Derecho a retracto de 10 días, sin permanencia mínima. Proceso de reembolso transparente.',
    type: 'website',
    url: `${SITE_URL}/legal/reembolsos`,
    siteName: SITE_NAME,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webPageSchema = createWebPageSchema({
  name: 'Política de Reembolsos SimplePAES',
  description:
    'Política de reembolsos y cancelación de suscripciones de SimplePAES.',
  url: `${SITE_URL}/legal/reembolsos`,
  breadcrumbItems: [
    { name: 'Inicio', url: SITE_URL },
    { name: 'Legal', url: `${SITE_URL}/legal/terminos` },
    { name: 'Política de Reembolsos', url: `${SITE_URL}/legal/reembolsos` },
  ],
});

export default function ReembolsosPage() {
  return (
    <>
      <JsonLd data={webPageSchema} />
      <ReembolsosPageClient />
    </>
  );
}
