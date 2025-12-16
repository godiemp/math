import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de SimplePAES. Cómo protegemos tus datos personales según la Ley 19.628 de Chile.",
  alternates: {
    canonical: `${SITE_URL}/legal/privacidad`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbs = createBreadcrumbSchema([
  { name: "Inicio", url: SITE_URL },
  { name: "Legal", url: `${SITE_URL}/legal` },
  { name: "Política de Privacidad", url: `${SITE_URL}/legal/privacidad` },
]);

export default function PrivacidadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
