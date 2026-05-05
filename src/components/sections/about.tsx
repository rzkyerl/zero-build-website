"use client";

import { useEffect, useRef } from "react";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-visible");
      }),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll(".t-reveal, .f-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center py-32 px-6 sm:px-10 lg:px-16"
      style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      {/* Label */}
      <div className="f-reveal flex items-center gap-3 mb-16">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
          About
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start max-w-7xl">
        {/* Left */}
        <div>
          <h2
            className="font-bold leading-[0.9] tracking-[-0.03em] mb-12"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            <span className="t-reveal block">
              <span className="t-reveal__inner" style={{ color: "rgba(255,255,255,0.85)" }}>
                The story
              </span>
            </span>
            <span className="t-reveal block d-2">
              <span className="t-reveal__inner" style={{ color: "rgba(255,255,255,0.85)" }}>
                behind
              </span>
            </span>
            <span className="t-reveal block d-3">
              <span className="t-reveal__inner" style={{ color: "rgba(255,255,255,0.15)" }}>
                Zero Build.
              </span>
            </span>
          </h2>

          <div className="space-y-6 max-w-md">
            <p
              className="f-reveal text-sm leading-[1.8] d-4"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Every time you upload a photo or video to Instagram, WhatsApp, or any social
              platform, it gets recompressed — often resulting in blurry visuals, artifacts,
              or files that are still too large.
            </p>
            <p
              className="f-reveal text-sm leading-[1.8] d-5"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Zero Build solves this by compressing your media{" "}
              <span style={{ color: "rgba(255,255,255,0.65)" }}>before</span> you upload,
              using parameters tuned per platform. The result: visually sharp files at a
              fraction of the original size.
            </p>
          </div>

          {/* Author */}
          <div
            className="f-reveal flex items-center gap-4 mt-12 pt-10 d-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="w-4 h-4 rounded-full" style={{ background: "rgba(255,255,255,0.4)" }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>CTRLBuild</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>Developer</p>
            </div>
          </div>
        </div>

        {/* Right — large stats */}
        <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.04)" }}>
          {[
            { value: "100%", label: "Client-side", sub: "No server processing" },
            { value: "0",    label: "Data collected", sub: "Zero telemetry" },
            { value: "4",    label: "Presets", sub: "Platform-tuned" },
            { value: "1–2",  label: "Taps", sub: "Minimal friction" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`f-reveal d-${i + 3} p-8 group`}
              style={{ background: "#000" }}
            >
              <div
                className="text-4xl sm:text-5xl font-bold mb-3 transition-colors duration-300 group-hover:text-white"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {stat.value}
              </div>
              <div className="text-sm font-medium mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                {stat.label}
              </div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.1)" }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
