/**
 * Smooth scroll to a section ID or numeric position.
 * Uses Lenis if available, falls back to native scroll.
 */
export function scrollTo(target: string | number | HTMLElement, duration = 1.2) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = (window as any).lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else if (typeof target === "string") {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

/** Scroll to a section by element ID */
export function scrollToId(id: string, duration = 1.2) {
  const el = document.getElementById(id);
  if (el) scrollTo(el, duration);
}
