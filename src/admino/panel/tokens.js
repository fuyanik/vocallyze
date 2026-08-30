import { createContext, useContext } from "react";

/** Accent palette shared by both panel themes (Apple system-ish hues). */
export const C = {
  blue: "#0071E3",
  navy: "#1B3A6B",
  green: "#34C759",
  orange: "#FF9500",
  red: "#FF3B30",
  purple: "#AF52DE",
  teal: "#5AC8FA",
  pink: "#FF2D55",
  gray: "#8E8E93",
};

const LIGHT = {
  light: true,
  bg: "#F5F5F7",
  card: "#FFFFFF",
  cardAlt: "#FAFAFC",
  border: "#EEEEF2",
  borderStrong: "#E2E2E8",
  rail: "#FFFFFF",
  text: "#111827",
  textSoft: "#374151",
  sub: "#6B7280",
  faint: "#9CA3AF",
  grid: "#F0F0F0",
  chip: "#F3F4F6",
  shadow: "0 1px 2px rgba(16,24,40,0.04), 0 8px 24px rgba(16,24,40,0.04)",
  tint: (hex, a = 0.1) => hexA(hex, a),
};

const DARK = {
  light: false,
  bg: "#080D16",
  card: "#0F1725",
  cardAlt: "#131C2C",
  border: "rgba(255,255,255,0.07)",
  borderStrong: "rgba(255,255,255,0.13)",
  rail: "#0C1420",
  text: "#EAF0F8",
  textSoft: "#C7D3E3",
  sub: "#8A9AB0",
  faint: "#6B7A90",
  grid: "rgba(255,255,255,0.06)",
  chip: "rgba(255,255,255,0.06)",
  shadow: "0 1px 2px rgba(0,0,0,0.4), 0 10px 30px rgba(0,0,0,0.35)",
  tint: (hex, a = 0.16) => hexA(hex, a),
};

export function hexA(hex, a) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

export function panelTokens(isLight) {
  return isLight ? LIGHT : DARK;
}

const PanelThemeContext = createContext(LIGHT);

export function PanelThemeProvider({ value, children }) {
  return <PanelThemeContext.Provider value={value}>{children}</PanelThemeContext.Provider>;
}

export function useT() {
  return useContext(PanelThemeContext);
}

/** Score → semantic colour, mirrors the product's scoring bands. */
export function scoreColor(score) {
  if (score >= 90) return C.green;
  if (score >= 80) return C.blue;
  if (score >= 70) return C.orange;
  return C.red;
}

export function severityColor(sev) {
  if (sev === "critical") return C.red;
  if (sev === "high") return C.orange;
  if (sev === "medium") return "#D9A100";
  return C.gray;
}
