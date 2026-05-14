"use client";

import { useEffect, useRef, useState } from "react";

export default function PageLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Since this component is client-only (ssr: false), it mounts after the
    // browser has already painted the page — so we keep the hold very short.
    // The overlay still gives the polished wipe-in feel without blocking LCP.
    const el = ref.current;
    if (!el) return;

    // Tiny hold (80ms) then wipe out in 350ms
    const t = setTimeout(() => {
      el.style.transition = "clip-path 0.35s cubic-bezier(0.76,0,0.24,1)";
      el.style.clipPath = "inset(0 0 100% 0)";
      setTimeout(() => setGone(true), 370);
    }, 80);

    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div
      ref={ref}
      className="zb-loader"
      style={{ clipPath: "inset(0 0 0 0)" }}
      aria-hidden="true"
    >
      <div className="zb-loader__logo">
        <span>Zero</span>
      </div>
      <div className="zb-loader__bar" />
    </div>
  );
}
