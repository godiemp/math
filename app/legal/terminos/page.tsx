import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { createWebPageSchema } from '@/lib/seo/schemas';
import { TerminosPageClient } from './TerminosPageClient';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description:
    'Términos y condiciones de uso de SimplePAES. Información sobre planes, pagos, derecho a retracto de 10 días, y derechos del consumidor en Chile.',
  alternates: {
    canonical: `${SITE_URL}/legal/terminos`,
  },
  openGraph: {
    title: 'Términos y Condiciones - SimplePAES',
    description:
      'Términos de uso, políticas de pago, derecho a retracto y derechos del consumidor.',
    type: 'website',
    url: `${SITE_URL}/legal/terminos`,
    siteName: SITE_NAME,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const webPageSchema = createWebPageSchema({
  name: 'Términos y Condiciones SimplePAES',
  description:
    'Términos y condiciones de uso de la plataforma SimplePAES.',
  url: `${SITE_URL}/legal/terminos`,
  breadcrumbItems: [
    { name: 'Inicio', url: SITE_URL },
    { name: 'Legal', url: `${SITE_URL}/legal/terminos` },
    { name: 'Términos y Condiciones', url: `${SITE_URL}/legal/terminos` },
  ],
});

export default function TerminosPage() {
  return (
    <>
      <JsonLd data={webPageSchema} />
      <TerminosPageClient />
    </>
  );
}
