import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import LangToggle from "./LangToggle";
import WaitlistButton from "./WaitlistButton";
import { getNavbarContent, getFooterContent } from "./content";
import logo from "../assets/images/logos.png";
const NAV_MOBILE_MAX_WIDTH = 1024;
const NAV_HREFS = ["/sample-reports", "/why-second-opinion", "/contact"];
export default function Navbar() {
    const nav = getNavbarContent();
    const footer = getFooterContent();
    const relativePath = useLocation().pathname || "/";
    const navLinks = NAV_HREFS.map((href, i) => ({
        name: nav.links[i] ?? "",
        href,
    }));
    const [scrolled, setScrolled] = useState(false);
    const [showOnHome, setShowOnHome] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [menuLockPad, setMenuLockPad] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [focusMode, setFocusMode] = useState(false);
    useEffect(() => {
        const onFocus = (e) => {
            setFocusMode(!!e.detail);
        };
        window.addEventListener("admino:focus-mode", onFocus);
        return () => window.removeEventListener("admino:focus-mode", onFocus);
    }, []);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < NAV_MOBILE_MAX_WIDTH);
        checkMobile();
        window.addEventListener("resize", checkMobile, { passive: true });
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 10);
            // "Home" page is /<locale> (no trailing slug)
            if (relativePath === "/")
                setShowOnHome(y > 90);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [relativePath]);
    // Lock scroll when the drawer is open, and reserve scrollbar width so fixed
    // controls (early access / theme) do not shift sideways.
    useEffect(() => {
        if (!mobileOpen) {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
            setMenuLockPad(0);
            return;
        }
        const sbw = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
        document.body.style.overflow = "hidden";
        if (sbw > 0) {
            document.body.style.paddingRight = `${sbw}px`;
            setMenuLockPad(sbw);
        }
        else {
            document.body.style.paddingRight = "";
            setMenuLockPad(0);
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
            setMenuLockPad(0);
        };
    }, [mobileOpen]);
    // On mobile: always show (Hero's inline nav is hidden on mobile)
    // On desktop: show on all pages except home until scrolled
    const shouldShowNavbar = (relativePath !== "/" || showOnHome || isMobile) && !focusMode;
    useEffect(() => {
        if (!shouldShowNavbar)
            setMobileOpen(false);
    }, [shouldShowNavbar]);
    return (<>
      <AnimatePresence>
        {shouldShowNavbar && (<motion.div className="fixed top-0 left-0 right-0 z-50" style={{ paddingRight: menuLockPad }} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 26 }} transition={{ duration: 0.35, ease: "easeOut" }}>
            {/* Non-scroll state: full-width straight line */}
            <motion.div className="pointer-events-none absolute inset-x-0 top-14 border-b border-border/45" animate={{ opacity: scrolled ? 0 : 1 }} transition={{ duration: 0.28, ease: "easeOut" }}/>

            <motion.div className="relative flex justify-center px-1.5 md:px-4" animate={{ paddingTop: scrolled ? 16 : 0 }} transition={{ paddingTop: { type: "spring", stiffness: 220, damping: 30 } }}>
              <nav className="relative grid h-14 w-full max-w-3xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-[clamp(4px,0.8vw,12px)] px-1.5 md:px-3">
                {/* Scroll state: floating capsule background layer */}
                <motion.div className="pointer-events-none absolute inset-0 rounded-full border border-border/70 shadow-lg shadow-black/15 backdrop-blur-3xl" style={{
                background: "var(--nav-bg-scroll)",
                backdropFilter: "blur(26px) saturate(175%)",
                WebkitBackdropFilter: "blur(26px) saturate(175%)",
            }} animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.985 }} transition={{
                opacity: { duration: 0.32, ease: "easeOut" },
                scale: { type: "spring", stiffness: 260, damping: 30 },
            }}/>

              {/* Logo */}
              <Link to="/" className="relative z-10 col-start-1 flex shrink-0 items-center pl-0 md:pl-1">
                <img src={logo} alt={nav.logoAlt} className="h-[clamp(28px,3.2vw,36px)] w-auto object-contain"/>
              </Link>

              {/* Desktop nav links */}
              <div className="relative z-10 col-start-2 hidden min-w-0 items-center justify-center gap-[clamp(0px,0.15vw,2px)] overflow-hidden lg:flex">
                {navLinks.map((link, i) => {
                const slug = NAV_HREFS[i];
                const isActive = slug === "/"
                    ? relativePath === "/"
                    : relativePath.startsWith(slug);
                return (<Link key={link.name} to={link.href} className={`shrink-0 rounded-full px-[clamp(5px,0.75vw,12px)] py-1.5 text-[clamp(10.5px,0.82vw,13px)] font-medium whitespace-nowrap transition-colors ${isActive
                        ? "bg-primary/8 text-primary"
                        : "text-foreground/70 hover:bg-foreground/6 hover:text-foreground"}`}>
                      {link.name}
                    </Link>);
            })}
              </div>

              {/* Desktop right */}
              <div className="relative z-10 col-start-3 hidden shrink-0 items-center justify-end gap-[clamp(4px,0.5vw,8px)] lg:flex">
                <LangToggle size="sm"/>
                <WaitlistButton size="sm"/>
              </div>

              {/* Mobile: early access + language + hamburger (same controls also appear in the slide-over menu) */}
              <div className="relative z-10 col-start-3 flex items-center justify-end gap-1.5 lg:hidden">
                <WaitlistButton size="sm"/>
                <LangToggle size="sm"/>
                <button onClick={() => setMobileOpen(!mobileOpen)} className="flex h-9 w-9 flex-col items-center justify-center gap-[4.5px] rounded-full border border-border/40 bg-surface/60 active:bg-surface" aria-label={nav.menuToggleAria}>
                  <span className={`block h-[1.5px] w-[14px] rounded-full bg-foreground transition-all duration-300 ${mobileOpen ? "translate-y-[6px] rotate-45" : ""}`}/>
                  <span className={`block h-[1.5px] w-[14px] rounded-full bg-foreground transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`}/>
                  <span className={`block h-[1.5px] w-[14px] rounded-full bg-foreground transition-all duration-300 ${mobileOpen ? "-translate-y-[6px] -rotate-45" : ""}`}/>
                </button>
              </div>
              </nav>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (<motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22, ease: "easeOut" }} className="fixed inset-0 z-40 lg:hidden" style={{
                background: "var(--nav-bg-scroll)",
                backdropFilter: "blur(30px) saturate(170%)",
                WebkitBackdropFilter: "blur(30px) saturate(170%)",
            }}>
            {/* Top edge gradient */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/60 to-transparent"/>

            <div className="flex h-full flex-col overflow-y-auto px-5 pt-[88px] pb-8">
              {/* Nav links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                const slug = NAV_HREFS[i];
                const isActive = slug === "/"
                    ? relativePath === "/"
                    : relativePath.startsWith(slug);
                return (<motion.div key={link.name} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.06, ease: "easeOut" }}>
                      <Link to={link.href} onClick={() => setMobileOpen(false)} className={`flex items-center rounded-2xl px-4 py-4 text-[20px] font-semibold tracking-tight transition-colors ${isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 active:bg-foreground/6"}`}>
                        {link.name}
                      </Link>
                    </motion.div>);
            })}
              </nav>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }} className="relative mt-[clamp(14px,3.5svh,22px)] rounded-2xl border border-border/55 bg-surface/50 p-[clamp(12px,3.5vw,16px)] shadow-[0_14px_44px_-14px_rgba(0,0,0,0.5)]" style={{
                backdropFilter: "blur(20px) saturate(160%)",
                WebkitBackdropFilter: "blur(20px) saturate(160%)",
            }}>
                <div className="flex flex-col gap-[clamp(10px,3vw,14px)]">
                  <div className="flex min-h-[44px] min-w-0 items-center">
                    <WaitlistButton size="md" fullWidth onClick={() => {
                setMobileOpen(false);
            }}/>
                  </div>
                  <a href={`mailto:${footer.email}`} onClick={() => setMobileOpen(false)} className="flex h-10 w-full min-w-0 items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-surface/85 px-[clamp(8px,2.5vw,12px)] text-[clamp(11px,3.2vw,13px)] font-semibold leading-tight text-foreground/90 shadow-sm transition-colors active:bg-surface-light">
                    <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                    </svg>
                    <span className="min-w-0 truncate">{nav.mailUsCta}</span>
                  </a>
                </div>
              </motion.div>

              {/* Bottom fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/40 to-transparent"/>
            </div>
          </motion.div>)}
      </AnimatePresence>

    </>);
}
