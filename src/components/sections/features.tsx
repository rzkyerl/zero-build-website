"use client";

import { useEffect, useRef } from "react";

const FEATURES = [
  { n: "01", title: "Photos: 100% Local",   desc: "Photo compression runs entirely in your browser via Canvas API. Your images never leave your device — ever.",  tag: "Privacy" },
  { n: "02", title: "Videos: Cloud Fast",   desc: "Videos are processed via secure cloud API for maximum speed and quality. No FFmpeg download, no waiting.",      tag: "Hybrid" },
  { n: "03", title: "No Login",             desc: "No account, no email, no tracking. Open the page and start compressing immediately.",                           tag: "Simple" },
  { n: "04", title: "Social Ready",         desc: "Presets tuned for Instagram, WhatsApp, and more. Sharp output every time, every platform.",                     tag: "Optimized" },
  { n: "05", title: "Private by Design",    desc: "Zero telemetry, zero analytics, zero data collection. Photo data stays yours — always.",                        tag: "Secure" },
  { n: "06", title: "Custom Target Size",   desc: "Set your exact target output size as a percentage of the original. What you set is what you get.",              tag: "Precise" },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll<HTMLElement>(".mask").forEach((m, i) => setTimeout(() => m.classList.add("in"), i * 80));
        e.target.querySelectorAll<HTMLElement>(".fade-up").forEach((m, i) => setTimeout(() => m.classList.add("in"), 80 + i * 50));
        obs.unobserve(e.target);
      }),
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={ref}
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", contentVisibility: "auto", containIntrinsicSize: "0 700px" }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-24">

        {/* Header */}
        <div className="flex items-start justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                03 — Features
              </span>
            </div>
            <h2 className="mask font-bold" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, letterSpacing: "-0.03em", color: "var(--fg)" }}>
              <span className="mask__inner">Built for creators</span>
            </h2>
            <h2 className="mask font-bold d2" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, letterSpacing: "-0.03em", color: "var(--fg-2)" }}>
              <span className="mask__inner">who care about quality.</span>
            </h2>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
          {FEATURES.map((f, i) => (
            <div
              key={f.n}
              className={`fade-up d${(i % 3) + 1} group p-8 relative overflow-hidden`}
              style={{ background: "var(--bg)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--surface)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--bg)"; }}
            >
              {/* Number */}
              <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.15em", marginBottom: 32 }}>
                {f.n}
              </div>

              {/* Tag */}
              <div
                className="inline-block mb-4 px-2 py-1 rounded-full"
                style={{ fontFamily: "var(--font-geist-mono)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--fg-3)", border: "1px solid var(--border)" }}
              >
                {f.tag}
              </div>

              <h3 className="text-base font-semibold mb-2 transition-colors duration-200 group-hover:text-white" style={{ color: "var(--fg-2)" }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-3)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
