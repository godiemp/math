import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";
import { BRAND_COLOR, SITE_NAME } from "@/lib/constants";

export const runtime = "nodejs";

export const alt = "SimplePAES Blog";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function OGImageLayout({ title, description, author, date }: {
  title: string;
  description: string;
  author: string;
  date: string;
}) {
  return (
    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", backgroundColor: BRAND_COLOR, padding: "60px" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", width: "100%", backgroundColor: "white", borderRadius: "24px", padding: "48px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "12px", backgroundColor: BRAND_COLOR }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span style={{ fontSize: "24px", fontWeight: 600, color: BRAND_COLOR }}>{SITE_NAME}</span>
          <span style={{ fontSize: "18px", color: "#6B7280", marginLeft: "8px" }}>Blog</span>
        </div>
        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", gap: "16px" }}>
          <div style={{ fontSize: "48px", fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>{title}</div>
          <div style={{ fontSize: "24px", color: "#4B5563", lineHeight: 1.4 }}>{description}</div>
        </div>
        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E5E7EB", paddingTop: "24px" }}>
          <span style={{ fontSize: "18px", color: "#6B7280" }}>Por {author}</span>
          {date && <span style={{ fontSize: "18px", color: "#6B7280" }}>{date}</span>}
        </div>
      </div>
    </div>
  );
}

export default async function Image({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? "SimplePAES Blog";
  const description = post?.description ?? "Preparacion PAES Matematica";
  const author = post?.author ?? "SimplePAES";
  const date = post?.date
    ? new Date(post.date).toLocaleDateString("es-CL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const displayTitle = title.length > 60 ? title.substring(0, 57) + "..." : title;
  const displayDescription = description.length > 120 ? description.substring(0, 117) + "..." : description;
  return new ImageResponse(<OGImageLayout title={displayTitle} description={displayDescription} author={author} date={date} />, { ...size });
}
