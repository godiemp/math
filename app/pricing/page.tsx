import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  pricingProductSchema,
  createBreadcrumbSchema,
  courseSchema,
} from '@/lib/seo/schemas';
import { PricingPageClient } from './PricingPageClient';

export const metadata: Metadata = {
  title: 'Precios - Planes Premium',
  description:
    'Suscríbete a SimplePAES desde $8.000 CLP/mes. Acceso a +900 ejercicios PAES, Tutor AI 24/7, ensayos en vivo, y 7 días gratis de prueba. Sin permanencia.',
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: 'Precios SimplePAES - Planes para Estudiantes e Instituciones',
    description:
      'Plan Premium desde $8.000 CLP/mes con 7 días gratis. +900 ejercicios, Tutor AI, ensayos en vivo. Sin permanencia mínima.',
    type: 'website',
    url: `${SITE_URL}/pricing`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Precios SimplePAES - Matemáticas Enseñanza Media',
    description:
      'Plan Premium desde $8.000 CLP/mes con 7 días gratis. +900 ejercicios y Tutor AI.',
  },
};

const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Inicio', url: SITE_URL },
  { name: 'Precios', url: `${SITE_URL}/pricing` },
]);

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pricingProductSchema} />
      <JsonLd data={courseSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PricingPageClient />
    </>
  );
}
