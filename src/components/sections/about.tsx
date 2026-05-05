"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";

const STATS = [
  { value: "100%", label: "Client-side", sub: "No server processing" },
  { value: "0", label: "Data collected", sub: "Zero telemetry" },
  { value: "4", label: "Presets", sub: "Platform-tuned" },
  { value: "1–2", label: "Taps to compress", sub: "Minimal friction" },
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
      { threshold: 0.15 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6">
      <Container>
        <div
          className="reveal rounded-3xl p-8 sm:p-12 relative overflow-hidden"
          style={{ background: "#121212", border: "1px solid #2a2a2a" }}
        >
          {/* Background decoration */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — story */}
            <div>
              <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-4">About</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                The story behind
                <br />
                <span className="text-[#8a8a8a]">Zero Build</span>
              </h2>
              <p className="text-[#8a8a8a] text-sm leading-relaxed mb-4">
                Every time you upload a photo or video to Instagram, WhatsApp, or any social
                platform, it gets recompressed — often resulting in blurry visuals, artifacts,
                or files that are still too large.
              </p>
              <p className="text-[#8a8a8a] text-sm leading-relaxed mb-6">
                Zero Build solves this by compressing your media{" "}
                <em className="text-white/60 not-italic">before</em> you upload, using
                parameters tuned per platform. The result: visually sharp files at a fraction
                of the original size.
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div className="w-3 h-3 rounded-full bg-white/60" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/80">CTRLBuild</p>
                  <p className="text-xs text-[#8a8a8a]">Developer</p>
                </div>
              </div>
            </div>

            {/* Right — stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #2a2a2a" }}
                >
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-white/70 mb-0.5">{stat.label}</div>
                  <div className="text-xs text-[#8a8a8a]">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
