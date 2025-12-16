import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseSchema } from "@/lib/seo/schemas";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Precios SimplePAES - Planes de Preparación PAES",
  description:
    "Planes de preparación PAES desde $8.000 CLP/mes. Acceso completo a +600 ejercicios PAES, tutor AI ilimitado, ensayos en vivo, y seguimiento personalizado. 7 días gratis.",
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: "Precios SimplePAES - Planes de Preparación PAES",
    description:
      "Planes desde $8.000 CLP/mes. Acceso completo a ejercicios PAES, tutor AI, y ensayos en vivo. 7 días gratis.",
    url: `${SITE_URL}/pricing`,
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={courseSchema} />
      {children}
    </>
  );
}
