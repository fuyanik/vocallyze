import { createContext, useCallback, useContext, useEffect, useState } from "react";

// Supported UI languages. English stays the default so first-time visitors
// (and the very first paint, before localStorage is read) always see EN —
// no route prefix, no domain switch, just a React context flip.
export const LOCALES = ["en", "tr"];
const DEFAULT_LOCALE = "en";
const STORAGE_KEY = "vocallyze-locale";

const LocaleContext = createContext({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  toggleLocale: () => {},
});

export function useLocale() {
  return useContext(LocaleContext);
}

export default function LocaleProvider({ children }) {
  // Always render EN first so the initial markup is deterministic, then
  // apply the visitor's remembered choice right after mount — same
  // hydration-safe pattern as ThemeProvider.
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && LOCALES.includes(stored) && stored !== DEFAULT_LOCALE) {
      setLocaleState(stored);
    }
    document.documentElement.lang = stored && LOCALES.includes(stored) ? stored : DEFAULT_LOCALE;
  }, []);

  const setLocale = useCallback((next) => {
    if (!LOCALES.includes(next)) return;
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => {
      const next = current === "en" ? "tr" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
