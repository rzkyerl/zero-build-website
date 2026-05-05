"use client";

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = window.lenis;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="py-20 px-6 sm:px-10 lg:px-16"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "#000" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.4)" }} />
            </div>
            <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>
              Zero Build
            </span>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>
            Built for creators who care about quality.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8">
          {[{ label: "About", id: "about" }, { label: "Features", id: "features" }, { label: "Compress", id: "upload" }].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-xs transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.2)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.2)")}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="text-right">
          <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.1)" }}>v1.0.0</p>
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.08)" }}>CTRLBuild</p>
        </div>
      </div>

      <div
        className="mt-12 pt-8 flex items-center justify-center gap-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.08)" }}>
          100% Offline · Private · No data ever leaves your device
        </span>
      </div>
    </footer>
  );
}
