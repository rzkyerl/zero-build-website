"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Count up 0 → 100
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setHidden(true), 200);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  return (
    <div className={`page-loader ${hidden ? "hidden" : ""}`} aria-hidden="true">
      <div className="loader-logo">Zero Build</div>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" />
      </div>
      <div
        className="text-xs font-mono"
        style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}
      >
        {String(count).padStart(3, "0")}
      </div>
    </div>
  );
}
