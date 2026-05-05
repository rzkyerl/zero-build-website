"use client";

import { useEffect, useRef, useState } from "react";

export default function PageLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const dur   = 1500;

    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) { requestAnimationFrame(tick); return; }
      setTimeout(() => {
        const el = ref.current;
        if (el) {
          el.style.transition = "clip-path 0.9s cubic-bezier(0.76,0,0.24,1)";
          el.style.clipPath    = "inset(0 0 100% 0)";
        }
        document.documentElement.style.overflow = "";
        setTimeout(() => setGone(true), 950);
      }, 150);
    };
    requestAnimationFrame(tick);
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
        <span>Zero Build</span>
      </div>
      <div className="zb-loader__bar" />
      <div className="zb-loader__count">{String(count).padStart(3, "0")}</div>
    </div>
  );
}
