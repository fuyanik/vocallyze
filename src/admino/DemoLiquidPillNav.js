import { useCallback, useLayoutEffect, useRef, useState, } from "react";
import { motion, useReducedMotion } from "framer-motion";
/**
 * Measured sliding “liquid” pill for demo scene tabs.
 * Replaces layoutId-based motion so the highlight tracks the actual tab geometry
 * (avoids wrong origin / stretch when switching between uneven-width labels).
 */
export function DemoLiquidPillNav({ labels, activeIndex, onSelect, shellClassName, shellStyle, getButtonClassName, }) {
    const containerRef = useRef(null);
    const btnRefs = useRef([]);
    const [box, setBox] = useState({ left: 0, top: 0, width: 0, height: 0 });
    const reduceMotion = useReducedMotion();
    const measure = useCallback(() => {
        const btn = btnRefs.current[activeIndex];
        if (!btn)
            return;
        setBox({
            left: btn.offsetLeft,
            top: btn.offsetTop,
            width: btn.offsetWidth,
            height: btn.offsetHeight,
        });
    }, [activeIndex]);
    useLayoutEffect(() => {
        btnRefs.current = btnRefs.current.slice(0, labels.length);
    }, [labels.length]);
    useLayoutEffect(() => {
        measure();
    }, [measure, labels]);
    useLayoutEffect(() => {
        const c = containerRef.current;
        if (!c)
            return;
        const ro = new ResizeObserver(() => measure());
        ro.observe(c);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [measure]);
    useLayoutEffect(() => {
        const id = requestAnimationFrame(() => {
            requestAnimationFrame(measure);
        });
        return () => cancelAnimationFrame(id);
    }, [activeIndex, measure]);
    const transition = reduceMotion
        ? { duration: 0 }
        : { type: "tween", duration: 0.22, ease: [0.25, 0.1, 0.25, 1] };
    return (<div ref={containerRef} className={shellClassName} style={shellStyle}>
      {box.width > 0 ? (<motion.div aria-hidden className="pointer-events-none absolute z-0 rounded-full" style={{
                background: "var(--demo-liquid-pill-active-bg)",
                boxShadow: "0 8px 22px var(--demo-liquid-active-shadow)",
            }} initial={false} animate={{
                left: box.left,
                top: box.top,
                width: box.width,
                height: box.height,
            }} transition={transition}/>) : null}
      {labels.map((label, i) => (<button key={`${i}-${label}`} type="button" ref={(el) => {
                btnRefs.current[i] = el;
            }} data-demo-pill-selected={i === activeIndex ? "true" : undefined} onClick={() => onSelect(i)} className={getButtonClassName(i, i === activeIndex)}>
          <span className="relative z-10 whitespace-nowrap">{label}</span>
        </button>))}
    </div>);
}
