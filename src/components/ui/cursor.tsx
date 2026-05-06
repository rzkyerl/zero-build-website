"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const arrowRef  = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if we should render the cursor at all (desktop only)
    const isTouch  = window.matchMedia("(pointer: coarse)").matches;
    const isMobile = window.innerWidth < 768;
    
    if (isTouch || isMobile) {
      setShouldRender(false);
      return;
    }

    setShouldRender(true);

    const canvas = canvasRef.current;
    const arrow  = arrowRef.current;
    if (!canvas || !arrow) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Show the elements
    canvas.style.display = "block";
    arrow.style.display  = "block";

    // Hide native cursor
    document.documentElement.classList.add("custom-cursor-active");

    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    canvas.style.width  = W + "px";
    canvas.style.height = H + "px";

    let mouseX = -300;
    let mouseY = -300;
    let isHover = false;
    let raf: number;

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      arrow.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      particles = buildGrid();
    };

    // Hover detection
    const addHoverListeners = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          isHover = true;
          arrow.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.4)`;
        });
        el.addEventListener("mouseleave", () => {
          isHover = false;
          arrow.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
        });
      });
    };
    setTimeout(addHoverListeners, 600);

    // Particle grid
    const SPACING        = 36;
    const REPEL_RADIUS   = 140;
    const REPEL_STRENGTH = 6;
    const SPRING         = 0.08;
    const FRICTION       = 0.78;

    type Particle = {
      x: number; y: number;
      ox: number; oy: number;
      vx: number; vy: number;
      size: number;
      baseAlpha: number;
    };

    const buildGrid = (): Particle[] => {
      const cols = Math.ceil(W / SPACING) + 2;
      const rows = Math.ceil(H / SPACING) + 2;
      const arr: Particle[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          arr.push({
            x: c * SPACING, y: r * SPACING,
            ox: c * SPACING, oy: r * SPACING,
            vx: 0, vy: 0,
            size: 0.8 + Math.random() * 0.7,
            baseAlpha: 0.04 + Math.random() * 0.06,
          });
        }
      }
      return arr;
    };

    let particles = buildGrid();

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Hover glow
      if (isHover) {
        const g = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 70);
        g.addColorStop(0,   "rgba(255,255,255,0.07)");
        g.addColorStop(0.5, "rgba(255,255,255,0.02)");
        g.addColorStop(1,   "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 70, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // Particles
      for (const p of particles) {
        const dx   = mouseX - p.ox;
        const dy   = mouseY - p.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) ** 2 * REPEL_STRENGTH;
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
        }

        p.vx += (p.ox - p.x) * SPRING;
        p.vy += (p.oy - p.y) * SPRING;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x  += p.vx;
        p.y  += p.vy;

        const disp  = Math.sqrt((p.x - p.ox) ** 2 + (p.y - p.oy) ** 2);
        const glow  = Math.min(disp / 20, 1);
        const alpha = p.baseAlpha + glow * 0.55;
        const size  = p.size + glow * 2.2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize",    onResize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize",    onResize);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  // Don't render anything on mobile
  if (!shouldRender) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ display: "none", position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998 }}
        aria-hidden="true"
      />

      <div
        ref={arrowRef}
        aria-hidden="true"
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          width: 20,
          height: 20,
          willChange: "transform",
          transformOrigin: "0 0",
          transition: "transform 0.08s linear, scale 0.2s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2L2 18L6 14L9 20L11.5 19L8.5 13L14 13L2 2Z"
            fill="white"
            stroke="black"
            strokeWidth="1.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
}
