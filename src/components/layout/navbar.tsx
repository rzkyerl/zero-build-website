"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = window.lenis;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "rgba(0,0,0,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "1px solid transparent",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.7s ease, transform 0.7s ease, background 0.4s ease, border-color 0.4s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => {
            const lenis = window.lenis;
            if (lenis) lenis.scrollTo(0, { duration: 1.4 });
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 group"
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
          >
            <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.6)" }} />
          </div>
          <span className="text-sm font-semibold tracking-tight" style={{ color: "rgba(255,255,255,0.7)" }}>
            Zero Build
          </span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {[{ label: "Features", id: "features" }, { label: "About", id: "about" }].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="px-4 py-2 text-xs tracking-wide rounded-xl transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.3)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)")}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("upload")}
            className="btn-primary ml-3 !py-2 !px-5 !text-xs"
          >
            Try Now
          </button>
        </div>

        {/* Mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.5)",
                transform: i === 0 && menuOpen ? "rotate(45deg) translate(2px,2px)"
                  : i === 2 && menuOpen ? "rotate(-45deg) translate(2px,-2px)" : "none",
                opacity: i === 1 && menuOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-400"
        style={{
          maxHeight: menuOpen ? "180px" : "0",
          borderBottom: menuOpen ? "1px solid rgba(255,255,255,0.04)" : "none",
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-1" style={{ background: "rgba(0,0,0,0.95)" }}>
          {[{ label: "Features", id: "features" }, { label: "About", id: "about" }].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left px-4 py-3 text-sm rounded-xl"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("upload")}
            className="btn-primary mt-1 !text-sm"
          >
            Try Now
          </button>
        </div>
      </div>
    </nav>
  );
}
