"use client";

import { useEffect, useRef, useState } from "react";

/* ── Particle canvas ──────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let mouseX = W / 2;
    let mouseY = H / 2;
    let raf: number;

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const onMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };

    // Create dot grid
    const cols = Math.ceil(W / 48) + 2;
    const rows = Math.ceil(H / 48) + 2;
    const dots: { x: number; y: number; ox: number; oy: number; size: number }[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * 48;
        const y = r * 48;
        dots.push({ x, y, ox: x, oy: y, size: 1 + Math.random() * 0.5 });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      dots.forEach((dot) => {
        const dx = mouseX - dot.ox;
        const dy = mouseY - dot.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 180;
        const force = Math.max(0, 1 - dist / radius);

        // Repel from cursor
        dot.x += (-dx / dist || 0) * force * 12 * 0.08;
        dot.y += (-dy / dist || 0) * force * 12 * 0.08;

        // Spring back
        dot.x += (dot.ox - dot.x) * 0.06;
        dot.y += (dot.oy - dot.y) * 0.06;

        const proximity = Math.max(0, 1 - dist / radius);
        const alpha = 0.06 + proximity * 0.18;
        const size = dot.size + proximity * 1.5;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

/* ── Animated headline ────────────────────────────────── */
function AnimatedHeadline() {
  const line1 = "Compress.";
  const line2 = "Stay Sharp.";

  return (
    <h1 className="text-[clamp(3rem,9vw,7rem)] font-bold tracking-tight leading-[0.95] mb-8 select-none">
      <span className="block overflow-hidden">
        {line1.split("").map((char, i) => (
          <span
            key={i}
            className="char"
            style={{
              animationDelay: `${0.5 + i * 0.04}s`,
              display: char === " " ? "inline" : "inline-block",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      <span className="block overflow-hidden" style={{ color: "#444" }}>
        {line2.split("").map((char, i) => (
          <span
            key={i}
            className="char"
            style={{
              animationDelay: `${0.7 + i * 0.04}s`,
              display: char === " " ? "inline" : "inline-block",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </h1>
  );
}

/* ── Magnetic button ──────────────────────────────────── */
function MagneticButton({
  children,
  onClick,
  primary = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onMouseLeave = () => {
    const btn = ref.current;
    if (!btn) return;
    btn.style.transform = "translate(0,0)";
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative overflow-hidden px-8 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 active:scale-95"
      style={
        primary
          ? {
              background: "#fff",
              color: "#000",
              transition: "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s ease",
            }
          : {
              background: "transparent",
              color: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), color 0.2s ease, border-color 0.2s ease",
            }
      }
      onMouseEnter={(e) => {
        if (primary) {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 0 40px rgba(255,255,255,0.2), 0 0 80px rgba(255,255,255,0.06)";
        } else {
          (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)";
        }
      }}
      onMouseOut={(e) => {
        if (primary) {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
        } else {
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
        }
      }}
    >
      {children}
    </button>
  );
}

/* ── Floating stat card ───────────────────────────────── */
function StatCard({
  value,
  label,
  style,
}: {
  value: string;
  label: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="glass-strong rounded-2xl px-5 py-4 hidden lg:block animate-float"
      style={style}
    >
      <div className="text-xl font-bold text-white mb-0.5">{value}</div>
      <div className="text-xs" style={{ color: "#555" }}>{label}</div>
    </div>
  );
}

/* ── Counter ──────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          setVal(Math.round(eased * to));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Main Hero ────────────────────────────────────────── */
export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-glow-pulse"
        style={{
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
        aria-hidden="true"
      />

      {/* Floating stat cards */}
      <StatCard
        value="−72%"
        label="Avg. size reduction"
        style={{ position: "absolute", right: "7%", top: "24%", animationDelay: "0.3s" }}
      />
      <StatCard
        value="0ms"
        label="Upload time"
        style={{ position: "absolute", left: "6%", top: "32%", animationDelay: "0.9s" }}
      />
      <StatCard
        value="100%"
        label="Private"
        style={{ position: "absolute", left: "8%", bottom: "26%", animationDelay: "1.5s" }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-10 text-xs"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            color: "#666",
            animation: "fadeInUp 0.6s 0.2s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ background: "rgba(255,255,255,0.3)" }}
          />
          Browser-based · Zero upload · 100% private
        </div>

        {/* Animated headline */}
        <AnimatedHeadline />

        {/* Subtext */}
        <p
          className="text-base sm:text-lg max-w-sm mx-auto leading-relaxed mb-12"
          style={{
            color: "#555",
            animation: "fadeInUp 0.7s 1.1s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          Optimize photos & videos for social media.
          <br />
          No account. No server. No compromise.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animation: "fadeInUp 0.7s 1.3s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <MagneticButton primary onClick={() => scrollTo("upload")}>
            <span className="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload Media
            </span>
          </MagneticButton>
          <MagneticButton onClick={() => scrollTo("features")}>
            Explore Features
          </MagneticButton>
        </div>

        {/* Stats row */}
        <div
          className="flex items-center justify-center gap-8 mt-16 pt-10"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            animation: "fadeInUp 0.7s 1.5s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          {[
            { to: 72, suffix: "%", label: "Avg. reduction" },
            { to: 4, suffix: "×", label: "Presets" },
            { to: 0, suffix: "ms", label: "Upload time" },
          ].map(({ to, suffix, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-white/80 tabular-nums">
                <Counter to={to} suffix={suffix} />
              </div>
              <div className="text-xs mt-1" style={{ color: "#444" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ animation: "fadeIn 1s 2s ease both" }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "#333" }}>
          Scroll
        </span>
        <div className="relative w-px h-10 overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: "40%",
              background: "rgba(255,255,255,0.4)",
              animation: "scroll-line 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scroll-line {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}
