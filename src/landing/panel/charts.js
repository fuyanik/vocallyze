import { motion } from "framer-motion";
import { C, hexA, useT } from "./tokens";

/* ───────────────────────── helpers ───────────────────────── */

const EASE = [0.22, 1, 0.36, 1];

function niceMax(v) {
  const mag = Math.pow(10, Math.floor(Math.log10(v || 1)));
  return Math.ceil(v / mag) * mag;
}

function linePath(pts, smooth = true) {
  if (!pts.length) return "";
  if (!smooth || pts.length < 3) return pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
}

export function Legend({ items, className = "" }) {
  const T = useT();
  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1 ${className}`}>
      {items.map((it) => (
        <span key={it.label} className="inline-flex items-center gap-1.5 text-[10.5px]" style={{ color: T.faint }}>
          <span className="h-[7px] w-[7px] rounded-full" style={{ background: it.color }} />
          {it.label}
        </span>
      ))}
    </div>
  );
}

/** Shared plot frame: horizontal grid, y tick labels, x labels. */
function Frame({ w, h, padL = 34, padR = 8, padB = 22, padT = 8, yTicks, xLabels, children, yFmt = (v) => v }) {
  const T = useT();
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible" }}>
      {yTicks?.map((t, i) => {
        const y = padT + ih - (t.p ?? 0) * ih;
        return (
          <g key={`y${i}`}>
            <line x1={padL} x2={padL + iw} y1={y} y2={y} stroke={T.grid} strokeWidth={1} strokeDasharray="3 4" />
            <text x={padL - 7} y={y + 3.5} textAnchor="end" fontSize="10" fill={T.faint}>
              {yFmt(t.v)}
            </text>
          </g>
        );
      })}
      {xLabels?.map((l, i) => {
        const x = padL + (xLabels.length === 1 ? iw / 2 : (i / (xLabels.length - 1)) * iw);
        return (
          <text key={`x${i}`} x={x} y={h - 5} textAnchor="middle" fontSize="10" fill={T.faint}>
            {l}
          </text>
        );
      })}
      <g transform={`translate(${padL},${padT})`}>{children({ iw, ih })}</g>
    </svg>
  );
}

/* ───────────────────────── line chart ───────────────────────── */

export function LineChart({
  w,
  h,
  series,
  xLabels,
  play = true,
  min = 0,
  max,
  ticks = 4,
  dots = false,
  area = false,
  dashed = [],
  yFmt,
}) {
  const flat = series.flatMap((s) => s.data);
  const hi = max ?? niceMax(Math.max(...flat) * 1.08);
  const lo = min;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => {
    const v = lo + ((hi - lo) * i) / ticks;
    return { v: Math.round(v), p: i / ticks };
  });
  return (
    <Frame w={w} h={h} yTicks={yTicks} xLabels={xLabels} yFmt={yFmt}>
      {({ iw, ih }) => (
        <>
          {series.map((s, si) => {
            const pts = s.data.map((v, i) => [
              (i / (s.data.length - 1)) * iw,
              ih - ((v - lo) / (hi - lo)) * ih,
            ]);
            const d = linePath(pts);
            return (
              <g key={s.label || si}>
                {area && (
                  <motion.path
                    d={`${d} L${iw},${ih} L0,${ih} Z`}
                    fill={hexA(s.color, 0.12)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: play ? 1 : 0 }}
                    transition={{ duration: 0.9, delay: 0.25 + si * 0.1 }}
                  />
                )}
                <motion.path
                  d={d}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={s.width ?? 2.2}
                  strokeLinecap="round"
                  strokeDasharray={dashed.includes(si) ? "5 5" : undefined}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: play ? 1 : 0, opacity: play ? 1 : 0 }}
                  transition={{ duration: 1.5, delay: si * 0.12, ease: EASE }}
                />
                {dots &&
                  pts.map((p, i) => (
                    <motion.circle
                      key={i}
                      cx={p[0]}
                      cy={p[1]}
                      r={3}
                      fill={s.color}
                      initial={{ scale: 0 }}
                      animate={{ scale: play ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.35 + i * 0.06 }}
                    />
                  ))}
              </g>
            );
          })}
        </>
      )}
    </Frame>
  );
}

/* ───────────────────────── stacked area ───────────────────────── */

export function StackedArea({ w, h, data, keys, xLabels, play = true, expand = false, ticks = 4, yFmt }) {
  const totals = data.map((d) => keys.reduce((a, k) => a + (d[k.key] || 0), 0));
  const hi = expand ? 1 : niceMax(Math.max(...totals) * 1.05);
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => ({
    v: expand ? Math.round((100 * i) / ticks) : Math.round((hi * i) / ticks),
    p: i / ticks,
  }));
  return (
    <Frame w={w} h={h} yTicks={yTicks} xLabels={xLabels} yFmt={yFmt || (expand ? (v) => `${v}%` : undefined)}>
      {({ iw, ih }) => {
        const stacks = data.map(() => 0);
        return keys.map((k, ki) => {
          const top = [];
          const bottom = [];
          data.forEach((d, i) => {
            const denom = expand ? totals[i] || 1 : hi;
            const base = stacks[i] / denom;
            const val = (d[k.key] || 0) / denom;
            stacks[i] += d[k.key] || 0;
            const x = (i / (data.length - 1)) * iw;
            bottom.push([x, ih - base * ih]);
            top.push([x, ih - (base + val) * ih]);
          });
          const d = `${linePath(top)} L${bottom[bottom.length - 1][0]},${bottom[bottom.length - 1][1]} ${linePath(
            [...bottom].reverse()
          ).replace("M", "L")} Z`;
          return (
            <motion.path
              key={k.key}
              d={d}
              fill={hexA(k.color, k.opacity ?? 0.55)}
              stroke={k.color}
              strokeWidth={1.4}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: play ? 1 : 0, y: play ? 0 : 8 }}
              transition={{ duration: 0.8, delay: ki * 0.12, ease: EASE }}
            />
          );
        });
      }}
    </Frame>
  );
}

/* ───────────────────────── bars ───────────────────────── */

export function BarChart({ w, h, bars, play = true, ticks = 3, gap = 0.34, radius = 4, max, yFmt }) {
  const hi = max ?? niceMax(Math.max(...bars.map((b) => b.value)) * 1.1);
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => ({ v: Math.round((hi * i) / ticks), p: i / ticks }));
  return (
    <Frame w={w} h={h} yTicks={yTicks} xLabels={bars.map((b) => b.label)} yFmt={yFmt}>
      {({ iw, ih }) => {
        const step = iw / bars.length;
        const bw = step * (1 - gap);
        return bars.map((b, i) => {
          const bh = Math.max(2, (b.value / hi) * ih);
          return (
            <motion.rect
              key={i}
              x={i * step + (step - bw) / 2}
              width={bw}
              rx={radius}
              initial={{ height: 0, y: ih }}
              animate={{ height: play ? bh : 0, y: play ? ih - bh : ih }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              fill={b.color || C.blue}
              opacity={b.opacity ?? 1}
            />
          );
        });
      }}
    </Frame>
  );
}

/* ───────────────────────── donut ───────────────────────── */

export function Donut({ size = 150, thickness = 20, segments, play = true, gapDeg = 3, center }) {
  const T = useT();
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  const r = (size - thickness) / 2;
  const circ = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.chip} strokeWidth={thickness} />
        {segments.map((s, i) => {
          const frac = s.value / total;
          const len = Math.max(0, frac * circ - (gapDeg / 360) * circ);
          const offset = -acc * circ;
          acc += frac;
          return (
            <motion.circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={`${len} ${circ}`}
              initial={{ strokeDashoffset: circ * 0.25, opacity: 0 }}
              animate={play ? { strokeDashoffset: offset, opacity: 1 } : { strokeDashoffset: circ * 0.25, opacity: 0 }}
              transition={{ duration: 1, delay: 0.1 + i * 0.1, ease: EASE }}
            />
          );
        })}
      </svg>
      {center && <div className="absolute inset-0 flex flex-col items-center justify-center">{center}</div>}
    </div>
  );
}

export function DonutLegend({ segments, unit = "", play = true }) {
  const T = useT();
  return (
    <div className="flex flex-col gap-1.5">
      {segments.map((s, i) => (
        <motion.div
          key={s.label}
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: play ? 1 : 0, x: play ? 0 : -6 }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
        >
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: s.color }} />
          <span className="min-w-0 flex-1 truncate text-[11px]" style={{ color: T.sub }}>
            {s.label}
          </span>
          <span className="text-[11px] font-semibold tabular-nums" style={{ color: T.text }}>
            {unit === "%" ? `${s.value}%` : s.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ───────────────────────── radar ───────────────────────── */

export function Radar({ size = 190, axes, series, play = true, rings = 4, labels = true }) {
  const T = useT();
  const cx = size / 2;
  const cy = size / 2;
  const R = size * (labels ? 0.32 : 0.42);
  const angle = (i) => (Math.PI * 2 * i) / axes.length - Math.PI / 2;
  const pt = (i, frac) => [cx + Math.cos(angle(i)) * R * frac, cy + Math.sin(angle(i)) * R * frac];

  return (
    <svg width={size} height={size} style={{ display: "block", overflow: "visible" }}>
      {Array.from({ length: rings }, (_, ri) => {
        const frac = (ri + 1) / rings;
        const d = axes.map((_, i) => {
          const [x, y] = pt(i, frac);
          return `${i ? "L" : "M"}${x},${y}`;
        });
        return <path key={ri} d={`${d.join(" ")} Z`} fill="none" stroke={T.grid} strokeWidth={1} />;
      })}
      {axes.map((_, i) => {
        const [x, y] = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={T.grid} strokeWidth={1} />;
      })}
      {series.map((s, si) => {
        const d = s.values.map((v, i) => {
          const [x, y] = pt(i, Math.max(0, Math.min(1, v / 100)));
          return `${i ? "L" : "M"}${x},${y}`;
        });
        return (
          <motion.path
            key={s.label}
            d={`${d.join(" ")} Z`}
            fill={hexA(s.color, 0.18)}
            stroke={s.color}
            strokeWidth={2}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: play ? 1 : 0, opacity: play ? 1 : 0 }}
            transition={{ duration: 0.9, delay: 0.15 + si * 0.18, ease: EASE }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        );
      })}
      {labels &&
        axes.map((a, i) => {
          const [x, y] = pt(i, 1.32);
          return (
            <text
              key={a}
              x={x}
              y={y + 3}
              textAnchor={Math.abs(x - cx) < 6 ? "middle" : x > cx ? "start" : "end"}
              fontSize="9.5"
              fill={T.faint}
            >
              {a}
            </text>
          );
        })}
    </svg>
  );
}

/* ───────────────────────── treemap ───────────────────────── */

export function Treemap({ w, h, items, play = true, gap = 4 }) {
  return (
    <div className="relative" style={{ width: w, height: h }}>
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          className="absolute overflow-hidden rounded-lg px-2 py-1.5"
          style={{
            left: `${it.x}%`,
            top: `${it.y}%`,
            width: `calc(${it.w}% - ${gap}px)`,
            height: `calc(${it.h}% - ${gap}px)`,
            background: it.color,
          }}
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: play ? 1 : 0, scale: play ? 1 : 0.82 }}
          transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
        >
          <span className="block truncate text-[10px] font-semibold leading-tight text-white/95">{it.label}</span>
          {it.sub && <span className="block truncate text-[9px] text-white/70">{it.sub}</span>}
        </motion.div>
      ))}
    </div>
  );
}

/* ───────────────────────── bubbles / scatter ───────────────────────── */

export function Bubbles({ w, h, points, xTicks, yTicks, play = true }) {
  const T = useT();
  const padL = 34;
  const padB = 22;
  const iw = w - padL - 10;
  const ih = h - padB - 8;
  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible" }}>
      {yTicks.map((t, i) => {
        const y = 8 + ih - t.p * ih;
        return (
          <g key={i}>
            <line x1={padL} x2={padL + iw} y1={y} y2={y} stroke={T.grid} strokeWidth={1} strokeDasharray="3 4" />
            <text x={padL - 7} y={y + 3.5} textAnchor="end" fontSize="10" fill={T.faint}>
              {t.v}
            </text>
          </g>
        );
      })}
      {xTicks.map((t, i) => (
        <text key={i} x={padL + t.p * iw} y={h - 5} textAnchor="middle" fontSize="10" fill={T.faint}>
          {t.v}
        </text>
      ))}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={padL + p.x * iw}
          cy={8 + ih - p.y * ih}
          fill={p.color}
          fillOpacity={0.85}
          initial={{ r: 0 }}
          animate={{ r: play ? p.r : 0 }}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: EASE }}
        />
      ))}
    </svg>
  );
}

/* ───────────────────────── sparkline ───────────────────────── */

export function Sparkline({ data, w = 78, h = 24, color = C.blue, play = true, fill = true }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - min) / span) * (h - 5) - 2.5]);
  const d = linePath(pts);
  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible", flexShrink: 0 }}>
      {fill && <path d={`${d} L${w},${h} L0,${h} Z`} fill={hexA(color, 0.1)} />}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: play ? 1 : 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={2.1} fill={color} />
    </svg>
  );
}

/* ───────────────────────── word cloud ───────────────────────── */

export function WordCloud({ rows, revealed = 99, play = true }) {
  let idx = -1;
  return (
    <div className="flex flex-col items-center gap-2.5 py-2">
      {rows.map((row, ri) => (
        <div key={ri} className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1.5">
          {row.map((wd) => {
            idx += 1;
            const on = play && idx < revealed;
            return (
              <motion.span
                key={wd.word}
                className="font-semibold tracking-tight"
                style={{ fontSize: wd.size, color: wd.color, lineHeight: 1.1 }}
                initial={{ opacity: 0, scale: 0.72, filter: "blur(6px)" }}
                animate={
                  on
                    ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0, scale: 0.72, filter: "blur(6px)" }
                }
                transition={{ duration: 0.45, ease: EASE }}
              >
                {wd.word}
              </motion.span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────── waveform ───────────────────────── */

export function Waveform({ bars, progress = 0, color = C.blue, height = 34, playing = false }) {
  const T = useT();
  return (
    <div className="flex flex-1 items-center gap-[2px]" style={{ height }}>
      {bars.map((v, i) => {
        const passed = i / bars.length <= progress;
        const head = playing && Math.abs(i / bars.length - progress) < 0.012;
        return (
          <motion.span
            key={i}
            className="flex-1 rounded-full"
            style={{
              height: `${Math.max(8, v)}%`,
              background: passed ? color : T.light ? "#DFE3E8" : "rgba(255,255,255,0.16)",
            }}
            animate={head ? { scaleY: [1, 1.35, 1] } : { scaleY: 1 }}
            transition={{ duration: 0.35 }}
          />
        );
      })}
    </div>
  );
}
