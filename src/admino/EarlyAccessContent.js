import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getEarlyAccessContent } from "./content";
import { isLightTheme, useTheme } from "./ThemeProvider";
import { submitForm, isValidEmail, MODULE_ENUM, trackEvent, AE } from "./lib";
const MODULES_UI = [
    {
        accent: "text-violet-400",
        icon: (<>
        <path d="M12 3l1.8 4.6L18.4 9.4 13.8 11.2 12 15.8 10.2 11.2 5.6 9.4l4.6-1.8L12 3z"/>
        <path d="M19 14l.9 2.1 2.1.9-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14z"/>
      </>),
    },
    {
        accent: "text-sky-400",
        icon: (<>
        <path d="M4 5h10"/>
        <path d="M9 3v2"/>
        <path d="M4 9c0 4 3 7 7 7"/>
        <path d="M14 5c0 4-3 7-7 7"/>
        <path d="M12 20l4-9 4 9"/>
        <path d="M13.5 17h5"/>
      </>),
    },
    {
        accent: "text-amber-400",
        icon: (<>
        <path d="M2 9l10-4 10 4-10 4L2 9z"/>
        <path d="M6 11v4.5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V11"/>
        <path d="M22 9v5"/>
      </>),
    },
    {
        accent: "text-emerald-400",
        icon: (<>
        <path d="M6 3l-3 4v12a2 2 0 002 2h14a2 2 0 002-2V7l-3-4H6z"/>
        <path d="M3 7h18"/>
        <path d="M16 11a4 4 0 01-8 0"/>
      </>),
    },
    {
        accent: "text-rose-400",
        icon: (<>
        <path d="M3 3v18h18"/>
        <path d="M7 15l4-4 3 3 5-6"/>
        <path d="M14 8h5v5"/>
      </>),
    },
    {
        accent: "text-fuchsia-400",
        icon: (<>
        <path d="M12 3v3"/>
        <path d="M6 8h12a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2z"/>
        <path d="M2 13v3"/>
        <path d="M22 13v3"/>
        <path d="M9 13v1"/>
        <path d="M15 13v1"/>
      </>),
    },
    {
        accent: "text-cyan-400",
        icon: (<>
        <path d="M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>
        <path d="M16 3v4"/>
        <path d="M8 3v4"/>
        <path d="M3 11h18"/>
        <path d="M9 16l2 2 4-4"/>
      </>),
    },
    {
        accent: "text-indigo-400",
        icon: (<>
        <path d="M17 3l4 4-4 4"/>
        <path d="M3 11V9a4 4 0 014-4h14"/>
        <path d="M7 21l-4-4 4-4"/>
        <path d="M21 13v2a4 4 0 01-4 4H3"/>
      </>),
    },
];
export default function EarlyAccessContent({ resetSignal, className = "", emailInputRef, wide = false, }) {
    const t = getEarlyAccessContent();
    const MODULES = MODULES_UI.map((ui, i) => ({
        ...ui,
        name: t.modules.names[i] ?? "",
    }));
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(new Set([0]));
    const [emailError, setEmailError] = useState(false); // true olunca email input kırmızıya döner
    const [formError, setFormError] = useState(""); // sunucu/network hata mesajı
    const internalRef = useRef(null);
    const inputRef = emailInputRef ?? internalRef;
    const { theme } = useTheme();
    const isLight = isLightTheme(theme);
    const emailInputTextColor = isLight
        ? "var(--color-foreground)"
        : "var(--color-background)";
    const emailInputStyle = {
        color: emailInputTextColor,
        WebkitTextFillColor: emailInputTextColor,
    };
    const successBadgeBackground = isLight
        ? "radial-gradient(ellipse at 0% 50%, rgba(59, 130, 246, 0.16) 0%, transparent 62%), radial-gradient(ellipse at 100% 50%, rgba(59, 130, 246, 0.12) 0%, transparent 62%), rgba(59, 130, 246, 0.05)"
        : "radial-gradient(ellipse at 0% 50%, rgba(180, 215, 255, 0.13) 0%, transparent 62%), radial-gradient(ellipse at 100% 50%, rgba(160, 200, 255, 0.10) 0%, transparent 62%), rgba(59, 130, 246, 0.06)";
    useEffect(() => {
        setEmail("");
        setSubmitted(false);
        setLoading(false);
        setSelected(new Set([0]));
        setEmailError(false);
        setFormError("");
    }, [resetSignal]);
    const toggleModule = (idx) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(idx))
                next.delete(idx);
            else
                next.add(idx);
            return next;
        });
    };
    const allModulesSelected = MODULES.length > 0 && selected.size === MODULES.length;
    const toggleSelectAll = () => {
        setSelected((prev) => {
            if (MODULES.length === 0)
                return prev;
            if (prev.size === MODULES.length)
                return new Set();
            return new Set(MODULES.map((_, i) => i));
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        if (!isValidEmail(email)) {
            setEmailError(true);
            return;
        }
        // selected_modules: seçilen modüllerin backend enum integer listesi
        // Array olarak geçiyoruz — api.ts içinde JSON.stringify("[1,3,5]") stringine çeviriliyor
        const selected_modules = [...selected].map((i) => MODULE_ENUM[i] ?? i + 1);
        setLoading(true);
        const result = await submitForm("survey", { email: email.trim(), selected_modules });
        setLoading(false);
        if (result.success) {
            trackEvent(AE.General_GetEarlyAccessFormSent);
            setSubmitted(true);
        }
        else {
            setFormError(result.error);
        }
    };
    return (<div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {!submitted ? (<motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            {/* rocket icon + heading */}
            <div className="flex items-center gap-[clamp(10px,3vw,12px)]">
              <div className="flex h-[clamp(40px,11vw,48px)] w-[clamp(40px,11vw,48px)] shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <svg className="h-[clamp(20px,5.5vw,24px)] w-[clamp(20px,5.5vw,24px)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                </svg>
              </div>
              <h2 className="text-[clamp(20px,6vw,24px)] font-bold leading-tight text-foreground">
                {t.heading}
              </h2>
            </div>

            {/* description */}
            <p className="mt-[clamp(10px,2.7svh,16px)] text-[clamp(12.5px,3.6vw,14px)] leading-relaxed text-muted">
              {t.description}
            </p>

            {/* module question */}
            <div className="mt-[clamp(16px,3.8svh,24px)]">
              <div className="flex items-baseline justify-between gap-3">
                <label className="block text-[13px] font-semibold text-foreground">
                  {t.modules.question}
                </label>
                <span className="text-[11px] font-medium text-muted/60">{t.modules.optional}</span>
              </div>
              <p className="mt-1 text-[clamp(11px,3vw,12px)] text-muted/70">
                {t.modules.hint}
              </p>

              <div className={`mt-[clamp(8px,2.2svh,12px)] grid grid-cols-2 gap-[clamp(6px,2vw,8px)] ${wide ? "md:grid-cols-4" : ""}`}>
                {MODULES.map((mod, idx) => {
                const isActive = selected.has(idx);
                return (<button key={mod.name} type="button" onClick={() => toggleModule(idx)} aria-pressed={isActive} className={`group relative flex min-w-0 items-center gap-[clamp(7px,2vw,10px)] overflow-hidden rounded-xl border px-[clamp(8px,2.4vw,10px)] py-[clamp(7px,1.9svh,8px)] text-left transition-all ${isActive
                        ? "border-primary/60 bg-primary/10 shadow-[0_6px_18px_-6px_rgba(37,99,235,0.45),0_0_0_1px_rgba(99,102,241,0.25)]"
                        : "border-border/70 bg-surface shadow-[0_4px_14px_-6px_rgba(0,0,0,0.45)] hover:-translate-y-[1px] hover:border-border hover:bg-surface-light hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.55)]"}`}>
                      {/* decorative oversized icon glow in background */}
                      <svg className={`pointer-events-none absolute -right-3 -top-3 h-16 w-16 transition-all ${isActive
                        ? `${mod.accent} opacity-30`
                        : `${mod.accent} opacity-15 group-hover:opacity-25`}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
                        {mod.icon}
                      </svg>

                      {/* colored icon badge */}
                      <span className={`relative z-10 flex h-[clamp(24px,7vw,28px)] w-[clamp(24px,7vw,28px)] shrink-0 items-center justify-center rounded-lg transition-all ${isActive
                        ? `${mod.accent} bg-white/[0.06]`
                        : `${mod.accent} bg-white/[0.03] opacity-80 group-hover:opacity-100`}`}>
                        <svg className="h-[clamp(14px,4vw,16px)] w-[clamp(14px,4vw,16px)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                          {mod.icon}
                        </svg>
                      </span>

                      {/* module name */}
                      <span className={`relative z-10 min-w-0 flex-1 text-[clamp(10.5px,3vw,11.5px)] font-medium leading-tight tracking-tight ${isActive ? "text-foreground" : "text-foreground/80"}`}>
                        {mod.name}
                      </span>

                      {/* checkbox indicator (always visible for affordance) */}
                      <span className={`relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border transition-all ${isActive
                        ? "border-primary bg-primary text-white"
                        : "border-muted/40 bg-transparent group-hover:border-muted/70"}`}>
                        <svg className={`h-3 w-3 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      </span>
                    </button>);
            })}
              </div>

              <div className="mt-[clamp(6px,1.6svh,10px)]">
                <button type="button" onClick={toggleSelectAll} aria-pressed={allModulesSelected} className="cursor-pointer text-left text-[clamp(11px,3vw,12px)] font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary-light">
                  {allModulesSelected ? t.modules.deselectAll : t.modules.selectAll}
                </button>
              </div>
            </div>

            {/* form */}
            <form onSubmit={handleSubmit} className="mt-[clamp(16px,3.8svh,24px)]">
              <div className="flex items-baseline justify-between gap-3">
                <label className="block text-[13px] font-semibold text-foreground">
                  {t.email.label}
                </label>
                <span className="text-[11px] font-medium text-primary">{t.email.requiredLabel}</span>
              </div>
              <div className="mt-2 flex gap-[clamp(6px,2vw,8px)]">
                <input ref={inputRef} type="email" required value={email} onChange={(e) => {
                setEmail(e.target.value);
                if (emailError)
                    setEmailError(false);
            }} placeholder={t.email.placeholder} style={emailInputStyle} className={`min-w-0 flex-1 rounded-xl border px-[clamp(12px,3.6vw,16px)] py-[clamp(10px,2.8svh,12px)] text-base outline-none transition-all placeholder:text-muted placeholder:opacity-60 sm:text-[14px] ${emailError
                ? "border-red-500 ring-2 ring-red-500/20 focus:border-red-500 focus:ring-red-500/20"
                : `border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/15 ${isLight ? "bg-white/30 focus:bg-white/45" : "border-border/50 bg-white focus:bg-white"}`}`}/>
                <button type="submit" disabled={loading} className="shrink-0 rounded-xl bg-primary px-[clamp(16px,4.6vw,20px)] py-[clamp(10px,2.8svh,12px)] text-[14px] font-semibold text-white transition-all hover:bg-primary-light disabled:opacity-70">
                  {loading ? (<svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>) : (t.email.submit)}
                </button>
              </div>
              {emailError && (<p className="mt-1.5 text-[11px] text-red-500">
                  Geçerli bir e-posta adresi girin.
                </p>)}
              {formError && (<p className="mt-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-[11px] text-red-400">
                  {formError}
                </p>)}
              <p className="mt-[clamp(8px,2svh,12px)] text-[11px] text-muted/60">
                {t.email.privacy}
              </p>
            </form>
          </motion.div>) : (<motion.div key="success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center py-8 text-center">
            {/* animated checkmark */}
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15">
              <motion.svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}>
                <motion.path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.45, delay: 0.35 }}/>
              </motion.svg>
            </motion.div>

            <h2 className="text-2xl font-bold text-foreground">{t.success.heading}</h2>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-muted">
              {t.success.descriptionPrefix}{" "}
              <span className="text-primary">{email}</span>.
            </p>

            <div style={{ background: successBadgeBackground }} className="mt-6 flex items-center gap-2 rounded-xl border border-accent/25 px-4 py-3">
              <svg className="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="text-[13px] text-accent">{t.success.badge}</span>
            </div>
          </motion.div>)}
      </AnimatePresence>
    </div>);
}
