"use client";

export default function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="py-16 px-6" style={{ borderTop: "1px solid #111" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.5)" }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
                Zero Build
              </span>
            </div>
            <p className="text-xs" style={{ color: "#333" }}>
              Built for creators who care about quality.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {[
              { label: "About", id: "about" },
              { label: "Features", id: "features" },
              { label: "Compress", id: "upload" },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-xs transition-colors duration-200"
                style={{ color: "#333" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#333")}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Version */}
          <p className="text-xs font-mono" style={{ color: "#222" }}>
            v1.0.0 · CTRLBuild
          </p>
        </div>

        {/* Bottom */}
        <div
          className="mt-10 pt-8 flex items-center justify-center gap-2"
          style={{ borderTop: "1px solid #0d0d0d" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.08)" }}>
            100% Offline · Private · No data ever leaves your device
          </span>
        </div>
      </div>
    </footer>
  );
}
