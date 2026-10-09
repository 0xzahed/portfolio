import { ImageResponse } from "next/og";
import { person } from "@/data/portfolio";

export const alt = `${person.name} — Software Engineer`;
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
          background: "#050505",
          color: "#D4D8DD",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#8FA0AB" }}>
          <span>{person.name}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: 10, background: "#AAB7B7" }} />
            Available for work
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, fontWeight: 800, lineHeight: 0.86, letterSpacing: -6, textTransform: "uppercase" }}>
          <span>Building</span>
          <span>digital</span>
          <span>systems.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#8FA0AB", borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 24 }}>
          <span>{person.role}</span>
          <span>{person.location}</span>
        </div>
      </div>
    ),
    size,
  );
}
