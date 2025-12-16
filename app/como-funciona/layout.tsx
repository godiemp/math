import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { howToSchema, courseSchema } from "@/lib/seo/schemas";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cómo Funciona SimplePAES - Preparación PAES Personalizada",
  description:
    "Descubre cómo SimplePAES te prepara para la PAES de Matemática con práctica basada en datos, feedback inmediato, y seguimiento de progreso personalizado. +600 ejercicios del temario oficial.",
  alternates: {
    canonical: `${SITE_URL}/como-funciona`,
  },
  openGraph: {
    title: "Cómo Funciona SimplePAES - Preparación PAES Personalizada",
    description:
      "Descubre cómo SimplePAES te prepara para la PAES con práctica basada en datos y feedback inmediato.",
    url: `${SITE_URL}/como-funciona`,
  },
};

export default function ComoFuncionaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={howToSchema} />
      <JsonLd data={courseSchema} />
      {children}
    </>
  );
}
