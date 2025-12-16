import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Política de Reembolsos",
  description:
    "Política de reembolsos y derecho a retracto de SimplePAES según la Ley del Consumidor de Chile. 10 días para solicitar reembolso completo.",
  alternates: {
    canonical: `${SITE_URL}/legal/reembolsos`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbs = createBreadcrumbSchema([
  { name: "Inicio", url: SITE_URL },
  { name: "Legal", url: `${SITE_URL}/legal` },
  { name: "Política de Reembolsos", url: `${SITE_URL}/legal/reembolsos` },
]);

export default function ReembolsosLayout({
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
