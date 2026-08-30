import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Repurposed from the original Light/Dark theme toggle: identical pill
// shape, gradient background swap, and sliding-circle animation — but the
// circle is now fully covered by a flag (EN/TR) instead of a sun/moon icon,
// and the labels read EN/TR instead of LIGHT/DARK. This only toggles local
// UI state for now; wire it up to real i18n content switching later.
const FLAGS = {
  en: "https://flagcdn.com/w80/gb.png",
  tr: "https://flagcdn.com/w80/tr.png",
};

export default function LangToggle({ size = "md" }) {
  const [lang, setLang] = useState("en");
  const isEn = lang === "en";
  const toggle = () => setLang(isEn ? "tr" : "en");
  const sm = size === "sm";

  return (
    <motion.button
      onClick={toggle}
      aria-label={isEn ? "Switch to Turkish" : "İngilizceye geç"}
      style={{
        width: sm ? 78 : 100,
        height: sm ? 28 : 36,
        flexShrink: 0,
        background: "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)",
        boxShadow: "0 4px 14px rgba(1,103,140,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
      }}
      className={`relative flex cursor-pointer items-center justify-between overflow-hidden rounded-full select-none ${
        sm ? "pl-2 pr-1" : "pl-2.5 pr-1.5"
      }`}
    >
      {/* Label */}
      <div
        className={`relative z-10 grid overflow-hidden whitespace-nowrap font-bold uppercase tracking-wide text-white ${sm ? "text-[8px]" : "text-[9.5px]"}`}
        style={{ width: sm ? 40 : 52, flexShrink: 0 }}
      >
        <AnimatePresence mode="sync">
          <motion.span
            key={isEn ? "en" : "tr"}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.2 }}
            className="col-start-1 row-start-1 block"
          >
            {isEn ? "EN" : "TR"}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Icon circle — fully covered by the active flag */}
      <motion.div
        initial={false}
        animate={{
          background: isEn ? "rgba(255,255,255,0.92)" : "rgba(15,23,42,0.95)",
          boxShadow: isEn
            ? "0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)"
            : "0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
        transition={{ duration: 0.35 }}
        className={`relative z-10 shrink-0 overflow-hidden rounded-full ${sm ? "h-[22px] w-[22px]" : "h-7 w-7"}`}
      >
        <AnimatePresence mode="wait">
          {isEn ? (
            <motion.span
              key="en-flag"
              initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img src={FLAGS.en} alt="EN" className="h-full w-full object-cover" />
            </motion.span>
          ) : (
            <motion.span
              key="tr-flag"
              initial={{ opacity: 0, rotate: 30, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -30, scale: 0.7 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={FLAGS.tr}
                alt="TR"
                className="h-full w-full object-cover"
                style={{ objectPosition: "calc(50% + 5px) 50%" }}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
