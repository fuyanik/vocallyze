import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getNavbarContent } from "./content";
export default function WaitlistButton({ size = "md", fullWidth = false, 
onClick, }) {
    const navigate = useNavigate();
    const sm = size === "sm";
    const nav = getNavbarContent();
    const btnWidth = fullWidth ? "100%" : sm ? 134 : 154;
    return (<>
      <motion.button onClick={() => {
            onClick?.();
            navigate("/form-new");
        }} whileHover={{ scale: fullWidth ? 1 : 1.03, boxShadow: "0 6px 20px rgba(1,103,140,0.5)" }} whileTap={{ scale: fullWidth ? 1 : 0.97 }} style={{
            width: btnWidth,
            maxWidth: fullWidth ? "100%" : undefined,
            height: sm ? 28 : 36,
            flexShrink: 0,
            background: "linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)",
            boxShadow: "0 4px 14px rgba(1,103,140,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
        }} className={`relative flex min-w-0 cursor-pointer items-center overflow-hidden rounded-full select-none ${fullWidth ? "w-full justify-between px-3" : sm ? "px-1.5" : "px-2"}`}>
        {/* Label */}
        <div className={`relative z-10 flex-1 overflow-hidden whitespace-nowrap text-center font-bold uppercase tracking-wide text-white ${sm ? "text-[8px]" : "text-[9.5px]"}`} style={{ minWidth: 0 }}>
          {nav.waitlistCta}
        </div>

        {/* Icon circle */}
        <div className={`relative z-10 ml-auto shrink-0 rounded-full bg-white/20 flex items-center justify-center ${sm ? "h-[22px] w-[22px]" : "h-7 w-7"}`} style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)" }}>
          {/* Bell icon */}
          <svg className={sm ? "h-3 w-3 text-white" : "h-3.5 w-3.5 text-white"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </div>
      </motion.button>

    </>);
}
