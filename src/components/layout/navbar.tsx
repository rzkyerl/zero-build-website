"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { scrollToId } from "@/lib/scroll";

const NAV_LINKS = [
  { label: "Compressor", id: "upload" },
  { label: "Features",   id: "features" },
  { label: "About",      id: "about" },
  { label: "Download",   id: "download" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible,  setVisible]  = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1900);
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", fn); };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled && !open ? "rgba(5,5,5,0.82)" : "transparent",
          backdropFilter: scrolled && !open ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled && !open ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled && !open ? "1px solid var(--border)" : "1px solid transparent",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-10px)",
          transition: "opacity 0.6s ease, transform 0.6s ease, background 0.4s ease, border-color 0.4s ease",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 h-14 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => {
              setOpen(false);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const lenis = (window as any).lenis;
              if (lenis) lenis.scrollTo(0, { duration: 1.2 });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)" }}
            >
              <Image
                src="/zero-logo.png"
                alt="Zero"
                width={20}
                height={20}
                style={{ objectFit: "cover", opacity: 0.85 }}
              />
            </div>
            <span className="text-sm font-semibold" style={{ color: "var(--fg-2)", letterSpacing: "-0.01em" }}>
              Zero
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="px-4 py-2 text-xs rounded-xl transition-colors duration-200"
                style={{ color: "var(--fg-3)", letterSpacing: "0.02em" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--fg)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--fg-3)")}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => go("upload")}
              className="ml-3 px-5 py-2 text-xs font-semibold rounded-full text-black bg-white transition-all duration-200 active:scale-95"
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(255,255,255,0.18)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
            >
              Try Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-[60] flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-px transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  transform:
                    i === 0 && open ? "rotate(45deg) translate(2px, 2px)"
                    : i === 2 && open ? "rotate(-45deg) translate(2px, -2px)"
                    : "none",
                  opacity: i === 1 && open ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col"
        style={{
          background: "var(--bg)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Top spacer matching navbar height */}
        <div style={{ height: 56 }} />

        {/* Menu content */}
        <div
          className="flex flex-col px-6 pt-8 pb-10 flex-1"
          style={{
            transform: open ? "translateY(0)" : "translateY(-12px)",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Nav links */}
          <div className="flex flex-col gap-1 mb-8">
            {NAV_LINKS.map(({ label, id }, i) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="text-left px-2 py-4 font-semibold transition-colors duration-150"
                style={{
                  fontSize: "clamp(1.5rem, 6vw, 2rem)",
                  color: "var(--fg-2)",
                  letterSpacing: "-0.02em",
                  borderBottom: "1px solid var(--border)",
                  transitionDelay: `${i * 40}ms`,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--fg)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--fg-2)")}
              >
                {label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => go("upload")}
            className="w-full py-4 rounded-full text-sm font-semibold text-black bg-white active:scale-95 transition-transform"
          >
            Try Now
          </button>

          {/* Bottom meta */}
          <div className="mt-auto pt-10 flex items-center gap-2">
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.12em" }}>
              100% Offline · No Upload · Private
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
