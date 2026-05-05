"use client";

import { useEffect, useRef, useState } from "react";

function CursorCoords() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const fn = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return (
    <div
      className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-3 select-none pointer-events-none"
      aria-hidden="true"
    >
      <span style={{
        fontFamily: "var(--font-geist-mono)",
        fontSize: 10,
        color: "rgba(255,255,255,0.2)",
        letterSpacing: "0.1em",
      }}>
        [{String(pos.x).padStart(4, "0")}, {String(pos.y).padStart(4, "0")}]
      </span>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Trigger after loader wipe-out completes (~1700ms)
    const t = setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      el.querySelectorAll<HTMLElement>(".mask").forEach((m, i) => {
        setTimeout(() => m.classList.add("in"), i * 100);
      });
      el.querySelectorAll<HTMLElement>(".fade-up").forEach((m, i) => {
        setTimeout(() => m.classList.add("in"), 150 + i * 80);
      });
      el.querySelectorAll<HTMLElement>(".fade-in").forEach((m, i) => {
        setTimeout(() => m.classList.add("in"), 100 + i * 60);
      });
    }, 1750);

    // Safety fallback — if something goes wrong, show content after 3s
    const fallback = setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      el.querySelectorAll<HTMLElement>(".mask, .fade-up, .fade-in").forEach((m) => m.classList.add("in"));
    }, 3000);

    return () => { clearTimeout(t); clearTimeout(fallback); };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.lenis) window.lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <CursorCoords />
      <section
        ref={ref}
        className="relative min-h-screen flex flex-col justify-between overflow-hidden"
        style={{ background: "var(--bg)", paddingTop: 56 }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Top meta bar */}
        <div className="relative z-10 flex items-center justify-between px-6 sm:px-10 lg:px-16 pt-8">
          <div className="fade-in">
            <span style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 10,
              color: "var(--fg-3)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}>
              Zero Build · v1.0
            </span>
          </div>
          <div className="fade-in d2 hidden sm:flex items-center gap-6">
            {["100% Offline", "No Upload", "Private"].map((tag) => (
              <span key={tag} style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10,
                color: "var(--fg-3)",
                letterSpacing: "0.12em",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Center — headline + CTA */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-16 text-center">
          {/* Eyebrow */}
          <div className="fade-in mb-8 flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "var(--fg-3)" }} />
            <span style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 10,
              color: "var(--fg-3)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}>
              Media Compressor
            </span>
            <div className="h-px w-8" style={{ background: "var(--fg-3)" }} />
          </div>

          {/* Headline */}
          <h1
            className="font-bold tracking-tight"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
            }}
          >
            <span className="mask block">
              <span className="mask__inner" style={{ color: "var(--fg)" }}>
                Compress.
              </span>
            </span>
            <span className="mask block d2" style={{ color: "var(--fg-2)" }}>
              <span className="mask__inner">
                Stay Sharp.
              </span>
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="fade-up d3 mt-8 max-w-sm"
            style={{ fontSize: 15, lineHeight: 1.7, color: "var(--fg-2)" }}
          >
            Optimize photos & videos for social media — directly in your browser.
            No account. No server. No compromise.
          </p>

          {/* CTAs */}
          <div className="fade-up d4 mt-10 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => scrollTo("upload")}
              className="px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 active:scale-95"
              style={{ background: "var(--fg)", color: "#000" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 32px rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              Upload Media
            </button>
            <button
              onClick={() => scrollTo("features")}
              className="px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-200 active:scale-95"
              style={{ border: "1px solid var(--border-hi)", color: "var(--fg-2)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--fg)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--fg-2)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-hi)";
              }}
            >
              Explore Features
            </button>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div
          className="relative z-10 px-6 sm:px-10 lg:px-16 pb-10"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6">
            {[
              { value: "−72%", label: "Avg. size reduction" },
              { value: "0ms",  label: "Upload time" },
              { value: "4",    label: "Social presets" },
              { value: "100%", label: "Client-side" },
            ].map((s, i) => (
              <div key={s.label} className={`fade-up d${i + 1}`}>
                <div
                  className="text-2xl font-bold tabular-nums"
                  style={{ color: "var(--fg)", letterSpacing: "-0.02em" }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 2, letterSpacing: "0.05em" }}>
                  {s.label}
                </div>
              </div>
            ))}

            {/* Scroll indicator */}
            <div className="fade-in d5 flex items-center gap-3 ml-auto">
              <div
                className="w-px h-8 overflow-hidden relative"
                style={{ background: "var(--fg-4)" }}
              >
                <div
                  className="absolute top-0 left-0 w-full"
                  style={{
                    height: "50%",
                    background: "rgba(255,255,255,0.4)",
                    animation: "scroll-drop 2s cubic-bezier(0.4,0,0.2,1) infinite",
                  }}
                />
              </div>
              <span style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 9,
                color: "var(--fg-3)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}>
                Scroll
              </span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scroll-drop {
            0%   { transform: translateY(-100%); opacity: 0; }
            20%  { opacity: 1; }
            80%  { opacity: 1; }
            100% { transform: translateY(250%); opacity: 0; }
          }
        `}</style>
      </section>
    </>
  );
}
