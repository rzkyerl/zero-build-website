"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
      </svg>
    ),
    title: "100% Offline",
    desc: "All processing happens in your browser. Your files never touch a server.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "No Login",
    desc: "No account, no email, no tracking. Just open and compress.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Social Ready",
    desc: "Presets tuned for Instagram, WhatsApp, and more — sharp output every time.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Instant Results",
    desc: "No waiting, no queues. Compression starts the moment you click.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Private by Design",
    desc: "Zero telemetry, zero analytics, zero data collection. Your media stays yours.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
    title: "Photo & Video",
    desc: "Supports JPG, PNG, WebP images and MP4 videos with smart codec selection.",
  },
];

export default function Features() {
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
    <section id="features" ref={sectionRef} className="py-24 px-6">
      <Container>
        <div className="text-center mb-16 reveal">
          <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-4">Why Zero Build</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for creators</h2>
          <p className="text-[#8a8a8a] max-w-md mx-auto text-sm leading-relaxed">
            Every decision was made to keep things fast, private, and out of your way.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className={`reveal reveal-delay-${(i % 3) + 1} rounded-2xl p-6 group hover:border-white/15 transition-all duration-300`}
              style={{ background: "#121212", border: "1px solid #2a2a2a" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white/50 group-hover:text-white/80 transition-colors"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-[#8a8a8a] text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
