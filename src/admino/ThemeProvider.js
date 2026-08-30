import { createContext, useContext, useEffect, useState, useCallback } from "react";
export const THEMES = ["arctic", "midnight"];
const LIGHT_THEMES = new Set(["arctic"]);
export function isLightTheme(t) {
    return LIGHT_THEMES.has(t);
}
export const THEME_META = {
    arctic: { label: "Arctic", dot: "#3b82f6" },
    midnight: { label: "Midnight", dot: "#3b82f6" },
};
const ThemeContext = createContext({ theme: "midnight", setTheme: () => { } });
export function useTheme() {
    return useContext(ThemeContext);
}
function applyTheme(t, { animate = false } = {}) {
    const el = document.documentElement;
    if (animate) {
        el.classList.add("theme-transitioning");
    }
    else {
        el.classList.remove("theme-transitioning");
    }
    el.setAttribute("data-theme", t);
    el.setAttribute("data-mode", isLightTheme(t) ? "light" : "dark");
    localStorage.setItem("admino-theme", t);
    if (animate) {
        setTimeout(() => el.classList.remove("theme-transitioning"), 450);
    }
}
export default function ThemeProvider({ children }) {
    // Always start with the server default so SSR and first client render agree.
    // localStorage is read after hydration to avoid a server/client mismatch.
    const [theme, setThemeState] = useState("arctic");
    useEffect(() => {
        const stored = localStorage.getItem("admino-theme");
        const resolved = stored && THEMES.includes(stored) ? stored : "arctic";
        if (resolved !== "arctic") {
            setThemeState(resolved);
        }
        // Sync the DOM attributes in case the inline <head> script didn't run.
        applyTheme(resolved, { animate: false });
    }, []);
    const setTheme = useCallback((t) => {
        applyTheme(t, { animate: true });
        setThemeState(t);
    }, []);
    return (<ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>);
}
