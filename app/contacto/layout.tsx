import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  contactPageSchema,
  createBreadcrumbSchema,
} from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Contacto SimplePAES - Soporte y Ayuda",
  description:
    "Contacta al equipo de SimplePAES. WhatsApp +56 9 3133 8020, formulario de contacto, y soporte por email. Estamos para ayudarte con tu preparación PAES.",
  alternates: {
    canonical: `${SITE_URL}/contacto`,
  },
  openGraph: {
    title: "Contacto SimplePAES - Soporte y Ayuda",
    description:
      "Contacta al equipo de SimplePAES. WhatsApp, formulario de contacto, y soporte por email.",
    url: `${SITE_URL}/contacto`,
  },
};

const breadcrumbs = createBreadcrumbSchema([
  { name: "Inicio", url: SITE_URL },
  { name: "Contacto", url: `${SITE_URL}/contacto` },
]);

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
