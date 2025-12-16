import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Información sobre las cookies utilizadas en SimplePAES, plataforma de preparación PAES de Matemática.",
  alternates: {
    canonical: `${SITE_URL}/legal/cookies`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
