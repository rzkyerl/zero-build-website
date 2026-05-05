"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!wrap || !dot || !ring) return;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let raf: number;

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const down = () => wrap.classList.add("is-click");
    const up   = () => wrap.classList.remove("is-click");

    const loop = () => {
      dot.style.left  = `${mx}px`;
      dot.style.top   = `${my}px`;
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = `${rx}px`;
      ring.style.top  = `${ry}px`;
      raf = requestAnimationFrame(loop);
    };

    const addHover = () => {
      document.querySelectorAll("a,button,[data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", () => wrap.classList.add("is-hover"));
        el.addEventListener("mouseleave", () => wrap.classList.remove("is-hover"));
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup",   up);
    setTimeout(addHover, 600);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup",   up);
    };
  }, []);

  return (
    <div ref={wrapRef} className="zb-cursor" aria-hidden="true">
      <div ref={dotRef}  className="zb-cursor__dot" />
      <div ref={ringRef} className="zb-cursor__ring" />
    </div>
  );
}
