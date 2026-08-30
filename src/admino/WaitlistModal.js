import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EarlyAccessContent from "./EarlyAccessContent";
import { getWaitlistContent } from "./content";
import { trackEvent, AE } from "./lib";
export default function WaitlistModal({ open, onClose }) {
    const waitlist = getWaitlistContent();
    const emailInputRef = useRef(null);
    const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches);
    // Track form open event once per open.
    useEffect(() => {
        if (open)
            trackEvent(AE.General_GetEarlyAccessFormOpened);
    }, [open]);
    // Lock page scroll while open.
    useEffect(() => {
        if (typeof window === "undefined" || !open)
            return;
        const { body, documentElement } = document;
        const prevBodyOverflow = body.style.overflow;
        const prevHtmlOverflow = documentElement.style.overflow;
        const prevBodyOverscroll = body.style.overscrollBehavior;
        const prevHtmlOverscroll = documentElement.style.overscrollBehavior;
        body.style.overflow = "hidden";
        documentElement.style.overflow = "hidden";
        body.style.overscrollBehavior = "none";
        documentElement.style.overscrollBehavior = "none";
        return () => {
            body.style.overflow = prevBodyOverflow;
            documentElement.style.overflow = prevHtmlOverflow;
            body.style.overscrollBehavior = prevBodyOverscroll;
            documentElement.style.overscrollBehavior = prevHtmlOverscroll;
        };
    }, [open]);
    // Prevent iOS auto-focus / scroll jump when overlay mounts.
    useEffect(() => {
        if (!open || typeof window === "undefined")
            return;
        const id = window.setTimeout(() => {
            if (document.activeElement === emailInputRef.current) {
                emailInputRef.current?.blur();
            }
        }, 0);
        return () => window.clearTimeout(id);
    }, [open]);
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        const mq = window.matchMedia("(max-width: 639px)");
        const update = () => setIsMobile(mq.matches);
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);
    const sheetVariants = isMobile
        ? {
            initial: { y: "100%" },
            animate: { y: 0 },
            exit: { y: "100%" },
        }
        : {
            initial: { opacity: 0, scale: 0.93, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.95, y: 10 },
        };
    return (<AnimatePresence>
      {open && (<>
          {/* backdrop */}
          <motion.div key="backdrop" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.82, ease: [0.42, 1, 0.56, 1] }} onClick={onClose}/>

          {/* modal wrapper (click outside closes) */}
          <div key="modal" className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:px-4 sm:py-6" onClick={onClose}>
            <motion.div className="relative flex h-[min(88svh,640px)] w-full flex-col overflow-hidden rounded-t-3xl border border-border bg-surface shadow-2xl shadow-black/30 sm:h-auto sm:max-h-[90vh] sm:max-w-xl sm:rounded-3xl" initial={sheetVariants.initial} animate={sheetVariants.animate} exit={sheetVariants.exit} transition={isMobile
                ? { type: "tween", duration: 0.46, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }} style={{ willChange: "transform, opacity", transform: "translateZ(0)" }} onClick={(e) => e.stopPropagation()}>
              {/* mobile drag handle */}
              <div className="flex shrink-0 justify-center pt-2.5 sm:hidden">
                <div className="h-1 w-10 rounded-full bg-muted/30"/>
              </div>
              {/* gradient top glow */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"/>
              <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl"/>

              {/* close button (always pinned) */}
              <button onClick={onClose} className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-surface-light/70 text-muted/70 backdrop-blur transition-colors hover:bg-surface-light hover:text-foreground sm:right-4 sm:top-4 sm:bg-transparent sm:backdrop-blur-0" aria-label={waitlist.closeAria}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              <div className="flex-1 overflow-y-auto overflow-x-hidden px-[clamp(16px,4.5vw,24px)] py-[clamp(14px,3.8svh,24px)] pt-[clamp(14px,3svh,20px)] sm:p-8">
                <EarlyAccessContent resetSignal={open} emailInputRef={emailInputRef}/>
              </div>
            </motion.div>
          </div>
        </>)}
    </AnimatePresence>);
}
