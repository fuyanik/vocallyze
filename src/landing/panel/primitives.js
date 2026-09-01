import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { C, hexA, useT } from "./tokens";

/* ─────────────────────────── Icons ─────────────────────────── */

const PATHS = {
  grid: "M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v4H4zM14 15h6v4h-6z",
  chart: "M4 19h16M7 16V9M12 16V5M17 16v-5",
  calendar: "M4 8h16M8 4v3M16 4v3M5 8h14a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V9a1 1 0 011-1z",
  hash: "M9 4L7 20M17 4l-2 16M4 9h16M3 15h16",
  bulb: "M9 18h6M10 21h4M8 13a5 5 0 118 0c-1 1.2-1.4 2-1.5 3h-5c-.1-1-.5-1.8-1.5-3z",
  users: "M16 19v-1.5a3.5 3.5 0 00-3.5-3.5h-5A3.5 3.5 0 004 17.5V19M13 7.5A3.5 3.5 0 116 7.5a3.5 3.5 0 017 0zM17 5.2a3 3 0 010 5.6M21 19v-1.2a3.4 3.4 0 00-2.4-3.2",
  user: "M18 19v-1.5a3.5 3.5 0 00-3.5-3.5h-5A3.5 3.5 0 006 17.5V19M15.5 7.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z",
  team: "M7 14a3 3 0 100-6 3 3 0 000 6zM17 14a3 3 0 100-6 3 3 0 000 6zM3 20v-.8A3.2 3.2 0 016.2 16h1.6A3.2 3.2 0 0111 19.2V20M13 20v-.8A3.2 3.2 0 0116.2 16h1.6A3.2 3.2 0 0121 19.2V20",
  shield: "M12 3l7 3v5.5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5V6l7-3z",
  phone: "M6 3h3l1.6 4-2 1.4a11 11 0 005 5l1.4-2L19 13v3a2 2 0 01-2.2 2A15 15 0 014 5.2 2 2 0 016 3z",
  book: "M5 4h6a3 3 0 013 3v13a2.5 2.5 0 00-2.5-2.5H5V4zM19 4h-2a3 3 0 00-3 3v13a2.5 2.5 0 012.5-2.5H19V4z",
  activity: "M3 12h3l2.5-7 4 14 2.5-7h6",
  bot: "M8 10h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4a2 2 0 012-2zM12 6v4M9.5 14h.01M14.5 14h.01M4 13H3M21 13h-1",
  server: "M4 5h16v5H4zM4 14h16v5H4zM7 7.5h.01M7 16.5h.01",
  back: "M11 6l-6 6 6 6M5 12h14",
  play: "M8 5.5l11 6.5-11 6.5v-13z",
  pause: "M9 5v14M15 5v14",
  skipBack: "M18 6v12L9 12l9-6zM6 5v14",
  skipFwd: "M6 6v12l9-6-9-6zM18 5v14",
  download: "M12 4v11M8 12l4 4 4-4M5 20h14",
  send: "M4 12l16-8-6 16-2.5-6L4 12z",
  print: "M7 8V4h10v4M7 16H5v-6h14v6h-2M8 13h8v7H8v-7z",
  check: "M5 13l4.5 4.5L19 7",
  checkCircle: "M9 12.5l2.2 2.2L15.5 10M12 21a9 9 0 100-18 9 9 0 000 18z",
  alert: "M12 9v4.5M12 17h.01M10.3 4.2L2.9 17a2 2 0 001.7 3h14.8a2 2 0 001.7-3L13.7 4.2a2 2 0 00-3.4 0z",
  shieldOff: "M12 3l7 3v5.5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5V6l7-3zM9.5 12l5 0",
  clock: "M12 8v4.5l3 1.8M12 21a9 9 0 100-18 9 9 0 000 18z",
  wallet: "M4 8h14a2 2 0 012 2v7a2 2 0 01-2 2H5a1 1 0 01-1-1V8zM4 8V6.5A1.5 1.5 0 015.5 5H16M16.5 13.5h.01",
  trend: "M4 16l5-5 3.5 3.5L20 8M20 8h-4.5M20 8v4.5",
  branch: "M7 5a2 2 0 100 4 2 2 0 000-4zM7 9v4a4 4 0 004 4h2M17 15a2 2 0 100 4 2 2 0 000-4z",
  mic: "M12 4a3 3 0 013 3v4a3 3 0 01-6 0V7a3 3 0 013-3zM6.5 11a5.5 5.5 0 0011 0M12 16.5V20M9 20h6",
  quote: "M8 7c-2 0-3.5 1.6-3.5 3.6S6 14 8 14c0 2-1 3-2.5 3.6M18 7c-2 0-3.5 1.6-3.5 3.6S16 14 18 14c0 2-1 3-2.5 3.6",
  sparkle: "M12 3l1.7 4.6L18 9.3l-4.3 1.7L12 15.6l-1.7-4.6L6 9.3l4.3-1.7L12 3zM18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z",
  brain: "M9 6a3 3 0 00-3 3 2.5 2.5 0 000 5 3 3 0 003 3h1V6H9zM15 6a3 3 0 013 3 2.5 2.5 0 010 5 3 3 0 01-3 3h-1V6h1z",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 16a4 4 0 100-8 4 4 0 000 8zM12 13a1 1 0 100-2 1 1 0 000 2z",
  search: "M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13zM15.5 15.5L21 21",
  arrowUp: "M7 14l5-5 5 5",
  arrowDown: "M7 10l5 5 5-5",
  arrowRight: "M5 12h13M13 6l6 6-6 6",
  headphones: "M5 17v-5a7 7 0 1114 0v5M5 14h2.5a1 1 0 011 1v3a1 1 0 01-1 1H6a1 1 0 01-1-1v-4zM19 14h-2.5a1 1 0 00-1 1v3a1 1 0 001 1H18a1 1 0 001-1v-4z",
  lock: "M7 11V8a5 5 0 0110 0v3M6 11h12v9H6v-9z",
  file: "M13 4H7a1 1 0 00-1 1v14a1 1 0 001 1h10a1 1 0 001-1V9l-5-5zM13 4v5h5",
  logOut: "M15 17l4-5-4-5M19 12H9M11 4H6a1 1 0 00-1 1v14a1 1 0 001 1h5",
};

export function Icon({ name, size = 16, color = "currentColor", strokeWidth = 1.6, fill = "none", className = "" }) {
  const d = PATHS[name] || PATHS.grid;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={fill === "none" ? color : "none"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ flexShrink: 0 }}
    >
      <path d={d} />
    </svg>
  );
}

/* ─────────────────────────── Layout ─────────────────────────── */

/** Camera anchor: the Stage locates focus targets through `data-shot`. */
export function Shot({ id, children, className = "", style }) {
  return (
    <div data-shot={id} className={className} style={style}>
      {children}
    </div>
  );
}

export function Card({ children, className = "", pad = true, shot, click, style, glow }) {
  const T = useT();
  return (
    <div
      data-shot={shot}
      data-click={click}
      className={`relative rounded-2xl ${pad ? "px-5 py-4" : ""} ${className}`}
      style={{
        background: T.card,
        border: `1px solid ${glow ? hexA(glow, 0.45) : T.border}`,
        boxShadow: glow ? `0 0 0 3px ${hexA(glow, 0.1)}, ${T.shadow}` : T.shadow,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, right, className = "" }) {
  const T = useT();
  return (
    <div className={`mb-3.5 flex items-start justify-between gap-3 ${className}`}>
      <div className="min-w-0">
        <h3 className="text-[13px] font-semibold tracking-tight" style={{ color: T.textSoft }}>
          {title}
        </h3>
        {subtitle && (
          <p className="mt-0.5 text-[11px] leading-snug" style={{ color: T.faint }}>
            {subtitle}
          </p>
        )}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }) {
  const T = useT();
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-[26px] font-semibold leading-tight tracking-tight" style={{ color: T.text }}>
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-[13px]" style={{ color: T.faint }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

/* ─────────────────────────── Atoms ─────────────────────────── */

export function Badge({ children, tone = "gray", solid = false, className = "" }) {
  const T = useT();
  const hex = C[tone] || tone;
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-[3px] text-[10px] font-semibold ${className}`}
      style={
        solid
          ? { background: hex, color: "#fff" }
          : { background: T.tint(hex, T.light ? 0.1 : 0.18), color: T.light ? hex : lighten(hex) }
      }
    >
      {children}
    </span>
  );
}

function lighten(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  const r = Math.min(255, ((n >> 16) & 255) + 60);
  const g = Math.min(255, ((n >> 8) & 255) + 60);
  const b = Math.min(255, (n & 255) + 60);
  return `rgb(${r},${g},${b})`;
}

export function Delta({ value, suffix = "%", invert = false }) {
  const good = invert ? value <= 0 : value >= 0;
  const hex = good ? C.green : C.red;
  return (
    <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold" style={{ color: hex }}>
      <Icon name={value >= 0 ? "arrowUp" : "arrowDown"} size={11} strokeWidth={2.4} />
      {value > 0 ? "+" : ""}
      {value}
      {suffix}
    </span>
  );
}

export function StatCard({ label, value, unit, delta, deltaSuffix, invertDelta, icon, tone = "blue", hint, shot, className = "" }) {
  const T = useT();
  const hex = C[tone] || tone;
  return (
    <div
      data-shot={shot}
      className={`rounded-2xl px-4 py-3.5 ${className}`}
      style={{ background: T.card, border: `1px solid ${T.border}`, boxShadow: T.shadow }}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase leading-tight tracking-[0.08em]" style={{ color: T.faint }}>
          {label}
        </p>
        {icon && (
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
            style={{ background: T.tint(hex, T.light ? 0.1 : 0.18), color: T.light ? hex : lighten(hex) }}
          >
            <Icon name={icon} size={14} />
          </span>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <p className="text-[26px] font-semibold leading-none tracking-tight tabular-nums" style={{ color: T.text }}>
          {value}
        </p>
        {unit && (
          <span className="text-[11px]" style={{ color: T.faint }}>
            {unit}
          </span>
        )}
      </div>
      <div className="mt-1.5 flex items-center gap-1.5">
        {delta !== undefined && <Delta value={delta} suffix={deltaSuffix} invert={invertDelta} />}
        {hint && (
          <span className="truncate text-[10px]" style={{ color: T.faint }}>
            {hint}
          </span>
        )}
      </div>
    </div>
  );
}

export function ProgressBar({ value, color = C.blue, height = 6, play = true, delay = 0 }) {
  const T = useT();
  return (
    <div className="w-full overflow-hidden rounded-full" style={{ height, background: T.chip }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: play ? `${Math.max(0, Math.min(100, value))}%` : 0 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ height, background: color, borderRadius: 999 }}
      />
    </div>
  );
}

export function Avatar({ name, size = 34, color, ring }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        background: color || C.navy,
        boxShadow: ring ? `0 0 0 3px ${hexA(ring, 0.22)}` : undefined,
      }}
    >
      {initials}
    </div>
  );
}

/** `options` is an array of `{ id, label }` — `id` stays a stable, locale-
 *  independent value used for both the active-state comparison and the
 *  `data-click` selector, while `label` is the (possibly translated)
 *  visible text. This keeps timeline click targets working regardless of
 *  which language is currently rendered. */
export function Segmented({ options, value, size = "md", shot }) {
  const T = useT();
  const px = size === "sm" ? "px-2.5 py-1" : "px-3 py-1.5";
  return (
    <div data-shot={shot} className="inline-flex rounded-xl p-0.5" style={{ background: T.chip }}>
      {options.map((o) => {
        const active = o.id === value;
        return (
          <span
            key={o.id}
            data-click={`seg-${o.id}`}
            className={`${px} rounded-[10px] text-[11px] font-medium transition-all`}
            style={
              active
                ? { background: T.card, color: T.text, boxShadow: T.light ? "0 1px 2px rgba(16,24,40,0.08)" : "none" }
                : { color: T.sub }
            }
          >
            {o.label}
          </span>
        );
      })}
    </div>
  );
}

export function Btn({ children, icon, primary, click, className = "", tone = C.blue }) {
  const T = useT();
  return (
    <span
      data-click={click}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-[7px] text-[11px] font-semibold ${className}`}
      style={
        primary
          ? { background: tone, color: "#fff", boxShadow: `0 4px 14px ${hexA(tone, 0.3)}` }
          : { background: T.card, color: T.sub, border: `1px solid ${T.borderStrong}` }
      }
    >
      {icon && <Icon name={icon} size={13} />}
      {children}
    </span>
  );
}

export function Divider({ className = "" }) {
  const T = useT();
  return <div className={className} style={{ height: 1, background: T.border }} />;
}

export function ScoreRing({ value, size = 68, stroke = 6, color, label, play = true, showValue = true }) {
  const T = useT();
  const hex = color || C.blue;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.chip} strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={hex}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: play ? circ - (Math.max(0, Math.min(100, value)) / 100) * circ : circ }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <Counter
            to={value}
            play={play}
            className="font-semibold leading-none tabular-nums"
            style={{ fontSize: size * 0.28, color: T.text }}
          />
        )}
        {label && (
          <span className="mt-0.5" style={{ fontSize: size * 0.13, color: T.faint }}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

/** Number that counts up when `play` flips true. */
export function Counter({ to, from = 0, play = true, duration = 1.1, decimals = 0, prefix = "", suffix = "", className = "", style }) {
  const [val, setVal] = useState(from);
  useEffect(() => {
    if (!play) {
      setVal(from);
      return undefined;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, to, from, duration]);
  const shown = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString("en-US");
  return (
    <span className={className} style={style}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
