import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { C, useT } from "./tokens";

const CAM_TWEEN = { duration: 1.05, ease: [0.3, 0.9, 0.25, 1] };
/** Never let the panel render smaller than this fraction of its authored size. */
const MIN_READABLE = 0.78;
/** Breathing room between a focused shot's top edge and the caption/nav bar. */
const TOP_GAP = 16;
/** Cursor spring settle time (~600ms) plus a short human "click reaction" pause. */
const PULSE_DELAY = 820;

/**
 * Virtual-canvas viewport with a camera.
 *
 * Scenes are authored at true desktop proportions inside a fixed canvas; the
 * camera frames individual cards by `data-shot` id so the landscape product UI
 * reads well inside the portrait demo frame.
 */
export function Stage({
  canvasW,
  canvasH,
  focus,
  pad = 26,
  beat = 0,
  cursor,
  clickSeq = 0,
  maxScale = 1.55,
  minScale = 0.4,
  insetTop = 0,
  children,
}) {
  const T = useT();
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);
  const [cam, setCam] = useState({ s: 0.6, x: 0, y: 0 });
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [point, setPoint] = useState(null);
  const [pulse, setPulse] = useState(null);

  /* viewport size tracking — rounded so sub-pixel layout noise can't cause a
     feedback loop that keeps recomputing (and re-animating) the camera. */
  useLayoutEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return undefined;
    const read = () => {
      const r = vp.getBoundingClientRect();
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      setSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(vp);
    return () => ro.disconnect();
  }, []);

  const measureShot = useCallback(
    (id) => {
      const root = canvasRef.current;
      if (!root) return null;
      if (!id || id === "page") return { x: 0, y: 0, w: canvasW, h: canvasH };
      const rootRect = root.getBoundingClientRect();
      const s = rootRect.width / canvasW || 1;
      const rects = id
        .split("+")
        .map((one) => root.querySelector(`[data-shot="${one.trim()}"]`))
        .filter(Boolean)
        .map((el) => el.getBoundingClientRect());
      if (!rects.length) return null;
      const x1 = Math.min(...rects.map((r) => r.left));
      const y1 = Math.min(...rects.map((r) => r.top));
      const x2 = Math.max(...rects.map((r) => r.right));
      const y2 = Math.max(...rects.map((r) => r.bottom));
      return { x: (x1 - rootRect.left) / s, y: (y1 - rootRect.top) / s, w: (x2 - x1) / s, h: (y2 - y1) / s };
    },
    [canvasW, canvasH]
  );

  /* camera — measured twice: once quickly, once again after entrance
     transitions (opacity/y motion, AnimatePresence height:auto) have fully
     settled, so the camera never chases a still-animating target.
     Note: this must run even while `paused` (e.g. the pre-roll "warm up"
     window before the demo starts) — otherwise the very first frame is left
     at the default {s:0.6,x:0,y:0}, which renders as a tiny card pinned to
     the top-left until the clock unpauses. Skipping recomputation while
     idle is already handled upstream (the beat clock is a no-op when
     paused, so `beat`/`focus` simply don't change), so gating here too was
     redundant and caused that first-paint bug. */
  useEffect(() => {
    if (!size.w || !size.h) return undefined;
    let cancelled = false;

    const frame = (rect) => {
      let rw = rect.w + pad * 2;
      let rh = rect.h + pad * 2;
      let rx = rect.x - pad;
      let ry = rect.y - pad;
      const usableH = Math.max(120, size.h - insetTop);

      /* In a narrow frame (mobile) a full-width card would shrink below the
         legibility floor, so crop the framed region instead of zooming out. */
      const maxW = size.w / MIN_READABLE;
      if (rw > maxW) {
        rx += (rw - maxW) / 2;
        rw = maxW;
      }
      const maxH = usableH / MIN_READABLE;
      if (rh > maxH) {
        ry += Math.min((rh - maxH) / 2, 40);
        rh = maxH;
      }
      let s = Math.min(size.w / rw, usableH / rh);
      s = Math.max(minScale, Math.min(maxScale, s));
      // Horizontally centred; vertically top-anchored so headers/labels
      // never end up sitting in the middle of the frame with dead space above.
      const x = (size.w - rw * s) / 2 - rx * s;
      const y = insetTop + TOP_GAP - ry * s;
      setCam((prev) =>
        Math.abs(prev.s - s) < 0.003 && Math.abs(prev.x - x) < 0.75 && Math.abs(prev.y - y) < 0.75 ? prev : { s, x, y }
      );
    };

    const run = () => {
      if (cancelled) return;
      const rect = measureShot(focus);
      if (rect) frame(rect);
    };

    // First pass once the freshly revealed beat content has laid out, second
    // pass once any entrance transition (y/opacity/height) has settled.
    const t1 = setTimeout(run, 260);
    const t2 = setTimeout(run, 620);
    return () => {
      cancelled = true;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [focus, beat, size, pad, maxScale, minScale, insetTop, canvasW, canvasH, measureShot]);

  /* cursor follows its target while the camera glides */
  useEffect(() => {
    if (!cursor) {
      setPoint(null);
      return undefined;
    }
    let raf = 0;
    let stop = false;
    const t0 = performance.now();
    const track = () => {
      if (stop) return;
      const root = canvasRef.current;
      const vp = viewportRef.current;
      if (root && vp) {
        const el = root.querySelector(`[data-click="${cursor}"]`);
        if (el) {
          const r = el.getBoundingClientRect();
          const v = vp.getBoundingClientRect();
          setPoint({ x: r.left + r.width / 2 - v.left, y: r.top + r.height / 2 - v.top });
        }
      }
      if (performance.now() - t0 < 1600) raf = requestAnimationFrame(track);
    };
    raf = requestAnimationFrame(track);
    return () => {
      stop = true;
      cancelAnimationFrame(raf);
    };
  }, [cursor, cam]);

  /* click pulse — re-measures the target fresh when it fires instead of
     closing over `point`, which at this instant still holds the *previous*
     click target's position (the cursor-tracking effect above hasn't had
     its first animation frame yet), which made every pulse appear one click
     late, sitting on the prior target.
     The delay itself is deliberately generous: the cursor dot travels via a
     spring (settles in ~550-650ms regardless of distance), so firing much
     earlier showed the "click" flash before the pointer had visibly arrived.
     PULSE_DELAY = settle time + a short human "click reaction" pause. */
  useEffect(() => {
    if (!clickSeq || !cursor) return undefined;
    const id = setTimeout(() => {
      const root = canvasRef.current;
      const vp = viewportRef.current;
      if (!root || !vp) return;
      const el = root.querySelector(`[data-click="${cursor}"]`);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const v = vp.getBoundingClientRect();
      setPulse({ key: clickSeq, x: r.left + r.width / 2 - v.left, y: r.top + r.height / 2 - v.top });
    }, PULSE_DELAY);
    return () => clearTimeout(id);
  }, [clickSeq, cursor]);

  return (
    <div ref={viewportRef} className="relative h-full w-full overflow-hidden" style={{ background: T.bg }}>
      <motion.div
        ref={canvasRef}
        className="absolute left-0 top-0"
        style={{ width: canvasW, height: canvasH, transformOrigin: "0 0" }}
        animate={{ scale: cam.s, x: cam.x, y: cam.y }}
        transition={CAM_TWEEN}
      >
        {children}
      </motion.div>

      {/* cursor */}
      <AnimatePresence>
        {point && (
          <motion.div
            key="cursor"
            className="pointer-events-none absolute z-30"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1, x: point.x, y: point.y }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{
              opacity: { duration: 0.25 },
              scale: { duration: 0.25 },
              x: { type: "spring", stiffness: 120, damping: 18 },
              y: { type: "spring", stiffness: 120, damping: 18 },
            }}
            style={{ left: 0, top: 0 }}
          >
            <Pointer />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pulse && (
          <motion.span
            key={pulse.key}
            className="pointer-events-none absolute z-20 rounded-full"
            style={{ left: pulse.x - 13, top: pulse.y - 13, width: 26, height: 26, border: `2px solid ${C.blue}` }}
            initial={{ scale: 0.35, opacity: 0.9 }}
            animate={{ scale: 2.1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Pointer() {
  return (
    <svg width="22" height="26" viewBox="0 0 22 26" style={{ filter: "drop-shadow(0 3px 6px rgba(15,23,42,0.35))" }}>
      <path d="M4 2.2L4 19.4L8.6 15.2L11.6 22.4L14.9 21L11.9 13.9L18 13.6Z" fill="#fff" stroke="#0F172A" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Declarative beat list.
 * Rows are `[name, absoluteMs, options]` where options may carry `focus`
 * (camera target), `click` (cursor target) and any scene payload value.
 */
export function makeTimeline(rows) {
  const beats = rows.map(([name, t, opts]) => ({ name, t, ...(opts || {}) }));
  const index = {};
  beats.forEach((b, i) => {
    index[b.name] = i;
  });
  return {
    beats,
    at: (name) => (index[name] === undefined ? Number.POSITIVE_INFINITY : index[name]),
    /** Has the playhead reached the named beat? */
    reached: (beat, name) => beat >= (index[name] === undefined ? Number.POSITIVE_INFINITY : index[name]),
    /** Most recent value of `key` at or before the current beat. */
    val: (beat, key, fallback) => {
      for (let i = Math.min(beat, beats.length - 1); i >= 0; i -= 1) {
        if (beats[i][key] !== undefined) return beats[i][key];
      }
      return fallback;
    },
    /**
     * Continuously interpolated value of a numeric `key` between the two
     * keyframes surrounding `elapsedMs`. Falls back to a plain hold (like
     * `val`) once there is no further keyframe ahead. Use this for anything
     * that should visibly glide (an audio scrubber) rather than jump.
     */
    smooth: (elapsedMs, key, fallback) => {
      let startIdx = -1;
      for (let i = 0; i < beats.length; i += 1) {
        if (beats[i][key] !== undefined && beats[i].t <= elapsedMs) startIdx = i;
      }
      if (startIdx === -1) return fallback;
      const startBeat = beats[startIdx];
      let endIdx = -1;
      for (let i = startIdx + 1; i < beats.length; i += 1) {
        if (beats[i][key] !== undefined) {
          endIdx = i;
          break;
        }
      }
      if (endIdx === -1) return startBeat[key];
      const endBeat = beats[endIdx];
      const a = startBeat[key];
      const b = endBeat[key];
      if (typeof a !== "number" || typeof b !== "number") return elapsedMs >= endBeat.t ? b : a;
      const span = Math.max(1, endBeat.t - startBeat.t);
      const frac = Math.max(0, Math.min(1, (elapsedMs - startBeat.t) / span));
      return a + (b - a) * frac;
    },
  };
}

/**
 * Beat clock. Beats carry absolute `t` (ms from scene start) plus optional
 * `focus` (camera target) and `click` (cursor target).
 */
export function useBeats({ beats, duration, paused, sceneKey, isMobile, onProgress, onEnd }) {
  const [beat, setBeat] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  // Wall-clock based: elapsed is always (now − start − pausedTime), so a
  // throttled or duplicated sampler can never make a scene drift or race.
  const startRef = useRef(0);
  const pausedAtRef = useRef(null);
  const pausedTotalRef = useRef(0);
  const beatRef = useRef(0);
  const endedRef = useRef(false);

  useEffect(() => {
    startRef.current = performance.now();
    pausedTotalRef.current = 0;
    pausedAtRef.current = paused ? performance.now() : null;
    beatRef.current = 0;
    endedRef.current = false;
    setBeat(0);
    setProgress(0);
    setElapsedMs(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneKey]);

  useEffect(() => {
    if (paused) {
      if (pausedAtRef.current === null) pausedAtRef.current = performance.now();
    } else if (pausedAtRef.current !== null) {
      pausedTotalRef.current += performance.now() - pausedAtRef.current;
      pausedAtRef.current = null;
    }
  }, [paused]);

  useEffect(() => {
    let raf = 0;
    let lastPush = 0;
    let stopped = false;

    const sample = () => {
      // While paused, do absolutely nothing — no state writes, no re-renders,
      // so nothing downstream (camera, charts) can drift, jump or "bounce".
      if (pausedAtRef.current !== null) return;

      const now = performance.now();
      const el = Math.max(0, now - startRef.current - pausedTotalRef.current);

      let idx = 0;
      for (let i = 0; i < beats.length; i += 1) if (beats[i].t <= el) idx = i;
      if (idx !== beatRef.current) {
        beatRef.current = idx;
        setBeat(idx);
      }

      if (now - lastPush > 80) {
        lastPush = now;
        setElapsedMs(el);
        const pct = Math.min(100, (el / duration) * 100);
        setProgress(pct);
        onProgress?.(pct);
      }
      if (el >= duration && !endedRef.current) {
        endedRef.current = true;
        onEnd?.();
      }
    };

    const loop = () => {
      sample();
      if (!stopped) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    // Keeps the story moving when rAF is throttled (occluded or background view).
    const interval = setInterval(sample, 220);
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneKey, beats, duration]);

  // On mobile, a scene's opening "bird's-eye" shot (the whole, wide
  // dashboard) crops down to mostly dead space left/right in a portrait
  // frame. `focusMobile` lets a beat (typically only the very first one)
  // override that with a target that's already zoomed in; every other beat
  // just falls back to its normal `focus`, so nothing else changes.
  const current = beats[beat] || {};
  let focus = isMobile ? current.focusMobile ?? current.focus : current.focus;
  if (!focus) {
    for (let i = beat; i >= 0; i -= 1) {
      const f = isMobile ? beats[i]?.focusMobile ?? beats[i]?.focus : beats[i]?.focus;
      if (f) {
        focus = f;
        break;
      }
    }
  }
  let cursor = null;
  let clickSeq = 0;
  for (let i = beat; i >= 0; i -= 1) {
    if (beats[i]?.hideCursor) break;
    if (beats[i]?.click) {
      cursor = beats[i].click;
      clickSeq = i + 1;
      break;
    }
  }

  return { beat, progress, elapsedMs, focus: focus || "page", cursor, clickSeq };
}
