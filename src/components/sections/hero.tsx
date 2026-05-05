"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const children = el.querySelectorAll<HTMLElement>(".hero-item");
    children.forEach((child, i) => {
      child.style.opacity = "0";
      child.style.transform = "translateY(28px)";
      setTimeout(() => {
        child.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        child.style.opacity = "1";
        child.style.transform = "translateY(0)";
      }, 200 + i * 120);
    });
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden"
    >
      {/* Background radial glow + decorative rings */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
        />
        {[400, 600, 800].map((size) => (
          <div
            key={size}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: size,
              height: size,
              borderColor: `rgba(255,255,255,${size === 400 ? 0.04 : size === 600 ? 0.025 : 0.015})`,
            }}
          />
        ))}
      </div>

      {/* Floating mockup — result card */}
      <div
        className="hero-item absolute right-[8%] top-[22%] hidden lg:block animate-float"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="glass rounded-2xl p-4 w-52" style={{ background: "rgba(30,30,30,0.7)" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-white/30" />
            <div className="h-1.5 w-20 rounded-full bg-white/10" />
          </div>
          <div className="w-full h-24 rounded-xl mb-3" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="flex justify-between items-center">
            <div>
              <div className="h-1.5 w-12 rounded-full bg-white/20 mb-1.5" />
              <div className="h-1 w-8 rounded-full bg-white/10" />
            </div>
            <div className="text-xs text-white/40 font-mono">−72%</div>
          </div>
          <div className="mt-3 h-1 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full bg-white/40" style={{ width: "28%" }} />
          </div>
        </div>
      </div>

      {/* Floating mockup — save card */}
      <div
        className="hero-item absolute left-[6%] bottom-[28%] hidden lg:block animate-float"
        style={{ animationDelay: "1s" }}
      >
        <div className="glass rounded-2xl p-3 w-44" style={{ background: "rgba(30,30,30,0.7)" }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <span className="text-xs text-white/50">Saved</span>
          </div>
          <div className="text-sm font-semibold text-white/80">3.2 MB</div>
          <div className="text-xs text-white/30 mt-0.5">was 12 MB</div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="hero-item mb-8">
          <Badge icon={<span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />}>
            100% Browser-based · No Upload · Private
          </Badge>
        </div>

        <h1 className="hero-item text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none mb-6">
          Compress.
          <br />
          <span className="text-[#8a8a8a]">Stay Sharp.</span>
        </h1>

        <p className="hero-item text-base sm:text-lg text-[#8a8a8a] max-w-md mx-auto leading-relaxed mb-10">
          Optimize your media for social — directly in your browser.
          No account, no server, no compromise.
        </p>

        <div className="hero-item flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollTo("upload")}
            className="w-full sm:w-auto"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload Media
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => scrollTo("features")}
            className="w-full sm:w-auto"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-item absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-xs text-[#8a8a8a] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
