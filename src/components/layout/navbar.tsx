"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Delay navbar appearance until after loader
    const t = setTimeout(() => setVisible(true), 1600);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(0,0,0,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 0.6s ease, transform 0.6s ease, background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group"
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)" }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full transition-all duration-300 group-hover:scale-110"
              style={{ background: "rgba(255,255,255,0.7)" }}
            />
          </div>
          <span
            className="text-sm font-semibold tracking-wide transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Zero Build
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { label: "Features", id: "features" },
            { label: "About", id: "about" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="px-4 py-2 text-sm rounded-xl transition-all duration-200"
              style={{ color: "rgba(255,255,255,0.35)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("upload")}
            className="ml-3 px-5 py-2 text-sm font-medium text-black bg-white rounded-xl transition-all duration-200 active:scale-95"
            style={{ boxShadow: "0 0 0 0 rgba(255,255,255,0)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 0 rgba(255,255,255,0)";
            }}
          >
            Try Now
          </button>
        </div>

        {/* Mobile hamburger */}
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
                background: "rgba(255,255,255,0.6)",
                transform:
                  i === 0 && menuOpen ? "rotate(45deg) translate(2px, 2px)"
                  : i === 2 && menuOpen ? "rotate(-45deg) translate(2px, -2px)"
                  : "none",
                opacity: i === 1 && menuOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "200px" : "0",
          borderBottom: menuOpen ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
      >
        <div
          className="px-6 py-4 flex flex-col gap-1"
          style={{ background: "rgba(0,0,0,0.95)" }}
        >
          {[
            { label: "Features", id: "features" },
            { label: "About", id: "about" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left px-4 py-3 text-sm rounded-xl transition-colors"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("upload")}
            className="mt-1 px-5 py-3 text-sm font-medium text-black bg-white rounded-xl"
          >
            Try Now
          </button>
        </div>
      </div>
    </nav>
  );
}
