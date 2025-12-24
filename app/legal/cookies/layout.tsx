import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Información sobre las cookies utilizadas en SimplePAES, plataforma de matemáticas para enseñanza media.",
  alternates: {
    canonical: `${SITE_URL}/legal/cookies`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbs = createBreadcrumbSchema([
  { name: "Inicio", url: SITE_URL },
  { name: "Legal", url: `${SITE_URL}/legal` },
  { name: "Política de Cookies", url: `${SITE_URL}/legal/cookies` },
]);

export default function CookiesLayout({
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
