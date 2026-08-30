import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import PanelDemo from "./PanelDemo";
import { DemoLiquidPillNav } from "./DemoLiquidPillNav";
import LangToggle from "./LangToggle";
import WaitlistButton from "./WaitlistButton";
import { useTheme, isLightTheme } from "./ThemeProvider";
import { getHeroContent, getNavbarContent } from "./content";
import { markPrologueSeen, trackEvent, AE } from "./lib";
import logo from "../assets/images/logos.png";
const BASE = "";
export default function Hero() {
    const navigate = useNavigate();
    const heroContent = getHeroContent();
    const nav = getNavbarContent();
    const SCENE_LABELS = heroContent.sceneLabels;
    const homeHref = "/";
    const howItWorksHref = "/how-works";
    const NAV_HREFS = ["/sample-reports", "/why-second-opinion", "/contact"];
    const { theme } = useTheme();
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => {
        setIsHydrated(true);
    }, []);
    const lightTheme = isHydrated && isLightTheme(theme);
    // Only one of the desktop/mobile demo panels is ever visible at a time —
    // mounting both simultaneously (one merely hidden via CSS) doubled the
    // animation workload and was a real source of jank/stutter. Gate the
    // *mount* on the same breakpoint the layout itself switches on.
    const [isDesktop, setIsDesktop] = useState(() => typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true);
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const onChange = (e) => setIsDesktop(e.matches);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);
    const demoRef = useRef(null);
    const desktopDemoRef = useRef(null);
    const desktopDemoWrapperRef = useRef(null);
    const [mobileScene, setMobileScene] = useState(0);
    const [mobilePaused, setMobilePaused] = useState(true);
    const [mobileProgress, setMobileProgress] = useState(0);
    const [heroFocusMode, setHeroFocusMode] = useState(false);
    const [heroFocusOffsetX, setHeroFocusOffsetX] = useState(0);
    const heroFocusOffsetXRef = useRef(0);
    const rightHalfRef = useRef(null);
    const [chromeReady, setChromeReady] = useState(false);
    const mobileDemoSectionRef = useRef(null);
    const demoInteractedRef = useRef(false);
    const trackDemoInteracted = () => {
        if (!demoInteractedRef.current) {
            demoInteractedRef.current = true;
            trackEvent(AE.HomePage_Demo_Interacted);
        }
    };
    const SCENE_NAV_EVENTS = [
        AE.HomePage_Demo_NavigatedToChat,
        AE.HomePage_Demo_NavigatedToDesign,
        AE.HomePage_Demo_NavigatedToCustomize,
        AE.HomePage_Demo_NavigatedToBuild,
        AE.HomePage_Demo_NavigatedToDashBoard,
    ];
    const SCENE_REACHED_END_EVENTS = [
        AE.HomePage_Demo_Chat_ReachedEnd,
        AE.HomePage_Demo_Design_ReachedEnd,
        AE.HomePage_Demo_Customize_ReachedEnd,
        AE.HomePage_Demo_Build_ReachedEnd,
        AE.HomePage_Demo_DashBoard_ReachedEnd,
    ];
    useEffect(() => {
        const onIntro = () => setChromeReady(true);
        window.addEventListener("admino:intro-complete", onIntro);
        return () => window.removeEventListener("admino:intro-complete", onIntro);
    }, []);
    // The demo now opens straight on step 1 — no prologue, no scroll lock.
    useEffect(() => {
        if (!chromeReady)
            return;
        markPrologueSeen();
    }, [chromeReady]);
    const computeOffset = useCallback(() => {
        const rightEl = rightHalfRef.current;
        if (!rightEl)
            return null;
        const rect = rightEl.getBoundingClientRect();
        return window.innerWidth / 2 - (rect.left - heroFocusOffsetXRef.current + rect.width / 2);
    }, []);
    const handleDesktopFocus = () => {
        if (heroFocusMode) {
            trackDemoInteracted();
            trackEvent(AE.HomePage_Demo_ExitedFocus);
            setHeroFocusMode(false);
            return;
        }
        const rightEl = rightHalfRef.current;
        if (!rightEl)
            return;
        const rect = rightEl.getBoundingClientRect();
        const currentCenterX = rect.left + rect.width / 2;
        const viewportCenterX = window.innerWidth / 2;
        const dx = viewportCenterX - currentCenterX;
        heroFocusOffsetXRef.current = dx;
        setHeroFocusOffsetX(dx);
        setHeroFocusMode(true);
        trackDemoInteracted();
        trackEvent(AE.HomePage_Demo_Focused);
    };
    useEffect(() => {
        if (!heroFocusMode)
            return;
        const onKey = (e) => {
            if (e.key === "Escape") {
                trackEvent(AE.HomePage_Demo_ExitedFocus);
                setHeroFocusMode(false);
            }
        };
        window.addEventListener("keydown", onKey);
        const onResize = () => {
            const newOffset = computeOffset();
            if (newOffset === null)
                return;
            heroFocusOffsetXRef.current = newOffset;
            setHeroFocusOffsetX(newOffset);
        };
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("resize", onResize);
        };
    }, [heroFocusMode, computeOffset]);
    return (<>
      {/* Desktop focus-mode blur overlay — rendered at root so parent stacking/overflow doesn't break backdrop-filter */}
      {heroFocusMode && (<motion.div key="hero-focus-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[80] hidden cursor-pointer lg:block" style={{
                background: "rgba(0,0,0,0.38)",
                backdropFilter: "blur(14px) saturate(140%)",
                WebkitBackdropFilter: "blur(14px) saturate(140%)",
            }} onClick={() => {
                trackEvent(AE.HomePage_Demo_ExitedFocus);
                setHeroFocusMode(false);
            }}/>)}

      {/* ═══════════════════════════════════════════════════════
            DESKTOP HERO — unchanged, hidden below lg
            ═══════════════════════════════════════════════════════ */}
      <div className="relative hidden h-screen overflow-hidden lg:flex">
        {/* ── Background grid lines ── */}
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30"/>
        <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 50%, transparent 50%, var(--color-background) 100%)",
        }}/>

        {/* ── Inner max-width shell (no z-index: allows right half to escape stacking context during focus) ── */}
        <div className="relative mx-auto flex h-full w-full max-w-[1440px] 2xl:max-w-[1600px]">
        {/* ── Left Half ── */}
        <div className="relative flex w-1/2 flex-col">
          <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex min-w-0 items-center gap-[clamp(6px,0.9vw,16px)] px-[clamp(16px,2.2vw,32px)] py-6">
            {/* Logo */}
            <Link to={homeHref} className="flex shrink-0 items-center">
              <img src={logo} alt={nav.logoAlt} className="h-[clamp(32px,3.4vw,40px)] w-auto object-contain"/>
            </Link>

            {/* Nav links — centered between logo and right controls */}
            <div className="flex min-w-0 flex-1 items-center justify-center gap-[clamp(6px,0.95vw,20px)] overflow-hidden 2xl:gap-5">
              {NAV_HREFS.map((href, i) => {
            const name = nav.links[i] ?? "";
            return (<Link key={href} to={href} className="shrink-0 whitespace-nowrap text-[clamp(11px,0.9vw,14px)] font-medium text-muted transition-colors hover:text-foreground">
                    {name}
                  </Link>);
        })}
            </div>

            {/* Right controls */}
            <div className="flex shrink-0 items-center gap-[clamp(4px,0.5vw,8px)]">
              <LangToggle />
            </div>
          </motion.nav>

          <div className="flex flex-1 flex-col justify-center px-12">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-6xl font-bold leading-[1.1] tracking-tight text-foreground">
              {heroContent.title.lines[0]}
              <br />
              {heroContent.title.lines[1]}
              <br />
              <span className="text-primary">{heroContent.title.highlight}</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-8 max-w-lg text-lg leading-relaxed text-muted">
              {heroContent.description.desktop}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mt-10 flex items-center gap-4">
              {/* Get Started */}
              <button onClick={() => navigate("/form-new")} className="relative flex cursor-pointer select-none items-center overflow-hidden rounded-full px-2" style={{
            height: 42,
            background: "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)",
            boxShadow: "0 4px 14px rgba(1,103,140,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}>
                <span className="relative z-10 flex-1 whitespace-nowrap px-3 text-center text-[10px] font-bold uppercase tracking-wide text-white">
                  {heroContent.ctas.primary}
                </span>
                <span className="relative z-10 ml-1 mr-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)" }}>
                  <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </span>
              </button>

              {/* See How It Works */}
              <Link to={howItWorksHref} className="relative flex cursor-pointer select-none items-center overflow-hidden rounded-full border border-slate-200 bg-white px-2" style={{ height: 42 }}>
                <span className="relative z-10 flex-1 whitespace-nowrap px-3 text-center text-[10px] font-bold uppercase tracking-wide text-slate-800">
                  {heroContent.ctas.secondary}
                </span>
                <span className="relative z-10 ml-1 mr-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100">
                  <svg className="h-3.5 w-3.5 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.14v14l11-7-11-7z"/>
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Right Half — translates to screen center when focus mode is active ── */}
        <motion.div ref={rightHalfRef} className={`relative flex w-1/2 items-center justify-center p-8 pb-7 pl-2 pt-7 ${heroFocusMode ? "z-[90]" : ""}`} animate={{ x: heroFocusMode ? heroFocusOffsetX : 0 }} transition={{ type: "spring", stiffness: 220, damping: 30 }}>
          <motion.div ref={desktopDemoWrapperRef} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }} className="relative h-full max-h-[calc(100vh-56px)] w-full overflow-hidden xl:max-h-[720px] 2xl:max-h-[800px]" style={{
            clipPath: heroFocusMode
                ? "inset(0 round 24px)"
                : "polygon(60.388% 2.026%,60.388% 2.026%,60.229% 1.677%,60.019% 1.354%,59.762% 1.059%,59.462% 0.794%,59.124% 0.563%,58.753% 0.367%,58.352% 0.211%,57.927% 0.095%,57.481% 0.024%,57.02% 0%,3.509% 0%,3.509% 0%,2.94% 0.037%,2.4% 0.144%,1.896% 0.314%,1.437% 0.543%,1.028% 0.825%,0.677% 1.153%,0.392% 1.522%,0.179% 1.927%,0.046% 2.36%,0% 2.817%,0% 97.183%,0% 97.183%,0.046% 97.64%,0.179% 98.073%,0.392% 98.478%,0.677% 98.847%,1.028% 99.175%,1.437% 99.457%,1.896% 99.686%,2.4% 99.856%,2.94% 99.963%,3.509% 100%,96.491% 100%,96.491% 100%,97.06% 99.963%,97.6% 99.856%,98.104% 99.686%,98.563% 99.457%,98.972% 99.175%,99.323% 98.847%,99.608% 98.478%,99.821% 98.073%,99.954% 97.64%,100% 97.183%,100% 12.207%,100% 12.207%,99.954% 11.75%,99.821% 11.316%,99.608% 10.912%,99.323% 10.543%,98.972% 10.215%,98.563% 9.933%,98.104% 9.704%,97.6% 9.533%,97.06% 9.427%,96.491% 9.39%,65.701% 9.39%,65.701% 9.39%,65.24% 9.365%,64.795% 9.294%,64.369% 9.179%,63.969% 9.022%,63.597% 8.827%,63.259% 8.596%,62.96% 8.331%,62.702% 8.036%,62.492% 7.713%,62.334% 7.364%,60.388% 2.026%)",
        }}>
            {isDesktop && (<PanelDemo ref={desktopDemoRef} onFocusClick={handleDesktopFocus} focusActive={heroFocusMode} onUserTogglePause={(willBePaused) => {
            trackDemoInteracted();
            trackEvent(willBePaused ? AE.HomePage_Demo_Paused : AE.HomePage_Demo_Continue);
        }} onUserSceneSelect={(i) => {
            trackDemoInteracted();
            const ev = SCENE_NAV_EVENTS[i];
            if (ev !== undefined)
                trackEvent(ev);
        }} onSceneReachedEnd={(i) => {
            const ev = SCENE_REACHED_END_EVENTS[i];
            if (ev !== undefined)
                trackEvent(ev);
        }}/>)}
          </motion.div>

          {/* Top-right: waitlist CTA — hidden in focus mode */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: heroFocusMode ? 0 : 1, y: heroFocusMode ? -10 : 0, pointerEvents: heroFocusMode ? "none" : "auto" }} transition={{ duration: 0.3, ease: "easeInOut" }} className="absolute right-[50px] top-[35px] z-40 flex items-center gap-3">
            <WaitlistButton />
            <motion.button whileHover={{ scale: 1.08, boxShadow: "0 6px 20px rgba(1,103,140,0.5)" }} whileTap={{ scale: 0.93, rotate: -30 }} aria-label={heroContent.controls.replayAria} onClick={() => {
            desktopDemoRef.current?.goToScene(0);
            trackDemoInteracted();
            trackEvent(AE.HomePage_Demo_Replayed);
        }} style={{
            width: 36,
            height: 36,
            flexShrink: 0,
            background: "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)",
            boxShadow: "0 4px 14px rgba(1,103,140,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
        }} className="flex cursor-pointer items-center justify-center rounded-full">
              <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
        </div>{/* end inner max-width shell */}
      </div>

      {/* ═══════════════════════════════════════════════════════
            MOBILE HERO — two stacked sections
            ═══════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:hidden">

        {/* ── Section 1: Text / CTA ── */}
        <div className="relative flex flex-col overflow-hidden">
          {/* Background */}
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-30"/>
          <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, var(--color-background) 100%)",
        }}/>

          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(ellipse 60% 40% at 30% 20%, rgba(1,103,140,0.08), transparent 70%), radial-gradient(ellipse 50% 35% at 70% 70%, rgba(6,214,160,0.05), transparent 70%)",
        }}/>

          {/* Content */}
          <div className="relative z-10 flex flex-col px-6 pt-[84px] pb-8 sm:px-8">
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.58, ease: "easeOut" }} className="text-[clamp(2.2rem,8vw,3.2rem)] font-bold leading-[1.08] tracking-tight text-foreground">
              {heroContent.title.lines[0]}
              <br />
              {heroContent.title.lines[1]}
              <br />
              <span className="text-primary">{heroContent.title.highlight}</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.8, ease: "easeOut" }} className="mt-5 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
              {heroContent.description.mobile}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.05, ease: "easeOut" }} className="mt-7 flex w-full flex-col items-start gap-[clamp(8px,2.4vw,12px)]">
              {/* Get Started — mobile */}
              <button onClick={() => navigate("/form-new")} className="relative inline-flex w-fit max-w-full cursor-pointer select-none items-center gap-[clamp(4px,1.3vw,7px)] overflow-hidden rounded-full px-[clamp(8px,2.1vw,11px)] active:opacity-80" style={{
            height: 40,
            background: "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)",
            boxShadow: "0 4px 14px rgba(1,103,140,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}>
                <span className="relative z-10 whitespace-nowrap text-[clamp(8.4px,2.5vw,10px)] font-bold uppercase tracking-[0.04em] text-white">
                  {heroContent.ctas.primary}
                </span>
                <span className="relative z-10 flex h-[clamp(24px,6.4vw,28px)] w-[clamp(24px,6.4vw,28px)] shrink-0 items-center justify-center rounded-full bg-white/20" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)" }}>
                  <svg className="h-[clamp(9px,2.6vw,12px)] w-[clamp(9px,2.6vw,12px)] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </span>
              </button>

              {/* See How It Works — mobile */}
              <Link to={howItWorksHref} className="relative inline-flex w-fit max-w-full cursor-pointer select-none items-center gap-[clamp(4px,1.3vw,7px)] overflow-hidden rounded-full border border-slate-200 bg-white px-[clamp(8px,2.1vw,11px)] active:opacity-80" style={{ height: 40 }}>
                <span className="relative z-10 whitespace-nowrap text-[clamp(8.4px,2.5vw,10px)] font-bold uppercase tracking-[0.04em] text-slate-800">
                  {heroContent.ctas.secondary}
                </span>
                <span className="relative z-10 flex h-[clamp(24px,6.4vw,28px)] w-[clamp(24px,6.4vw,28px)] shrink-0 items-center justify-center rounded-full bg-slate-100">
                  <svg className="h-[clamp(9px,2.6vw,12px)] w-[clamp(9px,2.6vw,12px)] text-slate-700" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.14v14l11-7-11-7z"/>
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Section 2: Platform Demo ── */}
        <div ref={mobileDemoSectionRef} className="relative flex min-h-svh flex-col overflow-hidden">
          {/* Background */}
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-20"/>

          {/* Pause + scene pill bar — aligned with demo container edges */}
          <motion.div initial={{ opacity: 0, y: 14, scale: 0.96 }} animate={chromeReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.96 }} transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 grid grid-cols-[38px_minmax(0,1fr)] items-center gap-[clamp(4px,2vw,10px)] px-2 pt-6 pb-3 sm:px-3" style={{ pointerEvents: chromeReady ? "auto" : "none" }}>
            {/* Pause / Play */}
            <button onClick={() => {
            demoRef.current?.togglePause();
            trackDemoInteracted();
            trackEvent(mobilePaused ? AE.HomePage_Demo_Continue : AE.HomePage_Demo_Paused);
        }} aria-label={mobilePaused ? heroContent.controls.resumeAria : heroContent.controls.pauseAria} className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border backdrop-blur-xl transition-all active:scale-95 ${lightTheme
            ? "border-white/60 bg-white/48 shadow-[0_6px_18px_rgba(15,23,42,0.16)] active:bg-white/88"
            : "border-border bg-surface/90 shadow-sm active:bg-surface-light"}`}>
              {mobilePaused ? (<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="ml-0.5 text-foreground/70">
                  <path d="M2.5 1.2L10.5 6L2.5 10.8V1.2Z"/>
                </svg>) : (<svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" className="text-foreground/70">
                  <rect x="0.5" y="0.5" width="3" height="11" rx="0.8"/>
                  <rect x="6.5" y="0.5" width="3" height="11" rx="0.8"/>
                </svg>)}
            </button>

            {/* Pill nav — locked during prologue (no active pill, not clickable) */}
            <DemoLiquidPillNav labels={SCENE_LABELS} activeIndex={chromeReady ? mobileScene : -1} onSelect={(i) => {
            if (!chromeReady)
                return;
            demoRef.current?.goToScene(i);
            trackDemoInteracted();
            const ev = SCENE_NAV_EVENTS[i];
            if (ev !== undefined)
                trackEvent(ev);
        }} shellClassName={`relative z-10 flex min-w-0 items-center justify-between gap-0.5 rounded-full border p-[clamp(4px,1.6vw,7px)] backdrop-blur-xl ${lightTheme
            ? "border-white/60 bg-white/58 shadow-[0_6px_18px_rgba(15,23,42,0.14)]"
            : "border-border bg-surface/90 shadow-sm"}`} getButtonClassName={(_, active) => `relative z-10 rounded-full px-[clamp(6px,2.2vw,12px)] py-[5px] text-[clamp(8px,2.5vw,10px)] font-medium transition-colors ${chromeReady && active
            ? "text-white"
            : "text-foreground/55"} ${chromeReady ? "cursor-pointer" : "cursor-default"}`}/>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={chromeReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.96 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 px-3 pb-2 sm:px-4">
            <div className="pointer-events-none h-[3px] overflow-hidden rounded-full bg-primary/20">
              <div className="h-full bg-primary transition-none" style={{ width: `${mobileProgress}%` }}/>
            </div>
          </motion.div>

          {/* Demo container */}
          <div className="relative z-10 flex flex-1 items-stretch px-2 pb-0 sm:px-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, ease: "easeOut" }} className="relative w-full overflow-hidden rounded-2xl border border-border/30" style={{ boxShadow: "0 2px 10px rgba(15,23,42,0.06)" }}>
              {!isDesktop && (<PanelDemo ref={demoRef} hideSceneControls mobile onSceneChange={setMobileScene} onPauseChange={setMobilePaused} onProgressChange={setMobileProgress} onSceneReachedEnd={(i) => {
            const ev = SCENE_REACHED_END_EVENTS[i];
            if (ev !== undefined)
                trackEvent(ev);
        }}/>)}
            </motion.div>
          </div>
        </div>
      </div>
    </>);
}
