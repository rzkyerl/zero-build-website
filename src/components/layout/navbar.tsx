"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #2a2a2a" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
        >
          <div
            className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-white/80" />
          </div>
          <span className="text-white font-semibold text-sm tracking-wide">
            Zero Build
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scrollTo("features")}
            className="px-4 py-2 text-sm text-[#8a8a8a] hover:text-white transition-colors rounded-xl hover:bg-white/5"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo("about")}
            className="px-4 py-2 text-sm text-[#8a8a8a] hover:text-white transition-colors rounded-xl hover:bg-white/5"
          >
            About
          </button>
          <button
            onClick={() => scrollTo("upload")}
            className="ml-2 px-5 py-2 text-sm font-medium text-black bg-white rounded-xl hover:bg-white/90 transition-all btn-glow active:scale-95"
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
          <span
            className="block w-5 h-px bg-white transition-all duration-200"
            style={{ transform: menuOpen ? "rotate(45deg) translate(2px, 2px)" : "none" }}
          />
          <span
            className="block w-5 h-px bg-white transition-all duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px bg-white transition-all duration-200"
            style={{ transform: menuOpen ? "rotate(-45deg) translate(2px, -2px)" : "none" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-2"
          style={{ background: "rgba(0,0,0,0.95)", borderColor: "#2a2a2a" }}
        >
          <button
            onClick={() => scrollTo("features")}
            className="text-left px-4 py-3 text-sm text-[#8a8a8a] hover:text-white transition-colors rounded-xl hover:bg-white/5"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo("about")}
            className="text-left px-4 py-3 text-sm text-[#8a8a8a] hover:text-white transition-colors rounded-xl hover:bg-white/5"
          >
            About
          </button>
          <button
            onClick={() => scrollTo("upload")}
            className="mt-1 px-5 py-3 text-sm font-medium text-black bg-white rounded-xl hover:bg-white/90 transition-all"
          >
            Try Now
          </button>
        </div>
      )}
    </nav>
  );
}
