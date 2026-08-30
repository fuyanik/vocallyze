// Local English-only content shim.
// Admino's original project reads these through a full i18n system
// (10 languages, Next.js locale routing). We only need the English copy
// here for now, so these functions just return the matching JSON slice.
import homeEn from "./locales/en/home.json";
import commonEn from "./locales/en/common.json";
import platformDemoEn from "./locales/en/platform-demo.json";

export const getHeroContent = () => homeEn.hero;
export const getNavbarContent = () => commonEn.navbar;
export const getFooterContent = () => commonEn.footer;
export const getWaitlistContent = () => commonEn.waitlist;
export const getEarlyAccessContent = () => commonEn.waitlist;
export const getLanguageContent = () => commonEn.language;

export const getPlatformDemoContent = () => platformDemoEn;
export const getPlatformDemoShared = () => platformDemoEn.shared;
export const getChatContent = () => platformDemoEn.chat;
export const getDesignContent = () => platformDemoEn.design;
export const getCustomizeContent = () => platformDemoEn.customize;
export const getBuildContent = () => platformDemoEn.build;
export const getDashboardContent = () => platformDemoEn.dashboard;
