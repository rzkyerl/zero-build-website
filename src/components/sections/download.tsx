"use client";

import { useEffect, useRef } from "react";

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

/* Phone mockup — pure CSS, no image needed */
function PhoneMockup() {
  return (
    <div
      className="relative mx-auto"
      style={{ width: 220, height: 440 }}
    >
      {/* Phone shell */}
      <div
        className="absolute inset-0 rounded-[2.8rem]"
        style={{
          border: "1.5px solid rgba(255,255,255,0.12)",
          background: "linear-gradient(160deg, #1a1a1a 0%, #0a0a0a 100%)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      />

      {/* Screen */}
      <div
        className="absolute rounded-[2.2rem] overflow-hidden"
        style={{ inset: 8, background: "#050505" }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 8, color: "rgba(255,255,255,0.3)" }}>9:41</span>
          <div className="flex items-center gap-1">
            {[3, 4, 5].map((h) => (
              <div key={h} className="rounded-sm" style={{ width: 3, height: h, background: "rgba(255,255,255,0.35)" }} />
            ))}
            <div className="ml-1 rounded-sm" style={{ width: 14, height: 7, border: "1px solid rgba(255,255,255,0.3)", borderRadius: 2 }}>
              <div style={{ width: "70%", height: "100%", background: "rgba(255,255,255,0.4)", borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* App header */}
        <div className="px-4 pt-2 pb-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <span className="font-bold" style={{ fontSize: 16, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.02em" }}>Zero</span>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }} />
        </div>

        {/* Upload zone */}
        <div className="mx-3 mt-3 rounded-2xl flex flex-col items-center justify-center py-5"
          style={{ border: "1.5px dashed rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
          <div className="rounded-xl flex items-center justify-center mb-2"
            style={{ width: 32, height: 32, background: "rgba(255,255,255,0.06)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>Tap to select media</span>
          <span style={{ fontSize: 7, color: "rgba(255,255,255,0.2)", marginTop: 2 }}>JPG · PNG · MP4</span>
        </div>

        {/* Preset pills */}
        <div className="flex gap-1.5 px-3 mt-3 overflow-hidden">
          {["Instagram", "WhatsApp", "Smart", "Custom"].map((p, i) => (
            <div
              key={p}
              className="rounded-full px-2 py-1 flex-shrink-0"
              style={{
                fontSize: 7,
                fontWeight: 600,
                background: i === 2 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${i === 2 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                color: i === 2 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
              }}
            >
              {p}
            </div>
          ))}
        </div>

        {/* Optimize button */}
        <div className="mx-3 mt-3 rounded-xl flex items-center justify-center py-2.5"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em" }}>
            OPTIMIZE NOW
          </span>
        </div>

        {/* Result preview */}
        <div className="mx-3 mt-3 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="grid grid-cols-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {["Before", "After"].map((l, i) => (
              <div key={l} className="p-2" style={i === 0 ? { borderRight: "1px solid rgba(255,255,255,0.06)" } : {}}>
                <div style={{ fontSize: 7, color: "rgba(255,255,255,0.25)", marginBottom: 4, fontFamily: "var(--font-geist-mono)" }}>{l}</div>
                <div className="rounded-lg" style={{ height: 36, background: "rgba(255,255,255,0.04)" }} />
                <div style={{ fontSize: 8, color: i === 0 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.8)", marginTop: 3, fontWeight: 600, fontFamily: "var(--font-geist-mono)" }}>
                  {i === 0 ? "12.4 MB" : "3.2 MB"}
                </div>
              </div>
            ))}
          </div>
          <div className="px-2 py-1.5 flex items-center justify-between">
            <span style={{ fontSize: 7, color: "rgba(255,255,255,0.25)" }}>Reduction</span>
            <span style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-geist-mono)" }}>−74%</span>
          </div>
        </div>
      </div>

      {/* Notch */}
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full"
        style={{ width: 60, height: 6, background: "#0a0a0a", zIndex: 10 }}
      />

      {/* Side button */}
      <div
        className="absolute rounded-full"
        style={{ right: -2, top: 80, width: 3, height: 32, background: "rgba(255,255,255,0.08)" }}
      />
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
                <li
                  key={f}
                  className={`fade-up d${Math.min(i + 3, 6)} flex items-start gap-3`}
                >
                  <div
                    className="flex-shrink-0 mt-1"
                    style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.25)", marginTop: 6 }}
                  />
                  <span style={{ fontSize: 13, color: "var(--fg-2)", lineHeight: 1.6 }}>{f}</span>
                </li>
              ))}
            </ul>

            {/* Version badge + download button */}
            <div className="fade-up d6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={APK_URL}
                download="zero-v1.0.0.apk"
                className="group flex items-center gap-3 px-7 py-4 rounded-full text-sm font-semibold text-black bg-white transition-all duration-300 active:scale-95"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 36px rgba(255,255,255,0.22)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                {/* Android icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.341a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-11.046 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM3.513 8.25h16.974A2.25 2.25 0 0 1 22.5 10.5v5.25a2.25 2.25 0 0 1-2.25 2.25H18v2.25a.75.75 0 0 1-1.5 0V18H7.5v2.25a.75.75 0 0 1-1.5 0V18H3.75A2.25 2.25 0 0 1 1.5 15.75V10.5a2.25 2.25 0 0 1 2.013-2.25ZM8.47 3.22a.75.75 0 0 1 1.06 0l1.22 1.22 1.22-1.22a.75.75 0 1 1 1.06 1.06l-.69.69h1.41a3.75 3.75 0 0 1 3.75 3.75v.03H6.5V8.72a3.75 3.75 0 0 1 3.75-3.75h1.41l-.69-.69a.75.75 0 0 1 0-1.06Z" />
                </svg>
                Download for Android
              </a>

              {/* Meta info */}
              <div style={{ fontFamily: "var(--font-geist-mono)" }}>
                <div style={{ fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.1em" }}>
                  v1.0.0 · 64 MB
                </div>
                <div style={{ fontSize: 10, color: "var(--fg-4)", letterSpacing: "0.08em", marginTop: 2 }}>
                  Android API 24+
                </div>
              </div>
            </div>

            {/* Install note */}
            <p
              className="fade-up mt-5 text-xs leading-relaxed"
              style={{ color: "var(--fg-3)", maxWidth: 340 }}
            >
              <span style={{ color: "var(--fg-2)" }}>Note:</span> Enable "Install from unknown sources" in your Android settings before installing.
            </p>
          </div>

          {/* Right — phone mockup */}
          <div className="fade-up d4 flex items-center justify-center">
            <div className="float" style={{ animationDelay: "0.3s" }}>
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
