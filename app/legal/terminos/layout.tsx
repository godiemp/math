import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso de SimplePAES, plataforma de matemáticas para enseñanza media y PAES en Chile.",
  alternates: {
    canonical: `${SITE_URL}/legal/terminos`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbs = createBreadcrumbSchema([
  { name: "Inicio", url: SITE_URL },
  { name: "Legal", url: `${SITE_URL}/legal` },
  { name: "Términos y Condiciones", url: `${SITE_URL}/legal/terminos` },
]);

export default function TerminosLayout({
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
