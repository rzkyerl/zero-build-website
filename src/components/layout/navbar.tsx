"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Compressor", id: "upload" },
  { label: "Features",   id: "features" },
  { label: "About",      id: "about" },
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

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    if (window.lenis) window.lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(5,5,5,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-10px)",
        transition: "opacity 0.6s ease, transform 0.6s ease, background 0.4s ease, border-color 0.4s ease",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => { if (window.lenis) window.lenis.scrollTo(0, { duration: 1.2 }); else window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2 group"
        >
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.7)" }} />
          </div>
          <span className="text-sm font-semibold" style={{ color: "var(--fg-2)", letterSpacing: "-0.01em" }}>
            Zero Build
          </span>
        </button>

        {/* Desktop */}
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

        {/* Mobile toggle */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {[0, 1, 2].map((i) => (
            <span key={i} className="block w-5 h-px transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.5)",
                transform: i === 0 && open ? "rotate(45deg) translate(2px,2px)" : i === 2 && open ? "rotate(-45deg) translate(2px,-2px)" : "none",
                opacity: i === 1 && open ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0", borderBottom: open ? "1px solid var(--border)" : "none" }}
      >
        <div className="px-6 py-4 flex flex-col gap-1" style={{ background: "rgba(5,5,5,0.97)" }}>
          {NAV_LINKS.map(({ label, id }) => (
            <button key={id} onClick={() => go(id)} className="text-left px-4 py-3 text-sm rounded-xl"
              style={{ color: "var(--fg-2)" }}>
              {label}
            </button>
          ))}
          <button onClick={() => go("upload")} className="mt-1 px-5 py-3 text-sm font-semibold rounded-full text-black bg-white">
            Try Now
          </button>
        </div>
      </div>
    </nav>
  );
}
