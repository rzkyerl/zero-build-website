"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!wrap || !dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const loop = () => {
      // Dot: instant
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;

      // Ring: lerp
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;

      raf = requestAnimationFrame(loop);
    };

    const onEnter = () => wrap.classList.add("is-hovering");
    const onLeave = () => wrap.classList.remove("is-hovering");
    const onDown  = () => wrap.classList.add("is-clicking");
    const onUp    = () => wrap.classList.remove("is-clicking");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const addListeners = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    // Run after DOM settles
    setTimeout(addListeners, 500);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div ref={wrapRef} className="c-cursor" aria-hidden="true">
      <div ref={dotRef} className="c-cursor__dot" />
      <div ref={ringRef} className="c-cursor__ring" />
    </div>
  );
}
