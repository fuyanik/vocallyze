// Locale content shim for the ported landing UI (Navbar / Hero / PanelDemo).
// Only the slices actually rendered on the live site are kept here. Each
// getter takes the active `locale` (from useLocale()) and falls back to the
// English catalog for any locale/key that isn't available yet.
import homeEn from "./locales/en/home.json";
import commonEn from "./locales/en/common.json";
import platformDemoEn from "./locales/en/platform-demo.json";
import homeTr from "./locales/tr/home.json";
import commonTr from "./locales/tr/common.json";
import platformDemoTr from "./locales/tr/platform-demo.json";

const HOME = { en: homeEn, tr: homeTr };
const COMMON = { en: commonEn, tr: commonTr };
const PLATFORM_DEMO = { en: platformDemoEn, tr: platformDemoTr };

const pick = (catalog, locale) => catalog[locale] ?? catalog.en;

export const getHeroContent = (locale = "en") => pick(HOME, locale).hero ?? homeEn.hero;
export const getNavbarContent = (locale = "en") => pick(COMMON, locale).navbar ?? commonEn.navbar;
export const getFooterContent = (locale = "en") => pick(COMMON, locale).footer ?? commonEn.footer;
export const getPlatformDemoShared = (locale = "en") =>
  pick(PLATFORM_DEMO, locale).shared ?? platformDemoEn.shared;
