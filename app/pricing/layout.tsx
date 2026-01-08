import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { courseSchema } from "@/lib/seo/schemas";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Precios SimplePAES - Matemáticas Enseñanza Media + PAES",
  description:
    "Matemáticas de 7° Básico a 4° Medio desde $8.000 CLP/mes. +900 ejercicios, tutor AI ilimitado, y preparación PAES. 7 días gratis.",
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: "Precios SimplePAES - Matemáticas Enseñanza Media + PAES",
    description:
      "Matemáticas enseñanza media desde $8.000 CLP/mes. +900 ejercicios, tutor AI, y preparación PAES. 7 días gratis.",
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
