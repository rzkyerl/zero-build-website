"use client";

import { useEffect, useRef } from "react";

const FEATURES = [
  {
    num: "01",
    title: "100% Offline",
    desc: "All processing happens in your browser. Your files never touch a server — ever.",
    tag: "Privacy",
  },
  {
    num: "02",
    title: "No Login",
    desc: "No account, no email, no tracking. Open the page and start compressing.",
    tag: "Simple",
  },
  {
    num: "03",
    title: "Social Ready",
    desc: "Presets tuned for Instagram, WhatsApp, and more. Sharp output every time.",
    tag: "Optimized",
  },
  {
    num: "04",
    title: "Instant Results",
    desc: "No waiting, no queues. Compression starts the moment you click Optimize.",
    tag: "Fast",
  },
  {
    num: "05",
    title: "Private by Design",
    desc: "Zero telemetry, zero analytics, zero data collection. Your media stays yours.",
    tag: "Secure",
  },
  {
    num: "06",
    title: "Photo & Video",
    desc: "JPG, PNG, WebP images and MP4 videos — smart codec selection built in.",
    tag: "Versatile",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Horizontal scroll driven by vertical scroll
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!section || !track || !sticky) return;

    const getScrollAmount = () => track.scrollWidth - sticky.clientWidth;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight - sticky.clientHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / sectionH));
      track.style.transform = `translateX(-${progress * getScrollAmount()}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
        }
      }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".t-reveal, .f-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      style={{ height: `${FEATURES.length * 100 + 100}vh` }}
    >
      {/* Sticky container */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between py-16 px-6 sm:px-10 lg:px-16"
        style={{ background: "#000" }}
      >
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <div className="f-reveal flex items-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
                Features
              </span>
            </div>
            <h2
              className="font-bold leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "rgba(255,255,255,0.85)" }}
            >
              <span className="t-reveal block">
                <span className="t-reveal__inner">Built for creators</span>
              </span>
              <span className="t-reveal block d-2">
                <span className="t-reveal__inner" style={{ color: "rgba(255,255,255,0.2)" }}>
                  who care about quality.
                </span>
              </span>
            </h2>
          </div>

          <div
            className="f-reveal hidden md:flex items-center gap-2 text-xs d-3"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            <span>Scroll to explore</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="h-scroll-track gap-4 pb-2"
            style={{ transition: "transform 0.05s linear" }}
          >
            {FEATURES.map((feat) => (
              <div
                key={feat.num}
                className="feat-card spotlight-card relative rounded-2xl p-8 flex flex-col justify-between"
                style={{
                  height: "clamp(260px, 35vh, 340px)",
                  background: "#080808",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                <div className="spotlight" />

                {/* Number */}
                <div
                  className="text-[10px] font-mono tracking-widest"
                  style={{ color: "rgba(255,255,255,0.15)" }}
                >
                  {feat.num}
                </div>

                {/* Content */}
                <div>
                  <div
                    className="text-[10px] tracking-[0.2em] uppercase font-medium mb-3 px-2 py-1 rounded-full inline-block"
                    style={{ border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.2)" }}
                  >
                    {feat.tag}
                  </div>
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* End card */}
            <div
              className="feat-card rounded-2xl p-8 flex flex-col items-center justify-center text-center"
              style={{
                height: "clamp(260px, 35vh, 340px)",
                background: "rgba(255,255,255,0.02)",
                border: "1px dashed rgba(255,255,255,0.06)",
              }}
            >
              <div className="text-3xl font-bold mb-2" style={{ color: "rgba(255,255,255,0.08)" }}>
                Ready?
              </div>
              <button
                className="btn-primary mt-4 text-xs"
                onClick={() => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })}
              >
                Try it now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
