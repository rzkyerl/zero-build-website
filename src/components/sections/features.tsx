"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" /><line x1="12" y1="2" x2="12" y2="12" />
      </svg>
    ),
    title: "100% Offline",
    desc: "All processing happens in your browser. Your files never touch a server.",
    tag: "Privacy",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "No Login",
    desc: "No account, no email, no tracking. Just open and compress.",
    tag: "Simple",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Social Ready",
    desc: "Presets tuned for Instagram, WhatsApp, and more — sharp output every time.",
    tag: "Optimized",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Instant Results",
    desc: "No waiting, no queues. Compression starts the moment you click.",
    tag: "Fast",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Private by Design",
    desc: "Zero telemetry, zero analytics, zero data collection. Your media stays yours.",
    tag: "Secure",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
    title: "Photo & Video",
    desc: "Supports JPG, PNG, WebP images and MP4 videos with smart codec selection.",
    tag: "Versatile",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <div
      ref={cardRef}
      className={`reveal reveal-delay-${(index % 3) + 1} relative rounded-2xl p-6 group overflow-hidden`}
      style={{
        background: "#0a0a0a",
        border: "1px solid #1a1a1a",
        transition: "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.3s ease",
        willChange: "transform",
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)";
      }}
    >
      {/* Spotlight */}
      <div className="spotlight" />

      {/* Tag */}
      <div
        className="absolute top-4 right-4 text-[10px] font-medium tracking-widest uppercase px-2 py-1 rounded-full"
        style={{ color: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {feature.tag}
      </div>

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
        style={{
          background: "rgba(255,255,255,0.05)",
          color: "rgba(255,255,255,0.4)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {feature.icon}
      </div>

      <h3
        className="font-semibold mb-2 transition-colors duration-200 group-hover:text-white"
        style={{ color: "rgba(255,255,255,0.7)" }}
      >
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
        {feature.desc}
      </p>
    </div>
  );
}

export default function Features() {
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
    sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-32 px-6">
      <Container>
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6 reveal">
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span
              className="text-[10px] tracking-[0.3em] uppercase font-medium"
              style={{ color: "#444" }}
            >
              Why Zero Build
            </span>
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold leading-tight reveal"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Built for creators
            <br />
            <span style={{ color: "#333" }}>who care about quality.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
