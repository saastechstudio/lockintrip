import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#f7f4ef",
          background: "linear-gradient(160deg, #8b3a3a 0%, #6b1f2b 45%, #3a1017 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 8, opacity: 0.8 }}>ÉDITION FONDATRICE · PHUKET 2027</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, letterSpacing: -4, lineHeight: 1 }}>LOCKIN TRIP</div>
          <div style={{ fontSize: 44, marginTop: 24, fontStyle: "italic", opacity: 0.92 }}>{site.tagline}</div>
        </div>
        <div style={{ display: "flex", gap: 36, fontSize: 24, opacity: 0.8 }}>
          <span>60 places</span>
          <span>·</span>
          <span>Experts</span>
          <span>·</span>
          <span>Communauté</span>
          <span>·</span>
          <span>Phuket</span>
        </div>
      </div>
    ),
    size,
  );
}
