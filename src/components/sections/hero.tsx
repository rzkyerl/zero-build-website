"use client";

import { useEffect, useRef } from "react";

/* ── SVG Distortion filter ────────────────────────────── */
function DistortionFilter() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <filter id="distort">
          <feTurbulence
            id="turbulence"
            type="fractalNoise"
            baseFrequency="0.015 0.015"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
            id="displacement"
          />
        </filter>
      </defs>
    </svg>
  );
}

/* ── Animated grid lines ──────────────────────────────── */
function GridLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Vertical lines */}
      {[20, 40, 60, 80].map((pct) => (
        <div
          key={pct}
          className="absolute top-0 bottom-0 w-px"
          style={{
            left: `${pct}%`,
            background: "rgba(255,255,255,0.025)",
          }}
        />
      ))}
      {/* Horizontal lines */}
      {[25, 50, 75].map((pct) => (
        <div
          key={pct}
          className="absolute left-0 right-0 h-px"
          style={{
            top: `${pct}%`,
            background: "rgba(255,255,255,0.025)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Orbiting circle ──────────────────────────────────── */
function OrbitCircle({ size, delay, duration, opacity }: {
  size: number; delay: number; duration: number; opacity: number;
}) {
  return (
    <div
      className="absolute top-1/2 left-1/2 rounded-full border pointer-events-none"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderColor: `rgba(255,255,255,${opacity})`,
        animation: `orbit-spin ${duration}s linear ${delay}s infinite`,
      }}
      aria-hidden="true"
    />
  );
}

/* ── Main Hero ────────────────────────────────────────── */
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const displRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const turbRef = useRef<SVGFETurbulenceElement | null>(null);

  // Parallax on mouse move
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    displRef.current = document.getElementById("displacement") as SVGFEDisplacementMapElement | null;
    turbRef.current = document.getElementById("turbulence") as SVGFETurbulenceElement | null;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let distortTarget = 0, distortCurrent = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      distortTarget = 18;
    };

    const onLeave = () => {
      targetX = 0; targetY = 0;
      distortTarget = 0;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      distortCurrent += (distortTarget - distortCurrent) * 0.04;

      // Parallax layers
      const layers = hero.querySelectorAll<HTMLElement>("[data-depth]");
      layers.forEach((el) => {
        const depth = parseFloat(el.dataset.depth || "1");
        el.style.transform = `translate(${currentX * depth}px, ${currentY * depth}px)`;
      });

      // SVG distortion
      if (displRef.current) {
        displRef.current.setAttribute("scale", String(distortCurrent));
      }
      if (turbRef.current && distortCurrent > 0.1) {
        const freq = 0.015 + distortCurrent * 0.0003;
        turbRef.current.setAttribute("baseFrequency", `${freq} ${freq}`);
      }

      raf = requestAnimationFrame(loop);
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Clip-path text reveal on load
  useEffect(() => {
    const lines = document.querySelectorAll<HTMLElement>(".t-reveal");
    lines.forEach((line, i) => {
      setTimeout(() => line.classList.add("is-visible"), 1800 + i * 120);
    });
    const fades = document.querySelectorAll<HTMLElement>(".hero-fade");
    fades.forEach((el, i) => {
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 2000 + i * 100);
    });
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = window.lenis;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ background: "#000" }}
    >
      <DistortionFilter />
      <GridLines />

      {/* Orbit rings */}
      <OrbitCircle size={500} delay={0}   duration={60} opacity={0.03} />
      <OrbitCircle size={800} delay={0}   duration={90} opacity={0.02} />
      <OrbitCircle size={1100} delay={0}  duration={120} opacity={0.015} />

      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none glow-breathe"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Top-right floating badge */}
      <div
        className="hero-fade absolute top-24 right-8 lg:right-16 hidden md:flex flex-col items-end gap-1 float-slow"
        style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}
        data-depth="0.3"
      >
        <div
          className="text-[10px] tracking-[0.25em] uppercase font-medium px-3 py-1.5 rounded-full"
          style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)" }}
        >
          Browser Native
        </div>
        <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.12)" }}>
          No install required
        </div>
      </div>

      {/* Left floating stat */}
      <div
        className="hero-fade absolute top-1/3 left-8 lg:left-16 hidden lg:block float-med"
        style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.8s ease, transform 0.8s ease", animationDelay: "1s" }}
        data-depth="0.5"
      >
        <div className="text-5xl font-bold tabular-nums" style={{ color: "rgba(255,255,255,0.06)" }}>
          −72%
        </div>
        <div className="text-[10px] tracking-widest uppercase mt-1" style={{ color: "rgba(255,255,255,0.08)" }}>
          Avg. reduction
        </div>
      </div>

      {/* Main headline — bottom-aligned, full width */}
      <div
        ref={headRef}
        className="relative z-10 px-6 sm:px-10 lg:px-16 pb-16 pt-32"
        style={{ filter: "url(#distort)" }}
      >
        {/* Eyebrow */}
        <div
          className="hero-fade flex items-center gap-3 mb-8"
          style={{ opacity: 0, transform: "translateY(12px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
            Zero Build · v1.0
          </span>
        </div>

        {/* Giant headline */}
        <h1
          className="font-bold leading-[0.88] tracking-[-0.04em] mb-10"
          style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}
        >
          <span className="t-reveal block">
            <span className="t-reveal__inner" style={{ color: "rgba(255,255,255,0.92)" }}>
              Compress.
            </span>
          </span>
          <span className="t-reveal block d-2">
            <span className="t-reveal__inner" style={{ color: "rgba(255,255,255,0.18)" }}>
              Stay Sharp.
            </span>
          </span>
        </h1>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          {/* Description */}
          <div className="max-w-xs">
            <p
              className="hero-fade text-sm leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.35)",
                opacity: 0,
                transform: "translateY(12px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              Optimize photos & videos for social media.
              <br />
              Directly in your browser. Zero upload.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="hero-fade flex items-center gap-3"
            style={{ opacity: 0, transform: "translateY(12px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
          >
            <button className="btn-primary" onClick={() => scrollTo("upload")}>
              Upload Media
            </button>
            <button className="btn-ghost" onClick={() => scrollTo("features")}>
              Explore
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-fade absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0, transition: "opacity 1s ease 2.5s" }}
      >
        <div
          className="w-px h-12 overflow-hidden relative"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="absolute top-0 left-0 w-full h-1/2 scroll-indicator-line"
            style={{ background: "rgba(255,255,255,0.4)" }}
          />
        </div>
        <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
          Scroll
        </span>
      </div>

      <style>{`
        @keyframes orbit-spin {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(0); }
          to   { transform: translate(-50%, -50%) rotate(360deg) translateX(0); }
        }
      `}</style>
    </section>
  );
}
