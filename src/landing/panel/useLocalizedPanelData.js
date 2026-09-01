import * as dataEn from "./data";
import * as dataTr from "./data.tr";
import { useLocale } from "../LocaleProvider";

const CATALOGS = { en: dataEn, tr: dataTr };

/** All panel demo "data" (org, nav, call, transcripts, violations, agent
 *  rosters, chart series, etc.) mirrored 1:1 between English and Turkish.
 *  Stable identifiers (ids, `who`, `sev`, `status`, `state`, `action`,
 *  colors, numbers) are identical across both catalogs — only the
 *  natural-language fields differ — so scenes can keep using the exact
 *  same comparison logic regardless of the active language. */
export function usePanelData() {
  const { locale } = useLocale();
  return CATALOGS[locale] ?? dataEn;
}
