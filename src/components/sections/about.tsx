"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll<HTMLElement>(".mask").forEach((m, i) => setTimeout(() => m.classList.add("in"), i * 90));
        e.target.querySelectorAll<HTMLElement>(".fade-up").forEach((m, i) => setTimeout(() => m.classList.add("in"), 100 + i * 60));
        obs.unobserve(e.target);
      }),
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-24">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-16 fade-up">
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            04 — About
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div>
            <h2 className="font-bold mb-10" style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", lineHeight: 0.95, letterSpacing: "-0.035em" }}>
              <span className="mask block"><span className="mask__inner" style={{ color: "var(--fg)" }}>The story</span></span>
              <span className="mask block d2"><span className="mask__inner" style={{ color: "var(--fg)" }}>behind</span></span>
              <span className="mask block d3"><span className="mask__inner" style={{ color: "var(--fg-2)" }}>Zero.</span></span>
            </h2>

            <div className="space-y-5 max-w-md">
              <p className="fade-up d4 text-sm leading-[1.8]" style={{ color: "var(--fg-2)" }}>
                Every time you upload a photo or video to Instagram, WhatsApp, or any social
                platform, it gets recompressed — often resulting in blurry visuals, artifacts,
                or files that are still too large.
              </p>
              <p className="fade-up d5 text-sm leading-[1.8]" style={{ color: "var(--fg-2)" }}>
                Zero solves this with a hybrid approach: photos are compressed{" "}
                <span style={{ color: "var(--fg)" }}>instantly in your browser</span> — no upload,
                fully private. Videos are processed via{" "}
                <span style={{ color: "var(--fg)" }}>secure cloud</span> for maximum speed and quality.
                The result: sharp files at a fraction of the original size, ready for any platform.
              </p>
            </div>

            <div className="fade-up d6 flex items-center gap-4 mt-10 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)" }}
              >
                <Image
                  src="/CTRLBuild-White.png"
                  alt="CTRLBuild"
                  width={28}
                  height={28}
                  style={{ objectFit: "contain", opacity: 0.85 }}
                />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--fg-2)" }}>CTRLBuild</p>
                <p style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-geist-mono)" }}>Developer</p>
              </div>
            </div>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-px" style={{ background: "var(--border)" }}>
            {[
              { value: "100%", label: "Photos local",    sub: "Browser-only, no upload" },
              { value: "0",    label: "Data collected",  sub: "Zero telemetry" },
              { value: "4",    label: "Presets",         sub: "Platform-tuned" },
              { value: "1–2",  label: "Taps",            sub: "Minimal friction" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`fade-up d${i + 2} p-8 group`}
                style={{ background: "var(--bg)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--surface)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--bg)"; }}
              >
                <div className="font-bold mb-2 transition-colors duration-200 group-hover:text-white tabular-nums"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1, letterSpacing: "-0.03em", color: "var(--fg-2)" }}>
                  {s.value}
                </div>
                <div className="text-sm font-medium mb-1" style={{ color: "var(--fg-2)" }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-geist-mono)" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
