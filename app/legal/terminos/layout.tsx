import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso de SimplePAES, plataforma de preparación PAES de Matemática en Chile.",
  alternates: {
    canonical: `${SITE_URL}/legal/terminos`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TerminosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
