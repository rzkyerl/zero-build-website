"use client";

import { useEffect, useRef, useState } from "react";

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Block scroll during load
    document.documentElement.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        // Clip-path wipe out
        setTimeout(() => {
          setDone(true);
          document.documentElement.style.overflow = "";
        }, 200);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  return (
    <div
      ref={loaderRef}
      className="c-loader"
      style={{
        clipPath: done ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
        transition: done ? "clip-path 1s cubic-bezier(0.76,0,0.24,1)" : "none",
        pointerEvents: done ? "none" : "all",
      }}
      aria-hidden="true"
    >
      <div className="c-loader__word">
        <span>Zero Build</span>
      </div>

      <div className="c-loader__line" />

      <div className="c-loader__num">
        {String(count).padStart(3, "0")}
      </div>
    </div>
  );
}
