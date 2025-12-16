import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const disallowedPaths = [
  "/api/",
  "/admin/",
  "/dashboard/",
  "/profile/",
  "/practice/",
  "/learn/",
  "/live-practice/",
  "/payment/",
  "/payments/",
  "/progress/",
  "/lessons/",
  "/mini-lessons/",
  "/curriculum/",
  "/forgot-password/",
  "/reset-password/",
];

const publicPaths = ["/", "/como-funciona", "/pricing", "/contacto", "/legal/", "/blog/", "/llms.txt"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: publicPaths.filter(p => p !== "/llms.txt"),
        disallow: disallowedPaths,
      },
      // AI crawlers - explicitly allow public content, block protected routes
      {
        userAgent: "GPTBot",
        allow: publicPaths,
        disallow: disallowedPaths,
      },
      {
        userAgent: "ChatGPT-User",
        allow: publicPaths,
        disallow: disallowedPaths,
      },
      {
        userAgent: "anthropic-ai",
        allow: publicPaths,
        disallow: disallowedPaths,
      },
      {
        userAgent: "Claude-Web",
        allow: publicPaths,
        disallow: disallowedPaths,
      },
      {
        userAgent: "PerplexityBot",
        allow: publicPaths,
        disallow: disallowedPaths,
      },
      {
        userAgent: "Bytespider",
        allow: publicPaths,
        disallow: disallowedPaths,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
