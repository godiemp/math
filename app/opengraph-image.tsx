import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "SimplePAES - Matemáticas Enseñanza Media y PAES Chile";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#007AFF",
          padding: "60px",
        }}
      >
        {/* Background overlay */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            right: 60,
            bottom: 60,
            borderRadius: "24px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        />

        {/* Logo icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "120px",
            height: "120px",
            borderRadius: "30px",
            backgroundColor: "white",
            marginBottom: "30px",
          }}
        >
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#007AFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: "72px",
            fontWeight: 700,
            color: "white",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          SimplePAES
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: "32px",
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.9)",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          Matemáticas Enseñanza Media + PAES Chile
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "60px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              fontWeight: 600,
              color: "white",
            }}
          >
            +600 ejercicios
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              fontWeight: 600,
              color: "white",
            }}
          >
            M1 y M2
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              fontWeight: 600,
              color: "white",
            }}
          >
            Feedback AI
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
