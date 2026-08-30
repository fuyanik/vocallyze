import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle, createContext, useContext, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, isLightTheme } from "./ThemeProvider";
import { getPlatformDemoContent } from "./content";
import { DemoLiquidPillNav } from "./DemoLiquidPillNav";
const BASE = "";
const PlatformDemoLocaleContext = createContext(null);
function usePlatformDemoLocale() {
    const ctx = useContext(PlatformDemoLocaleContext);
    if (!ctx)
        throw new Error("usePlatformDemoLocale must be used within PlatformDemoLocaleContext.Provider");
    return ctx;
}
// ─── Shared constants ─────────────────────────────────────────────────────────
const SPRING_CHAT = { type: "spring", stiffness: 120, damping: 22 };
const SPRING_TRANSITION = { type: "spring", stiffness: 65, damping: 18 };
const MODULE_ICONS = [
    "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2",
    "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    "M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H2v-2a3 3 0 015.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
];
const SELECTED_MODULES = new Set([0, 1, 3, 4, 5, 6, 7]);
const DECLINED_MODULE = 2;
const designLanguagesBase = [
    {
        name: "",
        frameBg: "linear-gradient(180deg,#25282c 0%,#1f2226 100%)",
        panelBg: "#f7f7f5",
        panelBorder: "#d8d9dc",
        navText: "#6b7280",
        titleMain: "#111827",
        titleAccent: "#111827",
        desc: "#4b5563",
        btnPrimaryBg: "#111827",
        btnPrimaryText: "#ffffff",
        cardBg: "#ffffff",
        cardTitle: "#111827",
        heroGrad: "linear-gradient(135deg,#e5e7eb,#cbd5e1)",
    },
    {
        name: "",
        frameBg: "linear-gradient(180deg,#1a1f25 0%,#12161b 100%)",
        panelBg: "#060b14",
        panelBorder: "#12304a",
        navText: "#6f859f",
        titleMain: "#eff8ff",
        titleAccent: "#22f3a6",
        desc: "#7da0bc",
        btnPrimaryBg: "#0a2a45",
        btnPrimaryText: "#e8f6ff",
        cardBg: "#091420",
        cardTitle: "#d8f1ff",
        heroGrad: "linear-gradient(135deg,#0d1f35,#1f4b74)",
    },
    {
        name: "",
        frameBg: "linear-gradient(180deg,#1f2623 0%,#141a17 100%)",
        panelBg: "#f2f8ee",
        panelBorder: "#bdd2be",
        navText: "#5f715f",
        titleMain: "#223424",
        titleAccent: "#3b7f4a",
        desc: "#4f5f4f",
        btnPrimaryBg: "#2f6f3f",
        btnPrimaryText: "#f3fff1",
        cardBg: "#ffffff",
        cardTitle: "#264129",
        heroGrad: "linear-gradient(135deg,#cce7c8,#8fbf8e)",
    },
    {
        name: "",
        frameBg: "linear-gradient(180deg,#2a2a2a 0%,#202020 100%)",
        panelBg: "#fefaf2",
        panelBorder: "#e4d8c5",
        navText: "#7c7161",
        titleMain: "#18110a",
        titleAccent: "#8b5e3c",
        desc: "#5f5243",
        btnPrimaryBg: "#15120e",
        btnPrimaryText: "#fefaf2",
        cardBg: "#fffdf8",
        cardTitle: "#1f1710",
        heroGrad: "linear-gradient(135deg,#f8efe0,#e6d2b8)",
    },
    {
        name: "",
        frameBg: "linear-gradient(180deg,#1b2431 0%,#111722 100%)",
        panelBg: "linear-gradient(140deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04))",
        panelBorder: "rgba(193,218,255,0.28)",
        navText: "rgba(229,238,255,0.72)",
        titleMain: "#eff6ff",
        titleAccent: "#93c5fd",
        desc: "#c7d8f1",
        btnPrimaryBg: "linear-gradient(120deg,#5da9ff,#3777f0)",
        btnPrimaryText: "#ffffff",
        cardBg: "rgba(255,255,255,0.08)",
        cardTitle: "#dbeafe",
        heroGrad: "linear-gradient(135deg,rgba(120,180,255,0.3),rgba(255,255,255,0.15))",
    },
    {
        name: "",
        frameBg: "linear-gradient(180deg,#1f2123 0%,#181a1d 100%)",
        panelBg: "#fdfdf9",
        panelBorder: "#121212",
        navText: "#222222",
        titleMain: "#0b0c12",
        titleAccent: "#0b0c12",
        desc: "#252525",
        btnPrimaryBg: "#111111",
        btnPrimaryText: "#fffef5",
        cardBg: "#ffffff",
        cardTitle: "#0f1016",
        heroGrad: "linear-gradient(135deg,#fff,#ffe92b)",
    },
];
// Layout grouping (styles indices). Labels are localized via context.
const LAYOUT_STYLE_GROUPS = [
    [0, 1, 2],
    [1, 3, 4],
    [4, 1, 2],
];
const BUILD_STEP_ICONS = ["infra", "theme", "modules", "integrations", "launch"];
function BuildStepGlyph({ icon }) {
    const cls = "h-4 w-4";
    if (icon === "infra")
        return <svg viewBox="0 0 20 20" fill="none" className={cls}><rect x="2.3" y="3.1" width="15.4" height="5.1" rx="1.4" stroke="currentColor" strokeWidth="1.4"/><rect x="2.3" y="11.8" width="15.4" height="5.1" rx="1.4" stroke="currentColor" strokeWidth="1.4"/><circle cx="5" cy="5.65" r="0.9" fill="currentColor"/><circle cx="5" cy="14.35" r="0.9" fill="currentColor"/></svg>;
    if (icon === "theme")
        return <svg viewBox="0 0 20 20" fill="none" className={cls}><path d="M10 2.6a7.4 7.4 0 1 0 0 14.8h1a2 2 0 0 0 0-4h-.5a1.3 1.3 0 0 1-1.3-1.3v-.4a1.3 1.3 0 0 1 1.3-1.3h1.7a4.1 4.1 0 0 0 4.1-4.1A3.7 3.7 0 0 0 12.6 2.6H10Z" stroke="currentColor" strokeWidth="1.4"/><circle cx="6.2" cy="8.1" r="0.9" fill="currentColor"/></svg>;
    if (icon === "modules")
        return <svg viewBox="0 0 20 20" fill="none" className={cls}><rect x="2.5" y="2.5" width="6.1" height="6.1" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="11.4" y="2.5" width="6.1" height="6.1" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="2.5" y="11.4" width="6.1" height="6.1" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="11.4" y="11.4" width="6.1" height="6.1" rx="1.2" stroke="currentColor" strokeWidth="1.4"/></svg>;
    if (icon === "integrations")
        return <svg viewBox="0 0 20 20" fill="none" className={cls}><path d="M5.2 6.7a2.7 2.7 0 1 1 3.8-3.8l1.2 1.1-3.8 3.8-1.2-1.1ZM10 14l3.8-3.8 1.2 1.1a2.7 2.7 0 0 1-3.8 3.8L10 14Z" stroke="currentColor" strokeWidth="1.4"/><path d="m7.4 12.6 5.2-5.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;
    return <svg viewBox="0 0 20 20" fill="none" className={cls}><path d="M10 2.6 6.7 9.1h2.5L7.8 17.4l5.5-7.7h-2.5L10 2.6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>;
}
const DASHBOARD_TAB_IDS = ["overview", "news", "courses", "analytics", "ai-assistant"];
const DASHBOARD_TAB_ICONS = [
    "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4",
    "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.952 9.168-5",
    "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
];
const DASH_RING_R = 11;
const DASH_CIRC = 2 * Math.PI * DASH_RING_R;
// ─── Cursor SVG ───────────────────────────────────────────────────────────────
function DemoCursor({ size = 26, light = false }) {
    const fillColor = light ? "#0f172a" : "#ffffff";
    const strokeColor = light ? "#ffffff" : "rgba(15,23,42,0.92)";
    const strokeWidth = light ? "1.8" : "1.1";
    const highlightColor = light ? "rgba(255,255,255,0.14)" : "rgba(15,23,42,0.08)";
    return (<svg width={size} height={size} viewBox="0 0 28 32" fill="none" style={{ transform: "rotate(-6deg)", transformOrigin: "8px 3px" }}>
      {/* Index-finger tap pointer: fingertip anchors near (8, 2) so positions remain accurate */}
      <path d="M8 2.5
           C 6.8 2.5, 6 3.4, 6 4.6
           L 6 15
           L 4.6 15
           C 3.2 15, 2 16.1, 2 17.5
           C 2 18.2, 2.25 18.9, 2.75 19.4
           L 7.5 24.4
           C 9.1 26.1, 11.3 27, 13.6 27
           L 17 27
           C 20.6 27, 23.5 24.1, 23.5 20.5
           L 23.5 13.6
           C 23.5 12.4, 22.6 11.5, 21.4 11.5
           C 20.2 11.5, 19.3 12.4, 19.3 13.6
           L 19.3 11.2
           C 19.3 10, 18.4 9.1, 17.2 9.1
           C 16 9.1, 15.1 10, 15.1 11.2
           L 15.1 10
           C 15.1 8.8, 14.2 7.9, 13 7.9
           C 11.8 7.9, 10.9 8.8, 10.9 10
           L 10.9 4.6
           C 10.9 3.4, 10 2.5, 8.8 2.5
           Z" fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round"/>
      {/* Fingertip highlight for depth */}
      <path d="M7.2 4.2 C 7.2 3.6, 7.6 3.3, 8 3.3 C 8.4 3.3, 8.8 3.6, 8.8 4.2 L 8.8 9 L 7.2 9 Z" fill={highlightColor}/>
    </svg>);
}
// ─── Chat Panel (persistent, animated container) ──────────────────────────────
function ChatPanel({ mode, items, typingRole, sidebarMessages, compact, inputActive, inputText, showFastForward, latestFromPopup, scrollPauseEnabled, onUserScrollPauseChange, allowScrollOnly, }) {
    const { theme } = useTheme();
    const isLight = isLightTheme(theme);
    const { shared, chat, MODULE_LIST } = usePlatformDemoLocale();
    const scrollRef = useRef(null);
    // ── User scroll-to-pause state ────────────────────────────────────────────
    const RESUME_DELAY_MS = 4250;
    const BOTTOM_HOLD_MS = 1000;
    const SCROLL_DEBOUNCE_MS = 1000; // wait this long after last scroll before starting pie
    const [userScrollLocked, setUserScrollLocked] = useState(false);
    const [countdownProgress, setCountdownProgress] = useState(0); // 0..1 (1 = timer complete)
    const userScrollLockedRef = useRef(false);
    const programmaticScrollRef = useRef(false);
    const programmaticScrollTimeoutRef = useRef(null);
    const countdownRafRef = useRef(null);
    const countdownStartRef = useRef(0);
    const scrollDebounceRef = useRef(null);
    const bottomHoldTimeoutRef = useRef(null);
    const onUserScrollPauseChangeRef = useRef(onUserScrollPauseChange);
    useEffect(() => { onUserScrollPauseChangeRef.current = onUserScrollPauseChange; }, [onUserScrollPauseChange]);
    const stopCountdown = useCallback(() => {
        if (countdownRafRef.current != null) {
            cancelAnimationFrame(countdownRafRef.current);
            countdownRafRef.current = null;
        }
        if (scrollDebounceRef.current != null) {
            window.clearTimeout(scrollDebounceRef.current);
            scrollDebounceRef.current = null;
        }
        if (bottomHoldTimeoutRef.current != null) {
            window.clearTimeout(bottomHoldTimeoutRef.current);
            bottomHoldTimeoutRef.current = null;
        }
    }, []);
    const setProgrammaticScroll = useCallback(() => {
        programmaticScrollRef.current = true;
        if (programmaticScrollTimeoutRef.current != null) {
            window.clearTimeout(programmaticScrollTimeoutRef.current);
        }
        programmaticScrollTimeoutRef.current = window.setTimeout(() => {
            programmaticScrollRef.current = false;
            programmaticScrollTimeoutRef.current = null;
        }, 180);
    }, []);
    const unlockAndResume = useCallback((smoothScroll) => {
        stopCountdown();
        userScrollLockedRef.current = false;
        setUserScrollLocked(false);
        setCountdownProgress(0);
        onUserScrollPauseChangeRef.current?.(false);
        const el = scrollRef.current;
        if (el) {
            setProgrammaticScroll();
            if (smoothScroll) {
                el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
            }
            else {
                el.scrollTop = el.scrollHeight;
            }
        }
    }, [stopCountdown, setProgrammaticScroll]);
    const startCountdown = useCallback(() => {
        stopCountdown();
        countdownStartRef.current = performance.now();
        setCountdownProgress(0);
        const tick = () => {
            const elapsed = performance.now() - countdownStartRef.current;
            const p = Math.min(elapsed / RESUME_DELAY_MS, 1);
            setCountdownProgress(p);
            if (p < 1) {
                countdownRafRef.current = requestAnimationFrame(tick);
            }
            else {
                countdownRafRef.current = null;
                unlockAndResume(true);
            }
        };
        countdownRafRef.current = requestAnimationFrame(tick);
    }, [stopCountdown, unlockAndResume]);
    // Auto-scroll to bottom when new content arrives, unless user has scrolled up.
    useEffect(() => {
        const el = scrollRef.current;
        if (!el)
            return;
        if (userScrollLockedRef.current)
            return;
        setProgrammaticScroll();
        el.scrollTop = el.scrollHeight;
    }, [items, typingRole, sidebarMessages, setProgrammaticScroll]);
    // Listen to user scroll to toggle pause-lock.
    useEffect(() => {
        const el = scrollRef.current;
        if (!el)
            return;
        if (!scrollPauseEnabled) {
            // Cleanup any existing lock if feature disabled.
            if (userScrollLockedRef.current) {
                stopCountdown();
                userScrollLockedRef.current = false;
                setUserScrollLocked(false);
                setCountdownProgress(0);
                onUserScrollPauseChangeRef.current?.(false);
            }
            return;
        }
        const handleScroll = () => {
            if (programmaticScrollRef.current)
                return;
            const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
            const atBottom = distanceFromBottom < 6;
            if (atBottom) {
                if (userScrollLockedRef.current) {
                    // Clear pending debounce + pie while waiting at bottom
                    if (scrollDebounceRef.current != null) {
                        window.clearTimeout(scrollDebounceRef.current);
                        scrollDebounceRef.current = null;
                    }
                    if (countdownRafRef.current != null) {
                        cancelAnimationFrame(countdownRafRef.current);
                        countdownRafRef.current = null;
                        setCountdownProgress(0);
                    }
                    // Resume only if user stays at bottom for a short hold period.
                    if (bottomHoldTimeoutRef.current == null) {
                        bottomHoldTimeoutRef.current = window.setTimeout(() => {
                            bottomHoldTimeoutRef.current = null;
                            if (!userScrollLockedRef.current)
                                return;
                            const stillAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 6;
                            if (stillAtBottom)
                                unlockAndResume(false);
                        }, BOTTOM_HOLD_MS);
                    }
                }
            }
            else {
                if (bottomHoldTimeoutRef.current != null) {
                    window.clearTimeout(bottomHoldTimeoutRef.current);
                    bottomHoldTimeoutRef.current = null;
                }
                // Lock immediately on first upward scroll
                if (!userScrollLockedRef.current) {
                    userScrollLockedRef.current = true;
                    setUserScrollLocked(true);
                    onUserScrollPauseChangeRef.current?.(true);
                }
                // Reset the countdown display while actively scrolling
                if (countdownRafRef.current != null) {
                    cancelAnimationFrame(countdownRafRef.current);
                    countdownRafRef.current = null;
                    setCountdownProgress(0);
                }
                // Debounce: only start the pie countdown after user stops scrolling for SCROLL_DEBOUNCE_MS
                if (scrollDebounceRef.current != null) {
                    window.clearTimeout(scrollDebounceRef.current);
                }
                scrollDebounceRef.current = window.setTimeout(() => {
                    scrollDebounceRef.current = null;
                    if (userScrollLockedRef.current)
                        startCountdown();
                }, SCROLL_DEBOUNCE_MS);
            }
        };
        el.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            el.removeEventListener("scroll", handleScroll);
        };
    }, [scrollPauseEnabled, startCountdown, unlockAndResume, stopCountdown]);
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopCountdown(); // also clears scrollDebounceRef
            if (programmaticScrollTimeoutRef.current != null) {
                window.clearTimeout(programmaticScrollTimeoutRef.current);
            }
        };
    }, [stopCountdown]);
    const isSidebar = mode === "sidebar";
    const fontSize = isSidebar ? "text-[10px]" : "text-[13px]";
    const avatarSize = isSidebar ? "h-5 w-5 text-[7px]" : "h-7 w-7 text-[10px]";
    const gap = isSidebar ? "gap-1.5" : "gap-2.5";
    const px = isSidebar ? "px-3" : "px-5";
    const py = isSidebar ? "py-2" : "py-3";
    return (<div className="pointer-events-none flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-surface/62 backdrop-blur-xl">
      <div className={`flex shrink-0 items-center gap-2 border-b border-white/10 bg-surface/55 ${px} ${py}`}>
        <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/25 bg-white ${isSidebar ? "h-6 w-6" : "h-8 w-8"}`}>
          <img src={`${BASE}/admino-logo.png`} alt={shared.logoAlt} className="h-[85%] w-[85%] object-contain"/>
        </div>
        <div className={`font-semibold text-foreground ${isSidebar ? "text-[11px]" : "text-[14px]"}`}>
          {chat.panel.header}
        </div>
        <div className={`ml-auto flex items-center gap-1.5 text-accent ${isSidebar ? "text-[9px]" : "text-[11px]"}`}>
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"/>
          {chat.panel.status}
        </div>
      </div>

      {/* Content area — relative so the FF badge can float inside it */}
      <div className="relative min-h-0 flex-1">
        <AnimatePresence>
          {showFastForward && !isSidebar && !userScrollLocked && (<motion.div initial={{ opacity: 0, scale: 0.5, y: 6 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 6 }} transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }} className="pointer-events-none absolute bottom-3 left-4 z-20 flex h-8 w-8 items-center justify-center overflow-visible rounded-full border backdrop-blur-2xl" style={{
                background: "var(--demo-liquid-bg)",
                borderColor: "var(--demo-liquid-border)",
                boxShadow: "0 6px 20px var(--demo-liquid-shadow), 0 2px 10px rgba(0,0,0,0.22), 0 12px 28px rgba(0,0,0,0.12)",
            }}>
              <motion.svg viewBox="0 0 24 24" fill="currentColor" className="block h-[32  px] w-[32px] shrink-0 left-[1px] relative text-foreground/80" aria-hidden animate={{ opacity: [1, 0.55, 1] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                <path d="M6 7L6 17 12 12ZM12 7L12 17 18 12Z"/>
              </motion.svg>
            </motion.div>)}
        </AnimatePresence>

        {/* Scroll-pause countdown — replaces FF badge while user is scrolled up */}
        <AnimatePresence>
          {!isSidebar && userScrollLocked && (<motion.button type="button" onClick={() => unlockAndResume(true)} initial={{ opacity: 0, scale: 0.5, y: 6 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 6 }} transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }} className="absolute bottom-3 left-4 z-20 flex h-9 w-9 items-center justify-center overflow-visible rounded-full border-2" style={{
                background: "white",
                borderColor: "rgba(100,116,139,0.55)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            }} aria-label={shared.controls.resumeDemoAria}>
              {/* Pie fill */}
              <div className="pointer-events-none absolute inset-[2px] rounded-full" style={{
                background: `conic-gradient(rgba(100,116,139,0.70) ${countdownProgress * 360}deg, rgba(241,245,249,0.90) 0deg)`,
            }}/>
            </motion.button>)}
        </AnimatePresence>

        <div ref={scrollRef} className={`flex h-full flex-col ${gap} overflow-y-auto ${px} pt-3 ${isSidebar ? "pb-3" : "pb-16"} ${allowScrollOnly ? "pointer-events-auto touch-pan-y" : "pointer-events-none"}`}>
        <AnimatePresence mode="popLayout">
          {!isSidebar && items.map((item, i) => {
            if (item.kind === "message") {
                const isLatest = i === items.length - 1;
                const popupEntry = isLatest && latestFromPopup && item.role === "user";
                return (<motion.div key={`msg-${i}`} initial={popupEntry ? { opacity: 0, scale: 0.68, y: -18 } : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }} transition={popupEntry
                        ? {
                            opacity: { duration: 0.28, ease: "easeOut" },
                            scale: { type: "spring", stiffness: 280, damping: 20 },
                            y: { type: "spring", stiffness: 280, damping: 22 },
                        }
                        : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className={`flex items-end gap-2 ${item.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${avatarSize} ${item.role === "ai" ? "border border-primary/30 bg-primary/20 text-primary" : "border border-accent/30 bg-accent/20 text-accent"}`}>
                  {item.role === "ai" ? chat.avatars.ai : chat.avatars.user}
                </div>
                <div className={`max-w-[82%] rounded-xl px-3.5 py-2.5 leading-relaxed ${fontSize} ${item.role === "ai" ? "rounded-bl-sm bg-white/7 text-foreground/90 shadow-[0_2px_12px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.06)]" : "rounded-br-sm bg-primary/20 text-primary shadow-[0_2px_10px_rgba(59,130,246,0.18)]"}`}>
                  {item.text.split("\n").map((line, li, arr) => (<span key={li}>
                      {line}
                      {li < arr.length - 1 && (line === "" ? <br /> : <br />)}
                    </span>))}
                </div>
              </motion.div>);
            }
            if (item.kind === "searching") {
                return (<motion.div key={`search-${i}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="flex items-start gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/20 text-[10px] font-bold text-primary">{chat.avatars.ai}</div>
                <div className="flex-1 rounded-xl rounded-bl-sm bg-white/7 px-3.5 py-3">
                  <div className="mb-2 text-[13px] leading-relaxed text-foreground/90">{item.label}</div>
                  <div className="flex flex-col gap-1.5">
                    {chat.searchingSteps.map((step, si) => (<motion.div key={si} initial={{ opacity: 0, x: -6 }} animate={{ opacity: item.done ? 1 : si < 2 ? 1 : 0.5, x: 0 }} transition={{ delay: si * 0.4, duration: 0.3 }} className="flex items-center gap-2">
                        {item.done || si < 2 ? (<motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: si * 0.4 + 0.3, type: "spring", stiffness: 300 }} className="flex h-4 w-4 items-center justify-center rounded-full bg-accent/20 text-[8px] text-accent">&#10003;</motion.span>) : (<span className="flex h-4 w-4 items-center justify-center">
                            <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-primary/30 border-t-primary"/>
                          </span>)}
                        <span className="text-[11px] text-foreground/60">{step}</span>
                      </motion.div>))}
                  </div>
                </div>
              </motion.div>);
            }
            if (item.kind === "monetizePaths") {
                return (<motion.div key={`mpaths-${i}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="flex items-end gap-2">
                <div className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${avatarSize} border border-primary/30 bg-primary/20 text-primary`}>{chat.avatars.ai}</div>
                <div className={`max-w-[88%] rounded-xl rounded-bl-sm bg-white/7 px-3.5 py-2.5 text-foreground/90 ${fontSize}`}>
                  <p className="mb-1.5 font-semibold leading-snug">{chat.monetize.question}</p>
                  <p className="mb-2 leading-relaxed text-foreground/70">{chat.monetize.intro}</p>
                  <div className="mb-2.5 flex flex-col gap-1.5">
                    <div className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80"/>
                      <div>
                        <div className={`font-semibold leading-tight text-primary ${isSidebar ? "text-[9px]" : "text-[12px]"}`}>{chat.monetize.paths[0].label}</div>
                        <div className={`mt-0.5 leading-snug text-foreground/60 ${isSidebar ? "text-[8px]" : "text-[11px]"}`}>{chat.monetize.paths[0].desc}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80"/>
                      <div>
                        <div className={`font-semibold leading-tight text-primary ${isSidebar ? "text-[9px]" : "text-[12px]"}`}>{chat.monetize.paths[1].label}</div>
                        <div className={`mt-0.5 leading-snug text-foreground/60 ${isSidebar ? "text-[8px]" : "text-[11px]"}`}>{chat.monetize.paths[1].desc}</div>
                      </div>
                    </div>
                  </div>
                  <p className="leading-relaxed text-foreground/70">{chat.monetize.suggestion}</p>
                </div>
              </motion.div>);
            }
            if (item.kind === "fastScroll") {
                return (<motion.div key={`fast-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }} transition={{ duration: 0.3 }} className="relative my-1 overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-linear-to-b from-surface/80 to-transparent"/>
                <div className="flex flex-col gap-1.5">
                  {item.messages.map((msg, mi) => (<motion.div key={mi} initial={{ opacity: 0, y: 10 }} animate={{ opacity: mi >= item.messages.length - 2 ? 0.8 : 0.35, y: 0 }} transition={{ delay: mi * 0.08, duration: 0.2 }} className={`flex items-end gap-1.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                      <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[7px] font-semibold ${msg.role === "ai" ? "border border-primary/30 bg-primary/20 text-primary" : "border border-accent/30 bg-accent/20 text-accent"}`}>
                        {msg.role === "ai" ? chat.avatars.ai : chat.avatars.user}
                      </div>
                      <div className={`max-w-[78%] rounded-lg px-2.5 py-1.5 text-[11px] leading-relaxed ${msg.role === "ai" ? "rounded-bl-sm bg-white/7 text-foreground/70" : "rounded-br-sm bg-primary/15 text-primary/70"}`}>
                        {msg.text}
                      </div>
                    </motion.div>))}
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-4 bg-linear-to-t from-surface/80 to-transparent"/>
              </motion.div>);
            }
            if (item.kind === "logoUpload") {
                return (<motion.div key={`logo-${i}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="flex flex-row-reverse items-end gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/20 text-[10px] font-bold text-accent">{chat.avatars.user}</div>
                <div className="w-[88%] rounded-xl rounded-br-sm bg-accent/15 px-3 py-2.5">
                  <div className="mb-1.5 text-[11px] font-medium text-accent/90">
                    {item.done ? chat.logoUpload.done : chat.logoUpload.uploading}
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-2">
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0 text-accent/70" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M8 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="text-[10px] font-medium text-foreground/80">{chat.logoUpload.fileName}</span>
                      {item.done && <span className="ml-auto flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[7px] font-bold text-[#04221a]">&#10003;</span>}
                    </div>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
                      <motion.div className="h-full rounded-full bg-accent/70" animate={{ width: `${item.progress}%` }} transition={{ duration: 0.3 }}/>
                    </div>
                    <div className="mt-1 text-[8.5px] text-muted/60">{item.done ? chat.logoUpload.statusDone : chat.logoUpload.statusUploading}</div>
                  </div>
                </div>
              </motion.div>);
            }
            if (item.kind === "modules") {
                return (<motion.div key={`mods-${i}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="my-1">
                <div className="mb-2.5 text-[11px] font-semibold text-foreground/60 tracking-wide">{chat.moduleIntro}</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {MODULE_LIST.map((mod, mi) => {
                        const sel = item.selected.has(mi);
                        const dec = item.declined.has(mi);
                        const isBouncing = item.bouncing.has(mi);
                        const isRed = dec;
                        const isGreen = sel && !dec;
                        return (<motion.div key={mi} data-demo-id={`module-${mi}`} initial={{ opacity: 0, y: 16 }} animate={isBouncing
                                ? { opacity: 1, y: [0, -13, 0] }
                                : { opacity: 1, y: 0 }} transition={isBouncing
                                ? { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                                : { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: Math.floor(mi / 2) * 0.18 }} className={`relative flex items-center gap-2.5 overflow-hidden rounded-lg border px-3 py-2 transition-colors duration-500 ${isGreen ? "border-accent/40 bg-accent/10" : isRed ? "border-gray-300/25 bg-gray-300/10 opacity-55 shadow-[0_2px_8px_rgba(0,0,0,0.35)]" : "border-white/10 bg-white/4"}`}>
                        {/* Faded background icon */}
                        <svg className="absolute -right-1 -bottom-1 h-9 w-9 opacity-[0.08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} style={{ color: sel ? "var(--accent)" : dec ? "#6b7280" : "white" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={mod.icon}/>
                        </svg>
                        {/* Icon container */}
                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${sel ? "bg-accent/20" : dec ? "bg-gray-300/15" : "bg-white/8"}`}>
                          <svg className={`h-3.5 w-3.5 ${sel ? "text-accent" : dec ? "text-gray-300" : "text-muted/70"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={mod.icon}/>
                          </svg>
                        </div>
                        {/* Text */}
                        <div className="min-w-0 flex-1">
                          <div className={`truncate text-[9.5px] font-semibold leading-tight transition-colors duration-500 ${isGreen ? "text-accent" : isRed ? "text-gray-300" : "text-foreground/85"}`}>{mod.name}</div>
                          <div className={`text-[7.5px] font-medium transition-colors duration-500 ${isGreen ? "text-accent/55" : "text-muted/45"}`}>{mod.tag}</div>
                        </div>
                        {/* Info + Status badge */}
                        <div className="pointer-events-none ml-auto flex shrink-0 items-center gap-1.5 self-center">
                          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white/30 bg-white/12 text-[7px] font-bold text-white/50">i</span>
                          {isGreen && <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[7px] font-bold text-[#04221a]">&#10003;</span>}
                          {(dec && !isBouncing) && <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gray-300/20 text-[7px] font-bold text-gray-300">&#10005;</span>}
                        </div>
                      </motion.div>);
                    })}
                </div>
              </motion.div>);
            }
            return null;
        })}
        </AnimatePresence>

        {isSidebar && sidebarMessages.map((msg, i) => {
            const isApplied = msg.role === "ai" && msg.text.startsWith("✓");
            if (isApplied) {
                return (<motion.div key={`sb-${i}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-2">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/25 text-[8px] text-emerald-400">✓</span>
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-400">{chat.appliedBadge}</span>
                </div>
                <div className="text-[10px] leading-relaxed text-emerald-200/80">
                  {msg.text.replace(/^✓\s*/, "")}
                </div>
              </motion.div>);
            }
            return (<motion.div key={`sb-${i}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className={`flex items-start gap-1.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full font-bold text-[6px] ${msg.role === "ai" ? "border border-primary/30 bg-primary/20 text-primary" : "border border-accent/30 bg-accent/20 text-accent"}`}>
                {msg.role === "ai" ? chat.avatars.ai : chat.avatars.user}
              </div>
              <div className={`max-w-[85%] rounded-lg px-2.5 py-1.5 text-[10px] leading-relaxed ${msg.role === "ai" ? "rounded-bl-sm bg-white/7 text-foreground/85" : "rounded-br-sm bg-primary/15 text-primary/85"}`}>
                {msg.text}
              </div>
            </motion.div>);
        })}

        {typingRole !== null && (<motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className={`flex items-end gap-2 ${typingRole === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${isSidebar ? "h-4 w-4 text-[6px]" : "h-6 w-6 text-[9px]"} ${typingRole === "ai" ? "border border-primary/30 bg-primary/20 text-primary" : "border border-accent/30 bg-accent/20 text-accent"}`}>
              {typingRole === "ai" ? chat.avatars.ai : chat.avatars.user}
            </div>
            <div className="flex items-center gap-1 rounded-xl rounded-bl-sm bg-white/7 px-2.5 py-2">
              {[0, 1, 2].map((j) => (<span key={j} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted/50" style={{ animationDelay: `${j * 0.15}s` }}/>))}
            </div>
          </motion.div>)}
      </div>
      </div>{/* end content-area wrapper */}

      {(<div className={`flex shrink-0 items-center gap-2 border-t border-white/10 bg-surface/55 ${px} ${py}`}>
          <div data-demo-id="chat-input" className={`flex-1 rounded-xl border px-3 py-2 ${isSidebar ? "text-[9px]" : "text-[12px]"} ${inputActive ? "border-primary/40 bg-white/8" : "border-white/10 bg-white/5"}`}>
            {inputText ? (<span className="text-foreground/90">{inputText}<span className="ml-px inline-block h-3.5 w-px animate-pulse bg-primary align-middle"/></span>) : (<span className="text-muted/60">
                {inputActive && <span className="inline-block h-3.5 w-px animate-pulse bg-primary align-middle"/>}
                {!inputActive && (isSidebar ? chat.panel.placeholder.sidebar : chat.panel.placeholder.full)}
              </span>)}
          </div>
          <div className={`flex items-center justify-center rounded-lg bg-primary ${isSidebar ? "h-6 w-6" : "h-8 w-8"}`}>
            <svg width={isSidebar ? 8 : 11} height={isSidebar ? 8 : 11} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </div>
        </div>)}
    </div>);
}
// ─── Design Preview Card ──────────────────────────────────────────────────────
// layoutVariant: 0 = Split  (left text / right photo)
//                1 = Full Bleed (full-bg photo + centered overlay)
//                2 = Centered title + 4 course cards
function DesignPreviewCard({ lang, selected, small, compactSmall, fixedSize, largePopup, layoutVariant = 0 }) {
    const { design } = usePlatformDemoLocale();
    const h = largePopup
        ? "h-[150px] sm:h-[160px] lg:h-[168px]"
        : small ? (compactSmall ? "h-[76px]" : "h-[90px]") : "h-[110px]";
    const ring = selected
        ? "border-accent/60 shadow-[0_0_16px_rgba(6,214,160,0.25)]"
        : "border-white/10";
    const wrap = `${h} ${fixedSize ? "w-[152px] sm:w-[166px]" : "w-full"} shrink-0 overflow-hidden rounded-xl border-2 transition-all ${ring}`;
    const isLightText = lang.titleMain.startsWith("#e") || lang.titleMain.startsWith("#d");
    const logoStyle = isLightText
        ? { filter: "brightness(0) invert(1)" }
        : { mixBlendMode: "multiply" };
    // Shared mini navbar — NutriFit logo + 2 nav links + Sign Up pill
    const MiniNav = () => (<div className={`flex shrink-0 items-center justify-between border-b ${largePopup ? "px-2.5 py-1" : "px-[6px] py-[2.5px]"}`} style={{ borderColor: lang.panelBorder, background: lang.panelBg }}>
      <img src={`${BASE}/nutrifit-logo.png`} alt={design.preview.brand} className={`${largePopup ? "h-[10px]" : "h-[8px]"} w-auto object-contain`} style={logoStyle}/>
      <div className={`flex items-center ${largePopup ? "gap-2" : "gap-[3.5px]"}`}>
        {design.preview.navItems.map((item) => (<span key={item} className={`whitespace-nowrap ${largePopup ? "text-[6px]" : "text-[4px]"} font-medium leading-none`} style={{ color: lang.navText }}>{item}</span>))}
        <span className={`whitespace-nowrap rounded-[2px] ${largePopup ? "px-1.5 py-0.5 text-[5.5px]" : "px-[3px] py-[1px] text-[4px]"} font-semibold leading-none`} style={{ background: lang.btnPrimaryBg, color: lang.btnPrimaryText }}>{design.preview.cta}</span>
      </div>
    </div>);
    // ── Layout 0: Text Left / Photo Right ─────────────────────────────────────
    if (layoutVariant === 0) {
        return (<div className={wrap}>
        <div className="flex h-full flex-col" style={{ background: lang.panelBg }}>
          <MiniNav />
          <div className="flex flex-1 overflow-hidden">
            <div className={`${largePopup ? "w-[58%] gap-1 px-3 py-2" : "w-[52%] gap-[2.5px] px-[7px] py-1"} flex shrink-0 flex-col justify-center`}>
              <span className={`${largePopup ? "text-[6px]" : "text-[4px]"} whitespace-nowrap font-semibold uppercase tracking-[0.05em] leading-none`} style={{ color: lang.titleAccent }}>{design.preview.eyebrow}</span>
              <div>
                <div className={`${largePopup ? "text-[12px]" : "text-[6px]"} whitespace-nowrap font-bold leading-[1.12]`} style={{ color: lang.titleMain }}>{design.preview.headline[0]}</div>
                <div className={`${largePopup ? "text-[12px]" : "text-[6px]"} whitespace-nowrap font-bold leading-[1.12]`} style={{ color: lang.titleAccent }}>{design.preview.headline[1]}</div>
              </div>
              <span className={`${largePopup ? "text-[6px]" : "text-[3.5px]"} whitespace-nowrap leading-none`} style={{ color: lang.desc, opacity: 0.68 }}>{design.preview.sub}</span>
              <div className={`${largePopup ? "mt-1 gap-1.5" : "mt-[2px] gap-[3px]"} flex`}>
                <span className={`${largePopup ? "px-2 py-1 text-[6px]" : "px-[4px] py-[1.5px] text-[4px]"} whitespace-nowrap rounded-[2px] font-semibold leading-none`} style={{ background: lang.btnPrimaryBg, color: lang.btnPrimaryText }}>{design.preview.buttons[0]}</span>
                <span className={`${largePopup ? "px-2 py-1 text-[6px]" : "px-[4px] py-[1.5px] text-[4px]"} whitespace-nowrap rounded-[2px] border font-semibold leading-none`} style={{ borderColor: lang.panelBorder, color: lang.titleMain }}>{design.preview.buttons[1]}</span>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <img src={`${BASE}/course-fitness.jpg`} alt="" className="h-full w-full object-cover"/>
            </div>
          </div>
        </div>
      </div>);
    }
    // ── Layout 1: Full Bleed Photo + Centered Overlay ─────────────────────────
    if (layoutVariant === 1) {
        // Ensure accent colour is legible on the dark photo background
        const r = parseInt(lang.titleAccent.slice(1, 3), 16) || 0;
        const g = parseInt(lang.titleAccent.slice(3, 5), 16) || 0;
        const b = parseInt(lang.titleAccent.slice(5, 7), 16) || 0;
        const accentBrightness = 0.299 * r + 0.587 * g + 0.114 * b;
        const accentOnDark = accentBrightness < 120 ? "rgba(255,255,255,0.80)" : lang.titleAccent;
        return (<div className={`${wrap} demo-preserve-dark`}>
        <div className="relative h-full overflow-hidden">
          <img src={`${BASE}/course-yoga.jpg`} alt="" className="absolute inset-0 h-full w-full object-cover"/>
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(0,0,0,0.28) 0%,rgba(0,0,0,0.72) 100%)" }}/>
          <div className="absolute inset-0 opacity-20" style={{ background: lang.titleAccent }}/>

          <div className={`absolute left-0 right-0 top-0 flex items-center justify-between border-b border-white/12 ${largePopup ? "px-2.5 py-1" : "px-[6px] py-[2.5px]"}`}>
            <img src={`${BASE}/nutrifit-logo.png`} alt={design.preview.brand} className={`${largePopup ? "h-[10px]" : "h-[8px]"} w-auto object-contain`} style={{ filter: "brightness(0) invert(1)" }}/>
            <div className={`flex items-center ${largePopup ? "gap-2" : "gap-[3.5px]"}`}>
              {design.preview.navItems.map((item) => (<span key={item} className={`${largePopup ? "text-[6px]" : "text-[4px]"} whitespace-nowrap font-medium leading-none text-white/60`}>{item}</span>))}
              <span className={`${largePopup ? "px-1.5 py-0.5 text-[5.5px]" : "px-[3px] py-[1px] text-[4px]"} whitespace-nowrap rounded-[2px] font-semibold leading-none`} style={{ background: lang.btnPrimaryBg, color: lang.btnPrimaryText }}>{design.preview.cta}</span>
            </div>
          </div>

          <div className={`absolute inset-0 flex flex-col items-center justify-center ${largePopup ? "gap-1 px-8 pt-4" : "gap-[2.5px] px-3 pt-2"}`}>
            <span className={`${largePopup ? "text-[6px]" : "text-[4px]"} whitespace-nowrap font-semibold uppercase tracking-[0.05em] leading-none text-white/50`}>{design.preview.eyebrow}</span>
            <div className="text-center">
              <div className={`${largePopup ? "text-[14px]" : "text-[7px]"} whitespace-nowrap font-bold leading-[1.12] text-white`}>{design.preview.headline[0]}</div>
              <div className={`${largePopup ? "text-[14px]" : "text-[7px]"} whitespace-nowrap font-bold leading-[1.12]`} style={{ color: accentOnDark }}>{design.preview.headline[1]}</div>
            </div>
            <span className={`${largePopup ? "text-[6px]" : "text-[3.5px]"} whitespace-nowrap leading-none text-white/45`}>{design.preview.sub}</span>
            <div className={`${largePopup ? "mt-1 gap-1.5" : "mt-[2px] gap-[3px]"} flex`}>
              <span className={`${largePopup ? "px-2 py-1 text-[6px]" : "px-[4px] py-[1.5px] text-[4px]"} whitespace-nowrap rounded-[2px] font-semibold leading-none`} style={{ background: lang.btnPrimaryBg, color: lang.btnPrimaryText }}>{design.preview.buttons[0]}</span>
              <span className={`${largePopup ? "px-2 py-1 text-[6px]" : "px-[4px] py-[1.5px] text-[4px]"} whitespace-nowrap rounded-[2px] border border-white/30 font-semibold leading-none text-white/75`}>{design.preview.buttons[1]}</span>
            </div>
          </div>
        </div>
      </div>);
    }
    // ── Layout 2: Centered hero + 4 course cards (skeleton overlay) ───────────
    const CARD_SRCS = ["/course-nutrition.jpg", "/course-fitness.jpg", "/course-meal.jpg", "/course-yoga.jpg"];
    const courses = design.preview.courseLabels.map((label, i) => ({ src: CARD_SRCS[i], label }));
    return (<div className={wrap}>
      <div className="flex h-full flex-col" style={{ background: lang.panelBg }}>
        <MiniNav />
        <div className={`${largePopup ? "gap-1 px-3 pb-2 pt-2" : "gap-[2px] px-2 pb-[3px] pt-[3px]"} flex shrink-0 flex-col items-center`}>
          <span className={`${largePopup ? "text-[6px]" : "text-[4px]"} whitespace-nowrap font-semibold uppercase tracking-[0.05em] leading-none`} style={{ color: lang.titleAccent }}>{design.preview.eyebrow}</span>
          <div className={`${largePopup ? "text-[11px]" : "text-[6px]"} whitespace-nowrap font-bold leading-[1.1] text-center`} style={{ color: lang.titleMain }}>{design.preview.headline[0]}</div>
          <div className={`${largePopup ? "text-[11px]" : "text-[6px]"} whitespace-nowrap font-bold leading-[1.1] text-center`} style={{ color: lang.titleAccent }}>{design.preview.headline[1]}</div>
        </div>
        <div className={`${largePopup ? "h-[58px] shrink-0 gap-1.5 px-3 pb-3" : "flex-1 gap-[3px] px-[6px] pb-[6px]"} flex overflow-hidden`}>
          {courses.map((c) => (<div key={c.src} className="relative flex-1 overflow-hidden rounded-[3px]">
              <img src={`${BASE}${c.src}`} alt={c.label} className="absolute inset-0 h-full w-full object-cover"/>
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)" }}/>
              <div className="absolute bottom-[3px] left-[3px] right-[3px] flex flex-col gap-[2px] rounded-[2px] px-[3px] py-[2.5px]" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(4px)" }}>
                <div className="h-[3px] w-[90%] rounded-[1px] bg-white/90"/>
                <div className="h-[2px] w-[60%] rounded-[1px] bg-white/55"/>
              </div>
            </div>))}
        </div>
      </div>
    </div>);
}
// ─── Customize data ──────────────────────────────────────────────────────────
const CUSTOMIZE_FONTS = ["Inter", "Poppins", "Space Grotesk", "Bebas Neue", "Oswald", "Merriweather", "DM Sans", "JetBrains Mono"];
const getDisplayFontName = (font) => (font === "Space Grotesk" ? "Space G." : font);
const CUSTOMIZE_OPTIONS = [
    { id: "font", label: "Font Family", iconPath: "M3 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l7.414 7.414a1 1 0 010 1.414l-4.586 4.586a1 1 0 01-1.414 0L3.293 9.293A1 1 0 013 8.586V7z" },
    { id: "button", label: "Button Style", iconPath: "M4 6h16M4 12h16M4 18h7" },
    { id: "color", label: "Color Palette", iconPath: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
    { id: "grid", label: "Course Grid", iconPath: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
    { id: "radius", label: "Border Radius", iconPath: "M4 16V8a4 4 0 014-4h8a4 4 0 014 4v8a4 4 0 01-4 4H8a4 4 0 01-4-4z" },
    { id: "hero", label: "Hero Layout", iconPath: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" },
    { id: "shadows", label: "Shadows", iconPath: "M20 12H4M20 16H4M20 20H4M20 8H4M20 4H4" },
    { id: "spacing", label: "Spacing", iconPath: "M8 7h8M8 17h8M7 7v10M17 7v10" },
    { id: "nav", label: "Navigation", iconPath: "M4 6h16M4 12h16M4 18h16" },
];
// ─── Customize Preview (büyük web sayfası - Layout 1+2 birleşimi) ────────────
function CustomizeWebPreview({ lang, fontName, buttonStyle, borderRadius, isMobileViewport, expanded }) {
    const { customize } = usePlatformDemoLocale();
    const isLight = lang.panelBg === "#fdfdf9" || lang.panelBg === "#f2f8ee" || lang.panelBg === "#fefaf2";
    const expandedWeb = expanded && !isMobileViewport;
    // ── Expanded web (How It Works desktop): separate stable layout ─────────────
    if (expandedWeb) {
        const courses = [
            { title: "Nutrition 101", img: `${BASE}/course-nutrition.jpg` },
            { title: "Fitness Pro", img: `${BASE}/course-fitness.jpg` },
            { title: "Meal Planning", img: `${BASE}/course-meal.jpg` },
            { title: "Yoga & Mind", img: `${BASE}/course-yoga.jpg` },
        ];
        return (<div className="demo-preserve-dark relative h-full w-full overflow-hidden rounded-xl border border-white/10" style={{
                background: lang.panelBg,
                display: "grid",
                gridTemplateRows: "36px 1fr 110px 32px",
            }}>
        {/* blobs */}
      {isLight && (<div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-14 -top-14 h-52 w-52" style={{ background: "radial-gradient(circle, rgba(74,197,94,0.24) 0%, transparent 75%)" }}/>
            <div className="absolute -bottom-16 -left-10 h-60 w-60" style={{ background: "radial-gradient(circle, rgba(52,168,83,0.2) 0%, transparent 80%)" }}/>
        </div>)}

        {/* ── Navbar row ── */}
        <div className="relative z-10 flex items-center border-b px-4" style={{ borderColor: isLight ? "rgba(15,23,42,0.10)" : "rgba(255,255,255,0.08)", background: isLight ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.04)" }}>
          <img src={`${BASE}/nutrifit-logo.png`} alt="NutriFit" className="h-[10px] w-auto shrink-0 object-contain"/>
          <div className="ml-4 flex items-center gap-4">
            {customize.preview.nav.map((t) => (<span key={t} className="text-[6.5px] font-medium leading-none" style={{ color: lang.navText, fontFamily: fontName }}>{t}</span>))}
          </div>
          <button className="ml-auto flex h-[20px] items-center justify-center whitespace-nowrap rounded px-3 text-[6.5px] font-semibold text-white" style={{ background: lang.btnPrimaryBg, borderRadius: `${Math.max(4, borderRadius - 2)}px` }}>
            {customize.preview.signUp}
          </button>
        </div>

        {/* ── Hero row (flexible) ── */}
        <div className="relative z-10 flex flex-col items-center justify-center overflow-hidden px-6 text-center">
          <p className="text-[7px] font-semibold uppercase tracking-wider" style={{ color: lang.titleAccent }}>
            {customize.preview.eyebrow}
          </p>
          <div className="mt-1 overflow-hidden" style={{ maxHeight: "52px" }}>
            <h1 className="text-[22px] font-bold leading-[1.06]" style={{ color: lang.titleMain, fontFamily: fontName }}>
              {customize.preview.heroTitle[0]}{" "}
              <span style={{ color: lang.titleAccent }}>{customize.preview.heroTitle[1]}</span>
            </h1>
          </div>
          <p className="mt-1 line-clamp-1 max-w-[380px] text-[7.5px] leading-[1.3]" style={{ color: lang.desc, fontFamily: fontName }}>
            {customize.preview.heroBody}
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <button className="flex h-[22px] items-center justify-center whitespace-nowrap px-4 text-[7px] font-semibold leading-none text-white" style={{ background: lang.btnPrimaryBg, borderRadius: `${borderRadius}px` }}>
              {customize.preview.ctas[0]}
            </button>
            <button className="flex h-[22px] items-center justify-center whitespace-nowrap border px-4 text-[7px] font-semibold leading-none" style={{ color: lang.titleMain, borderColor: isLight ? "#cbd5e1" : "rgba(255,255,255,0.18)", borderRadius: `${borderRadius}px` }}>
              {customize.preview.ctas[1]}
            </button>
          </div>
        </div>

        {/* ── Courses row (fixed 110px) ── */}
        <div className="relative z-10 shrink-0 overflow-hidden px-4 pb-3 pt-2">
          <p className="mb-1.5 text-[6.5px] font-semibold uppercase tracking-wider" style={{ color: lang.desc }}>{customize.preview.popularCourses}</p>
          <div className="grid h-[76px] grid-cols-4 gap-2">
            {customize.preview.courseNames.map((title, idx) => (<div key={title} className="relative h-[76px] min-h-[76px] overflow-hidden" style={{ borderRadius: borderRadius > 0 ? Math.max(4, borderRadius - 6) : 0 }}>
                <img src={[`${BASE}/course-nutrition.jpg`, `${BASE}/course-fitness.jpg`, `${BASE}/course-meal.jpg`, `${BASE}/course-yoga.jpg`][idx]} alt={title} className="absolute inset-0 h-full w-full object-cover"/>
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.60) 0%, transparent 60%)" }}/>
                <div className="absolute bottom-[4px] left-[4px]">
          <span className="block truncate px-[5px] py-[2px] text-[5.5px] font-semibold leading-none text-white" style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.26)", borderRadius: "4px", fontFamily: fontName }}>
                    {title}
                  </span>
                </div>
              </div>))}
          </div>
        </div>

        {/* ── Footer row (fixed 32px) ── */}
        <div className="relative z-10 flex shrink-0 items-center justify-between border-t px-4" style={{ borderColor: isLight ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.08)", background: isLight ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.03)" }}>
          <span className="text-[6px] font-semibold" style={{ color: lang.titleMain, fontFamily: fontName }}>{customize.preview.footer.brand}</span>
          <div className="flex items-center gap-3" style={{ color: lang.desc, fontFamily: fontName }}>
            {customize.preview.footer.links.map((t) => <span key={t} className="text-[5.5px]">{t}</span>)}
          </div>
        </div>
      </div>);
    }
    // ── Default (mobile + standard desktop) ─────────────────────────────────────
    return (<div className="demo-preserve-dark relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10" style={{ background: lang.panelBg }}>
      {/* Glowing organic blobs — visible only on light themes, no blur to avoid jank */}
      {isLight && (<div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-14 -top-14 h-52 w-52" style={{ background: "radial-gradient(circle, rgba(74,197,94,0.24) 0%, rgba(134,214,112,0.08) 50%, transparent 75%)" }}/>
          <div className="absolute -bottom-16 -left-10 h-60 w-60" style={{ background: "radial-gradient(circle, rgba(52,168,83,0.2) 0%, rgba(107,195,107,0.07) 55%, transparent 80%)" }}/>
          <div className="absolute left-1/3 top-1/3 h-32 w-32" style={{ background: "radial-gradient(circle, rgba(101,210,120,0.14) 0%, transparent 65%)" }}/>
        </div>)}

      {/* Preview navbar */}
      <div className={isMobileViewport ? "shrink-0 px-[clamp(5px,1.8vw,8px)] pt-[clamp(4px,1.2svh,6px)] pb-[clamp(3px,0.9svh,4px)]" : "shrink-0 px-2.5 pt-1.5 pb-1"}>
        <div className={`flex min-w-0 items-center rounded-lg border ${isMobileViewport ? "px-[clamp(5px,1.6vw,8px)] py-[clamp(3px,0.8svh,4px)]" : "h-[22px] px-2 py-1"}`} style={{
            borderColor: isLight ? "rgba(15,23,42,0.12)" : "rgba(255,255,255,0.12)",
            background: isLight ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.05)",
        }}>
          <img src={`${BASE}/nutrifit-logo.png`} alt={customize.preview.footer.brand} className={isMobileViewport ? "h-[clamp(5px,1.7vw,7px)] w-auto shrink-0 object-contain" : "h-[7px] w-auto object-contain"}/>
          <div className={isMobileViewport ? "ml-[clamp(5px,1.7vw,8px)] flex min-w-0 items-center gap-[clamp(4px,1.4vw,6px)]" : "ml-2 flex items-center gap-1.5"}>
            <span className={isMobileViewport ? "text-[clamp(4.7px,1.45vw,5.5px)] font-medium" : "text-[5.5px] font-medium"} style={{ color: lang.titleMain, fontFamily: fontName }}>{customize.preview.nav[0]}</span>
            <span className={isMobileViewport ? "text-[clamp(4.7px,1.45vw,5.5px)] font-medium" : "text-[5.5px] font-medium"} style={{ color: lang.titleMain, fontFamily: fontName }}>{customize.preview.nav[1]}</span>
            {!isMobileViewport && (<span className="text-[5.5px] font-medium" style={{ color: lang.titleMain, fontFamily: fontName }}>{customize.preview.nav[2]}</span>)}
          </div>
          <button className={isMobileViewport ? "ml-auto shrink-0 whitespace-nowrap px-[clamp(5px,1.8vw,8px)] py-[clamp(2px,0.6svh,3px)] text-[clamp(4.8px,1.5vw,5.8px)] font-semibold text-white" : "ml-auto whitespace-nowrap px-2 py-0.5 text-[5.8px] font-semibold text-white"} style={{ background: lang.btnPrimaryBg, borderRadius: `${Math.max(6, borderRadius)}px` }}>
            {customize.preview.signUp}
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className={`${isMobileViewport ? "shrink-0 px-[clamp(7px,2vw,10px)] py-[clamp(6px,1.8svh,10px)]" : "shrink-0 h-[clamp(132px,12vw,156px)] px-3 py-2"}`}>
        <div className={isMobileViewport ? "mx-auto max-w-[210px] text-center" : "flex h-full flex-col items-center justify-center text-center"}>
          <p className={isMobileViewport ? "text-[clamp(5px,1.6vw,6px)] font-semibold uppercase tracking-wider" : "text-[clamp(7px,0.48vw,11px)] font-semibold uppercase tracking-wider"} style={{ color: lang.titleAccent }}>
            {customize.preview.eyebrow}
          </p>
          <h1 className={isMobileViewport ? "mt-[clamp(2px,0.6svh,4px)] text-[clamp(11px,3.5vw,14px)] font-bold leading-[1.05]" : "mt-1 text-[clamp(19px,1.8vw,30px)] font-bold leading-[1.08]"} style={{ color: lang.titleMain, fontFamily: fontName }}>
            {customize.preview.heroTitle[0]}<br />
            <span style={{ color: lang.titleAccent }}>{customize.preview.heroTitle[1]}</span>
          </h1>
          <p className={isMobileViewport ? "mx-auto mt-[clamp(3px,0.9svh,6px)] max-w-[190px] text-[clamp(5.8px,1.8vw,7px)] leading-[1.35]" : "mx-auto mt-1.5 max-w-[380px] text-[clamp(8.2px,0.72vw,11px)] leading-[1.28]"} style={{ color: lang.desc, fontFamily: fontName }}>
            {customize.preview.heroBody}
          </p>
          <div className={isMobileViewport ? "mt-[clamp(5px,1.4svh,8px)] flex justify-center gap-[clamp(4px,1.3vw,6px)]" : "mt-2 flex h-[24px] items-center justify-center gap-2"}>
            <button className={isMobileViewport ? "whitespace-nowrap px-[clamp(7px,2.2vw,10px)] py-[clamp(3px,0.9svh,4px)] text-[clamp(5.8px,1.8vw,7px)] font-semibold text-white transition-all duration-500" : "flex h-[22px] items-center whitespace-nowrap px-3 py-0 text-[clamp(7.2px,0.6vw,9px)] font-semibold leading-none text-white transition-all duration-500"} style={{ background: lang.btnPrimaryBg, borderRadius: `${borderRadius}px` }}>
              {customize.preview.ctas[0]}
            </button>
            <button className={isMobileViewport ? "whitespace-nowrap border px-[clamp(7px,2.2vw,10px)] py-[clamp(3px,0.9svh,4px)] text-[clamp(5.8px,1.8vw,7px)] font-semibold transition-all duration-500" : "flex h-[22px] items-center whitespace-nowrap px-3 py-0 text-[clamp(7.2px,0.6vw,9px)] font-semibold leading-none transition-all duration-500"} style={{
            color: lang.titleMain,
            borderColor: isLight ? "#cbd5e1" : "rgba(255,255,255,0.15)",
            borderRadius: `${borderRadius}px`
        }}>
              {customize.preview.ctas[1]}
            </button>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className={`${isMobileViewport ? "shrink-0 px-[clamp(7px,2vw,10px)] pb-[clamp(6px,1.6svh,10px)]" : "shrink-0 px-3 pb-2"}`}>
        <p className={isMobileViewport ? "mb-[clamp(3px,0.9svh,5px)] text-[clamp(5px,1.6vw,6px)] font-semibold uppercase tracking-wider" : "mb-1.5 text-[6.5px] font-semibold uppercase tracking-wider"} style={{ color: lang.desc }}>{customize.preview.popularCourses}</p>
        <div className={`${isMobileViewport ? "" : "h-[clamp(62px,5.4vw,78px)]"} grid grid-cols-3 gap-[clamp(4px,1.4vw,7px)]`}>
          {customize.preview.courseNames.slice(0, 3).map((title, idx) => ({ title, img: [`${BASE}/course-nutrition.jpg`, `${BASE}/course-fitness.jpg`, `${BASE}/course-meal.jpg`][idx] })).map((c) => (<div key={c.title} className={`relative overflow-hidden ${isMobileViewport ? "aspect-[4/3] min-h-0" : "h-[clamp(62px,5.4vw,78px)] min-h-[62px]"}`} style={{ borderRadius: borderRadius > 0 ? Math.max(6, borderRadius - 8) : 0 }}>
              <img src={c.img} alt={c.title} className="absolute inset-0 h-full w-full object-cover"/>
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.58) 0%, transparent 64%)" }}/>
              <div className="absolute bottom-[4px] left-[4px] right-[4px] flex items-start">
                <div className={`max-w-full truncate font-semibold text-white ${isMobileViewport ? "px-[4px] py-[1.5px] text-[5.8px] leading-none" : "px-[5px] py-[2px] text-[6.8px] leading-none"}`} style={{
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.28)",
                borderRadius: "5px",
                fontFamily: fontName,
            }}>
                  {c.title}
                </div>
              </div>
            </div>))}
        </div>
      </div>

      {isMobileViewport && (<div className="hidden min-h-0 flex-1 px-[clamp(7px,2vw,10px)] pb-[clamp(6px,1.6svh,10px)] [@media_(min-height:760px)]:flex">
          <div className="flex min-h-[54px] w-full flex-col justify-between overflow-hidden rounded-lg border px-[clamp(7px,2vw,9px)] py-[clamp(6px,1.35svh,8px)]" style={{
                borderColor: isLight ? "rgba(15,23,42,0.10)" : "rgba(255,255,255,0.10)",
                background: isLight
                    ? "linear-gradient(135deg, rgba(255,255,255,0.76), rgba(243,250,239,0.66))"
                    : "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(61,122,59,0.10))",
            }}>
            <div className="flex min-w-0 items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-[clamp(6px,1.9vw,7.5px)] font-bold leading-tight" style={{ color: lang.titleMain, fontFamily: fontName }}>
                  {customize.preview.mobileCard.title}
                </div>
                <div className="mt-0.5 truncate text-[clamp(4.8px,1.45vw,5.8px)] leading-tight" style={{ color: lang.desc, fontFamily: fontName }}>
                  {customize.preview.mobileCard.desc}
              </div>
            </div>
              <div className="shrink-0 rounded-full px-[clamp(5px,1.5vw,7px)] py-[2px] text-[clamp(4.8px,1.45vw,5.6px)] font-semibold" style={{ color: lang.titleAccent, background: isLight ? "rgba(61,122,59,0.10)" : "rgba(134,214,112,0.12)" }}>
                {customize.preview.mobileCard.badge}
              </div>
            </div>
            <div className="mt-[clamp(5px,1.1svh,7px)] flex items-center gap-[clamp(4px,1.2vw,6px)]">
              <div className="flex -space-x-1">
                {[0, 1, 2].map((i) => (<div key={i} className="h-[clamp(11px,3vw,14px)] w-[clamp(11px,3vw,14px)] rounded-full border border-white/70" style={{ background: ["#f7b267", "#86d670", "#7dd3fc"][i] }}/>))}
        </div>
              <div className="min-w-0 flex-1">
                <div className="h-1 overflow-hidden rounded-full" style={{ background: isLight ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.10)" }}>
                  <div className="h-full w-[68%] rounded-full" style={{ background: lang.btnPrimaryBg }}/>
      </div>
                <div className="mt-1 truncate text-[clamp(4.6px,1.35vw,5.4px)]" style={{ color: lang.desc, fontFamily: fontName }}>
                  {customize.preview.mobileCard.social}
                </div>
              </div>
            </div>
          </div>
        </div>)}

      {!isMobileViewport && (<div className="relative z-10 mt-auto h-[38px] shrink-0 px-2.5 pb-1.5 pt-1">
          <div className="h-full w-full rounded-lg border px-2.5 py-1.5" style={{
                borderColor: isLight ? "rgba(15,23,42,0.1)" : "rgba(255,255,255,0.12)",
                background: isLight ? "rgba(255,255,255,0.62)" : "rgba(255,255,255,0.04)",
            }}>
            <div className="flex items-center justify-between gap-3">
              <div className="text-[6.5px] font-semibold" style={{ color: lang.titleMain, fontFamily: fontName }}>
                {customize.preview.footer.brand}
              </div>
              <div className="flex items-center gap-2 text-[6px]" style={{ color: lang.desc, fontFamily: fontName }}>
                {customize.preview.footer.links.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>)}

    </div>);
}
// ─── Customize Content ───────────────────────────────────────────────────────
function CustomizeContent({ pausedRef, designIdx, selectedFont, selectedBorderRadius, isMobileViewport, contentVisible, bounceRadius, scrollToRadius, aiActionFrame, aiActionDone, onReselectDesign, expanded, }) {
    const { theme } = useTheme();
    const isLight = isLightTheme(theme);
    const { customize, shared, designLanguages } = usePlatformDemoLocale();
    const lang = designLanguages[designIdx >= 0 ? designIdx : 2];
    const leftPanelRef = useRef(null);
    const radiusSectionRef = useRef(null);
    const [showTopScrollFade, setShowTopScrollFade] = useState(false);
    const [showBottomScrollFade, setShowBottomScrollFade] = useState(true);
    const [showGlassScrollbar, setShowGlassScrollbar] = useState(false);
    const [glassThumbHeight, setGlassThumbHeight] = useState(26);
    const [glassThumbTop, setGlassThumbTop] = useState(0);
    useEffect(() => {
        if (scrollToRadius && radiusSectionRef.current && leftPanelRef.current) {
            const container = leftPanelRef.current;
            const section = radiusSectionRef.current;
            const containerRect = container.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();
            const targetTop = container.scrollTop + (sectionRect.top - containerRect.top) - 24;
            container.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
        }
    }, [scrollToRadius]);
    // Whenever Customize becomes visible again, start from top of controls list.
    useEffect(() => {
        if (!contentVisible || !leftPanelRef.current)
            return;
        leftPanelRef.current.scrollTop = 0;
    }, [contentVisible]);
    // Soft top/bottom scroll masks for a smoother cutoff.
    useEffect(() => {
        const el = leftPanelRef.current;
        if (!el)
            return;
        const updateFades = () => {
            const { scrollTop, scrollHeight, clientHeight } = el;
            setShowTopScrollFade(scrollTop > 4);
            setShowBottomScrollFade(scrollTop + clientHeight < scrollHeight - 4);
            const maxScroll = Math.max(0, scrollHeight - clientHeight);
            const isScrollable = maxScroll > 6;
            // Mobile: never show custom floating scrollbar on customize controls.
            setShowGlassScrollbar(!isMobileViewport && isScrollable);
            if (!isScrollable) {
                setGlassThumbHeight(26);
                setGlassThumbTop(0);
                return;
            }
            const trackHeight = Math.max(40, clientHeight - 12);
            const thumbH = Math.max(16, Math.round((clientHeight / scrollHeight) * trackHeight));
            const thumbTravel = Math.max(0, trackHeight - thumbH);
            const thumbTop = Math.round((scrollTop / maxScroll) * thumbTravel);
            setGlassThumbHeight(thumbH);
            setGlassThumbTop(thumbTop);
        };
        updateFades();
        el.addEventListener("scroll", updateFades, { passive: true });
        window.addEventListener("resize", updateFades);
        return () => {
            el.removeEventListener("scroll", updateFades);
            window.removeEventListener("resize", updateFades);
        };
    }, [contentVisible, isMobileViewport]);
    const fontNames = ["Inter", "Poppins", "Space Grotesk", "Bebas Neue", "Oswald", "Merriweather"];
    const demoThemes = customize.themePreset.themes.map((name, i) => ({
        name,
        primary: ["#3d7a3b", "#3b82f6", "#f97316", "#22c55e", "#8b5cf6", "#0f172a"][i] ?? "#3b82f6",
        accent: ["#5a9e58", "#06d6a0", "#fbbf24", "#14b8a6", "#ec4899", "#3b82f6"][i] ?? "#06d6a0",
    }));
    const hasRoundedApplied = selectedBorderRadius > 0;
    const expandedWeb = expanded && !isMobileViewport;
    return (<motion.div className="flex h-full flex-col overflow-hidden" initial={false} animate={{
            opacity: contentVisible ? 1 : 0,
            y: contentVisible ? 0 : 18,
        }} transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}>
      {/* Header */}
      <div className={`flex shrink-0 items-end justify-between ${isMobileViewport ? "px-2.5 pb-1 pt-1.5" : expandedWeb ? "px-10 pb-1.5 pt-2.5" : "px-4 pb-1.5 pt-2.5"}`}>
        <div>
          <motion.div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/60" initial={false} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 12 }} transition={{ duration: 0.56, delay: contentVisible ? 0 : 0, ease: [0.16, 1, 0.3, 1] }}>
            {customize.stepHeader}
          </motion.div>
          <motion.div className={`${isMobileViewport ? "mt-0.5 text-[14px]" : "mt-0.5 text-[16px]"} font-bold leading-tight text-foreground`} initial={false} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 12 }} transition={{ duration: 0.62, delay: contentVisible ? 0.12 : 0, ease: [0.16, 1, 0.3, 1] }}>
            {customize.title.prefix}<span className="text-accent">{customize.title.highlight}</span>
          </motion.div>
      </div>
      </div>

      {/* Two-column: left scrollable controls + right sticky preview */}
      <div className={`relative flex min-h-0 flex-1 overflow-hidden ${isMobileViewport ? "gap-[clamp(4px,1.5vw,7px)] px-[clamp(6px,2vw,8px)] pb-0.5" : expandedWeb ? "gap-3 px-10 pb-2" : "gap-2 px-3 pb-1"}`}>
        <AnimatePresence>
          {aiActionFrame && (<motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }} className={`pointer-events-none absolute left-3 top-2 z-20 flex items-center gap-1.5 rounded-full border px-2 py-1 backdrop-blur-md ${aiActionDone
                ? isLight
                    ? "border-emerald-500/45 bg-emerald-400/28 shadow-[0_4px_16px_rgba(16,185,129,0.24)]"
                    : "border-emerald-400/45 bg-emerald-500/22"
                : isLight
                    ? "border-blue-500/45 bg-blue-400/28 shadow-[0_4px_16px_rgba(59,130,246,0.25)]"
                    : "border-blue-400/40 bg-blue-500/25"}`}>
              <img src={`${BASE}/admino-logo.png`} alt={shared.logoAlt} className="h-3.5 w-3.5 object-contain"/>
              <span className={`text-[8.5px] font-semibold ${aiActionDone
                ? isLight ? "text-emerald-950" : "text-emerald-200"
                : isLight ? "text-blue-950" : "text-blue-200"}`}>
                {aiActionDone ? customize.aiStatus.done : customize.aiStatus.working}
              </span>
              {aiActionDone ? (<motion.svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-200" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                  <motion.path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.38, ease: "easeOut" }}/>
                </motion.svg>) : (<div className="flex gap-0.5">
                  {[0, 1, 2].map((i) => (<motion.span key={i} className={`h-1 w-1 rounded-full ${isLight ? "bg-blue-900" : "bg-blue-300"}`} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, delay: i * 0.26, repeat: Infinity }}/>))}
              </div>)}
            </motion.div>)}
        </AnimatePresence>

        {/* ── Left: scrollable controls ── */}
        <div className={`relative min-h-0 min-w-0 ${isMobileViewport ? "flex-[0_0_39%]" : expandedWeb ? "flex-[0_0_30%]" : "flex-[0_0_33%]"}`}>
            <motion.div ref={leftPanelRef} className={`no-scrollbar h-full space-y-1.5 overflow-y-auto ${isMobileViewport ? "pr-0.5" : "pr-5"}`} style={{ scrollbarWidth: "none" }} initial={false} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 18 }} transition={{ duration: 0.74, delay: contentVisible ? 0.4 : 0, ease: [0.16, 1, 0.3, 1] }}>
          {/* Theme Preset */}
          <div className={`rounded-xl border border-border bg-card/60 backdrop-blur-sm ${isMobileViewport ? "p-2" : "p-2.5"}`}>
            <p className={`mb-1.5 font-bold uppercase tracking-widest text-muted/70 ${isMobileViewport ? "text-[7px]" : "text-[8px]"}`}>{customize.themePreset.label}</p>
            <div className={`grid gap-1 ${isMobileViewport ? "grid-cols-1" : "grid-cols-2 gap-1.5"}`}>
              {demoThemes.map((theme, ti) => (<button key={theme.name} className={`flex min-w-0 items-center gap-1.5 rounded-lg text-left transition-all ${isMobileViewport ? "px-1.5 py-0.5" : "px-2 py-1"} ${ti === 0 ? "bg-primary/10 ring-1 ring-primary/50" : "hover:bg-surface"}`}>
                  <div className="flex shrink-0 -space-x-1">
                    <div className="h-3 w-3 rounded-full ring-1 ring-black/20" style={{ background: theme.primary }}/>
                    <div className="h-3 w-3 rounded-full ring-1 ring-black/20" style={{ background: theme.accent }}/>
                  </div>
                  <span className={`truncate font-medium text-foreground/80 ${isMobileViewport ? "text-[7px]" : "text-[8px]"}`}>{theme.name}</span>
              </button>))}
            </div>
          </div>

          {/* Font Family */}
          <div className={`rounded-xl border border-border bg-card/60 backdrop-blur-sm ${isMobileViewport ? "p-2" : "p-2.5"}`}>
            <p className={`mb-1.5 font-bold uppercase tracking-widest text-muted/70 ${isMobileViewport ? "text-[7px]" : "text-[8px]"}`}>{customize.fontFamily.label}</p>
            <div className={`grid gap-1 ${isMobileViewport ? "grid-cols-1" : "grid-cols-2 gap-1.5"}`}>
              {fontNames.map((font, fi) => (<button key={font} data-demo-id={`pg-font-${fi}`} className={`flex min-w-0 items-center justify-between rounded-lg text-left transition-all ${isMobileViewport ? "px-1.5 py-1" : "px-2 py-1.5"} ${selectedFont === fi
                ? "bg-primary/10 ring-1 ring-primary/50"
                : "hover:bg-surface"}`}>
                  <span className={`truncate font-medium text-foreground ${isMobileViewport ? "text-[7px]" : "text-[8.5px]"}`} style={{ fontFamily: font }}>{getDisplayFontName(font)}</span>
                  {selectedFont === fi && (<span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-accent text-[6px] font-bold text-[#04221a]">✓</span>)}
                </button>))}
            </div>
          </div>

          {/* Border Radius — with bounce + AI highlight */}
          <motion.div ref={radiusSectionRef} data-demo-id="pg-radius-section" animate={bounceRadius
            ? {
                scale: [1, 1.035, 0.975, 1.025, 0.992, 1.008, 1],
                boxShadow: [
                    "0 0 0 0px rgba(52,168,83,0)",
                    "0 0 0 3px rgba(52,168,83,0.58)",
                    "0 0 0 5px rgba(52,168,83,0.32)",
                    "0 0 0 3px rgba(52,168,83,0.18)",
                    "0 0 0 0px rgba(52,168,83,0)",
                ],
            }
            : { scale: 1, boxShadow: "0 0 0 0px rgba(52,168,83,0)" }} transition={{ duration: 1.35, ease: "easeInOut" }} className="rounded-xl">
            <div className={`rounded-xl border p-2.5 transition-all duration-700 ${bounceRadius
            ? "border-emerald-400/40 bg-emerald-400/14"
            : hasRoundedApplied
                ? "border-emerald-400/28 bg-emerald-400/10 backdrop-blur-sm"
                : "border-border bg-card/60 backdrop-blur-sm"}`}>
              <p className={`mb-1.5 text-[8px] font-bold uppercase tracking-widest transition-colors ${bounceRadius ? "text-emerald-300/80" : "text-muted/70"}`}>
                {customize.borderRadius.label}
                {bounceRadius && (<span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-1.5 py-0.5 text-[7px] font-semibold text-emerald-300">
                    <motion.span className="h-1 w-1 rounded-full bg-emerald-400" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.7, repeat: Infinity }}/>
                    {customize.borderRadius.aiApplied}
                  </span>)}
              </p>
              <div className="flex items-center gap-1.5">
                <div className="h-8 w-8 shrink-0 border-2 transition-all duration-500" style={{
            borderRadius: selectedBorderRadius,
            borderColor: bounceRadius ? "rgba(52,168,83,0.6)" : "rgba(255,255,255,0.2)",
        }}/>
                <div className="flex-1">
                  <input type="range" min={0} max={24} value={selectedBorderRadius} readOnly className="w-full accent-primary"/>
                  <div className="mt-0.5 flex justify-between text-[7px] text-muted/45">
                    <span>{customize.borderRadius.min}</span>
                    <span className="font-mono font-semibold text-foreground/65">{selectedBorderRadius}px</span>
                    <span>{customize.borderRadius.max}</span>
                  </div>
                </div>
              </div>
              <div className="mt-1.5 flex gap-1">
                {customize.borderRadius.presets.map((label, idx) => ({ label, val: [0, 8, 20][idx] })).map((p) => (<button key={p.label} data-demo-id={`pg-radius-${p.label.toLowerCase()}`} className={`flex-1 rounded-md py-1 text-[7.5px] font-medium transition-all ${selectedBorderRadius === p.val
                ? "bg-primary/15 text-primary ring-1 ring-primary/40"
                : "bg-white/5 text-muted/65"}`}>
                    {p.label}
                  </button>))}
              </div>
            </div>
                  </motion.div>

          {/* Layout & Style */}
          <div className={`rounded-xl border border-border bg-card/60 backdrop-blur-sm ${isMobileViewport ? "p-2" : "p-2.5"}`}>
            <p className={`mb-1.5 font-bold uppercase tracking-widest text-muted/70 ${isMobileViewport ? "text-[7px]" : "text-[8px]"}`}>{customize.layoutStyle.label}</p>
            <div className="space-y-1.5">
              <div>
                <p className={`mb-1 font-medium uppercase tracking-wide text-muted/45 ${isMobileViewport ? "text-[6px]" : "text-[7px]"}`}>{customize.layoutStyle.heroAlignment.label}</p>
                <div className="flex gap-1 rounded-md bg-surface p-0.5">
                  {customize.layoutStyle.heroAlignment.options.map((opt, i) => (<button key={opt} className={`flex-1 rounded-sm py-1 font-medium transition-all ${isMobileViewport ? "text-[6.5px]" : "text-[7.5px]"} ${i === 0 ? "bg-card text-foreground shadow-sm ring-1 ring-border" : "text-muted"}`}>{opt}</button>))}
              </div>
              </div>
              <div>
                <p className={`mb-1 font-medium uppercase tracking-wide text-muted/45 ${isMobileViewport ? "text-[6px]" : "text-[7px]"}`}>{customize.layoutStyle.buttonStyle.label}</p>
                <div className="flex gap-1 rounded-md bg-surface p-0.5">
                  {customize.layoutStyle.buttonStyle.options.map((opt, i) => (<button key={opt} className={`flex-1 rounded-sm py-1 font-medium transition-all ${isMobileViewport ? "text-[6.5px]" : "text-[7.5px]"} ${i === 0 ? "bg-card text-foreground shadow-sm ring-1 ring-border" : "text-muted"}`}>{opt}</button>))}
                </div>
              </div>
              <div>
                <p className={`mb-1 font-medium uppercase tracking-wide text-muted/45 ${isMobileViewport ? "text-[6px]" : "text-[7px]"}`}>{customize.layoutStyle.courseGrid.label}</p>
                <div className="flex gap-1 rounded-md bg-surface p-0.5">
                  {customize.layoutStyle.courseGrid.options.map((opt, i) => (<button key={opt} className={`flex-1 rounded-sm py-1 font-medium transition-all ${isMobileViewport ? "text-[6.5px]" : "text-[7.5px]"} ${i === 1 ? "bg-card text-foreground shadow-sm ring-1 ring-border" : "text-muted"}`}>{opt}</button>))}
                </div>
              </div>
            </div>
          </div>

          {/* Sections & Effects */}
          <div className={`rounded-2xl border border-border bg-card/60 backdrop-blur-sm ${isMobileViewport ? "p-2" : "p-3"}`}>
            <p className={`mb-2 font-bold uppercase tracking-widest text-muted/70 ${isMobileViewport ? "text-[7px]" : "text-[9px]"}`}>{customize.sectionsEffects.label}</p>
            <div className="space-y-1.5">
              {customize.sectionsEffects.toggles.map((label, idx) => ({ label, on: [true, false, true][idx] })).map(({ label, on }) => (<div key={label} className={`flex items-center justify-between rounded-xl bg-surface ${isMobileViewport ? "gap-1 px-2 py-1" : "px-2.5 py-1.5"}`}>
                  <span className={`min-w-0 leading-tight text-foreground/72 ${isMobileViewport ? "text-[7px]" : "text-[9px]"} font-medium`}>{label}</span>
                  <div className={`relative h-4 w-7 rounded-full transition-colors ${on ? "bg-primary" : "bg-border"}`}>
                    <div className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform ${on ? "translate-x-3" : "translate-x-0.5"}`}/>
                  </div>
                </div>))}
              <div className={`rounded-xl bg-surface ${isMobileViewport ? "px-2 py-1.5" : "px-2.5 py-2"}`}>
                <div className="flex items-center justify-between">
                  <span className={`${isMobileViewport ? "text-[7px]" : "text-[9px]"} font-medium text-foreground/72`}>{customize.sectionsEffects.glowLabel}</span>
                  <span className={`${isMobileViewport ? "text-[7px]" : "text-[8px]"} font-mono text-muted/50`}>70%</span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[70%] rounded-full bg-primary/55"/>
                </div>
              </div>
            </div>
          </div>
            {/* Bottom padding for scroll */}
            <div className="h-6"/>
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-7 transition-opacity duration-220" style={{
            opacity: showTopScrollFade ? 1 : 0,
            background: "linear-gradient(to bottom, var(--demo-surface-bg) 12%, rgba(0,0,0,0) 100%)",
        }}/>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 transition-opacity duration-220" style={{
            opacity: showBottomScrollFade ? 1 : 0,
            background: "linear-gradient(to top, var(--demo-surface-bg) 14%, rgba(0,0,0,0) 100%)",
        }}/>

          <AnimatePresence>
            {showGlassScrollbar && (<motion.div key="glass-scrollbar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="pointer-events-none absolute bottom-2 right-1 top-2 z-20 w-[10px]">
                <div className="absolute inset-x-[2px] bottom-0 top-0 rounded-full border" style={{
                borderColor: "rgba(255,255,255,0.22)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.18)",
                backdropFilter: "blur(6px)",
            }}/>
                <motion.div className="absolute left-0 right-0" animate={{ y: glassThumbTop, height: glassThumbHeight }} transition={{ duration: 0.16, ease: "easeOut" }} style={{ top: 0 }}>
                  <div className="mx-auto h-full w-[8px] rounded-full border" style={{
                borderColor: "rgba(255,255,255,0.35)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.18) 100%)",
                boxShadow: "0 4px 10px rgba(59,130,246,0.18), inset 0 1px 0 rgba(255,255,255,0.38)",
            }}>
                    <div className="mx-auto mt-1 h-1.5 w-1.5 rounded-full bg-white/85"/>
                  </div>
                </motion.div>
            </motion.div>)}
        </AnimatePresence>
      </div>

        {/* ── Right: sticky web preview (Playground look) ── */}
        <motion.div className={`relative min-h-0 min-w-0 overflow-hidden ${isMobileViewport ? "flex-1" : expandedWeb ? "flex-[0_0_70%]" : "flex-[0_0_67%]"}`} initial={false} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 22 }} transition={{ duration: 0.82, delay: contentVisible ? 0.58 : 0, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border">
            {/* Chrome bar */}
            <div className={`border-b border-border bg-card/90 backdrop-blur-sm ${isMobileViewport ? "px-[clamp(5px,1.6vw,8px)] py-[clamp(4px,1.1svh,6px)]" : "px-3 py-2"}`}>
              <div className={`flex min-w-0 items-center ${isMobileViewport ? "gap-[clamp(4px,1.4vw,6px)]" : "gap-2"}`}>
              <div className={isMobileViewport ? "flex shrink-0 gap-0.5" : "flex gap-1"}>
                <div className={isMobileViewport ? "h-1.5 w-1.5 rounded-full bg-red-400/60" : "h-2 w-2 rounded-full bg-red-400/60"}/>
                <div className={isMobileViewport ? "h-1.5 w-1.5 rounded-full bg-yellow-400/60" : "h-2 w-2 rounded-full bg-yellow-400/60"}/>
                <div className={isMobileViewport ? "h-1.5 w-1.5 rounded-full bg-green-400/60" : "h-2 w-2 rounded-full bg-green-400/60"}/>
    </div>
              <div className={isMobileViewport ? "flex min-w-0 flex-1 items-center gap-1 overflow-hidden rounded-md bg-surface px-[clamp(5px,1.5vw,8px)] py-0.5" : "flex flex-1 items-center gap-1 overflow-hidden rounded-md bg-surface px-2 py-0.5"}>
                <span className={`truncate text-muted ${isMobileViewport ? "text-[clamp(6px,1.9vw,8px)]" : "text-[9px]"}`}>{customize.preview.url}</span>
              </div>
              <div className={isMobileViewport ? "flex shrink-0 items-center gap-0.5" : "flex items-center gap-1"}>
                <span className={isMobileViewport ? "h-1 w-1 animate-pulse rounded-full bg-emerald-400" : "h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"}/>
                <span className={isMobileViewport ? "text-[6.5px] font-medium text-emerald-400" : "text-[8px] font-medium text-emerald-400"}>{customize.preview.status}</span>
              </div>
            </div>
            </div>
            {/* Web preview */}
            <div className="min-h-0 flex-1 overflow-hidden bg-transparent p-0">
              <CustomizeWebPreview lang={lang} fontName={fontNames[selectedFont]} buttonStyle="solid" borderRadius={selectedBorderRadius} isMobileViewport={isMobileViewport} expanded={expanded}/>
            </div>
          </div>

          {/* AI Action Frame Overlay */}
          <AnimatePresence>
            {aiActionFrame && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="pointer-events-none absolute inset-0 z-10 rounded-xl">
                <div className={`absolute inset-[2px] rounded-[10px] border-2 ${aiActionDone ? "border-emerald-400/55" : "border-blue-400/50"}`} style={{
                boxShadow: aiActionDone
                    ? "0 0 22px rgba(52,168,83,0.28), 0 0 44px rgba(52,168,83,0.1), inset 0 0 14px rgba(52,168,83,0.06)"
                    : "0 0 22px rgba(59,130,246,0.28), 0 0 44px rgba(59,130,246,0.1), inset 0 0 14px rgba(59,130,246,0.06)",
            }}/>
              </motion.div>)}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>);
}
// ─── Build Scene Content ──────────────────────────────────────────────────────
// Pipeline contains only infra/testing items — modules are shown separately in Your Selections.
// Localized BUILD_PIPELINE is read from PlatformDemoLocaleContext inside BuildContent.
// Selected modules in build order (excludes declined module — Community = index 2)
const MODULE_GLOW_ORDER = [0, 1, 3, 4, 5, 6, 7];
function BuildContent({ pausedRef, onComplete, designIdx, fontIdx, borderRadius, contentVisible, isMobileViewport, expanded, }) {
    const { theme } = useTheme();
    const isLight = isLightTheme(theme);
    const { build, shared, designLanguages, MODULE_LIST, BUILD_PIPELINE } = usePlatformDemoLocale();
    const [doneSteps, setDoneSteps] = useState(0);
    const [showCta, setShowCta] = useState(false);
    const [buildTick, setBuildTick] = useState(0);
    const [glowStep, setGlowStep] = useState(-1); // index into MODULE_GLOW_ORDER
    const lang = designLanguages[designIdx >= 0 ? designIdx : 2];
    const fontName = CUSTOMIZE_FONTS[fontIdx] ?? "Inter";
    const onCompleteRef = useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);
    // Pipeline advance
    useEffect(() => {
        if (!contentVisible)
            return;
        let cancelled = false;
        const cancelledRef = { current: false };
        const sleep = makePausableSleep(pausedRef, cancelledRef);
        async function run() {
            await sleep(scaleBuildMs(600));
            for (let i = 0; i < BUILD_PIPELINE.length; i++) {
                if (cancelled)
                    return;
                await sleep(scaleBuildMs(i === 0 ? 800 : 1200));
                setDoneSteps(i + 1);
            }
            await sleep(scaleBuildMs(500));
            if (!cancelled) {
                setShowCta(true);
                await sleep(scaleBuildMs(1800));
                if (!cancelled)
                    onCompleteRef.current?.();
            }
        }
        run();
        return () => { cancelled = true; cancelledRef.current = true; };
    }, [pausedRef, contentVisible]);
    // Sequential module glow — runs through all 7 selected modules quickly
    // Steps 0..6 = building each module, step 7 = all done (isDone for every module)
    useEffect(() => {
        if (!contentVisible)
            return;
        let step = 0;
        const id = setInterval(() => {
            if (pausedRef.current)
                return;
            setGlowStep(step);
            step++;
            if (step > MODULE_GLOW_ORDER.length)
                clearInterval(id);
        }, BUILD_INTERVAL_MS);
        return () => clearInterval(id);
    }, [pausedRef, contentVisible]);
    // Live log tick
    useEffect(() => {
        if (!contentVisible)
            return;
        const id = setInterval(() => {
            if (!pausedRef.current)
                setBuildTick((v) => v + 1);
        }, BUILD_INTERVAL_MS);
        return () => clearInterval(id);
    }, [pausedRef, contentVisible]);
    // Theme-aware color tokens
    const donutTrack = isLight ? "rgba(15,23,42,0.12)" : "rgba(255,255,255,0.07)";
    const donutNumber = isLight ? "rgba(15,23,42,0.35)" : "rgba(255,255,255,0.22)";
    const selectionsBg = isLight
        ? "rgba(255,255,255,0.92)"
        : "linear-gradient(135deg, rgba(52,168,83,0.09) 0%, rgba(255,255,255,0.02) 100%)";
    const buildProgressBg = isLight
        ? "rgba(255,255,255,0.88)"
        : "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(0,0,0,0.18) 100%)";
    const cardShadow = isLight
        ? { boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 14px rgba(15,23,42,0.07)" }
        : {};
    // Responsive donut sizing
    const RING_SIZE = isMobileViewport ? 24 : 32;
    const RING_R = isMobileViewport ? 9 : 13;
    const CIRC_VAL = 2 * Math.PI * RING_R;
    const streamMsgs = build.streamMsgs;
    const percent = Math.round((doneSteps / BUILD_PIPELINE.length) * 100);
    return (<motion.div className={`relative flex h-full flex-col overflow-hidden ${isMobileViewport ? "gap-1.5 p-2.5 pb-10" : expanded ? "gap-2.5 p-4 pb-5" : "gap-2.5 p-4 pb-14"}`} initial={false} animate={{ opacity: contentVisible ? 1 : 0 }} transition={{ duration: 0.35 }}>
      {/* Ambient blobs — dark theme only */}
      {!isLight && <>
      <div className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(52,168,83,0.55) 0%, transparent 70%)" }}/>
      <div className="pointer-events-none absolute -right-8 -bottom-8 h-36 w-36 rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)" }}/>
      </>}

      {/* Header */}
      <div className="relative z-10 shrink-0">
        <motion.div className={`font-semibold uppercase tracking-[0.14em] text-primary/60 ${isMobileViewport ? "text-[8px]" : "text-[10px]"}`} initial={false} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 12 }} transition={{ duration: 0.42, delay: contentVisible ? 0 : 0, ease: [0.16, 1, 0.3, 1] }}>
          {build.stepHeader}
        </motion.div>
        <motion.div className={`font-bold text-foreground ${isMobileViewport ? "mt-0.5 text-[14px]" : "mt-0.5 text-[16px]"}`} initial={false} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 12 }} transition={{ duration: 0.48, delay: contentVisible ? 0.08 : 0, ease: [0.16, 1, 0.3, 1] }}>
          {build.title.prefix}<span className="text-accent">{build.title.highlight}</span>
        </motion.div>
      </div>

      {/* YOUR SELECTIONS */}
      <motion.div className={`relative z-10 shrink-0 rounded-xl border border-emerald-500/18 ${isMobileViewport ? "p-2" : "p-3"}`} style={{ background: selectionsBg, ...cardShadow,
        }} initial={false} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 16 }} transition={{ duration: 0.52, delay: contentVisible ? 0.16 : 0, ease: [0.16, 1, 0.3, 1] }}>
        <div className="mb-2 flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"/>
          <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-400/80">{build.selectionsLabel}</span>
        </div>

        {/* Design pill */}
        <motion.div className="mb-2 flex overflow-hidden rounded-lg border border-emerald-500/20" style={{ background: lang.panelBg }} initial={false} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 10 }} transition={{ duration: 0.42, delay: contentVisible ? 0.24 : 0, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex w-[22%] shrink-0 items-center justify-center border-r p-2" style={{ borderColor: `${lang.panelBorder}60`, background: lang.panelBg }}>
            <img src={`${BASE}/nutrifit-logo.png`} alt="NutriFit" className="h-10 w-full rounded-md object-contain" style={{ mixBlendMode: "multiply" }}/>
          </div>
          <div className="flex flex-1 items-center gap-2 px-3 py-2">
            <div className="flex-1">
              <span className="text-[10px] font-bold" style={{ color: lang.titleMain }}>{lang.name} {shared.controls.themeSuffix}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[8px]" style={{ color: lang.navText, fontFamily: fontName }}>{getDisplayFontName(fontName)}</span>
                <span className="text-[8px]" style={{ color: lang.navText }}>· {borderRadius}px radius</span>
              </div>
            </div>
            <div className="flex gap-1.5">
              {[lang.btnPrimaryBg, lang.titleAccent, lang.cardBg].map((c, ci) => (<div key={ci} className="h-3.5 w-3.5 rounded-full border border-black/10 shadow-sm" style={{ background: c }}/>))}
            </div>
          </div>
        </motion.div>

        {/* Module cards — state-driven: waiting → building → done */}
        <div className={`grid gap-1 ${isMobileViewport ? "grid-cols-4" : "grid-cols-2 gap-1.5"}`}>
          {MODULE_LIST.map((mod, mi) => {
            const declined = mi === DECLINED_MODULE;
            const glowIdx = MODULE_GLOW_ORDER.indexOf(mi);
            const isWaiting = !declined && glowIdx !== -1 && glowStep < glowIdx;
            const isBuilding = !declined && glowIdx !== -1 && glowStep === glowIdx;
            const isDone = !declined && glowIdx !== -1 && glowStep > glowIdx;
            const cardCls = declined
                ? "border-gray-300/25 bg-gray-300/10 opacity-55 shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
                : isBuilding
                    ? "border-emerald-400/60 bg-emerald-500/16"
                    : isDone
                        ? "border-emerald-500/30 bg-emerald-500/10"
                        : "border-white/10 bg-white/3";
            return (<motion.div key={mi} className={`relative flex overflow-hidden rounded-lg border transition-colors duration-300 ${isMobileViewport ? "flex-col items-center gap-0.5 px-1 py-1.5" : "items-center gap-2 px-2 py-1.5"} ${cardCls}`} initial={false} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 10, boxShadow: isBuilding ? "0 0 10px rgba(52,168,83,0.5)" : "none" }} transition={{
                    duration: 0.36,
                    delay: contentVisible
                        ? (mi < 4 ? 0.32 + mi * 0.045 : 0.5 + (mi - 4) * 0.045)
                        : 0,
                    ease: [0.16, 1, 0.3, 1],
                }}>
                <svg className="absolute -right-1 -bottom-1 h-7 w-7 opacity-[0.07]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} style={{ color: declined ? "#9ca3af" : "#34d399" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={mod.icon}/>
                </svg>
                <div className={`flex shrink-0 items-center justify-center rounded-md transition-colors duration-300 ${isMobileViewport ? "h-4 w-4" : "h-5 w-5"} ${declined ? "bg-gray-300/15" : isDone || isBuilding ? "bg-emerald-500/20" : "bg-white/8"}`}>
                  <svg className={`${isMobileViewport ? "h-2.5 w-2.5" : "h-3 w-3"} transition-colors duration-300 ${declined ? "text-gray-300" : isDone || isBuilding ? "text-emerald-400" : "text-white/30"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={mod.icon}/>
                  </svg>
                </div>
                {isMobileViewport ? (<div className={`w-full truncate text-center text-[5.5px] font-semibold leading-tight transition-colors duration-300 ${declined ? "text-gray-200 line-through" : isDone || isBuilding ? "text-foreground/70" : "text-white/35"}`}>{mod.name.split(" ")[0]}</div>) : (<div className="min-w-0 flex-1">
                    <div className={`truncate text-[8.5px] font-semibold leading-tight transition-colors duration-300 ${declined ? "text-gray-300 line-through" : isDone || isBuilding ? "text-foreground/80" : "text-white/35"}`}>{mod.name}</div>
                    <div className={`text-[7px] transition-colors duration-300 ${declined ? "text-gray-300/60" : isDone || isBuilding ? "text-emerald-500/50" : "text-white/20"}`}>{mod.tag}</div>
                </div>)}
                {/* Status badge — desktop only */}
                {!isMobileViewport && (<AnimatePresence mode="wait">
                  {declined ? (<span key="x" className="ml-auto flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-gray-300/20 text-[6px] font-bold text-gray-300">✕</span>) : isBuilding ? (<motion.span key="spin" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="ml-auto flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                      <motion.span className="text-[7px] text-emerald-400" animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}>↻</motion.span>
                    </motion.span>) : isDone ? (<motion.span key="tick" initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="ml-auto flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[6px] font-bold text-emerald-400">✓</motion.span>) : (<span key="wait" className="ml-auto flex h-3 w-3 shrink-0 items-center justify-center rounded-full border border-white/15"/>)}
                </AnimatePresence>)}
              </motion.div>);
        })}
        </div>
      </motion.div>

      {/* BUILD PROGRESS — split: left = donut tiles, right = live log */}
      <motion.div className={`relative z-10 flex min-h-0 flex-col rounded-xl border border-primary/15 ${isMobileViewport ? "h-[clamp(190px,34svh,270px)] shrink-0 p-2" : "flex-1 p-3"} ${expanded ? "overflow-visible" : "overflow-hidden"}`} style={{ background: buildProgressBg, ...cardShadow }} initial={false} animate={{ opacity: contentVisible ? 1 : 0, y: contentVisible ? 0 : 16 }} transition={{ duration: 0.56, delay: contentVisible ? 0.72 : 0, ease: [0.16, 1, 0.3, 1] }}>
        {/* Progress header */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${percent === 100 ? "bg-emerald-400" : "bg-primary animate-pulse"}`}/>
            <span className="text-[8px] font-bold uppercase tracking-widest text-primary/70">{build.progressLabel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1 w-24 overflow-hidden rounded-full" style={{ background: isLight ? "rgba(15,23,42,0.10)" : "rgba(255,255,255,0.08)" }}>
              <motion.div className="h-full rounded-full" style={{ background: percent === 100 ? "linear-gradient(90deg,#34d399,#10b981)" : "linear-gradient(90deg,#3b82f6,#06d6a0)" }} animate={{ width: `${percent}%` }} transition={{ duration: 0.5 }}/>
            </div>
            <span className={`w-7 text-right text-[8px] font-bold transition-colors duration-500 ${percent === 100 ? "text-emerald-400" : "text-primary"}`}>{percent}%</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showCta ? (<motion.div key="tiles" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35 }} className={`flex min-h-0 flex-1 ${isMobileViewport ? "flex-col gap-1.5" : "gap-2.5"}`}>

              {/* Donut tiles grid */}
              <div className={`grid grid-cols-3 content-start ${isMobileViewport ? "gap-1" : "w-[52%] shrink-0 gap-1.5"}`}>
                {BUILD_PIPELINE.map((step, i) => {
                const done = i < doneSteps;
                const active = i === doneSteps;
                const fill = done ? 1 : active ? 0.4 : 0;
                const strokeColor = done ? (isLight ? "#047857" : "#34d399") : active ? "#3b82f6" : (isLight ? "rgba(15,23,42,0.12)" : "rgba(255,255,255,0.1)");
                const cx = RING_SIZE / 2;
                return (<div key={step.label} className={`flex flex-col items-center gap-0.5 rounded-xl border transition-all duration-500 ${isMobileViewport ? "py-1.5" : "py-2"} ${done ? "border-emerald-500/30 bg-emerald-500/7" : active ? "border-primary/30 bg-primary/7" : "border-white/8 bg-white/3"}`} style={{
                        opacity: 0,
                        transform: "translateY(8px)",
                        animation: `fadeUpIn 0.3s cubic-bezier(0.22,1,0.36,1) ${0.25 + i * 0.06}s forwards`,
                        ...(!done && !active && isLight ? { borderColor: "rgba(15,23,42,0.10)", background: "rgba(15,23,42,0.03)" } : {}),
                    }}>
                      <svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}>
                        <circle cx={cx} cy={cx} r={RING_R} fill="none" stroke={donutTrack} strokeWidth="2"/>
                        <motion.circle cx={cx} cy={cx} r={RING_R} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeDasharray={CIRC_VAL} animate={{ strokeDashoffset: CIRC_VAL * (1 - fill) }} transition={{ duration: 0.7, ease: "easeOut" }} transform={`rotate(-90 ${cx} ${cx})`}/>
                        {done ? (<text x={cx} y={cx + 3.5} textAnchor="middle" fill={isLight ? "#047857" : "#34d399"} fontSize={isMobileViewport ? "7" : "9"} fontWeight="bold">✓</text>) : active ? (<text x={cx} y={cx + 4} textAnchor="middle" fill="#3b82f6" fontSize={isMobileViewport ? "9" : "11"}>↻</text>) : (<text x={cx} y={cx + 3} textAnchor="middle" fill={donutNumber} fontSize={isMobileViewport ? "6" : "8"} fontWeight="600">{i + 1}</text>)}
                      </svg>
                      <span className={`px-0.5 text-center font-semibold leading-tight transition-colors duration-300 ${isMobileViewport ? "text-[5px]" : "text-[6.5px]"} ${done ? "text-emerald-300" : active ? "text-primary" : "text-muted/35"}`}>
                        {step.label}
                      </span>
                    </div>);
            })}
              </div>

              {/* RIGHT — live log terminal (desktop only) */}
              {!isMobileViewport && (<div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-white/6 bg-black/30 p-2" style={isLight ? { background: "rgba(248,250,253,0.88)", borderColor: "rgba(15,23,42,0.08)" } : undefined}>
                <div className="mb-1.5 flex items-center gap-1">
                  {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (<div key={c} className="h-[5px] w-[5px] rounded-full" style={{ background: c, opacity: 0.6 }}/>))}
                    <span className={`ml-1 text-[6px] ${isLight ? "text-foreground/45" : "text-white/30"}`}>{build.liveLogHeader}</span>
                </div>
                <div className="flex flex-1 flex-col-reverse gap-[3px] overflow-hidden">
                  {Array.from({ length: 12 }).map((_, li) => {
                    const msgIdx = (buildTick - li + streamMsgs.length * 10) % streamMsgs.length;
                    const opacity = li === 0 ? 0.80 : li === 1 ? 0.60 : li === 2 ? 0.44 : li === 3 ? 0.30 : li === 4 ? 0.20 : li < 8 ? 0.12 : 0.06;
                    return (<AnimatePresence key={`${buildTick}-${li}`} mode="wait">
                        <motion.div key={buildTick - li} initial={{ opacity: 0, y: -4 }} animate={{ opacity, y: 0 }} transition={{ duration: 0.18 }} className={`flex items-center gap-1 font-mono text-[6.5px] ${isLight ? "text-emerald-700" : "text-emerald-300"}`}>
                            <span className={`shrink-0 ${isLight ? "text-foreground/30" : "text-white/25"}`}>›</span>
                          <span className="truncate">{streamMsgs[msgIdx]}</span>
                        </motion.div>
                      </AnimatePresence>);
                })}
                </div>
                {/* blinking cursor */}
                  <div className={`mt-1 flex items-center gap-1 font-mono text-[6.5px] ${isLight ? "text-foreground/30" : "text-white/35"}`}>
                  <span>›</span>
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>_</motion.span>
                </div>
              </div>)}

            </motion.div>) : (<motion.div key="success" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, ease: "easeOut" }} className="flex flex-col items-center gap-3 py-3">
              <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }} className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-500/50 bg-emerald-500/15" style={{ boxShadow: "0 0 32px rgba(52,168,83,0.25)" }}>
                <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <motion.path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}/>
                </svg>
              </motion.div>
              <div className="text-center">
                <div className="text-[13px] font-bold text-emerald-300">{build.success.heading}</div>
                <div className="mt-0.5 text-[9px] text-emerald-500/60">{build.success.description}</div>
              </div>
              <motion.button data-demo-id="build-dashboard-btn" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2.5 text-[11px] font-semibold text-emerald-300 transition-all hover:bg-emerald-500/25">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"/>
                {build.success.cta}
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </motion.button>
            </motion.div>)}
        </AnimatePresence>
      </motion.div>
    </motion.div>);
}
// ─── Dashboard Content ────────────────────────────────────────────────────────
function DashboardContent({ pausedRef, externalAPI, onFlowComplete, hideFloatingTitles }) {
    const { theme } = useTheme();
    const isLight = isLightTheme(theme);
    const { shared, chat, dashboard, dashboardTabs, CHART_MONTH_LABELS, TRANSLATION_LANGS, TRANSLATION_SENTENCES } = usePlatformDemoLocale();
    const [isMobileViewport, setIsMobileViewport] = useState(false);
    const chartBarOld = isLight ? "rgba(15,23,42,0.09)" : "rgba(255,255,255,0.10)";
    const chartBarMid = isLight ? "rgba(59,130,246,0.40)" : "rgba(59,130,246,0.45)";
    const chartTextFill = isLight ? "rgba(15,23,42,0.30)" : "rgba(255,255,255,0.22)";
    const donutTrack = isLight ? "rgba(15,23,42,0.10)" : "rgba(255,255,255,0.07)";
    const donutTextFill = isLight ? "#0f172a" : "white";
    const dashCardShadow = isLight ? "0 8px 24px rgba(15,23,42,0.08), 0 2px 8px rgba(15,23,42,0.05)" : undefined;
    const translBg = isLight
        ? "linear-gradient(135deg, rgba(0,212,245,0.05) 0%, rgba(77,232,194,0.03) 50%, rgba(255,255,255,0.40) 100%)"
        : "linear-gradient(135deg, rgba(0,212,245,0.06) 0%, rgba(77,232,194,0.04) 50%, rgba(0,0,0,0.15) 100%)";
    const shellBg = isLight ? "#f8fafc" : "#0a1220";
    const sidebarBg = isLight ? "rgba(255,255,255,0.86)" : "#0c1628";
    const topbarBg = isLight ? "rgba(255,255,255,0.85)" : "transparent";
    const panelBorder = isLight ? "rgba(15,23,42,0.10)" : "rgba(255,255,255,0.08)";
    const cardBg = isLight ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.03)";
    const [activeTab, setActiveTab] = useState("overview");
    const [revealStep, setRevealStep] = useState(0);
    const [translSource, setTranslSource] = useState("");
    const [translJa, setTranslJa] = useState("");
    const [translFr, setTranslFr] = useState("");
    const [translShimmer, setTranslShimmer] = useState(false);
    const [dashTabFloatingTitle, setDashTabFloatingTitle] = useState(null);
    const [aiUserQuery, setAiUserQuery] = useState("");
    const [aiInputText, setAiInputText] = useState("");
    const [aiInputActive, setAiInputActive] = useState(false);
    const [aiInputFocusFx, setAiInputFocusFx] = useState(false);
    const [aiAnalyzing, setAiAnalyzing] = useState(false);
    const [aiAnalysisStep, setAiAnalysisStep] = useState(0);
    const tabRefs = useRef([]);
    const sceneRef = useRef(null);
    const [pointerPos, setPointerPos] = useState(null);
    const [clickPulse, setClickPulse] = useState(null);
    useEffect(() => {
        const updateViewport = () => setIsMobileViewport(window.innerWidth < 1024);
        updateViewport();
        window.addEventListener("resize", updateViewport, { passive: true });
        return () => window.removeEventListener("resize", updateViewport);
    }, []);
    useEffect(() => {
        let cancelled = false;
        const cancelledRef = { current: false };
        const sleep = makePausableSleep(pausedRef, cancelledRef);
        async function reveal() {
            for (let i = 1; i <= 6; i++) {
                if (cancelled)
                    return;
                await sleep(90);
                setRevealStep(i);
            }
        }
        setRevealStep(0);
        reveal();
        return () => { cancelled = true; cancelledRef.current = true; };
    }, [activeTab, pausedRef]);
    // Pointer orchestrator — runs once per mount
    useEffect(() => {
        let cancelled = false;
        const cancelledRef = { current: false };
        let pulseKey = 0;
        const sleep = makePausableSleep(pausedRef, cancelledRef);
        const getCenterPos = (el) => {
            if (!sceneRef.current || !el)
                return null;
            const sr = sceneRef.current.getBoundingClientRect();
            const er = el.getBoundingClientRect();
            return { x: er.left - sr.left + er.width / 2, y: er.top - sr.top + er.height / 2 };
        };
        const clickAtEl = (el) => {
            const pos = getCenterPos(el);
            if (pos) {
                pulseKey++;
                setClickPulse({ ...pos, key: pulseKey });
            }
            return pos;
        };
        // Helper: show title for a tab in parallel (non-blocking) unless waitMs provided
        const showTabTitle = (id, visibleMs = 1700) => {
            setDashTabFloatingTitle(id);
            (async () => {
                await sleep(visibleMs);
                if (cancelled)
                    return;
                setDashTabFloatingTitle((cur) => (cur === id ? null : cur));
            })();
        };
        async function run() {
            // Overview title fires immediately, animation continues
            setDashTabFloatingTitle(null);
            showTabTitle("overview");
            await sleep(2900); // 2 extra seconds on Overview
            // Tab order: 0=overview, 1=news, 2=courses, 3=analytics, 4=ai-assistant
            const visits = [
                { idx: 1, id: "news" },
                { idx: 2, id: "courses" },
                { idx: 3, id: "analytics" },
                { idx: 4, id: "ai-assistant" },
            ];
            for (const { idx, id } of visits) {
                if (cancelled)
                    return;
                const pos = getCenterPos(tabRefs.current[idx]);
                if (pos)
                    setPointerPos(pos);
                await sleep(500);
                if (cancelled)
                    return;
                clickAtEl(tabRefs.current[idx]);
                setRevealStep(0);
                setActiveTab(id);
                showTabTitle(id); // parallel — animation continues immediately
                if (id === "news") {
                    setTranslSource("");
                    setTranslJa("");
                    setTranslFr("");
                    setTranslShimmer(false);
                    await sleep(500);
                    const sourceSentence = TRANSLATION_SENTENCES[0] ?? dashboard.announce.body;
                    const jaSentence = TRANSLATION_SENTENCES[1] ?? "";
                    const frSentence = TRANSLATION_SENTENCES[2] ?? "";
                    for (let c = 1; c <= sourceSentence.length; c++) {
                        if (cancelled)
                            return;
                        setTranslSource(sourceSentence.slice(0, c));
                        await sleep(30);
                    }
                    setTranslShimmer(true);
                    await sleep(680);
                    if (cancelled)
                        return;
                    setTranslShimmer(false);
                    for (let c = 1; c <= jaSentence.length; c++) {
                        if (cancelled)
                            return;
                        setTranslJa(jaSentence.slice(0, c));
                        await sleep(15);
                    }
                    for (let c = 1; c <= frSentence.length; c++) {
                        if (cancelled)
                            return;
                        setTranslFr(frSentence.slice(0, c));
                        await sleep(19);
                    }
                    await sleep(700);
                }
                else if (id === "ai-assistant") {
                    setAiUserQuery("");
                    setAiInputText("");
                    setAiInputActive(false);
                    setAiInputFocusFx(false);
                    setAiAnalyzing(false);
                    setAiAnalysisStep(0);
                    // Wait for the title to clear (~1700ms), then 1s extra before AI animation
                    await sleep(1700 + 1000);
                    if (cancelled)
                        return;
                    // Cinematic input focus fx — pointer moves to input, overlay appears
                    setPointerPos(null);
                    const query = dashboard.aiAssistant.userMessage;
                    setAiInputFocusFx(true);
                    setAiInputActive(true);
                    await sleep(260); // let overlay animate in
                    if (cancelled)
                        return;
                    for (let c = 1; c <= query.length; c++) {
                        if (cancelled)
                            return;
                        setAiInputText(query.slice(0, c));
                        await sleep(22);
                    }
                    await sleep(400);
                    if (cancelled)
                        return;
                    // "Send" — fx exits, move query to message display and clear input
                    setAiInputFocusFx(false);
                    setAiInputActive(false);
                    await sleep(320); // let overlay animate out
                    if (cancelled)
                        return;
                    setAiUserQuery(query);
                    setAiInputText("");
                    // Analyzing state
                    setAiAnalyzing(true);
                    await sleep(1200);
                    if (cancelled)
                        return;
                    setAiAnalyzing(false);
                    // Progressive analysis reveal
                    setAiAnalysisStep(1); // header + KPI shimmer
                    await sleep(650);
                    if (cancelled)
                        return;
                    setAiAnalysisStep(2); // KPIs revealed, chart shimmer
                    await sleep(700);
                    if (cancelled)
                        return;
                    setAiAnalysisStep(3); // charts revealed, competitor shimmer
                    await sleep(550);
                    if (cancelled)
                        return;
                    setAiAnalysisStep(4); // everything revealed
                    await sleep(350);
                }
                else {
                    await sleep(1200);
                }
            }
            if (!cancelled)
                setPointerPos(null);
            // Keep report visible a bit longer before finale transition.
            await sleep(1000);
            if (!cancelled)
                onFlowComplete?.();
        }
        run();
        return () => { cancelled = true; cancelledRef.current = true; };
    }, [pausedRef, onFlowComplete]);
    const R = (step) => revealStep >= step;
    const shimmerStyle = (delay = "0s") => ({
        background: "linear-gradient(90deg, var(--demo-shimmer-a) 25%, var(--demo-shimmer-b) 50%, var(--demo-shimmer-a) 75%)",
        backgroundSize: "200% 100%",
        animation: `shimmer-slide 1.4s ${delay} infinite`,
    });
    const aiShimmerStyle = (delay = "0s") => ({
        background: "linear-gradient(90deg, rgba(59,130,246,0.12) 20%, rgba(96,165,250,0.45) 50%, rgba(59,130,246,0.12) 80%)",
        backgroundSize: "200% 100%",
        animation: `shimmer-slide 1.25s ${delay} infinite`,
    });
    return (<div className={`flex min-h-0 flex-col ${isMobileViewport ? "h-[min(100%,clamp(430px,70svh,560px))] gap-2 p-2.5 pb-3" : "h-full gap-3 p-4 pb-14"}`}>
      {/* Step header — matches Design / Customize / Build */}
      <div className="shrink-0">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/60">{dashboard.stepHeader}</div>
        <div className={`mt-0.5 font-bold text-foreground ${isMobileViewport ? "text-[14px]" : "text-[16px]"}`}>{dashboard.title.prefix}<span className="text-accent">{dashboard.title.highlight}</span></div>
      </div>

      <div ref={sceneRef} className="relative min-h-0 flex-1 overflow-hidden">
      <div className="flex h-full w-full overflow-hidden rounded-xl border" style={{ boxShadow: dashCardShadow, borderColor: panelBorder, background: shellBg }}>

        {/* ── Sidebar ── */}
        <aside className="flex w-[76px] shrink-0 flex-col border-r" style={{ borderColor: panelBorder, background: sidebarBg }}>
          <div className="border-b px-1.5 py-2" style={{ borderColor: panelBorder }}>
            <div className="flex items-center justify-center overflow-hidden rounded-md" style={{ background: "#f2f8ee" }}>
              <img src={`${BASE}/nutrifit-logo.png`} alt="NutriFit Academy" className="h-8 w-full object-contain" style={{ mixBlendMode: "multiply" }}/>
            </div>
            <div className="mt-1 flex justify-center">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-1.5 py-px text-[5.5px] font-bold text-emerald-400">{dashboard.sidebar.liveBadge}</span>
            </div>
          </div>
          <div className="flex-1 space-y-0.5 p-1 pt-1.5">
            {dashboardTabs.map((tab, i) => (<button key={tab.id} ref={(el) => { tabRefs.current[i] = el; }} onClick={() => { setRevealStep(0); setActiveTab(tab.id); }} className={`flex w-full flex-col items-center gap-0.5 rounded-lg px-0.5 py-1.5 transition-all duration-200 ${activeTab === tab.id ? "bg-primary/20 text-primary shadow-[0_0_10px_rgba(59,130,246,0.18)]" : "text-muted/50 hover:bg-white/5 hover:text-muted/80"}`}>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon}/>
                </svg>
                <span className="text-[6.5px] font-medium leading-tight">{tab.label}</span>
              </button>))}
          </div>
          <div className="space-y-1 border-t p-1.5" style={{ borderColor: panelBorder }}>
            {[[dashboard.sidebar.statsLabels.students, "25"], [dashboard.sidebar.statsLabels.courses, "3"]].map(([k, v]) => (<div key={k} className="flex items-center justify-between">
                <span className="text-[5.5px] text-muted/40">{k}</span>
                <span className="text-[6.5px] font-bold text-foreground/60">{v}</span>
              </div>))}
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex h-7 shrink-0 items-center justify-between border-b px-2.5" style={{ borderColor: panelBorder, background: topbarBg }}>
            <div className="flex items-center gap-1.5">
              <svg className="h-2.5 w-2.5 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={dashboardTabs.find(t => t.id === activeTab)?.icon ?? ""}/>
              </svg>
              <span className="text-[10px] font-semibold text-foreground">{dashboardTabs.find(t => t.id === activeTab)?.label}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"/>
              <span className="text-[6.5px] font-medium text-emerald-400">{dashboard.sidebar.liveBadge}</span>
            </div>
          </div>

          <div className="flex-1 overflow-hidden p-2">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 5, scale: 0.99 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4, scale: 0.99 }} transition={{ duration: 0.22, ease: "easeOut" }} className="h-full">

                {/* ── Overview ── */}
                {activeTab === "overview" && (<div className="flex h-full flex-col gap-1.5">
                    {/* KPI cards */}
                    <div className="grid grid-cols-4 gap-1">
                      {(dashboard.overview.kpis.map((k, i) => [k.label, k.value, k.delta, ["#34d399", "#3b82f6", "#f59e0b", "#a78bfa"][i]])).map(([l, v, d, c], i) => (<motion.div key={l} initial={{ opacity: 0, y: 6 }} animate={R(i + 1) ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3 }} className="rounded-lg border p-1.5" style={{ background: `linear-gradient(135deg,${c}10 0%,rgba(255,255,255,0.03) 100%)`, borderColor: `${c}25` }}>
                          <div className="text-[6.5px] uppercase tracking-wider text-muted/55">{l}</div>
                          <div className="text-[13px] font-bold text-foreground">{v}</div>
                          <div className="text-[6.5px] font-semibold" style={{ color: c }}>{d}</div>
                        </motion.div>))}
                    </div>

                    {/* Revenue chart — full width */}
                    <motion.div initial={{ opacity: 0 }} animate={R(5) ? { opacity: 1 } : {}} className="min-h-0 flex-1 overflow-hidden rounded-lg border p-2" style={{ boxShadow: dashCardShadow, borderColor: panelBorder, background: cardBg }}>
                      <div className="mb-1 flex items-center justify-between">
                        <div className="text-[7.5px] font-semibold text-foreground">{dashboard.overview.revenueLabel}</div>
                        <div className="text-[6px] text-emerald-400">{dashboard.overview.ytdLabel}</div>
                      </div>
                      <svg viewBox="0 0 200 36" className="w-full">
                        <defs>
                          <linearGradient id="dRevGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35"/>
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        <path d="M0,26 C18,16 30,30 50,20 C70,9 88,26 106,16 C124,4 142,24 162,11 C176,2 190,7 200,5" fill="none" stroke="#4f9dff" strokeWidth="1.5"/>
                        <path d="M0,26 C18,16 30,30 50,20 C70,9 88,26 106,16 C124,4 142,24 162,11 C176,2 190,7 200,5 L200,36 L0,36 Z" fill="url(#dRevGrad)"/>
                        {CHART_MONTH_LABELS.map((m, mi) => (<text key={m} x={(mi + 0.5) * (200 / 12)} y="35" fontSize="3.2" textAnchor="middle" fill={chartTextFill}>{m}</text>))}
                      </svg>
                      <div className="mt-1 flex h-[22px] items-end gap-[2px]">
                        {[26, 34, 40, 31, 48, 54, 46, 62, 57, 68, 73, 80].map((val, i) => (<motion.div key={i} initial={{ scaleY: 0 }} animate={R(6) ? { scaleY: 1 } : {}} transition={{ duration: 0.3, delay: i * 0.04 }} className="flex-1 rounded-t-sm" style={{ height: `${val}%`, transformOrigin: "bottom", background: i >= 9 ? "linear-gradient(180deg,#34d399,#10b981)" : i >= 6 ? chartBarMid : chartBarOld }}/>))}
                      </div>
                    </motion.div>

                    {/* Donut rings — mobile: 2 cards, desktop: 3 cards */}
                    <motion.div initial={{ opacity: 0 }} animate={R(5) ? { opacity: 1 } : {}} className={`grid gap-1.5 ${isMobileViewport ? "grid-cols-2" : "grid-cols-3"}`}>
                      {(dashboard.overview.donutLabels.map((label, i) => [label, [71, 80, 88][i], ["#34d399", "#3b82f6", "#a78bfa"][i]]))
                .slice(0, isMobileViewport ? 2 : 3)
                .map(([label, pct, color]) => {
                const r = 14;
                const circ = 2 * Math.PI * r;
                return (<div key={label} className="flex items-center gap-2 rounded-lg border p-1.5" style={{ background: `${color}09`, borderColor: `${color}28` }}>
                            <svg width="44" height="44" viewBox="0 0 44 44" className="shrink-0">
                              <circle cx="22" cy="22" r={r} fill="none" stroke={donutTrack} strokeWidth="3.5"/>
                              <motion.circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeDasharray={circ} animate={R(6) ? { strokeDashoffset: circ * (1 - pct / 100) } : { strokeDashoffset: circ }} transition={{ duration: 1, ease: "easeOut" }} transform="rotate(-90 22 22)"/>
                              <text x="22" y="26" textAnchor="middle" fontSize="9" fill={donutTextFill} fontWeight="700">{pct}%</text>
                            </svg>
                            <div>
                              <div className="text-[9px] font-bold text-foreground">{pct}%</div>
                              <div className="text-[6px] text-muted/55">{label}</div>
                            </div>
                          </div>);
            })}
                    </motion.div>

                    {/* Activity feed */}
                    <motion.div initial={{ opacity: 0 }} animate={R(6) ? { opacity: 1 } : {}} className="rounded-lg border p-1.5" style={{ boxShadow: dashCardShadow, borderColor: panelBorder, background: cardBg }}>
                      <div className="mb-1 text-[7px] font-semibold text-foreground">{dashboard.overview.activityHeader}</div>
                      <div className="space-y-0.5">
                        {dashboard.overview.activities.map(({ text, date, time }) => (<div key={`${text}-${time}`} className="flex items-center gap-1.5 rounded-md bg-white/3 px-1.5 py-0.5">
                            <span className="flex-1 text-[6px] text-muted/65">{text}</span>
                            <span className="text-[5.5px] text-muted/40">{date}</span>
                            <span className="text-[5.5px] font-medium text-muted/45">{time}</span>
                          </div>))}
                      </div>
                    </motion.div>
                  </div>)}

                {/* ── Courses ── */}
                {activeTab === "courses" && (<div className="flex h-full flex-col gap-1.5">
                    {R(1) && (<motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-dashed border-emerald-500/30 bg-emerald-500/5 p-2">
                        <div className="mb-1.5 flex items-center justify-between">
                          <div className="text-[8.5px] font-semibold text-foreground">{dashboard.courses.createLabel}</div>
                          <div className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/12 px-1.5 py-0.5 text-[5.5px] font-bold uppercase text-emerald-400">
                            <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400"/>{dashboard.courses.draftLabel}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {Object.values(dashboard.courses.fields).map(({ label: k, value: v }) => (<div key={k} className="rounded-md border border-white/8 bg-white/4 px-1.5 py-1">
                              <div className="text-[5.5px] uppercase tracking-wider text-muted/50">{k}</div>
                              <div className="text-[7.5px] font-medium text-foreground">{v}</div>
                            </div>))}
                        </div>
                      </motion.div>)}
                    {R(2) && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border border-white/8 bg-white/3 p-2" style={{ boxShadow: dashCardShadow }}>
                        <div className="mb-1.5 flex items-center justify-between">
                          <div className="text-[7.5px] font-semibold text-foreground">{dashboard.courses.publishedLabel}</div>
                          <div className="text-[6.5px] text-primary">{dashboard.courses.activeLabel}</div>
                        </div>
                        <div className="space-y-1.5">
                          {(dashboard.courses.courses.map((c, ci) => [c.name, c.students, [87, 72, 65][ci], ["#34d399", "#3b82f6", "#f59e0b"][ci]])).map(([name, students, pct, color], ci) => (<motion.div key={name} initial={{ opacity: 0, x: -5 }} animate={R(3 + ci) ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, delay: ci * 0.1 }} className="flex items-center gap-1.5 rounded-md border border-white/6 bg-white/3 px-2 py-1.5">
                              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="truncate text-[7.5px] font-semibold text-foreground">{name}</div>
                                <div className="text-[6px] text-muted/55">{students}</div>
                              </div>
                              <div className="flex shrink-0 flex-col items-end gap-0.5">
                                <span className="text-[7px] font-bold" style={{ color }}>{pct}%</span>
                                <div className="h-0.5 w-12 rounded-full bg-white/8">
                                  <motion.div className="h-full rounded-full" style={{ background: color }} animate={R(3 + ci) ? { width: `${pct}%` } : { width: "0%" }} transition={{ duration: 0.8, delay: 0.3 }}/>
                                </div>
                              </div>
                            </motion.div>))}
                        </div>
                      </motion.div>)}
                    {/* Course stats bottom strip */}
                    {R(6) && (<motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-1">
                        {[
                    [dashboard.courses.stats.ratingLabel, dashboard.courses.stats.ratingValue, "#f59e0b"],
                    [dashboard.courses.stats.revLabel, dashboard.courses.stats.revValue, "#34d399"],
                    [dashboard.courses.stats.complLabel, dashboard.courses.stats.complValue, "#3b82f6"],
                ].map(([k, v, c]) => (<div key={k} className="rounded-lg border border-white/8 bg-white/3 p-1.5 text-center">
                            <div className="text-[5.5px] uppercase tracking-wider text-muted/50">{k}</div>
                            <div className="text-[11px] font-bold" style={{ color: c }}>{v}</div>
                          </div>))}
                      </motion.div>)}
                  </div>)}

                {/* ── Analytics ── */}
                {activeTab === "analytics" && (<div className="flex h-full flex-col gap-1.5">
                    <div className="grid grid-cols-3 gap-1">
                      {(dashboard.analytics.metrics.map((m, i) => [m.label, m.value, m.delta, i > 0])).map(([k, v, d, pos], i) => (<motion.div key={k} initial={{ opacity: 0, y: 5 }} animate={R(i + 1) ? { opacity: 1, y: 0 } : {}} className={`rounded-lg border p-1.5 ${pos ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/15 bg-red-500/4"}`}>
                          <div className="text-[6px] uppercase tracking-wider text-muted/55">{k}</div>
                          <div className="text-[14px] font-bold text-foreground">{v}</div>
                          <div className={`text-[6.5px] font-medium ${pos ? "text-emerald-400" : "text-red-400"}`}>{d} {dashboard.analytics.metrics[i]?.suffix ?? "vs last mo"}</div>
                        </motion.div>))}
                    </div>
                    <motion.div initial={{ opacity: 0 }} animate={R(4) ? { opacity: 1 } : {}} className="rounded-lg border border-white/8 bg-white/3 p-2" style={{ boxShadow: dashCardShadow }}>
                      <div className="mb-1 flex items-center justify-between">
                        <div className="text-[7.5px] font-semibold text-foreground">{dashboard.analytics.revenueLabel}</div>
                        <div className="text-[6.5px] text-emerald-400">{dashboard.analytics.ytdLabel}</div>
                      </div>
                      <div className="flex h-[36px] items-end gap-[3px]">
                        {[26, 34, 40, 31, 48, 54, 46, 62, 57, 68, 73, 80].map((v, i) => (<motion.div key={i} initial={{ scaleY: 0 }} animate={R(5) ? { scaleY: 1 } : {}} transition={{ duration: 0.3, delay: i * 0.04 }} className="flex-1 rounded-t-sm" style={{ height: `${v}%`, transformOrigin: "bottom", background: i >= 9 ? "linear-gradient(180deg,#34d399,#10b981)" : i >= 6 ? chartBarMid : chartBarOld }}/>))}
                      </div>
                      <div className="mt-0.5 flex justify-between">
                        {CHART_MONTH_LABELS.map((m) => <span key={m} className="text-[4.5px] text-muted/30">{m}</span>)}
                      </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={R(5) ? { opacity: 1 } : {}} className="flex-1 rounded-lg border border-white/8 bg-white/3 p-2" style={{ boxShadow: dashCardShadow }}>
                      <div className="mb-1.5 text-[7.5px] font-semibold text-foreground">{dashboard.analytics.funnel.label}</div>
                      <div className="space-y-1.5">
                        {(dashboard.analytics.funnel.steps.map((s, i) => [s.label, s.count, ["100%", "63%", "28%", "20%"][i], ["#3b82f6", "#8b5cf6", "#06b6d4", "#34d399"][i]])).map(([label, num, pct, color]) => (<div key={label} className="flex items-center gap-1.5">
                            <div className="w-12 text-[6px] text-muted/60">{label}</div>
                            <div className="h-1.5 flex-1 rounded-full bg-white/6">
                              <motion.div className="h-full rounded-full" style={{ background: color }} animate={R(6) ? { width: pct } : { width: "0%" }} transition={{ duration: 0.7, ease: "easeOut" }}/>
                            </div>
                            <div className="w-8 text-right text-[6px] text-muted/50">{num}</div>
                          </div>))}
                      </div>
                      {/* Q4 Goals */}
                      <div className="mt-2 border-t border-white/8 pt-1.5">
                        <div className="mb-1 text-[6.5px] font-semibold text-foreground/65">{dashboard.analytics.goals.label}</div>
                        <div className="flex gap-2">
                          {dashboard.analytics.goals.itemLabels.map((label, idx) => ({ label, pct: [62, 50, 48][idx] })).map(({ label, pct }) => (<div key={label} className="flex-1">
                              <div className="mb-0.5 text-[5.5px] text-muted/50">{label}</div>
                              <div className="h-1 w-full rounded-full bg-white/6">
                                <motion.div className="h-full rounded-full bg-indigo-400/55" animate={R(6) ? { width: `${pct}%` } : { width: "0%" }} transition={{ duration: 0.8 }}/>
                              </div>
                              <div className="mt-0.5 text-[5.5px] text-indigo-400">{pct}%</div>
                            </div>))}
                        </div>
                      </div>
                    </motion.div>
                  </div>)}

                {/* ── News / AI Translation ── */}
                {activeTab === "news" && (<div className="flex h-full flex-col gap-1.5">
                    {R(1) && (<motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-white/8 bg-white/3 p-2">
                        <div className="mb-1 flex items-center justify-between">
                          <div className="text-[8px] font-semibold text-foreground">{dashboard.announce.newLabel}</div>
                          <div className="rounded-full border border-white/10 bg-white/5 px-1.5 py-px text-[5.5px] text-muted/55">{dashboard.announce.pill}</div>
                        </div>
                        <div className="rounded-md border border-white/6 bg-white/3 px-2 py-1.5 text-[7.5px] leading-relaxed text-foreground/70">
                          {dashboard.announce.body}
                        </div>
                      </motion.div>)}
                    {R(2) && (<motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="flex-1 overflow-hidden rounded-xl border border-cyan-500/25 p-2.5" style={{ background: translBg, boxShadow: dashCardShadow }}>

                        {/* Header */}
                        <div className="mb-2 flex items-center gap-1.5 border-b border-cyan-500/15 pb-1.5">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-[10px]">🌍</div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[8px] font-bold text-foreground">{dashboard.announce.translationPanel.heading}</div>
                            <div className="text-[6px] text-muted/55">{dashboard.announce.translationPanel.sub}</div>
                          </div>
                          <div className="flex shrink-0 items-center gap-1 rounded-full border border-teal-400/30 bg-teal-400/10 px-1.5 py-0.5 text-[5.5px] font-bold uppercase tracking-wider text-teal-300">
                            <span className="h-1 w-1 animate-pulse rounded-full bg-teal-400"/>{dashboard.announce.translationPanel.badge}
                          </div>
                        </div>

                        {/* 3-col: source | arrow | translations */}
                        <div className="grid grid-cols-[1fr_18px_1fr] items-start gap-1.5">
                          {/* Source */}
                          <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/6 p-1.5">
                            <div className="mb-1 text-[5.5px] uppercase tracking-widest text-cyan-400">🇹🇷 Türkçe — Kaynak</div>
                            <div className="min-h-[30px] text-[7.5px] leading-relaxed text-foreground/80">
                              {translSource}
                              {translSource.length > 0 && (<span className="ml-px inline-block h-[9px] w-px align-middle bg-cyan-400" style={{ animation: "cursor-blink 1s step-end infinite" }}/>)}
                            </div>
                          </div>

                          {/* Spinning arrow */}
                          <div className="flex justify-center pt-5">
                            <div className="flex h-4 w-4 items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/10 text-[7px]" style={{ animation: "spin-slow 3s linear infinite" }}>✦</div>
                          </div>

                          {/* JA + FR stacked */}
                          <div className="flex flex-col gap-1">
                            <div className="rounded-lg border border-white/8 bg-white/4 p-1.5">
                              <div className="mb-1 text-[5.5px] uppercase tracking-widest text-muted/55">🇯🇵 日本語</div>
                              <div className="min-h-[28px] text-[6.5px] leading-relaxed text-foreground/70">
                                {translShimmer ? (<div className="space-y-1">
                                    <div className="h-1.5 rounded" style={{ width: "90%", ...shimmerStyle() }}/>
                                    <div className="h-1.5 rounded" style={{ width: "70%", ...shimmerStyle("0.1s") }}/>
                                  </div>) : translJa}
                              </div>
                            </div>
                            <div className="rounded-lg border border-white/8 bg-white/4 p-1.5">
                              <div className="mb-1 text-[5.5px] uppercase tracking-widest text-muted/55">🇫🇷 Français</div>
                              <div className="min-h-[24px] text-[6.5px] leading-relaxed text-foreground/70">
                                {translShimmer ? (<div className="space-y-1">
                                    <div className="h-1.5 rounded" style={{ width: "85%", ...shimmerStyle("0.2s") }}/>
                                    <div className="h-1.5 rounded" style={{ width: "65%", ...shimmerStyle("0.3s") }}/>
                                  </div>) : translFr}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Language badges */}
                        <div className="mt-1.5 flex flex-wrap gap-0.5">
                          {TRANSLATION_LANGS.map((lang) => (<div key={lang} className="rounded-full border border-cyan-400/20 bg-cyan-400/6 px-1 py-px text-[5.5px] font-bold text-cyan-300/65">{lang}</div>))}
                          <div className="rounded-full border border-white/8 bg-white/3 px-1 py-px text-[5.5px] text-muted/35">{dashboard.announce.moreLangs}</div>
                        </div>
                      </motion.div>)}
                  </div>)}

                {/* ── AI Business Assistant — full-screen chat ── */}
                {activeTab === "ai-assistant" && (<div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/8 bg-[#080f1c]">

                    {/* Chat header */}
                    <div className="flex shrink-0 items-center gap-2 border-b border-white/8 bg-white/2 px-2.5 py-1">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/25 text-[7px] font-bold text-primary">{chat.avatars.ai}</div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[8px] font-semibold text-foreground">{dashboard.aiAssistant.header}</div>
                        <div className="text-[6px] text-emerald-400/80">{dashboard.aiAssistant.status}</div>
                      </div>
                      <div className="flex gap-1.5">
                        {dashboard.aiAssistant.pills.map((label) => (<div key={label} className="rounded-full border border-white/10 bg-white/4 px-1.5 py-0.5 text-[5.5px] text-muted/50">{label}</div>))}
                      </div>
                    </div>

                    {/* Messages area */}
                    <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto p-2">

                    {/* Greeting — visible until analysis starts */}
                    {R(1) && aiAnalysisStep === 0 && !aiAnalyzing && !aiUserQuery && (<motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-1.5">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[6px] font-bold text-primary">{dashboard.aiAssistant.avatars.ai}</div>
                        <div className="max-w-[82%] rounded-xl rounded-tl-sm border border-primary/15 bg-primary/5 px-2 py-1 text-[7px] leading-relaxed text-foreground/80">
                          {dashboard.aiAssistant.greeting}
                        </div>
                      </motion.div>)}

                    {/* User query bubble */}
                    {aiUserQuery && (<motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="flex items-end justify-end gap-1.5">
                        <div className="max-w-[82%] rounded-xl rounded-br-sm border border-white/12 bg-white/8 px-2 py-1 text-[6.5px] leading-relaxed text-foreground/85">
                          {aiUserQuery}
                        </div>
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[6px] text-white/60">{dashboard.aiAssistant.avatars.user}</div>
                      </motion.div>)}

                    {/* Analyzing */}
                    {aiAnalyzing && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-w-0 items-start gap-1.5">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[6px] font-bold text-primary">{dashboard.aiAssistant.avatars.ai}</div>
                        <div className="flex max-w-[82%] min-w-0 flex-wrap items-center gap-1.5 rounded-xl rounded-tl-sm border border-blue-400/30 bg-blue-400/10 px-2 py-1.5">
                          <svg className="h-3.5 w-3.5 shrink-0 animate-spin text-blue-300" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                          </svg>
                          <span className="text-[7px] font-medium text-blue-200">{dashboard.aiAssistant.analyzing}</span>
                          <div className="flex w-full flex-wrap gap-0.5">
                            {dashboard.aiAssistant.analyzeChips.map((label, i) => (<motion.div key={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.28 }} className="rounded-full bg-blue-400/15 px-1 py-0.5 text-[5px] text-blue-200/80">{label}</motion.div>))}
                          </div>
                        </div>
                      </motion.div>)}

                    {/* ── Progressive Analysis Results (AI reply bubble) ── */}
                    {aiAnalysisStep > 0 && (<motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-0 flex-1 items-start gap-1.5 overflow-x-hidden">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[6px] font-bold text-primary">{dashboard.aiAssistant.avatars.ai}</div>
                      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-1.5 overflow-x-hidden">

                        {/* Report header */}
                        <div className={`flex shrink-0 gap-1.5 ${isMobileViewport ? "flex-col items-start" : "items-center justify-between"}`}>
                          <div className="min-w-0">
                            <div className="text-[8px] font-bold text-foreground">{dashboard.aiAssistant.report.title}</div>
                            <div className="text-[6px] text-muted/45">{dashboard.aiAssistant.report.sub}</div>
                          </div>
                          <div className="flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/12 px-1.5 py-0.5 text-[5.5px] font-bold text-emerald-400">
                            <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400"/>{dashboard.aiAssistant.report.badge}
                          </div>
                        </div>

                        {/* KPI strip — shimmer (step 1) or actual (step 2+) */}
                        <AnimatePresence mode="wait">
                          {aiAnalysisStep === 1 ? (<motion.div key="kpi-shimmer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`grid shrink-0 gap-1 ${isMobileViewport ? "grid-cols-2" : "grid-cols-4"}`}>
                              {[0, 1, 2, 3].map((i) => (<div key={i} className="h-[40px] rounded-lg border border-white/8" style={{ ...aiShimmerStyle(`${i * 0.1}s`) }}/>))}
                            </motion.div>) : (<motion.div key="kpi-real" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`grid shrink-0 gap-1 ${isMobileViewport ? "grid-cols-2" : "grid-cols-4"}`}>
                              {(dashboard.aiAssistant.report.kpis.map((k, i) => [k.label, k.value, k.sub, ["#34d399", "#3b82f6", "#f59e0b", "#a78bfa"][i]])).map(([l, v, s, c], i) => (<motion.div key={l} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="rounded-lg border p-1.5" style={{ background: `${c}09`, borderColor: `${c}28` }}>
                                  <div className="text-[5.5px] uppercase tracking-wider text-muted/50">{l}</div>
                                  <div className="text-[11px] font-bold text-foreground">{v}</div>
                                  <div className="text-[5.5px] text-muted/55">{s}</div>
                                </motion.div>))}
                            </motion.div>)}
                        </AnimatePresence>

                        {/* Charts 2×2 — shimmer (step 2) or actual (step 3+) */}
                        <AnimatePresence mode="wait">
                          {aiAnalysisStep === 2 ? (<motion.div key="charts-shimmer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`grid min-h-0 flex-1 gap-1.5 ${isMobileViewport ? "grid-cols-1 auto-rows-[72px]" : "grid-cols-2 grid-rows-2"}`}>
                              {[0, 1, 2, 3].map((i) => (<div key={i} className="rounded-lg border border-white/8" style={aiShimmerStyle(`${i * 0.1}s`)}/>))}
                            </motion.div>) : aiAnalysisStep >= 3 ? (<motion.div key="charts-real" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`grid min-h-0 flex-1 gap-1.5 ${isMobileViewport ? "grid-cols-1 auto-rows-[minmax(82px,auto)]" : "grid-cols-2 grid-rows-2"}`}>

                              {/* TOP-LEFT: Ad Cost by Platform */}
                              <div className="min-w-0 rounded-lg border border-white/8 bg-white/3 p-1.5" style={{ boxShadow: dashCardShadow }}>
                                <div className="mb-1 text-[7px] font-semibold text-foreground">{dashboard.aiAssistant.report.adCostLabel}</div>
                                <div className="space-y-1">
                                  {dashboard.aiAssistant.report.adCosts.map((a, i) => [a.name, [85, 72, 58, 45, 28][i], ["#3b82f6", "#f59e0b", "#ec4899", "#ef4444", "#8b5cf6"][i], a.cost]).map(([name, pct, color, cost]) => (<div key={name} className="flex items-center gap-1">
                                      <div className={`${isMobileViewport ? "w-8" : "w-11"} truncate text-[5.5px] text-muted/60`}>{name}</div>
                                      <div className="h-1 flex-1 rounded-full bg-white/6">
                                        <motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6 }}/>
                                      </div>
                                      <div className={`${isMobileViewport ? "w-8" : "w-10"} text-right text-[5.5px] font-medium`} style={{ color }}>{cost}</div>
                                    </div>))}
                                </div>
                              </div>

                              {/* TOP-RIGHT: Search Interest */}
                              <div className="min-w-0 flex flex-col rounded-lg border border-white/8 bg-white/3 p-1.5" style={{ boxShadow: dashCardShadow }}>
                                <div className="mb-1 text-[7px] font-semibold text-foreground">{dashboard.aiAssistant.report.searchInterestLabel}</div>
                                <div className="flex h-[28px] items-end gap-[2px]">
                                  {[32, 38, 45, 41, 55, 62, 58, 70, 68, 78, 82, 90].map((val, i) => (<motion.div key={i} className="flex-1 rounded-t-sm" style={{ background: i >= 9 ? "linear-gradient(180deg,#34d399,#10b981)" : i >= 6 ? chartBarMid : chartBarOld }} initial={{ height: 0 }} animate={{ height: `${val}%` }} transition={{ duration: 0.4, delay: i * 0.03 }}/>))}
                                </div>
                                <div className="mt-0.5 flex justify-between text-[4.5px] text-muted/30">
                                  {CHART_MONTH_LABELS.map((m) => <span key={m}>{m}</span>)}
                                </div>
                                <div className="mt-1 grid grid-cols-3 gap-0.5">
                                  {[["18–25", 28, "#3b82f6"], ["26–35", 45, "#a78bfa"], ["36–45", 27, "#34d399"]].map(([age, pct, color]) => (<div key={age} className="rounded border border-white/6 bg-white/3 p-0.5 text-center">
                                      <div className="text-[5.5px] text-muted/50">{age}</div>
                                      <div className="text-[8px] font-bold" style={{ color }}>{pct}%</div>
                                    </div>))}
                                </div>
                              </div>

                              {/* BOTTOM-LEFT: Keyword Opportunities */}
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="min-w-0 rounded-lg border border-white/8 bg-white/3 p-1.5" style={{ boxShadow: dashCardShadow }}>
                                <div className="mb-1 text-[7px] font-semibold text-foreground">{dashboard.aiAssistant.report.keywordsLabel}</div>
                                <div className="space-y-1">
                                  {(dashboard.aiAssistant.report.keywords.map((k, i) => [k.kw, [92, 74, 58, 38][i], ["#34d399", "#3b82f6", "#a78bfa", "#f59e0b"][i], k.vol])).map(([kw, pct, color, vol]) => (<div key={kw} className="flex items-center gap-1">
                                      <div className={`${isMobileViewport ? "w-14" : "w-[68px]"} truncate text-[5.5px] text-muted/60`}>{kw}</div>
                                      <div className="h-1 flex-1 rounded-full bg-white/6">
                                        <motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5, delay: 0.2 }}/>
                                      </div>
                                      <div className="w-9 text-right text-[5px] font-medium text-muted/55">{vol}</div>
                                    </div>))}
                                </div>
                              </motion.div>

                              {/* BOTTOM-RIGHT: Revenue Forecast */}
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="min-w-0 flex flex-col rounded-lg border border-white/8 bg-white/3 p-1.5" style={{ boxShadow: dashCardShadow }}>
                                <div className="mb-1 text-[7px] font-semibold text-foreground">{dashboard.aiAssistant.report.forecastLabel}</div>
                                <div className="flex flex-1 flex-col justify-between gap-1">
                                  {(dashboard.aiAssistant.report.forecast.map((f, ri) => [f.year, f.value, [30, 60, 100][ri], ["#3b82f6", "#a78bfa", "#34d399"][ri]])).map(([yr, val, pct, color], ri) => (<div key={yr} className="flex items-center gap-1.5">
                                      <div className="w-8 text-[5.5px] text-muted/50">{yr}</div>
                                      <div className="h-1.5 flex-1 rounded-full bg-white/6">
                                        <motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6, delay: 0.3 + ri * 0.1 }}/>
                                      </div>
                                      <div className="w-9 text-right text-[7px] font-bold" style={{ color }}>{val}</div>
                                    </div>))}
                                </div>
                                <div className="mt-1 flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/6 px-1.5 py-0.5">
                                  <span className="text-[7px]">📈</span>
                                  <span className="text-[5.5px] text-emerald-400">{dashboard.aiAssistant.report.forecastGrowthNote}</span>
                                </div>
                              </motion.div>

                            </motion.div>) : (<div key="charts-empty" className="flex-1"/>)}
                        </AnimatePresence>

                        {/* Competitor — shimmer (step 3) or actual (step 4) */}
                        <AnimatePresence mode="wait">
                          {aiAnalysisStep === 3 ? (<motion.div key="comp-shimmer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-[24px] shrink-0 rounded-lg border border-white/8" style={aiShimmerStyle()}/>) : aiAnalysisStep >= 4 ? (<motion.div key="comp-real" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="shrink-0 rounded-lg border border-white/8 bg-white/3 p-1.5" style={{ boxShadow: dashCardShadow }}>
                              <div className="mb-1 flex items-center justify-between">
                                <div className="text-[7px] font-semibold text-foreground">{dashboard.aiAssistant.report.competitorLabel}</div>
                                <div className="text-[6px] font-medium text-emerald-400">{dashboard.aiAssistant.report.competitorBadge}</div>
                              </div>
                              <div className="flex gap-1.5">
                                {(dashboard.aiAssistant.report.competitors.map((c, i) => [c.name, [34, 18, 28, 20][i], ["#ef4444", "#f59e0b", "#3b82f6", "#8b5cf6"][i]])).map(([name, pct, color]) => (<div key={name} className="flex flex-1 flex-col items-center gap-0.5">
                                    <div className="w-full truncate text-center text-[5.5px] text-muted/50">{name}</div>
                                    <div className="text-[9px] font-bold" style={{ color }}>{pct}%</div>
                                    <div className="h-0.5 w-full rounded-full bg-white/8">
                                      <motion.div className="h-full rounded-full" style={{ background: color }} initial={{ width: 0 }} animate={{ width: `${pct * 2.8}%` }} transition={{ duration: 0.5 }}/>
                                    </div>
                                  </div>))}
                              </div>
                            </motion.div>) : null}
                        </AnimatePresence>

                      </div>
                      </motion.div>)}

                    </div>{/* end messages area */}

                    {/* Input bar */}
                    <div className="shrink-0 border-t border-white/8 bg-white/2 px-2.5 py-1.5">
                      <div className={`flex items-center gap-1.5 rounded-xl border px-2 py-1 transition-colors duration-200 ${aiInputActive ? "border-primary/40 bg-primary/6" : "border-white/10 bg-white/4"}`}>
                        <span className="flex-1 truncate font-mono text-[7px] text-foreground/75">
                          {aiInputText || <span className="text-muted/35">{dashboard.aiAssistant.inputPlaceholder}</span>}
                          {aiInputActive && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="ml-px inline-block h-[9px] w-px align-middle bg-primary/70"/>}
                        </span>
                        <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md bg-primary/20">
                          <svg className="h-2.5 w-2.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                  </div>)}

              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {pointerPos && (<motion.div className={`pointer-events-none absolute z-30 ${isLight ? "drop-shadow-[0_3px_7px_rgba(15,23,42,0.28)]" : "drop-shadow-[0_3px_7px_rgba(0,0,0,0.45)]"}`} animate={{ x: pointerPos.x - 6, y: pointerPos.y - 1 }} transition={{ duration: 0.55, ease: "easeInOut" }} style={{ left: 0, top: 0 }}>
            <DemoCursor size={22} light={isLight}/>
          </motion.div>)}
      </AnimatePresence>
      <AnimatePresence>
        {clickPulse && (<motion.span key={clickPulse.key} className="pointer-events-none absolute z-30 h-5 w-5 rounded-full border border-primary/80" style={{ left: clickPulse.x - 8, top: clickPulse.y - 8 }} initial={{ scale: 0.3, opacity: 0.95 }} animate={{ scale: 2, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}/>)}
      </AnimatePresence>

      {/* Dashboard tab floating title — blur + centered label on every tab switch */}
      <AnimatePresence>
        {!hideFloatingTitles && dashTabFloatingTitle && (<>
            <motion.div key={`dash-bd-base-${dashTabFloatingTitle}`} className="pointer-events-none absolute inset-0 z-[33]" style={{ backdropFilter: "blur(1.2px)", WebkitBackdropFilter: "blur(1.2px)", background: isLight ? "rgba(240,245,255,0.08)" : "rgba(0,0,0,0.04)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.35, 0, 0.65, 1] } }} transition={{ duration: 0.7, ease: "linear" }}/>
            <motion.div key={`dash-bd-strong-${dashTabFloatingTitle}`} className="pointer-events-none absolute inset-0 z-[34]" style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", background: isLight ? "rgba(240,245,255,0.12)" : "rgba(0,0,0,0.06)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.7, 0.3] } }} transition={{ duration: 1.1, delay: 0.2, ease: "linear" }}/>
          </>)}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {!hideFloatingTitles && dashTabFloatingTitle && (<motion.div key={`dash-title-${dashTabFloatingTitle}`} className="pointer-events-none absolute left-1/2 top-1/2 z-[36] w-full -translate-x-1/2 -translate-y-1/2 px-4" initial={{ opacity: 0, y: 18, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10, filter: "blur(4px)", transition: { duration: 0.42, ease: [0.4, 0, 0.7, 0.3] } }} transition={{ duration: 0.9, ease: "linear" }}>
            <div className="px-3 py-2 text-center">
              {dashTabFloatingTitle && dashboard.floatingTitles[dashTabFloatingTitle] && (<h2 className={`font-bold leading-[1.1] tracking-tight text-foreground ${isMobileViewport ? "text-[24px]" : "text-[40px]"}`} style={isMobileViewport ? { color: isLight ? "#0f172a" : "#ffffff" } : undefined}>
                  {dashboard.floatingTitles[dashTabFloatingTitle].prefix}
                  <span className="text-primary" style={isMobileViewport ? { color: "#3b82f6" } : undefined}>{dashboard.floatingTitles[dashTabFloatingTitle].highlight}</span>
                </h2>)}
            </div>
          </motion.div>)}
      </AnimatePresence>

      {/* Cinematic input focus overlay — mirrors chat scene fx */}
      <AnimatePresence>
        {aiInputFocusFx && (<motion.div key="ai-input-focus-fx" className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.42, ease: "easeOut" }}>
            {/* Blur backdrop */}
            <motion.div className="absolute inset-0" style={{
                backdropFilter: "blur(6px) saturate(130%)",
                WebkitBackdropFilter: "blur(6px) saturate(130%)",
                background: isLight ? "rgba(240,245,255,0.22)" : "rgba(0,0,0,0.07)",
            }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.38, ease: "easeOut" }}/>

            {/* Centered input card */}
            <motion.div className="relative z-10 w-[min(88%,460px)]" initial={{ opacity: 0, scale: 0.78, y: 32 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{
                opacity: 0, scale: 0.72, y: 100, x: "-18%",
                transition: {
                    opacity: { duration: 0.22, ease: "easeIn" },
                    scale: { duration: 0.34, ease: [0.4, 0, 1, 0.8] },
                    y: { duration: 0.34, ease: [0.4, 0, 1, 0.8] },
                    x: { duration: 0.34, ease: [0.4, 0, 1, 0.8] },
                },
            }} transition={{
                opacity: { duration: 0.30, ease: "easeOut" },
                scale: { type: "spring", stiffness: 240, damping: 22 },
                y: { type: "spring", stiffness: 240, damping: 24 },
            }}>
              <div className="overflow-hidden rounded-2xl border" style={{
                background: isLight ? "rgba(255,255,255,0.96)" : "rgba(10,18,32,0.90)",
                borderColor: isLight ? "rgba(59,130,246,0.22)" : "rgba(59,130,246,0.20)",
                boxShadow: isLight
                    ? "0 24px 56px rgba(15,23,42,0.14), 0 0 0 1px rgba(59,130,246,0.10)"
                    : "0 28px 60px rgba(0,0,0,0.42), 0 0 0 1px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
                backdropFilter: "blur(28px) saturate(200%)",
                WebkitBackdropFilter: "blur(28px) saturate(200%)",
            }}>
                {/* Header */}
                <div className="flex items-center gap-2 px-4 py-2.5" style={{
                borderBottom: isLight ? "1px solid rgba(15,23,42,0.08)" : "1px solid rgba(255,255,255,0.07)",
                background: isLight ? "rgba(248,250,255,0.9)" : "rgba(255,255,255,0.03)",
            }}>
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/25 bg-white">
                    <img src={`${BASE}/admino-logo.png`} alt={shared.logoAlt} className="h-[85%] w-[85%] object-contain"/>
                  </div>
                  <span className={`text-[11px] font-semibold ${isLight ? "text-slate-700" : "text-foreground/80"}`}>
                    {dashboard.aiAssistant.header}
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-[9px] text-accent">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"/>
                    {chat.panel.status}
                  </span>
                </div>

                {/* Input body */}
                <div className="px-4 py-3.5">
                  <div className="min-h-[52px] rounded-xl px-3.5 py-2.5 text-[12.5px] leading-relaxed" style={{
                border: isLight ? "1.5px solid rgba(59,130,246,0.30)" : "1px solid rgba(59,130,246,0.38)",
                background: isLight ? "rgba(239,246,255,0.70)" : "rgba(255,255,255,0.06)",
            }}>
                    {aiInputText ? (<span className={isLight ? "text-slate-800" : "text-foreground/92"}>
                        {aiInputText}
                        <motion.span className="ml-px inline-block h-[14px] w-[2px] rounded-full bg-primary align-middle" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}/>
                      </span>) : (<span className={isLight ? "text-slate-400" : "text-muted/55"}>
                        Ask anything about your academy…
                      </span>)}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>
      </div>
    </div>);
}
// ─── Layout Thumbnail (wireframe matching each layout variant) ────────────────
// ─── Design Popup Overlay ────────────────────────────────────────────────────
function DesignPopup({ layoutIndex, selectedDesign, onSelect, onClose, expanded, }) {
    const { LAYOUT_GROUPS, design, designLanguages } = usePlatformDemoLocale();
    const group = LAYOUT_GROUPS[layoutIndex];
    if (!group)
        return null;
    return (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}/>
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 5 }} transition={{ duration: 0.35, ease: "easeOut" }} className={`relative z-10 mx-3 overflow-y-auto rounded-2xl border border-white/15 bg-surface/95 shadow-2xl backdrop-blur-xl ${expanded
            ? "max-h-[94%] w-[96%] p-5 sm:p-6"
            : "max-h-[95%] w-[94%] p-4 sm:p-5 lg:max-h-[90%] lg:w-[90%]"}`}>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <div className={`font-bold text-foreground ${expanded ? "text-[16px]" : "text-[14px]"}`}>{group.label}</div>
              <div className={`text-muted ${expanded ? "text-[11px]" : "text-[10px]"}`}>{design.popup.subtitle}</div>
            </div>
          </div>
          <button data-demo-id="design-popup-close" onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-muted transition-all hover:bg-white/10">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className={`grid grid-cols-2 gap-2.5 lg:grid-cols-3 ${expanded ? "lg:gap-5" : "lg:gap-3"}`}>
          {designLanguages.map((lang, si) => (<motion.div key={si} data-demo-id={`design-popup-option-${si}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.06, duration: 0.3 }} className="group flex cursor-pointer flex-col items-center" onClick={() => onSelect(si)}>
              <DesignPreviewCard lang={lang} selected={selectedDesign === si} fixedSize={!expanded} largePopup={expanded} layoutVariant={layoutIndex}/>
              <div className={`flex justify-center ${expanded ? "mt-3" : "mt-2"}`}>
                <span className={`rounded-full px-2.5 py-0.5 font-semibold transition-all ${expanded ? "text-[11px] lg:text-[12px]" : "text-[8px] lg:text-[9px]"} ${selectedDesign === si ? "bg-accent/20 text-accent ring-1 ring-accent/40" : "bg-white/5 text-muted group-hover:bg-white/10 group-hover:text-foreground"}`}>
                  {lang.name}
                </span>
              </div>
            </motion.div>))}
        </div>
      </motion.div>
    </motion.div>);
}
// ─── Pausable sleep helper ────────────────────────────────────────────────
function makePausableSleep(pausedRef, cancelledRef) {
    return (ms) => new Promise((resolve) => {
        let remaining = ms;
        let start = Date.now();
        let timeout = null;
        let interval = null;
        let wasPaused = false;
        const cleanup = () => {
            if (timeout)
                clearTimeout(timeout);
            if (interval)
                clearInterval(interval);
        };
        const schedule = () => {
            start = Date.now();
            timeout = setTimeout(() => {
                cleanup();
                resolve();
            }, remaining);
        };
        schedule();
        interval = setInterval(() => {
            if (cancelledRef.current) {
                cleanup();
                return;
            }
            if (pausedRef.current) {
                if (!wasPaused) {
                    // Transition: running → paused — subtract elapsed once
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    remaining = Math.max(0, remaining - (Date.now() - start));
                    wasPaused = true;
                }
                // While paused: do nothing, remaining is already saved
            }
            else {
                if (wasPaused) {
                    // Transition: paused → running — restart timeout with saved remaining
                    wasPaused = false;
                    schedule();
                }
            }
        }, 50);
    });
}
// ─── Shared DOM utility ───────────────────────────────────────────────────────
function getElemPosInDemo(dataId) {
    const el = document.querySelector(`[data-demo-id="${dataId}"]`);
    if (!el)
        return null;
    const rect = el.getBoundingClientRect();
    const parentRect = el.closest("[data-demo-root]")?.getBoundingClientRect();
    if (!parentRect)
        return null;
    return {
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top + rect.height / 2 - 40,
    };
}
// ─── Scene Config ─────────────────────────────────────────────────────────────
const SCENE_ORDER = ["chat", "design", "customize", "build", "dashboard"];
const BUILD_SPEED_MULTIPLIER = 0.6; // 40% faster
const scaleBuildMs = (ms) => Math.max(80, Math.round(ms * BUILD_SPEED_MULTIPLIER));
const BUILD_INTERVAL_MS = Math.max(220, Math.round(420 * BUILD_SPEED_MULTIPLIER));
const SCENE_DURATIONS = [44000, 14000, 26000, Math.round(18000 * BUILD_SPEED_MULTIPLIER), 29000];
// ─── Main Export ──────────────────────────────────────────────────────────────
const PlatformDemo = forwardRef(function PlatformDemo({ hideSceneControls, onSceneChange, onPauseChange, onProgressChange, onFocusClick, onUserSceneSelect, onUserTogglePause, onSceneReachedEnd, focusActive, expanded, hideFloatingTitles, scrollDrivenPrologue, skipIntro }, ref) {
    const { theme } = useTheme();
    const isLightMode = isLightTheme(theme);
    // Locale-resolved demo content. We re-type-assert to the same shapes the
    // top-level English defaults use so all the JSX below stays type-safe.
    const localized = getPlatformDemoContent();
    const shared = localized.shared;
    const chat = localized.chat;
    const design = localized.design;
    const customize = localized.customize;
    const build = localized.build;
    const dashboard = localized.dashboard;
    const MODULE_LIST = useMemo(() => shared.modules.map((m, i) => ({ ...m, icon: MODULE_ICONS[i] })), [shared.modules]);
    const designLanguages = useMemo(() => designLanguagesBase.map((lang, i) => ({
        ...lang,
        name: shared.designLanguages[i]?.name ?? "",
    })), [shared.designLanguages]);
    const LAYOUT_GROUPS = useMemo(() => LAYOUT_STYLE_GROUPS.map((styles, i) => ({
        label: shared.layoutGroups[i]?.label ?? "",
        styles,
    })), [shared.layoutGroups]);
    const BUILD_PIPELINE = useMemo(() => build.pipeline, [build.pipeline]);
    const dashboardTabs = useMemo(() => dashboard.tabLabels.map((label, i) => ({ id: DASHBOARD_TAB_IDS[i], label, icon: DASHBOARD_TAB_ICONS[i] })), [dashboard.tabLabels]);
    const SCENE_LABELS = useMemo(() => shared.sceneLabels, [shared.sceneLabels]);
    const CHART_MONTH_LABELS = useMemo(() => shared.chartMonthLabels, [shared.chartMonthLabels]);
    const TRANSLATION_LANGS = useMemo(() => shared.translationLangs, [shared.translationLangs]);
    const TRANSLATION_SENTENCES = useMemo(() => shared.translationSentences, [shared.translationSentences]);
    const localeValue = useMemo(() => ({
        shared,
        chat,
        design,
        customize,
        build,
        dashboard,
        MODULE_LIST,
        LAYOUT_GROUPS,
        designLanguages,
        BUILD_PIPELINE,
        dashboardTabs,
        CHART_MONTH_LABELS,
        TRANSLATION_LANGS,
        TRANSLATION_SENTENCES,
        SCENE_LABELS,
    }), [
        shared,
        chat,
        design,
        customize,
        build,
        dashboard,
        MODULE_LIST,
        LAYOUT_GROUPS,
        designLanguages,
        BUILD_PIPELINE,
        dashboardTabs,
        CHART_MONTH_LABELS,
        TRANSLATION_LANGS,
        TRANSLATION_SENTENCES,
        SCENE_LABELS,
    ]);
    const [scene, setScene] = useState(0);
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);
    const [manualPaused, setManualPaused] = useState(false);
    const [isMobileViewport, setIsMobileViewport] = useState(false);
    const pausedRef = useRef(false);
    const manualPausedRef = useRef(false);
    const rafRef = useRef(null);
    const demoRootRef = useRef(null);
    useEffect(() => { pausedRef.current = paused; }, [paused]);
    useEffect(() => { manualPausedRef.current = manualPaused; }, [manualPaused]);
    useEffect(() => { onPauseChange?.(paused); }, [paused, onPauseChange]);
    useEffect(() => { onProgressChange?.(progress); }, [progress, onProgressChange]);
    // Per-scene "reached end" thresholds — chat/design/customize finish earlier
    // in their animation than build/dashboard, so they need a lower threshold.
    const SCENE_REACHED_END_THRESHOLD = [80, 50, 60, 85, 85]; // indexed by SCENE_ORDER
    const sceneReachedEndFiredRef = useRef(false);
    useEffect(() => { sceneReachedEndFiredRef.current = false; }, [scene]);
    useEffect(() => {
        const threshold = SCENE_REACHED_END_THRESHOLD[scene] ?? 70;
        if (progress >= threshold && !sceneReachedEndFiredRef.current) {
            sceneReachedEndFiredRef.current = true;
            onSceneReachedEnd?.(scene);
        }
    }, [progress, scene, onSceneReachedEnd]);
    useEffect(() => {
        const updateViewport = () => setIsMobileViewport(window.innerWidth < 1024);
        updateViewport();
        window.addEventListener("resize", updateViewport, { passive: true });
        return () => window.removeEventListener("resize", updateViewport);
    }, []);
    // Mobile-only: pause when scrolled away, play when scrolled into view
    useEffect(() => {
        if (window.innerWidth >= 1024)
            return; // desktop: always playing
        const el = demoRootRef.current;
        if (!el)
            return;
        // Start paused — will unpause once demo enters viewport
        pausedRef.current = true;
        setPaused(true);
        const observer = new IntersectionObserver(([entry]) => {
            const visible = entry.isIntersecting && entry.intersectionRatio >= 0.78;
            pausedRef.current = !visible;
            setPaused(!visible);
        }, { threshold: [0, 0.25, 0.5, 0.68, 0.85, 1] });
        observer.observe(el);
        return () => observer.disconnect();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    // Chat state (persistent across scenes)
    const [chatItems, setChatItems] = useState([]);
    const [chatTyping, setChatTyping] = useState(null);
    const [chatMode, setChatMode] = useState("full");
    const [chatGrowStep, setChatGrowStep] = useState(0);
    const [sidebarMsgs, setSidebarMsgs] = useState([]);
    const [chatFastForward, setChatFastForward] = useState(false);
    const [chatLatestFromPopup, setChatLatestFromPopup] = useState(false);
    const [chatFloatingTitleKey, setChatFloatingTitleKey] = useState(null);
    const [designFloatingTitle, setDesignFloatingTitle] = useState(false);
    const [customizeFloatingTitle, setCustomizeFloatingTitle] = useState(false);
    const [buildFloatingTitle, setBuildFloatingTitle] = useState(false);
    // Incremented on every goToScene(0) so the chat useEffect re-fires even when scene is already 0
    const [chatRunKey, setChatRunKey] = useState(0);
    // ── Boot intro (prologue + curtain) — plays once on first mount only ────────
    const bootPlayedRef = useRef(false);
    const [introPhase, setIntroPhase] = useState("prologue");
    // -1 = photo+lead visible immediately (static), 0+ = phrases auto-play after trigger
    const [introPrologueIndex, setIntroPrologueIndex] = useState(() => scrollDrivenPrologue ? -1 : 0);
    // Set to true after 3rd scroll advance (index = 0) to trigger auto-play for the rest
    const [hybridAutoPlayGo, setHybridAutoPlayGo] = useState(false);
    const [showIntroOverlay, setShowIntroOverlay] = useState(true);
    const INTRO_PROLOGUE_PHRASES = shared.introProloguePhrases;
    // Slight prologue speed multiplier (nudged by mobile scroll while locked).
    const prologueSpeedRef = useRef(1);
    // Listen for external prologue speed-up signal (emitted by parent on down-scroll while locked).
    useEffect(() => {
        const onFF = () => {
            // Keep this subtle on purpose: almost unnoticeable acceleration.
            prologueSpeedRef.current = Math.min(1.1, prologueSpeedRef.current + 0.03);
        };
        window.addEventListener("admino:prologue-fastforward", onFF);
        return () => window.removeEventListener("admino:prologue-fastforward", onFF);
    }, []);
    // Drive the intro once, but keep it pausable so mobile viewport visibility
    // also pauses/resumes the prologue (same behavior as the scene timeline).
    useEffect(() => {
        if (bootPlayedRef.current)
            return;
        if (scrollDrivenPrologue)
            return; // scroll-driven: parent dispatches admino:prologue-advance
        let cancelled = false;
        const cancelledRef = { current: false };
        const baseSleep = makePausableSleep(pausedRef, cancelledRef);
        // Respects pause, with only a very small optional speed-up from scroll.
        const sleep = (ms) => baseSleep(Math.max(220, Math.round(ms / prologueSpeedRef.current)));
        (async () => {
            for (let i = 0; i < INTRO_PROLOGUE_PHRASES.length; i++) {
                if (cancelled)
                    return;
                setIntroPrologueIndex(i);
                await sleep(i === INTRO_PROLOGUE_PHRASES.length - 1 ? 1900 : 1550);
            }
            if (cancelled)
                return;
            setIntroPhase("opening");
            await baseSleep(900); // matches curtain transition (~0.86s)
            if (cancelled)
                return;
            setIntroPhase("done");
            bootPlayedRef.current = true;
            window.dispatchEvent(new CustomEvent("admino:intro-complete"));
            await baseSleep(760);
            if (cancelled)
                return;
            setShowIntroOverlay(false);
        })();
        return () => {
            cancelled = true;
            cancelledRef.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // skipIntro: when prop becomes true, immediately dismiss the intro (no remount needed)
    useEffect(() => {
        if (!skipIntro)
            return;
        if (bootPlayedRef.current)
            return;
        bootPlayedRef.current = true;
        setIntroPrologueIndex(0);
        setIntroPhase("done");
        setShowIntroOverlay(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skipIntro]);
    // Scroll-driven prologue: each admino:prologue-advance event reveals the next element.
    // Cap at 0: only 3 scroll advances (photo → lead → Meet Hana.), then auto-play takes over.
    useEffect(() => {
        if (!scrollDrivenPrologue)
            return;
        const onAdvance = () => {
            setIntroPrologueIndex(prev => {
                const next = prev + 1;
                if (next === 0)
                    setHybridAutoPlayGo(true); // 3rd advance: hand off to auto-play
                return Math.min(next, 0);
            });
        };
        window.addEventListener("admino:prologue-advance", onAdvance);
        return () => window.removeEventListener("admino:prologue-advance", onAdvance);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollDrivenPrologue]);
    // After 3 initial elements, auto-play remaining phrases then open curtain (like desktop)
    useEffect(() => {
        if (!hybridAutoPlayGo)
            return;
        if (bootPlayedRef.current)
            return;
        let cancelled = false;
        const cancelledRef = { current: false };
        const baseSleep = makePausableSleep(pausedRef, cancelledRef);
        (async () => {
            // Wait for "Meet Hana." (index 0) animation to complete before continuing
            await baseSleep(800);
            if (cancelled)
                return;
            for (let i = 1; i < INTRO_PROLOGUE_PHRASES.length; i++) {
                if (cancelled)
                    return;
                setIntroPrologueIndex(i);
                await baseSleep(i === INTRO_PROLOGUE_PHRASES.length - 1 ? 1900 : 1550);
            }
            if (cancelled)
                return;
            setIntroPhase("opening");
            window.dispatchEvent(new CustomEvent("admino:curtain-opening"));
            await baseSleep(900);
            if (cancelled)
                return;
            setIntroPhase("done");
            bootPlayedRef.current = true;
            window.dispatchEvent(new CustomEvent("admino:intro-complete"));
            await baseSleep(760);
            if (cancelled)
                return;
            setShowIntroOverlay(false);
        })();
        return () => { cancelled = true; cancelledRef.current = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hybridAutoPlayGo]);
    // Design state
    const [expandedLayout, setExpandedLayout] = useState(-1);
    const [selectedDesign, setSelectedDesign] = useState(-1);
    // Input bar state
    const [inputActive, setInputActive] = useState(false);
    const [inputText, setInputText] = useState("");
    const [chatInputFocusFx, setChatInputFocusFx] = useState(false);
    // Cursor for chat/design scenes
    const [cursorPos, setCursorPos] = useState(null);
    const [clickPulse, setClickPulse] = useState(null);
    // Design popup state
    const [designPopup, setDesignPopup] = useState(null);
    // Customize scene state
    const [customView, setCustomView] = useState("grid");
    const [customFont, setCustomFont] = useState(0);
    const [customRadius, setCustomRadius] = useState(0);
    const [customizeContentVisible, setCustomizeContentVisible] = useState(false);
    const [buildContentVisible, setBuildContentVisible] = useState(false);
    const [customBounceRadius, setCustomBounceRadius] = useState(false);
    const [customScrollToRadius, setCustomScrollToRadius] = useState(false);
    const [aiActionActive, setAiActionActive] = useState(false);
    const [aiActionDone, setAiActionDone] = useState(false);
    // Build complete state
    const [buildCompleted, setBuildCompleted] = useState(false);
    const [dashboardFinale, setDashboardFinale] = useState(false);
    const onDashboardFlowComplete = useCallback(() => setDashboardFinale(true), []);
    const goToScene = useCallback((idx) => {
        setScene(idx);
        onSceneChange?.(idx);
        setProgress(0);
        setDashboardFinale(false);
        setDesignPopup(null);
        setBuildCompleted(false);
        setCustomizeContentVisible(false);
        setBuildContentVisible(false);
        // Always reset transient chat/input/cursor artifacts between scenes.
        setChatTyping(null);
        setSidebarMsgs([]);
        setInputActive(false);
        setInputText("");
        setChatInputFocusFx(false);
        setChatLatestFromPopup(false);
        setChatFloatingTitleKey(null);
        setDesignFloatingTitle(false);
        setCustomizeFloatingTitle(false);
        setBuildFloatingTitle(false);
        setCursorPos(null);
        setCustomScrollToRadius(false);
        setCustomBounceRadius(false);
        setAiActionActive(false);
        setAiActionDone(false);
        if (idx === 0) {
            setChatItems([]);
            setChatTyping(null);
            setChatMode("full");
            setChatGrowStep(0);
            setChatFastForward(false);
            setSidebarMsgs([]);
            setExpandedLayout(-1);
            setSelectedDesign(-1);
            setCustomView("grid");
            setCustomFont(0);
            setCustomRadius(0);
            setCustomizeContentVisible(false);
            setBuildContentVisible(false);
            setCustomBounceRadius(false);
            setCustomScrollToRadius(false);
            setAiActionActive(false);
            setAiActionDone(false);
            setCursorPos(null);
            setInputActive(false);
            setInputText("");
            setChatInputFocusFx(false);
            // Force chat useEffect to re-run even if scene is already 0
            setChatRunKey((k) => k + 1);
        }
    }, [onSceneChange]);
    useImperativeHandle(ref, () => ({
        goToScene,
        scene,
        paused,
        togglePause: () => {
            setPaused((p) => {
                const next = !p;
                setManualPaused(next);
                return next;
            });
        },
    }), [goToScene, scene, paused]);
    // Scene auto-advance (pausable). Dashboard is the last scene — no wrap to chat.
    useEffect(() => {
        const isLastScene = scene === SCENE_ORDER.length - 1;
        const duration = SCENE_DURATIONS[scene];
        let totalElapsed = 0;
        let segmentStart = Date.now();
        let wasPaused = false;
        function tick() {
            if (isLastScene && dashboardFinale) {
                setProgress(100);
                return;
            }
            if (pausedRef.current) {
                if (!wasPaused) {
                    totalElapsed += Date.now() - segmentStart;
                    wasPaused = true;
                }
                rafRef.current = requestAnimationFrame(tick);
                return;
            }
            if (wasPaused) {
                segmentStart = Date.now();
                wasPaused = false;
            }
            const elapsed = totalElapsed + (Date.now() - segmentStart);
            const pct = Math.min((elapsed / duration) * 100, 100);
            setProgress(pct);
            if (pct < 100)
                rafRef.current = requestAnimationFrame(tick);
        }
        rafRef.current = requestAnimationFrame(tick);
        const cancelledRef = { current: false };
        const sleep = makePausableSleep(pausedRef, cancelledRef);
        if (!isLastScene) {
            sleep(duration).then(() => {
                if (cancelledRef.current)
                    return;
                setScene((s) => s + 1);
                setProgress(0);
            });
        }
        return () => {
            cancelledRef.current = true;
            if (rafRef.current)
                cancelAnimationFrame(rafRef.current);
        };
        // chatRunKey: replay / goToScene(0) while already on chat must reset the
        // progress RAF (scene stays 0, so without this the old loop overwrites setProgress(0)).
    }, [scene, dashboardFinale, chatRunKey]);
    // ── Scene orchestrators ─────────────────────────────────────────────────────
    let pulseKeyRef = useRef(0);
    const fireClick = (x, y) => {
        pulseKeyRef.current += 1;
        setClickPulse({ x, y, key: pulseKeyRef.current });
    };
    const chatContainerRef = useRef(null);
    // Scene 0: Chat + Modules orchestrator (push/pull, blur, logo upload)
    // chatRunKey ensures this re-fires when goToScene(0) is called while already on scene 0
    useEffect(() => {
        if (scene !== 0)
            return;
        let cancelled = false;
        const cancelledRef = { current: false };
        const titleTimers = [];
        const sleep = makePausableSleep(pausedRef, cancelledRef);
        const addMsg = (role, text) => setChatItems((p) => [...p, { kind: "message", role, text }]);
        const typeInInput = async (text, speed = 35) => {
            for (let c = 1; c <= text.length; c++) {
                if (cancelled)
                    return;
                setInputText(text.slice(0, c));
                await sleep(speed);
            }
        };
        const getInputPos = () => {
            if (!chatContainerRef.current)
                return null;
            const container = chatContainerRef.current;
            const rect = container.getBoundingClientRect();
            const parentRect = container.closest("[data-demo-root]")?.getBoundingClientRect();
            if (!parentRect)
                return { x: rect.width / 2, y: rect.height - 30 };
            return { x: rect.left - parentRect.left + rect.width / 2, y: rect.top - parentRect.top + rect.height - 30 };
        };
        const getDemoElementPos = (dataId) => {
            const root = demoRootRef.current;
            if (!root)
                return null;
            const el = root.querySelector(`[data-demo-id="${dataId}"]`);
            if (!el)
                return null;
            const rect = el.getBoundingClientRect();
            const parentRect = root.getBoundingClientRect();
            return {
                x: rect.left - parentRect.left + rect.width / 2,
                y: rect.top - parentRect.top + rect.height / 2 - 40,
            };
        };
        async function run() {
            setChatMode("full");
            setChatGrowStep(2);
            setCursorPos(null);
            setInputActive(false);
            setInputText("");
            setChatFloatingTitleKey(null);
            // Wait for the first-mount boot intro (prologue + curtain) to complete.
            // Intro itself is driven by a separate effect that ignores pause state.
            if (!bootPlayedRef.current) {
                await new Promise((resolve) => {
                    const onDone = () => {
                        window.removeEventListener("admino:intro-complete", onDone);
                        window.clearInterval(poll);
                        resolve();
                    };
                    const poll = window.setInterval(() => {
                        if (bootPlayedRef.current)
                            onDone();
                    }, 80);
                    window.addEventListener("admino:intro-complete", onDone);
                });
                if (cancelled)
                    return;
            }
            // Floating intro title — play out before chat animation starts.
            // Use pausable sleep (not setTimeout) so on mobile, when the demo is out of view,
            // the title stays visible until the user scrolls in and playback resumes.
            if (cancelled)
                return;
            setChatFloatingTitleKey("intro");
            await sleep(1700);
            if (cancelled)
                return;
            setChatFloatingTitleKey((current) => (current === "intro" ? null : current));
            await sleep(400);
            if (cancelled)
                return;
            // Convenience alias for the conversation text array
            const C = chat.conversation;
            // ── EXCHANGE 1 (slow, full typing) ──────────────────────────────────────
            // AI msg 1 — renders as the intro blur is fading out (overlaps exit ~0.42s)
            setChatItems([{ kind: "message", role: "ai", text: C[0] }]);
            await sleep(380);
            if (cancelled)
                return;
            const inputPos = getDemoElementPos("chat-input");
            // Appear slightly upper-left, then immediately glide to input
            if (inputPos)
                setCursorPos({ x: 32, y: inputPos.y - 28 });
            await sleep(50); // just long enough for mount frame
            if (cancelled)
                return;
            if (inputPos)
                setCursorPos(inputPos);
            await sleep(420);
            if (cancelled)
                return;
            if (inputPos)
                fireClick(inputPos.x, inputPos.y);
            setCursorPos(null); // hide cursor as popup opens
            setInputActive(true);
            setChatInputFocusFx(true);
            await sleep(300);
            if (cancelled)
                return;
            const userMsg1 = C[1];
            await typeInInput(userMsg1, 16);
            await sleep(350);
            if (cancelled)
                return;
            setChatInputFocusFx(false);
            await sleep(180);
            if (cancelled)
                return;
            setInputText("");
            setInputActive(false);
            setCursorPos(null);
            setChatLatestFromPopup(true);
            addMsg("user", userMsg1);
            setChatGrowStep(3);
            await sleep(240);
            // AI msg 2 — strong niche
            if (cancelled)
                return;
            setChatLatestFromPopup(false);
            setChatTyping("ai");
            await sleep(120);
            if (cancelled)
                return;
            setChatTyping(null);
            addMsg("ai", C[2]);
            await sleep(220);
            // AI msg 3 — launch question
            if (cancelled)
                return;
            setChatTyping("ai");
            await sleep(90);
            if (cancelled)
                return;
            setChatTyping(null);
            addMsg("ai", C[3]);
            await sleep(220);
            // ── EXCHANGE 2 (direct user bubble; no input typing animation) ─────────
            if (cancelled)
                return;
            await sleep(200);
            addMsg("user", C[4]);
            await sleep(500);
            // AI msg 4 — smart move  ← 3rd thematic AI reply; FF starts after this
            if (cancelled)
                return;
            setChatTyping("ai");
            await sleep(680);
            if (cancelled)
                return;
            setChatTyping(null);
            addMsg("ai", C[5]);
            // Floating fast-forward title — trigger early so blur clears before modules title.
            // Hide via pausable sleep so mobile users who scroll in mid-demo still see it.
            if (cancelled)
                return;
            setChatFloatingTitleKey("fastforward");
            (async () => {
                await sleep(1700);
                if (cancelled)
                    return;
                setChatFloatingTitleKey((current) => (current === "fastforward" ? null : current));
            })();
            await sleep(420);
            // ── FAST FORWARD starts ──────────────────────────────────────────────────
            if (cancelled)
                return;
            setChatFastForward(true);
            await sleep(110);
            // AI msg 5 — monetize paths card
            if (cancelled)
                return;
            setChatTyping("ai");
            await sleep(95);
            if (cancelled)
                return;
            setChatTyping(null);
            setChatItems((p) => [...p, { kind: "monetizePaths" }]);
            await sleep(120);
            // User msg 3
            if (cancelled)
                return;
            addMsg("user", C[6]);
            await sleep(120);
            // AI msg 6 — subscription reasoning
            if (cancelled)
                return;
            setChatTyping("ai");
            await sleep(95);
            if (cancelled)
                return;
            setChatTyping(null);
            addMsg("ai", C[7]);
            await sleep(120);
            // User msg 4
            if (cancelled)
                return;
            addMsg("user", C[8]);
            await sleep(120);
            // AI msg 7 — plan recommendation
            if (cancelled)
                return;
            setChatTyping("ai");
            await sleep(90);
            if (cancelled)
                return;
            setChatTyping(null);
            addMsg("ai", C[9]);
            await sleep(110);
            // User msg 5
            if (cancelled)
                return;
            addMsg("user", C[10]);
            await sleep(120);
            // AI msg 8 — two jobs
            if (cancelled)
                return;
            setChatTyping("ai");
            await sleep(95);
            if (cancelled)
                return;
            setChatTyping(null);
            addMsg("ai", C[11]);
            await sleep(120);
            // User msg 6
            if (cancelled)
                return;
            addMsg("user", C[12]);
            await sleep(120);
            // AI msg 9 — brand name question
            if (cancelled)
                return;
            setChatTyping("ai");
            await sleep(90);
            if (cancelled)
                return;
            setChatTyping(null);
            addMsg("ai", C[13]);
            await sleep(110);
            // User msg 7
            if (cancelled)
                return;
            addMsg("user", C[14]);
            await sleep(120);
            // AI msg 10 — strong name + growth target question
            if (cancelled)
                return;
            setChatTyping("ai");
            await sleep(95);
            if (cancelled)
                return;
            setChatTyping(null);
            addMsg("ai", C[15]);
            await sleep(120);
            // User msg 8
            if (cancelled)
                return;
            addMsg("user", C[16]);
            await sleep(120);
            // AI msg 11 — realistic response
            if (cancelled)
                return;
            setChatTyping("ai");
            await sleep(95);
            if (cancelled)
                return;
            setChatTyping(null);
            addMsg("ai", C[17]);
            await sleep(120);
            // ── FAST FORWARD ends ────────────────────────────────────────────────────
            if (cancelled)
                return;
            setChatFastForward(false);
            // Breathing gap so the FF blur fully dissipates before the modules title fades in
            await sleep(650);
            // Floating modules title — plays out before the module grid arrives.
            // Pausable sleep: if the user scrolls away, the title remains until they return.
            if (cancelled)
                return;
            setChatFloatingTitleKey("modules");
            await sleep(1700);
            if (cancelled)
                return;
            setChatFloatingTitleKey((current) => (current === "modules" ? null : current));
            await sleep(500);
            // AI msg 12 — module intro
            if (cancelled)
                return;
            addMsg("ai", C[18]);
            await sleep(400);
            // Module grid — arrives right after the title blur has cleared
            if (cancelled)
                return;
            setChatItems((p) => [...p, { kind: "modules", selected: new Set([0, 1, 2, 3, 4, 5, 6, 7]), declined: new Set(), bouncing: new Set() }]);
            await sleep(800);
            // User msg: direct bubble (no input typing animation)
            if (cancelled)
                return;
            await sleep(180);
            addMsg("user", C[19]);
            await sleep(320);
            // ── Bounce Community card ───────────────────────────────────────────────
            // Helper: find modules item searching backwards (user msg is now last)
            const patchModules = (p, patch) => {
                for (let i = p.length - 1; i >= 0; i--) {
                    if (p[i].kind === "modules") {
                        const arr = [...p];
                        arr[i] = patch(p[i]);
                        return arr;
                    }
                }
                return p;
            };
            // Step 1: card goes UP — still green (bouncing=true, selected unchanged)
            if (cancelled)
                return;
            setChatItems((p) => patchModules(p, (m) => ({ ...m, bouncing: new Set([DECLINED_MODULE]) })));
            await sleep(240); // wait for peak
            // Step 2: at peak — switch to declined while keeping bouncing=true
            // animate prop stays the same → Framer Motion doesn't restart the animation
            // CSS transition-colors fires: green → red while card descends
            if (cancelled)
                return;
            setChatItems((p) => patchModules(p, (m) => {
                const newSel = new Set(m.selected);
                newSel.delete(DECLINED_MODULE);
                return { ...m, selected: newSel, declined: new Set([DECLINED_MODULE]) };
                // bouncing stays true — animation continues uninterrupted
            }));
            await sleep(400); // wait for descent + color transition to finish
            // Step 3: clear bouncing after animation completes (~640ms total > 550ms anim)
            if (cancelled)
                return;
            setChatItems((p) => patchModules(p, (m) => ({ ...m, bouncing: new Set() })));
            await sleep(300); // brief pause before AI responds
            // AI msg 13 — Community warning
            if (cancelled)
                return;
            setCursorPos(null);
            setChatTyping("ai");
            await sleep(560);
            if (cancelled)
                return;
            setChatTyping(null);
            addMsg("ai", C[20]);
            await sleep(900);
            // User msg 9
            if (cancelled)
                return;
            await sleep(180);
            addMsg("user", C[21]);
            await sleep(500);
            // AI msg 14 — got it
            if (cancelled)
                return;
            setChatTyping("ai");
            await sleep(420);
            if (cancelled)
                return;
            setChatTyping(null);
            addMsg("ai", C[22]);
            await sleep(600);
            // AI msg 15 — logo question
            if (cancelled)
                return;
            setChatTyping("ai");
            await sleep(380);
            if (cancelled)
                return;
            setChatTyping(null);
            addMsg("ai", C[23]);
            await sleep(450);
            // User msg 10
            if (cancelled)
                return;
            await sleep(180);
            addMsg("user", C[24]);
            await sleep(400);
            // AI msg 16 — upload request
            if (cancelled)
                return;
            setChatTyping("ai");
            await sleep(360);
            if (cancelled)
                return;
            setChatTyping(null);
            addMsg("ai", C[25]);
            // Floating logo-upload title — overlay, chat flow continues.
            // Pausable sleep so mobile scroll-in users still see the title fully.
            if (cancelled)
                return;
            setChatFloatingTitleKey("logo");
            (async () => {
                await sleep(1700);
                if (cancelled)
                    return;
                setChatFloatingTitleKey((current) => (current === "logo" ? null : current));
            })();
            await sleep(400);
            // Logo upload animation
            if (cancelled)
                return;
            setChatItems((p) => [...p, { kind: "logoUpload", progress: 0, done: false }]);
            await sleep(350);
            for (let pct = 8; pct <= 100; pct += 8) {
                if (cancelled)
                    return;
                await sleep(100);
                setChatItems((p) => {
                    const last = p[p.length - 1];
                    if (last?.kind === "logoUpload")
                        return [...p.slice(0, -1), { ...last, progress: Math.min(pct, 100) }];
                    return p;
                });
            }
            await sleep(300);
            if (cancelled)
                return;
            setChatItems((p) => {
                const last = p[p.length - 1];
                if (last?.kind === "logoUpload")
                    return [...p.slice(0, -1), { ...last, progress: 100, done: true }];
                return p;
            });
            await sleep(500);
            // AI msg 17 — logo received
            if (cancelled)
                return;
            setChatTyping("ai");
            await sleep(380);
            if (cancelled)
                return;
            setChatTyping(null);
            addMsg("ai", C[26]);
            await sleep(900);
            // AI msg 18 — brand analysis
            if (cancelled)
                return;
            setChatTyping("ai");
            await sleep(900);
            if (cancelled)
                return;
            setChatTyping(null);
            addMsg("ai", C[27]);
            await sleep(800);
            // User msg 11
            if (cancelled)
                return;
            await sleep(200);
            addMsg("user", C[28]);
            await sleep(500);
            // AI msg 19 — final
            if (cancelled)
                return;
            setChatTyping("ai");
            await sleep(760);
            if (cancelled)
                return;
            setChatTyping(null);
            addMsg("ai", C[29]);
            await sleep(1200);
            // Transition to design scene — goToScene handles setChatMode("sidebar") itself
            if (cancelled)
                return;
            goToScene(1);
        }
        run();
        return () => {
            cancelled = true;
            cancelledRef.current = true;
            titleTimers.forEach((id) => window.clearTimeout(id));
        };
    }, [scene, chatRunKey, goToScene]); // chatRunKey re-fires the effect when replaying from scene 0
    // Scene 1: Design orchestrator
    useEffect(() => {
        if (scene !== 1)
            return;
        let cancelled = false;
        const cancelledRef = { current: false };
        const sleep = makePausableSleep(pausedRef, cancelledRef);
        const getDemoElementPos = (dataId) => {
            const root = demoRootRef.current;
            if (!root)
                return null;
            const el = root.querySelector(`[data-demo-id="${dataId}"]`);
            if (!el)
                return null;
            const rect = el.getBoundingClientRect();
            const parentRect = root.getBoundingClientRect();
            return {
                x: rect.left - parentRect.left + rect.width / 2,
                y: rect.top - parentRect.top + rect.height / 2 - 40,
            };
        };
        async function run() {
            setChatMode("sidebar");
            setSidebarMsgs([]);
            setExpandedLayout(-1);
            setSelectedDesign(-1);
            setDesignPopup(null);
            setCursorPos(null);
            setDesignFloatingTitle(false);
            // Floating title — runs in parallel, animation continues immediately
            setDesignFloatingTitle(true);
            (async () => {
                await sleep(1700);
                if (cancelled)
                    return;
                setDesignFloatingTitle(false);
            })();
            if (cancelled)
                return;
            setSidebarMsgs([{ role: "ai", text: design.sidebarMessages[0] }]);
            await sleep(800);
            // Wander: Layout 1 Minimal → Layout 2 Editorial → Layout 3 Brutalist
            if (cancelled)
                return;
            const posL1 = getDemoElementPos("design-card-0-0"); // Layout 1, Minimal
            if (posL1)
                setCursorPos(posL1);
            await sleep(850);
            if (cancelled)
                return;
            const posL2 = getDemoElementPos("design-card-1-1"); // Layout 2, Editorial
            if (posL2)
                setCursorPos(posL2);
            await sleep(850);
            if (cancelled)
                return;
            const posL3 = getDemoElementPos("design-card-2-1"); // Layout 3, Brutalist
            if (posL3)
                setCursorPos(posL3);
            await sleep(850);
            if (cancelled)
                return;
            // Click Layout 3 "Explore all"
            const posExplore2 = getDemoElementPos("design-explore-2");
            if (posExplore2)
                setCursorPos(posExplore2);
            await sleep(700);
            if (cancelled)
                return;
            if (posExplore2)
                fireClick(posExplore2.x, posExplore2.y);
            setDesignPopup(2);
            await sleep(1000);
            if (cancelled)
                return;
            setSidebarMsgs((p) => [...p, { role: "ai", text: design.sidebarMessages[1] }]);
            await sleep(600);
            // Move cursor to Organic option (index 2) in the popup
            if (cancelled)
                return;
            const posOrganic = getDemoElementPos("design-popup-option-2");
            if (posOrganic)
                setCursorPos(posOrganic);
            await sleep(700);
            if (cancelled)
                return;
            if (posOrganic)
                fireClick(posOrganic.x, posOrganic.y);
            setSelectedDesign(2); // Organic
            await sleep(500);
            if (cancelled)
                return;
            setSidebarMsgs((p) => [...p, { role: "ai", text: design.sidebarMessages[2] }]);
            await sleep(700);
            // Seçim yapıldı — direkt customize'a geç, popup kapanır
            if (cancelled)
                return;
            setDesignPopup(null);
            setCursorPos(null);
            await sleep(200);
            goToScene(2);
        }
        run();
        return () => { cancelled = true; cancelledRef.current = true; };
    }, [scene]);
    // Scene 2: Customize — Playground-like layout with bottom chat bar + AI action
    useEffect(() => {
        if (scene !== 2)
            return;
        let cancelled = false;
        const cancelledRef = { current: false };
        const sleep = makePausableSleep(pausedRef, cancelledRef);
        const getDemoElementPos = (dataId) => {
            const root = demoRootRef.current;
            if (!root)
                return null;
            const el = root.querySelector(`[data-demo-id="${dataId}"]`);
            if (!el)
                return null;
            const rect = el.getBoundingClientRect();
            const parentRect = root.getBoundingClientRect();
            return {
                x: rect.left - parentRect.left + rect.width / 2,
                y: rect.top - parentRect.top + rect.height / 2 - 40,
            };
        };
        const getDemoElementPosWithScroll = async (dataId, opts) => {
            const findScrollableParentWithinDemo = (el, root) => {
                let cur = el.parentElement;
                while (cur && cur !== root) {
                    const style = window.getComputedStyle(cur);
                    const canScrollY = (style.overflowY === "auto" || style.overflowY === "scroll");
                    if (canScrollY && cur.scrollHeight > cur.clientHeight + 4)
                        return cur;
                    cur = cur.parentElement;
                }
                return null;
            };
            const block = opts?.block ?? "center";
            const retries = opts?.retries ?? 4;
            const waitMs = opts?.waitMs ?? 260;
            for (let i = 0; i < retries; i++) {
                if (cancelled)
                    return null;
                const root = demoRootRef.current;
                if (!root)
                    return null;
                const el = root.querySelector(`[data-demo-id="${dataId}"]`);
                if (!el) {
                    await sleep(100);
                    continue;
                }
                // Re-align only the demo's internal scroll container.
                const scrollParent = findScrollableParentWithinDemo(el, root);
                if (scrollParent) {
                    const parentRect = scrollParent.getBoundingClientRect();
                    const elRect = el.getBoundingClientRect();
                    let targetTop = scrollParent.scrollTop;
                    if (block === "start") {
                        targetTop += elRect.top - parentRect.top - 16;
                    }
                    else if (block === "end") {
                        targetTop += elRect.bottom - parentRect.bottom + 16;
                    }
                    else {
                        targetTop += (elRect.top - parentRect.top) - (parentRect.height - elRect.height) / 2;
                    }
                    const maxTop = Math.max(0, scrollParent.scrollHeight - scrollParent.clientHeight);
                    scrollParent.scrollTo({ top: Math.max(0, Math.min(maxTop, targetTop)), behavior: "smooth" });
                }
                await sleep(waitMs);
                if (cancelled)
                    return null;
                const pos = getDemoElementPos(dataId);
                if (pos)
                    return pos;
            }
            return null;
        };
        const typeInInput = async (text, speed = 38) => {
            for (let c = 1; c <= text.length; c++) {
                if (cancelled)
                    return;
                setInputText(text.slice(0, c));
                await sleep(speed);
            }
        };
        async function run() {
            // 1. Transition chat to bottom bar
            setCustomizeContentVisible(false);
            setCustomizeFloatingTitle(false);
            setChatMode("bottom");
            setCustomFont(0);
            setCustomRadius(0);
            setCustomBounceRadius(false);
            setCustomScrollToRadius(false);
            setAiActionActive(false);
            setAiActionDone(false);
            setCursorPos(null);
            setSidebarMsgs([{ role: "ai", text: customize.conversation[0] }]);
            // Floating title — parallel, doesn't block
            setCustomizeFloatingTitle(true);
            (async () => {
                await sleep(1700);
                if (cancelled)
                    return;
                setCustomizeFloatingTitle(false);
            })();
            await sleep(180);
            if (cancelled)
                return;
            setCustomizeContentVisible(true);
            // Wait until left-panel entrance settles, then measure font coordinates once.
            await sleep(920);
            if (cancelled)
                return;
            // 2. Cursor → Font Family section, start directly with Space Grotesk
            const posFont2 = await getDemoElementPosWithScroll("pg-font-2", { block: "center", waitMs: 280 }); // Space Grotesk
            if (posFont2)
                setCursorPos(posFont2);
            await sleep(800);
            if (cancelled)
                return;
            const posFont2Click = getDemoElementPos("pg-font-2");
            if (posFont2Click)
                fireClick(posFont2Click.x, posFont2Click.y);
            setCustomFont(2);
            await sleep(620);
            if (cancelled)
                return;
            const posFont3 = await getDemoElementPosWithScroll("pg-font-3", { block: "center", waitMs: 260 }); // Bebas Neue
            if (posFont3)
                setCursorPos(posFont3);
            await sleep(500);
            if (cancelled)
                return;
            const posFont3Click = getDemoElementPos("pg-font-3");
            if (posFont3Click)
                fireClick(posFont3Click.x, posFont3Click.y);
            setCustomFont(3);
            await sleep(600);
            if (cancelled)
                return;
            const posFont4 = await getDemoElementPosWithScroll("pg-font-4", { block: "center", waitMs: 260 }); // Oswald
            if (posFont4)
                setCursorPos(posFont4);
            await sleep(480);
            if (cancelled)
                return;
            const posFont4Click = getDemoElementPos("pg-font-4");
            if (posFont4Click)
                fireClick(posFont4Click.x, posFont4Click.y);
            setCustomFont(4);
            await sleep(560);
            if (cancelled)
                return;
            // Final choice: Space Grotesk (index 2)
            const posFont2Return = await getDemoElementPosWithScroll("pg-font-2", { block: "center", waitMs: 240 });
            if (posFont2Return)
                setCursorPos(posFont2Return);
            await sleep(520);
            if (cancelled)
                return;
            const posFont2ReturnClick = getDemoElementPos("pg-font-2");
            if (posFont2ReturnClick)
                fireClick(posFont2ReturnClick.x, posFont2ReturnClick.y);
            setCustomFont(2);
            await sleep(880);
            if (cancelled)
                return;
            // 3. Move cursor to bottom chat input
            const chatInputPos = getDemoElementPos("chat-input");
            if (chatInputPos)
                setCursorPos(chatInputPos);
            await sleep(740);
            if (cancelled)
                return;
            if (chatInputPos)
                fireClick(chatInputPos.x, chatInputPos.y);
            setInputActive(true);
            await sleep(300);
            // 4. Type user message
            const userMsg = customize.conversation[1];
            await typeInInput(userMsg, 38);
            await sleep(400);
            if (cancelled)
                return;
            // Send
            setInputText("");
            setInputActive(false);
            setCursorPos(null);
            setSidebarMsgs((p) => [...p, { role: "user", text: userMsg }]);
            setAiActionActive(true);
            setAiActionDone(false);
            await sleep(440);
            if (cancelled)
                return;
            // 5. AI responds with action bubble
            setSidebarMsgs((p) => [
                ...p,
                { role: "ai", text: customize.conversation[2], isAction: true },
            ]);
            await sleep(950);
            if (cancelled)
                return;
            // 6. AI auto-scrolls left panel to Border Radius section (no cursor)
            setCustomScrollToRadius(true);
            await sleep(950);
            if (cancelled)
                return;
            // 7. Bounce the radius section + apply change
            setCustomBounceRadius(true);
            setCustomRadius(20);
            await sleep(1650);
            if (cancelled)
                return;
            setCustomBounceRadius(false);
            setSidebarMsgs((p) => [...p, { role: "ai", text: customize.conversation[3] }]);
            setAiActionDone(true);
            await sleep(900);
            if (cancelled)
                return;
            setAiActionActive(false);
            setAiActionDone(false);
            await sleep(520);
            if (cancelled)
                return;
            setSidebarMsgs((p) => [...p, { role: "user", text: customize.conversation[4] }]);
            // Keep latest customize decisions consistent for Build > Your selections.
            setCustomRadius((prev) => prev > 0 ? prev : 20);
            await sleep(1200);
            if (cancelled)
                return;
            // 9. Transition to build
            goToScene(3);
        }
        run();
        return () => { cancelled = true; cancelledRef.current = true; };
    }, [scene, goToScene]);
    // Scene 3: Build onComplete — cursor clicks the dashboard button
    const handleBuildComplete = useCallback(() => {
        setBuildCompleted(true);
        setTimeout(() => {
            const root = demoRootRef.current;
            if (!root)
                return;
            const el = root.querySelector('[data-demo-id="build-dashboard-btn"]');
            if (!el)
                return;
            const rect = el.getBoundingClientRect();
            const parentRect = root.getBoundingClientRect();
            const pos = {
                x: rect.left - parentRect.left + rect.width / 2,
                y: rect.top - parentRect.top + rect.height / 2 - 40,
            };
            setCursorPos(pos);
            setTimeout(() => {
                pulseKeyRef.current += 1;
                setClickPulse({ x: pos.x, y: pos.y, key: pulseKeyRef.current });
                setTimeout(() => goToScene(4), 400);
            }, 700);
        }, 600);
    }, [goToScene]);
    useEffect(() => {
        if (scene !== 3)
            return;
        let cancelled = false;
        const cancelledRef = { current: false };
        const sleep = makePausableSleep(pausedRef, cancelledRef);
        async function run() {
            setChatMode("sidebar");
            setBuildContentVisible(false);
            setBuildFloatingTitle(false);
            setCursorPos(null);
            setBuildCompleted(false);
            setSidebarMsgs([{ role: "ai", text: build.sidebarMessages[0] }]);
            // Floating title — parallel, doesn't block
            setBuildFloatingTitle(true);
            (async () => {
                await sleep(1700);
                if (cancelled)
                    return;
                setBuildFloatingTitle(false);
            })();
            await sleep(scaleBuildMs(160));
            if (cancelled)
                return;
            setBuildContentVisible(true);
            await sleep(scaleBuildMs(6000));
            if (cancelled)
                return;
            setSidebarMsgs((p) => [...p, { role: "ai", text: build.sidebarMessages[1] }]);
            await sleep(scaleBuildMs(6000));
            if (cancelled)
                return;
            setSidebarMsgs((p) => [...p, { role: "ai", text: build.sidebarMessages[2] }]);
        }
        run();
        return () => { cancelled = true; cancelledRef.current = true; };
    }, [scene]);
    // Scene 4: Dashboard sidebar messages — chat comes back
    useEffect(() => {
        if (scene !== 4)
            return;
        let cancelled = false;
        const cancelledRef = { current: false };
        const sleep = makePausableSleep(pausedRef, cancelledRef);
        async function run() {
            setChatMode("sidebar");
            setCursorPos(null);
            setSidebarMsgs([{ role: "ai", text: dashboard.sidebarMessages[0] }]);
            await sleep(5000);
            if (cancelled)
                return;
            setSidebarMsgs((p) => [...p, { role: "ai", text: dashboard.sidebarMessages[1] }]);
        }
        run();
        return () => { cancelled = true; cancelledRef.current = true; };
    }, [scene]);
    const currentScene = SCENE_ORDER[scene];
    const allowChatSceneScroll = currentScene === "chat";
    const hideSideChatPanel = isMobileViewport && (currentScene === "design" || currentScene === "build");
    // chatIsBottom: only in customize scene when mode is "bottom"
    const chatIsBottom = chatMode === "bottom" && currentScene === "customize";
    const mobileCustomizeCompact = isMobileViewport && currentScene === "customize";
    const bottomChatHeight = isMobileViewport ? (mobileCustomizeCompact ? 146 : 172) : (expanded ? 168 : 216);
    const bottomChatTopGap = isMobileViewport ? (mobileCustomizeCompact ? 8 : 42) : (expanded ? 28 : 56);
    const leftBottomReserve = bottomChatHeight + bottomChatTopGap + 2;
    const bottomChatWidth = isMobileViewport ? "calc(100% - 24px)" : "calc(100% - 80px)";
    const mobileCustomizeSceneHeight = `min(calc(100% - ${leftBottomReserve}px), clamp(300px, 46svh, 376px))`;
    const mobileCustomizeChatTop = `calc(${mobileCustomizeSceneHeight} + ${bottomChatTopGap}px)`;
    // Dashboard has its own internal AI chat — no sidebar chat panel needed there
    const showChat = (currentScene === "chat" || currentScene === "design" || currentScene === "customize" || currentScene === "build") && !hideSideChatPanel;
    const chatIsSidebar = chatMode === "sidebar" && currentScene !== "chat" && !hideSideChatPanel;
    // Keep scene containers stable during chat morph transitions.
    const leftPanelUsesSidebarWidth = (currentScene === "design" || currentScene === "build") && !hideSideChatPanel;
    const leftPanelUsesBottomReserve = currentScene === "customize";
    // Growth targets for chat panel vertical animation
    const growthMaxH = chatGrowStep === 0 ? 140 : chatGrowStep === 1 ? 230 : chatGrowStep === 2 ? 375 : 478;
    return (<PlatformDemoLocaleContext.Provider value={localeValue}>
      <div ref={demoRootRef} className="demo-root relative h-full w-full overflow-hidden" data-demo-root="1" style={{ background: "var(--demo-surface-bg)" }}>
      {/* Top bar */}
      <motion.div initial={false} animate={{ opacity: introPhase === "done" ? 1 : 0, y: introPhase === "done" ? 0 : -6 }} transition={{ duration: 0.5, ease: "easeOut" }} className="absolute left-0 right-0 top-0 z-40 flex items-center justify-between border-b border-border/40 px-4 py-2.5 backdrop-blur-sm" style={{ background: "var(--demo-topbar-bg)", pointerEvents: "none" }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-400/60"/>
            <div className="h-2 w-2 rounded-full bg-yellow-400/60"/>
            <div className="h-2 w-2 rounded-full bg-green-400/60"/>
          </div>
          {!focusActive && (<div className="text-[10px] font-medium uppercase tracking-widest text-muted/70">{shared.controls.topBarTitle}</div>)}
        </div>
        <button onClick={() => goToScene(0)} style={{ pointerEvents: "auto" }} className="cursor-pointer rounded-lg border border-border/60 px-2.5 py-0.5 text-[10px] text-muted transition-all hover:border-primary/40 hover:text-primary">
          &#8634; {shared.controls.replayButton}
        </button>
      </motion.div>

      {/* Scene content area */}
      <div className="absolute inset-0 top-[40px] overflow-hidden" style={{
            opacity: introPhase === "prologue" ? 0.55 : 1,
            pointerEvents: introPhase === "done" ? "auto" : "none",
            filter: introPhase === "prologue"
                ? "blur(10.3px) saturate(140%) brightness(0.05)"
                : introPhase === "done"
                    ? "blur(0px)"
                    : "blur(2px)",
            transition: "opacity 820ms cubic-bezier(0.22,1,0.36,1), filter 820ms cubic-bezier(0.22,1,0.36,1)",
        }}>
        {/* Left panel: scene-specific content */}
        <AnimatePresence>
          {(chatIsSidebar || chatIsBottom || hideSideChatPanel) && (<motion.div key={`left-${currentScene}`} initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.18, ease: "easeIn" } }} className="pointer-events-none absolute left-0 top-0 overflow-hidden" style={{
                right: leftPanelUsesSidebarWidth ? "35%" : "0%",
                bottom: leftPanelUsesBottomReserve && !isMobileViewport ? `${leftBottomReserve}px` : leftPanelUsesBottomReserve ? "auto" : "0px",
                height: leftPanelUsesBottomReserve && isMobileViewport ? mobileCustomizeSceneHeight : undefined,
            }}>
              {/* Design scene */}
              {currentScene === "design" && (<div className={`flex h-full flex-col ${isMobileViewport ? "gap-2 pb-3 pl-3 pr-3 pt-3" : "gap-2.5 pb-10 pl-4 pr-2.5 pt-4"}`}>
                  {/* Header */}
                  <div>
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.04, ease: [0.22, 1, 0.36, 1] }} className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/60">
                      {design.stepHeader}
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className={`mt-0.5 font-bold text-foreground ${isMobileViewport ? "text-[14px]" : "text-[16px]"}`}>
                      {design.title.prefix}<span className="text-accent">{design.title.highlight}</span>
                    </motion.div>
                  </div>

                  <div className={`flex flex-col overflow-hidden ${isMobileViewport ? "gap-2" : "gap-3"}`}>
                    {LAYOUT_GROUPS.map((group, gi) => (<motion.div key={gi} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 + gi * 0.18, ease: [0.22, 1, 0.36, 1] }} className={`rounded-xl border border-white/10 bg-white/4 ${isMobileViewport ? "p-2" : "p-2.5"}`}>
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold text-foreground">{group.label}</span>
                          </div>
                          <button data-demo-id={`design-explore-${gi}`} onClick={() => setDesignPopup(gi)} className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[9px] text-muted transition-all hover:bg-white/10">
                            {design.exploreAllLabel}
                          </button>
                        </div>
                        <div className={`grid grid-cols-3 ${isMobileViewport ? "gap-1.5" : "gap-2"}`}>
                          {group.styles.map((si, cardIdx) => (<motion.div key={si} data-demo-id={`design-card-${gi}-${cardIdx}`} initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{
                            duration: 0.4,
                            delay: 0.28 + gi * 0.18 + cardIdx * 0.07,
                            ease: [0.22, 1, 0.36, 1],
                        }} className="cursor-pointer" onClick={() => { setSelectedDesign(si); goToScene(2); }}>
                              <DesignPreviewCard lang={designLanguages[si]} selected={selectedDesign === si} small compactSmall={isMobileViewport} layoutVariant={gi}/>
                              <div className={`${isMobileViewport ? "mt-1.5" : "mt-2"} flex justify-center`}>
                                <span className={`rounded-full px-2 py-0.5 ${isMobileViewport ? "text-[7px]" : "text-[8px]"} font-semibold transition-all ${selectedDesign === si ? "bg-accent/20 text-accent ring-1 ring-accent/40" : "bg-white/5 text-muted"}`}>
                                  {designLanguages[si].name}
                                </span>
                              </div>
                            </motion.div>))}
                        </div>
                      </motion.div>))}
                  </div>
                </div>)}

              {/* Customize scene */}
              {currentScene === "customize" && (<CustomizeContent pausedRef={pausedRef} designIdx={selectedDesign} selectedFont={customFont} selectedBorderRadius={customRadius} isMobileViewport={isMobileViewport} contentVisible={customizeContentVisible} bounceRadius={customBounceRadius} scrollToRadius={customScrollToRadius} aiActionFrame={aiActionActive} aiActionDone={aiActionDone} onReselectDesign={() => goToScene(1)} expanded={expanded}/>)}

              {/* Build scene — full width, no chat sidebar */}
              {currentScene === "build" && (<BuildContent pausedRef={pausedRef} onComplete={handleBuildComplete} designIdx={selectedDesign} fontIdx={customFont} borderRadius={customRadius} contentVisible={buildContentVisible} isMobileViewport={isMobileViewport} expanded={expanded}/>)}

              {/* Dashboard scene */}
              {currentScene === "dashboard" && (<DashboardContent pausedRef={pausedRef} onFlowComplete={onDashboardFlowComplete} hideFloatingTitles={hideFloatingTitles} externalAPI={{
                    moveCursor: setCursorPos,
                    fireClick: (x, y) => { pulseKeyRef.current += 1; setClickPulse({ x, y, key: pulseKeyRef.current }); },
                    getDemoElemPos: getElemPosInDemo,
                    setInputActive,
                    setInputText,
                    addSidebarMsg: (role, msg) => setSidebarMsgs((p) => [...p, { role, text: msg }]),
                }}/>)}
            </motion.div>)}
        </AnimatePresence>

        {/* Chat scene step header — wrapped in overflow:hidden to create its own
            compositing layer, matching how design/customize/build step headers sit
            inside the left-panel's overflow:hidden wrapper (prevents WebKit
            backdrop-filter compositing artifacts on mobile Safari) */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 overflow-hidden" style={{ contain: "paint" }}>
          <AnimatePresence>
            {currentScene === "chat" && (<motion.div key="chat-step-header" className="px-4 pt-3" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.18 } }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/60" style={isMobileViewport ? { color: "rgba(59,130,246,0.6)" } : undefined}>
                  {chat.stepHeader}
                </div>
                <div className={`mt-0.5 font-bold text-foreground ${isMobileViewport ? "text-[14px]" : "text-[16px]"}`} style={isMobileViewport ? { color: isLightMode ? "#0f172a" : "#ffffff" } : undefined}>
                  {chat.title.prefix}<span className="text-accent" style={isMobileViewport ? { color: "#3b82f6" } : undefined}>{chat.title.highlight}</span>
                </div>
              </motion.div>)}
          </AnimatePresence>
        </div>

        {/* Chat scene: background blur layer (gradient transition via stacked blur tiers) */}
        <AnimatePresence>
          {!hideFloatingTitles && currentScene === "chat" && chatFloatingTitleKey && (<>
              {/* Light base blur — always on while title is visible (soft) */}
              <motion.div key={`chat-title-backdrop-base-${chatFloatingTitleKey}`} className="pointer-events-none absolute inset-0 z-[33]" style={{
                backdropFilter: "blur(1.2px)",
                WebkitBackdropFilter: "blur(1.2px)",
                background: isLightMode ? "rgba(240,245,255,0.08)" : "rgba(0,0,0,0.04)",
            }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.35, 0, 0.65, 1] } }} transition={{ duration: 0.7, ease: "linear" }}/>
              {/* Stronger blur — fades in later and out earlier for a gradient-like feel */}
              <motion.div key={`chat-title-backdrop-strong-${chatFloatingTitleKey}`} className="pointer-events-none absolute inset-0 z-[34]" style={{
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                background: isLightMode ? "rgba(240,245,255,0.12)" : "rgba(0,0,0,0.06)",
            }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.7, 0.3] } }} transition={{ duration: 1.1, delay: 0.2, ease: "linear" }}/>
            </>)}
        </AnimatePresence>

        {/* Chat scene floating narrative titles (glass overlay, doesn't shift layout) */}
        <AnimatePresence mode="wait">
          {!hideFloatingTitles && currentScene === "chat" && chatFloatingTitleKey && (<motion.div key={`chat-floating-title-${chatFloatingTitleKey}`} className="pointer-events-none absolute left-1/2 top-1/2 z-[36] w-full -translate-x-1/2 -translate-y-1/2 px-4" initial={{ opacity: 0, y: 18, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10, filter: "blur(4px)", transition: { duration: 0.42, ease: [0.4, 0, 0.7, 0.3] } }} transition={{ duration: 0.9, ease: "linear" }}>
              <div className="px-3 py-2 text-center sm:px-5 sm:py-2.5">
                {chatFloatingTitleKey && (<h2 className={`font-bold leading-[1.1] tracking-tight text-foreground ${isMobileViewport ? "text-[24px]" : "text-[40px]"}`} style={isMobileViewport ? { color: isLightMode ? "#0f172a" : "#ffffff" } : undefined}>
                    {chat.floatingTitles[chatFloatingTitleKey].prefix}
                    <span className="text-primary" style={isMobileViewport ? { color: "#3b82f6" } : undefined}>{chat.floatingTitles[chatFloatingTitleKey].highlight}</span>
                  </h2>)}
              </div>
            </motion.div>)}
        </AnimatePresence>

        {/* Design scene: background blur layers */}
        <AnimatePresence>
          {!hideFloatingTitles && currentScene === "design" && designFloatingTitle && (<>
              <motion.div key="design-title-backdrop-base" className="pointer-events-none absolute inset-0 z-[33]" style={{ backdropFilter: "blur(1.2px)", WebkitBackdropFilter: "blur(1.2px)", background: isLightMode ? "rgba(240,245,255,0.08)" : "rgba(0,0,0,0.04)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.35, 0, 0.65, 1] } }} transition={{ duration: 0.7, ease: "linear" }}/>
              <motion.div key="design-title-backdrop-strong" className="pointer-events-none absolute inset-0 z-[34]" style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", background: isLightMode ? "rgba(240,245,255,0.12)" : "rgba(0,0,0,0.06)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.7, 0.3] } }} transition={{ duration: 1.1, delay: 0.2, ease: "linear" }}/>
            </>)}
        </AnimatePresence>

        {/* Design scene floating title */}
        <AnimatePresence mode="wait">
          {!hideFloatingTitles && currentScene === "design" && designFloatingTitle && (<motion.div key="design-floating-title" className="pointer-events-none absolute left-1/2 top-1/2 z-[36] w-full -translate-x-1/2 -translate-y-1/2 px-4" initial={{ opacity: 0, y: 18, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10, filter: "blur(4px)", transition: { duration: 0.42, ease: [0.4, 0, 0.7, 0.3] } }} transition={{ duration: 0.9, ease: "linear" }}>
              <div className="px-3 py-2 text-center sm:px-5 sm:py-2.5">
                <h2 className={`font-bold leading-[1.1] tracking-tight text-foreground ${isMobileViewport ? "text-[24px]" : "text-[40px]"}`} style={isMobileViewport ? { color: isLightMode ? "#0f172a" : "#ffffff" } : undefined}>
                  {design.title.prefix}<span className="text-primary" style={isMobileViewport ? { color: "#3b82f6" } : undefined}>{design.title.highlight}</span>
                </h2>
              </div>
            </motion.div>)}
        </AnimatePresence>

        {/* Customize scene: blur + floating title */}
        <AnimatePresence>
          {!hideFloatingTitles && currentScene === "customize" && customizeFloatingTitle && (<>
              <motion.div key="customize-title-bd-base" className="pointer-events-none absolute inset-0 z-[33]" style={{ backdropFilter: "blur(1.2px)", WebkitBackdropFilter: "blur(1.2px)", background: isLightMode ? "rgba(240,245,255,0.08)" : "rgba(0,0,0,0.04)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.35, 0, 0.65, 1] } }} transition={{ duration: 0.7, ease: "linear" }}/>
              <motion.div key="customize-title-bd-strong" className="pointer-events-none absolute inset-0 z-[34]" style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", background: isLightMode ? "rgba(240,245,255,0.12)" : "rgba(0,0,0,0.06)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.7, 0.3] } }} transition={{ duration: 1.1, delay: 0.2, ease: "linear" }}/>
            </>)}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {!hideFloatingTitles && currentScene === "customize" && customizeFloatingTitle && (<motion.div key="customize-floating-title" className="pointer-events-none absolute left-1/2 top-1/2 z-[36] w-full -translate-x-1/2 -translate-y-1/2 px-4" initial={{ opacity: 0, y: 18, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10, filter: "blur(4px)", transition: { duration: 0.42, ease: [0.4, 0, 0.7, 0.3] } }} transition={{ duration: 0.9, ease: "linear" }}>
              <div className="px-3 py-2 text-center sm:px-5 sm:py-2.5">
                <h2 className={`font-bold leading-[1.1] tracking-tight text-foreground ${isMobileViewport ? "text-[24px]" : "text-[40px]"}`} style={isMobileViewport ? { color: isLightMode ? "#0f172a" : "#ffffff" } : undefined}>
                  {customize.title.prefix}<span className="text-primary" style={isMobileViewport ? { color: "#3b82f6" } : undefined}>{customize.title.highlight}</span>
                </h2>
              </div>
            </motion.div>)}
        </AnimatePresence>

        {/* Build scene: blur + floating title */}
        <AnimatePresence>
          {!hideFloatingTitles && currentScene === "build" && buildFloatingTitle && (<>
              <motion.div key="build-title-bd-base" className="pointer-events-none absolute inset-0 z-[33]" style={{ backdropFilter: "blur(1.2px)", WebkitBackdropFilter: "blur(1.2px)", background: isLightMode ? "rgba(240,245,255,0.08)" : "rgba(0,0,0,0.04)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.35, 0, 0.65, 1] } }} transition={{ duration: 0.7, ease: "linear" }}/>
              <motion.div key="build-title-bd-strong" className="pointer-events-none absolute inset-0 z-[34]" style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", background: isLightMode ? "rgba(240,245,255,0.12)" : "rgba(0,0,0,0.06)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.7, 0.3] } }} transition={{ duration: 1.1, delay: 0.2, ease: "linear" }}/>
            </>)}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {!hideFloatingTitles && currentScene === "build" && buildFloatingTitle && (<motion.div key="build-floating-title" className="pointer-events-none absolute left-1/2 top-1/2 z-[36] w-full -translate-x-1/2 -translate-y-1/2 px-4" initial={{ opacity: 0, y: 18, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10, filter: "blur(4px)", transition: { duration: 0.42, ease: [0.4, 0, 0.7, 0.3] } }} transition={{ duration: 0.9, ease: "linear" }}>
              <div className="px-3 py-2 text-center sm:px-5 sm:py-2.5">
                <h2 className={`font-bold leading-[1.1] tracking-tight text-foreground ${isMobileViewport ? "text-[24px]" : "text-[40px]"}`} style={isMobileViewport ? { color: isLightMode ? "#0f172a" : "#ffffff" } : undefined}>
                  {build.title.prefix}<span className="text-primary" style={isMobileViewport ? { color: "#3b82f6" } : undefined}>{build.title.highlight}</span>
                </h2>
              </div>
            </motion.div>)}
        </AnimatePresence>

        {/* Chat panel (single persistent panel with position morph) */}
        <AnimatePresence>
        {showChat && (<motion.div key="main-chat-panel" ref={chatContainerRef} initial={false} exit={{ opacity: 0, x: 36, transition: { duration: 0.5, ease: [0.4, 0, 1, 0.8] } }} animate={{
                left: currentScene === "chat" ? "0px" : chatIsBottom ? "50%" : "65%",
                right: currentScene === "chat" ? "0px" : chatIsBottom ? "auto" : "0px",
                x: chatIsBottom ? "-50%" : "0%",
                width: currentScene === "chat" ? "100%" : chatIsBottom ? bottomChatWidth : "35%",
                top: currentScene === "chat" ? "0px" : chatIsBottom ? (isMobileViewport ? mobileCustomizeChatTop : `calc(100% - ${bottomChatHeight + bottomChatTopGap}px)`) : "0px",
                height: currentScene === "chat" ? "100%" : chatIsBottom ? `${bottomChatHeight}px` : "100%",
                paddingTop: chatIsBottom ? 0 : chatIsSidebar ? 70 : isMobileViewport ? 58 : 78,
            }} transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1] }} className="pointer-events-none absolute z-20 flex items-start justify-center">
            <motion.div className="relative w-full" initial={false} animate={{
                height: chatIsBottom ? bottomChatHeight : currentScene === "chat" ? (isMobileViewport ? "calc(100% - 58px)" : growthMaxH) : 380,
                maxWidth: chatIsBottom || chatIsSidebar ? "100%" : "520px",
                padding: chatIsBottom ? "0" : chatIsSidebar ? "0 10px 0 10px" : isMobileViewport ? "0 8px 0 8px" : "0 24px 0 24px",
            }} transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1] }}>
              <ChatPanel mode={chatIsBottom || chatIsSidebar ? "sidebar" : "full"} items={chatItems} typingRole={chatTyping} sidebarMessages={sidebarMsgs} compact={chatIsBottom || chatIsSidebar} inputActive={inputActive && !chatInputFocusFx} inputText={chatInputFocusFx ? "" : inputText} showFastForward={chatIsBottom ? false : chatFastForward} latestFromPopup={chatLatestFromPopup} scrollPauseEnabled={currentScene === "chat" && !manualPaused} allowScrollOnly={allowChatSceneScroll} onUserScrollPauseChange={(locked) => {
                if (manualPausedRef.current)
                    return;
                pausedRef.current = locked;
                setPaused(locked);
            }}/>
            </motion.div>
          </motion.div>)}
        </AnimatePresence>
      </div>

      {/* Dashboard finale — 1s pause after report, then very slow blur + logo */}
      <AnimatePresence>
        {dashboardFinale && currentScene === "dashboard" && (<motion.div key="dashboard-finale" className="pointer-events-none absolute left-0 right-0 top-[40px] bottom-0 z-[25] flex items-center justify-center overflow-hidden px-1 pb-1" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <motion.div className="absolute inset-0 rounded-xl backdrop-blur-2xl backdrop-saturate-150" style={{
                background: "linear-gradient(180deg, rgba(4,8,18,0.72) 0%, rgba(4,8,18,0.92) 14%, rgba(4,8,18,0.92) 86%, rgba(4,8,18,0.72) 100%)",
            }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3.8, ease: [0.18, 0.06, 0.22, 1] }}/>
            <div className="absolute inset-x-5 top-1 h-10 rounded-full bg-blue-300/10 blur-2xl"/>
            <div className="absolute inset-x-5 bottom-1 h-10 rounded-full bg-blue-400/10 blur-2xl"/>
            <div className="absolute left-[-6%] top-1/2 -translate-y-1/2" style={{ width: "min(52vw, 300px)", height: "min(52vw, 300px)" }}>
              <motion.div className="h-full w-full rounded-full" style={{
                background: "radial-gradient(circle, rgba(96,165,250,0.65) 0%, rgba(37,99,235,0.35) 42%, transparent 68%)",
                filter: "blur(1px)",
            }} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 0.92, scale: 1 }} transition={{ duration: 4.2, delay: 0.35, ease: [0.16, 0.08, 0.26, 1] }}/>
            </div>
            <div className="absolute right-[-6%] top-1/2 -translate-y-1/2" style={{ width: "min(52vw, 300px)", height: "min(52vw, 300px)" }}>
              <motion.div className="h-full w-full rounded-full" style={{
                background: "radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(29,78,216,0.32) 42%, transparent 68%)",
                filter: "blur(1px)",
            }} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 0.88, scale: 1 }} transition={{ duration: 4.2, delay: 0.45, ease: [0.16, 0.08, 0.26, 1] }}/>
            </div>
            <div className="absolute left-[-10%] top-[18%]" style={{ width: "min(44vw, 230px)", height: "min(44vw, 230px)" }}>
              <motion.div className="h-full w-full rounded-full" style={{
                background: "radial-gradient(circle, rgba(125,211,252,0.42) 0%, rgba(37,99,235,0.18) 46%, transparent 70%)",
                filter: "blur(2px)",
            }} initial={{ opacity: 0, scale: 0.86 }} animate={{ opacity: 0.78, scale: 1 }} transition={{ duration: 4.5, delay: 0.6, ease: [0.16, 0.08, 0.26, 1] }}/>
            </div>
            <div className="absolute right-[-10%] bottom-[16%]" style={{ width: "min(44vw, 230px)", height: "min(44vw, 230px)" }}>
              <motion.div className="h-full w-full rounded-full" style={{
                background: "radial-gradient(circle, rgba(147,197,253,0.40) 0%, rgba(29,78,216,0.16) 46%, transparent 70%)",
                filter: "blur(2px)",
            }} initial={{ opacity: 0, scale: 0.86 }} animate={{ opacity: 0.74, scale: 1 }} transition={{ duration: 4.5, delay: 0.72, ease: [0.16, 0.08, 0.26, 1] }}/>
            </div>
            <motion.img src={`${BASE}/admino-logo-full.png?v=2`} alt={shared.logoAlt} className="relative z-10 h-9 w-auto object-contain drop-shadow-[0_0_28px_rgba(59,130,246,0.35)] sm:h-11 md:h-[52px]" initial={{ scale: 0.26, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 4.2, delay: 1.35, ease: [0.08, 0.72, 0.12, 1] }}/>
          </motion.div>)}
      </AnimatePresence>

      {/* Cursor overlay for chat/design scenes — hand/tap pointer.
            Offset aligns the fingertip with the target x/y (SVG tip sits at ~8,2.5) */}
      <AnimatePresence>
        {cursorPos && (<motion.div key="demo-cursor" className={`pointer-events-none absolute z-60 ${isLightMode ? "drop-shadow-[0_3px_8px_rgba(15,23,42,0.28)]" : "drop-shadow-[0_3px_8px_rgba(0,0,0,0.45)]"}`} initial={{ x: cursorPos.x - 8, y: cursorPos.y - 2, opacity: 0 }} animate={{ x: cursorPos.x - 8, y: cursorPos.y - 2, opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ x: { duration: 0.5, ease: "easeInOut" }, y: { duration: 0.5, ease: "easeInOut" }, opacity: { duration: 0.15 } }} style={{ left: 0, top: 40 }}>
            <DemoCursor light={isLightMode}/>
          </motion.div>)}
      </AnimatePresence>
      <AnimatePresence>
        {clickPulse && (<motion.span key={clickPulse.key} className="pointer-events-none absolute z-60 h-6 w-6 rounded-full border border-primary/70" style={{ left: clickPulse.x - 10, top: clickPulse.y + 30 }} initial={{ scale: 0.3, opacity: 0.95 }} animate={{ scale: 2, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}/>)}
      </AnimatePresence>

      {/* Scene-0 cinematic input focus: blur backdrop + centered zoom card */}
      <AnimatePresence>
        {chatInputFocusFx && currentScene === "chat" && (<motion.div key="chat-input-focus-fx" className="pointer-events-none absolute inset-x-0 top-[40px] bottom-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
            {/* Blur-only backdrop — minimal darken */}
            <motion.div className="absolute inset-0" style={{
                backdropFilter: "blur(6px) saturate(130%)",
                WebkitBackdropFilter: "blur(6px) saturate(130%)",
                background: isLightMode ? "rgba(240,245,255,0.22)" : "rgba(0,0,0,0.07)",
            }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.42, ease: "easeOut" }}/>

            {/* Centered input card */}
            <motion.div className="relative z-10 w-[min(88%,500px)]" initial={{ opacity: 0, scale: 0.78, y: 32 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{
                opacity: 0,
                scale: 0.72,
                y: 120,
                x: "-22%",
                transition: {
                    opacity: { duration: 0.26, ease: "easeIn" },
                    scale: { duration: 0.38, ease: [0.4, 0, 1, 0.8] },
                    y: { duration: 0.38, ease: [0.4, 0, 1, 0.8] },
                    x: { duration: 0.38, ease: [0.4, 0, 1, 0.8] },
                },
            }} transition={{
                opacity: { duration: 0.34, ease: "easeOut" },
                scale: { type: "spring", stiffness: 240, damping: 22 },
                y: { type: "spring", stiffness: 240, damping: 24 },
            }}>
              <div className="overflow-hidden rounded-2xl border" style={{
                background: isLightMode
                    ? "rgba(255,255,255,0.96)"
                    : "rgba(10,18,32,0.90)",
                borderColor: isLightMode ? "rgba(59,130,246,0.22)" : "rgba(59,130,246,0.20)",
                boxShadow: isLightMode
                    ? "0 24px 56px rgba(15,23,42,0.14), 0 0 0 1px rgba(59,130,246,0.10)"
                    : "0 28px 60px rgba(0,0,0,0.42), 0 0 0 1px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
                backdropFilter: "blur(28px) saturate(200%)",
                WebkitBackdropFilter: "blur(28px) saturate(200%)",
            }}>
                {/* Header */}
                <div className="flex items-center gap-2 px-4 py-2.5" style={{
                borderBottom: isLightMode ? "1px solid rgba(15,23,42,0.08)" : "1px solid rgba(255,255,255,0.07)",
                background: isLightMode ? "rgba(248,250,255,0.9)" : "rgba(255,255,255,0.03)",
            }}>
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/25 bg-white">
                    <img src={`${BASE}/admino-logo.png`} alt={shared.logoAlt} className="h-[85%] w-[85%] object-contain"/>
                  </div>
                  <span className={`text-[11px] font-semibold ${isLightMode ? "text-slate-700" : "text-foreground/80"}`}>
                    {chat.panel.header}
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-[9px] text-accent">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"/>
                    {chat.panel.status}
                  </span>
                </div>

                {/* Input body */}
                <div className="px-4 py-3.5">
                  <div className="min-h-[52px] rounded-xl px-3.5 py-2.5 text-[12.5px] leading-relaxed transition-colors duration-200" style={{
                border: isLightMode
                    ? "1.5px solid rgba(59,130,246,0.30)"
                    : "1px solid rgba(59,130,246,0.38)",
                background: isLightMode
                    ? "rgba(239,246,255,0.70)"
                    : "rgba(255,255,255,0.06)",
            }}>
                    {inputText ? (<span className={isLightMode ? "text-slate-800" : "text-foreground/92"}>
                        {inputText}
                <motion.span className="ml-px inline-block h-[14px] w-[2px] rounded-full bg-primary align-middle" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}/>
                      </span>) : (<span className={isLightMode ? "text-slate-400" : "text-muted/55"}>
                        {chat.panel.placeholder.full}
                      </span>)}
        </div>
      </div>
              </div>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>

      {/* Bottom controls: [Pause] [Scene pills] [Focus?] — styled like how-it-works external bar */}
      {!hideSceneControls && (<motion.div initial={false} animate={{ opacity: introPhase === "done" ? 1 : 0, y: introPhase === "done" ? 0 : 18, x: "-50%" }} transition={{ duration: 0.55, ease: "easeOut" }} className="pointer-events-none absolute bottom-2 z-40 flex items-center gap-2" style={{ left: "50%" }}>
          {/* Pause / Play */}
      <button onClick={() => {
                setPaused((p) => {
                    const next = !p;
                    setManualPaused(next);
                    onUserTogglePause?.(next);
                    return next;
                });
            }} aria-label={paused ? shared.controls.resumeAnimationAria : shared.controls.pauseAnimationAria} className={`pointer-events-auto flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border backdrop-blur-xl transition-all active:scale-95 ${isLightMode
                ? "border-white/60 bg-white/48 shadow-[0_6px_18px_rgba(15,23,42,0.16)] hover:bg-white/70"
                : "border-white/20 bg-white/10 shadow-sm hover:bg-white/18"}`}>
        {paused ? (<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className={`ml-0.5 ${isLightMode ? "text-foreground/70" : "text-white/85"}`}>
            <path d="M2.5 1.2L10.5 6L2.5 10.8V1.2Z"/>
          </svg>) : (<svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" className={isLightMode ? "text-foreground/70" : "text-white/85"}>
            <rect x="0.5" y="0.5" width="3" height="11" rx="0.8"/>
            <rect x="6.5" y="0.5" width="3" height="11" rx="0.8"/>
          </svg>)}
      </button>

          {/* Scene pills — measured slide indicator (no shared layoutId) */}
          <DemoLiquidPillNav labels={SCENE_LABELS} activeIndex={scene} onSelect={(i) => { goToScene(i); onUserSceneSelect?.(i); }} shellClassName="demo-liquid-pill-nav pointer-events-auto relative flex items-center gap-0.5 rounded-full border p-[7px] backdrop-blur-xl" shellStyle={{
                background: "var(--demo-liquid-bg)",
                borderColor: "var(--demo-liquid-border)",
                boxShadow: "0 10px 34px var(--demo-liquid-shadow)",
            }} getButtonClassName={() => "demo-liquid-pill relative z-10 rounded-full px-3 py-[5px] text-[10px] font-medium transition-colors"}/>

          {/* Focus button — only when parent provides handler */}
          {onFocusClick && (<button onClick={onFocusClick} aria-label={focusActive ? shared.controls.focusExitAria : shared.controls.focusEnterAria} className={`pointer-events-auto flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-[11px] font-medium backdrop-blur-xl transition-all active:scale-95 ${focusActive
                    ? "border-primary/50 bg-primary/15 text-primary shadow-[0_6px_18px_rgba(59,130,246,0.22)]"
                    : isLightMode
                        ? "border-white/60 bg-white/48 text-foreground/75 shadow-[0_6px_18px_rgba(15,23,42,0.16)] hover:bg-white/70"
                        : "border-white/20 bg-white/10 text-white/80 shadow-sm hover:bg-white/18"}`}>
              {focusActive ? (<>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3v3a2 2 0 0 1-2 2H3"/>
                    <path d="M21 8h-3a2 2 0 0 1-2-2V3"/>
                    <path d="M3 16h3a2 2 0 0 1 2 2v3"/>
                    <path d="M16 21v-3a2 2 0 0 1 2-2h3"/>
                  </svg>
                  <span>{shared.controls.focusExitLabel}</span>
                </>) : (<>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 9V4h5"/>
                    <path d="M20 9V4h-5"/>
                    <path d="M4 15v5h5"/>
                    <path d="M20 15v5h-5"/>
                  </svg>
                  <span>{shared.controls.focusEnterLabel}</span>
                </>)}
            </button>)}
        </motion.div>)}

      {/* Design popup overlay */}
      <AnimatePresence>
        {designPopup !== null && (<DesignPopup layoutIndex={designPopup} selectedDesign={selectedDesign} onSelect={(si) => { setSelectedDesign(si); setDesignPopup(null); goToScene(2); }} onClose={() => setDesignPopup(null)} expanded={expanded}/>)}
      </AnimatePresence>

      {!hideSceneControls && (<motion.div initial={false} animate={{ opacity: introPhase === "done" ? 1 : 0 }} transition={{ duration: 0.45, ease: "easeOut" }} className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-border/30">
        <div className="h-full bg-primary transition-none" style={{ width: `${progress}%` }}/>
        </motion.div>)}

      {/* ── Boot intro overlay (hard-gated above everything) ────────────────── */}
      {showIntroOverlay && (<div className="pointer-events-none absolute inset-0 z-[9999] overflow-hidden" style={{
                opacity: introPhase === "done" ? 0 : 1,
                transition: "opacity 720ms cubic-bezier(0.22,1,0.36,1)",
            }}>
          {/* Left curtain */}
          <div className="absolute left-0 top-0 h-full w-1/2" style={{
                transform: introPhase === "prologue" ? "translateX(0%)" : "translateX(-100%)",
                transition: "transform 860ms cubic-bezier(0.74,0.04,0.22,1)",
                background: "rgba(9,18,44,0.62)",
                boxShadow: "none",
                backdropFilter: introPhase === "prologue" ? "blur(2px)" : "blur(1px)",
                WebkitBackdropFilter: introPhase === "prologue" ? "blur(2px)" : "blur(1px)",
            }}>
            <div className="absolute inset-0 opacity-[0.28]" style={{
                backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
            }}/>
      </div>

          {/* Center seam — visible only during prologue; hides immediately when curtains open */}
          <div className="pointer-events-none absolute top-0 h-full" style={{
                left: "50%",
                width: "1px",
                transform: "translateX(-0.5px)",
                zIndex: 2,
                background: "rgba(255,255,255,0.07)",
                opacity: introPhase === "prologue" ? 1 : 0,
                transition: "opacity 60ms ease-out",
            }}/>

          {/* Right curtain */}
          <div className="absolute right-0 top-0 h-full w-1/2" style={{
                transform: introPhase === "prologue" ? "translateX(0%)" : "translateX(100%)",
                transition: "transform 860ms cubic-bezier(0.74,0.04,0.22,1)",
                background: "rgba(9,18,44,0.62)",
                boxShadow: "none",
                backdropFilter: introPhase === "prologue" ? "blur(2px)" : "blur(1px)",
                WebkitBackdropFilter: introPhase === "prologue" ? "blur(2px)" : "blur(1px)",
            }}>
            <div className="absolute inset-0 opacity-[0.28]" style={{
                backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
            }}/>
          </div>

          {/* Prologue content — anchored toward top with breathing room */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-start px-4 text-center sm:px-6 md:px-8 lg:px-10" style={{
                paddingTop: "clamp(36px,10svh,72px)",
                opacity: introPhase === "prologue" ? 1 : 0,
                transition: "opacity 260ms ease-out",
            }}>
            <div className={`flex w-full flex-col items-center gap-[10px] ${isMobileViewport ? "max-w-[min(100%,20rem)]" : "max-w-full"}`}>
              <img src={`${BASE}/demo/hana-prologue8.jpg`} alt="Hana" width={176} height={176} className={`shrink-0 rounded-full border border-white/30 object-cover object-center shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-2 ring-white/20 ${isMobileViewport ? "h-[140px] w-[140px]" : "h-[136px] w-[136px]"}`} loading="eager" decoding="async" style={scrollDrivenPrologue ? {
                opacity: introPrologueIndex >= -2 ? 1 : 0,
                transform: introPrologueIndex >= -2 ? "translateY(0px)" : "translateY(18px)",
                filter: introPrologueIndex >= -2 ? "blur(0px)" : "blur(5px)",
                transition: "opacity 1100ms cubic-bezier(0.22,1,0.36,1), transform 1100ms cubic-bezier(0.22,1,0.36,1), filter 1100ms cubic-bezier(0.22,1,0.36,1)",
            } : undefined}/>
              <div className={`${isMobileViewport ? "text-[10px]" : "text-[11px]"} font-semibold uppercase tracking-[0.18em] text-cyan-200/80`} style={scrollDrivenPrologue ? {
                opacity: introPrologueIndex >= -1 ? 1 : 0,
                transform: introPrologueIndex >= -1 ? "translateY(0px)" : "translateY(18px)",
                filter: introPrologueIndex >= -1 ? "blur(0px)" : "blur(5px)",
                transition: "opacity 1100ms cubic-bezier(0.22,1,0.36,1), transform 1100ms cubic-bezier(0.22,1,0.36,1), filter 1100ms cubic-bezier(0.22,1,0.36,1)",
            } : undefined}>
                {shared.introLead ?? "Before We Start"}
              </div>
              {INTRO_PROLOGUE_PHRASES.map((phrase, i) => {
                const visible = i <= introPrologueIndex;
                const isCurrent = i === introPrologueIndex;
                return (<div key={i} className={`w-full leading-[1.3] tracking-tight ${isMobileViewport ? "max-w-full text-[15px]" : "max-w-[85%] text-[19px]"} ${isCurrent ? "font-semibold" : "font-normal"}`} style={{
                        opacity: visible ? (isCurrent ? 1 : 0.38) : 0,
                        transform: visible ? "translateY(0px)" : "translateY(18px)",
                        filter: visible ? "blur(0px)" : "blur(5px)",
                        color: isCurrent ? "rgba(255,255,255,0.98)" : "rgba(200,218,255,0.6)",
                        textShadow: isCurrent
                            ? "0 2px 18px rgba(18,34,74,0.38)"
                            : "0 1px 10px rgba(18,34,74,0.24)",
                        transition: "opacity 1100ms cubic-bezier(0.22,1,0.36,1), transform 1100ms cubic-bezier(0.22,1,0.36,1), filter 1100ms cubic-bezier(0.22,1,0.36,1), color 600ms ease",
                    }}>
                    {phrase}
                  </div>);
            })}
            </div>
          </div>
        </div>)}

      </div>
    </PlatformDemoLocaleContext.Provider>);
});
export default PlatformDemo;
