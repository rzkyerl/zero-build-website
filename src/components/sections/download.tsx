"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const APK_URL =
  "https://github.com/rzkyerl/zero-build-website/releases/download/v1.0.0/zero-build-v1.0.0.apk";

const FEATURES = [
  "4 compression presets — Instagram, WhatsApp, Smart Auto, Custom",
  "Before/after size comparison with reduction percentage",
  "In-app video preview with play/pause & progress bar",
  "Save to Gallery & Share via system sheet",
  "Auto Save option — saves automatically on result load",
  "100% offline — no data ever leaves your device",
];

/* Spotlight + phone mockup with animated light */
function PhoneShowcase() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;

    // Animate spotlight position in a slow elliptical orbit
    let t = 0;
    let raf: number;
    const loop = () => {
      t += 0.004;
      const x = 50 + Math.sin(t) * 28;
      const y = 30 + Math.cos(t * 0.7) * 22;
      el.style.background = `radial-gradient(ellipse 55% 45% at ${x}% ${y}%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative flex items-center justify-center" style={{ width: "100%", maxWidth: 420 }}>

      {/* Animated spotlight layer */}
      <div
        ref={spotRef}
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />

      {/* Outer glow ring — slow pulse */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 340,
          height: 340,
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)",
          animation: "glow-pulse 4s ease-in-out infinite",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Secondary glow — offset, slower */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 260,
          height: 260,
          top: "10%",
          left: "15%",
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
          animation: "glow-pulse 6s ease-in-out 1s infinite",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Floor reflection */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 200,
          height: 40,
          background: "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)",
          filter: "blur(12px)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Phone image */}
      <div
        className="relative float"
        style={{ zIndex: 2, animationDelay: "0.3s", filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(255,255,255,0.06))" }}
      >
        <Image
          src="/preview-mobile/Home Mockup.png"
          alt="Zero app — Home screen"
          width={340}
          height={680}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </div>
  );
}

export default function Download() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll<HTMLElement>(".mask").forEach((m, i) => setTimeout(() => m.classList.add("in"), i * 90));
        e.target.querySelectorAll<HTMLElement>(".fade-up").forEach((m, i) => setTimeout(() => m.classList.add("in"), 80 + i * 60));
        obs.unobserve(e.target);
      }),
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="download"
      ref={ref}
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-24">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-16 fade-up">
          <span style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 10,
            color: "var(--fg-3)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            05 — Download
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — info + download */}
          <div>
            <h2 className="font-bold mb-6" style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", lineHeight: 0.95, letterSpacing: "-0.035em" }}>
              <span className="mask block"><span className="mask__inner" style={{ color: "var(--fg)" }}>Take Zero</span></span>
              <span className="mask block d2"><span className="mask__inner" style={{ color: "var(--fg-2)" }}>with you.</span></span>
            </h2>

            <p className="fade-up d3 text-sm leading-[1.8] max-w-sm mb-8" style={{ color: "var(--fg-2)" }}>
              The full Zero experience, now on Android. Compress photos and videos
              on the go — same presets, same quality, fully offline.
            </p>

            {/* Feature list */}
            <ul className="space-y-3 mb-10">
              {FEATURES.map((f, i) => (
                <li key={f} className={`fade-up d${Math.min(i + 3, 6)} flex items-start gap-3`}>
                  <div
                    className="flex-shrink-0"
                    style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.25)", marginTop: 6 }}
                  />
                  <span style={{ fontSize: 13, color: "var(--fg-2)", lineHeight: 1.6 }}>{f}</span>
                </li>
              ))}
            </ul>

            {/* Download button + meta */}
            <div className="fade-up d6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={APK_URL}
                download="zero-v1.0.0.apk"
                className="flex items-center gap-3 px-7 py-4 rounded-full text-sm font-semibold text-black bg-white transition-all duration-300 active:scale-95"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 36px rgba(255,255,255,0.22)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.341a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-11.046 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM3.513 8.25h16.974A2.25 2.25 0 0 1 22.5 10.5v5.25a2.25 2.25 0 0 1-2.25 2.25H18v2.25a.75.75 0 0 1-1.5 0V18H7.5v2.25a.75.75 0 0 1-1.5 0V18H3.75A2.25 2.25 0 0 1 1.5 15.75V10.5a2.25 2.25 0 0 1 2.013-2.25ZM8.47 3.22a.75.75 0 0 1 1.06 0l1.22 1.22 1.22-1.22a.75.75 0 1 1 1.06 1.06l-.69.69h1.41a3.75 3.75 0 0 1 3.75 3.75v.03H6.5V8.72a3.75 3.75 0 0 1 3.75-3.75h1.41l-.69-.69a.75.75 0 0 1 0-1.06Z" />
                </svg>
                Download for Android
              </a>
              <div style={{ fontFamily: "var(--font-geist-mono)" }}>
                <div style={{ fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.1em" }}>v1.0.0 · 64 MB</div>
                <div style={{ fontSize: 10, color: "var(--fg-4)", letterSpacing: "0.08em", marginTop: 2 }}>Android API 24+</div>
              </div>
            </div>

            <p className="fade-up mt-5 text-xs leading-relaxed" style={{ color: "var(--fg-3)", maxWidth: 340 }}>
              <span style={{ color: "var(--fg-2)" }}>Note:</span> Enable "Install from unknown sources" in your Android settings before installing.
            </p>
          </div>

          {/* Right — phone showcase */}
          <div className="fade-up d4 flex items-center justify-center py-8">
            <PhoneShowcase />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
}
