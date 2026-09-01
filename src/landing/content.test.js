import { getFooterContent, getHeroContent, getNavbarContent, getPlatformDemoShared } from "./content";

describe("locale-aware content getters", () => {
  test("getHeroContent returns different, non-empty copy per locale", () => {
    const en = getHeroContent("en");
    const tr = getHeroContent("tr");
    expect(en.ctas.primary).toBe("Get Your Early Access");
    expect(tr.ctas.primary).toBe("Erken Erişim");
    expect(en.ctas.primary).not.toBe(tr.ctas.primary);
  });

  test("getNavbarContent falls back to English for an unknown locale", () => {
    const fallback = getNavbarContent("fr");
    const en = getNavbarContent("en");
    expect(fallback).toEqual(en);
  });

  test("getFooterContent keeps the same shape across locales", () => {
    expect(Object.keys(getFooterContent("en"))).toEqual(Object.keys(getFooterContent("tr")));
  });

  test("getPlatformDemoShared exposes five matching panel steps in both languages", () => {
    const en = getPlatformDemoShared("en").panelSteps;
    const tr = getPlatformDemoShared("tr").panelSteps;
    expect(en).toHaveLength(5);
    expect(tr).toHaveLength(5);
    expect(en.map((s) => s.label)).not.toEqual(tr.map((s) => s.label));
  });
});
