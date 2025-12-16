import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

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

export default function ReembolsosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
