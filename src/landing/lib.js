// Local replacements for the ported landing UI's Next.js-only infrastructure:
// analytics (PostHog-style event tracking) and the waitlist backend API.
// Both are safe no-ops / local stubs so the ported UI works standalone.
// Swap `submitForm` for a real endpoint whenever Vocallyze gets its own
// "early access" backend.

export const trackEvent = () => {};
export const AE = new Proxy({}, { get: () => undefined });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isValidEmail = (v) => EMAIL_RE.test(String(v).trim());

export const MODULE_ENUM = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 7,
  7: 8,
};

// TODO: point this at a real backend once Vocallyze has an early-access
// endpoint. For now it just simulates a successful submission.
export async function submitForm(_action, _payload) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { success: true };
}

// Mirrors the ported UI's module-level "seen once per page load" prologue flag.
let _prologueSeen = false;
export const isPrologueSeen = () => _prologueSeen;
export const markPrologueSeen = () => {
  _prologueSeen = true;
};

// The original source builds locale-prefixed hrefs; Vocallyze has flat
// routes, so this is just an identity passthrough kept for
// API-compatibility with the ported components.
export const useLocalizedHref = (path) => path;
