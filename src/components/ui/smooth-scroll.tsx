"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Preserve native scroll position on refresh
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
    }

    const savedY = sessionStorage.getItem("scrollY");

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    // Restore scroll position after Lenis initialises
    if (savedY) {
      const y = parseInt(savedY, 10);
      if (y > 0) {
        // Small delay so DOM is ready
        setTimeout(() => lenis.scrollTo(y, { immediate: true }), 50);
      }
      sessionStorage.removeItem("scrollY");
    }

    // Save scroll position before unload
    const saveScroll = () => {
      sessionStorage.setItem("scrollY", String(Math.round(window.scrollY)));
    };
    window.addEventListener("beforeunload", saveScroll);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("beforeunload", saveScroll);
      lenis.destroy();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).lenis;
    };
  }, []);

  return null;
}
