const ITEMS = [
  "Instagram Ready",
  "WhatsApp Ready",
  "Smart Auto",
  "100% Offline",
  "No Login",
  "Zero Upload",
  "Private by Design",
  "Photo & Video",
  "Browser Native",
  "Instant Results",
];

export default function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className="relative overflow-hidden py-5 select-none"
      style={{ borderTop: "1px solid #111", borderBottom: "1px solid #111" }}
    >
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #000, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #000, transparent)" }}
      />

      <div className="flex animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 mx-6 text-xs font-medium tracking-widest uppercase"
            style={{ color: i % 3 === 0 ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)" }}
          >
            <span
              className="w-1 h-1 rounded-full inline-block"
              style={{ background: "rgba(255,255,255,0.15)" }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
