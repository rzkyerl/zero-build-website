"use client";

import Image from "next/image";

export default function Footer() {
  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.lenis) window.lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

          {/* Zero brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.5)" }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: "var(--fg-2)" }}>Zero</span>
            </div>
            <p style={{ fontSize: 11, color: "var(--fg-3)" }}>Built for creators who care about quality.</p>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            {[
              { l: "About",    id: "about" },
              { l: "Features", id: "features" },
              { l: "Compress", id: "upload" },
            ].map(({ l, id }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="text-xs transition-colors duration-200"
                style={{ color: "var(--fg-3)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--fg-2)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--fg-3)")}
              >
                {l}
              </button>
            ))}
          </div>

          {/* CTRLBuild logo */}
          <div className="flex flex-col items-start sm:items-end gap-2">
            <Image
              src="/CTRLBuild-White.png"
              alt="CTRLBuild"
              width={80}
              height={20}
              style={{ opacity: 0.35, objectFit: "contain" }}
            />
            <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--fg-4)", letterSpacing: "0.1em" }}>
              v1.0.0
            </p>
          </div>
        </div>

        {/* Bottom privacy note */}
        <div
          className="mt-10 pt-8 flex items-center justify-center gap-2"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--fg-4)" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--fg-4)", letterSpacing: "0.1em" }}>
            100% Offline · Private · No data ever leaves your device
          </span>
        </div>
      </div>
    </footer>
  );
}
