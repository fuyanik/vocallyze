import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, isLightTheme } from "./ThemeProvider";
import { getPlatformDemoShared } from "./content";
import { DemoLiquidPillNav } from "./DemoLiquidPillNav";
import { PanelThemeProvider, panelTokens } from "./panel/tokens";
import { Stage, useBeats } from "./panel/Stage";
import { CANVAS_W } from "./panel/Shell";
import { listenScene } from "./panel/scenes/Listen";
import { auditScene } from "./panel/scenes/Audit";
import { understandScene } from "./panel/scenes/Understand";
import { coachScene } from "./panel/scenes/Coach";
import { automateScene } from "./panel/scenes/Automate";

const SCENES = [listenScene, auditScene, understandScene, coachScene, automateScene];
const REACHED_END_AT = 84; // % of scene progress

/** Mirrors useBeats' own focus-resolution for the ?demoBeat= QA freeze path. */
function resolveFrozenFocus(beats, beat, isMobile) {
  for (let i = beat; i >= 0; i -= 1) {
    const b = beats[i];
    const f = isMobile ? b?.focusMobile ?? b?.focus : b?.focus;
    if (f) return f;
  }
  return "page";
}

const FALLBACK_STEPS = [
  { label: "Listen", caption: "Every call transcribed, scored and backed by evidence" },
  { label: "Audit", caption: "All conversations checked against your rulebook" },
  { label: "Understand", caption: "What customers talk about — and what causes it" },
  { label: "Coach", caption: "Agent-level quality, risk and coaching signals" },
  { label: "Automate", caption: "Repetitive calls handed to the assistant, audited the same way" },
];

const PanelDemo = forwardRef(function PanelDemo(
  {
    hideSceneControls,
    onSceneChange,
    onPauseChange,
    onProgressChange,
    onFocusClick,
    onUserSceneSelect,
    onUserTogglePause,
    onSceneReachedEnd,
    focusActive,
    hideFloatingTitles,
    mobile,
  },
  ref
) {
  const { theme } = useTheme();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const lightMode = !hydrated || isLightTheme(theme);
  const T = useMemo(() => panelTokens(lightMode), [lightMode]);

  const shared = getPlatformDemoShared();
  const steps = shared?.panelSteps?.length === SCENES.length ? shared.panelSteps : FALLBACK_STEPS;
  const labels = useMemo(() => steps.map((s) => s.label), [steps]);

  const [scene, setScene] = useState(() => {
    if (typeof window === "undefined") return 0;
    const q = new URLSearchParams(window.location.search);
    return q.has("demoScene") ? Math.max(0, Math.min(SCENES.length - 1, parseInt(q.get("demoScene"), 10) || 0)) : 0;
  });
  const [runKey, setRunKey] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [captionOn, setCaptionOn] = useState(true);
  const rootRef = useRef(null);
  const reachedRef = useRef(false);
  const frozenRef = useRef(typeof window !== "undefined" && window.location.search.includes("demoBeat="));

  const active = SCENES[scene];
  const paused = userPaused || !inView;

  /* The old builder demo gated the page chrome behind its prologue; the panel
     demo starts immediately, so release the chrome on mount. */
  useEffect(() => {
    const id = setTimeout(() => window.dispatchEvent(new CustomEvent("admino:intro-complete")), 260);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    // A single threshold (vs. an array) avoids the observer firing repeatedly
    // near a boundary, which previously caused paused/resumed to flap and the
    // camera to visibly "bounce" while otherwise idle.
    const io = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio > 0.2), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    onSceneChange?.(scene);
    reachedRef.current = false;
  }, [scene, onSceneChange]);

  /* The step caption announces the chapter, then gets out of the frame. */
  useEffect(() => {
    setCaptionOn(true);
    const id = setTimeout(() => setCaptionOn(false), 4600);
    return () => clearTimeout(id);
  }, [scene, runKey]);

  useEffect(() => {
    onPauseChange?.(paused);
  }, [paused, onPauseChange]);

  const handleProgress = useCallback(
    (pct) => {
      onProgressChange?.(pct);
      if (!reachedRef.current && pct >= REACHED_END_AT) {
        reachedRef.current = true;
        onSceneReachedEnd?.(scene);
      }
    },
    [onProgressChange, onSceneReachedEnd, scene]
  );

  const handleEnd = useCallback(() => {
    if (frozenRef.current) return;
    setScene((s) => (s < SCENES.length - 1 ? s + 1 : s));
  }, []);

  // QA hook: ?demoScene=3&demoBeat=13 freezes a scene on a given beat.
  const frozen = useMemo(() => {
    if (typeof window === "undefined") return null;
    const q = new URLSearchParams(window.location.search);
    if (!q.has("demoBeat")) return null;
    return { scene: parseInt(q.get("demoScene") || "0", 10), beat: parseInt(q.get("demoBeat"), 10) };
  }, []);

  const { beat: liveBeat, progress, elapsedMs: liveElapsedMs, focus: liveFocus, cursor, clickSeq } = useBeats({
    beats: active.timeline.beats,
    duration: active.duration,
    paused,
    isMobile: mobile,
    sceneKey: `${active.id}-${runKey}`,
    onProgress: handleProgress,
    onEnd: handleEnd,
  });

  const beat = frozen ? frozen.beat : liveBeat;
  const focus = frozen ? resolveFrozenFocus(active.timeline.beats, frozen.beat, mobile) : liveFocus;
  const elapsedMs = frozen ? active.timeline.beats[frozen.beat]?.t ?? 0 : liveElapsedMs;

  const goToScene = useCallback((i) => {
    setScene(Math.max(0, Math.min(SCENES.length - 1, i)));
    setRunKey((k) => k + 1);
    setUserPaused(false);
  }, []);

  const togglePause = useCallback(() => {
    setUserPaused((p) => {
      const next = !p;
      onUserTogglePause?.(next);
      return next;
    });
  }, [onUserTogglePause]);

  useImperativeHandle(ref, () => ({ goToScene, togglePause, scene, paused }), [goToScene, togglePause, scene, paused]);

  const SceneBody = active.Scene;

  return (
    <PanelThemeProvider value={T}>
      <div ref={rootRef} className="demo-root relative h-full w-full overflow-hidden" style={{ background: T.bg }}>
        <Stage
          canvasW={CANVAS_W}
          canvasH={active.canvasH}
          focus={focus}
          beat={beat}
          cursor={cursor}
          clickSeq={clickSeq}
          insetTop={hideFloatingTitles ? 0 : 56}
        >
          <SceneBody tl={active.timeline} beat={beat} elapsedMs={elapsedMs} />
        </Stage>

        {/* floating step caption */}
        {!hideFloatingTitles && (
          <AnimatePresence>
            {captionOn && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute left-3 top-3 z-30 flex max-w-[74%] items-center gap-2.5 rounded-2xl px-3 py-2 backdrop-blur-xl"
              style={{
                background: lightMode ? "rgba(255,255,255,0.72)" : "rgba(11,18,32,0.66)",
                border: `1px solid ${lightMode ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.12)"}`,
                boxShadow: lightMode ? "0 8px 26px rgba(15,23,42,0.12)" : "0 10px 30px rgba(0,0,0,0.4)",
              }}
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white"
                style={{ background: "var(--color-primary, #01678c)" }}
              >
                {String(scene + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block text-[12px] font-semibold leading-tight" style={{ color: T.text }}>
                  {steps[scene].label}
                </span>
                <span className="block truncate text-[10px] leading-tight" style={{ color: T.sub }}>
                  {steps[scene].caption}
                </span>
              </span>
            </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* bottom chrome (desktop; mobile renders its own in Hero) */}
        {!hideSceneControls && (
          <div className="pointer-events-none absolute bottom-[13px] z-40 flex items-center gap-2" style={{ left: "50%", transform: "translateX(-50%)" }}>
            <button
              type="button"
              onClick={togglePause}
              aria-label={paused ? "Resume animation" : "Pause animation"}
              className={`pointer-events-auto flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border backdrop-blur-xl transition-all active:scale-95 ${
                lightMode
                  ? "border-white/60 bg-white/48 shadow-[0_6px_18px_rgba(15,23,42,0.16)] hover:bg-white/70"
                  : "border-white/20 bg-white/10 shadow-sm hover:bg-white/18"
              }`}
            >
              {paused ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className={`ml-0.5 ${lightMode ? "text-slate-700" : "text-white/85"}`}>
                  <path d="M2.5 1.2L10.5 6L2.5 10.8V1.2Z" />
                </svg>
              ) : (
                <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" className={lightMode ? "text-slate-700" : "text-white/85"}>
                  <rect x="0.5" y="0.5" width="3" height="11" rx="0.8" />
                  <rect x="6.5" y="0.5" width="3" height="11" rx="0.8" />
                </svg>
              )}
            </button>

            <DemoLiquidPillNav
              labels={labels}
              activeIndex={scene}
              onSelect={(i) => {
                goToScene(i);
                onUserSceneSelect?.(i);
              }}
              shellClassName="demo-liquid-pill-nav pointer-events-auto relative flex items-center gap-0.5 rounded-full border p-[7px] backdrop-blur-xl"
              shellStyle={{
                background: "var(--demo-liquid-bg)",
                borderColor: "var(--demo-liquid-border)",
                boxShadow: "0 10px 34px var(--demo-liquid-shadow)",
              }}
              getButtonClassName={() => "demo-liquid-pill relative z-10 rounded-full px-3 py-[5px] text-[10px] font-medium transition-colors"}
            />

            {onFocusClick && (
              <button
                type="button"
                onClick={onFocusClick}
                aria-label={focusActive ? "Exit focus mode" : "Enter focus mode"}
                className={`pointer-events-auto flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-[11px] font-medium backdrop-blur-xl transition-all active:scale-95 ${
                  focusActive
                    ? "border-primary/50 bg-primary/15 text-primary shadow-[0_6px_18px_rgba(59,130,246,0.22)]"
                    : lightMode
                    ? "border-white/60 bg-white/48 text-slate-700 shadow-[0_6px_18px_rgba(15,23,42,0.16)] hover:bg-white/70"
                    : "border-white/20 bg-white/10 text-white/80 shadow-sm hover:bg-white/18"
                }`}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {focusActive ? (
                    <>
                      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                    </>
                  ) : (
                    <>
                      <path d="M4 9V4h5" />
                      <path d="M20 9V4h-5" />
                      <path d="M4 15v5h5" />
                      <path d="M20 15v5h-5" />
                    </>
                  )}
                </svg>
                <span>{focusActive ? "Exit Focus" : "Focus"}</span>
              </button>
            )}
          </div>
        )}

        {/* bottom progress line — sits right below the pause/pill-nav/focus row */}
        {!hideSceneControls && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[3px]" style={{ background: T.border }}>
            <div
              className="h-full"
              style={{ width: `${progress}%`, background: "var(--color-primary, #01678c)", transition: "width .12s linear" }}
            />
          </div>
        )}
      </div>
    </PanelThemeProvider>
  );
});

export default PanelDemo;
