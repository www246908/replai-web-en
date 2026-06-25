import { ImageResponse } from "next/og";

// Branded social-share card (FB / IG / LINE / Twitter link previews).
// Latin-only text so it renders reliably without bundling a CJK font.
export const alt = "Replai — 24/7 AI auto reply & booking system for independent studios";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#1A1A1A";
const CREAM = "#F4EFE6";
const TEAL = "#2E6F6A";
const TERRA = "#C9603F";
const GOLD = "#E8A33D";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: CREAM,
          position: "relative",
        }}
      >
        {/* Decorative confetti shapes */}
        <div style={{ position: "absolute", top: 70, right: 110, width: 90, height: 90, borderRadius: "50%", border: `8px solid ${TERRA}` }} />
        <div style={{ position: "absolute", top: 150, right: 240, width: 44, height: 44, borderRadius: "50%", background: GOLD }} />
        <div style={{ position: "absolute", bottom: 90, right: 140, width: 70, height: 70, background: TEAL, transform: "rotate(45deg)" }} />
        <div style={{ position: "absolute", bottom: 150, left: 70, width: 40, height: 40, borderRadius: "50%", background: TERRA }} />

        {/* Pill badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            gap: 14,
            border: `4px solid ${INK}`,
            background: GOLD,
            color: INK,
            borderRadius: 999,
            padding: "12px 28px",
            fontSize: 30,
            fontWeight: 800,
            boxShadow: `6px 6px 0 0 ${INK}`,
            marginBottom: 40,
          }}
        >
          24 / 7 AI AUTO-REPLY
        </div>

        {/* Wordmark */}
        <div style={{ display: "flex", fontSize: 150, fontWeight: 900, color: INK, lineHeight: 1 }}>
          Replai
          <span style={{ color: TERRA }}>.</span>
        </div>

        {/* Tagline */}
        <div style={{ display: "flex", marginTop: 28, fontSize: 46, fontWeight: 700, color: TEAL }}>
          Never miss a message.
        </div>
        <div style={{ display: "flex", marginTop: 14, fontSize: 34, color: "#6B6B6B" }}>
          FB · IG · LINE — auto-reply &amp; auto-booking for studios
        </div>

        {/* Bottom rule */}
        <div style={{ position: "absolute", left: 80, right: 80, bottom: 70, height: 6, background: INK, borderRadius: 999 }} />
      </div>
    ),
    { ...size }
  );
}