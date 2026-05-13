"use client";

import { useEffect, useRef, useState } from "react";

export default function PageLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Wipe out quickly — 200ms hold then 400ms clip transition
    const el = ref.current;
    if (!el) return;

    const t = setTimeout(() => {
      el.style.transition = "clip-path 0.4s cubic-bezier(0.76,0,0.24,1)";
      el.style.clipPath = "inset(0 0 100% 0)";
      setTimeout(() => setGone(true), 420);
    }, 200);

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
