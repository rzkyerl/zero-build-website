const ITEMS = [
  "Instagram Ready", "WhatsApp Ready", "Smart Auto", "100% Offline",
  "No Login", "Zero Upload", "Private by Design", "Photo & Video",
  "Browser Native", "Instant Results", "No Account", "Client-Side",
];

export default function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div
      className="overflow-hidden py-4 select-none"
      style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      {/* Fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--bg), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />
        <div className="flex mq-left" style={{ width: "max-content" }}>
          {doubled.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 mx-7"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: i % 3 === 0 ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)",
              }}
            >
              <span className="w-1 h-1 rounded-full inline-block" style={{ background: "rgba(255,255,255,0.15)" }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
