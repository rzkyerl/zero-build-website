"use client";

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-6 mt-auto" style={{ borderTop: "1px solid #2a2a2a" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div className="w-2 h-2 rounded-full bg-white/60" />
            </div>
            <span className="text-white/80 font-semibold text-sm">Zero Build</span>
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
                className="text-xs text-[#8a8a8a] hover:text-white transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex flex-col items-center sm:items-end gap-1">
            <p className="text-xs text-[#8a8a8a]">
              Built for creators who care about quality
            </p>
            <p className="text-xs text-white/20">v1.0.0 · CTRLBuild</p>
          </div>
        </div>

        {/* Privacy note */}
        <div
          className="mt-8 pt-6 flex items-center justify-center gap-2"
          style={{ borderTop: "1px solid #1a1a1a" }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="text-xs text-white/20">
            100% Offline · Private · No data ever leaves your device
          </span>
        </div>
      </div>
    </footer>
  );
}
