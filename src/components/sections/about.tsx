"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";

const STATS = [
  { value: "100%", label: "Client-side", sub: "No server processing" },
  { value: "0", label: "Data collected", sub: "Zero telemetry" },
  { value: "4", label: "Presets", sub: "Platform-tuned" },
  { value: "1–2", label: "Taps", sub: "Minimal friction" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current
      ?.querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6">
      <Container>
        {/* Section label */}
        <div className="flex items-center gap-4 mb-20 reveal">
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
          <span
            className="text-[10px] tracking-[0.3em] uppercase font-medium"
            style={{ color: "#444" }}
          >
            About
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div>
            <h2
              className="text-4xl sm:text-5xl font-bold leading-tight mb-8 reveal-left"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              The story behind
              <br />
              <span style={{ color: "#333" }}>Zero Build.</span>
            </h2>

            <div className="space-y-5 reveal-left reveal-delay-1">
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                Every time you upload a photo or video to Instagram, WhatsApp, or any social
                platform, it gets recompressed — often resulting in blurry visuals, artifacts,
                or files that are still too large.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                Zero Build solves this by compressing your media{" "}
                <span style={{ color: "rgba(255,255,255,0.5)" }}>before</span> you upload,
                using parameters tuned per platform. The result: visually sharp files at a
                fraction of the original size.
              </p>
            </div>

            {/* Author */}
            <div
              className="flex items-center gap-3 mt-10 pt-8 reveal-left reveal-delay-2"
              style={{ borderTop: "1px solid #111" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="w-3.5 h-3.5 rounded-full" style={{ background: "rgba(255,255,255,0.5)" }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                  CTRLBuild
                </p>
                <p className="text-xs" style={{ color: "#444" }}>Developer</p>
              </div>
            </div>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-3">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`reveal-right reveal-delay-${i + 1} rounded-2xl p-6 group`}
                style={{
                  background: "#080808",
                  border: "1px solid #161616",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#161616";
                }}
              >
                <div
                  className="text-3xl font-bold mb-2 transition-colors duration-200 group-hover:text-white"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-medium mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {stat.label}
                </div>
                <div className="text-xs" style={{ color: "#333" }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
