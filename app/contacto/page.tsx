import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import { contactPageSchema, createBreadcrumbSchema } from '@/lib/seo/schemas';
import { ContactoPageClient } from './ContactoPageClient';

export const metadata: Metadata = {
  title: 'Contacto y Soporte',
  description:
    'Contáctanos por WhatsApp al +56 9 3133 8020 o por formulario. Respondemos en menos de 2 días hábiles. Soporte técnico, facturación y consultas.',
  alternates: {
    canonical: `${SITE_URL}/contacto`,
  },
  openGraph: {
    title: 'Contacto SimplePAES - Soporte y Ayuda',
    description:
      'Contáctanos por WhatsApp o formulario. Respondemos en menos de 2 días hábiles.',
    type: 'website',
    url: `${SITE_URL}/contacto`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary',
    title: 'Contacto SimplePAES',
    description: 'Soporte técnico y consultas. Respondemos en menos de 2 días hábiles.',
  },
};

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Inicio', url: SITE_URL },
  { name: 'Contacto', url: `${SITE_URL}/contacto` },
]);

export default function ContactoPage() {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ContactoPageClient />
    </>
  );
}
