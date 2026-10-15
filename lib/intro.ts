/**
 * Seconds to wait before the hero animations start.
 * The preloader plays once per browser session (see Preloader.tsx);
 * on repeat visits the hero starts almost immediately.
 */
export const INTRO_SECONDS = 1.85;

export function introDelay() {
  if (typeof document === "undefined") return INTRO_SECONDS;
  return document.documentElement.dataset.seen === "1" ? 0.1 : INTRO_SECONDS;
}
