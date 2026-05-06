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

/* ── CSS Phone frame + screenshot ─────────────────────── */
function PhoneFrame() {
  const spotRef = useRef<HTMLDivElement>(null);

  // Animated spotlight orbiting the phone
  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;
    let t = 0;
    let raf: number;
    const loop = () => {
      t += 0.003;
      const x = 50 + Math.sin(t) * 32;
      const y = 35 + Math.cos(t * 0.65) * 25;
      el.style.background = `radial-gradient(ellipse 60% 50% at ${x}% ${y}%, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.03) 45%, transparent 70%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Phone dimensions — based on 1344×2992 screenshot ratio (≈9:20)
  const W = 300;
  const H = Math.round(W * (2992 / 1344)); // ≈ 668

  const BEZEL   = 9;    // outer frame thickness
  const RADIUS  = 36;   // outer corner radius — Android is flatter than iPhone
  const IRADIUS = 28;   // inner screen corner radius

  return (
    <div className="relative flex items-center justify-center" style={{ width: W + 60, minHeight: H + 60 }}>

      {/* Ambient glow behind phone */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: W + 80,
          height: H * 0.6,
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.07) 0%, transparent 70%)",
          animation: "glow-pulse 5s ease-in-out infinite",
          filter: "blur(8px)",
        }}
        aria-hidden="true"
      />

      {/* Floor reflection */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -8,
          left: "50%",
          transform: "translateX(-50%)",
          width: W * 0.7,
          height: 24,
          background: "radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
        aria-hidden="true"
      />

      {/* Phone shell */}
      <div
        className="relative float"
        style={{
          width: W,
          height: H,
          borderRadius: RADIUS,
          background: "linear-gradient(175deg, #222 0%, #141414 60%, #1c1c1c 100%)",
          boxShadow: [
            "0 50px 100px rgba(0,0,0,0.8)",
            "0 20px 40px rgba(0,0,0,0.5)",
            "inset 0 1px 0 rgba(255,255,255,0.08)",
            "inset 0 -1px 0 rgba(0,0,0,0.4)",
            "0 0 0 1px rgba(255,255,255,0.06)",
          ].join(", "),
          animationDelay: "0.2s",
        }}
      >
        {/* Animated spotlight overlay on frame */}
        <div
          ref={spotRef}
          className="absolute inset-0 pointer-events-none"
          style={{ borderRadius: RADIUS, zIndex: 10 }}
          aria-hidden="true"
        />

        {/* Screen area — top bezel thinner, bottom chin slightly thicker (Android) */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: BEZEL,
            left: BEZEL,
            right: BEZEL,
            bottom: BEZEL + 4,   // +4px chin
            borderRadius: IRADIUS,
            background: "#000",
          }}
        >
          {/* Screenshot */}
          <Image
            src="/preview-mobile/Home.png"
            alt="Zero app — Home screen"
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            priority
          />

          {/* Punch-hole camera — Android style, top-center */}
          <div
            className="absolute z-20"
            style={{
              top: 14,
              left: "50%",
              transform: "translateX(-50%)",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#000",
              boxShadow: "0 0 0 2px rgba(255,255,255,0.06)",
            }}
            aria-hidden="true"
          />

          {/* Screen glare — top-left shine */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 35%)",
              borderRadius: IRADIUS,
            }}
            aria-hidden="true"
          />
        </div>

        {/* Power button — right side */}
        <div
          className="absolute"
          style={{
            right: -3,
            top: 140,
            width: 4,
            height: 52,
            borderRadius: "0 3px 3px 0",
            background: "linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
          aria-hidden="true"
        />

        {/* Volume up — left side */}
        <div
          className="absolute"
          style={{
            left: -3,
            top: 120,
            width: 4,
            height: 44,
            borderRadius: "3px 0 0 3px",
            background: "linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
          aria-hidden="true"
        />

        {/* Volume down — left side */}
        <div
          className="absolute"
          style={{
            left: -3,
            top: 176,
            width: 4,
            height: 44,
            borderRadius: "3px 0 0 3px",
            background: "linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
          aria-hidden="true"
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
              on the go — same presets, same quality, fully offline. 100% safe, no viruses.
            </p>

            {/* Security badge */}
            <div className="fade-up d3 flex items-center gap-3 mb-6 px-4 py-3 rounded-xl" style={{ background: "rgba(100,255,100,0.04)", border: "1px solid rgba(100,255,100,0.12)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(100,255,100,0.7)" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <div>
                <p className="text-xs font-semibold" style={{ color: "rgba(150,255,150,0.9)" }}>100% Safe & Verified</p>
                <p style={{ fontSize: 10, color: "rgba(100,255,100,0.5)", marginTop: 1 }}>No viruses, no malware, no tracking</p>
              </div>
            </div>

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

            {/* Google Play Coming Soon */}
            <div className="fade-up d6 mt-4 flex items-center gap-3">
              <div
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,0.02)", opacity: 0.6 }}
              >
                {/* Google Play icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l15 8.5-15 8.5c-.5.33-1.5.33-1.5-.5z" fill="rgba(255,255,255,0.4)" />
                </svg>
                <div>
                  <div style={{ fontSize: 9, color: "var(--fg-4)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Coming soon</div>
                  <div style={{ fontSize: 11, color: "var(--fg-3)", fontWeight: 500 }}>Google Play Store</div>
                </div>
              </div>
            </div>

            <p className="fade-up mt-5 text-xs leading-relaxed" style={{ color: "var(--fg-3)", maxWidth: 340 }}>
              <span style={{ color: "var(--fg-2)" }}>Note:</span> Enable "Install from unknown sources" in your Android settings before installing.
            </p>
          </div>

          {/* Right — CSS phone frame */}
          <div className="fade-up d4 flex items-center justify-center py-8">
            <PhoneFrame />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50%       { opacity: 1;   transform: translateX(-50%) scale(1.06); }
        }
      `}</style>
    </section>
  );
}
